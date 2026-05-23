// Mock data for V21.5 enterprise trust network scale. Numbers are illustrative.

const matrix = (label: string) => [
  { control: `${label} signal quality`,        status: "Passing", owner: "Trust eng" },
  { control: `${label} owner coverage`,        status: "Passing", owner: "Trust ops" },
  { control: `${label} evidence lifecycle`,    status: "Watch",   owner: "Evidence" },
  { control: `${label} approval routing`,      status: "Passing", owner: "Security" },
  { control: `${label} audit completeness`,    status: "Passing", owner: "Audit" },
  { control: `${label} exception remediation`, status: "Watch",   owner: "Remediation" },
];
const exc = (prefix: string, area: string) => [
  { id: `${prefix}-1`, control: area, desc: `${area} lifecycle exception requires human approval`, owner: "Security", risk: "High",   sla: "24h" },
  { id: `${prefix}-2`, control: area, desc: `${area} evidence refresh overdue`,                     owner: "Evidence", risk: "Medium", sla: "72h" },
];
const rem = (prefix: string) => [
  { id: `${prefix}R-1`, action: "Refresh stale lifecycle evidence", owner: "Evidence", due: "7d", status: "In progress" },
  { id: `${prefix}R-2`, action: "Close exception with HITL approval", owner: "Security", due: "3d", status: "Open" },
];
const pack = (label: string, score: number, kpis: { label: string; value: string | number }[]) => ({
  score, kpis, matrix: matrix(label),
  exceptions: exc(label.replace(/\s+/g, "").slice(0, 3).toUpperCase(), label),
  remediation: rem(label.slice(0, 3).toUpperCase()),
});

export const V215_SCOPE = {
  version: "V21.5",
  in_scope: [
    "Enterprise Trust Network Scale", "Customer Trust Lifecycle Intelligence", "Partner Trust Lifecycle Intelligence",
    "Board Trust Intelligence Maturity", "Durable Revenue Trust Optimization", "Marketplace Trust Network Governance",
    "Executive Trust Network Command", "Trust Evidence Lifecycle", "Customer Trust Boundary Governance",
    "Partner Trust Boundary Governance", "Trust Risk Network Governance", "Trust Audit Network Maturity",
    "Human Approval Trust Lifecycle", "Recommendation Trust Lifecycle", "Outcome Trust Lifecycle",
    "Capital Trust Network Readiness", "Product Trust Lifecycle Intelligence",
    "Category Trust Network Leadership", "Enterprise Trust Lifecycle Exceptions",
    "Board Trust Network Reporting", "Long-Term Trust Network Scale Roadmap",
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace",
    "Fully autonomous customer / carrier / compliance / legal / capital / board actions",
    "Final IPO / acquisition / audited-financial claims",
    "Final SOC 2 / ISO / Android Auto / CarPlay claims without evidence",
    "Customs production, international tax, insurance underwriting, autonomous vehicles",
  ],
};

export const V215_HEADLINE = {
  headline: "V21.5 trust network scale at 98% with full-lifecycle HITL governance",
  highlights: [
    "Customer lifecycle 95% · Partner lifecycle 93%",
    "Board maturity 95% · Revenue optimization 94%",
    "MP network governance 92% · Evidence lifecycle 96%",
    "0 autonomous high-impact actions · all routed through approval",
  ],
};

