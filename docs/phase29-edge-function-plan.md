# Phase 29 — V8 server function / route plan

V8 keeps the TanStack stack contract: app-internal logic ships as
`createServerFn` (under `src/lib/*.functions.ts`), webhooks and externally
triggered jobs ship as TanStack server routes under `src/routes/api/public/*`
with HMAC signature verification. No new Supabase Edge Functions for
app-internal logic.

Names below are logical handler names; each maps to either a server function
or a public route as noted.

## Global scale (server functions, platform-owner gated)
- `calculate-v8-global-scale-score`
- `aggregate-global-operating-network-metrics`
- `calculate-country-operating-health`

## Marketplace (server functions)
- `calculate-international-marketplace-readiness`
- `calculate-regional-marketplace-liquidity`
- `calculate-carrier-country-eligibility`
- `generate-marketplace-expansion-recommendation`

## Financial (server functions, billing/exec gated)
- `calculate-financial-control-maturity`
- `calculate-revenue-reconciliation-maturity`
- `calculate-global-billing-control-score`
- `generate-financial-control-board-summary`

## Compliance (server functions, compliance/admin gated)
- `calculate-advanced-compliance-execution-score`
- `calculate-country-compliance-score`
- `generate-compliance-execution-report`
- `create-compliance-remediation-task`

## Customer / support / partner (server functions)
- `calculate-global-customer-health`
- `calculate-international-support-readiness`
- `calculate-global-partner-operations-health`

## Governance (server functions, executive/platform-owner gated)
- `create-executive-strategic-decision`
- `approve-executive-strategic-decision`
- `generate-board-global-strategy-report`
- `calculate-global-risk-control-score`
- `calculate-regional-expansion-decision`

## Public API routes (`src/routes/api/public/*`, signed)
- `POST /api/public/webhooks/billing-event-v8`        — billing provider events
- `POST /api/public/webhooks/marketplace-partner-v8`  — partner marketplace events
- `POST /api/public/cron/refresh-v8-scale-metrics`    — scheduled scale aggregator
- `POST /api/public/cron/refresh-v8-country-health`   — scheduled country health

## Boundaries
- `requireSupabaseAuth` on every server fn that touches user-scoped data.
- Executive/board endpoints additionally check `is_platform_owner` or
  `has_role(..., 'owner'|'admin')` inside the handler; RLS is the backstop.
- All public routes verify HMAC signatures before processing and never
  return PII.
- Server-fn middleware is the primary gate; RLS keeps cross-tenant data safe
  even if a gate misfires.
