# Phase 48 — V17.5 Governed Enterprise Automation Scale

Mock-only scaffold mirroring V16.5 pattern. 25 routes under `/v175/*`, 30 hooks, single mock data module.

## Surfaces
overview, scope, command, board-exec, revenue-opt, mp-gov, strat-intel, exec-oversight, control-maturity, board-evidence, approval-scale, evidence-scale, outcome-learning, rec-quality, risk-ops, capital-auto, account-auto, partner-auto, product-auto, category-auto, audit, board-report, roadmap, reports, demo.

## Server boundary (planned)
- `createServerFn` — approval submit, evidence attach, policy tuning request, board packet finalize, exec decision route.
- `/api/public/*` — HMAC-verified signal ingestion webhooks, cron entry.
- Edge Function — batch scoring, calibration drift, audit aggregation, KPI rollups.
- Client — read-only; never mutates high-impact actions.

## RLS sketches
See `V175_RLS` in `src/v175/data/mockPhase48.ts` — 15 examples covering tenant scoping, exec/board/security gating, customer/carrier/partner exclusion, and `high_impact CHECK (approver_id <> recommender_id)`.

## Hard guardrails
No autonomous dispatch / pricing / billing / marketplace / customer / carrier / compliance / capital / legal / safety-impacting actions. All high-impact business decisions remain HITL.

## Phase 49 (V18) teaser
Autonomous-assist scale governance, predictive operating excellence, board automation maturity, durable revenue intelligence automation, marketplace optimization scale controls — still HITL on all high-impact actions.
