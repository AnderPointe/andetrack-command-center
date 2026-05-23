// Phase 48 polish layer — V17.5 governed enterprise automation scale.
// Mock-only. No autonomous dispatch. Every high-impact action is HITL-gated
// with approver_id <> recommender_id enforced at the RLS layer.

export const V175_POLISH_HEADLINES = [
  { area: "Governed Automation Scale Center", headline: "Scale 91% · approval health 93% · evidence 89% · audit 96%", trend: "+3 (6w)" },
  { area: "Predictive Board Execution Maturity", headline: "Agenda 94% · packet 92% · decision routing 90% · follow-up 88%", trend: "+4 (6w)" },
  { area: "Revenue Automation Optimization", headline: "Signal density 92% · routing 90% · win-rate lift +6.4%", trend: "+2 (6w)" },
  { area: "Marketplace Automation Governance", headline: "Lane liquidity 88% · carrier compliance 94% · 0 unapproved actions", trend: "+3 (6w)" },
  { area: "Strategic Intelligence Operating Excellence", headline: "Signal quality 91% · workflow health 89% · cross-domain coverage 87%", trend: "+2 (6w)" },
  { area: "Executive Automation Oversight", headline: "Exec completion 94% · escalations -22% · high-risk all HITL", trend: "+5 (6w)" },
  { area: "Automation Control Maturity", headline: "Controls passing 47/49 · 2 exceptions in remediation", trend: "+1 (6w)" },
  { area: "Board Automation Evidence", headline: "Packet evidence freshness 92% · 11 categories covered", trend: "+4 (6w)" },
  { area: "Approval Orchestration Scale", headline: "Routing accuracy 93% · SLA hit 91% · self-approve attempts blocked 100%", trend: "+2 (6w)" },
  { area: "Evidence Automation Scale", headline: "Evidence packs 12.4k/wk · auto-attached 89% · stale <8%", trend: "+3 (6w)" },
  { area: "Outcome Learning Maturity", headline: "Calibration drift 0.04 · brier 0.11 · feedback loop 87%", trend: "+2 (6w)" },
  { area: "Recommendation Quality Improvement", headline: "Acceptance 78% · rework 9% · false-positive 6%", trend: "+4 (6w)" },
];

export const V175_OWNER_HEATMAP = [
  { owner: "CEO",      pending: 3,  overdue: 0, high_risk: 2, completion: "97%" },
  { owner: "CFO",      pending: 7,  overdue: 1, high_risk: 3, completion: "94%" },
  { owner: "COO",      pending: 5,  overdue: 0, high_risk: 1, completion: "96%" },
  { owner: "CRO",      pending: 9,  overdue: 1, high_risk: 2, completion: "92%" },
  { owner: "CCO",      pending: 6,  overdue: 0, high_risk: 1, completion: "95%" },
  { owner: "VP Marketplace", pending: 8, overdue: 2, high_risk: 2, completion: "90%" },
  { owner: "VP Partners",    pending: 4, overdue: 0, high_risk: 1, completion: "97%" },
  { owner: "Board Admin",    pending: 2, overdue: 0, high_risk: 0, completion: "99%" },
];

export const V175_EVIDENCE_FRESHNESS = [
  { category: "Capital execution",      freshness: "94%", stale: "3%",  owner: "CFO" },
  { category: "Revenue automation",     freshness: "92%", stale: "5%",  owner: "CRO" },
  { category: "Marketplace governance", freshness: "88%", stale: "9%",  owner: "VP Marketplace" },
  { category: "Account intelligence",   freshness: "90%", stale: "7%",  owner: "CRO" },
  { category: "Partner automation",     freshness: "91%", stale: "6%",  owner: "VP Partners" },
  { category: "Product-line",           freshness: "87%", stale: "10%", owner: "VP Product" },
  { category: "Category leadership",    freshness: "85%", stale: "12%", owner: "VP Strategy" },
  { category: "Risk operations",        freshness: "93%", stale: "4%",  owner: "CCO" },
  { category: "Board packet",           freshness: "92%", stale: "5%",  owner: "Board Admin" },
  { category: "Audit trail",            freshness: "96%", stale: "2%",  owner: "CCO" },
  { category: "Outcome learning",       freshness: "89%", stale: "8%",  owner: "Chief AI" },
];

export const V175_POLICY_CALIBRATION = [
  { policy: "Capital threshold",       drift: "+0.03", suggestion: "Hold — within tolerance", owner: "CFO" },
  { policy: "Revenue routing",         drift: "+0.06", suggestion: "Lower auto-route threshold by 2pp", owner: "CRO" },
  { policy: "MP carrier compliance",   drift: "+0.02", suggestion: "Hold", owner: "VP Marketplace" },
  { policy: "Partner risk",            drift: "+0.08", suggestion: "Tighten — recalibrate after 2 weeks", owner: "VP Partners" },
  { policy: "Account expansion",       drift: "+0.04", suggestion: "Hold — monitor", owner: "CRO" },
  { policy: "High-impact approval",    drift: "0.00",  suggestion: "Hold — at target", owner: "CCO" },
];

