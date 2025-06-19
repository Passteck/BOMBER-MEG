document.addEventListener("keydown", function (e) {
  document.getElementById("output").innerHTML = "Vous avez pressé : " + e.key;
});

const size = 30;
const cagesize = 690;
const grid_steps = cagesize / size;
const cage = document.querySelector(".cage");
const sprite = document.querySelector(".sprite");
const enemy = document.querySelector(".enemy");
const enemytwo = document.querySelector(".enemy_2");
const enemythree = document.querySelector(".enemy_3");
const enemyfour = document.querySelector(".enemy_4");
let moveBy = size;
let boom = null;

// Position de base du joueur
window.addEventListener("load", () => {
  sprite.style.position = "absolute";
  sprite.style.left = "0px";
  sprite.style.top = "0px";
});

// Ajout de spawn aleatoire pour l'ennemis
const getrandomvalue = (max) => {
  return Math.floor(Math.random() * max);
};
window.addEventListener("load", () => {
  enemy.style.left = getrandomvalue(grid_steps) * size + "px";
  enemy.style.top = getrandomvalue(grid_steps) * size + "px";
  // enemy deux
  enemytwo.style.left = getrandomvalue(grid_steps) * size + "px";
  enemytwo.style.top = getrandomvalue(grid_steps) * size + "px";
  // enemy trois
  enemythree.style.left = getrandomvalue(grid_steps) * size + "px";
  enemythree.style.top = getrandomvalue(grid_steps) * size + "px";
  // enemyfour
  enemyfour.style.left = getrandomvalue(grid_steps) * size + "px";
  enemyfour.style.top = getrandomvalue(grid_steps) * size + "px";
});

// Mouvement aléatoire des ennemis

setInterval(() => {
  enemy.style.left = getrandomvalue(grid_steps) * size + "px";
  enemy.style.top = getrandomvalue(grid_steps) * size + "px";
  // enemy deux
  enemytwo.style.left = getrandomvalue(grid_steps) * size + "px";
  enemytwo.style.top = getrandomvalue(grid_steps) * size + "px";
  // enemy trois
  enemythree.style.left = getrandomvalue(grid_steps) * size + "px";
  enemythree.style.top = getrandomvalue(grid_steps) * size + "px";
  // enemyfour
  enemyfour.style.left = getrandomvalue(grid_steps) * size + "px";
  enemyfour.style.top = getrandomvalue(grid_steps) * size + "px";
}, 2000);

//

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
      newleft = Math.min(660, left + moveBy);
      break;

    case "ArrowUp":
      newtop = Math.max(0, top - moveBy);
      break;

    case "ArrowDown":
      newtop = Math.min(660, top + moveBy);
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
    boom.style.left = `${spriterect.left - cagerect.left - 1}px`;
    boom.style.top = `${spriterect.top - cagerect.top - 1}px`;
    cage.appendChild(boom);

    const spawnExplode = () => {
      const megumin = document.createElement("div");
      megumin.className = "explosion";
      const blastSize = size * boom.dataset.range * 3;

      megumin.style.width = `${blastSize}px`;
      megumin.style.height = `${blastSize}px`;
      const boomX = parseInt(boom.style.left);
      const boomY = parseInt(boom.style.top);
      // const megurect = boom.getBoundingClientRect();
      // megumin.style.position = "relative";
      // megumin.style.left = `${megurect.left - cagerect.left}px`;
      // megumin.style.top = `${megurect.top - cagerect.top}px`;
      megumin.style.position = "absolute";
      megumin.style.left = `${boomX - (blastSize / 2 - size / 2)}px`; // Proper centering
      megumin.style.top = `${boomY - (blastSize / 2 - size / 2)}px`;
      cage.appendChild(megumin);
      setTimeout(() => megumin.remove(), 500);
    };

    // Ajout de dommage aux bombs
    // boom.dataset.damage = 2;
    boom.dataset.range = 1;

    const explode = (boom) => {
      // remplir la fonction pour la destrution
      const boomX = parseInt(boom.style.left);
      const boomY = parseInt(boom.style.top);
      const walls = document.querySelectorAll(".wall");
      for (let wall of walls) {
        const wallX = parseInt(wall.style.left);
        const wallY = parseInt(wall.style.top);
        if (
          Math.abs(wallX - boomX) <= size * boom.dataset.range &&
          Math.abs(wallY - boomY) <= size * boom.dataset.range
        ) {
          wall.dataset.health -= 2;
          if (wall.dataset.health <= 0) {
            wall.remove();
          }
        }
      }
    };

    setTimeout(() => {
      spawnExplode();
      explode(boom);
      boom.remove();
      boom = null;
    }, 1000);
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

// Génération de murs
window.addEventListener("load", () => {
  for (let i = 0; i < 900; i++) {
    const wall = document.createElement("div");
    wall.className = "wall";
    wall.dataset.health = 2;
    wall.style.left = `${Math.floor(Math.random() * 25) * 30}px`;
    wall.style.top = `${Math.floor(1 + Math.random() * 25) * 30}px`;
    cage.appendChild(wall);
  }
});

// Gestion des collision

const collisionElements = () => {
  return {
    bombs: document.querySelectorAll(".boom"),
    // enemies: document.querySelector(".enemy", ".enemytwo", ".enemythree", ".enemyfour"),
    walls: document.querySelectorAll(".wall"),
  };
};

const checkForCollision = (x, y) => {
  const { bombs, walls } = collisionElements();
  const playerSize = size;

  for (const bomb of bombs) {
    // const bombarect = bomb.getBoundingClientRect();
    if (
      bomb.offsetLeft < x + playerSize &&
      bomb.offsetLeft + bomb.offsetWidth > x &&
      bomb.offsetTop < y + playerSize &&
      bomb.offsetTop + bomb.offsetHeight > y
    ) {
      return true;
    }
  }

  // for (const enemy of enemies) {
  //   // const enemyrect = enemy.getBoundingClientRect();
  //   if (
  //     enemy.offsetLeft < x + playerSize &&
  //     enemy.offsetLeft + enemy.offsetWidth > x &&
  //     enemy.offsetTop < y + playerSize &&
  //     enemy.offsetTop + enemy.offsetHeight > y
  //   ) {
  //     return true;
  //   }
  // }

  for (const wall of walls) {
    // const wallrect = wall.getBoundingClientRect();
    if (
      wall.offsetLeft < x + playerSize &&
      wall.offsetLeft + wall.offsetWidth > x &&
      wall.offsetTop < y + playerSize &&
      wall.offsetTop + wall.offsetHeight > y
    ) {
      return true;
    }
  }
  return false;
};
