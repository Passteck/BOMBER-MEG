// document.addEventListener("keydown", function (e) {
//   document.getElementById("output").innerHTML = "Vous avez pressé : " + e.key;
// });

const size = 50;
const cagesize = 800;
const grid_steps = cagesize / size;
const cage = document.querySelector(".cage");
const sprite = document.querySelector(".sprite");
const enemy = document.querySelector(".enemy");
const enemytwo = document.querySelector(".enemy_2");
const enemythree = document.querySelector(".enemy_3");
const enemyfour = document.querySelector(".enemy_4");
let moveBy = size;
let boom = null;

// Player health
let maxHealth = 3;
let spritehealth = maxHealth;
// Enemies health
let enemyhealth = 1;
let enemyhealth2 = 1;
let enemyhealth3 = 1;
let enemyhealth4 = 1;

// Load a default position for player
window.addEventListener("load", () => {
  sprite.style.position = "absolute";
  sprite.style.left = "0px";
  sprite.style.top = "0px";
});

// Add a random spawn for enemy
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

// Random movement for enemy

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
}, 5000);

// Player movement
window.addEventListener("keydown", (e) => {
  let left = parseInt(sprite.style.left) || 0;
  let top = parseInt(sprite.style.top) || 0;
  let newleft = left;
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

// Bomb function
const placeBomb = () => {
  if (!boom) {
    boom = document.createElement("div");
    boom.className = "boom";
    boom.style.position = "relative";
    boom.style.left = `${sprite.offsetLeft}px`;
    boom.style.top = `${sprite.offsetTop}px`;
    cage.appendChild(boom);

    const spawnExplode = () => {
      const megumin = document.createElement("div");
      megumin.className = "explosion";
      const blastSize = size * boom.dataset.range * 3;

      // Display a sound for the bomb explosion
      const explosionsound = document.getElementById("boom");
      explosionsound.currentTime = 0;
      explosionsound.play();

      megumin.style.width = `${blastSize}px`;
      megumin.style.height = `${blastSize}px`;
      const boomX = parseInt(boom.style.left);
      const boomY = parseInt(boom.style.top);
      megumin.style.position = "absolute";
      megumin.style.left = `${boomX - (blastSize / 2 - size / 2)}px`;
      megumin.style.top = `${boomY - (blastSize / 2 - size / 2)}px`;
      cage.appendChild(megumin);
      setTimeout(() => megumin.remove(), 500);
    };

    // Add damage for walls
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

      // Display player health
      const healthDisplay = () => {
        const healthicon = document.getElementById("health-icon");
        const healthtext = document.getElementById("health-text");

        // With heart
        healthicon.innerHTML =
          "❤️".repeat(spritehealth) + "💔".repeat(maxHealth - spritehealth);
        // With text
        healthtext.textContent = `HP: ${spritehealth} / ${maxHealth}`;

        // Add a pulse effect / doesn't work for now
        // if (spritehealth < maxHealth) {
        //   healthtext.style.animation = "pulse 0.5";
        //   setTimeout(() => (healthicon.style.animation = ""), 500);
        // };
      };

      // Add damage to the player

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

      // Add damage to enemies
      const enemyDamage = () => {
        enemyhealth -= 1;
        if (enemyhealth <= 0) {
          enemy.remove();
          console.log("ENEMY ONE KILLED");
        }
      };
      const enemyTwoDamage = () => {
        enemyhealth2 -= 1;
        if (enemyhealth2 <= 0) {
          enemytwo.remove();
          console.log("ENEMY TWO KILLED");
        }
      };
      const enemyThreeDamage = () => {
        enemyhealth3 -= 1;
        if (enemyhealth3 <= 0) {
          enemythree.remove();
          console.log("ENEMY THREE KILLED");
        }
      };
      const enemyFourDamage = () => {
        enemyhealth4 -= 1;
        if (enemyhealth4 <= 0) {
          enemyfour.remove();
          console.log("ENEMY FOUR KILLED");
        }
      };

      const enemyX = parseInt(enemy.style.left);
      const enemyY = parseInt(enemy.style.top);
      const enemyX2 = parseInt(enemytwo.style.left);
      const enemyY2 = parseInt(enemytwo.style.top);
      const enemyX3 = parseInt(enemythree.style.left);
      const enemyY3 = parseInt(enemythree.style.top);
      const enemyX4 = parseInt(enemyfour.style.left);
      const enemyY4 = parseInt(enemyfour.style.top);
      if (
        Math.abs(enemyX - boomX) <= size * boom.dataset.range &&
        Math.abs(enemyY - boomY) <= size * boom.dataset.range
      ) {
        enemyDamage();
      } else if (
        Math.abs(enemyX2 - boomX) <= size * boom.dataset.range &&
        Math.abs(enemyY2 - boomY) <= size * boom.dataset.range
      ) {
        enemyTwoDamage();
      } else if (
        Math.abs(enemyX3 - boomX) <= size * boom.dataset.range &&
        Math.abs(enemyY3 - boomY) <= size * boom.dataset.range
      ) {
        enemyThreeDamage();
      } else if (
        Math.abs(enemyX4 - boomX) <= size * boom.dataset.range &&
        Math.abs(enemyY4 - boomY) <= size * boom.dataset.range
      ) {
        enemyFourDamage();
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

// Event listener to drop a bomb

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    placeBomb();
    // Display a sound when a bomb is dropped
    const meguminsound = document.getElementById("explosiiion");
    meguminsound.currentTime = 0;
    meguminsound.play();
  }
});

// Wall random generation
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

// Collision

const collisionElements = () => {
  return {
    bombs: document.querySelectorAll(".boom"),
    enemies: document.querySelectorAll(".enemy, .enemy_2, .enemy_3, .enemy_4"),
    walls: document.querySelectorAll(".wall"),
  };
};

const checkForCollision = (x, y) => {
  const { bombs, enemies, walls } = collisionElements();
  const playerSize = size;

  for (const bomb of bombs) {
    if (
      bomb.offsetLeft < x + playerSize &&
      bomb.offsetLeft + bomb.offsetWidth > x &&
      bomb.offsetTop < y + playerSize &&
      bomb.offsetTop + bomb.offsetHeight > y
    ) {
      return true;
    }
  }

  // BUG Doesn't work and lock player on his default position
  // FIXED
  for (let enemy of enemies) {
    if (
      enemy.offsetLeft < x + playerSize &&
      enemy.offsetLeft + enemy.offsetWidth > x &&
      enemy.offsetTop < y + playerSize &&
      enemy.offsetTop + enemy.offsetHeight > y
    ) {
      return true;
    }
  }

  for (const wall of walls) {
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

// Add volume control

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
