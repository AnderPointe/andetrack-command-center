// Phase 36 — V11.5 enterprise revenue optimization. Mock-only.
// No autonomous dispatch. No IPO/M&A/certification claims.

export const V115_FEATURE_MATRIX = [
  { area: "Revenue Optimization CC",     ga: "ready",   notes: "Cross-lever optimization view" },
  { area: "Commercial Operating Maturity", ga: "ready", notes: "Operating model scorecards" },
  { area: "Strategic Customer Expansion",ga: "ready",   notes: "Account growth orchestration" },
  { area: "Customer Expansion Intelligence", ga: "beta",notes: "Signal scoring, mock" },
  { area: "Retention Risk CC",           ga: "ready",   notes: "Risk + save plays" },
  { area: "Partner Monetization Ops",    ga: "ready",   notes: "Partner P&L surfaces" },
  { area: "Capital-Ready Revenue Gov.",  ga: "beta",    notes: "Audit-grade reporting" },
  { area: "Pricing Optimization Gov.",   ga: "ready",   notes: "Discount + uplift policy" },
  { area: "Packaging Optimization",      ga: "ready",   notes: "SKU mix steering" },
  { area: "Deal Desk Discipline",        ga: "ready",   notes: "SLA + governance" },
  { area: "Trust-Led Procurement Accel.",ga: "ready",   notes: "Cycle compression" },
  { area: "Sales Engineering Scale",     ga: "beta",    notes: "Coverage + reuse" },
  { area: "Customer Proof Influence",    ga: "ready",   notes: "Proof → revenue attribution" },
  { area: "Marketplace Monetization Opt",ga: "ready",   notes: "Take-rate steering" },
  { area: "API/EDI Monetization Opt",    ga: "beta",    notes: "Metered tier optimization" },
  { area: "Board Commercial Reporting",  ga: "ready",   notes: "Quarterly pack" },
  { area: "Long-term Revenue Roadmap",   ga: "beta",    notes: "12-quarter horizon" },
];

export const V115_DEFERRED = [
  "Fully autonomous deal closure",
  "Autonomous discounting without human approval",
  "IPO/M&A execution claims",
  "Automated partner payout without finance review",
];

// Optimization summary
export const V115_REVENUE_OPTIMIZATION = {
  score: 81,
  trend_qoq: +6,
  levers_optimized: 14,
  levers_total: 18,
  net_revenue_uplift_pct: 8.4,
  revenue_quality_score: 79,
  expansion_readiness_pct: 84,
  partner_monetization_index: 76,
};

export const V115_OPT_LEVERS = [
  { lever: "Discount discipline",      uplift_pct: 1.9, status: "active",   owner: "Deal Desk" },
  { lever: "Premium packaging mix",    uplift_pct: 1.6, status: "active",   owner: "Pricing" },
  { lever: "Marketplace take-rate",    uplift_pct: 1.4, status: "active",   owner: "MP Ops" },
  { lever: "API metered tiers",        uplift_pct: 0.9, status: "tuning",   owner: "Product" },
  { lever: "Renewal uplift policy",    uplift_pct: 1.1, status: "active",   owner: "CS Ops" },
  { lever: "Partner sourced mix",      uplift_pct: 0.8, status: "active",   owner: "Partner" },
  { lever: "Expansion play attach",    uplift_pct: 0.7, status: "tuning",   owner: "RevOps" },
];

// Commercial operating maturity
export const V115_COMMERCIAL_OPERATING = [
  { axis: "Forecast accuracy",     score: 84, status: "ready" },
  { axis: "Pipeline hygiene",      score: 79, status: "ready" },
  { axis: "Win/loss discipline",   score: 72, status: "at_risk" },
  { axis: "Renewal motion",        score: 86, status: "ready" },
  { axis: "Expansion motion",      score: 77, status: "ready" },
  { axis: "Quote-to-cash SLA",     score: 81, status: "ready" },
  { axis: "Partner motion",        score: 74, status: "at_risk" },
];

export const V115_COMMERCIAL_OPERATING_SUMMARY = {
  score: 79,
  forecast_confidence_pct: 82,
  hygiene_compliance_pct: 91,
  manager_cadence_pct: 88,
};

