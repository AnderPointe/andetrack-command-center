/**
 * Phase 3 polish — useCoPilotNavigationStream.
 *
 * Subscribes to the active provider's NavigationEvent stream, runs each event
 * through the CoPilot brain, dedupes identical messages within a 6 s window,
 * and exposes the resulting driver-safe message log.
 */
import { useEffect, useRef, useState } from "react";
import { getNavigationProvider } from "../providers/registry";
import { generateDriverSafeMessage, notifyDispatchIfNeeded, type CoPilotMessage } from "../services/copilotNavigationBrain";
import type { NavigationProviderId } from "../types/navigation";

const DEDUPE_WINDOW_MS = 6_000;

export function useCoPilotNavigationStream(
  providerId: NavigationProviderId,
  opts: { enabled?: boolean; limit?: number } = {},
): CoPilotMessage[] {
  const { enabled = true, limit = 12 } = opts;
  const [log, setLog] = useState<CoPilotMessage[]>([]);
  const lastByText = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!enabled) return;
    const p = getNavigationProvider(providerId);
    return p.subscribeToNavigationEvents((evt) => {
      const msg = generateDriverSafeMessage(evt);
      if (!msg) return;

      const now = Date.now();
      const lastAt = lastByText.current.get(msg.text);
      if (lastAt && now - lastAt < DEDUPE_WINDOW_MS) return;
      lastByText.current.set(msg.text, now);

      setLog((prev) => [msg, ...prev].slice(0, limit));
      void notifyDispatchIfNeeded(msg);
    });
  }, [providerId, enabled, limit]);

  return log;
}
