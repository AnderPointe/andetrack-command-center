/**
 * Phase 5 — Push notification types.
 *
 * Provider-agnostic interface. Mock + WebPush ship today; Expo / FCM / APNs
 * are placeholders mirroring the Phase 3 navigation SDK architecture.
 *
 * No raw device tokens are logged client-side; only metadata + Supabase row IDs.
 */

export type PushProviderId = "mock" | "webpush" | "expo" | "fcm" | "apns";

export type NotificationCategory =
  | "load_offer"
  | "dispatch_voice"
  | "route_hazard"
  | "eta_arrival"
  | "system";

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export type NotificationStatus =
  | "queued"
  | "sent"
  | "delivered"
  | "failed"
  | "opened";

export type DevicePlatform = "ios" | "android" | "web" | "unknown";

export interface PushTokenRegistration {
  provider: PushProviderId;
  token: string;
  platform: DevicePlatform;
  device_id?: string | null;
  device_model?: string | null;
  app_version?: string | null;
  locale?: string | null;
}

export interface NotificationPayload {
  driver_id: string;
  company_id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  body: string;
  /** Arbitrary deep-link / domain context (load_id, intelligence_id, etc). */
  payload?: Record<string, unknown>;
  related_load_id?: string | null;
  related_intelligence_id?: string | null;
}

export interface NotificationDeliveryResult {
  status: NotificationStatus;
  provider: PushProviderId;
  error?: string | null;
  /** Provider message id (FCM message id, APNs apns-id, Expo ticket id). */
  provider_message_id?: string | null;
}

export type PermissionStatus = "unknown" | "prompt" | "granted" | "denied";

export interface PushNotificationProvider {
  readonly id: PushProviderId;
  readonly supportsForegroundPresentation: boolean;
  readonly supportsBackgroundDelivery: boolean;

  /** Request OS / browser permission. Idempotent. */
  requestPermission(): Promise<PermissionStatus>;
  getPermission(): PermissionStatus;

  /**
   * Acquire a device token from the provider. Returns null when permission
   * is denied or the provider is unavailable in this runtime.
   */
  getDeviceToken(): Promise<PushTokenRegistration | null>;

  /**
   * Present a notification locally. On native this hands off to the OS push
   * service; on web this uses the Notification API or service worker.
   *
   * IMPORTANT: server-side fan-out to many drivers happens in a serverFn
   * using the provider's push endpoint. This client method is for local
   * presentation / preview.
   */
  presentLocal(payload: NotificationPayload): Promise<NotificationDeliveryResult>;
}
