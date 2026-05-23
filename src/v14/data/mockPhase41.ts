// V14 Phase 41 mock-only data. No autonomous dispatch. No IPO/audit/SOC2/ISO claims.

export const V14_SCOPE = [
  "Enterprise Strategic Operating System",
  "Capital Execution Maturity Center",
  "Long-Term Revenue Durability Center",
  "Revenue Durability Control Framework",
  "Global Marketplace Economics Governance Center",
  "Marketplace Economics Control Framework",
  "Category Leadership Stewardship Center",
  "Category Leadership Evidence Center",
  "Executive Value Creation Control Tower",
  "Board-Level Strategic Execution Center",
  "Strategic Operating Cadence System",
  "Enterprise Strategic Risk Control Center",
  "Strategic Account Value Governance",
  "Partner Ecosystem Value Governance",
  "Product-Line Strategic Stewardship",
  "Strategic Investment Execution Center",
  "Capital Evidence Control Center",
  "Commercial Diligence Control Center",
  "Enterprise Value Creation Reporting",
  "Long-Term Strategic Operating Roadmap",
];

export const V14_DEFERRED = [
  "Fully autonomous dispatch",
  "Final IPO / acquisition claims",
  "Final audited financial claims",
  "Final SOC 2 / ISO certification claims without evidence",
  "Full customs production workflows",
  "Full international tax automation",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "Final Android Auto / CarPlay completeness",
];

export const V14_FEATURE_MATRIX = [
  { area: "Strategic OS",       status: "scaffold", note: "All 14 dims scored" },
  { area: "Capital execution",  status: "scaffold", note: "Maturity + actions" },
  { area: "Revenue durability", status: "scaffold", note: "Controls framework" },
  { area: "MP economics",       status: "scaffold", note: "Governance + controls" },
  { area: "Category leadership", status: "scaffold", note: "Stewardship + evidence" },
  { area: "Value control tower", status: "scaffold", note: "Top exec actions" },
  { area: "Board execution",    status: "scaffold", note: "Agenda + tracker" },
  { area: "Strategic risk",     status: "scaffold", note: "Heatmap + mitigation" },
  { area: "Strategic acct val", status: "scaffold", note: "Expansion + risk" },
  { area: "Partner value",      status: "scaffold", note: "Influence + risk" },
  { area: "Product-line steward", status: "scaffold", note: "12 product lines" },
  { area: "Strategic invest",   status: "scaffold", note: "Thesis + outcome ph." },
  { area: "Capital evidence",   status: "scaffold", note: "Freshness + owner" },
  { area: "Diligence control",  status: "scaffold", note: "Domains + exceptions" },
  { area: "Long-term roadmap",  status: "scaffold", note: "6 horizons" },
];

export const V14_SOS = {
  score: 91,
  trend_qoq: +3,
  dims: [
    { dim: "Strategic operating",      pct: 91 },
    { dim: "Capital execution",         pct: 84 },
    { dim: "Revenue durability",        pct: 86 },
    { dim: "Marketplace economics",     pct: 79 },
    { dim: "Category leadership",       pct: 88 },
    { dim: "Strategic account value",   pct: 82 },
    { dim: "Partner ecosystem value",   pct: 77 },
    { dim: "Product-line stewardship",  pct: 75 },
    { dim: "Capital evidence",          pct: 83 },
    { dim: "Commercial diligence",      pct: 85 },
    { dim: "Strategic risk",            pct: 80 },
    { dim: "Board execution",           pct: 90 },
    { dim: "Executive cadence",         pct: 89 },
    { dim: "Long-term value progress",  pct: 78 },
  ],
  gaps: [
    "Southeast marketplace carrier density",
    "EDI support burden vs strategic value",
    "Customer concentration top-10",
    "API revenue maturity early",
  ],
  exec_actions: [
    "Refresh revenue durability evidence (2 items)",
    "Reduce customer concentration (4 logos)",
    "Improve Southeast MP economics",
    "Expand CoPilot in strategic accounts",
    "Approve partner value optimization plan",
  ],
};

export const V14_SOS_TRENDS = [
  { q: "Q-3", sos: 82, cap: 76, dur: 79, mp: 71, cat: 81 },
  { q: "Q-2", sos: 85, cap: 79, dur: 81, mp: 74, cat: 83 },
  { q: "Q-1", sos: 88, cap: 82, dur: 84, mp: 76, cat: 86 },
  { q: "Q-0", sos: 91, cap: 84, dur: 86, mp: 79, cat: 88 },
];

export const V14_EXEC_HEADLINE = {
  headline: "V14 strategic operating system at 91% — capital exec, revenue durability, board execution mature; MP Southeast + concentration top-10 are the active capital-grade gaps.",
  highlights: [
    "Strategic operating 91 (+3 QoQ)",
    "Capital execution 84 · Revenue durability 86",
    "Marketplace economics 79 — Southeast weak",
    "Category leadership 88 — proof gaps tracked",
    "Top-5 executive actions queued",
  ],
};

