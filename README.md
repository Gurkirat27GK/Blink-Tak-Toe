# ✨ Blink Tac Toe 🎮

A fun and interactive emoji-based tic-tac-toe game built with pure JavaScript! Featuring animated emoji moves, glowing win effects, and a vanishing feature to highlight the winner.

---

## 🛠 Tech Stack

- **JavaScript (Vanilla JS)**
- **HTML5 + CSS3**
- **Responsive Design** with Media Queries

---

## 😄 Emoji Categories

Blink Tac Toe uses a variety of emoji characters for an engaging experience:
- 🐱 Animals   
- 🍕 Food  
- ⚽ Sports
- 😀 Emojis

Each move by a player is represented using randomized emoji from these categories!

---

## 💨 Vanishing Feature

The game allows each player to have a **maximum of 3 emojis** on the board at any time. To implement the **vanishing rule**, I followed these steps:

1. **FIFO Logic**  
   Each player has a queue (`Array`) to store their last 3 placed cell indices.

2. **New Placement**  
   - If the player's emoji count is **less than 3**, the new emoji is placed normally.
   - If the player already has **3 emojis**:
     - The **oldest emoji disappears** (using `shift()` to remove the first cell).
     - That cell is cleared visually (`cell.textContent = ''`).
     - The new emoji is then placed in the clicked cell, **unless it is the same cell just cleared**.

3. **Placement Restriction**  
   A player **cannot place** a new emoji **on the same cell** where their own emoji just vanished in the same turn.

4. **Visual Feedback**  
   - The vanishing emoji fades out using a CSS animation.
   - New emojis appear with a small visual effect for better clarity.

---

## 🔧 Future Improvements

If given more time, here's what I would improve:
- Add a scoreboard history with localStorage  
- Enable multiplayer over network or sockets  
- Include different board sizes and difficulty levels  
- Polish mobile UX further for smaller screens 📱  

---

Have fun blinking your way to victory! 🚀
