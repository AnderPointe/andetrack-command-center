// Phase 24 — V5.5 market leadership mock dataset.
// All numbers/placeholders; no real production claims.

export const V55_FEATURE_MATRIX = [
  { area: "Market leadership",        status: "in_progress" },
  { area: "Platform defensibility",   status: "in_progress" },
  { area: "Ecosystem monetization",   status: "in_progress" },
  { area: "Marketplace economics",    status: "in_progress" },
  { area: "National partnerships",    status: "in_progress" },
  { area: "Partner ecosystem scale",  status: "in_progress" },
  { area: "Enterprise operating model", status: "in_progress" },
  { area: "Board reporting",          status: "in_progress" },
  { area: "Product-line maturity",    status: "in_progress" },
  { area: "Retention & expansion",    status: "in_progress" },
  { area: "Category narrative",       status: "in_progress" },
  { area: "Competitive differentiation", status: "in_progress" },
  { area: "Certification evidence",   status: "in_progress" },
  { area: "Strategic risk mgmt",      status: "in_progress" },
  { area: "Long-term roadmap gov",    status: "in_progress" },
  { area: "Advanced data room",       status: "in_progress" },
  { area: "Platform reliability",     status: "in_progress" },
] as const;

export const V55_DEFERRED = [
  "Fully autonomous dispatch",
  "Autonomous vehicle workflows",
  "Global customs workflows",
  "International regulatory localization",
  "Insurance underwriting automation",
  "Final certification claims without evidence",
  "Guaranteed marketplace liquidity claims",
];

export const LEADERSHIP = {
  overall: 88,
  category: 84, product: 87, customer_proof: 82, marketplace: 78,
  partner_ecosystem: 80, enterprise: 89, security: 86, revenue: 83,
  operational: 85, brand: 76, competitive: 81, retention: 88,
  expansion: 79, partnerships: 82, investor: 84,
};

export const LEADERSHIP_TREND = [
  { q: "Q-3", score: 79 }, { q: "Q-2", score: 82 },
  { q: "Q-1", score: 85 }, { q: "Q0",  score: 88 },
];

export const LEADERSHIP_GAPS = [
  { area: "Brand maturity",       score: 76, action: "Launch category narrative push" },
  { area: "Marketplace maturity", score: 78, action: "Close SE coverage gap" },
  { area: "Expansion pipeline",   score: 79, action: "Activate 3 expansion plays" },
];

export const DEFENSIBILITY = {
  overall: 82,
  data_network: 79, marketplace_liquidity: 77, carrier_depth: 81,
  switching_costs: 86, integration: 84, enterprise_workflows: 88,
  compliance: 83, ai_ops: 78, mobile: 80, edi_api: 85,
  white_label: 82, multi_region: 81, partnerships: 79, brand: 75,
};

