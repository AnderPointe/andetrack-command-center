/**
 * Phase 2 — Subscribe to route_progress_events for a driver or company.
 */
import { useEffect, useState } from "react";
import { subscribeToTable } from "@/lib/realtime";
import { mockRouteProgressEvents } from "@/data/mockRealtimeEvents";
import type { RouteProgressEvent } from "@/types/realtime";

export function useRouteProgress(
  companyId: string | null,
  driverId?: string | null,
) {
  const [events, setEvents] = useState<RouteProgressEvent[]>(mockRouteProgressEvents);

  useEffect(() => {
    if (!companyId) return;
    const filter = driverId
      ? `driver_id=eq.${driverId}`
      : `company_id=eq.${companyId}`;
    return subscribeToTable<any>({
      channelName: `rpe-${companyId}-${driverId ?? "all"}`,
      table: "route_progress_events",
      event: "INSERT",
      filter,
      onPayload: (p) =>
        setEvents((prev) => [p.new as RouteProgressEvent, ...prev].slice(0, 50)),
    });
  }, [companyId, driverId]);

  return events;
}
