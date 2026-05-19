import { Check, ShieldCheck, X } from "lucide-react";

interface Props {
  className?: string;
  compact?: boolean;
}

/**
 * Premium driver privacy notice.
 * Spells out what dispatch sees and what it never sees, so consent is informed.
 */
export function DriverPrivacyNotice({ className = "", compact = false }: Props) {
  if (compact) {
    return (
      <div
        className={`flex items-start gap-2 rounded-xl border border-teal-400/20 bg-teal-500/[0.04] p-3 text-[11px] leading-relaxed text-teal-100/80 ${className}`}
      >
        <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />
        <p>
          Your location is shared with dispatch only while you are on shift or
          assigned to an active load. Tracking stops automatically when you go
          off duty.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-teal-400/20 bg-gradient-to-br from-teal-500/[0.07] via-slate-900/40 to-slate-900/60 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-teal-400/15 px-4 py-2.5">
        <ShieldCheck className="h-4 w-4 text-teal-300" />
        <h3 className="text-[12px] font-semibold uppercase tracking-wider text-teal-100">
          Driver privacy
        </h3>
        <span className="ml-auto text-[10px] text-teal-200/70">Anderoute Trust Charter</span>
      </div>

      <div className="grid gap-3 px-4 py-3 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 text-[11px] font-semibold text-emerald-200/90">
            Dispatch can see
          </div>
          <ul className="space-y-1 text-[11px] text-slate-200/85">
            {[
              "Live GPS while on duty",
              "Heading, speed, ETA, route progress",
              "Battery & device status",
              "Status changes & POD",
            ].map((t) => (
              <li key={t} className="flex items-start gap-1.5">
                <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-300" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-1.5 text-[11px] font-semibold text-rose-200/90">
            Dispatch never sees
          </div>
          <ul className="space-y-1 text-[11px] text-slate-200/85">
            {[
              "Location while off duty",
              "Personal trips or sleeper time",
              "Microphone or camera data",
              "Contacts, messages, or apps",
            ].map((t) => (
              <li key={t} className="flex items-start gap-1.5">
                <X className="mt-0.5 h-3 w-3 flex-shrink-0 text-rose-300" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="border-t border-white/5 bg-slate-950/30 px-4 py-2 text-[10.5px] leading-relaxed text-slate-400">
        You can pause tracking, end your shift, or revoke location permission at
        any time. All access is logged and reviewable.
      </p>
    </div>
  );
}
