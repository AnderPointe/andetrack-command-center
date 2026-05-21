// V7.5 mock dataset — Phase 28 (global expansion execution)

export const V75_FEATURE_MATRIX = [
  { area: "Global expansion execution",  status: "shipped",     notes: "Country pipeline + blockers" },
  { area: "Country launch execution",    status: "shipped",     notes: "Phase + owners + go/no-go" },
  { area: "Controlled country pilot",    status: "shipped",     notes: "15-step pilot workflow" },
  { area: "Regulated customer onboarding", status: "shipped",   notes: "15-step regulated checklist" },
  { area: "Regulated control pack",      status: "shipped",     notes: "14 control sections" },
  { area: "Advanced financial audit",    status: "placeholder", notes: "Readiness only — not asserted" },
  { area: "Revenue reconciliation",      status: "placeholder", notes: "Matching only — not GAAP" },
  { area: "Global revenue controls",     status: "shipped",     notes: "Country-by-country" },
  { area: "International partner launch", status: "shipped",    notes: "10-stage pipeline" },
  { area: "Intl partner certification",  status: "placeholder", notes: "Review checklist only" },
  { area: "Marketplace operating discipline", status: "shipped", notes: "Policy + carrier + dispute" },
  { area: "Regional marketplace activation", status: "shipped", notes: "12-step activation" },
  { area: "Data residency execution",    status: "placeholder", notes: "Tracking + exceptions only" },
  { area: "Cross-border execution",      status: "placeholder", notes: "Profile only" },
  { area: "Global support readiness",    status: "shipped",     notes: "Regional coverage matrix" },
  { area: "Global compliance execution", status: "shipped",     notes: "Owner + evidence + status" },
  { area: "Regional risk management",    status: "shipped",     notes: "12 risk categories" },
  { area: "Executive launch governance", status: "shipped",     notes: "Approval queue + exceptions" },
  { area: "Global operating cadence",    status: "shipped",     notes: "9 cadences" },
  { area: "International customer success", status: "shipped",  notes: "Regional health + renewal" },
  { area: "Global launch reporting",     status: "shipped",     notes: "17 report types" },
];

export const V75_DEFERRED = [
  "Fully autonomous dispatch",
  "Final international compliance claims",
  "Final financial audit claims",
  "Global customs production workflows",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "Final Android Auto / CarPlay approval claims",
  "Full international tax automation",
];

export const V75_EXECUTION_READINESS = {
  overall: 71,
  byCategory: [
    { category: "Country launches",         score: 74 },
    { category: "Regulated onboarding",     score: 68 },
    { category: "Financial audit readiness", score: 62 },
    { category: "Revenue reconciliation",   score: 58 },
    { category: "Global revenue controls",  score: 70 },
    { category: "Intl partner launch",      score: 73 },
    { category: "Marketplace discipline",   score: 81 },
    { category: "Regional marketplace",     score: 66 },
    { category: "Data residency execution", score: 55 },
    { category: "Cross-border placeholders", score: 49 },
    { category: "Global support readiness", score: 72 },
    { category: "Compliance control exec",  score: 69 },
    { category: "Regional risk management", score: 75 },
    { category: "Executive governance",     score: 84 },
  ],
};

export const COUNTRY_LAUNCHES = [
  { id: "ca", country: "Canada",  phase: "Controlled Pilot", sponsor: "CEO",  owner: "COO", compliance: "CCO", support: "VP Support", partner: "Partner Lead", marketplace: "Mkt Lead", billing: "CFO", security: "CISO", launch_date: "2026-Q3", readiness: 78, risk: "medium", recommendation: "Pilot with conditions", blockers: 2 },
  { id: "mx", country: "Mexico",  phase: "Planning",         sponsor: "CEO",  owner: "VP Intl", compliance: "Legal", support: "VP Support", partner: "Partner Lead", marketplace: "Mkt Lead", billing: "CFO", security: "CISO", launch_date: "2027-H1", readiness: 46, risk: "high",   recommendation: "Continue planning", blockers: 6 },
  { id: "eu", country: "EU (NL)", phase: "Research",         sponsor: "CSO",  owner: "VP Intl", compliance: "Legal", support: "VP Support", partner: "Partner Lead", marketplace: "Mkt Lead", billing: "CFO", security: "CISO", launch_date: "TBD",     readiness: 34, risk: "high",   recommendation: "Research only",     blockers: 9 },
  { id: "uk", country: "UK",      phase: "Research",         sponsor: "CSO",  owner: "VP Intl", compliance: "Legal", support: "VP Support", partner: "Partner Lead", marketplace: "Mkt Lead", billing: "CFO", security: "CISO", launch_date: "TBD",     readiness: 31, risk: "high",   recommendation: "Research only",     blockers: 10 },
];

