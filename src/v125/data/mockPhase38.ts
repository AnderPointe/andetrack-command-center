// Phase 38 — V12.5 capital-grade enterprise growth operations. Mock-only.
// No autonomous dispatch. No certification/IPO/audit-completeness claims.

export const V125_FEATURE_MATRIX = [
  { area: "Capital-Grade Growth Operations", ga: "ready", notes: "Cross-org growth OS" },
  { area: "Commercial Auditability",         ga: "ready", notes: "End-to-end audit trails" },
  { area: "Global Revenue Intelligence",     ga: "ready", notes: "Mix + concentration + region" },
  { area: "Revenue Quality Controls",        ga: "ready", notes: "13 control areas" },
  { area: "Enterprise Revenue Evidence",     ga: "ready", notes: "14 evidence types" },
  { area: "Growth Operating Evidence Vault", ga: "beta",  notes: "Approval + freshness" },
  { area: "Pipeline Audit Trail",            ga: "ready", notes: "Stage + risk change log" },
  { area: "Deal Execution Auditability",     ga: "ready", notes: "13-step checklist" },
  { area: "Expansion Evidence Mgmt.",        ga: "ready", notes: "Signal-to-approval evidence" },
  { area: "Strategic Account Growth Gov.",   ga: "ready", notes: "Sponsor + whitespace + cadence" },
  { area: "Partner Channel Optimization",    ga: "ready", notes: "Sourced/influenced + enable" },
  { area: "Partner Channel Performance Gov.",ga: "beta",  notes: "Review + approval + evidence" },
  { area: "Marketplace Revenue Intelligence",ga: "beta",  notes: "Lane + quality + risk" },
  { area: "API/EDI Revenue Intelligence",    ga: "beta",  notes: "Metered + EDI placeholders" },
  { area: "Executive Growth Stewardship",    ga: "ready", notes: "Per-exec priorities" },
  { area: "Growth Risk & Control Matrix",    ga: "ready", notes: "15 risk categories" },
  { area: "Commercial Proof Control",        ga: "ready", notes: "Approval + freshness + influence" },
  { area: "Capital-Grade Board Growth Rpt.", ga: "beta",  notes: "Quarterly capital board pack" },
  { area: "Commercial Data Room Evidence",   ga: "beta",  notes: "Diligence-ready checklist" },
  { area: "Long-Term Growth Governance",     ga: "ready", notes: "13 governance functions" },
];

export const V125_DEFERRED = [
  "Fully autonomous deal closure or dispatch",
  "Final certification / audit-completeness claims",
  "Final IPO / acquisition readiness claims",
  "Final audited financial claims",
  "Full customs production workflows",
  "Full international tax automation",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "Final Android Auto / CarPlay approval claims",
];

// 2. Capital-grade growth operations
export const V125_GROWTH_OPS = {
  score: 91, trend_qoq: +3,
  pipeline_health: 88, expansion_health: 84, renewal_health: 81,
  marketplace_health: 76, api_edi_health: 71, partner_health: 79,
  trust_health: 86, procurement_blocker_health: 73,
  deal_execution_health: 84, revenue_quality_health: 82,
  commercial_risk_health: 78, board_evidence_readiness: 80,
  capital_data_room_readiness: 74,
};
export const V125_GROWTH_OPS_TREND = [
  { quarter: "Q-3", score: 82, pipeline: 80, expansion: 76, marketplace: 68 },
  { quarter: "Q-2", score: 85, pipeline: 83, expansion: 79, marketplace: 71 },
  { quarter: "Q-1", score: 88, pipeline: 86, expansion: 82, marketplace: 74 },
  { quarter: "Q-0", score: 91, pipeline: 88, expansion: 84, marketplace: 76 },
];
export const V125_GROWTH_NEXT_ACTIONS = [
  { action: "Resolve Atlas Logistics procurement evidence gap",   owner: "Security",     impact: "$1.8M", due: "3d" },
  { action: "Push CoPilot adoption play on NorthLine multi-region", owner: "CSM Lead",   impact: "$420k", due: "2w" },
  { action: "Trigger save play on Pinnacle renewal risk",         owner: "CSM Lead",     impact: "$640k", due: "7d" },
  { action: "Lift Southeast carrier density to derisk MP revenue", owner: "MP Ops",      impact: "fees",  due: "this Q" },
  { action: "Onboard Verda telematics partner enablement plan",   owner: "Partner Lead", impact: "$900k", due: "this Q" },
];
export const V125_GROWTH_RISK_SUMMARY = [
  { risk: "Customer concentration (Top-10 38%)", severity: "med", owner: "CRO" },
  { risk: "Marketplace dispute backlog EU-W",    severity: "med", owner: "MP Ops" },
  { risk: "EDI placeholder revenue reconciliation", severity: "low", owner: "Billing" },
];

