// Future features treasure spawn => Treasure.js

import { grid_size } from "../core/GameConfig.js";
import { cage } from "../core/GameState.js"; 


// Treasure spawn function
export const chest = document.createElement("div");
chest.className = "chest";
chest.dataset.health = 3;
chest.style.left = Math.floor(Math.random() * 10) * grid_size + "px";
chest.style.top = Math.floor(5 + Math.random() * 10) * grid_size + "px";
cage.appendChild(chest);
