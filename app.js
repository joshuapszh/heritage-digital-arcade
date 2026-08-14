const CATEGORIES = ['privacy', 'safety', 'footprint', 'information', 'creativity'];
const CATEGORY_DETAILS = {
  privacy: { icon:'🔐', short:'Privacy', title:'Privacy Power' },
  safety: { icon:'🛡️', short:'Safety', title:'Safety Scanner' },
  footprint: { icon:'👣', short:'Footprint', title:'Footprint Trail' },
  information: { icon:'🔎', short:'Information', title:'Truth Tracker' },
  creativity: { icon:'🎨', short:'Creativity', title:'Creator Code' }
};
const INTRO_SLIDES = [
  { icon:'💡', title:'Digital Literacy', text:'Using technology to learn, create and communicate—smartly, safely and kindly.', tags:['Learn','Create','Communicate'] },
  { icon:'👣', title:'Your Digital Footprint', text:'Every search, message, game and post can leave a trail of information about you.', tags:['Searches','Photos','Chats','Games'] },
  { icon:'📡', title:'Online Actions Travel', text:'Posts can be copied, shared and remembered. Pause before you add to your trail.', tags:['Copy','Share','Screenshot'] },
  { icon:'🛡️', title:'Sprint Safely', text:'Protect private details, check information and choose what is true, kind and safe.', tags:['Private','Trusted','Kind'] }
];
const GATE_SECONDS = { junior:7, senior:6, mixed:6 };
const INTRO_MS = 2400;
const FEEDBACK_MS = 1800;
const CELEBRATION_MS = 6000;

const savedNumber = (key, fallback) => {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
};

let state = {
  screen:'attract',
  mode:localStorage.getItem('cyberSprintMode') || 'mixed',
  introStep:0,
  lane:1,
  practiceTarget:0,
  practiceDone:false,
  run:[],
  challengeIndex:0,
  secondsLeft:6,
  gateActive:false,
  locked:false,
  result:null,
  completed:0,
  settingsOpen:false,
  audioUnlocked:false,
  musicMuted:localStorage.getItem('heritageMusicMuted') === 'true',
  fxMuted:localStorage.getItem('heritageFxMuted') === 'true',
  reducedMotion:localStorage.getItem('heritageReducedMotion') === 'true',
  musicVolume:savedNumber('heritageMusicVolume', .78),
  fxVolume:savedNumber('heritageFxVolume', .95)
};

let flowTimer = null;
let countdownTimer = null;
let audioContext = null;
let musicTimer = null;
let musicStep = 0;
let duckUntil = 0;

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function deckKey(category) {
  return `cyberSprintUsed-${state.mode}-${category}`;
}

function eligibleQuestions(category) {
  return state.mode === 'mixed' ? CHALLENGE_BANK[category] : CHALLENGE_BANK[category].filter(item => item.level === state.mode);
}

function getUsed(category) {
  try { return JSON.parse(localStorage.getItem(deckKey(category)) || '[]'); }
  catch { return []; }
}

function drawQuestion(category) {
  const pool = eligibleQuestions(category);
  let used = getUsed(category);
  let available = pool.filter(question => !used.includes(question.id));
  if (!available.length) {
    used = [];
    available = [...pool];
  }
  const question = available[Math.floor(Math.random() * available.length)];
  used.push(question.id);
  localStorage.setItem(deckKey(category), JSON.stringify(used));
  return question;
}

function prepareRun() {
  const plannedCorrectLanes = shuffled([0, 1, 2, Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]);
  state.run = shuffled(CATEGORIES).map((category, index) => {
    const question = drawQuestion(category);
    const correctLane = plannedCorrectLanes[index];
    const distractors = shuffled(question.a.slice(1));
    const answers = [...distractors];
    answers.splice(correctLane, 0, question.a[0]);
    return { ...question, category, answers, correctLane };
  });
  state.challengeIndex = 0;
  state.completed = 0;
}

