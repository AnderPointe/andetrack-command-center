# Phase 42 — V14.5 Enterprise Operating Excellence

Mock-only scaffold under `/v145/*`. No backend writes, no autonomous dispatch, no
final IPO/acquisition/SOC2/ISO claims.

## Surfaces (22 routes)
overview, scope, opex, capital, rev-systems, rev-exec, mp-scale, mp-controls,
category, proofs, exec-perf, board, accounts, partners, product-lines,
cap-evidence, diligence, risk, op-controls, cadence, lt-perf, reports, demo.

## Backend boundary (planned, not built)
ServerFns under `src/lib/v145.*.functions.ts` protected by `requireSupabaseAuth`
for tenant-scoped CEO/CFO/CRO/CPO/MP/PMM/Partner/CS/Board reads. Edge routes
under `/api/public/v145/*` ONLY for signed board / data-room digests for
external investor/acquirer consumption.

## Schema additions (RLS-enabled)
v145_operating_excellence_scores, enterprise_operating_excellence_metrics,
strategic_capital_discipline_records, durable_revenue_system_records,
revenue_durability_execution_records, marketplace_economics_scale_records,
marketplace_scale_control_records, category_execution_maturity_records,
category_proof_execution_records, executive_performance_management_records,
board_execution_discipline_records, strategic_account_growth_discipline_records,
partner_value_execution_records, product_line_operating_excellence_records,
capital_evidence_discipline_records, commercial_diligence_discipline_records,
strategic_risk_execution_discipline_records, enterprise_operating_control_records,
enterprise_operating_cadence_records, long_term_performance_management_records,
v145_report_runs.

## RLS pattern (example)
```sql
create policy "v145_opex_company_admin_select" on public.v145_operating_excellence_scores
for select to authenticated using (
  has_role(auth.uid(), company_id, 'admin') or is_platform_owner(auth.uid())
);
create policy "v145_board_role_select_approved" on public.board_execution_discipline_records
for select to authenticated using (
  has_role(auth.uid(), company_id, 'board') and approved = true
);
```

## Edge Function plan (mock list, none deployed)
calculate-v145-operating-excellence-score, generate-operating-excellence-summary,
generate-operating-excellence-action-plan, calculate-strategic-capital-discipline,
detect-capital-discipline-blockers, generate-capital-discipline-report,
calculate-durable-revenue-systems-score, calculate-revenue-durability-execution,
generate-revenue-durability-action-plan, calculate-marketplace-economics-scale-score,
calculate-marketplace-scale-control-score, generate-marketplace-scale-action-plan,
calculate-category-execution-maturity, calculate-category-proof-execution,
generate-category-execution-summary, calculate-board-execution-discipline,
calculate-strategic-account-growth-discipline, calculate-partner-value-execution,
calculate-product-line-operating-excellence, calculate-capital-evidence-discipline,
calculate-commercial-diligence-discipline, calculate-strategic-risk-execution-discipline,
calculate-enterprise-operating-controls-score, calculate-enterprise-operating-cadence-health,
calculate-long-term-performance-management, generate-long-term-performance-report.

In TanStack Start these would be `createServerFn` for internal callers; only
signed board / data-room digests live under `/api/public/v145/*`.

## Phase 43 teaser (V15)
Enterprise Performance Command, durable capital execution, marketplace scale
governance, strategic operating intelligence, category leadership operating system.
