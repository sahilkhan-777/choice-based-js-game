# 🗺️ The Lost Treasure of Eldoria

A choice-based text adventure game built with **HTML, CSS, and JavaScript**.  
Your decisions shape the journey — will you find the legendary treasure, or will Eldoria claim another adventurer?

---

## 📖 Game Description
You awaken in the mysterious jungles of Eldoria with only a tattered map in your pocket.  
Every choice you make — crossing a bridge, exploring a hidden cave, opening a backpack, or fleeing from unseen creatures — shapes your fate.  

Will you survive the traps, endure the penalties, and fight the guardian to claim the treasure?

---

## 🛠️ Tech Stack
- **HTML** → Game structure & story flow  
- **CSS** → Styling, immersive fonts, penalty bar states, responsive layout  
- **JavaScript** → Core game logic, event handling, status tracking, branching choices  

---

## ✨ Features
- **Dynamic Choice System** → Every button click leads to a different scenario  
- **Status Bar** → Displays player’s **Health, Stamina, Inventory**  
- **Penalty Bar** →  
  - ⚫ Grey = Inactive  
  - 🟢 Green = Active penalty triggered  
- **Live Score Update Panel** → Displays all choices, penalties, and score changes in real-time  
- **Immersive Fonts & Styling** → Adventure-themed UI inspired by treasure maps & temples  

---

## ⚔️ Gameplay Mechanics

### 🟩 Status & Conditions
- **Health** → decreases from traps, guardian, or fear  
- **Stamina** → decreases with actions, especially without water  
- **Inventory** → track items like **Water Bottle**, **Flashlight**, **Sword**

### ❌ Penalties
1. **No Water Bottle** → `-15 stamina` each move  
2. **No Flashlight** → You fall into traps → `-20 health`  
3. **Fear** → Guardian fight costs **double stamina & health**  

### 🏆 Win Condition
You face the **Guardian of Eldoria**.  
You must have:  
- **Sword** equipped  
- **Stamina ≥ 30**  
- **Health ≥ 60**  

If successful → you defeat the guardian and claim **The Lost Treasure of Eldoria**.

### 💀 Death Conditions
- **Health ≤ 0** → You collapse, lost forever in Eldoria  
- **Stamina ≤ 0** → You are too exhausted to continue  
- **Fail Guardian fight** → Guardian crushes your final hope  

---

## 🚀 How to Run
1. Clone this repo or download the source files.  
2. Open `index.html` in your browser.  
3. Click **Start Your Adventure** and make your choices.  

---

## 📌 Future Enhancements
- Sound effects & ambient music  
- More branching paths and endings  

---

## 🧑‍💻 Author
Developed as a fun experiment in interactive storytelling & web-based game design.  
