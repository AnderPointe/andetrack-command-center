// V23.5 Enterprise Trust Automation Maturity — Phase 60 mock data. Illustrative only.

const matrix = (label: string) => [
  { control: `${label} signal quality`,              status: "Passing", owner: "Trust eng" },
  { control: `${label} signal coverage`,             status: "Passing", owner: "Trust ops" },
  { control: `${label} automation coverage`,         status: "Passing", owner: "Trust ops" },
  { control: `${label} evidence maturity`,           status: "Watch",   owner: "Evidence" },
  { control: `${label} approval maturity`,           status: "HITL",    owner: "Governance" },
  { control: `${label} boundary maturity`,           status: "Passing", owner: "Security" },
  { control: `${label} audit maturity`,              status: "Passing", owner: "Audit" },
  { control: `${label} exception optimization`,      status: "Watch",   owner: "Remediation" },
  { control: `${label} outcome optimization`,        status: "Passing", owner: "Ops excellence" },
  { control: `${label} remediation health`,          status: "Passing", owner: "Trust ops" },
];
const exc = (prefix: string, area: string) => [
  { id: `${prefix}-1`, control: area, desc: `${area} maturity exception requires HITL`,    owner: "Security",   risk: "High",   sla: "24h" },
  { id: `${prefix}-2`, control: area, desc: `${area} evidence refresh overdue`,            owner: "Evidence",   risk: "Medium", sla: "72h" },
  { id: `${prefix}-3`, control: area, desc: `${area} approval SLA breach`,                 owner: "Governance", risk: "Medium", sla: "48h" },
];
const rem = (prefix: string) => [
  { id: `${prefix}R-1`, action: "Refresh stale maturity evidence",          owner: "Evidence",   due: "7d",  status: "In progress" },
  { id: `${prefix}R-2`, action: "Close maturity exception via HITL approval", owner: "Security", due: "3d",  status: "Open" },
  { id: `${prefix}R-3`, action: "Tune policy from maturity lesson",          owner: "AI Gov.",   due: "14d", status: "Open" },
  { id: `${prefix}R-4`, action: "Add backup approver coverage gap",          owner: "Governance", due: "5d",  status: "Open" },
];
const pack = (label: string, score: number, kpis: { label: string; value: string | number }[]) => ({
  score, kpis, matrix: matrix(label),
  exceptions: exc(label.replace(/\s+/g, "").slice(0, 3).toUpperCase(), label),
  remediation: rem(label.slice(0, 3).toUpperCase()),
});

export const V235_SCOPE = {
  version: "V23.5",
  in_scope: [
    "Enterprise Trust Automation Maturity Command Center",
    "Customer Intelligence Optimization Center",
    "Partner Intelligence Optimization Center",
    "Board Automation Assurance Maturity Center",
    "Revenue Automation Trust Optimization Center",
    "Marketplace Automation Trust Scale Center",
    "Executive Automation Maturity Command Center",
    "Trust Evidence Automation Maturity Center",
    "Customer Boundary Automation Maturity Center",
    "Partner Boundary Automation Maturity Center",
    "Human Approval Automation Maturity Center",
    "Recommendation Automation Maturity Center",
    "Outcome Automation Optimization Center",
    "Trust Audit Automation Maturity Center",
    "Trust Risk Automation Maturity Center",
    "Capital Trust Automation Maturity Center",
    "Product Trust Automation Maturity Center",
    "Category Trust Automation Maturity Center",
    "Enterprise Trust Automation Exception Optimization Center",
    "Board Trust Automation Maturity Reporting Center",
    "Long-Term Trust Automation Maturity Roadmap",
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace / capital / board",
    "Final IPO / acquisition / audited-financial claims",
    "Final SOC 2 / ISO / Android Auto / CarPlay without evidence",
    "Customs production, international tax, insurance underwriting, autonomous vehicles",
  ],
};