export const V175_RLS_EXAMPLES = [
  { name: "v175_high_impact_human_approval",
    target: "automation_actions",
    sql: "USING (impact_tier <> 'high' OR EXISTS (SELECT 1 FROM approvals a WHERE a.action_id = id AND a.approver_id <> recommender_id AND a.status = 'approved'))" },
  { name: "v175_no_self_approve",
    target: "approvals",
    sql: "WITH CHECK (approver_id <> recommender_id)" },
  { name: "v175_evidence_company_scope",
    target: "automation_evidence",
    sql: "USING (company_id = public.current_company_id())" },
  { name: "v175_audit_append_only",
    target: "automation_audit",
    sql: "FOR INSERT WITH CHECK (true); -- no UPDATE / DELETE policies" },
  { name: "v175_board_packet_read_board_role",
    target: "board_packets",
    sql: "USING (public.has_role(auth.uid(), 'board') OR public.has_role(auth.uid(), 'exec'))" },
  { name: "v175_outcome_learning_writer",
    target: "outcome_learning_events",
    sql: "WITH CHECK (public.has_role(auth.uid(), 'system') OR public.has_role(auth.uid(), 'analyst'))" },
  { name: "v175_policy_tune_exec_only",
    target: "automation_policies",
    sql: "FOR UPDATE USING (public.has_role(auth.uid(), 'exec'))" },
  { name: "v175_high_risk_exec_visibility",
    target: "automation_actions",
    sql: "USING (risk_tier <> 'high' OR public.has_role(auth.uid(), 'exec'))" },
];

export const V175_EDGE_BOUNDARY = [
  { layer: "createServerFn",     concern: "Approvals, policy edits, evidence attach", auth: "requireSupabaseAuth + role gate", returns: "DTO (audit_id, status)" },
  { layer: "createServerFn",     concern: "Recommendation scoring lookups",            auth: "requireSupabaseAuth",             returns: "Scored DTO" },
  { layer: "Edge Function",      concern: "Nightly batch scoring (predictive risk)",   auth: "Service role + cron signature",   returns: "Batch write to scoring tables" },
  { layer: "Edge Function",      concern: "Outcome learning aggregation",              auth: "Service role + cron signature",   returns: "Calibration metrics" },
  { layer: "/api/public/webhook",concern: "External evidence ingest (signed)",         auth: "HMAC signature verify",           returns: "200 / 401" },
  { layer: "/api/public/cron",   concern: "Scheduled policy drift sweep",              auth: "Cron token + HMAC",               returns: "200 / 401" },
];

export const V175_DEMO_FLOW = [
  { who: "CEO",         step: "Open Governed Automation Scale Center", outcome: "Scale 91% · 4 KPIs green · 2 amber" },
  { who: "CEO",         step: "Review headlines + per-domain health",   outcome: "12 headlines · trends +2..+5" },
  { who: "Board Admin", step: "Open Predictive Board Execution Maturity", outcome: "Agenda + packet 94/92% · 0 blockers" },
  { who: "CFO",         step: "Review capital intelligence automation",   outcome: "Capital threshold drift +0.03 — hold" },
  { who: "CRO",         step: "Open Revenue Automation Optimization",     outcome: "Routing drift +0.06 — recommend -2pp" },
  { who: "VP Marketplace", step: "Open Marketplace Automation Governance", outcome: "Lane liquidity 88% · 0 unapproved" },
  { who: "CCO",         step: "Open Automation Control Maturity",         outcome: "47/49 passing · 2 remediation open" },
  { who: "Chief AI",    step: "Open Outcome Learning Maturity",           outcome: "Brier 0.11 · feedback loop 87%" },
  { who: "Exec",        step: "Approve high-impact MP carrier change",    outcome: "Self-approve blocked · routed to peer" },
  { who: "Board Admin", step: "Open Board Automation Scale Reporting",    outcome: "Packet evidence 92% fresh · 11 categories" },
  { who: "CCO",         step: "Open Governed Automation Audit Center",    outcome: "Audit 96% · append-only verified" },
  { who: "Exec",        step: "Open Long-term Automation Scale Roadmap",  outcome: "4 horizons · V18 teaser visible" },
  { who: "Exec",        step: "Close demo on Overview",                   outcome: "All 25 surfaces reachable" },
];

export const V175_ROADMAP_HORIZONS = [
  { horizon: "Now (Q current)",      focus: "Scale governed automation · close 2 control exceptions · tighten partner risk policy" },
  { horizon: "Next (Q+1)",           focus: "Expand outcome learning to product/category · raise evidence freshness ≥95% in all categories" },
  { horizon: "Later (Q+2)",          focus: "Predictive board packet auto-draft v2 · automated exec digest with HITL gating" },
  { horizon: "Horizon (Q+3 → V18)",  focus: "Cross-tenant governed federation patterns · still HITL on high-impact" },
];

export const V175_PHASE49_TEASER =
  "Phase 49 teaser: V18 would advance governed federation, cross-tenant outcome learning, and exec digest automation. Still HITL on every high-impact action. Not started.";

export const V175_LONG_TERM_NOTES = [
  "No fully autonomous dispatch. Every high-impact action requires a human approver who is not the recommender.",
  "Edge Functions handle batch scoring + scheduled sweeps; createServerFn handles every authorized write.",
  "Audit table is append-only at the RLS layer (no UPDATE/DELETE policies).",
  "All policy edits gated by exec role; all approvals gated by approver_id <> recommender_id.",
];
