// V16.5 — Enterprise Predictive Governance Maturity (mock-only)

export const V165_SCOPE = {
  version: "V16.5",
  posture: "Enterprise predictive governance maturity — AI-assisted, human-approved",
  included: [
    "Enterprise Predictive Governance Command Center",
    "AI-Assisted Board Operating System",
    "Board Packet Intelligence Center",
    "Durable Revenue Control Automation Center",
    "Revenue Control Automation Governance",
    "Marketplace Intelligence Maturity Center",
    "Marketplace Control Automation Governance",
    "Strategic Approval Orchestration Center",
    "Executive Decision Routing System",
    "Predictive Control Monitoring Center",
    "Governance Evidence Automation Center",
    "Recommendation Evidence Automation",
    "Predictive Risk Routing Center",
    "Human-Approved Automation Queue",
    "Outcome-Based Policy Tuning",
    "Capital Control Automation Governance",
    "Strategic Account Control Automation",
    "Partner Control Automation Governance",
    "Product-Line Control Automation Governance",
    "Board-Level Predictive Intelligence Reporting",
    "Long-Term Predictive Governance Roadmap",
    "V16.5 Reports Dashboard",
  ],
  deferred: [
    "Fully autonomous dispatch",
    "Fully autonomous pricing / billing",
    "Fully autonomous marketplace mutations",
    "Autonomous customer / carrier actions",
    "Autonomous compliance / legal actions",
    "Autonomous board / capital decisions",
    "Final IPO / acquisition claims",
    "Final audited financial claims",
    "Final certification claims without evidence",
    "Customs production workflows",
    "International tax automation",
    "Insurance underwriting automation",
    "Autonomous vehicle workflows",
    "Final Android Auto / CarPlay claims",
  ],
};

export const V165_FEATURE_MATRIX = [
  { feature: "Enterprise Predictive Governance Command", status: "live" },
  { feature: "AI-Assisted Board Operating System",        status: "live" },
  { feature: "Board Packet Intelligence",                 status: "live" },
  { feature: "Durable Revenue Control Automation",        status: "live" },
  { feature: "Revenue Automation Governance",             status: "live" },
  { feature: "Marketplace Intelligence Maturity",         status: "live" },
  { feature: "Marketplace Automation Governance",         status: "live" },
  { feature: "Strategic Approval Orchestration",          status: "live" },
  { feature: "Executive Decision Routing",                status: "live" },
  { feature: "Predictive Control Monitoring",             status: "live" },
  { feature: "Governance Evidence Automation",            status: "live" },
  { feature: "Recommendation Evidence Automation",        status: "live" },
  { feature: "Predictive Risk Routing",                   status: "live" },
  { feature: "Human-Approved Automation Queue",           status: "live" },
  { feature: "Outcome-Based Policy Tuning",               status: "live" },
  { feature: "Capital / Account / Partner / Product Automation", status: "live" },
  { feature: "Board-Level Predictive Intelligence Reporting",    status: "live" },
  { feature: "Long-Term Predictive Governance Roadmap",          status: "live" },
  { feature: "Autonomous dispatch / pricing / billing",          status: "deferred" },
];

export const V165_HEADLINE = {
  headline: "V16.5 — predictive governance 95% · approval orchestration 92% · evidence automation 88%",
  highlights: [
    "12 high-impact recs awaiting human approval across 8 owners",
    "37 predictive signals tracked, 91% within 24h freshness SLA",
    "Board packet intelligence flags 2 evidence gaps before finalization",
    "1 outcome-based policy tuning suggestion queued for approval",
  ],
};

export const V165_PREDICTIVE_GOVERNANCE = {
  score: 95,
  kpis: [
    { label: "Signal quality",         value: "92%" },
    { label: "Risk coverage",          value: "90%" },
    { label: "Approval health",        value: "92%" },
    { label: "Evidence automation",    value: "88%" },
    { label: "Board packet intel",     value: "94%" },
    { label: "Revenue automation",     value: "86%" },
    { label: "MP intelligence",        value: "84%" },
    { label: "Capital automation",     value: "89%" },
  ],
  health_map: [
    { domain: "Revenue",        health: 86 },
    { domain: "Marketplace",    health: 84 },
    { domain: "Capital",        health: 89 },
    { domain: "Accounts",       health: 87 },
    { domain: "Partners",       health: 83 },
    { domain: "Product Lines",  health: 88 },
    { domain: "Category",       health: 90 },
    { domain: "Board / Audit",  health: 94 },
  ],
  exceptions: [
    { id: "EX-101", area: "MP", desc: "Carrier density below threshold in Southeast", owner: "MP GM" },
    { id: "EX-102", area: "Revenue", desc: "Concentration > 18% (acct A-77)",          owner: "CFO" },
    { id: "EX-103", area: "Evidence", desc: "Capital evidence stale > 30d",            owner: "Compliance" },
  ],
  action_plan: [
    { item: "Refresh capital evidence pack",      owner: "Compliance", due: "T+5d" },
    { item: "Approve MP carrier expansion rec",    owner: "MP GM",     due: "T+2d" },
    { item: "Approve concentration mitigation",    owner: "CFO",       due: "T+3d" },
  ],
};

