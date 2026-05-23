// V22 Enterprise Trust Lifecycle Operating System — mock data. Illustrative only.

const matrix = (label: string) => [
  { control: `${label} signal detection`,       status: "Passing", owner: "Trust eng" },
  { control: `${label} owner coverage`,         status: "Passing", owner: "Trust ops" },
  { control: `${label} evidence lifecycle`,     status: "Watch",   owner: "Evidence" },
  { control: `${label} approval routing`,       status: "HITL",    owner: "Governance" },
  { control: `${label} boundary enforcement`,   status: "Passing", owner: "Security" },
  { control: `${label} audit completeness`,     status: "Passing", owner: "Audit" },
  { control: `${label} exception remediation`,  status: "Watch",   owner: "Remediation" },
  { control: `${label} outcome tracking`,       status: "Passing", owner: "Ops excellence" },
];
const exc = (prefix: string, area: string) => [
  { id: `${prefix}-1`, control: area, desc: `${area} lifecycle exception requires human approval`, owner: "Security", risk: "High",   sla: "24h" },
  { id: `${prefix}-2`, control: area, desc: `${area} evidence refresh overdue`,                     owner: "Evidence", risk: "Medium", sla: "72h" },
];
const rem = (prefix: string) => [
  { id: `${prefix}R-1`, action: "Refresh stale lifecycle evidence",       owner: "Evidence",  due: "7d", status: "In progress" },
  { id: `${prefix}R-2`, action: "Close exception with HITL approval",     owner: "Security",  due: "3d", status: "Open" },
  { id: `${prefix}R-3`, action: "Tune policy from lifecycle lesson",       owner: "AI Gov.",   due: "14d", status: "Open" },
];
const pack = (label: string, score: number, kpis: { label: string; value: string | number }[]) => ({
  score, kpis, matrix: matrix(label),
  exceptions: exc(label.replace(/\s+/g, "").slice(0, 3).toUpperCase(), label),
  remediation: rem(label.slice(0, 3).toUpperCase()),
});

export const V22_SCOPE = {
  version: "V22",
  in_scope: [
    "Enterprise Trust Lifecycle Operating System",
    "Customer Trust Automation Governance", "Partner Trust Automation Governance",
    "Board Trust Maturity Execution", "Revenue Trust Lifecycle Systems",
    "Marketplace Trust Lifecycle Optimization", "Executive Lifecycle Trust Command",
    "Trust Evidence Lifecycle Governance",
    "Customer Lifecycle Boundary Controls", "Partner Lifecycle Boundary Controls",
    "Human Approval Lifecycle Governance", "Recommendation Lifecycle Trust Governance",
    "Outcome Lifecycle Trust Governance", "Trust Audit Lifecycle Governance",
    "Trust Risk Lifecycle Governance", "Capital Trust Lifecycle Readiness",
    "Product Trust Lifecycle Governance", "Category Trust Lifecycle Leadership",
    "Enterprise Trust Lifecycle Exception Management",
    "Board Trust Lifecycle Reporting", "Long-Term Trust Lifecycle Operating Roadmap",
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace",
    "Fully autonomous customer / carrier / compliance / legal / capital / board actions",
    "Final IPO / acquisition / audited-financial claims",
    "Final SOC 2 / ISO / Android Auto / CarPlay claims without evidence",
    "Customs production, international tax, insurance underwriting, autonomous vehicles",
  ],
};

export const V22_FEATURE_MATRIX = [
  { feature: "Trust Lifecycle Operating Score",   status: "Live", hitl: "n/a" },
  { feature: "Customer Trust Automation",         status: "Live", hitl: "All publishing + comms" },
  { feature: "Partner Trust Automation",          status: "Live", hitl: "All publishing + comms" },
  { feature: "Board Trust Maturity Execution",    status: "Live", hitl: "Redaction + decisions" },
  { feature: "Revenue Trust Lifecycle Systems",   status: "Live", hitl: "Concentration + churn" },
  { feature: "Marketplace Lifecycle Optimization",status: "Live", hitl: "Award + dispute + preferred" },
  { feature: "Evidence Lifecycle Governance",     status: "Live", hitl: "External-use + board-use" },
  { feature: "Approval Lifecycle Governance",     status: "Live", hitl: "All high-impact" },
  { feature: "Capital Lifecycle Readiness",       status: "Live", hitl: ">$25k two-person" },
  { feature: "Autonomous high-impact dispatch",   status: "Deferred", hitl: "Always HITL" },
];

