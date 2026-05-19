/**
 * Phase 2 — Subscribe to driver_live_state for a company.
 * Returns a map keyed by driver_id with the latest known state for each driver.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subscribeToTable } from "@/lib/realtime";
import type { DriverLiveState } from "@/types/location";
import { STALE_GPS_THRESHOLD_SEC } from "@/types/realtime";

export function useDriverLiveState(companyId: string | null) {
  const [byDriverId, setByDriverId] = useState<Record<string, DriverLiveState>>({});

  useEffect(() => {
    if (!companyId) return;
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("driver_live_state")
        .select("*")
        .eq("company_id", companyId);
      if (error || cancelled) return;
      const next: Record<string, DriverLiveState> = {};
      for (const row of (data ?? []) as any[]) next[row.driver_id] = row as DriverLiveState;
      setByDriverId(next);
    })();

    const unsub = subscribeToTable<any>({
      channelName: `dls-${companyId}`,
      table: "driver_live_state",
      filter: `company_id=eq.${companyId}`,
      onPayload: (p) => {
        const row = (p.new ?? p.old) as DriverLiveState | undefined;
        if (!row || !row.driver_id) return;
        setByDriverId((prev) => ({ ...prev, [row.driver_id]: row }));
      },
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [companyId]);

  // Tag stale entries every 15s so the UI can warn.
  useEffect(() => {
    const t = window.setInterval(() => {
      setByDriverId((prev) => {
        const now = Date.now();
        let dirty = false;
        const next: Record<string, DriverLiveState> = { ...prev };
        for (const [id, s] of Object.entries(prev)) {
          const last = s.last_location_at ? Date.parse(s.last_location_at) : 0;
          const stale = !last || (now - last) / 1000 > STALE_GPS_THRESHOLD_SEC;
          if (stale !== s.is_gps_stale) {
            next[id] = { ...s, is_gps_stale: stale };
            dirty = true;
          }
        }
        return dirty ? next : prev;
      });
    }, 15000);
    return () => window.clearInterval(t);
  }, []);

  return byDriverId;
}
