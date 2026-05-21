# Phase 28 — V7.5 server logic plan

All app-internal V7.5 logic is implemented as TanStack `createServerFn`
handlers (not Supabase Edge Functions). External webhooks live under
`src/routes/api/public/*` server routes with signature verification.

## Server functions (createServerFn)

### Global expansion
- `calculate-v75-execution-readiness-score` — weighted score across 14 categories
- `create-country-launch` — admin/platform owner only
- `calculate-country-launch-readiness` — derive readiness % per country
- `generate-country-go-no-go-recommendation` — rule-based recommendation
- `create-controlled-country-pilot` — initialize 15-step workflow
- `generate-country-pilot-review` — produce pilot review summary

### Regulated onboarding
- `create-regulated-customer-onboarding`
- `generate-regulated-control-pack` — composes 14 sections
- `calculate-regulated-customer-risk`
- `approve-regulated-go-live` — CCO + CISO approval gate

### Financial controls
- `calculate-financial-audit-readiness-v75`
- `reconcile-revenue-events-placeholder` — matching logic only
- `create-revenue-reconciliation-exception`
- `calculate-country-billing-readiness`
- `generate-global-revenue-control-report`

### Partners
- `calculate-international-partner-launch-readiness`
- `approve-international-partner-launch`
- `generate-partner-launch-risk-report`

### Marketplace
- `calculate-global-marketplace-discipline-score`
- `activate-regional-marketplace`
- `calculate-regional-marketplace-readiness`
- `generate-marketplace-exception-report`

### Compliance / support / risk / approvals
- `calculate-data-residency-execution-risk`
- `calculate-global-support-readiness`
- `calculate-global-compliance-control-score`
- `calculate-regional-risk-score`
- `create-global-launch-approval-request`

## Boundaries
- All handlers use `requireSupabaseAuth` middleware.
- Platform-level handlers additionally check `is_platform_owner(auth.uid())`.
- Customer/carrier/partner users cannot invoke launch, residency, financial
  recon, or marketplace control handlers (RLS + handler-level checks).
- Webhooks (Stripe, partner systems) → `src/routes/api/public/*` with HMAC
  signature verification.

## Not in scope
- No autonomous dispatch handler.
- No production customs/tax automation handler.
- No SOC 2 / ISO certification assertions.