export const V14_CAPITAL_EXEC = {
  score: 84,
  actions: [
    { action: "Refresh capital narrative",          owner: "CFO",   due: "this Q",  status: "in_progress", evidence: "Required" },
    { action: "Lock Q+1 data room snapshot",        owner: "CFO",   due: "this Q",  status: "in_progress", evidence: "Required" },
    { action: "Investor narrative dry run",         owner: "CEO",   due: "next Q",  status: "planned",     evidence: "Required" },
    { action: "Concentration reduction plan",       owner: "CRO",   due: "this Q",  status: "in_progress", evidence: "Required" },
    { action: "Marketplace economics evidence",     owner: "MP Ops", due: "this Q", status: "in_progress", evidence: "Required" },
    { action: "Revenue durability evidence pack",   owner: "RevOps", due: "this Q", status: "in_progress", evidence: "Required" },
    { action: "Strategic risk register refresh",    owner: "CRO",   due: "this Q",  status: "tracking",    evidence: "Required" },
    { action: "Board governance evidence pack",     owner: "Board admin", due: "next Q", status: "planned", evidence: "Required" },
  ],
  blockers: [
    { area: "API revenue evidence",   severity: "medium", note: "Metering audit gap" },
    { area: "EDI revenue placeholder", severity: "medium", note: "Audit not started" },
  ],
};

export const V14_REVENUE_DURABILITY = {
  score: 86,
  domains: [
    { domain: "Recurring revenue",    durability: "strong",   evidence: "fresh",   risk: "low" },
    { domain: "Usage revenue",        durability: "moderate", evidence: "fresh",   risk: "medium" },
    { domain: "Marketplace revenue",  durability: "improving", evidence: "stale",  risk: "medium" },
    { domain: "API revenue",          durability: "early",    evidence: "missing", risk: "medium" },
    { domain: "EDI revenue (ph)",     durability: "early",    evidence: "missing", risk: "medium" },
    { domain: "Partner revenue",      durability: "moderate", evidence: "fresh",   risk: "low" },
    { domain: "Expansion revenue",    durability: "strong",   evidence: "fresh",   risk: "low" },
    { domain: "Renewal",              durability: "strong",   evidence: "fresh",   risk: "low" },
  ],
  concentration: [
    { lens: "Customer top-10", pct: 36, trend: "down", risk: "medium" },
    { lens: "Product line",    pct: 42, trend: "flat", risk: "medium" },
    { lens: "Region",          pct: 31, trend: "down", risk: "low" },
  ],
  payment_health: 96,
  evidence_to_refresh: 2,
};

export const V14_REVENUE_CONTROLS = {
  score: 82,
  controls: [
    { control: "Subscription durability",   owner: "RevOps", status: "passing",   last_test: "this Q" },
    { control: "Renewal durability",        owner: "CSM",    status: "passing",   last_test: "this Q" },
    { control: "Expansion durability",      owner: "CRO",    status: "passing",   last_test: "this Q" },
    { control: "Marketplace durability",    owner: "MP Ops", status: "in_progress", last_test: "this Q" },
    { control: "API durability",            owner: "API PM", status: "in_progress", last_test: "this Q" },
    { control: "EDI durability (ph)",       owner: "API PM", status: "planned",   last_test: "—" },
    { control: "Partner revenue",           owner: "PartnerOps", status: "passing", last_test: "this Q" },
    { control: "Payment health",            owner: "Billing", status: "passing",  last_test: "this Q" },
    { control: "Billing dispute mgmt",      owner: "Billing", status: "passing",  last_test: "this Q" },
    { control: "Evidence freshness",        owner: "RevOps", status: "watch",     last_test: "this Q" },
    { control: "Revenue exception mgmt",    owner: "RevOps", status: "passing",   last_test: "this Q" },
    { control: "Concentration monitoring",  owner: "CRO",    status: "passing",   last_test: "this Q" },
  ],
  exceptions: [
    { exception: "MP fee variance (1 lane)",     owner: "MP Ops", status: "in_progress" },
    { exception: "API metering drift (1 client)", owner: "API PM", status: "in_progress" },
  ],
};

