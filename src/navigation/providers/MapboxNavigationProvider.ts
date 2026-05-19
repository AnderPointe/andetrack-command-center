/**
 * Phase 3 — Mapbox Navigation SDK adapter (PLACEHOLDER).
 *
 * Wiring checklist when going live:
 *   1. Add Mapbox Navigation SDK to the mobile shell (Expo plugin or native).
 *      - iOS:   pod 'MapboxNavigation'
 *      - Android: implementation "com.mapbox.navigationcore:android:*"
 *   2. Public access token → MAPBOX_PUBLIC_TOKEN (safe to ship to client).
 *      Server-side enrichment uses MAPBOX_SECRET_TOKEN (never bundled).
 *   3. Replace the placeholder methods below with:
 *        - MapboxDirections / Directions API for requestRoute()
 *        - MapboxNavigation.startTripSession() for startNavigation()
 *        - RouteProgressObserver → pushProgress()
 *        - LocationObserver → pushLocation()
 *        - VoiceInstructionsObserver → pushVoice()
 *        - OffRouteObserver → reportOffRoute()
 *        - RerouteController → recalculateRoute()
 *   4. Traffic-aware routing: directions-traffic-v5 profile.
 *   5. Route alternatives: alternatives=true on the Directions request.
 */
import { BaseNavigationProvider } from "./NavigationProvider";
import type { NavigationSession } from "../types/navigation";
import type { RouteResult } from "../types/providers";
import type { RouteRequest } from "../types/truckRouting";

export class MapboxNavigationProvider extends BaseNavigationProvider {
  readonly id = "mapbox" as const;
  readonly supportsTruckRouting = false; // pair with TruckRoutingProvider
  readonly supportsVoiceInstructions = true;

  private accessToken: string | null = null;

  async initializeNavigation(opts?: { apiKey?: string }): Promise<void> {
    this.accessToken = opts?.apiKey ?? null;
    // TODO: MapboxNavigationProvider.create() / SDK init
  }

  async requestRoute(_req: RouteRequest): Promise<RouteResult> {
    // TODO: call https://api.mapbox.com/directions/v5/mapbox/driving-traffic/...
    throw new Error(
      "MapboxNavigationProvider.requestRoute is not yet wired. Use MockNavigationProvider in dev.",
    );
  }

  async startNavigation(_session: NavigationSession): Promise<void> {
    // TODO: MapboxNavigation.startTripSession() + attach observers
    throw new Error("MapboxNavigationProvider.startNavigation not yet wired.");
  }

  async stopNavigation(): Promise<void> {
    // TODO: MapboxNavigation.stopTripSession()
  }

  async recalculateRoute(req: RouteRequest): Promise<RouteResult> {
    return this.requestRoute(req);
  }
}
