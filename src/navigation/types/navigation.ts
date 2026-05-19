/**
 * Phase 3 — Navigation domain types.
 *
 * Provider-agnostic. Adapters (Mapbox, Google, HERE, Trimble, Mock) translate
 * SDK-specific events into these shapes so the rest of the app never imports
 * a vendor SDK type.
 */

export type NavigationProviderId =
  | "mock"
  | "mapbox"
  | "google"
  | "here"
  | "trimble";

export type NavigationMode =
  | "to_pickup"
  | "at_pickup"
  | "to_dropoff"
  | "completed"
  | "paused"
  | "rerouting"
  | "off_route"
  | "cancelled";

export type TrafficLevel = "unknown" | "free" | "light" | "moderate" | "heavy" | "severe";

export interface GeoPoint {
  latitude: number;
  longitude: number;
  label?: string;
}

export type ManeuverType =
  | "depart"
  | "turn-left"
  | "turn-right"
  | "turn-slight-left"
  | "turn-slight-right"
  | "turn-sharp-left"
  | "turn-sharp-right"
  | "straight"
  | "merge"
  | "fork"
  | "roundabout"
  | "ramp"
  | "exit"
  | "uturn"
  | "arrive";

export interface RouteStep {
  index: number;
  instruction: string;
  road_name?: string | null;
  maneuver: ManeuverType;
  distance_meters: number;
  duration_seconds: number;
  start: GeoPoint;
  end: GeoPoint;
}

export interface NavigationSession {
  id: string;
  company_id: string;
  driver_id: string;
  vehicle_id?: string | null;
  load_id?: string | null;
  shipment_id?: string | null;
  provider: NavigationProviderId;
  mode: NavigationMode;
  origin: GeoPoint;
  destination: GeoPoint;
  pickup_location?: GeoPoint | null;
  dropoff_location?: GeoPoint | null;
  current_location?: GeoPoint | null;
  route_polyline?: string | null;
  route_geometry?: Array<[number, number]> | null;
  route_steps: RouteStep[];
  current_step_index: number;
  current_instruction?: string | null;
  next_instruction?: string | null;
  eta_minutes: number;
  original_eta_minutes: number;
  remaining_miles: number;
  remaining_seconds: number;
  distance_to_next_turn_m: number;
  route_progress_percentage: number;
  is_navigation_active: boolean;
  is_off_route: boolean;
  is_rerouting: boolean;
  traffic_level: TrafficLevel;
  route_safety_score: number;
  truck_route_validated: boolean;
  cdl_restrictions_checked: boolean;
  started_at?: string | null;
  completed_at?: string | null;
  updated_at: string;
}

export type NavigationEventType =
  | "navigation_started"
  | "navigation_paused"
  | "navigation_resumed"
  | "navigation_stopped"
  | "route_requested"
  | "route_loaded"
  | "route_failed"
  | "route_updated"
  | "route_progress_updated"
  | "next_turn_updated"
  | "eta_updated"
  | "off_route_detected"
  | "reroute_started"
  | "reroute_completed"
  | "reroute_failed"
  | "arrived_at_pickup"
  | "loaded"
  | "arrived_at_dropoff"
  | "delivered"
  | "navigation_completed"
  | "safety_warning"
  | "truck_restriction_warning"
  | "traffic_delay_detected"
  | "delivery_window_at_risk";

export interface NavigationEvent {
  id: string;
  session_id: string;
  company_id: string;
  driver_id: string;
  load_id?: string | null;
  event_type: NavigationEventType;
  provider: NavigationProviderId;
  latitude?: number | null;
  longitude?: number | null;
  heading?: number | null;
  speed_mph?: number | null;
  eta_minutes?: number | null;
  remaining_miles?: number | null;
  current_step_index?: number | null;
  instruction?: string | null;
  road_name?: string | null;
  distance_to_next_turn_m?: number | null;
  route_progress_percentage?: number | null;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface VoiceInstructionEvent {
  id: string;
  session_id: string;
  driver_id: string;
  load_id?: string | null;
  instruction_text: string;
  maneuver_type: ManeuverType;
  distance_to_maneuver_m: number;
  road_name?: string | null;
  spoken_at: string;
  provider: NavigationProviderId;
  created_at: string;
}
