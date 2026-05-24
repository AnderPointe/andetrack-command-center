/**
 * Subscribes to `driver_location_current` for live driver positions via
 * Supabase Realtime postgres_changes. Falls back to an empty map if the
 * table does not exist yet. Keep RLS enabled — only rows the signed-in
 * user is allowed to read will ever arrive.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { LiveDriver } from "@/types/map";

export function useLiveDriverLocations() {
  const [drivers, setDrivers] = useState<Record<string, LiveDriver>>({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("driver_location_current")
          .select("*");
        if (cancelled || error) return;
        const next: Record<string, LiveDriver> = {};
        for (const row of (data ?? []) as LiveDriver[]) {
          if (row?.driver_id) next[row.driver_id] = row;
        }
        setDrivers(next);
      } catch {
        /* table may not exist yet — silent */
      }
    })();

    const channel = supabase
      .channel("driver_location_current_live")
      .on(
        "postgres_changes" as any,
        { event: "*", schema: "public", table: "driver_location_current" },
        (payload: any) => {
          const row = (payload.new ?? payload.old) as LiveDriver | undefined;
          if (!row?.driver_id) return;
          setDrivers((prev) => {
            if (payload.eventType === "DELETE") {
              const n = { ...prev };
              delete n[row.driver_id];
              return n;
            }
            return { ...prev, [row.driver_id]: row };
          });
        },
      )
      .subscribe((status) => setConnected(status === "SUBSCRIBED"));

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return { drivers: Object.values(drivers), connected };
}
