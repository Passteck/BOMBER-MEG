// => Player.js
import { grid_size, arena_size } from "../core/GameConfig.js";
import { gamepaused } from "../ui/UIManager.js";
import { checkForCollision } from "../core/Collision.js"; 

let moveBy = grid_size;
// Size of player
export const playerSize = 50;

// Player => Player.js
// Player health
export const maxHealth = 3;
export let spritehealth = {
  health: maxHealth,
};

export const sprite = document.querySelector(".sprite");
export const initPlayer = () => {
  // Load a default position for player => Player.js
  sprite.style.position = "absolute";
  sprite.style.left = "0px";
  sprite.style.top = "0px";
  initPlayerMovement();
};

// Player movement => Player.js
// window.addEventListener("keydown", (e) => {
//   if (!gamepaused) return;
//   let left = parseInt(sprite.style.left) || 0;
//   let top = parseInt(sprite.style.top) || 0;
//   let newleft = left;
//   newtop = top;
//   switch (e.key) {
//     case "ArrowLeft":
//     case "q":
//       newleft = Math.max(0, left - moveBy);
//       break;

//     case "ArrowRight":
//     case "d":
//       newleft = Math.min(arena_size - grid_size, left + moveBy);
//       break;

//     case "ArrowUp":
//     case "z":
//       newtop = Math.max(0, top - moveBy);
//       break;

//     case "ArrowDown":
//     case "s":
//       newtop = Math.min(arena_size - grid_size, top + moveBy);
//       break;
//   }

//   if (!checkForCollision(newleft, newtop)) {
//     sprite.style.left = `${newleft}px`;
//     sprite.style.top = `${newtop}px`;
//   }
// });

export const initPlayerMovement = () => {
  const handleKeydown = (e) => {
    if (!gamepaused.paused) return;
    
    const left = parseInt(sprite.style.left) || 0;
    const top = parseInt(sprite.style.top) || 0;
    let newLeft = left;
    let newTop = top;

    switch (e.key) {
      case "ArrowLeft":
      case "q":
        newLeft = Math.max(0, left - moveBy);
        break;
      case "ArrowRight":
      case "d":
        newLeft = Math.min(arena_size - grid_size, left + moveBy);
        break;
      case "ArrowUp":
      case "z":
        newTop = Math.max(0, top - moveBy);
        break;
      case "ArrowDown":
      case "s":
        newTop = Math.min(arena_size - grid_size, top + moveBy);
        break;
    }

    if (!checkForCollision(newLeft, newTop)) {
      sprite.style.left = `${newLeft}px`;
      sprite.style.top = `${newTop}px`;
    }
  };

  window.addEventListener("keydown", handleKeydown);
  return () => window.removeEventListener("keydown", handleKeydown); // Cleanup!
};
