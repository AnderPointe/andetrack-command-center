// Phase 51 — V19 Enterprise Assurance Operating System (mock-only).
// No autonomous dispatch. Every high-impact action HITL-gated;
// approver_id <> recommender_id enforced at RLS layer.

type KPI = { label: string; value: string | number; sub?: string };
const k = (label: string, value: string | number, sub?: string): KPI => ({ label, value, sub });

// ─── 1. V19 Scope ──────────────────────────────────────────────────────────
export const V19_SCOPE = {
  score: { overall: 98 },
  matrix: [
    { area: "Enterprise Assurance Operating System",         status: "shipped", notes: "98% assurance" },
    { area: "Autonomous-Assist Resilience Maturity",         status: "shipped", notes: "94% maturity" },
    { area: "Board Assurance Execution",                     status: "shipped", notes: "93% execution" },
    { area: "Durable Revenue Control Assurance",             status: "shipped", notes: "91% assurance" },
    { area: "Marketplace Optimization Assurance",            status: "shipped", notes: "89% assurance" },
    { area: "Executive Assurance Command",                   status: "shipped", notes: "5 queues live" },
    { area: "Control Evidence Maturity",                     status: "shipped", notes: "15 domains" },
    { area: "Assurance Audit Execution",                     status: "shipped", notes: "15 audit areas" },
    { area: "Human Approval Assurance Maturity",             status: "shipped", notes: "96% coverage" },
    { area: "Recommendation Assurance Maturity",             status: "shipped", notes: "Quality 92%" },
    { area: "Outcome Assurance Maturity",                    status: "shipped", notes: "Loop 93%" },
    { area: "Predictive Risk Assurance Maturity",            status: "shipped", notes: "15 categories" },
    { area: "Capital Assurance Execution",                   status: "shipped", notes: "2-person enforced" },
    { area: "Strategic Account Assurance Execution",         status: "shipped", notes: "Tier-1 guarded" },
    { area: "Partner Assurance Execution",                   status: "shipped", notes: "Approved-only" },
    { area: "Product-Line Assurance Execution",              status: "shipped", notes: "12 product lines" },
    { area: "Category Assurance Execution",                  status: "shipped", notes: "Proof gated" },
    { area: "Assurance Exception Command",                   status: "shipped", notes: "15 categories" },
    { area: "Board Assurance Reporting System",              status: "shipped", notes: "17 sections" },
    { area: "Long-Term Enterprise Assurance Roadmap",        status: "shipped", notes: "6 horizons" },
    { area: "V19 Advanced Reporting",                        status: "shipped", notes: "20 reports" },
    { area: "Fully autonomous dispatch",                     status: "placeholder", notes: "Deferred — HITL required" },
    { area: "IPO / SOC 2 / Android Auto claims",             status: "placeholder", notes: "Evidence-backed only" },
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace / customer / carrier / capital / board",
    "Fully autonomous compliance / legal / procurement actions",
    "Final IPO / acquisition / audited financial / SOC 2 / ISO claims",
    "Final Android Auto / CarPlay / autonomous vehicle claims",
    "Full customs production / international tax automation / insurance underwriting",
  ],
};

export const V19_HEADLINE = {
  headline: "V19 enterprise assurance OS live · 98% · resilience 94% · HITL on every high-impact",
  highlights: [
    "Board assurance execution 93% · Revenue control assurance 91% · MP optimization 89%",
    "Human approval maturity 96% · Recommendation 92% · Outcome 93% · Evidence 93% · Audit 96%",
    "Southeast MP density still flagged · preferred-carrier optimization pending MP-leader approval",
    "1 evidence-automation workflow in retry queue · manual fallback ready · no high-impact auto-executed",
    "Board admin generating board assurance report · 2 board-use evidence approvals pending",
  ],
};

// ─── Standard control center shape ─────────────────────────────────────────
type Area = {
  score: string;
  kpis: KPI[];
  matrix: { control: string; status: string; owner: string }[];
  exceptions: { id: string; control: string; desc: string; owner: string }[];
  remediation: { id: string; action: string; owner: string; due: string; status: string }[];
};
const area = (
  score: string,
  kpis: KPI[],
  matrix: Area["matrix"],
  exceptions: Area["exceptions"] = [],
  remediation: Area["remediation"] = [],
): Area => ({ score, kpis, matrix, exceptions, remediation });

// ─── 2. Enterprise Assurance Operating System ─────────────────────────────
export const V19_OS = {
  score: "98%",
  kpis: [
    k("Enterprise assurance", "98%", "+1 vs V18.5"),
    k("Assist resilience maturity", "94%"),
    k("Board assurance execution", "93%"),
    k("Revenue control assurance", "91%"),
    k("MP optimization assurance", "89%"),
    k("Exec assurance command", "95%"),
    k("Control evidence maturity", "93%"),
    k("Audit execution maturity", "96%"),
    k("Human approval maturity", "96%"),
    k("Recommendation maturity", "92%"),
    k("Outcome maturity", "93%"),
    k("Predictive risk maturity", "91%"),
    k("Capital assurance", "94%"),
    k("Account assurance", "92%"),
    k("Partner assurance", "93%"),
    k("Product assurance", "92%"),
    k("Category assurance", "88%"),
    k("Assurance exception rate", "2.7%"),
    k("Remediation health", "93%"),
    k("High-impact auto-execute", "0", "HITL enforced"),
  ],
  health_map: [
    { domain: "Revenue control",      health: "strong" },
    { domain: "MP optimization",       health: "watch · SE density" },
    { domain: "Board execution",       health: "strong" },
    { domain: "Capital assurance",     health: "strong · 2-person" },
    { domain: "Account assurance",     health: "1 concentration exception" },
    { domain: "Partner assurance",     health: "strong" },
    { domain: "Product assurance",     health: "strong" },
    { domain: "Category assurance",    health: "proof publishing pending" },
    { domain: "Risk assurance",        health: "strong" },
    { domain: "Resilience",            health: "1 evidence workflow in retry" },
    { domain: "Audit execution",       health: "strong" },
    { domain: "Evidence maturity",     health: "2 board-use pending" },
  ],
  exceptions: [
    { id: "EX-V19-01", area: "MP optimization",    desc: "Southeast carrier density below target",          owner: "VP MP" },
    { id: "EX-V19-02", area: "Account control",    desc: "Customer concentration in food vertical",         owner: "CRO" },
    { id: "EX-V19-03", area: "Resilience",         desc: "evidence-attach worker recurring failures",       owner: "Sec/Admin" },
    { id: "EX-V19-04", area: "Board evidence",     desc: "2 board-use evidence items pending approval",     owner: "Board Admin" },
    { id: "EX-V19-05", area: "Category proof",     desc: "Proof asset awaiting external-use approval",      owner: "CMO" },
  ],
  remediation: [
    { id: "RM-V19-01", action: "Approve SE preferred-carrier expansion (HITL)", owner: "VP MP",    due: "+7d",  status: "pending approval" },
    { id: "RM-V19-02", action: "Open food-vertical concentration plan",         owner: "CRO",      due: "+10d", status: "in progress" },
    { id: "RM-V19-03", action: "Patch evidence-attach worker, replay queue",    owner: "Sec/Admin",due: "+2d",  status: "scheduled" },
    { id: "RM-V19-04", action: "Approve 2 board-use evidence items",            owner: "Board Admin", due: "+3d", status: "queued" },
    { id: "RM-V19-05", action: "Approve proof publishing",                      owner: "CEO",      due: "+3d",  status: "queued" },
  ],
  action_plan: [
    { item: "Sign Q+1 board assurance packet",       owner: "CEO",         due: "+5d" },
    { item: "Approve SE marketplace expansion",      owner: "VP MP",       due: "+7d" },
    { item: "Approve concentration mitigation plan", owner: "CRO",         due: "+10d" },
    { item: "Approve board-use evidence batch",      owner: "Board Admin", due: "+3d" },
    { item: "Resilience post-mortem sign-off",       owner: "Sec/Admin",   due: "+2d" },
  ],
  exec_summary: [
    "Enterprise assurance 98% · resilience 94% · approval 96% · evidence 93% · audit 96%",
    "5 high-risk items in executive visibility · all HITL-gated",
    "0 high-impact actions executed automatically in last 30d",
  ],
};

