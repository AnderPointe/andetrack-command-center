/**
 * Phase 3 — navigationService.
 *
 * Provider-agnostic glue between EliteNav UI, the active NavigationProvider,
 * the TruckRouteValidator, and Supabase persistence.
 *
 * NOTE: Supabase writes are best-effort. Mock mode still runs end-to-end
 * even if the realtime tables are not yet populated.
 */
import { supabase } from "@/integrations/supabase/client";
import {
  CDL_REQUIRED_PROFILES,
  type RouteRequest,
  type TruckRouteProfile,
  type TruckRouteValidationResult,
} from "../types/truckRouting";
import type {
  NavigationEvent,
  NavigationProviderId,
  NavigationSession,
} from "../types/navigation";
import type { RouteResult } from "../types/providers";
import { getNavigationProvider, getTruckValidator } from "../providers/registry";

export function createNavigationSession(
  req: RouteRequest,
  provider: NavigationProviderId,
): NavigationSession {
  const id = `nav_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();
  return {
    id,
    company_id: req.company_id,
    driver_id: req.driver_id,
    vehicle_id: req.vehicle_id ?? null,
    load_id: req.load_id ?? null,
    shipment_id: req.shipment_id ?? null,
    provider,
    mode: "to_pickup",
    origin: req.origin,
    destination: req.destination,
    pickup_location: req.origin,
    dropoff_location: req.destination,
    current_location: req.origin,
    route_polyline: null,
    route_geometry: null,
    route_steps: [],
    current_step_index: 0,
    current_instruction: null,
    next_instruction: null,
    eta_minutes: 0,
    original_eta_minutes: 0,
    remaining_miles: 0,
    remaining_seconds: 0,
    distance_to_next_turn_m: 0,
    route_progress_percentage: 0,
    is_navigation_active: false,
    is_off_route: false,
    is_rerouting: false,
    traffic_level: "unknown",
    route_safety_score: 0,
    truck_route_validated: false,
    cdl_restrictions_checked: false,
    started_at: null,
    completed_at: null,
    updated_at: now,
  };
}

export async function requestNavigationRoute(
  session: NavigationSession,
  req: RouteRequest,
): Promise<{ session: NavigationSession; route: RouteResult }> {
  const provider = getNavigationProvider(session.provider);
  await provider.initializeNavigation();
  const route = await provider.requestRoute(req);
  const updated: NavigationSession = {
    ...session,
    route_geometry: route.geometry,
    route_steps: route.steps,
    remaining_miles: route.total_distance_meters / 1609.34,
    remaining_seconds: route.total_duration_seconds,
    eta_minutes: Math.round(route.total_duration_seconds / 60),
    original_eta_minutes: Math.round(route.total_duration_seconds / 60),
    updated_at: new Date().toISOString(),
  };
  return { session: updated, route };
}

export async function validateTruckRoute(
  route: RouteResult,
  profile: TruckRouteProfile,
  validatorId: NavigationProviderId = "mock",
): Promise<TruckRouteValidationResult> {
  const validator = getTruckValidator(validatorId);
  return validator.validateTruckRoute(route, profile);
}

export function isTruckValidationRequired(profile: TruckRouteProfile): boolean {
  return profile.requires_cdl || CDL_REQUIRED_PROFILES.includes(profile.vehicle_type);
}

export async function startNavigationSession(session: NavigationSession): Promise<NavigationSession> {
  const provider = getNavigationProvider(session.provider);
  await provider.startNavigation(session);
  return {
    ...session,
    is_navigation_active: true,
    started_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function stopNavigationSession(session: NavigationSession): Promise<NavigationSession> {
  const provider = getNavigationProvider(session.provider);
  await provider.stopNavigation();
  return {
    ...session,
    is_navigation_active: false,
    mode: "completed",
    completed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function handleReroute(session: NavigationSession, req: RouteRequest) {
  const provider = getNavigationProvider(session.provider);
  return provider.recalculateRoute(req);
}

/** Best-effort write — silently skips if table is absent or RLS denies. */
export async function syncNavigationSessionToSupabase(session: NavigationSession) {
  try {
    await (supabase as any).from("navigation_sessions").upsert({
      id: session.id,
      company_id: session.company_id,
      driver_id: session.driver_id,
      vehicle_id: session.vehicle_id,
      load_id: session.load_id,
      shipment_id: session.shipment_id,
      provider: session.provider,
      mode: session.mode,
      origin_latitude: session.origin.latitude,
      origin_longitude: session.origin.longitude,
      destination_latitude: session.destination.latitude,
      destination_longitude: session.destination.longitude,
      route_polyline: session.route_polyline,
      route_geometry_json: session.route_geometry,
      current_step_index: session.current_step_index,
      current_instruction: session.current_instruction,
      eta_minutes: session.eta_minutes,
      remaining_miles: session.remaining_miles,
      route_progress_percentage: session.route_progress_percentage,
      is_navigation_active: session.is_navigation_active,
      is_off_route: session.is_off_route,
      is_rerouting: session.is_rerouting,
      truck_route_validated: session.truck_route_validated,
      started_at: session.started_at,
      completed_at: session.completed_at,
      updated_at: session.updated_at,
    });
  } catch {
    /* ignore — Phase 3 mock mode tolerates missing schema */
  }
}

export async function sendNavigationEventToDispatch(evt: NavigationEvent) {
  try {
    await (supabase as any).from("navigation_events").insert({
      session_id: evt.session_id,
      company_id: evt.company_id,
      driver_id: evt.driver_id,
      load_id: evt.load_id,
      event_type: evt.event_type,
      provider: evt.provider,
      latitude: evt.latitude,
      longitude: evt.longitude,
      heading: evt.heading,
      speed_mph: evt.speed_mph,
      eta_minutes: evt.eta_minutes,
      remaining_miles: evt.remaining_miles,
      instruction: evt.instruction,
      road_name: evt.road_name,
      event_metadata: evt.metadata ?? {},
    });
  } catch {
    /* ignore */
  }
}