// 3. Commercial auditability
export const V125_AUDITABILITY = {
  score: 84,
  trails: [
    { area: "Pipeline audit trail",        completeness_pct: 88, owner: "RevOps",   status: "ready" },
    { area: "Deal stage audit trail",      completeness_pct: 85, owner: "RevOps",   status: "ready" },
    { area: "Deal desk approval",          completeness_pct: 92, owner: "Deal Desk",status: "ready" },
    { area: "Pricing exception",           completeness_pct: 79, owner: "Pricing",  status: "at_risk" },
    { area: "Procurement response",        completeness_pct: 71, owner: "Security", status: "at_risk" },
    { area: "Trust packet delivery",       completeness_pct: 86, owner: "Security", status: "ready" },
    { area: "Security questionnaire",      completeness_pct: 83, owner: "Security", status: "ready" },
    { area: "Customer proof usage",        completeness_pct: 74, owner: "Marketing",status: "at_risk" },
    { area: "Expansion approval",          completeness_pct: 81, owner: "CSM Lead", status: "ready" },
    { area: "Renewal risk",                completeness_pct: 80, owner: "CSM Lead", status: "ready" },
    { area: "Partner attribution",         completeness_pct: 69, owner: "Partner",  status: "at_risk" },
    { area: "Marketplace revenue",         completeness_pct: 77, owner: "MP Ops",   status: "ready" },
    { area: "API/EDI revenue",             completeness_pct: 64, owner: "Billing",  status: "at_risk" },
    { area: "Board report evidence links", completeness_pct: 88, owner: "RevOps",   status: "ready" },
  ],
  exceptions: [
    { item: "Procurement responses missing artifact (2)", owner: "Security",  age_days: 8 },
    { item: "Customer proof usage attribution gap (1)",   owner: "Marketing", age_days: 5 },
    { item: "EDI placeholder rev recon (1)",              owner: "Billing",   age_days: 12 },
  ],
};

// 4. Global revenue intelligence
export const V125_REV_INTEL = {
  score: 83,
  mix: [
    { lever: "Recurring",   share_pct: 62, quality: 88 },
    { lever: "Usage",       share_pct: 11, quality: 74 },
    { lever: "Marketplace", share_pct: 8,  quality: 71 },
    { lever: "API",         share_pct: 5,  quality: 69 },
    { lever: "EDI (plchldr)", share_pct: 3, quality: 64 },
    { lever: "Partner",     share_pct: 7,  quality: 77 },
    { lever: "Expansion",   share_pct: 4,  quality: 84 },
  ],
  concentration: [
    { axis: "Top-10 customer ARR share", value_pct: 38, status: "at_risk" },
    { axis: "Top product-line share",    value_pct: 54, status: "at_risk" },
    { axis: "Top region share (NA)",     value_pct: 47, status: "ready" },
  ],
  regions: [
    { region: "NA-W", opportunity_usd: 8_200_000, risk: "low",  notes: "Texas + Midwest density" },
    { region: "NA-E", opportunity_usd: 5_100_000, risk: "med",  notes: "Payment health watch" },
    { region: "EU-W", opportunity_usd: 3_400_000, risk: "med",  notes: "Dispute backlog" },
    { region: "LatAm",opportunity_usd: 1_200_000, risk: "low",  notes: "Pilot only" },
  ],
  renewal_risk_pct: 11, churn_exposure_usd: 2_100_000,
};

// 5. Revenue quality controls
export const V125_REVQ_CONTROLS = {
  score: 82,
  controls: [
    { control: "Recurring revenue quality",   status: "pass",   owner: "RevOps" },
    { control: "Usage billing quality",       status: "review", owner: "Billing" },
    { control: "Marketplace revenue quality", status: "pass",   owner: "MP Ops" },
    { control: "API revenue quality",         status: "review", owner: "Billing" },
    { control: "EDI revenue placeholder",     status: "exception", owner: "Billing" },
    { control: "Partner revenue quality",     status: "pass",   owner: "Partner" },
    { control: "Expansion revenue quality",   status: "pass",   owner: "CSM" },
    { control: "Renewal quality",             status: "pass",   owner: "CSM" },
    { control: "Payment health",              status: "review", owner: "Collections" },
    { control: "Billing dispute health",      status: "review", owner: "Billing" },
    { control: "Manual adjustment controls",  status: "pass",   owner: "Finance" },
    { control: "Revenue evidence completeness", status: "pass", owner: "RevOps" },
    { control: "Revenue exception handling",  status: "pass",   owner: "Finance" },
  ],
  exceptions: [
    { item: "EDI placeholder reconciliation (1)", owner: "Billing",     age_days: 12 },
    { item: "Payment health NA-E (2)",            owner: "Collections", age_days: 6 },
    { item: "Billing dispute > 30d (4)",          owner: "Billing",     age_days: 35 },
  ],
};

// 6. Enterprise revenue evidence
export const V125_REV_EVIDENCE = [
  { type: "Pipeline evidence",          owner: "RevOps",    fresh_days: 7,  status: "ready" },
  { type: "Deal stage evidence",        owner: "RevOps",    fresh_days: 4,  status: "ready" },
  { type: "Deal desk approval",         owner: "Deal Desk", fresh_days: 3,  status: "ready" },
  { type: "Pricing approval",           owner: "Pricing",   fresh_days: 11, status: "review" },
  { type: "Procurement evidence",       owner: "Security",  fresh_days: 14, status: "review" },
  { type: "Security review evidence",   owner: "Security",  fresh_days: 6,  status: "ready" },
  { type: "Trust asset usage",          owner: "Marketing", fresh_days: 9,  status: "ready" },
  { type: "Customer proof usage",       owner: "Marketing", fresh_days: 22, status: "review" },
  { type: "Expansion plan evidence",    owner: "CSM Lead",  fresh_days: 5,  status: "ready" },
  { type: "Renewal plan evidence",      owner: "CSM Lead",  fresh_days: 7,  status: "ready" },
  { type: "Marketplace usage evidence", owner: "MP Ops",    fresh_days: 8,  status: "ready" },
  { type: "API/EDI usage evidence",     owner: "Billing",   fresh_days: 18, status: "review" },
  { type: "Partner attribution",        owner: "Partner",   fresh_days: 13, status: "review" },
  { type: "Board report evidence",      owner: "RevOps",    fresh_days: 2,  status: "ready" },
];

