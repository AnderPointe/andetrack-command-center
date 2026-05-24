// V23 Enterprise Trust Automation Operating Network — mock data. Illustrative only.

const matrix = (label: string) => [
  { control: `${label} signal coverage`,             status: "Passing", owner: "Trust eng" },
  { control: `${label} owner coverage`,              status: "Passing", owner: "Trust ops" },
  { control: `${label} evidence automation`,         status: "Watch",   owner: "Evidence" },
  { control: `${label} approval routing automation`, status: "HITL",    owner: "Governance" },
  { control: `${label} boundary automation`,         status: "Passing", owner: "Security" },
  { control: `${label} audit automation`,            status: "Passing", owner: "Audit" },
  { control: `${label} exception management`,        status: "Watch",   owner: "Remediation" },
  { control: `${label} outcome automation`,          status: "Passing", owner: "Ops excellence" },
];
const exc = (prefix: string, area: string) => [
  { id: `${prefix}-1`, control: area, desc: `${area} automation exception requires HITL`, owner: "Security", risk: "High",   sla: "24h" },
  { id: `${prefix}-2`, control: area, desc: `${area} evidence refresh overdue`,           owner: "Evidence", risk: "Medium", sla: "72h" },
];
const rem = (prefix: string) => [
  { id: `${prefix}R-1`, action: "Refresh stale automation evidence",        owner: "Evidence", due: "7d",  status: "In progress" },
  { id: `${prefix}R-2`, action: "Close exception with HITL approval",       owner: "Security", due: "3d",  status: "Open" },
  { id: `${prefix}R-3`, action: "Tune policy from automation lesson",       owner: "AI Gov.",  due: "14d", status: "Open" },
];
const pack = (label: string, score: number, kpis: { label: string; value: string | number }[]) => ({
  score, kpis, matrix: matrix(label),
  exceptions: exc(label.replace(/\s+/g, "").slice(0, 3).toUpperCase(), label),
  remediation: rem(label.slice(0, 3).toUpperCase()),
});

export const V23_SCOPE = {
  version: "V23",
  in_scope: [
    "Enterprise Trust Automation Operating Network",
    "Customer Lifecycle Intelligence Scale", "Partner Lifecycle Intelligence Scale",
    "Board Trust Assurance Execution",
    "Revenue Trust Automation Systems",
    "Marketplace Trust Automation Governance",
    "Executive Trust Automation Command",
    "Trust Evidence Automation Network",
    "Customer Boundary Automation Governance", "Partner Boundary Automation Governance",
    "Human Approval Automation Governance",
    "Recommendation Automation Governance",
    "Outcome Automation Intelligence",
    "Trust Audit Automation Network", "Trust Risk Automation Intelligence",
    "Capital Trust Automation Readiness",
    "Product Trust Automation Intelligence", "Category Trust Automation Leadership",
    "Enterprise Trust Automation Exception Management",
    "Board Trust Automation Reporting", "Long-Term Trust Automation Operating Roadmap",
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace / capital / board",
    "Final IPO / acquisition / audited-financial claims",
    "Final SOC 2 / ISO / Android Auto / CarPlay without evidence",
    "Customs production, international tax, insurance underwriting, autonomous vehicles",
  ],
};

export const V23_FEATURE_MATRIX = [
  { feature: "Trust Automation Operating Network",     status: "Live",     hitl: "n/a" },
  { feature: "Board Trust Assurance Execution",        status: "Live",     hitl: "Approval + redaction" },
  { feature: "Revenue Trust Automation Systems",       status: "Live",     hitl: "Concentration + churn" },
  { feature: "Marketplace Trust Automation Governance",status: "Live",     hitl: "Award + dispute + preferred" },
  { feature: "Customer Lifecycle Intelligence Scale",  status: "Live",     hitl: "Publishing + comms" },
  { feature: "Partner Lifecycle Intelligence Scale",   status: "Live",     hitl: "Publishing + comms" },
  { feature: "Trust Evidence Automation Network",      status: "Live",     hitl: "External + board use" },
  { feature: "Human Approval Automation Governance",   status: "Live",     hitl: "All high-impact" },
  { feature: "Capital Trust Automation Readiness",     status: "Live",     hitl: ">$25k two-person" },
  { feature: "Autonomous high-impact actions",         status: "Deferred", hitl: "Always HITL" },
];

