// V22.5 Phase 58 Polish — uplift data across all 21 lifecycle automation centers
export const V225P_DOMAINS = [
  { domain: "Enterprise Lifecycle Trust Automation Scale", before: 92, after: 95, owner: "CTO", note: "21-center orchestrated; HITL non-bypassable" },
  { domain: "Board Lifecycle Assurance Intelligence",     before: 93, after: 96, owner: "Board Chair", note: "Quarterly assurance pack auto-bundled" },
  { domain: "Revenue Lifecycle Trust Optimization",       before: 91, after: 94, owner: "CRO", note: "Durable rev share +3pp w/ trust gating" },
  { domain: "Marketplace Lifecycle Governance",           before: 90, after: 94, owner: "VP MP", note: "Per-tier policy + appeal lifecycle" },
  { domain: "Customer Lifecycle Trust Maturity",          before: 91, after: 95, owner: "VP Cust", note: "Onboard→renew trust scorecards live" },
  { domain: "Partner Lifecycle Trust Maturity",           before: 90, after: 94, owner: "VP Part", note: "Tiered SLAs + trust-weighted payouts" },
  { domain: "Executive Lifecycle Assurance Command",      before: 92, after: 95, owner: "CEO", note: "Single-pane exec lifecycle cockpit" },
  { domain: "Lifecycle Evidence Scale Governance",        before: 93, after: 96, owner: "GC",  note: "Append-only, hash-chained, immutable" },
  { domain: "Customer Lifecycle Boundary Maturity",       before: 90, after: 93, owner: "VP Cust", note: "Boundary breaches auto-quarantined" },
  { domain: "Partner Lifecycle Boundary Maturity",        before: 89, after: 93, owner: "VP Part", note: "Cross-partner data isolation verified" },
  { domain: "Human Approval Lifecycle Scale",             before: 92, after: 95, owner: "COO", note: "Median approval 1.4h; SLA 99.2%" },
  { domain: "Recommendation Lifecycle Automation Gov.",   before: 90, after: 93, owner: "Head AI", note: "Rec→approval→exec→evidence loop closed" },
  { domain: "Outcome Lifecycle Trust Optimization",       before: 91, after: 94, owner: "VP Ops", note: "Outcomes attributed back to trust signals" },
  { domain: "Trust Audit Lifecycle Scale",                before: 92, after: 95, owner: "CISO", note: "Continuous audit, no-prep board reports" },
  { domain: "Trust Risk Lifecycle Intelligence",          before: 91, after: 94, owner: "CRO-R", note: "Risk-weighted automation throttles" },
  { domain: "Capital Lifecycle Trust Readiness",          before: 90, after: 93, owner: "CFO", note: "Dual sign-off >$25k enforced server-side" },
  { domain: "Product Lifecycle Trust Scale",              before: 91, after: 94, owner: "CPO", note: "Trust SLOs per surface, regression gated" },
  { domain: "Category Lifecycle Trust Maturity",          before: 90, after: 93, owner: "VP Cat", note: "Per-category trust budgets + alerts" },
  { domain: "Enterprise Lifecycle Exception Operations",  before: 92, after: 95, owner: "COO", note: "Exception triage <30m, root-cause linked" },
  { domain: "Board Lifecycle Trust Reporting",            before: 93, after: 96, owner: "Board", note: "One-click materials, no quarter-end prep" },
  { domain: "Long-term Lifecycle Trust Automation Map",   before: 91, after: 94, owner: "CTO", note: "12-quarter horizon, owners + checkpoints" },
];

export const V225P_HITL_QUEUE = [
  { id: "AP-7201", surface: "Marketplace",  action: "Policy escalation — Tier-A vendor",     recommender: "rec-svc",       approver: "VP MP",   sla: "1h", status: "approved" },
  { id: "AP-7202", surface: "Capital",      action: "Trust capital rebalance $48,500",       recommender: "cap-engine",    approver: "CFO+CEO", sla: "2h", status: "dual-pending" },
  { id: "AP-7203", surface: "Customer",     action: "Boundary override — enterprise tenant", recommender: "boundary-svc",  approver: "VP Cust", sla: "30m",status: "approved" },
  { id: "AP-7204", surface: "Partner",      action: "Payout adjustment — trust-weighted",    recommender: "payout-svc",    approver: "VP Part", sla: "1h", status: "approved" },
  { id: "AP-7205", surface: "Risk",         action: "Throttle automation — anomaly cluster", recommender: "risk-engine",   approver: "CRO-R",   sla: "15m",status: "approved" },
  { id: "AP-7206", surface: "Evidence",     action: "Retention extension — audit hold",      recommender: "evidence-svc",  approver: "GC",      sla: "4h", status: "approved" },
  { id: "AP-7207", surface: "Board",        action: "Quarterly trust pack publish",          recommender: "board-svc",     approver: "Board Ch.", sla: "24h", status: "pending" },
  { id: "AP-7208", surface: "Exception",    action: "Root-cause remediation plan",           recommender: "exception-svc", approver: "COO",     sla: "2h", status: "approved" },
];

