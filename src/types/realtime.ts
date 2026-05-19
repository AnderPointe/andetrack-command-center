/**
 * Phase 2 — Realtime event & alert types.
 */
import type { DriverLiveState, DriverLocationEvent } from "./location";
import type { DriverStatusEvent, DriverStatusKey } from "./status";

export type AlertSeverity = "info" | "warning" | "critical";
export type AlertStatus = "open" | "acknowledged" | "resolved";

export type AlertType =
  | "gps_stale"
  | "driver_stopped_too_long"
  | "driver_delayed"
  | "route_deviation"
  | "speeding"
  | "battery_low"
  | "location_permission_disabled"
  | "off_route"
  | "delivery_window_at_risk"
  | "load_accepted_but_gps_inactive";

export interface DispatchAlert {
  id: string;
  company_id: string;
  driver_id?: string | null;
  load_id?: string | null;
  severity: AlertSeverity;
  alert_type: AlertType;
  message: string;
  recommended_action?: string | null;
  status: AlertStatus;
  created_at: string;
  resolved_at?: string | null;
}

export interface ETAUpdate {
  id: string;
  company_id: string;
  driver_id?: string | null;
  load_id?: string | null;
  route_id: string;
  source: string;
  reason: string;
  eta_at?: string | null;
  eta_seconds_remaining?: number | null;
  confidence?: number | null;
  recorded_at: string;
}

export interface RouteProgressEvent {
  id: string;
  company_id: string;
  driver_id: string;
  load_id?: string | null;
  route_id?: string | null;
  progress_pct: number;
  traveled_miles: number;
  remaining_miles: number;
  current_step_index: number;
  on_route: boolean;
  distance_off_route_m: number;
  current_lat?: number | null;
  current_lng?: number | null;
  speed_mph?: number | null;
  heading?: number | null;
  eta_minutes?: number | null;
  source: string;
  recorded_at: string;
}

export type AuditEventType =
  | "tracking_started"
  | "tracking_stopped"
  | "permission_granted"
  | "permission_denied"
  | "load_offered"
  | "load_accepted"
  | "load_denied"
  | "status_changed"
  | "load_assigned"
  | "alert_resolved"
  | "pod_submitted"
  | "login"
  | "logout";

export interface AuditLogEntry {
  id: string;
  company_id: string;
  actor_user_id?: string | null;
  driver_id?: string | null;
  load_id?: string | null;
  event_type: AuditEventType;
  message?: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export type RealtimeEvent =
  | { kind: "location"; payload: DriverLocationEvent }
  | { kind: "status"; payload: DriverStatusEvent }
  | { kind: "live_state"; payload: DriverLiveState }
  | { kind: "eta"; payload: ETAUpdate }
  | { kind: "route_progress"; payload: RouteProgressEvent }
  | { kind: "alert"; payload: DispatchAlert };

export const STALE_GPS_THRESHOLD_SEC = 60;
export const LOW_BATTERY_THRESHOLD = 0.15;

export type { DriverStatusKey };
