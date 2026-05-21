// V8 mock dataset — Phase 29 (global operating network scale).
// Mock-only; no live SLA / compliance / financial claims.

export const V8_FEATURE_MATRIX = [
  { area: "Global operating network scale",     status: "shipped",     notes: "Network metrics + scale score" },
  { area: "Country operating command centers",  status: "shipped",     notes: "Per-country health + decisions" },
  { area: "International marketplace expansion", status: "shipped",    notes: "Country coverage + readiness" },
  { area: "Regional marketplace liquidity",     status: "shipped",     notes: "Lane / equipment liquidity" },
  { area: "International carrier operations",   status: "shipped",     notes: "Country onboarding + eligibility" },
  { area: "Cross-border operating controls",    status: "placeholder", notes: "Checklist + audit only" },
  { area: "Financial control maturity",         status: "shipped",     notes: "Maturity score + control tests" },
  { area: "Revenue reconciliation maturity",    status: "placeholder", notes: "Matching only — not GAAP" },
  { area: "Global billing & usage controls",    status: "shipped",     notes: "Country billing + adjustments" },
  { area: "Advanced compliance execution",      status: "shipped",     notes: "Owners + evidence + exceptions" },
  { area: "Country compliance execution",       status: "shipped",     notes: "Per-country control matrix" },
  { area: "Global customer success operations", status: "shipped",     notes: "Health + adoption + renewal" },
  { area: "International support operations",   status: "shipped",     notes: "Coverage + SLA + escalations" },
  { area: "Global partner operations",          status: "shipped",     notes: "Country + integration health" },
  { area: "Executive strategic governance",     status: "shipped",     notes: "Decision queue + workflow" },
  { area: "Board-level global strategy",        status: "shipped",     notes: "12-section board report" },
  { area: "Global risk & control center",       status: "shipped",     notes: "14-area risk matrix" },
  { area: "Global product adoption",            status: "shipped",     notes: "Country + region adoption" },
  { area: "Regional expansion decision engine", status: "shipped",     notes: "Inputs → recommendation" },
  { area: "Long-term global operating model",   status: "shipped",     notes: "13 operating areas" },
];

export const V8_DEFERRED = [
  "Fully autonomous dispatch",
  "Final legal compliance claims",
  "Final financial audit / SOC 2 / ISO claims",
  "Final Android Auto / CarPlay claims",
  "Full international tax automation",
  "Full customs production workflows",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
];

export const V8_GLOBAL_SCALE = {
  score: 76,
  level: "Scaling",
  trend_pts: +4,
  countries_active: 1,
  countries_pilot: 1,
  countries_planning: 1,
  countries_research: 2,
};

export const V8_SCALE_TREND = [
  { week: "W-5", score: 68, countries_live: 1 },
  { week: "W-4", score: 70, countries_live: 1 },
  { week: "W-3", score: 72, countries_live: 1 },
  { week: "W-2", score: 73, countries_live: 1 },
  { week: "W-1", score: 75, countries_live: 1 },
  { week: "W-0", score: 76, countries_live: 1 },
];

export const GLOBAL_NETWORK_METRICS = [
  { metric: "Active countries",          value: 1,        sub: "USA live" },
  { metric: "Active regions",            value: 4,        sub: "NE, SE, MW, W" },
  { metric: "Active companies",          value: 42,       sub: "Carriers + brokers" },
  { metric: "Enterprise customers",      value: 6,        sub: "2 regulated" },
  { metric: "Active dispatchers",        value: 138,      sub: "Across customers" },
  { metric: "Active drivers",            value: 612,      sub: "+18 WoW" },
  { metric: "Active vehicles",           value: 580,      sub: "Telematics-linked" },
  { metric: "Active carriers",           value: 96,       sub: "Marketplace + private" },
  { metric: "Active customer users",     value: 218,      sub: "Portal logins" },
  { metric: "Active loads (7d)",         value: 1840,     sub: "Across tenants" },
  { metric: "Shipments (7d)",            value: 1612,     sub: "Tendered" },
  { metric: "Marketplace loads (7d)",    value: 246,      sub: "Posted to board" },
  { metric: "API calls (24h)",           value: 184_300,  sub: "Across customers" },
  { metric: "EDI transactions (24h)",    value: 12_410,   sub: "204/214/990" },
  { metric: "Webhook deliveries (24h)",  value: 9_220,    sub: "98.7% success" },
  { metric: "Mobile sessions (24h)",     value: 1_440,    sub: "Driver app" },
  { metric: "Portal sessions (24h)",     value: 372,      sub: "Customer portal" },
  { metric: "CoPilot actions (24h)",     value: 612,      sub: "Approved" },
  { metric: "Support tickets (7d)",      value: 84,       sub: "All severities" },
  { metric: "Revenue events (7d)",       value: 1_482,    sub: "Tracked" },
];

