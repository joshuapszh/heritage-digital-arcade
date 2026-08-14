const challengeBank = {
  privacy: [
    { id: 'p01', prompt: 'Which password has the strongest shield?', good: 'Blue!Rocket7Cloud', bad: 'football10', tip: 'Long, surprising passwords are harder to guess.' },
    { id: 'p02', prompt: 'A friend asks for your game password. What should you do?', good: 'Keep it secret', bad: 'Tell your friend', tip: 'Passwords are private—even from good friends.' },
    { id: 'p03', prompt: 'A game asks for your home address. What is the smart move?', good: 'Ask a trusted adult', bad: 'Type it in', tip: 'Your home address is personal information.' },
    { id: 'p04', prompt: 'An app wants to share your live location. What should you do?', good: 'Check with an adult', bad: 'Allow it quickly', tip: 'Only share location with permission and a clear reason.' },
    { id: 'p05', prompt: 'You finish using a shared computer. What comes next?', good: 'Log out', bad: 'Leave it open', tip: 'Logging out protects your account.' },
    { id: 'p06', prompt: 'You need a password for a new app. Which plan is safer?', good: 'Use a different password', bad: 'Reuse every password', tip: 'Different passwords stop one leak from opening every account.' },
    { id: 'p07', prompt: 'Which public gamer name protects your identity?', good: 'PixelPanda42', bad: 'AmyGrade4Home', tip: 'A username should not reveal your real identity or location.' },
    { id: 'p08', prompt: 'A drawing app suddenly requests camera access. What should you do?', good: 'Pause and check why', bad: 'Always allow it', tip: 'Apps should only get permissions they truly need.' },
    { id: 'p09', prompt: 'Which password clue is safer?', good: 'Three random words', bad: 'Your birthday', tip: 'Birthdays and names are easy for others to discover.' },
    { id: 'p10', prompt: 'Who should be able to see your personal profile?', good: 'People you approve', bad: 'Everyone online', tip: 'Privacy settings help you control your audience.' },
    { id: 'p11', prompt: 'A quiz asks for your phone number to show your result. What now?', good: 'Skip it and ask', bad: 'Enter the number', tip: 'Do not trade personal information for a quiz result.' },
    { id: 'p12', prompt: 'You hear that an app leaked passwords. What should you do?', good: 'Change yours with help', bad: 'Ignore the news', tip: 'Change exposed passwords and tell a trusted adult.' }
  ],
  scam: [
    { id: 's01', prompt: 'A pop-up says, “You won! Claim your prize now!”', good: 'Close it and check', bad: 'Click immediately', tip: 'Unexpected prizes often use excitement to make us rush.' },
    { id: 's02', prompt: 'An unknown sender emails you an attachment. What is safer?', good: 'Do not open it', bad: 'Open it to look', tip: 'Unknown attachments can contain harmful software.' },
    { id: 's03', prompt: 'A message says your game account will close in five minutes.', good: 'Check the official app', bad: 'Use its urgent link', tip: 'Scams create urgency so we act without thinking.' },
    { id: 's04', prompt: 'A friend messages, “Send me the login code you just received.”', good: 'Ask them another way', bad: 'Send the code', tip: 'Login codes are secret. A friend’s account may be hacked.' },
    { id: 's05', prompt: 'A website promises unlimited free game coins.', good: 'Leave the website', bad: 'Enter your login', tip: 'Offers that seem too good to be true usually are.' },
    { id: 's06', prompt: 'A flashing warning says, “Your device has 99 viruses!”', good: 'Close it and tell an adult', bad: 'Buy its cleaner', tip: 'Scary pop-ups try to pressure you into clicking or paying.' },
    { id: 's07', prompt: 'You find a mystery QR code with no explanation.', good: 'Ask before scanning', bad: 'Scan it at once', tip: 'QR codes can hide unsafe links.' },
    { id: 's08', prompt: 'A survey promises a free tablet if you answer personal questions.', good: 'Close the survey', bad: 'Share your details', tip: 'Free-gift surveys may collect personal information.' },
    { id: 's09', prompt: '“Game Support” asks you to send your password.', good: 'Report the message', bad: 'Send the password', tip: 'Real support teams should never need your password.' },
    { id: 's10', prompt: 'A website tells you to install an unknown “speed booster.”', good: 'Check with an adult', bad: 'Install it', tip: 'Only install trusted software with permission.' },
    { id: 's11', prompt: 'A stranger invites you to a private video chat.', good: 'Decline and tell an adult', bad: 'Join the call', tip: 'Do not move into private chats with strangers.' },
    { id: 's12', prompt: 'A school login link has strange spelling in its address.', good: 'Use the usual school site', bad: 'Try the strange link', tip: 'Check web addresses carefully before signing in.' }
  ],
  footprint: [
    { id: 'f01', prompt: 'You took a funny photo of a classmate. Before posting it...', good: 'Ask permission', bad: 'Post it secretly', tip: 'People should have a say in how their image is shared.' },
    { id: 'f02', prompt: 'A classmate shares a creative project. What comment helps?', good: '“Great idea—well done!”', bad: '“That looks terrible.”', tip: 'Kind feedback builds a positive digital community.' },
    { id: 'f03', prompt: 'You delete a post. Could someone still have a copy?', good: 'Yes, screenshots exist', bad: 'No, it is gone forever', tip: 'Online posts can be copied before they are deleted.' },
    { id: 'f04', prompt: 'A group chat shares a rumour about a student. What should you do?', good: 'Do not forward it', bad: 'Send it to everyone', tip: 'Forwarding rumours can harm people and your footprint.' },
    { id: 'f05', prompt: 'You feel angry while writing a message. What is the smart move?', good: 'Pause before sending', bad: 'Send it in capitals', tip: 'Pause until you can communicate calmly and kindly.' },
    { id: 'f06', prompt: 'You use someone’s digital artwork in a project. What should you do?', good: 'Credit the creator', bad: 'Claim it as yours', tip: 'Responsible creators acknowledge other people’s work.' },
    { id: 'f07', prompt: 'You see someone being bullied in a class chat.', good: 'Save evidence and report it', bad: 'Join in for fun', tip: 'Support others and tell a trusted adult.' },
    { id: 'f08', prompt: 'A friend sends you a private joke. What respects your friend?', good: 'Keep it private', bad: 'Post a screenshot', tip: 'Private messages should not be shared without permission.' },
    { id: 'f09', prompt: 'Which comment improves a group project?', good: '“Could we make the title clearer?”', bad: '“This is useless.”', tip: 'Specific, respectful feedback helps everyone improve.' },
    { id: 'f10', prompt: 'A photo clearly shows your street sign. Before posting...', good: 'Crop it or keep it private', bad: 'Share it publicly', tip: 'Photos can accidentally reveal personal information.' },
    { id: 'f11', prompt: 'Some classmates are excluded from an online group on purpose.', good: 'Include them or get help', bad: 'Laugh about it', tip: 'Kind digital citizens help others feel included.' },
    { id: 'f12', prompt: 'Before posting, which question should you ask?', good: '“Is it true, kind and safe?”', bad: '“Will it get attention?”', tip: 'Think about how a post may affect you and others.' }
  ]
};

