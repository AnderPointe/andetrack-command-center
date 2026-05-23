// Phase 42 V14.5 mock-only datasets. No backend calls.
export const V145_SCOPE = {
  included: [
    "Enterprise Operating Excellence Command Center",
    "Strategic Capital Discipline Center",
    "Durable Revenue Systems Center",
    "Revenue Durability Execution Center",
    "Marketplace Economics Scale Center",
    "Marketplace Scale Control Framework",
    "Category Leadership Execution Maturity Center",
    "Category Proof Execution Center",
    "Executive Performance Management Dashboard",
    "Board Execution Discipline Center",
    "Strategic Account Growth Discipline",
    "Partner Value Execution Center",
    "Product-Line Operating Excellence",
    "Capital Evidence Discipline Center",
    "Commercial Diligence Discipline Center",
    "Strategic Risk Execution Discipline",
    "Enterprise Operating Controls Matrix",
    "Enterprise Operating Review Cadence",
    "Long-Term Performance Management System",
    "V14.5 Advanced Reporting",
  ],
  deferred: [
    "Fully autonomous dispatch",
    "Final IPO / acquisition claims",
    "Final audited financial claims",
    "Final certification claims without evidence",
    "Full customs production workflows",
    "Full international tax automation",
    "Insurance underwriting automation",
    "Autonomous vehicle workflows",
    "Final Android Auto / CarPlay claims",
  ],
};

export const V145_FEATURES = [
  { area: "Operating Excellence", v14: "Strategic OS", v145: "Operating Excellence Command Center", status: "added" },
  { area: "Capital", v14: "Capital execution maturity", v145: "Strategic Capital Discipline", status: "added" },
  { area: "Revenue", v14: "Long-term durability", v145: "Durable Revenue Systems + Execution", status: "added" },
  { area: "Marketplace", v14: "Economics governance", v145: "Economics Scale + Scale Controls", status: "added" },
  { area: "Category", v14: "Category stewardship", v145: "Execution Maturity + Proof Execution", status: "added" },
  { area: "Board", v14: "Strategic execution", v145: "Board Execution Discipline", status: "added" },
  { area: "Accounts", v14: "Strategic account governance", v145: "Strategic Account Growth Discipline", status: "added" },
  { area: "Partners", v14: "Partner ecosystem value", v145: "Partner Value Execution", status: "added" },
  { area: "Product", v14: "Product-line stewardship", v145: "Product-Line Operating Excellence", status: "added" },
  { area: "Evidence", v14: "Capital evidence controls", v145: "Capital Evidence Discipline", status: "added" },
  { area: "Diligence", v14: "Commercial diligence controls", v145: "Commercial Diligence Discipline", status: "added" },
  { area: "Risk", v14: "Strategic risk control", v145: "Strategic Risk Execution Discipline", status: "added" },
  { area: "Controls", v14: "(distributed)", v145: "Enterprise Operating Controls Matrix", status: "new" },
  { area: "Cadence", v14: "Strategic cadence", v145: "Enterprise Operating Review Cadence", status: "evolved" },
  { area: "Performance", v14: "Value reporting", v145: "Long-Term Performance Management", status: "new" },
];

export const V145_OPEX = {
  score: 93,
  trend_qoq: +3,
  kpis: [
    { dim: "Operating excellence",   pct: 93 },
    { dim: "Capital discipline",     pct: 86 },
    { dim: "Revenue durability",     pct: 88 },
    { dim: "Marketplace scale",      pct: 81 },
    { dim: "Category execution",     pct: 87 },
    { dim: "Strategic accounts",     pct: 84 },
    { dim: "Partner value",          pct: 79 },
    { dim: "Product-line",           pct: 85 },
    { dim: "Board execution",        pct: 82 },
    { dim: "Capital evidence",       pct: 83 },
    { dim: "Commercial diligence",   pct: 80 },
    { dim: "Strategic risk",         pct: 78 },
    { dim: "Exec cadence",           pct: 90 },
    { dim: "LT performance",         pct: 84 },
  ],
  gaps: [
    "Southeast marketplace density below scale threshold",
    "Two revenue evidence items overdue refresh",
    "API partner enablement gap (1 partner)",
    "Marketplace proof asset library short by 4 approved assets",
  ],
  actions: [
    { owner: "CFO",    action: "Refresh revenue evidence", due: "T+10d" },
    { owner: "MP Lead",action: "Southeast carrier expansion sprint", due: "T+14d" },
    { owner: "Partner Lead", action: "Re-enable API partner #2", due: "T+7d" },
    { owner: "PMM",    action: "Publish 4 marketplace proof assets", due: "T+12d" },
    { owner: "Board",  action: "Close two overdue board action items", due: "T+5d" },
  ],
};

