# Phase 22 (V4.5) — Edge Function / server-fn plan

The default app-internal surface is **TanStack `createServerFn`** (in `src/lib/*.functions.ts`). Supabase Edge Functions are reserved for signed, external webhooks that need to land outside the TanStack runtime.

## TanStack server functions (`createServerFn`)

Automation
- calculate-automation-maturity
- approve-automation-action  (middleware: requireSupabaseAuth + role check)
- record-automation-outcome

Marketplace
- calculate-marketplace-operations-score
- calculate-carrier-quality-score
- create-marketplace-dispute
- resolve-marketplace-dispute

Certification
- calculate-certification-execution-score
- calculate-soc2-readiness-score
- create-soc2-evidence-request
- generate-certification-gap-report

Mobile
- calculate-mobile-launch-readiness
- calculate-android-auto-readiness
- calculate-carplay-readiness

Partnership / acquisition
- calculate-partnership-readiness
- calculate-acquisition-readiness  (platform-owner only)
- generate-due-diligence-packet
- generate-procurement-packet

Maturity rollups
- calculate-customer-success-maturity
- calculate-support-maturity
- calculate-ai-governance-maturity
- calculate-revenue-operations-maturity
- calculate-platform-operating-metrics

## Supabase Edge Functions (signed external)

- stripe-webhook       — signature verified, writes to `platform_revenue_events`
- samsara-webhook      — signature verified, writes to `telematics_events`
- google-play-webhook  — RTDN style notifications
- apple-server-webhook — App Store server notifications
- edi-as2-callback     — signed AS2 acks from external partners

These remain in `supabase/functions/<name>/index.ts` because they're called by
external systems with fixed URLs and need to be reachable without the TanStack
auth stack.

## Guardrails enforced in middleware

- `requireSupabaseAuth` on every internal server fn.
- Role gates: `admin`, `security`, `support_lead`, `billing_lead`, `platform_owner`.
- High-risk automation (driver reassignment, carrier suspension, billing, EDI 990 critical) always requires an approval record before execution.
- Every approval creates an `automation_outcomes` row for audit.
