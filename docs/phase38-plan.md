# Phase 38 — V12.5 Capital-Grade Enterprise Growth Operations

Mock-only Phase 38 scaffold. No autonomous dispatch, no
certification/IPO/audit-completeness claims.

## Modules

1. Capital-Grade Growth Operations Center (`/v125/growth-ops`)
2. Commercial Auditability Center (`/v125/auditability`)
3. Global Revenue Intelligence Dashboard (`/v125/revenue-intel`)
4. Revenue Quality Control Center (`/v125/revenue-quality`)
5. Enterprise Revenue Evidence Center (`/v125/evidence`)
6. Growth Operating Evidence Vault (`/v125/evidence-vault`)
7. Pipeline Audit Trail Center (`/v125/pipeline-audit`)
8. Deal Execution Auditability (`/v125/deal-audit`)
9. Expansion Evidence Management (`/v125/expansion`)
10. Strategic Account Growth Governance (`/v125/strategic-acct`)
11. Partner Channel Optimization Center (`/v125/partner-opt`)
12. Partner Channel Performance Governance (`/v125/partner-gov`)
13. Marketplace Revenue Intelligence (`/v125/marketplace`)
14. API/EDI Revenue Intelligence (`/v125/api-edi`)
15. Executive Growth Stewardship Dashboard (`/v125/steward`)
16. Growth Risk & Control Matrix (`/v125/risk`)
17. Commercial Proof Control Center (`/v125/proof`)
18. Capital-Grade Board Growth Reporting (`/v125/board`)
19. Commercial Data Room Evidence Center (`/v125/data-room`)
20. Long-Term Growth Governance Model (`/v125/governance`)
21. V12.5 Reports (`/v125/reports`)
22. V12.5 Demo Flow (`/v125/demo`)

## Backend boundary

App-internal logic stays in TanStack `createServerFn` handlers protected by
`requireSupabaseAuth` (with role gating for proof approval, board reports,
data room). External callers (partner attribution, marketplace settlement
providers) use HMAC-signed `/api/public/*` server routes. No Supabase Edge
Functions are introduced for V12.5 application logic.

Planned server fns:
- calculate-v125-growth-operations-score
- calculate-commercial-auditability-score
- calculate-global-revenue-intelligence-score
- calculate-revenue-quality-control-score
- calculate-deal-execution-auditability
- calculate-strategic-account-growth-gov
- calculate-partner-channel-optimization
- calculate-marketplace-revenue-intelligence
- calculate-api-edi-revenue-intelligence
- calculate-growth-risk-control-score
- calculate-growth-governance-maturity
- approve-commercial-proof-asset (role gated)
- generate-capital-board-growth-report (board role)
- generate-commercial-data-room-evidence-pack (exec/admin)
- generate-growth-operations-summary
- generate-next-growth-actions
- generate-commercial-audit-trail
- detect-commercial-audit-exceptions
- calculate-evidence-link-completeness
- detect-revenue-quality-control-exceptions
- generate-revenue-intelligence-summary
- create-growth-operating-evidence
- calculate-evidence-freshness-score
- generate-expansion-evidence-summary
- generate-partner-performance-summary
- generate-long-term-growth-governance-summary

Planned public server routes:
- `/api/public/partner/attribution` (HMAC)
- `/api/public/marketplace/settlement` (HMAC)

## RLS sketches (mock-only)

Tables (all tenant-owned include `company_id`):
- v125_growth_operations_scores (platform owner)
- capital_growth_operations_metrics
- commercial_auditability_records
- global_revenue_intelligence_records
- revenue_quality_control_records
- enterprise_revenue_evidence_items
- growth_operating_evidence_items
- pipeline_audit_trail_records
- deal_execution_auditability_records
- expansion_evidence_records
- strategic_account_growth_governance_records
- partner_channel_optimization_records
- partner_channel_performance_governance_records
- marketplace_revenue_intelligence_records
- api_edi_revenue_intelligence_records
- executive_growth_stewardship_records
- growth_risk_control_records
- commercial_proof_control_records (approval-gated external use)
- capital_board_growth_reports (board/exec only)
- commercial_data_room_evidence_items (exec/admin only)
- long_term_growth_governance_records
- v125_report_runs

```sql
-- pipeline audit trail
CREATE POLICY p_pipeline_audit_view ON pipeline_audit_trail_records
  FOR SELECT TO authenticated
  USING (owner_user_id = auth.uid()
         OR has_role(auth.uid(), company_id, 'revops'));

-- commercial proof
CREATE POLICY p_proof_external_use ON commercial_proof_control_records
  FOR SELECT TO authenticated
  USING (visibility = 'private'
         OR (visibility = 'public' AND approved = true));

-- board growth report
CREATE POLICY p_board_report_view ON capital_board_growth_reports
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), company_id, 'board')
         OR has_role(auth.uid(), company_id, 'exec'));

-- data room
CREATE POLICY p_data_room_view ON commercial_data_room_evidence_items
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), company_id, 'exec')
         OR has_role(auth.uid(), company_id, 'admin'));
```

Customer/carrier/partner users are blocked from internal growth, revenue,
deal, board, and auditability records. Partner users may see only approved
partner-facing performance records via dedicated views.

## Deferred (still)

- Fully autonomous deal closure or dispatch
- Final certification / audit-completeness claims
- Final IPO / acquisition readiness claims
- Final audited financial claims
- Full customs production workflows
- Full international tax automation
- Insurance underwriting automation
- Autonomous vehicle workflows
- Final Android Auto / CarPlay approval claims

## Phase 39 (V13) preview — not started

V13 enterprise capital readiness, revenue intelligence maturity, commercial
diligence system, marketplace economics governance, executive value creation
operations.
