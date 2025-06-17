document.addEventListener("keydown", function (e) {
  document.getElementById("output").innerHTML = "Vous avez pressé : " + e.key;
});

let sprite = document.querySelector(".sprite");
let moveBy = 20;

window.addEventListener("load", () => {
  sprite.style.position = "relative";
  sprite.style.left = 0;
  sprite.style.top = 0;
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (parseInt(sprite.style.left) == 0){
        sprite.style.top = parseInt(sprite.style.left) = 0 + "px";
      }
      else {
        sprite.style.left = parseInt(sprite.style.left) - moveBy + "px";
      }
      break;
    case "ArrowRight":
      if (parseInt(sprite.style.left) == 680){
        sprite.style.top = parseInt(sprite.style.left) = 0 + "px";
      }
      else {
        sprite.style.left = parseInt(sprite.style.left) + moveBy + "px";
      }
      break;
    case "ArrowUp":
      if (parseInt(sprite.style.top) == 0){
        sprite.style.top = parseInt(sprite.style.top) = 700 + "px";
      }
      else {
        sprite.style.top = parseInt(sprite.style.top) - moveBy + "px";
      }
      break;
    case "ArrowDown":
      if (parseInt(sprite.style.top) == 680){
        sprite.style.top = parseInt(sprite.style.top) = 0 + "px";
      }
      else {
        sprite.style.top = parseInt(sprite.style.top) + moveBy + "px";
      }
      break;
  }
});


