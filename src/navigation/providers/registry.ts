/**
 * Phase 3 — Provider registry. Single source of truth for active adapters.
 *
 * Switching providers (e.g. mock → mapbox) is a config change, not a refactor.
 */
import { GoogleNavigationProvider } from "./GoogleNavigationProvider";
import { HereTruckRoutingProvider } from "./HereTruckRoutingProvider";
import { MapboxNavigationProvider } from "./MapboxNavigationProvider";
import { MockNavigationProvider } from "./MockNavigationProvider";
import { TrimbleTruckRoutingProvider } from "./TrimbleTruckRoutingProvider";
import { TruckRoutingProvider } from "./TruckRoutingProvider";
import type { NavigationProvider, TruckRouteValidator } from "../types/providers";
import type { NavigationProviderId } from "../types/navigation";

export interface NavigationProviderSettings {
  navigation_provider: NavigationProviderId;
  truck_validator: NavigationProviderId;
  mock_mode: boolean;
  cdl_validation_required: boolean;
  enable_voice_instructions: boolean;
  enable_alternatives: boolean;
  enable_traffic: boolean;
  enable_copilot: boolean;
  enable_off_route_alerts: boolean;
  enable_dispatch_monitoring: boolean;
}

export const DEFAULT_NAV_SETTINGS: NavigationProviderSettings = {
  navigation_provider: "mock",
  truck_validator: "mock",
  mock_mode: true,
  cdl_validation_required: true,
  enable_voice_instructions: true,
  enable_alternatives: true,
  enable_traffic: true,
  enable_copilot: true,
  enable_off_route_alerts: true,
  enable_dispatch_monitoring: true,
};

let singletonProvider: NavigationProvider | null = null;
let singletonProviderId: NavigationProviderId | null = null;

export function getNavigationProvider(id: NavigationProviderId): NavigationProvider {
  if (singletonProvider && singletonProviderId === id) return singletonProvider;
  switch (id) {
    case "mapbox": singletonProvider = new MapboxNavigationProvider(); break;
    case "google": singletonProvider = new GoogleNavigationProvider(); break;
    case "mock":
    case "here":
    case "trimble":
    default:        singletonProvider = new MockNavigationProvider(); break;
  }
  singletonProviderId = id;
  return singletonProvider;
}

export function getTruckValidator(id: NavigationProviderId): TruckRouteValidator {
  switch (id) {
    case "here":    return new HereTruckRoutingProvider();
    case "trimble": return new TrimbleTruckRoutingProvider();
    default:        return new TruckRoutingProvider();
  }
}

export function resetNavigationProvider() {
  singletonProvider?.destroyNavigation().catch(() => undefined);
  singletonProvider = null;
  singletonProviderId = null;
}
