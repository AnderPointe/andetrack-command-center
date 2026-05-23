# Phase 38 polish — V12.5 capital-grade growth operations

Mock-only polish pass. No autonomous dispatch. No IPO / audit completeness claims. Phase 39 (V13) remains deferred.

## What changed

- **Mock data enrichment** (`src/v125/data/mockPhase38.ts`)
  - `V125_AUDIT_TRENDS` — 4-quarter trend of commercial auditability (score, ready, at-risk, exceptions).
  - `V125_REV_QUALITY_TRENDS` — 4-quarter trend of revenue quality controls (score, pass, review, exception).
  - `V125_PARTNER_ATTRIBUTION_TRENDS` — 4-quarter trend of partner sourced/influenced pipeline and conversion %.

- **Hooks** (`src/v125/hooks.ts`)
  - `useCommercialAuditability()` now also returns `trends`.
  - New `useRevenueQualityTrends()` and `usePartnerAttributionTrends()`.

- **Pages**
  - `v125.auditability.tsx` — added "Auditability trend (last 4Q)" card.
  - `v125.revenue-quality.tsx` — added "Revenue quality trend (last 4Q)" card.
  - `v125.partner-opt.tsx` — added "Partner attribution trend (last 4Q)" card.

All other V12.5 pages already display 4-card `ScoreCard` summary grids over hook data
(growth-ops, auditability, revenue-intel, revenue-quality, evidence, evidence-vault,
pipeline-audit, deal-audit, expansion, strategic-acct, partner-opt, partner-gov,
marketplace, api-edi, risk, proof, board, data-room, steward, governance) and remain unchanged
in this polish pass.

## Backend boundary (unchanged contract)

- **Internal app logic** → TanStack `createServerFn` (e.g. `getCapitalGrowthOps`, `getCommercialAuditability`, `getPartnerAttribution`). Protected with `requireSupabaseAuth` so RLS scopes rows to the caller.
- **External callers** (partner / marketplace webhooks, capital cron) → `src/routes/api/public/*` with HMAC signature verification before any DB write. Never return PII from these routes.
- **No new Supabase Edge Functions.** Inherited functions, if any, keep their current `verify_jwt` config.

## RLS examples (sketch)

```sql
-- pipeline_audit_trail_records: tenant-scoped read for members
alter table public.pipeline_audit_trail_records enable row level security;
create policy "members read pipeline audit"
  on public.pipeline_audit_trail_records for select
  using (public.is_company_member(auth.uid(), company_id));

-- capital_board_growth_reports: only owners/admins can read board packs
create policy "owners read board growth"
  on public.capital_board_growth_reports for select
  using (public.has_role(auth.uid(), company_id, 'owner')
      or public.has_role(auth.uid(), company_id, 'admin'));

-- partner_attribution_records: members read; service-role writes from webhook
create policy "members read partner attrib"
  on public.partner_attribution_records for select
  using (public.is_company_member(auth.uid(), company_id));
```

## Demo flow

`/v125/demo` already provides role guidance, demo steps, close-out commitments, RLS examples,
backend boundary, deferred-in-V12.5 scope, and the Phase 39 teaser. No changes this pass.

## Explicitly deferred (still)

- Fully autonomous deal closure / dispatch
- Final certification / audit-completeness claims
- Final IPO / acquisition readiness claims
- Phase 39 (V13)
