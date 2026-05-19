/**
 * Phase 2 — Driver status types & lifecycle.
 */

export type DriverStatusKey =
  | "available"
  | "waiting_for_assignment"
  | "load_offered"
  | "load_accepted"
  | "en_route_pickup"
  | "arrived_pickup"
  | "loading"
  | "loaded"
  | "en_route_dropoff"
  | "arrived_dropoff"
  | "delivered"
  | "break"
  | "off_duty"
  | "delayed"
  | "issue_reported"
  | "emergency";

export interface DriverStatusEvent {
  id: string;
  company_id: string;
  driver_id: string;
  vehicle_id?: string | null;
  load_id?: string | null;
  previous_status?: DriverStatusKey | null;
  new_status: DriverStatusKey;
  reason?: string | null;
  note?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  created_by?: string | null;
  created_at: string;
}

export const DRIVER_STATUS_LABELS: Record<DriverStatusKey, string> = {
  available: "Available",
  waiting_for_assignment: "Waiting for Assignment",
  load_offered: "Load Offered",
  load_accepted: "Load Accepted",
  en_route_pickup: "En Route to Pickup",
  arrived_pickup: "Arrived at Pickup",
  loading: "Loading",
  loaded: "Loaded",
  en_route_dropoff: "En Route to Drop-off",
  arrived_dropoff: "Arrived at Drop-off",
  delivered: "Delivered",
  break: "Break",
  off_duty: "Off Duty",
  delayed: "Delayed",
  issue_reported: "Issue Reported",
  emergency: "Emergency",
};

export const DRIVER_STATUS_COLOR: Record<DriverStatusKey, string> = {
  available: "#2dd4bf",
  waiting_for_assignment: "#94a3b8",
  load_offered: "#fbbf24",
  load_accepted: "#22d3ee",
  en_route_pickup: "#38bdf8",
  arrived_pickup: "#a78bfa",
  loading: "#a78bfa",
  loaded: "#818cf8",
  en_route_dropoff: "#34d399",
  arrived_dropoff: "#a78bfa",
  delivered: "#10b981",
  break: "#facc15",
  off_duty: "#475569",
  delayed: "#f97316",
  issue_reported: "#ef4444",
  emergency: "#dc2626",
};