const categoryDetails = {
  privacy: { icon: '🔐', name: 'Privacy Power' },
  scam: { icon: '🕵️', name: 'Scam Scanner' },
  footprint: { icon: '👣', name: 'Footprint Quest' }
};

const introSlides = [
  { icon: '💡', title: 'Digital Literacy', text: 'Using technology to learn, create and communicate.' },
  { icon: '🛡️', title: 'Think Smart. Stay Safe.', text: 'Protect private information and pause before you click.' },
  { icon: '💙', title: 'Be Kind Online', text: 'Every message and post leaves a digital footprint.' }
];

const storageNumber = (key, fallback) => {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
};

let state = {
  screen: 'attract',
  introStep: 0,
  roundIndex: 0,
  rounds: [],
  feedback: null,
  secondsLeft: 8,
  settingsOpen: false,
  audioUnlocked: false,
  musicMuted: localStorage.getItem('heritageMusicMuted') === 'true',
  fxMuted: localStorage.getItem('heritageFxMuted') === 'true',
  reducedMotion: localStorage.getItem('heritageReducedMotion') === 'true',
  musicVolume: storageNumber('heritageMusicVolume', 0.55),
  fxVolume: storageNumber('heritageFxVolume', 0.8)
};

let audioContext = null;
let musicLoop = null;
let musicStep = 0;
let duckUntil = 0;
let flowTimer = null;
let countdownTimer = null;

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getUsed(category) {
  try { return JSON.parse(localStorage.getItem(`heritageUsed-${category}`) || '[]'); }
  catch { return []; }
}

