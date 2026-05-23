// Phase 43 polish — V15 Enterprise Performance Command extra datasets. Mock-only.

export const V15P_AREA_HEADLINES = [
  { area: "Command",     tag: "Enterprise Performance",   headline: "Enterprise performance at 94 with +2 QoQ; 4 health flags on watch.",
    bullets: ["Capital execution holds at 88","Durable revenue +3 QoQ","MP scale governance still 84 — closing gap","Board execution stable at 84"] },
  { area: "Capital",     tag: "Durable Capital Execution", headline: "Capital execution durable — 88 with disciplined deployment cadence.",
    bullets: ["Cash runway buffer healthy","Capital allocation reviewed monthly","Investment thesis evidence current","No covenant exposure flagged"] },
  { area: "Revenue",     tag: "Durable Revenue Performance", headline: "Durable revenue at 89, net retention healthy across segments.",
    bullets: ["Retention cohorts holding","Expansion motion compounding","Concentration risk mitigated","Pricing power evidence current"] },
  { area: "Marketplace", tag: "Marketplace Scale",        headline: "MP scale governance at 84; intelligence center surfacing 3 scale risks.",
    bullets: ["Take-rate governance healthy","Liquidity ratios stable","Supply-demand balance monitored","3 scale risks under review"] },
  { area: "Intelligence",tag: "Strategic Operating Intel", headline: "Operating intelligence engine emitting 6 recommendations — all human-approved.",
    bullets: ["Signal quality reviewed","Confidence calibration current","Approver chain explicit","Audit IDs attached to every rec"] },
  { area: "Category",    tag: "Category Leadership",      headline: "Category leadership at 90 — proof artifacts current across 3 markets.",
    bullets: ["Analyst coverage active","Customer proofs refreshed","Competitive deltas tracked","Category narrative evidence current"] },
  { area: "Board",       tag: "Board Enterprise Intel",   headline: "Board enterprise intelligence at 84; performance pack ready for next meeting.",
    bullets: ["Performance pack drafted","Risk intelligence appended","Capital evidence attached","CoS sign-off pending"] },
];

export const V15P_OWNER_HEATMAP = [
  { owner: "CEO",     actions: 6, overdue: 0, at_risk: 1, evidence_freshness: "current" },
  { owner: "CFO",     actions: 7, overdue: 1, at_risk: 1, evidence_freshness: "current" },
  { owner: "MP Lead", actions: 5, overdue: 0, at_risk: 2, evidence_freshness: "stale-1q" },
  { owner: "Strategy",actions: 4, overdue: 0, at_risk: 0, evidence_freshness: "current" },
  { owner: "Board CoS",actions:3, overdue: 0, at_risk: 0, evidence_freshness: "current" },
  { owner: "Product", actions: 4, overdue: 1, at_risk: 1, evidence_freshness: "current" },
  { owner: "CoS",     actions: 5, overdue: 0, at_risk: 1, evidence_freshness: "current" },
];

export const V15P_CONTROL_COVERAGE = [
  { layer: "Capital execution controls",   coverage_pct: 92, last_tested: "Q-1", owner: "CFO" },
  { layer: "Revenue durability controls",  coverage_pct: 90, last_tested: "Q-1", owner: "CRO" },
  { layer: "Marketplace scale controls",   coverage_pct: 84, last_tested: "Q-1", owner: "MP Lead" },
  { layer: "Operating intelligence controls",coverage_pct: 88, last_tested: "Q-1", owner: "Strategy" },
  { layer: "Category leadership controls", coverage_pct: 91, last_tested: "Q-2", owner: "Marketing" },
  { layer: "Board reporting controls",     coverage_pct: 95, last_tested: "Q-1", owner: "Board CoS" },
  { layer: "Recommendation approval controls",coverage_pct: 100, last_tested: "Q-1", owner: "CEO" },
];

