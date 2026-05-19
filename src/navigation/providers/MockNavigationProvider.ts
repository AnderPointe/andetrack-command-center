/**
 * Phase 3 — MockNavigationProvider.
 *
 * Pure-JS driver that simulates a real turn-by-turn SDK so the EliteNav UI,
 * dispatcher map, and CoPilot brain can be developed without any vendor key.
 *
 * Real adapters (Mapbox, Google, HERE, Trimble) replace this 1:1.
 */
import { haversineMi } from "@/data/mockGpsStream";
import type {
  GeoPoint,
  ManeuverType,
  NavigationSession,
  RouteStep,
  VoiceInstructionEvent,
} from "../types/navigation";
import { BaseNavigationProvider } from "./NavigationProvider";
import type { MockNavigationControls, RouteResult } from "../types/providers";
import type { RouteRequest } from "../types/truckRouting";

const MI_TO_M = 1609.34;

function interpolate(
  a: [number, number],
  b: [number, number],
  t: number,
): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function bearing(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const [lng1, lat1] = a.map(toRad) as [number, number];
  const [lng2, lat2] = b.map(toRad) as [number, number];
  const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function maneuverFromBearing(prev: number, next: number): ManeuverType {
  const d = ((next - prev + 540) % 360) - 180;
  if (Math.abs(d) < 15) return "straight";
  if (d > 90) return "turn-sharp-right";
  if (d > 30) return "turn-right";
  if (d > 0) return "turn-slight-right";
  if (d < -90) return "turn-sharp-left";
  if (d < -30) return "turn-left";
  return "turn-slight-left";
}

export class MockNavigationProvider extends BaseNavigationProvider implements MockNavigationControls {
  readonly id = "mock" as const;
  readonly supportsTruckRouting = true; // mock pretends to validate
  readonly supportsVoiceInstructions = true;
  readonly isMock = true as const;

  private timer: number | null = null;
  private route: RouteResult | null = null;
  private segIdx = 0;
  private segFrac = 0;
  private speedMph = 55;
  private offRouteFiredAt: number | null = null;

  async initializeNavigation(): Promise<void> {
    /* no-op for mock */
  }

  async requestRoute(req: RouteRequest): Promise<RouteResult> {
    this.emit("route_requested", {
      latitude: req.origin.latitude,
      longitude: req.origin.longitude,
      metadata: { profile: req.route_profile },
    });

    const geometry: Array<[number, number]> = buildSyntheticGeometry(
      req.origin,
      req.destination,
      req.waypoints ?? [],
    );

    let total_m = 0;
    const steps: RouteStep[] = [];
    let lastBearing = bearing(geometry[0], geometry[1] ?? geometry[0]);

    for (let i = 0; i < geometry.length - 1; i++) {
      const segMi = haversineMi(geometry[i], geometry[i + 1]);
      const segM = segMi * MI_TO_M;
      total_m += segM;
      const nextBearing = bearing(geometry[i], geometry[i + 1]);
      const maneuver: ManeuverType =
        i === 0 ? "depart" : maneuverFromBearing(lastBearing, nextBearing);
      lastBearing = nextBearing;

      steps.push({
        index: i,
        instruction:
          i === 0
            ? `Head ${cardinal(nextBearing)} from ${req.origin.label ?? "origin"}`
            : `${humanManeuver(maneuver)} and continue ${segMi.toFixed(1)} mi`,
        road_name: `Mock Hwy ${i + 1}`,
        maneuver,
        distance_meters: segM,
        duration_seconds: (segMi / 55) * 3600,
        start: { latitude: geometry[i][1], longitude: geometry[i][0] },
        end: { latitude: geometry[i + 1][1], longitude: geometry[i + 1][0] },
      });
    }

    steps.push({
      index: steps.length,
      instruction: `Arrive at ${req.destination.label ?? "destination"}`,
      maneuver: "arrive",
      distance_meters: 0,
      duration_seconds: 0,
      start: { latitude: geometry[geometry.length - 1][1], longitude: geometry[geometry.length - 1][0] },
      end: { latitude: geometry[geometry.length - 1][1], longitude: geometry[geometry.length - 1][0] },
    });

    const result: RouteResult = {
      provider: this.id,
      geometry,
      steps,
      total_distance_meters: total_m,
      total_duration_seconds: (total_m / MI_TO_M / 55) * 3600,
    };
    this.route = result;
    this.emit("route_loaded", {
      metadata: { total_miles: +(total_m / MI_TO_M).toFixed(2), steps: steps.length },
    });
    return result;
  }

  async startNavigation(session: NavigationSession): Promise<void> {
    this.session = session;
    this.segIdx = 0;
    this.segFrac = 0;
    this.offRouteFiredAt = null;
    this.emit("navigation_started", {
      latitude: session.origin.latitude,
      longitude: session.origin.longitude,
    });

    if (this.timer != null) window.clearInterval(this.timer);
    this.timer = window.setInterval(() => this.tick(), 1500);
    this.tick();
  }

  async stopNavigation(): Promise<void> {
    if (this.timer != null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    this.emit("navigation_stopped");
  }

  async recalculateRoute(req: RouteRequest): Promise<RouteResult> {
    this.emit("reroute_started");
    try {
      const r = await this.requestRoute(req);
      this.segIdx = 0;
      this.segFrac = 0;
      this.emit("reroute_completed", {
        metadata: { steps: r.steps.length },
      });
      return r;
    } catch (e) {
      this.emit("reroute_failed", { metadata: { error: String(e) } });
      throw e;
    }
  }

  private tick() {
    if (!this.route || !this.session) return;
    const g = this.route.geometry;
    if (this.segIdx >= g.length - 1) {
      this.emit("arrived_at_dropoff", {
        latitude: g[g.length - 1][1],
        longitude: g[g.length - 1][0],
      });
      this.emit("navigation_completed");
      this.stopNavigation();
      return;
    }

    const a = g[this.segIdx];
    const b = g[this.segIdx + 1];
    const segMi = haversineMi(a, b);
    const stepMi = (this.speedMph / 3600) * 1.5;
    this.segFrac += segMi > 0 ? stepMi / segMi : 1;
    if (this.segFrac >= 1) {
      this.segFrac -= 1;
      this.segIdx += 1;
    }

    const idx = Math.min(this.segIdx, g.length - 1);
    const here = interpolate(g[idx], g[Math.min(idx + 1, g.length - 1)], this.segFrac);
    const head = bearing(here, g[Math.min(idx + 1, g.length - 1)]);

    let remaining_m = haversineMi(here, g[Math.min(idx + 1, g.length - 1)]) * MI_TO_M;
    for (let i = idx + 1; i < g.length - 1; i++) {
      remaining_m += haversineMi(g[i], g[i + 1]) * MI_TO_M;
    }
    const remaining_s = (remaining_m / MI_TO_M / this.speedMph) * 3600;
    const total_m = this.route.total_distance_meters;
    const progress = ((total_m - remaining_m) / total_m) * 100;

    const step = this.route.steps[idx + 1] ?? this.route.steps[this.route.steps.length - 1];
    const distToNext = haversineMi(here, [step.start.longitude, step.start.latitude]) * MI_TO_M;

    this.pushLocation({
      latitude: here[1],
      longitude: here[0],
      heading: head,
      speed_mph: this.speedMph,
      recorded_at: new Date().toISOString(),
    });
    this.pushProgress({
      current_step_index: idx,
      distance_to_next_turn_m: distToNext,
      remaining_meters: remaining_m,
      remaining_seconds: remaining_s,
      progress_percentage: Math.max(0, Math.min(100, progress)),
      current_instruction: this.route.steps[idx]?.instruction ?? null,
      next_instruction: step?.instruction ?? null,
    });

    // Fire a voice instruction ~150 m before the next maneuver.
    if (step && distToNext < 240 && step.maneuver !== "straight") {
      const v: VoiceInstructionEvent = {
        id: `voice_${Date.now()}`,
        session_id: this.session.id,
        driver_id: this.session.driver_id,
        load_id: this.session.load_id ?? null,
        instruction_text: `In ${Math.round(distToNext)} meters, ${humanManeuver(step.maneuver)} on ${step.road_name ?? "the road"}.`,
        maneuver_type: step.maneuver,
        distance_to_maneuver_m: distToNext,
        road_name: step.road_name ?? null,
        spoken_at: new Date().toISOString(),
        provider: this.id,
        created_at: new Date().toISOString(),
      };
      this.pushVoice(v);
    }
  }

  /** Dev helper — simulate an off-route deviation. */
  simulateOffRoute() {
    if (!this.route) return;
    const g = this.route.geometry;
    const idx = Math.min(this.segIdx, g.length - 1);
    this.reportOffRoute(
      { latitude: g[idx][1] + 0.01, longitude: g[idx][0] + 0.01 },
      120,
    );
  }

  /** Dev helper — jump the puck forward by N simulated seconds. */
  fastForward(seconds: number) {
    if (!this.route) return;
    const ticks = Math.max(1, Math.round(seconds / 1.5));
    for (let i = 0; i < ticks; i++) this.tick();
  }

  /** Dev helper — change the simulated cruise speed. */
  setSpeedMph(mph: number) {
    this.speedMph = Math.max(5, Math.min(85, mph));
  }
}

function buildSyntheticGeometry(
  origin: GeoPoint,
  dest: GeoPoint,
  waypoints: GeoPoint[],
): Array<[number, number]> {
  const points: Array<[number, number]> = [
    [origin.longitude, origin.latitude],
    ...waypoints.map((w) => [w.longitude, w.latitude] as [number, number]),
    [dest.longitude, dest.latitude],
  ];
  // Subdivide each leg into ~6 intermediate points so the puck moves smoothly.
  const out: Array<[number, number]> = [points[0]];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    for (let k = 1; k <= 6; k++) out.push(interpolate(a, b, k / 6));
  }
  return out;
}

function cardinal(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function humanManeuver(m: ManeuverType): string {
  switch (m) {
    case "depart": return "Depart";
    case "arrive": return "Arrive at destination";
    case "turn-left": return "Turn left";
    case "turn-right": return "Turn right";
    case "turn-slight-left": return "Bear left";
    case "turn-slight-right": return "Bear right";
    case "turn-sharp-left": return "Sharp left";
    case "turn-sharp-right": return "Sharp right";
    case "merge": return "Merge";
    case "fork": return "Take the fork";
    case "roundabout": return "Enter the roundabout";
    case "ramp": return "Take the ramp";
    case "exit": return "Take the exit";
    case "uturn": return "Make a U-turn";
    default: return "Continue straight";
  }
}
