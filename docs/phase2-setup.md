# Anderoute Phase 2 — Live GPS & Realtime Dispatch

## What shipped

**Database (migration applied)**
- New tables: `driver_live_state`, `route_progress_events`, `audit_logs`
- Extended `driver_location_events` (altitude, accuracy, battery, app_state, tracking_mode, driver_status, route_status, eta_minutes, remaining_miles, event_source, …)
- Extended `driver_status_events` (vehicle_id, load_id, previous_status, reason, lat/lng, created_by)
- Extended `alerts` (alert_type, status, acknowledged_at, acknowledged_by)
- New enums: `tracking_mode`, `app_state`, `event_source`, `location_permission_status`, `alert_status`, `audit_event_type`
- RLS: drivers can write only their own rows; dispatchers/admins can read/manage company-wide; audit logs are append-only
- Realtime publication enabled for `driver_live_state`, `driver_status_events`, `driver_location_events`, `eta_updates`, `route_progress_events`, `alerts`, `load_offers`, `dispatch_assignments`

**Types** — `src/types/{location,status,realtime}.ts`

**Mock GPS stream + geo utils** — `src/data/mockGpsStream.ts` (haversine, heading, ETA, progress, smooth interpolation, `start/stopMockLocationStream`, `DEMO_ROUTE_DALLAS_HOUSTON`) and `src/data/mockRealtimeEvents.ts`.

**Services** — `src/services/{locationService,driverStatusService,dispatchRealtimeService,alertService,auditLogService}.ts`

**Hooks** — `src/hooks/{useDriverLiveState,useDriverLocationStream,useDriverStatusSync,useDispatchMapRealtime,useDispatchAlerts,useETAUpdates,useRouteProgress,useMobileLocationTracking,useActiveLoadRealtime}.ts`

**Realtime helper** — `src/lib/realtime.ts` (one-call `subscribeToTable`) + `src/lib/supabaseClient.ts` (re-export).

**UI components** — `src/components/realtime/`:
- `GPSStatusBadge`, `GPSStaleWarning`, `BatteryStatusBadge`, `TrackingModeBadge`
- `LocationPermissionCard`, `LocationPermissionModal`, `DriverPrivacyNotice`
- `DriverLiveMarker` (animated SVG, heading rotation, fresh/stale states)
- `DriverLiveStatePanel`, `DriverSyncIndicator`
- `LiveETAUpdater`, `RouteProgressLiveBar`, `RealtimeEventFeed`

## Wiring guidance (not yet auto-applied to existing screens)

These components are ready to drop into the existing dispatch & EliteNav surfaces:

- `src/routes/dispatch.tsx` / `LiveMapPanel`: call `useDispatchMapRealtime(companyId)`, render `DriverLiveMarker` for each `liveStates[driverId]`, open `DriverLiveStatePanel` in the existing drawer, surface `useDispatchAlerts` in `AlertsPanel`.
- `src/components/navigation/EliteNavScreen.tsx`: surface `DriverSyncIndicator`, `GPSStatusBadge`, `TrackingModeBadge`, `BatteryStatusBadge`, `RouteProgressLiveBar`, `LiveETAUpdater`, `DriverPrivacyNotice`. Replace the local mock tick with `useDriverLocationStream({...})` and forward each event through `recordLocationEvent` + `upsertDriverLiveState` once a real driver_id is wired from auth.
- Trigger `LocationPermissionModal` the first time a driver starts a trip; persist consent on `profiles` (Phase 3).

We intentionally did not rewrite the existing EliteNav screen to avoid blowing scope — Phase 2 ships the architecture and primitives, not a rewrite of the prototype.

## Privacy & security invariants (enforced in code comments + RLS)

1. Never track without explicit consent (`useMobileLocationTracking` requires `consent === true`).
2. Never track logged-out drivers (RLS — driver writes scoped to `auth.uid()`).
3. Never track off-duty drivers unless `activeLoad === true`.
4. Off-duty drivers downgrade to `reduced_frequency`; high accuracy only with `active_load`.
5. Audit log is append-only; reads restricted to `can_manage_company`.
6. Service role key stays server-side; client uses the publishable key.
7. Rate limiting is a caller responsibility today; Phase 3 moves batching to an Edge Function.

## Alert types modeled

`gps_stale`, `driver_stopped_too_long`, `driver_delayed`, `route_deviation`, `speeding`, `battery_low`, `location_permission_disabled`, `off_route`, `delivery_window_at_risk`, `load_accepted_but_gps_inactive`.

## Audit events modeled

`tracking_started`, `tracking_stopped`, `permission_granted`, `permission_denied`, `load_offered`, `load_accepted`, `load_denied`, `status_changed`, `load_assigned`, `alert_resolved`, `pod_submitted`, `login`, `logout`.

---

## Phase 3 plan — Real navigation SDK & trusted server logic

1. **Mapbox Navigation SDK (driver)** — replace mock stream with real turn-by-turn; pipe `onLocationUpdate` into `recordLocationEvent` + `upsertDriverLiveState`; pipe `onProgressUpdate` into `route_progress_events`. Fallback to Google Navigation SDK on Android Auto.
2. **CDL truck-safe routing** — Mapbox `driving` profile with `max_height`, `max_weight`, `max_width`, `axle_load`, hazmat flags pulled from `vehicles`.
3. **Background tracking** — `expo-task-manager` + `Location.startLocationUpdatesAsync` with iOS `allowsBackgroundLocationUpdates`; battery-aware adaptive frequency (5s active load, 60s reduced, 0 off-duty).
4. **Trusted server logic via Edge Functions** — batch + rate-limit location pings, compute `is_gps_stale`/alerts server-side, sign audit log entries, emit push notifications to dispatch.
5. **Push notifications** — wire `push_devices` + `push_notifications` to Expo Push / APNs / FCM via Edge Function.
6. **Geofencing** — auto-emit `arrived_pickup` / `arrived_dropoff` status events when entering load polygons.
7. **Traffic-aware ETA** — Mapbox Matrix or Google Distance Matrix; write to `eta_updates` every 60s on active loads.
8. **Replay & timeline** — historical playback of `driver_location_events` for incident review.