function drawChallenge(category) {
  const bank = challengeBank[category];
  let used = getUsed(category);
  let available = bank.filter(challenge => !used.includes(challenge.id));
  if (!available.length) {
    used = [];
    available = [...bank];
  }
  const challenge = available[Math.floor(Math.random() * available.length)];
  used.push(challenge.id);
  localStorage.setItem(`heritageUsed-${category}`, JSON.stringify(used));
  return challenge;
}

function prepareRun() {
  const categories = ['privacy', 'scam', 'footprint'];
  const correctSides = shuffled([0, 1, Math.random() < 0.5 ? 0 : 1]);
  state.rounds = categories.map((category, index) => {
    const challenge = drawChallenge(category);
    const correctSide = correctSides[index];
    return {
      ...challenge,
      category,
      correctSide,
      choices: correctSide === 0 ? [challenge.good, challenge.bad] : [challenge.bad, challenge.good]
    };
  });
  state.roundIndex = 0;
  state.feedback = null;
}

function usedChallengeCount() {
  return ['privacy', 'scam', 'footprint'].reduce((total, category) => total + getUsed(category).length, 0);
}

function logo() {
  return '<img class="logo" src="heritage-logo.png" alt="Heritage Academy">';
}

function progress() {
  if (state.screen === 'attract' || state.screen === 'intro') return '';
  return `<div class="progress" aria-label="Mission progress">${[0, 1, 2].map(index =>
    `<span class="dot ${index < state.roundIndex || state.screen === 'celebrate' ? 'done' : ''}"></span>`
  ).join('')}</div>`;
}

function settingsPanel() {
  return `<div class="settings-backdrop ${state.settingsOpen ? 'open' : ''}" id="settingsBackdrop">
    <section class="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
      <div class="settings-heading">
        <div><div class="eyebrow">Teacher controls</div><h2 id="settingsTitle">Settings</h2></div>
        <button class="icon-button close-settings" aria-label="Close settings">×</button>
      </div>
      <label class="setting-row" for="musicVolume"><span>Music volume</span><output id="musicOutput">${Math.round(state.musicVolume * 100)}%</output></label>
      <input id="musicVolume" type="range" min="0" max="1" step="0.05" value="${state.musicVolume}">
      <button class="action secondary wide" id="musicMute">${state.musicMuted ? 'Turn music on' : 'Mute music'}</button>
      <label class="setting-row" for="fxVolume"><span>Sound effects</span><output id="fxOutput">${Math.round(state.fxVolume * 100)}%</output></label>
      <input id="fxVolume" type="range" min="0" max="1" step="0.05" value="${state.fxVolume}">
      <button class="action secondary wide" id="fxMute">${state.fxMuted ? 'Turn effects on' : 'Mute effects'}</button>
      <button class="action secondary wide" id="motionToggle">${state.reducedMotion ? 'Use full animation' : 'Reduce animation'}</button>
      <div class="deck-status"><b>Challenge deck:</b> ${usedChallengeCount()} of 36 used</div>
      <div class="settings-actions">
        <button class="action" id="resetGame">Next student</button>
        <button class="action secondary" id="shuffleDeck">Reshuffle all</button>
        <button class="action secondary" id="fullscreenToggle">${document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'}</button>
      </div>
      <p class="small">Student keys: ← or → choose · ↓ next student · Teacher keys: S settings · M music · R reset</p>
    </section>
  </div>`;
}

