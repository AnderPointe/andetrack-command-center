# Phase 20 — V3.5 Server logic separation

On TanStack Start we prefer `createServerFn` (app-internal) and reserve
Supabase Edge Functions for true external webhooks. The list below is the
planned separation for V3.5.

## TanStack server functions (`createServerFn`)
Carrier marketplace:
- `create-carrier-subscription`
- `calculate-marketplace-fee`
- `create-carrier-settlement`
- `approve-carrier-verification`
- `calculate-carrier-performance-score`
- `check-carrier-compliance`

API monetization:
- `calculate-api-overage`
- `create-api-billing-event`
- `enforce-partner-api-plan`

Telematics intelligence (internal aggregations):
- `calculate-vehicle-health-score`
- `calculate-driver-behavior-score`
- `process-telematics-health-event` (when triggered by app actions, not raw provider)

Compliance / certification:
- `generate-compliance-task`
- `check-document-expiration`
- `calculate-compliance-score`
- `calculate-certification-readiness`
- `generate-vendor-review-packet`
- `export-security-questionnaire`

Commercial intelligence:
- `calculate-enterprise-health-score`
- `calculate-commercial-readiness`
- `generate-revenue-summary`
- `calculate-regional-performance`

All of the above require `requireSupabaseAuth` and enforce role checks
(`company_admin`, `billing_admin`, `commercial_admin`, `security_admin`).

## Supabase Edge Functions / TanStack `/api/public/*` routes
Reserve for inbound third-party traffic that cannot route through the app:
- Telematics provider webhooks (Samsara / Motive / Geotab signature-verified)
- Stripe / payment processor webhooks for marketplace + API billing
- EDI partner inbound endpoints that require a stable public URL

Every public route MUST verify a signature and never echo PII.

## High-impact action approval matrix
| Action | Auto allowed | Requires human approval |
| --- | --- | --- |
| Approve carrier verification | no | yes (company_admin) |
| Release settlement (placeholder) | no | yes (company_admin + finance) |
| Export security questionnaire | no | yes (company_admin) |
| Generate vendor review packet | drafting yes | publish: yes |
| Suspend carrier | no | yes |
| Enable carrier API access | no | yes |
