# Anderoute EliteNav — Phase 3: Real Navigation Integration Plan

Production blueprint for moving from the Phase 2 mock GPS/realtime layer to a real, multi-provider navigation stack with CDL-aware truck routing, dispatcher realtime, voice AI, and embedded automotive (Android Auto / CarPlay).

---

## 0. Architecture at a glance

```
┌──────────────────────┐      ┌─────────────────────────┐      ┌────────────────────────┐
│  Driver Mobile App   │◀────▶│   Backend (TanStack +   │◀────▶│  Dispatcher Web App    │
│  (Expo / RN)         │      │   Server Functions)     │      │  (React + Realtime)    │
│                      │      │                         │      │                        │
│ • Mapbox Nav SDK     │      │ • Auth (Supabase JWT)   │      │ • Live driver map      │
│ • Google Nav SDK     │      │ • Routing orchestrator  │      │ • ETA & status feed    │
│ • HERE/Trimble CDL   │      │ • ETA recalculator      │      │ • Alert console        │
│ • Native GPS         │      │ • Geofence + ETA jobs   │      │ • Audit / POD review   │
│ • CoPilot voice (LLM)│      │ • Push fan-out          │      │                        │
└─────────┬────────────┘      └───────────┬─────────────┘      └────────────┬───────────┘
          │                               │                                 │
          │            Supabase Realtime (Postgres replication + Channels)  │
          └───────────────────────────────┴─────────────────────────────────┘
                                          │
                  ┌───────────────────────┼──────────────────────────┐
                  │                       │                          │
            Mapbox / Google         HERE / Trimble CDL         Lovable AI Gateway
            Navigation SDK          truck-aware routing        (Gemini / GPT for
            (turn-by-turn)          (restrictions, HOS)         voice CoPilot)
```

Each provider has a single responsibility — never duplicate work across layers.

| Layer | Responsibility | Never does |
|---|---|---|
| Driver mobile app | GPS capture, turn-by-turn rendering, voice mic, offline tiles, status buttons | Authoritative ETA, RLS bypass, billing |
| Dispatcher web | Visualize realtime, override status, reassign loads, monitor alerts | Direct device GPS, voice prompts |
| Backend (server fns) | Auth, geofencing, ETA reconciliation, route plan persistence, push fan-out, audit | Render maps, store API keys client-side |
| Supabase realtime | Postgres → client diff stream, presence, broadcast | Heavy compute, joins, business rules |
| Map/routing provider | Routing, traffic, turn-by-turn, ETA seed | Persist driver data, auth |
| AI assistant layer | NLU, intent → action, text-to-speech prompts, context summarization | Drive routing decisions unilaterally; safety-critical actions are confirmed |

---

## 1. Mapbox Navigation SDK integration plan

**Use for:** primary turn-by-turn for Non-CDL drivers + the EliteNav default experience.

### Mobile (Expo / bare RN)
- Package: `@rnmapbox/maps` + `@mapbox/mapbox-navigation` (bare workflow; requires Expo prebuild).
- Tokens: public `MAPBOX_PUBLIC_TOKEN` in app, `MAPBOX_DOWNLOAD_TOKEN` as a build-time secret.
- Components to add:
  - `LiveMapMapbox.tsx` — replaces `MockMap` behind a feature flag (`navProvider === "mapbox"`).
  - `NavigationSessionMapbox.tsx` — wraps `NavigationViewController` / `MapboxNavigation` view, emits `progressChange`, `rerouted`, `arrival`.
- Offline: pre-download tile packs per active route corridor (200 mi buffer).
- Voice: route Mapbox instructions through our CoPilot TTS so wording stays branded.

### Backend
- Server fn `routes.plan` calls Mapbox **Directions API** server-side with `profile=driving-traffic` for Non-CDL, persists polyline + steps into `routes` / `route_steps`.
- Server fn `routes.refresh_eta` re-pings Directions every 60 s while load is `in_transit`, writes to `eta_updates`.
- Webhook `/api/public/mapbox/matrix-callback` (optional) for async Matrix requests.

### Failure modes
- SDK 401 → token expired; refresh via build secret rotation runbook.
- Route mismatch with CDL load → router rejects, falls back to HERE/Trimble (see §3).

---

## 2. Google Navigation SDK integration plan

**Use for:** Android devices in regions where Google traffic data outperforms Mapbox, and as a hot-swap fallback.

### Mobile
- Package: `@googlemaps/react-native-navigation-sdk` (Android + iOS).
- Requires Google Cloud project with Navigation SDK enabled + signed APK SHA-1 allowlist.
- Components:
  - `NavigationSessionGoogle.tsx` mirrors the Mapbox session interface (`onArrival`, `onRemainingTimeOrDistanceChanged`).
