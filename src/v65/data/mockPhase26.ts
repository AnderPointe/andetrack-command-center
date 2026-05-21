// Phase 26 (V6.5) mock data — placeholders. Not actual financial / legal / compliance claims.

export const V65_FEATURE_MATRIX = [
  { area: "Platform Operating System Dashboard",          status: "ready" },
  { area: "Enterprise Financial Controls Center",         status: "ready" },
  { area: "Billing Controls Dashboard",                   status: "ready" },
  { area: "Revenue Recognition Readiness",                status: "placeholder" },
  { area: "Marketplace Financial Controls",               status: "ready" },
  { area: "API + Partner Billing Controls",               status: "ready" },
  { area: "Global Expansion Readiness Center",            status: "in_progress" },
  { area: "Internationalization Planning",                status: "in_progress" },
  { area: "Regional Compliance Readiness",                status: "placeholder" },
  { area: "Advanced Partner Marketplace",                 status: "ready" },
  { area: "Partner Product Catalog",                      status: "ready" },
  { area: "Partner Revenue Share",                        status: "placeholder" },
  { area: "Strategic Governance Center",                  status: "ready" },
  { area: "Executive Decision System",                    status: "ready" },
  { area: "Product-Line Investment Governance",           status: "ready" },
  { area: "Platform Economics Maturity",                  status: "ready" },
  { area: "Risk + Control Matrix",                        status: "ready" },
  { area: "Audit Control Evidence Center",                status: "tracked-evidence-only" },
  { area: "Compliance Control Operations",                status: "ready" },
  { area: "Marketplace Operating Controls",               status: "ready" },
  { area: "Long-Term Strategic Operating Model",          status: "ready" },
  { area: "V6.5 Advanced Reports",                        status: "ready" },
];

export const V65_DEFERRED = [
  "Fully autonomous dispatch",
  "Final IPO / acquisition claims",
  "Final SOC 2 / ISO certification claims",
  "Final Android Auto / CarPlay approval claims",
  "Complete international regulatory compliance",
  "Global customs production workflows",
  "Insurance underwriting automation",
  "Financial audit readiness claims",
];

export const STRATEGIC_OPERATING_SCORE = {
  overall: 86,
  byArea: [
    { area: "Product",              score: 90, status: "healthy" },
    { area: "Marketplace",          score: 84, status: "healthy" },
    { area: "Revenue",              score: 82, status: "healthy" },
    { area: "Customer success",     score: 87, status: "healthy" },
    { area: "Support",              score: 83, status: "healthy" },
    { area: "Security/compliance",  score: 84, status: "in_progress" },
    { area: "Partner ecosystem",    score: 81, status: "healthy" },
    { area: "Platform reliability", score: 92, status: "healthy" },
    { area: "Automation gov",       score: 88, status: "healthy" },
    { area: "AI governance",        score: 85, status: "healthy" },
    { area: "Financial controls",   score: 78, status: "at_risk" },
    { area: "Global readiness",     score: 52, status: "planned" },
    { area: "Strategic risk",       score: 80, status: "healthy" },
    { area: "Board governance",     score: 89, status: "healthy" },
    { area: "Investment governance",score: 84, status: "healthy" },
  ],
};

export const OPERATING_ACTION_PLAN = [
  { owner: "CFO",      action: "Close 2 failed-payment exceptions",                due: "this week",  priority: "high" },
  { owner: "CISO",     action: "Remediate 2 controls flagged in risk matrix",      due: "next week",  priority: "high" },
  { owner: "Head Pty", action: "Approve telematics partner product listing",       due: "this week",  priority: "med" },
  { owner: "COO",      action: "Clear 3 pending marketplace settlement approvals", due: "this week",  priority: "high" },
  { owner: "Strategy", action: "Advance Canada localization + privacy review",     due: "this month", priority: "med" },
];

