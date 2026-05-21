// V5 mock data — Phase 23 national-scale platform maturity. All mocked, no real KPIs.

export const V5_MATURITY = {
  overall: 87, product: 89, marketplace: 82, revenue: 80, customer_success: 84,
  support: 86, compliance: 78, security: 85, mobile: 83, integration: 88,
  partner: 79, data: 84, ai_governance: 81, operational: 86, enterprise: 85,
  category_leadership: 76,
};

export const V5_MATURITY_TREND = [
  { quarter: "Q-3", overall: 78 },
  { quarter: "Q-2", overall: 82 },
  { quarter: "Q-1", overall: 85 },
  { quarter: "Q0",  overall: 87 },
];

export const V5_FEATURE_MATRIX = [
  { area: "National maturity dashboard", ga: "ready",       notes: "Mock scoring across 16 pillars" },
  { area: "Marketplace liquidity",       ga: "ready",       notes: "Coverage, bids, time-to-award" },
  { area: "Supply/demand balance",       ga: "ready",       notes: "Regional + equipment heatmap" },
  { area: "Lane coverage intelligence",  ga: "ready",       notes: "Per-lane risk + expansion" },
  { area: "Trust & safety",              ga: "ready",       notes: "Manual review queue only" },
  { area: "Carrier quality program",     ga: "ready",       notes: "Tiers + improvement plans" },
  { area: "Strategic partnerships",      ga: "ready",       notes: "Execution board + GTM" },
  { area: "Certification completion",    ga: "in_progress", notes: "Evidence package builder" },
  { area: "SOC 2 completion",            ga: "in_progress", notes: "74% controls complete" },
  { area: "Executive/board reporting",   ga: "ready",       notes: "Builder + QOR" },
  { area: "Category leadership",         ga: "in_progress", notes: "Positioning + proof points" },
  { area: "Competitive intelligence",    ga: "ready",       notes: "Battlecards + win/loss" },
  { area: "Mature revenue ops",          ga: "ready",       notes: "ARR, NRR placeholders" },
  { area: "Mature customer success",     ga: "ready",       notes: "QBR + success plans" },
  { area: "Mature support",              ga: "ready",       notes: "SLA + backlog + escalations" },
  { area: "Governance maturity",         ga: "ready",       notes: "Reviews + exceptions" },
  { area: "Strategic growth",            ga: "ready",       notes: "Initiative scorecards" },
  { area: "Partner ecosystem exec",      ga: "ready",       notes: "Health + revenue contrib" },
  { area: "Advanced operating metrics",  ga: "ready",       notes: "Platform + ecosystem" },
  { area: "National ops review",         ga: "ready",       notes: "Regional rollups" },
  { area: "Data room maturity",          ga: "in_progress", notes: "Investor packet builder" },
  { area: "Autonomous dispatch",         ga: "deferred",    notes: "Not in V5" },
  { area: "Insurance underwriting auto", ga: "deferred",    notes: "Not in V5" },
  { area: "International customs",       ga: "deferred",    notes: "Not in V5" },
];

export const V5_DEFERRED = [
  "Fully autonomous dispatch", "Autonomous vehicle dispatch", "International customs",
  "Guaranteed marketplace liquidity claims", "Final certification claims without evidence",
  "Fully automated legal compliance", "Insurance underwriting automation",
];

export const DEMO_HIGHLIGHTS = [
  { label: "Overall maturity",    value: "87%" },
  { label: "Marketplace",         value: "82%" },
  { label: "Certification",       value: "76%" },
  { label: "Revenue",             value: "80%" },
  { label: "Customer success",    value: "84%" },
  { label: "Board readiness",     value: "Ready" },
];

