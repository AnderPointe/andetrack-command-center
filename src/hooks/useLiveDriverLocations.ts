import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subscribeToTable } from "@/lib/realtime";

export type DriverLocationStatus =
  | "driving"
  | "idle"
  | "loading"
  | "unloading"
  | "break"
  | "offline";

export interface DriverLocationRow {
  driver_id: string;
  company_id: string;
  unit_number: string | null;
  vehicle_type: string | null;
  status: DriverLocationStatus;
  latitude: number;
  longitude: number;
  heading: number | null;
  speed_mph: number | null;
  eta_minutes: number | null;
  current_load_number: string | null;
  last_ping_at: string;
}

/**
 * Subscribes to `driver_locations` for a company and returns the latest row
 * per driver. Realtime payloads patch the in-memory map without re-fetching.
 */
export function useLiveDriverLocations({ companyId }: { companyId: string | null }) {
  const [byDriverId, setByDriverId] = useState<Record<string, DriverLocationRow>>({});

  useEffect(() => {
    if (!companyId) {
      setByDriverId({});
      return;
    }
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("driver_locations" as any)
        .select("*")
        .eq("company_id", companyId);
      if (error || cancelled) return;
      const next: Record<string, DriverLocationRow> = {};
      for (const row of ((data ?? []) as unknown) as DriverLocationRow[]) {
        next[row.driver_id] = row;
      }
      setByDriverId(next);
    })();

    const unsub = subscribeToTable<DriverLocationRow>({
      channelName: `driver-locations-${companyId}`,
      table: "driver_locations",
      filter: `company_id=eq.${companyId}`,
      onPayload: (p) => {
        const row = (p.new ?? p.old) as DriverLocationRow | undefined;
        if (!row?.driver_id) return;
        setByDriverId((prev) => {
          if (p.eventType === "DELETE") {
            const next = { ...prev };
            delete next[row.driver_id];
            return next;
          }
          return { ...prev, [row.driver_id]: row };
        });
      },
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [companyId]);

  return Object.values(byDriverId);
}