export const FINANCIAL_CONTROLS = {
  score: 78,
  areas: [
    { area: "Billing",                       score: 84, exceptions: 2 },
    { area: "Subscriptions",                 score: 88, exceptions: 0 },
    { area: "Usage billing",                 score: 76, exceptions: 1 },
    { area: "Marketplace fees",              score: 80, exceptions: 1 },
    { area: "API overages",                  score: 74, exceptions: 0 },
    { area: "Carrier settlement (pl)",       score: 70, exceptions: 3 },
    { area: "Revenue recognition (pl)",      score: 55, exceptions: 1 },
    { area: "Invoice accuracy",              score: 91, exceptions: 0 },
    { area: "Refund / credit memo (pl)",     score: 72, exceptions: 1 },
    { area: "Manual adjustment approval",    score: 86, exceptions: 1 },
    { area: "Financial audit trail",         score: 90, exceptions: 0 },
    { area: "Payment status monitoring",     score: 88, exceptions: 2 },
    { area: "Failed payment escalation",     score: 82, exceptions: 2 },
    { area: "Revenue event reconciliation",  score: 60, exceptions: 1 },
  ],
};

export const ADJUSTMENT_QUEUE = [
  { id: "ADJ-1041", type: "marketplace_fee", amount: 1240, requested_by: "ops.lead", status: "pending", note: "Carrier dispute partial credit" },
  { id: "ADJ-1042", type: "usage_billing",   amount: 380,  requested_by: "billing.ai",status: "pending", note: "API overage waiver" },
  { id: "ADJ-1037", type: "subscription",    amount: 0,    requested_by: "csm.r",     status: "approved",note: "Plan downgrade backdate" },
];

export const FINANCIAL_AUDIT_TRAIL = [
  { ts: "2026-05-21 10:14", actor: "billing.svc", event: "invoice_generated", ref: "INV-9821" },
  { ts: "2026-05-21 09:42", actor: "carrier.svc", event: "settlement_held",   ref: "STL-441 (dispute)" },
  { ts: "2026-05-21 09:30", actor: "ops.lead",    event: "adjustment_request",ref: "ADJ-1041" },
  { ts: "2026-05-20 17:11", actor: "stripe.wh",   event: "payment_failed",    ref: "SUB-512" },
];

export const BILLING = {
  subs_active: 312, subs_trial: 28, subs_past_due: 6, subs_cancelled: 11,
  failed_payments: 4, manual_plan_changes: 7, usage_events: 18420,
  marketplace_fees: 524, api_overages: 39, disputes: 2, webhook_failures: 1,
};

export const FAILED_PAYMENTS = [
  { sub: "SUB-512", customer: "Northwind Logistics", amount: 1899, attempts: 3, last_error: "card_declined" },
  { sub: "SUB-498", customer: "AlpineHaul Inc.",     amount: 2499, attempts: 2, last_error: "insufficient_funds" },
  { sub: "SUB-471", customer: "Mesa Freight",        amount:  799, attempts: 4, last_error: "expired_card" },
  { sub: "SUB-466", customer: "Cedar Run Carriers",  amount: 1199, attempts: 1, last_error: "do_not_honor" },
];

export const BILLING_AUDIT = [
  { ts: "10:21", event: "subscription_renewed",  ref: "SUB-209" },
  { ts: "10:18", event: "usage_metered",         ref: "USG-77110" },
  { ts: "09:57", event: "invoice_voided",        ref: "INV-9817" },
  { ts: "09:30", event: "manual_plan_change",    ref: "SUB-301 starter→pro" },
];

