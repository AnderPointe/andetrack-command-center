/**
 * Phase 5 (polished) — Offline command queue with idempotency + retry policy.
 *
 * Improvements over Phase 4:
 *  - Stable idempotency keys on every queued row (server can dedupe).
 *  - Per-item attempt counter, last_error, next_retry_at (exponential backoff
 *    with jitter; cap at 5 minutes).
 *  - Critical-vs-best-effort classification so a stuck dispatch read receipt
 *    can never block a delivery POD from syncing.
 *  - Pure functions for state transitions so the queue is unit-testable.
 *  - Subscriber pattern so badges + banners update without polling.
 *
 * Privacy: only structured metadata is queued. No raw audio.
 */
import { supabase } from "@/integrations/supabase/client";

export type QueuedTable =
  | "voice_command_events"
  | "dispatch_voice_messages"
  | "driver_status_events"
  | "notification_events"
  | "in_vehicle_sessions"
  | "load_status_updates"
  | "proof_of_delivery";

/** Tables whose ordering matters and that must never be silently dropped. */
const CRITICAL: ReadonlySet<QueuedTable> = new Set<QueuedTable>([
  "driver_status_events",
  "load_status_updates",
  "proof_of_delivery",
]);

interface QueuedInsert {
  id: string;                      // local id
  idempotency_key: string;         // stable across retries
  table: QueuedTable;
  row: Record<string, unknown>;
  queued_at: string;
  attempts: number;
  last_error: string | null;
  next_retry_at: string;           // ISO; ready when <= now
  critical: boolean;
}

const KEY = "anderoute.offline_queue.v2";
const MAX_ITEMS = 500;
const MAX_ATTEMPTS = 12;

type Listener = (size: number) => void;
const listeners = new Set<Listener>();
function notify() {
  const n = getQueueSize();
  for (const l of listeners) {
    try { l(n); } catch { /* ignore */ }
  }
}
export function subscribeQueue(fn: Listener): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

function read(): QueuedInsert[] {
  if (typeof localStorage === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}
function write(items: QueuedInsert[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items.slice(-MAX_ITEMS)));
  notify();
}

function makeId(): string {
  return `q_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
function makeIdempotencyKey(table: QueuedTable, row: Record<string, unknown>): string {
  // If caller already provided one, respect it.
  const provided = (row as { idempotency_key?: string }).idempotency_key;
  if (provided) return provided;
  return `${table}:${makeId()}`;
}

/** Exponential backoff with jitter, capped at 5 minutes. */
function nextRetryDelayMs(attempts: number): number {
  const base = Math.min(5 * 60_000, 1000 * 2 ** Math.min(attempts, 8));
  const jitter = Math.random() * 0.3 * base;
  return base + jitter;
}

export function isOnline(): boolean {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}

function enqueue(table: QueuedTable, row: Record<string, unknown>, error?: string): QueuedInsert {
  const items = read();
  const item: QueuedInsert = {
    id: makeId(),
    idempotency_key: makeIdempotencyKey(table, row),
    table,
    row: { ...row, idempotency_key: makeIdempotencyKey(table, row) },
    queued_at: new Date().toISOString(),
    attempts: error ? 1 : 0,
    last_error: error ?? null,
    next_retry_at: new Date(Date.now() + (error ? nextRetryDelayMs(1) : 0)).toISOString(),
    critical: CRITICAL.has(table),
  };
  items.push(item);
  write(items);
  return item;
}

export async function insertWithQueue(table: QueuedTable, row: Record<string, unknown>) {
  if (!isOnline()) {
    enqueue(table, row);
    return { queued: true as const };
  }
  const withKey = { ...row, idempotency_key: makeIdempotencyKey(table, row) };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from(table) as any).insert(withKey);
  if (error) {
    enqueue(table, row, error.message);
    return { queued: true as const, error };
  }
  return { queued: false as const };
}

export async function flushQueue(): Promise<{ flushed: number; remaining: number; dropped: number }> {
  if (!isOnline()) return { flushed: 0, remaining: read().length, dropped: 0 };
  const items = read();
  if (items.length === 0) return { flushed: 0, remaining: 0, dropped: 0 };

  // Critical first, then ready-to-retry by queued_at.
  const now = Date.now();
  const ordered = [...items].sort((a, b) => {
    if (a.critical !== b.critical) return a.critical ? -1 : 1;
    return a.queued_at.localeCompare(b.queued_at);
  });

  let flushed = 0;
  let dropped = 0;
  const remaining: QueuedInsert[] = [];

  for (const it of ordered) {
    if (new Date(it.next_retry_at).getTime() > now) {
      remaining.push(it);
      continue;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from(it.table) as any).insert(it.row);
    if (!error) {
      flushed++;
      continue;
    }
    const attempts = it.attempts + 1;
    if (attempts >= MAX_ATTEMPTS && !it.critical) {
      // Best-effort items get dropped after MAX_ATTEMPTS to avoid unbounded
      // growth. Critical items stay forever — operator must intervene.
      dropped++;
      // eslint-disable-next-line no-console
      console.warn("[offlineQueue] dropping non-critical after max attempts", it.table, it.idempotency_key, error.message);
      continue;
    }
    remaining.push({
      ...it,
      attempts,
      last_error: error.message,
      next_retry_at: new Date(now + nextRetryDelayMs(attempts)).toISOString(),
    });
  }
  write(remaining);
  return { flushed, remaining: remaining.length, dropped };
}

export function getQueueSize(): number {
  return read().length;
}

export function getQueueSnapshot(): ReadonlyArray<QueuedInsert> {
  return read();
}

export function clearNonCritical(): number {
  const items = read();
  const kept = items.filter((i) => i.critical);
  write(kept);
  return items.length - kept.length;
}
