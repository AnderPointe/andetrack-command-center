
# Anderoute EliteNav — Production Navigation Integration Plan

This plan covers the real navigation stack that replaces the current mocked SVG map. It is split into: (A) routing/navigation providers, (B) Supabase schema additions for realtime telemetry, (C) runtime responsibilities per surface, (D) push + voice + auto/carplay roadmap.

---

## A. Routing & Navigation Providers

We use **two car/general SDKs** and **one CDL truck-routing engine**, fronted by a provider-agnostic interface so we can swap engines per load type.

### 1. Mapbox Navigation SDK (primary consumer / Non-CDL)

- **Mobile (Driver app):** Mapbox Navigation SDK v3 for iOS/Android (native), or `@rnmapbox/maps` + `@mapbox/mapbox-navigation` for React Native. Provides turn-by-turn, lane guidance, voice, off-route reroute, traffic-aware ETA.
- **Web (Dispatcher):** `mapbox-gl-js` + Mapbox Directions API for plan/preview only (no turn-by-turn on web).
- **Backend:** Mapbox Matrix + Directions API for ETA recompute and pre-trip route hydration.
- **Auth:** public token on client (URL-restricted), secret token in server-side `createServerFn` for Matrix/Optimization.
- **Use when:** `load.requires_cdl = false` and no hazmat.

### 2. Google Navigation SDK (fallback + Android Auto path)

- **Mobile:** Google Navigation SDK for Android/iOS (paid tier). Best fit for Android Auto handoff and Google-quality traffic.
- **Web:** Google Maps JS + Routes API (Compute Routes v2) for dispatcher preview.
- **Backend:** Routes API for batch ETA, Distance Matrix for offer dispatch.
- **Use when:** Mapbox unavailable in region, or fleet preference flag `companies.nav_provider = 'google'`.

### 3. HERE / Trimble Maps — CDL truck routing

- **Trimble Maps (preferred for US CDL):** `Trimble.Maps.Truck` routing service with bridge heights, weight/axle limits, hazmat class restrictions, propane/LPG, national network designations.
- **HERE Fleet Telematics (alt):** `HERE Routing v8` with `transportMode=truck` and full truck profile (height, weight, axleLoad, hazardousGoods, trailerCount).
- **Mobile:** Truck SDK returns a polyline + restriction warnings → rendered inside the Mapbox/Google map view (we do not need a second map renderer; we render their geometry on the active basemap).
- **Backend:** Always validate route via truck engine before assigning a CDL load. Persist `route_steps.restrictions[]`.
- **Use when:** `load.requires_cdl = true` OR `load.requires_hazmat = true` OR `vehicle.type IN ('Tractor','Box Truck','Heavy Duty')`.

### Provider abstraction

A `NavProvider` interface in `src/lib/navigation/` with `planRoute`, `recomputeETA`, `subscribeProgress`, `cancel`. Concrete adapters: `MapboxAdapter`, `GoogleAdapter`, `TrimbleAdapter`. Selection is per-load via a small resolver:

```text
resolveProvider(load, vehicle, company):
  if load.requires_cdl or load.requires_hazmat or vehicle.heavy → Trimble (routing) + Mapbox (rendering)
  elif company.nav_provider == 'google' → Google
  else → Mapbox
```

---

## B. Supabase Schema Additions (realtime telemetry)

`driver_location_events`, `routes`, `route_steps`, `proof_of_delivery` already exist. Add the following.

### New tables