function usedCount() {
  return CATEGORIES.reduce((sum, category) => sum + getUsed(category).length, 0);
}

function totalAvailable() {
  return CATEGORIES.reduce((sum, category) => sum + eligibleQuestions(category).length, 0);
}

function logo() {
  return '<img class="logo" src="heritage-logo.png" alt="Heritage Academy">';
}

function modeName() {
  return state.mode === 'junior' ? 'Junior · Grades 3–4' : state.mode === 'senior' ? 'Senior · Grades 5–6' : 'Mixed · Grades 3–6';
}

function progressStrip() {
  if (!['run','feedback','celebrate'].includes(state.screen)) return '';
  return `<div class="sprint-progress" aria-label="Sprint progress">${state.run.map((challenge, index) => {
    const details = CATEGORY_DETAILS[challenge.category];
    return `<span class="${index < state.completed || state.screen === 'celebrate' ? 'cleared' : index === state.challengeIndex ? 'current' : ''}" title="${details.title}">${details.icon}</span>`;
  }).join('')}</div>`;
}

function settingsPanel() {
  return `<div class="settings-backdrop ${state.settingsOpen ? 'open' : ''}" id="settingsBackdrop">
    <section class="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
      <div class="settings-heading"><div><div class="eyebrow">Teacher controls</div><h2 id="settingsTitle">Cyber Sprint Settings</h2></div><button class="icon-button close-settings" aria-label="Close settings">×</button></div>
      <div class="setting-label">Difficulty</div>
      <div class="mode-grid">${['junior','mixed','senior'].map(mode => `<button class="mode-button ${state.mode === mode ? 'active' : ''}" data-mode="${mode}">${mode === 'junior' ? 'Junior' : mode === 'senior' ? 'Senior' : 'Mixed'}</button>`).join('')}</div>
      <label class="setting-row" for="musicVolume"><span>Music</span><output id="musicOutput">${Math.round(state.musicVolume * 100)}%</output></label>
      <input id="musicVolume" type="range" min="0" max="1" step=".05" value="${state.musicVolume}">
      <button class="action secondary wide" id="musicMute">${state.musicMuted ? 'Turn music on' : 'Mute music'}</button>
      <label class="setting-row" for="fxVolume"><span>Effects</span><output id="fxOutput">${Math.round(state.fxVolume * 100)}%</output></label>
      <input id="fxVolume" type="range" min="0" max="1" step=".05" value="${state.fxVolume}">
      <button class="action secondary wide" id="fxMute">${state.fxMuted ? 'Turn effects on' : 'Mute effects'}</button>
      <button class="action secondary wide" id="motionToggle">${state.reducedMotion ? 'Use full animation' : 'Reduce animation'}</button>
      <div class="deck-status"><b>${modeName()}</b><br>${usedCount()} of ${totalAvailable()} challenges used</div>
      <div class="settings-actions"><button class="action" id="nextStudent">Next student</button><button class="action secondary" id="shuffleDeck">Reshuffle deck</button><button class="action secondary" id="fullscreenToggle">${document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'}</button></div>
      <p class="small">Students: ← → move · ↓ next student. Teachers: S settings · M music · R reset.</p>
    </section>
  </div>`;
}

function shell(content) {
  const status = state.screen === 'attract' ? 'READY TO SPRINT' : state.screen === 'intro' ? 'DIGITAL BRIEFING' : state.screen === 'practice' ? 'PRACTICE GATE' : state.screen === 'celebrate' ? 'SPRINT COMPLETE' : `GATE ${state.challengeIndex + 1} / 5`;
  return `<div class="shell"><header class="topbar"><div class="brand">${logo()}<span class="brandtext">HERITAGE CYBER SPRINT</span></div><div class="top-actions"><span class="pill">${status}</span><button class="settings-button" id="openSettings" aria-label="Open teacher settings" title="Settings (S)">⚙️</button></div></header><main class="stage">${content}</main>${progressStrip()}${settingsPanel()}</div>`;
}