export const V14_MP_ECON = {
  score: 79,
  regions: [
    { region: "Texas",     economics: 86, density: "high",   take_rate: "12%", risk: "low" },
    { region: "Midwest",   economics: 84, density: "high",   take_rate: "12%", risk: "low" },
    { region: "West",      economics: 77, density: "med",    take_rate: "11%", risk: "medium" },
    { region: "Northeast", economics: 74, density: "med",    take_rate: "11%", risk: "medium" },
    { region: "Southeast", economics: 62, density: "low",    take_rate: "10%", risk: "high" },
  ],
  kpis: {
    fee_capture_pct: 97,
    load_coverage_pct: 92,
    avg_bids_per_load: 4.1,
    time_to_first_bid_min: 6,
    time_to_award_min: 22,
    carrier_quality: 88,
    carrier_compliance: 94,
    carrier_concentration_pct: 21,
    unit_econ_confidence: "moderate",
  },
  action_plan: [
    "Preferred carrier growth in Southeast",
    "Lane rationalization in low-margin lanes",
    "Carrier compliance refresh in West/Northeast",
  ],
};

export const V14_MP_CONTROLS = {
  score: 80,
  controls: [
    { control: "Fee control",            owner: "MP Ops", status: "passing" },
    { control: "Load coverage",          owner: "MP Ops", status: "passing" },
    { control: "Carrier quality",        owner: "MP Ops", status: "passing" },
    { control: "Carrier compliance",     owner: "Compliance", status: "passing" },
    { control: "Regional liquidity",     owner: "MP Ops", status: "watch" },
    { control: "Lane liquidity",         owner: "MP Ops", status: "watch" },
    { control: "Dispute cost (ph)",      owner: "Billing", status: "planned" },
    { control: "Settlement (ph)",        owner: "Billing", status: "planned" },
    { control: "Unit econ evidence",     owner: "MP Ops", status: "in_progress" },
    { control: "MP revenue evidence",    owner: "RevOps", status: "in_progress" },
    { control: "MP risk escalation",     owner: "CRO",    status: "passing" },
  ],
  exceptions: [
    { exception: "Southeast carrier supply", owner: "MP Ops", status: "in_progress" },
  ],
};

export const V14_CATEGORY = {
  score: 88,
  pillars: [
    { pillar: "Category narrative",    maturity: "strong" },
    { pillar: "Market education",      maturity: "strong" },
    { pillar: "Competitive position",  maturity: "strong" },
    { pillar: "Differentiation",       maturity: "strong" },
    { pillar: "Customer proof",        maturity: "strong" },
    { pillar: "Marketplace proof",     maturity: "moderate" },
    { pillar: "AI operations proof",   maturity: "moderate" },
    { pillar: "Enterprise trust proof", maturity: "strong" },
    { pillar: "Product proof",         maturity: "strong" },
    { pillar: "Partner proof",         maturity: "moderate" },
    { pillar: "Sales narrative",       maturity: "strong" },
    { pillar: "Board narrative",       maturity: "strong" },
    { pillar: "Thought leadership ph", maturity: "early" },
  ],
};

export const V14_CATEGORY_EVIDENCE = {
  score: 81,
  items: [
    { evidence: "Customer outcome (3 logos)", freshness: "fresh",   approved: true,  owner: "Strategy" },
    { evidence: "Marketplace proof pack",     freshness: "stale",   approved: false, owner: "MP Ops" },
    { evidence: "Driver adoption",            freshness: "fresh",   approved: true,  owner: "Product" },
    { evidence: "Customer portal usage",      freshness: "fresh",   approved: true,  owner: "Product" },
    { evidence: "CoPilot proof",              freshness: "fresh",   approved: true,  owner: "AI Ops" },
    { evidence: "Support reliability",        freshness: "fresh",   approved: true,  owner: "Support" },
    { evidence: "Integration reliability",    freshness: "fresh",   approved: true,  owner: "Platform" },
    { evidence: "Enterprise trust",           freshness: "fresh",   approved: true,  owner: "Security" },
    { evidence: "Security/compliance",        freshness: "fresh",   approved: true,  owner: "Security" },
    { evidence: "Partner ecosystem",          freshness: "stale",   approved: false, owner: "PartnerOps" },
    { evidence: "Product durability",         freshness: "fresh",   approved: true,  owner: "Product" },
    { evidence: "Competitive differentiation", freshness: "fresh",  approved: true,  owner: "Strategy" },
  ],
};

export const V14_VALUE_TOWER = {
  score: 87,
  drivers: [
    { driver: "Revenue durability",      value: 86, trend: "up" },
    { driver: "Marketplace economics",   value: 79, trend: "up" },
    { driver: "Capital execution",       value: 84, trend: "up" },
    { driver: "Strategic account value", value: 82, trend: "up" },
    { driver: "Partner value",           value: 77, trend: "flat" },
    { driver: "Product-line value",      value: 75, trend: "flat" },
    { driver: "Category leadership",     value: 88, trend: "up" },
  ],
  actions: [
    { action: "Refresh revenue durability evidence", owner: "RevOps", due: "this Q", status: "in_progress" },
    { action: "Reduce customer concentration",       owner: "CRO",    due: "this Q", status: "in_progress" },
    { action: "Improve Southeast MP economics",      owner: "MP Ops", due: "this Q", status: "in_progress" },
    { action: "Expand CoPilot in strategic accts",   owner: "CSM",    due: "next Q", status: "planned" },
    { action: "Approve partner value optimization",  owner: "CEO",    due: "this Q", status: "pending approval" },
  ],
  decisions: [
    { decision: "Approve concentration reduction plan", owner: "Board", status: "pending" },
    { decision: "Approve Southeast MP investment",      owner: "Board", status: "pending" },
  ],
  brief: "Top-5 actions are owned and on cadence; two board decisions are queued.",
};

