/**
 * Phase 2 — Dispatch realtime service.
 * Thin wrappers over subscribeToTable used by the dispatch dashboard hooks.
 */
import { subscribeToTable } from "@/lib/realtime";

export function watchLiveState(
  companyId: string | null,
  onChange: (row: any) => void,
) {
  if (!companyId) return () => {};
  return subscribeToTable<any>({
    channelName: `dls-${companyId}`,
    table: "driver_live_state",
    filter: `company_id=eq.${companyId}`,
    onPayload: (p) => onChange(p.new ?? p.old),
  });
}

export function watchAlerts(companyId: string | null, onChange: (row: any) => void) {
  if (!companyId) return () => {};
  return subscribeToTable<any>({
    channelName: `alerts-${companyId}`,
    table: "alerts",
    filter: `company_id=eq.${companyId}`,
    onPayload: (p) => onChange(p.new ?? p.old),
  });
}

export function watchStatusEvents(companyId: string | null, onChange: (row: any) => void) {
  if (!companyId) return () => {};
  return subscribeToTable<any>({
    channelName: `dse-${companyId}`,
    table: "driver_status_events",
    event: "INSERT",
    filter: `company_id=eq.${companyId}`,
    onPayload: (p) => onChange(p.new),
  });
}

export function watchLocationEvents(companyId: string | null, onChange: (row: any) => void) {
  if (!companyId) return () => {};
  return subscribeToTable<any>({
    channelName: `dle-${companyId}`,
    table: "driver_location_events",
    event: "INSERT",
    filter: `company_id=eq.${companyId}`,
    onPayload: (p) => onChange(p.new),
  });
}

export function watchRouteProgress(companyId: string | null, onChange: (row: any) => void) {
  if (!companyId) return () => {};
  return subscribeToTable<any>({
    channelName: `rpe-${companyId}`,
    table: "route_progress_events",
    event: "INSERT",
    filter: `company_id=eq.${companyId}`,
    onPayload: (p) => onChange(p.new),
  });
}

export function watchETA(companyId: string | null, onChange: (row: any) => void) {
  if (!companyId) return () => {};
  return subscribeToTable<any>({
    channelName: `eta-${companyId}`,
    table: "eta_updates",
    event: "INSERT",
    filter: `company_id=eq.${companyId}`,
    onPayload: (p) => onChange(p.new),
  });
}
