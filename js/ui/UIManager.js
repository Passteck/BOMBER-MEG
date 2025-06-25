// Start screen => UIManager.js

import { spritehealth, maxHealth } from "../player/Player.js";
import {canPlaceBomb} from "../entities/Bomb.js";
import { keycount } from "../items/Key.js";

export const gamepaused = {
  paused: false
};
export const menuscreen = document.querySelector("#menuscreen");

// // Game screen => UIManager.js
export const gamescreen = document.querySelector("#gamescreen");

// Display player health => UIManager.js
export const healthDisplay = () => {
  const healthicon = document.getElementById("health-icon");
  // With heart
  healthicon.innerHTML =
    '<span class="heart">&hearts;</span>'.repeat(spritehealth.health) +
    '<span class="empty-heart">&hearts;</span>'.repeat(
      maxHealth - spritehealth.health
    );

  // Add a pulse effect
  // #BUG Pulse effect doesn't work for now
  // if (spritehealth < maxHealth) {
  //   healthicon.style.animation = "pulse 0.5s ease-in-out infinite alternate";
  //   setTimeout(() => (healthicon.style.animation = ""), 1000);
  // }
};

// If the bomb is placed, remove bomb icon => UIManager.js
export const bombDisplay = () => {
  const bombIcon = document.getElementById("bomb-icon");
  if (canPlaceBomb) {
    bombIcon.style.opacity = 1;
  } else {
    bombIcon.style.opacity = 0.5;
  }
};



// // Display key count on screen => UIManager.js
export const keydisplay = () => {
  const keytext = document.querySelector(".keycounter");
  keytext.textContent = `Key: ${keycount}`;
};

export const initUI = () => {
  healthDisplay();
  bombDisplay();
  keydisplay();
};