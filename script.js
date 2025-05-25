const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const newgameBtn = document.getElementById("newgame-btn");
const boardDiv = document.getElementById("board");
const gameSection = document.getElementById("game");
const turnInfo = document.getElementById("turn-info");

let board = Array(9).fill(null);
let playerTurn = 1;
let player1Emojis = [];
let player2Emojis = [];
let player1Moves = [];
let player2Moves = [];
let player1Score = 0;
let player2Score = 0;
let gameOver = false;

startBtn.addEventListener("click", () => {
  const p1 = document.getElementById("player1-category").value.split(",");
  const p2 = document.getElementById("player2-category").value.split(",");

  if (arraysEqual(p1, p2)) {
    alert("Both players cannot select the same category!");
    return;
  }

  player1Emojis = p1;
  player2Emojis = p2;

  const startSound = document.getElementById("start-sound");
  startSound.currentTime = 0;
  startSound.play();

  document.getElementById("player-selection").classList.add("hidden");
  gameSection.classList.remove("hidden");

  drawBoard();
  updateTurnText();
});

restartBtn.addEventListener("click", () => {
  drawBoard();
  turnInfo.textContent = `Player ${playerTurn}'s Turn`;
});


function drawBoard() {
  boardDiv.innerHTML = "";
  board = Array(9).fill(null);
  player1Moves = [];
  player2Moves = [];
  gameOver = false;
  boardDiv.classList.remove("disabled-board");
  restartBtn.style.display = "none";
  newgameBtn.style.display = "none";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleMove(i));
    boardDiv.appendChild(cell);
  }
}

function handleMove(index) {
    if (board[index] !== null || gameOver) return;

    const currentEmoji = getRandomEmoji(playerTurn === 1 ? player1Emojis : player2Emojis);
    board[index] = { player: playerTurn, emoji: currentEmoji };
    const cellEl = document.querySelectorAll(".cell")[index];
    cellEl.textContent = currentEmoji;
    cellEl.classList.add("emoji-enter");

    requestAnimationFrame(() => {
        cellEl.classList.add("emoji-enter-active");
    });

    const playerMoves = playerTurn === 1 ? player1Moves : player2Moves;
    playerMoves.push(index);

    if (playerMoves.length > 3) {
        const removedIndex = playerMoves.shift();
        board[removedIndex] = null;
        const removedCell = document.querySelectorAll(".cell")[removedIndex];
        removedCell.classList.add("emoji-exit");

        setTimeout(() => {
            removedCell.textContent = "";
            removedCell.classList.remove("emoji-exit", "emoji-enter", "emoji-enter-active");
        }, 300);
    }

    const winCombo = checkWin();

    if (winCombo) {
        const winSound = document.getElementById("winner-sound");
        winSound.currentTime = 0;
        winSound.play();

        winCombo.forEach(index => {
            document.querySelectorAll(".cell")[index].classList.add("winning-cell");
        });

        if (playerTurn === 1) {
            player1Score++;
            document.getElementById('score1').textContent = player1Score;
        } else {
            player2Score++;
            document.getElementById('score2').textContent = player2Score;
        }

        turnInfo.innerHTML = `<span class="win-message">🎉 Player ${playerTurn} Wins!</span>`;
        gameOver = true;
        boardDiv.classList.add("disabled-board");
        restartBtn.style.display = "inline-block";
        newgameBtn.style.display = "inline-block";

        return;
    }

    playerTurn = playerTurn === 1 ? 2 : 1;
    updateTurnText();
}

newgameBtn.addEventListener("click", () => {
  player1Score = 0;
  player2Score = 0;
  document.getElementById('score1').textContent = 0;
  document.getElementById('score2').textContent = 0;

  playerTurn = 1;

  document.getElementById("player-selection").classList.remove("hidden");
  gameSection.classList.add("hidden");
  newgameBtn.style.display = "none";
});

function updateTurnText() {
  turnInfo.textContent = `Player ${playerTurn}'s Turn`;
}

function getRandomEmoji(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function checkWin() {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6],            
  ];

  for (const [a, b, c] of lines) {
    if (
      board[a] &&
      board[b] &&
      board[c] &&
      board[a].player === playerTurn &&
      board[b].player === playerTurn &&
      board[c].player === playerTurn
    ) {
      return [a, b, c];
    }
  }
  return null;
}

function arraysEqual(arr1, arr2) {
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sorted1.every((val, i) => val === sorted2[i]);
}

document.getElementById("toggle-help").addEventListener("click", () => {
  document.getElementById("help-section").classList.toggle("hidden");
});
