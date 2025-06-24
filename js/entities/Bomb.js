// Bomb function => Bomb.js

// let boom;
// let canplacebomb = true;
// const bombcooldown = 6000;
// const bomb_damage = 1;
// const placeBomb = () => {
//   if (!gamepaused) return;
//   if (canplacebomb && !boom) {
//     canplacebomb = false;

//     boom = document.createElement("div");
//     boom.className = "boom";
//     boom.style.position = "relative";
//     boom.style.left = `${sprite.offsetLeft}px`;
//     boom.style.top = `${sprite.offsetTop}px`;
//     cage.appendChild(boom);

//     // Bomb cooldown
//     setTimeout(() => (canplacebomb = true), bombcooldown);

//     // Bomb explosion
//     const spawnExplode = () => {
//       const meg = document.createElement("div");
//       meg.className = "explosion";
//       const blastSize = grid_size * boom.dataset.range * 3;

//       meg.style.width = `${blastSize}px`;
//       meg.style.height = `${blastSize}px`;
//       const boomX = parseInt(boom.style.left);
//       const boomY = parseInt(boom.style.top);
//       meg.style.position = "absolute";
//       meg.style.left = `${boomX - (blastSize / 2 - grid_size / 2)}px`;
//       meg.style.top = `${boomY - (blastSize / 2 - grid_size / 2)}px`;
//       cage.appendChild(meg);
//       setTimeout(() => meg.remove(), 1000);

//       // Display a sound for the bomb explosion
//       const explosionsound = document.getElementById("boom");
//       explosionsound.currentTime = 0;
//       explosionsound.play();
//     };

//     // Add damage for walls
//     boom.dataset.range = 1;

//     const explode = (boom) => {
//       const boomX = parseInt(boom.style.left);
//       const boomY = parseInt(boom.style.top);
//       const walls = document.querySelectorAll(".wall");
//       for (let wall of walls) {
//         const wallX = parseInt(wall.style.left);
//         const wallY = parseInt(wall.style.top);
//         if (
//           Math.abs(wallX - boomX) <= grid_size * boom.dataset.range &&
//           Math.abs(wallY - boomY) <= grid_size * boom.dataset.range
//         ) {
//           wall.dataset.health -= bomb_damage;
//           if (wall.dataset.health <= 0) {
//             setTimeout(() => wall.remove(), 500);
//           }
//         }
//       }

//       // Add damage to the player

//       const spriteDamage = () => {
//         spritehealth -= bomb_damage;
//         healthDisplay();
//         sprite.classList.add("sprite_hit");
//         setTimeout(() => sprite.classList.remove("sprite_hit"), 2000);
//         if (spritehealth <= 0) {
//           sprite.remove();
//           console.log("GAME OVER");
//         }
//       };
//       const spriteX = parseInt(sprite.style.left);
//       const spriteY = parseInt(sprite.style.top);
//       if (
//         Math.abs(spriteX - boomX) <= grid_size * boom.dataset.range &&
//         Math.abs(spriteY - boomY) <= grid_size * boom.dataset.range
//       ) {
//         spriteDamage();
//       }

//       // Add damage to enemies
//       const enemyDamage = () => {
//         enemyhealth -= bomb_damage;
//         if (enemyhealth <= 0) {
//           dropKey(enemyX, enemyY);
//           enemy.remove();
//           console.log("ENEMY ONE KILLED");
//         }
//       };
//       const enemyTwoDamage = () => {
//         enemyhealth2 -= bomb_damage;
//         if (enemyhealth2 <= 0) {
//           enemytwo.remove();
//           console.log("ENEMY TWO KILLED");
//         }
//       };
//       const enemyThreeDamage = () => {
//         enemyhealth3 -= bomb_damage;
//         if (enemyhealth3 <= 0) {
//           enemythree.remove();
//           console.log("ENEMY THREE KILLED");
//         }
//       };
//       const enemyFourDamage = () => {
//         enemyhealth4 -= bomb_damage;
//         if (enemyhealth4 <= 0) {
//           enemyfour.remove();
//           console.log("ENEMY FOUR KILLED");
//         }
//       };

