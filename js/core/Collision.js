// Collision => Collision.js

// const collisionElements = () => {
//   return {
//     bombs: document.querySelectorAll(".boom"),
//     enemies: document.querySelectorAll(".enemy, .enemy_2, .enemy_3, .enemy_4"),
//     walls: document.querySelectorAll(".wall"),
//   };
// };

// const checkForCollision = (x, y) => {
//   const { bombs, enemies, walls, keys } = collisionElements();

//   for (const bomb of bombs) {
//     if (
//       bomb.offsetLeft < x + playerSize &&
//       bomb.offsetLeft + bomb.offsetWidth > x &&
//       bomb.offsetTop < y + playerSize &&
//       bomb.offsetTop + bomb.offsetHeight > y
//     ) {
//       return true;
//     }
//   }

//   // BUG Doesn't work and lock player on his default position
//   // FIXED
//   for (let enemy of enemies) {
//     if (
//       enemy.offsetLeft < x + playerSize &&
//       enemy.offsetLeft + enemy.offsetWidth > x &&
//       enemy.offsetTop < y + playerSize &&
//       enemy.offsetTop + enemy.offsetHeight > y
//     ) {
//       return true;
//     }
//   }

//   for (const wall of walls) {
//     if (
//       wall.offsetLeft < x + playerSize &&
//       wall.offsetLeft + wall.offsetWidth > x &&
//       wall.offsetTop < y + playerSize &&
//       wall.offsetTop + wall.offsetHeight > y
//     ) {
//       return true;
//     }
//   }
//   return false;
// };

import { playerSize } from "../player/Player.js";

// Collision.js
export const collisionElements = () => ({
  bombs: document.querySelectorAll(".boom"),
  enemies: document.querySelectorAll(".enemy, .enemy_2, .enemy_3, .enemy_4"),
  walls: document.querySelectorAll(".wall"),
});

export const checkForCollision = (x, y) => {
  const { bombs, enemies, walls } = collisionElements();
  
  return [...bombs, ...enemies, ...walls].some(element => 
    element.offsetLeft < x + playerSize &&
    element.offsetLeft + element.offsetWidth > x &&
    element.offsetTop < y + playerSize &&
    element.offsetTop + element.offsetHeight > y
  );
};