export const REGIONAL_HOTSPOTS = [
  { region: "USA · NE",  risk: 18, opportunity: 64 },
  { region: "USA · SE",  risk: 22, opportunity: 71 },
  { region: "USA · MW",  risk: 14, opportunity: 58 },
  { region: "USA · W",   risk: 26, opportunity: 67 },
  { region: "Canada · ON", risk: 38, opportunity: 52 },
  { region: "Mexico · MX-N", risk: 56, opportunity: 44 },
];

export const COUNTRY_CENTERS = [
  { country: "USA",    phase: "Active",            health: 84, marketplace: 81, compliance: 78, financial: 82, residency_risk: "low",    partner: 78, billing: 86, success: 83, blockers: 1, decisions: 0 },
  { country: "Canada", phase: "Controlled Pilot",  health: 79, marketplace: 72, compliance: 68, financial: 74, residency_risk: "medium", partner: 70, billing: 74, success: 76, blockers: 3, decisions: 2 },
  { country: "Mexico", phase: "Planning",          health: 54, marketplace: 41, compliance: 48, financial: 52, residency_risk: "medium", partner: 38, billing: 46, success: 50, blockers: 6, decisions: 1 },
  { country: "EU",     phase: "Research",          health: 31, marketplace: 18, compliance: 22, financial: 28, residency_risk: "high",   partner: 12, billing: 18, success: 24, blockers: 9, decisions: 1 },
  { country: "UK",     phase: "Research",          health: 36, marketplace: 22, compliance: 28, financial: 34, residency_risk: "medium", partner: 18, billing: 24, success: 28, blockers: 7, decisions: 0 },
];

export const INTL_MARKETPLACE = [
  { country: "USA",    state: "Active",            carriers: 96, demand: 1840, equipment_cov: 92, ttfb_min: 4,  ttaward_min: 22, gaps: 2, quality: 86, compliance: 88, disputes: 3 },
  { country: "Canada", state: "Pilot",             carriers: 18, demand: 84,   equipment_cov: 64, ttfb_min: 9,  ttaward_min: 41, gaps: 4, quality: 74, compliance: 70, disputes: 1 },
  { country: "Mexico", state: "Planning",          carriers: 4,  demand: 0,    equipment_cov: 28, ttfb_min: 0,  ttaward_min: 0,  gaps: 8, quality: 0,  compliance: 0,  disputes: 0 },
];

export const MARKETPLACE_REC = [
  { country: "Canada", recommendation: "Recruit reefer carriers in ON corridor", owner: "Marketplace lead" },
  { country: "Canada", recommendation: "Tighten carrier verification SLA",       owner: "Carrier ops" },
  { country: "Mexico", recommendation: "Hold expansion until partner readiness", owner: "Strategy" },
];

export const REGIONAL_LIQUIDITY = [
  { region: "USA · NE",     liquidity: 82, coverage: 94, uncovered: 6,  avg_bids: 5.2, carrier_avail: "high",   equip: "high",   accept: 71, ttaward_min: 21, trust: 84, conc_carrier: 18, conc_customer: 22 },
  { region: "USA · SE",     liquidity: 78, coverage: 91, uncovered: 12, avg_bids: 4.7, carrier_avail: "high",   equip: "medium", accept: 68, ttaward_min: 24, trust: 81, conc_carrier: 22, conc_customer: 18 },
  { region: "USA · MW",     liquidity: 74, coverage: 88, uncovered: 18, avg_bids: 4.1, carrier_avail: "medium", equip: "medium", accept: 65, ttaward_min: 28, trust: 79, conc_carrier: 26, conc_customer: 24 },
  { region: "USA · W",      liquidity: 69, coverage: 84, uncovered: 22, avg_bids: 3.8, carrier_avail: "medium", equip: "low",    accept: 61, ttaward_min: 31, trust: 76, conc_carrier: 28, conc_customer: 21 },
  { region: "Canada · ON",  liquidity: 58, coverage: 72, uncovered: 14, avg_bids: 2.4, carrier_avail: "low",    equip: "low",    accept: 54, ttaward_min: 42, trust: 68, conc_carrier: 36, conc_customer: 32 },
];

export const LANE_HEATMAP = [
  { lane: "NYC → ATL", liquidity: 88 },
  { lane: "CHI → DAL", liquidity: 81 },
  { lane: "LA  → SEA", liquidity: 74 },
  { lane: "TOR → MTL", liquidity: 56 },
  { lane: "TOR → DET", liquidity: 48 },
];