export const MOATS = [
  { id: "workflow",    name: "Workflow moat",     strength: 88, evidence: "Dispatch+EliteNav+Portal integrated flow", weakness: "Onboarding takes 3-5 weeks", investment: "Onboarding factory v2", risk: "Mid", timeline: "Q+1", owner: "Product",     value: "high" },
  { id: "data",        name: "Data moat",         strength: 75, evidence: "Lane/ETA history accumulating", weakness: "Need 3+ yr horizon", investment: "Data warehouse", risk: "Mid", timeline: "Q+2", owner: "Data",        value: "high" },
  { id: "marketplace", name: "Marketplace moat",  strength: 72, evidence: "Carrier liquidity in 6 regions", weakness: "SE coverage gap", investment: "Carrier recruiting", risk: "High", timeline: "Q+1", owner: "Marketplace", value: "high" },
  { id: "integration", name: "Integration moat",  strength: 84, evidence: "EDI + 8 telematics + API tiers", weakness: "Few preferred partners", investment: "Cert preferred program", risk: "Low", timeline: "Q+2", owner: "Integrations", value: "med" },
  { id: "compliance",  name: "Compliance moat",   strength: 83, evidence: "SOC 2 in audit", weakness: "ISO not started", investment: "Audit close-out", risk: "Low", timeline: "Q+1", owner: "Security",    value: "high" },
  { id: "brand",       name: "Brand moat",        strength: 70, evidence: "Limited national PR", weakness: "Awareness gap", investment: "Category PR", risk: "Mid", timeline: "Q+2", owner: "Marketing",   value: "med" },
  { id: "enterprise",  name: "Enterprise rel.",   strength: 86, evidence: "Top-10 logos signed", weakness: "Few exec sponsors", investment: "Sponsor program", risk: "Low", timeline: "Q+1", owner: "CS",          value: "high" },
  { id: "partner",     name: "Partner ecosystem", strength: 78, evidence: "12 active partners", weakness: "Shallow joint GTM", investment: "Joint launch program", risk: "Mid", timeline: "Q+2", owner: "Partnerships", value: "med" },
  { id: "mobile",      name: "Driver mobile",     strength: 80, evidence: "EliteNav adoption rising", weakness: "Android Auto not approved", investment: "Auto cert", risk: "Mid", timeline: "Q+1", owner: "Mobile",      value: "high" },
  { id: "portal",      name: "Customer portal",   strength: 83, evidence: "White-label live with 9 customers", weakness: "Few branded portals", investment: "Portal templates", risk: "Low", timeline: "Q+2", owner: "Product",     value: "med" },
  { id: "ai",          name: "AI operations",     strength: 76, evidence: "CoPilot rec engine in prod (human-approved)", weakness: "No proven accuracy benchmark", investment: "Eval harness", risk: "High", timeline: "Q+2", owner: "AI",          value: "high" },
];

export const REVENUE_LINES = [
  { line: "SaaS subscriptions",       arr: 5.2, growth: "+18%", maturity: "mature" },
  { line: "Usage-based billing",      arr: 1.1, growth: "+34%", maturity: "growing" },
  { line: "Driver/vehicle seats",     arr: 1.8, growth: "+22%", maturity: "mature" },
  { line: "Marketplace fees",         arr: 0.6, growth: "+72%", maturity: "early" },
  { line: "Carrier subscriptions",    arr: 0.3, growth: "+58%", maturity: "early" },
  { line: "API monetization",         arr: 0.4, growth: "+41%", maturity: "growing" },
  { line: "EDI transaction fees",     arr: 0.2, growth: "+15%", maturity: "early" },
  { line: "Partner revenue share",    arr: 0.15, growth: "+90%", maturity: "early" },
  { line: "Enterprise support",       arr: 0.9, growth: "+12%", maturity: "mature" },
  { line: "Implementation services",  arr: 0.7, growth: "+8%",  maturity: "mature" },
  { line: "Premium analytics",        arr: 0.25, growth: "+50%", maturity: "early" },
  { line: "White-label portal add-on",arr: 0.3, growth: "+45%", maturity: "growing" },
  { line: "Integration setup fees",   arr: 0.18, growth: "+10%", maturity: "growing" },
  { line: "Telematics add-on",        arr: 0.1, growth: "+25%", maturity: "early" },
];
export const MONETIZATION_SCORE = 79;

export const MP_ECONOMICS = {
  gmv_placeholder_usd_m: 42,
  take_rate_pct: 4.6,
  avg_load_value: 1850,
  avg_fee: 85,
  coverage_rate: 91,
  bids_per_load: 6.2,
  time_to_first_bid_min: 8,
  time_to_award_min: 38,
  cac_placeholder: 420,
  carrier_retention_pct: 81,
  customer_adoption_pct: 64,
  margin_placeholder_pct: 38,
};
export const MP_ECONOMICS_TREND = [
  { week: "W-3", take: 4.2, bids: 5.4, award: 52 },
  { week: "W-2", take: 4.4, bids: 5.8, award: 46 },
  { week: "W-1", take: 4.6, bids: 6.2, award: 38 },
];

