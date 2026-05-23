// Phase 49 — V18 enterprise autonomous-assist scale governance.
// Mock-only. No autonomous dispatch. Every high-impact action is HITL-gated.

type KPI = { label: string; value: string | number; sub?: string };
const k = (label: string, value: string | number, sub?: string): KPI => ({ label, value, sub });

export const V18_SCOPE = {
  score: { overall: 97 },
  matrix: [
    { area: "Autonomous-Assist Scale Governance Center", status: "shipped",     notes: "Score 97%" },
    { area: "Predictive Operating Excellence",            status: "shipped",     notes: "Signal quality 92%" },
    { area: "Board Automation Maturity",                  status: "shipped",     notes: "Maturity 91%" },
    { area: "Durable Revenue Intelligence Automation",    status: "shipped",     notes: "Renewal/expansion strong" },
    { area: "Marketplace Optimization Scale Controls",    status: "shipped",     notes: "Southeast density risk" },
    { area: "Executive Control Assurance",                status: "shipped",     notes: "5 high-risk in queue" },
    { area: "Automation Governance Evidence",             status: "shipped",     notes: "14 categories" },
    { area: "Automation Policy Enforcement",              status: "shipped",     notes: "1 exception" },
    { area: "Human-Approved Automation Scale",            status: "shipped",     notes: "96% coverage" },
    { area: "Recommendation Quality Assurance",           status: "shipped",     notes: "Quality 89%" },
    { area: "Outcome Learning Governance",                status: "shipped",     notes: "Loop 88%" },
    { area: "Approval Orchestration Reliability",         status: "shipped",     notes: "Routing 94%" },
    { area: "Predictive Risk Governance",                 status: "shipped",     notes: "15 categories" },
    { area: "Capital Automation Controls",                status: "shipped",     notes: "Evidence refresh pending" },
    { area: "Strategic Account Automation Controls",      status: "shipped",     notes: "Customer concentration exception" },
    { area: "Partner Automation Controls",                status: "shipped",     notes: "Approved partner-facing only" },
    { area: "Product-Line Automation Controls",           status: "shipped",     notes: "12 product lines" },
    { area: "Category Automation Controls",               status: "shipped",     notes: "Proof publishing approval" },
    { area: "Autonomous-Assist Control Audit",            status: "shipped",     notes: "Audit 94%" },
    { area: "Board Autonomous-Assist Scale Reporting",    status: "shipped",     notes: "12 sections" },
    { area: "Long-Term Operating Roadmap",                status: "shipped",     notes: "6 horizons" },
    { area: "V18 Reports",                                status: "shipped",     notes: "20 reports" },
    { area: "Fully autonomous dispatch",                  status: "placeholder", notes: "Deferred — HITL required" },
    { area: "IPO / SOC 2 / Android Auto claims",          status: "placeholder", notes: "Evidence-backed only" },
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace / capital / board",
    "IPO / acquisition / audited financial claims without tracked evidence",
    "SOC 2 / ISO / Android Auto / CarPlay claims without evidence",
    "Full customs / international tax / insurance underwriting / autonomous vehicle",
  ],
};

export const V18_HEADLINE = {
  headline: "V18 autonomous-assist scale governance live · 97% · all high-impact actions HITL-gated",
  highlights: [
    "Human approval coverage 96% · Recommendation quality 89% · Evidence 91% · Audit 94%",
    "Board maturity 91% · 2 evidence approvals pending · 1 CEO decision waiting",
    "Southeast carrier density flagged · preferred-carrier expansion routed for approval",
    "Customer concentration mitigation, capital evidence refresh, proof publishing all routed",
  ],
};

