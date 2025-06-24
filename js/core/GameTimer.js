// Timer function for the game => GameTimer.js
let gametime = 180; // 3 minutes
const timerdisplay = document.querySelector("#chrono");

// const loseconditiontime = () => {
//   const timeinterval = setInterval(() => {
//     if (gamepaused) {
//       gametime--;
//       // FIXED Timer to show 0 in seconds
//       timerdisplay.textContent = `${Math.floor(gametime / 60)}:${String(
//         gametime % 60
//       ).padStart(2, "0")}`;
//       if (gametime <= 30) {
//         timerdisplay.classList.add("warning");
//       }
//       // If the player runs out of time, display a message and reload the game
//       if (gametime <= 0) {
//         clearInterval(timeinterval);
//         showDefeat();
//       }
//     }
//   }, 1000);
// };

import { gamepaused } from "../ui/UIManager.js";
import { showDefeat } from "../ui/LoseScreen.js";

export const loseconditiontime = () => {
  const timeinterval = setInterval(() => {
    if (gamepaused) {
      gametime--;

      // Formatting time
      const minutes = Math.floor(gametime / 60);
      const seconds = String(gametime % 60).padStart(2, "0");
      timerdisplay.textContent = `${minutes}:${seconds}`;

      // Add warning effect when time is running low
      if (gametime <= 30) {
        timerdisplay.classList.add("warning");
      }

      // Game over condition
      if (gametime <= 0) {
        clearInterval(timeinterval);
        showDefeat();
      }
    }
  }, 1000);
};
