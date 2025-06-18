document.addEventListener("keydown", function (e) {
  document.getElementById("output").innerHTML = "Vous avez pressé : " + e.key;
});

const cage = document.querySelector(".cage");
const sprite = document.querySelector(".sprite");
let moveBy = 20;
let boom = null;

// Position de base du joueur
window.addEventListener("load", () => {
  sprite.style.position = "absolute";
  sprite.style.left = "0px";
  sprite.style.top = "0px";
});

// Gestion des déplacements du joueur
window.addEventListener("keydown", (e) => {
  let left = parseInt(sprite.style.left) || 0;
  let top = parseInt(sprite.style.top) || 0;

  switch (e.key) {
    case "ArrowLeft":
      if (left <= 0) {
        left = 0;
      } else {
        left -= moveBy;
      }
      sprite.style.left = left + "px";
      break;

    case "ArrowRight":
      if (left >= 680) {
        left = 680;
      } else {
        left += moveBy;
      }
      sprite.style.left = left + "px";
      break;

    case "ArrowUp":
      if (top <= 0) {
        top = 0;
      } else {
        top -= moveBy;
      }
      sprite.style.top = top + "px";
      break;

    case "ArrowDown":
      if (top >= 680) {
        top = 680;
      } else {
        top += moveBy;
      }
      sprite.style.top = top + "px";
      break;
  }
});

// Gestion de la bombe
const placeBomb = () => {
  if (!boom) {
    boom = document.createElement("div");
    boom.className = "boom";
    const spriterect = sprite.getBoundingClientRect();
    const cagerect = cage.getBoundingClientRect();
    boom.style.position = "absolute";
    boom.style.left = `${spriterect.left - cagerect.left}px`;
    boom.style.top = `${spriterect.top - cagerect.top}px`;

    cage.appendChild(boom);

    setTimeout(() => {
      boom.remove();
      boom = null;
    }, 3000);
  }
};

// Ecouteur d'event pour la bombe

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    placeBomb();
    console.log((document.getElementById("output").innerHTML = "Boom"));
  }
});
