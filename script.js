// document.addEventListener("keydown", function (e) {
//   document.getElementById("output").innerHTML = "Vous avez pressé : " + e.key;
// });

const size = 50;
const cagesize = 900;
const grid_steps = cagesize / size;
const cage = document.querySelector(".cage");
const sprite = document.querySelector(".sprite");
const enemy = document.querySelector(".enemy");
const enemytwo = document.querySelector(".enemy_2");
const enemythree = document.querySelector(".enemy_3");
const enemyfour = document.querySelector(".enemy_4");
let moveBy = size;
let boom = null;

// Définir la vie du joueur
let maxHealth = 3;
let spritehealth = maxHealth;

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
      newleft = Math.min(cagesize - size, left + moveBy);
      break;

    case "ArrowUp":
      newtop = Math.max(0, top - moveBy);
      break;

    case "ArrowDown":
      newtop = Math.min(cagesize - size, top + moveBy);
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

      // Display un son a l'explosion de la bombe
      const explosionsound = document.getElementById("boom");
      explosionsound.currentTime = 0;
      explosionsound.play();

      megumin.style.width = `${blastSize}px`;
      megumin.style.height = `${blastSize}px`;
      const boomX = parseInt(boom.style.left);
      const boomY = parseInt(boom.style.top);
      // const megurect = boom.getBoundingClientRect();
      // megumin.style.position = "relative";
      // megumin.style.left = `${megurect.left - cagerect.left}px`;
      // megumin.style.top = `${megurect.top - cagerect.top}px`;
      megumin.style.position = "absolute";
      megumin.style.left = `${boomX - (blastSize / 2 - size / 2)}px`;
      megumin.style.top = `${boomY - (blastSize / 2 - size / 2)}px`;
      cage.appendChild(megumin);
      setTimeout(() => megumin.remove(), 500);
    };

    // Ajout de dommage aux bombs
    boom.dataset.range = 1;

    const explode = (boom) => {
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
          wall.dataset.health -= 1;
          if (wall.dataset.health <= 0) {
            wall.remove();
          }
        }
      }

      // Ajouter l'affichage des pv du joueur
      const healthDisplay = () => {
        const healthicon = document.getElementById("health-icon");
        const healthtext = document.getElementById("health-text");

        // Affichage visuel avec coeur
        healthicon.innerHTML =
          "❤️".repeat(spritehealth) + "💔".repeat(maxHealth - spritehealth);
        // Affichage textuelle
        healthtext.textContent = `HP: ${spritehealth} / ${maxHealth}`;

        // Ajout d'un effet de pulsation
        if (spritehealth < maxHealth) {
          healthicon.style.animation = "pulse 0.5";
          setTimeout(() => (healthicon.style.animation = ""), 500);
        }
      };

      // Ajouter les dégat sur le joueur

      const spriteDamage = () => {
        spritehealth -= 1;
        healthDisplay();
        sprite.classList.add("sprite_hit");
        setTimeout(() => sprite.classList.remove("sprite_hit"), 2000);
        if (spritehealth <= 0) {
          sprite.remove();
          console.log("GAME OVER");
        }
      };
      const spriteX = parseInt(sprite.style.left);
      const spriteY = parseInt(sprite.style.top);
      if (
        Math.abs(spriteX - boomX) <= size * boom.dataset.range &&
        Math.abs(spriteY - boomY) <= size * boom.dataset.range
      ) {
        spriteDamage();
      }
    };

    setTimeout(() => {
      spawnExplode();
      explode(boom);
      cage.style.animation = "shake 0.1s linear infinite";
      setTimeout(() => (cage.style.animation = ""), 500);
      boom.remove();
      boom = null;
    }, 2400);
  }
};

// Ecouteur d'event pour la bombe

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    placeBomb();
    // Display un son a la pose de la bombe
    const meguminsound = document.getElementById("explosiiion");
    meguminsound.currentTime = 0;
    meguminsound.play();
  }
});

// Génération de murs
window.addEventListener("load", () => {
  for (let i = 0; i < 900; i++) {
    const wall = document.createElement("div");
    wall.className = "wall";
    wall.dataset.health = 1;
    wall.style.left = `${Math.floor(Math.random() * 25) * size}px`;
    wall.style.top = `${Math.floor(1 + Math.random() * 25) * size}px`;
    cage.appendChild(wall);
  }
});

// Gestion des collision

const collisionElements = () => {
  return {
    bombs: document.querySelectorAll(".boom"),
    enemies: document.querySelectorAll(".enemy"),
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

  // BUG ajouter la collision des enemy bloque les mouvement du joueur
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

// Ajout d'un contrôleur de volume

const volume = document.getElementById("volume-slider");
let gamesound = 0.1;

const updateSoundVolume = () => {
  const son = document.querySelectorAll("audio");
  for (const sons of son) {
    sons.volume = gamesound;
  }
};

volume.addEventListener("input", (e) => {
  gamesound = parseFloat(e.target.value);
  updateSoundVolume();
});

updateSoundVolume();
