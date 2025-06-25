// => Player.js
import { grid_size, arena_size } from "../core/GameConfig.js";
import { gamepaused } from "../ui/UIManager.js";
import { checkForCollision } from "../core/Collision.js";

/**
 * Movement increment in pixels based on grid size
 * @type {number}
 */
let moveBy = grid_size;

/**
 * Player sprite size in pixels
 * @type {number}
 */
export const playerSize = 50;

/**
 * Maximum health value for the player
 * @type {number}
 */
export const maxHealth = 3;

/**
 * Object tracking the player's current health status
 * @type {{health: number}}
 */
export let spritehealth = {
  health: maxHealth,
};

/**
 * DOM element representing the player sprite
 * @type {HTMLElement}
 */
export const sprite = document.querySelector(".sprite");

/**
 * Initializes the player with default position and movement controls
 * @returns {void}
 */
export const initPlayer = () => {
  // Load a default position for player => Player.js
  sprite.style.position = "absolute";
  sprite.style.left = "0px";
  sprite.style.top = "0px";
  sprite.dataset.health = maxHealth;
  initPlayerMovement();
};

/**
 * Sets up keyboard controls for player movement with collision detection
 * @returns {Function} Cleanup function to remove event listeners
 */
export const initPlayerMovement = () => {
  /**
   * Handles keyboard input for player movement
   * @param {KeyboardEvent} e - The keydown event
   */
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
  return () => window.removeEventListener("keydown", handleKeydown);
};
