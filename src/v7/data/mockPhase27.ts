// V7 mock dataset — Phase 27 (global logistics operating network readiness)

export const V7_FEATURE_MATRIX = [
  { area: "Global network",        status: "shipped",  notes: "Network dashboard + regional activity" },
  { area: "Global readiness score",status: "shipped",  notes: "13 readiness categories tracked" },
  { area: "Country/region matrix", status: "shipped",  notes: "Demand, partners, risk, recommendation" },
  { area: "Data residency",        status: "placeholder", notes: "Planning only — not production" },
  { area: "Cross-border workflow", status: "placeholder", notes: "Profile + customs placeholders" },
  { area: "Regulated controls",    status: "shipped",  notes: "16 control areas" },
  { area: "Global compliance",     status: "shipped",  notes: "Coverage map + gap register" },
  { area: "Regulated AI gov",      status: "shipped",  notes: "Approval, explanation, restriction rules" },
  { area: "Marketplace intel",     status: "shipped",  notes: "Liquidity, concentration, opportunity" },
  { area: "Trust + safety",        status: "shipped",  notes: "Watchlist, suspension workflows" },
  { area: "Financial maturity",    status: "shipped",  notes: "Maturity score 74%" },
  { area: "Financial audit ready", status: "placeholder", notes: "Evidence checklist — not asserted" },
  { area: "Global revenue ops",    status: "shipped",  notes: "Region/country placeholders" },
  { area: "Partner ecosystem",     status: "shipped",  notes: "Regional partner map" },
  { area: "International marketplace", status: "shipped", notes: "Regional partner catalog" },
  { area: "Enterprise customers",  status: "shipped",  notes: "Global account readiness" },
  { area: "Support model",         status: "shipped",  notes: "Region/timezone coverage" },
  { area: "Exec global dashboard", status: "shipped",  notes: "KPI grid + decisions" },
  { area: "Strategic risks",       status: "shipped",  notes: "14 risk categories" },
  { area: "Expansion roadmap",     status: "shipped",  notes: "6 horizons, 10 tracks" },
];

export const V7_DEFERRED = [
  "Fully autonomous dispatch",
  "Final global compliance certification",
  "Financial audit readiness assertion",
  "Global customs production workflows",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "SOC 2 / ISO claims without evidence",
  "Android Auto / CarPlay approval claims",
];

export const GLOBAL_READINESS_SCORE = {
  overall: 67,
  byCategory: [
    { category: "Product",            score: 88 },
    { category: "Localization",       score: 42 },
    { category: "Compliance",         score: 58 },
    { category: "Financial controls", score: 74 },
    { category: "Support",            score: 63 },
    { category: "Partner",            score: 71 },
    { category: "Marketplace",        score: 79 },
    { category: "Mobile",             score: 76 },
    { category: "Security",           score: 84 },
    { category: "Data residency",     score: 36 },
    { category: "Billing",            score: 68 },
    { category: "Customer success",   score: 72 },
    { category: "Regional ops",       score: 55 },
  ],
};

export const READINESS_GAPS = [
  { category: "Data residency",     gap: "EU/UK region requirements not implemented", owner: "Security", severity: "high" },
  { category: "Localization",       gap: "Spanish + French translation backlog",      owner: "Product",  severity: "medium" },
  { category: "Compliance",         gap: "Region-specific privacy review pending",    owner: "Legal",    severity: "high" },
  { category: "Regional ops",       gap: "EU support timezone coverage incomplete",   owner: "Support",  severity: "medium" },
];

export const READINESS_ACTIONS = [
  { action: "Engage outside counsel — EU privacy review",  owner: "Legal",    eta: "Q1",  status: "in_progress" },
  { action: "Scope data residency vendor + region pinning", owner: "Security", eta: "Q1",  status: "planned" },
  { action: "Hire EU customer success lead",                 owner: "People",   eta: "Q2",  status: "planned" },
  { action: "Translate driver app to ES / FR",               owner: "Product",  eta: "Q2",  status: "planned" },
];

