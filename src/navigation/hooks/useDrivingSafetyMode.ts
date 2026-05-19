/**
 * Phase 3 polish — useDrivingSafetyMode.
 *
 * Watches the active provider's location stream and derives whether the
 * vehicle is in motion. EliteNav uses this to:
 *   - hide complex controls above 5 mph
 *   - shorten CoPilot messages above 15 mph
 *   - suppress animations above 25 mph
 *
 * Falls back to "parked" when no location samples are available.
 */
import { useEffect, useRef, useState } from "react";
import { getNavigationProvider } from "../providers/registry";
import type { NavigationProviderId } from "../types/navigation";

export type DrivingSafetyMode = "parked" | "low_speed" | "driving" | "highway";

export interface DrivingSafetyState {
  mode: DrivingSafetyMode;
  speed_mph: number;
  is_moving: boolean;
  suppress_animations: boolean;
  shorten_messages: boolean;
  hide_complex_controls: boolean;
  last_sample_at: string | null;
}

const INITIAL: DrivingSafetyState = {
  mode: "parked",
  speed_mph: 0,
  is_moving: false,
  suppress_animations: false,
  shorten_messages: false,
  hide_complex_controls: false,
  last_sample_at: null,
};

function deriveMode(speed_mph: number): DrivingSafetyMode {
  if (speed_mph < 2) return "parked";
  if (speed_mph < 15) return "low_speed";
  if (speed_mph < 45) return "driving";
  return "highway";
}

export function useDrivingSafetyMode(providerId: NavigationProviderId): DrivingSafetyState {
  const [state, setState] = useState<DrivingSafetyState>(INITIAL);
  const lastEmit = useRef(0);

  useEffect(() => {
    const p = getNavigationProvider(providerId);
    return p.subscribeToLocationUpdates((s) => {
      // Throttle to 500 ms so the UI doesn't thrash on every GPS tick.
      const now = Date.now();
      if (now - lastEmit.current < 500) return;
      lastEmit.current = now;

      const mode = deriveMode(s.speed_mph);
      setState({
        mode,
        speed_mph: Math.round(s.speed_mph),
        is_moving: mode !== "parked",
        suppress_animations: mode === "highway",
        shorten_messages: mode === "driving" || mode === "highway",
        hide_complex_controls: mode !== "parked",
        last_sample_at: s.recorded_at,
      });
    });
  }, [providerId]);

  return state;
}
