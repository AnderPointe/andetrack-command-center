# Phase 11 — Edge / Server Function Plan

On this stack, "Edge Functions" maps to TanStack `createServerFn` for
app-internal logic, plus server routes under `src/routes/api/public/*` for
externally-triggered endpoints. The Phase 11 functions below are planning
APIs — they back the MVP Planning UI and are NOT customer hot path.

## Application server functions (createServerFn)
- `generateMvpCutline()` — return current cutline rows (build/mock/defer).
- `createSprintPlan({ teamSize, startDate })` — produce 8-sprint scaffold.
- `createBacklogItem(input)` — insert into `engineering_backlog_items`.
- `updateSprintStatus({ sprintId, status })` — admin only.
- `generatePilotChecklist({ pilotId })` — derive checklist from template.
- `calculatePilotSuccessScore({ pilotId })` — aggregate metrics → 0–100.
- `submitPilotFeedback({ pilotId, body })` — authed pilot user only.
- `generateRiskReport()` — combine product + pilot risks.
- `generateReleaseReadinessScore()` — % of passing gates.
- `exportMvpRoadmap({ format })` — JSON/CSV/Markdown.
- `exportDemoScript()` — Markdown export of demo steps.
- `exportTrainingPlan({ pilotId })` — per-audience PDF stub.

All read/write functions use `requireSupabaseAuth` and respect RLS.
Platform-owner-only mutations are guarded by `is_platform_owner(auth.uid())`
inside the handler (defence-in-depth on top of RLS).

## Server routes (`src/routes/api/public/*`)
Only when an external system triggers the call:
- `/api/public/pilot-feedback` — pilot survey webhook (signature verified).
- `/api/public/release-gate` — CI posts gate results (HMAC verified).

## Cost guardrails
Planning calls are low-frequency, dispatcher-side. No per-driver scaling.
No AI calls in this phase — Phase 9's AI cost controls still apply to AI
features, not planning artifacts.

## What does NOT belong here
- Anything user-hot-path (loads, GPS, POD) — that's Phase 12 MVP wiring.
- Anything bypassing RLS without an explicit platform-owner check.
- Direct `supabaseAdmin` calls outside trusted server-only files.
