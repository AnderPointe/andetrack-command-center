// Phase 49 polish layer — V18 enterprise autonomous-assist scale governance.
// Mock-only. No autonomous dispatch. Every high-impact action HITL-gated with
// approver_id <> recommender_id enforced at the RLS layer.

export const V18_POLISH_HEADLINES = [
  { area: "Assist Scale Governance Center",         headline: "Scale 92% · approval 96% · evidence 94% · audit 95%", trend: "+3 (6w)" },
  { area: "Predictive Operating Excellence",        headline: "Signal quality 92% · coverage 90% · freshness 93%",  trend: "+4 (6w)" },
  { area: "Board Automation Maturity",              headline: "Agenda 95% · packet 93% · KPI appendix 92%",         trend: "+5 (6w)" },
  { area: "Durable Revenue Intelligence Automation",headline: "Renewal 94% · expansion 90% · churn 91% routing",    trend: "+3 (6w)" },
  { area: "Marketplace Optimization Scale Controls",headline: "Lane liquidity 89% · carrier compliance 95%",        trend: "+2 (6w)" },
  { area: "Executive Control Assurance",            headline: "Completion 95% · escalations -24% · high-risk HITL", trend: "+4 (6w)" },
  { area: "Automation Governance Evidence",         headline: "14 categories · auto-attach 91% · stale <7%",        trend: "+3 (6w)" },
  { area: "Automation Policy Enforcement",          headline: "100% high-impact gated · 0 self-approve · 3 in remediation", trend: "stable" },
  { area: "Human-Approved Automation Scale",        headline: "Approvals 12.8k/wk · SLA 93% · backup coverage 96%", trend: "+2 (6w)" },
  { area: "Recommendation Quality Assurance",       headline: "Acceptance 79% · rework 8% · false-positive 5%",     trend: "+5 (6w)" },
  { area: "Outcome Learning Governance",            headline: "Brier 0.10 · calibration drift 0.03 · loop 89%",     trend: "+3 (6w)" },
  { area: "Approval Orchestration Reliability",     headline: "Routing 94% · backup 96% · SLA 93%",                 trend: "+2 (6w)" },
  { area: "Predictive Risk Governance",             headline: "Risk-routed 91% · false-escalate 4% · coverage 92%", trend: "+3 (6w)" },
  { area: "Capital Automation Controls",            headline: "Threshold drift +0.02 · 100% HITL · 0 breach",       trend: "stable" },
  { area: "Strategic Account Automation Controls",  headline: "Coverage 90% · expansion routing 92%",               trend: "+3 (6w)" },
  { area: "Partner Automation Controls",            headline: "Risk drift +0.04 · compliance 94%",                  trend: "+2 (6w)" },
  { area: "Product-Line Automation Controls",       headline: "Margin signal 88% · 0 unapproved repricing",         trend: "+3 (6w)" },
  { area: "Category Automation Controls",           headline: "Signal coverage 86% · governance 91%",               trend: "+4 (6w)" },
  { area: "Autonomous-Assist Control Audit",        headline: "Audit 95% · append-only verified · 0 tamper",        trend: "stable" },
  { area: "Board Assist Scale Reporting",           headline: "Packet evidence 93% fresh · 14 categories",          trend: "+3 (6w)" },
];

export const V18_OWNER_HEATMAP = [
  { owner: "CEO",            pending: 3,  overdue: 0, high_risk: 2, completion: "98%" },
  { owner: "CFO",            pending: 6,  overdue: 0, high_risk: 3, completion: "95%" },
  { owner: "COO",            pending: 5,  overdue: 0, high_risk: 1, completion: "97%" },
  { owner: "CRO",            pending: 8,  overdue: 1, high_risk: 2, completion: "93%" },
  { owner: "CCO",            pending: 5,  overdue: 0, high_risk: 1, completion: "96%" },
  { owner: "Chief AI",       pending: 4,  overdue: 0, high_risk: 1, completion: "97%" },
  { owner: "VP Marketplace", pending: 7,  overdue: 1, high_risk: 2, completion: "92%" },
  { owner: "VP Partners",    pending: 4,  overdue: 0, high_risk: 1, completion: "98%" },
  { owner: "VP Product",     pending: 5,  overdue: 0, high_risk: 1, completion: "95%" },
  { owner: "VP Strategy",    pending: 3,  overdue: 0, high_risk: 0, completion: "97%" },
  { owner: "Board Admin",    pending: 2,  overdue: 0, high_risk: 0, completion: "99%" },
];

