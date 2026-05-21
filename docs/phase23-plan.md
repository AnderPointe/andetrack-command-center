# Phase 23 — V5 National-Scale Maturity

V5 moves Anderoute to a category-leading logistics operating platform: marketplace liquidity management, national supply/demand intelligence, certification execution tracking, executive/board reporting, category leadership positioning, mature revenue ops, mature customer success, mature support, enterprise governance, strategic growth planning, and data room readiness.

## Routes
All under `/v5/*` (see `src/components/v5/V5Nav.tsx` for the full list of 25 modules).

## Components
- Shared: `V5Nav`, `V5Page`, `ui-bits` (re-exports KpiGrid/ScoreCard/StatusPill/SimpleTable from v45).
- Module dashboards are implemented directly inside each route file using the shared primitives to keep the surface area light.

## Data & hooks
- `src/v5/data/mockPhase23.ts` — mock dataset for every module.
- `src/v5/hooks.ts` — 23 hooks (`useV5Scope`, `useMarketplaceLiquidity`, `useSOC2Completion`, etc.) that abstract the mock layer and are ready to swap for `createServerFn` calls.

## Constraints
- No fully autonomous dispatch.
- No certification claims without tracked evidence.
- No Android Auto / CarPlay approval claims.
- All AI recommendations remain human-approved.
- All numbers are mock and labeled as such.

## Backend plan
- See `docs/phase23-schema.sql` for tables.
- See `docs/phase23-rls.sql` for RLS examples.
- See `docs/phase23-edge-function-plan.md` for server-fn vs Edge Function split.

## Demo
`/v5/demo` walks executives, ops leaders, marketplace managers, security, revenue, and strategy through the full V5 surface.
