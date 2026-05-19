/**
 * Phase 5 (polished) — Driver-facing notification preferences UI.
 */
import type { NotificationCategory } from "../types";
import type { NotificationPreferences } from "../services/notificationPreferences";

interface Props {
  prefs: NotificationPreferences;
  onChange: (patch: Partial<NotificationPreferences>) => void;
}

const CATEGORY_LABELS: Record<NotificationCategory, string> = {
  load_offer:     "New load offers",
  dispatch_voice: "Dispatch voice messages",
  route_hazard:   "Route + CDL hazard alerts",
  eta_arrival:    "ETA and arrival reminders",
  system:         "System & app updates",
};

export function NotificationPreferencesPanel({ prefs, onChange }: Props) {
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
      <div className="mb-2 text-[12px] font-semibold text-zinc-100">Notification preferences</div>

      <div className="space-y-1.5">
        {(Object.keys(CATEGORY_LABELS) as NotificationCategory[]).map((cat) => (
          <label key={cat} className="flex items-center justify-between gap-3 text-[12px] text-zinc-200">
            <span>{CATEGORY_LABELS[cat]}</span>
            <input
              type="checkbox"
              checked={prefs.enabled[cat]}
              onChange={(e) => onChange({ enabled: { ...prefs.enabled, [cat]: e.target.checked } })}
              className="accent-emerald-400"
            />
          </label>
        ))}
      </div>

      <div className="mt-3 border-t border-white/10 pt-2">
        <label className="flex items-center justify-between gap-3 text-[12px] text-zinc-200">
          <span>Quiet hours (urgent alerts still pass)</span>
          <input
            type="checkbox"
            checked={prefs.quietHours.enabled}
            onChange={(e) => onChange({ quietHours: { ...prefs.quietHours, enabled: e.target.checked } })}
            className="accent-emerald-400"
          />
        </label>
        {prefs.quietHours.enabled ? (
          <div className="mt-2 flex items-center gap-2 text-[11px] text-zinc-300">
            <label className="flex items-center gap-1">
              From
              <input
                type="number" min={0} max={23}
                value={prefs.quietHours.startHour}
                onChange={(e) => onChange({ quietHours: { ...prefs.quietHours, startHour: Math.max(0, Math.min(23, Number(e.target.value))) } })}
                className="w-14 rounded border border-white/10 bg-zinc-900 px-1.5 py-0.5"
              />
            </label>
            <label className="flex items-center gap-1">
              To
              <input
                type="number" min={0} max={23}
                value={prefs.quietHours.endHour}
                onChange={(e) => onChange({ quietHours: { ...prefs.quietHours, endHour: Math.max(0, Math.min(23, Number(e.target.value))) } })}
                className="w-14 rounded border border-white/10 bg-zinc-900 px-1.5 py-0.5"
              />
            </label>
            <span className="ml-auto text-[10px] text-zinc-500">24-hour clock</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