function shell(content) {
  const label = state.screen === 'attract' ? 'READY PLAYER ONE'
    : state.screen === 'intro' ? 'DIGITAL LITERACY'
    : state.screen === 'celebrate' ? 'MISSION COMPLETE'
    : `MISSION ${state.roundIndex + 1} / 3`;
  return `<div class="shell">
    <header class="topbar">
      <div class="brand">${logo()}<span class="brandtext">DIGITAL LITERACY ARCADE</span></div>
      <div class="top-actions"><span class="pill">${label}</span><button class="settings-button" id="openSettings" aria-label="Open teacher settings" title="Settings (S)">⚙️</button></div>
    </header>
    <section class="stage">${content}</section>
    ${progress()}
    ${settingsPanel()}
  </div>`;
}

function attractScreen() {
  return shell(`<div class="card attract-card">
    <div class="eyebrow">Heritage Academy presents</div>
    <h1 class="title">Heritage<br>Digital Defender</h1>
    <p class="subtitle">Create. Explore. Stay Safe.</p>
    <div class="defender-orb">🛡️</div>
    <div class="start-prompt"><span class="arrow-key">←</span><b>Press either arrow to enter</b><span class="arrow-key">→</span></div>
    <p class="tip">Three quick missions • About 50 seconds</p>
  </div>`);
}

function introScreen() {
  const slide = introSlides[state.introStep];
  return shell(`<div class="card intro-card" aria-live="polite">
    <div class="intro-step">${state.introStep + 1} / ${introSlides.length}</div>
    <div class="mission-icon intro-icon">${slide.icon}</div>
    <div class="eyebrow">What is Digital Literacy?</div>
    <h1 class="title compact-title">${slide.title}</h1>
    <p class="subtitle">${slide.text}</p>
    <div class="intro-progress">${introSlides.map((_, index) => `<span class="${index <= state.introStep ? 'active' : ''}"></span>`).join('')}</div>
  </div>`);
}

function challengeScreen() {
  const round = state.rounds[state.roundIndex];
  const details = categoryDetails[round.category];
  const result = state.feedback;
  const portalClass = side => {
    if (!result) return '';
    if (side === round.correctSide) return 'correct';
    if (side === result.side) return 'wrong';
    return 'dimmed';
  };
  const dashClass = result?.side === 0 ? 'dash-left' : result?.side === 1 ? 'dash-right' : '';
  return shell(`<div class="card challenge-card" aria-live="polite">
    <div class="challenge-topline"><div class="eyebrow">${details.name}</div><div class="countdown"><span id="timeValue">${state.secondsLeft}</span>s</div></div>
    <div class="timer-track"><span id="timerFill" style="width:${state.secondsLeft / 8 * 100}%"></span></div>
    <div class="mission-icon challenge-icon">${details.icon}</div>
    <h1 class="subtitle challenge-question">${round.prompt}</h1>
    <div class="portal-grid">
      <div class="portal ${portalClass(0)}"><span class="portal-arrow">←</span><span>${round.choices[0]}</span></div>
      <div class="portal ${portalClass(1)}"><span class="portal-arrow">→</span><span>${round.choices[1]}</span></div>
      <div class="runner ${dashClass}" aria-hidden="true">🛡️</div>
    </div>
    ${result ? `<div class="feedback-panel ${result.correct ? 'success' : 'learning'}">
      <b>${result.correct ? 'POWER-UP EARNED!' : result.timedOut ? 'TIME’S UP—SMART MOVE REVEALED!' : 'GOOD TRY—SHIELD UPDATED!'}</b>
      <span>${round.tip}</span>
    </div>` : '<p class="key-hint">Choose with the ← or → arrow key</p>'}
  </div>`);
}

