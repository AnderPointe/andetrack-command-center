/**
 * Phase 5 — Expo Push provider — PLACEHOLDER (native build only).
 *
 * Wiring checklist for the Expo / EAS shell:
 *   1. Install expo-notifications + expo-device. Configure
 *      app.json -> expo.notifications.icon / color, plus iOS aps-environment
 *      and android.useNextNotificationsApi=true.
 *   2. iOS: APNs key (.p8) uploaded in EAS credentials.
 *      Android: FCM v1 service account JSON uploaded in EAS credentials.
 *   3. Acquire token:
 *        const { status } = await Notifications.requestPermissionsAsync();
 *        const { data: token } = await Notifications.getExpoPushTokenAsync({
 *          projectId: Constants.expoConfig.extra.eas.projectId,
 *        });
 *      Persist `ExponentPushToken[...]` in driver_push_tokens (provider=expo).
 *   4. Background handlers: Notifications.setNotificationHandler({...}) and
 *      addNotificationResponseReceivedListener for deep-links.
 *   5. Server send via createServerFn POSTing batches (<=100) to
 *      https://exp.host/--/api/v2/push/send with the expo push tickets flow.
 *      Receipts must be polled to detect DeviceNotRegistered → revoke token.
 *
 * Web preview cannot exercise this provider — it returns null/unsupported.
 */
import type {
  NotificationDeliveryResult,
  NotificationPayload,
  PermissionStatus,
  PushNotificationProvider,
  PushTokenRegistration,
} from "../types";

export class ExpoPushProvider implements PushNotificationProvider {
  readonly id = "expo" as const;
  readonly supportsForegroundPresentation = true;
  readonly supportsBackgroundDelivery = true;

  getPermission(): PermissionStatus { return "unknown"; }
  async requestPermission(): Promise<PermissionStatus> { return "unknown"; }
  async getDeviceToken(): Promise<PushTokenRegistration | null> { return null; }
  async presentLocal(_p: NotificationPayload): Promise<NotificationDeliveryResult> {
    return { status: "failed", provider: "expo", error: "ExpoPushProvider not wired in web runtime" };
  }
}
