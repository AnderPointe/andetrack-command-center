import { Truck } from "lucide-react";

export interface AnderRouteLiveMapProps {
  etaMinutes: number;
  speedMph: number;
  signalPercent: number;
  routeProgressPercent: number;
  pickupLabel?: string;
  dropoffLabel?: string;
}

export default function AnderRouteLiveMap({
  etaMinutes,
  speedMph,
  signalPercent,
  routeProgressPercent,
  pickupLabel = "Pickup",
  dropoffLabel = "Dropoff",
}: AnderRouteLiveMapProps) {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 via-teal-50 to-slate-200">
      {/* Grid background */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="anderMapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#anderMapGrid)" />
      </svg>

      {/* Route */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 500 420"
        preserveAspectRatio="none"
      >
        <path
          d="M 60 340 Q 160 260 220 280 T 360 180 T 450 90"
          fill="none"
          stroke="#0f172a"
          strokeOpacity="0.08"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 60 340 Q 160 260 220 280 T 360 180 T 450 90"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 6"
        />
      </svg>

      {/* Pickup pin */}
      <div className="absolute" style={{ left: "8%", top: "78%" }}>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-teal-500">
            <div className="h-3 w-3 rounded-full bg-teal-500" />
          </div>
          <div className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold shadow-md">
            {pickupLabel}
          </div>
        </div>
      </div>

      {/* Vehicle marker */}
      <div className="absolute" style={{ left: "58%", top: "38%" }}>
        <div className="relative">
          <div className="absolute -inset-3 animate-ping rounded-full bg-orange-500/40" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg ring-4 ring-white">
            <Truck className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2 -translate-x-1/4 rounded-2xl bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
          ETA {etaMinutes} min
        </div>
      </div>

      {/* Dropoff pin */}
      <div className="absolute" style={{ right: "6%", top: "14%" }}>
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold shadow-md">
            {dropoffLabel}
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-orange-500">
            <div className="h-3 w-3 rounded-full bg-orange-500" />
          </div>
        </div>
      </div>

      {/* Telemetry chips */}
      <div className="absolute left-4 top-4 flex gap-2">
        <div className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
          {speedMph} MPH
        </div>
        <div className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
          Signal {signalPercent}%
        </div>
      </div>

      {/* Progress chip */}
      <div className="absolute bottom-4 right-4 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-lg">
        Route progress · {routeProgressPercent}%
      </div>
    </div>
  );
}
