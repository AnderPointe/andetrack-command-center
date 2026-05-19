/**
 * Phase 2 — Subscribe to `driver_live_state` for a company.
 *
 * This hook ONLY owns the Supabase subscription + the in-memory map.
 * Staleness re-evaluation lives in `useGpsStaleClock` so the two concerns
 * stay independently testable and replaceable.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subscribeToTable } from "@/lib/realtime";
import type { DriverLiveState } from "@/types/location";
import { useGpsStaleClock } from "./useGpsStaleClock";

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

  return useGpsStaleClock(byDriverId);
}
