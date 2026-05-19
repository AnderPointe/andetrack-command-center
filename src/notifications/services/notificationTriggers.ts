/**
 * Phase 5 — Notification trigger factories.
 *
 * Pure functions that map a domain event (new load offer, dispatch voice
 * message, route hazard, ETA / arrival reminder) into a NotificationPayload.
 * Keeping these pure lets the same factory be reused by:
 *   - Client-side `presentLocal` previews
 *   - Server-side fan-out in createServerFn handlers
 *   - Unit tests
 */
import type { NotificationPayload } from "../types";

interface LoadOfferTrigger {
  driver_id: string;
  company_id: string;
  load_id: string;
  origin_city: string;
  destination_city: string;
  pickup_at?: string | null;
  rate_usd?: number | null;
}

export function loadOfferNotification(t: LoadOfferTrigger): NotificationPayload {
  const rate = t.rate_usd != null ? ` • $${Math.round(t.rate_usd).toLocaleString()}` : "";
  return {
    driver_id: t.driver_id,
    company_id: t.company_id,
    category: "load_offer",
    priority: "high",
    title: `New load offer${rate}`,
    body: `${t.origin_city} → ${t.destination_city}${t.pickup_at ? ` • ${new Date(t.pickup_at).toLocaleString()}` : ""}`,
    payload: { deeplink: `/driver/loads/${t.load_id}`, load_id: t.load_id },
    related_load_id: t.load_id,
  };
}

interface DispatchVoiceTrigger {
  driver_id: string;
  company_id: string;
  message_id: string;
  dispatcher_name?: string | null;
  preview: string;
  priority?: "normal" | "high" | "urgent";
}

export function dispatchVoiceNotification(t: DispatchVoiceTrigger): NotificationPayload {
  return {
    driver_id: t.driver_id,
    company_id: t.company_id,
    category: "dispatch_voice",
    priority: t.priority ?? "high",
    title: `Dispatch${t.dispatcher_name ? ` • ${t.dispatcher_name}` : ""}`,
    body: t.preview.length > 140 ? `${t.preview.slice(0, 137)}…` : t.preview,
    payload: { deeplink: "/driver/copilot-lab", message_id: t.message_id },
  };
}

interface RouteHazardTrigger {
  driver_id: string;
  company_id: string;
  intelligence_id: string;
  hazard_label: string;
  /** "CDL low clearance ahead 12.4 ft" etc. */
  detail: string;
  severity?: "moderate" | "high" | "critical";
}

export function routeHazardNotification(t: RouteHazardTrigger): NotificationPayload {
  const sev = t.severity ?? "high";
  return {
    driver_id: t.driver_id,
    company_id: t.company_id,
    category: "route_hazard",
    priority: sev === "critical" ? "urgent" : "high",
    title: `Route alert: ${t.hazard_label}`,
    body: t.detail,
    payload: { deeplink: "/driver/nav-lab", severity: sev, intelligence_id: t.intelligence_id },
    related_intelligence_id: t.intelligence_id,
  };
}

interface EtaArrivalTrigger {
  driver_id: string;
  company_id: string;
  load_id?: string | null;
  kind: "approaching_pickup" | "approaching_dropoff" | "eta_slipped";
  minutes?: number | null;
  location_label?: string | null;
}

export function etaArrivalNotification(t: EtaArrivalTrigger): NotificationPayload {
  const titles: Record<EtaArrivalTrigger["kind"], string> = {
    approaching_pickup:  "Approaching pickup",
    approaching_dropoff: "Approaching delivery",
    eta_slipped:         "ETA updated",
  };
  const body =
    t.kind === "eta_slipped"
      ? `New ETA is ${t.minutes ?? "—"} min away${t.location_label ? ` from ${t.location_label}` : ""}.`
      : `${t.minutes ?? "—"} min out${t.location_label ? ` — ${t.location_label}` : ""}.`;
  return {
    driver_id: t.driver_id,
    company_id: t.company_id,
    category: "eta_arrival",
    priority: t.kind === "eta_slipped" ? "normal" : "high",
    title: titles[t.kind],
    body,
    payload: { deeplink: "/driver/navigation", kind: t.kind, load_id: t.load_id ?? null },
    related_load_id: t.load_id ?? null,
  };
}
