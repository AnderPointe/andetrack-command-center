// Phase 39 — V13 enterprise capital readiness. Mock-only.
// No autonomous dispatch. No final IPO/acquisition/audit/SOC2/ISO claims.

export const V13_FEATURE_MATRIX = [
  { area: "Enterprise Capital Readiness Command", ga: "ready", notes: "Cross-org capital OS" },
  { area: "Revenue Intelligence Maturity",        ga: "ready", notes: "Mix + predictability placeholders" },
  { area: "Commercial Diligence System",          ga: "ready", notes: "15 evidence areas" },
  { area: "Capital Data Room Command",            ga: "beta",  notes: "Diligence-ready sections" },
  { area: "Investor/Acquirer Evidence Center",    ga: "beta",  notes: "Narrative + freshness" },
  { area: "Revenue Quality Evidence Center",      ga: "ready", notes: "13 evidence categories" },
  { area: "Customer Concentration Governance",    ga: "ready", notes: "Top-N + mitigations" },
  { area: "Strategic Account Value Creation",     ga: "ready", notes: "Value plans per account" },
  { area: "Retention & Expansion Value",          ga: "ready", notes: "Risk + pipeline value" },
  { area: "Marketplace Economics Governance",     ga: "beta",  notes: "Lane + take rate placeholders" },
  { area: "Marketplace Unit Economics",           ga: "placeholder", notes: "Confidence not asserted" },
  { area: "API/EDI Revenue Maturity",             ga: "beta",  notes: "Metered + EDI placeholders" },
  { area: "Partner Value Governance",             ga: "ready", notes: "Value matrix + attribution" },
  { area: "Commercial Forecast Evidence",         ga: "placeholder", notes: "Accuracy not claimed" },
  { area: "Growth Investment Governance",         ga: "ready", notes: "12 categories" },
  { area: "Executive Value Creation Dashboard",   ga: "ready", notes: "Value drivers + actions" },
  { area: "Board Capital Governance Center",      ga: "ready", notes: "Capital review workflows" },
  { area: "Strategic Capital Risk Register",      ga: "ready", notes: "14 risk categories" },
  { area: "Enterprise Valuation Drivers",         ga: "placeholder", notes: "No valuation calculated" },
  { area: "Long-Term Capital Strategy Roadmap",   ga: "ready", notes: "6 horizons × 12 tracks" },
];

export const V13_DEFERRED = [
  "Fully autonomous dispatch",
  "Final IPO / acquisition readiness claims",
  "Final audited financial claims",
  "Final SOC 2 / ISO certification claims",
  "Full customs production workflows",
  "Full international tax automation",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "Final Android Auto / CarPlay claims",
];

export const V13_CAPITAL_READINESS = {
  score: 83, trend_qoq: +4,
  kpis: [
    { kpi: "Revenue evidence maturity",      pct: 86 },
    { kpi: "Commercial auditability",        pct: 84 },
    { kpi: "Customer concentration risk",    pct: 62, lowerIsBetter: true },
    { kpi: "Revenue concentration risk",     pct: 58, lowerIsBetter: true },
    { kpi: "Marketplace economics maturity", pct: 71 },
    { kpi: "API/EDI revenue maturity",       pct: 64 },
    { kpi: "Partner channel maturity",       pct: 78 },
    { kpi: "Retention/expansion maturity",   pct: 82 },
    { kpi: "Board reporting maturity",       pct: 80 },
    { kpi: "Data room readiness",            pct: 74 },
    { kpi: "Strategic risk readiness",       pct: 76 },
    { kpi: "Product durability",             pct: 81 },
    { kpi: "Trust evidence readiness",       pct: 83 },
    { kpi: "Investor narrative readiness",   pct: 72 },
    { kpi: "Acquirer narrative readiness",   pct: 68 },
  ],
  gaps: [
    { gap: "Legal placeholder docs in data room",    owner: "Legal",    severity: "med" },
    { gap: "Certification evidence placeholders",    owner: "Security", severity: "med" },
    { gap: "Top-10 customer concentration at 38%",   owner: "CRO",      severity: "med" },
    { gap: "Marketplace unit economics confidence",  owner: "MP Ops",   severity: "low" },
  ],
  actions: [
    { action: "Fill legal placeholders in data room",       owner: "Legal",    impact: "data room", due: "this Q" },
    { action: "Refresh trust packet w/ Q evidence",         owner: "Security", impact: "evidence",  due: "30d" },
    { action: "Diversify Top-10 with 3 strategic accts",    owner: "CRO",      impact: "risk",      due: "this Q" },
    { action: "Land Southeast carrier density program",     owner: "MP Ops",   impact: "MP",        due: "this Q" },
  ],
  exec_summary: [
    "Capital readiness 83% with QoQ +4.",
    "Revenue evidence and trust evidence strongest contributors.",
    "Concentration and data room legal/cert evidence remain top gaps.",
  ],
};