//       const enemyX = parseInt(enemy.style.left);
//       const enemyY = parseInt(enemy.style.top);
//       const enemyX2 = parseInt(enemytwo.style.left);
//       const enemyY2 = parseInt(enemytwo.style.top);
//       const enemyX3 = parseInt(enemythree.style.left);
//       const enemyY3 = parseInt(enemythree.style.top);
//       const enemyX4 = parseInt(enemyfour.style.left);
//       const enemyY4 = parseInt(enemyfour.style.top);
//       if (
//         Math.abs(enemyX - boomX) <= grid_size * boom.dataset.range &&
//         Math.abs(enemyY - boomY) <= grid_size * boom.dataset.range
//       ) {
//         enemyDamage();
//       } else if (
//         Math.abs(enemyX2 - boomX) <= grid_size * boom.dataset.range &&
//         Math.abs(enemyY2 - boomY) <= grid_size * boom.dataset.range
//       ) {
//         enemyTwoDamage();
//       } else if (
//         Math.abs(enemyX3 - boomX) <= grid_size * boom.dataset.range &&
//         Math.abs(enemyY3 - boomY) <= grid_size * boom.dataset.range
//       ) {
//         enemyThreeDamage();
//       } else if (
//         Math.abs(enemyX4 - boomX) <= grid_size * boom.dataset.range &&
//         Math.abs(enemyY4 - boomY) <= grid_size * boom.dataset.range
//       ) {
//         enemyFourDamage();
//       }
//     };

//     setTimeout(() => {
//       spawnExplode();
//       explode(boom);
//       cage.style.animation = "shake 0.1s linear infinite";
//       setTimeout(() => (cage.style.animation = ""), 500);
//       boom.remove();
//       boom = null;
//     }, 1500);
//   }
// };

// // Event listener to drop a bomb => Bomb.js
// document.addEventListener("keydown", (e) => {
//   if (e.key === " " && !boom && canplacebomb) {
//     e.preventDefault();
//     placeBomb();
//     // Display a sound when a bomb is dropped
//     const megsound = document.getElementById("explosiiion");
//     megsound.currentTime = 0;
//     megsound.play();
//   }
// });


import { gamepaused } from "../ui/UIManager.js";
import { sprite } from "../player/Player.js";
import { cage } from "../core/GameState.js";
import { grid_size } from "../core/GameConfig.js";
import { dropKey } from "../items/Key.js";
import { spritehealth } from "../player/Player.js";
import { healthDisplay } from "../ui/UIManager.js";

// ========== CONFIG ========== //
export const bombConfig = {
  cooldown: 6000,
  damage: 1,
  blastMultiplier: 3,
  explosionDelay: 1500,
  shakeDuration: 500
};

// ========== STATE ========== //
let boom = null;
export let canPlaceBomb = true;
const explosionSound = document.getElementById("boom");
const placeSound = document.getElementById("explosiiion");

// ========== CORE FUNCTIONS ========== //
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

const damageEntitiesInRadius = (boomX, boomY, range) => {
  // Damage walls
  document.querySelectorAll(".wall").forEach(wall => {
    const wallX = parseInt(wall.style.left);
    const wallY = parseInt(wall.style.top);
    if (Math.abs(wallX - boomX) <= grid_size * range && 
        Math.abs(wallY - boomY) <= grid_size * range) {
      wall.dataset.health -= bombConfig.damage;
      if (wall.dataset.health <= 0) setTimeout(() => wall.remove(), 500);
    }
  });

  // Damage player
  const playerX = parseInt(sprite.style.left);
  const playerY = parseInt(sprite.style.top);
  if (Math.abs(playerX - boomX) <= grid_size * range && 
      Math.abs(playerY - boomY) <= grid_size * range) {
    spritehealth.health -= bombConfig.damage;
    healthDisplay();
    sprite.classList.add("sprite_hit");
    setTimeout(() => sprite.classList.remove("sprite_hit"), 2000);
    if (spritehealth.health <= 0) sprite.remove();
  }

  // Damage enemies
  ["enemy", "enemy_2", "enemy_3", "enemy_4"].forEach(enemyClass => {
    const enemy = document.querySelector(`.${enemyClass}`);
    if (!enemy) return;
    
    const enemyX = parseInt(enemy.style.left);
    const enemyY = parseInt(enemy.style.top);
    if (Math.abs(enemyX - boomX) <= grid_size * range && 
        Math.abs(enemyY - boomY) <= grid_size * range) {
      enemy.remove();
      if (enemyClass === "enemy") dropKey(enemyX, enemyY);
    }
  });
};

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

  setTimeout(() => canPlaceBomb = true, bombConfig.cooldown);
  placeSound.currentTime = 0;
  placeSound.play();

  setTimeout(() => {
    if (!boom) return;
    const boomX = parseInt(boom.style.left);
    const boomY = parseInt(boom.style.top);
    
    createExplosion(boomX, boomY, boom.dataset.range);
    damageEntitiesInRadius(boomX, boomY, boom.dataset.range);
    
    cage.style.animation = "shake 0.1s linear infinite";
    setTimeout(() => cage.style.animation = "", bombConfig.shakeDuration);
    boom.remove();
    boom = null;
  }, bombConfig.explosionDelay);
};

// ========== INIT ========== //
export const initBombControls = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === " " && !boom && canPlaceBomb) {
      e.preventDefault();
      placeBomb();
    }
  });
};