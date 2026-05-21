// Phase 25 (V6) mock data — placeholders, not actual financial/compliance claims.

export const V6_FEATURE_MATRIX = [
  { area: "Category-Defining Platform Dashboard",        status: "ready" },
  { area: "Intelligent Logistics Network Command Center", status: "ready" },
  { area: "Network Operating Intelligence",              status: "ready" },
  { area: "Advanced Automation Governance",              status: "ready" },
  { area: "Automation Control Tower",                    status: "ready" },
  { area: "AI Governance Maturity V6",                   status: "ready" },
  { area: "Marketplace Liquidity Intelligence",          status: "ready" },
  { area: "Platform Economics Command Center",           status: "ready" },
  { area: "Enterprise Ecosystem Scale",                  status: "ready" },
  { area: "Exit / IPO Readiness Tracker",                status: "tracked-evidence-only" },
  { area: "Advanced Investor Data Room",                 status: "ready" },
  { area: "Board Governance Operating System",           status: "ready" },
  { area: "Strategic Risk Portfolio",                    status: "ready" },
  { area: "Roadmap Investment Governance",               status: "ready" },
  { area: "Platform Reliability Maturity",               status: "ready" },
  { area: "Certification Evidence Completion",           status: "tracked-evidence-only" },
  { area: "Enterprise Security Operating Model",         status: "ready" },
  { area: "Revenue Quality Maturity",                    status: "ready" },
  { area: "Customer + Partner Ecosystem Maturity",       status: "ready" },
  { area: "Product Defensibility Maturity",              status: "ready" },
  { area: "Category Narrative + Market Education",       status: "ready" },
  { area: "V6 Advanced Reports",                         status: "ready" },
];

export const V6_DEFERRED = [
  "Fully autonomous dispatch",
  "Final IPO / acquisition claims",
  "Final certification claims without audit evidence",
  "Autonomous vehicle workflows",
  "Global customs workflows",
  "International regulatory localization",
  "Insurance underwriting automation",
  "Fully automated legal compliance",
];

export const CATEGORY_LEADERSHIP = {
  overall: 91, product: 90, marketplace: 84, ai_ops: 86, customer_ecosystem: 88,
  partner_ecosystem: 82, revenue: 80, security: 89, compliance: 83, data: 87,
  reliability: 91, defensibility: 86, moats: 84, investor_ready: 64, board_ready: 88,
  operating_model: 86,
};
export const CATEGORY_TREND = [
  { q: "Q-3", score: 78 }, { q: "Q-2", score: 83 }, { q: "Q-1", score: 87 }, { q: "Q0", score: 91 },
];
export const CATEGORY_GAPS = [
  { area: "Investor readiness", score: 64, action: "Close audit gaps + revenue quality" },
  { area: "Revenue maturity",   score: 80, action: "Reduce customer concentration" },
  { area: "Marketplace",        score: 84, action: "Southeast carrier acquisition" },
];

export const NETWORK_VOLUME = {
  companies: 412, drivers: 9_840, carriers: 2_310, customers: 1_146,
  loads_active: 5_820, shipments_30d: 38_400, regions: 9, integrations: 64,
  gps_events_24h: 1_240_000, nav_sessions_24h: 8_900, marketplace_loads_7d: 3_120,
  api_requests_24h: 4_800_000, edi_tx_24h: 142_000, webhook_deliveries_24h: 78_000,
  portal_active_24h: 1_840, copilot_recs_24h: 11_400, automation_approvals_24h: 312,
  support_incidents_24h: 9, revenue_events_24h: 17_200,
};
export const NETWORK_HEALTH = 89;
export const NETWORK_ALERTS = [
  { id: "n1", region: "Southeast",  severity: "medium", msg: "Flatbed carrier supply 18% below demand" },
  { id: "n2", region: "Northwest",  severity: "low",    msg: "EDI 214 latency drift +120ms" },
  { id: "n3", region: "Texas",      severity: "low",    msg: "Webhook retries elevated for carrier X" },
];