export const V14_BOARD_EXEC = {
  score: 90,
  agenda: [
    { item: "Capital execution",         owner: "CFO",    decision_needed: false },
    { item: "Revenue durability",        owner: "CFO",    decision_needed: false },
    { item: "Marketplace economics",     owner: "MP Ops", decision_needed: true  },
    { item: "Customer concentration",    owner: "CRO",    decision_needed: true  },
    { item: "Strategic account value",   owner: "CRO",    decision_needed: false },
    { item: "Partner value",             owner: "PartnerOps", decision_needed: false },
    { item: "Category leadership",       owner: "Strategy", decision_needed: false },
    { item: "Strategic risk decisions",  owner: "CRO",    decision_needed: true  },
  ],
  decision_queue: [
    { decision: "Southeast MP capital allocation",    owner: "Board", status: "pending" },
    { decision: "Concentration reduction plan",       owner: "Board", status: "pending" },
    { decision: "Partner value optimization charter", owner: "Board", status: "pending" },
  ],
  risk_review: [
    { risk: "Customer concentration",        level: "medium", trend: "down" },
    { risk: "Southeast MP supply",           level: "high",   trend: "flat" },
    { risk: "API revenue maturity",          level: "medium", trend: "up" },
  ],
};

export const V14_CADENCE = {
  score: 89,
  cadences: [
    { cadence: "Weekly exec value creation",   frequency: "weekly",    owner: "CEO",  completion: 100 },
    { cadence: "Weekly revenue durability",    frequency: "weekly",    owner: "CFO",  completion: 100 },
    { cadence: "Weekly marketplace economics", frequency: "weekly",    owner: "MP Ops", completion: 92 },
    { cadence: "Weekly strategic account",     frequency: "weekly",    owner: "CRO",  completion: 100 },
    { cadence: "Weekly partner value",         frequency: "weekly",    owner: "PartnerOps", completion: 88 },
    { cadence: "Monthly capital execution",    frequency: "monthly",   owner: "CFO",  completion: 100 },
    { cadence: "Monthly commercial diligence", frequency: "monthly",   owner: "RevOps", completion: 100 },
    { cadence: "Monthly category leadership",  frequency: "monthly",   owner: "Strategy", completion: 100 },
    { cadence: "Monthly board prep",           frequency: "monthly",   owner: "Board admin", completion: 100 },
    { cadence: "Quarterly strategic operating", frequency: "quarterly", owner: "CEO",  completion: 100 },
    { cadence: "Quarterly capital strategy",   frequency: "quarterly", owner: "CFO",  completion: 100 },
    { cadence: "Annual strategic planning ph", frequency: "annual",    owner: "CEO",  completion: 50 },
  ],
};

export const V14_STRATEGIC_RISK = {
  score: 80,
  risks: [
    { risk: "Capital execution",           level: "low",    owner: "CFO",  mitigation: "Quarterly review" },
    { risk: "Revenue durability",          level: "low",    owner: "CFO",  mitigation: "Evidence refresh" },
    { risk: "Customer concentration",      level: "medium", owner: "CRO",  mitigation: "4-logo program" },
    { risk: "Marketplace economics",       level: "medium", owner: "MP Ops", mitigation: "Southeast plan" },
    { risk: "API/EDI revenue",             level: "medium", owner: "API PM", mitigation: "Metering audit" },
    { risk: "Partner dependency",          level: "low",    owner: "PartnerOps", mitigation: "Diversify" },
    { risk: "Strategic account",           level: "low",    owner: "CRO",  mitigation: "Exec sponsor" },
    { risk: "Product durability",          level: "low",    owner: "Product", mitigation: "Roadmap" },
    { risk: "Commercial diligence",        level: "low",    owner: "RevOps", mitigation: "Cadence" },
    { risk: "Capital evidence",            level: "low",    owner: "CFO",  mitigation: "Owner board" },
    { risk: "Board execution",             level: "low",    owner: "Board", mitigation: "Agenda" },
    { risk: "Category leadership",         level: "low",    owner: "Strategy", mitigation: "Proof packs" },
    { risk: "Competitive",                 level: "medium", owner: "Strategy", mitigation: "Differentiation" },
    { risk: "Global expansion",            level: "medium", owner: "Intl", mitigation: "Controlled pilots" },
    { risk: "Operational scalability",     level: "medium", owner: "COO",  mitigation: "Capacity plan" },
  ],
  exceptions: [
    { exception: "Southeast supply", owner: "MP Ops", status: "in_progress" },
  ],
};

