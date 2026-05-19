/**
 * Phase 2 — Drive the mock GPS stream from a driver client.
 * Replace internals with `useMobileLocationTracking` (Expo Location) on RN.
 */
import { useEffect, useRef, useState } from "react";
import {
  startMockLocationStream,
  stopMockLocationStream,
  type MockStreamConfig,
  type MockStreamSample,
} from "@/data/mockGpsStream";
import type { DriverLocationEvent } from "@/types/location";

export function useDriverLocationStream(
  cfg: MockStreamConfig | null,
  opts?: { enabled?: boolean; onEvent?: (e: DriverLocationEvent) => void },
) {
  const [sample, setSample] = useState<MockStreamSample | null>(null);
  const onEventRef = useRef(opts?.onEvent);
  onEventRef.current = opts?.onEvent;

  useEffect(() => {
    if (!cfg || opts?.enabled === false) {
      if (cfg) stopMockLocationStream(cfg.driverId);
      return;
    }
    const stop = startMockLocationStream(cfg, (s, evt) => {
      setSample(s);
      onEventRef.current?.(evt);
    });
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg?.driverId, opts?.enabled]);

  return sample;
}
