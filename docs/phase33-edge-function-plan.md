# Phase 33 — Backend Boundary (server functions vs server routes vs edge functions)

## Rule
TanStack Start app-internal logic = `createServerFn` (with role middleware).
Raw HTTP endpoints for external callers = TanStack server routes under
`src/routes/api/public/*` (HMAC verification mandatory). Supabase Edge
Functions are NOT used for new V10 logic.

## V10 server functions (`createServerFn`)
| Name                                       | Caller                       | Auth                  |
| ------------------------------------------ | ---------------------------- | --------------------- |
| `calculateV10CategoryLeadershipScore`      | Category command center      | executive role        |
| `generateCategoryLeadershipActionPlan`     | Category command center      | executive role        |
| `generateCategoryNarrativeSummary`         | Narrative center             | executive / board     |
| `calculateTrustSalesReadiness`             | Trust commercialization      | sales / security      |
| `generateEnterpriseTrustPacket`            | Trust commercialization      | customer_success      |
| `approveProofPointForSales`                | Proof library                | pmm / admin           |
| `generateProcurementResponsePack`          | Procurement center           | sales / security      |
| `calculatePlatformEconomicsMaturityV10`    | Economics center             | finance / executive   |
| `calculateMarketplaceValueProof`           | MP value proof center        | marketplace role      |
| `calculateEcosystemDefensibility`          | Defensibility dashboard      | executive / cpo       |
| `generateMarketplaceProofReport`           | MP value proof center        | marketplace role      |
| `calculateRetentionExpansionScore`         | Retention center             | customer_success      |
| `calculateCustomerOutcomeScore`            | Outcomes dashboard           | customer_success      |
| `calculatePartnerEcosystemValue`           | Partner value center         | partner role          |
| `generateCustomerSuccessStory`             | Outcomes dashboard           | customer_success      |
| `generateBoardInvestorNarrative`           | Narrative center             | executive / board     |
| `calculateGrowthInitiativeImpact`          | Growth execution             | executive role        |
| `calculateExecutiveOperatingMaturity`      | Exec model center            | executive role        |
| `generatePlatformValueRealizationReport`   | Value realization dashboard  | executive role        |
| `generateCompetitiveBattlecard`            | Competitive center           | pmm / sales           |
| `calculateCategoryPositioningScore`        | Competitive center           | pmm role              |
| `generateWinLossSummary`                   | Competitive center           | sales / pmm           |

All handlers use `requireSupabaseAuth`; company scope from
`public.current_company()`. Writes restricted to admin / role-specific guards.

## V10 server routes (`/api/public/*`)
| Route                                              | Caller                       | Auth            |
| -------------------------------------------------- | ---------------------------- | --------------- |
| `POST /api/public/webhooks/proof-point-evidence`   | External evidence provider   | HMAC signature  |
| `POST /api/public/webhooks/reference-approval`     | Customer legal / sponsor     | HMAC signature  |

Each route MUST verify `x-webhook-signature` via
`crypto.timingSafeEqual` + HMAC-SHA256 with per-partner secret BEFORE
processing, Zod-validate the payload, and only then use `supabaseAdmin`.
No PII echoed back.

## Edge functions
None new in V10. Pre-existing Lovable-managed edge functions continue to
deploy as configured in `supabase/config.toml`.
