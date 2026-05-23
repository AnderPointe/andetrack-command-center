// Phase 43 V15 mock-only datasets. No backend calls.

export const V15_SCOPE = {
  included: [
    "Enterprise Performance Command Center",
    "Durable Capital Execution Center",
    "Durable Revenue Performance Center",
    "Marketplace Scale Governance Center",
    "Marketplace Scale Intelligence",
    "Strategic Operating Intelligence Center",
    "Operating Intelligence Recommendation Engine (human approval)",
    "Category Leadership Operating System",
    "Executive Performance Control Tower",
    "Board-Level Enterprise Intelligence Center",
    "Strategic Account Performance Center",
    "Partner Ecosystem Performance Center",
    "Product-Line Performance Governance",
    "Capital Evidence Governance Center",
    "Commercial Diligence Governance Center",
    "Strategic Risk Intelligence Center",
    "Enterprise Performance Controls Matrix",
    "Long-Term Strategic Performance Roadmap",
    "Board Enterprise Performance Reporting",
    "V15 Advanced Reporting",
  ],
  deferred: [
    "Fully autonomous dispatch",
    "Final IPO / acquisition claims without evidence",
    "Final audited financial claims (SOC2 / ISO / GAAP)",
    "Full customs production workflows",
    "Full international tax automation",
    "Insurance underwriting automation",
    "Autonomous vehicle workflows",
    "Final Android Auto / CarPlay claims",
  ],
};

export const V15_FEATURES = [
  { area: "Enterprise",   v145: "Operating Excellence Command",      v15: "Enterprise Performance Command",            status: "elevated" },
  { area: "Capital",      v145: "Strategic Capital Discipline",      v15: "Durable Capital Execution",                 status: "elevated" },
  { area: "Revenue",      v145: "Durable Revenue Systems",           v15: "Durable Revenue Performance",               status: "elevated" },
  { area: "Marketplace",  v145: "Scale Controls",                    v15: "Scale Governance + Scale Intelligence",     status: "added" },
  { area: "Intelligence", v145: "(distributed)",                     v15: "Strategic Operating Intelligence Center",   status: "new" },
  { area: "Recommend",    v145: "(none)",                            v15: "Operating Intelligence Recommendation Eng", status: "new" },
  { area: "Category",     v145: "Category Execution Maturity",       v15: "Category Leadership Operating System",      status: "elevated" },
  { area: "Executives",   v145: "Performance Management",            v15: "Executive Performance Control Tower",       status: "elevated" },
  { area: "Board",        v145: "Board Execution Discipline",        v15: "Board-Level Enterprise Intelligence",       status: "elevated" },
  { area: "Accounts",     v145: "Account Growth Discipline",         v15: "Strategic Account Performance",             status: "elevated" },
  { area: "Partners",     v145: "Partner Value Execution",           v15: "Partner Ecosystem Performance",             status: "elevated" },
  { area: "Product",      v145: "Operating Excellence",              v15: "Product-Line Performance Governance",       status: "elevated" },
  { area: "Evidence",     v145: "Capital Evidence Discipline",       v15: "Capital Evidence Governance",               status: "elevated" },
  { area: "Diligence",    v145: "Commercial Diligence Discipline",   v15: "Commercial Diligence Governance",           status: "elevated" },
  { area: "Risk",         v145: "Risk Execution Discipline",         v15: "Strategic Risk Intelligence",               status: "elevated" },
  { area: "Controls",     v145: "Operating Controls Matrix",         v15: "Enterprise Performance Controls Matrix",    status: "elevated" },
  { area: "Roadmap",      v145: "Long-Term Performance",             v15: "Long-Term Strategic Performance Roadmap",   status: "elevated" },
];

export const V15_COMMAND = {
  score: 94,
  trend_qoq: +2,
  kpis: [
    { dim: "Enterprise performance",   pct: 94 },
    { dim: "Operating excellence",     pct: 93 },
    { dim: "Capital execution",        pct: 88 },
    { dim: "Durable revenue",          pct: 89 },
    { dim: "Marketplace scale",        pct: 84 },
    { dim: "Category leadership",      pct: 90 },
    { dim: "Strategic accounts",       pct: 86 },
    { dim: "Partner ecosystem",        pct: 81 },
    { dim: "Product-line",             pct: 86 },
    { dim: "Board execution",          pct: 84 },
    { dim: "Capital evidence",         pct: 85 },
    { dim: "Commercial diligence",     pct: 82 },
    { dim: "Strategic risk",           pct: 80 },
    { dim: "Executive action",         pct: 87 },
    { dim: "LT performance",           pct: 85 },
  ],
  health_map: [
    { area: "Revenue",     status: "healthy" },
    { area: "Capital",     status: "healthy" },
    { area: "Marketplace", status: "watchlist" },
    { area: "Category",    status: "healthy" },
    { area: "Board",       status: "in_progress" },
    { area: "Risk",        status: "watchlist" },
  ],
  gaps: [
    "Southeast carrier density still below scale threshold",
    "2 capital evidence items overdue refresh",
    "EDI product-line support burden trending high",
    "1 strategic risk lacks named mitigation owner",
  ],
  actions: [
    { action: "Approve Southeast marketplace scale plan",      owner: "MP Lead",  due: "2026-06-02", status: "pending",   evidence: "MP plan v3" },
    { action: "Refresh capital evidence (revenue + MP)",       owner: "CFO",      due: "2026-05-30", status: "in_prog",   evidence: "Data room" },
    { action: "Reduce EDI support burden (top 5 cust)",        owner: "Product",  due: "2026-06-12", status: "in_prog",   evidence: "Ticket trend" },
    { action: "Publish marketplace proof asset library",       owner: "PMM",      due: "2026-06-05", status: "in_prog",   evidence: "Library v2" },
    { action: "Complete capital evidence governance actions",  owner: "CoS",      due: "2026-06-08", status: "pending",   evidence: "Governance log" },
  ],
};

export const V15_TRENDS = [
  { q: "Q-3", perf: 88, cap: 82, rev: 84, mp: 76, cat: 84 },
  { q: "Q-2", perf: 90, cap: 84, rev: 86, mp: 78, cat: 86 },
  { q: "Q-1", perf: 92, cap: 86, rev: 88, mp: 81, cat: 88 },
  { q: "Q0",  perf: 94, cap: 88, rev: 89, mp: 84, cat: 90 },
];

