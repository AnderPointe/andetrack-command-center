# Phase 43 — V15 Enterprise Performance Command (mock-only)

Status: scaffolded under `/v15/*`. Mock data + hooks + UI only.
No new tables, no live ServerFns, no Edge Functions deployed.

## Scope (included)
- Enterprise Performance Command Center
- Durable Capital Execution Center
- Durable Revenue Performance Center
- Marketplace Scale Governance Center
- Marketplace Scale Intelligence
- Strategic Operating Intelligence Center
- Operating Intelligence Recommendation Engine (human approval required)
- Category Leadership Operating System
- Executive Performance Control Tower
- Board-Level Enterprise Intelligence Center
- Strategic Account Performance Center
- Partner Ecosystem Performance Center
- Product-Line Performance Governance
- Capital Evidence Governance Center
- Commercial Diligence Governance Center
- Strategic Risk Intelligence Center
- Enterprise Performance Controls Matrix
- Long-Term Strategic Performance Roadmap
- Board Enterprise Performance Reporting
- V15 Advanced Reporting

## Deferred (do NOT build)
- Fully autonomous dispatch (human approval required for all recommendations)
- Final IPO / acquisition / SOC 2 / ISO claims without tracked evidence
- Final audited financial claims
- Full customs production, international tax automation, insurance underwriting
- Autonomous vehicle workflows
- Final Android Auto / CarPlay claims

## Backend boundary (planned, not implemented)
ServerFns (`createServerFn` + `requireSupabaseAuth`):
- `calculate_v15_enterprise_performance_score`
- `generate_enterprise_performance_summary`
- `generate_enterprise_performance_action_plan`
- `calculate_durable_capital_execution_score`
- `calculate_durable_revenue_performance`
- `detect_revenue_performance_gaps`
- `generate_durable_revenue_action_plan`
- `calculate_marketplace_scale_governance_score`
- `calculate_marketplace_scale_intelligence`
- `generate_marketplace_scale_recommendations`
- `calculate_strategic_operating_intelligence_score`
- `generate_operating_intelligence_recommendations`
- `approve_operating_intelligence_recommendation` (human approval gate)
- `create_recommendation_audit_log`
- `calculate_category_leadership_operating_score`
- `calculate_category_evidence_freshness`
- `generate_category_operating_summary`
- `calculate_executive_performance_control_score`
- `calculate_board_enterprise_intelligence_score`
- `calculate_strategic_account_performance`
- `calculate_partner_ecosystem_performance`
- `calculate_product_line_performance`
- `calculate_capital_evidence_governance_score`
- `calculate_commercial_diligence_governance_score`
- `calculate_strategic_risk_intelligence_score`
- `calculate_performance_control_score`
- `generate_board_enterprise_performance_report`
- `generate_long_term_strategic_performance_roadmap`

Public webhooks (HMAC, no PII): none new.

## Planned tables (sketch only)
v15_enterprise_performance_scores, enterprise_performance_metrics,
durable_capital_execution_records, durable_revenue_performance_records,
marketplace_scale_governance_records, marketplace_scale_intelligence_records,
strategic_operating_intelligence_records, operating_intelligence_recommendations,
recommendation_source_signals, category_leadership_operating_records,
executive_performance_control_records, board_enterprise_intelligence_records,
strategic_account_performance_records, partner_ecosystem_performance_records,
product_line_performance_governance_records, capital_evidence_governance_records,
commercial_diligence_governance_records, strategic_risk_intelligence_records,
enterprise_performance_control_records, strategic_performance_roadmap_items,
board_enterprise_performance_reports, v15_report_runs.

All company-scoped tables include `company_id`. Platform-level records
(board intelligence, capital execution rollups, strategic roadmap) may be
platform-scoped via `has_role(auth.uid(), 'platform_owner')`.

## RLS sketch
- Company admins → SELECT company-scoped performance / account / product rows where `company_id = current_company()`.
- Platform owners → SELECT platform-scoped enterprise performance + strategic intelligence.
- Executive role → SELECT capital execution, board intelligence, strategic risk.
- Board role → SELECT only board_enterprise_performance_reports WHERE status = 'approved'.
- RevOps → SELECT/INSERT durable_revenue_performance_records, commercial_diligence_governance_records.
- Billing → SELECT durable_revenue + marketplace_scale + API/EDI rollups.
- CSM → SELECT strategic_account_performance_records WHERE owner_id = auth.uid().
- Partner managers → SELECT partner_ecosystem_performance_records they own.
- Product leaders → SELECT product_line_performance_governance_records.
- Commercial diligence + capital evidence → executive/admin only.
- operating_intelligence_recommendations → INSERT system; UPDATE status='approved' only via approver role; row-level audit via recommendation_source_signals + audit log.
- Customer users → NO access to performance command, capital, board, diligence, scale internals.
- Carrier users → NO access to scale internals.
- Partner users → SELECT approved partner-facing performance only.

## Phase 44 (V15.5) teaser
Enterprise intelligence maturity, capital execution intelligence, durable
revenue optimization, marketplace scale intelligence, and autonomous-assist
governance (still human-approval gated).