export const V165_BOARD_OS = {
  score: 93,
  agenda: [
    { item: "Q3 capital review",          owner: "CFO",        evidence: "ready" },
    { item: "Revenue durability review",  owner: "Head of Rev", evidence: "2 gaps" },
    { item: "Marketplace scale review",   owner: "MP GM",      evidence: "ready" },
    { item: "Strategic account review",   owner: "CRO",        evidence: "ready" },
    { item: "Partner value review",       owner: "Partners",   evidence: "1 update needed" },
    { item: "Risk & control review",      owner: "COO",        evidence: "ready" },
    { item: "Board decision queue",       owner: "Chair",      evidence: "ready" },
  ],
  decision_queue: [
    { id: "BD-21", topic: "Approve Q3 capital plan",         owner: "Board", risk: "med" },
    { id: "BD-22", topic: "Approve MP expansion (SE region)", owner: "Board", risk: "med" },
    { id: "BD-23", topic: "Approve revenue concentration cap", owner: "Board", risk: "low" },
  ],
  evidence_gaps: [
    { area: "Revenue durability", item: "Cohort retention deck",     owner: "Head of Rev" },
    { area: "Revenue durability", item: "Renewal evidence pack",      owner: "Head of Rev" },
    { area: "Marketplace",        item: "Carrier compliance summary", owner: "MP GM" },
    { area: "Partner",            item: "Partner value scorecard",    owner: "Partners" },
  ],
  follow_ups: [
    { id: "FU-09", topic: "Close revenue evidence gaps before next board", owner: "Head of Rev", status: "in-flight" },
    { id: "FU-10", topic: "Refresh MP compliance summary",                 owner: "MP GM",       status: "open" },
  ],
};

export const V165_BOARD_PACKET = {
  readiness: 91,
  sections: [
    { section: "Agenda",                completeness: 100, owner: "Chair" },
    { section: "KPI appendix",          completeness: 96,  owner: "Strategy" },
    { section: "Capital readiness",     completeness: 92,  owner: "CFO" },
    { section: "Revenue durability",    completeness: 78,  owner: "Head of Rev" },
    { section: "Marketplace intel",     completeness: 90,  owner: "MP GM" },
    { section: "Strategic accounts",    completeness: 94,  owner: "CRO" },
    { section: "Partner value",         completeness: 86,  owner: "Partners" },
    { section: "Product lines",         completeness: 91,  owner: "CPO" },
    { section: "Risk & controls",       completeness: 95,  owner: "COO" },
    { section: "Decisions needed",      completeness: 100, owner: "Chair" },
  ],
  missing: [
    { item: "Cohort retention deck",      owner: "Head of Rev", required_by: "T+2d" },
    { item: "Renewal evidence pack",      owner: "Head of Rev", required_by: "T+2d" },
    { item: "Partner value scorecard",    owner: "Partners",     required_by: "T+3d" },
  ],
  approval: { stage: "pending", approver: "Board Chair", evidence_locked: false },
};

export const V165_REVENUE_AUTOMATION = {
  score: 86,
  signals: [
    { signal: "Renewal risk",           value: "3 accounts flagged", action: "Approval required" },
    { signal: "Expansion opportunity",  value: "2 accounts",         action: "CRO approval" },
    { signal: "Churn risk",             value: "1 account",           action: "CRO + CEO approval" },
    { signal: "Payment health",         value: "98% on-time",         action: "Monitor" },
    { signal: "Billing dispute",        value: "2 disputes",          action: "Finance approval" },
    { signal: "Concentration",          value: "Acct A-77 at 18%",    action: "CFO approval" },
    { signal: "MP revenue",             value: "Trending +6%",        action: "Monitor" },
    { signal: "Partner revenue",        value: "Stable",              action: "Monitor" },
  ],
  evidence_queue: [
    { item: "Refresh ARR cohort evidence", owner: "Head of Rev", freshness: "stale 12d" },
    { item: "Refresh churn cohort",        owner: "Head of Rev", freshness: "stale 9d" },
  ],
  exceptions: [
    { id: "RX-31", desc: "Concentration breach > 18% threshold", owner: "CFO" },
  ],
  approvals_pending: 5,
};