export const V22_HEADLINE = {
  headline: "V22 enterprise trust lifecycle operating system live — 98% operating score, all high-impact actions HITL-gated.",
  highlights: [
    "Customer automation governance 95% · Partner automation governance 94%",
    "Board maturity execution 95% · Revenue lifecycle systems 94%",
    "Marketplace lifecycle optimization 92% · Evidence lifecycle 96%",
    "Approval lifecycle 97% · Recommendation lifecycle 95% · Outcome lifecycle 95%",
    "0 autonomous high-impact actions · 100% lifecycle audit coverage",
  ],
};

export const V22_OPERATING       = pack("Enterprise trust lifecycle operating system", 98, [
  { label: "Operating score", value: "98%" }, { label: "Domain coverage", value: "21/21" },
  { label: "HITL coverage", value: "100%" }, { label: "Open exceptions", value: 7 },
]);
export const V22_CUSTOMER_AUTO   = pack("Customer trust automation governance", 95, [
  { label: "Onboarding auto", value: "96%" }, { label: "Adoption auto", value: "94%" },
  { label: "Comms approval", value: "HITL" }, { label: "Boundary assurance", value: "Passing" },
]);
export const V22_PARTNER_AUTO    = pack("Partner trust automation governance", 94, [
  { label: "Onboarding auto", value: "95%" }, { label: "Integration auto", value: "94%" },
  { label: "Enablement auto", value: "88%" }, { label: "Boundary assurance", value: "Passing" },
]);
export const V22_BOARD_EXEC      = pack("Board trust maturity execution", 95, [
  { label: "Packet exec", value: "96%" }, { label: "Decision evidence", value: "94%" },
  { label: "Risk review", value: "95%" }, { label: "Open approvals", value: 2 },
]);
export const V22_REVENUE         = pack("Revenue trust lifecycle systems", 94, [
  { label: "Renewal", value: "95%" }, { label: "Expansion", value: "92%" },
  { label: "Concentration", value: "1 exc" }, { label: "Evidence refresh", value: 2 },
]);
export const V22_MP              = pack("Marketplace trust lifecycle optimization", 92, [
  { label: "Carrier density", value: "90%" }, { label: "Lane liquidity", value: "93%" },
  { label: "Southeast", value: "Weak" }, { label: "Award latency", value: "-18%" },
]);
export const V22_EXEC            = pack("Executive lifecycle trust command", 96, [
  { label: "CEO queue", value: 3 }, { label: "CFO queue", value: 2 },
  { label: "Overdue approvals", value: 1 }, { label: "Escalations", value: 0 },
]);
export const V22_EVIDENCE        = pack("Trust evidence lifecycle governance", 96, [
  { label: "Freshness", value: "Refresh 3" }, { label: "Completeness", value: "97%" },
  { label: "External-use approvals", value: "1 overdue" }, { label: "Board-use ready", value: "Yes" },
]);
export const V22_CUST_BOUNDARY   = pack("Customer lifecycle boundary controls", 97, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Comms approvals", value: "HITL" }, { label: "Tenant isolation", value: "Current" },
]);
export const V22_PART_BOUNDARY   = pack("Partner lifecycle boundary controls", 96, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Joint-customer visibility", value: "Consented" }, { label: "Integration boundary", value: "Passing" },
]);
export const V22_APPROVAL        = pack("Human approval lifecycle governance", 97, [
  { label: "Coverage", value: "100%" }, { label: "SLA health", value: "98%" },
  { label: "Backup approver", value: "100%" }, { label: "Override audited", value: "Yes" },
]);
export const V22_REC             = pack("Recommendation lifecycle trust governance", 95, [
  { label: "Explainability", value: "96%" }, { label: "Confidence calibration", value: "On" },
  { label: "Policy compliance", value: "100%" }, { label: "Outcome linkage", value: "95%" },
]);
export const V22_OUTCOME         = pack("Outcome lifecycle trust governance", 95, [
  { label: "Approved outcomes", value: "95%" }, { label: "Lessons captured", value: "Yes" },
  { label: "Calibration drift", value: "<3%" }, { label: "Board visible", value: "Monthly" },
]);
export const V22_AUDIT           = pack("Trust audit lifecycle governance", 95, [
  { label: "Schedule", value: "96%" }, { label: "Owner coverage", value: "100%" },
  { label: "Findings", value: "-24%" }, { label: "Retest", value: "On track" },
]);
export const V22_RISK            = pack("Trust risk lifecycle governance", 93, [
  { label: "Signal quality", value: "95%" }, { label: "Mitigation", value: "94%" },
  { label: "Recurrence tracking", value: "On" }, { label: "Board visibility", value: "Yes" },
]);
export const V22_CAPITAL         = pack("Capital trust lifecycle readiness", 94, [
  { label: "Data room", value: "95%" }, { label: "External-use approvals", value: "On" },
  { label: "Two-person sign-off >$25k", value: "Enforced" }, { label: "Audit completeness", value: "96%" },
]);
export const V22_PRODUCT         = pack("Product trust lifecycle governance", 93, [
  { label: "Adoption", value: "94%" }, { label: "Reliability", value: "95%" },
  { label: "Support burden", value: "Watch" }, { label: "Audit", value: "94%" },
]);
export const V22_CATEGORY        = pack("Category trust lifecycle leadership", 92, [
  { label: "Narrative", value: "93%" }, { label: "Proof assets", value: "91%" },
  { label: "Publishing approvals", value: "HITL" }, { label: "External-use approvals", value: "On" },
]);
export const V22_EXCEPTION       = pack("Enterprise trust lifecycle exceptions", 91, [
  { label: "Open exceptions", value: 7 }, { label: "High risk", value: 4 },
  { label: "Remediation in flight", value: 5 }, { label: "Board visible", value: 3 },
]);

