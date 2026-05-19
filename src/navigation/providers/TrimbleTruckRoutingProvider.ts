/**
 * Phase 3 — Trimble Maps Truck Routing adapter (PLACEHOLDER).
 *
 * Wiring checklist:
 *   1. Trimble Maps key → TRIMBLE_MAPS_KEY (server-side proxy recommended).
 *   2. Endpoint: PC*Miler Web Services / Trimble Maps Routing API
 *        https://pcmiler.alk.com/apis/rest/v1.0/Service.svc/route
 *      Inputs:
 *        - vehicleType (Auto / LightTruck / HeavyDuty)
 *        - routingType (Practical / Shortest / FastestTruck)
 *        - hazMatType (None / General / Caustic / Explosives / Flammable / Inhalant / Radioactive)
 *        - hubRouting, tollDiscourage, useHazmatRules
 *        - height/width/length/weight/axles
 *   3. Use `reports=Mileage,State,Detail` for distance + restriction breakdown.
 *   4. Map Trimble RestrictionViolation → RestrictionWarning[].
 *   5. Trimble PC*Miler ships truck-specific road network — ideal for CDL freight.
 */
import { TruckRoutingProvider } from "./TruckRoutingProvider";

export class TrimbleTruckRoutingProvider extends TruckRoutingProvider {
  readonly id = "trimble" as const;
  // TODO: override validateTruckRoute() to call Trimble Maps Routing + parse violations.
}