export const GLOBAL_NETWORK_METRICS = {
  countries: 3, regions: 9, companies: 142, drivers: 4_320, carriers: 6_810,
  customers: 1_205, shipments: 38_400, marketplace_loads: 8_120, partners: 22,
  api_rpm: 12_450, edi_txn: 1_840, webhook_txn: 9_220,
  mobile_dau: 3_180, portal_dau: 2_410, copilot_events: 18_900,
  marketplace_liquidity: 78, support_burden: 64,
};

export const REGIONAL_ACTIVITY = [
  { region: "Northeast US",  shipments: 6_200, loads: 1_180, risk: "low",    revenue: "$420k" },
  { region: "Southeast US",  shipments: 5_400, loads: 1_010, risk: "medium", revenue: "$360k" },
  { region: "Midwest US",    shipments: 7_800, loads: 1_640, risk: "low",    revenue: "$540k" },
  { region: "Texas",         shipments: 6_900, loads: 1_580, risk: "low",    revenue: "$510k" },
  { region: "West US",       shipments: 5_100, loads: 980,   risk: "medium", revenue: "$340k" },
  { region: "Canada — ON",   shipments: 1_200, loads: 220,   risk: "medium", revenue: "$95k"  },
  { region: "Canada — QC",   shipments: 480,   loads: 90,    risk: "high",   revenue: "$38k"  },
  { region: "Mexico — MX",   shipments: 320,   loads: 60,    risk: "high",   revenue: "$22k"  },
  { region: "EU (research)", shipments: 0,     loads: 0,     risk: "high",   revenue: "$0"    },
];

export const RISK_HOTSPOTS = [
  { region: "Southeast US", risk: "Equipment imbalance",       severity: "medium" },
  { region: "Canada — QC",  risk: "Privacy review incomplete", severity: "high" },
  { region: "Mexico — MX",  risk: "Billing / tax research",    severity: "high" },
  { region: "EU",           risk: "Data residency planning",   severity: "high" },
];

export const ACTIVITY_FEED = [
  { ts: "08:14", region: "Texas",       event: "Marketplace tender awarded — 18s TTA" },
  { ts: "08:09", region: "Midwest US",  event: "Carrier verification passed — 12 carriers" },
  { ts: "07:58", region: "Canada — ON", event: "Pilot shipment delivered on-time" },
  { ts: "07:42", region: "EU",          event: "Outside counsel intake confirmed" },
];

export const COUNTRY_READINESS = [
  { country: "United States",  priority: "Tier 1", demand: 96, carriers: 92, partners: 84, localization: 95, billing: 88, residency: 60, privacy: 70, compliance: 78, support: 84, legal: "complete",   risk: "low",    recommendation: "Operate" },
  { country: "Canada",         priority: "Tier 1", demand: 72, carriers: 58, partners: 51, localization: 60, billing: 65, residency: 45, privacy: 50, compliance: 55, support: 60, legal: "in_review",  risk: "medium", recommendation: "Pilot" },
  { country: "Mexico",         priority: "Tier 2", demand: 58, carriers: 40, partners: 32, localization: 40, billing: 35, residency: 35, privacy: 42, compliance: 38, support: 42, legal: "research",   risk: "high",   recommendation: "Research" },
  { country: "United Kingdom", priority: "Tier 2", demand: 48, carriers: 18, partners: 22, localization: 30, billing: 35, residency: 25, privacy: 35, compliance: 30, support: 30, legal: "research",   risk: "high",   recommendation: "Research" },
  { country: "Germany",        priority: "Tier 2", demand: 42, carriers: 14, partners: 18, localization: 18, billing: 28, residency: 22, privacy: 28, compliance: 25, support: 22, legal: "research",   risk: "high",   recommendation: "Research" },
  { country: "Australia",      priority: "Tier 3", demand: 32, carriers: 10, partners: 12, localization: 35, billing: 30, residency: 28, privacy: 30, compliance: 28, support: 25, legal: "research",   risk: "high",   recommendation: "Watch"    },
];

