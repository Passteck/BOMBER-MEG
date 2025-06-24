// Start game => input.js

// window.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && gamepaused === false) {
//     gamepaused = true;
//     gamescreen.classList.remove("hidden");
//     menuscreen.classList.add("hidden");
//     pausescreen.classList.add("hidden");
//     startGameMusic();
//   }
// });

// // Paused game => input.js
// window.addEventListener("keydown", (e) => {
//   if (e.key === "Escape" && gamepaused === true) {
//     gamepaused = false;
//     pausescreen.classList.remove("hidden");
//   }
// });

// resume.addEventListener("click", () => {
//   if (gamepaused === false) {
//     gamepaused = true;
//     pausescreen.classList.add("hidden");
//   }
// });

// menubtn.addEventListener("click", () => {
//   if (gamepaused === false) {
//     location.reload();
//   }
// });

// settings.addEventListener("click", () => {
//   if (gamepaused === false) {
//     settingsscreen.classList.remove("hidden");
//     pausescreen.classList.add("hidden");
//   }
// });

// backbtn.addEventListener("click", () => {
//   if (gamepaused === false) {
//     settingsscreen.classList.add("hidden");
//     pausescreen.classList.remove("hidden");
//   }
// });

import { gamepaused } from "../ui/UIManager.js";
import { startGameMusic } from "../utils/audio.js";


// ========== GAME STATE CONTROL ========== //
export const initGameControls = () => {
  // Start/Pause Game
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !gamepaused.paused) {
      startGame();
    } 
    else if (e.key === "Escape" && gamepaused.paused) {
      pauseGame();
    }
  });

  // Button Listeners
  resume.addEventListener("click", resumeGame);
  menubtn.addEventListener("click", reloadGame);
  settings.addEventListener("click", openSettings);
  backbtn.addEventListener("click", closeSettings);
};

// ========== CONTROL FUNCTIONS ========== //
const startGame = () => {
  gamepaused.paused = true;
  gamescreen.classList.remove("hidden");
  menuscreen.classList.add("hidden");
  pausescreen.classList.add("hidden");
  startGameMusic();
};

const pauseGame = () => {
  gamepaused.paused = false;
  pausescreen.classList.remove("hidden");
};

const resumeGame = () => {
  if (!gamepaused.paused) {
    gamepaused.paused = true;
    pausescreen.classList.add("hidden");
  }
};

const reloadGame = () => {
  if (!gamepaused.paused) location.reload();
};

const openSettings = () => {
  if (!gamepaused.paused) {
    settingsscreen.classList.remove("hidden");
    pausescreen.classList.add("hidden");
  }
};

const closeSettings = () => {
  if (!gamepaused.paused) {
    settingsscreen.classList.add("hidden");
    pausescreen.classList.remove("hidden");
  }
};

// In Input.js
console.log("Current pause state:", gamepaused.paused);

// Temporary debug in Input.js
console.log("Input module loaded!");
document.addEventListener("keydown", (e) => {
  console.log(`Pressed: ${e.key} | GamePaused: ${gamepaused.paused}`);
});