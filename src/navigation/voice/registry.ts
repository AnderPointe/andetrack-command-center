/**
 * Phase 4 — VoiceProvider registry.
 *
 * Single source of truth so CoPilot, the lab UI, and tests all share one
 * provider instance. SSR-safe: defaults to MockVoiceProvider when
 * SpeechRecognition is unavailable.
 */
import type { VoiceProvider, VoiceProviderId } from "../types/voice";
import { MockVoiceProvider } from "./MockVoiceProvider";
import { WebSpeechVoiceProvider } from "./WebSpeechVoiceProvider";

let current: VoiceProvider | null = null;
let currentId: VoiceProviderId | null = null;

export function getVoiceProvider(id: VoiceProviderId = "webspeech"): VoiceProvider {
  if (current && currentId === id) return current;
  switch (id) {
    case "webspeech": {
      const p = new WebSpeechVoiceProvider();
      // If the browser can't do STT/TTS, silently fall back to mock so the UI still works.
      current = p.supportsSpeechToText || p.supportsTextToSpeech ? p : new MockVoiceProvider();
      break;
    }
    case "mock":
    default:
      current = new MockVoiceProvider();
      break;
  }
  currentId = id;
  return current;
}

export function resetVoiceProvider() {
  current?.stopListening();
  current?.cancelSpeech();
  current = null;
  currentId = null;
}

export function isMockVoiceProvider(p: VoiceProvider): p is MockVoiceProvider {
  return p.id === "mock";
}
