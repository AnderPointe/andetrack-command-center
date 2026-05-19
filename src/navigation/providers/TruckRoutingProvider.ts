/**
 * Phase 3 — Truck Route Validation provider (BASE PLACEHOLDER).
 *
 * Concrete impls live in HereTruckRoutingProvider and TrimbleTruckRoutingProvider.
 * This base validates with a deterministic mock so the EliteNav CDL flow
 * is fully exercisable without keys.
 */
import type { NavigationProviderId } from "../types/navigation";
import type { RouteResult, TruckRouteValidator } from "../types/providers";
import type {
  RestrictionWarning,
  TruckRouteProfile,
  TruckRouteValidationResult,
} from "../types/truckRouting";

export class TruckRoutingProvider implements TruckRouteValidator {
  readonly id: NavigationProviderId = "mock";

  async validateTruckRoute(
    route: RouteResult,
    profile: TruckRouteProfile,
  ): Promise<TruckRouteValidationResult> {
    const warnings: RestrictionWarning[] = [];
    const restrictions: RestrictionWarning[] = [];

    // Mock heuristic: a tall trailer + long highway leg → flag a low bridge.
    if (profile.height_inches >= 162 && route.total_distance_meters > 50_000) {
      warnings.push({
        type: "low_clearance",
        severity: "warning",
        message: `Low clearance risk for ${profile.height_inches}\" height`,
        recommended_action: "Verify clearance on truck-route alternate.",
      });
    }
    if (profile.gross_weight_lbs > 70_000) {
      warnings.push({
        type: "weight_restriction",
        severity: "warning",
        message: `Gross weight ${profile.gross_weight_lbs} lbs may exceed local limits`,
        recommended_action: "Confirm posted axle weights on bridges.",
      });
    }
    if (profile.hazmat_enabled) {
      warnings.push({
        type: "hazmat_prohibited",
        severity: "critical",
        message: "Hazmat load — tunnel and urban restrictions apply",
        recommended_action: "Validate hazmat corridor before departure.",
      });
    }

    const safety =
      100 -
      warnings.reduce(
        (n, w) => n + (w.severity === "critical" ? 25 : w.severity === "warning" ? 10 : 3),
        0,
      );

    return {
      is_valid: warnings.every((w) => w.severity !== "critical"),
      provider: this.id,
      route_safety_score: Math.max(0, Math.min(100, safety)),
      warnings,
      restrictions,
      low_clearance_detected: warnings.some((w) => w.type === "low_clearance"),
      weight_restriction_detected: warnings.some((w) => w.type === "weight_restriction"),
      hazmat_restriction_detected: warnings.some((w) => w.type === "hazmat_prohibited"),
      restricted_road_detected: false,
      alternative_route_available: warnings.length > 0,
      recommended_action: warnings.length
        ? "Review warnings before starting navigation."
        : "Route is approved for vehicle profile.",
      validated_at: new Date().toISOString(),
    };
  }
}
