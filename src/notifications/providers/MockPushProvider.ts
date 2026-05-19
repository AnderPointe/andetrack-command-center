/**
 * Phase 5 — Mock push provider.
 *
 * Always available, even on SSR. Uses the browser Notification API when the
 * user has granted permission; otherwise just logs to console. Use this in
 * Lovable preview and in unit tests.
 */
import type {
  NotificationDeliveryResult,
  NotificationPayload,
  PermissionStatus,
  PushNotificationProvider,
  PushTokenRegistration,
} from "../types";

export class MockPushProvider implements PushNotificationProvider {
  readonly id = "mock" as const;
  readonly supportsForegroundPresentation = true;
  readonly supportsBackgroundDelivery = false;

  getPermission(): PermissionStatus {
    if (typeof window === "undefined" || typeof Notification === "undefined") return "unknown";
    switch (Notification.permission) {
      case "granted": return "granted";
      case "denied":  return "denied";
      default:        return "prompt";
    }
  }

  async requestPermission(): Promise<PermissionStatus> {
    if (typeof window === "undefined" || typeof Notification === "undefined") return "unknown";
    if (Notification.permission === "granted") return "granted";
    if (Notification.permission === "denied")  return "denied";
    try {
      const res = await Notification.requestPermission();
      return res === "granted" ? "granted" : res === "denied" ? "denied" : "prompt";
    } catch {
      return "prompt";
    }
  }

  async getDeviceToken(): Promise<PushTokenRegistration | null> {
    // Mock tokens are stable per browser to mimic real device token reuse.
    if (typeof localStorage === "undefined") return null;
    const KEY = "anderoute.push.mock_token.v1";
    let token = localStorage.getItem(KEY);
    if (!token) {
      token = `mock_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem(KEY, token);
    }
    return {
      provider: "mock",
      token,
      platform: "web",
      device_model: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 120) : null,
      locale: typeof navigator !== "undefined" ? navigator.language : null,
    };
  }

  async presentLocal(payload: NotificationPayload): Promise<NotificationDeliveryResult> {
    const perm = this.getPermission();
    if (perm === "granted" && typeof Notification !== "undefined") {
      try {
        const n = new Notification(payload.title, {
          body: payload.body,
          tag: `${payload.category}:${payload.related_load_id ?? payload.related_intelligence_id ?? "system"}`,
          data: payload.payload,
        });
        n.onclick = () => window.focus();
        return { status: "delivered", provider: "mock" };
      } catch (e) {
        return { status: "failed", provider: "mock", error: (e as Error).message };
      }
    }
    // No permission: surface in console so the preview still demonstrates the flow.
    // eslint-disable-next-line no-console
    console.info("[MockPush]", payload.priority, payload.title, "—", payload.body);
    return { status: "sent", provider: "mock" };
  }
}