- Same `NavProvider` abstraction so swapping providers is a one-line config.

### Backend
- Server fn `routes.plan_google` uses Google **Routes API v2** (`computeRoutes`) with `routingPreference: TRAFFIC_AWARE_OPTIMAL`.
- Store the encoded polyline in `routes.polyline` (text) — same column as Mapbox.

### Cost guardrails
- Cache route plans for 5 min per (origin, dest, vehicle profile) hash.
- Only request live traffic refresh when `driver_live_state.tracking_mode = 'foreground'`.

---

## 3. HERE / Trimble CDL truck-routing integration plan

**Use for:** all `loads.requires_cdl = true` rows, hazmat, oversize, or `vehicle_type IN ('semi','box_truck_cdl')`.

### Provider choice
- **HERE Routing v8** (`transportMode=truck`) — global, strong restriction data, JSON polyline.
- **Trimble Maps Truck Routing** — best US restriction + bridge data, PC*MILER-grade mileage for billing.
- Decision matrix lives in `src/lib/routingProvider.ts`:
  ```ts
  function pickRouter(load, vehicle) {
    if (!load.requires_cdl) return 'mapbox';
    if (load.requires_hazmat || vehicle.heightFt > 13.5) return 'trimble';
    return 'here';
  }
  ```

### Backend
- Server fn `routes.plan_cdl` accepts `{ loadId, vehicleProfile }` (axles, weight, height, length, hazmat class).
- Persists `route.restrictions_violated[]` and renders red CDL warning cards on the driver app + dispatcher map.
- HOS (Hours of Service) hints: include `breaks[]` from provider into `route_steps` so CoPilot can suggest legal rest stops.

### Mobile rendering
- Truck routes render in the same `LiveMap` component — polyline is the same shape; turn-by-turn voice still plays through Mapbox/Google SDK (UI provider) but the **route geometry comes from HERE/Trimble**.

---

## 4. Supabase realtime schema for driver GPS updates

Already provisioned in Phase 2. Confirm publication:

```sql
alter publication supabase_realtime add table public.driver_live_state;
alter publication supabase_realtime add table public.driver_location_events;
alter publication supabase_realtime add table public.route_progress_events;
alter publication supabase_realtime add table public.eta_updates;
alter publication supabase_realtime add table public.dispatch_status_sync;
alter publication supabase_realtime add table public.load_status_updates;
alter publication supabase_realtime add table public.voice_assistant_events;
alter publication supabase_realtime add table public.alerts;
```

Dispatcher subscribes per-company:
```ts
supabase.channel(`co:${companyId}:live`)
  .on('postgres_changes', { event: '*', schema: 'public', table: 'driver_live_state', filter: `company_id=eq.${companyId}` }, handler)
  .subscribe();
```

Driver app subscribes only to its own row + assigned load.

---

## 5. Driver location event table (`driver_location_events`) — usage contract

- **Insert rate:** 1 Hz while driving, 0.1 Hz while idle, 0 Hz while `tracking_mode = 'off'`.
- **Source of truth** for historical playback, replay, audit. **Never queried for live UI** — use `driver_live_state` instead.
- Retention: 90 days online, archive to cold storage via nightly job.
- Indexes: `(company_id, driver_id, recorded_at desc)`, `(load_id, recorded_at)`.
- Insert path: driver app → server fn `location.ingest` (batched up to 20 points) → DB. Never direct insert from client.

---

## 6. Route progress table (`route_progress_events`)

- Written every time the nav SDK fires `onProgressChange` (~1 Hz throttled to 0.2 Hz).
- Fields used: `current_step_index`, `progress_pct`, `traveled_miles`, `remaining_miles`, `on_route`, `distance_off_route_m`.
- Off-route detection: if `distance_off_route_m > 80 m` for 15 s → trigger `routes.replan` + insert `alerts` row (severity `info`).
- Dispatcher UI consumes the latest row per `route_id` via realtime.

---

## 7. ETA update table (`eta_updates`)

- Authoritative ETA stream — **never derive ETA on the dispatcher** from raw lat/lng.
- Written by:
  - `routes.refresh_eta` job (every 60 s, source = `provider`).
  - SDK `onRemainingTime` callback (source = `sdk_callback`, confidence `medium`).
  - Manual dispatcher override (source = `dispatcher_manual`, confidence `low`).
- Customer-facing ETA = latest row where `source IN ('provider','sdk_callback')` ordered by `recorded_at desc`.

---

## 8. Dispatch status sync table (`dispatch_status_sync`)

