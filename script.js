document.addEventListener("keydown", function (e) {
  document.getElementById("output").innerHTML = "Vous avez pressé : " + e.key;
});

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
let boom;
const playerSize = size;

// Player health
let maxHealth = 3;
let spritehealth = maxHealth;
// Enemies health
let enemyhealth = 1;
let enemyhealth2 = 1;
let enemyhealth3 = 1;
let enemyhealth4 = 1;

// Start screen
let gamepaused = false;
const menuscreen = document.querySelector("#menuscreen");
// Game screen
const gamescreen = document.querySelector("#gamescreen");

// Start game
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && gamepaused === false) {
    gamepaused = true;
    gamescreen.classList.remove("hidden");
    menuscreen.classList.add("hidden");
    pausescreen.classList.add("hidden");
  }
});

// Paused game
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && gamepaused === true) {
    gamepaused = false;
    pausescreen.classList.remove("hidden");
  }
});

menubtn.addEventListener("click", () => {
  if (gamepaused === false) {
    location.reload();
  }
});
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
  if (!gamepaused) return;
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
  if (!gamepaused) return;
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

// Display player health
const healthDisplay = () => {
  const healthicon = document.getElementById("health-icon");
  const healthtext = document.getElementById("health-text");

  // With heart
  healthicon.innerHTML =
    "❤️".repeat(spritehealth) + "💔".repeat(maxHealth - spritehealth);
  // With text
  healthtext.textContent = `HP: ${spritehealth} / ${maxHealth}`;

  // Add a pulse effect
  // #BUG Pulse effect doesn't work for now
  // if (spritehealth < maxHealth) {
  //   healthicon.style.animation = "pulse 0.5s ease-in-out infinite alternate";
  //   setTimeout(() => (healthicon.style.animation = ""), 1000);
  // }
};

// Bomb function
let canplacebomb = true;
const bombcooldown = 6000;
const bomb_damage = 1;
const placeBomb = () => {
  if (!gamepaused) return;
  if (canplacebomb && !boom) {
    canplacebomb = false;

    boom = document.createElement("div");
    boom.className = "boom";
    boom.style.position = "relative";
    boom.style.left = `${sprite.offsetLeft}px`;
    boom.style.top = `${sprite.offsetTop}px`;
    cage.appendChild(boom);

    // Bomb cooldown
    setTimeout(() => (canplacebomb = true), bombcooldown);

    // Bomb explosion
    const spawnExplode = () => {
      const meg = document.createElement("div");
      meg.className = "explosion";
      const blastSize = size * boom.dataset.range * 3;

      meg.style.width = `${blastSize}px`;
      meg.style.height = `${blastSize}px`;
      const boomX = parseInt(boom.style.left);
      const boomY = parseInt(boom.style.top);
      meg.style.position = "absolute";
      meg.style.left = `${boomX - (blastSize / 2 - size / 2)}px`;
      meg.style.top = `${boomY - (blastSize / 2 - size / 2)}px`;
      cage.appendChild(meg);
      setTimeout(() => meg.remove(), 1000);

      // Display a sound for the bomb explosion
      const explosionsound = document.getElementById("boom");
      explosionsound.currentTime = 0;
      explosionsound.play();
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
          wall.dataset.health -= bomb_damage;
          if (wall.dataset.health <= 0) {
            setTimeout(() => wall.remove(), 500);
          }
        }
      }

      // Add damage to the player

      const spriteDamage = () => {
        spritehealth -= bomb_damage;
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
        enemyhealth -= bomb_damage;
        if (enemyhealth <= 0) {
          dropKey(enemyX, enemyY);
          enemy.remove();
          console.log("ENEMY ONE KILLED");
        }
      };
      const enemyTwoDamage = () => {
        enemyhealth2 -= bomb_damage;
        if (enemyhealth2 <= 0) {
          enemytwo.remove();
          console.log("ENEMY TWO KILLED");
        }
      };
      const enemyThreeDamage = () => {
        enemyhealth3 -= bomb_damage;
        if (enemyhealth3 <= 0) {
          enemythree.remove();
          console.log("ENEMY THREE KILLED");
        }
      };
      const enemyFourDamage = () => {
        enemyhealth4 -= bomb_damage;
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
    }, 1500);
  }
};

// Event listener to drop a bomb
document.addEventListener("keydown", (e) => {
  if (e.key === " " && !boom && canplacebomb) {
    e.preventDefault();
    placeBomb();
    // Display a sound when a bomb is dropped
    const megsound = document.getElementById("explosiiion");
    megsound.currentTime = 0;
    megsound.play();
  }
});

// If the bomb is placed, remove bomb icon
const bombDisplay = () => {
  const bombIcon = document.getElementById("bomb-icon");
  if (canplacebomb) {
    bombIcon.textContent = "💣";
  } else {
    bombIcon.textContent = " ";
  }
};

// #BUG Damage is not displayed correctly on every range, sometimes wall with one hp are not damaged by the bomb

