import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const FilterSchema = z.object({
  startDate: z.string(), // ISO
  endDate: z.string(),
  limit: z.number().int().min(1).max(2000).optional().default(500),
  severity: z.string().optional(),
  source: z.string().optional(),
  platform: z.string().optional(),
  provider: z.string().optional(),
  model: z.string().optional(),
});

export type MonitoringFilter = z.infer<typeof FilterSchema>;

export const fetchAppErrorEvents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => FilterSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    let q = supabase
      .from("app_error_events")
      .select(
        "id, severity, source, message, app_version, platform, context, created_at, driver_id"
      )
      .gte("created_at", data.startDate)
      .lte("created_at", data.endDate)
      .order("created_at", { ascending: false })
      .limit(data.limit);
    if (data.severity) q = q.eq("severity", data.severity);
    if (data.source) q = q.eq("source", data.source);
    if (data.platform) q = q.eq("platform", data.platform);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { rows: rows ?? [] };
  });

export const fetchAICostEvents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => FilterSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    let q = supabase
      .from("ai_cost_events")
      .select(
        "id, provider, model, operation, prompt_tokens, completion_tokens, total_tokens, cost_usd, latency_ms, status, created_at"
      )
      .gte("created_at", data.startDate)
      .lte("created_at", data.endDate)
      .order("created_at", { ascending: false })
      .limit(data.limit);
    if (data.provider) q = q.eq("provider", data.provider);
    if (data.model) q = q.eq("model", data.model);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { rows: rows ?? [] };
  });

export const fetchMobileDeviceSessions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => FilterSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    let q = supabase
      .from("mobile_device_sessions")
      .select(
        "id, driver_id, platform, os_version, app_version, device_model, network_type, battery_level, is_charging, started_at, last_seen_at, ended_at"
      )
      .gte("last_seen_at", data.startDate)
      .lte("last_seen_at", data.endDate)
      .order("last_seen_at", { ascending: false })
      .limit(data.limit);
    if (data.platform) q = q.eq("platform", data.platform);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { rows: rows ?? [] };
  });
