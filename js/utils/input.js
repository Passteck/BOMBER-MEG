import { gamepaused } from "../ui/UIManager.js";
import { startGameMusic } from "../utils/audio.js";

/**
 * Initializes all game control handlers including keyboard and UI inputs
 * Sets up:
 * - Enter key to start game
 * - Escape key to pause game
 * - Resume button click handler
 * - Menu button click handler
 * - Settings button click handler
 * - Back button click handler
 * @returns {void}
 */
export const initGameControls = () => {
  window.addEventListener("keydown", (enter) => {
    if (
      enter.key === "Enter" &&
      !gamepaused.paused &&
      pausescreen.classList.contains("hidden")
    ) {
      startGame();
    } else if (enter.key === "Escape" && gamepaused.paused) {
      pauseGame();
    }
  });

  resume.addEventListener("click", resumeGame);
  menubtn.addEventListener("click", reloadGame);
  settings.addEventListener("click", openSettings);
  backbtn.addEventListener("click", closeSettings);
};

/**
 * Starts the game by:
 * - Setting game state to paused (active)
 * - Hiding menu screen
 * - Showing game screen
 * - Starting game music
 * @returns {void}
 */
const startGame = () => {
  gamepaused.paused = true;
  gamescreen.classList.remove("hidden");
  menuscreen.classList.add("hidden");
  startGameMusic();
};

/**
 * Pauses the game by:
 * - Setting game state to unpaused (inactive)
 * - Showing pause screen
 * @returns {void}
 */
const pauseGame = () => {
  gamepaused.paused = false;
  pausescreen.classList.remove("hidden");
};

/**
 * Resumes the game from pause state by:
 * - Setting game state to paused (active)
 * - Hiding pause screen
 * @returns {void}
 */
const resumeGame = () => {
  if (!gamepaused.paused) {
    gamepaused.paused = true;
    pausescreen.classList.add("hidden");
  }
};

/**
 * Reloads the game completely by refreshing the page
 * Only works when game is not paused
 * @returns {void}
 */
const reloadGame = () => {
  if (!gamepaused.paused) location.reload();
};

/**
 * Opens settings menu by:
 * - Hiding pause screen
 * - Showing settings screen
 * Only works when game is not paused
 * @returns {void}
 */
const openSettings = () => {
  if (!gamepaused.paused) {
    settingsscreen.classList.remove("hidden");
    pausescreen.classList.add("hidden");
  }
};

/**
 * Closes settings menu by:
 * - Hiding settings screen
 * - Showing pause screen
 * Only works when game is not paused
 * @returns {void}
 */
const closeSettings = () => {
  if (!gamepaused.paused) {
    settingsscreen.classList.add("hidden");
    pausescreen.classList.remove("hidden");
  }
};

// Debug logging
console.log("Input module loaded!");
document.addEventListener("keydown", (e) => {
  console.log(`Pressed: ${e.key} | GamePaused: ${gamepaused.paused}`);
});
