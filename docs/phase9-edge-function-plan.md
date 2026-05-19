# Phase 9 — Server function & edge boundary plan

Phase 9 introduces predictive scoring, AI recommendations, and AI-drafted
messages. All sensitive logic stays in TanStack server functions
(`createServerFn`) inside the app. Edge Functions are reserved for
external-triggered work that cannot route through the app.

## Server functions (createServerFn, requireSupabaseAuth)

Use for all in-app AI logic. RLS applies as the signed-in user; cost meters
and audit inserts happen server-side with the admin client where needed.

| Function                          | File                                                | Purpose                                                       |
| --------------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| `scoreRisks`                      | `src/intelligence/risk.functions.ts`                | Run rules-based + (future) ML engine over active loads        |
| `generateRecommendations`         | `src/intelligence/recommendations.functions.ts`     | Build explainable recs from risks                             |
| `decideRecommendation`            | `src/intelligence/recommendations.functions.ts`     | Approve/reject with role + approval-level check, write audit  |
| `draftCustomerUpdate`             | `src/intelligence/copilot.functions.ts`             | LLM draft of ETA update, never sent without approval          |
| `draftExecutiveSummary`           | `src/intelligence/exec.functions.ts`                | Nightly headline + bullets per company                        |
| `generateShiftHandoff`            | `src/intelligence/handoff.functions.ts`             | Aggregate shift state into one summary                        |
| `getOpsHealth`                    | `src/intelligence/health.functions.ts`              | Compute & persist `ops_health_snapshots`                      |
| `getCapacityForecast`             | `src/intelligence/capacity.functions.ts`            | Hour-by-hour forecast for next N hours                        |
| `recordAIUsage`                   | `src/intelligence/usage.functions.ts`               | Increment `ai_usage_daily`; throttle when over soft budget    |

Common middleware:
- `requireSupabaseAuth` — all of the above except cron-triggered jobs.
- `requireRole('dispatcher' | 'dispatcher_manager' | 'company_admin')` for
  decisions and budget updates.
- `enforceBudgetCeiling()` — short-circuits AI calls when over hard cutoff,
  returns a typed `{ throttled: true, reason }` instead of throwing.

## Public server routes (`src/routes/api/public/*`)

Use ONLY for external/scheduled triggers. Verify signatures or shared secrets
in the handler. Never accept tenant input that bypasses RLS without re-checking
company scope server-side.

| Route                                          | Trigger                          | Notes                                              |
| ---------------------------------------------- | -------------------------------- | -------------------------------------------------- |
| `/api/public/intelligence/cron/score-risks`    | pg_cron / external scheduler     | Bearer-token gated; scopes per company             |
| `/api/public/intelligence/cron/exec-summary`   | Nightly cron                     | Generates exec summaries for all opted-in tenants  |
| `/api/public/intelligence/cron/capacity-roll`  | Hourly cron                      | Rolls capacity forecast for next 8h                |

## What does NOT belong in Edge Functions

- Recommendation approval workflows (use server fn with role check).
- Customer message drafting (server fn with `requireSupabaseAuth`).
- AI usage accounting (server fn writing through admin client).
- Anything reachable from a UI button.

Edge Functions are deprecated for in-app logic on this stack. The only
acceptable Edge-deployed surface in Phase 9 is a webhook from an external
predictive provider whose payload signs to Supabase directly — and even then,
prefer `/api/public/*` first.

## AI safety boundaries (enforced server-side)

These are not toggles. They are coded into server functions and cannot be
overridden per-tenant:

1. No AI write of `delivery_status = completed`.
2. No AI override of CDL/HOS validation.
3. No AI customer messaging without approved recommendation row.
4. No AI write to `billing_*` tables.
5. Every AI inference logged to `ai_action_audit` (PII-scrubbed payload).
6. Hard budget cutoff cannot be bypassed by tenant role.

## Model abstraction

`predictiveModelProvider.ts` selects the active provider per company. Add new
providers (hosted ML, warehouse-backed) by implementing
`PredictiveModelProvider` and registering them. The server function layer is
provider-agnostic — swapping providers does not change the recommendation
contract.
