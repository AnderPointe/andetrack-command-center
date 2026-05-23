// Phase 49 polish pass 2 — deeper depth metrics, expanded RLS examples,
// expanded edge boundary, persona SLAs, area depth cards, demo addenda.
// Mock-only. No autonomous dispatch. High-impact actions remain HITL-gated
// with approver_id <> recommender_id enforced at RLS.

export const V18_AREA_DEPTH = [
  { area: "Assist Scale Governance",      kpi1: "Scale 92%",        kpi2: "Approval 96%",   kpi3: "Evidence 94%",   kpi4: "Audit 95%",    sla: "P95 4h" },
  { area: "Predictive Operating",         kpi1: "Signal 92%",       kpi2: "Coverage 90%",   kpi3: "Freshness 93%",  kpi4: "Drift 0.03",   sla: "P95 2h" },
  { area: "Board Automation Maturity",    kpi1: "Agenda 95%",       kpi2: "Packet 93%",     kpi3: "KPI 92%",        kpi4: "Decisions 100% logged", sla: "Weekly" },
  { area: "Durable Revenue",              kpi1: "Renewal 94%",      kpi2: "Expansion 90%",  kpi3: "Churn 91%",      kpi4: "Pricing 0 unapproved", sla: "P95 6h" },
  { area: "Marketplace Optimization",     kpi1: "Liquidity 89%",    kpi2: "Carrier 95%",    kpi3: "Lane 88%",       kpi4: "Dispute 4%",   sla: "P95 8h" },
  { area: "Executive Assurance",          kpi1: "Completion 95%",   kpi2: "Escalations -24%", kpi3: "HITL 100%",   kpi4: "Backups 96%",  sla: "P95 4h" },
  { area: "Evidence",                     kpi1: "Auto-attach 91%",  kpi2: "Stale 7%",       kpi3: "Categories 14",  kpi4: "Audit 95%",    sla: "Continuous" },
  { area: "Policy Enforcement",           kpi1: "High-impact 100%", kpi2: "Self-approve 0", kpi3: "Drift 0.02",     kpi4: "Remediation 3", sla: "P95 24h" },
  { area: "Human Approval Scale",         kpi1: "12.8k/wk",         kpi2: "SLA 93%",        kpi3: "Backup 96%",     kpi4: "Reassign 4%",  sla: "P95 4h" },
  { area: "Recommendation QA",            kpi1: "Accept 79%",       kpi2: "Rework 8%",      kpi3: "FP 5%",          kpi4: "Explainable 98%", sla: "P95 12h" },
  { area: "Outcome Learning",             kpi1: "Brier 0.10",       kpi2: "Drift 0.03",     kpi3: "Loop 89%",       kpi4: "Reweights 6/q", sla: "Weekly" },
  { area: "Approval Reliability",         kpi1: "Routing 94%",      kpi2: "Backup 96%",     kpi3: "SLA 93%",        kpi4: "Reroute 5%",   sla: "P95 4h" },
  { area: "Predictive Risk",              kpi1: "Routed 91%",       kpi2: "FP 4%",          kpi3: "Coverage 92%",   kpi4: "MTTR 9h",      sla: "P95 6h" },
  { area: "Capital Controls",             kpi1: "HITL 100%",        kpi2: "Drift 0.02",     kpi3: "Breach 0",       kpi4: "Approver≠Rec",  sla: "P95 8h" },
  { area: "Account Controls",             kpi1: "Coverage 90%",     kpi2: "Expansion 92%",  kpi3: "Risk routed 93%",kpi4: "QBR fresh 94%", sla: "P95 8h" },
  { area: "Partner Controls",             kpi1: "Compliance 94%",   kpi2: "Risk drift 0.04",kpi3: "Joint pipe 88%", kpi4: "Enablement 91%", sla: "P95 12h" },
  { area: "Product Controls",             kpi1: "Margin 88%",       kpi2: "Repricing 0 auto", kpi3: "Quality 92%",  kpi4: "Adoption 87%", sla: "P95 12h" },
  { area: "Category Controls",            kpi1: "Signal 86%",       kpi2: "Gov 91%",        kpi3: "Narrative 89%",  kpi4: "Proof 90%",    sla: "P95 24h" },
  { area: "Control Audit",                kpi1: "Append-only ✓",    kpi2: "Tamper 0",       kpi3: "Coverage 95%",   kpi4: "Sampling 12%", sla: "Daily" },
  { area: "Board Scale Reporting",        kpi1: "Sections 14",      kpi2: "Fresh 93%",      kpi3: "Decisions 7 pending", kpi4: "HITL 100%", sla: "Weekly" },
];