export const REGIONS = [
  { region: "Northeast",    health: 92, carrier_cov: 94, demand: 88, driver_density: 86, equip: 90, liquidity: 87, lane_rel: 93, support: "low",    revenue_idx: 1.20 },
  { region: "Southeast",    health: 79, carrier_cov: 76, demand: 92, driver_density: 78, equip: 70, liquidity: 73, lane_rel: 85, support: "medium", revenue_idx: 0.95 },
  { region: "Midwest",      health: 88, carrier_cov: 90, demand: 84, driver_density: 88, equip: 89, liquidity: 86, lane_rel: 91, support: "low",    revenue_idx: 1.05 },
  { region: "Texas",        health: 86, carrier_cov: 88, demand: 90, driver_density: 89, equip: 85, liquidity: 84, lane_rel: 88, support: "low",    revenue_idx: 1.10 },
  { region: "Mountain",     health: 84, carrier_cov: 82, demand: 78, driver_density: 74, equip: 80, liquidity: 78, lane_rel: 87, support: "low",    revenue_idx: 0.88 },
  { region: "Pacific",      health: 90, carrier_cov: 89, demand: 86, driver_density: 84, equip: 88, liquidity: 85, lane_rel: 90, support: "low",    revenue_idx: 1.12 },
  { region: "Northwest",    health: 83, carrier_cov: 81, demand: 80, driver_density: 76, equip: 79, liquidity: 80, lane_rel: 86, support: "medium", revenue_idx: 0.92 },
  { region: "Great Plains", health: 81, carrier_cov: 79, demand: 74, driver_density: 71, equip: 77, liquidity: 76, lane_rel: 84, support: "low",    revenue_idx: 0.80 },
  { region: "Mid-Atlantic", health: 89, carrier_cov: 88, demand: 85, driver_density: 84, equip: 87, liquidity: 86, lane_rel: 90, support: "low",    revenue_idx: 1.04 },
];
export const NETWORK_RECOMMENDATIONS = [
  { id: "r1", region: "Southeast", action: "Carrier acquisition campaign (flatbed)", impact: "Coverage +8pt" },
  { id: "r2", region: "Northwest", action: "EDI partner reliability remediation",    impact: "Latency -200ms" },
  { id: "r3", region: "Texas",     action: "Preferred carrier program expansion",    impact: "Award time -3min" },
];

export const AUTOMATION_LEVELS = ["manual","assisted","suggested","human-approved","low-risk automated","restricted high-risk","prohibited"] as const;
export const AUTOMATION_POLICIES = [
  { id: "ap1", action: "Customer ETA update",            level: "low-risk automated", approval: "none",       confidence: 0.90, audit: true,  rollback: true  },
  { id: "ap2", action: "Dispatch recommendation",        level: "human-approved",     approval: "dispatcher", confidence: 0.85, audit: true,  rollback: true  },
  { id: "ap3", action: "Billing usage adjustment",       level: "human-approved",     approval: "billing",    confidence: 0.92, audit: true,  rollback: true  },
  { id: "ap4", action: "EDI 990 acknowledgment",         level: "low-risk automated", approval: "none",       confidence: 0.97, audit: true,  rollback: false },
  { id: "ap5", action: "Webhook retry policy",           level: "low-risk automated", approval: "none",       confidence: 0.95, audit: true,  rollback: true  },
  { id: "ap6", action: "Support triage routing",         level: "suggested",          approval: "agent",      confidence: 0.78, audit: true,  rollback: true  },
  { id: "ap7", action: "Carrier suspension",             level: "restricted high-risk", approval: "ops lead", confidence: 0.95, audit: true,  rollback: true  },
  { id: "ap8", action: "Auto-dispatch (no approval)",    level: "prohibited",         approval: "n/a",        confidence: 0,    audit: true,  rollback: false },
];
export const AUTOMATION_TOWER = {
  pending: 14, approved_24h: 218, rejected_24h: 9, success_rate: 96, failure_rate: 4, override_rate: 7,
  by_type: [
    { kind: "Customer ETA", approved: 92, rejected: 1 },
    { kind: "Dispatch rec", approved: 41, rejected: 4 },
    { kind: "Billing adj",  approved: 18, rejected: 2 },
    { kind: "EDI ack",      approved: 49, rejected: 0 },
    { kind: "Support route",approved: 18, rejected: 2 },
  ],
  violations: [
    { id: "v1", policy: "Confidence threshold", action: "Auto carrier suspension", outcome: "Blocked" },
    { id: "v2", policy: "Human approval req'd", action: "Billing adj > $500",      outcome: "Routed to billing" },
  ],
};

