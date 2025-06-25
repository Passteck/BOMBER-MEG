// Gameloop => GameLoop.js
import { loseconditiontime } from "../core/GameTimer.js";
import { bombDisplay, keydisplay } from "../ui/UIManager.js";
import { keysElements } from "../items/Key.js";
import { wincondition, loseconditionhealth } from "../levels/LevelManager.js";
import {
  updateMusicVolume,
  updateVoiceVolume,
  updateSFXVolume,
} from "../utils/audio.js";
import { potion_damageElements } from "../items/Damage_bonus.js";

/**
 * Initializes and runs the main game loop that updates game state every frame
 * Handles:
 * - UI updates (bombs, keys)
 * - Win/lose conditions
 * - Audio volume updates
 * - Damage potion effects
 * @returns {void}
 */
export const initGameLoop = () => {
  /**
   * The core game loop function that runs every animation frame
   * @returns {void}
   */
  const gameLoop = () => {
    // Update bomb display
    bombDisplay();
    // Update key display
    keysElements();
    // Check win condition
    wincondition();
    // Update key UI
    keydisplay();
    // Update damage potion effects
    potion_damageElements();
    // Check health-based lose condition
    loseconditionhealth();

    // Update audio volumes
    updateMusicVolume();
    updateVoiceVolume();
    updateSFXVolume();

    // Continue the loop
    requestAnimationFrame(gameLoop);
  };

  // Check time-based lose condition
  loseconditiontime();

  // Start the game loop
  gameLoop();
};
