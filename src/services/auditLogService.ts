/**
 * Phase 2 — Audit log service.
 *
 * Append-only log for sensitive events. Never trust this for billing or
 * legal evidence on its own — pair with Supabase Auth logs and (Phase 3)
 * a signed server-side writer via Edge Function.
 */
import { supabase } from "@/integrations/supabase/client";
import type { AuditEventType } from "@/types/realtime";

export async function writeAudit(entry: {
  company_id: string;
  event_type: AuditEventType;
  driver_id?: string;
  load_id?: string;
  message?: string;
  metadata?: Record<string, unknown>;
}) {
  const row: any = {
    company_id: entry.company_id,
    event_type: entry.event_type,
    driver_id: entry.driver_id ?? null,
    load_id: entry.load_id ?? null,
    message: entry.message ?? null,
    metadata: entry.metadata ?? {},
  };
  const { error } = await supabase.from("audit_logs").insert(row);
  if (error) console.warn("[audit] insert failed", error.message);
}
