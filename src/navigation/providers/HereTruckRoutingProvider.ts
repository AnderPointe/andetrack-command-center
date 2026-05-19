/**
 * Phase 3 — HERE Truck Routing adapter (PLACEHOLDER).
 *
 * Wiring checklist:
 *   1. HERE API key → HERE_API_KEY (server-side preferred; rate-limit + sign).
 *   2. Endpoint: https://router.hereapi.com/v8/routes
 *      Parameters of interest:
 *        - transportMode=truck
 *        - vehicle[height], vehicle[width], vehicle[length], vehicle[grossWeight]
 *        - vehicle[shippedHazardousGoods]
 *        - vehicle[tunnelCategory]
 *        - return=polyline,actions,instructions,turnByTurnActions
 *        - notices=true   ← used to populate RestrictionWarning[]
 *   3. Map HERE `notices` → RestrictionWarning[]:
 *        violatedBlockedRoad → no_truck_zone
 *        violatedTruckRestriction → low_clearance / weight_restriction
 *        violatedDangerousGoods → hazmat_prohibited
 *   4. Cache validations per (origin, destination, profile-hash) to control cost.
 */
import { TruckRoutingProvider } from "./TruckRoutingProvider";

export class HereTruckRoutingProvider extends TruckRoutingProvider {
  readonly id = "here" as const;
  // TODO: override validateTruckRoute() to call HERE Router v8 + map notices.
}
