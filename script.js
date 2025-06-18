document.addEventListener("keydown", function (e) {
  document.getElementById("output").innerHTML = "Vous avez pressé : " + e.key;
});

const size = 20;

const cage = document.querySelector(".cage");
const sprite = document.querySelector(".sprite");
const enemy = document.querySelector(".enemy");
let moveBy = size;
let boom = null;

// Position de base du joueur
window.addEventListener("load", () => {
  sprite.style.position = "absolute";
  sprite.style.left = "0px";
  sprite.style.top = "0px";
});

window.addEventListener("load", () => {
  enemy.style.position = "absolute";
  enemy.style.left = "60px";
  enemy.style.top = "20px";
});

// Gestion des déplacements du joueur
window.addEventListener("keydown", (e) => {
  let left = parseInt(sprite.style.left) || 0;
  let top = parseInt(sprite.style.top) || 0;
  let newleft = left,
    newtop = top;

  switch (e.key) {
    case "ArrowLeft":
      newleft = Math.max(0, left - moveBy);
      break;

    case "ArrowRight":
      newleft = Math.min(680, left + moveBy);
      break;

    case "ArrowUp":
      newtop = Math.max(0, top - moveBy);
      break;

    case "ArrowDown":
      newtop = Math.min(680, top + moveBy);
      break;
  }

  if (!checkForCollision(newleft, newtop)) {
    sprite.style.left = `${newleft}px`;
    sprite.style.top = `${newtop}px`;
  }
});

// Gestion de la bombe
const placeBomb = () => {
  if (!boom) {
    boom = document.createElement("div");
    boom.className = "boom";
    const spriterect = sprite.getBoundingClientRect();
    const cagerect = cage.getBoundingClientRect();
    boom.style.position = "relative";
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

// Gestion des collision

const collisionElements = () => {
  return {
    bombs: document.querySelectorAll(".boom"),
    enemies: document.querySelectorAll(".enemy"),
  };
};

const checkForCollision = (x, y) => {
  const { bombs, enemies } = collisionElements();
  const playerSize = size;

  for (const bomb of bombs) {
    const bombarect = bomb.getBoundingClientRect();
    if (
      bomb.offsetLeft < x + playerSize &&
      bomb.offsetLeft + bomb.offsetWidth > x &&
      bomb.offsetTop < y + playerSize &&
      bomb.offsetTop + bomb.offsetHeight > y
    ) {
      return true;
    }
  }

  for (const enemy of enemies) {
    const enemyrect = enemy.getBoundingClientRect();
    if (
      enemy.offsetLeft < x + playerSize &&
      enemy.offsetLeft + enemy.offsetWidth > x &&
      enemy.offsetTop < y + playerSize &&
      enemy.offsetTop + enemy.offsetHeight > y
    ) {
      return true;
    }
  }
  return false;
};