export const V14_STRATEGIC_ACCT = {
  score: 82,
  accounts: [
    { account: "Halberd Logistics",  owner: "CSM-A", sponsor: "CEO",  adoption: "high",   expansion: "CoPilot + API",  risk: "low",    trust: 92, next: "QBR" },
    { account: "Greysteel Freight",  owner: "CSM-B", sponsor: "CRO",  adoption: "high",   expansion: "Marketplace",    risk: "medium", trust: 84, next: "Expansion plan" },
    { account: "Verda Cold Chain",   owner: "CSM-C", sponsor: "COO",  adoption: "medium", expansion: "Driver mobile",  risk: "low",    trust: 88, next: "Adoption push" },
    { account: "Northstar Carriers", owner: "CSM-A", sponsor: "CEO",  adoption: "high",   expansion: "EDI",            risk: "medium", trust: 86, next: "EDI scoping" },
    { account: "ClearPath Brokers",  owner: "CSM-B", sponsor: "CRO",  adoption: "medium", expansion: "Portal",         risk: "medium", trust: 80, next: "Enablement" },
  ],
};

export const V14_PARTNER_VALUE = {
  score: 77,
  partners: [
    { partner: "GeoTab",     owner: "PartnerOps-A", category: "telematics", sourced: "$1.2M", influenced: "$3.1M", health: "green",  risk: "low",    next: "Joint case study" },
    { partner: "HERE",       owner: "PartnerOps-B", category: "mapping",    sourced: "$0.4M", influenced: "$1.8M", health: "green",  risk: "low",    next: "Intl enablement" },
    { partner: "Verda",      owner: "PartnerOps-A", category: "cold chain", sourced: "$0.8M", influenced: "$1.2M", health: "green",  risk: "low",    next: "Expansion" },
    { partner: "ClearPath",  owner: "PartnerOps-B", category: "brokerage",  sourced: "$0.2M", influenced: "$0.6M", health: "yellow", risk: "medium", next: "Enablement low" },
  ],
};

export const V14_PRODUCT_LINE = {
  score: 75,
  lines: [
    { line: "Dispatch Command",   value: 88, adoption: "high", retention: "+", expansion: "+", support: "med", reliability: "high", debt: "low",  competitive: "strong",   category: "strong",   invest: "maintain" },
    { line: "EliteNav",           value: 86, adoption: "high", retention: "+", expansion: "+", support: "med", reliability: "high", debt: "low",  competitive: "strong",   category: "strong",   invest: "maintain" },
    { line: "Driver Mobile",      value: 82, adoption: "high", retention: "+", expansion: "0", support: "med", reliability: "high", debt: "med",  competitive: "moderate", category: "moderate", invest: "maintain" },
    { line: "Customer Portal",    value: 78, adoption: "med",  retention: "+", expansion: "+", support: "low", reliability: "high", debt: "low",  competitive: "moderate", category: "moderate", invest: "grow" },
    { line: "CoPilot AI",         value: 92, adoption: "med",  retention: "+", expansion: "+", support: "low", reliability: "high", debt: "med",  competitive: "strong",   category: "strong",   invest: "double-down" },
    { line: "Carrier Marketplace", value: 90, adoption: "high", retention: "+", expansion: "+", support: "med", reliability: "high", debt: "med",  competitive: "strong",  category: "strong",   invest: "double-down" },
    { line: "API Platform",       value: 84, adoption: "med",  retention: "+", expansion: "+", support: "low", reliability: "high", debt: "low",  competitive: "strong",   category: "strong",   invest: "grow" },
    { line: "EDI Platform",       value: 62, adoption: "med",  retention: "0", expansion: "0", support: "high", reliability: "med", debt: "high", competitive: "moderate", category: "moderate", invest: "rationalize" },
    { line: "Telematics",         value: 70, adoption: "med",  retention: "+", expansion: "0", support: "med", reliability: "high", debt: "med",  competitive: "moderate", category: "moderate", invest: "maintain" },
    { line: "Partner Marketplace", value: 68, adoption: "med", retention: "+", expansion: "+", support: "med", reliability: "high", debt: "med",  competitive: "moderate", category: "moderate", invest: "grow" },
    { line: "Reports/Analytics",  value: 76, adoption: "high", retention: "+", expansion: "+", support: "low", reliability: "high", debt: "low",  competitive: "moderate", category: "moderate", invest: "grow" },
    { line: "Enterprise Gov.",    value: 81, adoption: "med",  retention: "+", expansion: "+", support: "low", reliability: "high", debt: "low",  competitive: "strong",   category: "strong",   invest: "maintain" },
  ],
};

