// Phase 40 polish — V13.5 enterprise value creation maturity additions.
// Additive only. Mock-only. No autonomous dispatch, no final IPO/audit claims.

export const V135_VALUE_MATURITY = {
  score: 81,
  trend_qoq: +4,
  pillars: [
    { pillar: "Capital strategy execution",   pct: 82 },
    { pillar: "Revenue durability governance", pct: 84 },
    { pillar: "Marketplace economics",         pct: 71 },
    { pillar: "Board strategic OS",            pct: 88 },
    { pillar: "Value driver management",       pct: 78 },
    { pillar: "Concentration reduction",       pct: 68 },
    { pillar: "Partner value optimization",    pct: 77 },
    { pillar: "Product-line value",            pct: 73 },
    { pillar: "Commercial diligence maturity", pct: 85 },
    { pillar: "Capital evidence maturity",     pct: 80 },
  ],
};

export const V135_VALUE_TRENDS = [
  { q: "Q-3", maturity: 71, capital: 74, durability: 76, board: 80 },
  { q: "Q-2", maturity: 74, capital: 77, durability: 79, board: 83 },
  { q: "Q-1", maturity: 78, capital: 80, durability: 82, board: 86 },
  { q: "Q-0", maturity: 81, capital: 82, durability: 84, board: 88 },
];

export const V135_CAPITAL_STRATEGY = {
  score: 82,
  pillars: [
    { lever: "Operating leverage",     status: "tracking",   owner: "CFO" },
    { lever: "Gross margin expansion", status: "tracking",   owner: "CFO" },
    { lever: "Working-capital cycle",  status: "tracking",   owner: "CFO" },
    { lever: "Cash conversion",        status: "watch",      owner: "CFO" },
    { lever: "Capital allocation",     status: "tracking",   owner: "CEO+CFO" },
    { lever: "Strategic investments",  status: "in_review",  owner: "Board" },
  ],
  milestones: [
    { milestone: "Lock Q+1 capital plan",       owner: "CFO", due: "this Q" },
    { milestone: "Refresh capital narrative",   owner: "CFO", due: "this Q" },
    { milestone: "Board capital allocation OK", owner: "Board", due: "next Q" },
  ],
};

export const V135_VALUE_DRIVERS = [
  { driver: "ARR growth %",        weight: 25, value: "+34%", trend: "up",   note: "Durable; expansion-led" },
  { driver: "NRR",                 weight: 20, value: "118%", trend: "up",   note: "Above peer median" },
  { driver: "Gross margin %",      weight: 15, value: "72%",  trend: "flat", note: "Lever: infra unit cost" },
  { driver: "Top-10 concentration", weight: 10, value: "36%",  trend: "down", note: "4-logo diversification" },
  { driver: "MP take rate",        weight: 10, value: "12%",  trend: "flat", note: "Watch compression" },
  { driver: "Payback (months)",    weight: 10, value: "11",   trend: "down", note: "Improving" },
  { driver: "Magic number",        weight:  5, value: "1.4",  trend: "up",   note: "Healthy" },
  { driver: "Rule of 40",          weight:  5, value: "46",   trend: "up",   note: "Sustained" },
];

export const V135_STRATEGIC_INVESTMENTS = [
  { investment: "MP economics optimization",   thesis: "Lift lane GM 100bps",     stage: "fund", owner: "MP Ops" },
  { investment: "Strategic logo program",      thesis: "Diversify top-10",        stage: "fund", owner: "CRO" },
  { investment: "API/EDI metered evidence",    thesis: "Audit-ready metering",    stage: "scope", owner: "RevOps" },
  { investment: "Partner attribution upgrade", thesis: "Defensible sourcing",     stage: "scope", owner: "PartnerOps" },
  { investment: "Board decision automation",   thesis: "Cycle-time + audit log",  stage: "design", owner: "BoardOps" },
];