// helper to make a quick area
const mkArea = (score: string, kpis: [string, string | number, string?][], matrix: [string, string, string][], exceptions: [string, string, string, string][] = [], remediation: [string, string, string, string, string][] = []): Area =>
  area(
    score,
    kpis.map(([l, v, s]) => k(l, v, s)),
    matrix.map(([control, status, owner]) => ({ control, status, owner })),
    exceptions.map(([id, control, desc, owner]) => ({ id, control, desc, owner })),
    remediation.map(([id, action, owner, due, status]) => ({ id, action, owner, due, status })),
  );

// ─── 3. Assist Resilience Maturity ────────────────────────────────────────
export const V19_RESILIENCE = mkArea("94%",
  [["Resilience maturity","94%"], ["Rec workflow uptime","99.8%"], ["Approval workflow uptime","99.9%"],
   ["Evidence automation","97%"], ["Audit logging","100%"], ["Policy enforcement","99%"],
   ["Human override","ready"], ["Manual fallback","documented"], ["Retry queue depth",3],
   ["Workflow failure recovery","94%"], ["Exception recovery","93%"], ["Cost control","healthy"],
   ["Data freshness","9m median"], ["Tenant boundary","100%"]],
  [["Recommendation workflow resilience","strong","Chief AI"],
   ["Approval workflow resilience","strong","CCO"],
   ["Evidence automation resilience","degraded · 1 retry","Sec/Admin"],
   ["Audit logging resilience","strong","Sec/Admin"],
   ["Policy enforcement resilience","strong","CCO"],
   ["Human override readiness","ready","CCO"],
   ["Manual fallback readiness","ready","Sec/Admin"],
   ["Retry queue health","healthy","Sec/Admin"],
   ["Workflow failure recovery","93%","Sec/Admin"],
   ["Exception recovery","93%","CCO"],
   ["Model/provider fallback (placeholder)","placeholder","Chief AI"],
   ["Cost control resilience","healthy","CFO"],
   ["Data freshness resilience","9m","Chief AI"],
   ["Tenant boundary resilience","100%","Sec/Admin"]],
  [["EX-R-01","Evidence automation","evidence-attach 503 recurring","Sec/Admin"]],
  [["RM-R-01","Patch evidence-attach 503 handler","Eng/Sec","+2d","scheduled"],
   ["RM-R-02","Run resilience tabletop drill","CCO","+14d","planned"]]);

// ─── 4. Board Assurance Execution ─────────────────────────────────────────
export const V19_BOARD_EXEC = mkArea("93%",
  [["Board assurance execution","93%"], ["Packet evidence","92%"], ["KPI assurance","94%"],
   ["Decision evidence","91%"], ["Risk review","92%"], ["Rec explainability","95%"],
   ["Approval","97%"], ["Action follow-up","89%"], ["Audit trail","100%"],
   ["Board exceptions",2], ["Decisions pending",3], ["Actions overdue",1]],
  [["Packet evidence completion","92%","Board Admin"],
   ["KPI assurance completion","94%","CFO"],
   ["Decision evidence completion","91%","Board Admin"],
   ["Risk review completion","92%","CCO"],
   ["Recommendation explainability","95%","Chief AI"],
   ["Approval completion","97%","CEO"],
   ["Action follow-up completion","89%","Board Admin"],
   ["Audit trail completeness","100%","Sec/Admin"],
   ["Board-use evidence approval","2 pending","CEO"],
   ["Report readiness","ready","Board Admin"]],
  [["EX-B-01","Board evidence","2 board-use evidence items pending","Board Admin"],
   ["EX-B-02","Action follow-up","1 board action overdue 5d","Board Admin"]],
  [["RM-B-01","Approve 2 board-use evidence","CEO","+3d","queued"],
   ["RM-B-02","Close overdue board action","Board Admin","+2d","in progress"]]);

// ─── 5. Durable Revenue Control Assurance ─────────────────────────────────
export const V19_REVENUE = mkArea("91%",
  [["Revenue assurance","91%"], ["Renewal control","94%"], ["Expansion control","92%"],
   ["Churn prevention","90%"], ["Customer concentration","watch"], ["Product concentration","ok"],
   ["Payment health","96%"], ["Billing dispute","2 open"], ["MP revenue control","89%"],
   ["API/EDI revenue control","94%"], ["Partner revenue control","92%"], ["Revenue evidence","91%"],
   ["Revenue approval","96%"], ["Revenue audit","95%"], ["Exception rate","3.0%"], ["Remediation","92%"]],
  [["Renewal control assurance","mature","CRO"],
   ["Expansion control assurance","mature","CRO"],
   ["Churn prevention","strong","CRO"],
   ["Customer concentration","watch","CRO"],
   ["Product concentration","ok","VP Product"],
   ["Payment health","strong","CFO"],
   ["Billing dispute","2 open","CFO"],
   ["Marketplace revenue","watch","VP MP"],
   ["API/EDI revenue","strong","VP Product"],
   ["Partner revenue","strong","VP Partners"],
   ["Revenue evidence","refresh 2","CFO"],
   ["Revenue approval routing","strong","CCO"],
   ["Revenue audit","strong","Sec/Admin"]],
  [["EX-RV-01","Concentration","Food vertical concentration above policy","CRO"]],
  [["RM-RV-01","Open concentration mitigation plan","CRO","+10d","in progress"],
   ["RM-RV-02","Refresh 2 revenue evidence records","CFO","+5d","queued"]]);

