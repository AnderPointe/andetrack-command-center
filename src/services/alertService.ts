/**
 * Phase 2 — Alert service.
 */
import { supabase } from "@/integrations/supabase/client";
import type { DispatchAlert } from "@/types/realtime";

export async function createAlert(a: Omit<DispatchAlert, "id" | "created_at">) {
  const row: any = {
    company_id: a.company_id,
    driver_id: a.driver_id ?? null,
    load_id: a.load_id ?? null,
    severity: a.severity,
    alert_type: a.alert_type,
    type: a.alert_type,
    message: a.message,
    recommended_action: a.recommended_action ?? null,
    status: a.status,
  };
  const { error } = await supabase.from("alerts").insert(row);
  if (error) console.warn("[alerts] insert failed", error.message);
}

export async function resolveAlert(id: string) {
  const { error } = await supabase
    .from("alerts")
    .update({ status: "resolved", resolved: true, resolved_at: new Date().toISOString() } as any)
    .eq("id", id);
  if (error) console.warn("[alerts] resolve failed", error.message);
}