export const V215_NETWORK_SCALE = pack("Enterprise trust network scale", 98, [
  { label: "Scale score", value: "98%" }, { label: "Domain coverage", value: "21/21" },
  { label: "HITL coverage", value: "100%" }, { label: "Open exceptions", value: 8 },
]);
export const V215_CUSTOMER_LIFECYCLE = pack("Customer trust lifecycle", 95, [
  { label: "Onboarding trust", value: "96%" }, { label: "Adoption trust", value: "95%" },
  { label: "Renewal trust", value: "94%" }, { label: "Boundary assurance", value: "Passing" },
]);
export const V215_PARTNER_LIFECYCLE = pack("Partner trust lifecycle", 93, [
  { label: "Onboarding trust", value: "94%" }, { label: "Integration trust", value: "95%" },
  { label: "Enablement trust", value: "88%" }, { label: "Boundary assurance", value: "Passing" },
]);
export const V215_BOARD_MATURITY = pack("Board trust intelligence maturity", 95, [
  { label: "Packet maturity", value: "96%" }, { label: "Decision evidence", value: "94%" },
  { label: "Risk intelligence", value: "95%" }, { label: "Open approvals", value: 2 },
]);
export const V215_REVENUE = pack("Durable revenue trust optimization", 94, [
  { label: "Renewal", value: "95%" }, { label: "Expansion", value: "92%" },
  { label: "Concentration", value: "1 exc" }, { label: "Evidence freshness", value: "Refresh 2" },
]);
export const V215_MP = pack("Marketplace trust network governance", 92, [
  { label: "Carrier density", value: "90%" }, { label: "Lane liquidity", value: "93%" },
  { label: "Regional", value: "Southeast weak" }, { label: "Approval health", value: "Passing" },
]);
export const V215_EXEC = pack("Executive trust network command", 96, [
  { label: "CEO queue", value: 3 }, { label: "CFO queue", value: 2 },
  { label: "Overdue approvals", value: 1 }, { label: "Escalations", value: 0 },
]);
export const V215_EVIDENCE_LIFECYCLE = pack("Trust evidence lifecycle", 96, [
  { label: "Freshness", value: "Refresh 4" }, { label: "Completeness", value: "97%" },
  { label: "Owner coverage", value: "100%" }, { label: "Board-use ready", value: "Yes" },
]);
export const V215_CUSTOMER_BOUNDARY = pack("Customer trust boundary governance", 97, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Comms approvals", value: "HITL" }, { label: "External-use", value: "1 overdue" },
]);
export const V215_PARTNER_BOUNDARY = pack("Partner trust boundary governance", 96, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Comms approvals", value: "HITL" }, { label: "Integration boundary", value: "Passing" },
]);
export const V215_RISK = pack("Trust risk network governance", 93, [
  { label: "Signal quality", value: "95%" }, { label: "Mitigation", value: "94%" },
  { label: "Board visibility", value: "Yes" }, { label: "Recurrence tracking", value: "On" },
]);
export const V215_AUDIT = pack("Trust audit network maturity", 95, [
  { label: "Schedule maturity", value: "96%" }, { label: "Owner coverage", value: "100%" },
  { label: "Findings reduction", value: "-24%" }, { label: "Export ready", value: "Yes" },
]);
export const V215_APPROVAL_LIFECYCLE = pack("Human approval trust lifecycle", 97, [
  { label: "Coverage", value: "100%" }, { label: "SLA health", value: "98%" },
  { label: "Backup approver", value: "100%" }, { label: "Override audited", value: "Yes" },
]);
export const V215_REC_LIFECYCLE = pack("Recommendation trust lifecycle", 94, [
  { label: "Explainability", value: "96%" }, { label: "Confidence calibration", value: "On" },
  { label: "Policy compliance", value: "100%" }, { label: "Outcome linkage", value: "94%" },
]);
export const V215_OUTCOME_LIFECYCLE = pack("Outcome trust lifecycle", 94, [
  { label: "Approved outcomes", value: "94%" }, { label: "Lessons captured", value: "Yes" },
  { label: "Calibration", value: "On" }, { label: "Board visible", value: "Yes" },
]);
export const V215_CAPITAL = pack("Capital trust network readiness", 93, [
  { label: "Data room", value: "94%" }, { label: "External-use approvals", value: "On" },
  { label: "Two-person sign-off >$25k", value: "Enforced" }, { label: "Audit completeness", value: "96%" },
]);
export const V215_PRODUCT = pack("Product trust lifecycle", 92, [
  { label: "Adoption", value: "93%" }, { label: "Reliability", value: "95%" },
  { label: "Support burden", value: "Watch" }, { label: "Audit", value: "94%" },
]);
export const V215_CATEGORY = pack("Category trust network leadership", 91, [
  { label: "Narrative", value: "92%" }, { label: "Proof assets", value: "90%" },
  { label: "Publishing approvals", value: "HITL" }, { label: "External-use approvals", value: "On" },
]);
export const V215_EXCEPTION = pack("Enterprise trust lifecycle exceptions", 90, [
  { label: "Open exceptions", value: 8 }, { label: "High risk", value: 4 },
  { label: "Remediation in flight", value: 6 }, { label: "Board visible", value: 3 },
]);