// ── Marketplace liquidity ──
export const LIQUIDITY = {
  score: 78, posted: 1842, awarded: 1612, uncovered: 230,
  avg_bids_per_load: 4.2, time_to_first_bid_min: 6.4, time_to_award_min: 41,
  carrier_response_rate: 73, carrier_acceptance_rate: 61, fall_off_rate: 4.1,
};
export const LIQUIDITY_TREND = [
  { week: "W-3", score: 71, uncovered: 312 },
  { week: "W-2", score: 74, uncovered: 281 },
  { week: "W-1", score: 76, uncovered: 254 },
  { week: "W0",  score: 78, uncovered: 230 },
];
export const UNCOVERED_LOADS = [
  { id: "L-2041", lane: "ATL → MIA",  equipment: "Flatbed",   age_h: 6, urgency: "high"   },
  { id: "L-2042", lane: "DFW → PHX",  equipment: "Reefer",    age_h: 4, urgency: "medium" },
  { id: "L-2043", lane: "SEA → SLC",  equipment: "Dry Van",   age_h: 8, urgency: "high"   },
  { id: "L-2044", lane: "CHI → NSH",  equipment: "Box Truck", age_h: 2, urgency: "low"    },
  { id: "L-2045", lane: "BOS → PHL",  equipment: "Flatbed",   age_h: 5, urgency: "medium" },
];

// ── Supply / demand ──
export const SUPPLY_DEMAND = [
  { region: "Northeast", supply: 312, demand: 298, balance:  14 },
  { region: "Southeast", supply: 198, demand: 284, balance: -86 },
  { region: "Midwest",   supply: 245, demand: 231, balance:  14 },
  { region: "Southwest", supply: 187, demand: 220, balance: -33 },
  { region: "West",      supply: 226, demand: 211, balance:  15 },
  { region: "Northwest", supply: 142, demand: 138, balance:   4 },
];
export const EQUIPMENT_DEMAND = [
  { equipment: "Dry Van",   supply: 612, demand: 588, gap:  24 },
  { equipment: "Reefer",    supply: 184, demand: 221, gap: -37 },
  { equipment: "Flatbed",   supply: 142, demand: 198, gap: -56 },
  { equipment: "Box Truck", supply:  98, demand: 132, gap: -34 },
  { equipment: "Step Deck", supply:  44, demand:  51, gap:  -7 },
];
export const CARRIER_GAP_RECS = [
  { region: "Southeast", action: "Recruit 25 flatbed carriers",  priority: "high"   },
  { region: "Southeast", action: "Recruit 15 box truck carriers", priority: "high"   },
  { region: "Southwest", action: "Recruit 12 reefer carriers",    priority: "medium" },
];

// ── Lane coverage ──
export const LANES = [
  { origin: "ATL", dest: "MIA", volume: 142, coverage: 71, avg_bids: 3.1, avg_cover_h:  9.4, risk: "high",   expansion: "Recruit flatbed" },
  { origin: "DFW", dest: "PHX", volume: 118, coverage: 84, avg_bids: 4.6, avg_cover_h:  4.2, risk: "medium", expansion: "Watch reefer" },
  { origin: "CHI", dest: "NSH", volume:  96, coverage: 91, avg_bids: 5.4, avg_cover_h:  2.1, risk: "low",    expansion: "Stable" },
  { origin: "SEA", dest: "SLC", volume:  74, coverage: 68, avg_bids: 2.8, avg_cover_h:  8.1, risk: "high",   expansion: "Add carriers" },
  { origin: "LAX", dest: "DEN", volume: 108, coverage: 88, avg_bids: 5.1, avg_cover_h:  3.4, risk: "low",    expansion: "Stable" },
  { origin: "NYC", dest: "BOS", volume: 134, coverage: 94, avg_bids: 6.2, avg_cover_h:  1.4, risk: "low",    expansion: "Premium pricing" },
];

// ── Trust & safety ──
export const TRUST_SAFETY = {
  trust_score: 88, suspensions_30d: 4, reinstatements_30d: 2,
  no_shows_30d: 6, doc_expirations: 11, complaints_open: 9,
};
export const TRUST_EVENTS = [
  { ts: "2026-05-19", carrier: "Lone Star Hauling", type: "no_show",          status: "under review" },
  { ts: "2026-05-18", carrier: "Pacific Freight",   type: "doc_expiration",   status: "pending" },
  { ts: "2026-05-17", carrier: "Coastal Cargo",     type: "customer complaint", status: "escalated" },
  { ts: "2026-05-15", carrier: "Mountain Logistics", type: "suspicious bidding", status: "in_progress" },
];

