import { create } from "zustand";
import { useCallback, useRef, useEffect } from "react";

/**
 * Global sound state managed by Zustand.
 * Persists mute preference in localStorage.
 */
interface SoundStore {
  muted: boolean;
  toggleMute: () => void;
}

export const useSoundStore = create<SoundStore>((set) => ({
  muted: localStorage.getItem("portfolio-sound-muted") !== "false", // muted by default
  toggleMute: () =>
    set((state) => {
      const next = !state.muted;
      localStorage.setItem("portfolio-sound-muted", String(next));
      return { muted: next };
    }),
}));

/**
 * Web Audio API sound synthesizer hook.
 * All sounds are generated programmatically — no external audio files needed.
 * Volume is kept very low (~12-18%) for subliminal ambiance.
 */
export function useSoundFX() {
  const ctxRef = useRef<AudioContext | null>(null);
  const muted = useSoundStore((s) => s.muted);

  // Lazily initialize AudioContext on first interaction (browser policy)
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  /**
   * Soft tick — nav hover
   * Very short sine blip, high frequency, barely audible
   */
  const playTick = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(3200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.015);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.03);
  }, [muted, getCtx]);

  /**
   * Metallic pop — button click
   * Short attack with pitch bend down, like a soft bubble pop
   */
  const playPop = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }, [muted, getCtx]);

  /**
   * Soft whoosh — page transition
   * Filtered noise sweep, like air moving
   */
  const playWhoosh = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();

    // Generate noise buffer
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter sweeps up
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 2;
    filter.frequency.setValueAtTime(300, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.15);
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.25);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.06);
    gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + 0.25);
  }, [muted, getCtx]);

  /**
   * Confirm ding — copy to clipboard
   * Two ascending tones, like a digital "success" chime
   */
  const playConfirm = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();

    // First tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    gain1.gain.setValueAtTime(0.1, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.12);

    // Second tone (higher, slight delay)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1320, ctx.currentTime + 0.08);
    gain2.gain.setValueAtTime(0.001, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.08);
    osc2.stop(ctx.currentTime + 0.22);
  }, [muted, getCtx]);

  /**
   * Toggle sound — mute/unmute feedback
   * Quick blip to confirm audio is on
   */
  const playToggleOn = useCallback(() => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  }, [getCtx]);

  return { playTick, playPop, playWhoosh, playConfirm, playToggleOn, muted };
}