export const V18_EVIDENCE_FRESHNESS = [
  { category: "Capital execution",       freshness: "95%", stale: "2%",  owner: "CFO" },
  { category: "Revenue automation",      freshness: "93%", stale: "4%",  owner: "CRO" },
  { category: "Marketplace governance",  freshness: "89%", stale: "8%",  owner: "VP Marketplace" },
  { category: "Account intelligence",    freshness: "91%", stale: "6%",  owner: "CRO" },
  { category: "Partner automation",      freshness: "92%", stale: "5%",  owner: "VP Partners" },
  { category: "Product-line",            freshness: "88%", stale: "9%",  owner: "VP Product" },
  { category: "Category leadership",     freshness: "86%", stale: "11%", owner: "VP Strategy" },
  { category: "Risk operations",         freshness: "94%", stale: "3%",  owner: "CCO" },
  { category: "Board packet",            freshness: "93%", stale: "4%",  owner: "Board Admin" },
  { category: "Audit trail",             freshness: "96%", stale: "2%",  owner: "CCO" },
  { category: "Outcome learning",        freshness: "90%", stale: "7%",  owner: "Chief AI" },
  { category: "Explainability",          freshness: "89%", stale: "8%",  owner: "Chief AI" },
  { category: "External / data-room",    freshness: "91%", stale: "6%",  owner: "CFO" },
  { category: "Policy + remediation",    freshness: "94%", stale: "3%",  owner: "CCO" },
];

export const V18_POLICY_CALIBRATION = [
  { policy: "Capital threshold",       drift: "+0.02", suggestion: "Hold — at tolerance",                owner: "CFO" },
  { policy: "Revenue routing",         drift: "+0.05", suggestion: "Lower auto-route threshold by 2pp",  owner: "CRO" },
  { policy: "MP carrier compliance",   drift: "+0.02", suggestion: "Hold",                               owner: "VP Marketplace" },
  { policy: "Partner risk",            drift: "+0.07", suggestion: "Tighten — recalibrate after 2 weeks",owner: "VP Partners" },
  { policy: "Account expansion",       drift: "+0.04", suggestion: "Hold — monitor",                     owner: "CRO" },
  { policy: "Product-line margin",     drift: "+0.05", suggestion: "Recalibrate after pricing review",   owner: "VP Product" },
  { policy: "Category leadership",     drift: "+0.06", suggestion: "Refresh signal mix",                 owner: "VP Strategy" },
  { policy: "High-impact approval",    drift: "0.00",  suggestion: "Hold — at target",                   owner: "CCO" },
];

export const V18_RLS_EXAMPLES = [
  { name: "v18_high_impact_human_approval",
    target: "automation_actions",
    sql: "USING (impact_tier <> 'high' OR EXISTS (SELECT 1 FROM approvals a WHERE a.action_id = id AND a.approver_id <> recommender_id AND a.status = 'approved'))" },
  { name: "v18_no_self_approve",
    target: "approvals",
    sql: "WITH CHECK (approver_id <> recommender_id)" },
  { name: "v18_evidence_company_scope",
    target: "automation_evidence",
    sql: "USING (company_id = public.current_company())" },
  { name: "v18_audit_append_only",
    target: "automation_audit",
    sql: "FOR INSERT WITH CHECK (true); -- no UPDATE / DELETE policies" },
  { name: "v18_board_packet_role_gate",
    target: "board_packets",
    sql: "USING (public.has_role(auth.uid(), current_company(), 'board') OR public.has_role(auth.uid(), current_company(), 'exec'))" },
  { name: "v18_outcome_learning_writer",
    target: "outcome_learning_events",
    sql: "WITH CHECK (public.has_role(auth.uid(), current_company(), 'system') OR public.has_role(auth.uid(), current_company(), 'analyst'))" },
  { name: "v18_policy_tune_exec_only",
    target: "automation_policies",
    sql: "FOR UPDATE USING (public.has_role(auth.uid(), current_company(), 'exec'))" },
  { name: "v18_high_risk_exec_visibility",
    target: "automation_actions",
    sql: "USING (risk_tier <> 'high' OR public.has_role(auth.uid(), current_company(), 'exec'))" },
  { name: "v18_explainability_required",
    target: "automation_recommendations",
    sql: "WITH CHECK (explanation_id IS NOT NULL AND evidence_id IS NOT NULL)" },
  { name: "v18_dataroom_external_approval",
    target: "dataroom_publications",
    sql: "WITH CHECK (EXISTS (SELECT 1 FROM approvals a WHERE a.target_id = id AND a.approver_role = 'exec' AND a.status = 'approved'))" },
];

