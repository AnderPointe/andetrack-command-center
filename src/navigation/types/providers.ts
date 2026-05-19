/**
 * Phase 3 — Navigation provider interface.
 *
 * Every SDK adapter (Mapbox, Google, HERE, Trimble, Mock) implements this.
 * The rest of the app talks to this interface, NEVER to a vendor SDK.
 */
import type {
  GeoPoint,
  NavigationEvent,
  NavigationProviderId,
  NavigationSession,
  RouteStep,
  VoiceInstructionEvent,
} from "./navigation";
import type {
  RouteRequest,
  TruckRouteProfile,
  TruckRouteValidationResult,
} from "./truckRouting";

export interface RouteResult {
  provider: NavigationProviderId;
  polyline?: string | null;
  geometry: Array<[number, number]>;
  steps: RouteStep[];
  total_distance_meters: number;
  total_duration_seconds: number;
  alternatives?: RouteResult[];
}

export interface RouteProgressSnapshot {
  current_step_index: number;
  distance_to_next_turn_m: number;
  remaining_meters: number;
  remaining_seconds: number;
  progress_percentage: number;
  current_instruction?: string | null;
  next_instruction?: string | null;
}

export interface NavigationLocationSample {
  latitude: number;
  longitude: number;
  heading: number;
  speed_mph: number;
  recorded_at: string;
}

export type NavigationEventListener = (event: NavigationEvent) => void;
export type RouteProgressListener = (snapshot: RouteProgressSnapshot) => void;
export type LocationListener = (sample: NavigationLocationSample) => void;
export type VoiceInstructionListener = (event: VoiceInstructionEvent) => void;
export type OffRouteListener = (info: { distance_off_route_m: number }) => void;

export type Unsubscribe = () => void;

export interface NavigationProvider {
  readonly id: NavigationProviderId;
  readonly supportsTruckRouting: boolean;
  readonly supportsVoiceInstructions: boolean;

  initializeNavigation(opts?: { apiKey?: string }): Promise<void>;
  requestRoute(req: RouteRequest): Promise<RouteResult>;
  startNavigation(session: NavigationSession): Promise<void>;
  stopNavigation(): Promise<void>;
  pauseNavigation(): Promise<void>;
  resumeNavigation(): Promise<void>;
  recalculateRoute(req: RouteRequest): Promise<RouteResult>;

  getRouteProgress(): RouteProgressSnapshot | null;
  getCurrentInstruction(): string | null;
  getETA(): number | null;
  getRemainingDistance(): number | null;

  subscribeToNavigationEvents(listener: NavigationEventListener): Unsubscribe;
  subscribeToRouteProgress(listener: RouteProgressListener): Unsubscribe;
  subscribeToLocationUpdates(listener: LocationListener): Unsubscribe;
  subscribeToVoiceInstructions(listener: VoiceInstructionListener): Unsubscribe;
  subscribeToOffRouteEvents(listener: OffRouteListener): Unsubscribe;
  unsubscribeFromNavigationEvents(): void;

  reportOffRoute(at: GeoPoint, distance_off_route_m: number): void;
  destroyNavigation(): Promise<void>;
}

/**
 * Optional capability for adapters that also do truck-safe validation.
 * HERE / Trimble providers implement this; Mapbox/Google may not.
 */
export interface TruckRouteValidator {
  readonly id: NavigationProviderId;
  validateTruckRoute(
    route: RouteResult,
    profile: TruckRouteProfile,
  ): Promise<TruckRouteValidationResult>;
}
