# Phase 41 — V14 Enterprise Strategic Operating System

Mock-only scaffold. No autonomous dispatch. No IPO / acquisition / audited
financial / SOC 2 / ISO / Android Auto / CarPlay completeness claims.

## Routes (22) under /v14

overview, scope, sos (Strategic Operating System), capital-exec,
revenue-durability, revenue-controls, mp-econ, mp-controls, category,
category-evidence, value-tower, board-exec, cadence, strategic-risk,
strategic-acct, partner-value, product-line, strategic-invest,
capital-evidence, diligence, reporting, roadmap, reports, demo.

## Backend boundary

App-internal: TanStack `createServerFn` under `src/lib/*.functions.ts` with
`requireSupabaseAuth` and role checks (exec / cfo / cro / revops / mp_ops /
csm / partner_mgr / product_lead / board / platform_owner). External
webhooks (investor durability digest, board portal value digest) live in
`src/routes/api/public/*` with HMAC verification only — no PII.

## RLS sketch (V14, representative)

- `v14_strategic_operating_scores`              — exec/admin; platform_owner read-all
- `enterprise_strategic_operating_metrics`      — exec/admin select; tenant insert
- `capital_execution_maturity_records`          — exec/cfo only
- `long_term_revenue_durability_records`        — revops/cfo manage; billing read
- `revenue_durability_control_records`          — revops/billing manage; exec read
- `marketplace_economics_governance_records_v14` — mp_ops/admin manage; exec read
- `marketplace_economics_control_records`        — mp_ops manage; exec read
- `category_leadership_stewardship_records`      — exec/strategy manage; board read
- `category_leadership_evidence_items`           — strategy manage; exec read
- `executive_value_creation_control_records`     — exec/admin only
- `board_strategic_execution_records`            — board/exec; board read approved only
- `strategic_operating_cadence_records`          — exec/admin
- `enterprise_strategic_risk_control_records`    — exec/cro only
- `strategic_account_value_governance_records`   — csm/admin manage assigned; exec read
- `partner_ecosystem_value_governance_records`   — partner_mgr manage; partner read approved only
- `product_line_strategic_stewardship_records`   — product_lead manage; exec read
- `strategic_investment_execution_records`       — exec/cfo; board read approved
- `capital_evidence_control_records`             — exec/cfo only
- `commercial_diligence_control_records`         — exec/revops only
- `enterprise_value_creation_reports_v14`        — exec/admin; report-owner select
- `strategic_operating_roadmap_items`            — exec/admin manage; board read
- `v14_report_runs`                              — exec/admin; report-owner select

Customer/carrier/partner users have no access to internal strategic
operating, capital, board, diligence, or economics records. Partner users
see only approved partner-facing value records.

## Edge function / serverFn plan (24 fns + 2 webhooks)

calculate-v14-strategic-operating-score, generate-strategic-operating-summary,
generate-strategic-operating-action-plan, calculate-capital-execution-maturity,
generate-capital-execution-report, detect-capital-execution-blockers,
calculate-long-term-revenue-durability, calculate-revenue-durability-control-score,
detect-revenue-durability-control-exceptions,
calculate-global-marketplace-economics-governance-score,
calculate-marketplace-economics-control-score,
generate-marketplace-economics-action-plan,
calculate-category-leadership-stewardship-score,
calculate-category-evidence-maturity, generate-category-leadership-summary,
calculate-executive-value-creation-control-score,
calculate-strategic-account-value-governance,
calculate-partner-ecosystem-value-governance,
calculate-product-line-strategic-value,
generate-board-strategic-execution-report,
calculate-strategic-risk-control-score,
calculate-capital-evidence-control-score,
calculate-commercial-diligence-control-score,
generate-long-term-strategic-operating-roadmap.

Webhooks: `/api/public/v14/investor-durability-digest`,
`/api/public/v14/board-value-digest` (HMAC signed, no PII).

## Demo flow

CEO → SOS 91 · Cap 84 · Durability 86 · MP 79 · Category 88. CFO opens
Revenue Durability. MP leader confirms Southeast carrier-density weak.
Strategy lead reviews category proof gaps. Board admin opens Board
Strategic Execution. Product lead reviews EDI support burden + CoPilot
strategic value. CEO opens Value Creation Control Tower with top 5 actions.

## Phase 42 plan (V14.5)

- Enterprise operating excellence
- Strategic capital discipline
- Durable revenue systems
- Marketplace economics scale
- Category leadership execution maturity
- Strengthened RLS examples + edge separation
- V14.5 demo flow
- Still deferred: autonomous dispatch, final IPO/acquisition/audit/SOC2/ISO