export const V235_FEATURE_MATRIX = [
  { feature: "Trust Automation Maturity Command",          status: "Live",     hitl: "n/a" },
  { feature: "Customer Intelligence Optimization",         status: "Live",     hitl: "Publishing + comms" },
  { feature: "Partner Intelligence Optimization",          status: "Live",     hitl: "Publishing + comms" },
  { feature: "Board Automation Assurance Maturity",        status: "Live",     hitl: "Approval + redaction" },
  { feature: "Revenue Automation Trust Optimization",      status: "Live",     hitl: "Concentration + churn" },
  { feature: "Marketplace Automation Trust Scale",         status: "Live",     hitl: "Award + dispute + preferred" },
  { feature: "Trust Evidence Automation Maturity",         status: "Live",     hitl: "External + board use" },
  { feature: "Boundary Automation Maturity",               status: "Live",     hitl: "Tenant-safe" },
  { feature: "Human Approval Automation Maturity",         status: "Live",     hitl: "All high-impact" },
  { feature: "Recommendation Automation Maturity",         status: "Live",     hitl: "Signed + approved" },
  { feature: "Outcome Automation Optimization",            status: "Live",     hitl: "Linked to approved rec" },
  { feature: "Trust Audit Automation Maturity",            status: "Live",     hitl: "Append-only" },
  { feature: "Capital Trust Automation Maturity",          status: "Live",     hitl: ">$25k two-person" },
  { feature: "Trust Automation Exception Optimization",    status: "Live",     hitl: "Owner + SLA + escalation" },
  { feature: "Long-Term Maturity Roadmap",                 status: "Live",     hitl: "n/a" },
  { feature: "Autonomous high-impact actions",             status: "Deferred", hitl: "Always HITL" },
];

export const V235_HEADLINE = {
  headline: "V23.5 enterprise trust automation maturity live — 98% maturity score across 20 automation centers, every high-impact action HITL-gated.",
  highlights: [
    "Customer intelligence optimization 96% · Partner intelligence optimization 95%",
    "Board automation assurance maturity 95% · Revenue automation trust optimization 94%",
    "Marketplace automation trust scale 93% · Trust evidence automation maturity 96%",
    "Human approval automation maturity 97% · Recommendation automation maturity 95%",
    "Audit automation maturity 95% · Risk automation maturity 93% · Capital automation maturity 94%",
    "0 autonomous high-impact actions · 100% maturity audit coverage",
  ],
};

