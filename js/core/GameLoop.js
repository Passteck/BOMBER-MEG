// Gameloop => GameLoop.js

// const gameloop = () => {
//   bombDisplay();
//   keysElements();
//   wincondition();
//   keydisplay();
//   loseconditionhealth();
//   updateMusicVolume();
//   updateVoiceVolume();
//   updateSFXVolume();
//   requestAnimationFrame(gameloop);
// };
// loseconditiontime();
// gameloop();

import { loseconditiontime } from "../core/GameTimer.js";
import { bombDisplay, keydisplay } from "../ui/UIManager.js"; 
import { keysElements } from "../items/Key.js";
import { wincondition, loseconditionhealth } from "../levels/LevelManager.js"; 
import { updateMusicVolume, updateVoiceVolume, updateSFXVolume } from "../utils/audio.js";



export const initGameLoop = () => {
  // Main game loop function
  const gameLoop = () => {
    // Game state updates
    bombDisplay();
    keysElements();
    wincondition();
    keydisplay();
    
    // Player conditions
    loseconditionhealth();
    
    // Audio updates
    updateMusicVolume();
    updateVoiceVolume();
    updateSFXVolume();
    
    // Keep the loop going
    requestAnimationFrame(gameLoop);
  };

  // Initial time-based lose condition check
  loseconditiontime();
  
  // Start the loop
  gameLoop();
}