import { MapPin, ShieldAlert } from "lucide-react";
import type { LocationPermissionStatus } from "@/types/location";

interface Props {
  status: LocationPermissionStatus;
  onRequest: () => void;
  className?: string;
}

const META: Record<LocationPermissionStatus, { tone: string; label: string; cta: string | null }> = {
  granted: { tone: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100", label: "Location permission granted", cta: null },
  denied: { tone: "border-red-400/40 bg-red-500/10 text-red-100", label: "Location permission denied — dispatch cannot see you", cta: "Open settings" },
  prompt: { tone: "border-amber-400/40 bg-amber-500/10 text-amber-100", label: "Permission needed to share live location", cta: "Allow location" },
  restricted: { tone: "border-red-400/40 bg-red-500/10 text-red-100", label: "Location is restricted on this device", cta: null },
  unknown: { tone: "border-slate-700 bg-slate-800/60 text-slate-200", label: "Checking location permission…", cta: "Check now" },
};

export function LocationPermissionCard({ status, onRequest, className = "" }: Props) {
  const m = META[status];
  const denied = status === "denied" || status === "restricted";
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-3 ${m.tone} ${className}`}>
      {denied ? <ShieldAlert className="mt-0.5 h-5 w-5" /> : <MapPin className="mt-0.5 h-5 w-5" />}
      <div className="flex-1">
        <div className="text-xs font-semibold">{m.label}</div>
        <div className="mt-0.5 text-[11px] opacity-80">
          Anderoute EliteNav uses your location for live dispatch, route progress,
          and ETA accuracy.
        </div>
      </div>
      {m.cta && (
        <button
          onClick={onRequest}
          className="rounded-full border border-current px-3 py-1 text-[11px] font-medium hover:bg-current/10"
        >
          {m.cta}
        </button>
      )}
    </div>
  );
}
