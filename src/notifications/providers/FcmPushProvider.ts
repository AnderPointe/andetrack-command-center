/**
 * Phase 5 — Firebase Cloud Messaging (Android) — PLACEHOLDER.
 *
 * Wiring checklist:
 *   1. Android shell: google-services.json + com.google.firebase:firebase-messaging.
 *   2. Acquire token via FirebaseMessaging.getInstance().getToken().
 *   3. Background handler: a Service extending FirebaseMessagingService.
 *   4. Server send via FCM HTTP v1 API
 *      POST https://fcm.googleapis.com/v1/projects/{project}/messages:send
 *      Auth: OAuth2 access token derived from a service account
 *      (store FIREBASE_SERVICE_ACCOUNT_JSON server-side; never bundle it).
 *   5. Map UNREGISTERED / INVALID_ARGUMENT responses → revoke driver_push_tokens row.
 */
import type {
  NotificationDeliveryResult, NotificationPayload, PermissionStatus,
  PushNotificationProvider, PushTokenRegistration,
} from "../types";

export class FcmPushProvider implements PushNotificationProvider {
  readonly id = "fcm" as const;
  readonly supportsForegroundPresentation = true;
  readonly supportsBackgroundDelivery = true;

  getPermission(): PermissionStatus { return "unknown"; }
  async requestPermission(): Promise<PermissionStatus> { return "unknown"; }
  async getDeviceToken(): Promise<PushTokenRegistration | null> { return null; }
  async presentLocal(_p: NotificationPayload): Promise<NotificationDeliveryResult> {
    return { status: "failed", provider: "fcm", error: "FcmPushProvider not wired in web runtime" };
  }
}
