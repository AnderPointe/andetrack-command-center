# Phase 37 — V12 Enterprise Commercial Command (mock-only)

V12 builds the enterprise commercial operating system on top of V11.5 revenue
optimization. Scope covers commercial command, revenue quality governance,
global account expansion, strategic account governance, deal execution
control, commercial risk, expansion/retention, trust-led procurement,
marketplace/API-EDI/partner revenue governance, forecast governance
(placeholder), capital-grade reporting, board-ready revenue, data room
readiness, proof governance, cadence, and the long-term operating model.

## Deferred
- Fully autonomous deal closure / dispatch
- Final certification, audit, IPO, or M&A claims
- Insurance underwriting automation, customs production, AndroidAuto/CarPlay approvals

## Backend boundary
- TanStack `createServerFn` for all internal scoring/report generation (see `src/v12/data/mockPhase37.ts`).
- `/api/public/*` (HMAC-signed) for partner-revenue and marketplace-settlement webhooks.
- Service-role `supabaseAdmin` only inside verified server routes.

## RLS sketch
See `V12_RLS_EXAMPLES` in `mockPhase37.ts`. Highlights:
- `board_revenue_reports_v12` — board/exec role only.
- `commercial_data_room_items` — admin only.
- `commercial_proof_governance_records` — approved status or admin.
- `partner_revenue_governance_records` — billing/dispatcher role within company.
- `marketplace_revenue_governance_records` — MP ops only.

## Edge / serverFn plan
- calculate-v12-commercial-command-score
- calculate-revenue-quality-governance-score
- calculate-global-account-expansion-score
- calculate-strategic-account-governance-score
- calculate-deal-execution-score
- calculate-deal-slippage-risk-v12
- calculate-commercial-risk-control-score
- calculate-expansion-retention-score
- calculate-marketplace-revenue-governance-score
- calculate-api-edi-revenue-governance-score
- calculate-partner-channel-maturity
- calculate-partner-revenue-governance-score
- generate-board-ready-revenue-report
- generate-commercial-proof-governance-report
- calculate-commercial-data-room-readiness
- calculate-commercial-cadence-health
- calculate-commercial-operating-model-maturity

## Phase 38 teaser
V12.5 capital-grade growth operations, commercial auditability, global revenue
intelligence (placeholder), partner channel optimization, executive growth
stewardship.
