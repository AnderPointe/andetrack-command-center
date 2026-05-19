/**
 * Phase 4 — MockVoiceProvider.
 *
 * No browser APIs. Lets us drive the CoPilot UI in tests, demos, and SSR
 * without needing microphone permission. Use simulateTranscript() to feed
 * scripted commands from the lab UI.
 */
import type {
  SpeakOptions,
  VoiceListenerStatus,
  VoiceProvider,
} from "../types/voice";

export class MockVoiceProvider implements VoiceProvider {
  readonly id = "mock" as const;
  readonly supportsSpeechToText = true;
  readonly supportsTextToSpeech = true;
  readonly isMock = true as const;

  private muted = false;
  private status: VoiceListenerStatus = "idle";
  private transcriptListeners = new Set<(t: string, final: boolean) => void>();
  private statusListeners = new Set<(s: VoiceListenerStatus) => void>();
  private errorListeners = new Set<(e: Error) => void>();
  private spoken: string[] = [];

  async speak(text: string, _opts: SpeakOptions = {}): Promise<void> {
    if (this.muted) return;
    this.spoken.push(text);
  }
  cancelSpeech(): void {
    this.spoken = [];
  }
  async startListening(): Promise<void> {
    this.setStatus("listening");
  }
  stopListening(): void {
    this.setStatus("idle");
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
  }

  /** Dev helper — push a scripted transcript through the pipeline. */
  simulateTranscript(text: string) {
    this.setStatus("processing");
    for (const l of this.transcriptListeners) l(text, true);
    this.setStatus("idle");
  }

  /** Dev helper — return everything CoPilot has spoken. */
  getSpokenLog(): string[] {
    return [...this.spoken];
  }

  private setStatus(s: VoiceListenerStatus) {
    this.status = s;
    for (const l of this.statusListeners) l(s);
  }
}
