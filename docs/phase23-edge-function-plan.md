# Phase 23 — Server-Side Function Plan (V5)

Anderoute V5 separates **internal app logic** (TanStack `createServerFn`) from **external HTTP callers** (server routes under `/api/public/*` or Supabase Edge Functions for provider-network webhooks).

## TanStack server functions (`createServerFn` + `requireSupabaseAuth`)

Internal, auth-bound logic for the V5 UI. Each is RLS-scoped, audited, and never invoked from public traffic.

### Maturity
- `calculate-v5-maturity-score` — rolls pillar inputs into composite score.
- `generate-maturity-gap-report` — pillar < target diff.
- `generate-maturity-action-plan` — recommended next 90-day actions.

### Marketplace
- `calculate-marketplace-liquidity-score`
- `calculate-supply-demand-balance`
- `calculate-lane-coverage-score`
- `calculate-carrier-quality-tier`
- `generate-marketplace-trust-safety-report`

### Certification
- `calculate-certification-completion`
- `build-soc2-audit-package`
- `generate-certification-risk-report`

### Executive
- `generate-board-report`
- `generate-quarterly-operating-review`
- `generate-executive-summary`

### Revenue / Growth
- `calculate-revenue-maturity`
- `generate-revenue-operations-report`
- `calculate-renewal-risk`
- `calculate-expansion-opportunity`
- `generate-strategic-growth-plan`
- `calculate-partner-ecosystem-health`
- `generate-national-operations-review`

### Data room
- `calculate-data-room-readiness`
- `generate-investor-packet`
- `track-due-diligence-request`

All return plain DTOs and rely on `supabase` from the auth middleware.

## Supabase Edge Functions / `/api/public/*` server routes

Only for **external callers** with their own signature schemes:

- Stripe billing events (revenue ops)
- Samsara / telematics webhooks (operating metrics)
- App Store / Play Store review status webhooks (mobile-related metrics, when wired)
- EDI partner status callbacks
- Cron scheduler hits for nightly aggregations

Each must verify the incoming signature with `timingSafeEqual` before any DB write, and only use `supabaseAdmin` after verification succeeds.

## Hard constraints
- No autonomous dispatch.
- No predictive guarantees in any report.
- AI recommendations require human approval before action (separate approvals queue).
- Certification status reflects evidence only — never a final claim.