export const DATA_RESIDENCY = [
  { region: "US",     data_type: "Customer data",      required: "US",      current: "US",     risk: "low",    legal: "complete"  },
  { region: "US",     data_type: "Driver GPS",         required: "US",      current: "US",     risk: "low",    legal: "complete"  },
  { region: "Canada", data_type: "Customer data",      required: "Canada?", current: "US",     risk: "medium", legal: "in_review" },
  { region: "Canada", data_type: "Driver GPS",         required: "Canada?", current: "US",     risk: "medium", legal: "in_review" },
  { region: "EU",     data_type: "Customer data",      required: "EU",      current: "US",     risk: "high",   legal: "research"  },
  { region: "EU",     data_type: "Driver GPS",         required: "EU",      current: "US",     risk: "high",   legal: "research"  },
  { region: "EU",     data_type: "Voice transcripts",  required: "EU",      current: "US",     risk: "high",   legal: "research"  },
  { region: "EU",     data_type: "AI logs",            required: "EU",      current: "US",     risk: "high",   legal: "research"  },
  { region: "Mexico", data_type: "Billing data",       required: "MX?",     current: "US",     risk: "medium", legal: "research"  },
];

export const CROSS_BORDER_SHIPMENTS = [
  { id: "XB-1041", origin: "USA", dest: "Canada", carrier: "ACME XB", customs: "placeholder", invoice: "placeholder", broker: "placeholder", checkpoint: "Detroit-Windsor", status: "in_transit" },
  { id: "XB-1042", origin: "USA", dest: "Mexico", carrier: "Border Logistics", customs: "placeholder", invoice: "placeholder", broker: "placeholder", checkpoint: "Laredo", status: "documents_pending" },
];

export const CROSS_BORDER_TIMELINE = [
  { ts: "Day 0 08:00", event: "Tender accepted (Toronto → Chicago)" },
  { ts: "Day 0 14:00", event: "Customs documents collected (placeholder)" },
  { ts: "Day 1 03:20", event: "Border crossing — Detroit/Windsor (placeholder)" },
  { ts: "Day 1 09:15", event: "Customs cleared (placeholder)" },
  { ts: "Day 1 19:40", event: "Delivered" },
];

export const REGULATED_CONTROLS = [
  { area: "Access control",        owner: "Security",   status: "pass",   evidence: "complete",   freq: "quarterly" },
  { area: "Data privacy",          owner: "Legal",      status: "pass",   evidence: "complete",   freq: "quarterly" },
  { area: "Location consent",      owner: "Mobile",     status: "pass",   evidence: "complete",   freq: "quarterly" },
  { area: "Data retention",        owner: "Security",   status: "pass",   evidence: "in_review",  freq: "quarterly" },
  { area: "Audit logging",         owner: "Platform",   status: "pass",   evidence: "complete",   freq: "monthly"   },
  { area: "Financial controls",    owner: "Finance",    status: "needs",  evidence: "in_review",  freq: "quarterly" },
  { area: "API key controls",      owner: "Security",   status: "pass",   evidence: "complete",   freq: "quarterly" },
  { area: "EDI controls",          owner: "Integrations", status: "pass", evidence: "complete",   freq: "quarterly" },
  { area: "Marketplace controls",  owner: "Marketplace", status: "pass",  evidence: "complete",   freq: "quarterly" },
  { area: "AI governance",         owner: "AI",         status: "pass",   evidence: "complete",   freq: "monthly"   },
  { area: "Support access",        owner: "Support",    status: "pass",   evidence: "in_review",  freq: "quarterly" },
  { area: "Vendor risk",           owner: "Security",   status: "needs",  evidence: "drafting",   freq: "quarterly" },
  { area: "Incident response",     owner: "Security",   status: "pass",   evidence: "complete",   freq: "quarterly" },
  { area: "Change management",     owner: "Platform",   status: "pass",   evidence: "complete",   freq: "monthly"   },
  { area: "Evidence collection",   owner: "Security",   status: "pass",   evidence: "in_review",  freq: "monthly"   },
  { area: "Policy acknowledgments",owner: "People",     status: "needs",  evidence: "drafting",   freq: "annually"  },
];

