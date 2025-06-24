// Timer function for the game => GameTimer.js
let gametime = 180; // 3 minutes
const timerdisplay = document.querySelector("#chrono");

export const loseconditiontime = () => {
  const timeinterval = setInterval(() => {
    if (gamepaused.paused) {
      gametime-=1;
      // FIXED Timer to show 0 in seconds
      timerdisplay.textContent = `${Math.floor(gametime / 60)}:${String(
        gametime % 60
      ).padStart(2, "0")}`;
      if (gametime <= 30) {
        timerdisplay.classList.add("warning");
      }
      // If the player runs out of time, display a message and reload the game
      if (gametime <= 0) {
        clearInterval(timeinterval);
        showDefeat();
      }
    }
  }, 1000);
};

import { gamepaused } from "../ui/UIManager.js";
import { showDefeat } from "../ui/LoseScreen.js";
