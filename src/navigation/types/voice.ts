/**
 * Phase 4 — Voice + CoPilot types.
 *
 * Provider-agnostic voice interface. Mock + Web Speech adapters today;
 * ElevenLabs / OpenAI Realtime can slot in later without touching callers.
 */

export type VoiceProviderId = "mock" | "webspeech" | "elevenlabs" | "openai_realtime";

export type VoiceIntent =
  // navigation control
  | "nav.reroute"
  | "nav.mute"
  | "nav.unmute"
  | "nav.repeat"
  | "nav.pause"
  | "nav.resume"
  | "nav.stop"
  // status updates
  | "status.on_break"
  | "status.arrived_pickup"
  | "status.arrived_dropoff"
  | "status.delayed"
  | "status.driving"
  // dispatch comms
  | "dispatch.call"
  | "dispatch.message"
  | "dispatch.report_issue"
  // load / POD actions
  | "load.mark_delivered"
  | "load.take_pod_photo"
  | "load.read_next"
  // fallback
  | "copilot.ask"
  | "unknown";

export interface VoiceCommandResult {
  transcript: string;
  intent: VoiceIntent;
  confidence: number;
  parameters?: Record<string, unknown>;
  handler_response?: string | null;
}

export interface SpeakOptions {
  priority?: "low" | "normal" | "high" | "urgent";
  interrupt?: boolean;
  voice?: string;
  rate?: number;
}

export type VoiceListenerStatus = "idle" | "listening" | "processing" | "error";

export interface VoiceProvider {
  readonly id: VoiceProviderId;
  readonly supportsSpeechToText: boolean;
  readonly supportsTextToSpeech: boolean;

  speak(text: string, opts?: SpeakOptions): Promise<void>;
  cancelSpeech(): void;

  startListening(): Promise<void>;
  stopListening(): void;

  onTranscript(listener: (transcript: string, final: boolean) => void): () => void;
  onStatusChange(listener: (status: VoiceListenerStatus) => void): () => void;
  onError(listener: (err: Error) => void): () => void;

  isMuted(): boolean;
  setMuted(muted: boolean): void;
}