export const V22_BOARD_REPORT = {
  score: 95,
  kpis: [
    { label: "Operating score", value: "98%" }, { label: "Customer auto", value: "95%" },
    { label: "Partner auto", value: "94%" }, { label: "Board exec", value: "95%" },
    { label: "Revenue lifecycle", value: "94%" }, { label: "MP lifecycle", value: "92%" },
    { label: "Evidence", value: "96%" }, { label: "Approval", value: "97%" },
  ],
  matrix: [
    { section: "Enterprise trust lifecycle operating", status: "Strong", owner: "CEO" },
    { section: "Customer trust automation governance", status: "Strong", owner: "CCO" },
    { section: "Partner trust automation governance",  status: "Watch",  owner: "Partner Ops" },
    { section: "Board trust maturity execution",       status: "Strong", owner: "Board Office" },
    { section: "Revenue trust lifecycle systems",      status: "Strong", owner: "CFO/CRO" },
    { section: "Marketplace trust lifecycle optim.",   status: "Watch",  owner: "MP leader" },
    { section: "Trust evidence lifecycle",             status: "Strong", owner: "Security" },
    { section: "Boundary lifecycle controls",          status: "Strong", owner: "CISO" },
    { section: "Audit lifecycle governance",           status: "Strong", owner: "Audit" },
    { section: "Trust lifecycle exceptions",           status: "Watch",  owner: "Risk" },
    { section: "Decisions needed",                     status: "2 open", owner: "CEO/CFO" },
    { section: "Next-quarter priorities",              status: "Drafted",owner: "ELT" },
  ],
};

export const V22_ROADMAP = {
  score: 93,
  horizons: [
    { horizon: "Current Q", focus: "Close 7 lifecycle exceptions; refresh 3 evidence items" },
    { horizon: "Next Q",    focus: "Customer + partner automation governance depth (V22.5 entry)" },
    { horizon: "6 months",  focus: "Revenue + MP lifecycle automation expansion (HITL preserved)" },
    { horizon: "12 months", focus: "Board lifecycle assurance intelligence + capital lifecycle scale" },
    { horizon: "24 months", focus: "Lifecycle operating system across products + categories" },
    { horizon: "36 months", focus: "Trust-led category leadership at lifecycle scale; HITL preserved" },
  ],
};

