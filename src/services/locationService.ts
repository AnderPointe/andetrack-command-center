/**
 * Phase 2 — Location service.
 *
 * Wraps inserts into `driver_location_events` and upserts into
 * `driver_live_state`. Both tables are protected by RLS: a driver can only
 * write rows whose `driver_id` belongs to the signed-in user.
 *
 * SECURITY / PRIVACY:
 *  - Caller MUST check consent + permission + active shift before invoking.
 *  - Rate-limit at the caller (mobile app) — do not flood the DB. Phase 3
 *    will batch pings server-side via an Edge Function.
 */
import { supabase } from "@/integrations/supabase/client";
import type { DriverLocationEvent } from "@/types/location";
import type { DriverLiveState } from "@/types/location";

export async function recordLocationEvent(
  evt: Omit<DriverLocationEvent, "id" | "created_at"> & { recorded_at?: string },
) {
  const row: any = {
    company_id: evt.company_id,
    driver_id: evt.driver_id,
    lat: evt.latitude,
    lng: evt.longitude,
    heading: evt.heading ?? null,
    speed: evt.speed_mph ?? null,
    vehicle_id: evt.vehicle_id ?? null,
    active_load_id: evt.active_load_id ?? null,
    active_shipment_id: evt.active_shipment_id ?? null,
    altitude: evt.altitude ?? null,
    accuracy_meters: evt.accuracy_meters ?? null,
    battery_level: evt.battery_level ?? null,
    is_charging: evt.is_charging ?? null,
    app_state: evt.app_state ?? null,
    tracking_mode: evt.tracking_mode,
    driver_status: evt.driver_status ?? null,
    route_status: evt.route_status ?? null,
    eta_minutes: evt.eta_minutes ?? null,
    remaining_miles: evt.remaining_miles ?? null,
    event_source: evt.event_source,
    recorded_at: evt.recorded_at ?? new Date().toISOString(),
  };
  const { error } = await supabase.from("driver_location_events").insert(row);
  if (error) console.warn("[location] insert failed", error.message);
}

export async function upsertDriverLiveState(state: Partial<DriverLiveState> & {
  driver_id: string;
  company_id: string;
}) {
  const row: any = { ...state, updated_at: new Date().toISOString() };
  const { error } = await supabase
    .from("driver_live_state")
    .upsert(row, { onConflict: "driver_id" });
  if (error) console.warn("[live_state] upsert failed", error.message);
}
