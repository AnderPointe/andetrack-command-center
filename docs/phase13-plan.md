# Phase 13 — Pilot Hardening & First Live Rollout

Phase 12 produced the first working pilot build. Phase 13 takes that build to
real customers, drivers, and dispatchers in a controlled rollout.

## Goals

1. Bug-fix and stabilize the MVP workflow under real-world data
2. Onboard the first pilot company (Anderoute Demo Logistics replacement)
3. Run a supervised 30-day pilot with measured success metrics
4. Convert pilot learnings into the Post-Pilot roadmap (Phase 14)

## Non-goals

- No new feature scope vs Phase 12
- No new integrations (no EDI, marketplace, billing automation, SOC 2 automation)
- No Android Auto / CarPlay / white-label custom domains
- No public marketing launch

## Workstreams

### 1 · MVP test execution (Weeks 1–2)
- Run every case in `src/pilot/data/mockPhase13.ts → TEST_CASES`
- Auth, RLS, load workflow, driver workflow, GPS, customer portal, POD, audit, alerts
- Promote acceptance checklist into CI smoke test (see `docs/qa/pilot-smoke-test.md`)

### 2 · Bug triage (Weeks 1–3)
- P0 = pilot blocker, must be 0 at go-live
- P1 = pilot quality, fix before go-live if possible
- P2 = fix during pilot
- P3 = post-pilot
- Track in pilot_bugs (see `docs/phase13-schema.sql`)

### 3 · RLS & security validation
- Cross-company isolation
- Driver-only access
- Customer-only shipments
- Storage bucket policies on `proof-of-delivery`
- Service role never exposed client-side

### 4 · Pilot company onboarding (Weeks 2–3)
- White-glove company setup wizard
- Real fleet imported via CSV (one-off script, not a feature)
- Training sessions per `docs/mvp/pilot-deployment.md`
- Permission review with pilot admin

### 5 · Training & support
- Dispatcher quick-start (8 modules)
- Driver quick-start (9 modules)
- Customer portal quick-start (5 modules)
- In-app support tickets + L1–L5 escalation policy

### 6 · Live pilot operation (Weeks 3–6)
- Daily standup with pilot dispatcher
- Slack/email channel for pilot issues
- Real GPS via Expo Location (replace mock stream behind a flag)
- On-call rotation for incidents
- Weekly metrics + retro

### 7 · Measurement
Pilot success metrics (also see `PILOT_METRICS_DEFS`):
- Driver app adoption ≥ 80%
- Load lifecycle completion ≥ 95% without manual override
- GPS uptime ≥ 95% during shifts
- POD completion ≥ 95%
- Dispatcher NPS ≥ 7
- ≥ 50 loads processed end-to-end

## Exit criteria for Phase 13
- All 14 acceptance criteria met (`ACCEPTANCE_CRITERIA`)
- Pilot company completes one full operating week with zero P0 incidents
- All five success metrics met for the final two weeks
- Phase 14 backlog drafted from real pilot feedback

## Phase 13 demo flow (mock)

1. Owner opens `/pilot/phase13-overview` — readiness = 74%
2. Three blockers visible (BUG-014, BUG-019, BUG-021)
3. QA runs test suite; failed tests link to bugs
4. Dev marks bugs fixed → QA retests → green
5. Pilot company setup wizard creates 1 company, 2 dispatchers, 8 drivers, 10 vehicles, 2 customers, 5 test loads
6. Production smoke test passes
7. First Live Load Wizard runs end-to-end (create → offer → accept → GPS → POD)
8. Go/No-Go updates to GO