// ── Carrier quality ──
export const CARRIER_TIERS = [
  { tier: "Elite",      count:  18, otp: 98, dispute_rate: 0.4 },
  { tier: "Preferred",  count:  62, otp: 95, dispute_rate: 0.9 },
  { tier: "Verified",   count: 184, otp: 91, dispute_rate: 1.8 },
  { tier: "New",        count:  46, otp: 87, dispute_rate: 2.6 },
  { tier: "Watchlist",  count:   9, otp: 78, dispute_rate: 5.2 },
  { tier: "Suspended",  count:   3, otp: 0,  dispute_rate: 0 },
];
export const PREFERRED_CARRIERS = [
  { name: "Apex Freight",      tier: "Elite",     otp: 98, regions: "SE, MW" },
  { name: "Summit Transport",  tier: "Elite",     otp: 97, regions: "W, NW" },
  { name: "BlueRiver Logistics", tier: "Preferred", otp: 96, regions: "NE, MW" },
];

// ── Strategic partnerships ──
export const PARTNERS = [
  { name: "Samsara",      category: "Telematics",  sponsor: "CTO",  status: "launched",      gtm: "active",      launch: "2026-01-10", revenue: "$$$"  },
  { name: "Stripe",       category: "Payments",    sponsor: "CFO",  status: "integrated",    gtm: "active",      launch: "2025-11-04", revenue: "$$$$" },
  { name: "Project44",    category: "Visibility",  sponsor: "CPO",  status: "integrating",   gtm: "pending",     launch: "2026-07-01", revenue: "$$"   },
  { name: "Trimble",      category: "Telematics",  sponsor: "CTO",  status: "exploration",   gtm: "not_started", launch: "TBD",        revenue: "$"    },
  { name: "Highway",      category: "Carrier compliance", sponsor: "COO", status: "integrating", gtm: "designed", launch: "2026-08-15", revenue: "$$"   },
];

// ── Certification ──
export const CERT_COMPLETION = {
  soc2: 76, iso27001: 38, pen_test: 82, vuln_remediation: 88,
  mobile_review: 71, api_review: 84, edi_review: 79,
  backup_restore: 92, ir_testing: 68, access_review: 94, evidence: 81,
};
export const SOC2_CONTROLS = [
  { id: "CC1.1", tsc: "Common Criteria", owner: "Security",  description: "Control environment",   policy: "yes", evidence: "yes", test: "pass",   exception: "none",   remediation: "n/a",      pct: 100 },
  { id: "CC2.1", tsc: "Common Criteria", owner: "Security",  description: "Communication of info", policy: "yes", evidence: "yes", test: "pass",   exception: "none",   remediation: "n/a",      pct: 100 },
  { id: "CC6.1", tsc: "Common Criteria", owner: "Engineering", description: "Logical access",     policy: "yes", evidence: "partial", test: "in_progress", exception: "minor", remediation: "in_progress", pct: 70 },
  { id: "CC6.6", tsc: "Common Criteria", owner: "Engineering", description: "MFA enforcement",    policy: "yes", evidence: "yes", test: "pass",   exception: "none",   remediation: "n/a",      pct: 100 },
  { id: "CC7.2", tsc: "Common Criteria", owner: "SecOps",    description: "System monitoring",    policy: "yes", evidence: "partial", test: "in_progress", exception: "minor", remediation: "in_progress", pct: 60 },
  { id: "A1.2",  tsc: "Availability",    owner: "Platform",  description: "Backups & recovery",   policy: "yes", evidence: "yes", test: "pass",   exception: "none",   remediation: "n/a",      pct: 100 },
  { id: "C1.1",  tsc: "Confidentiality", owner: "Security",  description: "Data classification",  policy: "yes", evidence: "partial", test: "pending", exception: "open",  remediation: "planned",  pct: 50 },
];
export const SOC2_EXCEPTIONS = [
  { control: "CC6.1", description: "Quarterly access review for one integration overdue", remediation: "Run review", owner: "SecOps", due: "2026-06-01" },
  { control: "CC7.2", description: "Log retention gap on edge function",                  remediation: "Extend retention", owner: "Platform", due: "2026-05-28" },
  { control: "C1.1",  description: "Data classification policy not signed by all owners", remediation: "Acknowledgment campaign", owner: "Security", due: "2026-06-10" },
];