export const V13_REV_INTEL = {
  score: 86,
  mix: [
    { line: "Subscription",      quality: 90, share_pct: 58 },
    { line: "Usage (CoPilot)",   quality: 78, share_pct: 9 },
    { line: "Marketplace fees",  quality: 74, share_pct: 14 },
    { line: "API",               quality: 68, share_pct: 4 },
    { line: "EDI (placeholder)", quality: 60, share_pct: 3 },
    { line: "Partner-sourced",   quality: 76, share_pct: 8 },
    { line: "Expansion",         quality: 82, share_pct: 12 },
    { line: "Renewal",           quality: 84, share_pct: 0 },
  ],
  regions: [
    { region: "US-Central",   maturity: 88 },
    { region: "US-South",     maturity: 82 },
    { region: "US-Northeast", maturity: 80 },
    { region: "US-West",      maturity: 78 },
    { region: "Canada",       maturity: 70 },
    { region: "Mexico",       maturity: 64 },
  ],
  risks: [
    { risk: "Top-10 concentration 38%",            severity: "med", owner: "CRO" },
    { risk: "EDI placeholder reconciliation",      severity: "low", owner: "Billing" },
    { risk: "Marketplace seasonality unhedged",    severity: "med", owner: "MP Ops" },
  ],
};

export const V13_DILIGENCE = [
  { area: "Enterprise pipeline evidence",   completeness: 88, owner: "RevOps",    status: "ready" },
  { area: "Revenue quality evidence",       completeness: 86, owner: "Billing",   status: "ready" },
  { area: "Customer concentration evidence",completeness: 74, owner: "CRO",       status: "at_risk" },
  { area: "Customer retention evidence",    completeness: 84, owner: "CSM Lead",  status: "ready" },
  { area: "Expansion evidence",             completeness: 82, owner: "CSM Lead",  status: "ready" },
  { area: "Marketplace revenue evidence",   completeness: 71, owner: "MP Ops",    status: "at_risk" },
  { area: "API/EDI usage evidence",         completeness: 68, owner: "API PM",    status: "at_risk" },
  { area: "Partner channel evidence",       completeness: 76, owner: "Partner",   status: "review" },
  { area: "Pricing/package evidence",       completeness: 81, owner: "Pricing",   status: "ready" },
  { area: "Deal desk evidence",             completeness: 90, owner: "Deal Desk", status: "ready" },
  { area: "Customer proof evidence",        completeness: 78, owner: "Marketing", status: "review" },
  { area: "Trust-led sales evidence",       completeness: 83, owner: "Security",  status: "ready" },
  { area: "Procurement evidence",           completeness: 72, owner: "Security",  status: "at_risk" },
  { area: "Commercial risk evidence",       completeness: 79, owner: "CRO",       status: "review" },
  { area: "Board reporting evidence",       completeness: 85, owner: "CFO",       status: "ready" },
];

export const V13_DATA_ROOM = [
  { section: "Company overview",        owner: "CEO",      status: "ready" },
  { section: "Product overview",        owner: "CPO",      status: "ready" },
  { section: "Market/category narrative",owner: "CMO",     status: "review" },
  { section: "Customer metrics",        owner: "CRO",      status: "ready" },
  { section: "Revenue quality metrics", owner: "CFO",      status: "ready" },
  { section: "Marketplace metrics",     owner: "MP Ops",   status: "review" },
  { section: "Partner ecosystem metrics",owner: "Partner", status: "review" },
  { section: "API/EDI metrics",         owner: "API PM",   status: "at_risk" },
  { section: "Enterprise trust evidence",owner: "Security",status: "ready" },
  { section: "Certification evidence",  owner: "Security", status: "placeholder" },
  { section: "Financial controls",      owner: "CFO",      status: "review" },
  { section: "Board reports",           owner: "CFO",      status: "ready" },
  { section: "Strategic risks",         owner: "CRO",      status: "ready" },
  { section: "Customer proof assets",   owner: "Marketing",status: "ready" },
  { section: "Commercial proof assets", owner: "Marketing",status: "review" },
  { section: "Product roadmap",         owner: "CPO",      status: "ready" },
  { section: "Technical architecture",  owner: "CTO",      status: "ready" },
  { section: "Operating model",         owner: "COO",      status: "review" },
  { section: "Legal placeholders",      owner: "Legal",    status: "placeholder" },
];

export const V13_INVESTOR_EVIDENCE = [
  { item: "ARR + NRR narrative",          audience: "Investor", owner: "CFO",      status: "ready",     freshness_days: 12 },
  { item: "Logo retention case",          audience: "Investor", owner: "CSM Lead", status: "ready",     freshness_days: 28 },
  { item: "Expansion proof (NorthLine)",  audience: "Investor", owner: "CSM Lead", status: "ready",     freshness_days: 18 },
  { item: "Marketplace economics deck",   audience: "Investor", owner: "MP Ops",   status: "review",    freshness_days: 41 },
  { item: "API/EDI revenue thesis",       audience: "Investor", owner: "API PM",   status: "review",    freshness_days: 33 },
  { item: "Partner attribution evidence", audience: "Investor", owner: "Partner",  status: "review",    freshness_days: 26 },
  { item: "SOC 2 placeholder",            audience: "Acquirer", owner: "Security", status: "placeholder", freshness_days: 90 },
  { item: "Customer reference set",       audience: "Acquirer", owner: "Marketing",status: "ready",     freshness_days: 21 },
  { item: "Strategic risk register",      audience: "Acquirer", owner: "CRO",      status: "ready",     freshness_days: 14 },
  { item: "Product durability evidence",  audience: "Acquirer", owner: "CPO",      status: "review",    freshness_days: 34 },
  { item: "Board governance evidence",    audience: "Both",     owner: "CFO",      status: "ready",     freshness_days: 10 },
];