export const REVENUE_EVENTS = [
  { type: "subscription",     count: 312, amount_pl: "$184k", recognition: "ratable" },
  { type: "usage_billing",    count:  41, amount_pl:  "$22k", recognition: "point-in-time" },
  { type: "marketplace_fee",  count: 524, amount_pl:  "$38k", recognition: "point-in-time" },
  { type: "api_overage",      count:  39, amount_pl:   "$4k", recognition: "point-in-time" },
  { type: "enterprise_support",count:  18, amount_pl:  "$11k", recognition: "ratable" },
  { type: "implementation",   count:   6, amount_pl:  "$24k", recognition: "milestone-pl" },
  { type: "carrier_subscription",count: 88,amount_pl: "$31k", recognition: "ratable" },
  { type: "partner_rev_share",count:  12, amount_pl:   "$3k", recognition: "placeholder" },
];

export const REVENUE_EXCEPTIONS = [
  { event: "implementation",      issue: "Service period mapping incomplete", status: "open" },
  { event: "partner_rev_share",   issue: "Share % not yet defined",           status: "open" },
  { event: "marketplace_fee",     issue: "Refund/credit logic placeholder",   status: "open" },
];

export const MKT_FINANCIAL = {
  transactions_today: 412, fees_collected_pl: "$38k", disputed_holds: 3,
  pending_settlements: 7, carrier_payouts_pl: "$112k", fee_calc_audited_pct: 96,
};

export const SETTLEMENT_QUEUE = [
  { id: "STL-441", carrier: "Blue Ridge Trans", amount_pl: "$8,420", status: "dispute_hold" },
  { id: "STL-440", carrier: "Lonestar Lines",   amount_pl: "$3,180", status: "pending_approval" },
  { id: "STL-439", carrier: "Cobalt Express",   amount_pl: "$4,910", status: "pending_approval" },
  { id: "STL-438", carrier: "Ridgeway Freight", amount_pl: "$2,250", status: "pending_approval" },
];

export const API_BILLING = {
  total_calls_30d: 4_812_330, billed_overages: 39, partner_rev_share_pl: "$3.1k",
  partner_billing_events: 86, overage_approvals_pending: 2, rate_limit_violations: 11,
};

export const API_BILLING_EVENTS = [
  { ts: "10:09", partner: "Acme Telematics",  event: "usage_metered",   units: 12_400 },
  { ts: "09:52", partner: "ShipFlow API",     event: "overage_approved",units:  4_200 },
  { ts: "09:31", partner: "FuelCard Co.",     event: "billing_event",   units:  1_800 },
];

export const COUNTRIES = [
  { country: "United States", score: 96, status: "primary",    risk: "low" },
  { country: "Canada",        score: 58, status: "evaluating", risk: "med" },
  { country: "Mexico",        score: 41, status: "research",   risk: "med" },
  { country: "United Kingdom",score: 33, status: "research",   risk: "high" },
  { country: "European Union",score: 29, status: "research",   risk: "high" },
  { country: "Australia",     score: 26, status: "exploration",risk: "high" },
];

export const I18N_KEYS = {
  total: 1842, translated_es: 612, translated_fr: 488, translated_de: 102, translated_pt: 71,
};

export const LOCALE_SETTINGS = [
  { locale: "en-US", date: "MM/DD/YYYY", currency: "USD", units: "imperial", status: "primary" },
  { locale: "en-CA", date: "YYYY-MM-DD", currency: "CAD", units: "metric",   status: "planned" },
  { locale: "es-MX", date: "DD/MM/YYYY", currency: "MXN", units: "metric",   status: "planned" },
  { locale: "fr-CA", date: "YYYY-MM-DD", currency: "CAD", units: "metric",   status: "planned" },
  { locale: "en-GB", date: "DD/MM/YYYY", currency: "GBP", units: "metric",   status: "research" },
];

export const REGIONAL_COMPLIANCE = [
  { region: "North America", country: "USA",    research: "complete",    privacy: "ccpa_ready", transport: "fmcsa_aware", risk: "low" },
  { region: "North America", country: "Canada", research: "in_progress", privacy: "pipeda_pl",  transport: "nsc_pl",      risk: "med" },
  { region: "North America", country: "Mexico", research: "in_progress", privacy: "lfpdppp_pl", transport: "sct_pl",      risk: "med" },
  { region: "Europe",        country: "UK",     research: "research",    privacy: "uk_gdpr_pl", transport: "dvsa_pl",     risk: "high" },
  { region: "Europe",        country: "EU",     research: "research",    privacy: "gdpr_pl",    transport: "mixed_pl",    risk: "high" },
];

