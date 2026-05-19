/**
 * Phase 2 — Subscribe to driver_status_events for a company.
 */
import { useEffect, useState } from "react";
import { subscribeToTable } from "@/lib/realtime";
import type { DriverStatusEvent } from "@/types/status";

export function useDriverStatusSync(companyId: string | null, limit = 50) {
  const [events, setEvents] = useState<DriverStatusEvent[]>([]);

  useEffect(() => {
    if (!companyId) return;
    return subscribeToTable<any>({
      channelName: `dse-${companyId}`,
      table: "driver_status_events",
      event: "INSERT",
      filter: `company_id=eq.${companyId}`,
      onPayload: (p) =>
        setEvents((prev) => [p.new as DriverStatusEvent, ...prev].slice(0, limit)),
    });
  }, [companyId, limit]);

  return events;
}