export const V13_REV_QUALITY = [
  { category: "Subscription",        score: 90, owner: "Billing",  freshness_days: 7 },
  { category: "Usage billing",       score: 78, owner: "Billing",  freshness_days: 12 },
  { category: "Marketplace revenue", score: 74, owner: "MP Ops",   freshness_days: 18 },
  { category: "API revenue",         score: 68, owner: "API PM",   freshness_days: 22 },
  { category: "EDI placeholder",     score: 60, owner: "API PM",   freshness_days: 30 },
  { category: "Partner revenue",     score: 76, owner: "Partner",  freshness_days: 18 },
  { category: "Expansion revenue",   score: 82, owner: "CSM Lead", freshness_days: 9 },
  { category: "Renewal",             score: 84, owner: "CSM Lead", freshness_days: 11 },
  { category: "Payment health",      score: 88, owner: "Billing",  freshness_days: 5 },
  { category: "Billing dispute",     score: 72, owner: "Billing",  freshness_days: 14 },
  { category: "Manual adjustment",   score: 78, owner: "Billing",  freshness_days: 16 },
  { category: "Revenue exception",   score: 75, owner: "Billing",  freshness_days: 20 },
  { category: "Board revenue",       score: 86, owner: "CFO",      freshness_days: 9 },
];

export const V13_CONCENTRATION = {
  top_customer_pct: 12,
  top5_pct: 28,
  top10_pct: 38,
  by_product: [
    { line: "Subscription", pct: 36 },
    { line: "Marketplace",  pct: 44 },
    { line: "API",          pct: 52 },
  ],
  by_region: [
    { region: "US-Central", pct: 41 },
    { region: "US-South",   pct: 33 },
    { region: "US-West",    pct: 22 },
  ],
  accounts: [
    { account: "Atlas Logistics",  arr_pct: 7, renewal_risk: "med", expansion_dep: "high",   support_load: "med", mp_dep: "high", api_dep: "med" },
    { account: "NorthLine Freight",arr_pct: 6, renewal_risk: "low", expansion_dep: "high",   support_load: "low", mp_dep: "med",  api_dep: "med" },
    { account: "Pinnacle Carriers",arr_pct: 5, renewal_risk: "high",expansion_dep: "med",    support_load: "med", mp_dep: "med",  api_dep: "low" },
    { account: "Vector 3PL",       arr_pct: 4, renewal_risk: "low", expansion_dep: "med",    support_load: "low", mp_dep: "med",  api_dep: "high"},
  ],
  mitigation: [
    { plan: "Land 3 strategic accounts >$500k ARR",  owner: "CRO",     due: "this Q" },
    { plan: "Diversify marketplace fees across SE",  owner: "MP Ops",  due: "this Q" },
    { plan: "Open EU pilot to reduce US-Central dep",owner: "CRO",     due: "next Q" },
  ],
};

export const V13_STRATEGIC_ACCTS = [
  { account: "Atlas Logistics",   value_score: 86, adoption: 82, expansion_potential: 78, renewal_risk: "med",  mp_opp: 70, api_opp: 60, copilot_opp: 75, portal_opp: 80, driver_opp: 65, partner_infl: 55, trust_status: "approved", sponsor: "strong", value_evidence: "fresh", next_action: "Land regional expansion pilot" },
  { account: "NorthLine Freight", value_score: 88, adoption: 84, expansion_potential: 82, renewal_risk: "low",  mp_opp: 65, api_opp: 70, copilot_opp: 88, portal_opp: 78, driver_opp: 72, partner_infl: 60, trust_status: "approved", sponsor: "strong", value_evidence: "fresh", next_action: "CoPilot multi-region rollout" },
  { account: "Pinnacle Carriers", value_score: 72, adoption: 68, expansion_potential: 60, renewal_risk: "high", mp_opp: 50, api_opp: 45, copilot_opp: 55, portal_opp: 60, driver_opp: 50, partner_infl: 40, trust_status: "review",   sponsor: "weak",   value_evidence: "stale", next_action: "Save play + sponsor escalation" },
  { account: "Vector 3PL",        value_score: 81, adoption: 75, expansion_potential: 78, renewal_risk: "low",  mp_opp: 60, api_opp: 80, copilot_opp: 70, portal_opp: 72, driver_opp: 68, partner_infl: 70, trust_status: "approved", sponsor: "strong", value_evidence: "fresh", next_action: "API plan upsell" },
];

export const V13_RETENTION_EXPANSION = {
  retention_score: 84, expansion_score: 79,
  renewal_readiness: 82, churn_risk: 18,
  pipeline: [
    { account: "NorthLine Freight", motion: "CoPilot expansion", value_usd: 420_000, stage: "Negotiation", evidence: "fresh" },
    { account: "Vector 3PL",        motion: "API plan upgrade", value_usd: 240_000, stage: "Proposal",    evidence: "fresh" },
    { account: "Atlas Logistics",   motion: "Region expansion", value_usd: 680_000, stage: "Discovery",   evidence: "review" },
    { account: "Pinnacle Carriers", motion: "Save + tier",      value_usd: 180_000, stage: "Save",        evidence: "stale" },
  ],
  evidence_completeness: 80,
};