export const PARTNER_CATEGORIES = [
  "Telematics","EDI","API","TMS","Accounting","Fuel cards","Maintenance","Insurance (pl)",
  "Carrier networks","Hardware","Document storage","Notification","AI","Map/routing","Portal add-ons",
];

export const PARTNER_LISTINGS = [
  { id: "P-101", name: "Samsara",        category: "Telematics", status: "approved",         rating_pl: 4.7, certified_pl: "verified" },
  { id: "P-102", name: "Motive",         category: "Telematics", status: "approved",         rating_pl: 4.6, certified_pl: "verified" },
  { id: "P-103", name: "QuickBooks",     category: "Accounting", status: "approved",         rating_pl: 4.4, certified_pl: "verified" },
  { id: "P-104", name: "Project44",      category: "API",        status: "approved",         rating_pl: 4.3, certified_pl: "verified" },
  { id: "P-105", name: "WEX Fuel",       category: "Fuel cards", status: "approved",         rating_pl: 4.2, certified_pl: "verified" },
  { id: "P-110", name: "NavTrack Pro",   category: "Telematics", status: "pending_review",   rating_pl: 0,   certified_pl: "review" },
  { id: "P-111", name: "InsureFreight",  category: "Insurance (pl)", status: "design_partner", rating_pl: 0, certified_pl: "n/a" },
];

export const PARTNER_PRODUCTS = [
  { partner: "Samsara",     product: "ELD + GPS Stream",    type: "API_stream", pricing_pl: "per_vehicle", revshare_pl: "10%" },
  { partner: "Motive",      product: "Driver Safety Feed",  type: "API_stream", pricing_pl: "per_vehicle", revshare_pl: "8%"  },
  { partner: "QuickBooks",  product: "Invoice Sync",        type: "OAuth_sync", pricing_pl: "flat",        revshare_pl: "n/a" },
  { partner: "Project44",   product: "Visibility Feed",     type: "API_stream", pricing_pl: "per_load",    revshare_pl: "12%" },
  { partner: "NavTrack Pro",product: "Truck Routing Plus",  type: "API_stream", pricing_pl: "per_call",    revshare_pl: "15%" },
];

export const PARTNER_REV_SHARE = [
  { partner: "Samsara",    product: "ELD + GPS Stream", customer: "Northwind", amount_pl: 1840, share_pl: 184, status: "approved" },
  { partner: "Motive",     product: "Driver Safety",    customer: "AlpineHaul",amount_pl: 1120, share_pl:  90, status: "approved" },
  { partner: "Project44",  product: "Visibility Feed",  customer: "Mesa Freight",amount_pl: 940, share_pl: 113, status: "pending" },
  { partner: "NavTrack",   product: "Routing Plus",     customer: "Cedar Run", amount_pl:  680, share_pl: 102, status: "pending" },
];

export const GOVERNANCE_DOMAINS = [
  { domain: "Board",        score: 89, cadence: "quarterly" },
  { domain: "Executive",    score: 87, cadence: "weekly"    },
  { domain: "Financial",    score: 82, cadence: "monthly"   },
  { domain: "Product",      score: 86, cadence: "biweekly"  },
  { domain: "Marketplace",  score: 84, cadence: "monthly"   },
  { domain: "AI",           score: 85, cadence: "biweekly"  },
  { domain: "Security",     score: 88, cadence: "monthly"   },
  { domain: "Compliance",   score: 81, cadence: "monthly"   },
  { domain: "Partner",      score: 80, cadence: "monthly"   },
  { domain: "Data",         score: 83, cadence: "monthly"   },
  { domain: "Risk",         score: 80, cadence: "monthly"   },
  { domain: "Roadmap",      score: 84, cadence: "quarterly" },
];