export const V165_REVENUE_GOVERNANCE = {
  policy_matrix: [
    { domain: "Renewal",       confidence_min: 0.85, approver: "CRO",  evidence: "renewal pack" },
    { domain: "Expansion",     confidence_min: 0.80, approver: "CRO",  evidence: "expansion plan" },
    { domain: "Churn risk",    confidence_min: 0.85, approver: "CRO+CEO", evidence: "churn cohort" },
    { domain: "Concentration", confidence_min: 0.90, approver: "CFO",  evidence: "concentration analysis" },
    { domain: "Payment",       confidence_min: 0.80, approver: "Finance", evidence: "AR aging" },
    { domain: "Billing",       confidence_min: 0.85, approver: "Finance", evidence: "dispute log" },
    { domain: "MP revenue",    confidence_min: 0.80, approver: "MP GM", evidence: "MP revenue snapshot" },
    { domain: "API/EDI rev",   confidence_min: 0.80, approver: "Head of Rev", evidence: "API rev snapshot" },
    { domain: "Partner rev",   confidence_min: 0.80, approver: "Partners", evidence: "partner scorecard" },
  ],
  audit_trail: [
    { ts: "T-1d", rec: "RX-31", action: "queued",   actor: "CoPilot" },
    { ts: "T-12h", rec: "RX-31", action: "reviewed", actor: "CFO" },
  ],
  tuning: [
    { domain: "Renewal", suggestion: "Tighten confidence min 0.85 → 0.88", owner: "Head of Rev" },
  ],
};

export const V165_MP_MATURITY = {
  score: 84,
  radar: [
    { dim: "Regional liquidity", value: 88 },
    { dim: "Lane liquidity",     value: 85 },
    { dim: "Carrier density",    value: 78 },
    { dim: "Equipment coverage", value: 82 },
    { dim: "Carrier quality",    value: 87 },
    { dim: "Carrier compliance", value: 86 },
    { dim: "Load coverage",      value: 84 },
    { dim: "Bid density",        value: 81 },
    { dim: "Time-to-award",      value: 83 },
    { dim: "Dispute trend",      value: 89 },
  ],
  regional: [
    { region: "Texas",     maturity: 91 },
    { region: "Midwest",   maturity: 89 },
    { region: "Southeast", maturity: 72, gap: "Carrier density" },
    { region: "Northeast", maturity: 84 },
    { region: "West",      maturity: 86 },
  ],
  recommendations: [
    { rec: "Expand preferred carriers in Southeast", approver: "MP GM", confidence: "0.87" },
    { rec: "Tighten bid density floor on long-haul",  approver: "MP GM", confidence: "0.82" },
  ],
  action_plan: [
    { item: "Approve SE carrier expansion", owner: "MP GM",       due: "T+2d" },
    { item: "Refresh MP evidence pack",      owner: "MP analyst", due: "T+5d" },
  ],
};

export const V165_MP_GOVERNANCE = {
  policy_matrix: [
    { signal: "Carrier density",   threshold: "≥ 80",  approver: "MP GM" },
    { signal: "Equipment coverage", threshold: "≥ 85", approver: "MP GM" },
    { signal: "Load coverage",     threshold: "≥ 88",  approver: "MP GM" },
    { signal: "Bid density",       threshold: "≥ 80",  approver: "MP GM" },
    { signal: "Time-to-award",     threshold: "≤ 4h",  approver: "MP GM" },
    { signal: "Carrier quality",   threshold: "≥ 90",  approver: "MP GM + Trust" },
    { signal: "Carrier compliance", threshold: "≥ 95", approver: "Trust" },
    { signal: "Dispute trend",     threshold: "Stable", approver: "MP GM" },
    { signal: "MP revenue signal", threshold: "± 5%",  approver: "MP GM + Finance" },
  ],
  audit_trail: [
    { ts: "T-6h", rec: "MP-44", action: "queued",   actor: "CoPilot" },
    { ts: "T-2h", rec: "MP-44", action: "approved", actor: "MP GM" },
  ],
  exceptions: [
    { id: "MX-12", desc: "Carrier density 72 in SE — below threshold", owner: "MP GM" },
  ],
  outcomes: [
    { rec: "MP-39", predicted: "+4% load coverage", actual: "+3.6%" },
  ],
};

