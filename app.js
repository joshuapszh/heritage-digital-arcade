const questions = [
  {
    icon: '🔐',
    mission: 'Mission 1 · Password Power-Up',
    question: 'Which password has the strongest shield?',
    answers: ['football10', 'Blue!Rocket7Cloud', 'Joshua2016'],
    correct: 1,
    tip: 'Long, surprising passwords with mixed characters are harder to guess.'
  },
  {
    icon: '🕵️',
    mission: 'Mission 2 · Scam Scanner',
    question: 'A pop-up says “You won! Click NOW and enter your address.” What should you do?',
    answers: ['Click quickly', 'Share it with friends', 'Close it and tell a trusted adult'],
    correct: 2,
    tip: 'Pause before you click. If something feels strange, ask a trusted adult.'
  },
  {
    icon: '👣',
    mission: 'Mission 3 · Footprint Quest',
    question: 'Which post leaves the best digital footprint?',
    answers: ['A kind comment on a class project', 'A photo showing your home address', 'An angry message about a friend'],
    correct: 0,
    tip: 'Every post leaves a trail. Be kind, protect private information, and think first.'
  }
];

const savedNumber = (key, fallback) => {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
};

let state = {
  entered: false,
  screen: 'intro',
  q: 0,
  answered: false,
  choice: null,
  score: 0,
  settingsOpen: false,
  musicMuted: localStorage.getItem('heritageMusicMuted') === 'true',
  fxMuted: localStorage.getItem('heritageFxMuted') === 'true',
  musicVolume: savedNumber('heritageMusicVolume', 0.55),
  fxVolume: savedNumber('heritageFxVolume', 0.8)
};

let audioContext = null;
let musicLoop = null;
let musicStep = 0;
let duckUntil = 0;

function logo() {
  return '<img class="logo" src="heritage-logo.png" alt="Heritage Academy">';
}

function progress() {
  return `<div class="progress" aria-label="Mission progress">${questions.map((_, i) =>
    `<span class="dot ${i < state.q || state.screen === 'celebrate' ? 'done' : ''}"></span>`
  ).join('')}</div>`;
}

function settingsPanel() {
  return `<div class="settings-backdrop ${state.settingsOpen ? 'open' : ''}" id="settingsBackdrop">
    <section class="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
      <div class="settings-heading">
        <div><div class="eyebrow">Game controls</div><h2 id="settingsTitle">Settings</h2></div>
        <button class="icon-button close-settings" aria-label="Close settings">×</button>
      </div>
      <label class="setting-row" for="musicVolume"><span>Music volume</span><output id="musicOutput">${Math.round(state.musicVolume * 100)}%</output></label>
      <input id="musicVolume" type="range" min="0" max="1" step="0.05" value="${state.musicVolume}">
      <button class="action secondary wide" id="musicMute">${state.musicMuted ? 'Turn music on' : 'Mute music'}</button>
      <label class="setting-row" for="fxVolume"><span>Sound effects</span><output id="fxOutput">${Math.round(state.fxVolume * 100)}%</output></label>
      <input id="fxVolume" type="range" min="0" max="1" step="0.05" value="${state.fxVolume}">
      <button class="action secondary wide" id="fxMute">${state.fxMuted ? 'Turn effects on' : 'Mute effects'}</button>
      <div class="settings-actions">
        <button class="action" id="resetGame">Restart game</button>
        <button class="action secondary" id="fullscreenToggle">${document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'}</button>
      </div>
      <p class="small">Keys: 1–3 answer · Space advances · M mutes music · R restarts</p>
    </section>
  </div>`;
}

function shell(content) {
  const level = !state.entered || state.screen === 'intro'
    ? 'READY PLAYER ONE'
    : state.screen === 'celebrate' ? 'QUEST COMPLETE' : `LEVEL ${state.q + 1} / 3`;
  return `<div class="shell">
    <header class="topbar">
      <div class="brand">${logo()}<span class="brandtext">DIGITAL LITERACY ARCADE</span></div>
      <div class="top-actions"><span class="pill">${level}</span><button class="settings-button" id="openSettings" aria-label="Open game settings" title="Settings">⚙️</button></div>
    </header>
    <section class="stage">${content}</section>
    ${state.entered ? progress() : ''}
    ${settingsPanel()}
  </div>`;
}