export const NATIONAL_PARTNERSHIPS = [
  { id: "p1", name: "Samsara",      cat: "Telematics",   status: "launch_ready",     sponsor: "CTO",     value: "Joint dispatch dashboard", milestone: "GA Q+1" },
  { id: "p2", name: "Motive",       cat: "Telematics",   status: "launch_ready",     sponsor: "CTO",     value: "Driver HOS sync",          milestone: "GA Q+1" },
  { id: "p3", name: "WEX",          cat: "Fuel card",    status: "commercial_review",sponsor: "CFO",     value: "Per-trip fuel cost",       milestone: "Contract" },
  { id: "p4", name: "Big Broker",   cat: "Broker",       status: "blocked_security", sponsor: "CRO",     value: "Load injection",           milestone: "Security review" },
  { id: "p5", name: "Acme EDI",     cat: "EDI",          status: "integrating",      sponsor: "Product", value: "204/990/214",              milestone: "Pilot" },
  { id: "p6", name: "Apple/Google", cat: "Mobile",       status: "in_review",        sponsor: "Mobile",  value: "Auto/CarPlay",             milestone: "Approval" },
];

export const PARTNER_ECOSYSTEM = {
  active: 23, strategic: 6, revenue: 9, integration: 14, marketplace: 7,
  pipeline: 11, healthy: 18, at_risk: 3,
  partner_revenue_m: 0.9, joint_customers: 47, partner_leads_q: 38,
};

export const OPERATING_FUNCTIONS = [
  { fn: "Product",                 owner: "Head of Product",  cadence: "Weekly",  kpis: "Adoption, NPS", risks: "Roadmap slippage" },
  { fn: "Engineering",             owner: "VP Eng",           cadence: "Daily",   kpis: "Reliability, velocity", risks: "Tech debt" },
  { fn: "Customer success",        owner: "VP CS",            cadence: "Weekly",  kpis: "GRR/NRR",       risks: "Churn" },
  { fn: "Support",                 owner: "Support Lead",     cadence: "Daily",   kpis: "CSAT, MTTR",    risks: "Backlog" },
  { fn: "Implementation",          owner: "Impl Lead",        cadence: "Weekly",  kpis: "Time-to-value", risks: "Long onboard" },
  { fn: "Security & compliance",   owner: "CISO",             cadence: "Weekly",  kpis: "Findings, evidence", risks: "Audit findings" },
  { fn: "Revenue operations",      owner: "RevOps Lead",      cadence: "Weekly",  kpis: "Pipeline, ARR", risks: "Forecast miss" },
  { fn: "Marketplace operations",  owner: "MP Lead",          cadence: "Daily",   kpis: "Liquidity, coverage", risks: "SE gap" },
  { fn: "Carrier operations",      owner: "Carrier Lead",     cadence: "Weekly",  kpis: "Quality tiers", risks: "Watchlist growth" },
  { fn: "Partner operations",      owner: "Partner Lead",     cadence: "Weekly",  kpis: "Partner health", risks: "Inactive partners" },
  { fn: "Mobile operations",       owner: "Mobile Lead",      cadence: "Weekly",  kpis: "Crash-free, cert status", risks: "Auto/CarPlay" },
  { fn: "Integration operations",  owner: "Integrations",     cadence: "Weekly",  kpis: "Uptime, mapping accuracy", risks: "Partner outages" },
  { fn: "Data / AI governance",    owner: "AI Lead",          cadence: "Weekly",  kpis: "Approval rate, drift", risks: "Hallucination" },
  { fn: "Finance / admin",         owner: "CFO (placeholder)",cadence: "Monthly", kpis: "Cash, burn",    risks: "Forecast" },
];

export const OPERATING_CADENCES = [
  { cadence: "Daily ops review",            owner: "COO",   audience: "Ops",     duration: "15m" },
  { cadence: "Weekly marketplace review",   owner: "MP",    audience: "MP team", duration: "45m" },
  { cadence: "Weekly customer success",     owner: "CS",    audience: "CS",      duration: "45m" },
  { cadence: "Weekly support review",       owner: "Supp",  audience: "Supp",    duration: "30m" },
  { cadence: "Weekly product review",       owner: "Prod",  audience: "Prod+Eng",duration: "60m" },
  { cadence: "Monthly revenue review",      owner: "CRO",   audience: "Exec",    duration: "90m" },
  { cadence: "Monthly security review",     owner: "CISO",  audience: "Exec",    duration: "60m" },
  { cadence: "Quarterly board review",      owner: "CEO",   audience: "Board",   duration: "3h" },
  { cadence: "Quarterly roadmap review",    owner: "CPO",   audience: "Exec",    duration: "2h" },
  { cadence: "Quarterly partner review",    owner: "Part.", audience: "Partners",duration: "2h" },
];

