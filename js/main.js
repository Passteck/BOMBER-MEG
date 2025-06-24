// main.js
// ========== IMPORTS ========== //
import { initBombControls } from "../js/entities/Bomb.js";
import { initGameLoop } from "../js/core/GameLoop.js";
import { loseconditiontime } from "../js/core/GameTimer.js"; // Removed duplicate import!
import { initPlayer } from "../js/player/Player.js"; 
import { initEnemies } from "../js/entities/Enemy.js"; // Removed unused damageEnemy
import { initGameControls } from "../js/utils/input.js";

// ========== INITIALIZATION ========== //
function initGame() {
  initPlayer();          // 🎮 Player first!
  initEnemies();         // 👾 Enemies second!
  initBombControls();    // 💣 Bombs ready!
  initGameControls();    // ⏯️ Input handlers
  loseconditiontime();   // ⏱️ Start timer
  initGameLoop();        // 🔄 Start game loop
  
  console.log("Game started! ヾ(≧▽≦*)o");
}

initGame(); // Launch everything!