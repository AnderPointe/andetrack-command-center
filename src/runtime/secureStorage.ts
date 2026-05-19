/**
 * Phase 5 (polished) — Secure storage classification.
 *
 * Web build uses localStorage (PERSIST) / sessionStorage (SESSION). The
 * native build is expected to swap PERSIST for Expo SecureStore / Keychain
 * and SESSION for in-memory. The CLASSIFICATION below is the contract.
 *
 * NEVER list: things that must not be stored client-side at all. Calls to
 * write a NEVER key throw in dev to catch regressions early.
 */

export type StorageClass = "PERSIST" | "SESSION" | "NEVER";

export const CLASSIFICATION: Record<string, StorageClass> = {
  // Persisted across launches (replace with SecureStore on native).
  "auth.session_token":         "PERSIST",
  "auth.refresh_token":         "PERSIST",
  "push.device_token":          "PERSIST",
  "driver.last_company_id":     "PERSIST",
  "driver.last_vehicle_id":     "PERSIST",
  "driver.notification_prefs":  "PERSIST",
  "driver.voice_prefs":         "PERSIST",
  "driver.consent":             "PERSIST",
  "anderoute.offline_queue.v2": "PERSIST",

  // Session-only (memory on native).
  "copilot.transcript_buffer":  "SESSION",
  "nav.last_routing_snapshot":  "SESSION",

  // Forbidden on the client. Reading/writing these throws.
  "supabase.service_role_key":  "NEVER",
  "openai.api_key":             "NEVER",
  "provider.server_key":        "NEVER",
  "voice.raw_audio":            "NEVER",
  "dispatch.admin_credentials": "NEVER",
};

function classify(key: string): StorageClass {
  return CLASSIFICATION[key] ?? "PERSIST";
}

function persistStore(): Storage | null {
  return typeof localStorage === "undefined" ? null : localStorage;
}
function sessionStore(): Storage | null {
  return typeof sessionStorage === "undefined" ? null : sessionStorage;
}

export function secureGet(key: string): string | null {
  const c = classify(key);
  if (c === "NEVER") throw new Error(`secureGet refused: '${key}' is classified NEVER`);
  const store = c === "SESSION" ? sessionStore() : persistStore();
  return store?.getItem(key) ?? null;
}

export function secureSet(key: string, value: string): void {
  const c = classify(key);
  if (c === "NEVER") throw new Error(`secureSet refused: '${key}' is classified NEVER`);
  const store = c === "SESSION" ? sessionStore() : persistStore();
  store?.setItem(key, value);
}

export function secureRemove(key: string): void {
  const c = classify(key);
  if (c === "NEVER") return;
  const store = c === "SESSION" ? sessionStore() : persistStore();
  store?.removeItem(key);
}