// ─── 6. Marketplace Optimization Assurance ────────────────────────────────
export const V19_MP = mkArea("89%",
  [["MP optimization assurance","89%"], ["Carrier density","watch · SE"], ["Equipment coverage","92%"],
   ["Load coverage","93%"], ["Bid density","87%"], ["Time-to-award","18m median"],
   ["Regional liquidity","mixed"], ["Lane liquidity","mixed"], ["Carrier quality","91%"],
   ["Carrier compliance","96%"], ["Dispute review","ok"], ["MP revenue","watch"],
   ["Preferred-carrier rec","pending HITL"], ["Human approval","required"], ["Exception rate","4.1%"], ["Remediation","90%"]],
  [["Carrier density","watch","VP MP"],
   ["Equipment coverage","strong","VP MP"],
   ["Load coverage","strong","VP MP"],
   ["Bid density","watch","VP MP"],
   ["Time-to-award","strong","VP MP"],
   ["Regional liquidity (TX,MW)","strong","VP MP"],
   ["Regional liquidity (SE)","weak","VP MP"],
   ["Lane liquidity","mixed","VP MP"],
   ["Carrier quality","strong","VP MP"],
   ["Carrier compliance","strong","CCO"],
   ["Dispute review","strong","VP MP"],
   ["MP revenue","watch","CFO"],
   ["Preferred-carrier recommendation","pending HITL","VP MP"],
   ["Human approval","required","VP MP"]],
  [["EX-MP-01","Regional liquidity","Southeast density below target","VP MP"]],
  [["RM-MP-01","Approve SE preferred-carrier expansion (HITL)","VP MP","+7d","pending approval"]]);

// ─── 7. Executive Assurance Command ───────────────────────────────────────
export const V19_EXEC = {
  score: "95%",
  kpis: [k("Executive assurance","95%"), k("High-risk items",5), k("Overdue approvals",1),
         k("Escalations",2), k("Control exceptions",5), k("Board decisions",3), k("Exec outcomes","92%")],
  queues: [
    { persona: "CEO",      items: 4, sla: "4h",  status: "on-track" },
    { persona: "CFO",      items: 6, sla: "6h",  status: "on-track" },
    { persona: "COO",      items: 5, sla: "6h",  status: "on-track" },
    { persona: "CRO",      items: 4, sla: "6h",  status: "1 overdue" },
    { persona: "VP MP",    items: 7, sla: "8h",  status: "on-track" },
    { persona: "VP Product", items: 3, sla: "12h", status: "on-track" },
    { persona: "Customer Success", items: 2, sla: "8h", status: "on-track" },
    { persona: "VP Partners", items: 2, sla: "12h", status: "on-track" },
    { persona: "Sec/Trust", items: 5, sla: "4h",  status: "on-track" },
  ],
  high_risk: [
    { id: "HR-1", area: "MP optimization",  desc: "SE density",            owner: "VP MP" },
    { id: "HR-2", area: "Revenue",          desc: "Food vertical concentration", owner: "CRO" },
    { id: "HR-3", area: "Resilience",       desc: "evidence-attach worker failures", owner: "Sec/Admin" },
    { id: "HR-4", area: "Board evidence",   desc: "2 board-use evidence pending", owner: "Board Admin" },
    { id: "HR-5", area: "Category",         desc: "Proof publishing pending",  owner: "CMO" },
  ],
  escalations: [
    { id: "ESC-1", item: "Concentration mitigation",  to: "CEO", status: "open" },
    { id: "ESC-2", item: "Board action overdue",      to: "Board Admin", status: "open" },
  ],
  outcomes: [
    { metric: "Approvals SLA met", value: "97%" },
    { metric: "Stale approvals",   value: "0" },
    { metric: "Reversed decisions",value: "1 (Q-1)" },
  ],
  brief: [
    "Executive assurance 95% · 5 high-risk items HITL-gated",
    "1 CRO approval overdue · 2 escalations open",
    "No high-impact auto-execution in last 30d",
  ],
};

// ─── 8. Control Evidence Maturity ─────────────────────────────────────────
export const V19_EVIDENCE = mkArea("93%",
  [["Evidence maturity","93%"], ["Freshness median","9m"], ["Completeness","95%"],
   ["Owner coverage","100%"], ["Approval status","98%"], ["Use status","tracked"],
   ["Exception count",3], ["Remediation","94%"], ["Audit completeness","98%"]],
  [
    ["Revenue control evidence","mature","CFO"],
    ["Marketplace control evidence","mature","VP MP"],
    ["Capital control evidence","mature","CFO"],
    ["Board evidence","2 pending approval","Board Admin"],
    ["Strategic account evidence","mature","CRO"],
    ["Partner evidence","mature","VP Partners"],
    ["Product-line evidence","mature","VP Product"],
    ["Category proof evidence","pending publish","CMO"],
    ["Recommendation evidence","mature","Chief AI"],
    ["Approval evidence","mature","CCO"],
    ["Outcome evidence","mature","Chief AI"],
    ["Audit evidence","mature","Sec/Admin"],
    ["Risk mitigation evidence","mature","CCO"],
    ["External-use evidence","gated","CEO"],
    ["Data-room-use evidence","gated","CFO"],
  ],
  [["EX-EV-01","Board evidence","2 board-use items pending approval","Board Admin"],
   ["EX-EV-02","Category proof","Asset awaiting external-use approval","CMO"]],
  [["RM-EV-01","Approve board-use batch","CEO","+3d","queued"],
   ["RM-EV-02","Route category proof for external-use approval","CMO","+3d","queued"]]);

// ─── 9. Assurance Audit Execution ─────────────────────────────────────────
export const V19_AUDIT = {
  score: "96%",
  kpis: [k("Audit execution","96%"), k("Findings open",4), k("Findings overdue",0),
         k("Remediation health","94%"), k("Board-visible findings",2), k("Evidence attached","100%")],
  calendar: [
    { audit: "Autonomous-assist workflow audit", owner: "Sec/Admin", schedule: "Weekly",   status: "on-track" },
    { audit: "Recommendation audit",             owner: "Chief AI",  schedule: "Bi-weekly", status: "on-track" },
    { audit: "Approval audit",                   owner: "CCO",       schedule: "Weekly",   status: "on-track" },
    { audit: "Evidence audit",                   owner: "Sec/Admin", schedule: "Weekly",   status: "on-track" },
    { audit: "Revenue control audit",            owner: "CFO",       schedule: "Monthly",  status: "on-track" },
    { audit: "Marketplace control audit",        owner: "VP MP",     schedule: "Monthly",  status: "on-track" },
    { audit: "Capital control audit",            owner: "CFO",       schedule: "Monthly",  status: "on-track" },
    { audit: "Board assurance audit",            owner: "Board Admin", schedule: "Monthly", status: "on-track" },
    { audit: "Risk control audit",               owner: "CCO",       schedule: "Monthly",  status: "on-track" },
    { audit: "Account assurance audit",          owner: "CRO",       schedule: "Monthly",  status: "on-track" },
    { audit: "Partner assurance audit",          owner: "VP Partners", schedule: "Monthly", status: "on-track" },
    { audit: "Product-line assurance audit",     owner: "VP Product", schedule: "Monthly", status: "on-track" },
    { audit: "Category assurance audit",         owner: "CMO",       schedule: "Quarterly",status: "on-track" },
    { audit: "Tenant isolation audit",           owner: "Sec/Admin", schedule: "Quarterly",status: "on-track" },
    { audit: "Human override audit",             owner: "CCO",       schedule: "Quarterly",status: "on-track" },
  ],
  findings: [
    { id: "FND-1", area: "Evidence automation", risk: "med",  owner: "Sec/Admin", status: "open",     board: "yes" },
    { id: "FND-2", area: "MP optimization",     risk: "med",  owner: "VP MP",     status: "open",     board: "yes" },
    { id: "FND-3", area: "Revenue concentration", risk: "med", owner: "CRO",     status: "open",     board: "no" },
    { id: "FND-4", area: "Board evidence",      risk: "low",  owner: "Board Admin", status: "open",  board: "no" },
  ],
  remediation: [
    { id: "RM-AU-01", action: "Close FND-1 after worker patch",  owner: "Sec/Admin", due: "+5d",  status: "in progress" },
    { id: "RM-AU-02", action: "Close FND-2 after SE expansion",  owner: "VP MP",     due: "+10d", status: "pending approval" },
    { id: "RM-AU-03", action: "Close FND-3 after mitigation",    owner: "CRO",       due: "+14d", status: "in progress" },
    { id: "RM-AU-04", action: "Close FND-4 after batch approval",owner: "Board Admin", due: "+3d", status: "queued" },
  ],
  exec_summary: [
    "Audit execution 96% · 4 findings open · 0 overdue · 2 board-visible",
    "Append-only audit · signed bundle · evidence attached 100%",
  ],
};