export const GOVERNANCE_DECISIONS = [
  { date: "2026-05-18", domain: "Marketplace", decision: "Raise dispute hold threshold to $2k", outcome: "approved" },
  { date: "2026-05-14", domain: "AI",          decision: "Require human approval for rate recs >5% delta", outcome: "approved" },
  { date: "2026-05-09", domain: "Product",     decision: "Reduce investment in legacy reporting v1", outcome: "approved" },
];

export const DECISION_REQUESTS = [
  {
    id: "DEC-201", title: "Expand into Canada pilot market", owner: "Strategy", status: "open",
    options: ["BC-only soft pilot", "BC + AB pilot", "Defer 1 quarter"],
    risks: ["PIPEDA review incomplete", "CAD billing path pl"],
    financial_impact_pl: "$240k Y1 ARR (pl)",
    customer_impact: "5 design-partner accounts already requesting",
    operational_impact: "Support coverage in PST/MST",
  },
  {
    id: "DEC-202", title: "Approve telematics partner NavTrack Pro listing", owner: "Partnerships", status: "open",
    options: ["Approve w/ security review", "Reject", "Defer"],
    risks: ["Security review pending"],
    financial_impact_pl: "+$50k Y1 rev share (pl)",
    customer_impact: "8 customers awaiting",
    operational_impact: "Adds 1 webhook surface",
  },
];

export const PRODUCT_LINES = [
  { line: "Dispatch CC",         rev: 92, adopt: 88, support: 22, eff: 70, strat: 92, retention: 90, rec: "expand"   },
  { line: "EliteNav",            rev: 88, adopt: 84, support: 18, eff: 60, strat: 90, retention: 86, rec: "expand"   },
  { line: "Driver Mobile",       rev: 70, adopt: 90, support: 28, eff: 65, strat: 86, retention: 88, rec: "maintain" },
  { line: "Customer Portal",     rev: 64, adopt: 78, support: 14, eff: 50, strat: 80, retention: 84, rec: "maintain" },
  { line: "CoPilot AI",          rev: 76, adopt: 71, support: 24, eff: 80, strat: 94, retention: 82, rec: "expand"   },
  { line: "Carrier Marketplace", rev: 86, adopt: 80, support: 32, eff: 75, strat: 91, retention: 80, rec: "expand"   },
  { line: "API Platform",        rev: 72, adopt: 60, support: 12, eff: 55, strat: 88, retention: 84, rec: "maintain" },
  { line: "EDI Platform",        rev: 68, adopt: 58, support: 22, eff: 50, strat: 82, retention: 80, rec: "maintain" },
  { line: "Telematics",          rev: 60, adopt: 70, support: 16, eff: 45, strat: 78, retention: 82, rec: "maintain" },
  { line: "Partner Marketplace", rev: 40, adopt: 38, support: 10, eff: 55, strat: 85, retention: 70, rec: "expand"   },
  { line: "Enterprise Gov",      rev: 30, adopt: 22, support:  6, eff: 40, strat: 80, retention: 78, rec: "expand"   },
  { line: "Reporting/Analytics", rev: 55, adopt: 66, support: 14, eff: 45, strat: 74, retention: 78, rec: "reduce-legacy" },
];

export const PLATFORM_ECONOMICS = {
  cac_pl: "$8.2k", ltv_pl: "$92k", ltv_cac_pl: "11.2x", payback_pl: "13 mo",
  marketplace_take_rate_pl: "9.4%", api_gross_margin_pl: "78%", support_cost_pct_pl: "11%",
  expansion_pct_pl: "21%", retention_pct_pl: "92%", churn_impact_pl: "-3.1%",
};

