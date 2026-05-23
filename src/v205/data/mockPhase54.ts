// Phase 54 — V20.5 Enterprise Trust Scale (mock data only)

const owners = ["Platform Owner", "CFO", "CRO", "COO", "CSO", "CTO", "CISO", "MP Lead", "CS Lead", "Partner Lead", "Product Lead", "Marketing Lead"];
const mk = (n: number, prefix: string, f: (i: number) => any) => Array.from({ length: n }, (_, i) => f(i)).map((x, i) => ({ id: `${prefix}-${i + 1}`, ...x }));

export const V205_SCOPE = {
  included: [
    "Enterprise Trust Scale Command", "Board Trust Assurance Maturity", "Durable Revenue Trust Optimization",
    "Marketplace Trust Governance", "Customer Trust Operating Intelligence", "Partner Trust Operating Intelligence",
    "Executive Trust Assurance", "Trust Evidence Scale Operations", "Trust Audit Maturity", "Trust Control Scale",
    "Human Approval Trust Scale", "Recommendation Trust Quality", "Outcome Trust Maturity",
    "Predictive Trust Risk Maturity", "Capital Trust Readiness", "Product Trust Scale", "Category Trust Maturity",
    "Enterprise Trust Exception Management", "Board Trust Scale Reporting", "Long-Term Trust Scale Roadmap",
  ],
  deferred: [
    "Fully autonomous dispatch", "Fully autonomous pricing", "Fully autonomous billing",
    "Fully autonomous marketplace changes", "Fully autonomous customer/carrier actions",
    "Fully autonomous compliance/legal", "Fully autonomous board/capital decisions",
    "IPO/acquisition readiness claims", "Audited financial / SOC 2 / ISO / CarPlay / Android Auto / global regulatory completeness",
    "Customs production workflows", "International tax automation", "Insurance underwriting automation",
    "Autonomous vehicle workflows",
  ],
};

export const V205_HEADLINE = {
  headline: "Enterprise trust now scales — controls, evidence, audits, approvals, exceptions all HITL-bounded",
  highlights: [
    "Enterprise trust scale 98% · Board trust assurance 95% · Revenue trust optimization 94%",
    "Marketplace trust governance 92% · Customer 91% · Partner 90%",
    "Trust audit maturity 96.5% · Evidence freshness median 14m · 0 autonomous dispatch",
    "Capital actions > $25k require 2-person sign-off · approver_id ≠ recommender_id enforced",
  ],
};

const matrix = (n: number) => mk(n, "row", (i) => ({
  control: `Control surface ${i + 1}`, status: i % 5 === 0 ? "watch" : "healthy", owner: owners[i % owners.length],
}));
const exceptions = (n: number) => mk(n, "exc", (i) => ({
  control: `Area ${i + 1}`, desc: `Trust exception in surface ${i + 1}`, owner: owners[i % owners.length], sla: "72h", risk: i % 3 === 0 ? "high" : "med",
}));
const remediation = (n: number) => mk(n, "rem", (i) => ({
  action: `Remediate scale gap ${i + 1}`, owner: owners[i % owners.length], due: `Q+${(i % 4) + 1}`, status: i % 4 === 0 ? "in-progress" : "open",
}));
const kpis = (vals: Array<[string, string]>) => vals.map(([label, value]) => ({ label, value }));

const center = (score: number, k: Array<[string, string]>, rows = 10, exc = 4, rem = 4) => ({
  score, kpis: kpis(k), matrix: matrix(rows), exceptions: exceptions(exc), remediation: remediation(rem),
});

export const V205_TRUST_SCALE = center(98, [
  ["Enterprise trust scale", "98%"], ["Board assurance", "95%"], ["Revenue optimization", "94%"], ["MP governance", "92%"],
  ["Customer ops", "91%"], ["Partner ops", "90%"], ["Audit maturity", "96.5%"], ["Exception reduction", "−38% QoQ"],
], 16, 6, 6);

export const V205_BOARD = center(95, [
  ["Packet maturity", "97%"], ["KPI completeness", "100%"], ["Decision evidence", "94%"], ["Blocker resolution", "92%"],
], 12, 4, 4);

export const V205_REVENUE = center(94, [
  ["Renewal trust", "95%"], ["Expansion trust", "93%"], ["Concentration risk", "1 acct"], ["Stale evidence", "2 records"],
], 14, 5, 5);