export const V215_BOARD_REPORT = {
  score: 95,
  kpis: [
    { label: "Network scale", value: "98%" }, { label: "Customer lifecycle", value: "95%" },
    { label: "Partner lifecycle", value: "93%" }, { label: "Revenue optimization", value: "94%" },
    { label: "MP governance", value: "92%" }, { label: "Evidence lifecycle", value: "96%" },
    { label: "Risk governance", value: "93%" }, { label: "Audit maturity", value: "95%" },
  ],
  matrix: [
    { section: "Enterprise trust network scale",      status: "Strong", owner: "CEO" },
    { section: "Customer trust lifecycle",            status: "Strong", owner: "CS lead" },
    { section: "Partner trust lifecycle",             status: "Watch",  owner: "Partner lead" },
    { section: "Board trust intelligence maturity",   status: "Strong", owner: "Board admin" },
    { section: "Durable revenue trust optimization",  status: "Strong", owner: "CRO" },
    { section: "Marketplace trust network governance",status: "Watch",  owner: "MP leader" },
    { section: "Trust evidence lifecycle",            status: "Strong", owner: "Evidence" },
    { section: "Trust audit network maturity",        status: "Strong", owner: "Audit" },
    { section: "Enterprise trust lifecycle exceptions",status: "Watch", owner: "Security" },
    { section: "Decisions needed",                    status: "2 open", owner: "CEO/CFO" },
    { section: "Next-quarter priorities",             status: "Drafted", owner: "ELT" },
  ],
};

export const V215_ROADMAP = {
  score: 92,
  horizons: [
    { horizon: "Current Q", focus: "Close 8 lifecycle exceptions; refresh 4 evidence items" },
    { horizon: "Next Q",    focus: "Customer + partner trust automation governance (V22 entry)" },
    { horizon: "6 months",  focus: "Revenue trust lifecycle systems + MP lifecycle optimization" },
    { horizon: "12 months", focus: "Board trust maturity execution + capital trust scale" },
    { horizon: "24 months", focus: "Trust lifecycle operating system across products + categories" },
    { horizon: "36 months", focus: "Trust-led category leadership at scale; HITL preserved" },
  ],
};

export const V215_REPORTS = [
  "Enterprise trust network scale", "Customer trust lifecycle", "Partner trust lifecycle",
  "Board trust intelligence maturity", "Durable revenue trust optimization", "Marketplace trust network governance",
  "Executive trust network command", "Trust evidence lifecycle", "Customer trust boundary",
  "Partner trust boundary", "Trust risk network governance", "Trust audit network maturity",
  "Human approval trust lifecycle", "Recommendation trust lifecycle", "Outcome trust lifecycle",
  "Capital trust network readiness", "Product trust lifecycle", "Category trust network leadership",
  "Enterprise trust lifecycle exceptions", "Board trust network reporting", "Long-term roadmap",
].map((name, i) => ({ id: `RPT-${i+1}`, name, owner: "Trust ops", status: "Ready" }));

export const V215_RLS = [
  { policy: "v215_company_lifecycle_view",       rule: "company admins read for their company_id",      surface: "all tenant lifecycle records" },
  { policy: "v215_platform_network_scale_view",  rule: "is_platform_owner(auth.uid())",                 surface: "network scale / audit maturity" },
  { policy: "v215_board_report_view",            rule: "board role reads only approved reports",        surface: "board_trust_network_reports" },
  { policy: "v215_security_admin_manage",        rule: "security/admin manage boundary/audit/exception",surface: "trust lifecycle controls" },
  { policy: "v215_revops_revenue_manage",        rule: "revops manage revenue optimization",            surface: "durable revenue trust" },
  { policy: "v215_mp_leader_manage",             rule: "mp leaders manage MP network governance",       surface: "marketplace trust" },
  { policy: "v215_cs_assigned_customers",        rule: "CS manages assigned customer lifecycle",        surface: "customer lifecycle" },
  { policy: "v215_partner_mgr_manage",           rule: "partner managers manage partner lifecycle",     surface: "partner lifecycle" },
  { policy: "v215_product_lead_manage",          rule: "product leaders manage product lifecycle",      surface: "product lifecycle" },
  { policy: "v215_category_lead_manage",         rule: "category leaders manage category leadership",   surface: "category lifecycle" },
  { policy: "v215_hitl_required",                rule: "approver_id <> recommender_id; row required",   surface: "all high-impact" },
  { policy: "v215_customer_user_block",          rule: "customers blocked from internal/audit/capital", surface: "internal records" },
  { policy: "v215_carrier_user_block_mp",        rule: "carriers blocked from MP internals",            surface: "marketplace internals" },
  { policy: "v215_partner_user_approved_only",   rule: "partners see only approved partner-facing",     surface: "partner-facing" },
];

