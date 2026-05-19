/**
 * Phase 5 — Apple Push Notification service (iOS) — PLACEHOLDER.
 *
 * Wiring checklist:
 *   1. iOS shell: enable Push Notifications + Background Modes (remote-notification)
 *      capabilities; ensure aps-environment is set to production for App Store builds.
 *   2. UNUserNotificationCenter.requestAuthorization + registerForRemoteNotifications.
 *      Token arrives in didRegisterForRemoteNotificationsWithDeviceToken — hex-encode.
 *   3. Server send via APNs HTTP/2 provider API
 *      POST https://api.push.apple.com/3/device/{deviceToken}
 *      Auth: provider JWT signed with APNS_AUTH_KEY (.p8), KEY_ID, TEAM_ID.
 *      headers: apns-topic = bundle id, apns-priority = 10 (urgent) or 5.
 *   4. 410 Unregistered → revoke driver_push_tokens row; BadDeviceToken → drop.
 */
import type {
  NotificationDeliveryResult, NotificationPayload, PermissionStatus,
  PushNotificationProvider, PushTokenRegistration,
} from "../types";

export class ApnsPushProvider implements PushNotificationProvider {
  readonly id = "apns" as const;
  readonly supportsForegroundPresentation = true;
  readonly supportsBackgroundDelivery = true;

  getPermission(): PermissionStatus { return "unknown"; }
  async requestPermission(): Promise<PermissionStatus> { return "unknown"; }
  async getDeviceToken(): Promise<PushTokenRegistration | null> { return null; }
  async presentLocal(_p: NotificationPayload): Promise<NotificationDeliveryResult> {
    return { status: "failed", provider: "apns", error: "ApnsPushProvider not wired in web runtime" };
  }
}