export const V18_RLS_EXAMPLES_2 = [
  { name: "v18_recommender_separation",   target: "approvals",   sql: "WITH CHECK (approver_id <> recommender_id AND approver_id <> created_by)" },
  { name: "v18_evidence_append_only",     target: "evidence_records", sql: "FOR UPDATE USING (false); -- attach via INSERT only" },
  { name: "v18_packet_audience_gate",     target: "board_packets", sql: "USING (audience IN ('board','exec') AND status='approved')" },
  { name: "v18_outcome_loop_owner",       target: "outcome_learning", sql: "USING (owner_id = auth.uid() OR public.has_role(auth.uid(), company_id, 'owner'))" },
  { name: "v18_risk_mitigation_hitl",     target: "risk_actions", sql: "WITH CHECK (status='approved' AND approver_id <> recommender_id)" },
  { name: "v18_capital_threshold_lock",   target: "capital_thresholds", sql: "FOR UPDATE USING (public.has_role(auth.uid(), company_id, 'owner') AND change_window='open')" },
  { name: "v18_partner_facing_redact",    target: "partner_records", sql: "USING (audience='partner' AND status='approved' AND NOT contains_pii)" },
  { name: "v18_category_proof_visibility",target: "category_proof", sql: "USING (status='published' OR public.has_role(auth.uid(), company_id, 'admin'))" },
  { name: "v18_audit_no_delete",          target: "audit_log",   sql: "FOR DELETE USING (false)" },
  { name: "v18_customer_blocked_admin",   target: "admin_records", sql: "USING (NOT public.is_customer_user(auth.uid(), company_id))" },
  { name: "v18_carrier_redacted_revenue", target: "revenue_records", sql: "USING (NOT public.has_role(auth.uid(), company_id, 'carrier'))" },
  { name: "v18_policy_change_two_person", target: "policy_changes", sql: "WITH CHECK (approver_id <> proposer_id AND status='approved')" },
];

export const V18_EDGE_BOUNDARY_2 = [
  { layer: "createServerFn", concern: "Approve / reject high-impact action", auth: "User session + RLS",     returns: "approval record" },
  { layer: "createServerFn", concern: "Attach evidence to record",            auth: "User session + RLS",     returns: "evidence id" },
  { layer: "createServerFn", concern: "Read board packet for audience",       auth: "User session + role",    returns: "packet" },
  { layer: "createServerFn", concern: "Read recommendation explainability",   auth: "User session + RLS",     returns: "rec + evidence refs" },
  { layer: "Edge Function",  concern: "Nightly scale score recalc",            auth: "Cron + service role",    returns: "scores upsert" },
  { layer: "Edge Function",  concern: "Outcome learning aggregation",          auth: "Cron + service role",    returns: "calibration metrics" },
  { layer: "Edge Function",  concern: "Policy enforcement sweep",              auth: "Cron + service role",    returns: "drift report" },
  { layer: "Edge Function",  concern: "Append-only control audit report",      auth: "Cron + service role",    returns: "audit batch" },
  { layer: "Edge Function",  concern: "Long-term roadmap regeneration",       auth: "Cron + service role",    returns: "horizon snapshot" },
  { layer: "/api/public/*",  concern: "Signed external evidence ingest",       auth: "HMAC signature",         returns: "ingest receipt" },
  { layer: "/api/public/*",  concern: "Webhook: partner compliance update",    auth: "HMAC signature",         returns: "ack" },
  { layer: "/api/public/*",  concern: "Cron trigger: nightly recalc",          auth: "Bearer + signature",     returns: "job id" },
];

