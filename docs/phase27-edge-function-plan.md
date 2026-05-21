# Phase 27 — Server function / route plan (V7)

On this stack, app-internal logic uses TanStack `createServerFn`. Raw HTTP
endpoints (webhooks, public APIs, signed external callbacks) live under
`src/routes/api/public/*` as server routes. Do NOT introduce Supabase
Edge Functions for new V7 logic.

## Internal server functions (`createServerFn`)

### Global readiness
- `calculateGlobalReadinessScore` — aggregate 13 category scores
- `calculateCountryReadinessScore` — per-country scoring
- `generateGlobalReadinessGapReport` — gap register
- `generateCountryLaunchRecommendation` — phase recommendation

### Data residency
- `evaluateDataResidencyRisk` — score per data-type/region
- `generateDataResidencyPlanPlaceholder`
- `mapDataTypesToRegion`

### Regulated controls
- `calculateRegulatedControlScore`
- `generateGlobalComplianceGapReport`
- `createControlRemediationTask`

### Marketplace
- `calculateMarketplaceIntelligenceScore`
- `calculateMarketplaceTrustSafetyScore`
- `generateMarketplaceOpportunityReport`

### Financial
- `calculatePlatformFinancialMaturity`
- `calculateFinancialAuditReadinessPlaceholder`
- `generateGlobalRevenueOperationsReport`

### Partner ecosystem
- `calculateGlobalPartnerEcosystemScore`
- `generatePartnerRegionOpportunityReport`
- `approveInternationalPartnerListing` (gated by platform_owner)

### Support / risk
- `calculateGlobalSupportReadiness`
- `calculateStrategicGlobalRiskScore`
- `generateGlobalRiskSummary`
- `generateGlobalExpansionRoadmapSummary`

All handlers MUST use `requireSupabaseAuth` middleware and check
`is_platform_owner` / role-appropriate access before returning data.

## Server routes (raw HTTP, under `/api/public/*`)

Reserved for signed external callbacks (e.g. partner webhook, billing
provider). Each handler MUST verify HMAC signatures with
`timingSafeEqual` before processing, validate inputs with Zod, and use
`supabaseAdmin` only after verification.

Examples:
- `/api/public/partner-webhook` — partner status updates
- `/api/public/billing-webhook` — payment provider events
- `/api/public/cron/recompute-readiness` — scheduled recompute

## Boundaries
- Never expose internal marketplace intelligence, financial maturity,
  audit readiness, or risk register data on public routes.
- Never use AI to issue refunds, lock accounts, or perform compliance
  actions without human approval (enforced by AI restriction rules).
- Cross-border workflows are placeholders — do not assert customs or
  broker integrations are live.
