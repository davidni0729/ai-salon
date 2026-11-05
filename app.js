const modal=document.querySelector("dialog");document.querySelector("#registration").addEventListener("click",()=>modal.showModal());document.querySelector(".close").addEventListener("click",()=>modal.close());document.querySelector("#dismiss").addEventListener("click",()=>modal.close());modal.addEventListener("click",e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
// Browsers may require a trusted gesture before audible playback.
const salonMusic = document.querySelector('#salon-music');
const musicToggle = document.querySelector('#music-toggle');
const musicStatus = document.querySelector('#music-status');
salonMusic.volume = 0.28;
let musicManuallyPaused = false;
function updateMusicControl() {
  const playing = !salonMusic.paused && !salonMusic.ended;
  musicToggle.classList.toggle('is-playing', playing);
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? '暫停背景音樂' : '播放背景音樂');
  musicStatus.textContent = playing ? '暫停配樂' : '播放配樂';
}
async function startSalonMusic() {
  try { await salonMusic.play(); } catch (_) { updateMusicControl(); }
}
function removeMusicUnlock() {
  document.removeEventListener('pointerdown', unlockMusic);
  document.removeEventListener('keydown', unlockMusic);
}
function unlockMusic(event) {
  if (!event.isTrusted || musicManuallyPaused || event.target.closest?.('#music-toggle')) return;
  startSalonMusic();
}
musicToggle.addEventListener('click', () => {
  if (salonMusic.paused) {
    musicManuallyPaused = false;
    startSalonMusic();
  } else {
    musicManuallyPaused = true;
    removeMusicUnlock();
    salonMusic.pause();
  }
});
salonMusic.addEventListener('play', () => { updateMusicControl(); removeMusicUnlock(); });
salonMusic.addEventListener('pause', updateMusicControl);
salonMusic.addEventListener('error', () => {
  musicStatus.textContent = '配樂暫時無法播放';
  musicToggle.setAttribute('aria-label', '配樂暫時無法播放');
  removeMusicUnlock();
});
document.addEventListener('pointerdown', unlockMusic);
document.addEventListener('keydown', unlockMusic);
startSalonMusic();