export const V14_STRATEGIC_INVEST = {
  score: 78,
  investments: [
    { category: "Enterprise sales",     owner: "CRO",         thesis: "Logo diversification",        impact: "ARR +$4M ph", risk: "low",    approval: "approved", board: true,  status: "execution", outcome: "tracking", next: "Hire 4 AEs" },
    { category: "Customer success",     owner: "CCO",         thesis: "Retention durability",        impact: "GRR +200bps ph", risk: "low", approval: "approved", board: false, status: "execution", outcome: "tracking", next: "QBR cadence" },
    { category: "Marketplace liquidity", owner: "MP Ops",     thesis: "Southeast supply",            impact: "Coverage +6pts ph", risk: "med", approval: "in_review", board: true, status: "scope", outcome: "ph", next: "Board approval" },
    { category: "Carrier network",      owner: "MP Ops",      thesis: "Preferred carriers",          impact: "Quality +5pts ph", risk: "low", approval: "approved", board: false, status: "execution", outcome: "tracking", next: "Wave 2" },
    { category: "API/EDI platform",     owner: "API PM",      thesis: "Metering evidence",           impact: "Audit ready ph", risk: "med", approval: "approved", board: false, status: "execution", outcome: "ph",      next: "Audit pilot" },
    { category: "Partner ecosystem",    owner: "PartnerOps",  thesis: "Attribution upgrade",         impact: "Sourced +25% ph", risk: "low", approval: "in_review", board: false, status: "scope", outcome: "ph",      next: "Charter" },
    { category: "Product durability",   owner: "Product",     thesis: "Debt reduction",              impact: "Support cost -15% ph", risk: "low", approval: "approved", board: false, status: "execution", outcome: "tracking", next: "Wave 3" },
    { category: "Trust/compliance",     owner: "Security",    thesis: "Evidence vault",              impact: "Diligence ready",  risk: "low",    approval: "approved", board: true,  status: "execution", outcome: "tracking", next: "Refresh" },
    { category: "Data governance",      owner: "Platform",    thesis: "Lineage",                     impact: "Reporting trust",  risk: "low",    approval: "approved", board: false, status: "execution", outcome: "tracking", next: "Coverage" },
    { category: "AI governance",        owner: "AI Ops",      thesis: "Approval workflows",          impact: "AI trust",         risk: "low",    approval: "approved", board: true,  status: "execution", outcome: "tracking", next: "Audit" },
    { category: "Sales engineering",    owner: "CRO",         thesis: "Strategic logo close",        impact: "Win rate +5pts ph", risk: "low",   approval: "approved", board: false, status: "execution", outcome: "tracking", next: "Pod" },
    { category: "Support scaling",      owner: "Support",     thesis: "Enterprise SLA",              impact: "CSAT +3pts ph",    risk: "low",    approval: "approved", board: false, status: "execution", outcome: "tracking", next: "Tier-2" },
    { category: "International expansion", owner: "Intl",     thesis: "Controlled pilots",           impact: "Pilot revenue ph", risk: "med",    approval: "in_review", board: true,  status: "scope", outcome: "ph", next: "Country select" },
    { category: "Category leadership",  owner: "Strategy",    thesis: "Proof maturity",              impact: "Win narrative",    risk: "low",    approval: "approved", board: false, status: "execution", outcome: "tracking", next: "Proof pack" },
    { category: "Capital execution",    owner: "CFO",         thesis: "Evidence + cadence",          impact: "Capital ready ph", risk: "low",    approval: "approved", board: true,  status: "execution", outcome: "tracking", next: "Refresh" },
  ],
};

export const V14_CAPITAL_EVIDENCE = {
  score: 83,
  items: [
    { category: "Revenue durability",    freshness: "fresh",   owner: "CFO",       gap: false },
    { category: "Marketplace economics", freshness: "stale",   owner: "MP Ops",    gap: true  },
    { category: "Concentration",         freshness: "fresh",   owner: "CRO",       gap: false },
    { category: "Strategic account",     freshness: "fresh",   owner: "CRO",       gap: false },
    { category: "Partner value",         freshness: "stale",   owner: "PartnerOps", gap: true  },
    { category: "Product durability",    freshness: "fresh",   owner: "Product",   gap: false },
    { category: "Enterprise trust",      freshness: "fresh",   owner: "Security",  gap: false },
    { category: "Category leadership",   freshness: "fresh",   owner: "Strategy",  gap: false },
    { category: "Board governance",      freshness: "fresh",   owner: "Board admin", gap: false },
    { category: "Strategic risk",        freshness: "fresh",   owner: "CRO",       gap: false },
    { category: "Technical architecture", freshness: "fresh",  owner: "Platform",  gap: false },
    { category: "Operating model",       freshness: "fresh",   owner: "COO",       gap: false },
    { category: "Commercial diligence",  freshness: "fresh",   owner: "RevOps",    gap: false },
  ],
};