// ── Executive / board ──
export const BOARD_KPIS = [
  { label: "Active customers",  value: "142",   sub: "+8 QoQ" },
  { label: "Marketplace GMV",   value: "$$$$", sub: "+18% QoQ (mock)" },
  { label: "Net revenue ret.",  value: "—",    sub: "Placeholder" },
  { label: "Critical incidents", value: "1",   sub: "Resolved in SLA" },
  { label: "SOC 2 readiness",   value: "76%",  sub: "Audit ready Q3" },
  { label: "NPS (placeholder)", value: "—",    sub: "Survey in flight" },
];
export const BOARD_RISKS = [
  { area: "Marketplace",   risk: "Carrier supply gap in Southeast", severity: "high",   owner: "COO" },
  { area: "Certification", risk: "SOC 2 exceptions to remediate",   severity: "medium", owner: "Security" },
  { area: "Revenue",       risk: "2 enterprise renewals at risk",   severity: "medium", owner: "CRO" },
];
export const BOARD_DECISIONS = [
  { topic: "Approve Southeast carrier recruiting plan",        recommendation: "Approve", owner: "CEO" },
  { topic: "Greenlight SOC 2 audit kickoff",                   recommendation: "Approve", owner: "CISO" },
  { topic: "Strategic partner co-marketing budget allocation", recommendation: "Discuss", owner: "CMO" },
];

// ── Category leadership ──
export const POSITIONING_AREAS = [
  { area: "Driver navigation",      strength: "Differentiated", proof: "EliteNav adoption + crash-free sessions" },
  { area: "Dispatch command",       strength: "Differentiated", proof: "Command Center workflows" },
  { area: "Customer portal",        strength: "Differentiated", proof: "Self-serve visibility + docs" },
  { area: "AI operations",          strength: "Emerging",       proof: "CoPilot recommendations, human-approved" },
  { area: "Marketplace ecosystem",  strength: "Emerging",       proof: "Liquidity score + tiered carriers" },
  { area: "Enterprise governance",  strength: "Mature",         proof: "Reviews, exceptions, audit trails" },
];
export const COMPETITORS = [
  { name: "Competitor A", category: "TMS",          strengths: "Legacy enterprise reach", weaknesses: "Slow mobile, dated UX",          mobile: "weak",    ai: "limited", marketplace: "none",     enterprise: "strong" },
  { name: "Competitor B", category: "Visibility",   strengths: "Telematics breadth",      weaknesses: "No marketplace, weak dispatch",  mobile: "medium",  ai: "medium",  marketplace: "limited",  enterprise: "medium" },
  { name: "Competitor C", category: "Load board",   strengths: "Carrier supply",          weaknesses: "No enterprise dispatch, no AI",  mobile: "medium",  ai: "weak",    marketplace: "strong",   enterprise: "weak"   },
];
export const WIN_LOSS = [
  { quarter: "Q-1", won: 12, lost: 4, top_reason_win: "Driver UX + marketplace", top_reason_loss: "Procurement cycle" },
  { quarter: "Q0",  won: 14, lost: 3, top_reason_win: "AI ops + governance",      top_reason_loss: "Existing TMS lock-in" },
];