export const CONTROL_EXCEPTIONS = [
  { control: "Financial controls", owner: "Finance",  age_days: 12, severity: "medium", note: "Evidence package in review" },
  { control: "Vendor risk",        owner: "Security", age_days: 19, severity: "medium", note: "Two vendors missing SOC 2" },
];

export const GLOBAL_COMPLIANCE_MATRIX = [
  { region: "US",     privacy: "pass", security: "pass", financial: "in_review", marketplace: "pass",  carrier: "pass",  driver: "pass",  customer: "pass",  ai: "pass",  api: "pass",  edi: "pass",  mobile: "pass",  retention: "pass",  incident: "pass" },
  { region: "Canada", privacy: "in_review", security: "pass", financial: "in_review", marketplace: "pass", carrier: "pass", driver: "in_review", customer: "in_review", ai: "pass", api: "pass", edi: "pass", mobile: "pass", retention: "in_review", incident: "pass" },
  { region: "Mexico", privacy: "research",  security: "pass", financial: "research",  marketplace: "pass", carrier: "research", driver: "research", customer: "research", ai: "pass", api: "pass", edi: "pass", mobile: "pass", retention: "research", incident: "pass" },
  { region: "EU",     privacy: "research",  security: "pass", financial: "research",  marketplace: "research", carrier: "research", driver: "research", customer: "research", ai: "research", api: "pass", edi: "pass", mobile: "research", retention: "research", incident: "research" },
];

export const COMPLIANCE_GAPS = [
  { region: "Canada", area: "Driver privacy",    severity: "medium", owner: "Legal",    eta: "Q1" },
  { region: "EU",     area: "Data residency",    severity: "high",   owner: "Security", eta: "Q2" },
  { region: "Mexico", area: "Billing/tax",       severity: "high",   owner: "Finance",  eta: "Q2" },
  { region: "EU",     area: "AI transparency",   severity: "high",   owner: "AI Gov",   eta: "Q2" },
];

export const REGULATED_AI_POLICIES = [
  { policy: "Action approval required",      scope: "Financial / compliance actions", status: "enforced" },
  { policy: "Confidence threshold ≥ 0.75",   scope: "Customer-facing comms",          status: "enforced" },
  { policy: "Explanation required",          scope: "Dispatch + pricing",             status: "enforced" },
  { policy: "Data freshness ≤ 5 min",        scope: "Live operations",                status: "enforced" },
  { policy: "Provider config logged",        scope: "All requests",                   status: "enforced" },
  { policy: "Usage cost cap",                scope: "Per-tenant daily",               status: "enforced" },
  { policy: "Safety incident playbook",      scope: "All",                            status: "drafted"  },
];

export const AI_RESTRICTIONS = [
  { action: "Issue refund",          allowed: false, reason: "Financial restriction" },
  { action: "Lock carrier account",  allowed: false, reason: "Compliance restriction" },
  { action: "Suggest dispatch",      allowed: true,  reason: "Human approval required" },
  { action: "Draft customer email",  allowed: true,  reason: "Sent after approval" },
];

export const MARKETPLACE_INTEL = {
  liquidity_by_region: [
    { region: "Texas",       liquidity: 92 },
    { region: "Midwest",     liquidity: 88 },
    { region: "Northeast",   liquidity: 76 },
    { region: "Southeast",   liquidity: 58 },
    { region: "West",        liquidity: 71 },
    { region: "Canada-ON",   liquidity: 42 },
  ],
  coverage_rate: 91, avg_bids: 4.6, time_to_first_bid: "00:38", time_to_award: "00:52",
  no_show_risk: 2.1, dispute_risk: 1.4, revenue_quality: 84,
};

