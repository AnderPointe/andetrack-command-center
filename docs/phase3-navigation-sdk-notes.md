# Phase 3 — Anderoute EliteNav Navigation SDK Integration

## Architecture

```
EliteNav UI / CoPilot   ──┐
Dispatcher Live Map     ──┤── @/navigation (provider-agnostic)
Hooks (Phase 3)         ──┘          │
                                     ▼
                     NavigationProvider interface
              ┌────────────┬─────────┴──────────┬──────────────┐
              ▼            ▼                    ▼              ▼
       MockNavigation  Mapbox SDK         Google Nav SDK   (placeholders)
                                                ▼
                                       TruckRouteValidator
                                       ┌────────┴────────┐
                                       ▼                 ▼
                                    HERE v8         Trimble Maps
```

## Files

- `src/navigation/types/` — domain types (NavigationSession, NavigationEvent, TruckRouteProfile, …)
- `src/navigation/providers/` — adapters + registry singleton
- `src/navigation/services/` — `navigationService`, `routeValidationService`, `copilotNavigationBrain`
- `src/navigation/hooks/` — `useNavigationSession`, `useRouteProgressRealtime`, `useTruckRouteValidation`, …
- `src/navigation/components/` — `EliteNavPhase3Panel`, `NavigationSettingsPanel`
- `src/sql/phase3_navigation_schema.sql` — reference schema (apply via migration tool)
- `/driver/nav-lab` — end-to-end demo route exercising the full Phase 3 stack against the mock provider

## Provider wiring checklist

### Mapbox Navigation SDK
1. Install SDK in the mobile shell (iOS pod / Android Gradle dep).
2. Public token → `MAPBOX_PUBLIC_TOKEN`; secret token stays server-side.
3. Replace placeholders in `MapboxNavigationProvider.ts`:
   - Directions API → `requestRoute`
   - `MapboxNavigation.startTripSession` → `startNavigation`
   - RouteProgressObserver / LocationObserver / VoiceInstructionsObserver / OffRouteObserver → push helpers.

### Google Navigation SDK
1. Apply for the SDK (separate from Maps SDK).
2. Restricted key → `GOOGLE_NAV_SDK_KEY` (bundle-ID restricted).
3. Replace placeholders in `GoogleNavigationProvider.ts`:
   - `Navigator.create`, `setDestinations`, `startGuidance`
   - RoadSnappedLocationProvider, RemainingTimeOrDistanceChangedListener, ArrivalListener.

### HERE / Trimble (truck validation)
- `HereTruckRoutingProvider` → HERE Router v8 `transportMode=truck` + `notices=true`, map notices → `RestrictionWarning[]`.
- `TrimbleTruckRoutingProvider` → PC*Miler Routing API with truck vehicle profile + `useHazmatRules`.
- Cache validations by `(origin, destination, profile-hash)` to control cost.

## Safety + security

- Public mobile SDK tokens may be shipped per provider rules; secret/server keys never go to the browser.
- Truck route validation should be proxied through a TanStack server fn so the third-party key never ships to the driver app.
- CoPilot messages are kept ≤ ~12 words; long AI responses are suppressed when `speed_mph > 5`.
- For CDL profiles, **Start navigation** is disabled until `truck_route_validated === true`.

## Phase 4 preview

- Wire CoPilot voice commands ("reroute", "report issue", "find rest area") to the same NavigationProvider events.
- Push notifications (`push_notifications`) for arrival, delay risk, off-route to dispatch.
- Route intelligence layer: weather, HOS clock, fuel optimization across the active session.