export const V165_APPROVAL_ORCHESTRATION = {
  score: 92,
  routing: [
    { type: "Revenue",        approver: "CRO",       backup: "CEO",   sla_h: 24 },
    { type: "Marketplace",    approver: "MP GM",     backup: "COO",   sla_h: 24 },
    { type: "Capital",        approver: "CFO",       backup: "CEO",   sla_h: 48 },
    { type: "Board",          approver: "Chair",     backup: "CEO",   sla_h: 72 },
    { type: "Risk",           approver: "CRO",       backup: "COO",   sla_h: 24 },
    { type: "Account",        approver: "CRO",       backup: "CEO",   sla_h: 24 },
    { type: "Partner",        approver: "Partners",  backup: "CRO",   sla_h: 48 },
    { type: "Product",        approver: "CPO",       backup: "CEO",   sla_h: 48 },
    { type: "Category",       approver: "Strategy",  backup: "CEO",   sla_h: 72 },
    { type: "Evidence ext",   approver: "Compliance", backup: "CFO",  sla_h: 24 },
    { type: "Proof publish",  approver: "Marketing", backup: "CEO",   sla_h: 48 },
    { type: "Procurement",    approver: "Procurement", backup: "CFO", sla_h: 48 },
    { type: "Compliance act", approver: "Compliance", backup: "CEO",  sla_h: 24 },
  ],
  overdue: [
    { id: "AP-77", type: "Capital",    age_h: 50, owner: "CFO" },
    { id: "AP-78", type: "Marketplace", age_h: 26, owner: "MP GM" },
  ],
  escalations: [
    { id: "AP-77", to: "CEO", reason: "SLA breach (50h)" },
  ],
  audit_trail: [
    { ts: "T-2d", id: "AP-71", action: "approved", actor: "CFO", reason: "Evidence complete" },
    { ts: "T-1d", id: "AP-72", action: "rejected", actor: "MP GM", reason: "Confidence < 0.80" },
  ],
  outcome_summary: { approved_7d: 79, rejected_7d: 8, escalated_7d: 5 },
};

export const V165_EXEC_ROUTING = {
  queue: [
    { id: "ED-31", category: "CEO",    topic: "Capital plan sign-off",        risk: "med",  conf: "0.91", due: "T+2d" },
    { id: "ED-32", category: "CFO",    topic: "Concentration mitigation",     risk: "med",  conf: "0.88", due: "T+3d" },
    { id: "ED-33", category: "COO",    topic: "Control gap remediation plan", risk: "low",  conf: "0.85", due: "T+5d" },
    { id: "ED-34", category: "CRO",    topic: "Churn intervention rec",       risk: "med",  conf: "0.86", due: "T+2d" },
    { id: "ED-35", category: "MP GM",  topic: "SE carrier expansion",         risk: "med",  conf: "0.87", due: "T+2d" },
    { id: "ED-36", category: "CPO",    topic: "Product investment Q4",        risk: "low",  conf: "0.84", due: "T+7d" },
    { id: "ED-37", category: "Trust",  topic: "Carrier compliance escalation", risk: "high", conf: "0.92", due: "T+1d" },
    { id: "ED-38", category: "Board",  topic: "Board escalation: SLA breach", risk: "high", conf: "0.95", due: "T+1d" },
  ],
  owner_matrix: [
    { role: "CEO",   pending: 4, decided_7d: 9 },
    { role: "CFO",   pending: 3, decided_7d: 7 },
    { role: "COO",   pending: 5, decided_7d: 11 },
    { role: "CRO",   pending: 4, decided_7d: 8 },
    { role: "MP GM", pending: 3, decided_7d: 10 },
    { role: "CPO",   pending: 2, decided_7d: 4 },
  ],
  outcome: { approved_30d: 64, rejected_30d: 7, escalated_30d: 6 },
};

export const V165_CONTROL_MONITORING = {
  score: 89,
  matrix: [
    { category: "Revenue",         health: 86, owner: "Head of Rev",  alert: "Concentration" },
    { category: "Marketplace",     health: 84, owner: "MP GM",         alert: "SE density" },
    { category: "Capital",         health: 89, owner: "CFO",           alert: "Evidence age" },
    { category: "Accounts",        health: 87, owner: "CRO",           alert: null },
    { category: "Partners",        health: 83, owner: "Partners",      alert: "Scorecard refresh" },
    { category: "Product lines",   health: 88, owner: "CPO",           alert: null },
    { category: "Category",        health: 90, owner: "Strategy",      alert: null },
    { category: "Evidence",        health: 88, owner: "Compliance",    alert: "3 missing" },
    { category: "Board",           health: 94, owner: "Chair",         alert: null },
    { category: "Risk",            health: 87, owner: "CRO",           alert: null },
    { category: "Approvals",       health: 92, owner: "COO",           alert: "2 overdue" },
    { category: "AI governance",   health: 91, owner: "Head of Data",  alert: null },
  ],
  remediation: [
    { item: "Refresh capital evidence",     owner: "Compliance", status: "in-flight" },
    { item: "Refresh partner scorecard",    owner: "Partners",   status: "open" },
    { item: "Resolve 2 overdue approvals",  owner: "COO",        status: "in-flight" },
  ],
  outcomes: [
    { control: "Revenue concentration", improved: "+4 pts" },
    { control: "MP carrier compliance", improved: "+2 pts" },
  ],
};

