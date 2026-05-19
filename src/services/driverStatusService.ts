/**
 * Phase 2 — Driver status service.
 * Records status transitions with reason/note and optional location.
 */
import { supabase } from "@/integrations/supabase/client";
import type { DriverStatusEvent, DriverStatusKey } from "@/types/status";

export async function recordStatusChange(
  evt: Omit<DriverStatusEvent, "id" | "created_at"> & { status?: DriverStatusKey },
) {
  const row: any = {
    company_id: evt.company_id,
    driver_id: evt.driver_id,
    vehicle_id: evt.vehicle_id ?? null,
    load_id: evt.load_id ?? null,
    previous_status: evt.previous_status ?? null,
    status: evt.new_status,
    reason: evt.reason ?? null,
    note: evt.note ?? null,
    lat: evt.latitude ?? null,
    lng: evt.longitude ?? null,
    created_by: evt.created_by ?? null,
  };
  const { error } = await supabase.from("driver_status_events").insert(row);
  if (error) console.warn("[status] insert failed", error.message);
}
