/**
 * Phase 5 (polished) — Notification → deeplink router.
 *
 * Maps a notification category + payload into an in-app destination. Keeps
 * tap handling in one place so adding a new category is a one-liner.
 */
import type { NotificationCategory } from "../types";

export interface NotificationLike {
  category: NotificationCategory;
  payload?: Record<string, unknown> | null;
  related_load_id?: string | null;
  related_intelligence_id?: string | null;
}

/** Returns a TanStack-router-friendly path. */
export function resolveDeeplink(n: NotificationLike): string {
  const explicit = (n.payload as { deeplink?: string } | null)?.deeplink;
  if (explicit) return explicit;
  switch (n.category) {
    case "load_offer":
      return n.related_load_id ? `/driver/loads/${n.related_load_id}` : "/driver";
    case "dispatch_voice":
      return "/driver/copilot-lab";
    case "route_hazard":
      return "/driver/nav-lab";
    case "eta_arrival":
      return "/driver/navigation";
    case "system":
    default:
      return "/driver";
  }
}