export const V165_EVIDENCE_AUTOMATION = {
  score: 88,
  queue: [
    { item: "Revenue cohort evidence",   owner: "Head of Rev",  freshness: "stale 12d", status: "queued" },
    { item: "Capital data room pack",     owner: "Compliance",   freshness: "stale 30d", status: "in-flight" },
    { item: "MP compliance summary",      owner: "MP GM",        freshness: "fresh",     status: "ready" },
    { item: "Partner scorecard",          owner: "Partners",     freshness: "stale 8d",  status: "queued" },
    { item: "Category proof pack",        owner: "Strategy",     freshness: "fresh",     status: "ready" },
  ],
  owner_accountability: [
    { owner: "Head of Rev", open: 2, completed_7d: 5 },
    { owner: "Compliance",  open: 1, completed_7d: 3 },
    { owner: "MP GM",       open: 0, completed_7d: 4 },
    { owner: "Partners",    open: 1, completed_7d: 2 },
  ],
  missing: [
    { area: "Revenue", item: "Cohort retention deck",   owner: "Head of Rev" },
    { area: "Revenue", item: "Renewal evidence pack",   owner: "Head of Rev" },
    { area: "MP",      item: "Carrier compliance pack", owner: "MP GM" },
  ],
  audit_trail: [
    { ts: "T-1d", item: "Capital evidence",  action: "refresh requested", actor: "CoPilot" },
    { ts: "T-2h", item: "MP compliance",     action: "attached",          actor: "MP GM" },
  ],
  outcomes: [
    { item: "Capital evidence freshness", improved: "stale 60d → 30d" },
  ],
};

export const V165_REC_EVIDENCE = {
  completeness: 91,
  collectors: [
    { type: "Source signal",     completeness: 96 },
    { type: "Account context",   completeness: 92 },
    { type: "Marketplace ctx",   completeness: 88 },
    { type: "Revenue ctx",       completeness: 90 },
    { type: "Partner ctx",       completeness: 86 },
    { type: "Product ctx",       completeness: 89 },
    { type: "Capital ctx",       completeness: 92 },
    { type: "Board ctx",         completeness: 94 },
    { type: "Risk evidence",     completeness: 91 },
    { type: "Approval evidence", completeness: 95 },
    { type: "Outcome evidence",  completeness: 84 },
  ],
  gaps: [
    { rec: "RX-31", missing: "Outcome evidence", owner: "Head of Rev" },
    { rec: "MP-44", missing: "Risk evidence",    owner: "MP GM" },
  ],
  owners: [
    { owner: "Head of Rev", open_gaps: 2 },
    { owner: "MP GM",       open_gaps: 1 },
    { owner: "Compliance",  open_gaps: 1 },
  ],
};

export const V165_RISK_ROUTING = {
  score: 87,
  categories: [
    { cat: "Revenue durability",     owner: "CFO",   sponsor: "CEO",  status: "queued"   },
    { cat: "Customer concentration", owner: "CFO",   sponsor: "CEO",  status: "approved" },
    { cat: "Renewal risk",           owner: "CRO",   sponsor: "CEO",  status: "queued"   },
    { cat: "Expansion risk",         owner: "CRO",   sponsor: "CEO",  status: "monitor"  },
    { cat: "MP liquidity",           owner: "MP GM", sponsor: "COO",  status: "queued"   },
    { cat: "Carrier density",        owner: "MP GM", sponsor: "COO",  status: "queued"   },
    { cat: "Partner dependency",     owner: "Partners", sponsor: "CRO", status: "monitor" },
    { cat: "Product support burden", owner: "CPO",   sponsor: "COO",  status: "monitor"  },
    { cat: "Capital evidence",       owner: "Compliance", sponsor: "CFO", status: "in-flight" },
    { cat: "Commercial diligence",   owner: "CFO",   sponsor: "CEO",  status: "monitor"  },
    { cat: "Category proof",         owner: "Strategy", sponsor: "CEO", status: "monitor" },
    { cat: "Board action",           owner: "Chair", sponsor: "CEO",  status: "queued"   },
    { cat: "Compliance / control",   owner: "Compliance", sponsor: "COO", status: "queued" },
    { cat: "AI governance",          owner: "Head of Data", sponsor: "COO", status: "monitor" },
  ],
  sla_health: { on_time: "88%", at_risk: 3, breached: 1 },
  audit_trail: [
    { ts: "T-1d", id: "RR-21", action: "routed",    actor: "CoPilot" },
    { ts: "T-6h", id: "RR-21", action: "acknowledged", actor: "MP GM" },
  ],
};

