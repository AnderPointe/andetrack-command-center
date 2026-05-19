/**
 * Phase 3 — CDL / truck routing types.
 */
import type { GeoPoint, NavigationProviderId } from "./navigation";

export type RouteProfile =
  | "standard_vehicle"
  | "cargo_van"
  | "box_truck"
  | "hotshot"
  | "cdl_freight"
  | "flatbed"
  | "reefer"
  | "dry_van"
  | "power_only"
  | "step_deck"
  | "personal_vehicle";

/** Profiles that MUST go through truck-route validation before nav starts. */
export const CDL_REQUIRED_PROFILES: RouteProfile[] = [
  "cdl_freight",
  "flatbed",
  "reefer",
  "dry_van",
  "power_only",
  "step_deck",
];

export type HazmatClass =
  | "none"
  | "1_explosives"
  | "2_gases"
  | "3_flammable_liquids"
  | "4_flammable_solids"
  | "5_oxidizers"
  | "6_toxic"
  | "7_radioactive"
  | "8_corrosive"
  | "9_misc";

export type TunnelRestrictionCode = "none" | "B" | "C" | "D" | "E";

export interface TruckRouteProfile {
  vehicle_type: RouteProfile;
  requires_cdl: boolean;
  height_inches: number;
  width_inches: number;
  length_inches: number;
  gross_weight_lbs: number;
  axle_count: number;
  trailer_count: number;
  hazmat_enabled: boolean;
  hazmat_class: HazmatClass;
  tunnel_restriction_code: TunnelRestrictionCode;
  kingpin_to_rear_axle_inches?: number | null;
  trailer_type?: string | null;
  preferred_truck_routes: boolean;
  avoid_low_clearance: boolean;
  avoid_weight_restricted_roads: boolean;
  avoid_hazmat_restricted_roads: boolean;
  avoid_tight_turns: boolean;
  avoid_residential_roads: boolean;
  allow_toll_roads: boolean;
}

export type RestrictionType =
  | "low_clearance"
  | "weight_restriction"
  | "width_restriction"
  | "length_restriction"
  | "hazmat_prohibited"
  | "tunnel_restriction"
  | "no_truck_zone"
  | "residential_restriction"
  | "tight_turn"
  | "axle_restriction";

export type WarningSeverity = "info" | "warning" | "critical";

export interface RestrictionWarning {
  type: RestrictionType;
  severity: WarningSeverity;
  message: string;
  road_name?: string | null;
  distance_from_origin_m?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  recommended_action?: string | null;
}

export interface TruckRouteValidationResult {
  is_valid: boolean;
  provider: NavigationProviderId;
  route_safety_score: number; // 0..100
  warnings: RestrictionWarning[];
  restrictions: RestrictionWarning[];
  low_clearance_detected: boolean;
  weight_restriction_detected: boolean;
  hazmat_restriction_detected: boolean;
  restricted_road_detected: boolean;
  alternative_route_available: boolean;
  recommended_action?: string | null;
  validated_at: string;
}

export interface RouteRequest {
  company_id: string;
  driver_id: string;
  vehicle_id?: string | null;
  load_id?: string | null;
  shipment_id?: string | null;
  origin: GeoPoint;
  destination: GeoPoint;
  waypoints?: GeoPoint[];
  route_profile: RouteProfile;
  vehicle_profile?: TruckRouteProfile | null;
  avoid_tolls?: boolean;
  avoid_highways?: boolean;
  avoid_ferries?: boolean;
  traffic_enabled?: boolean;
  alternatives_enabled?: boolean;
  truck_routing_enabled?: boolean;
  hazmat_enabled?: boolean;
  requested_provider?: NavigationProviderId;
}