export const COUNTRY_BLOCKERS = [
  { country: "Canada", blocker: "Data residency exception review", severity: "medium", owner: "CCO" },
  { country: "Canada", blocker: "French localization incomplete",  severity: "high",   owner: "Product" },
  { country: "Mexico", blocker: "Tax research incomplete",         severity: "high",   owner: "CFO" },
  { country: "Mexico", blocker: "Spanish driver app rollout",      severity: "medium", owner: "Product" },
  { country: "EU",     blocker: "GDPR data residency plan",        severity: "high",   owner: "CCO" },
  { country: "EU",     blocker: "EU billing entity",               severity: "high",   owner: "CFO" },
];

export const COUNTRY_PILOT_STEPS = [
  { step: "Country selected",              status: "done" },
  { step: "Executive approval",            status: "done" },
  { step: "Legal/compliance review",       status: "in_progress" },
  { step: "Data residency review",         status: "in_progress" },
  { step: "Billing review",                status: "done" },
  { step: "Localization review",           status: "blocked" },
  { step: "Support readiness review",      status: "done" },
  { step: "Partner readiness review",      status: "done" },
  { step: "Marketplace readiness review",  status: "in_progress" },
  { step: "Pilot customer selected",       status: "done" },
  { step: "Pilot users onboarded",         status: "todo" },
  { step: "First pilot loads created",     status: "todo" },
  { step: "Pilot monitoring active",       status: "todo" },
  { step: "Pilot review completed",        status: "todo" },
  { step: "Expand / pause / stop",         status: "todo" },
];

export const REGULATED_ONBOARDING_STEPS = [
  { step: "Enterprise profile",            status: "done" },
  { step: "Security questionnaire",        status: "in_progress" },
  { step: "Data processing review",        status: "in_progress" },
  { step: "Privacy review",                status: "todo" },
  { step: "Access control review",         status: "todo" },
  { step: "Support access review",         status: "todo" },
  { step: "Data retention review",         status: "in_progress" },
  { step: "AI usage disclosure",           status: "in_progress" },
  { step: "Location tracking disclosure",  status: "todo" },
  { step: "Billing controls review",       status: "todo" },
  { step: "API/EDI security review",       status: "in_progress" },
  { step: "Mobile app security review",    status: "todo" },
  { step: "Customer portal access review", status: "todo" },
  { step: "Go-live controls",              status: "todo" },
  { step: "Executive sign-off",            status: "todo" },
];

export const CONTROL_PACK_SECTIONS = [
  "Security overview", "Privacy overview", "Access control overview", "Location tracking overview",
  "AI usage overview", "Data retention overview", "Incident response overview", "API security overview",
  "EDI security overview", "Mobile security overview", "Support process overview", "Audit logging overview",
  "Business continuity placeholder", "Subprocessor placeholder",
].map((s, i) => ({ section: s, status: i < 9 ? "drafted" : i < 12 ? "in_review" : "placeholder" }));

export const FINANCIAL_AUDIT_V75 = {
  score: 62,
  items: [
    { area: "Subscription audit trail",     status: "passing",     evidence: "partial" },
    { area: "Billing event completeness",   status: "in_progress", evidence: "partial" },
    { area: "Invoice accuracy",             status: "passing",     evidence: "complete" },
    { area: "Usage billing accuracy",       status: "exception",   evidence: "partial" },
    { area: "Marketplace fee audit",        status: "exception",   evidence: "partial" },
    { area: "API overage audit",            status: "passing",     evidence: "partial" },
    { area: "Partner revenue share audit",  status: "in_progress", evidence: "missing" },
    { area: "Manual adjustment approvals",  status: "passing",     evidence: "complete" },
    { area: "Failed payment handling",      status: "passing",     evidence: "complete" },
    { area: "Billing webhook evidence",     status: "passing",     evidence: "partial" },
    { area: "Revenue event classification", status: "in_progress", evidence: "missing" },
    { area: "Revenue reconciliation",       status: "placeholder", evidence: "placeholder" },
    { area: "Control testing status",       status: "in_progress", evidence: "partial" },
    { area: "Audit package readiness",      status: "placeholder", evidence: "placeholder" },
  ],
};

