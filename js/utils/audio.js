// Game music function => audio.js
const menuMusic = document.getElementById("music_menu");
const gameMusicstage1 = document.getElementById("music_stage1");

export const startGameMusic = () => {
  menuMusic.pause();
  gameMusicstage1.play();
  audioUnlocker.style.display = "none";
};

// Create the unlock button when audio permission is denied for the menu music => audio.js
const audioUnlocker = document.createElement("button");
audioUnlocker.innerHTML = "🔇";
audioUnlocker.style.cssText = `
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 9999;
  background: none;
  scale: 4;
  border: none;
`;
document.body.appendChild(audioUnlocker);

menuMusic
  .play()
  .then(() => {})
  .catch((e) => {
    audioUnlocker.style.transform = "translateY(0)";
    console.log("Autoplay blocked! Showing unlock button");
  });

audioUnlocker.addEventListener("click", () => {
  menuMusic.play().then(() => {
    audioUnlocker.innerHTML = "";
  });
});

// Add volume control => audio.js
let musicsound = 0.5;
let voicesound = 1;
let sfxsound = 0.3;
const music_volume = document.getElementById("music-slider");
const voice_volume = document.getElementById("voice-slider");
const sfx_volume = document.getElementById("sfx-slider");

export const updateMusicVolume = () => {
  const son = document.querySelectorAll(".music");
  for (const sons of son) {
    sons.volume = musicsound;
  }
};

music_volume.addEventListener("input", (e) => {
  musicsound = parseFloat(e.target.value);
  updateMusicVolume();
});

export const updateVoiceVolume = () => {
  const son = document.querySelectorAll(".voice");
  for (const sons of son) {
    sons.volume = voicesound;
  }
};

voice_volume.addEventListener("input", (e) => {
  voicesound = parseFloat(e.target.value);
  updateVoiceVolume();
});

export const updateSFXVolume = () => {
  const son = document.querySelectorAll(".sfx");
  for (const sons of son) {
    sons.volume = sfxsound;
  }
};

sfx_volume.addEventListener("input", (e) => {
  sfxsound = parseFloat(e.target.value);
  updateSFXVolume();
});
