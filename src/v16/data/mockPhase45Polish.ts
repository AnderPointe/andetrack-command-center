// V16 Polish — Phase 45 polish layer
// Adds executive headlines per area, owner action heatmap, control coverage,
// RLS examples, edge/serverFn boundary table, and a refined 10-step demo flow.

export const V16_POLISH_HEADLINES = [
  { area: "Assist Gov",         headline: "94% governance maturity · 12 high-impact recs awaiting CEO/CFO",     owner: "CEO" },
  { area: "Predictive Perf",    headline: "37 signals tracked · 91% within 24h freshness SLA",                 owner: "COO" },
  { area: "Predictive Risk",    headline: "3 high-risk categories · all mitigations queued for approval",      owner: "CRO" },
  { area: "Rec Governance",     headline: "Policy matrix covers 14 categories · 2 exceptions, 1 escalation",   owner: "COO" },
  { area: "HITL Approvals",     headline: "91% SLA hit · 3 SLA breaches escalated to CEO",                     owner: "CEO" },
  { area: "Explainability",     headline: "89% fields complete · sources, alternatives, outcome metric attached", owner: "Head of Data" },
  { area: "Evidence",           headline: "Evidence packs attached on 96% of approved recs",                   owner: "Compliance" },
  { area: "Outcomes",           headline: "82% within ±20% predicted · 6 lessons → policy updates queued",     owner: "Strategy" },
  { area: "Board Intel",        headline: "Capital-grade pack ready · evidence + audit trail per slide",       owner: "Board Chair" },
  { area: "Exec Decisions",     headline: "8 exec decisions in flight · explainability + risk per decision",   owner: "CEO" },
  { area: "MP Optimization",    headline: "Liquidity + bid density healthy · 5 MP recs need GM approval",      owner: "MP GM" },
  { area: "Control Maturity",   headline: "Strategic controls at 88% maturity across 8 domains",               owner: "COO" },
];

export const V16_OWNER_HEATMAP = [
  { owner: "CEO",         pending: 7, approved_7d: 14, sla_breach: 2 },
  { owner: "CFO",         pending: 5, approved_7d: 11, sla_breach: 1 },
  { owner: "COO",         pending: 9, approved_7d: 18, sla_breach: 1 },
  { owner: "CRO",         pending: 6, approved_7d: 9,  sla_breach: 0 },
  { owner: "MP GM",       pending: 4, approved_7d: 12, sla_breach: 0 },
  { owner: "Head of Rev", pending: 3, approved_7d: 7,  sla_breach: 0 },
  { owner: "Compliance",  pending: 2, approved_7d: 5,  sla_breach: 0 },
  { owner: "Board Chair", pending: 1, approved_7d: 3,  sla_breach: 0 },
];

export const V16_CONTROL_COVERAGE = [
  { domain: "Capital",          coverage: 94, automated: 71, manual: 23, gaps: 1 },
  { domain: "Revenue",          coverage: 91, automated: 64, manual: 27, gaps: 2 },
  { domain: "Marketplace",      coverage: 89, automated: 70, manual: 19, gaps: 3 },
  { domain: "Accounts",         coverage: 87, automated: 58, manual: 29, gaps: 2 },
  { domain: "Partners",         coverage: 85, automated: 55, manual: 30, gaps: 3 },
  { domain: "Product Lines",    coverage: 88, automated: 60, manual: 28, gaps: 2 },
  { domain: "Category",         coverage: 90, automated: 67, manual: 23, gaps: 1 },
  { domain: "Evidence/Audit",   coverage: 96, automated: 84, manual: 12, gaps: 0 },
];

