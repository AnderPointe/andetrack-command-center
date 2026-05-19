/**
 * Phase 5 — In-vehicle (CarPlay / Android Auto / Web simulator) types.
 *
 * Both Apple CarPlay and Android for Cars enforce a template-based UI
 * (no arbitrary React). This interface models the small set of templates
 * Anderoute actually needs for navigation: map + maneuver + ETA + alerts.
 */

export type InVehicleSurfaceId = "carplay" | "android_auto" | "web_sim";

export interface ManeuverSnapshot {
  /** "left", "right", "straight", "merge", "uturn", "arrive". */
  type: string;
  /** Distance to maneuver, in meters. */
  distance_m: number;
  instruction: string;
  road_shield?: string | null;
}

export interface RoutingInfoSnapshot {
  current_maneuver: ManeuverSnapshot;
  next_maneuver?: ManeuverSnapshot | null;
  destination_label: string;
  eta_iso: string;
  remaining_minutes: number;
  remaining_miles: number;
  /** Optional in-cab alert ("CDL low clearance ahead"). */
  alert?: { label: string; severity: "info" | "warning" | "critical" } | null;
}

export interface InVehicleConnectionInfo {
  surface: InVehicleSurfaceId;
  session_id: string;
  vehicle_make?: string | null;
  vehicle_model?: string | null;
}

export type InVehicleListenerStatus = "disconnected" | "connecting" | "connected" | "error";

export interface InVehicleSurfaceAdapter {
  readonly id: InVehicleSurfaceId;
  readonly displayName: string;

  /**
   * Begin a session. On native this would attach to
   * `CPTemplateApplicationSceneDelegate` (CarPlay) or
   * `CarAppService` (Android for Cars). On web it just opens a simulator
   * panel.
   */
  connect(): Promise<InVehicleConnectionInfo | null>;
  disconnect(): Promise<void>;

  /** Push fresh routing info to the in-vehicle template. */
  updateRoutingInfo(info: RoutingInfoSnapshot): Promise<void>;

  /** Render an in-cab alert banner (CDL hazard, off-route, etc). */
  showAlert(alert: { label: string; severity: "info" | "warning" | "critical" }): Promise<void>;

  onStatusChange(listener: (status: InVehicleListenerStatus) => void): () => void;
}