- Heartbeat row per `(driver_id, channel)`. `connection_state IN ('connected','degraded','reconnecting','offline')`.
- Driver app updates every 15 s via server fn `dispatch.heartbeat`.
- Dispatcher UI surfaces `DispatchSyncIndicator` per driver — red if `last_seen_at > 60 s`.

---

## 9. Load status update table (`load_status_updates`)

- Append-only state-machine log for each `loads.status` transition.
- Driver actions that write here: `arrived_pickup`, `loaded`, `in_transit`, `arrived_dropoff`, `delivered`.
- Server fn `load.transition` validates legal transitions before insert + updates `loads.status`.
- Each transition optionally triggers a push notification (see §11) and a geofence cross check.

---

## 10. Voice assistant event table (`voice_assistant_events`)

- Logs every CoPilot interaction: `kind IN ('wake','transcript','intent','response','error')`.
- Used for: model evaluation, latency SLO, safety review.
- `safety_mode` flag captures whether the device was in driving lockdown — keeps audit clear if CoPilot rejected an unsafe action.
- PII: transcripts can contain customer names → redact via server fn `voice.persist` before insert.

---

## 11. Push notification flow

```
Trigger (status change, ETA slip, alert)
        │
        ▼
Server fn `push.enqueue`  ──▶  Insert into `push_notifications` (status='queued')
        │
        ▼
Cron job /api/public/cron/push-fanout (every 10 s)
        │   ├─ Reads queued rows for last 60 s
        │   ├─ Looks up tokens in `push_devices` (per user_id / driver_id / company_id)
        │   └─ Calls Expo Push API + APNs/FCM as fallback
        ▼
Update status='sent' / 'delivered' / 'failed' + provider receipt
```

Topics:
- `load.offered` → driver
- `load.eta_slipped` → dispatcher + customer
- `driver.off_route` → dispatcher
- `safety.harsh_event` → dispatcher + driver
- `pod.required` → driver

---

## 12. Android Auto & CarPlay future plan

**Phase 3.5 (after SDK integration is stable):**

- **Android Auto:** Build with Mapbox Navigation SDK's Android Auto extension. Implement `CarAppService` exposing:
  - Map screen with route + ETA chip.
  - Action strip: `Report Issue`, `Call Dispatch`, `Mark Arrived`.
  - No free-text entry while in motion (Auto enforces).
- **CarPlay:** Use Mapbox CarPlay templates (`CPMapTemplate`, `CPListTemplate`).
  - Driver picks active load from a list, route auto-starts.
  - Voice CoPilot routed through CarPlay audio session (lower priority than nav voice).
- Both platforms require app store entitlements (Google Automotive + Apple CarPlay capability) — apply early; CarPlay approval is 4–6 weeks.

---

## Cross-cutting concerns

### Auth & RLS
- Every server fn uses `requireSupabaseAuth`. No client writes to `driver_live_state`, `eta_updates`, `load_status_updates` except via server fns.
- Service role only used in cron + webhook routes after signature verification.

### Secrets (request via `add_secret` before wiring)
- `MAPBOX_DOWNLOAD_TOKEN`, `MAPBOX_SECRET_TOKEN`
- `GOOGLE_MAPS_SERVER_KEY`, `GOOGLE_NAV_SDK_KEY`
- `HERE_API_KEY`
- `TRIMBLE_MAPS_KEY`
- `EXPO_ACCESS_TOKEN`, `APNS_KEY`, `FCM_SERVER_KEY`

### Observability
- Every server fn logs `{ companyId, driverId, loadId, provider, latencyMs }`.
- Latency SLOs: route plan p95 < 1.5 s, ETA refresh p95 < 800 ms, push fan-out p95 < 5 s.

### Rollout
1. Ship Mapbox provider behind feature flag `nav.provider=mapbox` to 1 pilot fleet.
2. Add HERE for CDL once non-CDL is stable.
3. Add Google as user-selectable preference.
4. Android Auto / CarPlay after 4 weeks of clean production data.

---

## What changes in the existing Phase 2 code

- Introduce `src/lib/navProvider.ts` — abstract interface `{ planRoute, startSession, stopSession, onProgress, onArrival }`.
- Replace `MockMap` swap-in at `LiveMapPanel` boundary; mock stays for storybook/dev.
- Add `src/lib/routing.functions.ts` server fns: `planRoute`, `refreshEta`, `replan`, `transitionLoad`.
- Add `/api/public/cron/push-fanout` + `/api/public/cron/eta-refresh` server routes (HMAC-signed).
- No schema changes required — Phase 2 migration already covers all 8 tables above.

This plan is implementation-ready. Confirm provider priorities (Mapbox-first vs Google-first, HERE vs Trimble for CDL) and I'll start wiring the `navProvider` abstraction + the first real SDK behind a feature flag.
