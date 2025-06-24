// LOSE SCREEN => LoseScreen.js

export function showDefeat() {
  const defeatAlert = document.getElementById("defeat-alert");
  defeatAlert.classList.remove("hidden");
  gamepaused = false;

  document.getElementById("defeat-retry").onclick = () => {
    defeatAlert.classList.add("hidden");
    location.reload();
  };
}