function welcome() {
  return shell(`<div class="card welcome-card">
    <div class="eyebrow">Heritage Academy presents</div>
    <h1 class="title">Digital<br>Defenders</h1>
    <p class="subtitle">Three arcade missions. One important power: making smart, safe and kind choices online.</p>
    <button class="action enter-button" id="enterArcade">Enter the Digital Arcade</button>
    <p class="tip">Music begins after you enter. Headphones or speakers recommended.</p>
  </div>`);
}

function intro() {
  return shell(`<div class="card">
    <div class="mission-icon">🎮</div>
    <div class="eyebrow">Welcome, Digital Defender</div>
    <h1 class="title compact-title">Smart. Safe. Kind.</h1>
    <p class="subtitle">Listen to your classmates, choose the strongest answer, and earn all three power stars.</p>
    <div class="stars">★ ★ ★</div>
    <button class="action" id="startMissions">Start Mission 1</button>
    <p class="tip">Press SPACE to begin</p>
  </div>`);
}

function game() {
  const q = questions[state.q];
  return shell(`<div class="card">
    <div class="mission-icon">${q.icon}</div>
    <div class="eyebrow">${q.mission}</div>
    <h1 class="subtitle question">${q.question}</h1>
    <div class="answers">${q.answers.map((answer, i) =>
      `<button class="answer ${state.answered ? (i === q.correct ? 'correct' : i === state.choice ? 'wrong' : '') : ''}" data-choice="${i}" ${state.answered ? 'disabled' : ''}>
        <span class="key">${i + 1}</span>${answer}
      </button>`
    ).join('')}</div>
    ${state.answered ? `<div class="feedback">${state.choice === q.correct ? 'POWER-UP EARNED! ⚡' : 'GOOD TRY — SHIELD UPDATED! 🛡️'}</div>
      <div class="tip">${q.tip}</div>
      <button class="action" id="continueGame">${state.q < questions.length - 1 ? 'Next mission' : 'See achievement'}</button>` : ''}
  </div>`);
}

function celebrate() {
  return shell(`<div class="card">
    <div class="confetti"></div>
    <div class="celebration-content">
      <div class="badge">🛡️</div>
      <div class="eyebrow achievement-label">Achievement unlocked</div>
      <h1 class="title">Digital<br>Defender!</h1>
      <p class="subtitle">At Heritage Academy, we learn to stay safe, think before we click, and leave a positive digital footprint.</p>
      <div class="stars">${'★ '.repeat(Math.max(1, state.score))}${'☆ '.repeat(Math.max(0, 3 - state.score))}</div>
      <p class="tip">Smart • Safe • Kind • Ready</p>
      <button class="action" id="playAgain">Play again</button>
    </div>
  </div>`);
}

function render() {
  const app = document.getElementById('app');
  app.innerHTML = !state.entered ? welcome() : state.screen === 'intro' ? intro() : state.screen === 'question' ? game() : celebrate();
  bindControls();
}

function bindControls() {
  document.getElementById('openSettings').onclick = () => {
    state.settingsOpen = true;
    render();
    document.querySelector('.close-settings').focus();
  };
  document.querySelector('.close-settings').onclick = closeSettings;
  document.getElementById('settingsBackdrop').onclick = (event) => {
    if (event.target.id === 'settingsBackdrop') closeSettings();
  };
  document.getElementById('musicMute').onclick = toggleMusic;
  document.getElementById('fxMute').onclick = toggleEffects;
  document.getElementById('resetGame').onclick = reset;
  document.getElementById('fullscreenToggle').onclick = toggleFullscreen;

  const musicSlider = document.getElementById('musicVolume');
  musicSlider.oninput = () => {
    state.musicVolume = Number(musicSlider.value);
    document.getElementById('musicOutput').value = `${Math.round(state.musicVolume * 100)}%`;
    localStorage.setItem('heritageMusicVolume', state.musicVolume);
  };
  const fxSlider = document.getElementById('fxVolume');
  fxSlider.oninput = () => {
    state.fxVolume = Number(fxSlider.value);
    document.getElementById('fxOutput').value = `${Math.round(state.fxVolume * 100)}%`;
    localStorage.setItem('heritageFxVolume', state.fxVolume);
  };

  document.getElementById('enterArcade')?.addEventListener('click', enterArcade);
  document.getElementById('startMissions')?.addEventListener('click', advance);
  document.getElementById('continueGame')?.addEventListener('click', advance);
  document.getElementById('playAgain')?.addEventListener('click', reset);
  document.querySelectorAll('[data-choice]').forEach(button => {
    button.onclick = () => choose(Number(button.dataset.choice));
  });
}

