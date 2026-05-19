/**
 * Phase 3 — Google Navigation SDK adapter (PLACEHOLDER).
 *
 * Wiring checklist when going live:
 *   1. Apply for Google Navigation SDK access (it is NOT general Maps SDK).
 *   2. iOS: GoogleNavigation pod / Android: com.google.android.libraries.navigation.
 *   3. API key → GOOGLE_NAV_SDK_KEY (mobile-only, restricted to app bundle ID).
 *   4. Replace placeholders with:
 *        - Navigator.create() in initializeNavigator()
 *        - navigator.setDestinations([...]) in setDestination()
 *        - navigator.startGuidance() in startGuidance()
 *        - RoadSnappedLocationProvider → pushLocation()
 *        - ArrivalListener → emit('arrived_at_pickup' | 'arrived_at_dropoff')
 *        - RemainingTimeOrDistanceChangedListener → pushProgress()
 *   5. Rerouting: Navigator handles automatically; observe via listener.
 *   6. Voice guidance: navigator.setAudioGuidance(GUIDANCE_VERBOSE).
 */
import { BaseNavigationProvider } from "./NavigationProvider";
import type { NavigationSession } from "../types/navigation";
import type { RouteResult } from "../types/providers";
import type { RouteRequest } from "../types/truckRouting";

export class GoogleNavigationProvider extends BaseNavigationProvider {
  readonly id = "google" as const;
  readonly supportsTruckRouting = false; // Google Nav SDK does not validate truck dims
  readonly supportsVoiceInstructions = true;

  private apiKey: string | null = null;

  async initializeNavigation(opts?: { apiKey?: string }): Promise<void> {
    this.apiKey = opts?.apiKey ?? null;
    // TODO: Navigator.create()
  }

  /** Mapped from GoogleNav initializeNavigator(). */
  async requestRoute(_req: RouteRequest): Promise<RouteResult> {
    throw new Error(
      "GoogleNavigationProvider.requestRoute not yet wired. Use MockNavigationProvider in dev.",
    );
  }

  async startNavigation(_session: NavigationSession): Promise<void> {
    // TODO: navigator.setDestinations(...) + navigator.startGuidance()
    throw new Error("GoogleNavigationProvider.startNavigation not yet wired.");
  }

  async stopNavigation(): Promise<void> {
    // TODO: navigator.stopGuidance() + clearDestinations()
  }

  async recalculateRoute(req: RouteRequest): Promise<RouteResult> {
    return this.requestRoute(req);
  }
}