export const V13_MARKETPLACE = {
  score: 71,
  metrics: [
    { metric: "Load fee revenue",         value: "$3.1M", trend: "+8%" },
    { metric: "Carrier subscription",     value: "$0.9M", trend: "+12%" },
    { metric: "Take rate (placeholder)",  value: "~6.8%", trend: "+0.2pp" },
    { metric: "Load coverage rate",       value: "92%",   trend: "+1pp" },
    { metric: "Avg bids/load",            value: "3.4",   trend: "+0.2" },
    { metric: "Time to first bid",        value: "11min", trend: "-1min" },
    { metric: "Time to award",            value: "44min", trend: "-3min" },
    { metric: "Dispute cost (placeholder)",value:"$48k",  trend: "+5%" },
    { metric: "Settlement hold (placeholder)",value:"$92k",trend:"-3%" },
  ],
  regions: [
    { region: "Texas",      liquidity: 88, margin: 74 },
    { region: "Midwest",    liquidity: 84, margin: 70 },
    { region: "Southeast",  liquidity: 62, margin: 56 },
    { region: "Northeast",  liquidity: 76, margin: 66 },
    { region: "West",       liquidity: 72, margin: 64 },
  ],
  risks: [
    { risk: "Southeast carrier density",      severity: "med",  owner: "MP Ops" },
    { risk: "Dispute cost trend uptick",      severity: "low",  owner: "MP Ops" },
    { risk: "Settlement hold concentration",  severity: "low",  owner: "Billing" },
  ],
};

export const V13_MP_UNIT_ECON = {
  confidence: "moderate",
  evidence_completeness: 64,
  inputs: [
    { input: "Avg load value",     placeholder: "$1,450" },
    { input: "Avg fee per load",   placeholder: "$98" },
    { input: "Take rate",          placeholder: "~6.8%" },
    { input: "Carrier CAC",        placeholder: "$210" },
    { input: "Customer CAC",       placeholder: "$1,800" },
    { input: "Dispute cost",       placeholder: "$3.20/load" },
    { input: "Support cost",       placeholder: "$2.10/load" },
    { input: "Settlement cost",    placeholder: "$1.40/load" },
    { input: "Gross margin",       placeholder: "~58%" },
    { input: "Payback",            placeholder: "~14 mo" },
    { input: "Contribution margin",placeholder: "~31%" },
  ],
  risks: [
    { risk: "Support cost allocation not finalized", severity: "med", owner: "Finance" },
    { risk: "Dispute cost trend uncertain",          severity: "low", owner: "MP Ops" },
  ],
  board_summary: "Placeholder unit economics; do not treat as audited numbers.",
};

export const V13_API_EDI = {
  score: 64,
  api: [
    { metric: "API plan adoption", value: "118 accts" },
    { metric: "API usage (req/mo)",value: "42M" },
    { metric: "Overages",          value: "$72k" },
    { metric: "API revenue (placeholder)", value: "$310k" },
    { metric: "Dev account growth",value: "+9% QoQ" },
    { metric: "Partner API usage", value: "11M req/mo" },
    { metric: "Customer API usage",value: "31M req/mo" },
    { metric: "API support burden",value: "82 tickets/mo" },
  ],
  edi: [
    { metric: "EDI transaction vol",value: "1.2M/mo" },
    { metric: "EDI revenue (placeholder)", value: "$210k" },
    { metric: "EDI support burden",value: "44 tickets/mo" },
    { metric: "Billing exceptions",value: "26/mo" },
  ],
  risks: [
    { risk: "EDI billing reconciliation lag", severity: "med", owner: "Billing" },
    { risk: "API plan packaging maturity",    severity: "med", owner: "API PM" },
  ],
  expansion: [
    { play: "Push API plan upgrade w/ Vector 3PL", value_usd: 240_000, due: "this Q" },
    { play: "Onboard 8 dev accounts to paid tier", value_usd: 120_000, due: "next Q" },
  ],
};

export const V13_PARTNER_VALUE = {
  score: 78,
  partners: [
    { partner: "Verda Telematics", sourced_usd: 320_000, influenced_usd: 1_100_000, joint_customers: 14, integ_health: "good",  enable: "ready",  risk: "low",  expansion: "high" },
    { partner: "RouteIQ Maps",     sourced_usd: 120_000, influenced_usd: 480_000,   joint_customers:  6, integ_health: "ok",    enable: "review", risk: "low",  expansion: "med" },
    { partner: "ClearPath API",    sourced_usd:  40_000, influenced_usd: 210_000,   joint_customers:  3, integ_health: "ok",    enable: "low",    risk: "med",  expansion: "med" },
    { partner: "FreightLink TMS",  sourced_usd: 180_000, influenced_usd: 620_000,   joint_customers:  9, integ_health: "good",  enable: "ready",  risk: "low",  expansion: "high" },
  ],
  attribution: [
    { quarter: "Q-3", sourced_usd: 510_000, influenced_usd: 1_810_000, conv_pct: 22 },
    { quarter: "Q-2", sourced_usd: 580_000, influenced_usd: 2_020_000, conv_pct: 23 },
    { quarter: "Q-1", sourced_usd: 620_000, influenced_usd: 2_180_000, conv_pct: 24 },
    { quarter: "Q-0", sourced_usd: 660_000, influenced_usd: 2_410_000, conv_pct: 25 },
  ],
  risks: [
    { risk: "ClearPath low enablement maturity", severity: "med", owner: "Partner Lead" },
  ],
  actions: [
    { action: "Build joint NorthLine reference w/ Verda", owner: "Partner", due: "this Q" },
    { action: "Run ClearPath enablement bootcamp",       owner: "Partner", due: "30d" },
  ],
};