export const INTL_CARRIER_OPS = [
  { carrier: "Northbound Freight",  country: "Canada", status: "Verified",   compliance: "pass",    equipment: "Van, Reefer", coverage: "ON, QC", marketplace: "eligible",   quality: 84 },
  { carrier: "ON Logistics",        country: "Canada", status: "Under review", compliance: "pending", equipment: "Box truck",   coverage: "ON",     marketplace: "pending",    quality: 0  },
  { carrier: "Maple Cargo",         country: "Canada", status: "Verified",   compliance: "pass",    equipment: "Van",         coverage: "ON",     marketplace: "eligible",   quality: 78 },
  { carrier: "Sunbelt Express",     country: "USA",    status: "Verified",   compliance: "pass",    equipment: "Van, Flatbed",coverage: "NE, SE", marketplace: "eligible",   quality: 88 },
  { carrier: "Frontera Transport",  country: "Mexico", status: "Onboarding", compliance: "pending", equipment: "Van",         coverage: "MX-N",   marketplace: "ineligible", quality: 0  },
];

export const CARRIER_ELIGIBILITY_RULES = [
  { country: "USA",    rule: "Active MC/DOT + insurance",      enforced: true  },
  { country: "USA",    rule: "Marketplace policy v3 accepted", enforced: true  },
  { country: "Canada", rule: "Active CVOR + insurance",        enforced: true  },
  { country: "Canada", rule: "Bilingual customer SLA",         enforced: false },
  { country: "Mexico", rule: "SCT registration verified",      enforced: false },
];

export const CROSS_BORDER_CHECKLIST = [
  { item: "Shipper approves cross-border execution",   status: "required", category: "approval" },
  { item: "Customs broker assigned",                   status: "required", category: "broker"   },
  { item: "Commercial invoice attached",               status: "required", category: "document" },
  { item: "PARS/PAPS number captured",                 status: "required", category: "document" },
  { item: "Country risk reviewed",                     status: "required", category: "risk"     },
  { item: "Carrier eligibility confirmed",             status: "required", category: "carrier"  },
  { item: "Customer cross-border communication sent",  status: "required", category: "comms"    },
  { item: "Data residency check passed",               status: "required", category: "privacy"  },
  { item: "Compliance exception reviewed (if any)",    status: "conditional", category: "comp"  },
  { item: "Border milestones tracked (US ↔ CA)",       status: "tracked",  category: "ops"      },
];

export const CROSS_BORDER_SHIPMENTS = [
  { id: "XB-1041", lane: "Detroit → Windsor", broker: "Assigned", docs: "Complete",   approval: "approved", residency: "passed", status: "in-transit" },
  { id: "XB-1042", lane: "Buffalo → Toronto", broker: "Assigned", docs: "Missing PARS", approval: "approved", residency: "passed", status: "blocked"   },
  { id: "XB-1043", lane: "Laredo → Monterrey", broker: "Pending",  docs: "Incomplete", approval: "pending",  residency: "review", status: "deferred"  },
];

export const FINANCIAL_CONTROL_MATURITY = {
  score: 71,
  billing_maturity: 78,
  usage_maturity: 72,
  marketplace_fee_maturity: 76,
  api_overage_maturity: 58,
  partner_revshare_maturity: 64,
  carrier_settlement_maturity: 52,
  manual_adjustments_open: 4,
  disputes_open: 2,
  evidence_completeness: 68,
  exceptions_open: 6,
};

export const FINANCIAL_CONTROL_TESTS = [
  { control: "Subscription invoice generation",   owner: "Billing ops", status: "pass", evidence: "logs+sample" },
  { control: "Usage rating accuracy",             owner: "Billing eng", status: "pass", evidence: "diff report" },
  { control: "Marketplace fee calculation",       owner: "Finance",     status: "pass", evidence: "ledger sample" },
  { control: "API overage billing",               owner: "Billing ops", status: "review", evidence: "missing replay" },
  { control: "Partner revenue share calc",        owner: "Finance",     status: "review", evidence: "missing approval" },
  { control: "Carrier settlement placeholder",    owner: "Ops",         status: "deferred", evidence: "n/a" },
  { control: "Manual adjustment approval",        owner: "Finance",     status: "pass", evidence: "approval log" },
  { control: "Billing dispute workflow",          owner: "Support",     status: "pass", evidence: "ticket log" },
];

