/**
 * Phase 5 — Web Push (PUSH API + Service Worker) provider — PLACEHOLDER.
 *
 * Wiring checklist when going live:
 *   1. Generate VAPID keys (web-push library) and store:
 *        - VITE_WEBPUSH_PUBLIC_KEY  (safe to ship)
 *        - WEBPUSH_PRIVATE_KEY      (server-only secret)
 *   2. Register a service worker (e.g. /sw.js) that handles 'push' + 'notificationclick'.
 *   3. Subscribe: registration.pushManager.subscribe({ userVisibleOnly: true,
 *        applicationServerKey: urlBase64ToUint8Array(VITE_WEBPUSH_PUBLIC_KEY) })
 *   4. Persist subscription.endpoint + keys.p256dh + keys.auth in driver_push_tokens.
 *   5. Server send via createServerFn using web-push library — never from client.
 *   6. Map subscription.endpoint → token, p256dh+auth packed as JSON in token string.
 *
 * Today this stub falls back to MockPushProvider behavior so the lab still works.
 */
import type {
  NotificationDeliveryResult,
  NotificationPayload,
  PermissionStatus,
  PushNotificationProvider,
  PushTokenRegistration,
} from "../types";
import { MockPushProvider } from "./MockPushProvider";

export class WebPushProvider implements PushNotificationProvider {
  readonly id = "webpush" as const;
  readonly supportsForegroundPresentation = true;
  readonly supportsBackgroundDelivery = true;

  private fallback = new MockPushProvider();

  getPermission(): PermissionStatus {
    return this.fallback.getPermission();
  }

  async requestPermission(): Promise<PermissionStatus> {
    return this.fallback.requestPermission();
  }

  async getDeviceToken(): Promise<PushTokenRegistration | null> {
    // TODO: real subscription flow (see header). For now we mark provider=webpush
    // but reuse the mock token so dispatchers see the right provider label.
    const tok = await this.fallback.getDeviceToken();
    return tok ? { ...tok, provider: "webpush" } : null;
  }

  async presentLocal(payload: NotificationPayload): Promise<NotificationDeliveryResult> {
    const res = await this.fallback.presentLocal(payload);
    return { ...res, provider: "webpush" };
  }
}
