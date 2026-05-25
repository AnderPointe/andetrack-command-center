import { Truck, MapPin, Navigation2 } from "lucide-react";

export interface DriverLocationMapProps {
  driverId: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  /** Optional live driver coords. Defaults to ~60% between pickup and dropoff. */
  driverLat?: number;
  driverLng?: number;
  etaMinutes?: number;
  speedMph?: number;
  signalPercent?: number;
  routeProgressPercent?: number;
}

/** Project a lat/lng onto the SVG viewBox using equirectangular projection bounded by the route bbox. */
function project(
  lat: number,
  lng: number,
  bbox: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  pad = 0.12,
) {
  const w = 500;
  const h = 420;
  const dx = bbox.maxLng - bbox.minLng || 1;
  const dy = bbox.maxLat - bbox.minLat || 1;
  const x = ((lng - bbox.minLng) / dx) * (1 - pad * 2) * w + pad * w;
  // invert Y: higher lat -> top of svg
  const y = h - (((lat - bbox.minLat) / dy) * (1 - pad * 2) * h + pad * h);
  return { x, y };
}

export default function DriverLocationMap({
  driverId,
  pickupLat,
  pickupLng,
  dropoffLat,
  dropoffLng,
  driverLat,
  driverLng,
  etaMinutes,
  speedMph,
  signalPercent,
  routeProgressPercent,
}: DriverLocationMapProps) {
  const progress =
    routeProgressPercent !== undefined ? Math.min(100, Math.max(0, routeProgressPercent)) : 60;

  const dLat = driverLat ?? pickupLat + (dropoffLat - pickupLat) * (progress / 100);
  const dLng = driverLng ?? pickupLng + (dropoffLng - pickupLng) * (progress / 100);

  const bbox = {
    minLat: Math.min(pickupLat, dropoffLat, dLat),
    maxLat: Math.max(pickupLat, dropoffLat, dLat),
    minLng: Math.min(pickupLng, dropoffLng, dLng),
    maxLng: Math.max(pickupLng, dropoffLng, dLng),
  };

  const pickup = project(pickupLat, pickupLng, bbox);
  const dropoff = project(dropoffLat, dropoffLng, bbox);
  const driver = project(dLat, dLng, bbox);

  // Curve control point: offset perpendicular to pickup->dropoff for a nice arc
  const midX = (pickup.x + dropoff.x) / 2;
  const midY = (pickup.y + dropoff.y) / 2;
  const nx = -(dropoff.y - pickup.y);
  const ny = dropoff.x - pickup.x;
  const nLen = Math.hypot(nx, ny) || 1;
  const curve = 80;
  const ctrlX = midX + (nx / nLen) * curve;
  const ctrlY = midY + (ny / nLen) * curve;
  const pathD = `M ${pickup.x} ${pickup.y} Q ${ctrlX} ${ctrlY} ${dropoff.x} ${dropoff.y}`;

  const fmt = (n: number) => n.toFixed(4);

  return (
    <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 via-teal-50 to-slate-200">
      {/* Grid background */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`driverMapGrid-${driverId}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#driverMapGrid-${driverId})`} />
      </svg>

      {/* Route */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 500 420"
        preserveAspectRatio="none"
      >
        <path d={pathD} fill="none" stroke="#0f172a" strokeOpacity="0.08" strokeWidth="10" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 6" />
      </svg>

      {/* Pickup pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(pickup.x / 500) * 100}%`, top: `${(pickup.y / 420) * 100}%` }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-teal-500">
            <MapPin className="h-4 w-4 text-teal-600" />
          </div>
          <div className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold shadow-md">
            Pickup
            <span className="ml-1 font-normal text-slate-500">
              {fmt(pickupLat)}, {fmt(pickupLng)}
            </span>
          </div>
        </div>
      </div>

      {/* Dropoff pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(dropoff.x / 500) * 100}%`, top: `${(dropoff.y / 420) * 100}%` }}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold shadow-md">
            Dropoff
            <span className="ml-1 font-normal text-slate-500">
              {fmt(dropoffLat)}, {fmt(dropoffLng)}
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-orange-500">
            <MapPin className="h-4 w-4 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Driver marker */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(driver.x / 500) * 100}%`, top: `${(driver.y / 420) * 100}%` }}
      >
        <div className="relative">
          <div className="absolute -inset-3 animate-ping rounded-full bg-orange-500/40" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg ring-4 ring-white">
            <Truck className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2 rounded-2xl bg-slate-950 px-3 py-1.5 text-center text-xs font-semibold text-white shadow-lg">
          {etaMinutes !== undefined ? `ETA ${etaMinutes} min` : driverId}
        </div>
      </div>

      {/* Top-left telemetry chips */}
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
          <Navigation2 className="h-3.5 w-3.5 text-teal-600" />
          {driverId}
        </div>
        {speedMph !== undefined && (
          <div className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            {speedMph} MPH
          </div>
        )}
        {signalPercent !== undefined && (
          <div className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            Signal {signalPercent}%
          </div>
        )}
      </div>

      {/* Bottom-right progress */}
      {routeProgressPercent !== undefined && (
        <div className="absolute bottom-4 right-4 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-lg">
          Route progress · {routeProgressPercent}%
        </div>
      )}
    </div>
  );
}