export const V14_DILIGENCE = {
  score: 85,
  domains: [
    { domain: "Pipeline evidence",         status: "passing", owner: "RevOps", evidence: "fresh" },
    { domain: "Deal execution evidence",   status: "passing", owner: "Deal desk", evidence: "fresh" },
    { domain: "Revenue durability",        status: "passing", owner: "RevOps", evidence: "fresh" },
    { domain: "Customer concentration",    status: "passing", owner: "CRO", evidence: "fresh" },
    { domain: "Marketplace economics",     status: "watch",   owner: "MP Ops", evidence: "stale" },
    { domain: "API/EDI revenue",           status: "watch",   owner: "API PM", evidence: "in_progress" },
    { domain: "Partner value",             status: "watch",   owner: "PartnerOps", evidence: "stale" },
    { domain: "Pricing/package",           status: "passing", owner: "PMM", evidence: "fresh" },
    { domain: "Procurement",               status: "passing", owner: "Finance", evidence: "fresh" },
    { domain: "Trust-led sales",           status: "passing", owner: "Security", evidence: "fresh" },
    { domain: "Commercial risk",           status: "passing", owner: "CRO", evidence: "fresh" },
    { domain: "Board reporting",           status: "passing", owner: "Board admin", evidence: "fresh" },
    { domain: "Category proof",            status: "watch",   owner: "Strategy", evidence: "in_progress" },
  ],
  exceptions: [
    { exception: "MP economics evidence stale", owner: "MP Ops", status: "in_progress" },
    { exception: "Partner value evidence stale", owner: "PartnerOps", status: "in_progress" },
  ],
};

export const V14_REPORTING = {
  reports: [
    "Enterprise strategic operating system",
    "Capital execution maturity",
    "Long-term revenue durability",
    "Revenue durability controls",
    "Global marketplace economics governance",
    "Marketplace economics controls",
    "Category leadership stewardship",
    "Category leadership evidence",
    "Executive value creation control",
    "Board strategic execution",
    "Strategic operating cadence",
    "Strategic risk control",
    "Strategic account value governance",
    "Partner ecosystem value governance",
    "Product-line strategic stewardship",
    "Strategic investment execution",
    "Capital evidence control",
    "Commercial diligence control",
    "Enterprise value creation",
    "Long-term strategic operating roadmap",
  ],
  next_priorities: [
    "Southeast marketplace economics",
    "Customer concentration top-10",
    "API/EDI revenue evidence",
    "Partner attribution upgrade",
    "Category leadership proof packs",
  ],
};

export const V14_ROADMAP = [
  { horizon: "Current quarter", initiatives: ["Refresh capital narrative", "Southeast MP supply pilot", "Concentration program wave 1"] },
  { horizon: "Next quarter",    initiatives: ["Board capital allocation OK", "API metering audit pilot", "Partner attribution upgrade"] },
  { horizon: "6 months",        initiatives: ["MP economics +5 pts", "Concentration top-10 <30%", "Category proof refresh"] },
  { horizon: "12 months",       initiatives: ["Revenue durability >90", "Strategic acct value >90", "Product-line stewardship >85"] },
  { horizon: "24 months",       initiatives: ["MP economics governance >90", "Category leadership >95", "Capital execution >95"] },
  { horizon: "36 months",       initiatives: ["V15+ capital-readiness platform", "Multi-region durability", "Long-term value programs"] },
];

export const V14_BACKEND_BOUNDARY = {
  server_fns: [
    "calculate-v14-strategic-operating-score",
    "generate-strategic-operating-summary",
    "generate-strategic-operating-action-plan",
    "calculate-capital-execution-maturity",
    "generate-capital-execution-report",
    "detect-capital-execution-blockers",
    "calculate-long-term-revenue-durability",
    "calculate-revenue-durability-control-score",
    "detect-revenue-durability-control-exceptions",
    "calculate-global-marketplace-economics-governance-score",
    "calculate-marketplace-economics-control-score",
    "generate-marketplace-economics-action-plan",
    "calculate-category-leadership-stewardship-score",
    "calculate-category-evidence-maturity",
    "generate-category-leadership-summary",
    "calculate-executive-value-creation-control-score",
    "calculate-strategic-account-value-governance",
    "calculate-partner-ecosystem-value-governance",
    "calculate-product-line-strategic-value",
    "generate-board-strategic-execution-report",
    "calculate-strategic-risk-control-score",
    "calculate-capital-evidence-control-score",
    "calculate-commercial-diligence-control-score",
    "generate-long-term-strategic-operating-roadmap",
  ],
  public_webhooks: [
    "/api/public/v14/investor-durability-digest (HMAC, no PII)",
    "/api/public/v14/board-value-digest (HMAC, no PII)",
  ],
};