export const AI_GOV = {
  recs_generated_24h: 11_400, recs_accepted: 7_320, recs_rejected: 1_140,
  confidence_threshold: 0.80, actions_approved: 312, actions_denied: 18,
  drafts_generated: 980, exec_summaries: 64, risk_explanations: 220,
  data_freshness_pct: 94, cost_usd_24h: 142.10, safety_incidents: 0,
  bias_reviews_due: 2, explainability_coverage: 86,
};
export const AI_RECS_TREND = [
  { d: "Mon", gen: 1450, acc: 970 }, { d: "Tue", gen: 1610, acc: 1080 },
  { d: "Wed", gen: 1720, acc: 1110 }, { d: "Thu", gen: 1660, acc: 1070 },
  { d: "Fri", gen: 1810, acc: 1180 }, { d: "Sat", gen: 1320, acc: 870 },
  { d: "Sun", gen: 1830, acc: 1140 },
];

export const LIQUIDITY = {
  score: 81, coverage: 87, bids_per_load: 4.6, time_to_first_bid_min: 6, time_to_award_min: 14,
  uncovered_rate: 6, acceptance: 92, falloff: 4, trust_score: 88, revenue_quality: 82,
};
export const LIQUIDITY_LANES = [
  { lane: "ATL → MIA",  density: "high",   bids: 6.1, award: 9,  coverage: 96 },
  { lane: "LAX → PHX",  density: "high",   bids: 5.4, award: 11, coverage: 94 },
  { lane: "CHI → DAL",  density: "med",    bids: 4.0, award: 14, coverage: 87 },
  { lane: "SEA → DEN",  density: "med",    bids: 3.6, award: 18, coverage: 78 },
  { lane: "NYC → ATL",  density: "high",   bids: 5.2, award: 12, coverage: 92 },
  { lane: "DAL → NSH",  density: "low",    bids: 2.8, award: 26, coverage: 68 },
];
export const LIQUIDITY_HEATMAP = REGIONS.map(r => ({ region: r.region, supply: r.equip, demand: r.demand, gap: r.demand - r.equip }));

export const ECONOMICS = {
  saas: 8.4, marketplace: 3.1, api: 1.2, edi_pl: 0.6, telematics_pl: 0.4,
  enterprise_support: 0.9, services: 0.7, carrier_subs: 0.3, partner_share_pl: 0.2,
  total_arr_pl: 15.8,
  gross_margin_pl: 71, cac_pl: 18_400, ltv_pl: 142_000, nrr_pl: 121, grr_pl: 94,
  expansion_pipeline_pl: 6.2, churn_risk_pl: 2.4, quality_score: 78,
};
export const REVENUE_BY_SEGMENT = [
  { seg: "Enterprise",  arr: 9.4, share: 60 },
  { seg: "Mid-market",  arr: 4.7, share: 30 },
  { seg: "SMB",         arr: 1.7, share: 10 },
];
export const REVENUE_BY_REGION = REGIONS.map(r => ({ region: r.region, idx: r.revenue_idx }));