export const V145_TRENDS = [
  { q: "Q-3", opex: 86, cap: 79, dur: 82, mp: 73, cat: 80 },
  { q: "Q-2", opex: 89, cap: 82, dur: 84, mp: 76, cat: 83 },
  { q: "Q-1", opex: 90, cap: 84, dur: 86, mp: 78, cat: 85 },
  { q: "Q0",  opex: 93, cap: 86, dur: 88, mp: 81, cat: 87 },
];

export const V145_CAPITAL = {
  score: 86,
  actions: [
    { area: "Revenue durability evidence", owner: "CFO",      status: "on-track", due: "T+10d" },
    { area: "Marketplace economics evidence", owner: "MP",    status: "at-risk",  due: "T+14d" },
    { area: "Customer concentration plan",  owner: "CRO",     status: "on-track", due: "T+21d" },
    { area: "Strategic risk reduction",     owner: "COO",     status: "on-track", due: "T+30d" },
    { area: "Product durability proof",     owner: "CPO",     status: "on-track", due: "T+18d" },
    { area: "Board governance pack",        owner: "ChiefStaff","status": "on-track" as any, due: "T+7d" },
  ],
  evidence_fresh_pct: 84,
  data_room_ready_pct: 78,
  blockers: [
    { item: "Southeast MP density",       severity: "med",  owner: "MP Lead" },
    { item: "API partner enablement",     severity: "low",  owner: "Partner Lead" },
    { item: "Overdue board actions (2)",  severity: "med",  owner: "Chief of Staff" },
  ],
};

export const V145_REVENUE_SYSTEMS = {
  score: 88,
  systems: [
    { system: "Renewal",         durability: 92, trend: "+2" },
    { system: "Expansion",       durability: 84, trend: "+3" },
    { system: "Marketplace rev", durability: 79, trend: "+4" },
    { system: "API rev",         durability: 68, trend: "+2" },
    { system: "EDI rev (mock)",  durability: 64, trend: "+1" },
    { system: "Partner rev",     durability: 73, trend: "+3" },
    { system: "Payment health",  durability: 91, trend: "+0" },
    { system: "Billing disputes",durability: 88, trend: "+1" },
  ],
  concentration: [
    { dim: "Top customer",     pct: 12 },
    { dim: "Top-5 customers",  pct: 34 },
    { dim: "Top product line", pct: 41 },
    { dim: "Top region",       pct: 38 },
  ],
  evidence_fresh_pct: 81,
};

export const V145_REVENUE_EXEC = {
  actions: [
    { kind: "Renewal",     account: "Acme Foods",   owner: "CSM-A", due: "T+5d",  status: "on-track" },
    { kind: "Expansion",   account: "BorderLogix",  owner: "AE-3",  due: "T+9d",  status: "on-track" },
    { kind: "Concentration",account: "Top-5 plan",  owner: "CRO",   due: "T+21d", status: "on-track" },
    { kind: "Evidence",    account: "Durability deck", owner: "RevOps", due: "T+10d", status: "overdue" },
    { kind: "Evidence",    account: "Net-retention proof", owner: "RevOps", due: "T+10d", status: "overdue" },
    { kind: "MP revenue",  account: "Southeast lane plan", owner: "MP Lead", due: "T+14d", status: "at-risk" },
    { kind: "API revenue", account: "Partner #2 reactivation", owner: "Partner Lead", due: "T+7d", status: "on-track" },
    { kind: "Payment",     account: "Dispute backlog",        owner: "Billing", due: "T+6d", status: "on-track" },
  ],
  escalations: [
    { item: "Revenue evidence refresh",   level: "CFO" },
    { item: "Southeast MP density",       level: "CEO/MP" },
  ],
};