export const CONCENTRATION_RISK = [
  { entity: "Top 5 carriers",   share: 32, severity: "medium" },
  { entity: "Top 10 customers", share: 41, severity: "medium" },
  { entity: "Top lane (DFW–LAX)", share: 9, severity: "low" },
];

export const MARKETPLACE_OPPORTUNITIES = [
  { lane: "Houston → Atlanta", insight: "Supply > demand 18%", action: "Customer outreach" },
  { lane: "Chicago → Denver",  insight: "Demand > supply 22%", action: "Carrier recruitment" },
  { lane: "Toronto → Detroit", insight: "Cross-border premium 12%", action: "Premium tier" },
];

export const TRUST_SAFETY = {
  score: 86,
  watchlist: 14, suspensions: 3, reinstatements: 1, fraud_flags: 6, complaints: 11,
};

export const TRUST_QUEUE = [
  { carrier: "Phantom Freight LLC", reason: "No-show pattern", risk: "high",   action: "Suspend" },
  { carrier: "Quick Haul Inc",      reason: "Customer complaint", risk: "medium", action: "Review" },
  { carrier: "Sunrise Carriers",    reason: "Cert expired",     risk: "medium", action: "Reinstate after cert" },
];

export const FINANCIAL_MATURITY = {
  score: 74,
  pillars: [
    { pillar: "Billing controls",   score: 86 },
    { pillar: "Usage billing",      score: 78 },
    { pillar: "Marketplace fees",   score: 82 },
    { pillar: "API billing",        score: 71 },
    { pillar: "Partner revshare",   score: 68 },
    { pillar: "Revenue events",     score: 64 },
    { pillar: "Invoice accuracy",   score: 89 },
    { pillar: "Manual adjustments", score: 72 },
    { pillar: "Audit trail",        score: 76 },
  ],
};

export const REVENUE_MIX = [
  { line: "SaaS",         pct: 48 },
  { line: "Marketplace",  pct: 28 },
  { line: "API",          pct: 9  },
  { line: "EDI",          pct: 5  },
  { line: "Partner",      pct: 6  },
  { line: "Support",      pct: 4  },
];

export const FINANCIAL_AUDIT = {
  score: 49,
  checklist: [
    { item: "Revenue event completeness",   status: "in_review" },
    { item: "Invoice audit trail",          status: "complete"  },
    { item: "Subscription change audit",    status: "in_review" },
    { item: "Marketplace fee audit",        status: "in_review" },
    { item: "API usage audit",              status: "drafting"  },
    { item: "Manual adjustment approval",   status: "complete"  },
    { item: "Refund/credit log",            status: "drafting"  },
    { item: "Payment status logs",          status: "complete"  },
    { item: "Control evidence packs",       status: "in_review" },
    { item: "Billing webhook logs",         status: "complete"  },
    { item: "Reconciliation placeholder",   status: "placeholder" },
    { item: "Audit package readiness",      status: "placeholder" },
  ],
};

export const GLOBAL_REVENUE = [
  { region: "US",          saas: 420, marketplace: 240, api: 80, edi: 40, partner: 50, support: 30 },
  { region: "Canada",      saas: 38,  marketplace: 18,  api: 4,  edi: 2,  partner: 2,  support: 2  },
  { region: "Mexico",      saas: 12,  marketplace: 6,   api: 1,  edi: 0,  partner: 0,  support: 1  },
  { region: "EU (planned)",saas: 0,   marketplace: 0,   api: 0,  edi: 0,  partner: 0,  support: 0  },
];

export const CURRENCY_READINESS = [
  { currency: "USD", status: "ready" }, { currency: "CAD", status: "in_review" },
  { currency: "MXN", status: "research" }, { currency: "EUR", status: "research" },
  { currency: "GBP", status: "research" },
];

export const TAX_READINESS = [
  { region: "US",     status: "ready" }, { region: "Canada", status: "in_review" },
  { region: "Mexico", status: "research" }, { region: "EU",     status: "research" },
];