// Strategic customer expansion
export const V115_STRATEGIC_EXPANSION = {
  score: 78,
  active_plans: 22,
  pipeline_usd: 14_800_000,
  qbr_coverage_pct: 92,
};
export const V115_EXPANSION_INTELLIGENCE = [
  { account: "NorthLine Freight",  signal: "Volume +28% QoQ",        score: 87, play: "Premium tier + EDI add-on", owner: "AE-12" },
  { account: "Cascade Logistics",  signal: "Marketplace usage spike",score: 81, play: "MP take-rate uplift",       owner: "AE-04" },
  { account: "Ridgeway Carriers",  signal: "Renewal-90 + adoption ↑",score: 76, play: "3-yr renewal w/ uplift",    owner: "AE-09" },
  { account: "BluePeak Shippers",  signal: "API calls 2x plan",      score: 84, play: "API metered upgrade",       owner: "AE-21" },
  { account: "Summit Bulk",        signal: "Trust packet refreshed", score: 69, play: "Procurement acceleration",  owner: "AE-07" },
];
export const V115_ACCOUNT_GROWTH_PLAN = {
  account: "NorthLine Freight",
  arr_now: 1_200_000,
  arr_target_q4: 1_800_000,
  workstreams: [
    { name: "Premium tier upgrade",    owner: "AE-12",    status: "in_flight",  due: "2026-09" },
    { name: "EDI metered add-on",      owner: "SE-03",    status: "scoped",     due: "2026-10" },
    { name: "Trust packet refresh",    owner: "Sec Ops",  status: "ready",      due: "2026-08" },
    { name: "Exec QBR — CFO sponsor",  owner: "CRO",      status: "in_flight",  due: "2026-08" },
  ],
};

export const V115_EXPANSION_PROGRAM = {
  whitespace_arr_usd: 6_300_000,
  sponsor_coverage_pct: 83,
  multithreaded_accounts: 17,
  plan_quality_score: 81,
};

// Renewal & expansion discipline
export const V115_RENEWAL_DISCIPLINE = [
  { quarter: "2026-Q3", renewals_due: 38, on_track: 31, at_risk: 5, churned: 2, grr_pct: 95, nrr_pct: 121 },
  { quarter: "2026-Q4", renewals_due: 44, on_track: 36, at_risk: 6, churned: 2, grr_pct: 94, nrr_pct: 123 },
];

// Retention risk
export const V115_RETENTION_RISK = [
  { account: "Lone Star Trans",   risk: "high",   reason: "Adoption -22%",          owner: "CSM-02", save_play: "Exec sponsor + roadmap session" },
  { account: "Pacific Cross",     risk: "medium", reason: "Sponsor change",          owner: "CSM-05", save_play: "Re-onboard new sponsor" },
  { account: "Granite Hauling",   risk: "medium", reason: "Support ticket spike",    owner: "CSM-01", save_play: "TAM engagement" },
  { account: "Iron Range Bulk",   risk: "low",    reason: "Pricing inquiry",         owner: "CSM-07", save_play: "Value review" },
];

export const V115_RETENTION_RISK_SUMMARY = {
  high: 1,
  medium: 2,
  low: 1,
  save_coverage_pct: 93,
  grr_outlook: "94%",
};

// Partner ecosystem monetization
export const V115_PARTNER_MONETIZATION = {
  partner_arr_share_pct: 21,
  partner_sourced_pct: 28,
  active_partners: 34,
  paying_marketplace_partners: 19,
};
export const V115_PARTNER_REVENUE_OPS = [
  { partner: "FreightHub",      sourced_arr: 320_000, influenced_arr: 540_000, payout_due: 32_000, status: "on_track" },
  { partner: "LogiBridge",      sourced_arr: 210_000, influenced_arr: 410_000, payout_due: 21_000, status: "on_track" },
  { partner: "TrustWare",       sourced_arr: 180_000, influenced_arr: 290_000, payout_due: 18_000, status: "review" },
  { partner: "EDIConnect Co.",  sourced_arr: 140_000, influenced_arr: 230_000, payout_due: 14_000, status: "on_track" },
];

export const V115_PARTNER_REVENUE_SUMMARY = {
  influenced_pipeline_usd: 4_200_000,
  payout_accuracy_pct: 98,
  co_sell_win_rate_pct: 39,
  recruited_this_qtr: 6,
};