export const EXEC_DECISIONS = [
  { date: "2026-04", topic: "Open SE region", decision: "Funded carrier recruiting", owner: "MP" },
  { date: "2026-05", topic: "SOC 2 audit",    decision: "Approved external auditor", owner: "Security" },
  { date: "2026-05", topic: "EliteNav redesign", decision: "Approved Q+1 rollout",   owner: "Mobile" },
];

export const BOARD_REPORT = {
  exec_summary: "Anderoute reached V5.5 readiness with 88% leadership score; SE coverage and brand maturity are top focus.",
  revenue: { arr_m: 12.4, growth: "+28%", nrr: 118 },
  marketplace: { gmv_m: 42, take: 4.6, coverage: 91 },
  cs: { grr: 94, nrr: 118, nps: 47 },
  product: { adoption: 81, releases: 14 },
  cert: { soc2_pct: 76, evidence_fresh: 91 },
  risks: ["SE coverage gap", "Android Auto pending approval", "AI accuracy benchmark"],
  decisions: ["Approve onboarding factory v2", "Approve category PR investment"],
  next_q_priorities: ["Close SE", "Finish SOC 2", "Approve Auto", "Launch 3 expansion plays"],
};

export const PRODUCT_LINES = [
  { name: "Dispatch Command Center", adoption: 92, revenue: 36, support: "low",  roadmap: "mature", competitive: "strong" },
  { name: "EliteNav",                 adoption: 71, revenue: 12, support: "med",  roadmap: "growing", competitive: "strong" },
  { name: "Customer Portal",          adoption: 84, revenue: 8,  support: "low",  roadmap: "mature", competitive: "med"    },
  { name: "CoPilot AI Ops",           adoption: 58, revenue: 6,  support: "med",  roadmap: "early",  competitive: "med"    },
  { name: "Carrier Marketplace",      adoption: 64, revenue: 9,  support: "med",  roadmap: "growing", competitive: "med"    },
  { name: "API Platform",             adoption: 47, revenue: 5,  support: "low",  roadmap: "mature", competitive: "strong" },
  { name: "EDI Platform",             adoption: 39, revenue: 4,  support: "med",  roadmap: "growing", competitive: "med"    },
  { name: "Telematics Integrations",  adoption: 62, revenue: 3,  support: "low",  roadmap: "mature", competitive: "strong" },
  { name: "Mobile App",               adoption: 73, revenue: 7,  support: "med",  roadmap: "growing", competitive: "strong" },
  { name: "White-label Portal",       adoption: 28, revenue: 4,  support: "low",  roadmap: "growing", competitive: "med"    },
  { name: "Reporting / Analytics",    adoption: 69, revenue: 3,  support: "low",  roadmap: "mature", competitive: "med"    },
  { name: "Enterprise Governance",    adoption: 81, revenue: 3,  support: "low",  roadmap: "mature", competitive: "strong" },
];

export const RETENTION_ACCOUNTS = [
  { acct: "Northwind Logistics", renewal: "2026-09", health: 88, adoption: 92, expansion: "+2 lanes",   risk: "low",    sponsor: "active" },
  { acct: "Acme Freight",        renewal: "2026-07", health: 91, adoption: 89, expansion: "API tier",   risk: "low",    sponsor: "active" },
  { acct: "Sun Carriers",        renewal: "2026-08", health: 64, adoption: 41, expansion: "—",         risk: "high",   sponsor: "stale"  },
  { acct: "Globex Transport",    renewal: "2026-10", health: 82, adoption: 78, expansion: "Marketplace", risk: "low",  sponsor: "active" },
  { acct: "Pioneer Logistics",   renewal: "2026-11", health: 79, adoption: 74, expansion: "White-label",risk: "med",   sponsor: "active" },
];
export const EXPANSION_OPPS = [
  { acct: "Acme Freight",        opp: "API tier upgrade",  arr_m: 0.12 },
  { acct: "Northwind Logistics", opp: "Add 80 trucks",     arr_m: 0.21 },
  { acct: "Globex Transport",    opp: "Marketplace pilot", arr_m: 0.18 },
];