export const V145_MP_SCALE = {
  score: 81,
  regions: [
    { region: "Texas",      ready: 92, density: "high",   risk: "low" },
    { region: "Midwest",    ready: 88, density: "high",   risk: "low" },
    { region: "West",       ready: 80, density: "medium", risk: "med" },
    { region: "Northeast",  ready: 78, density: "medium", risk: "med" },
    { region: "Southeast",  ready: 62, density: "low",    risk: "high" },
  ],
  metrics: [
    { metric: "Fee capture",         pct: 87 },
    { metric: "Take rate (mock)",    pct: 7.2 },
    { metric: "Load coverage",       pct: 91 },
    { metric: "Bid density",         pct: 78 },
    { metric: "Time to first bid",   pct: 84 },
    { metric: "Time to award",       pct: 81 },
    { metric: "Carrier quality",     pct: 88 },
    { metric: "Carrier compliance",  pct: 90 },
    { metric: "Unit econ confidence",pct: 74 },
  ],
  action_plan: [
    "Preferred carrier expansion in Southeast",
    "Lane-density sprint: ATL→MIA, ATL→CLT",
    "Refresh take-rate evidence",
    "Carrier concentration mitigation: top-3 carriers <38%",
  ],
};

export const V145_MP_CONTROLS = [
  { domain: "Load coverage",      owner: "MP Ops",     last_tested: "Q-1", status: "pass" },
  { domain: "Carrier quality",    owner: "MP Ops",     last_tested: "Q-1", status: "pass" },
  { domain: "Carrier compliance", owner: "Compliance", last_tested: "Q-1", status: "pass" },
  { domain: "Regional liquidity", owner: "MP Lead",    last_tested: "Q-2", status: "watch" },
  { domain: "Lane liquidity",     owner: "MP Lead",    last_tested: "Q-2", status: "watch" },
  { domain: "Fee capture",        owner: "Finance",    last_tested: "Q-1", status: "pass" },
  { domain: "Dispute cost (mock)",owner: "Finance",    last_tested: "Q-2", status: "watch" },
  { domain: "Settlement (mock)",  owner: "Finance",    last_tested: "Q-2", status: "pass" },
  { domain: "Unit econ evidence", owner: "RevOps",     last_tested: "Q-1", status: "watch" },
  { domain: "MP revenue",         owner: "RevOps",     last_tested: "Q-1", status: "pass" },
  { domain: "Carrier concentration",owner: "MP Lead",  last_tested: "Q-1", status: "watch" },
  { domain: "Customer concentration",owner: "CRO",     last_tested: "Q-1", status: "pass" },
];

export const V145_CATEGORY = {
  score: 87,
  dimensions: [
    { dim: "Narrative execution",   pct: 92 },
    { dim: "Market education",      pct: 84 },
    { dim: "Competitive positioning",pct: 86 },
    { dim: "Differentiation",       pct: 91 },
    { dim: "Customer proof",        pct: 88 },
    { dim: "Marketplace proof",     pct: 72 },
    { dim: "AI ops proof",          pct: 80 },
    { dim: "Enterprise trust proof",pct: 85 },
    { dim: "Product proof",         pct: 83 },
    { dim: "Partner proof",         pct: 76 },
    { dim: "Sales narrative adoption",pct: 89 },
    { dim: "Website narrative",     pct: 88 },
    { dim: "Exec thought leadership (mock)", pct: 70 },
    { dim: "Board narrative",       pct: 87 },
  ],
  risks: ["Marketplace proof asset gap", "Exec thought leadership cadence light"],
};

