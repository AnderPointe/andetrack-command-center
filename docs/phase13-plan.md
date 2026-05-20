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
- No new integrations (no EDI, marketplace, billing automation)
- No public marketing launch

## Workstreams

### 1 · Bug-fix sprint (Weeks 1–2)
- Sweep every screen against `docs/qa/mvp-test-plan.md`
- Resolve every P0/P1 issue from QA
- Promote acceptance checklist to a CI smoke test
- Tag a `v0.1.0-pilot` release

### 2 · Pilot onboarding (Weeks 2–3)
- White-glove company setup (admin, dispatchers, drivers, vehicles, customers)
- Real fleet imported via CSV (one-off script, not a feature)
- Training sessions per `docs/mvp/pilot-deployment.md`
- Permission review with pilot admin

### 3 · Live pilot operation (Weeks 3–6)
- Daily standup with pilot dispatcher
- Slack/email channel for pilot issues
- Real GPS via Expo Location (replace mock stream behind a flag)
- On-call rotation for incidents
- Weekly metrics review

### 4 · Measurement
Pilot success metrics (lifted from Phase 11):
- Driver app adoption ≥ 80%
- Load lifecycle completion rate ≥ 95% without manual override
- GPS uptime ≥ 95% during shifts
- Dispatcher NPS ≥ 7
- ≥ 50 loads processed end-to-end through the platform

### 5 · Retro + Phase 14 input
- 30-day retro with pilot company
- Triage backlog: bugs → next sprint, feature requests → Phase 14 backlog
- Decide cutover from mock providers to production (push, AI, navigation SDK)

## Exit criteria for Phase 13
- Pilot company completes one full operating week with zero P0 incidents
- All five success metrics met for the final two weeks
- Phase 14 backlog drafted from real pilot feedback