export const V235_MATURITY      = pack("Enterprise trust automation maturity", 98, [
  { label: "Maturity score", value: "98%" }, { label: "Domain coverage", value: "20/20" },
  { label: "HITL coverage", value: "100%" }, { label: "Open exceptions", value: 8 },
]);
export const V235_CUSTOMER      = pack("Customer intelligence optimization", 96, [
  { label: "Signal quality", value: "97%" }, { label: "Signal coverage", value: "96%" },
  { label: "Renewal/expansion", value: "Strong" }, { label: "Proof external-use", value: "1 pending" },
]);
export const V235_PARTNER       = pack("Partner intelligence optimization", 95, [
  { label: "Signal quality", value: "96%" }, { label: "Integration", value: "Strong" },
  { label: "Enablement", value: "1 gap" }, { label: "Evidence publish", value: "HITL" },
]);
export const V235_BOARD         = pack("Board automation assurance maturity", 95, [
  { label: "Packet assurance", value: "96%" }, { label: "Decision evidence", value: "95%" },
  { label: "Board-use approvals", value: "2 open" }, { label: "Decision awaiting CEO", value: 1 },
]);
export const V235_REVENUE       = pack("Revenue automation trust optimization", 94, [
  { label: "Renewal optim.", value: "95%" }, { label: "Expansion optim.", value: "93%" },
  { label: "Concentration", value: "1 exc" }, { label: "Evidence refresh", value: 2 },
]);
export const V235_MP            = pack("Marketplace automation trust scale", 93, [
  { label: "Carrier density", value: "91%" }, { label: "Lane liquidity", value: "94%" },
  { label: "Southeast", value: "Weak" }, { label: "Preferred carrier", value: "Pending approval" },
]);
export const V235_EXEC          = pack("Executive automation maturity command", 96, [
  { label: "CEO queue", value: 3 }, { label: "CFO queue", value: 2 },
  { label: "Overdue approvals", value: 1 }, { label: "Escalations", value: 0 },
]);
export const V235_EVIDENCE      = pack("Trust evidence automation maturity", 96, [
  { label: "Freshness", value: "Refresh 3" }, { label: "Completeness", value: "97%" },
  { label: "External-use", value: "1 overdue" }, { label: "Board-use ready", value: "Yes" },
]);
export const V235_CUST_BOUNDARY = pack("Customer boundary automation maturity", 97, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Comms approvals", value: "HITL" }, { label: "Tenant isolation", value: "Current" },
]);
export const V235_PART_BOUNDARY = pack("Partner boundary automation maturity", 96, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Joint-customer", value: "Consented" }, { label: "Integration boundary", value: "Passing" },
]);
export const V235_APPROVAL      = pack("Human approval automation maturity", 97, [
  { label: "Coverage", value: "100%" }, { label: "SLA health", value: "98%" },
  { label: "Backup approver", value: "100%" }, { label: "Override audited", value: "Yes" },
]);
export const V235_REC           = pack("Recommendation automation maturity", 95, [
  { label: "Explainability", value: "96%" }, { label: "Confidence calibration", value: "On" },
  { label: "Policy compliance", value: "100%" }, { label: "Outcome linkage", value: "95%" },
]);
export const V235_OUTCOME       = pack("Outcome automation optimization", 95, [
  { label: "Approved outcomes", value: "95%" }, { label: "Lessons captured", value: "Yes" },
  { label: "Calibration drift", value: "<3%" }, { label: "Board visible", value: "Monthly" },
]);
export const V235_AUDIT         = pack("Trust audit automation maturity", 95, [
  { label: "Schedule", value: "96%" }, { label: "Owner coverage", value: "100%" },
  { label: "Findings", value: "-28%" }, { label: "Retest", value: "On track" },
]);
export const V235_RISK          = pack("Trust risk automation maturity", 93, [
  { label: "Signal quality", value: "95%" }, { label: "Mitigation", value: "94%" },
  { label: "Recurrence tracking", value: "On" }, { label: "Board visibility", value: "Yes" },
]);
export const V235_CAPITAL       = pack("Capital trust automation maturity", 94, [
  { label: "Data room", value: "95%" }, { label: "External-use approvals", value: "On" },
  { label: "Two-person > $25k", value: "Enforced" }, { label: "Audit", value: "96%" },
]);
export const V235_PRODUCT       = pack("Product trust automation maturity", 93, [
  { label: "Adoption", value: "94%" }, { label: "Reliability", value: "95%" },
  { label: "Support burden", value: "Watch" }, { label: "Audit", value: "94%" },
]);
export const V235_CATEGORY      = pack("Category trust automation maturity", 92, [
  { label: "Narrative", value: "93%" }, { label: "Proof assets", value: "91%" },
  { label: "Publishing approvals", value: "HITL" }, { label: "External-use approvals", value: "On" },
]);
export const V235_EXCEPTION     = pack("Enterprise trust automation exception optimization", 92, [
  { label: "Open exceptions", value: 8 }, { label: "High risk", value: 4 },
  { label: "Remediation in flight", value: 6 }, { label: "Board visible", value: 3 },
]);