export const ACCOUNT_PLANS = [
  { acct: "Northwind Logistics", profile: "National LTL", products: ["Dispatch","EliteNav","Portal"], goals: "Reduce empty miles", pains: "Driver retention", sponsor: "VP Ops", renewal: "2026-09", risks: "Mobile rollout" },
  { acct: "Acme Freight",        profile: "Regional FTL", products: ["Dispatch","API","Portal"],      goals: "Customer visibility", pains: "EDI complexity", sponsor: "CIO",   renewal: "2026-07", risks: "EDI mappings" },
];

export const CATEGORY_NARRATIVE = {
  category: "Logistics Operations Platform",
  problem: "Fleets juggle 5–10 fragmented tools across dispatch, navigation, visibility, carriers, and compliance.",
  why_now: "Driver shortage, customer SLA pressure, and AI maturity force consolidation onto an operations command layer.",
  old_way: "Best-of-breed point tools stitched by spreadsheets",
  new_way: "A single command layer powering dispatch, mobile, AI, marketplace, and customer trust",
  pov: "Anderoute is the operations command layer for modern logistics fleets.",
  proofs: [
    { kind: "Product",     text: "Dispatch + EliteNav + Portal + CoPilot integrated" },
    { kind: "Customer",    text: "Top-10 enterprise logos signed" },
    { kind: "Marketplace", text: "6-region carrier liquidity" },
    { kind: "AI",          text: "Human-approved recommendations in production" },
    { kind: "Enterprise",  text: "SOC 2 audit, RBAC, audit logs, RLS" },
    { kind: "Security",    text: "Evidence freshness 91%" },
    { kind: "Driver",      text: "EliteNav adoption 71%" },
    { kind: "Partner",     text: "23 active partners, 6 strategic" },
  ],
};

export const COMPETITORS = [
  { name: "LegacyTMS-A",  segment: "Enterprise TMS",  diff: "Faster onboarding, mobile-first", risk: "Med" },
  { name: "Marketplace-B",segment: "Load board",      diff: "Integrated workflow, not just board", risk: "Low" },
  { name: "Telematics-C", segment: "Telematics-only", diff: "Cross-vendor + dispatch native", risk: "Low" },
  { name: "Niche-D",      segment: "Regional dispatch", diff: "Multi-region + enterprise gov", risk: "Low" },
];
export const WIN_LOSS = [
  { acct: "Acme",       outcome: "win",  reason: "Mobile + portal integration" },
  { acct: "Pioneer",    outcome: "win",  reason: "Carrier marketplace" },
  { acct: "Sun",        outcome: "loss", reason: "Procurement timing" },
  { acct: "Globex",     outcome: "win",  reason: "AI operational copilots" },
];

export const CERT_EVIDENCE = {
  freshness_pct: 91,
  controls_with_owner: 96,
  policies_current: 88,
  remediation_open: 4,
  audit_export_ready_pct: 78,
  exceptions: [
    { id: "EX-22", control: "CC6.6 — Encryption-in-transit gap", owner: "Eng", status: "remediating" },
    { id: "EX-31", control: "CC7.2 — Vendor review overdue",    owner: "Sec", status: "open" },
  ],
};

export const SEC_EXEC = [
  { area: "Access reviews",          status: "complete",   note: "Quarterly Q1 done" },
  { area: "Audit log coverage",      status: "complete",   note: "API + DB + Auth" },
  { area: "Incident response",       status: "ready",      note: "Tabletop Q-1" },
  { area: "Backup / DR testing",     status: "tested",     note: "RPO/RTO within target" },
  { area: "Vuln remediation",        status: "in_progress",note: "3 high open" },
  { area: "API security",            status: "ready",      note: "Rate-limit + scope" },
  { area: "EDI security",            status: "ready",      note: "MFT + signed payloads" },
  { area: "Mobile security",         status: "in_progress",note: "Auto/CarPlay audit pending" },
  { area: "Data retention",          status: "complete",   note: "Policy + RLS enforced" },
  { area: "AI governance",           status: "in_progress",note: "Approval logs live" },
  { area: "Vendor reviews",          status: "in_progress",note: "2 overdue" },
  { area: "Customer security requests", status: "complete",note: "0 backlog" },
];

