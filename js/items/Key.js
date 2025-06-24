//  #BUG Key is not working/Player can't take keys
// FIXED (forgot to put  requestAnimationFrame(gameloop); in the gameloop function)

// Key variable => Key.js
// let keycount = 0;

// // Drop key => Key.js
// const dropKey = (x, y) => {
//   const key = document.createElement("img");
//   key.className = "key";
//   key.src = "./assets/sprite/key.png";
//   key.style.position = "absolute";
//   key.style.left = `${x}px`;
//   key.style.top = `${y}px`;
//   cage.appendChild(key);
// };

// // Key collection => Key.js

// const keysElements = () => {
//   const keys = document.querySelectorAll(".key");
//   for (let key of keys) {
//     if (
//       key.offsetLeft < sprite.offsetLeft + playerSize &&
//       key.offsetLeft + key.offsetWidth > sprite.offsetLeft &&
//       key.offsetTop < sprite.offsetTop + playerSize &&
//       key.offsetTop + key.offsetHeight > sprite.offsetTop
//     ) {
//       keycount++;
//       key.remove();
//       console.log("Key collected");
//     }
//     return;
//   }
// };

import { cage } from "../core/GameState.js";
import { sprite, playerSize } from "../player/Player.js";

// ========== CONFIG ========== //
export let keycount = 0; 

// ========== CORE FUNCTIONS ========== //
export const dropKey = (x, y) => {
  const key = document.createElement("img");
  key.className = "key";
  key.src = "./assets/sprite/key.png";
  key.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
  `;
  cage.appendChild(key);
  console.log(`🔑 Key dropped at (${x}, ${y})`);
};

export const keysElements = () => {
  document.querySelectorAll(".key").forEach(key => {
    if (isColliding(key, sprite)) {
      keycount++;
      key.remove();
      console.log("🎉 Key collected! Total:", keycount);
    }
  });
};

// ========== UTILS ========== //
const isColliding = (element, sprite) => (
  element.offsetLeft < sprite.offsetLeft + playerSize &&
  element.offsetLeft + element.offsetWidth > sprite.offsetLeft &&
  element.offsetTop < sprite.offsetTop + playerSize &&
  element.offsetTop + element.offsetHeight > sprite.offsetTop
);