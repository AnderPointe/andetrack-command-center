/**
 * Phase 5 — Client notification service.
 *
 * Logs an outbound notification to `notification_events` and presents it
 * through the active push provider. Uses the Phase 4 offline queue so a
 * notification fired while offline still lands in Supabase on reconnect.
 *
 * Server-side fan-out to many drivers (FCM/APNs/Expo batches) belongs in a
 * createServerFn handler — not here. This service handles local presentation
 * + event logging only.
 */
import { insertWithQueue } from "@/navigation/voice/offlineQueue";
import type {
  NotificationDeliveryResult,
  NotificationPayload,
  PushNotificationProvider,
} from "../types";
import { getPushProvider } from "../providers/registry";

export interface SendOptions {
  /** override the provider for this call (otherwise uses registry default). */
  provider?: PushNotificationProvider;
  /** skip Supabase logging — useful for ephemeral previews. */
  skipLog?: boolean;
}

export interface SendResult extends NotificationDeliveryResult {
  /** local id when the row was offline-queued, or the Supabase row id when sent. */
  local_id: string;
}

export async function sendNotification(
  payload: NotificationPayload,
  opts: SendOptions = {},
): Promise<SendResult> {
  const provider = opts.provider ?? getPushProvider();
  const result = await provider.presentLocal(payload);

  const localId = `notif_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  if (!opts.skipLog) {
    await insertWithQueue("notification_events" as never, {
      driver_id: payload.driver_id,
      company_id: payload.company_id,
      category: payload.category,
      priority: payload.priority,
      title: payload.title,
      body: payload.body,
      payload: payload.payload ?? {},
      provider: result.provider,
      status: result.status,
      error: result.error ?? null,
      related_load_id: payload.related_load_id ?? null,
      related_intelligence_id: payload.related_intelligence_id ?? null,
      sent_at: new Date().toISOString(),
      delivered_at: result.status === "delivered" ? new Date().toISOString() : null,
    });
  }
  return { ...result, local_id: localId };
}