// Capital-ready revenue governance
export const V115_CAPITAL_READY_REVENUE = [
  { axis: "Audit-grade revenue recognition", score: 86, status: "ready" },
  { axis: "Concentration risk monitoring",   score: 74, status: "at_risk" },
  { axis: "Cohort retention reporting",      score: 82, status: "ready" },
  { axis: "Revenue quality scorecard",       score: 79, status: "ready" },
  { axis: "Deferred revenue hygiene",        score: 88, status: "ready" },
  { axis: "Forecast confidence intervals",   score: 71, status: "at_risk" },
];

export const V115_REVENUE_QUALITY = [
  { metric: "Recurring revenue share", score: 91, status: "ready", note: "Subscription + marketplace recurring mix holding above plan" },
  { metric: "Gross margin quality", score: 76, status: "at_risk", note: "Services mix still elevated in enterprise expansions" },
  { metric: "Deferred revenue coverage", score: 88, status: "ready", note: "Strong forward visibility with onboarding converted faster" },
  { metric: "Forecast confidence", score: 71, status: "at_risk", note: "Commit hygiene improving but upside still volatile" },
];

// Pricing & packaging optimization
export const V115_PRICING_OPTIMIZATION = [
  { policy: "Max discount tier 3",     limit_pct: 12, breach_30d: 2, owner: "Deal Desk" },
  { policy: "Multi-year uplift floor", limit_pct: 4,  breach_30d: 0, owner: "Pricing" },
  { policy: "Marketplace take floor",  limit_pct: 8,  breach_30d: 1, owner: "MP Ops" },
  { policy: "API tier discount cap",   limit_pct: 10, breach_30d: 0, owner: "Product" },
];

export const V115_PRICING_SUMMARY = {
  governed_deals_pct: 96,
  exception_rate_pct: 7,
  breach_recovery_pct: 75,
  avg_approved_discount_pct: 8.9,
};
export const V115_PACKAGING_OPTIMIZATION = [
  { sku: "Core platform",       attach_pct: 100, arr_share_pct: 54, trend: "+1.2" },
  { sku: "Premium support",     attach_pct: 41,  arr_share_pct: 8,  trend: "+0.6" },
  { sku: "API metered",         attach_pct: 33,  arr_share_pct: 11, trend: "+0.9" },
  { sku: "EDI metered",         attach_pct: 26,  arr_share_pct: 7,  trend: "+0.4" },
  { sku: "Marketplace take",    attach_pct: 62,  arr_share_pct: 14, trend: "+1.1" },
  { sku: "Onboarding services", attach_pct: 78,  arr_share_pct: 6,  trend: "+0.2" },
];

export const V115_PACKAGING_SUMMARY = {
  premium_mix_pct: 37,
  attach_growth_qoq: "+1.0",
  sku_rationalization_score: 74,
  monetization_depth_pct: 69,
};

// Deal desk + enterprise execution
export const V115_DEAL_DESK_DISCIPLINE = {
  sla_target_hrs: 24, sla_actual_hrs: 19,
  open: 12, approved_30d: 41, blocked: 3,
  policy_compliance_pct: 94,
};
export const V115_ENTERPRISE_DEAL_EXECUTION = [
  { stage: "Discovery",   count: 22, win_rate_pct: 64 },
  { stage: "Validation",  count: 18, win_rate_pct: 58 },
  { stage: "Trust review",count: 14, win_rate_pct: 71 },
  { stage: "Procurement", count: 11, win_rate_pct: 76 },
  { stage: "Close",       count:  7, win_rate_pct: 83 },
];

export const V115_DEAL_EXECUTION_SUMMARY = {
  median_cycle_days: 43,
  trust_stage_win_rate_pct: 71,
  procurement_escape_pct: 82,
  multi_threaded_deals_pct: 68,
};

// Trust-led procurement
export const V115_PROCUREMENT_ACCEL = {
  avg_cycle_days_baseline: 64,
  avg_cycle_days_now: 41,
  packets_refreshed_30d: 17,
  open: 9,
  trust_acceptance_pct: 78,
};

// Sales engineering scale
export const V115_SE_SCALE = [
  { area: "Coverage ratio",   score: 78, status: "ready" },
  { area: "Reusable assets",  score: 84, status: "ready" },
  { area: "POC win rate",     score: 71, status: "at_risk" },
  { area: "Trust deliverables", score: 86, status: "ready" },
];

export const V115_SE_SUMMARY = {
  coverage_pct: 78,
  reuse_pct: 64,
  trust_pack_hit_rate_pct: 81,
  active_pocs: 9,
};