export const REVENUE_RECON_EVENTS = [
  { id: "evt-001", type: "usage",        amount: 124.50, status: "unmatched", reason: "Missing invoice link", owner: "Billing" },
  { id: "evt-002", type: "usage",        amount: 88.10,  status: "unmatched", reason: "Customer ID mismatch", owner: "Billing" },
  { id: "evt-003", type: "usage",        amount: 412.00, status: "unmatched", reason: "Late event",           owner: "Billing" },
  { id: "evt-004", type: "usage",        amount: 19.20,  status: "unmatched", reason: "Plan changed mid-cycle", owner: "Billing" },
  { id: "evt-005", type: "usage",        amount: 245.75, status: "unmatched", reason: "Disputed",             owner: "Billing" },
  { id: "evt-006", type: "marketplace",  amount: 1820.00, status: "exception", reason: "Fee mismatch",        owner: "Marketplace" },
  { id: "evt-007", type: "subscription", amount: 4900.00, status: "matched",   reason: "—",                    owner: "Billing" },
  { id: "evt-008", type: "api_overage",  amount: 67.40,  status: "matched",   reason: "—",                    owner: "Billing" },
];

export const COUNTRY_BILLING = [
  { country: "USA",    billing: "live",        currency: "USD", tax: "configured", processor: "ready", invoice_l10n: "ready"  },
  { country: "Canada", billing: "in_progress", currency: "CAD", tax: "in_review",  processor: "ready", invoice_l10n: "drafted" },
  { country: "Mexico", billing: "research",    currency: "MXN", tax: "research",   processor: "research", invoice_l10n: "todo"    },
  { country: "EU",     billing: "research",    currency: "EUR", tax: "research",   processor: "research", invoice_l10n: "todo"    },
];

export const PARTNER_LAUNCHES = [
  { partner: "GeoTab CA",       category: "Telematics",   stage: "Launch Ready",      country: "Canada",  risk: "low",    owner: "Partner Lead" },
  { partner: "HERE Maps Intl",  category: "Map/routing",  stage: "Compliance Review", country: "Global",  risk: "medium", owner: "Partner Lead" },
  { partner: "EDI Bridge CA",   category: "EDI",          stage: "Technical Review",  country: "Canada",  risk: "low",    owner: "Partner Lead" },
  { partner: "FuelTrack MX",    category: "Fuel card",    stage: "Qualified",         country: "Mexico",  risk: "medium", owner: "Partner Lead" },
  { partner: "EU Notify",       category: "Notification", stage: "Identified",        country: "EU",      risk: "medium", owner: "Partner Lead" },
  { partner: "Maint Pro CA",    category: "Maintenance",  stage: "Pilot",             country: "Canada",  risk: "low",    owner: "Partner Lead" },
];

export const PARTNER_CERT_CHECKS = [
  "Partner security review", "Partner compliance review", "Partner technical review",
  "Partner support review", "Partner documentation review", "Regional availability",
  "Data handling review", "SLA placeholder", "Incident contact", "Customer-facing approval status",
].map((c) => ({ check: c, status: ["passing", "in_progress", "todo"][Math.floor(Math.random() * 3)] }));

export const MARKETPLACE_DISCIPLINE = {
  score: 81,
  controls: [
    { control: "Marketplace policy adherence",  status: "passing" },
    { control: "Carrier verification compliance", status: "passing" },
    { control: "Carrier quality reviews",       status: "in_progress" },
    { control: "Carrier suspension reviews",    status: "passing" },
    { control: "Dispute resolution SLA",        status: "in_progress" },
    { control: "Load award controls",           status: "passing" },
    { control: "Settlement controls",           status: "passing" },
    { control: "Marketplace fee controls",      status: "exception" },
    { control: "Fraud risk placeholder",        status: "placeholder" },
    { control: "Suspicious bidding placeholder", status: "placeholder" },
  ],
  regional: [
    { region: "USA-Texas",     health: "strong",   carriers: 412, gaps: "none" },
    { region: "USA-Midwest",   health: "strong",   carriers: 380, gaps: "none" },
    { region: "USA-Southeast", health: "imbalanced", carriers: 210, gaps: "supply" },
    { region: "Canada-ON",     health: "activating", carriers: 64,  gaps: "equipment-reefer" },
    { region: "Canada-QC",     health: "research",   carriers: 28,  gaps: "supply,localization" },
  ],
};

export const REGIONAL_ACTIVATIONS = [
  { region: "Canada-ON", readiness: 68, demand: "validated", supply: "adequate", equipment: "weak-reefer", partner: "ready", support: "ready", compliance: "in_progress", status: "Activating" },
  { region: "Canada-QC", readiness: 42, demand: "validating", supply: "weak", equipment: "todo", partner: "todo", support: "todo", compliance: "todo", status: "Research" },
];

