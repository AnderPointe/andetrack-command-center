# Phase 49 — V18 Enterprise Autonomous-Assist Scale Governance

Mock-only. CoPilot scales monitoring, evidence, routing, recommendations, and
outcome tracking across every domain (revenue, marketplace, capital, board,
accounts, partners, products, category). **Every high-impact action remains
behind a human approver who is not the recommender.**

## In scope (V18)
1. Enterprise Autonomous-Assist Scale Governance Center
2. Predictive Operating Excellence Center
3. Board Automation Maturity Center
4. Durable Revenue Intelligence Automation Center
5. Marketplace Optimization Scale Controls Center
6. Executive Control Assurance Center
7. Automation Governance Evidence Center
8. Automation Policy Enforcement Center
9. Human-Approved Automation Scale Center
10. Recommendation Quality Assurance Center
11. Outcome Learning Governance Center
12. Approval Orchestration Reliability Center
13. Predictive Risk Governance Center
14. Capital Automation Controls Center
15. Strategic Account Automation Controls Center
16. Partner Automation Controls Center
17. Product-Line Automation Controls Center
18. Category Automation Controls Center
19. Autonomous-Assist Control Audit Center
20. Board Autonomous-Assist Scale Reporting
21. Long-Term Autonomous-Assist Operating Roadmap
22. V18 Reports

## Out of scope
- Fully autonomous dispatch / pricing / billing / marketplace / capital / board
- IPO / acquisition / audited financial / SOC 2 / ISO / Android Auto / CarPlay
  claims without tracked evidence
- Full customs / international tax / insurance underwriting / autonomous vehicle

## Schema (mocked, see RLS sketches below)
- `v18_autonomous_assist_scale_scores`
- `autonomous_assist_scale_governance_records`
- `predictive_operating_excellence_records`
- `board_automation_maturity_records`
- `durable_revenue_intelligence_automation_records`
- `marketplace_optimization_scale_control_records`
- `executive_control_assurance_records`
- `automation_governance_evidence_records`
- `automation_policy_enforcement_records`
- `human_approved_automation_scale_records`
- `recommendation_quality_assurance_records`
- `outcome_learning_governance_records`
- `approval_orchestration_reliability_records`
- `predictive_risk_governance_records`
- `capital_automation_control_records`
- `strategic_account_automation_control_records`
- `partner_automation_control_records`
- `product_line_automation_control_records`
- `category_automation_control_records`
- `autonomous_assist_control_audit_records`
- `board_assist_scale_reports`
- `assist_operating_roadmap_items`
- `v18_report_runs`

## RLS sketches
- `v18_high_impact_human_approval` — `USING (impact_tier <> 'high' OR EXISTS (SELECT 1 FROM approvals a WHERE a.action_id = id AND a.approver_id <> recommender_id AND a.status = 'approved'))`
- `v18_no_self_approve` — `WITH CHECK (approver_id <> recommender_id)`
- `v18_company_scope` — `USING (company_id = public.current_company())`
- `v18_audit_append_only` — INSERT only; no UPDATE/DELETE
- `v18_board_packet_role_gate` — `USING (public.has_role(auth.uid(), company_id, 'admin') OR public.has_role(auth.uid(), company_id, 'owner'))`
- `v18_policy_exec_only_update` — `FOR UPDATE USING (public.has_role(auth.uid(), company_id, 'owner'))`
- `v18_customer_user_excluded` — `USING (NOT public.is_customer_user(auth.uid(), company_id))`
- `v18_carrier_view_blocked` — marketplace control rows hidden from carrier role
- `v18_partner_facing_approved_only` — `USING (audience = 'partner' AND status = 'approved')`

## Edge Function / ServerFn boundary
- **createServerFn** (auth required, RLS as user): approvals, policy edits,
  evidence attach, recommendation reads, control reads.
- **Edge Functions** (service role, cron/signature gated): nightly scale
  score recalc, outcome learning aggregation, policy enforcement sweep,
  control audit report, long-term roadmap generation.
- **/api/public/webhook/\***: signed external evidence ingest.

## V18 demo (12 steps)
CEO → Scale Gov Center → Board Maturity → Revenue Auto → MP Scale Controls →
Policy Enforcement → Exec Control Assurance → Outcome Learning Gov →
Approval Reliability → Control Audit → Board Scale Report → Roadmap.

## Phase 50 teaser (V18.5)
Enterprise control assurance, autonomous-assist operating resilience, board
intelligence assurance, revenue automation control maturity, marketplace
control optimization. Still HITL on every high-impact action.
