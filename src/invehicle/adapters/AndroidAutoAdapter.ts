/**
 * Phase 5 — Android for Cars (Android Auto) adapter — PLACEHOLDER.
 *
 * Wiring checklist:
 *   1. AndroidManifest.xml: declare
 *        <category android:name="androidx.car.app.category.NAVIGATION" />
 *        plus <uses-permission android:name="androidx.car.app.NAVIGATION_TEMPLATES"/>
 *        and <uses-permission android:name="androidx.car.app.ACCESS_SURFACE"/>.
 *   2. Implement a CarAppService + Session + Screen subclass per
 *        https://developer.android.com/training/cars/apps/navigation
 *      Use NavigationTemplate to host:
 *        - RoutingInfo (current Step + travel estimate)
 *        - MapController for the surface canvas (we draw into the SurfaceCallback)
 *        - DestinationListNavigationTemplate for alternate destinations.
 *   3. Voice: NavigationManager.navigationStarted / sendNavigationStateChange
 *      so Android Auto can mute media + route TTS through the car.
 *   4. Alerts: Alert + AlertCallback for transient CDL hazard banners.
 *   5. Distraction-optimization: ALL strings should pass Android's
 *      template validator (no images of text, short labels).
 *
 * Today this stub is non-functional at runtime — connect() returns null.
 */
import type {
  InVehicleConnectionInfo,
  InVehicleListenerStatus,
  InVehicleSurfaceAdapter,
  RoutingInfoSnapshot,
} from "../types";

export class AndroidAutoAdapter implements InVehicleSurfaceAdapter {
  readonly id = "android_auto" as const;
  readonly displayName = "Android for Cars";
  private listeners = new Set<(s: InVehicleListenerStatus) => void>();

  async connect(): Promise<InVehicleConnectionInfo | null> { this.emit("error"); return null; }
  async disconnect(): Promise<void> { this.emit("disconnected"); }
  async updateRoutingInfo(_info: RoutingInfoSnapshot): Promise<void> {}
  async showAlert(_alert: { label: string; severity: "info" | "warning" | "critical" }): Promise<void> {}
  onStatusChange(l: (s: InVehicleListenerStatus) => void) {
    this.listeners.add(l);
    return () => this.listeners.delete(l) as unknown as void;
  }
  private emit(s: InVehicleListenerStatus) { this.listeners.forEach((l) => l(s)); }
}