export const STRATEGIC_RISKS = [
  { id: "R1",  cat: "Marketplace",    desc: "SE coverage gap",            severity: "high",   owner: "MP",    mitigation: "Carrier recruiting" },
  { id: "R2",  cat: "Mobile",         desc: "Auto/CarPlay not approved",  severity: "high",   owner: "Mobile", mitigation: "Cert sprint" },
  { id: "R3",  cat: "Certification",  desc: "SOC 2 audit timeline",       severity: "medium", owner: "Sec",   mitigation: "Evidence sprint" },
  { id: "R4",  cat: "Concentration",  desc: "Top 3 customers > 30% ARR",  severity: "medium", owner: "CRO",   mitigation: "Mid-market push" },
  { id: "R5",  cat: "AI",             desc: "No accuracy benchmark",      severity: "medium", owner: "AI",    mitigation: "Eval harness" },
  { id: "R6",  cat: "Competitive",    desc: "Legacy TMS price pressure",  severity: "low",    owner: "Strat", mitigation: "Value bundling" },
  { id: "R7",  cat: "Tech debt",      desc: "Legacy mapping layer",       severity: "low",    owner: "Eng",   mitigation: "Refactor Q+2" },
  { id: "R8",  cat: "Partner",        desc: "Broker partner blocked",     severity: "medium", owner: "Part.", mitigation: "Security review" },
];

export const ROADMAP = [
  { horizon: "Current Q", cat: "Marketplace",    item: "SE recruiting" },
  { horizon: "Current Q", cat: "Compliance",     item: "SOC 2 close-out" },
  { horizon: "Current Q", cat: "Mobile",         item: "Auto/CarPlay cert" },
  { horizon: "Next Q",    cat: "AI",             item: "Eval harness + audit" },
  { horizon: "Next Q",    cat: "Marketplace",    item: "Carrier quality tiers v2" },
  { horizon: "6 months",  cat: "Portal",         item: "Branded portal templates" },
  { horizon: "6 months",  cat: "EDI",            item: "210 invoice support" },
  { horizon: "12 months", cat: "API",            item: "Partner monetization v2" },
  { horizon: "12 months", cat: "Enterprise gov", item: "ISO 27001 readiness" },
  { horizon: "24 months", cat: "AI",             item: "Predictive ETA at scale" },
];
export const ROADMAP_DECISIONS = [
  { date: "2026-04", item: "Defer ISO to 12m",     by: "Exec" },
  { date: "2026-05", item: "Promote AI eval harness", by: "Exec" },
];

export const DATA_ROOM = [
  { section: "Product",            status: "complete" },
  { section: "Architecture",       status: "complete" },
  { section: "Security",           status: "in_progress" },
  { section: "Compliance",         status: "in_progress" },
  { section: "Customers",          status: "complete" },
  { section: "Revenue",            status: "complete" },
  { section: "Marketplace",        status: "in_progress" },
  { section: "Partners",           status: "complete" },
  { section: "Roadmap",            status: "complete" },
  { section: "Support",            status: "complete" },
  { section: "Legal",              status: "placeholder" },
  { section: "Financial",          status: "placeholder" },
  { section: "Risks",              status: "complete" },
  { section: "Metrics",            status: "complete" },
  { section: "Customer references",status: "placeholder" },
  { section: "Technical docs",     status: "complete" },
];
export const DD_REQUESTS = [
  { id: "DD-1", from: "Investor A", topic: "Security posture", status: "answered" },
  { id: "DD-2", from: "Investor B", topic: "Customer concentration", status: "in_progress" },
];

