# Phase 16 — V1.5 plan

V1.5 moves Anderoute from V1.1 production growth into real navigation provider
implementation, production billing launch, basic webhook integrations, and
smarter rules-based CoPilot. Routes live under `/v15/*`.

## In scope
- Navigation provider abstraction (mock, Mapbox, Google, HERE/Trimble placeholders)
- Route session tracking, route line rendering, ETA sync, reroute placeholder
- Provider health dashboard
- Billing production: Stripe checkout + customer portal sessions, subscription enforcement, usage meters
- Plan limits and feature gates
- Basic integrations + webhook starter (HMAC signed, retry policy)
- CoPilot V1.5 operational rules (still rules-based, smarter context)
- Driver navigation V1.5 UI, dispatcher route visibility, customer portal V1.5
- Paid customer operations, V1.5 reports, V1.5 security review

## Deferred (out of V1.5)
Full turn-by-turn native voice, background native navigation, Android Auto,
CarPlay, full EDI, API marketplace, advanced predictive AI, SOC 2 automation.

## Schema additions
See `docs/phase16-schema.sql`.

## RLS examples
See `docs/phase16-rls.sql`.

## Edge functions
See `docs/phase16-edge-function-plan.md`.

## Phase 17
See `docs/phase17-plan.md` — V2 AI Operations Intelligence, optimization engine,
EDI beta, API marketplace beta, advanced reporting, enterprise controls.