export const V18_EDGE_BOUNDARY = [
  { layer: "createServerFn",      concern: "Approvals + policy edits + evidence attach",   auth: "requireSupabaseAuth + role gate", returns: "DTO (audit_id, status)" },
  { layer: "createServerFn",      concern: "Recommendation scoring lookups",               auth: "requireSupabaseAuth",             returns: "Scored DTO" },
  { layer: "createServerFn",      concern: "Board packet draft assembly",                  auth: "requireSupabaseAuth + board/exec",returns: "Packet DTO" },
  { layer: "Edge Function",       concern: "Nightly predictive risk batch scoring",        auth: "Service role + cron signature",   returns: "Batch write" },
  { layer: "Edge Function",       concern: "Outcome learning aggregation + calibration",   auth: "Service role + cron signature",   returns: "Calibration metrics" },
  { layer: "Edge Function",       concern: "Evidence freshness sweep + decay scoring",     auth: "Service role + cron signature",   returns: "Freshness deltas" },
  { layer: "/api/public/webhook", concern: "External evidence ingest (signed)",            auth: "HMAC signature verify",           returns: "200 / 401" },
  { layer: "/api/public/cron",    concern: "Scheduled policy drift sweep",                 auth: "Cron token + HMAC",               returns: "200 / 401" },
];

export const V18_DEMO_FLOW = [
  { who: "CEO",            step: "Open Assist Scale Governance Center",        outcome: "Scale 92% · 4 KPIs green · 1 amber" },
  { who: "CEO",            step: "Scan 20 area headlines + trends",            outcome: "All trends +2..+5 · 0 regressions" },
  { who: "Board Admin",    step: "Open Board Automation Maturity",             outcome: "Agenda + packet 95/93% · 0 blockers" },
  { who: "CFO",            step: "Review Capital Automation Controls",         outcome: "Threshold drift +0.02 — hold" },
  { who: "CRO",            step: "Open Durable Revenue Intelligence Automation",outcome: "Routing drift +0.05 — recommend -2pp" },
  { who: "VP Marketplace", step: "Open Marketplace Optimization Scale Controls",outcome: "Lane liquidity 89% · 0 unapproved" },
  { who: "VP Partners",    step: "Review Partner Automation Controls",         outcome: "Risk drift +0.07 — tighten queued" },
  { who: "VP Product",     step: "Open Product-Line Automation Controls",      outcome: "0 unapproved repricing · margin 88%" },
  { who: "CCO",            step: "Open Automation Policy Enforcement",         outcome: "100% high-impact gated · 3 remediations" },
  { who: "Chief AI",       step: "Open Outcome Learning Governance",           outcome: "Brier 0.10 · loop 89%" },
  { who: "Exec",           step: "Approve high-impact MP carrier change",      outcome: "Self-approve blocked · routed to peer" },
  { who: "Board Admin",    step: "Open Board Assist Scale Reporting",          outcome: "Packet evidence 93% fresh · 14 cats" },
  { who: "CCO",            step: "Open Autonomous-Assist Control Audit",       outcome: "Audit 95% · append-only verified" },
  { who: "Exec",           step: "Open Long-term Assist Operating Roadmap",    outcome: "4 horizons · V18.5 teaser visible" },
  { who: "Exec",           step: "Close demo on Overview",                     outcome: "All 25 surfaces reachable" },
];

export const V18_ROADMAP_HORIZONS = [
  { horizon: "Now (Q current)",        focus: "Close 3 policy remediations · tighten partner risk · raise category evidence freshness ≥90%" },
  { horizon: "Next (Q+1)",             focus: "Extend outcome learning across product/category · expand board packet auto-assembly" },
  { horizon: "Later (Q+2)",            focus: "Predictive exec digest with HITL gating · cross-domain calibration sweeps" },
  { horizon: "Horizon (Q+3 → V18.5)",  focus: "Governed federation patterns + cross-tenant outcome learning · still HITL on high-impact" },
];

export const V18_PHASE50_TEASER =
  "Phase 50 teaser: V18.5 would advance governed federation, cross-tenant outcome learning, and exec digest automation. Still HITL on every high-impact action. Not started.";

export const V18_GUARDRAILS_NOTES = [
  "No fully autonomous dispatch. Every high-impact action requires a human approver who is not the recommender.",
  "Edge Functions handle batch scoring + scheduled sweeps; createServerFn handles every authorized write.",
  "Audit table is append-only at the RLS layer (no UPDATE/DELETE policies).",
  "All policy edits gated by exec role; all approvals gated by approver_id <> recommender_id.",
  "Explainability + evidence required on every recommendation before approval routing.",
];
