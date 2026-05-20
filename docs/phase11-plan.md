# Phase 11 — MVP Cutline, Sprint Plan, Pilot Launch

Goal: take the full Anderoute enterprise vision (Phases 1–10) and reduce it
into a practical, buildable MVP that can be launched with a first pilot
customer — without losing the long-term roadmap.

## Cutline
- **Build now**: core dispatch, driver app, live GPS, customer portal,
  POD placeholder, notifications, audit log, basic reports, RLS.
- **Mock for demo**: CoPilot rules-based assistant, alerts panel, support
  ticketing placeholder, email digests.
- **Defer**: EDI, API marketplace, billing automation, real turn-by-turn
  SDK, Android Auto, CarPlay, full optimization/rate engines, SOC 2
  automation, SSO/SAML.

## Priorities
- P0 — pilot blocker (login, RLS, load workflow, GPS, customer tracking).
- P1 — pilot quality (CoPilot mock, ETA, alerts, reports, audit viewer).
- P2 — useful but ships after pilot starts.
- P3 — future enhancement (EDI, CarPlay, advanced AI).

## Roles in MVP
Platform owner, company admin, dispatcher, driver, customer user.
Deferred: mechanic, billing admin, dispatcher manager, platform support,
customer admin, viewer, executive-only user.

## Sprints (2-week)
0. Foundation — repo, design system, Supabase, auth, RLS baseline.
1. Core data & admin — companies, users, drivers, vehicles, customers.
2. Load management — create, board, detail, assignment, status flow.
3. Driver app MVP — login, permissions, offer flow, status.
4. Live GPS & map — uploader, live state, dispatcher map, stale alert.
5. Customer portal & POD — tracking, POD placeholder, completion.
6. Notifications, alerts, audit — push, rules, audit, basic reports.
7. Pilot hardening — QA, RLS tests, perf, demo mode, docs, onboarding.

## Pilot profile
1 logistics company · 1–3 dispatchers · 5–15 drivers · 5–20 vehicles ·
1–3 customer portal users · 25–100 loads · 30 days (extendable).

## Success criteria
≥ 80% driver adoption, ≥ 90% status accuracy, ≥ 90% GPS reliability,
fewer customer status calls, POD captured, zero cross-company leaks,
zero critical security issues.

## Phase 12 plan
Move from planning to actual MVP coding:
1. Repository cleanup (remove deferred-feature placeholders from MVP UI).
2. Tighten types and unify status enums.
3. Execute Supabase MVP migration.
4. Wire core flows (load, GPS, POD) to real tables.
5. Stand up staging and pilot prod environments.
6. Seed pilot company + run end-to-end smoke.
7. Onboard first pilot customer.
