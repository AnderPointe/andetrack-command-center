/**
 * Phase 5 — Apple CarPlay adapter — PLACEHOLDER.
 *
 * Wiring checklist:
 *   1. Apply for the Apple CarPlay framework entitlement (`com.apple.developer.carplay-maps`)
 *      via https://developer.apple.com/contact/carplay — required for ANY
 *      navigation app. Approval is gated.
 *   2. iOS shell: import CarPlay; implement
 *        - CPTemplateApplicationSceneDelegate
 *        - CPMapTemplate (rendered map surface)
 *        - CPNavigationSession (active turn-by-turn)
 *        - CPRouteChoice for alternate routes
 *        - CPManeuver / CPTravelEstimates streamed from Phase 3 NavigationProvider
 *   3. Speech: use the same Phase 4 VoiceProvider; iOS will route audio
 *      through the car speakers automatically while CarPlay is connected.
 *   4. Alerts: CPAlertTemplate for CDL hazards. Keep < 6 words per line.
 *   5. Driving Task scene role declared in Info.plist `CPSupportsDashboardNavigationScene`.
 *
 * Today this stub is non-functional at runtime — connect() returns null.
 */
import type {
  InVehicleConnectionInfo,
  InVehicleListenerStatus,
  InVehicleSurfaceAdapter,
  RoutingInfoSnapshot,
} from "../types";

export class CarPlayAdapter implements InVehicleSurfaceAdapter {
  readonly id = "carplay" as const;
  readonly displayName = "Apple CarPlay";
  private listeners = new Set<(s: InVehicleListenerStatus) => void>();

  async connect(): Promise<InVehicleConnectionInfo | null> {
    this.emit("error");
    return null;
  }
  async disconnect(): Promise<void> { this.emit("disconnected"); }
  async updateRoutingInfo(_info: RoutingInfoSnapshot): Promise<void> {}
  async showAlert(_alert: { label: string; severity: "info" | "warning" | "critical" }): Promise<void> {}
  onStatusChange(l: (s: InVehicleListenerStatus) => void) {
    this.listeners.add(l);
    return () => this.listeners.delete(l) as unknown as void;
  }
  private emit(s: InVehicleListenerStatus) { this.listeners.forEach((l) => l(s)); }
}