export const V145_PROOFS = [
  { type: "Customer outcome",     owner: "PMM",   status: "approved", fresh_days: 12 },
  { type: "Marketplace proof",    owner: "MP",    status: "draft",    fresh_days: 40 },
  { type: "Driver adoption",      owner: "PMM",   status: "approved", fresh_days: 22 },
  { type: "Customer portal",      owner: "PMM",   status: "approved", fresh_days: 18 },
  { type: "CoPilot",              owner: "AI",    status: "approved", fresh_days: 9 },
  { type: "Support reliability",  owner: "CS",    status: "approved", fresh_days: 26 },
  { type: "Integration reliability",owner: "Eng", status: "approved", fresh_days: 33 },
  { type: "Enterprise trust",     owner: "Trust", status: "approved", fresh_days: 14 },
  { type: "Security/compliance",  owner: "Trust", status: "draft",    fresh_days: 52 },
  { type: "Partner ecosystem",    owner: "Partner",status:"approved", fresh_days: 19 },
  { type: "Product durability",   owner: "PM",    status: "approved", fresh_days: 24 },
  { type: "Competitive diff.",    owner: "PMM",   status: "review",   fresh_days: 7  },
];

export const V145_EXEC_PERF = {
  priorities: [
    { role: "CEO",  items: ["Operating excellence at 93%", "Resolve Southeast MP density", "Close 2 overdue board items"] },
    { role: "COO",  items: ["Operating cadence health 90%", "Controls testing on schedule"] },
    { role: "CFO",  items: ["Refresh revenue evidence", "Data room readiness 78%→85%"] },
    { role: "CRO",  items: ["Top-5 concentration plan", "Expansion execution on-track"] },
    { role: "CPO",  items: ["Product reliability +2", "Investment queue prioritized"] },
    { role: "MP",   items: ["Southeast carrier sprint", "Take-rate evidence refresh"] },
    { role: "CS",   items: ["Strategic acct value reviews"] },
    { role: "Partner", items: ["API partner #2 reactivation"] },
    { role: "Trust", items: ["Security proof asset refresh"] },
  ],
  blockers: [
    "Southeast MP carrier density",
    "Two overdue board actions",
    "Two revenue evidence items overdue",
  ],
  decisions_needed: [
    "Approve preferred-carrier expansion budget",
    "Approve revised durability deck for board",
  ],
  cadence_health: 90,
};

export const V145_BOARD = {
  score: 82,
  action_completion_pct: 82,
  decision_followups: [
    { decision: "Capital plan FY pacing",    owner: "CFO",  status: "on-track" },
    { decision: "Marketplace expansion plan",owner: "MP",   status: "at-risk" },
    { decision: "Category narrative refresh",owner: "PMM",  status: "on-track" },
  ],
  reviews: [
    { area: "Capital strategy",    status: "complete" },
    { area: "Revenue durability",  status: "complete" },
    { area: "Marketplace economics", status: "scheduled" },
    { area: "Category leadership", status: "complete" },
    { area: "Strategic accounts",  status: "scheduled" },
    { area: "Partner value",       status: "complete" },
    { area: "Product-line",        status: "scheduled" },
  ],
  overdue: [
    { action: "Revenue durability deck refresh", owner: "CFO", days_overdue: 4 },
    { action: "MP economics evidence pack",      owner: "MP",  days_overdue: 2 },
  ],
  evidence_fresh_pct: 84,
};

export const V145_ACCOUNTS = [
  { account: "Acme Foods",   sponsor: "CEO",  csm: "CSM-A", value: 92, renewal_risk: "low",  blockers: [], next: "Expansion review" },
  { account: "BorderLogix",  sponsor: "CRO",  csm: "CSM-B", value: 84, renewal_risk: "low",  blockers: [], next: "EDI expansion" },
  { account: "Northwind",    sponsor: "COO",  csm: "CSM-C", value: 78, renewal_risk: "med",  blockers: ["Portal adoption"], next: "Portal enablement" },
  { account: "PrimeHaul",    sponsor: "CRO",  csm: "CSM-A", value: 88, renewal_risk: "low",  blockers: [], next: "CoPilot expansion" },
  { account: "MidwestMover", sponsor: "CEO",  csm: "CSM-D", value: 81, renewal_risk: "low",  blockers: ["API throughput"], next: "API tier review" },
];

