// Enemies => Enemy.js
import { grid_size, grid_steps } from "../core/GameConfig.js";
import { gamepaused } from "../ui/UIManager.js";

/**
 * Array of enemy type identifiers used in the game
 * @type {Array<string>}
 */
export const enemy_Types = ["enemy", "enemy_2", "enemy_3", "enemy_4"];

/**
 * Initial health value for all enemies (1 HP)
 * @type {number}
 */
export const enemy_Healt = 1; // All enemies start with 1 HP

/**
 * Movement interval for enemies in milliseconds (5000ms = 5s)
 * @type {number}
 */
export const move_Interval = 5000; // 5 seconds between teleports

/**
 * Map storing all active enemies with their DOM elements and health data
 * @type {Map<string, {element: HTMLElement, health: number}>}
 */
const enemies = new Map(); // Stores all enemy data { element, health }

/**
 * Generates random grid position for enemies
 * @returns {{left: string, top: string}} Position object with CSS px values
 */
const getRandomPosition = () => ({
  left: `${Math.floor(Math.random() * grid_steps) * grid_size}px`,
  top: `${Math.floor(Math.random() * grid_steps) * grid_size}px`,
});

/**
 * Initializes all enemies with random positions and starts movement interval
 * @returns {void}
 */
export const initEnemies = () => {
  enemy_Types.forEach((type) => {
    const element = document.querySelector(`.${type}`);
    if (!element) return;
    // Set initial random position
    const { left, top } = getRandomPosition();
    element.style.left = left;
    element.style.top = top;
    // Store in our enemies map
    enemies.set(type, { element, health: enemy_Healt });
  });
  // Start movement interval
  setInterval(moveEnemies, move_Interval);
};

/**
 * Moves all enemies to random positions when game isn't paused
 * @returns {void}
 */
const moveEnemies = () => {
  if (!gamepaused.paused) return;
  enemies.forEach(({ element }) => {
    const { left, top } = getRandomPosition();
    element.style.left = left;
    element.style.top = top;
  });
};

/**
 * Applies damage to an enemy and handles death/drops
 * @param {string} enemyType - The type identifier of enemy to damage
 * @returns {void}
 */
export const damageEnemy = (enemyType) => {
  const enemy = enemies.get(enemyType);
  if (!enemy) return;
  enemy.health--;
  if (enemy.health <= 0) {
    enemy.element.remove();
    enemies.delete(enemyType);
    // Special drop for enemy type 1
    if (enemyType === "enemy") {
      const x = parseInt(enemy.element.style.left);
      const y = parseInt(enemy.element.style.top);
      dropKey(x, y);
    }
  }
};
