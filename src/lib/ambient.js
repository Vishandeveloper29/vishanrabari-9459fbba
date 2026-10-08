import { toast } from './toast';
// Original generative lo-fi / ambient loop, synthesised live with the Web Audio API.
// No audio files, no copyright issues, ~0 KB of assets.
// Am7 -> Fmaj7 -> Cmaj7 -> G6, 78 BPM: warm pad + bass + kick/clap/hat + echoing plucks.
const BPM = 78, STEP = 60 / BPM / 4; // one 16th note
const CHORDS = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 59], [55, 59, 62, 64]];
const ARP = [0, 1, 2, 3, 2, 1, 3, 2];
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

let ctx, master, fx, noise, timer, stopTimer, raf, nextTime = 0, idx = 0, analyser, on = false;

function init() {
  const AC = window.AudioContext || window.webkitAudioContext;
  ctx = new AC();
  master = ctx.createGain(); master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  analyser = ctx.createAnalyser(); analyser.fftSize = 256; analyser.smoothingTimeConstant = 0.8;
  master.connect(comp); comp.connect(analyser); analyser.connect(ctx.destination);

  // echo bus for the plucks
  fx = ctx.createGain(); fx.gain.value = 0.5;
  const delay = ctx.createDelay(1); delay.delayTime.value = STEP * 3;
  const fb = ctx.createGain(); fb.gain.value = 0.4;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2000;
  fx.connect(delay); delay.connect(lp); lp.connect(fb); fb.connect(delay); lp.connect(master);

  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else if (on) ctx.resume();
  });
}

function env(g, t, peak, attack, dur) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
}

function pad(chord, t) {
  const dur = STEP * 16;
  const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 750; f.Q.value = 0.7;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.05, t + 1.3);
  g.gain.setValueAtTime(0.05, t + dur - 0.2);
  g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.9);
  f.connect(g); g.connect(master);
  chord.forEach((m) => [-7, 7].forEach((det) => {
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = det;
    o.connect(f); o.start(t); o.stop(t + dur + 1);
  }));
}

function bass(m, t) {
  const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = mtof(m);
  env(g, t, 0.28, 0.02, STEP * 7); o.connect(g); g.connect(master); o.start(t); o.stop(t + STEP * 7 + 0.1);
}

function pluck(m, t, vol) {
  const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  o.type = 'triangle'; o.frequency.value = mtof(m);
  f.type = 'lowpass'; f.frequency.value = 2600;
  env(g, t, vol, 0.006, 0.75);
  o.connect(f); f.connect(g); g.connect(master); g.connect(fx); o.start(t); o.stop(t + 0.8);
}

function kick(t) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.17);
  env(g, t, 0.7, 0.004, 0.34); o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.4);
}

function hit(t, type, freq, vol, dur) {
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noise; f.type = type; f.frequency.value = freq;
  env(g, t, vol, 0.002, dur); s.connect(f); f.connect(g); g.connect(master);
  s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
}

function step(i, t) {
  const bar = Math.floor(i / 16) % 4, s = i % 16, chord = CHORDS[bar];
  if (s === 0) pad(chord, t);
  if (s === 0 || s === 8) bass(chord[0] - 24, t);
  if (s === 0 || s === 8 || (s === 11 && bar % 2)) kick(t);
  if (s === 4 || s === 12) hit(t, 'bandpass', 1600, 0.09, 0.14);
  if (s % 2 === 0) hit(t, 'highpass', 7500, s % 4 === 2 ? 0.05 : 0.025, 0.05);
  if (s % 2 === 0 && s !== 10) pluck(chord[ARP[s / 2]] + 12, t, 0.09);
  if (s === 14) pluck(chord[3] + 24, t, 0.05);
}

function schedule() {
  while (nextTime < ctx.currentTime + 0.3) { step(idx, nextTime); nextTime += STEP; idx = (idx + 1) % 64; }
}

// Publishes the bass level as --beat (0..1) so the page can pulse with the music.
function beatLoop() {
  const data = new Uint8Array(analyser.frequencyBinCount);
  let last = -1, lastT = 0;
  const loop = (t) => {
    raf = requestAnimationFrame(loop);
    if (t - lastT < 33) return;
    lastT = t;
    analyser.getByteFrequencyData(data);
    let s = 0; for (let i = 0; i < 6; i++) s += data[i];
    const v = Math.round(Math.min(1, (s / 6 / 255) * 1.5) * 50) / 50;
    if (v !== last) { document.documentElement.style.setProperty('--beat', v); last = v; }
  };
  raf = requestAnimationFrame(loop);
}

export async function startMusic() {
  if (!ctx) init();
  clearTimeout(stopTimer);
  await ctx.resume();
  on = true;
  if (!timer) { nextTime = ctx.currentTime + 0.05; idx = 0; timer = setInterval(schedule, 60); beatLoop(); }
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(0.6, ctx.currentTime, 0.5);
  window.dispatchEvent(new CustomEvent('vr-music', { detail: true }));
}

export function stopMusic() {
  if (!ctx) return;
  on = false;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
  window.dispatchEvent(new CustomEvent('vr-music', { detail: false }));
  stopTimer = setTimeout(() => {
    clearInterval(timer); timer = null; cancelAnimationFrame(raf);
    document.documentElement.style.setProperty('--beat', 0);
    ctx.suspend();
  }, 1000);
}

export const isMusicOn = () => on;
export async function toggleMusic() {
  if (on) { stopMusic(); toast('🔇 Music off'); return; }
  try { await startMusic(); toast('♪ Lo-fi on'); } catch { /* audio blocked */ }
}