```text
route_progress
  id, company_id, route_id, driver_id, load_id,
  current_step_index int,
  traveled_miles numeric, remaining_miles numeric,
  current_lat double, current_lng double, heading numeric, speed numeric,
  on_route boolean, distance_off_route_m numeric,
  recorded_at timestamptz default now()
  -- append-only; realtime publication enabled

eta_updates
  id, company_id, route_id, driver_id, load_id,
  eta_at timestamptz, eta_seconds_remaining int,
  confidence numeric, source text check in ('mapbox','google','trimble','here','manual'),
  reason text check in ('tick','traffic','reroute','stop','manual'),
  recorded_at timestamptz default now()

dispatch_status_sync
  id, company_id, driver_id, load_id,
  channel text check in ('driver_app','dispatch_web','backend','provider'),
  last_seen_at timestamptz, last_event_id uuid,
  connection_state text check in ('online','degraded','offline'),
  updated_at timestamptz

load_status_updates
  id, company_id, load_id, driver_id,
  from_status load_status, to_status load_status,
  source text, lat double, lng double, note text,
  changed_at timestamptz default now()
  -- complements loads.status; gives an auditable trail

voice_assistant_events
  id, company_id, driver_id, load_id,
  kind text check in ('wake','utterance','intent','tts','error','cancel'),
  intent text, transcript text, response text,
  latency_ms int, safety_mode boolean,
  occurred_at timestamptz default now()

push_devices
  id, user_id, driver_id, company_id,
  platform text check in ('ios','android','web'),
  token text unique, app_version text, last_active_at timestamptz

push_notifications
  id, company_id, user_id, driver_id,
  topic text, title text, body text, data jsonb,
  status text check in ('queued','sent','delivered','failed'),
  provider text check in ('fcm','apns','expo','web-push'),
  created_at, sent_at, delivered_at
```

### Realtime publication

```text
ALTER PUBLICATION supabase_realtime ADD TABLE
  driver_location_events, route_progress, eta_updates,
  dispatch_status_sync, load_status_updates,
  voice_assistant_events, proof_of_delivery, loads;
```

### RLS pattern (every table)

- `company read X` → `is_company_member(auth.uid(), company_id)`
- Driver-written tables (`driver_location_events`, `route_progress`, `voice_assistant_events`, `load_status_updates` from driver source) → insert allowed when `driver_id ∈ drivers WHERE user_id = auth.uid()` OR `can_manage_company(...)`.
- `eta_updates`, `dispatch_status_sync`, `push_notifications` → insert by managers or service role only.
- `push_devices` → user owns their row (`user_id = auth.uid()`).

### Write throttling

- Location events: client buffers and POSTs **1 Hz while moving**, **0.1 Hz while idle**, batched every 5 s.
- `route_progress` upsert at most every 3 s; `eta_updates` only on >30 s delta or reroute.
- Use partial indexes on `(driver_id, recorded_at desc)` and a 30-day retention job for `driver_location_events`.

---

## C. Runtime Responsibilities

### Driver mobile app (React Native; or PWA fallback)

- Owns the navigation SDK session (Mapbox/Google/Trimble).
- Subscribes to OS GPS, fuses with SDK location, pushes to Supabase (`driver_location_events`, `route_progress`).
- Renders EliteNav UI (already built) over the SDK MapView.
- Handles voice (wake word + intent), logs to `voice_assistant_events`.
- Triggers Safety Mode (locks complex controls) based on `speed > 5 mph`.
- Captures POD (already shipped) and writes load status transitions.
- Receives push via FCM/APNs.

### Dispatcher web dashboard

- `mapbox-gl-js` (or Google Maps JS) read-only map.
- Subscribes via `supabase.channel()` to `route_progress`, `eta_updates`, `load_status_updates`, `alerts`.
- Issues load offers, confirms PODs, sends manual messages (writes `push_notifications`).
- Never touches the truck SDK directly — reads cached restrictions from `route_steps`.

### Backend (TanStack `createServerFn` + a few `/api/public/*` routes)

- `planRoute({ loadId })` — picks provider, calls Directions/Truck API, persists `routes` + `route_steps`.
- `recomputeETA({ routeId })` — scheduled per active route every 60 s; writes `eta_updates`.
- `dispatchPush({ ... })` — fans out to FCM/APNs/Expo, records in `push_notifications`.
- `/api/public/webhooks/provider-traffic` — HMAC-verified inbound traffic incidents from provider (if subscribed) → fan out alerts.
- `/api/public/cron/eta-tick` — pg_cron or external scheduler hits this; iterates active routes.
- Holds provider secret tokens (`MAPBOX_SECRET_TOKEN`, `GOOGLE_ROUTES_KEY`, `TRIMBLE_API_KEY`, `HERE_API_KEY`, `FCM_SERVER_KEY`, `APNS_KEY_P8`).

### Supabase Realtime

- Single transport for dispatcher ↔ driver state. No custom WebSocket server.
- Channels: `company:{id}:routes`, `company:{id}:drivers`, `driver:{id}:nav`.
- Presence used for `dispatch_status_sync.connection_state`.