export const ECOSYSTEM_SCALE = {
  score: 84,
  companies: 412, enterprise_accts: 88, dispatchers: 1_640, drivers: 9_840, vehicles: 11_200,
  carriers: 2_310, customers: 1_146,
  partner_integrations: 64, api_partners: 22, edi_partners: 14, telematics_partners: 8,
  marketplace_partners: 12, strategic_partners: 6,
  support_volume_30d: 3_240, implementation_inflight: 14,
};

export const EXIT_READINESS = [
  { area: "Revenue quality",                 score: 78, status: "in_progress" },
  { area: "Customer concentration",          score: 64, status: "in_progress" },
  { area: "Retention metrics",               score: 84, status: "in_progress" },
  { area: "Growth metrics",                  score: 82, status: "in_progress" },
  { area: "Marketplace metrics",             score: 81, status: "in_progress" },
  { area: "Gross margin (placeholder)",      score: 70, status: "placeholder" },
  { area: "Product maturity",                score: 88, status: "in_progress" },
  { area: "Security / compliance maturity",  score: 83, status: "in_progress" },
  { area: "Audit readiness",                 score: 71, status: "in_progress" },
  { area: "Financial reporting (placeholder)",score: 48, status: "placeholder" },
  { area: "Data room completeness",          score: 72, status: "in_progress" },
  { area: "Legal docs (placeholder)",        score: 55, status: "placeholder" },
  { area: "Board governance",                score: 86, status: "in_progress" },
  { area: "Operating cadence",               score: 88, status: "in_progress" },
  { area: "Risk register",                   score: 84, status: "in_progress" },
  { area: "Executive reporting",             score: 87, status: "in_progress" },
  { area: "Customer references (placeholder)",score: 60, status: "placeholder" },
  { area: "Strategic partner proof",         score: 76, status: "in_progress" },
];

export const DATA_ROOM = [
  { section: "Company overview",        status: "complete" },
  { section: "Product overview",        status: "complete" },
  { section: "Platform architecture",   status: "complete" },
  { section: "Security overview",       status: "complete" },
  { section: "Compliance evidence",     status: "in_progress" },
  { section: "Customer metrics",        status: "complete" },
  { section: "Revenue metrics (pl)",    status: "placeholder" },
  { section: "Marketplace metrics",     status: "complete" },
  { section: "Partner ecosystem",       status: "complete" },
  { section: "Product roadmap",         status: "complete" },
  { section: "Operating model",         status: "complete" },
  { section: "Board reports",           status: "complete" },
  { section: "Customer references(pl)", status: "placeholder" },
  { section: "Strategic risks",         status: "complete" },
  { section: "Legal docs (pl)",         status: "placeholder" },
  { section: "Financial docs (pl)",     status: "placeholder" },
  { section: "Technical diligence",     status: "in_progress" },
  { section: "Security diligence",      status: "in_progress" },
  { section: "Commercial diligence",    status: "in_progress" },
];
export const DD_REQUESTS = [
  { id: "dd1", who: "Acquirer A",  topic: "Revenue quality breakdown",    status: "in_progress", due: "2026-06-05" },
  { id: "dd2", who: "Investor B",  topic: "Marketplace cohort retention", status: "pending",     due: "2026-06-10" },
  { id: "dd3", who: "Acquirer A",  topic: "Security pen-test summary",    status: "complete",    due: "2026-05-21" },
];