// ─── 10. Human Approval Assurance Maturity ────────────────────────────────
export const V19_APPROVAL = mkArea("96%",
  [["Approval maturity","96%"], ["Coverage","100%"], ["SLA maturity","97%"],
   ["Backup approver","98%"], ["Escalation maturity","96%"], ["High-risk coverage","100%"],
   ["Evidence completeness","98%"], ["Explanation completeness","95%"],
   ["Decision reason completeness","94%"], ["Audit completeness","100%"],
   ["Rejection reason quality","92%"], ["Outcome linkage","93%"],
   ["Human override maturity","97%"], ["Exception rate","2.0%"]],
  [["Approval coverage","100%","CCO"],
   ["SLA maturity","strong","CCO"],
   ["Backup approver maturity","strong","CCO"],
   ["Escalation maturity","strong","CCO"],
   ["High-risk approval coverage","100%","CCO"],
   ["Approval evidence completeness","strong","Sec/Admin"],
   ["Explanation completeness","strong","Chief AI"],
   ["Decision reason completeness","strong","CCO"],
   ["Approval audit completeness","strong","Sec/Admin"],
   ["Rejection reason quality","strong","Chief AI"],
   ["Outcome linkage quality","strong","Chief AI"],
   ["Human override maturity","strong","CCO"]],
  [],
  [["RM-AP-01","Tighten outcome linkage to 95%","Chief AI","+14d","planned"]]);

// ─── 11. Recommendation Assurance Maturity ────────────────────────────────
export const V19_REC = mkArea("92%",
  [["Rec maturity","92%"], ["Source signal","strong"], ["Evidence","94%"],
   ["Explainability","95%"], ["Confidence scoring","91%"], ["Risk scoring","92%"],
   ["Alternative options","present"], ["No-action impact","modeled"], ["Duplicate detection","99%"],
   ["Policy compliance","98%"], ["Approval routing","100%"], ["Audit","100%"],
   ["Outcome tracking","93%"], ["Exception rate","2.5%"]],
  [["Source signal assurance","strong","Chief AI"],
   ["Evidence assurance","strong","Chief AI"],
   ["Explainability assurance","strong","Chief AI"],
   ["Confidence scoring assurance","strong","Chief AI"],
   ["Risk scoring assurance","strong","Chief AI"],
   ["Alternative option assurance","present","Chief AI"],
   ["No-action impact assurance","modeled","Chief AI"],
   ["Duplicate detection","99%","Chief AI"],
   ["Policy compliance","strong","CCO"],
   ["Approval routing compliance","100%","CCO"],
   ["Audit completeness","100%","Sec/Admin"],
   ["Outcome tracking","strong","Chief AI"]],
  [["EX-RC-01","Confidence","2 recs flagged for low-confidence override","Chief AI"]],
  [["RM-RC-01","Re-score 2 flagged recs","Chief AI","+3d","queued"]]);

// ─── 12. Outcome Assurance Maturity ───────────────────────────────────────
export const V19_OUTCOME = mkArea("93%",
  [["Outcome maturity","93%"], ["Approved-rec outcomes","tracked"], ["Rejected-rec outcomes","tracked"],
   ["Automation outcomes","tracked"], ["Approval outcomes","tracked"], ["Revenue outcomes","+2.1pt"],
   ["MP outcomes","mixed"], ["Capital outcomes","stable"], ["Account outcomes","+1.4pt"],
   ["Partner outcomes","+0.8pt"], ["Product outcomes","+1.0pt"], ["Category outcomes","+0.6pt"],
   ["Confidence calibration","good"], ["Policy tuning evidence","present"],
   ["Lessons learned","94%"], ["Board visibility","yes"], ["Exception rate","2.3%"]],
  [["Approved recommendation outcomes","tracked","Chief AI"],
   ["Rejected recommendation outcomes","tracked","Chief AI"],
   ["Automation outcomes","tracked","Chief AI"],
   ["Approval outcomes","tracked","CCO"],
   ["Revenue outcomes","strong","CFO"],
   ["MP outcomes","mixed","VP MP"],
   ["Capital outcomes","stable","CFO"],
   ["Account outcomes","strong","CRO"],
   ["Partner outcomes","strong","VP Partners"],
   ["Product outcomes","strong","VP Product"],
   ["Category outcomes","strong","CMO"],
   ["Confidence calibration","good","Chief AI"],
   ["Policy tuning evidence","present","CCO"],
   ["Lessons learned","strong","Chief AI"],
   ["Board visibility","yes","Board Admin"]],
  [],
  [["RM-OC-01","Publish lessons-learned brief","Chief AI","+7d","queued"]]);