export const V135_CONCENTRATION_REDUCTION = {
  top10_pct: 36, target_pct: 28, gap_pct: 8,
  plays: [
    { play: "Acquire 4 strategic logos",     owner: "CRO", impact: "−5pp",  due: "this Q" },
    { play: "Expand 3 mid-tier accounts",    owner: "CRO", impact: "−2pp",  due: "this Q" },
    { play: "Diversify 2 channels",          owner: "PartnerOps", impact: "−1pp", due: "next Q" },
  ],
};

export const V135_PRODUCT_LINE_VALUE = [
  { line: "Core SaaS",      arr_m: 14.2, gm_pct: 78, durability: 86 },
  { line: "Marketplace",    arr_m:  3.6, gm_pct: 62, durability: 71 },
  { line: "API/EDI metered", arr_m: 1.2, gm_pct: 74, durability: 66 },
  { line: "Partner-sourced", arr_m: 2.4, gm_pct: 70, durability: 79 },
];

export const V135_MP_UNIT_ECONOMICS = {
  note: "Placeholder unit economics — illustrative, not audited.",
  rows: [
    { metric: "Avg lane revenue",         value: "$1,820" },
    { metric: "Avg lane variable cost",   value: "$1,488" },
    { metric: "Avg lane contribution",    value: "$332" },
    { metric: "Contribution margin %",    value: "18.2%" },
    { metric: "Lanes per active carrier", value: "11.4" },
    { metric: "Payback per onboarded carrier", value: "1.8 mo" },
  ],
};

export const V135_BOARD_DECISIONS = [
  { decision: "Hold MP take-rate at 12%",        owner: "Board", cadence: "quarterly", evidence: "MP econ pack",     status: "logged" },
  { decision: "Approve strategic logo program",   owner: "Board", cadence: "this Q",    evidence: "Concentration",    status: "logged" },
  { decision: "Defer IPO milestones to V14",      owner: "Board", cadence: "long-horizon", evidence: "Capital plan",  status: "logged" },
  { decision: "Fund metered evidence pipeline",   owner: "Board", cadence: "this Q",    evidence: "API/EDI",          status: "in_review" },
];

export const V135_EXEC_CADENCE = [
  { ritual: "Weekly value-creation huddle",  owner: "CEO+CFO+CRO", cadence: "weekly",    output: "Action log" },
  { ritual: "Monthly capital strategy review", owner: "CFO",       cadence: "monthly",   output: "Capital memo" },
  { ritual: "Monthly durability sync",       owner: "CRO+CS Ops",  cadence: "monthly",   output: "Durability brief" },
  { ritual: "Quarterly board strategic OS",  owner: "Board",       cadence: "quarterly", output: "Decision log" },
  { ritual: "Quarterly risk durability review", owner: "Board",    cadence: "quarterly", output: "Risk register update" },
];

export const V135_VALUE_REALIZATION = {
  realized_pct: 64, in_flight_pct: 22, at_risk_pct: 14,
  programs: [
    { program: "GM expansion",            target: "+150bps", realized: "+90bps",  status: "in_flight" },
    { program: "Concentration reduction", target: "−8pp",    realized: "−5pp",    status: "in_flight" },
    { program: "MP take-rate defense",    target: "hold 12%",realized: "hold",    status: "realized"   },
    { program: "API/EDI metered evidence", target: "audit-ready", realized: "draft", status: "at_risk" },
    { program: "Board decision auditability", target: "100%", realized: "88%",    status: "realized"   },
  ],
};

export const V135_STRATEGIC_RISK_EXECUTION = [
  { risk: "Concentration shock",         mitigation: "Strategic logo program",    owner: "CRO",   status: "in_flight" },
  { risk: "MP take-rate compression",    mitigation: "Lane mix + density",        owner: "MP Ops", status: "tracking" },
  { risk: "API/EDI metered drift",       mitigation: "Metered evidence pipeline", owner: "RevOps", status: "in_flight" },
  { risk: "Evidence freshness decay",    mitigation: "Quarterly refresh ritual",  owner: "Security", status: "tracking" },
  { risk: "Board cadence slippage",      mitigation: "Calendar lock + minutes",   owner: "BoardOps", status: "tracking" },
  { risk: "Investor narrative drift",    mitigation: "Capital narrative refresh", owner: "CFO",   status: "tracking" },
];