export const BOARD_MEETINGS = [
  { id: "bm1", date: "2026-06-12", title: "Q2 Operating Review",  status: "scheduled" },
  { id: "bm2", date: "2026-09-18", title: "Q3 Operating Review",  status: "planned"   },
];
export const BOARD_AGENDA = [
  "Executive summary", "Revenue quality", "Marketplace liquidity",
  "Customer retention", "Certification progress", "Strategic risks", "Roadmap investment requests",
];
export const BOARD_DECISIONS = [
  { id: "bd1", topic: "Approve Southeast carrier campaign budget",        status: "approved", owner: "COO" },
  { id: "bd2", topic: "Endorse SOC 2 Type II audit window",                status: "approved", owner: "CISO" },
  { id: "bd3", topic: "Review revenue concentration policy",               status: "pending",  owner: "CFO" },
];
export const BOARD_ACTIONS = [
  { id: "ba1", action: "Publish updated risk register",  owner: "COO",  due: "2026-06-05", status: "in_progress" },
  { id: "ba2", action: "Deliver audit evidence pack",    owner: "CISO", due: "2026-06-15", status: "in_progress" },
  { id: "ba3", action: "Refresh investor narrative",     owner: "CEO",  due: "2026-06-08", status: "in_progress" },
];

export const STRATEGIC_RISKS = [
  { id: "sr1",  cat: "Product",         sev: "medium", owner: "CPO",  desc: "Mobile certification dependencies",     mitig: "Track CarPlay/Android Auto evidence" },
  { id: "sr2",  cat: "Security",        sev: "medium", owner: "CISO", desc: "Pending SOC 2 control remediation",     mitig: "Owner-tracked remediation plan" },
  { id: "sr3",  cat: "Compliance",      sev: "low",    owner: "CISO", desc: "Evidence freshness drift",              mitig: "Quarterly evidence refresh" },
  { id: "sr4",  cat: "Marketplace",     sev: "medium", owner: "COO",  desc: "Southeast carrier gap",                 mitig: "Acquisition campaign" },
  { id: "sr5",  cat: "Revenue",         sev: "high",   owner: "CFO",  desc: "Customer concentration",                mitig: "Diversification plan + expansion" },
  { id: "sr6",  cat: "Partner",         sev: "low",    owner: "BD",   desc: "Telematics partner reliability",        mitig: "SLA review" },
  { id: "sr7",  cat: "Competitive",     sev: "medium", owner: "CEO",  desc: "Legacy TMS bundling",                   mitig: "Category narrative + proof library" },
  { id: "sr8",  cat: "Technical debt",  sev: "medium", owner: "CTO",  desc: "Realtime layer scaling",                mitig: "Reliability investment item" },
  { id: "sr9",  cat: "Mobile approval", sev: "medium", owner: "Mobile lead", desc: "CarPlay submission backlog",      mitig: "Release checklist" },
  { id: "sr10", cat: "Certification",   sev: "medium", owner: "CISO", desc: "Audit window scheduling",               mitig: "Calendar locked Q3" },
  { id: "sr11", cat: "Data quality",    sev: "low",    owner: "Data lead", desc: "Telematics anomaly rate",          mitig: "Validator rules" },
  { id: "sr12", cat: "AI governance",   sev: "medium", owner: "CTO",  desc: "Explainability coverage gap",           mitig: "Coverage to 95%" },
  { id: "sr13", cat: "Ops scaling",     sev: "low",    owner: "COO",  desc: "Support staffing in peaks",             mitig: "Workforce plan" },
  { id: "sr14", cat: "Legal (pl)",      sev: "low",    owner: "Legal",desc: "MSA/DPA library refresh",               mitig: "Template program" },
];