export const PRODUCT_LINE_MARGINS = [
  { line: "Dispatch CC",         margin_pl: 78 },
  { line: "EliteNav",            margin_pl: 72 },
  { line: "CoPilot AI",          margin_pl: 64 },
  { line: "Carrier Marketplace", margin_pl: 70 },
  { line: "API Platform",        margin_pl: 80 },
  { line: "Customer Portal",     margin_pl: 66 },
];

export const RISK_CONTROL_MATRIX = [
  { category: "Financial",    risk: "Revenue leakage on usage billing", owner: "CFO",     freq: "monthly", last_tested: "2026-05-12", result: "pass",         remediation: "—" },
  { category: "Financial",    risk: "Refund/credit logic placeholder",  owner: "CFO",     freq: "monthly", last_tested: "2026-05-12", result: "exception",    remediation: "Define policy + automation" },
  { category: "Security",     risk: "Privileged access drift",           owner: "CISO",   freq: "monthly", last_tested: "2026-05-15", result: "pass",         remediation: "—" },
  { category: "Security",     risk: "API key rotation gaps",             owner: "CISO",   freq: "quarterly",last_tested:"2026-04-30",  result: "needs_remediation", remediation: "Rotate 12 keys" },
  { category: "Compliance",   risk: "Data retention review",             owner: "Privacy",freq: "quarterly",last_tested:"2026-05-01",  result: "pass",         remediation: "—" },
  { category: "AI",           risk: "Explainability coverage drop",      owner: "AI Gov", freq: "monthly", last_tested: "2026-05-18", result: "needs_remediation", remediation: "Re-tag rate model" },
  { category: "Marketplace",  risk: "Carrier verification bypass",       owner: "COO",    freq: "weekly",  last_tested: "2026-05-19", result: "pass",         remediation: "—" },
  { category: "Operational",  risk: "Webhook delivery failures",         owner: "Eng",    freq: "weekly",  last_tested: "2026-05-19", result: "pass",         remediation: "—" },
  { category: "Partner",      risk: "Partner listing security review",   owner: "Pty",    freq: "per_listing", last_tested:"2026-05-20", result: "pending",   remediation: "Review NavTrack Pro" },
  { category: "Revenue",      risk: "Recognition mapping incomplete",    owner: "CFO",    freq: "monthly", last_tested: "2026-05-12", result: "exception",    remediation: "Map implementation milestones" },
  { category: "Data",         risk: "Tenant isolation regression",       owner: "Eng",    freq: "weekly",  last_tested: "2026-05-19", result: "pass",         remediation: "—" },
  { category: "Mobile",       status: "n/a", risk: "Driver privacy controls", owner: "Mobile", freq: "monthly", last_tested: "2026-05-10", result: "pass", remediation: "—" } as any,
];

export const AUDIT_EVIDENCE = [
  { type: "Billing audit logs",        freshness: 99, last: "1h",  owner: "Billing" },
  { type: "Revenue event logs",        freshness: 96, last: "2h",  owner: "Billing" },
  { type: "API usage logs",            freshness: 99, last: "5m",  owner: "Eng"     },
  { type: "Marketplace fee logs",      freshness: 97, last: "1h",  owner: "Mkt"     },
  { type: "EDI logs",                  freshness: 95, last: "30m", owner: "Eng"     },
  { type: "Security logs",             freshness: 98, last: "5m",  owner: "Sec"     },
  { type: "Access review evidence",    freshness: 88, last: "14d", owner: "Sec"     },
  { type: "AI approval evidence",      freshness: 92, last: "1d",  owner: "AI Gov"  },
  { type: "Automation approval evd.",  freshness: 91, last: "1d",  owner: "AI Gov"  },
  { type: "Support access evidence",   freshness: 90, last: "3d",  owner: "Support" },
  { type: "Data retention evidence",   freshness: 86, last: "21d", owner: "Privacy" },
  { type: "Incident response evd.",    freshness: 94, last: "8d",  owner: "Sec"     },
];