export const V145_PARTNERS = [
  { partner: "TelematicsCo", category: "Telematics", owner: "PM-1", execution: 91, pipeline: "$1.4M", risk: "low",  next: "Joint webinar" },
  { partner: "APIBridge",    category: "API",        owner: "PM-2", execution: 64, pipeline: "$0.6M", risk: "med",  next: "Enablement sprint" },
  { partner: "EDIWorks",     category: "EDI",        owner: "PM-3", execution: 77, pipeline: "$0.9M", risk: "low",  next: "Joint customer review" },
  { partner: "RouteForge",   category: "Mapping",    owner: "PM-1", execution: 83, pipeline: "$0.8M", risk: "low",  next: "Co-marketing" },
];

export const V145_PRODUCT_LINES = [
  { line: "Dispatch CC",       score: 92, adoption: 96, retention: "+3", reliability: 99.8, debt: "low",  invest: "stable" },
  { line: "EliteNav",          score: 88, adoption: 91, retention: "+2", reliability: 99.6, debt: "low",  invest: "expand" },
  { line: "Driver Mobile",     score: 86, adoption: 93, retention: "+2", reliability: 99.5, debt: "med",  invest: "expand" },
  { line: "Customer Portal",   score: 84, adoption: 78, retention: "+1", reliability: 99.7, debt: "low",  invest: "expand" },
  { line: "CoPilot AI",        score: 87, adoption: 71, retention: "+4", reliability: 99.4, debt: "med",  invest: "expand" },
  { line: "Carrier Marketplace",score:81, adoption: 74, retention: "+3", reliability: 99.3, debt: "med",  invest: "scale" },
  { line: "API Platform",      score: 79, adoption: 64, retention: "+2", reliability: 99.5, debt: "med",  invest: "harden" },
  { line: "EDI Platform",      score: 76, adoption: 58, retention: "+1", reliability: 99.4, debt: "med",  invest: "harden" },
  { line: "Telematics",        score: 85, adoption: 80, retention: "+2", reliability: 99.6, debt: "low",  invest: "stable" },
  { line: "Partner Marketplace",score:78, adoption: 62, retention: "+2", reliability: 99.4, debt: "med",  invest: "scale" },
  { line: "Reports/Analytics", score: 83, adoption: 81, retention: "+1", reliability: 99.6, debt: "low",  invest: "stable" },
  { line: "Enterprise Gov.",   score: 88, adoption: 70, retention: "+2", reliability: 99.7, debt: "low",  invest: "stable" },
];

export const V145_CAP_EVIDENCE = [
  { category: "Revenue durability",     owner: "CFO",   fresh_days: 10, approved: true,  external: true,  board: true,  data_room: true,  gap: false },
  { category: "Marketplace economics",  owner: "MP",    fresh_days: 38, approved: false, external: false, board: true,  data_room: true,  gap: true  },
  { category: "Customer concentration", owner: "CRO",   fresh_days: 14, approved: true,  external: false, board: true,  data_room: true,  gap: false },
  { category: "Strategic accounts",     owner: "CS",    fresh_days: 19, approved: true,  external: false, board: true,  data_room: true,  gap: false },
  { category: "Partner value",          owner: "Partner",fresh_days:22, approved: true,  external: false, board: true,  data_room: true,  gap: false },
  { category: "Product durability",     owner: "CPO",   fresh_days: 25, approved: true,  external: true,  board: true,  data_room: true,  gap: false },
  { category: "Enterprise trust",       owner: "Trust", fresh_days: 12, approved: true,  external: true,  board: true,  data_room: true,  gap: false },
  { category: "Category leadership",    owner: "PMM",   fresh_days: 11, approved: true,  external: true,  board: true,  data_room: true,  gap: false },
  { category: "Board governance",       owner: "ChiefStaff",fresh_days: 8,approved: true,external: false, board: true,  data_room: true,  gap: false },
  { category: "Strategic risk",         owner: "COO",   fresh_days: 30, approved: true,  external: false, board: true,  data_room: true,  gap: false },
  { category: "Technical architecture", owner: "CTO",   fresh_days: 21, approved: true,  external: false, board: true,  data_room: true,  gap: false },
  { category: "Operating model",        owner: "COO",   fresh_days: 17, approved: true,  external: false, board: true,  data_room: true,  gap: false },
  { category: "Commercial diligence",   owner: "RevOps",fresh_days: 33, approved: false, external: false, board: true,  data_room: true,  gap: true  },
];