// Customer proof revenue influence
export const V115_PROOF_INFLUENCE = [
  { proof: "NorthLine ROI case",     used_in_deals: 14, influenced_arr: 920_000 },
  { proof: "Cascade peak season",    used_in_deals: 11, influenced_arr: 640_000 },
  { proof: "Ridgeway compliance",    used_in_deals: 9,  influenced_arr: 510_000 },
  { proof: "BluePeak API success",   used_in_deals: 8,  influenced_arr: 470_000 },
];

// Marketplace + API/EDI monetization optimization
export const V115_MP_MONETIZATION_OPT = {
  take_rate_pct: 6.8, target_pct: 7.5,
  gmv_qtd_usd: 18_200_000,
  active_buyers: 312, active_sellers: 144,
  monetized_routes_pct: 48,
};
export const V115_API_EDI_MONETIZATION_OPT = {
  api_arr_usd: 780_000, api_arr_target: 950_000,
  edi_arr_usd: 540_000, edi_arr_target: 600_000,
  metered_overage_share_pct: 17,
  expansion_attach_pct: 29,
};

// Board reporting + roadmap
export const V115_BOARD_COMMERCIAL = [
  { section: "Revenue performance",   owner: "CFO",  status: "ready" },
  { section: "Optimization levers",   owner: "CRO",  status: "ready" },
  { section: "Retention & expansion", owner: "CCO",  status: "ready" },
  { section: "Partner monetization",  owner: "CRO",  status: "review" },
  { section: "Capital readiness",     owner: "CFO",  status: "ready" },
  { section: "Risk & concentration",  owner: "CRO",  status: "review" },
];

export const V115_BOARD_SUMMARY = {
  packet_readiness_pct: 89,
  open_decisions: 4,
  revenue_quality_status: "ready",
  concentration_watch: "medium",
};
export const V115_ROADMAP = [
  { quarter: "2026-Q3", theme: "Discount discipline + packaging mix" },
  { quarter: "2026-Q4", theme: "Renewal uplift + partner P&L" },
  { quarter: "2027-Q1", theme: "API/EDI metered tier expansion" },
  { quarter: "2027-Q2", theme: "Capital-ready reporting hardening" },
  { quarter: "2027-Q3", theme: "Marketplace take-rate steering" },
  { quarter: "2027-Q4", theme: "Long-horizon optimization automation (human-approved)" },
];

export const V115_ROADMAP_PRIORITIES = [
  { horizon: "Now", priority: "Stabilize discount discipline and renewal saves", owner: "CRO", status: "ready" },
  { horizon: "Next", priority: "Lift partner-sourced share and API/EDI attach", owner: "Partner + Product", status: "in_review" },
  { horizon: "Later", priority: "Harden capital-ready reporting and board governance", owner: "CFO", status: "ready" },
];