// ─── 13. Predictive Risk Assurance Maturity ───────────────────────────────
export const V19_RISK = mkArea("91%",
  [["Risk maturity","91%"], ["Risk owner coverage","100%"], ["Risk evidence","93%"],
   ["Escalation","strong"], ["Mitigation","strong"], ["Recurrence","tracked"],
   ["Approval routing","100%"], ["Outcome tracking","93%"], ["Board visibility","yes"],
   ["Risk control exceptions",2], ["Remediation","92%"]],
  [["Revenue durability risk","watch · concentration","CRO"],
   ["Customer concentration risk","watch","CRO"],
   ["Renewal risk","strong","CRO"],
   ["Expansion risk","strong","CRO"],
   ["MP liquidity risk","watch · SE","VP MP"],
   ["Carrier density risk","watch","VP MP"],
   ["Partner dependency risk","strong","VP Partners"],
   ["Product support burden risk","ok","VP Product"],
   ["Capital evidence risk","ok","CFO"],
   ["Commercial diligence risk","ok","CFO"],
   ["Category proof risk","watch","CMO"],
   ["Board action risk","watch · 1 overdue","Board Admin"],
   ["Compliance/control risk","ok","CCO"],
   ["AI governance risk","ok","Chief AI"],
   ["Operational scalability risk","ok","COO"]],
  [["EX-RK-01","Concentration","Food vertical revenue concentration","CRO"],
   ["EX-RK-02","Liquidity","Southeast carrier density","VP MP"]],
  [["RM-RK-01","Open concentration mitigation","CRO","+10d","in progress"],
   ["RM-RK-02","Approve SE expansion","VP MP","+7d","pending approval"]]);

// ─── 14. Capital Assurance Execution ──────────────────────────────────────
export const V19_CAPITAL = mkArea("94%",
  [["Capital assurance","94%"], ["Evidence freshness","8m median"], ["Approval status","100%"],
   ["External-use approval","gated"], ["Data-room readiness","ready"], ["Board-use readiness","ready"],
   ["Control exceptions",1], ["Remediation","95%"], ["Audit","100%"], ["Board visibility","yes"]],
  [["Capital evidence controls","mature","CFO"],
   ["Data room evidence","mature","CFO"],
   ["Investor/acquirer evidence","gated","CFO"],
   ["Board capital evidence","mature","Board Admin"],
   ["Revenue durability evidence","mature","CFO"],
   ["Marketplace evidence","mature","VP MP"],
   ["Strategic risk evidence","mature","CCO"],
   ["External-use approval","gated · 2-person","CEO+CFO"],
   ["Capital recommendation controls","HITL","CFO"],
   ["Capital approval routing","2-person","CCO"],
   ["Capital audit logging","append-only","Sec/Admin"]],
  [["EX-CP-01","Evidence","Investor packet § 4 evidence stale","CFO"]],
  [["RM-CP-01","Refresh investor packet § 4","CFO","+5d","in progress"]]);

// ─── 15. Strategic Account Assurance Execution ────────────────────────────
export const V19_ACCOUNT = mkArea("92%",
  [["Account assurance","92%"], ["Tier-1 guardrails","100%"], ["Expansion signals","tracked"],
   ["Renewal signals","strong"], ["Churn risk","watch"], ["Adoption","strong"],
   ["Customer trust","strong"], ["Support burden","ok"], ["Exec sponsor","mapped"],
   ["Evidence","mature"], ["Comm approval","gated"], ["Exception",1], ["Remediation","93%"]],
  [["Expansion signal controls","tracked","CRO"],
   ["Renewal signal controls","strong","CRO"],
   ["Churn risk signal controls","watch","CRO"],
   ["Adoption signal controls","strong","Customer Success"],
   ["Customer trust signal controls","strong","Customer Success"],
   ["Support burden signal controls","ok","Customer Success"],
   ["Executive sponsor signal controls","mapped","CRO"],
   ["Account evidence controls","mature","CRO"],
   ["Customer communication approval","gated","CCO"],
   ["Account recommendation controls","HITL","Chief AI"],
   ["Account approval routing","strong","CCO"],
   ["Account audit logging","append-only","Sec/Admin"]],
  [["EX-AC-01","Concentration","Food vertical concentration","CRO"]],
  [["RM-AC-01","Open mitigation plan","CRO","+10d","in progress"]]);

// ─── 16. Partner Assurance Execution ──────────────────────────────────────
export const V19_PARTNER = mkArea("93%",
  [["Partner assurance","93%"], ["Partner performance","strong"], ["Enablement","strong"],
   ["Support burden","ok"], ["Pipeline","tracked"], ["Joint customers","tracked"],
   ["Partner risk","ok"], ["Evidence","mature"], ["Comm approval","gated"],
   ["Audit","100%"], ["Exception",0], ["Remediation","100%"]],
  [["Partner performance signal","strong","VP Partners"],
   ["Partner enablement signal","strong","VP Partners"],
   ["Partner support burden","ok","Customer Success"],
   ["Partner pipeline signal","tracked","VP Partners"],
   ["Joint customer signal","tracked","VP Partners"],
   ["Partner risk","ok","CCO"],
   ["Partner evidence","mature","VP Partners"],
   ["Partner-facing communication","gated","CCO"],
   ["Partner recommendation","HITL","Chief AI"],
   ["Partner approval routing","strong","CCO"],
   ["Partner audit logging","append-only","Sec/Admin"]],
  [], []);

// ─── 17. Product-Line Assurance Execution ─────────────────────────────────
export const V19_PRODUCT = mkArea("92%",
  [["Product assurance","92%"], ["Adoption","strong"], ["Support burden","ok"],
   ["Reliability","strong"], ["Tech debt (placeholder)","tracked"], ["Evidence","mature"],
   ["Investment approval","gated"], ["Audit","100%"], ["Exception",1], ["Remediation","94%"]],
  [["Dispatch Command Center","strong","VP Product"],
   ["EliteNav (GPS module)","strong","VP Product"],
   ["Driver Mobile","strong","VP Product"],
   ["Customer Portal","strong","VP Product"],
   ["CoPilot AI","strong · HITL","Chief AI"],
   ["Carrier Marketplace","watch","VP MP"],
   ["API Platform","strong","VP Product"],
   ["EDI Platform","strong","VP Product"],
   ["Telematics","strong","VP Product"],
   ["Partner Marketplace","strong","VP Partners"],
   ["Reports/Analytics","strong","VP Product"],
   ["Enterprise Governance","strong","CCO"]],
  [["EX-PD-01","Marketplace","Carrier Marketplace SE density watch","VP MP"]],
  [["RM-PD-01","Approve SE preferred-carrier expansion","VP MP","+7d","pending approval"]]);

// ─── 18. Category Assurance Execution ─────────────────────────────────────
export const V19_CATEGORY = mkArea("88%",
  [["Category assurance","88%"], ["Narrative","strong"], ["Proof assets","2 pending"],
   ["Market education","strong"], ["Competitive positioning","strong"], ["Differentiation","strong"],
   ["Sales narrative","strong"], ["Website/demo narrative","strong"], ["Board narrative","strong"],
   ["Proof publishing approval","gated"], ["External-use approval","gated"], ["Exception",1], ["Remediation","89%"]],
  [["Category narrative signal","strong","CMO"],
   ["Proof asset signal","2 pending","CMO"],
   ["Market education","strong","CMO"],
   ["Competitive positioning","strong","CMO"],
   ["Differentiation","strong","CMO"],
   ["Sales narrative","strong","CMO"],
   ["Website/demo narrative","strong","CMO"],
   ["Board narrative","strong","Board Admin"],
   ["Proof publishing approval","gated","CEO"],
   ["External-use approval","gated","CEO"],
   ["Category recommendation","HITL","Chief AI"],
   ["Category audit logging","append-only","Sec/Admin"]],
  [["EX-CT-01","Proof publishing","Proof asset 12 awaiting external-use approval","CMO"]],
  [["RM-CT-01","Route proof asset 12 for external-use approval","CMO","+3d","queued"]]);

