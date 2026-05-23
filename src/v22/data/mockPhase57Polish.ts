// Phase 57 polish — V22 enterprise trust lifecycle operating system uplift.
// Layered on top of mockPhase57.ts; surfaced via overview only.

export const V22_POLISH_HEADLINE = {
  headline: "V22 lifecycle operating system hardened to 95 with full HITL coverage on every high-impact lane.",
  highlights: [
    "21 lifecycle domains rolling into a single operating score (was 92 → now 95).",
    "Customer + partner trust automation governance both ≥ 94 with boundary-enforced comms.",
    "Board trust maturity execution at 96 with auditable decision evidence per packet.",
    "Revenue, marketplace, evidence, approval, recommendation, outcome, audit, risk, capital, product, category lanes all ≥ 93.",
    "Approver ≠ recommender + dual sign-off > $25k enforced in middleware, not in UI.",
  ],
};

export const V22_POLISH_DOMAINS = [
  { domain: "Enterprise trust lifecycle operating",        before: 92, after: 95, owner: "COO",        hitl: "Yes" },
  { domain: "Customer trust automation governance",        before: 91, after: 94, owner: "CS lead",    hitl: "Yes" },
  { domain: "Partner trust automation governance",         before: 91, after: 94, owner: "Partner lead", hitl: "Yes" },
  { domain: "Board trust maturity execution",              before: 93, after: 96, owner: "Board chair", hitl: "Yes" },
  { domain: "Revenue trust lifecycle systems",             before: 90, after: 94, owner: "CRO",        hitl: "Yes" },
  { domain: "Marketplace trust lifecycle optimization",    before: 90, after: 93, owner: "MP lead",    hitl: "Yes" },
  { domain: "Executive lifecycle trust command",           before: 92, after: 95, owner: "CEO",        hitl: "Yes" },
  { domain: "Trust evidence lifecycle governance",         before: 91, after: 95, owner: "Security",   hitl: "Yes" },
  { domain: "Customer lifecycle boundary controls",        before: 89, after: 94, owner: "CS + Sec",   hitl: "Yes" },
  { domain: "Partner lifecycle boundary controls",         before: 89, after: 94, owner: "Partner + Sec", hitl: "Yes" },
  { domain: "Human approval lifecycle governance",         before: 92, after: 96, owner: "COO",        hitl: "Yes" },
  { domain: "Recommendation lifecycle trust governance",   before: 90, after: 94, owner: "AI lead",    hitl: "Yes" },
  { domain: "Outcome lifecycle trust governance",          before: 90, after: 93, owner: "AI lead",    hitl: "Yes" },
  { domain: "Trust audit lifecycle governance",            before: 91, after: 95, owner: "Audit",      hitl: "Yes" },
  { domain: "Trust risk lifecycle governance",             before: 91, after: 94, owner: "Risk",       hitl: "Yes" },
  { domain: "Capital trust lifecycle readiness",           before: 90, after: 93, owner: "CFO",        hitl: "Dual ≥ $25k" },
  { domain: "Product trust lifecycle governance",          before: 89, after: 93, owner: "Product",    hitl: "Yes" },
  { domain: "Category trust lifecycle leadership",         before: 89, after: 93, owner: "Strategy",   hitl: "Yes" },
  { domain: "Enterprise trust lifecycle exceptions",       before: 90, after: 94, owner: "COO",        hitl: "Yes" },
  { domain: "Board trust lifecycle reporting",             before: 92, after: 95, owner: "Board chair", hitl: "Yes" },
  { domain: "Trust lifecycle operating roadmap",           before: 91, after: 95, owner: "Exec staff", hitl: "Yes" },
];

export const V22_POLISH_HITL_QUEUE = [
  { id: "HQ-401", lane: "Customer automation",  item: "Auto-pause renewal comms for at-risk acct E-118",       risk: "Med",  approver: "CS lead",  backup: "COO",       sla: "2h" },
  { id: "HQ-402", lane: "Partner automation",   item: "Suspend lane offers to carrier P-77 after 3 OTP misses", risk: "Med",  approver: "Partner",  backup: "COO",       sla: "2h" },
  { id: "HQ-403", lane: "Revenue lifecycle",    item: "Approve expansion proposal $42k for acct E-203",         risk: "High", approver: "CRO",      backup: "CEO",       sla: "1h" },
  { id: "HQ-404", lane: "Capital readiness",    item: "Cap reallocation $80k between lanes",                    risk: "High", approver: "CFO",      backup: "CEO",       sla: "1h (dual)" },
  { id: "HQ-405", lane: "Evidence governance",  item: "Refresh SOC2 control evidence pack v12",                 risk: "Low",  approver: "Security", backup: "Audit",     sla: "8h" },
  { id: "HQ-406", lane: "Marketplace",          item: "Approve dispute resolution credit $4.2k",                risk: "Med",  approver: "MP lead",  backup: "CRO",       sla: "4h" },
  { id: "HQ-407", lane: "Recommendation",       item: "Tune retention model after lesson L-91",                 risk: "Low",  approver: "AI lead",  backup: "Security",  sla: "8h" },
];

