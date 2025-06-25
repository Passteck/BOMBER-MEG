// Collision => Collision.js

import { playerSize } from "../player/Player.js";

// Collision.js
export const collisionElements = () => ({
  bombs: document.querySelectorAll(".boom"),
  enemies: document.querySelectorAll(".enemy, .enemy_2, .enemy_3, .enemy_4"),
  walls: document.querySelectorAll(".wall"),
});

export const checkForCollision = (x, y) => {
  const { bombs, enemies, walls } = collisionElements();

  return [...bombs, ...enemies, ...walls].some(
    (element) =>
      element.offsetLeft < x + playerSize &&
      element.offsetLeft + element.offsetWidth > x &&
      element.offsetTop < y + playerSize &&
      element.offsetTop + element.offsetHeight > y
  );
};