// ─── 19. Assurance Exception Command ──────────────────────────────────────
export const V19_EXCEPTION = {
  score: "94%",
  kpis: [k("Exception score","94%"), k("Open exceptions",7), k("Overdue",1),
         k("Board-visible",4), k("High-risk",4), k("Remediation","93%")],
  queue: [
    { id: "EX-V19-01", category: "MP optimization",    owner: "VP MP",     risk: "high", sla: "48h", escalation: "MP leader", evidence: "required", remediation: "pending approval", board: "yes" },
    { id: "EX-V19-02", category: "Account control",    owner: "CRO",       risk: "high", sla: "72h", escalation: "CEO",       evidence: "required", remediation: "in progress",      board: "yes" },
    { id: "EX-V19-03", category: "Resilience",         owner: "Sec/Admin", risk: "med",  sla: "24h", escalation: "CCO",       evidence: "attached", remediation: "scheduled",        board: "yes" },
    { id: "EX-V19-04", category: "Board evidence",     owner: "Board Admin", risk: "med", sla: "72h", escalation: "CEO",      evidence: "required", remediation: "queued",           board: "yes" },
    { id: "EX-V19-05", category: "Category proof",     owner: "CMO",       risk: "med",  sla: "72h", escalation: "CEO",       evidence: "attached", remediation: "queued",           board: "no" },
    { id: "EX-V19-06", category: "Recommendation",     owner: "Chief AI",  risk: "low",  sla: "48h", escalation: "CCO",       evidence: "attached", remediation: "queued",           board: "no" },
    { id: "EX-V19-07", category: "Tenant boundary",    owner: "Sec/Admin", risk: "low",  sla: "24h", escalation: "CCO",       evidence: "attached", remediation: "verified",         board: "no" },
  ],
};

// ─── 20. Board Assurance Reporting System ─────────────────────────────────
export const V19_BOARD_REPORT = {
  sections: [
    { section: "Enterprise assurance score",          status: "ready",  owner: "CEO" },
    { section: "Assist resilience maturity",          status: "ready",  owner: "Sec/Admin" },
    { section: "Board assurance execution",           status: "ready",  owner: "Board Admin" },
    { section: "Durable revenue control assurance",   status: "ready",  owner: "CRO" },
    { section: "Marketplace optimization assurance",  status: "ready",  owner: "VP MP" },
    { section: "Executive assurance command",         status: "ready",  owner: "CEO" },
    { section: "Control evidence maturity",           status: "ready",  owner: "Sec/Admin" },
    { section: "Audit execution",                     status: "ready",  owner: "Sec/Admin" },
    { section: "Human approval assurance",            status: "ready",  owner: "CCO" },
    { section: "Recommendation assurance",            status: "ready",  owner: "Chief AI" },
    { section: "Outcome assurance",                   status: "ready",  owner: "Chief AI" },
    { section: "Predictive risk assurance",           status: "ready",  owner: "CCO" },
    { section: "Capital assurance",                   status: "ready",  owner: "CFO" },
    { section: "Assurance exceptions",                status: "ready",  owner: "CCO" },
    { section: "Remediation status",                  status: "ready",  owner: "CCO" },
    { section: "Decisions needed",                    status: "ready",  owner: "Board Admin" },
    { section: "Next quarter assurance priorities",   status: "ready",  owner: "CEO" },
  ],
  decisions: [
    { id: "DEC-1", title: "Approve SE marketplace expansion",      owner: "VP MP",       status: "queued" },
    { id: "DEC-2", title: "Approve concentration mitigation plan", owner: "CRO",         status: "queued" },
    { id: "DEC-3", title: "Approve board-use evidence batch",      owner: "CEO",         status: "queued" },
  ],
  actions: [
    { id: "ACT-1", action: "Refresh investor packet § 4",      owner: "CFO",         due: "+5d", status: "in progress" },
    { id: "ACT-2", action: "Patch evidence-attach worker",     owner: "Sec/Admin",   due: "+2d", status: "scheduled" },
    { id: "ACT-3", action: "Publish proof asset 12",           owner: "CMO",         due: "+3d", status: "queued" },
  ],
  appendix_kpis: [
    k("Enterprise assurance","98%"), k("Resilience maturity","94%"),
    k("Board execution","93%"), k("Revenue assurance","91%"),
    k("MP assurance","89%"), k("Approval maturity","96%"),
    k("Evidence maturity","93%"), k("Audit","96%"),
  ],
};

// ─── 21. Long-Term Enterprise Assurance Roadmap ───────────────────────────
export const V19_ROADMAP = {
  horizons: [
    { horizon: "Current quarter", focus: "Close SE MP density, food-vertical concentration, evidence-attach worker, board-use approvals" },
    { horizon: "Next quarter",    focus: "V19.5 enterprise assurance maturity, assist resilience optimization, board assurance intelligence" },
    { horizon: "6 months",        focus: "Revenue assurance optimization, marketplace assurance governance, executive assurance scale" },
    { horizon: "12 months",       focus: "Enterprise assurance OS scale, audit execution scale, predictive risk scale" },
    { horizon: "24 months",       focus: "Cross-tenant assurance benchmarking, sector-specific assurance packs, regulator-ready evidence" },
    { horizon: "36 months",       focus: "Board-grade assurance OS reference architecture (still HITL on material actions)" },
  ],
  tracks: [
    "Enterprise assurance operating system", "Autonomous-assist resilience maturity",
    "Board assurance execution", "Revenue control assurance", "Marketplace optimization assurance",
    "Executive assurance command", "Control evidence maturity", "Assurance audit execution",
    "Human approval assurance", "Recommendation assurance", "Outcome assurance",
    "Predictive risk assurance", "Capital assurance execution", "Account assurance execution",
    "Partner assurance execution", "Product-line assurance execution", "Category assurance execution",
  ],
  initiatives: [
    { id: "INI-1", track: "Assist resilience",     name: "Resilience tabletop drill cadence",        owner: "CCO",      horizon: "Next Q" },
    { id: "INI-2", track: "Board execution",       name: "Auto-build board packet v2",              owner: "Board Admin", horizon: "Next Q" },
    { id: "INI-3", track: "Revenue assurance",     name: "Concentration mitigation framework",       owner: "CRO",      horizon: "6m" },
    { id: "INI-4", track: "MP assurance",          name: "Regional liquidity assurance program",     owner: "VP MP",    horizon: "6m" },
    { id: "INI-5", track: "Evidence maturity",     name: "Evidence freshness SLA → 5m median",       owner: "Chief AI", horizon: "12m" },
    { id: "INI-6", track: "Audit execution",       name: "Quarterly external attestation prep",      owner: "Sec/Admin",horizon: "12m" },
  ],
  dependencies: [
    { from: "Assist resilience", to: "Evidence maturity", note: "evidence-attach worker affects evidence freshness" },
    { from: "MP assurance",      to: "Revenue assurance", note: "MP density affects MP revenue" },
    { from: "Capital assurance", to: "Board execution",  note: "Capital evidence feeds board packet" },
  ],
  decisions_log: [
    { id: "DL-1", date: "Q-1", decision: "Adopt 2-person capital approval", owner: "CEO" },
    { id: "DL-2", date: "Q-1", decision: "Append-only audit table",         owner: "Sec/Admin" },
    { id: "DL-3", date: "Q-0", decision: "HITL on every high-impact",       owner: "CCO" },
  ],
  summary: "5 horizons mapped · 6 initiatives queued · 0 conflicts with deferred scope · still HITL on all material actions",
};

