# MVP Test Plan

Run against a Supabase environment seeded by `docs/phase12-seed.sql`.

## 1 · Auth
- Sign up new dispatcher → profile + company_user row created
- Sign in → session restored; `/dashboard` reachable
- Sign out → redirected to `/login`; protected routes redirect back

## 2 · Tenant scoping
- Two companies side by side → no cross-company data in any list
- Switching active company updates dashboard, dispatch, loads, drivers, customers

## 3 · Drivers / vehicles / customers
- Create, edit, archive each entity
- Validation: required fields, format rules
- Empty / loading / error states render

## 4 · Load lifecycle
- Create load with all fields
- Offer load → driver receives at `/driver/load-offer`
- Driver accepts → dispatch_assignment + shipment created
- Driver denies → reason captured + alert raised
- Status buttons advance correctly through to delivered
- POD submission marks shipment delivered + completes load

## 5 · GPS
- Mock stream moves marker on `/map` every 5s
- `driver_live_state` row updated
- Stale GPS warning appears after 60s without ping
- Live state card shows speed, heading, ETA, battery, route progress

## 6 · Customer portal
- Customer user sees only their own shipments
- Tracking page reflects the same status as dispatcher map
- POD page shows POD placeholder fields

## 7 · Audit + alerts
- Every workflow transition writes an audit_logs row
- `/audit` table renders the most recent 100 events
- Alerts auto-create for: gps_stale, driver_delayed, load_offer_denied, pod_missing
- Resolving an alert updates `status` + `resolved_at` + `resolved_by`

## 8 · States
- Every screen verified for: loading, empty, error, permission-denied
- No blank screens on slow network (simulate Fast 3G)

## 9 · CoPilot mock
- Suggested commands render
- Each command returns a sensible rule-based response

## 10 · Demo mode
- Banner visible
- ResetDemoButton restores all seeded data in < 5s
- DemoScenarioRunner advances all three canned scenarios
