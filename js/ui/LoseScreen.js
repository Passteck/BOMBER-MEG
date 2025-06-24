// LOSE SCREEN => LoseScreen.js

import { gamepaused } from "../ui/UIManager.js";

export function showDefeat() {
  const defeatAlert = document.getElementById("defeat-alert");
  defeatAlert.classList.remove("hidden");
  gamepaused.paused = false;

  document.getElementById("defeat-retry").onclick = () => {
    defeatAlert.classList.add("hidden");
    location.reload();
  };
}