export const PARTNER_ECOSYSTEM = [
  { partner: "Samsara",      category: "Telematics",   region: "US/Canada", status: "active",   risk: "low" },
  { partner: "Geotab",       category: "Telematics",   region: "US/Canada", status: "active",   risk: "low" },
  { partner: "DAT",          category: "Carrier net",  region: "US",        status: "active",   risk: "low" },
  { partner: "Truckstop",    category: "Carrier net",  region: "US",        status: "active",   risk: "low" },
  { partner: "HERE Maps",    category: "Maps/Routing", region: "Global",    status: "review",   risk: "medium" },
  { partner: "Mapbox",       category: "Maps/Routing", region: "Global",    status: "active",   risk: "low" },
  { partner: "QuickBooks",   category: "Accounting",   region: "US",        status: "active",   risk: "low" },
  { partner: "Xero",         category: "Accounting",   region: "Global",    status: "review",   risk: "medium" },
  { partner: "WEX",          category: "Fuel cards",   region: "US",        status: "active",   risk: "low" },
  { partner: "EDI Co",       category: "EDI",          region: "US",        status: "launch_ready", risk: "low" },
  { partner: "InsureTech",   category: "Insurance",    region: "US",        status: "placeholder", risk: "medium" },
  { partner: "OpenAI",       category: "AI provider",  region: "Global",    status: "active",   risk: "medium" },
];

export const INTL_PARTNER_LISTINGS = [
  { listing: "Samsara connector",      region: "North America", availability: "GA",        revshare: "—",   status: "approved" },
  { listing: "Geotab connector",       region: "North America", availability: "GA",        revshare: "—",   status: "approved" },
  { listing: "HERE Maps routing",      region: "Global",        availability: "preview",   revshare: "12%", status: "review"   },
  { listing: "Xero accounting",        region: "Global",        availability: "preview",   revshare: "—",   status: "review"   },
  { listing: "Canada EDI gateway",     region: "Canada",        availability: "launching", revshare: "—",   status: "launch_ready" },
];

export const ENTERPRISE_CUSTOMERS = [
  { account: "MidwestCo",   region: "US",     products: "SaaS+API+EDI", localization: "n/a", billing: "monthly", residency: "US",     security_review: "complete",  expansion: "Canada", risk: "low" },
  { account: "NorthFreight",region: "US/Canada", products: "SaaS+Marketplace", localization: "FR-CA pending", billing: "monthly", residency: "in_review", security_review: "complete", expansion: "Quebec", risk: "medium" },
  { account: "MexLogistics",region: "Mexico", products: "SaaS pilot",   localization: "ES pending", billing: "research", residency: "research", security_review: "in_review", expansion: "Pilot", risk: "high" },
];

export const SUPPORT_MODEL = [
  { region: "North America", coverage: "24x7",   languages: "EN, FR",     tiers: "T1-T3", escalation: "Sev-1 < 15m", burden: 64 },
  { region: "Canada",        coverage: "24x7",   languages: "EN, FR",     tiers: "T1-T3", escalation: "Sev-1 < 15m", burden: 18 },
  { region: "Mexico",        coverage: "Biz hr", languages: "ES (plan)",  tiers: "T1",    escalation: "Sev-1 < 60m", burden: 6  },
  { region: "EU",            coverage: "—",      languages: "EN (plan)",  tiers: "—",     escalation: "—",           burden: 0  },
];

export const EXEC_KPIS = [
  { label: "Global readiness",      value: 67 },
  { label: "Regional health",       value: 78 },
  { label: "Marketplace liquidity", value: 78 },
  { label: "Partner readiness",     value: 71 },
  { label: "Financial maturity",    value: 74 },
  { label: "Compliance maturity",   value: 62 },
  { label: "Support readiness",     value: 63 },
  { label: "Mobile readiness",      value: 76 },
  { label: "Revenue quality",       value: 84 },
];

