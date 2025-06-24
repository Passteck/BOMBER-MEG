// Start screen => UIManager.js
// let gamepaused = false;
// const menuscreen = document.querySelector("#menuscreen");

// // Game screen => UIManager.js
// const gamescreen = document.querySelector("#gamescreen");

// // Display player health => UIManager.js
// const healthDisplay = () => {
//   const healthicon = document.getElementById("health-icon");
//   // With heart
//   healthicon.innerHTML =
//     '<span class="heart">&hearts;</span>'.repeat(spritehealth) +
//     '<span class="empty-heart">&hearts;</span>'.repeat(
//       maxHealth - spritehealth
//     );

//   // Add a pulse effect
//   // #BUG Pulse effect doesn't work for now
//   // if (spritehealth < maxHealth) {
//   //   healthicon.style.animation = "pulse 0.5s ease-in-out infinite alternate";
//   //   setTimeout(() => (healthicon.style.animation = ""), 1000);
//   // }
// };

// // If the bomb is placed, remove bomb icon => UIManager.js
// const bombDisplay = () => {
//   const bombIcon = document.getElementById("bomb-icon");
//   if (canplacebomb) {
//     bombIcon.style.opacity = 1;
//   } else {
//     bombIcon.style.opacity = 0.5;
//   }
// };



// // Display key count on screen => UIManager.js
// const keydisplay = () => {
//   const keytext = document.querySelector(".keycounter");
//   keytext.textContent = `Key: ${keycount}`;
// };

// ========== STATE ========== //
// export let gamepaused = false;
export const gamepaused = {
  paused: false
};

export let spritehealth = 3;
export const maxHealth = 3;
let keycount = 0; // Assuming this is elsewhere in your game
let canplacebomb = true; // Sync with Bomb.js

// ========== ELEMENTS ========== //
const menuscreen = document.querySelector("#menuscreen");
const gamescreen = document.querySelector("#gamescreen");
const healthicon = document.getElementById("health-icon");
const bombIcon = document.getElementById("bomb-icon");
const keytext = document.querySelector(".keycounter");

// ========== UI FUNCTIONS ========== //
// Health display with FIXED pulse effect! (◕‿◕✿)
export const healthDisplay = () => {
  healthicon.innerHTML = 
    '<span class="heart">&hearts;</span>'.repeat(spritehealth) +
    '<span class="heart empty">&hearts;</span>'.repeat(maxHealth - spritehealth);

  // Working pulse effect when damaged!
  if (spritehealth < maxHealth) {
    healthicon.classList.add("pulse");
    setTimeout(() => healthicon.classList.remove("pulse"), 1000);
  }
};

// Bomb cooldown visual
export const bombDisplay = () => {
  bombIcon.style.opacity = canplacebomb ? 1 : 0.5;
};

// Key counter
export const keydisplay = () => {
  keytext.textContent = `Key: ${keycount}`;
};

// ========== INIT ========== //
export const initUI = () => {
  healthDisplay(); // Initial render
  bombDisplay();
  keydisplay();
};