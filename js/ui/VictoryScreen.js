// WIN SCREEN => VictoryScreen.js

export function showVictory() {
  const victoryAlert = document.getElementById("victory-alert");
  victoryAlert.classList.remove("hidden");
  gamepaused = false;

  // FUTURE FEATURES: Add a next level button to the victory screen

  document.getElementById("victory-ok").onclick = () => {
    victoryAlert.classList.add("hidden");
    location.reload();
  };
}