export const V15P_RLS_EXTENDED = [
  { table: "v15_enterprise_performance_scores",
    policy: `-- only company members can SELECT; only owner/admin can write
create policy "perf_select_members" on v15_enterprise_performance_scores
  for select using (is_company_member(auth.uid(), company_id));
create policy "perf_write_owner_admin" on v15_enterprise_performance_scores
  for all using (
    has_role(auth.uid(), company_id, 'owner')
    or has_role(auth.uid(), company_id, 'admin')
  );` },
  { table: "operating_intelligence_recommendations",
    policy: `-- recs visible to execs; only CEO/CFO can approve; service role for engine inserts
create policy "rec_select_exec" on operating_intelligence_recommendations
  for select using (
    is_company_member(auth.uid(), company_id)
    and has_role(auth.uid(), company_id, 'executive')
  );
create policy "rec_approve_ceo_cfo" on operating_intelligence_recommendations
  for update using (
    has_role(auth.uid(), company_id, 'ceo')
    or has_role(auth.uid(), company_id, 'cfo')
  ) with check (approval in ('approved','rejected','deferred'));` },
  { table: "board_enterprise_intelligence_records",
    policy: `-- board + CoS read; CoS write; deletes blocked
create policy "board_intel_read" on board_enterprise_intelligence_records
  for select using (
    has_role(auth.uid(), company_id, 'board')
    or has_role(auth.uid(), company_id, 'chief_of_staff')
  );
create policy "board_intel_write_cos" on board_enterprise_intelligence_records
  for insert with check (has_role(auth.uid(), company_id, 'chief_of_staff'));` },
  { table: "marketplace_scale_intelligence_records",
    policy: `-- MP lead + strategy read/write; execs read
create policy "mp_intel_read" on marketplace_scale_intelligence_records
  for select using (
    is_company_member(auth.uid(), company_id)
    and (
      has_role(auth.uid(), company_id, 'mp_lead')
      or has_role(auth.uid(), company_id, 'strategy')
      or has_role(auth.uid(), company_id, 'executive')
    )
  );` },
];

export const V15P_EDGE_EXTENDED = [
  { surface: "Approve operating-intelligence recommendation", impl: "createServerFn", auth: "requireSupabaseAuth + role ceo|cfo", returns: "{ ok, audit_id }" },
  { surface: "Generate enterprise performance score snapshot", impl: "createServerFn", auth: "requireSupabaseAuth + role executive", returns: "{ score, kpis[] }" },
  { surface: "Board enterprise intelligence pack export",      impl: "createServerFn", auth: "requireSupabaseAuth + role board|cos", returns: "{ pdf_url }" },
  { surface: "Inbound webhook: analyst-rating update",         impl: "server route /api/public/analyst", auth: "HMAC signature verify", returns: "Response('ok')" },
  { surface: "Inbound webhook: capital evidence sync",         impl: "server route /api/public/capital-evidence", auth: "HMAC signature verify", returns: "Response('ok')" },
  { surface: "Recommendation engine batch (signals -> recs)",  impl: "createServerFn (admin client)", auth: "requireSupabaseAuth + role strategy", returns: "{ count, ids[] }" },
  { surface: "MP scale risk feed ingestion",                   impl: "server route /api/public/mp-scale", auth: "HMAC signature verify", returns: "Response('ok')" },
];

export const V15P_DEMO_FLOW = [
  { step: 1,  actor: "CEO",     surface: "/v15/overview",        action: "Open command center",          expect: "score 94, +2 QoQ, 4 health flags",       outcome: "Headline read aloud" },
  { step: 2,  actor: "CEO",     surface: "/v15/exec",            action: "Review exec control tower",    expect: "Owner actions with evidence",            outcome: "Two actions assigned" },
  { step: 3,  actor: "CFO",     surface: "/v15/capital",         action: "Open capital execution",       expect: "Capital score 88, evidence current",     outcome: "No covenant exposure confirmed" },
  { step: 4,  actor: "CFO",     surface: "/v15/cap-evidence",    action: "Inspect evidence governance",  expect: "Per-artifact freshness",                 outcome: "1 artifact refresh scheduled" },
  { step: 5,  actor: "MP Lead", surface: "/v15/mp-gov",          action: "Review scale governance",      expect: "Liquidity + take-rate stable",           outcome: "Watchlist updated" },
  { step: 6,  actor: "MP Lead", surface: "/v15/mp-intel",        action: "Open scale intelligence",      expect: "3 scale risks surfaced",                 outcome: "Risk owners assigned" },
  { step: 7,  actor: "Strategy",surface: "/v15/recommendations", action: "Review rec engine",            expect: "6 recs · approver chain visible",        outcome: "2 approved, 1 deferred" },
  { step: 8,  actor: "CoS",     surface: "/v15/controls",        action: "Open controls matrix",         expect: "Coverage % per layer",                   outcome: "1 control re-tested" },
  { step: 9,  actor: "Board CoS",surface: "/v15/board-intel",    action: "Assemble board intel pack",    expect: "Performance + risk + evidence",          outcome: "Pack ready for board" },
  { step: 10, actor: "Board",   surface: "/v15/board-reports",   action: "Open board performance report",expect: "QoQ trends + risks + roadmap",           outcome: "Board sign-off captured" },
];

export const V15P_DEMO_OUTCOMES = [
  "Enterprise performance command read in under 2 min by CEO",
  "Capital execution evidence proven current at the table",
  "Marketplace scale risks surfaced with owners attached",
  "Operating intelligence recommendations approved with audit IDs",
  "Board enterprise intelligence pack delivered same-day",
];

export const V15P_PHASE44_HOLD = [
  "Phase 44 (V15.5) is NOT started — held by instruction",
  "No fully autonomous dispatch built",
  "No final SOC2 / ISO / IPO claims",
  "No final audited financial statements",
];