export const V225P_BOUNDARY = [
  { surface: "Customer", control: "Per-tenant row isolation",       owner: "VP Cust", state: "enforced" },
  { surface: "Customer", control: "Cross-tenant export block",      owner: "VP Cust", state: "enforced" },
  { surface: "Partner",  control: "Partner-to-partner data wall",   owner: "VP Part", state: "enforced" },
  { surface: "Partner",  control: "Trust-tier payout boundary",     owner: "VP Part", state: "enforced" },
  { surface: "MP",       control: "Category policy partitioning",   owner: "VP MP",   state: "enforced" },
  { surface: "Evidence", control: "Append-only, hash-chained",      owner: "GC",      state: "enforced" },
  { surface: "Capital",  control: "Dual sign-off > $25,000",        owner: "CFO",     state: "enforced" },
  { surface: "Approval", control: "Approver ≠ recommender",         owner: "COO",     state: "enforced" },
  { surface: "Exec",     control: "Read-only command surface",      owner: "CEO",     state: "enforced" },
  { surface: "Risk",     control: "Throttle envelope per surface",  owner: "CRO-R",   state: "enforced" },
];

export const V225P_RLS = [
  { policy: "v225_hitl_required",          rule: "approver_id IS NOT NULL on every high-impact write", surface: "all" },
  { policy: "v225_approver_distinct",      rule: "approver_id <> recommender_id",                       surface: "approval" },
  { policy: "v225_capital_two_person",     rule: "two distinct approvers when amount > 25000",          surface: "capital" },
  { policy: "v225_evidence_append_only",   rule: "UPDATE/DELETE blocked on v225_evidence_records",      surface: "evidence" },
  { policy: "v225_tenant_isolation",       rule: "customer_id = current_customer()",                    surface: "customer" },
  { policy: "v225_partner_isolation",      rule: "partner_id = current_partner()",                      surface: "partner" },
  { policy: "v225_mp_category_scope",      rule: "category_id IN current_category_scope()",             surface: "marketplace" },
  { policy: "v225_board_read_only",        rule: "role = 'board' ⇒ SELECT only",                        surface: "board" },
  { policy: "v225_exec_read_only",         rule: "role = 'executive' ⇒ SELECT + approve only",          surface: "exec" },
  { policy: "v225_risk_throttle_audit",    rule: "INSERT requires risk_score & throttle_reason",        surface: "risk" },
  { policy: "v225_audit_append_only",      rule: "UPDATE/DELETE blocked on v225_audit_trail",           surface: "audit" },
  { policy: "v225_exception_owner_scope",  rule: "owner_id = auth.uid() OR has_role('coo')",            surface: "exception" },
  { policy: "v225_recommendation_signed",  rule: "rec_signature verified against rec_service key",      surface: "recommendation" },
  { policy: "v225_outcome_attestation",    rule: "outcome_id linked to approved rec_id",                surface: "outcome" },
  { policy: "v225_roadmap_owner_write",    rule: "only owner_id may update horizon",                    surface: "roadmap" },
];

export const V225P_EDGE = {
  rule: "Server functions own internal logic + HITL; public routes are signature-verified webhooks only.",
  serverfn: [
    { name: "v225/score-automation",         kind: "ServerFn", auth: "session" },
    { name: "v225/board-assurance-pack",     kind: "ServerFn", auth: "session+board-role" },
    { name: "v225/revenue-trust-optimize",   kind: "ServerFn", auth: "session+cro" },
    { name: "v225/mp-policy-evaluate",       kind: "ServerFn", auth: "session" },
    { name: "v225/customer-trust-score",     kind: "ServerFn", auth: "session+tenant" },
    { name: "v225/partner-trust-score",      kind: "ServerFn", auth: "session+partner" },
    { name: "v225/approval-decision",        kind: "ServerFn", auth: "session+approver" },
    { name: "v225/capital-dual-signoff",     kind: "ServerFn", auth: "session+cfo OR session+ceo" },
    { name: "v225/evidence-append",          kind: "ServerFn", auth: "session (write-once)" },
    { name: "v225/exception-triage",         kind: "ServerFn", auth: "session+coo" },
  ],
  edge_routes: [
    { path: "/api/public/v225-webhook-board",     purpose: "Inbound board scheduler — HMAC verified" },
    { path: "/api/public/v225-webhook-cap-table", purpose: "Capital provider attestation — HMAC verified" },
    { path: "/api/public/v225-webhook-audit",     purpose: "External auditor pull — signature + IP-allow" },
    { path: "/api/public/v225-health",            purpose: "Cron heartbeat — no PII, status only" },
  ],
};