export const V215_EDGE = {
  serverfn: [
    "calculate-v215-trust-network-scale-score","generate-trust-network-scale-summary",
    "detect-trust-network-scale-gaps","generate-trust-network-scale-action-plan",
    "calculate-customer-trust-lifecycle","calculate-partner-trust-lifecycle",
    "detect-customer-trust-lifecycle-exceptions","detect-partner-trust-lifecycle-exceptions",
    "calculate-board-trust-intelligence-maturity","detect-board-trust-maturity-exceptions",
    "generate-board-trust-network-report","calculate-durable-revenue-trust-optimization-v215",
    "detect-revenue-trust-optimization-exceptions","generate-revenue-trust-optimization-plan-v215",
    "calculate-marketplace-trust-network-governance","detect-marketplace-trust-governance-exceptions",
    "generate-marketplace-trust-network-plan","calculate-trust-evidence-lifecycle",
    "calculate-customer-boundary-governance","calculate-partner-boundary-governance",
    "calculate-trust-risk-network-governance","calculate-trust-audit-network-maturity",
    "calculate-human-approval-trust-lifecycle","calculate-recommendation-trust-lifecycle",
    "calculate-outcome-trust-lifecycle","calculate-capital-trust-network-readiness",
    "calculate-product-trust-lifecycle","calculate-category-trust-network-leadership",
    "route-enterprise-trust-lifecycle-exception","calculate-trust-lifecycle-exception-score",
    "generate-long-term-trust-network-scale-roadmap",
  ].map(name => ({ name, kind: "internal", auth: "requireSupabaseAuth" })),
  edge_routes: [
    { path: "/api/public/webhooks/stripe",          purpose: "Signed Stripe billing events" },
    { path: "/api/public/webhooks/partner-billing", purpose: "Signed partner billing events" },
    { path: "/api/public/webhooks/telematics",      purpose: "Signed telematics events" },
    { path: "/api/public/cron/evidence-refresh",    purpose: "Cron to refresh evidence freshness" },
  ],
};

export const V215_GUARDRAILS = [
  "No fully autonomous dispatch, pricing, billing, marketplace, capital, board.",
  "Every high-impact assist requires human approval (approver_id ≠ recommender_id).",
  "Capital actions >$25k require two-person sign-off.",
  "Append-only audit log; no in-place mutation.",
  "RBAC + RLS + tenant isolation enforced across all lifecycle records.",
  "Customer / carrier / partner users blocked from internal lifecycle, audit, capital, board, exception records.",
];

export const V215_DEMO = [
  { id: 1,  actor: "CEO",          step: "Opens Enterprise Trust Network Scale — score 98%" },
  { id: 2,  actor: "CEO",          step: "Reviews customer 95%, partner 93%, board 95%, revenue 94%, MP 92%" },
  { id: 3,  actor: "CS lead",      step: "Customer Trust Lifecycle — 1 proof asset awaiting external-use approval" },
  { id: 4,  actor: "Partner lead", step: "Partner Trust Lifecycle — API partner has enablement lifecycle gap" },
  { id: 5,  actor: "Board admin",  step: "Board Trust Intelligence Maturity — 2 board-use evidence items pending approval" },
  { id: 6,  actor: "RevOps",       step: "Durable Revenue Trust Optimization — 1 concentration exception, 2 evidence refreshes" },
  { id: 7,  actor: "MP leader",    step: "Marketplace Trust Network Governance — Southeast weak; preferred-carrier approval pending" },
  { id: 8,  actor: "CISO",         step: "Customer/Partner Boundary Governance — 1 external-use approval overdue" },
  { id: 9,  actor: "CEO",          step: "Enterprise Trust Lifecycle Exceptions — 4 high-risk lifecycle exceptions" },
  { id: 10, actor: "Board admin",  step: "Generates Board Trust Network Report (scale + lifecycle + exceptions + decisions)" },
  { id: 11, actor: "ELT",          step: "Reviews Long-Term Trust Network Scale Roadmap (Q+1 → 36 months)" },
  { id: 12, actor: "CEO",          step: "Approves remediation plan — HITL preserved end-to-end" },
];

export const V215_PHASE57_TEASER = {
  version: "V22",
  themes: [
    "Enterprise trust lifecycle operating system",
    "Customer/partner trust automation governance",
    "Board trust maturity execution",
    "Revenue trust lifecycle systems",
    "Marketplace trust lifecycle optimization",
  ],
};
