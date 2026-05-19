/**
 * Phase 5 (polished) — Driver notification preferences.
 *
 * Local-first (localStorage) so the driver controls categories + quiet hours
 * without a round-trip. Mirror to Supabase later via a `notification_preferences`
 * table; until then this is the source of truth client-side.
 */
import type { NotificationCategory, NotificationPriority } from "../types";

export interface NotificationPreferences {
  /** Per-category enable flags. */
  enabled: Record<NotificationCategory, boolean>;
  /** Quiet hours block low/normal/high priority. urgent always passes. */
  quietHours: {
    enabled: boolean;
    startHour: number; // 0-23
    endHour: number;   // 0-23 (wraps past midnight if end < start)
  };
}

const KEY = "anderoute.notification_prefs.v1";

export const DEFAULT_PREFS: NotificationPreferences = {
  enabled: {
    load_offer:     true,
    dispatch_voice: true,
    route_hazard:   true,
    eta_arrival:    true,
    system:         true,
  },
  quietHours: { enabled: false, startHour: 22, endHour: 6 },
};

export function loadPreferences(): NotificationPreferences {
  if (typeof localStorage === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<NotificationPreferences>;
    return {
      enabled: { ...DEFAULT_PREFS.enabled, ...(parsed.enabled ?? {}) },
      quietHours: { ...DEFAULT_PREFS.quietHours, ...(parsed.quietHours ?? {}) },
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePreferences(prefs: NotificationPreferences): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(prefs));
}

function inQuietHours(prefs: NotificationPreferences, now = new Date()): boolean {
  if (!prefs.quietHours.enabled) return false;
  const h = now.getHours();
  const { startHour: s, endHour: e } = prefs.quietHours;
  return s <= e ? h >= s && h < e : h >= s || h < e;
}

/**
 * Returns true if the notification should be presented under the current prefs.
 * - Category must be enabled.
 * - Urgent priority always bypasses quiet hours; high/normal/low are silenced.
 */
export function shouldPresent(
  category: NotificationCategory,
  priority: NotificationPriority,
  prefs: NotificationPreferences = loadPreferences(),
  now = new Date(),
): boolean {
  if (!prefs.enabled[category]) return false;
  if (priority === "urgent") return true;
  if (inQuietHours(prefs, now)) return false;
  return true;
}