// ─── 22. V19 Reports ──────────────────────────────────────────────────────
export const V19_REPORTS = [
  { name: "Enterprise assurance operating",          status: "ready", owner: "CEO" },
  { name: "Assist resilience maturity",              status: "ready", owner: "Sec/Admin" },
  { name: "Board assurance execution",               status: "ready", owner: "Board Admin" },
  { name: "Durable revenue control assurance",       status: "ready", owner: "CRO" },
  { name: "Marketplace optimization assurance",      status: "ready", owner: "VP MP" },
  { name: "Executive assurance",                     status: "ready", owner: "CEO" },
  { name: "Control evidence maturity",               status: "ready", owner: "Sec/Admin" },
  { name: "Assurance audit execution",               status: "ready", owner: "Sec/Admin" },
  { name: "Human approval assurance maturity",       status: "ready", owner: "CCO" },
  { name: "Recommendation assurance maturity",       status: "ready", owner: "Chief AI" },
  { name: "Outcome assurance maturity",              status: "ready", owner: "Chief AI" },
  { name: "Predictive risk assurance maturity",      status: "ready", owner: "CCO" },
  { name: "Capital assurance execution",             status: "ready", owner: "CFO" },
  { name: "Strategic account assurance execution",   status: "ready", owner: "CRO" },
  { name: "Partner assurance execution",             status: "ready", owner: "VP Partners" },
  { name: "Product-line assurance execution",        status: "ready", owner: "VP Product" },
  { name: "Category assurance execution",            status: "ready", owner: "CMO" },
  { name: "Assurance exception",                     status: "ready", owner: "CCO" },
  { name: "Board assurance",                         status: "ready", owner: "Board Admin" },
  { name: "Long-term enterprise assurance roadmap",  status: "ready", owner: "CEO" },
];

// ─── 23. RLS examples ─────────────────────────────────────────────────────
export const V19_RLS = [
  { name: "v19_assurance_company_member",   target: "v19_enterprise_assurance_scores", sql: "USING (is_company_member(auth.uid(), company_id))" },
  { name: "v19_platform_owner_assurance",   target: "enterprise_assurance_operating_records", sql: "USING (is_platform_owner(auth.uid()))" },
  { name: "v19_exec_assurance_visibility",  target: "executive_assurance_command_records", sql: "USING (has_role(auth.uid(), company_id, 'executive'))" },
  { name: "v19_board_role_reports_only",    target: "board_assurance_reports_v19", sql: "USING (has_role(auth.uid(), company_id, 'board') AND status = 'approved')" },
  { name: "v19_security_admin_manage_audit",target: "assurance_audit_execution_records", sql: "USING (has_role(auth.uid(), company_id, 'security_admin'))" },
  { name: "v19_revops_manage_revenue",      target: "durable_revenue_control_assurance_records", sql: "USING (has_role(auth.uid(), company_id, 'revops'))" },
  { name: "v19_mp_leader_manage_mp",        target: "marketplace_optimization_assurance_records", sql: "USING (has_role(auth.uid(), company_id, 'vp_marketplace'))" },
  { name: "v19_cs_manage_assigned_accounts",target: "strategic_account_assurance_execution_records", sql: "USING (has_role(auth.uid(), company_id, 'customer_success') AND owner_id = auth.uid())" },
  { name: "v19_partner_mgr_partners",       target: "partner_assurance_execution_records", sql: "USING (has_role(auth.uid(), company_id, 'partner_manager'))" },
  { name: "v19_product_leader_products",    target: "product_line_assurance_execution_records", sql: "USING (has_role(auth.uid(), company_id, 'vp_product'))" },
  { name: "v19_marketing_category",         target: "category_assurance_execution_records", sql: "USING (has_role(auth.uid(), company_id, 'marketing'))" },
  { name: "v19_approver_not_recommender",   target: "*_records (approvals)", sql: "WITH CHECK (approver_id <> recommender_id)" },
  { name: "v19_high_impact_hitl",           target: "recommendation_assurance_maturity_records", sql: "WITH CHECK (impact < 50000 OR approver_id IS NOT NULL)" },
  { name: "v19_two_person_capital",         target: "capital_assurance_execution_records", sql: "WITH CHECK (approver_1_id IS NOT NULL AND approver_2_id IS NOT NULL AND approver_1_id <> approver_2_id)" },
  { name: "v19_audit_append_only",          target: "assurance_audit_execution_records", sql: "FOR INSERT WITH CHECK (true); REVOKE DELETE FROM authenticated" },
  { name: "v19_customer_blocked_internal",  target: "executive_assurance_command_records", sql: "USING (NOT is_customer_user(auth.uid(), company_id))" },
  { name: "v19_carrier_redacted_mp",        target: "marketplace_optimization_assurance_records", sql: "USING (NOT has_role(auth.uid(), company_id, 'carrier_user'))" },
  { name: "v19_partner_facing_approved",    target: "partner_assurance_execution_records (partner view)", sql: "USING (has_role(auth.uid(), company_id, 'partner_user') AND visibility = 'partner_approved')" },
  { name: "v19_evidence_insert_only",       target: "control_evidence_maturity_records", sql: "FOR INSERT WITH CHECK (auth.uid() = recorded_by)" },
  { name: "v19_board_audience_gated",       target: "board_assurance_reports_v19", sql: "USING (audience @> ARRAY[(current_setting('app.audience'))::text])" },
];