export const V225P_INVARIANTS = [
  "Every high-impact action requires explicit human approval; no fully autonomous dispatch.",
  "approver_id <> recommender_id, enforced by RLS — not UI.",
  "Capital actions > $25,000 require two distinct approvers (CFO + CEO).",
  "Evidence records are append-only and hash-chained; no in-place mutation.",
  "Boundary breaches auto-quarantine and open an exception with linked evidence.",
  "Public routes (/api/public/*) accept only signature-verified payloads; never return PII.",
  "Server functions read process.env inside .handler(); secrets never bundle client-side.",
  "Board and exec surfaces are read-only; approvals occur in approval surface with full lineage.",
];

export const V225P_DEMO = [
  { id: 1,  actor: "CEO",        step: "Open /v225/overview — sees lifecycle automation scale 95, board assurance 96." },
  { id: 2,  actor: "CRO",        step: "Open /v225/revenue — durable revenue trust optimization 94, +3pp share." },
  { id: 3,  actor: "VP MP",      step: "Open /v225/mp — per-tier policy queue + appeal lifecycle visible." },
  { id: 4,  actor: "VP Cust",    step: "Open /v225/customer — lifecycle trust maturity 95, onboard→renew." },
  { id: 5,  actor: "VP Part",    step: "Open /v225/partner — tiered SLAs, trust-weighted payouts active." },
  { id: 6,  actor: "CFO",        step: "Open /v225/capital — dual sign-off queue (AP-7202) pending CEO." },
  { id: 7,  actor: "CEO",        step: "Co-approve AP-7202 — server enforces approver ≠ recommender + dual sign." },
  { id: 8,  actor: "GC",         step: "Open /v225/evidence — append-only chain shows AP-7202 evidence written." },
  { id: 9,  actor: "COO",        step: "Open /v225/exception — triage queue median <30m, root-cause linked." },
  { id: 10, actor: "CISO",       step: "Open /v225/audit — continuous audit trail; no manual prep needed." },
  { id: 11, actor: "Board Chair",step: "Open /v225/board-report — quarterly pack auto-bundled, one-click publish." },
  { id: 12, actor: "CTO",        step: "Open /v225/roadmap — 12-quarter lifecycle automation horizons w/ owners." },
  { id: 13, actor: "All",        step: "Phase 59 (V23) teaser referenced — not started." },
];

export const V225P_OWNER_HEATMAP = [
  { owner: "CEO",        domains: 2, attention: "low" },
  { owner: "CTO",        domains: 2, attention: "med" },
  { owner: "CFO",        domains: 1, attention: "med" },
  { owner: "COO",        domains: 3, attention: "low" },
  { owner: "CRO",        domains: 1, attention: "low" },
  { owner: "CRO-R",      domains: 1, attention: "low" },
  { owner: "CPO",        domains: 1, attention: "low" },
  { owner: "CISO",       domains: 1, attention: "low" },
  { owner: "GC",         domains: 1, attention: "low" },
  { owner: "VP Cust",    domains: 2, attention: "med" },
  { owner: "VP Part",    domains: 2, attention: "med" },
  { owner: "VP MP",      domains: 1, attention: "low" },
  { owner: "VP Cat",     domains: 1, attention: "low" },
  { owner: "Head AI",    domains: 1, attention: "low" },
  { owner: "Board",      domains: 2, attention: "low" },
];

export const V225P_ROADMAP_LANES = [
  { lane: "Automation depth",   q1: "Center hardening",          q2: "Cross-center workflows",    q3: "Tenant-scoped overrides",  q4: "Multi-region scale" },
  { lane: "Board assurance",    q1: "Auto-pack v2",              q2: "Drill-down lineage",        q3: "External auditor portal",  q4: "Regulator views" },
  { lane: "Revenue trust",      q1: "Durable rev attribution",   q2: "Tier-aware pricing trust",  q3: "Win/loss trust signals",   q4: "Forecast confidence bands" },
  { lane: "Marketplace gov.",   q1: "Appeal lifecycle",          q2: "Vendor reputation graph",   q3: "Category trust budgets",   q4: "Cross-MP federation" },
  { lane: "Evidence + audit",   q1: "Hash-chain v2",             q2: "Tamper-evident export",     q3: "Zero-prep board pack",     q4: "Continuous SOC2 stream" },
];
