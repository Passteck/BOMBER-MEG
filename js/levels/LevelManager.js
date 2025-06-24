// Add an exit door => LevelManager.js

import { cage } from "../core/GameState.js"; 
import { sprite, playerSize, spritehealth } from "../player/Player.js";
import { keycount } from "../items/Key.js";
import { showVictory } from "../ui/VictoryScreen.js";
import { showDefeat } from "../ui/LoseScreen.js";



export const door = document.createElement("img");
door.id = "exit-door";
door.className = "door locked";
door.src = "./assets/sprite/door.png";
door.style.position = "absolute";
door.style.left = "750px";
door.style.top = "750px";
cage.appendChild(door);

// Win condition function => LevelManager.js
export const wincondition = () => {
  const displaytext = document.querySelector("#messagetext");
  if (
    door.offsetLeft < sprite.offsetLeft + playerSize &&
    door.offsetLeft + door.offsetWidth > sprite.offsetLeft &&
    door.offsetTop < sprite.offsetTop + playerSize &&
    door.offsetTop + door.offsetHeight > sprite.offsetTop
  ) {
    if (keycount >= 1) {
      door.classList.remove("locked");
      door.classList.add("open");
      door.src = "./assets/sprite/door_open.png";

      displaytext.textContent = `🔓 Door is unlocked!`;
      displaytext.style.cssText = `background-color:#fafafa`;
      showVictory();
    } else {
      displaytext.textContent = `🔒 Door is locked... \n🗝️ I should find a key to open it...`;
      displaytext.style.cssText = `background-color:#fafafa`;
    }
  }
};

// Lose Condition => LevelManager.js

export const loseconditionhealth = () => {
  // If the player runs out of health, display a message and reload the game
  if (spritehealth.health <= 0) {
    showDefeat();
  }
};