export const V165_HUMAN_QUEUE = {
  items: [
    { id: "AU-01", type: "Evidence refresh",  trigger: "Stale > 10d",     action: "Request refresh",       approver: "Compliance", risk: "low",  status: "queued" },
    { id: "AU-02", type: "Approval routing",  trigger: "New rec",         action: "Route to MP GM",        approver: "MP GM",     risk: "med",  status: "queued" },
    { id: "AU-03", type: "Reminder",          trigger: "SLA at risk",     action: "Notify approver",       approver: "CFO",       risk: "low",  status: "executed" },
    { id: "AU-04", type: "Board packet prep", trigger: "Board T-7d",      action: "Assemble draft",        approver: "Chair",     risk: "low",  status: "in-flight" },
    { id: "AU-05", type: "Rec preparation",   trigger: "Signal threshold", action: "Draft rec + evidence", approver: "CRO",       risk: "med",  status: "queued" },
    { id: "AU-06", type: "Risk routing",      trigger: "Risk flag",       action: "Route to owner",        approver: "COO",       risk: "med",  status: "queued" },
    { id: "AU-07", type: "Outcome tracking",  trigger: "Post-decision",   action: "Capture metric",        approver: "Strategy",  risk: "low",  status: "in-flight" },
    { id: "AU-08", type: "Policy tuning rec", trigger: "Calibration drift", action: "Suggest threshold",   approver: "Head of Rev", risk: "low", status: "queued" },
  ],
  guardrails: [
    "Automation never executes pricing, billing, dispatch, MP mutation, customer, or carrier actions",
    "All high-impact actions require named human approver + evidence",
    "approver_id ≠ recommender_id enforced via RLS automation_no_self_approve",
  ],
};

export const V165_POLICY_TUNING = {
  suggestions: [
    { area: "Marketplace", type: "rec", approval_rate: 0.82, rejection: 0.18, calibration: "within ±10% on 78%", suggestion: "Raise confidence min 0.80 → 0.85", approver: "MP GM",    owner: "MP analyst" },
    { area: "Revenue",     type: "rec", approval_rate: 0.86, rejection: 0.14, calibration: "within ±10% on 81%", suggestion: "Keep current threshold",            approver: "Head of Rev", owner: "Rev analyst" },
    { area: "Capital",     type: "rec", approval_rate: 0.79, rejection: 0.21, calibration: "within ±10% on 74%", suggestion: "Add evidence-completeness gate ≥ 95%", approver: "CFO",  owner: "Compliance" },
  ],
  audit_trail: [
    { ts: "T-3d", area: "Marketplace", change: "Confidence min 0.78 → 0.80", approver: "MP GM" },
  ],
  outcome_analytics: { fp_pct: "4%", fn_pct: "6%", within_10: "78%", within_20: "92%" },
};

export const V165_CAPITAL_AUTOMATION = {
  policy_matrix: [
    { domain: "Evidence refresh",       cadence: "30d",  approver: "Compliance" },
    { domain: "Data room gap detect",   cadence: "weekly", approver: "CFO" },
    { domain: "Investor evidence route", cadence: "ad-hoc", approver: "CFO + CEO" },
    { domain: "Board capital packet",   cadence: "quarterly", approver: "Chair" },
    { domain: "Strategic risk routing", cadence: "weekly", approver: "CRO" },
    { domain: "External-use approval",  cadence: "ad-hoc", approver: "CFO" },
  ],
  evidence: [
    { item: "Capital data room v4",    owner: "Compliance", freshness: "stale 30d" },
    { item: "Cap table snapshot",       owner: "CFO",        freshness: "fresh" },
  ],
  gaps: [
    { gap: "Q3 audited financials draft", owner: "CFO" },
  ],
  audit_trail: [
    { ts: "T-2d", item: "Capital evidence refresh", actor: "CoPilot",  action: "requested" },
    { ts: "T-1d", item: "Capital evidence refresh", actor: "Compliance", action: "acknowledged" },
  ],
};

export const V165_ACCOUNT_AUTOMATION = {
  policy_matrix: [
    { signal: "Expansion",        approver: "CRO" },
    { signal: "Renewal risk",     approver: "CRO" },
    { signal: "Churn risk",       approver: "CRO + CEO" },
    { signal: "Adoption",         approver: "CSM lead" },
    { signal: "Support burden",   approver: "CSM lead" },
    { signal: "Customer trust",   approver: "Trust" },
    { signal: "Exec sponsor",     approver: "CRO" },
  ],
  routing: [
    { acct: "A-12", action: "Expansion play",    owner: "CRO",      status: "queued" },
    { acct: "A-77", action: "Concentration cap", owner: "CFO",      status: "queued" },
    { acct: "A-09", action: "Churn intervention", owner: "CRO",     status: "queued" },
  ],
  evidence: [
    { acct: "A-77", evidence: "Concentration analysis", freshness: "fresh" },
  ],
  outcomes: [
    { rec: "Acct-44 expansion", predicted: "+$120k ARR", actual: "+$108k" },
  ],
};

export const V165_PARTNER_AUTOMATION = {
  policy_matrix: [
    { signal: "Performance",       approver: "Partners" },
    { signal: "Enablement gap",    approver: "Partners" },
    { signal: "Support burden",    approver: "Partners" },
    { signal: "Partner revenue",   approver: "Partners + Finance" },
    { signal: "Risk routing",      approver: "Partners + CRO" },
    { signal: "Campaign rec",      approver: "Marketing" },
  ],
  routing: [
    { partner: "P-04", action: "Enablement uplift", owner: "Partners", status: "queued" },
    { partner: "P-09", action: "Campaign boost",    owner: "Marketing", status: "queued" },
  ],
  evidence: [
    { partner: "P-04", evidence: "Performance scorecard", freshness: "stale 8d" },
  ],
  outcomes: [
    { rec: "Partner-03 enablement", predicted: "+12% deal velocity", actual: "+9%" },
  ],
};

