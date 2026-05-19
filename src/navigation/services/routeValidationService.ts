/**
 * Phase 3 — Route validation service. Thin orchestrator around the
 * TruckRouteValidator + Supabase persistence.
 */
import { supabase } from "@/integrations/supabase/client";
import type { RouteResult } from "../types/providers";
import type {
  TruckRouteProfile,
  TruckRouteValidationResult,
} from "../types/truckRouting";
import type { NavigationProviderId } from "../types/navigation";
import { getTruckValidator } from "../providers/registry";

export async function runTruckRouteValidation(
  route: RouteResult,
  profile: TruckRouteProfile,
  validatorId: NavigationProviderId,
): Promise<TruckRouteValidationResult> {
  return getTruckValidator(validatorId).validateTruckRoute(route, profile);
}

export async function persistValidation(
  validation: TruckRouteValidationResult,
  ctx: { company_id: string; driver_id: string; vehicle_id?: string | null; load_id?: string | null },
) {
  try {
    await (supabase as any).from("truck_route_validations").insert({
      company_id: ctx.company_id,
      driver_id: ctx.driver_id,
      vehicle_id: ctx.vehicle_id ?? null,
      load_id: ctx.load_id ?? null,
      provider: validation.provider,
      is_valid: validation.is_valid,
      route_safety_score: validation.route_safety_score,
      low_clearance_detected: validation.low_clearance_detected,
      weight_restriction_detected: validation.weight_restriction_detected,
      hazmat_restriction_detected: validation.hazmat_restriction_detected,
      restricted_road_detected: validation.restricted_road_detected,
      warnings_json: validation.warnings,
      restrictions_json: validation.restrictions,
      validated_at: validation.validated_at,
    });
  } catch {
    /* ignore */
  }
}
