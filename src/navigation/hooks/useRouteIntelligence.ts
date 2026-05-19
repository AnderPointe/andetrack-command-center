/**
 * Phase 4 — useRouteIntelligence.
 *
 * Periodically calls the copilotRouteIntelligence server fn with the current
 * trip snapshot and returns AI-generated insights for the driver UI +
 * dispatcher panel.
 */
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  copilotRouteIntelligence,
  type RouteIntelligenceInsight,
} from "../services/copilot.functions";

interface Snapshot {
  destination?: string;
  remaining_minutes: number;
  remaining_miles: number;
  vehicle_profile?: {
    is_cdl?: boolean;
    height_ft?: number;
    weight_lbs?: number;
    hazmat?: boolean;
  };
  conditions?: {
    weather?: string;
    traffic?: "free" | "light" | "moderate" | "heavy" | "severe";
    hours_until_break_required?: number;
    fuel_level_pct?: number;
  };
}

export function useRouteIntelligence(
  snapshot: Snapshot | null,
  opts: { autoRefreshMs?: number } = {},
) {
  const fetchIntel = useServerFn(copilotRouteIntelligence);
  const [insights, setInsights] = useState<RouteIntelligenceInsight[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!snapshot) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchIntel({ data: snapshot });
      setInsights(res.insights);
      setSummary(res.summary);
      setLastFetchedAt(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch intelligence");
    } finally {
      setLoading(false);
    }
  }, [fetchIntel, snapshot]);

  useEffect(() => {
    if (!snapshot || !opts.autoRefreshMs) return;
    const id = setInterval(refresh, opts.autoRefreshMs);
    return () => clearInterval(id);
  }, [snapshot, opts.autoRefreshMs, refresh]);

  return { insights, summary, loading, error, refresh, lastFetchedAt };
}
