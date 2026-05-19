/**
 * Phase 3 — CoPilotNavigationBrain.
 *
 * Listens to NavigationEvent stream and turns it into short, driver-safe
 * spoken/displayed sentences. Keeps phrases under ~12 words so they read
 * cleanly on the EliteNav voice banner while the truck is in motion.
 */
import type {
  NavigationEvent,
  NavigationSession,
} from "../types/navigation";
import type {
  RestrictionWarning,
  TruckRouteValidationResult,
} from "../types/truckRouting";

export interface CoPilotMessage {
  id: string;
  severity: "info" | "warning" | "critical";
  text: string;
  spoken: boolean;
  notify_dispatch: boolean;
  created_at: string;
}

function msg(
  severity: CoPilotMessage["severity"],
  text: string,
  opts: { spoken?: boolean; notify_dispatch?: boolean } = {},
): CoPilotMessage {
  return {
    id: `cp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    severity,
    text,
    spoken: opts.spoken ?? true,
    notify_dispatch: opts.notify_dispatch ?? false,
    created_at: new Date().toISOString(),
  };
}

export function generateInstructionSummary(session: NavigationSession): string | null {
  if (!session.next_instruction) return null;
  const dist = session.distance_to_next_turn_m;
  if (dist < 50) return `Now: ${session.next_instruction}`;
  if (dist < 400) return `In ${Math.round(dist)} m, ${session.next_instruction.toLowerCase()}`;
  return `Next: ${session.next_instruction}`;
}

export function explainTruckRestriction(w: RestrictionWarning): CoPilotMessage {
  switch (w.type) {
    case "low_clearance":
      return msg("warning", `Low clearance ahead${w.road_name ? ` on ${w.road_name}` : ""}.`);
    case "weight_restriction":
      return msg("warning", `Weight restriction${w.road_name ? ` on ${w.road_name}` : ""}.`);
    case "hazmat_prohibited":
      return msg("critical", "Hazmat restriction on this corridor.", { notify_dispatch: true });
    case "tunnel_restriction":
      return msg("critical", "Tunnel category restriction ahead.", { notify_dispatch: true });
    case "no_truck_zone":
      return msg("warning", `No-truck zone${w.road_name ? ` on ${w.road_name}` : ""}.`);
    default:
      return msg("info", w.message ?? "Truck restriction noted.");
  }
}

export function explainValidation(v: TruckRouteValidationResult): CoPilotMessage[] {
  if (v.is_valid && v.warnings.length === 0) {
    return [msg("info", "Truck route validation complete. Route approved for your vehicle profile.")];
  }
  if (!v.is_valid) {
    return [
      msg("critical", "CDL route validation failed. Do not start navigation.", {
        notify_dispatch: true,
      }),
      ...v.warnings.map(explainTruckRestriction),
    ];
  }
  return [
    msg("info", "Truck route validated with warnings."),
    ...v.warnings.slice(0, 2).map(explainTruckRestriction),
  ];
}

export function explainETAChange(oldEta: number, newEta: number): CoPilotMessage | null {
  const delta = newEta - oldEta;
  if (Math.abs(delta) < 2) return null;
  if (delta > 0) {
    return msg(delta > 10 ? "warning" : "info", `ETA increased by ${delta} minutes.`, {
      notify_dispatch: delta > 10,
    });
  }
  return msg("info", `ETA improved by ${Math.abs(delta)} minutes.`);
}

export function explainReroute(deltaEtaMin: number): CoPilotMessage {
  if (deltaEtaMin > 0) {
    return msg("warning", `Reroute complete. ETA increased by ${deltaEtaMin} minutes.`, {
      notify_dispatch: deltaEtaMin > 5,
    });
  }
  return msg("info", "Reroute complete. ETA unchanged.");
}

export function explainRouteWarning(w: RestrictionWarning): CoPilotMessage {
  return explainTruckRestriction(w);
}

/** Decide if CoPilot should react to a raw NavigationEvent. */
export function generateDriverSafeMessage(evt: NavigationEvent): CoPilotMessage | null {
  switch (evt.event_type) {
    case "off_route_detected":
      return msg("warning", "You are off route. Recalculating.");
    case "reroute_completed":
      return msg("info", "Reroute complete.");
    case "reroute_failed":
      return msg("critical", "Reroute failed. Hold position and contact dispatch.", {
        notify_dispatch: true,
      });
    case "arrived_at_pickup":
      return msg("info", "You have arrived at pickup.");
    case "arrived_at_dropoff":
      return msg("info", "You have arrived at the delivery point.");
    case "delivery_window_at_risk":
      return msg("warning", "Delivery window is at risk. Dispatch has been notified.", {
        notify_dispatch: true,
      });
    case "truck_restriction_warning":
      return msg("warning", String(evt.metadata?.message ?? "Truck restriction ahead."));
    case "safety_warning":
      return msg("warning", String(evt.metadata?.message ?? "Safety warning."));
    case "navigation_completed":
      return msg("info", "Navigation complete. Safe travels.");
    default:
      return null;
  }
}

/** Stub — wire to push notifications / dispatch channel in Phase 4. */
export async function notifyDispatchIfNeeded(message: CoPilotMessage) {
  if (!message.notify_dispatch) return;
  // TODO: insert into push_notifications, or call a server fn that broadcasts.
}
