/**
 * Phase 2 — Driver location tracking types.
 *
 * Privacy & safety contract:
 *  - Never track without explicit driver consent.
 *  - Never track a logged-out driver.
 *  - Never track off-duty drivers unless company policy + driver consent allow it.
 *  - Store only what is needed to dispatch the active load.
 */

export type TrackingMode =
  | "off"
  | "foreground"
  | "background"
  | "active_load"
  | "reduced_frequency"
  | "paused";

export type AppStateValue = "foreground" | "background" | "inactive" | "unknown";

export type EventSource =
  | "mobile_gps"
  | "mock_stream"
  | "manual_status_update"
  | "navigation_sdk_future"
  | "dispatcher"
  | "system";

export type LocationPermissionStatus =
  | "granted"
  | "denied"
  | "prompt"
  | "restricted"
  | "unknown";

export interface DriverLocationEvent {
  id: string;
  company_id: string;
  driver_id: string;
  vehicle_id?: string | null;
  active_load_id?: string | null;
  active_shipment_id?: string | null;
  latitude: number;
  longitude: number;
  heading?: number | null;
  speed_mph?: number | null;
  altitude?: number | null;
  accuracy_meters?: number | null;
  battery_level?: number | null;
  is_charging?: boolean | null;
  app_state?: AppStateValue | null;
  tracking_mode: TrackingMode;
  driver_status?: string | null;
  route_status?: string | null;
  eta_minutes?: number | null;
  remaining_miles?: number | null;
  event_source: EventSource;
  created_at: string;
}

export interface DriverLiveState {
  driver_id: string;
  company_id: string;
  vehicle_id?: string | null;
  active_load_id?: string | null;
  active_shipment_id?: string | null;
  current_latitude?: number | null;
  current_longitude?: number | null;
  heading?: number | null;
  speed_mph?: number | null;
  driver_status?: string | null;
  route_status?: string | null;
  eta_minutes?: number | null;
  remaining_miles?: number | null;
  route_progress_pct?: number | null;
  last_location_at?: string | null;
  last_status_at?: string | null;
  tracking_mode: TrackingMode;
  location_permission_status: LocationPermissionStatus;
  app_state?: AppStateValue | null;
  battery_level?: number | null;
  is_charging?: boolean | null;
  is_gps_stale: boolean;
  updated_at: string;
}
