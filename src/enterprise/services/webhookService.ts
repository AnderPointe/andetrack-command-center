/** Phase 7 — Webhook dispatch placeholder.
 *  Real production: move dispatcher into a TanStack server function or worker.
 */
import type { WebhookEvent } from "../types";

export interface WebhookPayload {
  event: WebhookEvent;
  occurred_at: string;
  data: Record<string, unknown>;
  delivery_id: string;
}

export function buildWebhookSignature(secret: string, body: string, timestamp: number): string {
  // Mock — production uses HMAC-SHA256
  const buf = `${timestamp}.${body}.${secret}`;
  let hash = 0;
  for (let i = 0; i < buf.length; i++) hash = (hash * 31 + buf.charCodeAt(i)) | 0;
  return `t=${timestamp},v1=${Math.abs(hash).toString(16).padStart(8, "0")}`;
}

export function buildPayload(event: WebhookEvent, data: Record<string, unknown>): WebhookPayload {
  return {
    event,
    occurred_at: new Date().toISOString(),
    data,
    delivery_id: `whd_${Math.random().toString(36).slice(2, 10)}`,
  };
}

export const RETRY_BACKOFF_SECONDS = [0, 30, 120, 600, 3600];