export const V23_HEADLINE = {
  headline: "V23 enterprise trust automation operating network live — 98% operating score, all high-impact actions HITL-gated across the network.",
  highlights: [
    "Customer intelligence scale 96% · Partner intelligence scale 94% · Board assurance execution 95%",
    "Revenue automation systems 94% · MP automation governance 93% · Evidence automation network 96%",
    "Approval automation 97% · Recommendation automation 95% · Outcome automation 95%",
    "Audit automation 95% · Risk automation 93% · Capital automation 94%",
    "0 autonomous high-impact actions · 100% network audit coverage",
  ],
};

export const V23_OPERATING        = pack("Enterprise trust automation operating network", 98, [
  { label: "Operating score", value: "98%" }, { label: "Domain coverage", value: "20/20" },
  { label: "HITL coverage", value: "100%" }, { label: "Open exceptions", value: 7 },
]);
export const V23_CUSTOMER         = pack("Customer lifecycle intelligence scale", 96, [
  { label: "Signal coverage", value: "97%" }, { label: "Onboarding", value: "96%" },
  { label: "Proof external-use", value: "1 pending" }, { label: "Boundary", value: "Passing" },
]);
export const V23_PARTNER          = pack("Partner lifecycle intelligence scale", 94, [
  { label: "Signal coverage", value: "95%" }, { label: "Integration", value: "94%" },
  { label: "Enablement", value: "1 gap" }, { label: "Boundary", value: "Passing" },
]);
export const V23_BOARD            = pack("Board trust assurance execution", 95, [
  { label: "Packet assurance", value: "96%" }, { label: "Decision evidence", value: "95%" },
  { label: "Board-use approvals", value: "2 open" }, { label: "Readiness blockers", value: 1 },
]);
export const V23_REVENUE          = pack("Revenue trust automation systems", 94, [
  { label: "Renewal auto.", value: "95%" }, { label: "Expansion auto.", value: "93%" },
  { label: "Concentration", value: "1 exc" }, { label: "Evidence refresh", value: 2 },
]);
export const V23_MP               = pack("Marketplace trust automation governance", 93, [
  { label: "Carrier density", value: "91%" }, { label: "Lane liquidity", value: "94%" },
  { label: "Southeast", value: "Weak" }, { label: "Award latency", value: "-20%" },
]);
export const V23_EXEC             = pack("Executive trust automation command", 96, [
  { label: "CEO queue", value: 3 }, { label: "CFO queue", value: 2 },
  { label: "Overdue approvals", value: 1 }, { label: "Escalations", value: 0 },
]);
export const V23_EVIDENCE         = pack("Trust evidence automation network", 96, [
  { label: "Freshness", value: "Refresh 3" }, { label: "Completeness", value: "97%" },
  { label: "External-use", value: "1 overdue" }, { label: "Board-use ready", value: "Yes" },
]);
export const V23_CUST_BOUNDARY    = pack("Customer boundary automation governance", 97, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Comms approvals", value: "HITL" }, { label: "Tenant isolation", value: "Current" },
]);
export const V23_PART_BOUNDARY    = pack("Partner boundary automation governance", 96, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Joint-customer", value: "Consented" }, { label: "Integration boundary", value: "Passing" },
]);
export const V23_APPROVAL         = pack("Human approval automation governance", 97, [
  { label: "Coverage", value: "100%" }, { label: "SLA health", value: "98%" },
  { label: "Backup approver", value: "100%" }, { label: "Override audited", value: "Yes" },
]);
export const V23_REC              = pack("Recommendation automation governance", 95, [
  { label: "Explainability", value: "96%" }, { label: "Confidence calibration", value: "On" },
  { label: "Policy compliance", value: "100%" }, { label: "Outcome linkage", value: "95%" },
]);
export const V23_OUTCOME          = pack("Outcome automation intelligence", 95, [
  { label: "Approved outcomes", value: "95%" }, { label: "Lessons captured", value: "Yes" },
  { label: "Calibration drift", value: "<3%" }, { label: "Board visible", value: "Monthly" },
]);
export const V23_AUDIT            = pack("Trust audit automation network", 95, [
  { label: "Schedule", value: "96%" }, { label: "Owner coverage", value: "100%" },
  { label: "Findings", value: "-26%" }, { label: "Retest", value: "On track" },
]);
export const V23_RISK             = pack("Trust risk automation intelligence", 93, [
  { label: "Signal quality", value: "95%" }, { label: "Mitigation", value: "94%" },
  { label: "Recurrence tracking", value: "On" }, { label: "Board visibility", value: "Yes" },
]);
export const V23_CAPITAL          = pack("Capital trust automation readiness", 94, [
  { label: "Data room", value: "95%" }, { label: "External-use approvals", value: "On" },
  { label: "Two-person sign-off >$25k", value: "Enforced" }, { label: "Audit", value: "96%" },
]);
export const V23_PRODUCT          = pack("Product trust automation intelligence", 93, [
  { label: "Adoption", value: "94%" }, { label: "Reliability", value: "95%" },
  { label: "Support burden", value: "Watch" }, { label: "Audit", value: "94%" },
]);
export const V23_CATEGORY         = pack("Category trust automation leadership", 92, [
  { label: "Narrative", value: "93%" }, { label: "Proof assets", value: "91%" },
  { label: "Publishing approvals", value: "HITL" }, { label: "External-use approvals", value: "On" },
]);
export const V23_EXCEPTION        = pack("Enterprise trust automation exception management", 91, [
  { label: "Open exceptions", value: 7 }, { label: "High risk", value: 4 },
  { label: "Remediation in flight", value: 5 }, { label: "Board visible", value: 3 },
]);