export const ROADMAP_HORIZONS = ["Current Q","Next Q","6 months","12 months","24 months","36 months (pl)"];
export const ROADMAP_ITEMS = [
  { id: "ri1",  cat: "Core dispatch",       horizon: "Current Q", invest: 1.0, value: "high",   status: "in_progress" },
  { id: "ri2",  cat: "Driver mobile",       horizon: "Current Q", invest: 0.8, value: "high",   status: "in_progress" },
  { id: "ri3",  cat: "EliteNav",            horizon: "Next Q",    invest: 0.9, value: "high",   status: "planned"     },
  { id: "ri4",  cat: "CoPilot AI",          horizon: "Next Q",    invest: 1.2, value: "high",   status: "planned"     },
  { id: "ri5",  cat: "Carrier marketplace", horizon: "6 months",  invest: 1.5, value: "high",   status: "planned"     },
  { id: "ri6",  cat: "API platform",        horizon: "6 months",  invest: 0.7, value: "medium", status: "planned"     },
  { id: "ri7",  cat: "EDI platform",        horizon: "12 months", invest: 0.6, value: "medium", status: "planned"     },
  { id: "ri8",  cat: "Customer portal",     horizon: "12 months", invest: 0.5, value: "medium", status: "planned"     },
  { id: "ri9",  cat: "Telematics",          horizon: "12 months", invest: 0.7, value: "medium", status: "planned"     },
  { id: "ri10", cat: "Enterprise gov",      horizon: "24 months", invest: 0.6, value: "medium", status: "planned"     },
  { id: "ri11", cat: "Security/compl.",     horizon: "24 months", invest: 0.9, value: "high",   status: "planned"     },
  { id: "ri12", cat: "Revenue ops",         horizon: "24 months", invest: 0.4, value: "medium", status: "planned"     },
  { id: "ri13", cat: "Partner ecosystem",   horizon: "36 months (pl)", invest: 0.5, value: "medium", status: "exploration" },
  { id: "ri14", cat: "Platform infra",      horizon: "36 months (pl)", invest: 0.8, value: "high",   status: "exploration" },
];
export const ROADMAP_APPROVALS = [
  { id: "ra1", item: "Carrier marketplace expansion", status: "pending",  board: "Q2" },
  { id: "ra2", item: "AI governance investment",      status: "approved", board: "Q1" },
];

export const RELIABILITY = {
  uptime_pl: 99.95, api_latency_p95_ms: 184, rt_latency_p95_ms: 220,
  gps_reliability: 99.7, route_provider_reliability: 99.4, notification_delivery: 99.2,
  webhook_delivery: 98.9, edi_reliability: 99.1, billing_provider: 99.8,
  mobile_crash_free_pl: 99.6, support_rate: 1.2, critical_incidents_30d: 1,
  error_budget_remaining_pl: 62,
};
export const RELIABILITY_TREND = [
  { w: "W-3", uptime: 99.93 }, { w: "W-2", uptime: 99.95 },
  { w: "W-1", uptime: 99.96 }, { w: "W0",  uptime: 99.95 },
];
export const POSTMORTEMS = [
  { id: "pm1", date: "2026-05-04", title: "Realtime fan-out lag", severity: "minor", status: "complete" },
  { id: "pm2", date: "2026-04-19", title: "EDI partner outage",   severity: "major", status: "complete" },
];

export const CERT_EVIDENCE = {
  soc2_completion: 83, iso_readiness_pl: 41, pentest: "complete", vuln_remediated: 92,
  mobile_sec: "in_review", api_sec: "complete", edi_sec: "in_review", ai_gov_review: "in_progress",
  access_review: 96, ir_test: "complete", backup_restore_test: "complete",
  policy_completion: 91, evidence_freshness: 91, audit_pkg_ready: 78,
  controls_needing_remediation: 2,
};
export const SECURITY_FUNCTIONS = [
  { fn: "Access governance",         owner: "CISO",       score: 92 },
  { fn: "API key governance",        owner: "Sec eng",    score: 88 },
  { fn: "Integration credentials",   owner: "Sec eng",    score: 84 },
  { fn: "Support access",            owner: "Support ops",score: 86 },
  { fn: "Incident response",         owner: "CISO",       score: 90 },
  { fn: "Vulnerability mgmt",        owner: "Sec eng",    score: 88 },
  { fn: "Secure SDLC (pl)",          owner: "CTO",        score: 74 },
  { fn: "Audit logging",             owner: "Platform",   score: 92 },
  { fn: "Data retention",            owner: "Data lead",  score: 84 },
  { fn: "Vendor risk",               owner: "Legal",      score: 78 },
  { fn: "Customer security requests",owner: "Support",    score: 82 },
  { fn: "Security questionnaires",   owner: "Sec ops",    score: 80 },
];