export const V15_CAPITAL = {
  score: 88,
  actions: [
    { action: "Capital strategy progress narrative refresh", owner: "CFO",  due: "2026-06-01", status: "in_prog", evidence: "Narrative v4" },
    { action: "Investor/acquirer evidence pack v3",          owner: "CoS",  due: "2026-06-05", status: "pending", evidence: "Data room" },
    { action: "Revenue durability evidence refresh",         owner: "RevOps", due: "2026-05-29", status: "in_prog", evidence: "Rev evidence" },
    { action: "Marketplace scale evidence refresh",          owner: "MP Lead", due: "2026-06-02", status: "in_prog", evidence: "MP evidence" },
    { action: "Customer concentration reduction plan",       owner: "CRO",  due: "2026-06-10", status: "pending", evidence: "Concentration plan" },
    { action: "Strategic risk reduction follow-through",     owner: "CoS",  due: "2026-06-15", status: "in_prog", evidence: "Risk register" },
    { action: "Product durability narrative",                owner: "Product", due: "2026-06-18", status: "pending", evidence: "Product brief" },
    { action: "Trust evidence pack",                         owner: "Sec",  due: "2026-06-08", status: "in_prog", evidence: "Trust pack" },
    { action: "Board governance evidence",                   owner: "Board CoS", due: "2026-06-12", status: "pending", evidence: "Board log" },
  ],
  blockers: [
    { area: "Capital evidence",  severity: "medium", note: "Two items overdue (MP scale, customer concentration)" },
    { area: "Strategic risk",    severity: "medium", note: "Mitigation owner pending on competitive risk" },
  ],
  evidence_freshness: [
    { cat: "Revenue durability",  fresh: "ok",      owner: "RevOps" },
    { cat: "Marketplace scale",   fresh: "overdue", owner: "MP Lead" },
    { cat: "Customer concentration", fresh: "overdue", owner: "CRO" },
    { cat: "Strategic account",   fresh: "ok",      owner: "CSM Lead" },
    { cat: "Partner value",       fresh: "ok",      owner: "Partner Lead" },
    { cat: "Product durability",  fresh: "stale",   owner: "Product" },
    { cat: "Enterprise trust",    fresh: "ok",      owner: "Sec" },
    { cat: "Category leadership", fresh: "ok",      owner: "PMM" },
    { cat: "Board governance",    fresh: "ok",      owner: "Board CoS" },
    { cat: "Strategic risk",      fresh: "stale",   owner: "CoS" },
  ],
};

export const V15_REVENUE = {
  score: 89,
  matrix: [
    { stream: "Recurring",          durability: 92, trend: "+2", concentration: "low",    evidence: "ok" },
    { stream: "Renewals",           durability: 91, trend: "+1", concentration: "low",    evidence: "ok" },
    { stream: "Expansion",          durability: 86, trend: "+3", concentration: "medium", evidence: "ok" },
    { stream: "Marketplace",        durability: 84, trend: "+4", concentration: "medium", evidence: "stale" },
    { stream: "API",                durability: 72, trend: "+1", concentration: "high",   evidence: "stale" },
    { stream: "EDI (placeholder)",  durability: 70, trend: "0",  concentration: "medium", evidence: "missing" },
    { stream: "Partner-sourced",    durability: 78, trend: "+2", concentration: "medium", evidence: "ok" },
  ],
  concentration: [
    { axis: "Customer",     top1_pct: 11, top5_pct: 34, status: "watchlist" },
    { axis: "Product-line", top1_pct: 28, top5_pct: 71, status: "tracking" },
    { axis: "Region",       top1_pct: 24, top5_pct: 68, status: "tracking" },
  ],
  payment_health: { dso_days: 38, dispute_rate_pct: 1.6, hold_rate_pct: 0.9 },
  evidence: [
    { item: "Recurring revenue cohort", owner: "RevOps", fresh: "ok" },
    { item: "Expansion playbook proof", owner: "RevOps", fresh: "ok" },
    { item: "Marketplace revenue durability", owner: "MP Lead", fresh: "stale" },
    { item: "API revenue durability", owner: "Product", fresh: "stale" },
  ],
  actions: [
    "Refresh marketplace revenue durability evidence (MP Lead, 2026-06-02)",
    "Refresh API revenue durability evidence (Product, 2026-06-09)",
    "Tier-2 concentration reduction plan (CRO, 2026-06-15)",
  ],
};

export const V15_MP_GOV = {
  score: 84,
  kpis: {
    fee_capture_pct: 96, take_rate_placeholder: "tracked",
    load_coverage_pct: 92, avg_bids_per_load: 5.6,
    time_to_first_bid_min: 7, time_to_award_min: 24,
    carrier_quality: "high", carrier_compliance: 97,
    dispute_cost_placeholder: "tracked", settlement_hold_placeholder: "tracked",
    unit_econ_confidence: "medium-high",
  },
  regions: [
    { region: "Texas",     economics: "strong",   density: "high",    risk: "tracking" },
    { region: "Midwest",   economics: "strong",   density: "high",    risk: "tracking" },
    { region: "Southeast", economics: "improving", density: "medium", risk: "watchlist" },
    { region: "West",      economics: "stable",   density: "medium",  risk: "tracking" },
    { region: "Northeast", economics: "stable",   density: "medium",  risk: "tracking" },
  ],
  exceptions: [
    { exception: "Southeast carrier density gap", owner: "MP Lead", status: "in_prog" },
    { exception: "Reefer equipment coverage gap (SE)", owner: "MP Lead", status: "pending" },
  ],
  action_plan: [
    "Preferred carrier recruitment — Southeast (MP Lead, 2026-06-08)",
    "Reefer coverage expansion — Southeast (MP Lead, 2026-06-15)",
    "Carrier-quality threshold review (MP Lead, 2026-06-20)",
  ],
};