export const V235_BOARD_REPORT = {
  score: 95,
  kpis: [
    { label: "Maturity score", value: "98%" }, { label: "Customer intel optim.", value: "96%" },
    { label: "Partner intel optim.", value: "95%" }, { label: "Board assurance", value: "95%" },
    { label: "Revenue optim.", value: "94%" }, { label: "MP scale", value: "93%" },
    { label: "Evidence maturity", value: "96%" }, { label: "Approval maturity", value: "97%" },
  ],
  matrix: [
    { section: "Enterprise trust automation maturity",         status: "Strong", owner: "CEO" },
    { section: "Customer intelligence optimization",           status: "Strong", owner: "CCO" },
    { section: "Partner intelligence optimization",            status: "Watch",  owner: "Partner Ops" },
    { section: "Board automation assurance maturity",          status: "Strong", owner: "Board Office" },
    { section: "Revenue automation trust optimization",        status: "Strong", owner: "CFO/CRO" },
    { section: "Marketplace automation trust scale",           status: "Watch",  owner: "MP leader" },
    { section: "Trust evidence automation maturity",           status: "Strong", owner: "CISO" },
    { section: "Boundary automation maturity",                 status: "Strong", owner: "CISO" },
    { section: "Approval / Rec / Outcome automation maturity", status: "Strong", owner: "Governance" },
    { section: "Audit automation maturity",                    status: "Strong", owner: "Audit" },
    { section: "Risk automation maturity",                     status: "Watch",  owner: "Risk" },
    { section: "Capital / Product / Category maturity",        status: "Strong", owner: "ELT" },
    { section: "Trust automation exception optimization",      status: "Watch",  owner: "Risk" },
    { section: "Decisions needed",                             status: "2 open", owner: "CEO/CFO" },
    { section: "Next-quarter priorities",                      status: "Drafted",owner: "ELT" },
  ],
};

export const V235_ROADMAP = {
  score: 94,
  horizons: [
    { horizon: "Current Q", focus: "Close 8 maturity exceptions; refresh 3 evidence items" },
    { horizon: "Next Q",    focus: "Deepen recommendation + outcome maturity optimization" },
    { horizon: "6 months",  focus: "Revenue + MP maturity expansion (HITL preserved)" },
    { horizon: "12 months", focus: "Board assurance maturity + capital maturity scale" },
    { horizon: "24 months", focus: "Product + category maturity leadership" },
    { horizon: "36 months", focus: "Trust-led category leadership at automation maturity scale" },
  ],
};

export const V235_REPORTS = [
  "Enterprise trust automation maturity", "Customer intelligence optimization",
  "Partner intelligence optimization", "Board automation assurance maturity",
  "Revenue automation trust optimization", "Marketplace automation trust scale",
  "Executive automation maturity command", "Trust evidence automation maturity",
  "Customer boundary automation maturity", "Partner boundary automation maturity",
  "Human approval automation maturity", "Recommendation automation maturity",
  "Outcome automation optimization", "Trust audit automation maturity",
  "Trust risk automation maturity", "Capital trust automation maturity",
  "Product trust automation maturity", "Category trust automation maturity",
  "Enterprise trust automation exception optimization", "Board trust automation maturity reporting",
  "Long-term trust automation maturity roadmap",
].map((name, i) => ({ id: `RPT235-${i + 1}`, name, owner: "Trust ops", status: "Ready" }));