export const V165_PRODUCT_AUTOMATION = {
  policy_matrix: [
    { signal: "Adoption",        approver: "CPO" },
    { signal: "Support burden",  approver: "CPO + COO" },
    { signal: "Reliability",     approver: "CPO + Eng" },
    { signal: "Tech debt",       approver: "CPO + Eng" },
    { signal: "Investment rec",  approver: "CPO + CEO" },
  ],
  routing: [
    { product: "EliteNav",   action: "Reliability sprint", owner: "CPO", status: "queued" },
    { product: "MP",         action: "Adoption nudge",     owner: "CPO", status: "queued" },
  ],
  evidence: [
    { product: "CoPilot", evidence: "Adoption + acceptance", freshness: "fresh" },
  ],
  outcomes: [
    { rec: "Reliability sprint", predicted: "-15% incidents", actual: "-12%" },
  ],
};

export const V165_BOARD_REPORTING = {
  sections: [
    { section: "Predictive governance score",     value: "95%" },
    { section: "Board packet readiness",          value: "91%" },
    { section: "Revenue control automation",      value: "86%" },
    { section: "Marketplace intel maturity",      value: "84%" },
    { section: "Approval orchestration health",   value: "92%" },
    { section: "Recommendation outcomes (±10%)",  value: "78%" },
    { section: "Predictive risk routing health",  value: "87%" },
    { section: "Policy tuning suggestions",       value: "3 pending" },
    { section: "Evidence automation gaps",        value: "3 missing" },
    { section: "Strategic decisions needed",      value: "8 queued" },
    { section: "Next quarter priorities",         value: "Evidence depth + MP density" },
  ],
  audit_trail: [
    { ts: "T-7d", report: "BR-Q3-v1", action: "draft generated", actor: "CoPilot" },
    { ts: "T-6d", report: "BR-Q3-v1", action: "reviewed",         actor: "Chair" },
  ],
};

export const V165_ROADMAP = [
  { horizon: "Current Q",  theme: "Predictive governance maturity",          status: "live" },
  { horizon: "Next Q",     theme: "Approval orchestration depth",            status: "queued" },
  { horizon: "6 months",   theme: "Marketplace intel maturity (regional)",   status: "planned" },
  { horizon: "12 months",  theme: "Evidence automation depth",               status: "planned" },
  { horizon: "24 months",  theme: "Outcome-based policy tuning maturity",    status: "planned" },
  { horizon: "36 months",  theme: "AI-assisted board operating maturity",    status: "planned" },
  { horizon: "Held",       theme: "Autonomous dispatch / pricing / billing", status: "blocked" },
];

export const V165_REPORTS = [
  "Enterprise predictive governance",
  "AI-assisted board operating system",
  "Board packet intelligence",
  "Durable revenue control automation",
  "Revenue automation governance",
  "Marketplace intelligence maturity",
  "Marketplace automation governance",
  "Strategic approval orchestration",
  "Executive decision routing",
  "Predictive control monitoring",
  "Governance evidence automation",
  "Recommendation evidence automation",
  "Predictive risk routing",
  "Human-approved automation",
  "Outcome-based policy tuning",
  "Capital control automation",
  "Strategic account automation",
  "Partner control automation",
  "Product-line control automation",
  "Board predictive intelligence",
];

export const V165_RLS = [
  { name: "pred_gov_company_scope",        target: "predictive_governance_records", sql: "USING (company_id = current_company())" },
  { name: "pred_gov_platform_only",        target: "predictive_governance_records (platform)", sql: "USING (is_platform_owner(auth.uid()))" },
  { name: "board_intel_chair_ceo_only",    target: "board_predictive_intelligence_reports", sql: "USING (has_role(auth.uid(),'board_chair') OR has_role(auth.uid(),'ceo'))" },
  { name: "automation_no_self_approve",    target: "human_approved_automation_records", sql: "USING (approver_id IS DISTINCT FROM recommender_id)" },
  { name: "automation_evidence_required",  target: "human_approved_automation_records", sql: "WITH CHECK (evidence_id IS NOT NULL OR status <> 'approved')" },
  { name: "automation_policy_security_admin", target: "*_automation_policies",       sql: "USING (has_role(auth.uid(),'security_admin'))" },
  { name: "customer_user_no_internal",     target: "predictive_governance_records",     sql: "USING (NOT is_customer_user(auth.uid(), company_id))" },
  { name: "carrier_user_no_mp_internal",   target: "marketplace_intelligence_maturity_records", sql: "USING (NOT has_role(auth.uid(),'carrier_user'))" },
  { name: "partner_user_approved_only",    target: "partner_control_automation_records", sql: "USING (status = 'approved' OR NOT has_role(auth.uid(),'partner_user'))" },
];