export const V15_MP_INTEL = {
  score: 82,
  regions: [
    { region: "Texas",     opportunity: "scale",       confidence: "high",   action: "Continue scale" },
    { region: "Midwest",   opportunity: "scale",       confidence: "high",   action: "Continue scale" },
    { region: "Southeast", opportunity: "density",     confidence: "medium", action: "Recruit preferred carriers" },
    { region: "West",      opportunity: "lane mix",    confidence: "medium", action: "Lane re-pricing pilot" },
    { region: "Northeast", opportunity: "equipment",   confidence: "medium", action: "Reefer coverage" },
  ],
  density_gaps: [
    { region: "Southeast", equipment: "reefer", gap: "high",   action: "Recruit 12 carriers" },
    { region: "West",      equipment: "flatbed", gap: "medium", action: "Recruit 6 carriers" },
  ],
  equipment_gaps: [
    { equipment: "Reefer",  regions: "SE, W", action: "Coverage expansion" },
    { equipment: "Tanker",  regions: "TX",    action: "Selective preferred-carrier" },
  ],
  trends: [
    { metric: "Carrier quality",  trend: "+2 QoQ" },
    { metric: "Load coverage",    trend: "+1 QoQ" },
    { metric: "Avg bids/load",    trend: "+0.4 QoQ" },
    { metric: "Dispute rate",     trend: "-0.2 QoQ" },
  ],
  recommendations: [
    { rec: "Southeast preferred-carrier recruitment", confidence: "medium", approver: "MP Lead",   approval: "pending" },
    { rec: "West lane re-pricing pilot",              confidence: "medium", approver: "RevOps",    approval: "pending" },
    { rec: "Reefer coverage expansion (SE)",          confidence: "medium", approver: "MP Lead",   approval: "pending" },
  ],
};

export const V15_INTEL = {
  score: 87,
  signals: [
    { area: "Revenue durability",     signal: "improving", confidence: "high",   approval: "n/a" },
    { area: "Marketplace scale",      signal: "mixed",     confidence: "medium", approval: "human" },
    { area: "Customer expansion",     signal: "improving", confidence: "medium", approval: "human" },
    { area: "Partner performance",    signal: "improving", confidence: "medium", approval: "human" },
    { area: "Product-line (EDI)",     signal: "risk",      confidence: "high",   approval: "human" },
    { area: "Capital evidence",       signal: "gap",       confidence: "high",   approval: "human" },
    { area: "Commercial diligence",   signal: "tracking",  confidence: "medium", approval: "n/a" },
    { area: "Strategic risk",         signal: "watchlist", confidence: "high",   approval: "human" },
    { area: "Board decision",         signal: "open",      confidence: "high",   approval: "human" },
    { area: "Executive action",       signal: "behind",    confidence: "high",   approval: "human" },
  ],
  approval_queue: [
    { rec: "Southeast preferred-carrier recruitment", owner: "MP Lead",  confidence: "medium", impact: "MP scale", risk: "low",    status: "pending" },
    { rec: "EDI support-burden reduction sprint",     owner: "Product",  confidence: "high",   impact: "Retention", risk: "medium", status: "pending" },
    { rec: "Tier-2 concentration reduction outreach", owner: "CRO",      confidence: "medium", impact: "Durability", risk: "low",   status: "pending" },
    { rec: "Capital evidence refresh batch",          owner: "CoS",      confidence: "high",   impact: "Capital",   risk: "low",    status: "pending" },
  ],
};

export const V15_RECS = [
  {
    id: "REC-1001",
    rec: "Recruit 12 preferred carriers in Southeast (reefer focus)",
    type: "Marketplace scale",
    source_signals: ["Southeast density gap", "Reefer coverage gap", "Carrier quality trend +2"],
    confidence: "medium", impact_placeholder: "MP scale +3pts (est)", risk: "low",
    approver: "MP Lead", approval: "pending", audit: "AUD-1001", next: "MP Lead approve → outreach sprint",
  },
  {
    id: "REC-1002",
    rec: "EDI support-burden reduction sprint (top 5 customers)",
    type: "Product-line investment",
    source_signals: ["EDI ticket trend high", "Top 5 customer support load", "Retention risk medium"],
    confidence: "high", impact_placeholder: "Retention +2pts (est)", risk: "medium",
    approver: "Product",  approval: "pending", audit: "AUD-1002", next: "Product approve → sprint plan",
  },
  {
    id: "REC-1003",
    rec: "Tier-2 customer concentration reduction outreach",
    type: "Strategic account",
    source_signals: ["Top5 customer share 34%", "Renewal calendar Q3", "Expansion plays available"],
    confidence: "medium", impact_placeholder: "Concentration -3pts (est)", risk: "low",
    approver: "CRO", approval: "pending", audit: "AUD-1003", next: "CRO approve → CSM outreach",
  },
  {
    id: "REC-1004",
    rec: "Capital evidence refresh batch (MP scale + concentration)",
    type: "Capital evidence",
    source_signals: ["2 evidence items overdue", "Board review next month", "Data-room status"],
    confidence: "high", impact_placeholder: "Capital readiness +2pts (est)", risk: "low",
    approver: "CFO", approval: "pending", audit: "AUD-1004", next: "CFO approve → CoS refresh batch",
  },
];

export const V15_CATEGORY = {
  score: 90,
  pillars: [
    { pillar: "Category narrative",        execution: "in_prog", evidence: "ok"     },
    { pillar: "Market education",          execution: "in_prog", evidence: "ok"     },
    { pillar: "Competitive positioning",   execution: "in_prog", evidence: "ok"     },
    { pillar: "Differentiation",           execution: "in_prog", evidence: "ok"     },
    { pillar: "Customer proof",            execution: "in_prog", evidence: "ok"     },
    { pillar: "Marketplace proof",         execution: "in_prog", evidence: "stale"  },
    { pillar: "AI operations proof",       execution: "in_prog", evidence: "ok"     },
    { pillar: "Enterprise trust proof",    execution: "in_prog", evidence: "ok"     },
    { pillar: "Product proof",             execution: "in_prog", evidence: "ok"     },
    { pillar: "Partner proof",             execution: "in_prog", evidence: "ok"     },
    { pillar: "Sales narrative adoption",  execution: "in_prog", evidence: "ok"     },
    { pillar: "Website/demo narrative",    execution: "in_prog", evidence: "ok"     },
    { pillar: "Board narrative",           execution: "in_prog", evidence: "ok"     },
  ],
  actions: [
    "Publish marketplace proof library v2 (PMM, 2026-06-05)",
    "Customer proof refresh (PMM, 2026-06-12)",
    "Board narrative deck refresh (PMM + CEO, 2026-06-15)",
  ],
};