export const V13_FORECAST = {
  owner: "RevOps", period: "Q+1",
  lines: [
    { line: "Pipeline (placeholder)",       value: "$14.2M", confidence: "med" },
    { line: "Expansion (placeholder)",      value: "$3.6M",  confidence: "med" },
    { line: "Renewal (placeholder)",        value: "$11.8M", confidence: "high" },
    { line: "Marketplace fees (placeholder)",value:"$3.4M",  confidence: "med" },
    { line: "API/EDI (placeholder)",        value: "$0.6M",  confidence: "low" },
    { line: "Partner-sourced (placeholder)",value: "$0.8M",  confidence: "med" },
  ],
  assumptions: [
    "Carrier density program lands in Southeast",
    "No top-10 customer churn",
    "API plan packaging stays current",
  ],
  evidence: [
    { area: "Pipeline coverage",   completeness: 84 },
    { area: "Renewal evidence",    completeness: 88 },
    { area: "Marketplace seasonality", completeness: 62 },
  ],
  risks: [
    { risk: "Marketplace seasonality unhedged", severity: "med", owner: "MP Ops" },
    { risk: "API placeholder revenue accuracy", severity: "low", owner: "API PM" },
  ],
};

export const V13_GROWTH_INVESTMENT = [
  { category: "Enterprise sales",       owner: "CRO",     thesis: "Land 6 strategic logos",   impact: "ARR +$3.2M", resources: "2 AEs",    risk: "med", evidence: "fresh", approval: "approved" },
  { category: "Customer success",       owner: "CSM Lead",thesis: "NRR lift via CoPilot",     impact: "NRR +3pp",   resources: "3 CSMs",   risk: "low", evidence: "fresh", approval: "approved" },
  { category: "Marketplace liquidity",  owner: "MP Ops",  thesis: "SE carrier density",       impact: "fees +12%",  resources: "$280k",    risk: "med", evidence: "review",approval: "pending" },
  { category: "Carrier network",        owner: "MP Ops",  thesis: "Top-100 carrier program",  impact: "coverage +3pp",resources: "$140k",  risk: "low", evidence: "fresh", approval: "approved" },
  { category: "Partner channel",        owner: "Partner", thesis: "Verda joint motion",       impact: "$1.1M infl.",resources: "1 PMM",    risk: "low", evidence: "fresh", approval: "approved" },
  { category: "API/EDI",                owner: "API PM",  thesis: "Plan packaging maturity",  impact: "ARR +$0.4M", resources: "1 PM",     risk: "med", evidence: "review",approval: "pending" },
  { category: "Product-line",           owner: "CPO",     thesis: "Driver app expansion",     impact: "adoption",   resources: "1 squad",  risk: "low", evidence: "fresh", approval: "approved" },
  { category: "Trust/compliance",       owner: "Security",thesis: "SOC 2 placeholder progress",impact: "trust",     resources: "$190k",    risk: "med", evidence: "review",approval: "pending" },
  { category: "Sales engineering",      owner: "Sales Eng",thesis: "Win-rate lift on enterprise",impact: "win +4pp",resources: "2 SEs",    risk: "low", evidence: "fresh", approval: "approved" },
  { category: "Support",                owner: "Support", thesis: "Enterprise tier launch",   impact: "retention",  resources: "3 agents", risk: "low", evidence: "fresh", approval: "approved" },
  { category: "International expansion",owner: "CRO",     thesis: "EU pilot",                 impact: "TAM",        resources: "$420k",    risk: "high",evidence: "review",approval: "pending" },
  { category: "Capital readiness",      owner: "CFO",     thesis: "Data room + diligence ops",impact: "readiness",  resources: "$110k",    risk: "low", evidence: "fresh", approval: "approved" },
];

export const V13_EXEC_VALUE = {
  score: 87,
  drivers: [
    { driver: "Revenue quality",      score: 86 },
    { driver: "Customer retention",   score: 84 },
    { driver: "Expansion pipeline",   score: 82 },
    { driver: "Marketplace economics",score: 71 },
    { driver: "API/EDI monetization", score: 64 },
    { driver: "Partner value",        score: 78 },
    { driver: "Product durability",   score: 81 },
    { driver: "Enterprise trust",     score: 83 },
    { driver: "Capital readiness",    score: 83 },
  ],
  risks: [
    { risk: "Concentration (Top-10 38%)", severity: "med", owner: "CRO" },
    { risk: "Data room legal/cert gaps",  severity: "med", owner: "Legal" },
    { risk: "Marketplace SE density",     severity: "med", owner: "MP Ops" },
  ],
  actions: [
    { action: "Approve growth investment slate",   owner: "CEO/CFO", due: "this week" },
    { action: "Confirm board pack capital section",owner: "CFO",     due: "10d" },
    { action: "Sign off on EU pilot scope",        owner: "CEO",     due: "this Q" },
  ],
  decisions_needed: [
    { decision: "EU pilot go/no-go",       owner: "Board", due: "this Q" },
    { decision: "SOC 2 placeholder spend", owner: "CFO",   due: "30d" },
  ],
};