export const V23_BOARD_REPORT = {
  score: 95,
  kpis: [
    { label: "Operating score", value: "98%" }, { label: "Customer intel", value: "96%" },
    { label: "Partner intel", value: "94%" }, { label: "Board assurance", value: "95%" },
    { label: "Revenue auto.", value: "94%" }, { label: "MP auto.", value: "93%" },
    { label: "Evidence net.", value: "96%" }, { label: "Approval gov.", value: "97%" },
  ],
  matrix: [
    { section: "Enterprise trust automation operating network", status: "Strong", owner: "CEO" },
    { section: "Customer lifecycle intelligence scale",          status: "Strong", owner: "CCO" },
    { section: "Partner lifecycle intelligence scale",           status: "Watch",  owner: "Partner Ops" },
    { section: "Board trust assurance execution",                status: "Strong", owner: "Board Office" },
    { section: "Revenue trust automation systems",               status: "Strong", owner: "CFO/CRO" },
    { section: "Marketplace trust automation governance",        status: "Watch",  owner: "MP leader" },
    { section: "Trust evidence automation network",              status: "Strong", owner: "CISO" },
    { section: "Boundary automation governance",                 status: "Strong", owner: "CISO" },
    { section: "Approval / Rec / Outcome automation",            status: "Strong", owner: "Governance" },
    { section: "Audit automation network",                       status: "Strong", owner: "Audit" },
    { section: "Risk automation intelligence",                   status: "Watch",  owner: "Risk" },
    { section: "Capital / Product / Category automation",        status: "Strong", owner: "ELT" },
    { section: "Trust automation exceptions",                    status: "Watch",  owner: "Risk" },
    { section: "Decisions needed",                               status: "2 open", owner: "CEO/CFO" },
    { section: "Next-quarter priorities",                        status: "Drafted",owner: "ELT" },
  ],
};

export const V23_ROADMAP = {
  score: 93,
  horizons: [
    { horizon: "Current Q", focus: "Close 7 automation exceptions; refresh 3 evidence items" },
    { horizon: "Next Q",    focus: "Deepen recommendation + outcome automation governance" },
    { horizon: "6 months",  focus: "Revenue + MP automation expansion (HITL preserved)" },
    { horizon: "12 months", focus: "Board assurance execution + capital automation scale" },
    { horizon: "24 months", focus: "Product + category automation leadership scale" },
    { horizon: "36 months", focus: "Trust-led category leadership at automation network scale" },
  ],
};