export const V15_EXEC = {
  score: 87,
  priorities: [
    { exec: "CEO",   priority: "Approve Southeast scale plan + board narrative",        status: "in_prog", due: "2026-06-02" },
    { exec: "COO",   priority: "Operating cadence + cross-functional blockers",          status: "in_prog", due: "2026-06-01" },
    { exec: "CFO",   priority: "Capital evidence refresh + concentration plan",          status: "in_prog", due: "2026-06-05" },
    { exec: "CRO",   priority: "Tier-2 concentration outreach + renewal cadence",        status: "pending", due: "2026-06-10" },
    { exec: "Product", priority: "EDI support-burden sprint + API revenue durability",   status: "in_prog", due: "2026-06-12" },
    { exec: "MP Lead", priority: "Southeast density + preferred-carrier recruitment",    status: "in_prog", due: "2026-06-08" },
    { exec: "CSM Lead", priority: "Strategic account expansion playbook adoption",       status: "in_prog", due: "2026-06-08" },
    { exec: "Partner Lead", priority: "Partner enablement + joint customer performance", status: "in_prog", due: "2026-06-12" },
    { exec: "Sec",   priority: "Trust evidence pack v3",                                 status: "in_prog", due: "2026-06-08" },
    { exec: "Board CoS", priority: "Board enterprise intelligence brief",                status: "pending", due: "2026-06-12" },
  ],
  blockers: [
    { blocker: "Capital evidence refresh — 2 owners overdue", level: "medium" },
    { blocker: "EDI support-burden cross-team alignment",     level: "medium" },
    { blocker: "Board action — 2 items overdue",              level: "medium" },
  ],
  cadence: [
    { cadence: "Weekly exec",     frequency: "Weekly",    completion: 96 },
    { cadence: "Monthly ops review", frequency: "Monthly", completion: 92 },
    { cadence: "Quarterly board", frequency: "Quarterly", completion: 90 },
    { cadence: "Annual strategy", frequency: "Annual",   completion: 100 },
  ],
};

export const V15_BOARD = {
  score: 86,
  kpis: [
    { area: "Enterprise performance", pct: 94 },
    { area: "Capital execution",      pct: 88 },
    { area: "Durable revenue",        pct: 89 },
    { area: "Marketplace scale",      pct: 84 },
    { area: "Strategic accounts",     pct: 86 },
    { area: "Partner ecosystem",      pct: 81 },
    { area: "Product-line",           pct: 86 },
    { area: "Category leadership",    pct: 90 },
    { area: "Capital evidence",       pct: 85 },
    { area: "Commercial diligence",   pct: 82 },
    { area: "Strategic risk",         pct: 80 },
    { area: "Executive action",       pct: 87 },
  ],
  decisions: [
    { decision: "Approve Southeast scale plan",          owner: "Board", status: "pending"  },
    { decision: "Approve capital evidence refresh batch", owner: "Board", status: "pending"  },
    { decision: "Approve EDI investment sprint",          owner: "Board", status: "in_prog"  },
    { decision: "Approve Tier-2 concentration plan",      owner: "Board", status: "pending"  },
  ],
  actions_completion: 82,
  next_quarter_priorities: [
    "Enterprise performance maturity",
    "Capital execution intelligence",
    "Marketplace scale governance",
    "Category leadership operating system",
    "Long-term strategic performance management",
  ],
};

export const V15_ACCOUNTS = {
  score: 86,
  accounts: [
    { account: "Acme Global Logistics", owner: "CSM-1", sponsor: "CEO",  product: "high", expansion: "API+MP", renewal_risk: "low",    trust: 92, mp_adopt: "high", api_adopt: "med", copilot: "high", portal: "high",  driver: "high", evidence: "ok", risk: "low",    next: "Expand API", expand: "approved" },
    { account: "Northland Foods",       owner: "CSM-2", sponsor: "COO",  product: "med",  expansion: "EDI",    renewal_risk: "medium", trust: 84, mp_adopt: "med",  api_adopt: "low", copilot: "med",  portal: "med",   driver: "med",  evidence: "ok", risk: "medium", next: "EDI plan", expand: "pending" },
    { account: "Coastal Carriers",      owner: "CSM-3", sponsor: "CRO",  product: "high", expansion: "MP+CoPilot", renewal_risk: "low", trust: 90, mp_adopt: "high", api_adopt: "med", copilot: "high", portal: "high",  driver: "high", evidence: "ok", risk: "low",    next: "Renewal", expand: "approved" },
    { account: "Heartland Freight",     owner: "CSM-4", sponsor: "CRO",  product: "med",  expansion: "MP",     renewal_risk: "medium", trust: 81, mp_adopt: "med",  api_adopt: "low", copilot: "med",  portal: "med",   driver: "high", evidence: "ok", risk: "medium", next: "MP onboard", expand: "pending" },
    { account: "Pacific Routes",        owner: "CSM-5", sponsor: "Product", product: "high", expansion: "API", renewal_risk: "low",    trust: 89, mp_adopt: "med",  api_adopt: "high", copilot: "high", portal: "high", driver: "high", evidence: "ok", risk: "low",    next: "API expand", expand: "approved" },
  ],
};

export const V15_PARTNERS = {
  score: 81,
  partners: [
    { partner: "TMS Vendor A",    owner: "Partner Lead", category: "TMS",       sourced: "$1.2M", influenced: "$3.8M", health: "healthy",   campaign: "running", enablement: "mature",   support: "low",    evidence: "ok",   risk: "low",    expand: "joint case study", next: "Renew MSA" },
    { partner: "ELD Vendor B",    owner: "Partner Lead", category: "ELD",       sourced: "$0.6M", influenced: "$2.1M", health: "healthy",   campaign: "planned", enablement: "growing",  support: "medium", evidence: "ok",   risk: "low",    expand: "integration",   next: "Cert refresh" },
    { partner: "Brokerage Net C", owner: "Partner Lead", category: "Brokerage", sourced: "$0.9M", influenced: "$2.4M", health: "watchlist", campaign: "paused",  enablement: "early",    support: "high",   evidence: "stale", risk: "medium", expand: "joint webinar", next: "Re-enable" },
    { partner: "Fuel Network D",  owner: "Partner Lead", category: "Fuel",      sourced: "$0.4M", influenced: "$1.1M", health: "healthy",   campaign: "running", enablement: "mature",   support: "low",    evidence: "ok",   risk: "low",    expand: "MP integration", next: "Phase 2" },
    { partner: "Insurance E",     owner: "Partner Lead", category: "Insurance", sourced: "$0.3M", influenced: "$0.8M", health: "watchlist", campaign: "designing", enablement: "early", support: "medium", evidence: "stale", risk: "medium", expand: "(deferred)", next: "Scope" },
  ],
};