function celebrationScreen() {
  return shell(`<div class="card celebration-card" aria-live="polite">
    <div class="confetti"></div>
    <div class="celebration-content">
      <div class="badge">🛡️</div>
      <div class="eyebrow achievement-label">Heritage Academy badge earned</div>
      <h1 class="title">Digital<br>Defender!</h1>
      <p class="subtitle">You are ready to create, explore and stay safe.</p>
      <div class="future-icons"><span>💻<b>Code</b></span><span>🎨<b>Create</b></span><span>🤖<b>Explore AI</b></span><span>🛡️<b>Stay safe</b></span></div>
      <div class="next-prompt"><span class="arrow-key">↓</span><b>Next Defender</b></div>
      <p class="tip">Resetting automatically...</p>
    </div>
  </div>`);
}

function render() {
  document.body.classList.toggle('reduced-motion', state.reducedMotion);
  const app = document.getElementById('app');
  app.innerHTML = state.screen === 'attract' ? attractScreen()
    : state.screen === 'intro' ? introScreen()
    : state.screen === 'question' ? challengeScreen()
    : celebrationScreen();
  bindTeacherControls();
}

function bindTeacherControls() {
  document.getElementById('openSettings').onclick = openSettings;
  document.querySelector('.close-settings').onclick = closeSettings;
  document.getElementById('settingsBackdrop').onclick = event => {
    if (event.target.id === 'settingsBackdrop') closeSettings();
  };
  document.getElementById('musicMute').onclick = toggleMusic;
  document.getElementById('fxMute').onclick = toggleEffects;
  document.getElementById('motionToggle').onclick = toggleMotion;
  document.getElementById('resetGame').onclick = returnToAttract;
  document.getElementById('shuffleDeck').onclick = reshuffleDeck;
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
}

function clearFlowTimers() {
  clearTimeout(flowTimer);
  clearInterval(countdownTimer);
  flowTimer = null;
  countdownTimer = null;
}

function enterArcade() {
  clearFlowTimers();
  state.audioUnlocked = true;
  state.introStep = 0;
  state.screen = 'intro';
  prepareRun();
  ensureAudio();
  startMusic();
  requestFullscreen();
  playEffect('start');
  render();
  scheduleIntro();
}

function scheduleIntro() {
  clearTimeout(flowTimer);
  flowTimer = setTimeout(() => {
    if (state.settingsOpen || state.screen !== 'intro') return;
    if (state.introStep < introSlides.length - 1) {
      state.introStep += 1;
      render();
      scheduleIntro();
    } else {
      beginQuestion();
    }
  }, 2200);
}

function beginQuestion() {
  clearFlowTimers();
  state.screen = 'question';
  state.feedback = null;
  state.secondsLeft = 8;
  render();
  startCountdown();
}

function updateCountdown() {
  const value = document.getElementById('timeValue');
  const fill = document.getElementById('timerFill');
  if (value) value.textContent = state.secondsLeft;
  if (fill) fill.style.width = `${Math.max(0, state.secondsLeft / 8 * 100)}%`;
}

function startCountdown() {
  clearInterval(countdownTimer);
  updateCountdown();
  countdownTimer = setInterval(() => {
    if (state.settingsOpen || state.screen !== 'question' || state.feedback) return;
    state.secondsLeft -= 1;
    updateCountdown();
    if (state.secondsLeft <= 0) resolveChoice(null);
  }, 1000);
}

function resolveChoice(side) {
  if (state.screen !== 'question' || state.feedback) return;
  clearInterval(countdownTimer);
  const round = state.rounds[state.roundIndex];
  const correct = side === round.correctSide;
  state.feedback = { side, correct, timedOut: side === null };
  playEffect(correct ? 'correct' : side === null ? 'timeout' : 'wrong');
  render();
  flowTimer = setTimeout(nextRound, 2400);
}

function nextRound() {
  if (state.settingsOpen) return;
  if (state.roundIndex < 2) {
    state.roundIndex += 1;
    beginQuestion();
  } else {
    showCelebration();
  }
}

function showCelebration() {
  clearFlowTimers();
  state.screen = 'celebrate';
  musicStep = 0;
  playEffect('win');
  render();
  flowTimer = setTimeout(returnToAttract, 8000);
}