export const REVENUE_RECON_EVENTS_V8 = [
  { source: "Subscription",      events: 412, matched: 410, unmatched: 2,  owner: "Finance" },
  { source: "Usage",             events: 386, matched: 380, unmatched: 6,  owner: "Billing eng" },
  { source: "Marketplace fee",   events: 124, matched: 120, unmatched: 4,  owner: "Finance" },
  { source: "API overage",       events: 58,  matched: 52,  unmatched: 6,  owner: "Billing ops" },
  { source: "Partner revshare",  events: 24,  matched: 20,  unmatched: 4,  owner: "Finance" },
  { source: "Carrier settlement", events: 0,  matched: 0,   unmatched: 0,  owner: "Ops" },
  { source: "Invoices",          events: 88,  matched: 86,  unmatched: 2,  owner: "Finance" },
  { source: "Payments",          events: 76,  matched: 74,  unmatched: 2,  owner: "Finance" },
];

export const REVENUE_RECON_SUMMARY_V8 = { matched: 1242, unmatched: 26, exceptions_open: 6, evidence: "tracker only" };

export const GLOBAL_BILLING_COUNTRIES = [
  { country: "USA",    subscriptions: 12, usage: "active", marketplace_fees: "active", api: "active",  partner: "active", webhook_failures: 4, failed_payments: 2, disputes: 1, adjustments: 2, currency: "USD",  tax: "tracked",     localization: "n/a" },
  { country: "Canada", subscriptions: 3,  usage: "pilot",  marketplace_fees: "pilot",  api: "pilot",   partner: "pilot",  webhook_failures: 2, failed_payments: 1, disputes: 0, adjustments: 1, currency: "CAD",  tax: "placeholder", localization: "EN+FR placeholder" },
  { country: "Mexico", subscriptions: 0,  usage: "n/a",    marketplace_fees: "n/a",    api: "n/a",     partner: "n/a",    webhook_failures: 0, failed_payments: 0, disputes: 0, adjustments: 0, currency: "MXN",  tax: "research",    localization: "ES research" },
  { country: "EU",     subscriptions: 0,  usage: "n/a",    marketplace_fees: "n/a",    api: "n/a",     partner: "n/a",    webhook_failures: 0, failed_payments: 0, disputes: 0, adjustments: 0, currency: "EUR",  tax: "research",    localization: "research" },
];

export const COMPLIANCE_EXEC_V8 = {
  score: 72,
  controls_total: 64,
  controls_passing: 46,
  controls_in_progress: 14,
  controls_failing: 4,
  exceptions_open: 7,
  evidence_completeness: 71,
  reviews_due_30d: 9,
};

export const COMPLIANCE_REGIONAL = [
  { region: "USA",    score: 84, owner: "Compliance",  evidence: "current", exceptions: 1 },
  { region: "Canada", score: 68, owner: "Compliance",  evidence: "in progress", exceptions: 3 },
  { region: "Mexico", score: 38, owner: "Strategy",    evidence: "not started", exceptions: 2 },
  { region: "EU",     score: 22, owner: "Strategy",    evidence: "not started", exceptions: 1 },
];

export const COUNTRY_COMPLIANCE_CANADA = [
  { control: "Privacy (PIPEDA scope)",     status: "in-progress", evidence: "draft",     owner: "Compliance" },
  { control: "Security baseline",          status: "pass",        evidence: "current",   owner: "Security" },
  { control: "Data residency (CA region)", status: "exception",   evidence: "pending",   owner: "Engineering" },
  { control: "Driver data handling",       status: "pass",        evidence: "current",   owner: "Privacy" },
  { control: "Customer data handling",     status: "in-progress", evidence: "draft",     owner: "Privacy" },
  { control: "Billing controls",           status: "pass",        evidence: "current",   owner: "Finance" },
  { control: "Marketplace controls",       status: "in-progress", evidence: "draft",     owner: "Marketplace" },
  { control: "API/EDI controls",           status: "pass",        evidence: "current",   owner: "Engineering" },
  { control: "Support access controls",    status: "pass",        evidence: "current",   owner: "Support" },
  { control: "AI governance",              status: "pass",        evidence: "current",   owner: "AI" },
  { control: "Mobile app controls",        status: "in-progress", evidence: "needed",    owner: "Mobile" },
  { control: "Legal review (placeholder)", status: "deferred",    evidence: "n/a",       owner: "Legal" },
];

export const GLOBAL_CUSTOMER_SUCCESS = {
  score: 81,
  accounts: 6,
  at_risk: 1,
  expansion_open: 4,
  regulated_strong: 2,
};

