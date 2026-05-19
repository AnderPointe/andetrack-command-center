/**
 * Phase 5 — Realtime notification feed.
 *
 * Subscribes to notification_events for a given driver and exposes the most
 * recent N rows. Optional autoPresent re-presents incoming high-priority
 * notifications via the active push provider (useful when the row was
 * created server-side, e.g. by a dispatcher).
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { NotificationCategory, NotificationPriority, NotificationStatus, PushProviderId } from "../types";
import { getPushProvider } from "../providers/registry";

export interface NotificationEvent {
  id: string;
  driver_id: string;
  company_id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  body: string;
  payload: Record<string, unknown>;
  provider: PushProviderId | null;
  status: NotificationStatus;
  related_load_id: string | null;
  related_intelligence_id: string | null;
  created_at: string;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
}

type Row = Database["public"]["Tables"]["notification_events"]["Row"];

function toEvent(r: Row): NotificationEvent {
  return {
    id: r.id,
    driver_id: r.driver_id,
    company_id: r.company_id,
    category: r.category as NotificationCategory,
    priority: r.priority as NotificationPriority,
    title: r.title,
    body: r.body,
    payload: (r.payload as Record<string, unknown>) ?? {},
    provider: (r.provider as PushProviderId | null) ?? null,
    status: r.status as NotificationStatus,
    related_load_id: r.related_load_id,
    related_intelligence_id: r.related_intelligence_id,
    created_at: r.created_at,
    sent_at: r.sent_at,
    delivered_at: r.delivered_at,
    opened_at: r.opened_at,
  };
}

export function useNotificationCenter(
  driverId: string,
  opts: { limit?: number; autoPresent?: boolean; providerId?: PushProviderId } = {},
) {
  const limit = opts.limit ?? 25;
  const [events, setEvents] = useState<NotificationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    supabase
      .from("notification_events")
      .select("*")
      .eq("driver_id", driverId)
      .order("created_at", { ascending: false })
      .limit(limit)
      .then(({ data }) => {
        if (!alive) return;
        setEvents((data ?? []).map(toEvent));
        setLoading(false);
      });

    const channel = supabase
      .channel(`notif:${driverId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notification_events", filter: `driver_id=eq.${driverId}` },
        (payload) => {
          const evt = toEvent(payload.new as Row);
          setEvents((prev) => [evt, ...prev].slice(0, limit));
          if (opts.autoPresent && (evt.priority === "high" || evt.priority === "urgent")) {
            void getPushProvider(opts.providerId).presentLocal({
              driver_id: evt.driver_id,
              company_id: evt.company_id,
              category: evt.category,
              priority: evt.priority,
              title: evt.title,
              body: evt.body,
              payload: evt.payload,
              related_load_id: evt.related_load_id,
              related_intelligence_id: evt.related_intelligence_id,
            });
          }
        },
      )
      .subscribe();

    return () => {
      alive = false;
      supabase.removeChannel(channel);
    };
  }, [driverId, limit, opts.autoPresent, opts.providerId]);

  async function markOpened(id: string) {
    await supabase
      .from("notification_events")
      .update({ status: "opened", opened_at: new Date().toISOString() })
      .eq("id", id);
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, status: "opened", opened_at: new Date().toISOString() } : e)));
  }

  return { events, loading, markOpened };
}