// 7. Growth operating evidence vault
export const V125_EVIDENCE_VAULT = [
  { id: "EV-2041", category: "Pipeline",    owner: "RevOps",    source: "Command",          customer: "NorthLine",  approval: "approved",  board_use: true,  data_room: true },
  { id: "EV-2042", category: "Deal Desk",   owner: "Deal Desk", source: "Deal Execution",   customer: "Atlas",      approval: "approved",  board_use: false, data_room: true },
  { id: "EV-2043", category: "Procurement", owner: "Security",  source: "Trust",            customer: "Pinewood",   approval: "review",    board_use: false, data_room: true },
  { id: "EV-2044", category: "Customer Proof", owner: "Marketing", source: "Proof",         customer: "Helios",     approval: "approved",  board_use: true,  data_room: true },
  { id: "EV-2045", category: "Expansion",   owner: "CSM Lead",  source: "Strategic Acct.",  customer: "NorthLine",  approval: "approved",  board_use: true,  data_room: true },
  { id: "EV-2046", category: "Partner",     owner: "Partner",   source: "Partner Channel",  customer: "Verda",      approval: "review",    board_use: false, data_room: true },
  { id: "EV-2047", category: "Marketplace", owner: "MP Ops",    source: "Marketplace",      customer: "—",          approval: "approved",  board_use: true,  data_room: true },
  { id: "EV-2048", category: "API/EDI",     owner: "Billing",   source: "API/EDI",          customer: "Mistral",    approval: "draft",     board_use: false, data_room: false },
  { id: "EV-2049", category: "Board",       owner: "RevOps",    source: "Board",            customer: "—",          approval: "approved",  board_use: true,  data_room: true },
];

// 8. Pipeline audit trail
export const V125_PIPELINE_AUDIT = [
  { ts: "2026-05-02", opp: "Atlas Logistics",  event: "Stage → Procurement",  owner: "AE",       detail: "Auto-advance from Technical" },
  { ts: "2026-05-04", opp: "Atlas Logistics",  event: "Blocker added",         owner: "Security", detail: "AI disclosure missing" },
  { ts: "2026-05-07", opp: "Pinewood Transit", event: "Close date placeholder", owner: "AE Lead", detail: "Q3 → Q4 (placeholder)" },
  { ts: "2026-05-09", opp: "Helios Freight",   event: "Risk +",               owner: "Security", detail: "Pen-test summary pending" },
  { ts: "2026-05-12", opp: "Mistral Lines",    event: "Stage → Technical",    owner: "SE",       detail: "SSO scoping" },
  { ts: "2026-05-15", opp: "Cascade Logistics",event: "Deal desk: approved",  owner: "Deal Desk",detail: "EDI 214 mapping caveat" },
  { ts: "2026-05-17", opp: "NorthLine Freight",event: "Expansion approved",   owner: "Exec",     detail: "CoPilot + MP" },
  { ts: "2026-05-19", opp: "Pinnacle Carriers",event: "Risk +",               owner: "CSM Lead", detail: "Low CoPilot adoption" },
];

// 9. Deal execution auditability
export const V125_DEAL_AUDIT = {
  score: 81,
  rows: [
    { deal: "Atlas Logistics",   committee: true,  discovery: true, demo: true,  tech: true,  security: false, procurement: false, pilot: true,  case: true,  pricing: true,  desk: false, sponsor: true,  close_plan: true, contract: false },
    { deal: "NorthLine Freight", committee: true,  discovery: true, demo: true,  tech: true,  security: true,  procurement: true,  pilot: true,  case: true,  pricing: true,  desk: true,  sponsor: true,  close_plan: true, contract: true  },
    { deal: "Pinewood Transit",  committee: true,  discovery: true, demo: true,  tech: false, security: false, procurement: false, pilot: false, case: false, pricing: false, desk: false, sponsor: false, close_plan: false,contract: false },
    { deal: "Helios Freight",    committee: true,  discovery: true, demo: true,  tech: true,  security: false, procurement: false, pilot: true,  case: true,  pricing: true,  desk: true,  sponsor: true,  close_plan: false,contract: false },
    { deal: "Cascade Logistics", committee: true,  discovery: true, demo: true,  tech: true,  security: true,  procurement: true,  pilot: true,  case: true,  pricing: true,  desk: true,  sponsor: true,  close_plan: true, contract: false },
  ],
};