export const V15_PRODUCT_LINES = {
  score: 86,
  lines: [
    { line: "Dispatch Command Center", adopt: 94, rev_contrib: "high",   ret: "+2", exp: "+1", support: "low",    rel: "high",   debt: "low",    compet: "lead",  category: "lead",   capital: "high",   invest: "scale",   risk: "low" },
    { line: "EliteNav",                adopt: 88, rev_contrib: "med",    ret: "+1", exp: "+1", support: "low",    rel: "high",   debt: "low",    compet: "lead",  category: "lead",   capital: "med",    invest: "scale",   risk: "low" },
    { line: "Driver Mobile",           adopt: 90, rev_contrib: "med",    ret: "+1", exp: "+1", support: "low",    rel: "high",   debt: "low",    compet: "lead",  category: "lead",   capital: "med",    invest: "scale",   risk: "low" },
    { line: "Customer Portal",         adopt: 84, rev_contrib: "med",    ret: "+2", exp: "+2", support: "low",    rel: "high",   debt: "med",    compet: "parity", category: "growing", capital: "med",    invest: "grow",    risk: "low" },
    { line: "CoPilot AI",              adopt: 79, rev_contrib: "med",    ret: "+2", exp: "+3", support: "med",    rel: "high",   debt: "med",    compet: "lead",  category: "lead",   capital: "high",   invest: "scale",   risk: "low" },
    { line: "Carrier Marketplace",     adopt: 83, rev_contrib: "med-high", ret: "+1", exp: "+3", support: "med",  rel: "high",   debt: "med",    compet: "lead",  category: "lead",   capital: "high",   invest: "scale",   risk: "low" },
    { line: "API Platform",            adopt: 60, rev_contrib: "early",  ret: "+1", exp: "+2", support: "low",    rel: "high",   debt: "med",    compet: "growing", category: "growing", capital: "high", invest: "invest", risk: "low" },
    { line: "EDI Platform",            adopt: 70, rev_contrib: "med",    ret: "0",  exp: "+1", support: "high",   rel: "med",    debt: "high",   compet: "parity", category: "growing", capital: "med",   invest: "reduce-burden", risk: "medium" },
    { line: "Telematics",              adopt: 72, rev_contrib: "med",    ret: "+1", exp: "+1", support: "med",    rel: "med",    debt: "med",    compet: "parity", category: "growing", capital: "med",   invest: "grow",    risk: "low" },
    { line: "Partner Marketplace",     adopt: 65, rev_contrib: "early",  ret: "+1", exp: "+2", support: "low",    rel: "med",    debt: "low",    compet: "growing", category: "growing", capital: "med",  invest: "invest",  risk: "low" },
    { line: "Reports/Analytics",       adopt: 80, rev_contrib: "med",    ret: "+1", exp: "+1", support: "low",    rel: "high",   debt: "low",    compet: "parity", category: "growing", capital: "med",   invest: "grow",    risk: "low" },
    { line: "Enterprise Governance",   adopt: 70, rev_contrib: "med",    ret: "+2", exp: "+2", support: "low",    rel: "high",   debt: "low",    compet: "lead",   category: "growing", capital: "high",  invest: "grow",    risk: "low" },
  ],
};

export const V15_EVIDENCE = {
  score: 85,
  items: [
    { cat: "Revenue durability",      owner: "RevOps",   fresh: "ok",      approved: true,  external: true,  board: true,  data_room: true,  gap: false, remediation: "—" },
    { cat: "Marketplace scale",       owner: "MP Lead",  fresh: "stale",   approved: true,  external: true,  board: true,  data_room: true,  gap: true,  remediation: "Refresh by 2026-06-02" },
    { cat: "Customer concentration",  owner: "CRO",      fresh: "overdue", approved: false, external: false, board: true,  data_room: true,  gap: true,  remediation: "Refresh by 2026-05-30" },
    { cat: "Strategic account",       owner: "CSM Lead", fresh: "ok",      approved: true,  external: false, board: true,  data_room: true,  gap: false, remediation: "—" },
    { cat: "Partner value",           owner: "Partner Lead", fresh: "ok",  approved: true,  external: true,  board: true,  data_room: true,  gap: false, remediation: "—" },
    { cat: "Product durability",      owner: "Product",  fresh: "stale",   approved: false, external: false, board: true,  data_room: true,  gap: true,  remediation: "Refresh by 2026-06-12" },
    { cat: "Enterprise trust",        owner: "Sec",      fresh: "ok",      approved: true,  external: true,  board: true,  data_room: true,  gap: false, remediation: "—" },
    { cat: "Category leadership",     owner: "PMM",      fresh: "ok",      approved: true,  external: true,  board: true,  data_room: true,  gap: false, remediation: "—" },
    { cat: "Board governance",        owner: "Board CoS", fresh: "ok",     approved: true,  external: false, board: true,  data_room: true,  gap: false, remediation: "—" },
    { cat: "Strategic risk",          owner: "CoS",      fresh: "stale",   approved: false, external: false, board: true,  data_room: true,  gap: true,  remediation: "Refresh by 2026-06-08" },
    { cat: "Technical architecture",  owner: "Eng Lead", fresh: "ok",      approved: true,  external: false, board: true,  data_room: true,  gap: false, remediation: "—" },
    { cat: "Operating model",         owner: "COO",      fresh: "ok",      approved: true,  external: false, board: true,  data_room: true,  gap: false, remediation: "—" },
    { cat: "Commercial diligence",    owner: "RevOps",   fresh: "ok",      approved: true,  external: false, board: true,  data_room: true,  gap: false, remediation: "—" },
  ],
};