function closeSettings() {
  state.settingsOpen = false;
  render();
  document.getElementById('openSettings').focus();
}

function enterArcade() {
  state.entered = true;
  ensureAudio();
  startMusic();
  requestFullscreen();
  render();
}

function choose(index) {
  if (!state.entered || state.screen !== 'question' || state.answered) return;
  state.choice = index;
  state.answered = true;
  if (index === questions[state.q].correct) state.score += 1;
  playEffect(index === questions[state.q].correct ? 'correct' : 'wrong');
  render();
}

function advance() {
  if (!state.entered || state.settingsOpen) return;
  if (state.screen === 'intro') {
    state.screen = 'question';
  } else if (state.screen === 'question' && !state.answered) {
    return;
  } else if (state.screen === 'question' && state.q < questions.length - 1) {
    state.q += 1;
    state.answered = false;
    state.choice = null;
    playEffect('next');
  } else {
    state.screen = 'celebrate';
    musicStep = 0;
    playEffect('win');
  }
  render();
}

function reset() {
  state.screen = 'intro';
  state.q = 0;
  state.answered = false;
  state.choice = null;
  state.score = 0;
  state.settingsOpen = false;
  musicStep = 0;
  playEffect('next');
  render();
}

function ensureAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function tone(frequency, duration, type = 'square', volume = 0.05, delay = 0, channel = 'fx') {
  if ((channel === 'music' && state.musicMuted) || (channel === 'fx' && state.fxMuted)) return;
  const context = ensureAudio();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const channelVolume = channel === 'music' ? state.musicVolume : state.fxVolume;
  const duck = channel === 'music' && performance.now() < duckUntil ? 0.32 : 1;
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(Math.max(0.0001, volume * channelVolume * duck), context.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + delay + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(context.currentTime + delay);
  oscillator.stop(context.currentTime + delay + duration);
}

function playEffect(type) {
  duckUntil = performance.now() + 700;
  if (type === 'correct') {
    tone(523, 0.12); tone(659, 0.12, 'square', 0.05, 0.12); tone(784, 0.22, 'square', 0.055, 0.24);
  } else if (type === 'wrong') {
    tone(220, 0.18, 'sawtooth'); tone(165, 0.28, 'sawtooth', 0.04, 0.16);
  } else if (type === 'win') {
    [523, 659, 784, 1047].forEach((frequency, i) => tone(frequency, 0.3, 'square', 0.05, i * 0.16));
  } else {
    tone(440, 0.12);
  }
}

function playMusicNote() {
  if (!state.entered || state.musicMuted) return;
  const normal = [262, 330, 392, 330, 294, 370, 440, 370, 330, 392, 494, 392];
  const victory = [523, 659, 784, 1047, 784, 659, 698, 880, 1047, 880, 784, 659];
  const melody = state.screen === 'celebrate' ? victory : normal;
  const note = melody[musicStep % melody.length];
  tone(note, 0.2, state.screen === 'celebrate' ? 'square' : 'triangle', 0.032, 0, 'music');
  if (state.screen === 'celebrate' && musicStep % 2 === 0) tone(note / 2, 0.28, 'triangle', 0.018, 0, 'music');
  musicStep += 1;
}

function startMusic() {
  if (musicLoop) return;
  playMusicNote();
  musicLoop = window.setInterval(playMusicNote, 250);
}

function toggleMusic() {
  state.musicMuted = !state.musicMuted;
  localStorage.setItem('heritageMusicMuted', state.musicMuted);
  if (!state.musicMuted && state.entered) {
    ensureAudio();
    startMusic();
  }
  render();
}

function toggleEffects() {
  state.fxMuted = !state.fxMuted;
  localStorage.setItem('heritageFxMuted', state.fxMuted);
  if (!state.fxMuted && state.entered) playEffect('next');
  render();
}

function requestFullscreen() {
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else requestFullscreen();
  state.settingsOpen = false;
  render();
}

addEventListener('keydown', event => {
  if (event.key === 'Escape' && state.settingsOpen) {
    closeSettings();
    return;
  }
  if (!state.entered || state.settingsOpen) return;
  if (['1', '2', '3'].includes(event.key)) choose(Number(event.key) - 1);
  if (event.code === 'Space') {
    event.preventDefault();
    advance();
  }
  if (event.key.toLowerCase() === 'm') toggleMusic();
  if (event.key.toLowerCase() === 'r') reset();
});

document.addEventListener('fullscreenchange', () => {
  if (state.settingsOpen) render();
});

render();