// 10. Expansion evidence
export const V125_EXPANSION_EVIDENCE = [
  { trigger: "CoPilot usage > threshold", account: "NorthLine",  owner: "CSM",  product: "CoPilot", evidence: "Adoption + value", approval: "approved" },
  { trigger: "Multi-region deploy",        account: "Helios",     owner: "CSM",  product: "MP",      evidence: "Region rollout",   approval: "review"   },
  { trigger: "API usage > plan",           account: "Mistral",    owner: "CSM",  product: "API",     evidence: "Overage report",   approval: "review"   },
  { trigger: "EDI partner request",        account: "Atlas",      owner: "CSM",  product: "EDI",     evidence: "Partner brief",    approval: "draft"    },
  { trigger: "Exec sponsor reach-out",     account: "Pinnacle",   owner: "CSM Lead", product: "Renewal+", evidence: "Sponsor note", approval: "review" },
];

// 11. Strategic account growth governance
export const V125_STRATEGIC_ACCT = [
  { account: "NorthLine Freight", tier: "T1", owner: "AE Lead", sponsor: "CRO", whitespace: "CoPilot, MP", expansion: "ready",  renewal: "ready",  churn: "low",  trust: "ready",  procurement: "ready",  proof: "ready",  mp: 64, api_edi: 38, copilot: 22, cadence: "weekly", action: "Push CoPilot play" },
  { account: "Atlas Logistics",   tier: "T1", owner: "AE",      sponsor: "CRO", whitespace: "API, EDI",    expansion: "review", renewal: "ready",  churn: "med",  trust: "review", procurement: "review", proof: "ready",  mp: 41, api_edi: 56, copilot: 14, cadence: "weekly", action: "Resolve procurement" },
  { account: "Helios Freight",    tier: "T2", owner: "AE",      sponsor: "COO", whitespace: "MP",          expansion: "review", renewal: "ready",  churn: "low",  trust: "ready",  procurement: "ready",  proof: "ready",  mp: 52, api_edi: 19, copilot: 31, cadence: "biweekly", action: "Sponsor visit" },
  { account: "Pinnacle Carriers", tier: "T2", owner: "AE",      sponsor: "COO", whitespace: "Renewal",     expansion: "blocked",renewal: "at_risk",churn: "high", trust: "ready",  procurement: "ready",  proof: "review", mp: 21, api_edi: 7,  copilot: 6,  cadence: "weekly", action: "Save play" },
  { account: "Mistral Lines",     tier: "T2", owner: "AE",      sponsor: "CTO", whitespace: "API, SSO",    expansion: "review", renewal: "ready",  churn: "low",  trust: "ready",  procurement: "ready",  proof: "ready",  mp: 12, api_edi: 71, copilot: 9,  cadence: "biweekly", action: "API expansion" },
];

// 12. Partner channel optimization
export const V125_PARTNER_OPT = {
  score: 79,
  partners: [
    { partner: "Verda Telematics", sourced_usd: 2_900_000, influenced_usd: 4_100_000, enablement: 84, certification: "review",  support: "low",  attribution: 88, conv_pct: 21, risk: "low",  expansion: "high" },
    { partner: "RouteWise API",    sourced_usd: 1_100_000, influenced_usd: 2_300_000, enablement: 62, certification: "draft",   support: "med",  attribution: 71, conv_pct: 12, risk: "med",  expansion: "med"  },
    { partner: "NavCore EDI",      sourced_usd:   800_000, influenced_usd: 1_500_000, enablement: 71, certification: "review",  support: "med",  attribution: 64, conv_pct: 9,  risk: "med",  expansion: "med"  },
    { partner: "FleetSafe",        sourced_usd: 1_900_000, influenced_usd: 2_800_000, enablement: 79, certification: "approved",support: "low",  attribution: 81, conv_pct: 18, risk: "low",  expansion: "high" },
  ],
  enablement_gaps: [
    { partner: "RouteWise API", gap: "Sandbox tokens stale", owner: "Partner Eng" },
    { partner: "NavCore EDI",   gap: "Mapping cookbook v3",  owner: "Partner Eng" },
  ],
  action_plan: [
    { action: "Run Verda joint campaign Q3",       owner: "Partner Lead", impact: "$900k" },
    { action: "Close RouteWise enablement gaps",   owner: "Partner Eng",  impact: "$400k" },
    { action: "Approve FleetSafe expansion plan",  owner: "Partner Lead", impact: "$700k" },
  ],
};

// 13. Partner channel performance governance
export const V125_PARTNER_GOV = {
  reviews: [
    { review: "Partner pipeline",     cadence: "monthly",   owner: "Partner Lead", status: "on_track" },
    { review: "Partner revenue",      cadence: "monthly",   owner: "Partner Lead", status: "on_track" },
    { review: "Partner attribution",  cadence: "quarterly", owner: "RevOps",       status: "review"   },
    { review: "Partner campaigns",    cadence: "monthly",   owner: "Marketing",    status: "on_track" },
    { review: "Partner enablement",   cadence: "quarterly", owner: "Partner Eng",  status: "review"   },
    { review: "Partner support",      cadence: "monthly",   owner: "Support",      status: "on_track" },
    { review: "Partner risk",         cadence: "quarterly", owner: "Risk",         status: "on_track" },
    { review: "Partner roadmap",      cadence: "quarterly", owner: "Product",      status: "on_track" },
  ],
  exceptions: [
    { item: "RouteWise attribution dispute (1)", owner: "RevOps",      age_days: 11 },
    { item: "NavCore enablement gap (1)",        owner: "Partner Eng", age_days: 7  },
  ],
};

