/**
 * Phase 2 — Mock GPS stream.
 *
 * Drives a fake driver along a polyline so the dispatch dashboard, EliteNav
 * screen, and realtime feed can demo end-to-end behavior with no mobile SDK.
 *
 * Replace `startMockLocationStream` with `useMobileLocationTracking` (Expo
 * Location) when the React Native client ships.
 */
import type { DriverLocationEvent, TrackingMode } from "@/types/location";
import type { DriverStatusKey } from "@/types/status";

export interface MockStreamConfig {
  driverId: string;
  companyId: string;
  vehicleId?: string;
  activeLoadId?: string;
  activeShipmentId?: string;
  /** ordered [lng, lat] pairs the driver should follow */
  waypoints: Array<[number, number]>;
  /** total route distance in miles for ETA math */
  totalMiles: number;
  /** how often a ping is emitted (ms) */
  intervalMs?: number;
  /** seconds advanced along the route per tick */
  stepSeconds?: number;
  trackingMode?: TrackingMode;
  driverStatus?: DriverStatusKey;
  averageMph?: number;
}

export interface MockStreamSample {
  latitude: number;
  longitude: number;
  heading: number;
  speed_mph: number;
  progress_pct: number;
  remaining_miles: number;
  eta_minutes: number;
  battery_level: number;
}

const EARTH_R_MI = 3958.8;

function toRad(d: number) { return (d * Math.PI) / 180; }
function toDeg(r: number) { return (r * 180) / Math.PI; }

export function calculateHeading(a: [number, number], b: [number, number]): number {
  const [lng1, lat1] = a.map(toRad) as [number, number];
  const [lng2, lat2] = b.map(toRad) as [number, number];
  const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function haversineMi(a: [number, number], b: [number, number]): number {
  const [lng1, lat1] = a;
  const [lng2, lat2] = b;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_R_MI * Math.asin(Math.sqrt(h));
}

export function calculateDistanceRemaining(
  waypoints: Array<[number, number]>,
  fromIndex: number,
  fromFraction: number,
): number {
  if (fromIndex >= waypoints.length - 1) return 0;
  const segHead = haversineMi(waypoints[fromIndex], waypoints[fromIndex + 1]) * (1 - fromFraction);
  let rest = 0;
  for (let i = fromIndex + 1; i < waypoints.length - 1; i++) {
    rest += haversineMi(waypoints[i], waypoints[i + 1]);
  }
  return segHead + rest;
}

export function calculateMockETA(remainingMiles: number, mph = 55): number {
  if (mph <= 0) return 0;
  return Math.max(0, Math.round((remainingMiles / mph) * 60));
}

export function calculateRouteProgress(remainingMi: number, totalMi: number): number {
  if (totalMi <= 0) return 0;
  return Math.max(0, Math.min(100, ((totalMi - remainingMi) / totalMi) * 100));
}

/** Linear interpolate between two coordinates. */
export function smoothMarkerMovement(
  a: [number, number],
  b: [number, number],
  t: number,
): [number, number] {
  const clamp = Math.min(1, Math.max(0, t));
  return [a[0] + (b[0] - a[0]) * clamp, a[1] + (b[1] - a[1]) * clamp];
}

interface RunningStream {
  stop: () => void;
}

const active = new Map<string, RunningStream>();

export function startMockLocationStream(
  cfg: MockStreamConfig,
  onSample: (sample: MockStreamSample, event: DriverLocationEvent) => void,
): () => void {
  stopMockLocationStream(cfg.driverId);

  const intervalMs = cfg.intervalMs ?? 2000;
  const mph = cfg.averageMph ?? 58;
  const trackingMode = cfg.trackingMode ?? "active_load";
  const status = cfg.driverStatus ?? "en_route_pickup";

  let segIdx = 0;
  let segFrac = 0;
  let battery = 0.92;

  const tick = () => {
    if (segIdx >= cfg.waypoints.length - 1) {
      stopMockLocationStream(cfg.driverId);
      return;
    }
    const segLenMi = haversineMi(cfg.waypoints[segIdx], cfg.waypoints[segIdx + 1]);
    const stepMi = (mph / 3600) * (intervalMs / 1000);
    segFrac += segLenMi > 0 ? stepMi / segLenMi : 1;
    while (segFrac >= 1 && segIdx < cfg.waypoints.length - 1) {
      segFrac -= 1;
      segIdx += 1;
    }

    const here =
      segIdx >= cfg.waypoints.length - 1
        ? cfg.waypoints[cfg.waypoints.length - 1]
        : smoothMarkerMovement(cfg.waypoints[segIdx], cfg.waypoints[segIdx + 1], segFrac);

    const next =
      segIdx >= cfg.waypoints.length - 1
        ? cfg.waypoints[cfg.waypoints.length - 1]
        : cfg.waypoints[segIdx + 1];

    const heading = calculateHeading(here, next);
    const remaining = calculateDistanceRemaining(cfg.waypoints, segIdx, segFrac);
    const eta = calculateMockETA(remaining, mph);
    const progress = calculateRouteProgress(remaining, cfg.totalMiles);
    const speed = mph + (Math.random() * 6 - 3);

    battery = Math.max(0.05, battery - 0.001);

    const sample: MockStreamSample = {
      latitude: here[1],
      longitude: here[0],
      heading,
      speed_mph: +speed.toFixed(1),
      progress_pct: +progress.toFixed(1),
      remaining_miles: +remaining.toFixed(2),
      eta_minutes: eta,
      battery_level: +battery.toFixed(3),
    };

    const event: DriverLocationEvent = {
      id: `mock_${cfg.driverId}_${Date.now()}`,
      company_id: cfg.companyId,
      driver_id: cfg.driverId,
      vehicle_id: cfg.vehicleId,
      active_load_id: cfg.activeLoadId,
      active_shipment_id: cfg.activeShipmentId,
      latitude: sample.latitude,
      longitude: sample.longitude,
      heading: sample.heading,
      speed_mph: sample.speed_mph,
      altitude: 210,
      accuracy_meters: 6 + Math.random() * 4,
      battery_level: sample.battery_level,
      is_charging: false,
      app_state: "foreground",
      tracking_mode: trackingMode,
      driver_status: status,
      route_status: progress >= 100 ? "completed" : "in_progress",
      eta_minutes: sample.eta_minutes,
      remaining_miles: sample.remaining_miles,
      event_source: "mock_stream",
      created_at: new Date().toISOString(),
    };

    onSample(sample, event);
  };

  const id = window.setInterval(tick, intervalMs);
  tick();

  const stop = () => window.clearInterval(id);
  active.set(cfg.driverId, { stop });
  return stop;
}

export function stopMockLocationStream(driverId: string) {
  const r = active.get(driverId);
  if (r) {
    r.stop();
    active.delete(driverId);
  }
}

export function stopAllMockStreams() {
  for (const r of active.values()) r.stop();
  active.clear();
}

/** Dallas → Houston coarse waypoints used by the dispatch demo. */
export const DEMO_ROUTE_DALLAS_HOUSTON: Array<[number, number]> = [
  [-96.797, 32.776],
  [-96.6, 32.5],
  [-96.3, 32.1],
  [-96.0, 31.6],
  [-95.7, 31.0],
  [-95.45, 30.3],
  [-95.37, 29.76],
];