export const V15_DILIGENCE = {
  score: 82,
  domains: [
    { domain: "Pipeline evidence",        owner: "RevOps",   fresh: "ok",     status: "approved" },
    { domain: "Deal execution evidence",  owner: "RevOps",   fresh: "ok",     status: "approved" },
    { domain: "Revenue durability",       owner: "RevOps",   fresh: "ok",     status: "approved" },
    { domain: "Customer concentration",   owner: "CRO",      fresh: "stale",  status: "in_review" },
    { domain: "Marketplace scale",        owner: "MP Lead",  fresh: "stale",  status: "in_review" },
    { domain: "API/EDI revenue",          owner: "Product",  fresh: "stale",  status: "in_review" },
    { domain: "Partner value",            owner: "Partner Lead", fresh: "ok", status: "approved" },
    { domain: "Pricing/package",          owner: "RevOps",   fresh: "ok",     status: "approved" },
    { domain: "Procurement",              owner: "RevOps",   fresh: "ok",     status: "approved" },
    { domain: "Trust-led sales",          owner: "Sec",      fresh: "ok",     status: "approved" },
    { domain: "Commercial risk",          owner: "CRO",      fresh: "ok",     status: "approved" },
    { domain: "Board reporting",          owner: "Board CoS", fresh: "ok",    status: "approved" },
    { domain: "Category proof",           owner: "PMM",      fresh: "ok",     status: "approved" },
  ],
  exceptions: [
    { exception: "Concentration evidence stale", owner: "CRO",     status: "in_prog" },
    { exception: "MP scale evidence stale",      owner: "MP Lead", status: "in_prog" },
    { exception: "API/EDI revenue evidence stale", owner: "Product", status: "in_prog" },
  ],
  actions: [
    "Concentration evidence refresh (CRO, 2026-05-30)",
    "MP scale evidence refresh (MP Lead, 2026-06-02)",
    "API/EDI revenue evidence refresh (Product, 2026-06-09)",
  ],
};

export const V15_RISKS = {
  score: 80,
  risks: [
    { risk: "Capital execution",       trend: "stable",  owner: "CFO",       mitigation: "CoS",  sponsor: "CEO", level: "medium", evidence: "ok",     due: "2026-06-15", escalation: "low",    board: true, action: "Continue evidence refresh" },
    { risk: "Revenue durability",      trend: "stable",  owner: "RevOps",    mitigation: "RevOps", sponsor: "CRO", level: "low",  evidence: "ok",     due: "2026-06-30", escalation: "low",    board: true, action: "Watch" },
    { risk: "Customer concentration",  trend: "watchlist", owner: "CRO",     mitigation: "CSM",  sponsor: "CEO", level: "medium", evidence: "stale",  due: "2026-06-15", escalation: "med",    board: true, action: "Tier-2 outreach" },
    { risk: "Marketplace scale",       trend: "watchlist", owner: "MP Lead", mitigation: "MP Lead", sponsor: "COO", level: "medium", evidence: "stale", due: "2026-06-08", escalation: "med",   board: true, action: "Density plan" },
    { risk: "API/EDI revenue",         trend: "stable",  owner: "Product",   mitigation: "Product", sponsor: "CRO", level: "medium", evidence: "stale", due: "2026-06-09", escalation: "low",   board: true, action: "Evidence refresh" },
    { risk: "Partner dependency",      trend: "stable",  owner: "Partner Lead", mitigation: "Partner Lead", sponsor: "CRO", level: "low", evidence: "ok", due: "2026-07-01", escalation: "low", board: false, action: "Watch" },
    { risk: "Strategic account",       trend: "stable",  owner: "CSM Lead",  mitigation: "CSM",  sponsor: "CRO", level: "low",  evidence: "ok",     due: "2026-07-01", escalation: "low",    board: false, action: "Watch" },
    { risk: "Product durability",      trend: "watchlist", owner: "Product", mitigation: "Eng",  sponsor: "Product", level: "medium", evidence: "stale", due: "2026-06-12", escalation: "med", board: true, action: "EDI burden sprint" },
    { risk: "Commercial diligence",    trend: "stable",  owner: "RevOps",    mitigation: "RevOps", sponsor: "CFO", level: "low", evidence: "ok",     due: "2026-06-30", escalation: "low",    board: true, action: "Continue" },
    { risk: "Capital evidence",        trend: "watchlist", owner: "CoS",     mitigation: "CoS",  sponsor: "CFO", level: "medium", evidence: "stale", due: "2026-06-08",  escalation: "med",    board: true, action: "Refresh batch" },
    { risk: "Board execution",         trend: "stable",  owner: "Board CoS", mitigation: "Board CoS", sponsor: "CEO", level: "low", evidence: "ok",  due: "2026-06-30", escalation: "low",    board: true, action: "Watch" },
    { risk: "Category leadership",     trend: "stable",  owner: "PMM",       mitigation: "PMM",  sponsor: "CEO", level: "low",  evidence: "ok",     due: "2026-06-30", escalation: "low",    board: false, action: "Watch" },
    { risk: "Competitive",             trend: "watchlist", owner: "PMM",     mitigation: "(pending)", sponsor: "CEO", level: "medium", evidence: "stale", due: "2026-06-20", escalation: "med", board: true, action: "Assign mitigation owner" },
    { risk: "Global expansion",        trend: "stable",  owner: "COO",       mitigation: "COO",  sponsor: "CEO", level: "low",  evidence: "ok",     due: "2026-07-15", escalation: "low",    board: false, action: "Watch" },
    { risk: "Operational scalability", trend: "stable",  owner: "COO",       mitigation: "COO",  sponsor: "CEO", level: "low",  evidence: "ok",     due: "2026-07-15", escalation: "low",    board: false, action: "Watch" },
  ],
};