// 14. Marketplace revenue intelligence
export const V125_MP_INTEL = {
  score: 78,
  metrics: {
    revenue_usd: 5_100_000, adoption_pct: 64,
    load_txn_fees_usd: 2_200_000, carrier_sub_usd: 1_400_000,
    preferred_program_usd_placeholder: 600_000,
  },
  regions: [
    { region: "TX",  revenue_usd: 1_800_000, density: "high",  risk: "low" },
    { region: "Midwest", revenue_usd: 1_400_000, density: "high",  risk: "low" },
    { region: "Southeast", revenue_usd:   400_000, density: "low",   risk: "high" },
    { region: "EU-W",  revenue_usd:   700_000, density: "med",   risk: "med" },
  ],
  quality: {
    coverage_pct: 81, bid_density: 6.4, tt_award_min: 11.2,
    dispute_cost_usd_placeholder: 92_400, settlement_hold_usd_placeholder: 41_200,
  },
  action_plan: [
    { action: "Grow Southeast preferred carriers",  owner: "MP Ops",      impact: "fees uplift" },
    { action: "Reduce EU-W dispute backlog",         owner: "MP Ops",      impact: "settlement" },
    { action: "Launch lane-level revenue dashboard", owner: "MP Product",  impact: "intel" },
  ],
};

// 15. API/EDI revenue intelligence
export const V125_APIEDI_INTEL = {
  score: 71,
  api: { usage_calls_m: 184.2, revenue_usd_placeholder: 920_000, overages_usd_placeholder: 64_000, plan_adoption_pct: 58, dev_accounts: 312 },
  edi: { txn_volume_m: 12.4, revenue_usd_placeholder: 410_000, support_tickets: 27 },
  expansion: [
    { customer: "Mistral Lines", opp_usd: 220_000, signal: "API overage 3 months" },
    { customer: "Atlas",         opp_usd: 180_000, signal: "EDI partner request" },
  ],
  risks: [
    { risk: "EDI placeholder revenue recon", owner: "Billing", severity: "med" },
    { risk: "API overage billing accuracy",  owner: "Billing", severity: "low" },
  ],
};

// 16. Executive growth stewardship
export const V125_EXEC_STEWARD = [
  { role: "CEO",      priority: "Capital-grade growth + board readiness",            owner: "CEO",    status: "on_track" },
  { role: "CRO",      priority: "Pipeline quality + deal execution discipline",      owner: "CRO",    status: "on_track" },
  { role: "COO",      priority: "Expansion governance + global account ops",         owner: "COO",    status: "on_track" },
  { role: "CFO",      priority: "Revenue quality controls + capital reporting",      owner: "CFO",    status: "on_track" },
  { role: "CSM Lead", priority: "Retention + expansion evidence",                    owner: "CSM",    status: "review" },
  { role: "Partner",  priority: "Partner channel optimization + attribution",        owner: "Partner",status: "on_track" },
  { role: "MP Ops",   priority: "Marketplace revenue intelligence + dispute",        owner: "MP Ops", status: "review" },
  { role: "Product",  priority: "Product monetization + API/EDI maturity",           owner: "CPO",    status: "on_track" },
  { role: "Security", priority: "Procurement evidence + trust pack delivery",        owner: "CISO",   status: "review" },
];
export const V125_EXEC_BLOCKERS = [
  { blocker: "Procurement evidence gap (Atlas)",   owner: "Security", impact: "$1.8M" },
  { blocker: "Partner attribution dispute",        owner: "RevOps",   impact: "attribution" },
  { blocker: "EDI placeholder rev recon",          owner: "Billing",  impact: "revenue quality" },
];
export const V125_EXEC_DECISIONS = [
  { decision: "Approve Verda joint campaign",      owner: "CRO" },
  { decision: "Approve Pinnacle save play budget", owner: "CFO" },
  { decision: "Lock Q3 board pack",                owner: "CEO" },
];
export const V125_EXEC_CADENCE = [
  { cadence: "Weekly growth sync",       freq: "weekly",    owner: "CRO" },
  { cadence: "Monthly revenue quality",  freq: "monthly",   owner: "CFO" },
  { cadence: "Quarterly board growth",   freq: "quarterly", owner: "CEO" },
];

// 17. Growth risk & control matrix
export const V125_GROWTH_RISK = [
  { area: "Pipeline",            risk: "med", control: "Stage gating + audit", owner: "RevOps" },
  { area: "Deal execution",      risk: "low", control: "13-step checklist",    owner: "Deal Desk" },
  { area: "Procurement",         risk: "med", control: "Trust packet SLA",     owner: "Security" },
  { area: "Security review",     risk: "low", control: "Questionnaire vault",  owner: "Security" },
  { area: "Pricing",             risk: "low", control: "Approval workflow",    owner: "Pricing" },
  { area: "Discounting (plchldr)", risk: "low", control: "Threshold gating",   owner: "Deal Desk" },
  { area: "Expansion",           risk: "low", control: "Evidence + approval",  owner: "CSM" },
  { area: "Renewal",             risk: "med", control: "Save play matrix",     owner: "CSM Lead" },
  { area: "Churn",               risk: "med", control: "Health score + sponsor",owner: "CSM Lead" },
  { area: "Marketplace revenue", risk: "med", control: "Dispute + recon",      owner: "MP Ops" },
  { area: "API/EDI revenue",     risk: "med", control: "Overage + recon",      owner: "Billing" },
  { area: "Partner channel",     risk: "low", control: "Attribution review",   owner: "Partner" },
  { area: "Revenue quality",     risk: "low", control: "Quality controls",     owner: "Finance" },
  { area: "Proof asset",         risk: "low", control: "Approval + freshness", owner: "Marketing" },
  { area: "Capital reporting",   risk: "med", control: "Evidence-linked pack", owner: "RevOps" },
];