export const DATA_RESIDENCY_EXEC = [
  { data_type: "Customer profile", current: "US", required: "US/CA",  customer_req: "Yes", country_req: "Maybe", risk: "low",      legal: "passing",     security: "passing",     tech: "drafted",     status: "tracking" },
  { data_type: "Driver profile",   current: "US", required: "US/CA",  customer_req: "Yes", country_req: "Maybe", risk: "medium",   legal: "in_progress", security: "passing",     tech: "drafted",     status: "tracking" },
  { data_type: "Driver location",  current: "US", required: "CA-only", customer_req: "Yes", country_req: "Yes",  risk: "medium",   legal: "in_progress", security: "in_progress", tech: "in_progress", status: "exception" },
  { data_type: "CoPilot transcripts", current: "US", required: "Legal review", customer_req: "Maybe", country_req: "TBD", risk: "high", legal: "todo", security: "in_progress", tech: "todo", status: "exception" },
  { data_type: "POD documents",    current: "US", required: "US/CA",  customer_req: "Yes", country_req: "Yes",  risk: "low",      legal: "passing",     security: "passing",     tech: "drafted",     status: "tracking" },
  { data_type: "Support tickets",  current: "US", required: "US/CA",  customer_req: "No",  country_req: "Maybe", risk: "low",      legal: "passing",     security: "passing",     tech: "drafted",     status: "tracking" },
];

export const CROSS_BORDER_PLACEHOLDER = [
  { id: "xb-001", origin: "USA-TX", dest: "Mexico-MTY", checkpoint: "Laredo", customs: "placeholder", broker: "placeholder", invoice: "placeholder", carrier: "Acme Freight", status: "placeholder", customer_msg: "Cross-border tracking placeholder", docs: "placeholder", exception: "—" },
  { id: "xb-002", origin: "USA-MI", dest: "Canada-ON",  checkpoint: "Detroit-Windsor", customs: "placeholder", broker: "placeholder", invoice: "placeholder", carrier: "NorthHaul", status: "placeholder", customer_msg: "Cross-border tracking placeholder", docs: "placeholder", exception: "Doc placeholder" },
];

export const SUPPORT_READINESS = [
  { region: "USA",    hours: "24/7", tz: "ET/CT/MT/PT", language: "EN",       escalation: "ready", critical: "ready", driver: "ready", customer: "ready", marketplace: "ready", api: "ready", partner: "ready", sla: "drafted", staffing: "covered" },
  { region: "Canada", hours: "12/5", tz: "ET/PT",       language: "EN,FR-todo", escalation: "ready", critical: "ready", driver: "in_progress", customer: "in_progress", marketplace: "in_progress", api: "ready", partner: "in_progress", sla: "drafted", staffing: "partial" },
  { region: "Mexico", hours: "todo", tz: "CT",          language: "ES-todo",   escalation: "todo",  critical: "todo",  driver: "todo",   customer: "todo",   marketplace: "todo", api: "todo", partner: "todo", sla: "todo", staffing: "todo" },
  { region: "EU",     hours: "todo", tz: "CET",         language: "EN,multi-todo", escalation: "todo", critical: "todo", driver: "todo", customer: "todo", marketplace: "todo", api: "todo", partner: "todo", sla: "todo", staffing: "todo" },
];

export const COMPLIANCE_EXEC = [
  { control: "Data residency",      owner: "CCO",     region: "Canada", evidence_needed: "Plan + DPA", evidence_collected: "partial", status: "in_progress", exception: "open",  remediation: "Q3 review", next_review: "2026-08-15", escalate: true },
  { control: "Privacy disclosures", owner: "Legal",   region: "Canada", evidence_needed: "PIPEDA",     evidence_collected: "drafted", status: "in_progress", exception: "—",     remediation: "Draft v2",  next_review: "2026-08-01", escalate: false },
  { control: "Driver tracking",     owner: "Legal",   region: "EU",     evidence_needed: "GDPR review", evidence_collected: "missing", status: "todo",        exception: "open",  remediation: "Q4 plan",   next_review: "2026-10-01", escalate: true },
  { control: "Financial controls",  owner: "CFO",     region: "Global", evidence_needed: "Recon evidence", evidence_collected: "partial", status: "in_progress", exception: "open", remediation: "In flight", next_review: "2026-07-15", escalate: false },
  { control: "AI governance",       owner: "CISO",    region: "Global", evidence_needed: "Approval logs", evidence_collected: "passing", status: "passing",     exception: "—",     remediation: "—",          next_review: "2026-09-01", escalate: false },
];

