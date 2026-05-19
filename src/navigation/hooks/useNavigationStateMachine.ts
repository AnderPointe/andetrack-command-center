/**
 * Phase 3 polish — useNavigationStateMachine.
 *
 * Thin useReducer wrapper around the pure navigationStateReducer so
 * components share a single typed FSM instead of ad-hoc string stages.
 * Also auto-syncs the stage from incoming NavigationEvents (off-route,
 * reroute, arrival) so the UI stays consistent without manual plumbing.
 */
import { useEffect, useReducer } from "react";
import { getNavigationProvider } from "../providers/registry";
import {
  INITIAL_NAV_STATE,
  navigationStateReducer,
  type NavigationStageEvent,
} from "../utils/navigationState";
import type { NavigationProviderId } from "../types/navigation";

export function useNavigationStateMachine(providerId: NavigationProviderId) {
  const [state, dispatch] = useReducer(navigationStateReducer, INITIAL_NAV_STATE);

  useEffect(() => {
    const p = getNavigationProvider(providerId);
    return p.subscribeToNavigationEvents((evt) => {
      const next = mapEventToStageEvent(evt.event_type, evt.metadata);
      if (next) dispatch(next);
    });
  }, [providerId]);

  return { state, dispatch };
}

function mapEventToStageEvent(
  type: string,
  metadata: Record<string, unknown> | undefined,
): NavigationStageEvent | null {
  switch (type) {
    case "route_loaded":     return { type: "ROUTE_LOADED" };
    case "route_failed":     return { type: "ROUTE_FAILED", reason: String(metadata?.error ?? "Route request failed") };
    case "navigation_started": return { type: "START" };
    case "off_route_detected": return { type: "OFF_ROUTE", distance_m: Number(metadata?.distance_off_route_m ?? 0) };
    case "reroute_started":  return { type: "REROUTE_STARTED" };
    case "reroute_completed": return { type: "REROUTE_COMPLETED" };
    case "reroute_failed":   return { type: "REROUTE_FAILED" };
    case "arrived_at_dropoff":
    case "arrived_at_pickup": return { type: "ARRIVED" };
    case "navigation_stopped": return { type: "STOP" };
    default: return null;
  }
}
