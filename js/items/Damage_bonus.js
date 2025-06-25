import { cage } from "../core/GameState.js";
import { bombConfig } from "../entities/Bomb.js";
import { sprite, playerSize } from "../player/Player.js";

/**
 * Creates and drops a damage potion at specified coordinates
 * @param {number} x - The x-coordinate to drop potion at
 * @param {number} y - The y-coordinate to drop potion at
 * @returns {void}
 */
export const dropDamagePotion = (x, y) => {
  const potion = document.createElement("img");
  potion.className = "potion";
  potion.src = "../../assets/sprite/damage_potion.webp";
  potion.style.cssText = `
     position: absolute;
     left: ${x}px;
     top: ${y}px;
   `;
  cage.appendChild(potion);
  console.log(`Potion dropped at (${x}, ${y})`);
};

/**
 * Checks all potions for collision with player and applies damage boost on collision
 * @returns {void}
 */
export const potion_damageElements = () => {
  document.querySelectorAll(".potion").forEach((potion) => {
    if (isPotionColliding(potion, sprite)) {
      potion.remove();
      console.log("Potion collided with the player");
      bombConfig.damage++;
      console.log(`Potion damage increased to ${bombConfig.damage}`);
    }
  });
};

/**
 * Checks collision between potion element and player sprite
 * @param {HTMLElement} element - The potion DOM element
 * @param {HTMLElement} sprite - The player sprite element
 * @returns {boolean} True if collision detected, false otherwise
 */
const isPotionColliding = (element, sprite) =>
  element.offsetLeft < sprite.offsetLeft + playerSize &&
  element.offsetLeft + element.offsetWidth > sprite.offsetLeft &&
  element.offsetTop < sprite.offsetTop + playerSize &&
  element.offsetTop + element.offsetHeight > sprite.offsetTop;
