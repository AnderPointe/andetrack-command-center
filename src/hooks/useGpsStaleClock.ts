/**
 * Phase 2 — Stale-detection clock for driver_live_state rows.
 *
 * Returns the same map shape as `useDriverLiveState`, but re-evaluates
 * `is_gps_stale` every tick (default 15s). Split from the subscription
 * hook so the WebSocket logic can be replaced without touching staleness.
 */
import { useEffect, useState } from "react";
import type { DriverLiveState } from "@/types/location";
import { STALE_GPS_THRESHOLD_SEC } from "@/types/realtime";

export function useGpsStaleClock(
  byDriverId: Record<string, DriverLiveState>,
  intervalMs = 15_000,
): Record<string, DriverLiveState> {
  const [tagged, setTagged] = useState(byDriverId);

  useEffect(() => {
    const reevaluate = (input: Record<string, DriverLiveState>) => {
      const now = Date.now();
      let dirty = false;
      const next: Record<string, DriverLiveState> = { ...input };
      for (const [id, s] of Object.entries(input)) {
        const last = s.last_location_at ? Date.parse(s.last_location_at) : 0;
        const stale = !last || (now - last) / 1000 > STALE_GPS_THRESHOLD_SEC;
        if (stale !== s.is_gps_stale) {
          next[id] = { ...s, is_gps_stale: stale };
          dirty = true;
        }
      }
      return dirty ? next : input;
    };

    setTagged((prev) => reevaluate(byDriverId === prev ? prev : byDriverId));

    const t = window.setInterval(() => {
      setTagged((prev) => reevaluate(prev));
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [byDriverId, intervalMs]);

  return tagged;
}
