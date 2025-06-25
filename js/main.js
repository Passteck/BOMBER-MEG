// main.js

import { initBombControls } from "../js/entities/Bomb.js";
import { initGameLoop } from "../js/core/GameLoop.js";
import { initPlayer } from "../js/player/Player.js";
import { initEnemies } from "../js/entities/Enemy.js";
import { initGameControls } from "../js/utils/input.js";
import { initWalls } from "./entities/Wall.js";
import { initUI } from "./ui/UIManager.js";
import { loseconditionhealth } from "./levels/LevelManager.js";

function initGame() {
  initPlayer(); 
  initEnemies();
  initBombControls();
  initGameControls(); 
  loseconditionhealth();
  initGameLoop(); 
  initWalls(); 
  initUI();
  console.log("Game started! ヾ(≧▽≦*)o");
}

initGame();