export const V13_BOARD = {
  calendar: [
    { review: "Capital readiness review",  cadence: "Quarterly", owner: "CFO" },
    { review: "Revenue quality review",    cadence: "Quarterly", owner: "CFO" },
    { review: "Marketplace economics review",cadence: "Quarterly", owner: "MP Ops" },
    { review: "Customer concentration",    cadence: "Quarterly", owner: "CRO" },
    { review: "Partner value",             cadence: "Half-yearly", owner: "Partner" },
    { review: "Growth investment review",  cadence: "Quarterly", owner: "CFO" },
    { review: "Strategic risk review",     cadence: "Quarterly", owner: "CRO" },
    { review: "Data room readiness",       cadence: "Quarterly", owner: "Legal" },
    { review: "Investor/acquirer narrative",cadence: "Quarterly", owner: "CEO" },
  ],
  packet: [
    { section: "Capital readiness",        owner: "CFO",     status: "ready" },
    { section: "Revenue intelligence",     owner: "CFO",     status: "ready" },
    { section: "Commercial diligence",     owner: "RevOps",  status: "review" },
    { section: "Marketplace economics",    owner: "MP Ops",  status: "review" },
    { section: "Customer concentration",   owner: "CRO",     status: "ready" },
    { section: "Strategic capital risks",  owner: "CRO",     status: "ready" },
    { section: "Growth investment slate",  owner: "CFO",     status: "ready" },
    { section: "Next-Q capital actions",   owner: "CFO",     status: "review" },
  ],
  decisions: [
    { decision: "Approve EU pilot",            owner: "Board", status: "queued" },
    { decision: "Approve SOC 2 placeholder $", owner: "Board", status: "queued" },
    { decision: "Confirm capital strategy 24m",owner: "Board", status: "review" },
  ],
  actions: [
    { action: "Refresh acquirer narrative",  owner: "CEO",   due: "30d" },
    { action: "Fill legal placeholders",     owner: "Legal", due: "this Q" },
  ],
};

export const V13_CAPITAL_RISK = [
  { risk: "Revenue quality risk",         severity: "low",  trend: "→", owner: "CFO" },
  { risk: "Customer concentration risk",  severity: "med",  trend: "↓", owner: "CRO" },
  { risk: "Marketplace economics risk",   severity: "med",  trend: "↓", owner: "MP Ops" },
  { risk: "API/EDI monetization risk",    severity: "med",  trend: "→", owner: "API PM" },
  { risk: "Partner dependency risk",      severity: "low",  trend: "→", owner: "Partner" },
  { risk: "Retention risk",               severity: "low",  trend: "↓", owner: "CSM Lead" },
  { risk: "Expansion risk",               severity: "low",  trend: "↓", owner: "CSM Lead" },
  { risk: "Forecast risk (placeholder)",  severity: "med",  trend: "→", owner: "RevOps" },
  { risk: "Diligence evidence risk",      severity: "med",  trend: "↓", owner: "RevOps" },
  { risk: "Financial control evidence",   severity: "med",  trend: "→", owner: "CFO" },
  { risk: "Certification evidence risk",  severity: "med",  trend: "→", owner: "Security" },
  { risk: "Product durability risk",      severity: "low",  trend: "→", owner: "CPO" },
  { risk: "Competitive risk",             severity: "med",  trend: "→", owner: "CMO" },
  { risk: "Global expansion risk",        severity: "high", trend: "↑", owner: "CRO" },
];

export const V13_VALUATION_DRIVERS = [
  { driver: "Revenue quality",        score: 86, note: "Subscription-heavy mix" },
  { driver: "Growth rate (placeholder)",score: 78,note: "QoQ +mid-teens" },
  { driver: "Retention strength",     score: 84, note: "GRR placeholder" },
  { driver: "Expansion potential",    score: 82, note: "CoPilot + API headroom" },
  { driver: "Customer concentration", score: 62, note: "Top-10 at 38% (lower=better)" },
  { driver: "Marketplace economics",  score: 71, note: "Unit econ placeholders" },
  { driver: "Partner ecosystem",      score: 78, note: "4 active partners" },
  { driver: "Product durability",     score: 81, note: "Roadmap depth" },
  { driver: "Enterprise trust",       score: 83, note: "Trust packet maturity" },
  { driver: "Data network effects",   score: 74, note: "Lane intelligence" },
  { driver: "Switching costs",        score: 80, note: "TMS + portal lock-in" },
  { driver: "Category leadership",    score: 70, note: "Mid-market enterprise" },
  { driver: "Strategic risk profile", score: 76, note: "14-risk register" },
  { driver: "Capital readiness",      score: 83, note: "V13 score" },
];