export const V22_REPORTS = [
  "Enterprise trust lifecycle operating", "Customer trust automation governance",
  "Partner trust automation governance", "Board trust maturity execution",
  "Revenue trust lifecycle systems", "Marketplace trust lifecycle optimization",
  "Executive lifecycle trust command", "Trust evidence lifecycle governance",
  "Customer lifecycle boundary controls", "Partner lifecycle boundary controls",
  "Human approval lifecycle governance", "Recommendation lifecycle trust governance",
  "Outcome lifecycle trust governance", "Trust audit lifecycle governance",
  "Trust risk lifecycle governance", "Capital trust lifecycle readiness",
  "Product trust lifecycle governance", "Category trust lifecycle leadership",
  "Enterprise trust lifecycle exceptions", "Board trust lifecycle reporting",
  "Long-term trust lifecycle operating roadmap",
].map((name, i) => ({ id: `RPT-${i + 1}`, name, owner: "Trust ops", status: "Ready" }));

export const V22_RLS = [
  { policy: "v22_company_lifecycle_view",        rule: "company_id = current_company() AND has_role(auth.uid(), company_id, 'admin')", surface: "tenant lifecycle records" },
  { policy: "v22_platform_operating_view",       rule: "is_platform_owner(auth.uid())",                                                  surface: "operating / audit / exception platform tables" },
  { policy: "v22_executive_view",                rule: "has_role(auth.uid(), company_id, 'admin') OR has_role(...,'owner')",            surface: "executive command / capital / risk / exceptions" },
  { policy: "v22_board_report_view",             rule: "has_role(auth.uid(), company_id, 'board_viewer') AND report.approved = true",   surface: "board_trust_lifecycle_reports" },
  { policy: "v22_security_admin_manage",         rule: "has_role(auth.uid(), company_id, 'security_admin')",                            surface: "boundary / audit / exception / approval / policy" },
  { policy: "v22_revops_manage",                 rule: "has_role(auth.uid(), company_id, 'revops')",                                    surface: "revenue lifecycle systems" },
  { policy: "v22_mp_leader_manage",              rule: "has_role(auth.uid(), company_id, 'mp_leader')",                                 surface: "marketplace lifecycle optimization" },
  { policy: "v22_cs_assigned_customers",         rule: "customer_id IN (SELECT customer_id FROM customer_users WHERE user_id = auth.uid())", surface: "customer automation governance" },
  { policy: "v22_partner_mgr_manage",            rule: "has_role(auth.uid(), company_id, 'partner_manager')",                           surface: "partner automation governance" },
  { policy: "v22_product_lead_manage",           rule: "has_role(auth.uid(), company_id, 'product_lead')",                              surface: "product lifecycle governance" },
  { policy: "v22_category_lead_manage",          rule: "has_role(auth.uid(), company_id, 'category_lead')",                             surface: "category lifecycle leadership" },
  { policy: "v22_hitl_required",                 rule: "high_impact = true REQUIRES approver_id <> recommender_id",                     surface: "all HITL flows" },
  { policy: "v22_capital_two_person",            rule: "capital_action AND amount_usd > 25000 REQUIRES two distinct approver_ids",     surface: "capital lifecycle" },
  { policy: "v22_evidence_append_only",          rule: "UPDATE/DELETE DENIED on evidence; append-only via versions",                    surface: "evidence lifecycle" },
  { policy: "v22_customer_user_block",           rule: "customer users blocked from internal operating / audit / capital / board / exception", surface: "internal lifecycle" },
  { policy: "v22_carrier_user_block_mp",         rule: "carrier users blocked from MP internals unless explicitly exposed",             surface: "marketplace internals" },
  { policy: "v22_partner_user_approved_only",    rule: "partner users see only approved partner-facing lifecycle records",              surface: "partner-facing lifecycle" },
];

