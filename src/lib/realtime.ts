/**
 * Phase 2 — Supabase Realtime helpers.
 *
 * Centralizes channel creation so hooks/components don't repeat boilerplate
 * and we have one place to add throttling, batching, and rate-limit guards
 * before the mobile client ships.
 *
 * SECURITY:
 *  - Realtime respects Row Level Security. The browser client only ever
 *    receives rows the signed-in user is already allowed to read.
 *  - We do NOT subscribe to anything from anonymous sessions — every hook
 *    bails early when no session exists.
 */
import { supabase } from "@/integrations/supabase/client";
import type {
  RealtimePostgresChangesPayload,
  RealtimeChannel,
} from "@supabase/supabase-js";

export type ChangeEvent = "INSERT" | "UPDATE" | "DELETE" | "*";

interface SubscribeOptions<T extends { [key: string]: any }> {
  channelName: string;
  table: string;
  event?: ChangeEvent;
  filter?: string;
  schema?: string;
  onPayload: (payload: RealtimePostgresChangesPayload<T>) => void;
}

export function subscribeToTable<T extends { [key: string]: any }>(
  opts: SubscribeOptions<T>,
): () => void {
  let channel: RealtimeChannel | null = null;
  try {
    channel = supabase
      .channel(opts.channelName)
      .on(
        "postgres_changes" as any,
        {
          event: opts.event ?? "*",
          schema: opts.schema ?? "public",
          table: opts.table,
          ...(opts.filter ? { filter: opts.filter } : {}),
        },
        (payload: RealtimePostgresChangesPayload<T>) => opts.onPayload(payload),
      )
      .subscribe();
  } catch (err) {
    console.warn("[realtime] subscribe failed", err);
  }
  return () => {
    if (channel) supabase.removeChannel(channel);
  };
}
