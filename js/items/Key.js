//  #BUG Key is not working/Player can't take keys
// FIXED (forgot to put  requestAnimationFrame(gameloop); in the gameloop function)


import { cage } from "../core/GameState.js";
import { sprite, playerSize } from "../player/Player.js";

export let keycount = 0; 


export const dropKey = (x, y) => {
  const key = document.createElement("img");
  key.className = "key";
  key.src = "./assets/sprite/key.webp";
  key.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
  `;   
  cage.appendChild(key);
  console.log(`Key dropped at (${x}, ${y})`);
};

export const keysElements = () => {
  document.querySelectorAll(".key").forEach(key => {
    if (isColliding(key, sprite)) {
      keycount++;
      key.remove();
      console.log("Key collected! Total:", keycount);
    }
  });
};

const isColliding = (element, sprite) => (
  element.offsetLeft < sprite.offsetLeft + playerSize &&
  element.offsetLeft + element.offsetWidth > sprite.offsetLeft &&
  element.offsetTop < sprite.offsetTop + playerSize &&
  element.offsetTop + element.offsetHeight > sprite.offsetTop
);