export const V18_ASSIST_SCALE_GOV = {
  score: "97%",
  kpis: [
    k("Scale governance", "97%", "+2 (6w)"),
    k("Policy compliance", "98%"),
    k("High-impact protection", "100%", "HITL enforced"),
    k("Human approval coverage", "96%"),
    k("Approval SLA health", "93%"),
    k("Recommendation quality", "89%"),
    k("Explainability completeness", "92%"),
    k("Evidence completeness", "91%"),
    k("Audit completeness", "94%"),
    k("Outcome learning coverage", "88%"),
    k("Automation exception rate", "1.4%"),
    k("Governance exception rate", "0.9%"),
  ],
  health_map: [
    { domain: "Revenue",      health: "Green" },
    { domain: "Marketplace",  health: "Amber — Southeast density" },
    { domain: "Capital",      health: "Green" },
    { domain: "Board",        health: "Green" },
    { domain: "Accounts",     health: "Amber — concentration" },
    { domain: "Partners",     health: "Green" },
    { domain: "Product",      health: "Green" },
    { domain: "Category",     health: "Green" },
  ],
  exceptions: [
    { id: "EX-1801", area: "Marketplace",  desc: "Southeast carrier density below threshold", owner: "VP Marketplace" },
    { id: "EX-1802", area: "Accounts",     desc: "Customer concentration above 22% for top-3", owner: "CRO" },
    { id: "EX-1803", area: "Capital",      desc: "Two evidence items stale >30d",              owner: "CFO" },
    { id: "EX-1804", area: "Policy",       desc: "Evidence requirement exception",             owner: "CCO" },
  ],
  action_plan: [
    { item: "Approve Southeast preferred carrier expansion", owner: "COO",   due: "Fri" },
    { item: "Refresh capital evidence (2 items)",            owner: "CFO",   due: "Mon" },
    { item: "Tighten concentration mitigation policy",       owner: "CRO",   due: "Q+1" },
    { item: "Close evidence requirement exception",          owner: "CCO",   due: "Wed" },
  ],
  exec_summary: [
    "Scale 97% with HITL protection at 100% for high-impact",
    "4 active exceptions assigned · all in remediation",
    "Board visibility ready · 1 CEO decision pending",
  ],
};

export const V18_PRED_OPERATING = {
  score: "92%",
  kpis: [
    k("Signal quality", "92%"),
    k("Signal coverage", "90%"),
    k("Data freshness", "91%"),
    k("Recommendation readiness", "89%"),
    k("Recommendation quality", "89%"),
    k("Risk prediction quality", "Placeholder — calibrated"),
    k("Revenue intel", "93%"),
    k("MP intel", "88%"),
    k("Capital intel", "92%"),
    k("Account intel", "90%"),
    k("Partner intel", "91%"),
    k("Product intel", "87%"),
    k("Category intel", "85%"),
    k("Exec workflow", "94%"),
    k("Board workflow", "92%"),
  ],
  coverage: [
    { area: "Revenue",     coverage: "93%", note: "Renewal + expansion fully covered" },
    { area: "Marketplace", coverage: "88%", note: "Reefer Southeast partial" },
    { area: "Capital",     coverage: "92%", note: "Evidence refresh pending" },
    { area: "Accounts",    coverage: "90%", note: "Concentration signal live" },
    { area: "Partners",    coverage: "91%", note: "Joint pipeline live" },
    { area: "Product",     coverage: "87%", note: "Telematics partial" },
    { area: "Category",    coverage: "85%", note: "Proof asset gaps" },
  ],
  freshness: [
    { source: "CRM",         freshness: "95%", stale: "2%" },
    { source: "Billing",     freshness: "93%", stale: "4%" },
    { source: "Marketplace", freshness: "89%", stale: "8%" },
    { source: "EDI/API",     freshness: "94%", stale: "3%" },
    { source: "Telematics",  freshness: "88%", stale: "9%" },
  ],
  readiness: [
    { rec: "Renewal mitigation",       readiness: "Ready",   owner: "CRO" },
    { rec: "Expansion routing",        readiness: "Ready",   owner: "CRO" },
    { rec: "Carrier density",          readiness: "Routed",  owner: "VP MP" },
    { rec: "Capital evidence refresh", readiness: "Pending", owner: "CFO" },
  ],
  action_plan: [
    { item: "Close telematics coverage gap", owner: "VP Product", due: "Q+1" },
    { item: "Refresh proof assets",          owner: "VP Strategy", due: "Q+1" },
  ],
};

export const V18_BOARD_MATURITY = {
  score: "91%",
  kpis: [
    k("Agenda automation", "94%"), k("Packet automation", "92%"),
    k("KPI appendix", "93%"),       k("Evidence collection", "90%"),
    k("Decision routing", "90%"),   k("Risk review", "89%"),
    k("Action follow-up", "88%"),   k("Explainability", "92%"),
  ],
  matrix: [
    { item: "Board agenda",        status: "Auto-drafted", owner: "Board Admin" },
    { item: "Board packet",        status: "Auto-drafted", owner: "Board Admin" },
    { item: "KPI appendix",        status: "Auto-built",    owner: "CFO" },
    { item: "Evidence collection", status: "2 pending approval", owner: "CCO" },
    { item: "Decision routing",    status: "1 CEO review waiting", owner: "CEO" },
    { item: "Risk review",         status: "Auto-routed",   owner: "CRO" },
  ],
  packet: [
    { section: "Exec summary",    status: "Ready",   owner: "CEO" },
    { section: "Financials",      status: "Ready",   owner: "CFO" },
    { section: "Revenue intel",   status: "Ready",   owner: "CRO" },
    { section: "MP intel",        status: "Pending evidence approval", owner: "VP MP" },
    { section: "Capital evidence",status: "Pending refresh", owner: "CFO" },
    { section: "Risk register",   status: "Ready",   owner: "CCO" },
  ],
  exceptions: [
    { id: "BX-1801", desc: "MP evidence pending approval",   owner: "VP MP" },
    { id: "BX-1802", desc: "Capital evidence stale (2 items)", owner: "CFO" },
  ],
  action_plan: [
    { item: "Approve MP evidence", owner: "CEO",  due: "Tue" },
    { item: "Refresh capital evidence", owner: "CFO", due: "Mon" },
  ],
};