export const V15_CONTROLS = {
  score: 84,
  controls: [
    { domain: "Enterprise performance",  control: "Performance score recalc + review",       owner: "COO",       freq: "Weekly",    coverage: 96, last_tested: "Q0",  status: "implemented" },
    { domain: "Capital execution",       control: "Capital evidence freshness + approval",   owner: "CFO",       freq: "Monthly",   coverage: 92, last_tested: "Q-1", status: "implemented" },
    { domain: "Revenue durability",      control: "Durability + concentration review",       owner: "RevOps",    freq: "Monthly",   coverage: 94, last_tested: "Q0",  status: "implemented" },
    { domain: "Marketplace scale",       control: "Scale exception review + density",        owner: "MP Lead",   freq: "Weekly",    coverage: 90, last_tested: "Q0",  status: "implemented" },
    { domain: "Category operating",      control: "Narrative + proof freshness",             owner: "PMM",       freq: "Monthly",   coverage: 88, last_tested: "Q-1", status: "implemented" },
    { domain: "Strategic account",       control: "Account adoption + risk review",          owner: "CSM Lead",  freq: "Weekly",    coverage: 92, last_tested: "Q0",  status: "implemented" },
    { domain: "Partner performance",     control: "Partner health + enablement review",      owner: "Partner Lead", freq: "Monthly", coverage: 86, last_tested: "Q-1", status: "implemented" },
    { domain: "Product-line",            control: "Adoption / support / debt review",        owner: "Product",   freq: "Monthly",   coverage: 90, last_tested: "Q0",  status: "implemented" },
    { domain: "Capital evidence",        control: "Evidence governance review",              owner: "CoS",       freq: "Monthly",   coverage: 88, last_tested: "Q0",  status: "implemented" },
    { domain: "Commercial diligence",    control: "Diligence governance review",             owner: "RevOps",    freq: "Monthly",   coverage: 90, last_tested: "Q-1", status: "implemented" },
    { domain: "Strategic risk",          control: "Risk register + escalation review",       owner: "CoS",       freq: "Weekly",    coverage: 88, last_tested: "Q0",  status: "implemented" },
    { domain: "Executive cadence",       control: "Weekly/monthly/quarterly cadence",        owner: "COO",       freq: "Weekly",    coverage: 96, last_tested: "Q0",  status: "implemented" },
    { domain: "Board execution",         control: "Board agenda + decision queue",           owner: "Board CoS", freq: "Quarterly", coverage: 90, last_tested: "Q0",  status: "implemented" },
  ],
  exceptions: [
    { exception: "Marketplace scale exception — Southeast density", owner: "MP Lead", status: "in_prog" },
    { exception: "Capital evidence — concentration overdue",        owner: "CRO",     status: "in_prog" },
    { exception: "Product-line — EDI support burden",               owner: "Product", status: "in_prog" },
  ],
};

export const V15_ROADMAP = {
  horizons: [
    { horizon: "Current quarter", focus: "Enterprise performance command", outcomes: "Score 94%; cadence health 90%" },
    { horizon: "Next quarter",    focus: "Operating intelligence + recommendations", outcomes: "Recommendation engine live with human approval" },
    { horizon: "6 months",        focus: "Capital execution intelligence",     outcomes: "Evidence governance 90%+" },
    { horizon: "12 months",       focus: "Marketplace scale governance",       outcomes: "MP scale 88%+" },
    { horizon: "24 months",       focus: "Category leadership operating system", outcomes: "Cat leadership 93%+" },
    { horizon: "36 months",       focus: "Long-term strategic performance",    outcomes: "LT performance 90%+" },
  ],
  tracks: [
    "Enterprise performance command", "Durable capital execution", "Revenue durability",
    "Marketplace scale governance", "Strategic operating intelligence", "Category leadership operations",
    "Strategic account performance", "Partner ecosystem performance", "Product-line performance",
    "Capital evidence governance", "Commercial diligence governance", "Strategic risk intelligence",
    "Board enterprise intelligence",
  ],
  initiatives: [
    { init: "Performance score automation",   track: "Enterprise performance", owner: "COO",     status: "in_prog" },
    { init: "Recommendation engine (assist)", track: "Strategic operating intel", owner: "CoS",  status: "in_prog" },
    { init: "Capital evidence refresh batch", track: "Capital execution",      owner: "CFO",     status: "pending" },
    { init: "MP scale density (SE)",          track: "Marketplace scale",      owner: "MP Lead", status: "in_prog" },
    { init: "EDI support-burden sprint",      track: "Product-line",           owner: "Product", status: "in_prog" },
    { init: "Tier-2 concentration outreach",  track: "Strategic accounts",     owner: "CRO",     status: "pending" },
  ],
  dependencies: [
    { from: "Capital evidence refresh", to: "Board enterprise reporting" },
    { from: "MP scale density",         to: "Marketplace economics" },
    { from: "EDI burden sprint",        to: "Product-line durability" },
  ],
  decisions: [
    { decision: "Approve Southeast scale plan",     status: "pending" },
    { decision: "Approve EDI investment sprint",    status: "in_prog" },
    { decision: "Approve concentration plan",       status: "pending" },
  ],
};

export const V15_REPORTS = {
  reports: [
    "Enterprise Performance Command Report",
    "Durable Capital Execution Report",
    "Durable Revenue Performance Report",
    "Marketplace Scale Governance Report",
    "Marketplace Scale Intelligence Report",
    "Strategic Operating Intelligence Report",
    "Category Leadership Operating Report",
    "Executive Performance Control Report",
    "Board Enterprise Intelligence Report",
    "Strategic Account Performance Report",
    "Partner Ecosystem Performance Report",
    "Product-Line Performance Governance Report",
    "Capital Evidence Governance Report",
    "Commercial Diligence Governance Report",
    "Strategic Risk Intelligence Report",
    "Enterprise Performance Controls Report",
    "Long-Term Strategic Performance Roadmap Report",
    "Board Enterprise Performance Report",
  ],
};

export const V15_EDGE_VS_SERVERFN = [
  { boundary: "ServerFn", name: "calculate_v15_enterprise_performance_score",  caller: "App",       auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate_durable_capital_execution_score",   caller: "App",       auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate_durable_revenue_performance",       caller: "App",       auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate_marketplace_scale_governance_score", caller: "App",      auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate_marketplace_scale_intelligence",    caller: "App",       auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "ServerFn", name: "generate_operating_intelligence_recommendations", caller: "App",   auth: "requireSupabaseAuth", returns: "DTO[]" },
  { boundary: "ServerFn", name: "approve_operating_intelligence_recommendation", caller: "App",     auth: "requireSupabaseAuth + approver role", returns: "DTO" },
  { boundary: "ServerFn", name: "create_recommendation_audit_log",             caller: "App",       auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate_category_leadership_operating_score", caller: "App",     auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate_executive_performance_control_score", caller: "App",     auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "ServerFn", name: "calculate_board_enterprise_intelligence_score", caller: "App",     auth: "requireSupabaseAuth + board role", returns: "DTO" },
  { boundary: "ServerFn", name: "generate_board_enterprise_performance_report", caller: "App",      auth: "requireSupabaseAuth + board role", returns: "DTO" },
  { boundary: "ServerFn", name: "generate_long_term_strategic_performance_roadmap", caller: "App",  auth: "requireSupabaseAuth", returns: "DTO" },
  { boundary: "Webhook",  name: "(none new in Phase 43)",                       caller: "External",  auth: "HMAC + no PII",       returns: "200/401" },
];