function keyCap(key) {
  return `<span class="arrow-key">${key}</span>`;
}

function attractScreen() {
  return shell(`<section class="hero-card"><div class="eyebrow">Heritage Academy presents</div><h1 class="title">Heritage<br>Cyber Sprint</h1><p class="subtitle">Run the lanes. Choose wisely. Build a brilliant digital footprint.</p><div class="hero-runner">🏃<span>🛡️</span></div><div class="start-prompt">${keyCap('←')}<b>Press an arrow to sprint</b>${keyCap('→')}</div><p class="tip">Five knowledge gates • ${modeName()} • About one minute</p></section>`);
}

function introScreen() {
  const slide = INTRO_SLIDES[state.introStep];
  return shell(`<section class="briefing-card" aria-live="polite"><div class="intro-count">${state.introStep + 1} / ${INTRO_SLIDES.length}</div><div class="brief-icon">${slide.icon}</div><div class="eyebrow">Digital briefing</div><h1 class="brief-title">${slide.title}</h1><p class="brief-copy">${slide.text}</p><div class="concept-tags">${slide.tags.map(tag => `<span>${tag}</span>`).join('')}</div><div class="intro-progress">${INTRO_SLIDES.map((_, index) => `<span class="${index <= state.introStep ? 'active' : ''}"></span>`).join('')}</div></section>`);
}

function cityBackdrop() {
  return `<div class="cyber-sky"><div class="cyber-moon"></div><div class="building b1"></div><div class="building b2"></div><div class="building b3"></div><div class="building b4"></div><div class="building b5"></div></div>`;
}

function runnerRoad(inner, extraClass = '') {
  return `<div class="runner-world ${extraClass}">${cityBackdrop()}<div class="speed-lines"></div><div class="road"><span class="lane-line line-one"></span><span class="lane-line line-two"></span><div class="data-coins">✦　✦　✦</div><div class="lane-glow glow-${state.lane}"></div><div class="runner-avatar lane-${state.lane}"><span class="runner-person">🏃</span><span class="runner-shield">🛡️</span><i class="footprint fp1">👣</i><i class="footprint fp2">👣</i></div></div>${inner}</div>`;
}

function practiceScreen() {
  const gates = [0,1,2].map(lane => `<div class="practice-ring lane-slot-${lane} ${lane === state.practiceTarget ? 'target' : ''}">${lane === state.practiceTarget ? 'MOVE HERE' : ''}</div>`).join('');
  return shell(`<section class="sprint-card"><div class="question-banner"><div class="eyebrow">Control practice</div><h1>Move into the glowing lane</h1><p>Use only the left and right arrow keys.</p></div>${runnerRoad(`<div class="practice-gates">${gates}</div>`, state.practiceDone ? 'practice-success' : '')}<div class="lane-instruction">${keyCap('←')} Move left　•　Move right ${keyCap('→')}</div></section>`);
}

function gateClass(lane, challenge) {
  if (!state.locked) return lane === state.lane ? 'selected' : '';
  if (lane === challenge.correctLane) return 'correct';
  if (lane === state.lane) return 'wrong';
  return 'dimmed';
}