export const RELIABILITY = {
  uptime_pct: 99.94, api_p95_ms: 240, realtime_p95_ms: 540, gps_reliability_pct: 99.6,
  webhook_pct: 99.2, edi_pct: 99.0, mobile_crash_free_pct: 99.5, notification_pct: 99.4,
  route_provider_pct: 99.8, billing_provider_pct: 99.9, support_incident_rate: 0.7, critical_incidents: 1,
};

export const V55_REPORTS = [
  "Market leadership readiness", "Platform defensibility", "Ecosystem monetization",
  "Marketplace economics", "National partnerships", "Partner ecosystem scale",
  "Enterprise operating model", "Board/investor report", "Product-line maturity",
  "Retention and expansion", "Competitive differentiation", "Certification evidence maturity",
  "Strategic risk management", "Long-term roadmap governance", "Data room readiness",
  "Platform reliability",
];

export const v55ReadinessScore = () => LEADERSHIP.overall;

// ===== Phase 24 polish — trends, alerts, narrative chrome =====

export const LEADERSHIP_ALERTS = [
  { id: "LA1", severity: "high",   area: "Marketplace",  msg: "SE coverage below 80% — recruiting sprint active" },
  { id: "LA2", severity: "medium", area: "Brand",        msg: "Category narrative push not yet launched" },
  { id: "LA3", severity: "medium", area: "Expansion",    msg: "3 expansion plays unstarted this quarter" },
  { id: "LA4", severity: "low",    area: "Investor",     msg: "Data room legal section still placeholder" },
];

export const DEFENSIBILITY_TREND = [
  { q: "Q-3", score: 74 }, { q: "Q-2", score: 77 },
  { q: "Q-1", score: 80 }, { q: "Q0",  score: 82 },
];

export const MONETIZATION_TREND = [
  { q: "Q-3", arr_m: 9.1,  growth: 21 },
  { q: "Q-2", arr_m: 10.2, growth: 24 },
  { q: "Q-1", arr_m: 11.3, growth: 26 },
  { q: "Q0",  arr_m: 12.4, growth: 28 },
];

export const BOARD_TRENDS = [
  { q: "Q-3", arr: 9.1,  nrr: 109, gmv: 28, coverage: 84 },
  { q: "Q-2", arr: 10.2, nrr: 112, gmv: 33, coverage: 87 },
  { q: "Q-1", arr: 11.3, nrr: 115, gmv: 38, coverage: 89 },
  { q: "Q0",  arr: 12.4, nrr: 118, gmv: 42, coverage: 91 },
];

export const RETENTION_TREND = [
  { q: "Q-3", grr: 91, nrr: 109 },
  { q: "Q-2", grr: 92, nrr: 112 },
  { q: "Q-1", grr: 93, nrr: 115 },
  { q: "Q0",  grr: 94, nrr: 118 },
];

export const RELIABILITY_TREND = [
  { d: "W-3", uptime: 99.91, p95: 260 },
  { d: "W-2", uptime: 99.93, p95: 250 },
  { d: "W-1", uptime: 99.95, p95: 240 },
  { d: "W0",  uptime: 99.94, p95: 240 },
];

export const COMPETITIVE_WIN_RATE = {
  win_pct: 62, loss_pct: 24, no_decision_pct: 14,
  vs_legacy_tms: 68, vs_load_board: 71, vs_telematics_only: 74, vs_regional: 58,
};

export const CATEGORY_PROOF_HIGHLIGHTS = [
  "AI recommendations require human approval — no autonomous dispatch.",
  "SOC 2 audit in flight with 91% evidence freshness.",
  "Top-10 enterprise logos signed with active executive sponsors.",
  "23 active partners across telematics, EDI, fuel, mobile and broker categories.",
  "Multi-region marketplace with 6 active regions; SE coverage tracked.",
];

export const DATA_ROOM_PROGRESS = () => {
  const counts = { complete: 0, in_progress: 0, placeholder: 0 };
  for (const x of DATA_ROOM) counts[x.status as keyof typeof counts]++;
  const total = DATA_ROOM.length;
  return { ...counts, total, pct: Math.round((counts.complete / total) * 100) };
};