export const V145_DILIGENCE = [
  { domain: "Pipeline evidence",          owner: "RevOps", fresh_days: 8,  status: "fresh" },
  { domain: "Deal execution",             owner: "RevOps", fresh_days: 9,  status: "fresh" },
  { domain: "Revenue durability",         owner: "CFO",    fresh_days: 10, status: "fresh" },
  { domain: "Customer concentration",     owner: "CRO",    fresh_days: 14, status: "fresh" },
  { domain: "Marketplace economics",      owner: "MP",     fresh_days: 38, status: "stale" },
  { domain: "API/EDI revenue",            owner: "RevOps", fresh_days: 28, status: "watch" },
  { domain: "Partner value",              owner: "Partner",fresh_days: 22, status: "fresh" },
  { domain: "Pricing/package",            owner: "PMM",    fresh_days: 12, status: "fresh" },
  { domain: "Procurement",                owner: "Procure",fresh_days: 30, status: "watch" },
  { domain: "Trust-led sales",            owner: "Trust",  fresh_days: 19, status: "fresh" },
  { domain: "Commercial risk",            owner: "RevOps", fresh_days: 26, status: "watch" },
  { domain: "Board reporting",            owner: "ChiefStaff", fresh_days: 8,status: "fresh" },
  { domain: "Category proof",             owner: "PMM",    fresh_days: 11, status: "fresh" },
];

export const V145_RISKS = [
  { cat: "Capital execution",      owner: "CFO",  sponsor: "CEO",  due: "T+30d", status: "on-track", escalation: "n/a", board: true },
  { cat: "Revenue durability",     owner: "CFO",  sponsor: "CEO",  due: "T+10d", status: "at-risk",  escalation: "CFO", board: true },
  { cat: "Customer concentration", owner: "CRO",  sponsor: "CEO",  due: "T+21d", status: "on-track", escalation: "n/a", board: true },
  { cat: "Marketplace economics",  owner: "MP",   sponsor: "CEO",  due: "T+14d", status: "at-risk",  escalation: "CEO", board: true },
  { cat: "API/EDI revenue",        owner: "RevOps",sponsor:"CFO",  due: "T+18d", status: "on-track", escalation: "n/a", board: false },
  { cat: "Partner dependency",     owner: "Partner",sponsor:"CRO", due: "T+12d", status: "on-track", escalation: "n/a", board: false },
  { cat: "Strategic accounts",     owner: "CS",   sponsor: "CRO",  due: "T+20d", status: "on-track", escalation: "n/a", board: true },
  { cat: "Product durability",     owner: "CPO",  sponsor: "CEO",  due: "T+24d", status: "on-track", escalation: "n/a", board: true },
  { cat: "Commercial diligence",   owner: "RevOps",sponsor:"CFO",  due: "T+15d", status: "on-track", escalation: "n/a", board: true },
  { cat: "Capital evidence",       owner: "CFO",  sponsor: "CEO",  due: "T+10d", status: "at-risk",  escalation: "CFO", board: true },
  { cat: "Board execution",        owner: "ChiefStaff",sponsor:"CEO",due:"T+5d", status: "at-risk",  escalation: "CEO", board: true },
  { cat: "Category leadership",    owner: "PMM",  sponsor: "CEO",  due: "T+18d", status: "on-track", escalation: "n/a", board: true },
  { cat: "Competitive",            owner: "PMM",  sponsor: "CEO",  due: "T+25d", status: "on-track", escalation: "n/a", board: true },
  { cat: "Global expansion",       owner: "COO",  sponsor: "CEO",  due: "T+45d", status: "watch",    escalation: "n/a", board: true },
  { cat: "Operational scale",      owner: "COO",  sponsor: "CEO",  due: "T+30d", status: "on-track", escalation: "n/a", board: true },
];