export const V18_REVENUE_AUTO = {
  score: "93%",
  kpis: [
    k("Renewal signal", "95%"),   k("Expansion signal", "91%"),
    k("Churn risk", "92%"),       k("Concentration", "Exception"),
    k("Product concentration", "89%"), k("Payment health", "94%"),
    k("Billing dispute", "92%"),  k("MP revenue", "88%"),
    k("API/EDI revenue", "93%"),  k("Partner revenue", "90%"),
    k("Evidence", "91%"),         k("Approval routing", "94%"),
  ],
  matrix: [
    { signal: "Renewal",       status: "Auto-routing healthy", exception: 0 },
    { signal: "Expansion",     status: "Improving",            exception: 0 },
    { signal: "Concentration", status: "Exception — top-3 >22%", exception: 1 },
    { signal: "Evidence",      status: "2 stale items",         exception: 2 },
  ],
  routing: [
    { rec: "Renewal mitigation Acme", approver: "CRO",     status: "Approved" },
    { rec: "Expansion proposal Bolt", approver: "CRO",     status: "Pending" },
    { rec: "Concentration playbook",  approver: "CEO",     status: "Pending" },
  ],
  action_plan: [
    { item: "Refresh 2 stale evidence items", owner: "RevOps",   due: "Wed" },
    { item: "Apply concentration playbook",   owner: "CRO/CEO",  due: "Q+1" },
  ],
};

export const V18_MP_SCALE = {
  score: "90%",
  kpis: [
    k("Carrier density", "Texas 94 / MW 92 / SE 78"),
    k("Equipment coverage", "Dry 95 / Reefer 81 / Flatbed 88"),
    k("Load coverage", "93%"), k("Bid density", "89%"),
    k("Time-to-award", "11.4 min"),
    k("Regional liquidity", "TX 95 · MW 92 · SE 78"),
    k("Lane liquidity", "88%"),  k("Carrier quality", "94%"),
    k("Compliance", "97%"),      k("Disputes", "2 open"),
    k("Approval routing", "94%"),k("Exception rate", "1.1%"),
  ],
  matrix: [
    { area: "Carrier density Southeast", status: "Risk", note: "Below threshold — recommend preferred-carrier expansion" },
    { area: "Reefer equipment Southeast", status: "Weak",  note: "Add 4 carriers" },
    { area: "Bid density",                status: "Healthy", note: "—" },
    { area: "Lane liquidity",             status: "Healthy", note: "—" },
  ],
  regional: [
    { region: "Texas",     health: "Healthy", note: "—" },
    { region: "Midwest",   health: "Healthy", note: "—" },
    { region: "Southeast", health: "Risk",    note: "Density 78 vs 85 threshold" },
    { region: "Northeast", health: "Healthy", note: "—" },
  ],
  approvals: [
    { rec: "SE preferred carrier expansion", approver: "COO", status: "Pending", risk: "High" },
    { rec: "Reefer SE onboarding",           approver: "VP MP", status: "Pending", risk: "Medium" },
  ],
  action_plan: [
    { item: "Approve SE preferred carrier expansion", owner: "COO",   due: "Fri" },
    { item: "Onboard 4 reefer carriers SE",           owner: "VP MP", due: "Q+1" },
  ],
};