export const V18_PERSONA_SLAS = [
  { persona: "CEO",        review_sla: "Daily 30m",  approval_sla: "P95 4h",  backup: "COO",        scope: "Scale gov, board, risk" },
  { persona: "CFO",        review_sla: "Daily 45m",  approval_sla: "P95 6h",  backup: "VP Finance", scope: "Capital, revenue, audit" },
  { persona: "COO",        review_sla: "Daily 45m",  approval_sla: "P95 4h",  backup: "CEO",        scope: "Ops, MP, exec assurance" },
  { persona: "CRO",        review_sla: "Daily 60m",  approval_sla: "P95 6h",  backup: "VP Sales",   scope: "Revenue, accounts" },
  { persona: "CCO",        review_sla: "Daily 30m",  approval_sla: "P95 8h",  backup: "VP Legal",   scope: "Policy, audit, evidence" },
  { persona: "Chief AI",   review_sla: "Daily 30m",  approval_sla: "P95 12h", backup: "VP ML",      scope: "Rec QA, outcome learning" },
  { persona: "VP MP",      review_sla: "Daily 45m",  approval_sla: "P95 8h",  backup: "COO",        scope: "Marketplace controls" },
  { persona: "VP Partners",review_sla: "Daily 30m",  approval_sla: "P95 12h", backup: "CRO",        scope: "Partner controls" },
  { persona: "VP Product", review_sla: "Daily 30m",  approval_sla: "P95 12h", backup: "Chief AI",   scope: "Product-line controls" },
  { persona: "Board Admin",review_sla: "Weekly 90m", approval_sla: "Weekly",  backup: "CEO",        scope: "Board packet, reporting" },
];

export const V18_DEMO_FLOW_2 = [
  { who: "CEO",         step: "Open Scale Gov Center",          outcome: "92 score · 20 area headlines · health map · exceptions" },
  { who: "CEO",         step: "Owner heatmap",                  outcome: "Pending/overdue/high-risk per role + backup" },
  { who: "Chief AI",    step: "Predictive Operating",           outcome: "Signal 92% · drift 0.03 · loop 89%" },
  { who: "Board Admin", step: "Board Maturity",                 outcome: "Agenda/packet/KPI maturity · decisions logged" },
  { who: "CRO",         step: "Durable Revenue Auto",           outcome: "Renewal/expansion/churn routing · 0 unapproved pricing" },
  { who: "VP MP",       step: "MP Scale Controls",              outcome: "Liquidity/carrier/dispute · HITL on lane shifts" },
  { who: "CCO",         step: "Policy Enforcement",             outcome: "100% high-impact gated · 0 self-approve · 3 in remediation" },
  { who: "COO",         step: "Exec Control Assurance",         outcome: "Completion 95% · escalations -24%" },
  { who: "Chief AI",    step: "Outcome Learning Gov",           outcome: "Brier 0.10 · calibration 0.03 · 6 reweights/q" },
  { who: "CCO",         step: "Approval Reliability",           outcome: "Routing 94% · backup 96% · reroute 5%" },
  { who: "CFO",         step: "Capital Controls",               outcome: "HITL 100% · drift 0.02 · 0 breach" },
  { who: "CRO",         step: "Account & Partner Controls",     outcome: "Coverage/risk routing · partner compliance 94%" },
  { who: "VP Product",  step: "Product & Category Controls",    outcome: "Margin signal 88% · narrative 89%" },
  { who: "CCO",         step: "Control Audit",                  outcome: "Append-only · 0 tamper · 12% sampling" },
  { who: "Board Admin", step: "Board Scale Report",             outcome: "14 sections · 93% fresh · 7 decisions pending" },
  { who: "CEO",         step: "Roadmap horizons",               outcome: "Now → 36mo · still HITL on high-impact" },
];

export const V18_INVARIANTS = [
  "approver_id <> recommender_id (DB-enforced)",
  "All high-impact actions HITL — no autonomous dispatch",
  "Evidence records are INSERT-only; updates forbidden",
  "Audit log is append-only; deletes forbidden",
  "Carrier role redacted from revenue and admin records",
  "Customer role excluded from admin and policy records",
  "Board packets visible only to board/exec audience when approved",
  "Capital thresholds editable only by owner role within open window",
];

export const V18_NEXT_BEST_ACTIONS = [
  { rank: 1, action: "Approve 3 pending CRO renewal motions",   owner: "CRO",   impact: "Renewal +1.4pp",  hitl: "yes" },
  { rank: 2, action: "Refresh 2 stale MP carrier evidence",     owner: "VP MP", impact: "Compliance +0.6pp", hitl: "yes" },
  { rank: 3, action: "Reweight predictive risk threshold v18.4",owner: "Chief AI", impact: "FP -0.8pp",    hitl: "yes" },
  { rank: 4, action: "Sign off board packet section 7",         owner: "CEO",   impact: "Packet 100% fresh", hitl: "yes" },
  { rank: 5, action: "Close 1 remediation in policy enforcement",owner: "CCO",  impact: "Drift -0.01",     hitl: "yes" },
  { rank: 6, action: "Approve partner enablement update",       owner: "VP Partners", impact: "Enablement +1pp", hitl: "yes" },
];