function runScreen() {
  const challenge = state.run[state.challengeIndex];
  const details = CATEGORY_DETAILS[challenge.category];
  const gates = challenge.answers.map((answer, lane) => `<div class="answer-gate lane-slot-${lane} ${gateClass(lane, challenge)}"><span class="gate-label">${lane === 0 ? '← LEFT' : lane === 1 ? 'CENTRE' : 'RIGHT →'}</span><b>${answer}</b></div>`).join('');
  const feedback = state.locked ? `<aside class="knowledge-card ${state.result.correct ? 'boost' : 'repair'}"><div><strong>${state.result.correct ? 'POWER BOOST!' : 'SHIELD REPAIR!'}</strong><span>Best lane: ${challenge.answers[challenge.correctLane]}</span></div><p>${challenge.why}</p><b>Remember: ${challenge.rule}</b></aside>` : '';
  const timerLabel = state.gateActive || state.locked ? `<b id="timeValue">${state.secondsLeft}</b>s` : '<b id="timeValue">READY</b>';
  return shell(`<section class="sprint-card"><div class="question-banner"><div class="banner-row"><span class="category-chip">${details.icon} ${details.title}</span><span class="countdown">${timerLabel}</span></div><h1>${challenge.q}</h1><div class="timer-track"><span id="timerFill" style="width:${state.secondsLeft / GATE_SECONDS[state.mode] * 100}%"></span></div></div>${runnerRoad(`<div class="answer-gates ${state.gateActive || state.locked ? '' : 'waiting'}" style="--gate-duration:${state.secondsLeft}s">${gates}</div>`, state.locked ? 'locked' : '')}${feedback}<div class="lane-instruction">${state.locked ? 'Knowledge boost—next gate approaching!' : state.gateActive ? `Choose your lane before the gate arrives　${keyCap('←')} ${keyCap('→')}` : 'Read all three answers—get ready!'}</div></section>`);
}

function celebrationScreen() {
  return shell(`<section class="victory-card" aria-live="polite"><div class="confetti"></div><div class="victory-content"><div class="badge">🏃</div><div class="eyebrow">Heritage Academy badge earned</div><h1 class="title">Cyber Sprint<br>Defender!</h1><p class="subtitle">You cleared five gates and strengthened your digital footprint.</p><div class="recap-grid"><span>🔐<b>Protect</b></span><span>🛡️<b>Check</b></span><span>👣<b>Be kind</b></span><span>🔎<b>Verify</b></span><span>🎨<b>Create</b></span></div><div class="next-prompt">${keyCap('↓')}<b>Next student</b></div><p class="tip">Create. Explore. Stay safe.</p></div></section>`);
}

function render() {
  document.body.classList.toggle('reduced-motion', state.reducedMotion);
  document.getElementById('app').innerHTML = state.screen === 'attract' ? attractScreen() : state.screen === 'intro' ? introScreen() : state.screen === 'practice' ? practiceScreen() : ['run','feedback'].includes(state.screen) ? runScreen() : celebrationScreen();
  bindTeacherControls();
}

function bindTeacherControls() {
  document.getElementById('openSettings').onclick = openSettings;
  document.querySelector('.close-settings').onclick = closeSettings;
  document.getElementById('settingsBackdrop').onclick = event => { if (event.target.id === 'settingsBackdrop') closeSettings(); };
  document.querySelectorAll('[data-mode]').forEach(button => button.onclick = () => setMode(button.dataset.mode));
  document.getElementById('musicMute').onclick = toggleMusic;
  document.getElementById('fxMute').onclick = toggleEffects;
  document.getElementById('motionToggle').onclick = toggleMotion;
  document.getElementById('nextStudent').onclick = returnToAttract;
  document.getElementById('shuffleDeck').onclick = reshuffleDeck;
  document.getElementById('fullscreenToggle').onclick = toggleFullscreen;
  const music = document.getElementById('musicVolume');
  music.oninput = () => { state.musicVolume = Number(music.value); document.getElementById('musicOutput').value = `${Math.round(state.musicVolume * 100)}%`; localStorage.setItem('heritageMusicVolume', state.musicVolume); };
  const effects = document.getElementById('fxVolume');
  effects.oninput = () => { state.fxVolume = Number(effects.value); document.getElementById('fxOutput').value = `${Math.round(state.fxVolume * 100)}%`; localStorage.setItem('heritageFxVolume', state.fxVolume); };
}

function clearFlowTimers() {
  clearTimeout(flowTimer);
  clearInterval(countdownTimer);
  flowTimer = null;
  countdownTimer = null;
}

function enterSprint() {
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
    if (state.introStep < INTRO_SLIDES.length - 1) {
      state.introStep += 1;
      render();
      scheduleIntro();
    } else startPractice();
  }, INTRO_MS);
}