export const V18_EXEC_ASSURANCE = {
  score: "95%",
  queues: [
    { exec: "CEO",            pending: 4, high_risk: 3, overdue: 0, escalated: 1 },
    { exec: "CFO",            pending: 6, high_risk: 2, overdue: 1, escalated: 0 },
    { exec: "COO",            pending: 5, high_risk: 2, overdue: 0, escalated: 0 },
    { exec: "CRO",            pending: 8, high_risk: 2, overdue: 1, escalated: 1 },
    { exec: "VP Marketplace", pending: 7, high_risk: 2, overdue: 1, escalated: 0 },
    { exec: "VP Product",     pending: 4, high_risk: 1, overdue: 0, escalated: 0 },
    { exec: "VP CS",          pending: 5, high_risk: 1, overdue: 0, escalated: 0 },
    { exec: "VP Partners",    pending: 3, high_risk: 1, overdue: 0, escalated: 0 },
    { exec: "CCO/CISO",       pending: 5, high_risk: 2, overdue: 0, escalated: 0 },
  ],
  high_risk: [
    { id: "HR-1801", desc: "SE marketplace preferred carrier expansion", owner: "COO" },
    { id: "HR-1802", desc: "Customer concentration mitigation",          owner: "CRO" },
    { id: "HR-1803", desc: "Capital evidence refresh",                   owner: "CFO" },
    { id: "HR-1804", desc: "Board packet approval",                      owner: "CEO" },
    { id: "HR-1805", desc: "Category proof publishing approval",         owner: "VP Strategy" },
  ],
  escalations: [
    { id: "ES-1801", from: "VP MP", to: "COO", reason: "SE density threshold breach", sla: "24h" },
    { id: "ES-1802", from: "RevOps", to: "CRO", reason: "Concentration policy edit", sla: "48h" },
  ],
  outcomes: [
    { week: "W-3", approved: 41, rejected: 4, quality: "0.91" },
    { week: "W-2", approved: 47, rejected: 3, quality: "0.93" },
    { week: "W-1", approved: 52, rejected: 5, quality: "0.92" },
    { week: "W-0", approved: 49, rejected: 4, quality: "0.94" },
  ],
};

export const V18_EVIDENCE = {
  score: "91%",
  categories: [
    { category: "Policy",            freshness: "94%", owner: "CCO" },
    { category: "Approval",          freshness: "95%", owner: "CCO" },
    { category: "Recommendation",    freshness: "92%", owner: "Chief AI" },
    { category: "Explainability",    freshness: "91%", owner: "Chief AI" },
    { category: "Source signal",     freshness: "90%", owner: "Data" },
    { category: "Risk scoring",      freshness: "93%", owner: "CCO" },
    { category: "Human override",    freshness: "96%", owner: "CCO" },
    { category: "Rejection reason",  freshness: "94%", owner: "CCO" },
    { category: "Outcome",           freshness: "89%", owner: "Chief AI" },
    { category: "Audit",             freshness: "96%", owner: "CCO" },
    { category: "Board-use",         freshness: "92%", owner: "Board Admin" },
    { category: "External-use",      freshness: "88%", owner: "Legal" },
    { category: "Data-room-use",     freshness: "86%", owner: "CFO" },
    { category: "Control remediation", freshness: "90%", owner: "CCO" },
  ],
  gaps: [
    { category: "Data-room-use", gap: "2 items stale >30d", owner: "CFO" },
    { category: "External-use",  gap: "1 legal review pending", owner: "Legal" },
  ],
  approvals: [
    { item: "Board packet evidence", approver: "Board Admin", status: "Pending" },
    { item: "Capital evidence pack", approver: "CFO",         status: "Pending" },
  ],
};

export const V18_POLICY = {
  score: "98%",
  matrix: [
    { policy: "High-impact action protection", status: "Passing",   owner: "CCO" },
    { policy: "Human approval enforcement",     status: "Passing",   owner: "CCO" },
    { policy: "Risk threshold enforcement",     status: "Passing",   owner: "CCO" },
    { policy: "Confidence threshold",           status: "Passing",   owner: "Chief AI" },
    { policy: "Evidence requirement",           status: "Exception", owner: "CCO" },
    { policy: "Explainability requirement",     status: "Passing",   owner: "Chief AI" },
    { policy: "Audit logging",                  status: "Passing",   owner: "CCO" },
    { policy: "External-use approval",          status: "Passing",   owner: "Legal" },
    { policy: "Board-use approval",             status: "Passing",   owner: "Board Admin" },
    { policy: "Data-room-use approval",         status: "Passing",   owner: "CFO" },
    { policy: "Customer data boundary",         status: "Passing",   owner: "CISO" },
    { policy: "Carrier data boundary",          status: "Passing",   owner: "CISO" },
    { policy: "Partner data boundary",          status: "Passing",   owner: "CISO" },
    { policy: "Tenant isolation",               status: "Passing",   owner: "CISO" },
  ],
  violations: [
    { id: "PV-1801", policy: "Evidence requirement", desc: "1 high-impact action missing evidence link", owner: "CCO" },
  ],
  remediation: [
    { id: "PR-1801", action: "Attach evidence to action ACT-7732", owner: "CCO", due: "Wed", status: "In progress" },
  ],
};