export const V165_EDGE_BOUNDARY = [
  { layer: "createServerFn",     concern: "Approvals, evidence attach, audit writes",   auth: "requireSupabaseAuth + role", returns: "DTO" },
  { layer: "/api/public/* route", concern: "Webhook signal ingestion",                   auth: "HMAC verify",                returns: "200/401" },
  { layer: "/api/public/* route", concern: "Cron: batch scoring & freshness",            auth: "Shared secret header",       returns: "200" },
  { layer: "Edge function",       concern: "Heavy batch scoring (off Worker)",           auth: "Service role + signed",      returns: "Job id" },
  { layer: "Client",              concern: "View recs + approval UI",                    auth: "User session (RLS scoped)",  returns: "UI state" },
];

export const V165_EDGE_FUNCTIONS = [
  "calculate-v165-predictive-governance-score",
  "generate-predictive-governance-summary",
  "detect-predictive-governance-exceptions",
  "generate-ai-assisted-board-agenda",
  "generate-board-packet-intelligence",
  "detect-board-packet-evidence-gaps",
  "generate-board-predictive-intelligence-report",
  "calculate-revenue-control-automation-score",
  "detect-revenue-control-exceptions",
  "generate-revenue-control-routing-request",
  "track-revenue-automation-outcome",
  "calculate-marketplace-intelligence-maturity",
  "generate-marketplace-control-routing-request",
  "detect-marketplace-automation-exceptions",
  "track-marketplace-automation-outcome",
  "orchestrate-strategic-approval-routing",
  "escalate-approval-request",
  "generate-approval-audit-log",
  "calculate-approval-orchestration-health",
  "automate-governance-evidence-collection",
  "automate-recommendation-evidence-collection",
  "calculate-evidence-automation-score",
  "detect-missing-governance-evidence",
  "route-predictive-risk-signal",
  "calculate-outcome-based-policy-tuning",
  "generate-policy-tuning-recommendation",
  "approve-policy-tuning-change",
  "calculate-capital-control-automation-score",
  "calculate-account-control-automation-score",
  "calculate-partner-control-automation-score",
  "calculate-product-line-control-automation-score",
  "generate-predictive-governance-roadmap",
];

export const V165_DEMO = [
  { step: 1,  actor: "CEO",         surface: "/v165/command",      action: "Open Enterprise Predictive Governance Command", outcome: "Score 95% · orchestration 92% · evidence 88%" },
  { step: 2,  actor: "Board admin", surface: "/v165/board-os",      action: "Generate AI-assisted board agenda",             outcome: "Agenda + packet flags 2 revenue + 1 MP + 1 partner gap" },
  { step: 3,  actor: "Board admin", surface: "/v165/board-packet",  action: "Review packet readiness",                       outcome: "91% — packet cannot finalize until gaps closed + Chair approves" },
  { step: 4,  actor: "CFO",         surface: "/v165/revenue-auto",  action: "Review evidence queue + concentration signal",  outcome: "Approval required for 2 items" },
  { step: 5,  actor: "MP GM",       surface: "/v165/mp-maturity",   action: "Inspect SE carrier density gap",                outcome: "Preferred carrier expansion rec queued for approval" },
  { step: 6,  actor: "Sec admin",   surface: "/v165/approvals",     action: "Open approval orchestration",                   outcome: "2 overdue · 1 escalated to CEO" },
  { step: 7,  actor: "CRO",         surface: "/v165/risk-routing",  action: "Review predictive risk routing",                outcome: "14 categories tracked · SLA on-time 88%" },
  { step: 8,  actor: "COO",         surface: "/v165/control-monitor", action: "Review predictive control monitoring",        outcome: "12 categories · 89% control score · 3 remediation items" },
  { step: 9,  actor: "Head Data",   surface: "/v165/rec-evidence",  action: "Verify rec evidence completeness",              outcome: "91% complete — 2 outcome gaps queued" },
  { step: 10, actor: "Compliance",  surface: "/v165/evidence-auto", action: "Approve evidence refresh",                       outcome: "Capital evidence refreshed · audit log written" },
  { step: 11, actor: "CEO",         surface: "/v165/policy-tuning", action: "Review outcome-based policy tuning suggestions", outcome: "MP threshold 0.80 → 0.85 awaiting policy owner approval" },
  { step: 12, actor: "Board admin", surface: "/v165/board-report",  action: "Open board predictive intelligence report",     outcome: "Includes 11 sections · audit trail · decisions queued" },
];

export const V165_PHASE47_TEASER =
  "Phase 47 (V17) — enterprise predictive operating system, governed intelligence automation, board intelligence execution, durable revenue automation maturity, marketplace optimization governance. NOT started.";