export const V14_EDGE_VS_SERVERFN = [
  { kind: "ServerFn", surface: "createServerFn + requireSupabaseAuth", example: "calculate-v14-strategic-operating-score", why: "Internal RBAC + RLS" },
  { kind: "ServerFn", surface: "createServerFn + requireSupabaseAuth", example: "generate-board-strategic-execution-report", why: "Board scope" },
  { kind: "Public route", surface: "/api/public/v14/* HMAC", example: "investor-durability-digest", why: "External signed digest, no PII" },
  { kind: "Public route", surface: "/api/public/v14/* HMAC", example: "board-value-digest", why: "External board portal, no PII" },
];

export const V14_RLS_EXAMPLES = [
  "company_admins can view company-level strategic account + value records",
  "platform_owner can view platform-wide strategic operating + capital records",
  "exec can view capital exec, board strategic, enterprise value, strategic risk",
  "board role can view approved board strategic reports only",
  "revops can manage revenue durability + commercial diligence",
  "billing can view revenue durability, MP economics, API/EDI, partner value",
  "csm can view assigned strategic account value records",
  "partner_mgr can view partner ecosystem value governance",
  "product_lead can view product-line strategic stewardship",
  "diligence + capital evidence restricted to exec/admin",
  "customer users blocked from internal strategic / capital / board / diligence",
  "carrier users blocked from marketplace economics internals",
  "partner users limited to approved partner-facing records",
];

export const V14_RLS_SQL_SNIPPETS = [
  {
    table: "v14_strategic_operating_scores",
    sql: `create policy "v14_sos_exec_read" on public.v14_strategic_operating_scores
for select to authenticated using (
  public.has_role(auth.uid(), company_id, 'exec'::app_role)
  or public.is_platform_owner(auth.uid())
);`,
  },
  {
    table: "board_strategic_execution_records",
    sql: `create policy "v14_board_exec_read_approved" on public.board_strategic_execution_records
for select to authenticated using (
  status = 'approved' and (
    public.has_role(auth.uid(), company_id, 'board'::app_role)
    or public.has_role(auth.uid(), company_id, 'exec'::app_role)
  )
);`,
  },
  {
    table: "partner_ecosystem_value_governance_records",
    sql: `create policy "v14_partner_value_approved_read" on public.partner_ecosystem_value_governance_records
for select to authenticated using (
  partner_visible = true and status = 'approved'
  and public.has_role(auth.uid(), company_id, 'partner'::app_role)
);`,
  },
  {
    table: "capital_evidence_control_records",
    sql: `create policy "v14_capital_evidence_exec_only" on public.capital_evidence_control_records
for select to authenticated using (
  public.has_role(auth.uid(), company_id, 'exec'::app_role)
  or public.has_role(auth.uid(), company_id, 'cfo'::app_role)
);`,
  },
];

export const V14_DEMO = [
  { who: "CEO",          to: "/v14/sos",              title: "Open Enterprise Strategic Operating System", detail: "SOS 91 · Cap 84 · Durability 86 · MP 79 · Category 88." },
  { who: "CFO",          to: "/v14/revenue-durability", title: "Open Long-Term Revenue Durability Center", detail: "Recurring strong; MP improving; API early; 2 evidence to refresh." },
  { who: "MP leader",    to: "/v14/mp-econ",          title: "Open Global Marketplace Economics Governance", detail: "Texas/Midwest strong, Southeast weak, unit econ confidence moderate." },
  { who: "Strategy lead", to: "/v14/category",        title: "Open Category Leadership Stewardship",       detail: "Narrative strong, MP proof needs approved evidence." },
  { who: "Board admin",  to: "/v14/board-exec",       title: "Open Board-Level Strategic Execution",       detail: "Agenda covers capital, durability, MP, concentration, partner, category, risk." },
  { who: "Product lead", to: "/v14/product-line",     title: "Open Product-Line Strategic Stewardship",    detail: "CoPilot + MP high value; EDI high support burden; API early revenue." },
  { who: "CEO",          to: "/v14/value-tower",      title: "Open Executive Value Creation Control Tower", detail: "Top-5: refresh durability evidence, reduce concentration, MP SE, CoPilot expand, partner plan." },
];

export const V14_PHASE42_TEASER = [
  "V14.5 enterprise operating excellence",
  "Strategic capital discipline",
  "Durable revenue systems",
  "Marketplace economics scale",
  "Category leadership execution maturity",
  "Strengthened RLS + edge separation",
];