export const V22_EDGE = {
  rule: "App-internal lifecycle logic = TanStack createServerFn (auth via requireSupabaseAuth). External callers = /api/public/* with signature verification. No autonomous dispatch, pricing, or billing.",
  serverfn: [
    "calculate-v22-trust-lifecycle-operating-score","generate-trust-lifecycle-operating-summary",
    "detect-trust-lifecycle-operating-gaps","generate-trust-lifecycle-operating-action-plan",
    "calculate-customer-trust-automation-governance","calculate-partner-trust-automation-governance",
    "detect-customer-trust-automation-exceptions","detect-partner-trust-automation-exceptions",
    "calculate-board-trust-maturity-execution","detect-board-trust-maturity-exceptions",
    "generate-board-trust-lifecycle-report","calculate-revenue-trust-lifecycle-systems",
    "detect-revenue-trust-lifecycle-exceptions","generate-revenue-trust-lifecycle-plan",
    "calculate-marketplace-trust-lifecycle-optimization","detect-marketplace-trust-lifecycle-exceptions",
    "generate-marketplace-trust-lifecycle-plan","calculate-trust-evidence-lifecycle-governance",
    "calculate-customer-lifecycle-boundary-controls","calculate-partner-lifecycle-boundary-controls",
    "calculate-human-approval-lifecycle-governance","calculate-recommendation-lifecycle-trust-governance",
    "calculate-outcome-lifecycle-trust-governance","calculate-trust-audit-lifecycle-governance",
    "calculate-trust-risk-lifecycle-governance","calculate-capital-trust-lifecycle-readiness",
    "calculate-product-trust-lifecycle-governance","calculate-category-trust-lifecycle-leadership",
    "route-enterprise-trust-lifecycle-exception-v22","calculate-enterprise-trust-lifecycle-exception-score",
    "generate-long-term-trust-lifecycle-roadmap",
  ].map(name => ({ name, kind: "ServerFn", auth: "requireSupabaseAuth + role" })),
  edge_routes: [
    { path: "/api/public/v22/health",            purpose: "Liveness probe (no PII)" },
    { path: "/api/public/v22/trust-webhook",     purpose: "External trust signal ingest (HMAC-verified)" },
    { path: "/api/public/v22/board-distribute",  purpose: "Approved-only board packet distribution (signed link)" },
    { path: "/api/public/v22/partner-callback",  purpose: "Partner system callback (HMAC-verified)" },
  ],
};

export const V22_GUARDRAILS = [
  "No fully autonomous dispatch, pricing, billing, marketplace, capital, board.",
  "Every high-impact assist requires human approval (approver_id ≠ recommender_id).",
  "Capital actions > $25k require two-person sign-off.",
  "Append-only evidence; no in-place mutation.",
  "RBAC + RLS + tenant isolation enforced across all lifecycle records.",
  "Customer / carrier / partner users blocked from internal lifecycle, audit, capital, board, exception records.",
];

export const V22_DEMO = [
  { id: 1,  actor: "CEO",          step: "Opens Enterprise Trust Lifecycle Operating System — score 98%" },
  { id: 2,  actor: "CEO",          step: "Reviews customer auto 95%, partner auto 94%, board exec 95%, revenue 94%, MP 92%" },
  { id: 3,  actor: "CCO",          step: "Customer Trust Automation Governance — 1 proof asset awaiting external-use approval" },
  { id: 4,  actor: "Partner Ops",  step: "Partner Trust Automation Governance — API partner has enablement lifecycle gap" },
  { id: 5,  actor: "Board admin",  step: "Board Trust Maturity Execution — 2 board-use evidence items pending approval" },
  { id: 6,  actor: "RevOps",       step: "Revenue Trust Lifecycle Systems — 1 concentration exception, 2 evidence refreshes" },
  { id: 7,  actor: "MP leader",    step: "MP Lifecycle Optimization — Southeast weak; preferred-carrier rec pending approval" },
  { id: 8,  actor: "CISO",         step: "Evidence Lifecycle Governance — 1 stale evidence, 1 external-use overdue" },
  { id: 9,  actor: "Risk",         step: "Exception Management — 4 high-risk lifecycle exceptions triaged" },
  { id: 10, actor: "Governance",   step: "Approval Lifecycle Governance — approver_id ≠ recommender_id enforced" },
  { id: 11, actor: "Board admin",  step: "Generates Board Trust Lifecycle Report (operating + lifecycle + exceptions + decisions)" },
  { id: 12, actor: "ELT",          step: "Reviews Long-Term Trust Lifecycle Operating Roadmap (Q+1 → 36 months)" },
];

export const V22_PHASE58_TEASER = {
  version: "V22.5",
  themes: [
    "Enterprise lifecycle trust automation scale",
    "Board lifecycle assurance intelligence",
    "Revenue lifecycle trust optimization",
    "Marketplace lifecycle governance",
    "Customer/partner lifecycle trust maturity",
  ],
};
