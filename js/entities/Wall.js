// #BUG Damage is not displayed correctly on every range, sometimes wall with one hp are not damaged by the bomb

// Wall random generation => Wall.js
window.addEventListener("load", () => {
  const doorX = parseInt(door.style.left);
  const doorY = parseInt(door.style.top);

  for (let i = 0; i < 1200; i++) {
    // X and Y coordinates
    const x = Math.floor(Math.random() * 25) * grid_size;
    const y = Math.floor(1 + Math.random() * 25) * grid_size;
    // Check if wall overlaps with door
    const isOnDoor =
      x < doorX + grid_size &&
      x + grid_size > doorX &&
      y < doorY + grid_size &&
      y + grid_size > doorY;
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