export const REGIONAL_RISKS = [
  { region: "Canada", category: "Compliance",        level: "medium", mitigation: "Legal review in flight" },
  { region: "Canada", category: "Data residency",    level: "medium", mitigation: "Tech plan drafted" },
  { region: "Canada", category: "Support coverage",  level: "medium", mitigation: "FR support hiring" },
  { region: "Canada", category: "Marketplace liquidity", level: "medium", mitigation: "Carrier supply build" },
  { region: "Mexico", category: "Billing/tax",       level: "high",   mitigation: "Research" },
  { region: "Mexico", category: "Compliance",        level: "high",   mitigation: "Research" },
  { region: "Mexico", category: "Partner",           level: "high",   mitigation: "Research" },
  { region: "EU",     category: "Data residency",    level: "high",   mitigation: "Plan" },
  { region: "EU",     category: "Legal",             level: "high",   mitigation: "Outside counsel" },
  { region: "EU",     category: "Billing/tax",       level: "high",   mitigation: "Research" },
  { region: "Global", category: "Carrier quality",   level: "low",    mitigation: "Quality program" },
  { region: "Global", category: "Customer concentration", level: "medium", mitigation: "Diversification" },
];

export const LAUNCH_APPROVALS = [
  { id: "ap-001", title: "Canada controlled pilot",         type: "Country launch",         status: "pending", owner: "CEO",  conditions: ["Resolve localization gap", "Monitor data residency exception", "Weekly launch review"] },
  { id: "ap-002", title: "Canada regional marketplace",     type: "Regional marketplace",   status: "pending", owner: "COO",  conditions: ["Equipment coverage plan"] },
  { id: "ap-003", title: "Regulated customer go-live",      type: "Regulated customer",     status: "pending", owner: "CCO",  conditions: ["Complete control pack"] },
  { id: "ap-004", title: "GeoTab CA partner launch",        type: "Partner launch",         status: "approved", owner: "CSO", conditions: [] },
  { id: "ap-005", title: "Driver location residency exception", type: "Data residency exception", status: "pending", owner: "CISO", conditions: ["Quarterly review"] },
];

export const OPERATING_CADENCES = [
  { cadence: "Daily global ops review",        owner: "COO",   freq: "daily",     duration: "30m" },
  { cadence: "Weekly country launch review",   owner: "VP Intl", freq: "weekly",  duration: "60m" },
  { cadence: "Weekly marketplace health",      owner: "Mkt Lead", freq: "weekly", duration: "45m" },
  { cadence: "Weekly support readiness",       owner: "VP Support", freq: "weekly", duration: "30m" },
  { cadence: "Weekly compliance control",      owner: "CCO",   freq: "weekly",   duration: "45m" },
  { cadence: "Monthly financial controls",     owner: "CFO",   freq: "monthly",  duration: "60m" },
  { cadence: "Monthly partner launch",         owner: "Partner Lead", freq: "monthly", duration: "60m" },
  { cadence: "Quarterly global expansion",     owner: "CEO",   freq: "quarterly", duration: "120m" },
  { cadence: "Quarterly executive governance", owner: "CEO",   freq: "quarterly", duration: "90m" },
];

export const INTL_CUSTOMERS = [
  { customer: "MapleCo Logistics", country: "Canada", health: 82, adoption: 74, expansion: "high",   renewal_risk: "low",    owner: "CSM-CA", needs: "FR support, CAD billing" },
  { customer: "NorthPath Freight", country: "Canada", health: 71, adoption: 60, expansion: "medium", renewal_risk: "medium", owner: "CSM-CA", needs: "EDI partner" },
  { customer: "Pilot Regulated A", country: "USA",    health: 88, adoption: 80, expansion: "high",   renewal_risk: "low",    owner: "CSM-US", needs: "Control pack" },
];

export const V75_REPORTS = [
  "Global expansion execution", "Country launch readiness", "Controlled country pilots",
  "Regulated customer onboarding", "Financial audit readiness", "Revenue reconciliation placeholder",
  "Global revenue controls", "International partner launch", "Marketplace operating discipline",
  "Regional marketplace activation", "Data residency execution", "Cross-border workflow placeholder",
  "Global support readiness", "Global compliance controls", "Regional risk management",
  "Executive global launch governance", "Global operating cadence",
].map((name, i) => ({ id: `r-${i + 1}`, name, status: "available" }));
