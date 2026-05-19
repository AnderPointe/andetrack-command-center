/**
 * Phase 4 — WebSpeechVoiceProvider.
 *
 * Uses browser SpeechRecognition + SpeechSynthesis. Wraps both APIs in the
 * VoiceProvider interface so CoPilot doesn't care which engine is running.
 *
 * Graceful degradation: if either API is missing, listener/speak no-op
 * silently and emit "error" so the UI can switch to MockVoiceProvider.
 */
import type {
  SpeakOptions,
  VoiceListenerStatus,
  VoiceProvider,
} from "../types/voice";

type SR = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

declare global {
  interface Window {
    SpeechRecognition?: { new (): SR };
    webkitSpeechRecognition?: { new (): SR };
  }
}

function getRecognitionCtor() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export class WebSpeechVoiceProvider implements VoiceProvider {
  readonly id = "webspeech" as const;
  readonly supportsSpeechToText = !!getRecognitionCtor();
  readonly supportsTextToSpeech =
    typeof window !== "undefined" && "speechSynthesis" in window;

  private muted = false;
  private recognition: SR | null = null;
  private transcriptListeners = new Set<(t: string, final: boolean) => void>();
  private statusListeners = new Set<(s: VoiceListenerStatus) => void>();
  private errorListeners = new Set<(e: Error) => void>();

  async speak(text: string, opts: SpeakOptions = {}): Promise<void> {
    if (this.muted || !this.supportsTextToSpeech) return;
    return new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      if (opts.rate) u.rate = opts.rate;
      if (opts.voice) {
        const v = window.speechSynthesis.getVoices().find((vv) => vv.name === opts.voice);
        if (v) u.voice = v;
      }
      u.onend = () => resolve();
      u.onerror = () => resolve();
      if (opts.interrupt) window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    });
  }
  cancelSpeech(): void {
    if (this.supportsTextToSpeech) window.speechSynthesis.cancel();
  }

  async startListening(): Promise<void> {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      this.emitError(new Error("SpeechRecognition not supported in this browser"));
      return;
    }
    this.recognition?.abort();
    const r = new Ctor();
    r.continuous = false;
    r.interimResults = true;
    r.lang = "en-US";
    r.onresult = (e) => {
      const last = e.results[e.results.length - 1];
      const item = last[0];
      if (!item) return;
      for (const l of this.transcriptListeners) l(item.transcript.trim(), last.isFinal);
    };
    r.onerror = (e) => this.emitError(new Error(`SpeechRecognition error: ${e.error}`));
    r.onend = () => this.setStatus("idle");
    this.recognition = r;
    this.setStatus("listening");
    try {
      r.start();
    } catch (err) {
      this.emitError(err instanceof Error ? err : new Error(String(err)));
    }
  }
  stopListening(): void {
    this.recognition?.stop();
  }

  onTranscript(l: (t: string, final: boolean) => void) {
    this.transcriptListeners.add(l);
    return () => this.transcriptListeners.delete(l);
  }
  onStatusChange(l: (s: VoiceListenerStatus) => void) {
    this.statusListeners.add(l);
    return () => this.statusListeners.delete(l);
  }
  onError(l: (e: Error) => void) {
    this.errorListeners.add(l);
    return () => this.errorListeners.delete(l);
  }

  isMuted() {
    return this.muted;
  }
  setMuted(muted: boolean) {
    this.muted = muted;
    if (muted) this.cancelSpeech();
  }

  private setStatus(s: VoiceListenerStatus) {
    for (const l of this.statusListeners) l(s);
  }
  private emitError(e: Error) {
    this.setStatus("error");
    for (const l of this.errorListeners) l(e);
  }
}
