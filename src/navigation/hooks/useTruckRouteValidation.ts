/**
 * Phase 3 — useTruckRouteValidation.
 * Runs a one-shot truck-route validation pass against the active validator.
 */
import { useCallback, useState } from "react";
import { runTruckRouteValidation, persistValidation } from "../services/routeValidationService";
import type { NavigationProviderId } from "../types/navigation";
import type { RouteResult } from "../types/providers";
import type { TruckRouteProfile, TruckRouteValidationResult } from "../types/truckRouting";

export function useTruckRouteValidation(validatorId: NavigationProviderId = "mock") {
  const [result, setResult] = useState<TruckRouteValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    async (
      route: RouteResult,
      profile: TruckRouteProfile,
      ctx?: { company_id: string; driver_id: string; vehicle_id?: string | null; load_id?: string | null },
    ) => {
      setLoading(true);
      setError(null);
      try {
        const v = await runTruckRouteValidation(route, profile, validatorId);
        setResult(v);
        if (ctx) await persistValidation(v, ctx);
        return v;
      } catch (e) {
        setError(String(e));
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [validatorId],
  );

  return { result, loading, error, validate, reset: () => setResult(null) };
}