// Wall random generation
window.addEventListener("load", () => {
  const doorX = parseInt(door.style.left);
  const doorY = parseInt(door.style.top);

  for (let i = 0; i < 1200; i++) {
    // X and Y coordinates
    const x = Math.floor(Math.random() * 25) * size;
    const y = Math.floor(1 + Math.random() * 25) * size;
    // Check if wall overlaps with door
    const isOnDoor =
      x < doorX + size &&
      x + size > doorX &&
      y < doorY + size &&
      y + size > doorY;
    // Create a wall only if it doesn't overlap with door
    if (!isOnDoor) {
      const wall = document.createElement("div");
      wall.className = "wall";
      wall.style.left = `${x}px`;
      wall.style.top = `${y}px`;
      wall.dataset.health = 2;
      cage.appendChild(wall);
    } else {
      i--;
    }
  }
});

// Add an exit door
const door = document.createElement("img");
door.id = "exit-door";
door.className = "door locked";
door.src = "./assets/door.png";
door.style.position = "absolute";
door.style.left = "750px";
door.style.top = "750px";
cage.appendChild(door);

// Treasure spawn function
let treasurespawn = false;
const bonustypes = ["bomb_damage"];

const spawntreasure = () => {
  // X and Y coordinates
  const x = Math.floor(Math.random() * 25) * size;
  const y = Math.floor(1 + Math.random() * 25) * size;
};

//  #BUG Key is not working/Player can't take keys
// FIXED (forgot to put  requestAnimationFrame(gameloop); in the gameloop function)

// Key variable
let keycount = 0;

// Drop key
const dropKey = (x, y) => {
  const key = document.createElement("img");
  key.className = "key";
  key.src = "./assets/key.png";
  key.style.position = "absolute";
  key.style.left = `${x}px`;
  key.style.top = `${y}px`;
  cage.appendChild(key);
};

// Key collection

const keysElements = () => {
  const keys = document.querySelectorAll(".key");
  for (let key of keys) {
    if (
      key.offsetLeft < sprite.offsetLeft + playerSize &&
      key.offsetLeft + key.offsetWidth > sprite.offsetLeft &&
      key.offsetTop < sprite.offsetTop + playerSize &&
      key.offsetTop + key.offsetHeight > sprite.offsetTop
    ) {
      keycount++;
      key.remove();
      console.log("Key collected");
    }
    return;
  }
};

// Display key count on screen
const keydisplay = () => {
  const keytext = document.querySelector(".keycounter");
  keytext.textContent = `Key: ${keycount}`;
};
// Collision

const collisionElements = () => {
  return {
    bombs: document.querySelectorAll(".boom"),
    enemies: document.querySelectorAll(".enemy, .enemy_2, .enemy_3, .enemy_4"),
    walls: document.querySelectorAll(".wall"),
  };
};

const checkForCollision = (x, y) => {
  const { bombs, enemies, walls, keys } = collisionElements();

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

// Win condition function
const wincondition = () => {
  const displaytext = document.querySelector("#messagetext");
  if (
    door.offsetLeft < sprite.offsetLeft + playerSize &&
    door.offsetLeft + door.offsetWidth > sprite.offsetLeft &&
    door.offsetTop < sprite.offsetTop + playerSize &&
    door.offsetTop + door.offsetHeight > sprite.offsetTop
  ) {
    if (keycount >= 1) {
      door.classList.remove("locked");
      door.classList.add("open");
      displaytext.textContent = `🔓 Door is unlocked!`;
      setTimeout(() => {
        alert("You won!");
        location.reload();
      }, 1000);
    } else {
      displaytext.textContent = `🔒 Door is locked... \n🗝️ I should find a key to open it...`;
    }
  }
};

// Timer function for the game
let gametime = 180; // 3 minutes
const timerdisplay = document.querySelector("#timer");

const loseconditiontime = () => {
  const timeinterval = setInterval(() => {
    if (gamepaused) {
      gametime--;
      timerdisplay.textContent = `⏱️ ${Math.floor(gametime / 60)}:${
        gametime % 60
      }`;
      if (gametime <= 30) {
        timerdisplay.classList.add("warning");
      }
      // If the player runs out of time, display a message and reload the game
      if (gametime <= 0) {
        clearInterval(timeinterval);
        setTimeout(() => {
          document.body.classList.add("gameover");
          alert("Time's up! You lost!");
          location.reload();
        }, 1000);
      }
    }
  }, 1000);
};

const loseconditionhealth = () => {
  // If the player runs out of health, display a message and reload the game
  if (spritehealth <= 0) {
    document.body.classList.add("gameover");
    setTimeout(() => {
      alert("You lost!");
      location.reload();
    }, 1000);
  }
};

const gameloop = () => {
  bombDisplay();
  keysElements();
  wincondition();
  keydisplay();
  loseconditionhealth();
  requestAnimationFrame(gameloop);
};
loseconditiontime();
gameloop();

// Future features for score board

// Save score to the local storage
// localStorage.setItem("highscore", score);

// On page load, check for last saved score
// if (localStorage.getItem("highscore")) {
//   console.log("Last highscore:", localStorage.getItem("highscore"));
// }
