/**
 * Phase 3 — Navigation barrel. One import path for everything Phase 3.
 *
 *   import {
 *     getNavigationProvider, createNavigationSession, useTruckRouteValidation,
 *     ManeuverIcon, type NavigationSession, type RouteRequest,
 *   } from "@/navigation";
 */
export * from "./types/navigation";
export * from "./types/providers";
export * from "./types/truckRouting";

export { getNavigationProvider, getTruckValidator, resetNavigationProvider, DEFAULT_NAV_SETTINGS } from "./providers/registry";
export type { NavigationProviderSettings } from "./providers/registry";

export { MockNavigationProvider } from "./providers/MockNavigationProvider";
export { MapboxNavigationProvider } from "./providers/MapboxNavigationProvider";
export { GoogleNavigationProvider } from "./providers/GoogleNavigationProvider";
export { TruckRoutingProvider } from "./providers/TruckRoutingProvider";
export { HereTruckRoutingProvider } from "./providers/HereTruckRoutingProvider";
export { TrimbleTruckRoutingProvider } from "./providers/TrimbleTruckRoutingProvider";

export * from "./services/navigationService";
export * from "./services/routeValidationService";
export * from "./services/navigationEventService";
export * as CoPilotBrain from "./services/copilotNavigationBrain";

export * from "./hooks";
export * from "./utils/maneuverIcons";
