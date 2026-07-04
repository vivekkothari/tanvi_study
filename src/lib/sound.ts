let audioCtx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.15,
  startAt = 0,
) {
  if (muted) return;
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain);
  gain.connect(ctx.destination);

  const t = ctx.currentTime + startAt;
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.start(t);
  osc.stop(t + duration);
}

export const sound = {
  isMuted: () => muted,
  setMuted: (value: boolean) => {
    muted = value;
  },
  toggleMute: () => {
    muted = !muted;
    return muted;
  },
  success: () => {
    tone(523.25, 0.12, 'sine', 0.12, 0);
    tone(659.25, 0.12, 'sine', 0.12, 0.1);
    tone(783.99, 0.2, 'sine', 0.14, 0.2);
  },
  wrong: () => {
    tone(220, 0.15, 'triangle', 0.06, 0);
    tone(196, 0.18, 'triangle', 0.05, 0.12);
  },
  tap: () => {
    tone(440, 0.06, 'sine', 0.08);
  },
  levelUp: () => {
    tone(523.25, 0.1, 'sine', 0.12, 0);
    tone(659.25, 0.1, 'sine', 0.12, 0.1);
    tone(783.99, 0.1, 'sine', 0.12, 0.2);
    tone(1046.5, 0.25, 'sine', 0.14, 0.3);
  },
};