// 18. Commercial proof control
export const V125_PROOF_CONTROL = [
  { asset: "NorthLine case study",       type: "case",      customer: "approved", legal: "approved", security: "approved", sales: "approved", visibility: "public",  expires: "2026-12-01", linked_evidence: true,  used_in_deals: 14, influence_usd_placeholder: 1_800_000, freshness: "ready",  risk: "low" },
  { asset: "Helios reference call",      type: "reference", customer: "approved", legal: "n/a",      security: "approved", sales: "approved", visibility: "private", expires: "—",          linked_evidence: true,  used_in_deals: 9,  influence_usd_placeholder:   900_000, freshness: "ready",  risk: "low" },
  { asset: "Atlas ROI calc",             type: "roi",       customer: "approved", legal: "approved", security: "approved", sales: "approved", visibility: "private", expires: "2026-08-01", linked_evidence: true,  used_in_deals: 6,  influence_usd_placeholder:   650_000, freshness: "review", risk: "med" },
  { asset: "Cascade architecture diag.", type: "architecture", customer: "review", legal: "review",  security: "approved", sales: "approved", visibility: "private", expires: "—",          linked_evidence: false, used_in_deals: 3,  influence_usd_placeholder:   220_000, freshness: "review", risk: "med" },
  { asset: "Mistral testimonial",        type: "testimonial", customer: "approved", legal: "approved", security: "n/a",    sales: "approved", visibility: "public",  expires: "2027-01-01", linked_evidence: true,  used_in_deals: 2,  influence_usd_placeholder:   140_000, freshness: "ready",  risk: "low" },
];

// 19. Capital-grade board growth reporting
export const V125_BOARD_GROWTH = [
  { section: "Growth operations score",      owner: "CEO/CRO", status: "ready",  notes: "91 (+3 QoQ)" },
  { section: "Commercial auditability",      owner: "RevOps",  status: "ready",  notes: "84 score" },
  { section: "Revenue intelligence",         owner: "CFO",     status: "ready",  notes: "Mix + concentration" },
  { section: "Revenue quality controls",     owner: "CFO",     status: "ready",  notes: "13 controls" },
  { section: "Strategic account expansion",  owner: "CRO/CSM", status: "ready",  notes: "5 T1/T2 accounts" },
  { section: "Pipeline auditability",        owner: "RevOps",  status: "ready",  notes: "88% completeness" },
  { section: "Deal execution auditability",  owner: "Deal Desk", status: "ready",notes: "81 score" },
  { section: "Partner channel optimization", owner: "Partner", status: "ready",  notes: "79 score" },
  { section: "Marketplace revenue intel.",   owner: "MP Ops",  status: "review", notes: "Southeast risk" },
  { section: "API/EDI revenue intel.",       owner: "Billing", status: "review", notes: "EDI placeholder recon" },
  { section: "Commercial risk controls",     owner: "Risk",    status: "ready",  notes: "15 risks tracked" },
  { section: "Capital data room evidence",   owner: "RevOps",  status: "review", notes: "2 gaps" },
  { section: "Decisions needed",             owner: "CEO",     status: "ready",  notes: "3 decisions queued" },
  { section: "Next quarter priorities",      owner: "CEO",     status: "ready",  notes: "5 priorities" },
];
export const V125_BOARD_DECISIONS = [
  { id: "BD-12501", subject: "Approve Verda joint campaign",    owner: "Board", due: "2026-06-30", status: "pending" },
  { id: "BD-12502", subject: "Lock Q3 board growth pack",       owner: "Board", due: "2026-07-15", status: "pending" },
  { id: "BD-12503", subject: "Approve Pinnacle save play",      owner: "Board", due: "2026-06-20", status: "pending" },
];

// 20. Commercial data room evidence
export const V125_DATA_ROOM = [
  { section: "Pipeline evidence",           status: "ready",  owner: "RevOps",   notes: "Stage + risk trails" },
  { section: "Revenue quality evidence",    status: "ready",  owner: "CFO",      notes: "Quality controls" },
  { section: "Customer concentration",      status: "review", owner: "CFO",      notes: "Top-10 38%" },
  { section: "Expansion evidence",          status: "ready",  owner: "CSM",      notes: "5 plays evidenced" },
  { section: "Renewal risk evidence",       status: "ready",  owner: "CSM Lead", notes: "Save play tracked" },
  { section: "Marketplace revenue evidence",status: "review", owner: "MP Ops",   notes: "Dispute backlog" },
  { section: "API/EDI revenue evidence",    status: "review", owner: "Billing",  notes: "EDI placeholder" },
  { section: "Partner channel evidence",    status: "ready",  owner: "Partner",  notes: "Attribution review" },
  { section: "Customer proof evidence",     status: "ready",  owner: "Marketing",notes: "Approved assets" },
  { section: "Trust-led sales evidence",    status: "ready",  owner: "Security", notes: "Trust packet" },
  { section: "Deal desk approval evidence", status: "ready",  owner: "Deal Desk",notes: "Approvals chained" },
  { section: "Board reporting evidence",    status: "ready",  owner: "RevOps",   notes: "Pack chained" },
  { section: "Commercial risk evidence",    status: "ready",  owner: "Risk",     notes: "Matrix evidenced" },
  { section: "Sales process evidence",      status: "ready",  owner: "RevOps",   notes: "Playbooks" },
];