export const COMPLIANCE_CONTROLS = [
  { area: "Access control",     score: 90, exceptions: 1 },
  { area: "Data retention",     score: 84, exceptions: 1 },
  { area: "Privacy",            score: 86, exceptions: 0 },
  { area: "Security logging",   score: 92, exceptions: 0 },
  { area: "Incident response",  score: 88, exceptions: 0 },
  { area: "Vendor management",  score: 78, exceptions: 1 },
  { area: "API security",       score: 86, exceptions: 1 },
  { area: "EDI security",       score: 82, exceptions: 0 },
  { area: "Mobile security",    score: 84, exceptions: 0 },
  { area: "AI governance",      score: 85, exceptions: 1 },
  { area: "Financial controls", score: 78, exceptions: 2 },
  { area: "Marketplace ctrls",  score: 84, exceptions: 1 },
];

export const MARKETPLACE_CONTROLS = [
  { rule: "Carrier verification required",          enabled: true,  blocked_today: 4 },
  { rule: "Compliance documents required",          enabled: true,  blocked_today: 2 },
  { rule: "Watchlisted carriers restricted",        enabled: true,  blocked_today: 1 },
  { rule: "Suspended carriers blocked",             enabled: true,  blocked_today: 1 },
  { rule: "Load award approval (>$10k)",            enabled: true,  blocked_today: 3 },
  { rule: "Settlement approval queue",              enabled: true,  blocked_today: 7 },
  { rule: "Dispute hold",                           enabled: true,  blocked_today: 3 },
  { rule: "Trust + safety review",                  enabled: true,  blocked_today: 1 },
  { rule: "Fraud risk placeholder",                 enabled: true,  blocked_today: 0 },
  { rule: "Carrier quality review",                 enabled: true,  blocked_today: 2 },
];

export const OPERATING_HORIZONS = [
  { horizon: "Current quarter", focus: "Financial controls remediation, partner marketplace v2, Canada research" },
  { horizon: "Next quarter",    focus: "Localization plumbing, partner revenue share, SOC 2 evidence completion" },
  { horizon: "Annual plan",     focus: "Canada pilot, marketplace economics maturity, AI gov enforcement v2" },
  { horizon: "24-month plan",   focus: "Mexico evaluation, partner marketplace certification, regulated controls" },
  { horizon: "36-month plan",   focus: "EU/UK research, global logistics network, regulated enterprise controls" },
];

export const OPERATING_PILLARS = [
  { pillar: "Product",            owner: "CPO",  score: 90 },
  { pillar: "Marketplace",        owner: "COO",  score: 84 },
  { pillar: "Revenue",            owner: "CRO",  score: 82 },
  { pillar: "Customer success",   owner: "CCO",  score: 87 },
  { pillar: "Support",            owner: "VP",   score: 83 },
  { pillar: "Security/compliance",owner: "CISO", score: 84 },
  { pillar: "Partnerships",       owner: "HP",   score: 80 },
  { pillar: "Platform reliability",owner:"VP Eng", score: 92 },
  { pillar: "Mobile",             owner: "PM",   score: 81 },
  { pillar: "AI governance",      owner: "AI",   score: 85 },
  { pillar: "Global expansion",   owner: "Strat",score: 52 },
  { pillar: "Financial controls", owner: "CFO",  score: 78 },
];

export const V65_REPORTS = [
  "Platform operating system",
  "Financial controls",
  "Billing controls",
  "Revenue recognition readiness",
  "Marketplace financial controls",
  "Global expansion readiness",
  "Internationalization readiness",
  "Partner marketplace",
  "Partner revenue share",
  "Strategic governance",
  "Executive decision",
  "Product-line investment",
  "Risk + control matrix",
  "Audit evidence",
  "Compliance controls",
  "Marketplace controls",
  "Long-term operating model",
];