export const V205_MP = center(92, [
  ["Carrier density (TX)", "strong"], ["Carrier density (SE)", "weak"], ["Time-to-award", "11m"], ["Preferred carrier rec", "pending"],
], 14, 5, 5);

export const V205_CUSTOMER = center(91, [
  ["Strategic accts", "strong"], ["Comms pending approval", "1"], ["Proof external-use", "pending"], ["Data boundary", "ok"],
], 12, 4, 4);

export const V205_PARTNER = center(90, [
  ["Telematics partner", "strong"], ["API partner enablement", "gap"], ["Evidence approval", "pending"], ["Data boundary", "ok"],
], 12, 4, 4);

export const V205_EXEC = center(94, [
  ["CEO queue", "3"], ["CFO queue", "5"], ["High-risk", "4"], ["Overdue", "0"],
], 10, 6, 4);

export const V205_EVIDENCE = center(96, [
  ["Median freshness", "14m"], ["Owner coverage", "100%"], ["Approval coverage", "98%"], ["External-use ready", "27"],
], 15, 4, 4);

export const V205_AUDIT = center(96.5, [
  ["Schedule maturity", "100%"], ["Findings reduced", "−42% QoQ"], ["Repeat findings", "1"], ["Export ready", "yes"],
], 15, 3, 4);

export const V205_CONTROL = center(96, [
  ["Owner coverage", "100%"], ["Evidence fresh", "median 18m"], ["Exception rate", "0.6%"], ["Testing status", "passing"],
], 15, 4, 5);

export const V205_APPROVAL = center(96, [
  ["SLA health", "98%"], ["Backup coverage", "100%"], ["Override maturity", "audited"], ["Rejection reasons", "rich"],
], 12, 4, 4);

export const V205_REC = center(95, [
  ["Explainability", "97%"], ["Confidence calibration", "passing"], ["Policy compliance", "100%"], ["Outcome linkage", "94%"],
], 14, 4, 4);

export const V205_OUTCOME = center(95, [
  ["Approved outcomes tracked", "100%"], ["Lessons logged", "32"], ["Calibration evidence", "fresh"], ["Board visibility", "monthly"],
], 14, 3, 4);

export const V205_PREDICTIVE = center(93, [
  ["Risk signal quality", "93%"], ["Mitigation maturity", "91%"], ["Recurrence", "−21% QoQ"], ["Board visible", "yes"],
], 15, 5, 5);

export const V205_CAPITAL = center(94, [
  ["Data room evidence", "complete (mock)"], ["External-use approval", "audited"], ["2-person > $25k", "enforced"], ["Audit completeness", "97%"],
], 12, 3, 4);

export const V205_PRODUCT = center(93, [
  ["Adoption trust", "92%"], ["Reliability trust", "94%"], ["Support burden", "low"], ["Investment approvals", "audited"],
], 12, 4, 4);

export const V205_CATEGORY = center(92, [
  ["Narrative trust", "93%"], ["Proof publishing", "approved"], ["Competitive trust", "strong"], ["External approval", "audited"],
], 10, 3, 3);

export const V205_EXCEPTION = center(93, [
  ["Open exceptions", "12"], ["High-risk", "4"], ["SLA breach", "0"], ["Board visible", "4"],
], 16, 8, 6);

export const V205_BOARD_REPORT = {
  sections: [
    "Enterprise trust scale", "Board trust assurance maturity", "Durable revenue trust optimization",
    "Marketplace trust governance", "Customer trust operating", "Partner trust operating",
    "Executive trust assurance", "Trust evidence scale", "Trust audit maturity", "Trust control scale",
    "Human approval trust scale", "Recommendation trust quality", "Outcome trust maturity",
    "Predictive trust risk maturity", "Capital trust readiness", "Product trust scale", "Category trust maturity",
    "Enterprise trust exceptions", "Remediation status", "Decisions needed", "Next quarter priorities",
  ].map((s, i) => ({ id: `s-${i + 1}`, section: s, owner: owners[i % owners.length], status: i % 6 === 0 ? "draft" : "approved" })),
  kpi_appendix: kpis([
    ["Enterprise trust scale", "98%"], ["Board assurance", "95%"], ["Revenue optimization", "94%"],
    ["MP governance", "92%"], ["Customer ops", "91%"], ["Partner ops", "90%"], ["Audit maturity", "96.5%"],
    ["Approvals (qtr)", "1,284"], ["Approved %", "94%"], ["Exceptions", "12"], ["Repeat findings", "1"],
  ]),
  decisions: mk(6, "dec", (i) => ({ decision: `Trust scale decision ${i + 1}`, owner: owners[i % owners.length], sla: "next board" })),
  actions: mk(10, "act", (i) => ({ item: `Action ${i + 1}`, owner: owners[i % owners.length], due: `Q+${(i % 4) + 1}`, status: i % 3 === 0 ? "open" : "in-progress" })),
};

