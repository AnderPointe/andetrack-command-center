/**
 * Phase 5 (polished) — Driver consent flags.
 *
 * Granular, revocable, persisted. The dispatcher cannot override these
 * client-side; server-side enforcement must mirror these flags.
 */
import { secureGet, secureSet } from "./secureStorage";

export interface DriverConsent {
  location_tracking: boolean;
  background_location: boolean;
  microphone: boolean;
  voice_transcripts_persist: boolean;  // ALWAYS false by default
  raw_audio_persist: boolean;          // MUST stay false; UI hides toggle
  push_notifications: boolean;
  in_vehicle_handoff: boolean;         // CarPlay / Android Auto session
  acceptedAt: string | null;
}

const KEY = "driver.consent";

export const DEFAULT_CONSENT: DriverConsent = {
  location_tracking: false,
  background_location: false,
  microphone: false,
  voice_transcripts_persist: false,
  raw_audio_persist: false,
  push_notifications: false,
  in_vehicle_handoff: false,
  acceptedAt: null,
};

export function loadConsent(): DriverConsent {
  const raw = secureGet(KEY);
  if (!raw) return DEFAULT_CONSENT;
  try {
    const parsed = JSON.parse(raw) as Partial<DriverConsent>;
    return { ...DEFAULT_CONSENT, ...parsed, raw_audio_persist: false };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function saveConsent(c: DriverConsent): void {
  secureSet(KEY, JSON.stringify({ ...c, raw_audio_persist: false }));
}
