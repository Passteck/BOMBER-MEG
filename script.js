document.addEventListener("keydown", function (e) {
  document.getElementById("output").innerHTML = "Vous avez pressé : " + e.key;
});

let sprite = document.querySelector(".sprite");
let moveBy = 20;

window.addEventListener("load", () => {
  sprite.style.position = "absolute";
  sprite.style.left = 0;
  sprite.style.top = 0;
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      sprite.style.left = parseInt(sprite.style.left) - moveBy + "px";
      break;
    case "ArrowRight":
      sprite.style.left = parseInt(sprite.style.left) + moveBy + "px";
      break;
    case "ArrowUp":
      sprite.style.top = parseInt(sprite.style.top) - moveBy + "px";
      break;
    case "ArrowDown":
      sprite.style.top = parseInt(sprite.style.top) + moveBy + "px";
      break;
  }
});
