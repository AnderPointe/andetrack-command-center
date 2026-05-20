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
