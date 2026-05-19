/**
 * Phase 4 — Offline command queue.
 *
 * Buffers Supabase inserts when the browser is offline and flushes them
 * back in order once `navigator.onLine` returns true. Persisted to
 * localStorage so a tab reload / app restart doesn't lose driver commands.
 *
 * Privacy: only structured metadata is stored (transcript text + intent).
 * No raw audio is ever queued or persisted.
 */
import { supabase } from "@/integrations/supabase/client";

type QueuedTable =
  | "voice_command_events"
  | "dispatch_voice_messages"
  | "driver_status_events"
  | "notification_events"
  | "in_vehicle_sessions";

interface QueuedInsert {
  id: string;
  table: QueuedTable;
  row: Record<string, unknown>;
  queued_at: string;
}

const KEY = "anderoute.voice.offline_queue.v1";

function read(): QueuedInsert[] {
  if (typeof localStorage === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}
function write(items: QueuedInsert[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items.slice(-200)));
}

export function isOnline(): boolean {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}

export async function insertWithQueue(table: QueuedTable, row: Record<string, unknown>) {
  if (!isOnline()) {
    const items = read();
    items.push({ id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, table, row, queued_at: new Date().toISOString() });
    write(items);
    return { queued: true as const };
  }
  // Dynamic table dispatch — Supabase typed client unions trip the inferrer.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from(table) as any).insert(row);
  if (error) {
    const items = read();
    items.push({ id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, table, row, queued_at: new Date().toISOString() });
    write(items);
    return { queued: true as const, error };
  }
  return { queued: false as const };
}

export async function flushQueue(): Promise<{ flushed: number; remaining: number }> {
  if (!isOnline()) return { flushed: 0, remaining: read().length };
  const items = read();
  if (items.length === 0) return { flushed: 0, remaining: 0 };
  let flushed = 0;
  const remaining: QueuedInsert[] = [];
  for (const it of items) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from(it.table) as any).insert(it.row);
    if (error) remaining.push(it);
    else flushed++;
  }
  write(remaining);
  return { flushed, remaining: remaining.length };
}

export function getQueueSize(): number {
  return read().length;
}