export const V205_ROADMAP = {
  horizons: ["Q (now)", "Q+1", "Q+2 (6mo)", "Q+3 (12mo)", "Q+4 (24mo)", "Q+5 (36mo)"].map((h, i) => ({
    id: `h-${i}`, horizon: h, theme: ["Scale", "Optimize", "Federate", "Network", "Intelligence", "Trust mesh"][i],
    target: `Trust ${["scale", "optimization", "federation", "network", "intelligence", "mesh"][i]} ${88 + i * 2}%`,
  })),
  tracks: [
    "Enterprise trust scale", "Board assurance", "Revenue optimization", "MP governance", "Customer ops",
    "Partner ops", "Exec assurance", "Evidence scale", "Audit maturity", "Control scale",
    "Approval scale", "Rec quality", "Outcome maturity", "Predictive risk", "Capital readiness",
    "Product scale", "Category maturity",
  ].map((t, i) => ({ id: `t-${i}`, track: t, owner: owners[i % owners.length] })),
  decisions: mk(6, "rdec", (i) => ({ decision: `Roadmap decision ${i + 1}`, owner: owners[i % owners.length], horizon: `Q+${i}` })),
};

export const V205_REPORTS = [
  "Enterprise trust scale", "Board trust assurance maturity", "Revenue trust optimization",
  "Marketplace trust governance", "Customer trust operating", "Partner trust operating",
  "Executive trust assurance", "Trust evidence scale", "Trust audit maturity", "Trust control scale",
  "Human approval trust scale", "Recommendation trust quality", "Outcome trust maturity",
  "Predictive trust risk maturity", "Capital trust readiness", "Product trust scale",
  "Category trust maturity", "Trust exception management", "Board trust scale report", "Long-term trust scale roadmap",
].map((r, i) => ({ id: `r-${i + 1}`, report: r, freshness: `${(i % 9) + 4}h`, owner: owners[i % owners.length] }));

export const V205_RLS = [
  { policy: "v205_company_scope", rule: "company_id = current_company()", surface: "tenant trust records" },
  { policy: "v205_platform_owner", rule: "is_platform_owner(auth.uid())", surface: "platform-wide scale + audit maturity" },
  { policy: "v205_exec_scope", rule: "has_role(auth.uid(),'executive')", surface: "exec/board/capital/predictive/exception" },
  { policy: "v205_board_report_view", rule: "role='board' AND status='approved'", surface: "board_trust_scale_reports" },
  { policy: "v205_security_admin", rule: "has_role(auth.uid(),'security_admin')", surface: "audit/exception/controls/approval/policy" },
  { policy: "v205_revops", rule: "has_role(auth.uid(),'revops')", surface: "durable_revenue_trust_optimization_records" },
  { policy: "v205_mp_lead", rule: "has_role(auth.uid(),'mp_lead')", surface: "marketplace_trust_governance_records" },
  { policy: "v205_cs_assigned", rule: "owner_id = auth.uid() OR has_role('cs_lead')", surface: "customer trust ops" },
  { policy: "v205_partner_lead", rule: "has_role(auth.uid(),'partner_lead')", surface: "partner trust ops" },
  { policy: "v205_product_lead", rule: "has_role(auth.uid(),'product_lead')", surface: "product_trust_scale_records" },
  { policy: "v205_category_lead", rule: "has_role(auth.uid(),'marketing_lead')", surface: "category_trust_maturity_records" },
  { policy: "v205_customer_block_internal", rule: "role <> 'customer' for internal scale/audit/capital/board/exception", surface: "internal-only" },
  { policy: "v205_carrier_block_mp_internal", rule: "role <> 'carrier' unless exposed", surface: "marketplace internals" },
  { policy: "v205_partner_approved_only", rule: "role='partner' AND record.approved_for_partner=true", surface: "partner-facing records" },
  { policy: "v205_high_impact_hitl", rule: "automation.high_impact ⇒ requires approval row with approver_id <> recommender_id", surface: "every assist" },
];