export const V135_LONG_TERM_ROADMAP = [
  { horizon: "H1 (this Q)",  theme: "Concentration reduction + capital plan lock", owner: "CRO+CFO" },
  { horizon: "H2 (next Q)",  theme: "MP economics + API/EDI metered evidence",     owner: "MP Ops+RevOps" },
  { horizon: "H3 (Q+2)",     theme: "Partner attribution upgrade",                  owner: "PartnerOps" },
  { horizon: "H4 (Q+3)",     theme: "Product-line value governance",                owner: "PM+CFO" },
  { horizon: "H5 (Q+4)",     theme: "Board decision automation",                    owner: "BoardOps" },
  { horizon: "H6 (Q+5)",     theme: "Long-horizon revenue intelligence maturity",   owner: "CRO+CFO" },
  { horizon: "H7 (Q+6)",     theme: "Capital diligence continuity hardening",       owner: "CFO" },
  { horizon: "H8 (Q+7)",     theme: "Enterprise value realization reporting",       owner: "CFO+CEO" },
];

export const V135_CAPITAL_EVIDENCE = [
  { evidence: "Capital plan memo",          freshness_d: 9,  owner: "CFO" },
  { evidence: "Capital allocation rationale", freshness_d: 14, owner: "CFO" },
  { evidence: "Operating leverage trend",    freshness_d: 21, owner: "CFO" },
  { evidence: "Cash conversion attestation", freshness_d: 30, owner: "CFO" },
  { evidence: "Strategic investment ledger", freshness_d: 18, owner: "Board" },
];

export const V135_RLS_SQL_SNIPPETS_EXT = [
  { table: "v135_value_drivers", sql:
`CREATE POLICY "v135_value_drivers_exec_read"
ON public.v135_value_drivers
FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'ceo')
  OR public.has_role(auth.uid(), 'cfo')
  OR public.has_role(auth.uid(), 'board_admin')
);` },
  { table: "v135_strategic_investments", sql:
`CREATE POLICY "v135_strategic_invest_board_write"
ON public.v135_strategic_investments
FOR ALL TO authenticated
USING (
  public.has_role(auth.uid(), 'board_admin')
  OR public.has_role(auth.uid(), 'cfo')
)
WITH CHECK (
  public.has_role(auth.uid(), 'board_admin')
  OR public.has_role(auth.uid(), 'cfo')
);` },
  { table: "v135_value_realization", sql:
`CREATE POLICY "v135_value_realization_org_read"
ON public.v135_value_realization
FOR SELECT TO authenticated
USING (org_id = (SELECT org_id FROM profiles WHERE id = auth.uid()));` },
];

export const V135_EDGE_VS_SERVERFN_EXT = [
  { kind: "ServerFn",    surface: "valueMaturityScorer",            example: "valueMaturity(orgId)",     why: "internal RPC, RLS-scoped" },
  { kind: "ServerFn",    surface: "capitalStrategyReader",          example: "capitalStrategy(orgId)",   why: "internal RPC, CFO/CEO only" },
  { kind: "ServerFn",    surface: "valueRealizationReader",         example: "valueRealization(orgId)",  why: "internal RPC, exec scope" },
  { kind: "Public TSS",  surface: "/api/public/v135/value-creation-digest", example: "POST signed digest", why: "external investor/acquirer webhook" },
  { kind: "Public TSS",  surface: "/api/public/v135/board-strategic-digest", example: "POST signed digest", why: "external board portal webhook" },
  { kind: "Inherited Edge Fn", surface: "supabase/functions/*",      example: "(none required)",          why: "kept only for legacy webhooks" },
];