export const V145_OP_CONTROLS = [
  { domain: "Capital execution",   owner: "CFO",   tested: "Q-1", status: "pass" },
  { domain: "Revenue durability",  owner: "CFO",   tested: "Q-1", status: "pass" },
  { domain: "Marketplace economics",owner: "MP",   tested: "Q-2", status: "watch" },
  { domain: "Category execution",  owner: "PMM",   tested: "Q-1", status: "pass" },
  { domain: "Board execution",     owner: "ChiefStaff",tested: "Q-1", status: "watch" },
  { domain: "Strategic accounts",  owner: "CRO",   tested: "Q-1", status: "pass" },
  { domain: "Partner value",       owner: "Partner",tested: "Q-2", status: "watch" },
  { domain: "Product-line",        owner: "CPO",   tested: "Q-1", status: "pass" },
  { domain: "Capital evidence",    owner: "CFO",   tested: "Q-1", status: "pass" },
  { domain: "Commercial diligence",owner: "RevOps",tested: "Q-1", status: "watch" },
  { domain: "Strategic risk",      owner: "COO",   tested: "Q-1", status: "pass" },
  { domain: "Exec cadence",        owner: "ChiefStaff",tested:"Q-1",status: "pass" },
];

export const V145_CADENCES = [
  { cadence: "Weekly operating excellence",     owner: "COO",     last: "Mon",  next: "Mon",   health: 92 },
  { cadence: "Weekly revenue durability exec",  owner: "CFO",     last: "Tue",  next: "Tue",   health: 88 },
  { cadence: "Weekly marketplace scale",        owner: "MP",      last: "Wed",  next: "Wed",   health: 84 },
  { cadence: "Weekly strategic account growth", owner: "CRO",     last: "Thu",  next: "Thu",   health: 86 },
  { cadence: "Weekly partner value execution",  owner: "Partner", last: "Thu",  next: "Thu",   health: 80 },
  { cadence: "Monthly capital discipline",      owner: "CFO",     last: "M-1",  next: "M0",    health: 87 },
  { cadence: "Monthly commercial diligence",    owner: "RevOps",  last: "M-1",  next: "M0",    health: 83 },
  { cadence: "Monthly category execution",      owner: "PMM",     last: "M-1",  next: "M0",    health: 86 },
  { cadence: "Monthly board execution",         owner: "ChiefStaff",last: "M-1",next: "M0",    health: 82 },
  { cadence: "Quarterly strategic operating",   owner: "CEO",     last: "Q-1",  next: "Q0",    health: 90 },
  { cadence: "Quarterly capital strategy exec", owner: "CFO",     last: "Q-1",  next: "Q0",    health: 88 },
];

export const V145_LT_PERF = {
  score: 84,
  kpis: [
    { dim: "Enterprise operating excellence", pct: 93 },
    { dim: "Capital discipline",              pct: 86 },
    { dim: "Revenue durability",              pct: 88 },
    { dim: "MP economics scale",              pct: 81 },
    { dim: "Category execution maturity",     pct: 87 },
    { dim: "Strategic account growth",        pct: 84 },
    { dim: "Partner value execution",         pct: 79 },
    { dim: "Product-line operating excellence",pct: 85 },
    { dim: "Board execution discipline",      pct: 82 },
    { dim: "Capital evidence discipline",     pct: 83 },
    { dim: "Commercial diligence discipline", pct: 80 },
    { dim: "Strategic risk execution",        pct: 78 },
    { dim: "LT roadmap progress",             pct: 76 },
  ],
  gaps: [
    "MP economics scale below 85% target",
    "Partner value execution below 80% target",
    "Strategic risk execution below 80% target",
  ],
  actions: [
    { owner: "MP",      action: "Southeast carrier expansion", due: "T+14d" },
    { owner: "Partner", action: "API partner enablement",      due: "T+7d" },
    { owner: "COO",     action: "Strategic risk reduction wave", due: "T+30d" },
  ],
  trends: [
    { q: "Q-3", pct: 76 },
    { q: "Q-2", pct: 79 },
    { q: "Q-1", pct: 82 },
    { q: "Q0",  pct: 84 },
  ],
};

export const V145_REPORTS = [
  "Enterprise operating excellence",
  "Strategic capital discipline",
  "Durable revenue systems",
  "Revenue durability execution",
  "Marketplace economics scale",
  "Marketplace scale controls",
  "Category leadership execution maturity",
  "Category proof execution",
  "Executive performance management",
  "Board execution discipline",
  "Strategic account growth discipline",
  "Partner value execution",
  "Product-line operating excellence",
  "Capital evidence discipline",
  "Commercial diligence discipline",
  "Strategic risk execution discipline",
  "Enterprise operating controls",
  "Enterprise operating cadence",
  "Long-term performance management",
];