// Trend + KPIs + risk + cadence + role guidance + close-out
export const V115_OPT_TREND = [
  { quarter: "2025-Q4", actual: 70, target: 75 },
  { quarter: "2026-Q1", actual: 73, target: 76 },
  { quarter: "2026-Q2", actual: 76, target: 78 },
  { quarter: "2026-Q3", actual: 81, target: 80 },
];
export const V115_OUTCOME_KPIS = [
  { metric: "ARR ($M)",                 target: 4.6, actual: 4.4, tone: "warn" },
  { metric: "NRR (%)",                  target: 122, actual: 124, tone: "good" },
  { metric: "GRR (%)",                  target: 93,  actual: 94,  tone: "good" },
  { metric: "Win rate (%)",             target: 36,  actual: 34,  tone: "warn" },
  { metric: "Discount discipline (%)",  target: 92,  actual: 94,  tone: "good" },
  { metric: "Partner-sourced share (%)",target: 30,  actual: 28,  tone: "warn" },
  { metric: "Procurement cycle (days)", target: 45,  actual: 41,  tone: "good" },
];
export const V115_REVENUE_RISK_HEATMAP = [
  { risk: "Top-3 concentration",   likelihood: "medium", impact: "high",   owner: "CFO",  mitigation: "Diversify pipeline + named-account caps" },
  { risk: "Discount drift",        likelihood: "medium", impact: "medium", owner: "Deal Desk", mitigation: "Policy enforcement + alerts" },
  { risk: "Partner payout dispute",likelihood: "low",    impact: "medium", owner: "Partner", mitigation: "Audit logs + reconciliation" },
  { risk: "Renewal slippage",      likelihood: "medium", impact: "high",   owner: "CCO",  mitigation: "Save plays + exec sponsor" },
  { risk: "API tier mispricing",   likelihood: "low",    impact: "medium", owner: "Product", mitigation: "Quarterly review" },
  { risk: "Forecast miss",         likelihood: "medium", impact: "high",   owner: "RevOps", mitigation: "Confidence intervals + commit hygiene" },
];
export const V115_EXEC_CADENCE = [
  { cadence: "Weekly RevOps",          attendees: "CRO, RevOps, Deal Desk", inputs: "Pipeline hygiene, deal desk SLA, discount breaches" },
  { cadence: "Monthly optimization",   attendees: "CRO, CFO, Pricing, MP",  inputs: "Lever performance, packaging mix, take-rate" },
  { cadence: "Quarterly board commercial", attendees: "CEO, CFO, CRO, Board", inputs: "Performance, retention, partner, capital readiness" },
  { cadence: "Quarterly capital readiness", attendees: "CEO, CFO, Audit",   inputs: "Rev rec, concentration, cohort, forecast confidence" },
];
export const V115_ROLE_GUIDANCE = [
  { role: "CRO",       tone: "violet",  focus: "Lever performance, win rate, partner mix" },
  { role: "CFO",       tone: "sky",     focus: "Capital readiness, concentration, rev quality" },
  { role: "CCO",       tone: "emerald", focus: "Retention, expansion, save plays" },
  { role: "Deal Desk", tone: "amber",   focus: "Discount discipline, SLA, policy breaches" },
  { role: "Partner",   tone: "rose",    focus: "Sourced mix, payouts, marketplace partners" },
];
export const V115_DEMO_CLOSEOUT = [
  { role: "CRO",      commitment: "Approve discount discipline policy update",    due: "2026-08-15" },
  { role: "CFO",      commitment: "Sign off capital-ready reporting baseline",     due: "2026-08-22" },
  { role: "CCO",      commitment: "Launch top-10 save play sprint",                due: "2026-08-12" },
  { role: "RevOps",   commitment: "Publish weekly optimization scorecard",         due: "2026-08-08" },
  { role: "Pricing",  commitment: "Pilot premium packaging uplift on 5 accounts",  due: "2026-08-29" },
  { role: "Partner",  commitment: "Reconcile FY partner payouts with Finance",     due: "2026-09-05" },
  { role: "CEO",      commitment: "Endorse V11.5 optimization plan at board",      due: "2026-09-12" },
];

// Executive headline + overlays + boundary
export const V115_EXEC_HEADLINE = {
  status: "amber" as const,
  headline: "V11.5 optimization score 81 · uplift +8.4% · partner mix below target",
  detail: "Discount discipline and packaging mix are on plan; partner-sourced share is 2pts below target and forecast confidence needs tightening.",
  signals: [
    { label: "Optimization", value: "81%", tone: "good" as const },
    { label: "NRR",          value: "124%", tone: "good" as const },
    { label: "Partner mix",  value: "28%", tone: "warn" as const },
    { label: "Procurement",  value: "41d", tone: "good" as const },
  ],
  next_decision: { who: "CRO + CFO", what: "Approve partner mix push + forecast confidence tightening", due: "2026-08-15" },
};
export const V115_EXECUTION_OVERLAYS = [
  { area: "Revenue optimization", role: "CRO",  focus: "14/18 levers active, +8.4% uplift",        decision: "Approve discount discipline policy update" },
  { area: "Capital readiness",    role: "CFO",  focus: "Concentration + forecast confidence soft",  decision: "Sign off baseline + tighten intervals" },
  { area: "Retention",            role: "CCO",  focus: "94% GRR, 4 high-risk accounts",             decision: "Launch top-10 save play sprint" },
  { area: "Partner monetization", role: "Partner", focus: "Sourced 28% vs 30% target",              decision: "Reconcile payouts + push co-sell program" },
];
export const V115_BACKEND_BOUNDARY = [
  { kind: "server fn",    name: "calculate-revenue-optimization-score", caller: "app",     auth: "requireSupabaseAuth + admin" },
  { kind: "server fn",    name: "generate-capital-ready-revenue-report",caller: "app",     auth: "requireSupabaseAuth + admin" },
  { kind: "server fn",    name: "calculate-retention-risk-scores",      caller: "app",     auth: "requireSupabaseAuth" },
  { kind: "server fn",    name: "calculate-partner-payouts",            caller: "app",     auth: "requireSupabaseAuth + admin" },
  { kind: "server fn",    name: "enforce-pricing-policy",               caller: "app",     auth: "requireSupabaseAuth + deal-desk" },
  { kind: "public route", name: "POST /api/public/webhooks/partner-payment-confirm", caller: "partner billing", auth: "HMAC" },
  { kind: "public route", name: "POST /api/public/webhooks/marketplace-take-event",  caller: "MP processor",    auth: "HMAC" },
  { kind: "public route", name: "POST /api/public/cron/refresh-v115-optimization",   caller: "scheduler",       auth: "HMAC" },
];