export const V23_REPORTS = [
  "Enterprise trust automation operating network", "Customer lifecycle intelligence scale",
  "Partner lifecycle intelligence scale", "Board trust assurance execution",
  "Revenue trust automation systems", "Marketplace trust automation governance",
  "Executive trust automation command", "Trust evidence automation network",
  "Customer boundary automation governance", "Partner boundary automation governance",
  "Human approval automation governance", "Recommendation automation governance",
  "Outcome automation intelligence", "Trust audit automation network",
  "Trust risk automation intelligence", "Capital trust automation readiness",
  "Product trust automation intelligence", "Category trust automation leadership",
  "Enterprise trust automation exceptions", "Board trust automation reporting",
  "Long-term trust automation operating roadmap",
].map((name, i) => ({ id: `RPT23-${i + 1}`, name, owner: "Trust ops", status: "Ready" }));

export const V23_RLS = [
  { policy: "v23_company_operating_view",     rule: "company_id = current_company() AND has_role(auth.uid(), company_id, 'admin')",   surface: "tenant automation operating records" },
  { policy: "v23_platform_network_view",      rule: "is_platform_owner(auth.uid())",                                                    surface: "trust automation operating / audit / exception platform tables" },
  { policy: "v23_executive_view",             rule: "has_role(auth.uid(), company_id, 'admin') OR role 'owner'",                        surface: "executive command / capital / risk / exceptions" },
  { policy: "v23_board_report_view",          rule: "has_role(auth.uid(), company_id, 'board_viewer') AND report.approved = true",     surface: "board_trust_automation_reports" },
  { policy: "v23_security_admin_manage",      rule: "has_role(auth.uid(), company_id, 'security_admin')",                              surface: "boundary automation / audit network / exception mgmt / approval gov." },
  { policy: "v23_revops_manage",              rule: "has_role(auth.uid(), company_id, 'revops')",                                      surface: "revenue trust automation systems" },
  { policy: "v23_mp_leader_manage",           rule: "has_role(auth.uid(), company_id, 'mp_leader')",                                   surface: "marketplace trust automation governance" },
  { policy: "v23_cs_assigned_customers",      rule: "customer_id IN (SELECT customer_id FROM customer_users WHERE user_id = auth.uid())", surface: "customer lifecycle intelligence scale" },
  { policy: "v23_partner_mgr_manage",         rule: "has_role(auth.uid(), company_id, 'partner_manager')",                             surface: "partner lifecycle intelligence scale" },
  { policy: "v23_product_lead_manage",        rule: "has_role(auth.uid(), company_id, 'product_lead')",                                surface: "product trust automation intelligence" },
  { policy: "v23_category_lead_manage",       rule: "has_role(auth.uid(), company_id, 'category_lead')",                               surface: "category trust automation leadership" },
  { policy: "v23_hitl_required",              rule: "high_impact = true REQUIRES approver_id <> recommender_id",                       surface: "all HITL flows" },
  { policy: "v23_capital_two_person",         rule: "capital_action AND amount_usd > 25000 REQUIRES two distinct approver_ids",       surface: "capital trust automation readiness" },
  { policy: "v23_evidence_append_only",       rule: "UPDATE/DELETE DENIED on evidence; append-only via versions",                     surface: "trust evidence automation network" },
  { policy: "v23_customer_user_block",        rule: "customer users blocked from internal operating / audit / capital / board / exception", surface: "internal automation" },
  { policy: "v23_carrier_user_block_mp",      rule: "carrier users blocked from MP internals unless explicitly exposed",              surface: "marketplace internals" },
  { policy: "v23_partner_user_approved_only", rule: "partner users see only approved partner-facing automation records",              surface: "partner-facing automation" },
];

