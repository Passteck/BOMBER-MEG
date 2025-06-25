import { door } from "../levels/LevelManager.js"
import { grid_size } from "../core/GameConfig.js";
import { cage } from "../core/GameState.js";
import { chest } from "../entities/Treasure.js"

// Wall random generation => Wall.js
export const initWalls = () => {
  window.addEventListener("load", () => {
    const doorX = parseInt(door.style.left);
    const doorY = parseInt(door.style.top);
    const chestX = parseInt(chest.style.left);
    const chestY = parseInt(chest.style.top);

    for (let i = 0; i < 380; i++) {
      // X and Y coordinates
      const x = Math.floor(Math.random() * 16) * grid_size;
      const y = Math.floor(1 + Math.random() * 15) * grid_size;
      // Check if wall overlaps with door
      const isOnDoor =
        x < doorX + grid_size &&
        x + grid_size > doorX &&
        y < doorY + grid_size &&
        y + grid_size > doorY;

      const isOnChest = 
       x < chestX + grid_size &&
        x + grid_size > chestX &&
        y < chestY + grid_size &&
        y + grid_size > chestY;
        
      // Create a wall only if it doesn't overlap with door
      if (!isOnDoor && !isOnChest) {
        const wall = document.createElement("div");
        wall.className = "wall";
        wall.style.left = `${x}px`;
        wall.style.top = `${y}px`;
        wall.dataset.health = 2;
        cage.appendChild(wall);
      } else {
        i--;
      }
    }
  });
};