// 21. Long-term growth governance
export const V125_GROWTH_GOV = [
  { fn: "Enterprise sales governance",   owner: "CRO",       maturity: 84, cadence: "monthly" },
  { fn: "Account expansion governance",  owner: "CSM Lead",  maturity: 82, cadence: "monthly" },
  { fn: "Renewal governance",            owner: "CSM Lead",  maturity: 80, cadence: "monthly" },
  { fn: "Revenue quality governance",    owner: "CFO",       maturity: 82, cadence: "monthly" },
  { fn: "Deal desk governance",          owner: "Deal Desk", maturity: 86, cadence: "weekly" },
  { fn: "Pricing governance",            owner: "Pricing",   maturity: 79, cadence: "monthly" },
  { fn: "Procurement governance",        owner: "Security",  maturity: 74, cadence: "monthly" },
  { fn: "Partner channel governance",    owner: "Partner",   maturity: 78, cadence: "monthly" },
  { fn: "Marketplace revenue governance",owner: "MP Ops",    maturity: 76, cadence: "monthly" },
  { fn: "API/EDI revenue governance",    owner: "Billing",   maturity: 71, cadence: "monthly" },
  { fn: "Commercial proof governance",   owner: "Marketing", maturity: 81, cadence: "monthly" },
  { fn: "Board growth governance",       owner: "CEO",       maturity: 83, cadence: "quarterly" },
  { fn: "Capital data room governance",  owner: "RevOps",    maturity: 74, cadence: "quarterly" },
];

// 22. Reports
export const V125_REPORTS = [
  "Capital-grade growth operations",
  "Commercial auditability",
  "Global revenue intelligence",
  "Revenue quality control",
  "Enterprise revenue evidence",
  "Growth operating evidence",
  "Pipeline audit trail",
  "Deal execution auditability",
  "Expansion evidence",
  "Strategic account growth governance",
  "Partner channel optimization",
  "Marketplace revenue intelligence",
  "API/EDI revenue intelligence",
  "Executive growth stewardship",
  "Growth risk and controls",
  "Commercial proof control",
  "Board growth reporting",
  "Commercial data room evidence",
  "Long-term growth governance",
];

// 25. Edge / server boundary
export const V125_BACKEND_BOUNDARY = [
  { kind: "createServerFn", name: "calculate-v125-growth-operations-score",      auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-commercial-auditability-score",     auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-global-revenue-intelligence-score", auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-revenue-quality-control-score",     auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-deal-execution-auditability",       auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-strategic-account-growth-gov",      auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-partner-channel-optimization",      auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-marketplace-revenue-intelligence",  auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-api-edi-revenue-intelligence",      auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-growth-risk-control-score",         auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-growth-governance-maturity",        auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "approve-commercial-proof-asset",              auth: "requireSupabaseAuth (role gated)" },
  { kind: "createServerFn", name: "generate-capital-board-growth-report",        auth: "requireSupabaseAuth (board role)" },
  { kind: "createServerFn", name: "generate-commercial-data-room-evidence-pack", auth: "requireSupabaseAuth (exec/admin)" },
  { kind: "server route",   name: "/api/public/partner/attribution",             auth: "HMAC signature (partner)" },
  { kind: "server route",   name: "/api/public/marketplace/settlement",          auth: "HMAC signature (provider)" },
];