export const V235_RLS = [
  { policy: "v235_company_maturity_view",       rule: "company_id = current_company() AND has_role(auth.uid(), company_id, 'admin')",            surface: "tenant maturity records" },
  { policy: "v235_platform_maturity_view",      rule: "is_platform_owner(auth.uid())",                                                            surface: "platform maturity / audit / exception tables" },
  { policy: "v235_executive_view",              rule: "has_role(auth.uid(), company_id, 'admin') OR role 'owner'",                                surface: "exec command / capital / risk / exceptions" },
  { policy: "v235_board_report_view",           rule: "has_role(auth.uid(), company_id, 'board_viewer') AND report.approved = true",              surface: "board_trust_automation_maturity_reports" },
  { policy: "v235_security_admin_manage",       rule: "has_role(auth.uid(), company_id, 'security_admin')",                                       surface: "boundary maturity / audit maturity / exception mgmt / approval maturity / policy" },
  { policy: "v235_revops_manage",               rule: "has_role(auth.uid(), company_id, 'revops')",                                               surface: "revenue automation trust optimization" },
  { policy: "v235_mp_leader_manage",            rule: "has_role(auth.uid(), company_id, 'mp_leader')",                                            surface: "marketplace automation trust scale" },
  { policy: "v235_cs_assigned_customers",       rule: "customer_id IN (SELECT customer_id FROM customer_users WHERE user_id = auth.uid())",      surface: "customer intelligence optimization" },
  { policy: "v235_partner_mgr_manage",          rule: "has_role(auth.uid(), company_id, 'partner_manager')",                                     surface: "partner intelligence optimization" },
  { policy: "v235_product_lead_manage",         rule: "has_role(auth.uid(), company_id, 'product_lead')",                                        surface: "product trust automation maturity" },
  { policy: "v235_category_lead_manage",        rule: "has_role(auth.uid(), company_id, 'category_lead')",                                       surface: "category trust automation maturity" },
  { policy: "v235_hitl_required",               rule: "high_impact = true REQUIRES approver_id <> recommender_id",                                surface: "all HITL flows" },
  { policy: "v235_capital_two_person",          rule: "capital_action AND amount_usd > 25000 REQUIRES two distinct approver_ids",                 surface: "capital trust automation maturity" },
  { policy: "v235_evidence_append_only",        rule: "UPDATE/DELETE DENIED on evidence; append-only via versions",                              surface: "trust evidence automation maturity" },
  { policy: "v235_evidence_hash_chain",         rule: "prev_hash = sha256(prev_row) on INSERT",                                                  surface: "trust evidence automation maturity" },
  { policy: "v235_customer_user_block",         rule: "customer users blocked from internal maturity / audit / capital / board / exception",      surface: "internal maturity" },
  { policy: "v235_carrier_user_block_mp",       rule: "carrier users blocked from MP internals unless explicitly exposed",                        surface: "marketplace internals" },
  { policy: "v235_partner_user_approved_only",  rule: "partner users see only approved partner-facing maturity records",                          surface: "partner-facing maturity" },
];

export const V235_EDGE = {
  rule: "App-internal maturity logic = TanStack createServerFn (requireSupabaseAuth + role). External callers = /api/public/v235/* with HMAC-verified signatures. No autonomous dispatch/pricing/billing.",
  serverfn: [
    "calculate-v235-trust-automation-maturity-score","generate-trust-automation-maturity-summary",
    "detect-trust-automation-maturity-gaps","generate-trust-automation-maturity-action-plan",
    "calculate-customer-intelligence-optimization","calculate-partner-intelligence-optimization",
    "detect-customer-intelligence-optimization-exceptions","detect-partner-intelligence-optimization-exceptions",
    "calculate-board-automation-assurance-maturity","detect-board-automation-assurance-exceptions",
    "generate-board-trust-automation-maturity-report","calculate-revenue-automation-trust-optimization",
    "detect-revenue-automation-trust-exceptions","generate-revenue-automation-trust-optimization-plan",
    "calculate-marketplace-automation-trust-scale","detect-marketplace-automation-trust-exceptions",
    "generate-marketplace-automation-trust-scale-plan","calculate-trust-evidence-automation-maturity",
    "calculate-customer-boundary-automation-maturity","calculate-partner-boundary-automation-maturity",
    "calculate-human-approval-automation-maturity","calculate-recommendation-automation-maturity",
    "calculate-outcome-automation-optimization","calculate-trust-audit-automation-maturity",
    "calculate-trust-risk-automation-maturity","calculate-capital-trust-automation-maturity",
    "calculate-product-trust-automation-maturity","calculate-category-trust-automation-maturity",
    "route-trust-automation-exception-optimization","calculate-trust-automation-exception-optimization-score",
    "generate-long-term-trust-automation-maturity-roadmap",
  ].map(name => ({ name, kind: "ServerFn", auth: "requireSupabaseAuth + role" })),
  edge_routes: [
    { path: "/api/public/v235/health",            purpose: "Liveness probe (no PII)" },
    { path: "/api/public/v235/trust-webhook",     purpose: "External trust signal ingest (HMAC-verified)" },
    { path: "/api/public/v235/board-distribute",  purpose: "Approved-only board packet distribution (signed link)" },
    { path: "/api/public/v235/partner-callback",  purpose: "Partner system callback (HMAC-verified)" },
    { path: "/api/public/v235/regulator-pull",    purpose: "Regulator evidence pull (signature + IP-allow)" },
  ],
};

