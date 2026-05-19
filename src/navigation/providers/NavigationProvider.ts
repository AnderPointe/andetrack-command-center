/**
 * Phase 3 — Base NavigationProvider with a shared event-bus implementation.
 * Adapters extend this and only implement the SDK-specific methods.
 */
import type {
  GeoPoint,
  NavigationEvent,
  NavigationEventType,
  NavigationProviderId,
  NavigationSession,
  VoiceInstructionEvent,
} from "../types/navigation";
import type {
  LocationListener,
  NavigationEventListener,
  NavigationLocationSample,
  NavigationProvider,
  OffRouteListener,
  RouteProgressListener,
  RouteProgressSnapshot,
  RouteResult,
  Unsubscribe,
  VoiceInstructionListener,
} from "../types/providers";
import type { RouteRequest } from "../types/truckRouting";

export abstract class BaseNavigationProvider implements NavigationProvider {
  abstract readonly id: NavigationProviderId;
  readonly supportsTruckRouting: boolean = false;
  readonly supportsVoiceInstructions: boolean = true;

  protected session: NavigationSession | null = null;
  protected lastProgress: RouteProgressSnapshot | null = null;
  protected eventListeners = new Set<NavigationEventListener>();
  protected progressListeners = new Set<RouteProgressListener>();
  protected locationListeners = new Set<LocationListener>();
  protected voiceListeners = new Set<VoiceInstructionListener>();
  protected offRouteListeners = new Set<OffRouteListener>();

  abstract initializeNavigation(opts?: { apiKey?: string }): Promise<void>;
  abstract requestRoute(req: RouteRequest): Promise<RouteResult>;
  abstract startNavigation(session: NavigationSession): Promise<void>;
  abstract stopNavigation(): Promise<void>;
  abstract recalculateRoute(req: RouteRequest): Promise<RouteResult>;

  async pauseNavigation(): Promise<void> {
    this.emit("navigation_paused");
  }
  async resumeNavigation(): Promise<void> {
    this.emit("navigation_resumed");
  }

  getRouteProgress(): RouteProgressSnapshot | null {
    return this.lastProgress;
  }
  getCurrentInstruction(): string | null {
    return this.lastProgress?.current_instruction ?? null;
  }
  getETA(): number | null {
    return this.lastProgress ? Math.round(this.lastProgress.remaining_seconds / 60) : null;
  }
  getRemainingDistance(): number | null {
    return this.lastProgress?.remaining_meters ?? null;
  }

  subscribeToNavigationEvents(l: NavigationEventListener): Unsubscribe {
    this.eventListeners.add(l);
    return () => this.eventListeners.delete(l);
  }
  subscribeToRouteProgress(l: RouteProgressListener): Unsubscribe {
    this.progressListeners.add(l);
    return () => this.progressListeners.delete(l);
  }
  subscribeToLocationUpdates(l: LocationListener): Unsubscribe {
    this.locationListeners.add(l);
    return () => this.locationListeners.delete(l);
  }
  subscribeToVoiceInstructions(l: VoiceInstructionListener): Unsubscribe {
    this.voiceListeners.add(l);
    return () => this.voiceListeners.delete(l);
  }
  subscribeToOffRouteEvents(l: OffRouteListener): Unsubscribe {
    this.offRouteListeners.add(l);
    return () => this.offRouteListeners.delete(l);
  }
  unsubscribeFromNavigationEvents(): void {
    this.eventListeners.clear();
    this.progressListeners.clear();
    this.locationListeners.clear();
    this.voiceListeners.clear();
    this.offRouteListeners.clear();
  }

  reportOffRoute(at: GeoPoint, distance_off_route_m: number): void {
    for (const l of this.offRouteListeners) l({ distance_off_route_m });
    this.emit("off_route_detected", {
      latitude: at.latitude,
      longitude: at.longitude,
      metadata: { distance_off_route_m },
    });
  }

  async destroyNavigation(): Promise<void> {
    this.unsubscribeFromNavigationEvents();
    this.session = null;
    this.lastProgress = null;
  }

  protected emit(
    event_type: NavigationEventType,
    extra: Partial<NavigationEvent> = {},
  ): NavigationEvent {
    const evt: NavigationEvent = {
      id: `nav_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      session_id: this.session?.id ?? "no-session",
      company_id: this.session?.company_id ?? "",
      driver_id: this.session?.driver_id ?? "",
      load_id: this.session?.load_id ?? null,
      event_type,
      provider: this.id,
      created_at: new Date().toISOString(),
      ...extra,
    };
    for (const l of this.eventListeners) l(evt);
    return evt;
  }

  protected pushProgress(snap: RouteProgressSnapshot) {
    this.lastProgress = snap;
    for (const l of this.progressListeners) l(snap);
    this.emit("route_progress_updated", {
      current_step_index: snap.current_step_index,
      distance_to_next_turn_m: snap.distance_to_next_turn_m,
      route_progress_percentage: snap.progress_percentage,
      instruction: snap.current_instruction ?? null,
    });
  }

  protected pushLocation(sample: NavigationLocationSample) {
    for (const l of this.locationListeners) l(sample);
  }

  protected pushVoice(evt: VoiceInstructionEvent) {
    for (const l of this.voiceListeners) l(evt);
  }
}