export const V115_RLS_EXAMPLES = [
  { table: "revenue_optimization_levers", policy: "select", expression: "is_platform_owner(auth.uid()) OR has_role(auth.uid(), current_company(), 'admin')" },
  { table: "capital_ready_reports",       policy: "select", expression: "is_platform_owner(auth.uid())" },
  { table: "retention_risk_accounts",     policy: "select", expression: "is_company_member(auth.uid(), company_id)" },
  { table: "partner_payouts",             policy: "select", expression: "has_role(auth.uid(), current_company(), 'admin') OR partner_user_id = auth.uid()" },
  { table: "pricing_policy_breaches",     policy: "insert", expression: "has_role(auth.uid(), current_company(), 'admin')" },
  { table: "board_commercial_packets",    policy: "select", expression: "is_platform_owner(auth.uid()) OR has_role(auth.uid(), current_company(), 'admin')" },
  { table: "expansion_account_plans",     policy: "update", expression: "is_company_member(auth.uid(), company_id) AND has_role(auth.uid(), current_company(), 'admin')" },
];

export const V115_DEMO_FLOW = [
  { role: "CRO",       step: "Open Optimization CC — review lever performance + trend" },
  { role: "RevOps",    step: "Walk through commercial operating maturity scorecards" },
  { role: "CCO",       step: "Strategic expansion + intelligence signals → next plays" },
  { role: "CSM",       step: "Retention risk CC — assign save plays to top 5 risks" },
  { role: "Deal Desk", step: "Discount discipline + policy breaches review" },
  { role: "Pricing",   step: "Pricing + packaging optimization steering" },
  { role: "Security",  step: "Trust-led procurement acceleration — packets refreshed" },
  { role: "SE Lead",   step: "Sales engineering scale — coverage + reuse" },
  { role: "Partner",   step: "Partner monetization ops + payout review" },
  { role: "MP Ops",    step: "Marketplace + API/EDI monetization optimization" },
  { role: "CFO",       step: "Capital-ready revenue governance + concentration risk" },
  { role: "CRO",       step: "Board commercial reporting + long-term roadmap" },
  { role: "CEO",       step: "Sign-off V11.5 optimization plan + cadence" },
];

export const V115_REPORTS = [
  { id: "rpt-opt-lever",    name: "Optimization lever performance" },
  { id: "rpt-capital",      name: "Capital-ready revenue scorecard" },
  { id: "rpt-retention",    name: "Retention risk + saves" },
  { id: "rpt-partner-pl",   name: "Partner P&L + payouts" },
  { id: "rpt-pricing",      name: "Pricing policy compliance" },
  { id: "rpt-packaging",    name: "Packaging mix + attach" },
  { id: "rpt-mp-take",      name: "Marketplace take-rate steering" },
  { id: "rpt-api-edi",      name: "API/EDI monetization tiers" },
  { id: "rpt-board",        name: "Board commercial performance" },
];

export const V115_REPORT_DISTRIBUTION = [
  { report: "Optimization lever performance", audience: "CRO, RevOps", cadence: "Weekly", status: "ready" },
  { report: "Capital-ready revenue scorecard", audience: "CEO, CFO, Board", cadence: "Monthly", status: "ready" },
  { report: "Retention risk + saves", audience: "CCO, CSM leaders", cadence: "Weekly", status: "ready" },
  { report: "Partner P&L + payouts", audience: "Partner, Finance", cadence: "Monthly", status: "in_review" },
  { report: "Board commercial performance", audience: "Board", cadence: "Quarterly", status: "ready" },
];
