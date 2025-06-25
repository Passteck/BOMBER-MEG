import { gamepaused } from "../ui/UIManager.js";
import { sprite } from "../player/Player.js";
import { cage } from "../core/GameState.js";
import { grid_size } from "../core/GameConfig.js";
import { dropKey } from "../items/Key.js";
import { spritehealth } from "../player/Player.js";
import { healthDisplay } from "../ui/UIManager.js";
import { dropDamagePotion } from "../items/Damage_bonus.js";

/**
 * Configuration object for bomb behavior
 * @property {number} cooldown - Time (ms) between bomb placements (6000ms = 6s)
 * @property {number} damage - Base damage dealt by explosions
 * @property {number} blastMultiplier - Scaling factor for explosion radius (3x grid_size)
 * @property {number} explosionDelay - Delay (ms) before detonation (1500ms = 1.5s)
 * @property {number} shakeDuration - Screen shake duration (ms) during explosion (500ms)
 */
export const bombConfig = {
  cooldown: 6000,
  damage: 1,
  blastMultiplier: 3,
  explosionDelay: 1500,
  shakeDuration: 500,
};

/** @type {HTMLElement|null} Active bomb DOM element */
let boom = null;

/** @type {boolean} Flag indicating if player can place new bombs */
export let canPlaceBomb = true;

// Audio elements
const explosionSound = document.getElementById("boom");
const placeSound = document.getElementById("explosiiion");

/**
 * Creates visual explosion effect at specified coordinates
 * @param {number} x - Center X-coordinate of explosion
 * @param {number} y - Center Y-coordinate of explosion
 * @param {number} range - Base blast radius multiplier
 * @returns {void}
 */
const createExplosion = (x, y, range) => {
  const explosion = document.createElement("div");
  explosion.className = "explosion";
  const blastSize = grid_size * range * bombConfig.blastMultiplier;

  explosion.style.cssText = `
    width: ${blastSize}px;
    height: ${blastSize}px;
    left: ${x - (blastSize / 2 - grid_size / 2)}px;
    top: ${y - (blastSize / 2 - grid_size / 2)}px;
    position: absolute;
  `;

  cage.appendChild(explosion);
  setTimeout(() => explosion.remove(), 1000);
  explosionSound.currentTime = 0;
  explosionSound.play();
};

/**
 * Damages all entities within explosion radius
 * @param {number} boomX - Bomb's X-coordinate
 * @param {number} boomY - Bomb's Y-coordinate
 * @param {number} range - Damage radius multiplier
 * @returns {void}
 */
const damageEntitiesInRadius = (boomX, boomY, range) => {
  // Damage walls
  document.querySelectorAll(".wall").forEach((wall) => {
    const wallX = parseInt(wall.style.left);
    const wallY = parseInt(wall.style.top);
    if (
      Math.abs(wallX - boomX) <= grid_size * range &&
      Math.abs(wallY - boomY) <= grid_size * range
    ) {
      wall.dataset.health -= bombConfig.damage;
      if (wall.dataset.health <= 0) setTimeout(() => wall.remove(), 500);
    }
  });

  // Damage chests (with special drops)
  document.querySelectorAll(".chest").forEach((chest) => {
    const chestX = parseInt(chest.style.left);
    const chestY = parseInt(chest.style.top);
    if (
      Math.abs(chestX - boomX) <= grid_size * range &&
      Math.abs(chestY - boomY) <= grid_size * range
    ) {
      chest.dataset.health -= bombConfig.damage;
      chest.classList.add("sprite_hit");
      setTimeout(() => chest.classList.remove("sprite_hit"), 2000);

      if (chest.dataset.health <= 0) {
        dropDamagePotion(chestX, chestY); // Spawn damage potion
        setTimeout(() => chest.remove(), 500);
      }
    }
  });

  // Damage player
  const playerX = parseInt(sprite.style.left);
  const playerY = parseInt(sprite.style.top);
  if (
    Math.abs(playerX - boomX) <= grid_size * range &&
    Math.abs(playerY - boomY) <= grid_size * range
  ) {
    spritehealth.health -= bombConfig.damage;
    healthDisplay(); // Update UI
    sprite.classList.add("sprite_hit"); // Visual feedback
    setTimeout(() => sprite.classList.remove("sprite_hit"), 2000);
    if (spritehealth.health <= 0) sprite.remove(); // Game over
  }

  // Damage enemies (with special drops for type 1)
  ["enemy", "enemy_2", "enemy_3", "enemy_4"].forEach((enemyClass) => {
    const enemy = document.querySelector(`.${enemyClass}`);
    if (!enemy) return;

    const enemyX = parseInt(enemy.style.left);
    const enemyY = parseInt(enemy.style.top);
    if (
      Math.abs(enemyX - boomX) <= grid_size * range &&
      Math.abs(enemyY - boomY) <= grid_size * range
    ) {
      enemy.remove();
      if (enemyClass === "enemy") dropKey(enemyX, enemyY); // Key drop
    }
  });
};

/**
 * Places a bomb at player's current position
 * Triggers:
 * - Visual bomb placement
 * - Cooldown timer
 * - Delayed explosion
 * @returns {void}
 */
export const placeBomb = () => {
  if (!gamepaused.paused || !canPlaceBomb || boom) return;

  canPlaceBomb = false;
  boom = document.createElement("div");
  boom.className = "boom";
  boom.style.cssText = `
    position: relative;
    left: ${sprite.offsetLeft}px;
    top: ${sprite.offsetTop}px;
  `;
  boom.dataset.range = 1;
  cage.appendChild(boom);

  setTimeout(() => (canPlaceBomb = true), bombConfig.cooldown);
  placeSound.currentTime = 0;
  placeSound.play();

  setTimeout(() => {
    if (!boom) return;
    const boomX = parseInt(boom.style.left);
    const boomY = parseInt(boom.style.top);

    // Explosion sequence
    createExplosion(boomX, boomY, boom.dataset.range);
    damageEntitiesInRadius(boomX, boomY, boom.dataset.range);
    cage.style.animation = "shake 0.1s linear infinite";
    setTimeout(() => (cage.style.animation = ""), bombConfig.shakeDuration);

    boom.remove();
    boom = null;
  }, bombConfig.explosionDelay);
};

/**
 * Initializes spacebar key binding for bomb placement
 * @returns {void}
 */
export const initBombControls = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === " " && !boom && canPlaceBomb) {
      e.preventDefault();
      placeBomb();
    }
  });
};
