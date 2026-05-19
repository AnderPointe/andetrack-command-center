import { MapPin, ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import type { LocationPermissionStatus } from "@/types/location";

interface Props {
  status: LocationPermissionStatus;
  onRequest: () => void;
  className?: string;
}

interface Meta {
  tone: string;
  icon: any;
  title: string;
  body: string;
  cta: string | null;
  ctaTone: string;
  pulse?: boolean;
}

const META: Record<LocationPermissionStatus, Meta> = {
  granted: {
    tone: "border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 text-emerald-50",
    icon: ShieldCheck,
    title: "Location shared with dispatch",
    body: "Live GPS, ETA, and route progress are streaming. Tracking will stop automatically when you go off duty.",
    cta: null,
    ctaTone: "",
  },
  denied: {
    tone: "border-red-400/50 bg-gradient-to-br from-red-500/15 to-red-500/5 text-red-50",
    icon: ShieldAlert,
    title: "Location permission denied",
    body: "Dispatch can't see you and you can't accept loads. Open device settings → Anderoute → Location → Always to fix this.",
    cta: "Open settings",
    ctaTone: "border-red-300/50 bg-red-500/20 hover:bg-red-500/30",
    pulse: true,
  },
  prompt: {
    tone: "border-amber-400/50 bg-gradient-to-br from-amber-500/15 to-amber-500/5 text-amber-50",
    icon: MapPin,
    title: "Allow location to start driving",
    body: "Anderoute uses your location only while you're on shift or running a load — never off duty.",
    cta: "Allow location",
    ctaTone: "border-amber-300/50 bg-amber-500/25 hover:bg-amber-500/40 text-amber-50",
  },
  restricted: {
    tone: "border-red-400/50 bg-red-500/10 text-red-50",
    icon: ShieldAlert,
    title: "Location restricted on this device",
    body: "Your company or device policy blocks location services. Contact your administrator.",
    cta: null,
    ctaTone: "",
  },
  unknown: {
    tone: "border-slate-700 bg-slate-800/60 text-slate-200",
    icon: Loader2,
    title: "Checking location permission",
    body: "Anderoute is verifying device access. This usually takes a moment.",
    cta: "Check now",
    ctaTone: "border-white/20 bg-white/[0.06] hover:bg-white/10",
  },
};

export function LocationPermissionCard({ status, onRequest, className = "" }: Props) {
  const m = META[status];
  const Icon = m.icon;
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-3.5 ${m.tone} ${className}`}>
      {m.pulse && (
        <div className="pointer-events-none absolute inset-0 animate-pulse bg-red-500/[0.06]" />
      )}
      <div className="relative flex items-start gap-3">
        <div className="rounded-xl border border-current/30 bg-current/10 p-2">
          <Icon className={`h-5 w-5 ${status === "unknown" ? "animate-spin" : ""}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold leading-tight">{m.title}</div>
          <p className="mt-1 text-[11.5px] leading-relaxed opacity-85">{m.body}</p>
        </div>
        {m.cta && (
          <button
            onClick={onRequest}
            className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${m.ctaTone}`}
          >
            {m.cta}
          </button>
        )}
      </div>
    </div>
  );
}
