// Phase 42 polish — V14.5 enterprise operating excellence augments. Mock only.

export const V145P_EXEC_HEADLINES = {
  opex:    { tag: "OpEx",       headline: "OpEx 93% — cadence + capital discipline carrying the system; SE marketplace density + 2 board actions are the visible drags.",
             bullets: ["Cadence health 90%", "Capital discipline 86% (+2 QoQ)", "Top-5 actions all have named owners + dates"] },
  capital: { tag: "Capital",    headline: "Capital discipline 86% — durability evidence fresh; MP economics evidence stale; data-room 78%→target 85% in 14d.",
             bullets: ["6 capital actions tracked, 1 at-risk (MP)", "Evidence freshness 84%", "Board governance pack on-track T+7d"] },
  revenue: { tag: "Revenue",    headline: "Durable revenue 88% — renewals + payments strong; API/EDI maturing; 2 evidence items overdue this week.",
             bullets: ["Renewal durability 92%", "Top-5 concentration 34%", "Marketplace revenue +4 QoQ"] },
  mp:      { tag: "Marketplace",headline: "MP scale 81% — TX/MW scale-ready; SE density is the gap; take-rate evidence refresh in flight.",
             bullets: ["TX 92 / MW 88 / SE 62 readiness", "Bid density 78%, fee capture 87%", "Top-3 carrier concentration target <38%"] },
  category:{ tag: "Category",   headline: "Category execution 87% — narrative + differentiation strong; MP proof + exec thought-leadership are the watch items.",
             bullets: ["Narrative 92, differentiation 91", "Proof assets: 1 draft + 1 security review", "Sales narrative adoption 89%"] },
  board:   { tag: "Board",      headline: "Board execution 82% — action completion healthy but 2 items overdue and MP economics review still scheduled.",
             bullets: ["3 decision follow-ups, 1 at-risk", "Evidence freshness 84%", "Capital + revenue reviews complete"] },
};

export const V145P_OWNER_HEATMAP = [
  { owner: "CEO",         actions: 3, overdue: 0, atRisk: 1, fresh: 92 },
  { owner: "CFO",         actions: 5, overdue: 2, atRisk: 1, fresh: 84 },
  { owner: "COO",         actions: 4, overdue: 0, atRisk: 0, fresh: 90 },
  { owner: "CRO",         actions: 4, overdue: 0, atRisk: 0, fresh: 88 },
  { owner: "CPO",         actions: 3, overdue: 0, atRisk: 0, fresh: 86 },
  { owner: "MP Lead",     actions: 4, overdue: 0, atRisk: 2, fresh: 72 },
  { owner: "Partner Lead",actions: 2, overdue: 0, atRisk: 1, fresh: 79 },
  { owner: "PMM",         actions: 3, overdue: 0, atRisk: 1, fresh: 83 },
  { owner: "ChiefStaff",  actions: 3, overdue: 2, atRisk: 0, fresh: 85 },
  { owner: "Trust",       actions: 2, overdue: 0, atRisk: 1, fresh: 80 },
];

export const V145P_CONTROL_COVERAGE = [
  { layer: "Capital execution",   coverage: 93, tested_q: "Q-1", evidence: "approved" },
  { layer: "Revenue durability",  coverage: 90, tested_q: "Q-1", evidence: "approved" },
  { layer: "Marketplace economics", coverage: 78, tested_q: "Q-2", evidence: "watch" },
  { layer: "Category execution",  coverage: 88, tested_q: "Q-1", evidence: "approved" },
  { layer: "Board execution",     coverage: 82, tested_q: "Q-1", evidence: "watch" },
  { layer: "Strategic accounts",  coverage: 86, tested_q: "Q-1", evidence: "approved" },
  { layer: "Partner value",       coverage: 79, tested_q: "Q-2", evidence: "watch" },
  { layer: "Product-line",        coverage: 87, tested_q: "Q-1", evidence: "approved" },
  { layer: "Capital evidence",    coverage: 84, tested_q: "Q-1", evidence: "approved" },
  { layer: "Commercial diligence",coverage: 80, tested_q: "Q-1", evidence: "watch" },
  { layer: "Strategic risk",      coverage: 78, tested_q: "Q-1", evidence: "approved" },
  { layer: "Operating cadence",   coverage: 90, tested_q: "Q-1", evidence: "approved" },
];

export const V145P_RLS_EXTENDED = [
  { table: "v145_operating_excellence_scores",
    snippet: `create policy "v145_opex_admin_select" on v145_operating_excellence_scores
for select to authenticated using (
  has_role(auth.uid(), company_id, 'admin') or is_platform_owner(auth.uid())
);` },
  { table: "board_execution_discipline_records",
    snippet: `create policy "v145_board_select_approved" on board_execution_discipline_records
for select to authenticated using (
  has_role(auth.uid(), company_id, 'board') and approved = true
);
create policy "v145_board_write_chiefstaff" on board_execution_discipline_records
for insert to authenticated with check (
  has_role(auth.uid(), company_id, 'chief_of_staff')
);` },
  { table: "strategic_capital_discipline_records",
    snippet: `create policy "v145_capital_exec_select" on strategic_capital_discipline_records
for select to authenticated using (
  has_role(auth.uid(), company_id, 'cfo') or has_role(auth.uid(), company_id, 'ceo')
);
create policy "v145_capital_cfo_write" on strategic_capital_discipline_records
for insert to authenticated with check (has_role(auth.uid(), company_id, 'cfo'));` },
  { table: "marketplace_economics_scale_records",
    snippet: `create policy "v145_mp_lead_manage" on marketplace_economics_scale_records
for all to authenticated using (has_role(auth.uid(), company_id, 'mp_lead'))
with check (has_role(auth.uid(), company_id, 'mp_lead'));` },
  { table: "capital_evidence_discipline_records",
    snippet: `create policy "v145_evidence_exec_only" on capital_evidence_discipline_records
for select to authenticated using (
  has_role(auth.uid(), company_id, 'ceo') or has_role(auth.uid(), company_id, 'cfo')
);` },
];