export const V125_RLS_EXAMPLES = [
  { table: "v125_growth_operations_scores",          policy: "Platform owners only",              expression: "is_platform_owner(auth.uid())" },
  { table: "commercial_auditability_records",        policy: "Company admins + RevOps",            expression: "has_role(auth.uid(), company_id, 'admin') OR has_role(auth.uid(), company_id, 'revops')" },
  { table: "global_revenue_intelligence_records",    policy: "CFO / RevOps roles",                 expression: "has_role(auth.uid(), company_id, 'cfo') OR has_role(auth.uid(), company_id, 'revops')" },
  { table: "revenue_quality_control_records",        policy: "RevOps + Finance",                   expression: "has_role(auth.uid(), company_id, 'revops') OR has_role(auth.uid(), company_id, 'finance')" },
  { table: "pipeline_audit_trail_records",           policy: "Assigned AE + RevOps",               expression: "owner_user_id = auth.uid() OR has_role(auth.uid(), company_id, 'revops')" },
  { table: "deal_execution_auditability_records",    policy: "Deal team + Deal Desk",              expression: "owner_user_id = auth.uid() OR has_role(auth.uid(), company_id, 'deal_desk')" },
  { table: "expansion_evidence_records",             policy: "CSM owners + CSM Lead",              expression: "owner_user_id = auth.uid() OR has_role(auth.uid(), company_id, 'csm_lead')" },
  { table: "strategic_account_growth_gov_records",   policy: "Account team + execs",               expression: "owner_user_id = auth.uid() OR has_role(auth.uid(), company_id, 'exec')" },
  { table: "partner_channel_optimization_records",   policy: "Partner role only",                  expression: "has_role(auth.uid(), company_id, 'partner_ops')" },
  { table: "marketplace_revenue_intelligence_records", policy: "MP Ops + Billing",                 expression: "has_role(auth.uid(), company_id, 'mp_ops') OR has_role(auth.uid(), company_id, 'billing')" },
  { table: "api_edi_revenue_intelligence_records",   policy: "Billing role",                       expression: "has_role(auth.uid(), company_id, 'billing')" },
  { table: "commercial_proof_control_records",       policy: "Marketing + approval gated external",expression: "has_role(auth.uid(), company_id, 'marketing') AND approved = true" },
  { table: "capital_board_growth_reports",           policy: "Board/exec only",                    expression: "has_role(auth.uid(), company_id, 'board') OR has_role(auth.uid(), company_id, 'exec')" },
  { table: "commercial_data_room_evidence_items",    policy: "Exec/admin only",                    expression: "has_role(auth.uid(), company_id, 'exec') OR has_role(auth.uid(), company_id, 'admin')" },
];

// 28. Demo
export const V125_DEMO = [
  { role: "CRO",     step: "Open Capital-Grade Growth Operations Center — score 91 (+3)." },
  { role: "CRO",     step: "Review 2 growth risks needing executive review." },
  { role: "RevOps",  step: "Open Commercial Auditability Center — 84 score, 88% pipeline trail." },
  { role: "RevOps",  step: "Resolve 2 procurement response evidence gaps." },
  { role: "RevOps",  step: "Schedule customer proof usage audit review." },
  { role: "CFO",     step: "Open Global Revenue Intelligence — mix + concentration." },
  { role: "CFO",     step: "Flag Top-10 customer concentration (38%) as moderate risk." },
  { role: "CFO",     step: "Note marketplace growing; API expansion opportunity early." },
  { role: "CSM Lead",step: "Open Strategic Account Growth Governance — 3 expansion-ready." },
  { role: "CSM Lead",step: "Trigger save play on Pinnacle renewal risk." },
  { role: "CSM Lead",step: "Push CoPilot adoption play across 2 accounts." },
  { role: "CSM Lead",step: "Generate expansion evidence packet for NorthLine." },
  { role: "Partner", step: "Open Partner Channel Optimization Center." },
  { role: "Partner", step: "Schedule Verda telematics performance review." },
  { role: "Partner", step: "Close RouteWise API enablement gaps." },
  { role: "MP Ops",  step: "Open Marketplace Revenue Intelligence — TX + Midwest strong." },
  { role: "MP Ops",  step: "Recommend Southeast preferred carrier growth plan." },
  { role: "Board",   step: "Open Capital-Grade Board Growth Reporting." },
  { role: "Board",   step: "Approve Verda joint campaign + Pinnacle save play." },
  { role: "CEO",     step: "Lock Q3 board growth pack with evidence-linked sections." },
];

export const V125_DEMO_CLOSEOUT = [
  { role: "CRO",     commitment: "Drive growth ops score 91 → 93 next Q",         due: "Q3" },
  { role: "RevOps",  commitment: "Lift commercial auditability 84 → 90",          due: "Q3" },
  { role: "CFO",     commitment: "Hold revenue quality controls ≥ 82",            due: "ongoing" },
  { role: "CSM Lead",commitment: "Resolve Pinnacle renewal risk; +CoPilot play",  due: "30d" },
  { role: "Partner", commitment: "Verda joint campaign live; RouteWise gaps closed", due: "60d" },
  { role: "MP Ops",  commitment: "Southeast carrier density program live",        due: "Q3" },
  { role: "Board",   commitment: "Approve 3 board decisions",                     due: "next board" },
  { role: "CEO",     commitment: "Lock Q3 board pack with linked evidence",       due: "Jul 15" },
];

export const V125_ROLE_GUIDANCE = [
  { role: "CRO",      focus: "Growth ops score + commercial risk triage", tone: "violet" },
  { role: "RevOps",   focus: "Auditability completeness + exceptions",    tone: "sky" },
  { role: "CFO",      focus: "Revenue quality + concentration + capital report", tone: "emerald" },
  { role: "CSM Lead", focus: "Expansion + renewal evidence + save play",   tone: "amber" },
  { role: "Partner",  focus: "Channel optimization + attribution",         tone: "violet" },
  { role: "MP Ops",   focus: "Marketplace intel + dispute + lane risk",    tone: "rose" },
  { role: "Security", focus: "Procurement evidence + trust packet",        tone: "sky" },
  { role: "Board",    focus: "Capital-grade pack + decisions queue",       tone: "emerald" },
  { role: "CEO",      focus: "Stewardship + Q3 pack lock",                 tone: "violet" },
];

export const V125_PHASE39_TEASER = [
  "V13 enterprise capital readiness",
  "Revenue intelligence maturity",
  "Commercial diligence system",
  "Marketplace economics governance",
  "Executive value creation operations",
];