export const V18_HITL_SCALE = {
  score: "96%",
  kpis: [
    k("Volume (7d)", "342"), k("Approved", "298"), k("Rejected", "21"),
    k("Pending", "23"),       k("Overdue", "3"),    k("High-risk", "37"),
    k("SLA hit", "93%"),      k("Outcome tracking", "94%"),
  ],
  queue: [
    { id: "AR-9101", desc: "SE preferred carrier expansion",    owner: "VP MP",     approver: "COO",   risk: "High",   sla: "24h", evidence: "Complete" },
    { id: "AR-9102", desc: "Concentration mitigation playbook",  owner: "RevOps",    approver: "CRO",   risk: "High",   sla: "48h", evidence: "Complete" },
    { id: "AR-9103", desc: "Capital evidence refresh",           owner: "CFO Ops",   approver: "CFO",   risk: "High",   sla: "Mon", evidence: "2 stale" },
    { id: "AR-9104", desc: "Category proof publish",             owner: "Marketing", approver: "VP Strategy", risk: "Medium", sla: "Fri", evidence: "Complete" },
    { id: "AR-9105", desc: "Board packet evidence approval",     owner: "Board Adm.", approver: "CEO",   risk: "High",   sla: "Tue", evidence: "Complete" },
  ],
};

export const V18_REC_QA = {
  score: "89%",
  kpis: [
    k("Source signal quality", "92%"), k("Evidence completeness", "91%"),
    k("Explainability", "92%"), k("Confidence calibration", "0.94"),
    k("Risk scoring consistency", "0.91"), k("Approval rate", "78%"),
    k("Rejection rate", "9%"), k("Duplicate rate", "3%"),
    k("Repeat rate", "5%"),    k("Outcome quality", "0.91"),
  ],
  duplicates: [
    { id: "DUP-1801", rec: "Renewal mitigation Acme", originals: 2, status: "Merged" },
    { id: "DUP-1802", rec: "Concentration playbook",  originals: 2, status: "Open" },
  ],
  action_plan: [
    { item: "Tighten duplicate detection", owner: "Chief AI", due: "Q+1" },
    { item: "Recalibrate confidence",      owner: "Chief AI", due: "Q+1" },
  ],
};

export const V18_OUTCOME_LEARNING = {
  score: "88%",
  by_domain: [
    { domain: "Revenue",     outcomes_tracked: 142, calibration: "0.94" },
    { domain: "Marketplace", outcomes_tracked: 121, calibration: "0.91" },
    { domain: "Capital",     outcomes_tracked: 38,  calibration: "0.93" },
    { domain: "Accounts",    outcomes_tracked: 86,  calibration: "0.92" },
    { domain: "Partners",    outcomes_tracked: 54,  calibration: "0.90" },
    { domain: "Product",     outcomes_tracked: 47,  calibration: "0.89" },
    { domain: "Category",    outcomes_tracked: 22,  calibration: "0.87" },
  ],
  lessons: [
    { lesson: "Tighten concentration threshold by 2pp",   owner: "CRO" },
    { lesson: "Increase SE carrier density floor",        owner: "VP MP" },
    { lesson: "Add evidence refresh nudge at 21d (was 30d)", owner: "CCO" },
  ],
  policy_tuning: [
    { policy: "Concentration", suggestion: "Lower trigger 22%→20%", owner: "CRO" },
    { policy: "SE density",    suggestion: "Raise floor 78→82",     owner: "VP MP" },
  ],
};

export const V18_APPROVAL_RELIABILITY = {
  score: "94%",
  kpis: [
    k("Routing accuracy", "94%"),  k("Backup approver coverage", "97%"),
    k("Escalation reliability", "92%"), k("SLA reliability", "93%"),
    k("Evidence at approval", "91%"), k("Explanation at approval", "92%"),
    k("Overdue handling", "95%"),  k("Rejection reason quality", "0.92"),
    k("Audit completeness", "94%"),k("Outcome linkage", "90%"),
  ],
  routing: [
    { approver: "CEO",   primary: 100, backup: 100, accuracy: "97%" },
    { approver: "CFO",   primary: 100, backup: 100, accuracy: "95%" },
    { approver: "COO",   primary: 100, backup: 100, accuracy: "94%" },
    { approver: "CRO",   primary: 100, backup: 100, accuracy: "93%" },
  ],
  action_plan: [
    { item: "Add backup approver for VP Partners", owner: "CCO", due: "Wed" },
  ],
};