export const EXEC_DECISIONS = [
  { decision: "Approve Canada pilot launch",      owner: "CEO",   status: "ready"   },
  { decision: "Fund EU data residency study",     owner: "CFO",   status: "review"  },
  { decision: "Hire EU customer success lead",    owner: "CRO",   status: "review"  },
  { decision: "International partner GTM plan",   owner: "CRO",   status: "drafting"},
];

export const GLOBAL_RISKS = [
  { category: "Country launch",       risk: "Canada pilot scope creep",      severity: "medium", owner: "COO",      mitigation: "Limit to 3 lanes" },
  { category: "Compliance",           risk: "EU privacy gap",                severity: "high",   owner: "Legal",    mitigation: "Outside counsel" },
  { category: "Data residency",       risk: "EU/UK pinning incomplete",      severity: "high",   owner: "Security", mitigation: "Vendor scoping" },
  { category: "Financial controls",   risk: "Revenue rec gaps",              severity: "medium", owner: "CFO",      mitigation: "Q1 audit plan" },
  { category: "Billing/tax",          risk: "MX tax research",               severity: "high",   owner: "Finance",  mitigation: "Local advisor" },
  { category: "Marketplace liquidity",risk: "Southeast imbalance",           severity: "medium", owner: "Mkt lead", mitigation: "Carrier recruit" },
  { category: "Partner",              risk: "HERE Maps SLA",                 severity: "medium", owner: "Partners", mitigation: "Dual provider" },
  { category: "Support coverage",     risk: "EU timezone gap",               severity: "medium", owner: "Support",  mitigation: "Hire EU lead" },
  { category: "Localization",         risk: "ES/FR backlog",                 severity: "medium", owner: "Product",  mitigation: "Translation vendor" },
  { category: "Security",             risk: "Pen test schedule",             severity: "low",    owner: "Security", mitigation: "Q2 retest" },
  { category: "Mobile approval",      risk: "Android Auto cert",             severity: "low",    owner: "Mobile",   mitigation: "Documented" },
  { category: "AI governance",        risk: "EU AI Act tracking",            severity: "high",   owner: "AI Gov",   mitigation: "Policy update" },
  { category: "Concentration",        risk: "Top 10 customers 41%",          severity: "medium", owner: "CRO",      mitigation: "Diversify pipeline" },
  { category: "Regional revenue",     risk: "Non-US revenue < 8%",           severity: "medium", owner: "CFO",      mitigation: "Canada pilot" },
];

export const EXPANSION_HORIZONS = [
  { horizon: "Current quarter", focus: "Canada pilot launch, EU privacy intake, MX research" },
  { horizon: "Next quarter",    focus: "Quebec rollout, EU residency vendor selection" },
  { horizon: "6 months",        focus: "Mexico controlled pilot, EU compliance research complete" },
  { horizon: "12 months",       focus: "UK research → pilot, EU GA decision" },
  { horizon: "24 months",       focus: "EU GA, Australia research" },
  { horizon: "36 months",       focus: "Global operating maturity, 5+ countries live" },
];

export const COUNTRY_LAUNCH_PLANS = [
  { country: "Canada",  phase: "Pilot",    next_milestone: "3 lanes live",          owner: "COO" },
  { country: "Mexico",  phase: "Research", next_milestone: "Tax + billing scope",   owner: "CFO" },
  { country: "UK",      phase: "Research", next_milestone: "Privacy review",        owner: "Legal" },
  { country: "Germany", phase: "Research", next_milestone: "Demand validation",     owner: "CRO" },
];

export const V7_REPORTS = [
  "Global logistics operating network",
  "Global readiness",
  "Country/region readiness",
  "Data residency planning",
  "Cross-border workflows",
  "Regulated enterprise controls",
  "Global compliance controls",
  "Regulated AI governance",
  "Marketplace intelligence",
  "Trust + safety maturity",
  "Platform financial maturity",
  "Financial audit readiness placeholder",
  "Global revenue operations",
  "Global partner ecosystem",
  "International partner marketplace",
  "Global enterprise customer readiness",
  "Global support operating model",
  "Strategic global risk",
  "Global expansion roadmap",
];
