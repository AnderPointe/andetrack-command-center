/**
 * Phase 2 — Composite dispatch realtime hook for the live map.
 * Wires live state + status + alerts + ETA + location into a single feed.
 */
import { useEffect, useState } from "react";
import { useDriverLiveState } from "./useDriverLiveState";
import { useDispatchAlerts } from "./useDispatchAlerts";
import {
  watchLocationEvents,
  watchStatusEvents,
} from "@/services/dispatchRealtimeService";
import type { DriverLocationEvent } from "@/types/location";
import type { DriverStatusEvent } from "@/types/status";

export function useDispatchMapRealtime(companyId: string | null) {
  const live = useDriverLiveState(companyId);
  const alerts = useDispatchAlerts(companyId);
  const [recentLocation, setRecentLocation] = useState<DriverLocationEvent[]>([]);
  const [recentStatus, setRecentStatus] = useState<DriverStatusEvent[]>([]);

  useEffect(() => {
    if (!companyId) return;
    const unsubLoc = watchLocationEvents(companyId, (row) =>
      setRecentLocation((p) => [row, ...p].slice(0, 50)),
    );
    const unsubSt = watchStatusEvents(companyId, (row) =>
      setRecentStatus((p) => [row, ...p].slice(0, 50)),
    );
    return () => {
      unsubLoc();
      unsubSt();
    };
  }, [companyId]);

  return { liveStates: live, alerts, recentLocation, recentStatus };
}