export const V18_RISK_GOV = {
  score: "92%",
  matrix: [
    { category: "Revenue durability",    owner: "CRO",    coverage: "94%", evidence: "Complete" },
    { category: "Customer concentration",owner: "CRO",    coverage: "92%", evidence: "Exception" },
    { category: "Renewal",                owner: "CRO",    coverage: "95%", evidence: "Complete" },
    { category: "Expansion",              owner: "CRO",    coverage: "91%", evidence: "Complete" },
    { category: "MP liquidity",           owner: "VP MP",  coverage: "88%", evidence: "Partial" },
    { category: "Carrier density",        owner: "VP MP",  coverage: "85%", evidence: "Exception SE" },
    { category: "Partner dependency",     owner: "VP P",   coverage: "90%", evidence: "Complete" },
    { category: "Product support",        owner: "VP Pr",  coverage: "89%", evidence: "Complete" },
    { category: "Capital evidence",       owner: "CFO",    coverage: "90%", evidence: "2 stale" },
    { category: "Commercial diligence",   owner: "CFO",    coverage: "91%", evidence: "Complete" },
    { category: "Category proof",         owner: "VP S",   coverage: "85%", evidence: "Gaps" },
    { category: "Board action",           owner: "Board",  coverage: "92%", evidence: "Complete" },
    { category: "Compliance/control",     owner: "CCO",    coverage: "94%", evidence: "Complete" },
    { category: "AI governance",          owner: "Chief AI", coverage: "93%", evidence: "Complete" },
    { category: "Operational scalability",owner: "COO",    coverage: "90%", evidence: "Complete" },
  ],
};

const controlCenter = (score: string, prefix: string, domains: string[]) => ({
  score,
  matrix: domains.map((d, i) => ({ control: d, status: i % 5 === 4 ? "Exception" : "Passing", owner: ["CRO","CFO","COO","CCO"][i % 4] })),
  exceptions: [{ id: `${prefix}-1801`, control: domains[domains.length - 1], desc: "Evidence refresh pending", owner: "CCO" }],
  remediation: [{ id: `${prefix}-R01`, action: "Refresh evidence", owner: "CCO", due: "Wed", status: "In progress" }],
});

export const V18_CAPITAL_CONTROLS = controlCenter("92%", "CC", [
  "Capital evidence automation","Data room evidence","Investor/acquirer evidence","Board packet evidence",
  "Revenue durability evidence","Marketplace evidence","Strategic risk evidence","External-use approval",
  "Capital recommendation","Capital approval routing","Capital audit logging",
]);
export const V18_ACCOUNT_CONTROLS = controlCenter("91%", "AC", [
  "Expansion signal","Renewal signal","Churn risk signal","Adoption signal","Customer trust signal",
  "Support burden signal","Executive sponsor signal","Account evidence","Customer communication approval",
  "Account recommendation","Account approval routing","Account audit logging",
]);
export const V18_PARTNER_CONTROLS = controlCenter("93%", "PC", [
  "Partner performance signal","Partner enablement signal","Partner support burden","Partner pipeline signal",
  "Joint customer signal","Partner risk","Partner evidence","Partner-facing communication",
  "Partner recommendation","Partner approval routing","Partner audit logging",
]);
export const V18_PRODUCT_CONTROLS = {
  score: "89%",
  lines: [
    "Dispatch Command Center","EliteNav","Driver Mobile","Customer Portal","CoPilot AI","Carrier Marketplace",
    "API Platform","EDI Platform","Telematics","Partner Marketplace","Reports/Analytics","Enterprise Governance",
  ].map((line, i) => ({ line, adoption: `${75 + (i % 10)}%`, support: `${i % 4 === 3 ? "High" : "Normal"}`, status: i === 8 ? "Watch — Telematics" : "Healthy" })),
  matrix: controlCenter("89%", "PRC", [
    "Adoption signal","Support burden","Reliability signal","Technical debt placeholder",
    "Product evidence","Product recommendation","Product investment approval","Product audit logging",
  ]).matrix,
  exceptions: [{ id: "PRC-1801", control: "Reliability signal", desc: "Telematics partial coverage", owner: "VP Product" }],
};
export const V18_CATEGORY_CONTROLS = controlCenter("88%", "CAT", [
  "Category narrative signal","Proof asset signal","Market education","Competitive positioning",
  "Differentiation","Sales narrative","Website/demo narrative","Board narrative",
  "Proof publishing approval","External-use approval","Category recommendation","Category audit logging",
]);

export const V18_AUDIT = {
  score: "94%",
  trail: [
    { id: "AU-9101", action: "SE preferred carrier expansion", policy: "High-impact MP", trigger: "Density threshold", recommendation: "Expand", explanation: "Density 78 < 85 floor", evidence: "Complete", risk: "0.78", confidence: "0.91", approver: "COO", decision: "Pending", outcome: "—" },
    { id: "AU-9102", action: "Concentration playbook",          policy: "High-impact Rev", trigger: "Top-3 >22%",      recommendation: "Diversify", explanation: "Top-3 22.4%",  evidence: "Complete", risk: "0.72", confidence: "0.93", approver: "CRO/CEO", decision: "Pending", outcome: "—" },
    { id: "AU-9103", action: "Capital evidence refresh",        policy: "Capital",          trigger: "Stale >30d",      recommendation: "Refresh",   explanation: "2 stale",      evidence: "Partial",  risk: "0.55", confidence: "0.94", approver: "CFO",     decision: "Pending", outcome: "—" },
    { id: "AU-9104", action: "Renewal mitigation Acme",         policy: "Revenue",          trigger: "Churn signal",    recommendation: "Mitigate",  explanation: "Adoption -12%", evidence: "Complete", risk: "0.62", confidence: "0.92", approver: "CRO",     decision: "Approved", outcome: "Saved" },
  ],
  exceptions: [
    { id: "AX-1801", desc: "Evidence partial on capital refresh", owner: "CFO" },
  ],
  export_note: "Audit export placeholder — append-only; no UPDATE/DELETE policies at RLS layer.",
};