// ── Revenue ops ──
export const REVENUE_LINES = [
  { line: "SaaS ARR",          value: "—",  trend: "+",  note: "Placeholder" },
  { line: "Marketplace",       value: "$$", trend: "+",  note: "Mock" },
  { line: "API",               value: "$",  trend: "+",  note: "Mock" },
  { line: "Enterprise support", value: "$", trend: "=",  note: "Mock" },
  { line: "Implementation",    value: "$",  trend: "=",  note: "Mock" },
  { line: "Expansion",         value: "$$", trend: "+",  note: "Mock" },
];
export const RENEWAL_PIPELINE = [
  { customer: "Northwind Logistics", arr: "—", renewal_date: "2026-08-15", health: "green",  risk: "low"    },
  { customer: "Atlas Freight",       arr: "—", renewal_date: "2026-09-01", health: "yellow", risk: "medium" },
  { customer: "Polar Cold Chain",    arr: "—", renewal_date: "2026-09-22", health: "green",  risk: "low"    },
  { customer: "Cascade Carriers",    arr: "—", renewal_date: "2026-10-10", health: "red",    risk: "high"   },
];
export const EXPANSION_PIPELINE = [
  { customer: "Northwind Logistics", opportunity: "Add reefer module", value: "$$", stage: "discovery" },
  { customer: "Atlas Freight",       opportunity: "EDI premium",       value: "$",  stage: "proposal"  },
  { customer: "Polar Cold Chain",    opportunity: "Driver app expand", value: "$$", stage: "negotiation" },
];

// ── Customer success ──
export const CUSTOMER_HEALTH = [
  { customer: "Northwind",     health: 88, adoption: 92, sponsor: "engaged",   qbr: "scheduled", renewal: "ready" },
  { customer: "Atlas Freight", health: 72, adoption: 81, sponsor: "lukewarm",  qbr: "overdue",   renewal: "watch" },
  { customer: "Polar",         health: 91, adoption: 95, sponsor: "engaged",   qbr: "complete",  renewal: "ready" },
  { customer: "Cascade",       health: 54, adoption: 62, sponsor: "absent",    qbr: "overdue",   renewal: "at_risk" },
];

// ── Support ──
export const SUPPORT_METRICS = {
  sla_compliance: 96, ticket_volume_7d: 412, first_response_min: 18,
  ttr_h: 4.6, critical_incidents_30d: 2, escalations_open: 3, backlog: 47,
};

// ── Governance ──
export const GOVERNANCE_REVIEWS = [
  { type: "Access reviews",       status: "complete",   completion: 100, next: "2026-08-15" },
  { type: "API key reviews",      status: "in_progress", completion: 78,  next: "2026-05-30" },
  { type: "Integration reviews",  status: "complete",   completion: 100, next: "2026-08-01" },
  { type: "EDI partner reviews",  status: "in_progress", completion: 62,  next: "2026-06-10" },
  { type: "Carrier reviews",      status: "complete",   completion: 100, next: "2026-07-15" },
  { type: "AI action reviews",    status: "in_progress", completion: 88,  next: "2026-06-01" },
  { type: "Billing access",       status: "complete",   completion: 100, next: "2026-08-22" },
  { type: "Data retention",       status: "complete",   completion: 100, next: "2026-09-01" },
];
export const GOVERNANCE_EXCEPTIONS = [
  { area: "API keys",    description: "3 keys without rotation in 90d", owner: "Platform", severity: "medium" },
  { area: "EDI",         description: "Inactive partner with active creds", owner: "Integrations", severity: "medium" },
  { area: "AI actions",  description: "2 unreviewed auto-actions this week", owner: "AI Ops", severity: "low" },
];

// ── Strategic growth ──
export const GROWTH_INITIATIVES = [
  { area: "New regions",          opportunity: "Northwest expansion",   score: 8, owner: "COO" },
  { area: "Verticals",            opportunity: "Cold chain depth",      score: 9, owner: "CPO" },
  { area: "Carrier network",      opportunity: "Southeast flatbed",     score: 9, owner: "COO" },
  { area: "Partner ecosystem",    opportunity: "Highway integration",   score: 7, owner: "BD" },
  { area: "API monetization",     opportunity: "Tiered API pricing",    score: 6, owner: "CRO" },
  { area: "Marketplace",          opportunity: "Trust & safety premium", score: 7, owner: "COO" },
  { area: "Enterprise accounts",  opportunity: "Top-10 carrier deals",  score: 8, owner: "CRO" },
];

// ── Partner ecosystem ──
export const PARTNER_HEALTH = [
  { partner: "Samsara",   health: 92, revenue: "$$$",  joint_customers: 24, risks: "none" },
  { partner: "Stripe",    health: 96, revenue: "$$$$", joint_customers: 42, risks: "none" },
  { partner: "Project44", health: 71, revenue: "$$",   joint_customers:  6, risks: "Integration delays" },
  { partner: "Highway",   health: 78, revenue: "$",    joint_customers:  3, risks: "Onboarding scope" },
];