export const V235_GUARDRAILS = [
  "No fully autonomous dispatch, pricing, billing, marketplace, capital, board.",
  "Every high-impact assist requires human approval (approver_id ≠ recommender_id).",
  "Capital actions > $25k require two-person sign-off (enforced server-side, not UI).",
  "Append-only, hash-chained evidence; no in-place mutation.",
  "RBAC + RLS + tenant isolation enforced across all maturity records.",
  "Customer / carrier / partner users blocked from internal maturity, audit, capital, board, exception records.",
  "Public routes (/api/public/v235/*) accept only signature-verified payloads; never return PII.",
  "Server functions read process.env inside .handler(); secrets never bundle client-side.",
];

export const V235_DEMO = [
  { id: 1,  actor: "CEO",          step: "Opens Enterprise Trust Automation Maturity Command Center — maturity score 98%" },
  { id: 2,  actor: "CEO",          step: "Customer intel optim. 96%, partner intel optim. 95%, board 95%, revenue 94%, MP 93%" },
  { id: 3,  actor: "CCO",          step: "Customer Intelligence Optimization — signal quality strong; 1 proof asset awaiting external-use approval; boundary passing" },
  { id: 4,  actor: "Partner Ops",  step: "Partner Intelligence Optimization — telematics strong; API partner enablement gap; partner-facing evidence pending publish approval" },
  { id: 5,  actor: "Board admin",  step: "Board Automation Assurance Maturity — packet + KPI assurance strong; 2 board-use evidence approvals pending; 1 decision awaiting CEO" },
  { id: 6,  actor: "RevOps",       step: "Revenue Automation Trust Optimization — renewal/expansion strong; 1 concentration exception; 2 stale evidence to refresh" },
  { id: 7,  actor: "MP leader",    step: "Marketplace Automation Trust Scale — TX/Midwest strong; Southeast carrier density weak; preferred-carrier rec pending approval" },
  { id: 8,  actor: "CISO",         step: "Trust Evidence Automation Maturity — healthy; 1 stale; 1 external-use overdue; tenant isolation current" },
  { id: 9,  actor: "Governance",   step: "Human Approval Automation Maturity — coverage 100%, SLA 98%, backup approver 100%, override audited" },
  { id: 10, actor: "CEO",          step: "Enterprise Trust Automation Exception Optimization — high risk: SE MP, customer proof, partner enablement, board evidence" },
  { id: 11, actor: "Board admin",  step: "Generates Board Trust Automation Maturity Report (KPIs + exceptions + decisions + Q+1 priorities)" },
  { id: 12, actor: "ELT",          step: "Reviews Long-Term Trust Automation Maturity Roadmap (Q+1 → 36 months)" },
];

export const V235_PHASE61_TEASER = {
  version: "V24",
  themes: [
    "Enterprise trust intelligence operating system",
    "Customer/partner trust optimization maturity",
    "Board trust automation execution",
    "Revenue trust intelligence systems",
    "Marketplace trust intelligence governance",
  ],
};