export const REVENUE_QUALITY = {
  score: 78, recurring_pct_pl: 78, usage_pct: 16, marketplace_quality: 82, api_quality: 80,
  concentration: 32, retention: 94, expansion: 121, churn_risk: 2.4, gross_margin_pl: 71,
  payment_health: 96, billing_disputes: 3, predictability_pl: 84,
};
export const PRODUCT_MIX = [
  { line: "SaaS",               share: 53 },
  { line: "Marketplace",        share: 20 },
  { line: "API",                share: 8 },
  { line: "Enterprise support", share: 6 },
  { line: "EDI (pl)",           share: 4 },
  { line: "Telematics (pl)",    share: 3 },
  { line: "Services",           share: 4 },
  { line: "Carrier subs",       share: 2 },
];

export const CUSTOMER_PARTNER_MAT = [
  { area: "Enterprise customers",   score: 88 },
  { area: "Customer success",       score: 86 },
  { area: "Support",                score: 84 },
  { area: "Partner ecosystem",      score: 82 },
  { area: "Carrier network",        score: 84 },
  { area: "API partners",           score: 80 },
  { area: "EDI partners",           score: 78 },
  { area: "Telematics partners",    score: 76 },
  { area: "Marketplace partners",   score: 81 },
  { area: "Strategic partners",     score: 79 },
];
export const JOINT_OPPS = [
  { id: "jo1", partner: "Telematics A", account: "Enterprise NE-12", arr_pl: 0.4, status: "in_progress" },
  { id: "jo2", partner: "EDI Hub B",    account: "Retailer SE-04",   arr_pl: 0.3, status: "pending" },
];

export const DEFENSIBILITY_FACTORS = [
  { factor: "Workflow depth",         score: 90 },
  { factor: "Data depth",             score: 86 },
  { factor: "Marketplace depth",      score: 82 },
  { factor: "Integration depth",      score: 88 },
  { factor: "Driver mobile UX",       score: 84 },
  { factor: "Customer portal adopt.", score: 80 },
  { factor: "Enterprise governance",  score: 87 },
  { factor: "Compliance evidence",    score: 83 },
  { factor: "API/EDI connectivity",   score: 86 },
  { factor: "Telematics connectivity",score: 78 },
  { factor: "AI ops intelligence",    score: 84 },
  { factor: "Switching costs",        score: 89 },
  { factor: "Brand / narrative",      score: 74 },
  { factor: "Partner ecosystem",      score: 82 },
];

export const NARRATIVE_ASSETS = [
  { id: "na1",  asset: "Category narrative",        status: "complete" },
  { id: "na2",  asset: "Market problem brief",      status: "complete" },
  { id: "na3",  asset: "Why now brief",             status: "complete" },
  { id: "na4",  asset: "Executive one-pager",       status: "complete" },
  { id: "na5",  asset: "Customer proof library",    status: "in_progress" },
  { id: "na6",  asset: "Partner proof library",     status: "in_progress" },
  { id: "na7",  asset: "Marketplace proof library", status: "complete" },
  { id: "na8",  asset: "AI ops proof library",      status: "in_progress" },
  { id: "na9",  asset: "Security/compl proof",      status: "in_progress" },
  { id: "na10", asset: "Competitive battlecards",   status: "complete" },
  { id: "na11", asset: "Demo narrative",            status: "complete" },
  { id: "na12", asset: "Sales enablement brief",    status: "complete" },
];

export const V6_REPORTS = [
  "Category leadership","Intelligent logistics network","Automation governance",
  "AI governance","Marketplace liquidity","Platform economics","Enterprise ecosystem scale",
  "Strategic exit/IPO readiness","Board governance","Strategic risk","Roadmap investment",
  "Reliability maturity","Certification evidence","Revenue quality","Product defensibility",
  "Data room readiness",
];
