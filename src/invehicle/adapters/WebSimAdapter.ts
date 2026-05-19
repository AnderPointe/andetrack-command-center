/**
 * Phase 5 — Web simulator adapter.
 *
 * Implements InVehicleSurfaceAdapter against in-memory state so the Lovable
 * preview can render a CarPlay / Android Auto-style template panel without
 * a real car. Logs a row in `in_vehicle_sessions` so dispatchers can see
 * which drivers have an in-vehicle session active.
 */
import { supabase } from "@/integrations/supabase/client";
import type {
  InVehicleConnectionInfo,
  InVehicleListenerStatus,
  InVehicleSurfaceAdapter,
  RoutingInfoSnapshot,
} from "../types";

export type WebSimEventListener = (
  evt:
    | { kind: "routing"; info: RoutingInfoSnapshot }
    | { kind: "alert"; alert: { label: string; severity: "info" | "warning" | "critical" } }
    | { kind: "status"; status: InVehicleListenerStatus },
) => void;

export class WebSimAdapter implements InVehicleSurfaceAdapter {
  readonly id = "web_sim" as const;
  readonly displayName = "Web simulator";

  private statusListeners = new Set<(s: InVehicleListenerStatus) => void>();
  private eventListeners = new Set<WebSimEventListener>();
  private sessionRowId: string | null = null;

  constructor(private driverId: string, private companyId: string) {}

  async connect(): Promise<InVehicleConnectionInfo | null> {
    this.emitStatus("connecting");
    const sessionId = `sim_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const { data, error } = await supabase
      .from("in_vehicle_sessions")
      .insert({
        driver_id: this.driverId,
        company_id: this.companyId,
        surface: "web_sim",
        session_id: sessionId,
        vehicle_make: "Simulator",
        vehicle_model: "Web preview",
        app_template: "NavigationTemplate",
      })
      .select("id")
      .single();
    if (error) {
      this.emitStatus("error");
      return null;
    }
    this.sessionRowId = data.id;
    this.emitStatus("connected");
    return { surface: "web_sim", session_id: sessionId };
  }

  async disconnect(): Promise<void> {
    if (this.sessionRowId) {
      await supabase
        .from("in_vehicle_sessions")
        .update({ disconnected_at: new Date().toISOString() })
        .eq("id", this.sessionRowId);
      this.sessionRowId = null;
    }
    this.emitStatus("disconnected");
  }

  async updateRoutingInfo(info: RoutingInfoSnapshot): Promise<void> {
    this.eventListeners.forEach((l) => l({ kind: "routing", info }));
    if (this.sessionRowId) {
      await supabase
        .from("in_vehicle_sessions")
        .update({ last_event_at: new Date().toISOString() })
        .eq("id", this.sessionRowId);
    }
  }

  async showAlert(alert: { label: string; severity: "info" | "warning" | "critical" }): Promise<void> {
    this.eventListeners.forEach((l) => l({ kind: "alert", alert }));
  }

  onStatusChange(listener: (s: InVehicleListenerStatus) => void) {
    this.statusListeners.add(listener);
    return () => this.statusListeners.delete(listener) as unknown as void;
  }

  onEvent(listener: WebSimEventListener) {
    this.eventListeners.add(listener);
    return () => this.eventListeners.delete(listener) as unknown as void;
  }

  private emitStatus(s: InVehicleListenerStatus) {
    this.statusListeners.forEach((l) => l(s));
    this.eventListeners.forEach((l) => l({ kind: "status", status: s }));
  }
}
