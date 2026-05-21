# Phase 26 — Server boundary plan

On this stack, app-internal logic is written as TanStack `createServerFn`
handlers, not Supabase Edge Functions. External webhooks and cron jobs are
served from server routes under `src/routes/api/public/*` with signature
verification. The list below is the V6.5 logic surface, mapped to the
appropriate boundary.

## TanStack `createServerFn` (internal)

Operating system
- `calculate-platform-operating-health`
- `calculate-v65-strategic-operating-score`
- `generate-operating-action-plan`

Financial controls
- `calculate-financial-control-score`
- `validate-billing-control-event`
- `reconcile-revenue-events-placeholder`
- `generate-financial-control-report`

Global expansion
- `calculate-country-readiness-score`
- `generate-global-expansion-risk-report`
- `validate-internationalization-coverage`

Partner marketplace
- `calculate-partner-marketplace-health`
- `calculate-partner-revenue-share-placeholder`
- `approve-partner-product-listing`

Governance
- `create-executive-decision-request`
- `approve-executive-decision`
- `generate-governance-report`

Investment
- `calculate-product-line-investment-score`
- `generate-investment-recommendation`
- `create-roadmap-investment-decision`

Controls
- `calculate-risk-control-score`
- `request-audit-evidence`
- `calculate-compliance-control-score`
- `validate-marketplace-control-rule`

All handlers above:
- Use `requireSupabaseAuth` middleware to scope reads by `company_id` /
  `is_platform_owner(auth.uid())` consistent with the RLS examples.
- Return plain DTOs (no raw `Response`, SDK clients, or streams).
- Read secrets via `process.env.*` only inside `.handler()`.

## Server routes under `/api/public/*` (external)

- Stripe / billing webhooks → `src/routes/api/public/webhooks/stripe.ts`
- Partner billing webhooks    → `src/routes/api/public/webhooks/partner-billing.ts`
- Cron triggers for evidence freshness checks
  → `src/routes/api/public/cron/evidence-refresh.ts`

Each route verifies HMAC signatures or shared secrets before processing and
uses `supabaseAdmin` (service role) for writes — never exposed to the client.

## Posture
- No new Supabase Edge Functions are introduced for app-internal logic.
- No autonomous dispatch handlers.
- All financial / certification / global compliance outputs are clearly
  marked as placeholders unless backed by tracked audit evidence.