export const V16_RLS_EXAMPLES = [
  {
    name: "rec_no_self_approve",
    target: "recommendations",
    sql: "CREATE POLICY rec_no_self_approve ON recommendations FOR UPDATE TO authenticated USING (approver_id IS DISTINCT FROM recommender_id);",
  },
  {
    name: "rec_approve_ceo_cfo_capital",
    target: "recommendations (capital)",
    sql: "CREATE POLICY rec_approve_ceo_cfo_capital ON recommendations FOR UPDATE USING (category='capital' AND has_role(auth.uid(), 'ceo') OR has_role(auth.uid(),'cfo'));",
  },
  {
    name: "evidence_attached_required",
    target: "recommendations",
    sql: "CREATE POLICY evidence_attached_required ON recommendations FOR UPDATE USING (evidence_id IS NOT NULL OR status <> 'approved');",
  },
  {
    name: "board_pack_chair_or_ceo_only",
    target: "board_packs",
    sql: "CREATE POLICY board_pack_chair_or_ceo_only ON board_packs FOR SELECT USING (has_role(auth.uid(),'board_chair') OR has_role(auth.uid(),'ceo'));",
  },
  {
    name: "outcome_write_system_only",
    target: "rec_outcomes",
    sql: "CREATE POLICY outcome_write_system_only ON rec_outcomes FOR INSERT WITH CHECK (current_setting('request.jwt.claim.role',true)='service_role');",
  },
];

export const V16_EDGE_BOUNDARY_POLISH = [
  { layer: "createServerFn",     concern: "Approvals, snapshots, audit writes",        auth: "requireSupabaseAuth + role check",   returns: "DTO" },
  { layer: "/api/public/* route", concern: "Webhook ingestion (signal sources)",        auth: "HMAC signature verify",              returns: "200/401" },
  { layer: "/api/public/* route", concern: "Cron: batch scoring & freshness check",     auth: "Shared secret header",               returns: "200" },
  { layer: "Edge function",       concern: "Heavy batch scoring (off Worker)",          auth: "Service role + signed payload",      returns: "Job id" },
  { layer: "Client",              concern: "View recs, request approval",               auth: "User session (RLS scoped)",          returns: "UI state" },
];

export const V16_DEMO_FLOW_POLISH = [
  { step: 1,  actor: "CEO",         surface: "/v16/overview",         action: "Open V16 command center; review headline + owner heatmap", outcome: "Sees 12 high-impact recs pending across 8 owners" },
  { step: 2,  actor: "CEO",         surface: "/v16/predictive",       action: "Inspect predictive performance signals + freshness",       outcome: "Confirms 91% within 24h SLA" },
  { step: 3,  actor: "CRO",         surface: "/v16/risk",             action: "Open risk heatmap, queue mitigations",                     outcome: "3 high-risk items routed to approvers" },
  { step: 4,  actor: "COO",         surface: "/v16/rec-gov",          action: "Review policy matrix + exception queue",                   outcome: "1 escalation re-routed to CEO" },
  { step: 5,  actor: "CFO",         surface: "/v16/hitl",             action: "Approve 3 capital recs with evidence",                     outcome: "Audit trail written; RLS rec_no_self_approve enforced" },
  { step: 6,  actor: "Head Data",   surface: "/v16/explainability",   action: "Verify sources, alternatives, no-action impact",           outcome: "Explainability score 89% confirmed" },
  { step: 7,  actor: "Compliance",  surface: "/v16/evidence",         action: "Attach evidence packs, lock for board",                    outcome: "96% evidence coverage; gaps flagged" },
  { step: 8,  actor: "MP GM",       surface: "/v16/mp-opt",           action: "Approve 5 MP optimization recs",                           outcome: "Marketplace liquidity recs scheduled" },
  { step: 9,  actor: "Board Chair", surface: "/v16/capital-board",    action: "Open capital-grade board pack",                            outcome: "Slides include evidence + audit trail" },
  { step: 10, actor: "Strategy",    surface: "/v16/outcomes",         action: "Review predicted vs realized, queue 6 policy updates",     outcome: "Outcome learning loop closes; calibration improves" },
];

export const V16_ROADMAP_POLISH = [
  { horizon: "Now (V16)",     theme: "Autonomous-assist governance",          status: "live"     },
  { horizon: "Next (V16.1)",  theme: "Tighter calibration + evidence depth",   status: "queued"   },
  { horizon: "Later (V16.5)", theme: "Predictive maturity & control depth",    status: "planned"  },
  { horizon: "Held",          theme: "Autonomous dispatch (NOT enabled)",      status: "blocked"  },
];

export const V16_POLISH_NOTE =
  "Polish layer: per-area headlines, owner heatmap, control coverage, RLS examples, edge boundary, and a 10-step persona demo flow. No autonomous dispatch.";