export const V205_EDGE = {
  serverfn: [
    "calculate-v205-enterprise-trust-scale-score", "generate-enterprise-trust-scale-summary",
    "detect-enterprise-trust-scale-gaps", "generate-enterprise-trust-scale-action-plan",
    "calculate-board-trust-assurance-maturity", "detect-board-trust-assurance-exceptions",
    "generate-board-trust-scale-report", "calculate-durable-revenue-trust-optimization",
    "detect-revenue-trust-optimization-gaps", "generate-revenue-trust-optimization-plan",
    "calculate-marketplace-trust-governance", "detect-marketplace-trust-governance-exceptions",
    "generate-marketplace-trust-governance-plan", "calculate-customer-trust-operating-intelligence",
    "calculate-partner-trust-operating-intelligence", "detect-customer-trust-exceptions",
    "detect-partner-trust-exceptions", "calculate-trust-evidence-scale",
    "calculate-trust-audit-maturity", "calculate-trust-control-scale",
    "calculate-human-approval-trust-scale", "calculate-recommendation-trust-quality",
    "calculate-outcome-trust-maturity", "calculate-predictive-trust-risk-maturity",
    "calculate-capital-trust-readiness", "calculate-product-trust-scale",
    "calculate-category-trust-maturity", "route-enterprise-trust-exception-management",
    "calculate-trust-exception-management-score", "generate-long-term-trust-scale-roadmap",
  ].map((n) => ({ name: n, kind: "createServerFn", auth: "requireSupabaseAuth + role check" })),
  edge_routes: [
    { path: "/api/public/webhooks/billing-event", purpose: "billing event ingestion (HMAC)" },
    { path: "/api/public/webhooks/partner-trust", purpose: "partner trust signals (HMAC)" },
    { path: "/api/public/cron/v205-refresh", purpose: "scheduled trust scale aggregator" },
  ],
};

export const V205_GUARDRAILS = [
  "No autonomous dispatch", "No AI-only approval on dispatch/pricing/billing/MP/carrier/customer/compliance/capital/legal/procurement/board/financial/safety",
  "Capital > $25k requires 2-person sign-off", "approver_id <> recommender_id on every assist",
  "Append-only audit log on every v205_*_records table", "Tenant boundary enforced via RLS",
  "No SOC 2 / ISO / CarPlay / Android Auto / IPO / acquisition / global compliance claims without tracked evidence",
];

export const V205_DEMO = [
  { id: "d-1", actor: "CEO", step: "Opens Enterprise Trust Scale Command Center — scale 98%" },
  { id: "d-2", actor: "CEO", step: "Sees board 95% · revenue 94% · MP 92% · customer 91% · partner 90%" },
  { id: "d-3", actor: "Board admin", step: "Opens Board Trust Assurance Maturity — packet strong, KPIs complete" },
  { id: "d-4", actor: "Board admin", step: "Two board-use evidence items need approval; blocker assigned to CFO" },
  { id: "d-5", actor: "RevOps", step: "Opens Revenue Trust Optimization — renewal/expansion strong, 1 concentration exception" },
  { id: "d-6", actor: "RevOps", step: "Recommends refreshing 2 stale revenue evidence records" },
  { id: "d-7", actor: "MP Lead", step: "TX/Midwest strong, Southeast carrier density weak; preferred carrier rec pending approval" },
  { id: "d-8", actor: "CS Lead", step: "Strategic accts strong; 1 comms item needs approval; proof external-use pending" },
  { id: "d-9", actor: "Partner Lead", step: "Telematics partner strong; API partner enablement gap; partner evidence pending publish approval" },
  { id: "d-10", actor: "CISO", step: "Trust Audit Maturity 93%; 1 repeat finding in evidence automation; tenant + override audits passing" },
  { id: "d-11", actor: "CEO", step: "Opens Trust Exception Management — 4 high-risk (SE MP, concentration, audit repeat, board evid)" },
  { id: "d-12", actor: "Board admin", step: "Generates Board Trust Scale Report — 21 sections, KPIs, exceptions, remediation, decisions, Q+1 priorities" },
];

export const V205_PHASE55_TEASER = {
  version: "V21 enterprise trust intelligence network",
  themes: ["Customer trust scale", "Partner trust scale", "Board trust execution",
    "Durable revenue trust systems", "Marketplace trust optimization", "Trust intelligence network"],
};
