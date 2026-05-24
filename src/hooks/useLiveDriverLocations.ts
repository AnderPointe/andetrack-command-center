import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subscribeToTable } from "@/lib/realtime";
import type { LiveDriver, DriverStatus } from "@/types/map";

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

const STALE_THRESHOLD_SECONDS = 120;

export interface UseLiveDriverLocationsResult {
  drivers: DriverLocationRow[];
  staleDrivers: DriverLocationRow[];
  loading: boolean;
  error: string | null;
  isConnected: boolean;
  refresh: () => Promise<void>;
}

/**
 * Legacy hook — subscribes to `driver_locations` for a company.
 * For the Anderoute US map use `useLiveDriverCurrent` below.
 */
export function useLiveDriverLocations({
  companyId,
}: {
  companyId: string | null;
}): UseLiveDriverLocationsResult {
  const [byDriverId, setByDriverId] = useState<Record<string, DriverLocationRow>>({});
  const [loading, setLoading] = useState<boolean>(Boolean(companyId));
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  const refresh = useCallback(async () => {
    setRefreshTick((t) => t + 1);
  }, []);

  useEffect(() => {
    if (!companyId) {
      setByDriverId({});
      setLoading(false);
      setError(null);
      setIsConnected(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      const { data, error: fetchError } = await supabase
        .from("driver_locations" as any)
        .select("*")
        .eq("company_id", companyId);
      if (cancelled) return;
      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }
      const next: Record<string, DriverLocationRow> = {};
      for (const row of ((data ?? []) as unknown) as DriverLocationRow[]) {
        next[row.driver_id] = row;
      }
      setByDriverId(next);
      setLoading(false);
    })();

    const unsub = subscribeToTable<DriverLocationRow>({
      channelName: `driver-locations-${companyId}-${refreshTick}`,
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
      onStatus: (status) => {
        setIsConnected(status === "SUBSCRIBED");
      },
    });

    return () => {
      cancelled = true;
      setIsConnected(false);
      unsub();
    };
  }, [companyId, refreshTick]);

  const drivers = useMemo(() => Object.values(byDriverId), [byDriverId]);

  const staleDrivers = useMemo(() => {
    const now = Date.now();
    return drivers.filter((row) => {
      const ts = row.last_ping_at ? new Date(row.last_ping_at).getTime() : 0;
      const ageSeconds = (now - ts) / 1000;
      return ageSeconds > STALE_THRESHOLD_SECONDS;
    });
  }, [drivers]);

  return { drivers, staleDrivers, loading, error, isConnected, refresh };
}

/**
 * New hook for the Anderoute US map — subscribes to
 * `driver_location_current` via Supabase Realtime postgres_changes.
 */
export function useLiveDriverCurrent() {
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
        /* table may not exist yet */
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

// Keep DriverStatus re-export for callers
export type { DriverStatus };
