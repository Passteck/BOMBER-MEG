// Enemies => Enemy.js

// const enemy = document.querySelector(".enemy");
// const enemytwo = document.querySelector(".enemy_2");
// const enemythree = document.querySelector(".enemy_3");
// const enemyfour = document.querySelector(".enemy_4");
// let enemyhealth = 1;
// let enemyhealth2 = 1;
// let enemyhealth3 = 1;
// let enemyhealth4 = 1;

// // Add a random spawn for enemy => Enemy.js
// const getrandomvalue = (max) => {
//   return Math.floor(Math.random() * max);
// };
// enemy.style.left = getrandomvalue(grid_steps) * grid_size + "px";
// enemy.style.top = getrandomvalue(grid_steps) * grid_size + "px";
// // enemy deux
// enemytwo.style.left = getrandomvalue(grid_steps) * grid_size + "px";
// enemytwo.style.top = getrandomvalue(grid_steps) * grid_size + "px";
// // enemy trois
// enemythree.style.left = getrandomvalue(grid_steps) * grid_size + "px";
// enemythree.style.top = getrandomvalue(grid_steps) * grid_size + "px";
// // enemyfour
// enemyfour.style.left = getrandomvalue(grid_steps) * grid_size + "px";
// enemyfour.style.top = getrandomvalue(grid_steps) * grid_size + "px";

// // Random movement for enemy => Enemy.js
// setInterval(() => {
//   if (!gamepaused) return;
//   enemy.style.left = getrandomvalue(grid_steps) * grid_size + "px";
//   enemy.style.top = getrandomvalue(grid_steps) * grid_size + "px";
//   // enemy deux
//   enemytwo.style.left = getrandomvalue(grid_steps) * grid_size + "px";
//   enemytwo.style.top = getrandomvalue(grid_steps) * grid_size + "px";
//   // enemy trois
//   enemythree.style.left = getrandomvalue(grid_steps) * grid_size + "px";
//   enemythree.style.top = getrandomvalue(grid_steps) * grid_size + "px";
//   // enemyfour
//   enemyfour.style.left = getrandomvalue(grid_steps) * grid_size + "px";
//   enemyfour.style.top = getrandomvalue(grid_steps) * grid_size + "px";
// }, 5000);

import { grid_size, grid_steps } from "../core/GameConfig.js";
import { gamepaused } from "../ui/UIManager.js";


// ========== CONFIG ========== //
export const enemy_Types = ["enemy", "enemy_2", "enemy_3", "enemy_4"];
export const enemy_Healt = 1; // All enemies start with 1 HP!
export const move_Interval = 5000; // 5 seconds between teleports

// ========== STATE ========== //
const enemies = new Map(); // Stores all enemy data! { element, health }

// ========== UTILITIES ========== //
const getRandomPosition = () => ({
  left: `${Math.floor(Math.random() * grid_steps) * grid_size}px`,
  top: `${Math.floor(Math.random() * grid_steps) * grid_size}px`
});

// ========== CORE FUNCTIONS ========== //
export const initEnemies = () => {
  enemy_Types.forEach(type => {
    const element = document.querySelector(`.${type}`);
    if (!element) return;

    // Set initial random position ✨
    const { left, top } = getRandomPosition();
    element.style.left = left;
    element.style.top = top;
    
    // Store in our enemies map!
    enemies.set(type, { element, health: enemy_Healt });
  });

  // Start movement interval
  setInterval(moveEnemies, move_Interval);
};

const moveEnemies = () => {
  if (gamepaused) return;
  enemies.forEach(({ element }) => {
    const { left, top } = getRandomPosition();
    element.style.left = left;
    element.style.top = top;
  });
};

// ========== DAMAGE HANDLING ========== //
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