export const V18_BOARD_REPORT = {
  sections: [
    "Autonomous-assist scale governance","Predictive operating excellence","Board automation maturity",
    "Durable revenue intelligence automation","Marketplace optimization scale controls","Executive control assurance",
    "Automation policy enforcement","Human-approved automation scale","Recommendation QA",
    "Outcome learning governance","Control audit results","Exceptions","Decisions needed",
    "Next quarter autonomous-assist scale priorities",
  ].map(section => ({ section, status: "Drafted", approver: "CEO/Board" })),
  decisions_needed: [
    "Approve SE preferred carrier expansion",
    "Approve customer concentration mitigation playbook",
    "Approve capital evidence refresh package",
    "Approve category proof publishing",
  ],
};

export const V18_ROADMAP = [
  { horizon: "Current quarter", focus: "Close 4 exceptions · refresh capital evidence · approve SE expansion" },
  { horizon: "Next quarter",    focus: "Tighten concentration + density policies · raise outcome learning to 90%" },
  { horizon: "6 months",        focus: "Predictive operating excellence ≥95% · evidence freshness ≥95% all categories" },
  { horizon: "12 months",       focus: "Board packet auto-draft v2 · exec digest automation (HITL gated)" },
  { horizon: "24 months",       focus: "Cross-domain outcome learning at scale · federated assist governance patterns" },
  { horizon: "36 months",       focus: "Mature autonomous-assist operating discipline · all high-impact still HITL" },
];

export const V18_REPORTS = [
  "Enterprise autonomous-assist scale governance","Predictive operating excellence","Board automation maturity",
  "Durable revenue intelligence automation","Marketplace optimization scale controls","Executive control assurance",
  "Automation governance evidence","Automation policy enforcement","Human-approved automation scale",
  "Recommendation QA","Outcome learning governance","Approval orchestration reliability",
  "Predictive risk governance","Capital automation controls","Strategic account automation controls",
  "Partner automation controls","Product-line automation controls","Category automation controls",
  "Autonomous-assist control audit","Board autonomous-assist scale reporting",
].map(name => ({ name, status: "Ready", owner: "Exec/Board" }));

export const V18_RLS = [
  { name: "v18_high_impact_human_approval", target: "automation_actions", sql: "USING (impact_tier <> 'high' OR EXISTS (SELECT 1 FROM approvals a WHERE a.action_id = id AND a.approver_id <> recommender_id AND a.status = 'approved'))" },
  { name: "v18_no_self_approve",            target: "approvals",          sql: "WITH CHECK (approver_id <> recommender_id)" },
  { name: "v18_company_scope",              target: "*_records",          sql: "USING (company_id = public.current_company())" },
  { name: "v18_audit_append_only",          target: "autonomous_assist_control_audit_records", sql: "FOR INSERT WITH CHECK (true); -- no UPDATE/DELETE" },
  { name: "v18_board_packet_role_gate",     target: "board_assist_scale_reports", sql: "USING (public.has_role(auth.uid(), company_id, 'admin') OR public.has_role(auth.uid(), company_id, 'owner'))" },
  { name: "v18_policy_exec_only_update",    target: "automation_policy_enforcement_records", sql: "FOR UPDATE USING (public.has_role(auth.uid(), company_id, 'owner'))" },
  { name: "v18_customer_user_excluded",     target: "*_records",          sql: "USING (NOT public.is_customer_user(auth.uid(), company_id))" },
  { name: "v18_carrier_view_blocked",       target: "marketplace_optimization_scale_control_records", sql: "USING (current_setting('app.role') <> 'carrier')" },
  { name: "v18_partner_facing_approved_only", target: "partner_automation_control_records", sql: "USING (audience = 'partner' AND status = 'approved')" },
];