export const V13_ROADMAP = [
  { horizon: "Current Q",  track: "Revenue quality",      milestone: "Close billing dispute gaps",      owner: "Billing" },
  { horizon: "Current Q",  track: "Capital data room",    milestone: "Fill legal placeholders",         owner: "Legal" },
  { horizon: "Next Q",     track: "Diligence",            milestone: "Diligence pack v1",               owner: "RevOps" },
  { horizon: "Next Q",     track: "Marketplace economics",milestone: "Unit econ confidence +",          owner: "MP Ops" },
  { horizon: "6 months",   track: "Concentration",        milestone: "Top-10 below 35%",                owner: "CRO" },
  { horizon: "6 months",   track: "Partner value",        milestone: "Joint reference set ×3",          owner: "Partner" },
  { horizon: "12 months",  track: "API/EDI revenue",      milestone: "API plan v2 GA",                  owner: "API PM" },
  { horizon: "12 months",  track: "Trust evidence",       milestone: "SOC 2 placeholder progress",      owner: "Security" },
  { horizon: "24 months",  track: "Board governance",     milestone: "Capital cadence steady-state",    owner: "CFO" },
  { horizon: "24 months",  track: "Product durability",   milestone: "Driver/vehicle expansion GA",     owner: "CPO" },
  { horizon: "36 months",  track: "Strategic risk",       milestone: "EU pilot to GA decision",         owner: "CEO" },
  { horizon: "36 months",  track: "Growth investment",    milestone: "Investment cadence with board",   owner: "CFO" },
];

export const V13_REPORTS = [
  "Enterprise capital readiness",
  "Revenue intelligence maturity",
  "Commercial diligence",
  "Capital data room readiness",
  "Investor/acquirer evidence",
  "Revenue quality evidence",
  "Customer concentration governance",
  "Strategic account value creation",
  "Retention and expansion value",
  "Marketplace economics governance",
  "Marketplace unit economics placeholder",
  "API/EDI revenue maturity",
  "Partner value governance",
  "Forecast evidence placeholder",
  "Growth investment governance",
  "Executive value creation",
  "Board capital governance",
  "Strategic capital risk",
  "Valuation driver placeholder",
  "Long-term capital strategy",
];

export const V13_BACKEND_BOUNDARY = [
  { kind: "ServerFn", name: "calculate-v13-capital-readiness-score",          auth: "requireSupabaseAuth + exec role" },
  { kind: "ServerFn", name: "generate-capital-readiness-summary",             auth: "requireSupabaseAuth + exec role" },
  { kind: "ServerFn", name: "generate-capital-readiness-action-plan",         auth: "requireSupabaseAuth + exec role" },
  { kind: "ServerFn", name: "calculate-revenue-intelligence-maturity",        auth: "requireSupabaseAuth + revops" },
  { kind: "ServerFn", name: "calculate-revenue-quality-evidence-score",       auth: "requireSupabaseAuth + billing/revops" },
  { kind: "ServerFn", name: "detect-revenue-evidence-gaps",                   auth: "requireSupabaseAuth + revops" },
  { kind: "ServerFn", name: "calculate-commercial-diligence-readiness",       auth: "requireSupabaseAuth + exec/revops" },
  { kind: "ServerFn", name: "calculate-capital-data-room-readiness",          auth: "requireSupabaseAuth + exec" },
  { kind: "ServerFn", name: "generate-diligence-evidence-pack",               auth: "requireSupabaseAuth + exec" },
  { kind: "ServerFn", name: "generate-investor-acquirer-evidence-summary",    auth: "requireSupabaseAuth + exec" },
  { kind: "ServerFn", name: "calculate-customer-concentration-risk",          auth: "requireSupabaseAuth + cro" },
  { kind: "ServerFn", name: "calculate-strategic-account-value-score",        auth: "requireSupabaseAuth + csm" },
  { kind: "ServerFn", name: "calculate-retention-expansion-value",            auth: "requireSupabaseAuth + csm" },
  { kind: "ServerFn", name: "generate-value-creation-action-plan",            auth: "requireSupabaseAuth + exec" },
  { kind: "ServerFn", name: "calculate-marketplace-economics-governance-score",auth: "requireSupabaseAuth + mp-ops" },
  { kind: "ServerFn", name: "calculate-marketplace-unit-economics-confidence",auth: "requireSupabaseAuth + finance" },
  { kind: "ServerFn", name: "calculate-api-edi-revenue-maturity",             auth: "requireSupabaseAuth + api-pm" },
  { kind: "ServerFn", name: "calculate-partner-value-governance-score",       auth: "requireSupabaseAuth + partner" },
  { kind: "ServerFn", name: "generate-board-capital-governance-report",       auth: "requireSupabaseAuth + exec/board" },
  { kind: "ServerFn", name: "calculate-strategic-capital-risk-score",         auth: "requireSupabaseAuth + cro" },
  { kind: "ServerFn", name: "calculate-valuation-driver-placeholder-score",   auth: "requireSupabaseAuth + exec" },
  { kind: "ServerFn", name: "generate-long-term-capital-strategy-summary",    auth: "requireSupabaseAuth + exec" },
  { kind: "Route /api/public/*", name: "investor-data-room-webhook (HMAC)",   auth: "HMAC signature only" },
  { kind: "Route /api/public/*", name: "partner-attribution-webhook (HMAC)",  auth: "HMAC signature only" },
];

