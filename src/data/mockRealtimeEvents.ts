/**
 * Phase 2 — Realtime event fixtures for the dispatch event feed when
 * the Supabase Realtime stream is not yet wired (dev / preview).
 */
import type {
  DispatchAlert,
  ETAUpdate,
  RealtimeEvent,
  RouteProgressEvent,
} from "@/types/realtime";
import type { DriverStatusEvent } from "@/types/status";

const now = () => new Date().toISOString();

export const mockDispatchAlerts: DispatchAlert[] = [
  {
    id: "alert_001",
    company_id: "demo",
    driver_id: "drv_001",
    load_id: "load_001",
    severity: "warning",
    alert_type: "delivery_window_at_risk",
    message: "ETA pushes 14 min past delivery window",
    recommended_action: "Notify consignee · re-sequence drop after",
    status: "open",
    created_at: now(),
  },
  {
    id: "alert_002",
    company_id: "demo",
    driver_id: "drv_002",
    severity: "warning",
    alert_type: "gps_stale",
    message: "No GPS ping for 4 minutes",
    recommended_action: "Call driver · check device signal",
    status: "open",
    created_at: now(),
  },
  {
    id: "alert_003",
    company_id: "demo",
    driver_id: "drv_003",
    severity: "info",
    alert_type: "battery_low",
    message: "Driver battery at 12%",
    recommended_action: "Remind driver to charge",
    status: "open",
    created_at: now(),
  },
];

export const mockStatusEvents: DriverStatusEvent[] = [
  {
    id: "stat_001",
    company_id: "demo",
    driver_id: "drv_001",
    load_id: "load_001",
    previous_status: "en_route_pickup",
    new_status: "arrived_pickup",
    reason: "Geofence entry",
    created_at: now(),
  },
];

export const mockETAUpdates: ETAUpdate[] = [
  {
    id: "eta_001",
    company_id: "demo",
    driver_id: "drv_001",
    load_id: "load_001",
    route_id: "route_001",
    source: "traffic_engine",
    reason: "Heavy traffic on I-45 S",
    eta_seconds_remaining: 2640,
    confidence: 0.86,
    recorded_at: now(),
  },
];

export const mockRouteProgressEvents: RouteProgressEvent[] = [
  {
    id: "rp_001",
    company_id: "demo",
    driver_id: "drv_001",
    load_id: "load_001",
    route_id: "route_001",
    progress_pct: 42,
    traveled_miles: 105,
    remaining_miles: 145,
    current_step_index: 4,
    on_route: true,
    distance_off_route_m: 0,
    speed_mph: 58,
    heading: 174,
    eta_minutes: 154,
    source: "mock_stream",
    recorded_at: now(),
  },
];

export const mockRealtimeFeed: RealtimeEvent[] = [
  { kind: "status", payload: mockStatusEvents[0] },
  { kind: "eta", payload: mockETAUpdates[0] },
  { kind: "route_progress", payload: mockRouteProgressEvents[0] },
  { kind: "alert", payload: mockDispatchAlerts[0] },
  { kind: "alert", payload: mockDispatchAlerts[1] },
];
