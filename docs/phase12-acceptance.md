# Phase 12 — Acceptance Checklist

Phase 12 is **done** when every item below is checked.

## Build & repo

- [ ] `npm run build` (or `bun run build`) succeeds with no TypeScript errors
- [ ] No unused imports / dead hooks / dead services in the MVP folders
- [ ] Enterprise routes (EDI, Marketplace, SOC2, White-label, Launch, Investor) hidden from MVP nav
- [ ] `src/data/mock*` only imported from demo-mode features

## Data

- [ ] `docs/phase12-schema.sql` applied as a single migration
- [ ] `docs/phase12-rls.sql` applied; every MVP table has RLS enabled
- [ ] `docs/phase12-seed.sql` loads Anderoute Demo Logistics with 3 drivers / 4 vehicles / 2 customers / 5 loads
- [ ] Supabase linter shows no missing RLS warnings on MVP tables

## Pilot workflow

- [ ] Dispatcher can log in and reach `/dashboard`
- [ ] Dispatcher can create a driver, vehicle, customer
- [ ] Dispatcher can create a load with all required fields
- [ ] Dispatcher can offer the load to a driver
- [ ] Driver receives offer in `/driver/load-offer`
- [ ] Driver can accept (creates dispatch_assignment + shipment) or deny (with reason)
- [ ] Driver status buttons advance: en route pickup → arrived → loading → loaded → en route dropoff → arrived → delivered
- [ ] Driver GPS pings update `driver_live_state` and appear on `/map`
- [ ] Customer can log in to `/portal` and see the shipment + tracking + ETA
- [ ] Driver can submit POD placeholder (recipient + notes); shipment marked delivered
- [ ] Every transition writes an `audit_logs` row
- [ ] Alerts auto-create for: gps_stale, driver_delayed, load_offer_denied, pod_missing

## Cross-cutting

- [ ] Every MVP screen has loading + empty + error states
- [ ] PermissionGate hides write actions for drivers and customer_users
- [ ] Cross-company access is blocked (manual QA via `docs/qa/rls-test-cases.md`)
- [ ] Demo mode banner + reset works
- [ ] Pilot smoke test in `docs/qa/pilot-smoke-test.md` passes end-to-end
- [ ] Live status tracker at `/build/phase12-overview` updated to reflect reality