export const V22_POLISH_BOUNDARY = [
  { surface: "Customer portal exposure",     control: "Field-level allow-list",          owner: "CS + Sec",      status: "Enforced" },
  { surface: "Customer support data",        control: "Tenant scope + redact PII",       owner: "Support lead",  status: "Enforced" },
  { surface: "Customer external proof",      control: "Approval before publish",         owner: "CS lead",       status: "Enforced" },
  { surface: "Partner lane data",            control: "Per-partner row predicates",      owner: "Partner",       status: "Enforced" },
  { surface: "Partner billing comms",        control: "Approval + signed templates",     owner: "Finance",       status: "Enforced" },
  { surface: "Partner audit packet",         control: "Append-only evidence bundle",     owner: "Audit",         status: "Enforced" },
  { surface: "Board data room",              control: "Time-boxed scoped tokens",        owner: "Board chair",   status: "Enforced" },
];

export const V22_POLISH_RLS = [
  { policy: "lifecycle_ops_read",       rule: "company_id = current_company() OR is_platform_owner()",                       surface: "v22_trust_lifecycle_operating_scores" },
  { policy: "cust_auto_read",           rule: "company_id = current_company() AND has_role(auth.uid(), company_id, 'cs_lead')", surface: "customer_trust_automation_governance" },
  { policy: "part_auto_read",           rule: "company_id = current_company() AND has_role(auth.uid(), company_id, 'partner_lead')", surface: "partner_trust_automation_governance" },
  { policy: "board_exec_read",          rule: "is_platform_owner() OR has_role(auth.uid(), current_company(), 'board_member')", surface: "board_trust_maturity_execution_records" },
  { policy: "revenue_lifecycle_read",   rule: "has_role(auth.uid(), current_company(), 'cro')",                               surface: "revenue_trust_lifecycle_systems" },
  { policy: "evidence_lifecycle_write", rule: "append_only AND approver_id <> recommender_id",                                surface: "trust_evidence_lifecycle_governance_records" },
  { policy: "cust_boundary_read",       rule: "is_customer_user(auth.uid(), customer_id) AND field IN allow_list",            surface: "customer_lifecycle_boundary_controls" },
  { policy: "part_boundary_read",       rule: "partner_id IN partner_ids_for_user(auth.uid())",                               surface: "partner_lifecycle_boundary_controls" },
  { policy: "approval_decide",          rule: "approver_id = auth.uid() AND approver_id <> recommender_id",                   surface: "human_approval_lifecycle_governance" },
  { policy: "capital_dual_signoff",     rule: "amount > 25000 ⇒ second approver required AND ≠ first AND ≠ recommender",     surface: "capital_trust_lifecycle_readiness" },
  { policy: "exception_admin",          rule: "has_role(auth.uid(), current_company(), 'admin') OR is_platform_owner()",     surface: "enterprise_trust_lifecycle_exceptions" },
  { policy: "audit_immutable",          rule: "INSERT only; UPDATE/DELETE denied",                                            surface: "trust_audit_lifecycle_governance" },
];

export const V22_POLISH_EDGE = {
  rule: "Internal lifecycle logic → createServerFn (auth via requireSupabaseAuth). External callers → /api/public/* with signature verification. No Supabase Edge Functions for internal flows.",
  serverfn: [
    { name: "calculate-v22-trust-lifecycle-operating-score",     kind: "ServerFn", auth: "requireSupabaseAuth" },
    { name: "approve-customer-trust-automation-action",          kind: "ServerFn", auth: "requireSupabaseAuth + cs_lead" },
    { name: "approve-partner-trust-automation-action",           kind: "ServerFn", auth: "requireSupabaseAuth + partner_lead" },
    { name: "approve-board-trust-maturity-decision",             kind: "ServerFn", auth: "requireSupabaseAuth + board_member" },
    { name: "approve-revenue-trust-lifecycle-action",            kind: "ServerFn", auth: "requireSupabaseAuth + cro" },
    { name: "approve-capital-trust-lifecycle-allocation",        kind: "ServerFn", auth: "requireSupabaseAuth + cfo (dual if >$25k)" },
    { name: "record-trust-evidence-lifecycle-event",             kind: "ServerFn", auth: "requireSupabaseAuth + security (append-only)" },
    { name: "tune-recommendation-lifecycle-policy",              kind: "ServerFn", auth: "requireSupabaseAuth + ai_lead" },
    { name: "log-outcome-lifecycle-trust-result",                kind: "ServerFn", auth: "requireSupabaseAuth (append-only)" },
    { name: "open-enterprise-trust-lifecycle-exception",         kind: "ServerFn", auth: "requireSupabaseAuth" },
  ],
  edge_routes: [
    { path: "/api/public/v22-webhook-evidence-source",   purpose: "Signed evidence source webhook (HMAC verify before insert)" },
    { path: "/api/public/v22-webhook-board-archive",     purpose: "Signed board archive callback (verify + append-only insert)" },
    { path: "/api/public/v22-webhook-partner-audit",     purpose: "Signed partner audit pack callback" },
    { path: "/api/public/v22-cron-evidence-freshness",   purpose: "Cron pings evidence freshness check (no PII returned)" },
  ],
};

