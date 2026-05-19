/**
 * Phase 3 — Hooks for binding React components to the active
 * NavigationProvider singleton. Pure subscriptions; never mount an SDK.
 */
import { useEffect, useRef, useState } from "react";
import { getNavigationProvider } from "../providers/registry";
import { recordNavigationEvent } from "../services/navigationEventService";
import type {
  NavigationEvent,
  NavigationProviderId,
  NavigationSession,
  VoiceInstructionEvent,
} from "../types/navigation";
import type {
  RouteProgressSnapshot,
} from "../types/providers";

export function useNavigationSession(initial: NavigationSession | null) {
  const [session, setSession] = useState<NavigationSession | null>(initial);
  return { session, setSession };
}

export function useNavigationEvents(providerId: NavigationProviderId, persist = true) {
  const [events, setEvents] = useState<NavigationEvent[]>([]);
  useEffect(() => {
    const p = getNavigationProvider(providerId);
    const unsub = p.subscribeToNavigationEvents((evt) => {
      setEvents((prev) => [evt, ...prev].slice(0, 60));
      if (persist) recordNavigationEvent(evt).catch(() => undefined);
    });
    return unsub;
  }, [providerId, persist]);
  return events;
}

export function useRouteProgressRealtime(providerId: NavigationProviderId) {
  const [snap, setSnap] = useState<RouteProgressSnapshot | null>(null);
  useEffect(() => {
    const p = getNavigationProvider(providerId);
    return p.subscribeToRouteProgress(setSnap);
  }, [providerId]);
  return snap;
}

export function useTurnByTurnInstruction(providerId: NavigationProviderId) {
  const snap = useRouteProgressRealtime(providerId);
  return {
    current: snap?.current_instruction ?? null,
    next: snap?.next_instruction ?? null,
    distance_to_next_m: snap?.distance_to_next_turn_m ?? 0,
  };
}

export function useNavigationETA(providerId: NavigationProviderId) {
  const snap = useRouteProgressRealtime(providerId);
  return {
    eta_minutes: snap ? Math.round(snap.remaining_seconds / 60) : null,
    remaining_meters: snap?.remaining_meters ?? null,
    progress_pct: snap?.progress_percentage ?? 0,
  };
}

export function useOffRouteDetection(providerId: NavigationProviderId) {
  const [offRoute, setOffRoute] = useState<{ at: number; distance_m: number } | null>(null);
  useEffect(() => {
    const p = getNavigationProvider(providerId);
    return p.subscribeToOffRouteEvents(({ distance_off_route_m }) => {
      setOffRoute({ at: Date.now(), distance_m: distance_off_route_m });
    });
  }, [providerId]);
  return offRoute;
}

export function useVoiceInstructionEvents(providerId: NavigationProviderId, limit = 20) {
  const [events, setEvents] = useState<VoiceInstructionEvent[]>([]);
  useEffect(() => {
    const p = getNavigationProvider(providerId);
    return p.subscribeToVoiceInstructions((evt) => {
      setEvents((prev) => [evt, ...prev].slice(0, limit));
    });
  }, [providerId, limit]);
  return events;
}

/** Keep the latest location sample without re-rendering on every tick. */
export function useNavigationLocation(providerId: NavigationProviderId) {
  const ref = useRef<{ latitude: number; longitude: number; heading: number; speed_mph: number } | null>(null);
  const [, force] = useState(0);
  useEffect(() => {
    const p = getNavigationProvider(providerId);
    return p.subscribeToLocationUpdates((s) => {
      ref.current = s;
      force((n) => (n + 1) % 1_000_000);
    });
  }, [providerId]);
  return ref.current;
}