// ── Advanced operating metrics ──
export const OPS_METRICS = [
  { label: "Platform uptime",         value: "99.95%" },
  { label: "Realtime latency p95",    value: "182 ms" },
  { label: "GPS events / day",        value: "12.4M"  },
  { label: "Route sessions / day",    value: "8.2k"   },
  { label: "Marketplace loads / day", value: "1.6k"   },
  { label: "Awards / day",            value: "1.4k"   },
  { label: "API requests / day",      value: "9.8M"   },
  { label: "EDI txns / day",          value: "62k"    },
  { label: "Webhook success",         value: "99.6%"  },
  { label: "Notif success",           value: "99.8%"  },
  { label: "Portal visits / day",     value: "11.2k"  },
  { label: "Driver app sessions",     value: "9.4k"   },
  { label: "Mobile crash-free",       value: "99.7%"  },
  { label: "Support tickets / day",   value: "58"     },
  { label: "AI recommendations",      value: "3.1k"   },
  { label: "Revenue events / day",    value: "—"      },
];

// ── National ops review ──
export const REGIONAL_REVIEW = [
  { region: "Northeast", coverage: 92, demand: "high",   delays: "low",    support: "low",    expansion: "Maintain" },
  { region: "Southeast", coverage: 68, demand: "high",   delays: "high",   support: "medium", expansion: "Recruit carriers" },
  { region: "Midwest",   coverage: 88, demand: "medium", delays: "low",    support: "low",    expansion: "Stable" },
  { region: "Southwest", coverage: 76, demand: "medium", delays: "medium", support: "low",    expansion: "Selective carrier add" },
  { region: "West",      coverage: 91, demand: "high",   delays: "low",    support: "low",    expansion: "Add reefer" },
  { region: "Northwest", coverage: 84, demand: "low",    delays: "low",    support: "low",    expansion: "Pilot expansion" },
];

// ── Data room ──
export const DATA_ROOM = [
  { section: "Product overview",      status: "complete",     owner: "CPO"     },
  { section: "Architecture overview", status: "complete",     owner: "CTO"     },
  { section: "Security overview",     status: "complete",     owner: "CISO"    },
  { section: "Compliance evidence",   status: "in_progress",  owner: "Security" },
  { section: "Financial metrics",     status: "placeholder",  owner: "CFO"     },
  { section: "Customer metrics",      status: "complete",     owner: "CS"      },
  { section: "Marketplace metrics",   status: "complete",     owner: "COO"     },
  { section: "Revenue metrics",       status: "in_progress",  owner: "CRO"     },
  { section: "Product roadmap",       status: "complete",     owner: "CPO"     },
  { section: "Support metrics",       status: "complete",     owner: "Support" },
  { section: "Risk register",         status: "in_progress",  owner: "GRC"     },
  { section: "Partner list",          status: "complete",     owner: "BD"      },
  { section: "Integration list",      status: "complete",     owner: "Eng"     },
  { section: "Legal documents",       status: "placeholder",  owner: "Legal"   },
  { section: "Customer references",   status: "placeholder",  owner: "CS"      },
];
export const DD_REQUESTS = [
  { id: "DD-014", topic: "SOC 2 evidence",      requestor: "Acquirer A", status: "in_progress", due: "2026-06-05" },
  { id: "DD-015", topic: "Customer references", requestor: "Acquirer A", status: "pending",     due: "2026-06-12" },
  { id: "DD-016", topic: "Revenue breakdown",   requestor: "Acquirer A", status: "in_progress", due: "2026-06-08" },
];

// ── V5 reports ──
export const V5_REPORTS = [
  "National platform maturity", "Marketplace liquidity", "Carrier supply/demand",
  "Lane coverage", "Trust and safety", "Carrier quality",
  "Strategic partnerships", "Certification completion", "Board report",
  "Revenue operations", "Customer success", "Enterprise support",
  "Governance maturity", "Strategic growth", "Partner ecosystem",
  "National operations", "Data room maturity",
];