export const GLOBAL_ACCOUNTS = [
  { account: "Acme Carriers",      country: "USA",    health: 88, regulated: false, adoption: 84, renewal_risk: "low",    expansion: "high", success_owner: "AM-A", exec_sponsor: "COO" },
  { account: "BlueRail Logistics", country: "USA",    health: 76, regulated: true,  adoption: 72, renewal_risk: "low",    expansion: "med",  success_owner: "AM-B", exec_sponsor: "CCO" },
  { account: "Maple Freight",      country: "Canada", health: 74, regulated: true,  adoption: 68, renewal_risk: "low",    expansion: "med",  success_owner: "AM-A", exec_sponsor: "CCO" },
  { account: "Northern Star",      country: "Canada", health: 62, regulated: false, adoption: 58, renewal_risk: "medium", expansion: "low",  success_owner: "AM-B", exec_sponsor: "COO" },
  { account: "Cross-Pac Shipping", country: "USA",    health: 54, regulated: false, adoption: 51, renewal_risk: "high",   expansion: "low",  success_owner: "AM-A", exec_sponsor: "COO" },
  { account: "Gulf Carriers",      country: "USA",    health: 82, regulated: false, adoption: 78, renewal_risk: "low",    expansion: "high", success_owner: "AM-B", exec_sponsor: "COO" },
];

export const INTL_SUPPORT_OPS = [
  { region: "Americas · EST", timezone: "GMT-5", language: "EN",     sla: 96, escalations: 2, critical: 0, kb: "current" },
  { region: "Americas · CST", timezone: "GMT-6", language: "EN/ES placeholder", sla: 94, escalations: 1, critical: 0, kb: "current" },
  { region: "Americas · PST", timezone: "GMT-8", language: "EN",     sla: 92, escalations: 3, critical: 0, kb: "current" },
  { region: "Canada · EST",   timezone: "GMT-5", language: "EN/FR placeholder", sla: 88, escalations: 4, critical: 1, kb: "in progress" },
];

export const SUPPORT_VOLUME = [
  { surface: "Driver mobile",   volume: 28 },
  { surface: "Customer portal", volume: 22 },
  { surface: "Marketplace",     volume: 14 },
  { surface: "API/EDI",         volume: 12 },
  { surface: "Partner",         volume: 8  },
];

export const GLOBAL_PARTNER_OPS = [
  { partner: "FuelCard Co",       country: "USA",    category: "Fuel",      launch: "live",    security: "pass", compliance: "pass", integration: 92, support: "low",  joint_customers: 4, revenue_placeholder: "tracked", risk: "low",    opportunity: "high" },
  { partner: "ELDPartner",        country: "USA",    category: "Telematics", launch: "live",   security: "pass", compliance: "pass", integration: 88, support: "med",  joint_customers: 6, revenue_placeholder: "tracked", risk: "low",    opportunity: "high" },
  { partner: "FactorFlow",        country: "USA",    category: "Factoring", launch: "live",    security: "pass", compliance: "pass", integration: 84, support: "low",  joint_customers: 3, revenue_placeholder: "tracked", risk: "low",    opportunity: "med"  },
  { partner: "CA Telematics Co",  country: "Canada", category: "Telematics", launch: "pilot",  security: "review", compliance: "review", integration: 62, support: "med", joint_customers: 1, revenue_placeholder: "tracked", risk: "med", opportunity: "med" },
  { partner: "Quebec Fuel",       country: "Canada", category: "Fuel",      launch: "planning", security: "tbd",  compliance: "tbd",  integration: 0,  support: "n/a",  joint_customers: 0, revenue_placeholder: "n/a",     risk: "med",    opportunity: "med"  },
];

export const PARTNER_ROADMAP = [
  { quarter: "Q1", item: "Canada telematics partner certification" },
  { quarter: "Q1", item: "Bilingual partner SLA template"          },
  { quarter: "Q2", item: "Mexico fuel partner research"            },
  { quarter: "Q2", item: "EU partner discovery"                    },
];

export const STRATEGIC_DECISIONS = [
  { id: "D-201", kind: "Country launch",          subject: "Canada — extend pilot 30 days",  owner: "CEO",  status: "pending",  due: "2026-06-04", oldest_days: 6 },
  { id: "D-202", kind: "Marketplace launch",      subject: "Canada — broaden reefer carriers", owner: "COO",  status: "pending", due: "2026-06-10", oldest_days: 3 },
  { id: "D-203", kind: "Financial exception",     subject: "USD/CAD billing adjustment",      owner: "CFO",  status: "pending",  due: "2026-06-01", oldest_days: 9 },
  { id: "D-204", kind: "Data residency",          subject: "CA region storage approval",      owner: "CTO",  status: "in-review", due: "2026-06-12", oldest_days: 2 },
  { id: "D-205", kind: "Regulated customer",      subject: "BlueRail control pack sign-off",  owner: "CCO",  status: "pending",  due: "2026-06-08", oldest_days: 4 },
  { id: "D-206", kind: "Product investment",      subject: "Customer portal CA localization", owner: "CPO",  status: "pending",  due: "2026-06-20", oldest_days: 1 },
  { id: "D-207", kind: "Regional expansion",      subject: "Mexico — continue planning",      owner: "CEO",  status: "approved", due: "2026-05-15", oldest_days: 0 },
  { id: "D-208", kind: "Strategic risk acceptance", subject: "Carrier concentration ON",      owner: "COO",  status: "pending",  due: "2026-06-15", oldest_days: 5 },
];

