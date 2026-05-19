import { ShieldCheck } from "lucide-react";

export function DriverPrivacyNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-start gap-2 rounded-xl border border-teal-400/20 bg-teal-500/[0.04] p-3 text-[11px] leading-relaxed text-teal-100/80 ${className}`}>
      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />
      <p>
        Location is shared with dispatch only while you are logged in, on shift, or
        assigned to an active load. Tracking stops automatically when you go off
        duty unless you opt in to ride-share visibility.
      </p>
    </div>
  );
}
