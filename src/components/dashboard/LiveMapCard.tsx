import { CircleDot, Gauge, MapPin, MapPinned, Navigation2 } from "lucide-react";
import type { RouteGeo } from "@/types/dashboard";

interface LiveMapCardProps {
  route: RouteGeo;
  speedMph: number;
  etaMinutes: number;
  lastPingLabel?: string;
}

export function LiveMapCard({
  route,
  speedMph,
  etaMinutes,
  lastPingLabel = "just now",
}: LiveMapCardProps) {
  return (
    <div className="rounded-[2rem] bg-slate-100 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between px-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Live Map
          </p>
          <h2 className="text-xl font-bold">Route Map</h2>
        </div>
        <MapPinned className="h-5 w-5 text-orange-500" />
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] bg-slate-300">
        {/* Grid background placeholder for AnderRouteLiveMap */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Route line */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 15 78 Q 35 55, 50 50 T 85 18"
            fill="none"
            stroke="rgb(15,23,42)"
            strokeWidth="0.6"
            strokeDasharray="2 1.5"
            opacity="0.55"
          />
        </svg>

        {/* Pickup pin */}
        <div className="absolute bottom-[18%] left-[12%] flex flex-col items-center">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-teal-500 text-white shadow-lg ring-4 ring-white/60">
            <MapPin className="h-4 w-4" />
          </div>
          <span className="mt-1 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow">
            Pickup
          </span>
        </div>

        {/* Dropoff pin */}
        <div className="absolute right-[12%] top-[14%] flex flex-col items-center">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-white shadow-lg ring-4 ring-white/60">
            <MapPin className="h-4 w-4" />
          </div>
          <span className="mt-1 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow">
            Dropoff
          </span>
        </div>

        {/* Live vehicle marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative grid h-14 w-14 place-items-center rounded-full bg-slate-950 text-white shadow-2xl ring-4 ring-white/70">
            <Navigation2 className="h-7 w-7 text-orange-400" />
            <span className="absolute -inset-2 animate-ping rounded-full bg-orange-400/30" />
          </div>
          <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white shadow-lg">
            ETA {etaMinutes} min
          </div>
        </div>

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow backdrop-blur">
          <Gauge className="h-4 w-4 text-teal-600" />
          {Math.round(speedMph)} MPH
        </div>

        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-xs text-slate-700 shadow backdrop-blur">
          <CircleDot className="h-3 w-3 text-emerald-500" />
          Ping {lastPingLabel}
        </div>

        <div className="absolute bottom-4 right-4 rounded-2xl bg-white/90 px-3 py-2 font-mono text-[11px] text-slate-600 shadow backdrop-blur">
          {route.current.lat.toFixed(4)}, {route.current.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );
}