export const STRATEGIC_DECISIONS_SUMMARY = { open: 6, oldest_days: 9, approved_30d: 4, exceptions_open: 2 };

export const BOARD_REPORT_SECTIONS = [
  { section: "Global expansion status",           highlight: "1 active · 1 controlled pilot · 1 planning · 2 research" },
  { section: "Country readiness",                 highlight: "USA 84 · Canada 79 · Mexico 54" },
  { section: "Marketplace expansion",             highlight: "Canada reefer gap · Mexico deferred" },
  { section: "Financial controls maturity",       highlight: "Maturity 71 · API overage in review" },
  { section: "Compliance execution",              highlight: "Score 72 · 7 exceptions open" },
  { section: "Customer success",                  highlight: "1 account at-risk · 4 expansion open" },
  { section: "Support operations",                highlight: "SLA 92-96 · 1 critical in CA" },
  { section: "Partner operations",                highlight: "Live US partners · CA telematics in pilot" },
  { section: "Revenue controls",                  highlight: "26 unmatched events tracked" },
  { section: "Strategic risks",                   highlight: "Carrier concentration ON · data residency" },
  { section: "Executive decisions needed",        highlight: "6 open · oldest 9 days" },
  { section: "Next quarter global priorities",    highlight: "Canada launch · Mexico planning · partner cert" },
];

export const GLOBAL_RISK_MATRIX = [
  { area: "Country launch",        likelihood: "med",  impact: "high", owner: "Strategy",   mitigation: "Phased readiness gates" },
  { area: "Compliance",            likelihood: "med",  impact: "high", owner: "Compliance", mitigation: "Country boards + evidence" },
  { area: "Data residency",        likelihood: "med",  impact: "high", owner: "Engineering", mitigation: "Region tracking" },
  { area: "Financial controls",    likelihood: "low",  impact: "high", owner: "Finance",    mitigation: "Maturity + tests" },
  { area: "Billing",               likelihood: "low",  impact: "med",  owner: "Billing ops", mitigation: "Adjustment approvals" },
  { area: "Marketplace",           likelihood: "med",  impact: "med",  owner: "Marketplace", mitigation: "Policy + carrier verification" },
  { area: "Carrier operations",    likelihood: "med",  impact: "med",  owner: "Carrier ops", mitigation: "Eligibility + quality" },
  { area: "Customer success",      likelihood: "low",  impact: "med",  owner: "CS",          mitigation: "Health + exec sponsor" },
  { area: "Support",               likelihood: "low",  impact: "med",  owner: "Support",     mitigation: "Coverage + SLA" },
  { area: "Partner operations",    likelihood: "med",  impact: "med",  owner: "Partner",     mitigation: "Cert + roadmap" },
  { area: "API/EDI",               likelihood: "low",  impact: "med",  owner: "Engineering", mitigation: "Health + retries" },
  { area: "Mobile",                likelihood: "low",  impact: "med",  owner: "Mobile",      mitigation: "Telemetry" },
  { area: "AI governance",         likelihood: "low",  impact: "high", owner: "AI",          mitigation: "Policy + approvals" },
  { area: "Strategic governance",  likelihood: "low",  impact: "high", owner: "Exec",        mitigation: "Decision queue + cadence" },
];

export const PRODUCT_ADOPTION = [
  { product: "Dispatch Command Center", USA: 92, Canada: 74, Mexico: 0,  EU: 0 },
  { product: "EliteNav driver GPS",     USA: 84, Canada: 62, Mexico: 0,  EU: 0 },
  { product: "Driver mobile",           USA: 88, Canada: 68, Mexico: 0,  EU: 0 },
  { product: "Customer portal",         USA: 76, Canada: 58, Mexico: 0,  EU: 0 },
  { product: "CoPilot",                 USA: 64, Canada: 48, Mexico: 0,  EU: 0 },
  { product: "Carrier marketplace",     USA: 78, Canada: 52, Mexico: 0,  EU: 0 },
  { product: "API",                     USA: 72, Canada: 44, Mexico: 0,  EU: 0 },
  { product: "EDI",                     USA: 68, Canada: 32, Mexico: 0,  EU: 0 },
  { product: "Telematics",              USA: 74, Canada: 46, Mexico: 0,  EU: 0 },
  { product: "Reports",                 USA: 81, Canada: 62, Mexico: 0,  EU: 0 },
  { product: "Enterprise governance",   USA: 66, Canada: 38, Mexico: 0,  EU: 0 },
  { product: "Partner marketplace",     USA: 58, Canada: 28, Mexico: 0,  EU: 0 },
];

