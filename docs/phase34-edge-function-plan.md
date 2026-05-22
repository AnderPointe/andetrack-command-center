# Phase 34 — V10.5 Edge Function plan

On this stack, app-internal logic is implemented as TanStack server functions
(`createServerFn`), not Supabase Edge Functions. External callers (proof
approval webhooks) get a server route under `src/routes/api/public/*`.

## Server functions (createServerFn)
Commercialization
- calculate-v105-commercial-scale-score
- calculate-enterprise-opportunity-score
- generate-commercial-executive-summary

Trust monetization
- calculate-trust-monetization-score
- track-trust-asset-usage
- generate-trust-sales-packet

Sales / deal desk
- calculate-deal-risk-score
- create-deal-desk-approval
- approve-pricing-exception
- generate-enterprise-close-plan

Revenue expansion
- calculate-expansion-readiness
- calculate-renewal-readiness
- generate-expansion-playbook

Proof assets
- approve-customer-proof-asset
- approve-marketplace-proof-asset
- generate-sales-proof-pack

Capital / growth
- calculate-strategic-capital-readiness
- generate-capital-narrative
- calculate-growth-portfolio-score
- generate-board-growth-report

Risk
- calculate-commercial-risk-score
- generate-commercial-risk-summary
- create-commercial-risk-mitigation-plan

All server fns use `requireSupabaseAuth`. Approval and capital/board fns
add a role check via `has_role()`.

## Server routes (`/api/public/*`)
- `/api/public/webhooks/proof-approved` — HMAC-signed external callback
  for proof asset approval events (e.g. PMM tooling).

No new Supabase Edge Functions added in V10.5.