function startPractice() {
  clearFlowTimers();
  state.screen = 'practice';
  state.lane = 1;
  state.practiceTarget = Math.random() < .5 ? 0 : 2;
  state.practiceDone = false;
  render();
}

function moveRunner(direction) {
  if (!['practice','run'].includes(state.screen) || state.locked) return;
  const nextLane = Math.max(0, Math.min(2, state.lane + direction));
  if (nextLane === state.lane) return;
  state.lane = nextLane;
  playEffect('move');
  updateRunnerLane();
  if (state.screen === 'practice' && state.lane === state.practiceTarget) completePractice();
}

function updateRunnerLane() {
  const runner = document.querySelector('.runner-avatar');
  if (runner) runner.className = `runner-avatar lane-${state.lane}`;
  document.querySelectorAll('.answer-gate').forEach((gate, lane) => gate.classList.toggle('selected', lane === state.lane));
}

function completePractice() {
  if (state.practiceDone) return;
  state.practiceDone = true;
  playEffect('correct');
  document.querySelector('.runner-world')?.classList.add('practice-success');
  flowTimer = setTimeout(startGate, 1200);
}

function startGate() {
  clearFlowTimers();
  state.screen = 'run';
  state.lane = 1;
  state.locked = false;
  state.gateActive = false;
  state.result = null;
  state.secondsLeft = GATE_SECONDS[state.mode];
  render();
  flowTimer = setTimeout(activateGate, 900);
}

function activateGate() {
  if (state.settingsOpen || state.screen !== 'run' || state.locked) return;
  state.gateActive = true;
  render();
  startCountdown();
}

function updateCountdown() {
  const value = document.getElementById('timeValue');
  const fill = document.getElementById('timerFill');
  if (value) value.textContent = state.secondsLeft;
  if (fill) fill.style.width = `${Math.max(0, state.secondsLeft / GATE_SECONDS[state.mode] * 100)}%`;
}

function startCountdown() {
  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    if (state.settingsOpen || state.screen !== 'run' || state.locked) return;
    state.secondsLeft -= 1;
    updateCountdown();
    if (state.secondsLeft <= 3 && state.secondsLeft > 0) playEffect('tick');
    if (state.secondsLeft <= 0) lockGate();
  }, 1000);
}

function lockGate() {
  if (state.locked || state.screen !== 'run') return;
  clearInterval(countdownTimer);
  const challenge = state.run[state.challengeIndex];
  state.locked = true;
  state.screen = 'feedback';
  state.result = { correct:state.lane === challenge.correctLane };
  state.completed += 1;
  playEffect(state.result.correct ? 'correct' : 'wrong');
  render();
  flowTimer = setTimeout(nextGate, FEEDBACK_MS);
}

function nextGate() {
  if (state.settingsOpen) return;
  if (state.challengeIndex < state.run.length - 1) {
    state.challengeIndex += 1;
    startGate();
  } else showCelebration();
}

function showCelebration() {
  clearFlowTimers();
  state.screen = 'celebrate';
  musicStep = 0;
  playEffect('win');
  render();
  flowTimer = setTimeout(returnToAttract, CELEBRATION_MS);
}

function returnToAttract() {
  clearFlowTimers();
  state.screen = 'attract';
  state.introStep = 0;
  state.lane = 1;
  state.run = [];
  state.challengeIndex = 0;
  state.completed = 0;
  state.locked = false;
  state.gateActive = false;
  state.result = null;
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
  else if (state.screen === 'run' && state.gateActive) startCountdown();
  else if (state.screen === 'run') flowTimer = setTimeout(activateGate, 900);
  else if (state.screen === 'feedback') flowTimer = setTimeout(nextGate, FEEDBACK_MS);
  else if (state.screen === 'celebrate') flowTimer = setTimeout(returnToAttract, CELEBRATION_MS);
}

function setMode(mode) {
  state.mode = mode;
  localStorage.setItem('cyberSprintMode', mode);
  returnToAttract();
}