export const ADOPTION_GAPS = [
  { gap: "CoPilot in CA",       owner: "Product", recommendation: "Bilingual prompt review" },
  { gap: "EDI in CA",           owner: "Eng",     recommendation: "Pilot 2 EDI partners" },
  { gap: "Customer portal CA",  owner: "Product", recommendation: "Localization placeholder" },
];

export const EXPANSION_DECISION = [
  { country: "Canada", demand: 76, supply: 64, partner: 62, compliance: 68, billing: 74, support: 78, financial: 74, liquidity: 58, residency: "medium", value: "high", revenue: "medium", complexity: "medium", risk: 42, recommendation: "Continue controlled pilot", action: "Expand reefer carriers + close residency exception" },
  { country: "Mexico", demand: 38, supply: 18, partner: 22, compliance: 38, billing: 28, support: 36, financial: 32, liquidity: 14, residency: "medium", value: "med",  revenue: "low",    complexity: "high",   risk: 68, recommendation: "Continue planning",        action: "Partner readiness + carrier pipeline" },
  { country: "EU",     demand: 24, supply: 8,  partner: 6,  compliance: 18, billing: 12, support: 22, financial: 22, liquidity: 6,  residency: "high",   value: "high", revenue: "low",    complexity: "high",   risk: 82, recommendation: "Defer",                   action: "Complete data residency research" },
  { country: "UK",     demand: 28, supply: 12, partner: 8,  compliance: 22, billing: 14, support: 24, financial: 24, liquidity: 8,  residency: "medium", value: "med",  revenue: "low",    complexity: "high",   risk: 76, recommendation: "Defer",                   action: "Pair with EU research" },
];

export const OPERATING_MODEL = [
  { area: "Global product ops",   owner: "CPO", cadence: "Weekly",   maturity: 74 },
  { area: "Regional ops",         owner: "COO", cadence: "Weekly",   maturity: 72 },
  { area: "Country ops",          owner: "COO", cadence: "Daily",    maturity: 68 },
  { area: "Marketplace ops",      owner: "MP lead", cadence: "Daily", maturity: 76 },
  { area: "Carrier ops",          owner: "Carrier ops", cadence: "Daily", maturity: 71 },
  { area: "Financial controls",   owner: "CFO", cadence: "Weekly",   maturity: 71 },
  { area: "Compliance controls",  owner: "Compliance", cadence: "Weekly", maturity: 72 },
  { area: "Support ops",          owner: "Support", cadence: "Daily", maturity: 78 },
  { area: "Customer success",     owner: "CCO", cadence: "Weekly",   maturity: 81 },
  { area: "Partner ops",          owner: "Partner lead", cadence: "Weekly", maturity: 70 },
  { area: "AI governance",        owner: "AI lead", cadence: "Weekly", maturity: 74 },
  { area: "Security governance",  owner: "CISO", cadence: "Weekly",  maturity: 76 },
  { area: "Board governance",     owner: "CEO", cadence: "Monthly",  maturity: 72 },
];

export const OPERATING_MODEL_SUMMARY = { maturity: 73, areas: OPERATING_MODEL.length, owners: 11 };

export const V8_REPORTS = [
  { name: "Global Operating Scale",          owner: "CEO" },
  { name: "Country Operating Command",       owner: "COO" },
  { name: "International Marketplace",       owner: "MP lead" },
  { name: "Regional Marketplace Liquidity",  owner: "MP lead" },
  { name: "International Carrier Ops",       owner: "Carrier ops" },
  { name: "Cross-Border Operating Controls", owner: "Ops" },
  { name: "Financial Control Maturity",      owner: "CFO" },
  { name: "Revenue Reconciliation Maturity", owner: "Finance" },
  { name: "Global Billing & Usage",          owner: "Billing ops" },
  { name: "Advanced Compliance Execution",   owner: "Compliance" },
  { name: "Country Compliance Execution",    owner: "Compliance" },
  { name: "Global Customer Success",         owner: "CCO" },
  { name: "International Support",           owner: "Support" },
  { name: "Global Partner Operations",       owner: "Partner lead" },
  { name: "Executive Strategic Governance",  owner: "CEO" },
  { name: "Board-Level Global Strategy",     owner: "CEO" },
  { name: "Global Risk & Controls",          owner: "CRO" },
  { name: "Global Product Adoption",         owner: "CPO" },
  { name: "Regional Expansion Decision",     owner: "Strategy" },
  { name: "Long-Term Global Operating Model", owner: "COO" },
];

