# Phase 32 — Backend Boundary (server functions vs server routes vs edge functions)

## Rule
On the TanStack Start stack, app-internal server logic is implemented as
`createServerFn` handlers. Raw HTTP endpoints (webhooks, public APIs,
cron callbacks) are implemented as TanStack server routes under
`src/routes/api/public/*`. Supabase Edge Functions are NOT used for new
V9.5 logic.

## V9.5 server functions (`createServerFn`)
| Name                                 | Caller                          | Auth                  |
| ------------------------------------ | ------------------------------- | --------------------- |
| `calculateV95EnterpriseTrust`        | Stewardship dashboard           | executive role        |
| `calculateCertificationEvidence`     | Evidence center                 | security role         |
| `calculateFinancialGovernance`       | Financial gov center            | billing role          |
| `calculateMarketplaceOptimization`   | MP intelligence center          | marketplace role      |
| `generateCustomerTrustPacket`        | Customer trust                  | customer_success      |
| `generateBoardInvestorSummary`       | Board discipline                | board / executive     |
| `calculatePlatformValueCreation`     | Value dashboard                 | executive role        |
| `calculateAIGovernanceMaturityV95`   | AI governance center            | admin / security      |

All handlers use `requireSupabaseAuth` middleware and read company scope from
`public.current_company()`. Writes go through admin-only handlers; everything
else is read-only RPC.

## V9.5 server routes (`/api/public/*`)
| Route                                            | Caller                          | Auth            |
| ------------------------------------------------ | ------------------------------- | --------------- |
| `POST /api/public/webhooks/cert-evidence`        | External evidence provider      | HMAC signature  |
| `POST /api/public/webhooks/procurement`          | Customer procurement system     | HMAC signature  |

Each route MUST:
1. Read the raw body, then verify the `x-webhook-signature` header with
   `crypto.timingSafeEqual` against an HMAC-SHA256 of the body using the
   per-partner secret stored server-side.
2. Validate the parsed payload with Zod (no trusted client input).
3. Use `supabaseAdmin` only after signature verification succeeds.
4. Never echo PII / control evidence back in the response body.

## Edge functions
None new in V9.5. Any pre-existing Lovable-managed edge functions continue
to deploy as configured in `supabase/config.toml`; new logic goes into
server functions per the rule above.