### Map / routing provider

- Computes geometry, traffic ETA, lane guidance, voice prompts.
- Truck provider additionally returns: bridge clearances, weight/axle restrictions, HAZMAT permissibility, designated truck networks.

### AI assistant layer (Lovable AI Gateway)

- Model: `google/gemini-2.5-flash` for intent + summarization; `google/gemini-2.5-flash-lite` for low-latency utterance classification; escalate to `openai/gpt-5-mini` for ambiguous dispatch queries.
- Runs in a `createServerFn` (`askCopilot`) called from driver app over a single open Supabase realtime channel for streamed tokens (or SSE through `/api/public/ai/stream` with auth header).
- Tools exposed: `getNextManeuver`, `getETA`, `reportIssue`, `requestBreak`, `reroute(avoid=...)`, `messageDispatcher`. Each tool call is logged to `voice_assistant_events`.
- Safety Mode shortens responses to ≤12 words, disables long readouts.

---

## D. Push, Voice, and Android Auto / CarPlay

### Push notification flow

```text
Server event (load offer / reroute / dispatch msg)
  → insert into push_notifications (status=queued)
  → dispatchPush serverFn:
      lookup push_devices by user_id
      send via FCM (Android), APNs (iOS), Web Push (dispatcher browser)
      update status=sent / delivered / failed
  → mobile app on receive: deep link to /driver/elite-nav or /driver/deliveries
```

Topics: `load.offered`, `load.assigned`, `route.rerouted`, `pod.confirmed`, `alert.safety`, `dispatch.message`.

### Voice assistant

- Wake word handled by mobile SDK (Porcutine / native). On wake, stream mic → STT (Whisper via Lovable AI Gateway or platform STT) → intent classifier → tool call → TTS.
- All steps logged with `latency_ms` for SLO tracking (target wake→TTS < 1.2 s).

### Android Auto & CarPlay (phase 2)

- **Android Auto:** use Google Navigation SDK's built-in AA template, or build a CarAppService with `NavigationTemplate`. Requires Google Nav SDK path — that's why we keep Google as a first-class adapter.
- **CarPlay:** `CPMapTemplate` + `CPNavigationSession`. Mapbox Navigation SDK iOS has first-class CarPlay support — preferred path.
- Provider routing matrix for Auto/CarPlay:
  - iOS CarPlay → Mapbox (Non-CDL) / Trimble-routed polyline rendered on Mapbox (CDL).
  - Android Auto → Google Nav SDK (Non-CDL) / Trimble-routed polyline rendered on Google (CDL).
- Voice + safety mode reused; UI reduces to AA/CP-approved templates only.

---

## Rollout Phases

1. **Schema + realtime** — migrations for the 7 new tables, RLS, publication. Wire dispatcher dashboard to live `route_progress`/`eta_updates`. *(No mobile work yet — driver web simulator pushes events.)*
2. **Provider abstraction + Mapbox web preview** — `NavProvider` interface, Mapbox adapter, dispatcher live map.
3. **Trimble truck routing in backend** — `planRoute` honors CDL flag, persists restrictions, surfaces them in existing CDL card.
4. **Driver mobile shell (React Native)** — Mapbox Nav SDK, telemetry, POD, push.
5. **Google adapter + Android Auto** — second provider, AA template.
6. **CarPlay** — Mapbox CarPlay integration.
7. **Voice assistant GA** — wake word, streaming, tool calls, safety mode hard-locks.

---

## Secrets to add (when we start implementation)

`MAPBOX_PUBLIC_TOKEN` (VITE_), `MAPBOX_SECRET_TOKEN`, `GOOGLE_MAPS_BROWSER_KEY` (VITE_), `GOOGLE_ROUTES_SERVER_KEY`, `TRIMBLE_API_KEY`, `HERE_API_KEY`, `FCM_SERVER_KEY`, `APNS_KEY_P8`, `APNS_KEY_ID`, `APNS_TEAM_ID`, `WEBHOOK_SECRET_PROVIDER_TRAFFIC`.

Nothing is implemented yet — approve this plan and I'll start with Phase 1 (migrations + dispatcher live map wiring).