export const V23_EDGE = {
  rule: "App-internal automation logic = TanStack createServerFn (requireSupabaseAuth + role). External callers = /api/public/v23/* with HMAC-verified signatures. No autonomous dispatch/pricing/billing.",
  serverfn: [
    "calculate-v23-trust-automation-operating-score","generate-trust-automation-operating-summary",
    "detect-trust-automation-operating-gaps","generate-trust-automation-operating-action-plan",
    "calculate-customer-lifecycle-intelligence-scale","calculate-partner-lifecycle-intelligence-scale",
    "detect-customer-lifecycle-intelligence-exceptions","detect-partner-lifecycle-intelligence-exceptions",
    "calculate-board-trust-assurance-execution","detect-board-trust-assurance-exceptions",
    "generate-board-trust-automation-report","calculate-revenue-trust-automation-systems",
    "detect-revenue-trust-automation-exceptions","generate-revenue-trust-automation-plan",
    "calculate-marketplace-trust-automation-governance","detect-marketplace-trust-automation-exceptions",
    "generate-marketplace-trust-automation-plan","calculate-trust-evidence-automation-network",
    "calculate-customer-boundary-automation-governance","calculate-partner-boundary-automation-governance",
    "calculate-human-approval-automation-governance","calculate-recommendation-automation-governance",
    "calculate-outcome-automation-intelligence","calculate-trust-audit-automation-network",
    "calculate-trust-risk-automation-intelligence","calculate-capital-trust-automation-readiness",
    "calculate-product-trust-automation-intelligence","calculate-category-trust-automation-leadership",
    "route-enterprise-trust-automation-exception","calculate-enterprise-trust-automation-exception-score",
    "generate-long-term-trust-automation-operating-roadmap",
  ].map(name => ({ name, kind: "ServerFn", auth: "requireSupabaseAuth + role" })),
  edge_routes: [
    { path: "/api/public/v23/health",            purpose: "Liveness probe (no PII)" },
    { path: "/api/public/v23/trust-webhook",     purpose: "External trust signal ingest (HMAC-verified)" },
    { path: "/api/public/v23/board-distribute",  purpose: "Approved-only board packet distribution (signed link)" },
    { path: "/api/public/v23/partner-callback",  purpose: "Partner system callback (HMAC-verified)" },
  ],
};

export const V23_GUARDRAILS = [
  "No fully autonomous dispatch, pricing, billing, marketplace, capital, board.",
  "Every high-impact assist requires human approval (approver_id ≠ recommender_id).",
  "Capital actions > $25k require two-person sign-off.",
  "Append-only evidence; no in-place mutation.",
  "RBAC + RLS + tenant isolation enforced across all automation network records.",
  "Customer / carrier / partner users blocked from internal operating, audit, capital, board, exception records.",
];

export const V23_DEMO = [
  { id: 1,  actor: "CEO",          step: "Opens Enterprise Trust Automation Operating Network — score 98%" },
  { id: 2,  actor: "CEO",          step: "Customer intel 96%, partner intel 94%, board 95%, revenue 94%, MP 93%" },
  { id: 3,  actor: "CCO",          step: "Customer Lifecycle Intelligence Scale — signals strong; 1 customer proof asset awaiting external-use approval" },
  { id: 4,  actor: "Partner Ops",  step: "Partner Lifecycle Intelligence Scale — telematics strong; API partner enablement gap; partner-facing evidence pending publish approval" },
  { id: 5,  actor: "Board admin",  step: "Board Trust Assurance Execution — 2 board-use evidence approvals pending; 1 decision awaiting CEO" },
  { id: 6,  actor: "RevOps",       step: "Revenue Trust Automation Systems — 1 concentration exception; 2 stale evidence to refresh" },
  { id: 7,  actor: "MP leader",    step: "Marketplace Trust Automation Governance — Southeast weak; preferred-carrier rec pending approval" },
  { id: 8,  actor: "CISO",         step: "Trust Evidence Automation Network — 1 stale; 1 external-use overdue; tenant isolation current" },
  { id: 9,  actor: "Governance",   step: "Human Approval Automation Governance — approver_id ≠ recommender_id enforced; backup approver 100%" },
  { id: 10, actor: "Risk",         step: "Enterprise Trust Automation Exception Mgmt — 4 high-risk: MP SE, customer proof, partner enablement, board evidence" },
  { id: 11, actor: "Board admin",  step: "Generates Board Trust Automation Report (operating + KPIs + exceptions + decisions + Q+1 priorities)" },
  { id: 12, actor: "ELT",          step: "Reviews Long-Term Trust Automation Operating Roadmap (Q+1 → 36 months)" },
];

export const V23_PHASE60_TEASER = {
  version: "V23.5",
  themes: [
    "Enterprise trust automation maturity",
    "Customer/partner intelligence optimization",
    "Board automation assurance maturity",
    "Revenue automation trust optimization",
    "Marketplace automation trust scale",
  ],
};