export const V145_EDGE_VS_SERVERFN = [
  { kind: "ServerFn", surface: "calculate-v145-operating-excellence-score", example: "Internal CEO dashboard", why: "Tenant-scoped, RBAC via requireSupabaseAuth" },
  { kind: "ServerFn", surface: "calculate-strategic-capital-discipline",    example: "Internal CFO view",     why: "Internal RBAC + RLS" },
  { kind: "ServerFn", surface: "calculate-durable-revenue-systems-score",   example: "Internal RevOps view",  why: "Internal RBAC + RLS" },
  { kind: "ServerFn", surface: "calculate-marketplace-economics-scale-score",example:"Internal MP view",      why: "Tenant-scoped" },
  { kind: "ServerFn", surface: "calculate-category-execution-maturity",     example: "Internal PMM view",     why: "Internal RBAC" },
  { kind: "ServerFn", surface: "calculate-board-execution-discipline",      example: "Internal board admin",  why: "Board-role gated" },
  { kind: "Edge",     surface: "/api/public/v145/board-digest (signed)",    example: "Signed board export",   why: "External signed payload" },
  { kind: "Edge",     surface: "/api/public/v145/data-room-digest (signed)",example: "Investor/acquirer data room", why: "External signed payload" },
];

export const V145_RLS_EXAMPLES = [
  { table: "v145_operating_excellence_scores", policy: "company_admin_select_company OR platform_owner_select" },
  { table: "strategic_capital_discipline_records", policy: "executive_role_select; CFO write" },
  { table: "durable_revenue_system_records", policy: "revops_role_manage; billing_role_select" },
  { table: "marketplace_economics_scale_records", policy: "mp_lead_manage; executives select" },
  { table: "category_execution_maturity_records", policy: "pmm_role_manage; executives select" },
  { table: "board_execution_discipline_records", policy: "board_role_select_approved_only; chief_of_staff_write" },
  { table: "strategic_account_growth_discipline_records", policy: "assigned_csm OR account_owner select" },
  { table: "partner_value_execution_records", policy: "partner_manager_manage; executives select" },
  { table: "product_line_operating_excellence_records", policy: "product_leader_manage; executives select" },
  { table: "capital_evidence_discipline_records", policy: "executive_admin_only" },
  { table: "commercial_diligence_discipline_records", policy: "executive_admin_only" },
  { table: "strategic_risk_execution_discipline_records", policy: "executive_admin_only; board select" },
  { table: "enterprise_operating_control_records", policy: "compliance_role_manage; executives select" },
  { table: "long_term_performance_management_records", policy: "executive_role_select" },
];

export const V145_PHASE43_TEASER = [
  "V15 Enterprise Performance Command",
  "Durable capital execution",
  "Marketplace scale governance",
  "Strategic operating intelligence",
  "Category leadership operating system",
];

export const V145_DEMO = [
  { actor: "CEO",         step: "Open Operating Excellence Command Center", expect: "OpEx 93%, Cap 86%, Dur 88%, MP 81%, Cat 87%" },
  { actor: "CFO",         step: "Open Durable Revenue Systems",              expect: "Renewal strong; expansion + MP improving; API early; 2 evidence items overdue" },
  { actor: "MP Lead",     step: "Open Marketplace Economics Scale",          expect: "TX/MW scale-ready; SE weak density; unit-econ moderate" },
  { actor: "Strategy",    step: "Open Category Leadership Execution",        expect: "Narrative strong; MP proof gap; customer outcome current; diff strong" },
  { actor: "Board admin", step: "Open Board Execution Discipline",           expect: "82% completion; 2 overdue; evidence acceptable; MP review scheduled" },
  { actor: "Partner",     step: "Open Partner Value Execution",              expect: "Telematics strong; API partner gap; plan created" },
  { actor: "CEO",         step: "Open Executive Performance Mgmt",           expect: "Top-5 exec actions queued" },
];
