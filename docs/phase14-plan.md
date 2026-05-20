# Phase 14 — Post-Pilot V1 & Commercial Launch Readiness

Phase 13 runs the first live pilot. Phase 14 converts pilot validation into a
repeatable V1 release and a small number of paying customers.

## Goals

1. Stabilize the platform for multi-pilot operation (2–5 companies in parallel)
2. Productize pilot learnings (feedback themes → backlog → release)
3. Add the smallest set of features needed to commercialize
4. Establish a reliability + support baseline

## Non-goals

- No EDI, no marketplace, no full AI prediction, no SOC 2 automation
- No Android Auto / CarPlay
- No white-label custom domains
- No full billing automation (manual invoicing is fine)

## Handoff from Phase 13 (entry criteria)

Phase 14 does not start until Phase 13 hands over a clean signed-off
package. Required artifacts:

1. **Pilot launch gate = GO** at `/pilot/phase13-overview` (composite
   `computePilotGate` returns `ready: true`).
2. **Open P0 bugs = 0** and **gate tests passing 100%**.
3. **RLS validation** at `/pilot/rls` shows 0 FAIL, 0 PENDING.
4. **First live load wizard** at `/pilot/first-live-load` completed end-to-end
   without manual override.
5. **Pilot acceptance** at `/pilot/acceptance` — all `gate: true` criteria met.
6. **Daily + weekly reviews** running for ≥ 2 consecutive weeks.
7. **Pilot feedback themes** clustered with sentiment + role tags
   (`/pilot/feedback`) — feeds the Phase 14 backlog.
8. **Rollback plan approved** and rehearsed at least once.
9. **Support escalation L1–L5** documented and tested.
10. **Pilot metrics baseline** captured at `/pilot/metrics` so Phase 14
    can compare against a real number, not a target string.

If any item is missing, stay in Phase 13 polish — do not open Phase 14 work.

## Workstreams

1. **Pilot retro → backlog** — convert `pilot_feedback`, bug trends, and NPS
   into a ranked Phase 14 backlog.
2. **Reliability** — SLOs for GPS uptime, realtime latency, login success;
   on-call rotation; error budget.
3. **Onboarding self-serve (lite)** — pilot company setup wizard becomes a
   guided checklist any CS rep can run in < 1 hour.
4. **Pricing + contracts** — convert pilots to paid (≥ 60% target). Use
   Phase 10 pricing tiers as the starting offer.
5. **Reporting** — dispatcher weekly digest + customer monthly summary
   (email placeholders → real send via Lovable AI Gateway-aware templates).
6. **Marketing site** — promote `launch/marketing` content to a public site
   when GA criteria are met.

## Exit criteria

- 2–5 active customers running real freight on the platform
- 99% uptime over 30 rolling days
- ≥ 60% pilot → paid conversion
- < 5 P0 bugs in the trailing month
- Phase 15 plan drafted (scale + first enterprise features)