function reshuffleDeck() {
  ['junior','senior','mixed'].forEach(mode => CATEGORIES.forEach(category => localStorage.removeItem(`cyberSprintUsed-${mode}-${category}`)));
  returnToAttract();
}

function ensureAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function tone(frequency, duration, type = 'square', volume = .075, delay = 0, channel = 'fx') {
  if ((channel === 'music' && state.musicMuted) || (channel === 'fx' && state.fxMuted)) return;
  const context = ensureAudio();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const channelVolume = channel === 'music' ? state.musicVolume : state.fxVolume;
  const duck = channel === 'music' && performance.now() < duckUntil ? .55 : 1;
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(Math.max(.0001, volume * channelVolume * duck), context.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + delay + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(context.currentTime + delay);
  oscillator.stop(context.currentTime + delay + duration);
}

function playEffect(type) {
  duckUntil = performance.now() + 550;
  if (type === 'move') tone(330, .08, 'triangle', .045);
  else if (type === 'tick') tone(880, .07, 'square', .05);
  else if (type === 'correct') { tone(523,.11,'square',.08); tone(659,.11,'square',.085,.1); tone(784,.2,'square',.09,.2); }
  else if (type === 'wrong') { tone(220,.14,'sawtooth',.075); tone(165,.22,'triangle',.07,.14); }
  else if (type === 'win') [523,659,784,1047].forEach((note,index) => tone(note,.28,'square',.085,index*.14));
  else { tone(392,.1,'square',.075); tone(523,.16,'square',.08,.1); }
}

function playMusicBeat() {
  if (!state.audioUnlocked || state.musicMuted) return;
  const normal = [262,330,392,330,294,370,440,370,330,392,494,392];
  const rush = [392,494,587,494,440,554,659,554];
  const victory = [523,659,784,1047,784,659,698,880,1047,880,784,659];
  const melody = state.screen === 'celebrate' ? victory : state.screen === 'run' && state.secondsLeft <= 2 ? rush : normal;
  const note = melody[musicStep % melody.length];
  tone(note,.2,state.screen === 'celebrate' ? 'square' : 'triangle',.062,0,'music');
  if ((state.screen === 'celebrate' || state.screen === 'run') && musicStep % 2 === 0) tone(note/2,.26,'triangle',.03,0,'music');
  musicStep += 1;
}

function scheduleMusic() {
  clearTimeout(musicTimer);
  playMusicBeat();
  const delay = state.screen === 'run' && state.secondsLeft <= 2 ? 145 : state.screen === 'celebrate' ? 180 : 240;
  musicTimer = setTimeout(scheduleMusic, delay);
}

function startMusic() {
  if (!musicTimer) scheduleMusic();
}

function toggleMusic() {
  state.musicMuted = !state.musicMuted;
  localStorage.setItem('heritageMusicMuted', state.musicMuted);
  if (!state.musicMuted && state.audioUnlocked) { ensureAudio(); startMusic(); }
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
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.(); else requestFullscreen();
  state.settingsOpen = false;
  render();
  resumeFlow();
}

addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  if (['arrowleft','arrowright','arrowdown','arrowup'].includes(key)) event.preventDefault();
  if (key === 's') { state.settingsOpen ? closeSettings() : openSettings(); return; }
  if (event.key === 'Escape' && state.settingsOpen) { closeSettings(); return; }
  if (state.settingsOpen) return;
  if (state.audioUnlocked) ensureAudio();
  if (key === 'm') toggleMusic();
  if (key === 'r') returnToAttract();
  if (state.screen === 'attract' && ['arrowleft','arrowright'].includes(key)) enterSprint();
  else if (['practice','run'].includes(state.screen) && key === 'arrowleft') moveRunner(-1);
  else if (['practice','run'].includes(state.screen) && key === 'arrowright') moveRunner(1);
  else if (state.screen === 'celebrate' && key === 'arrowdown') returnToAttract();
});

document.addEventListener('fullscreenchange', () => { if (state.settingsOpen) render(); });
render();