function returnToAttract() {
  clearFlowTimers();
  state.screen = 'attract';
  state.introStep = 0;
  state.roundIndex = 0;
  state.rounds = [];
  state.feedback = null;
  state.secondsLeft = 8;
  state.settingsOpen = false;
  musicStep = 0;
  render();
}

function openSettings() {
  clearFlowTimers();
  state.settingsOpen = true;
  render();
  document.querySelector('.close-settings').focus();
}

function closeSettings() {
  state.settingsOpen = false;
  render();
  document.getElementById('openSettings').focus();
  resumeFlow();
}

function resumeFlow() {
  if (state.screen === 'intro') scheduleIntro();
  else if (state.screen === 'question' && !state.feedback) startCountdown();
  else if (state.screen === 'question' && state.feedback) flowTimer = setTimeout(nextRound, 2400);
  else if (state.screen === 'celebrate') flowTimer = setTimeout(returnToAttract, 8000);
}

function reshuffleDeck() {
  ['privacy', 'scam', 'footprint'].forEach(category => localStorage.removeItem(`heritageUsed-${category}`));
  returnToAttract();
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
  const duck = channel === 'music' && performance.now() < duckUntil ? 0.3 : 1;
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(Math.max(0.0001, volume * channelVolume * duck), context.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + delay + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(context.currentTime + delay);
  oscillator.stop(context.currentTime + delay + duration);
}

function playEffect(type) {
  duckUntil = performance.now() + 650;
  if (type === 'correct') {
    tone(523, 0.12); tone(659, 0.12, 'square', 0.05, 0.12); tone(784, 0.22, 'square', 0.055, 0.24);
  } else if (type === 'wrong' || type === 'timeout') {
    tone(220, 0.14, 'sawtooth'); tone(type === 'timeout' ? 196 : 165, 0.22, 'triangle', 0.04, 0.14);
  } else if (type === 'win') {
    [523, 659, 784, 1047].forEach((frequency, index) => tone(frequency, 0.3, 'square', 0.05, index * 0.15));
  } else {
    tone(392, 0.1); tone(523, 0.16, 'square', 0.045, 0.1);
  }
}

function playMusicNote() {
  if (!state.audioUnlocked || state.musicMuted) return;
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
  musicLoop = setInterval(playMusicNote, 250);
}

function toggleMusic() {
  state.musicMuted = !state.musicMuted;
  localStorage.setItem('heritageMusicMuted', state.musicMuted);
  if (!state.musicMuted && state.audioUnlocked) ensureAudio();
  render();
}

function toggleEffects() {
  state.fxMuted = !state.fxMuted;
  localStorage.setItem('heritageFxMuted', state.fxMuted);
  if (!state.fxMuted && state.audioUnlocked) playEffect('start');
  render();
}

function toggleMotion() {
  state.reducedMotion = !state.reducedMotion;
  localStorage.setItem('heritageReducedMotion', state.reducedMotion);
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
  resumeFlow();
}

addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  if (['arrowleft', 'arrowright', 'arrowdown', 'arrowup'].includes(key)) event.preventDefault();
  if (key === 's') {
    state.settingsOpen ? closeSettings() : openSettings();
    return;
  }
  if (event.key === 'Escape' && state.settingsOpen) {
    closeSettings();
    return;
  }
  if (state.settingsOpen) return;
  if (state.audioUnlocked) ensureAudio();
  if (key === 'm') toggleMusic();
  if (key === 'r') returnToAttract();
  if (state.screen === 'attract' && (key === 'arrowleft' || key === 'arrowright')) enterArcade();
  else if (state.screen === 'question' && key === 'arrowleft') resolveChoice(0);
  else if (state.screen === 'question' && key === 'arrowright') resolveChoice(1);
  else if (state.screen === 'celebrate' && key === 'arrowdown') returnToAttract();
});

document.addEventListener('fullscreenchange', () => {
  if (state.settingsOpen) render();
});

render();