export const V18_EDGE_BOUNDARY = [
  { layer: "createServerFn", concern: "Approvals, policy edits, evidence attach", auth: "requireSupabaseAuth + role gate", returns: "DTO" },
  { layer: "createServerFn", concern: "Recommendation + control reads",            auth: "requireSupabaseAuth",             returns: "Scored DTO" },
  { layer: "Edge Function",  concern: "calculate-v18-autonomous-assist-scale-score (nightly)", auth: "Service role + cron", returns: "Score write" },
  { layer: "Edge Function",  concern: "calculate-recommendation-quality-assurance",            auth: "Service role + cron", returns: "QA metrics" },
  { layer: "Edge Function",  concern: "calculate-outcome-learning-governance",                 auth: "Service role + cron", returns: "Calibration metrics" },
  { layer: "Edge Function",  concern: "detect-* exceptions (revenue/MP/audit)",                auth: "Service role + cron", returns: "Exception inserts" },
  { layer: "Edge Function",  concern: "generate-board-assist-scale-report",                    auth: "Service role + cron", returns: "Report draft" },
  { layer: "/api/public/webhook/*", concern: "Signed external evidence ingest", auth: "HMAC", returns: "200 / 401" },
];

export const V18_EDGE_FUNCTIONS = [
  "calculate-v18-autonomous-assist-scale-score","generate-assist-scale-governance-summary","detect-assist-scale-governance-exceptions",
  "calculate-predictive-operating-excellence","calculate-signal-coverage-quality","generate-predictive-operating-action-plan",
  "calculate-board-automation-maturity","generate-board-automation-maturity-summary","generate-board-assist-scale-report",
  "calculate-revenue-intelligence-automation","detect-revenue-automation-control-exceptions","generate-revenue-intelligence-automation-plan",
  "calculate-marketplace-optimization-scale-controls","detect-marketplace-scale-control-exceptions","generate-marketplace-scale-control-plan",
  "calculate-automation-policy-enforcement-score","calculate-recommendation-quality-assurance",
  "calculate-outcome-learning-governance","calculate-approval-orchestration-reliability",
  "calculate-predictive-risk-governance","calculate-capital-automation-controls","calculate-account-automation-controls",
  "calculate-partner-automation-controls","calculate-product-line-automation-controls","calculate-category-automation-controls",
  "generate-autonomous-assist-control-audit-report","detect-assist-control-audit-exceptions","generate-long-term-assist-operating-roadmap",
];

export const V18_DEMO = [
  { who: "CEO",         step: "Open Enterprise Autonomous-Assist Scale Governance Center", outcome: "Scale 97% · approval 96% · rec 89% · evidence 91% · audit 94%" },
  { who: "Board Admin", step: "Open Board Automation Maturity Center",                     outcome: "Maturity 91% · 2 evidence pending · 1 CEO decision waiting" },
  { who: "RevOps",      step: "Open Durable Revenue Intelligence Automation Center",      outcome: "Renewal strong · expansion improving · concentration exception" },
  { who: "VP MP",       step: "Open Marketplace Optimization Scale Controls Center",       outcome: "TX/MW healthy · SE density risk · preferred carrier routed for approval" },
  { who: "CCO",         step: "Open Automation Policy Enforcement Center",                 outcome: "High-impact + tenant isolation passing · 1 evidence exception in remediation" },
  { who: "CEO",         step: "Open Executive Control Assurance Center",                   outcome: "5 high-risk in queue · 3 escalations visible" },
  { who: "Chief AI",    step: "Open Outcome Learning Governance Center",                   outcome: "Loop 88% · 3 lessons · 2 policy tuning suggestions" },
  { who: "CCO",         step: "Open Approval Orchestration Reliability Center",            outcome: "Routing 94% · backup 97% · 1 backup gap" },
  { who: "CCO",         step: "Open Autonomous-Assist Control Audit Center",               outcome: "Audit 94% · append-only verified · 1 exception" },
  { who: "Board Admin", step: "Generate Board Autonomous-Assist Scale Report",             outcome: "14 sections drafted · 4 decisions queued" },
  { who: "Exec",        step: "Open Long-Term Autonomous-Assist Operating Roadmap",        outcome: "6 horizons · 18 tracks · Phase 50 teaser" },
  { who: "Exec",        step: "Close demo on V18 Overview",                                outcome: "All surfaces reachable · all high-impact HITL" },
];

export const V18_PHASE50_TEASER =
  "Phase 50 teaser: V18.5 would deliver enterprise control assurance, autonomous-assist operating resilience, board intelligence assurance, revenue automation control maturity, and marketplace control optimization. Still HITL on every high-impact action. Not started.";

export const V18_GUARDRAILS = [
  "No fully autonomous dispatch / pricing / billing / marketplace / capital / board",
  "No IPO / acquisition / audited / SOC 2 / ISO / Android Auto / CarPlay claims without tracked evidence",
  "No bypass of RBAC, RLS, tenant isolation, audit logs, approval workflows, financial controls, AI governance",
  "Every high-impact AI-assisted action requires approver_id <> recommender_id",
];