export const V13_RLS_EXAMPLES = [
  { table: "v13_capital_readiness_scores",            policy: "exec/admin select; platform_owner select all" },
  { table: "capital_readiness_metrics",               policy: "exec/admin select; tenant-scoped insert" },
  { table: "revenue_intelligence_maturity_records",   policy: "revops/admin manage; billing read" },
  { table: "commercial_diligence_records",            policy: "exec/admin only" },
  { table: "capital_data_room_items_v13",             policy: "exec/admin only; no customer/carrier" },
  { table: "investor_acquirer_evidence_items",        policy: "exec/admin only; no partner/customer" },
  { table: "revenue_quality_evidence_items",          policy: "billing/revops manage; exec read" },
  { table: "customer_concentration_governance_records",policy: "exec/cro select; csm assigned select" },
  { table: "strategic_account_value_creation_records",policy: "csm/admin manage assigned; exec read" },
  { table: "retention_expansion_value_records",       policy: "csm/admin manage assigned; exec read" },
  { table: "marketplace_economics_governance_records",policy: "mp_ops/admin manage; exec read" },
  { table: "marketplace_unit_economics_placeholders", policy: "finance/admin manage; exec read" },
  { table: "api_edi_revenue_maturity_records",        policy: "api_pm/admin manage; exec read" },
  { table: "partner_value_governance_records",        policy: "partner_mgr manage; exec read; partner read approved-only" },
  { table: "commercial_forecast_evidence_placeholders",policy: "revops manage; exec read" },
  { table: "growth_investment_governance_records",    policy: "exec/admin manage; board read approved-only" },
  { table: "executive_value_creation_records",        policy: "exec/admin only" },
  { table: "board_capital_governance_records",        policy: "board/exec/admin; board only approved" },
  { table: "strategic_capital_risk_records",          policy: "exec/cro only" },
  { table: "valuation_driver_placeholders",           policy: "exec/admin only" },
  { table: "capital_strategy_roadmap_items",          policy: "exec/admin manage; board read" },
  { table: "v13_report_runs",                         policy: "exec/admin; report-owner select" },
];

export const V13_DEMO = [
  { role: "CEO",         step: "Open Enterprise Capital Readiness Command Center", expect: "Capital readiness 83%" },
  { role: "CEO",         step: "Review revenue intelligence maturity",              expect: "86% with mix breakdown" },
  { role: "CEO",         step: "Review commercial diligence readiness",             expect: "78% with 3 at-risk areas" },
  { role: "CEO",         step: "Review capital data room readiness",                expect: "74% with legal/cert gaps" },
  { role: "CEO",         step: "Review marketplace economics maturity",             expect: "71% with SE risk" },
  { role: "CFO",         step: "Open Revenue Intelligence Maturity Center",         expect: "Subscription strongest, API early" },
  { role: "CFO",         step: "Confirm concentration risk is moderate",            expect: "Top-10 at 38%" },
  { role: "RevOps",      step: "Open Commercial Diligence System",                  expect: "Pipeline/Deal evidence strong" },
  { role: "RevOps",      step: "Flag marketplace evidence gaps",                    expect: "2 marketplace gaps + partner review" },
  { role: "Board admin", step: "Open Capital Data Room Command Center",             expect: "74% readiness; placeholders flagged" },
  { role: "MP leader",   step: "Open Marketplace Economics Governance",             expect: "TX/Midwest strong; SE risk" },
  { role: "MP leader",   step: "Note unit econ confidence is moderate",             expect: "Support cost placeholder unresolved" },
  { role: "Partner lead",step: "Open Partner Value Governance Center",              expect: "Verda strong; ClearPath enablement low" },
  { role: "Partner lead",step: "Generate partner value action plan",                expect: "2 actions queued" },
  { role: "CEO",         step: "Open Executive Value Creation Dashboard",           expect: "Value creation score 87%" },
  { role: "Board admin", step: "Generate Board Capital Governance Report",          expect: "Capital + revenue + risk + investments" },
];

export const V13_DEMO_CLOSEOUT = [
  "Capital readiness 83% with 4 ready gaps prioritized",
  "Revenue intelligence maturity 86% — subscription quality strongest",
  "Commercial diligence 78% — 3 areas at risk",
  "Capital data room 74% — legal + cert placeholders",
  "Marketplace economics 71% — SE density program approved",
  "Partner value 78% — joint motion with Verda confirmed",
  "Executive value creation 87% — 3 decisions queued for board",
];

export const V13_ROLE_GUIDANCE = [
  { role: "CEO",          guidance: "Drive capital readiness and value creation narrative." },
  { role: "CFO",          guidance: "Own revenue intelligence, forecast evidence, board pack." },
  { role: "CRO",          guidance: "Own concentration, expansion, strategic capital risk." },
  { role: "Board admin",  guidance: "Operate board capital governance cadence." },
  { role: "RevOps",       guidance: "Maintain diligence evidence and pipeline audit." },
  { role: "MP Ops",       guidance: "Govern marketplace economics + unit econ placeholders." },
  { role: "Partner lead", guidance: "Own partner value governance and attribution." },
];

export const V13_PHASE40_TEASER = [
  "Phase 40 (V13.5) — enterprise value creation maturity",
  "Capital strategy execution discipline",
  "Revenue durability governance",
  "Marketplace economics optimization",
  "Board-level strategic operating system",
];