export const V145P_EDGE_EXTENDED = [
  { boundary: "ServerFn", name: "calculate-v145-operating-excellence-score", caller: "Internal CEO dashboard",   auth: "requireSupabaseAuth + admin/ceo", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate-strategic-capital-discipline",    caller: "Internal CFO console",     auth: "requireSupabaseAuth + cfo",       returns: "DTO" },
  { boundary: "ServerFn", name: "calculate-revenue-durability-execution",    caller: "Internal RevOps view",     auth: "requireSupabaseAuth + revops",    returns: "DTO" },
  { boundary: "ServerFn", name: "calculate-marketplace-scale-control-score", caller: "Internal MP console",      auth: "requireSupabaseAuth + mp_lead",   returns: "DTO" },
  { boundary: "ServerFn", name: "calculate-board-execution-discipline",      caller: "Internal board admin",     auth: "requireSupabaseAuth + chief_of_staff", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate-long-term-performance-management",caller: "Internal exec performance",auth: "requireSupabaseAuth + ceo/cfo",   returns: "DTO" },
  { boundary: "Edge",     name: "/api/public/v145/board-digest",             caller: "External board portal",    auth: "HMAC signature + nonce + TTL",    returns: "Signed JSON digest (no PII)" },
  { boundary: "Edge",     name: "/api/public/v145/data-room-digest",         caller: "Investor / acquirer",      auth: "HMAC signature + scoped token",   returns: "Signed JSON digest (no PII)" },
  { boundary: "Edge",     name: "/api/public/v145/operating-excellence-digest", caller: "External board export", auth: "HMAC signature + TTL",            returns: "Signed JSON digest (no PII)" },
];

export const V145P_DEMO_FLOW = [
  { step: 1, actor: "CEO",        surface: "/v145/overview",   action: "Open Operating Excellence",      expect: "Headline + OpEx 93%, 5 area scores",     outcome: "Confirms top 2 drags + named owners" },
  { step: 2, actor: "CFO",        surface: "/v145/capital",    action: "Open Capital Discipline",        expect: "6 actions, 1 at-risk, evidence 84%",     outcome: "Approves data-room push to 85%" },
  { step: 3, actor: "RevOps",     surface: "/v145/rev-exec",   action: "Open Revenue Durability Exec",   expect: "8 actions, 2 evidence items overdue",    outcome: "Re-assigns evidence refresh by T+10d" },
  { step: 4, actor: "MP Lead",    surface: "/v145/mp-scale",   action: "Open Marketplace Economics Scale", expect: "TX/MW ready, SE density 62",            outcome: "Triggers SE carrier expansion sprint" },
  { step: 5, actor: "PMM",        surface: "/v145/proofs",     action: "Open Category Proof Execution",  expect: "12 proof types, 1 draft, 1 review",      outcome: "Schedules 4 marketplace proof assets" },
  { step: 6, actor: "ChiefStaff", surface: "/v145/board",      action: "Open Board Execution Discipline",expect: "82% completion, 2 overdue",              outcome: "Drives 2 overdue actions to close T+5d" },
  { step: 7, actor: "Partner",    surface: "/v145/partners",   action: "Open Partner Value Execution",   expect: "Telematics strong; API partner gap",     outcome: "Approves API partner #2 enablement" },
  { step: 8, actor: "COO",        surface: "/v145/op-controls",action: "Open Operating Controls Matrix", expect: "12 controls, 2 watch (MP, Diligence)",   outcome: "Books Q0 testing for the 2 watch items" },
  { step: 9, actor: "CEO",        surface: "/v145/lt-perf",    action: "Open Long-Term Performance",     expect: "LT score 84, +2 QoQ, 3 gaps",            outcome: "Confirms LT roadmap for next QBR" },
  { step: 10,actor: "Board",      surface: "/api/public/v145/board-digest", action: "Receive signed digest", expect: "HMAC + nonce + TTL",                 outcome: "External board sees no-PII signed pack" },
];

export const V145P_DEMO_OUTCOMES = [
  "Top-3 blockers visible at CEO level with named owners and due dates",
  "Capital evidence + data room readiness measurable, not narrative",
  "Marketplace economics gap (SE density) tied to a concrete sprint",
  "Board execution discipline visible — completion %, overdue count, evidence freshness",
  "External signed digests are the ONLY public surface — no PII leaves the tenant",
];