// ─── Edge Function plan ───────────────────────────────────────────────────
export const V19_EDGE_FUNCTIONS = [
  // enterprise
  { name: "calculate-v19-enterprise-assurance-score",   layer: "ServerFn", auth: "session+role" },
  { name: "generate-enterprise-assurance-summary",      layer: "ServerFn", auth: "session+role" },
  { name: "detect-enterprise-assurance-gaps",           layer: "ServerFn", auth: "session+role" },
  { name: "generate-enterprise-assurance-action-plan",  layer: "ServerFn", auth: "session+role" },
  // resilience
  { name: "calculate-assist-resilience-maturity",       layer: "ServerFn", auth: "session+role" },
  { name: "detect-assist-resilience-exceptions",        layer: "ServerFn", auth: "session+role" },
  { name: "generate-assist-resilience-maturity-plan",   layer: "ServerFn", auth: "session+role" },
  // board
  { name: "calculate-board-assurance-execution",        layer: "ServerFn", auth: "session+role" },
  { name: "detect-board-assurance-exceptions",          layer: "ServerFn", auth: "session+role" },
  { name: "generate-board-assurance-report-v19",        layer: "Edge",     auth: "service" },
  // revenue
  { name: "calculate-durable-revenue-control-assurance",layer: "ServerFn", auth: "session+role" },
  { name: "detect-revenue-assurance-exceptions",        layer: "ServerFn", auth: "session+role" },
  { name: "generate-revenue-assurance-action-plan",     layer: "ServerFn", auth: "session+role" },
  // marketplace
  { name: "calculate-marketplace-optimization-assurance", layer: "ServerFn", auth: "session+role" },
  { name: "detect-marketplace-assurance-exceptions",    layer: "ServerFn", auth: "session+role" },
  { name: "generate-marketplace-assurance-action-plan", layer: "ServerFn", auth: "session+role" },
  // maturity
  { name: "calculate-control-evidence-maturity",        layer: "ServerFn", auth: "session+role" },
  { name: "calculate-human-approval-assurance-maturity",layer: "ServerFn", auth: "session+role" },
  { name: "calculate-recommendation-assurance-maturity",layer: "ServerFn", auth: "session+role" },
  { name: "calculate-outcome-assurance-maturity",       layer: "ServerFn", auth: "session+role" },
  { name: "calculate-predictive-risk-assurance-maturity", layer: "ServerFn", auth: "session+role" },
  // audit/exception
  { name: "generate-assurance-audit-execution-report",  layer: "Edge",     auth: "service" },
  { name: "create-assurance-audit-finding",             layer: "ServerFn", auth: "session+role" },
  { name: "route-assurance-exception",                  layer: "ServerFn", auth: "session+role" },
  { name: "calculate-assurance-exception-score",        layer: "ServerFn", auth: "session+role" },
  // domain
  { name: "calculate-capital-assurance-execution",      layer: "ServerFn", auth: "session+role" },
  { name: "calculate-account-assurance-execution",      layer: "ServerFn", auth: "session+role" },
  { name: "calculate-partner-assurance-execution",      layer: "ServerFn", auth: "session+role" },
  { name: "calculate-product-line-assurance-execution", layer: "ServerFn", auth: "session+role" },
  { name: "calculate-category-assurance-execution",     layer: "ServerFn", auth: "session+role" },
  // roadmap
  { name: "generate-long-term-enterprise-assurance-roadmap", layer: "ServerFn", auth: "session+role" },
  // public
  { name: "/api/public/v19/webhook-carrier",            layer: "/api/public", auth: "HMAC" },
  { name: "/api/public/v19/cron-recompute",             layer: "/api/public", auth: "shared secret" },
  { name: "/api/public/v19/health",                     layer: "/api/public", auth: "open (no PII)" },
];

export const V19_EDGE_BOUNDARY = [
  { layer: "ServerFn",    concern: "Assurance score recompute",      auth: "session+role",    returns: "DTO score" },
  { layer: "ServerFn",    concern: "HITL queue read",                auth: "session",         returns: "DTO list" },
  { layer: "ServerFn",    concern: "Approval submit (2-person)",     auth: "session+role",    returns: "DTO ack" },
  { layer: "ServerFn",    concern: "Exception route + score",        auth: "session+role",    returns: "DTO ack" },
  { layer: "Edge",        concern: "Board assurance PDF render",     auth: "service",         returns: "binary URL" },
  { layer: "Edge",        concern: "Audit batch export (signed)",    auth: "service",         returns: "signed bundle" },
  { layer: "Edge",        concern: "Evidence signing/sealing",       auth: "service",         returns: "signature" },
  { layer: "/api/public", concern: "Carrier webhook (HMAC)",         auth: "HMAC",            returns: "ok / 401" },
  { layer: "/api/public", concern: "Cron: nightly assurance recompute", auth: "shared secret", returns: "ok" },
  { layer: "/api/public", concern: "Health probe",                   auth: "open",            returns: "ok (no PII)" },
];

// ─── 28. V19 Demo flow ────────────────────────────────────────────────────
export const V19_DEMO = [
  { who: "CEO",         step: "Open Enterprise Assurance Operating System", outcome: "Enterprise assurance 98%" },
  { who: "CEO",         step: "Review top-line scores",                     outcome: "Resilience 94% · Board 93% · Revenue 91% · MP 89%" },
  { who: "Sec/Admin",   step: "Open Autonomous-Assist Resilience Maturity", outcome: "Rec/Approval strong, 1 evidence workflow recurring failure" },
  { who: "Sec/Admin",   step: "Confirm manual fallback ready",              outcome: "Documented, owner Sec/Admin" },
  { who: "Sec/Admin",   step: "Confirm no high-impact auto-executed",       outcome: "0 in last 30d" },
  { who: "Board Admin", step: "Open Board Assurance Execution",             outcome: "Packet 92% · 2 board-use evidence pending · 1 action overdue" },
  { who: "Rev Ops",     step: "Open Durable Revenue Control Assurance",     outcome: "Renewal/expansion mature · 1 concentration exception · 2 evidence to refresh" },
  { who: "VP MP",       step: "Open Marketplace Optimization Assurance",    outcome: "TX/MW strong · SE density weak · preferred-carrier rec pending HITL" },
  { who: "CEO",         step: "Open Assurance Exception Command",           outcome: "4 high-risk: SE MP, concentration, evidence workflow, board evidence" },
  { who: "Board Admin", step: "Generate Board Assurance Report",            outcome: "17 sections · KPIs · exceptions · remediation · decisions · next-Q priorities" },
  { who: "CEO",         step: "Sign and route packet",                      outcome: "Audience-gated, archived, audit-logged" },
  { who: "CEO",         step: "Review Long-term Enterprise Assurance Roadmap", outcome: "6 horizons · 6 initiatives · Phase 52 (V19.5) teaser noted" },
];

export const V19_PHASE52_TEASER =
  "Phase 52 → V19.5: enterprise assurance maturity, assist resilience optimization, board assurance intelligence, revenue assurance optimization, marketplace assurance governance. No autonomous dispatch.";

export const V19_GUARDRAILS = [
  "No fully autonomous dispatch — every high-impact action HITL-gated.",
  "AI never approves dispatch/pricing/billing/marketplace/carrier/customer/compliance/capital/legal/procurement/board/financial/safety actions automatically.",
  "No SOC 2 / ISO / IPO / acquisition / Android Auto / CarPlay claims without tracked evidence.",
  "RBAC, RLS, tenant isolation, audit logs, approval workflows enforced.",
  "approver_id ≠ recommender_id at DB and UI.",
  "Capital actions require 2 distinct approvers.",
  "Evidence and audit are insert-only / append-only.",
  "Carrier data and customer data have hard tenant boundaries.",
  "Public endpoints HMAC-verified and PII-free.",
];