export const V15_RLS_EXAMPLES = [
  "Company admins: SELECT on v15_enterprise_performance_scores WHERE company_id = current_company().",
  "Platform owners: SELECT on platform-scoped enterprise performance + strategic intelligence rollups.",
  "Executive role: SELECT on capital execution + board intelligence + strategic risk records.",
  "Board role: SELECT on board_enterprise_performance_reports WHERE status = 'approved'.",
  "RevOps: SELECT/INSERT on durable_revenue_performance_records, commercial_diligence_governance_records (own company).",
  "Billing: SELECT on durable_revenue + marketplace_scale + partner_ecosystem performance rollups.",
  "CSM: SELECT on strategic_account_performance_records WHERE owner_id = auth.uid().",
  "Partner managers: SELECT on partner_ecosystem_performance_records they own.",
  "Product leaders: SELECT on product_line_performance_governance_records.",
  "Commercial diligence + capital evidence: executive/admin only.",
  "operating_intelligence_recommendations: row is actionable only when human-approver UPDATE sets status='approved'; audit row written on each transition.",
  "Customer users: NO access to performance command, capital, board, diligence, scale internals.",
  "Carrier users: NO access to marketplace scale internals.",
  "Partner users: SELECT only on partner-facing performance rows WHERE external_visible=true.",
];

export const V15_RLS_SQL = [
  { table: "v15_enterprise_performance_scores", sql: `create policy "co_admin_select_v15_perf" on public.v15_enterprise_performance_scores for select to authenticated using (company_id = public.current_company() and public.has_role(auth.uid(), public.current_company(), 'admin'));` },
  { table: "operating_intelligence_recommendations", sql: `create policy "approver_only_update_recs" on public.operating_intelligence_recommendations for update to authenticated using (public.has_role(auth.uid(), company_id, 'executive')) with check (status in ('approved','rejected'));` },
  { table: "board_enterprise_performance_reports", sql: `create policy "board_select_approved_reports" on public.board_enterprise_performance_reports for select to authenticated using (status = 'approved' and public.has_role(auth.uid(), company_id, 'board'));` },
  { table: "strategic_account_performance_records", sql: `create policy "csm_select_own_accounts" on public.strategic_account_performance_records for select to authenticated using (owner_id = auth.uid() or public.has_role(auth.uid(), company_id, 'admin'));` },
  { table: "partner_ecosystem_performance_records", sql: `create policy "partner_user_external_only" on public.partner_ecosystem_performance_records for select to authenticated using (external_visible = true and exists (select 1 from public.partner_users pu where pu.user_id = auth.uid() and pu.partner_id = partner_ecosystem_performance_records.partner_id));` },
];

export const V15_DEMO = [
  { step: 1,  actor: "CEO",        surface: "/v15/overview",        action: "Open Enterprise Performance Command Center", expect: "Enterprise 94 / Cap 88 / Rev 89 / MP 84 / Cat 90", outcome: "Top 5 actions visible" },
  { step: 2,  actor: "CFO",        surface: "/v15/revenue",         action: "Review Durable Revenue Performance",         expect: "Renewals strong; expansion improving; MP/API stale evidence", outcome: "2 evidence items flagged for refresh" },
  { step: 3,  actor: "MP Lead",    surface: "/v15/mp-intel",        action: "Review Marketplace Scale Intelligence",      expect: "TX/Midwest scale, SE density gap, equipment gaps", outcome: "Recommendation queue → human approval pending" },
  { step: 4,  actor: "Strategy",   surface: "/v15/intel",           action: "Open Strategic Operating Intelligence Center", expect: "Cross-functional signals + approval queue",        outcome: "Approval queue routed to owners" },
  { step: 5,  actor: "Strategy",   surface: "/v15/recommendations", action: "Review Recommendation Engine",                expect: "4 active recs, source signals, audit IDs",         outcome: "Approver assignments visible" },
  { step: 6,  actor: "Board CoS",  surface: "/v15/board-intel",     action: "Open Board-Level Enterprise Intelligence",    expect: "Enterprise KPIs + decisions + next priorities",    outcome: "Decision queue ready" },
  { step: 7,  actor: "Product",    surface: "/v15/product-lines",   action: "Open Product-Line Performance Governance",    expect: "CoPilot + MP high; EDI high support burden",       outcome: "EDI sprint queued" },
  { step: 8,  actor: "CEO",        surface: "/v15/exec",            action: "Open Executive Performance Control Tower",    expect: "Top exec priorities + blockers + cadence",         outcome: "Owners aligned" },
  { step: 9,  actor: "CoS",        surface: "/v15/cap-evidence",    action: "Review Capital Evidence Governance",          expect: "Evidence freshness + 3 gaps + owners",             outcome: "Refresh batch approved" },
  { step: 10, actor: "Board",      surface: "/v15/board-reports",   action: "Open Board Enterprise Performance Reporting", expect: "Approved reports + KPI appendix + decision queue", outcome: "Quarterly brief ready" },
];

export const V15_DEMO_OUTCOMES = [
  "Enterprise performance visible end-to-end with named owners.",
  "Recommendations require human approval before action (no autonomous dispatch).",
  "Capital + revenue + MP evidence gaps tracked with refresh dates.",
  "Board enterprise intelligence ready with decision queue.",
];

export const V15_PHASE44_TEASER = [
  "V15.5 — Enterprise Intelligence Maturity",
  "Capital execution intelligence + durable revenue optimization",
  "Marketplace scale intelligence (lane-level + carrier-level)",
  "Autonomous-assist governance (human-approval gated)",
  "Long-term strategic performance optimization",
];

export const V15_EXEC_HEADLINE = {
  headline: "Enterprise performance 94% — capital + revenue + category strong; SE density, EDI burden, and 2 evidence gaps are this week's focus.",
  highlights: [
    "Enterprise 94% (+2 QoQ); operating excellence 93%",
    "Durable revenue 89%; renewals + expansion improving",
    "MP scale 84%; Southeast density still the gap",
    "Recommendation engine has 4 items awaiting human approval",
  ],
};
