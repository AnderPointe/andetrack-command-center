/**
 * Phase 5 (polished) — Driver privacy controls.
 *
 * Renders consent toggles. Raw-audio toggle intentionally absent — that
 * setting is hard-locked off in `driverConsent.ts`.
 */
import type { DriverConsent } from "./driverConsent";

interface Props {
  consent: DriverConsent;
  onChange: (patch: Partial<DriverConsent>) => void;
}

const TOGGLES: Array<{ key: keyof DriverConsent; label: string; hint?: string }> = [
  { key: "location_tracking",       label: "Foreground location while on shift" },
  { key: "background_location",     label: "Background location during active load", hint: "Required for dispatch live tracking." },
  { key: "microphone",              label: "Microphone for voice CoPilot" },
  { key: "voice_transcripts_persist", label: "Save voice transcripts (no raw audio)", hint: "Off by default. Transcripts only — audio is never saved." },
  { key: "push_notifications",      label: "Push notifications" },
  { key: "in_vehicle_handoff",      label: "Hand off to CarPlay / Android Auto" },
];

export function PrivacyControlsPanel({ consent, onChange }: Props) {
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
      <div className="mb-1 text-[12px] font-semibold text-zinc-100">Privacy & consent</div>
      <p className="mb-2 text-[10px] leading-snug text-zinc-500">
        Granular and revocable. Raw audio is never stored. Transcripts are only
        kept when you explicitly opt in below.
      </p>
      <div className="space-y-1.5">
        {TOGGLES.map((t) => (
          <label key={t.key} className="flex items-start justify-between gap-3 text-[12px] text-zinc-200">
            <span className="min-w-0">
              <span className="block">{t.label}</span>
              {t.hint ? <span className="block text-[10px] text-zinc-500">{t.hint}</span> : null}
            </span>
            <input
              type="checkbox"
              checked={Boolean(consent[t.key])}
              onChange={(e) => onChange({ [t.key]: e.target.checked } as Partial<DriverConsent>)}
              className="mt-0.5 accent-emerald-400"
            />
          </label>
        ))}
      </div>
      {consent.acceptedAt ? (
        <div className="mt-2 text-[10px] text-zinc-500">
          Consent last updated {new Date(consent.acceptedAt).toLocaleString()}.
        </div>
      ) : null}
    </div>
  );
}