export const V8_EXEC_HEADLINE = {
  status: "amber" as const,
  headline: "Canada controlled pilot is the gating decision for V8 scale.",
  detail:
    "Global network is scaling (76) with USA active and Canada in controlled pilot. Reefer carrier gap, data residency exception, and API overage billing control are the three open items for the week.",
  signals: [
    { label: "Global scale",         value: "76",   tone: "warn" as const },
    { label: "Open decisions",       value: 6,      tone: "warn" as const },
    { label: "Countries active",     value: 1,      tone: "good" as const },
    { label: "Exceptions open",      value: 7,      tone: "warn" as const },
  ],
  next_decision: { who: "CEO + COO + CFO", what: "Approve Canada pilot extension + reefer carrier recruitment + API overage control fix", due: "this week" },
};

// Per-module executive overlays — role-specific framing that sits on top of
// the underlying scoreboards. Mock-only; intent is to make each V8 surface
// usable by the named role without re-deriving context.
export const V8_EXECUTION_OVERLAYS = [
  { area: "Global Operating Network Scale",  role: "CEO",        focus: "Hold scale > 75 while Canada pilot resolves",                    decision: "Approve pilot extension at next ops review" },
  { area: "Country Operating Command",       role: "COO",        focus: "Canada health 79 — close 2 open executive decisions",            decision: "Lock reefer carrier owner this week" },
  { area: "International Marketplace",       role: "Marketplace", focus: "ON corridor reefer coverage is the only red signal",            decision: "Fund 2 reefer carriers in ON before Q+1" },
  { area: "Regional Marketplace Liquidity",  role: "Marketplace", focus: "Lane heatmap shows TX↔ON improving, ON↔QC thin",                decision: "Promote 1 carrier from pilot to verified" },
  { area: "International Carrier Operations", role: "Carrier ops", focus: "ON Logistics under review — verify or revoke",                 decision: "Decision due Friday, owner: Carrier ops lead" },
  { area: "Cross-Border Operating Controls", role: "Compliance",  focus: "Placeholder checklist — no production customs workflow yet",    decision: "Confirm scope boundary with CCO" },
  { area: "Financial Control Maturity",      role: "CFO",        focus: "Maturity 71 — API overage control is the gating test",           decision: "Approve control fix + re-test in 7d" },
  { area: "Revenue Reconciliation Maturity", role: "Finance",    focus: "26 unmatched events — ownership assigned, not yet GAAP",         decision: "Confirm placeholder framing in board pack" },
  { area: "Global Billing & Usage",          role: "Billing ops", focus: "USA queue: 2 failed payments · CAD invoicing in placeholder",   decision: "Retry + dunning by EOW" },
  { area: "Advanced Compliance Execution",   role: "CCO",        focus: "Owners + evidence + exceptions all tracked, 1 critical",         decision: "Resolve critical exception this week" },
  { area: "Country Compliance Execution",    role: "CCO",        focus: "Canada: privacy + data residency in progress · AI gov passing",  decision: "Schedule mobile evidence capture" },
  { area: "Global Customer Success",         role: "CS lead",    focus: "Cross-Pac Shipping at-risk · 4 expansion opportunities",         decision: "Save play on Cross-Pac before renewal" },
  { area: "International Support Ops",       role: "Support",    focus: "SLA 88-96 across regions · 1 critical CA escalation",            decision: "Escalation review by close of day" },
  { area: "Global Partner Operations",       role: "Partner",    focus: "US partners live · CA telematics in pilot · Quebec Fuel planning", decision: "Greenlight CA telematics verified state" },
  { area: "Executive Strategic Governance",  role: "Exec team",  focus: "6 open decisions, oldest 9d — Canada pilot extension is top",    decision: "Close 3 oldest at Friday exec meeting" },
  { area: "Board Global Strategy",           role: "CEO",        focus: "12-section report ready · global priorities for next quarter",   decision: "Sign off ahead of board" },
  { area: "Global Risk & Control Center",    role: "Risk",       focus: "Top 3: country launch, compliance evidence, data residency",     decision: "Confirm mitigation owners for top 3" },
  { area: "Global Product Adoption",         role: "CPO",        focus: "Canada adoption gaps: CoPilot, EDI, customer portal",            decision: "Add Canada-specific enablement plan" },
  { area: "Regional Expansion Decision",     role: "Strategy",   focus: "Canada continue · Mexico continue planning · EU/UK defer",       decision: "Document defer rationale in next memo" },
  { area: "Long-Term Operating Model",       role: "COO",        focus: "Maturity 73 · 13 areas with owners + cadence locked",            decision: "Re-baseline after Q close" },
];