export const V22_POLISH_INVARIANTS = [
  "approver_id ≠ recommender_id on every approval row (DB check + middleware).",
  "Capital actions > $25k require two distinct approvers and both ≠ recommender.",
  "Evidence is append-only; UPDATE/DELETE denied at the policy level.",
  "Customer/partner data crosses the boundary only through allow-listed, approved fields.",
  "Board decisions require attached evidence with freshness ≤ 30 days.",
  "Recommendation actions require explanation + risk score + approver chain.",
  "Exceptions are auto-routed to owner + backup with SLA clock and escalation.",
  "All high-impact server functions emit an audit row in the same transaction.",
];

export const V22_POLISH_DEMO = [
  { id: 1,  actor: "CEO",         step: "Open V22 overview → see operating score 95 and 21 domain rollup." },
  { id: 2,  actor: "COO",         step: "Drill into operating center → review lifecycle matrix + exception queue." },
  { id: 3,  actor: "CS lead",     step: "Customer automation → approve auto-pause for at-risk renewal (boundary check passes)." },
  { id: 4,  actor: "Partner lead", step: "Partner automation → suspend lane offers for OTP-miss carrier (HITL gated)." },
  { id: 5,  actor: "Board chair", step: "Board execution → review packet with attached evidence freshness." },
  { id: 6,  actor: "CRO",         step: "Revenue lifecycle → approve $42k expansion with explanation + risk." },
  { id: 7,  actor: "MP lead",     step: "Marketplace → resolve dispute with credit, audit row emitted." },
  { id: 8,  actor: "Security",    step: "Evidence governance → refresh SOC2 pack v12, append-only event logged." },
  { id: 9,  actor: "AI lead",     step: "Recommendation → tune retention policy after lesson L-91." },
  { id: 10, actor: "CFO",         step: "Capital readiness → dual sign-off on $80k reallocation (two distinct approvers)." },
  { id: 11, actor: "Audit",       step: "Audit lifecycle → verify every approval has audit row + immutable evidence." },
  { id: 12, actor: "Risk",        step: "Risk lifecycle → review escalations and roadmap mitigations." },
  { id: 13, actor: "Exec staff",  step: "Roadmap → confirm horizons + owners for next 4 quarters." },
];

export const V22_POLISH_ROADMAP = [
  { horizon: "Q+0 (now)",    focus: "Harden HITL coverage on all 21 lanes; eliminate manual approval gaps.", owner: "COO" },
  { horizon: "Q+1",          focus: "Extend boundary controls to 100% of customer/partner external surfaces.", owner: "CS + Partner" },
  { horizon: "Q+2",          focus: "Tighten evidence freshness SLAs (board ≤ 14 days; auditor ≤ 30).",        owner: "Security + Audit" },
  { horizon: "Q+3",          focus: "Lifecycle KPIs streamed to exec command in near-real time (assist only).", owner: "CEO + AI lead" },
  { horizon: "Q+4",          focus: "Trust lifecycle scorecards externalized to design partners under NDA.",    owner: "CS + Legal" },
];

export const V22_POLISH_OWNER_HEATMAP = [
  { owner: "CEO",        open: 2, overdue: 0, sla_breach: 0 },
  { owner: "COO",        open: 5, overdue: 0, sla_breach: 0 },
  { owner: "CFO",        open: 3, overdue: 0, sla_breach: 0 },
  { owner: "CRO",        open: 4, overdue: 1, sla_breach: 0 },
  { owner: "CS lead",    open: 6, overdue: 0, sla_breach: 0 },
  { owner: "Partner",    open: 5, overdue: 0, sla_breach: 0 },
  { owner: "MP lead",    open: 3, overdue: 0, sla_breach: 0 },
  { owner: "Security",   open: 4, overdue: 0, sla_breach: 0 },
  { owner: "Audit",      open: 2, overdue: 0, sla_breach: 0 },
  { owner: "Risk",       open: 3, overdue: 0, sla_breach: 0 },
  { owner: "AI lead",    open: 4, overdue: 0, sla_breach: 0 },
  { owner: "Product",    open: 3, overdue: 0, sla_breach: 0 },
];
