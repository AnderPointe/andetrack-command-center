// Phase 60 Polish — V23.5 enterprise trust automation maturity uplift. Illustrative only.

export const V235P_DOMAINS = [
  { domain: "Maturity Command",       before: 96, after: 99, uplift: "Unified signal-quality + remediation-health scoring across 20 centers" },
  { domain: "Customer Intel Optim",   before: 95, after: 99, uplift: "Owner-coverage heatmap + sponsor escalation auto-tuning" },
  { domain: "Partner Intel Optim",    before: 95, after: 99, uplift: "Partner co-owned remediation playbooks with dual sign-off" },
  { domain: "Board Assurance Mat.",   before: 94, after: 99, uplift: "Board-grade evidence freshness + decision-register linkage" },
  { domain: "Revenue Trust Optim",    before: 95, after: 99, uplift: "Margin/HITL anomaly correlation; capital > $25k two-person enforced" },
  { domain: "Marketplace Scale",      before: 94, after: 99, uplift: "Listing/payout/dispute maturity unified score with category guardrails" },
  { domain: "Exec Maturity Command",  before: 96, after: 99, uplift: "Single exec ledger feeds board, audit, capital, and risk views" },
  { domain: "Evidence Maturity",      before: 95, after: 99, uplift: "Append-only hash-chained evidence with rotation SLOs" },
  { domain: "Customer Boundary",      before: 96, after: 99, uplift: "Per-tenant boundary lints + cross-tenant leak canaries" },
  { domain: "Partner Boundary",       before: 96, after: 99, uplift: "Scope tokens + boundary attestation per partner surface" },
  { domain: "Approval Maturity",      before: 95, after: 99, uplift: "approver_id ≠ recommender_id enforced; SLA p95 < 6h" },
  { domain: "Recommendation Mat.",    before: 94, after: 99, uplift: "Explainability + counterfactuals attached to every rec" },
  { domain: "Outcome Optimization",   before: 94, after: 99, uplift: "Outcome attribution feeds policy tuning loop" },
  { domain: "Audit Maturity",         before: 95, after: 99, uplift: "Continuous control testing with auditor-ready export" },
  { domain: "Risk Maturity",          before: 94, after: 99, uplift: "Top-10 risk register with linked mitigations + owners" },
  { domain: "Capital Maturity",       before: 95, after: 99, uplift: "Dual approver + treasury reconciliation gate" },
  { domain: "Product Maturity",       before: 94, after: 99, uplift: "Trust readiness gates per product launch" },
  { domain: "Category Maturity",      before: 94, after: 99, uplift: "Category-level guardrail policies with HITL fallback" },
  { domain: "Exception Optim",        before: 95, after: 99, uplift: "Auto-triage to owner; aging SLA escalation" },
  { domain: "Board Reporting",        before: 95, after: 99, uplift: "Quarterly packet auto-built from live evidence chain" },
];

export const V235P_HITL_QUEUE = [
  { id: "HITL-2301", surface: "Capital",     action: "Approve $42k partner payout",       recommender: "ai.capital",    approver: "cfo.delegate",   risk: "High",   sla: "6h" },
  { id: "HITL-2302", surface: "Marketplace", action: "Suspend listing for dispute spike", recommender: "ai.mp",         approver: "mp.lead",        risk: "Med",    sla: "12h" },
  { id: "HITL-2303", surface: "Customer",    action: "Escalate at-risk renewal",          recommender: "ai.cust",       approver: "cs.director",    risk: "Med",    sla: "24h" },
  { id: "HITL-2304", surface: "Partner",     action: "Pause partner onboarding scope",    recommender: "ai.partner",    approver: "partner.ops",    risk: "High",   sla: "8h" },
  { id: "HITL-2305", surface: "Revenue",     action: "Confirm pricing exception",         recommender: "ai.revenue",    approver: "rev.lead",       risk: "Med",    sla: "12h" },
  { id: "HITL-2306", surface: "Risk",        action: "Accept residual risk on control",   recommender: "ai.risk",       approver: "ciso",           risk: "High",   sla: "24h" },
];

export const V235P_BOUNDARY = [
  { scope: "Customer tenant",  rule: "All reads filter by current_company(); cross-tenant joins blocked at view layer",  evidence: "RLS + canary" },
  { scope: "Partner scope",    rule: "Partner scope tokens checked before any write; HITL on scope expansion",            evidence: "Token log + HITL" },
  { scope: "Capital actions",  rule: "Two distinct approvers > $25k; recommender ≠ either approver",                      evidence: "Approval ledger" },
  { scope: "Evidence",         rule: "Append-only; updates rejected; hash chain verified per write",                       evidence: "Hash chain" },
  { scope: "Public routes",    rule: "/api/public/v235/* HMAC-verified; never returns PII",                                evidence: "Signature log" },
];

export const V235P_INVARIANTS = [
  "approver_id ≠ recommender_id on every high-impact write",
  "Capital actions > $25k require two distinct approvers",
  "Evidence rows are append-only and hash-chained",
  "All AI recommendations carry explainability + counterfactual",
  "No autonomous dispatch — every dispatch action is HITL-gated",
  "Public routes are HMAC-verified and never return PII",
  "Exception SLA breaches auto-escalate to backup approver",
];

export const V235P_RLS = [
  { policy: "v235_hitl_required",          rule: "approver_id <> recommender_id",                                          surface: "all high-impact writes" },
  { policy: "v235_capital_two_person",     rule: "amount <= 25000 OR (approver_a IS NOT NULL AND approver_b IS NOT NULL AND approver_a <> approver_b)", surface: "capital_actions" },
  { policy: "v235_evidence_append_only",   rule: "UPDATE/DELETE denied; INSERT only; prev_hash matches",                   surface: "trust_evidence" },
  { policy: "v235_tenant_isolation",       rule: "company_id = current_company()",                                         surface: "customer_* tables" },
  { policy: "v235_partner_scope",          rule: "partner_id IN partner_scope_for(auth.uid())",                            surface: "partner_* tables" },
  { policy: "v235_board_packet_read",      rule: "has_role(auth.uid(), current_company(), 'board')",                       surface: "board_packets" },
  { policy: "v235_audit_read_only",        rule: "has_role(auth.uid(), current_company(), 'auditor') AND op = 'SELECT'",   surface: "audit_views" },
  { policy: "v235_risk_owner_write",       rule: "risk_owner_id = auth.uid() OR has_role(...,'admin')",                    surface: "risk_register" },
  { policy: "v235_rec_explainability",     rule: "explanation IS NOT NULL AND counterfactual IS NOT NULL",                 surface: "ai_recommendations" },
  { policy: "v235_outcome_attribution",    rule: "rec_id IS NOT NULL AND measured_at IS NOT NULL",                         surface: "outcome_log" },
  { policy: "v235_exception_owner",        rule: "owner_id IS NOT NULL AND escalated_to IS NOT NULL WHEN age > sla",       surface: "exceptions" },
  { policy: "v235_mp_listing_guardrail",   rule: "category_policy_id IS NOT NULL",                                         surface: "mp_listings" },
  { policy: "v235_revenue_anomaly_hitl",   rule: "anomaly_score < 0.7 OR hitl_approval_id IS NOT NULL",                    surface: "revenue_actions" },
  { policy: "v235_public_route_hmac",      rule: "signature_verified = true",                                              surface: "/api/public/v235/*" },
  { policy: "v235_no_pii_public",          rule: "response_schema excludes pii_columns",                                   surface: "/api/public/v235/*" },
  { policy: "v235_cust_boundary_canary",   rule: "canary_check_passed = true",                                             surface: "customer_boundary" },
  { policy: "v235_part_boundary_token",    rule: "scope_token_valid = true",                                               surface: "partner_boundary" },
];

export const V235P_EDGE = {
  rule: "Internal logic → createServerFn (auth-middleware). External callers → /api/public/v235/* (HMAC).",
  serverfn: [
    { name: "v235.maturity.score",       kind: "internal", auth: "requireSupabaseAuth" },
    { name: "v235.customer.optim",       kind: "internal", auth: "requireSupabaseAuth" },
    { name: "v235.partner.optim",        kind: "internal", auth: "requireSupabaseAuth" },
    { name: "v235.board.assurance",      kind: "internal", auth: "role:board" },
    { name: "v235.revenue.optim",        kind: "internal", auth: "role:revenue" },
    { name: "v235.mp.scale",             kind: "internal", auth: "role:mp" },
    { name: "v235.evidence.append",      kind: "internal", auth: "append-only" },
    { name: "v235.approval.decide",      kind: "internal", auth: "HITL approver" },
    { name: "v235.rec.explain",          kind: "internal", auth: "requireSupabaseAuth" },
    { name: "v235.outcome.attribute",    kind: "internal", auth: "requireSupabaseAuth" },
    { name: "v235.audit.export",         kind: "internal", auth: "role:auditor" },
    { name: "v235.risk.update",          kind: "internal", auth: "risk owner" },
    { name: "v235.capital.approve",      kind: "internal", auth: "two-person > $25k" },
    { name: "v235.exception.triage",     kind: "internal", auth: "requireSupabaseAuth" },
    { name: "v235.board.packet.build",   kind: "internal", auth: "role:board" },
  ],
  edge_routes: [
    { path: "/api/public/v235/webhook/trust-event", purpose: "Inbound trust-event webhook (HMAC, no PII echo)" },
    { path: "/api/public/v235/cron/evidence-rotate", purpose: "Scheduled evidence rotation trigger" },
    { path: "/api/public/v235/cron/exception-escalate", purpose: "SLA breach escalation tick" },
    { path: "/api/public/v235/health", purpose: "Maturity heartbeat (no PII)" },
  ],
};

export const V235P_OWNER_HEATMAP = [
  { owner: "Trust eng",   coverage: 99, gaps: 1, sla_p95_h: 4 },
  { owner: "Evidence",    coverage: 98, gaps: 2, sla_p95_h: 6 },
  { owner: "Governance",  coverage: 99, gaps: 1, sla_p95_h: 5 },
  { owner: "Security",    coverage: 99, gaps: 1, sla_p95_h: 3 },
  { owner: "Audit",       coverage: 98, gaps: 2, sla_p95_h: 8 },
  { owner: "Remediation", coverage: 97, gaps: 3, sla_p95_h: 7 },
  { owner: "Ops excel.",  coverage: 99, gaps: 1, sla_p95_h: 5 },
];

export const V235P_ROADMAP_LANES = [
  { lane: "Maturity",   q1: "Signal QA",       q2: "Owner coverage", q3: "Auto-remediation", q4: "Maturity score lock" },
  { lane: "Evidence",   q1: "Hash chain v2",   q2: "Rotation SLO",   q3: "Auditor export",   q4: "Evidence vault" },
  { lane: "Approval",   q1: "HITL p95 < 6h",   q2: "Backup approver", q3: "Dual sign-off",    q4: "Approval ledger" },
  { lane: "Boundary",   q1: "Canary leaks",    q2: "Scope tokens",   q3: "Per-tenant lint",  q4: "Boundary attest" },
  { lane: "Revenue",    q1: "Anomaly HITL",    q2: "Margin lens",    q3: "Capital gates",    q4: "Treasury recon" },
  { lane: "Marketplace",q1: "Listing guards",  q2: "Dispute SLA",    q3: "Payout HITL",      q4: "Category policy" },
  { lane: "Board",      q1: "Live packet",     q2: "Decision reg.",  q3: "Action tracker",   q4: "Quarterly export" },
];

export const V235P_DEMO = [
  { id: 1,  actor: "Exec",       step: "Open V23.5 Maturity Command — 99 score, 20 centers green" },
  { id: 2,  actor: "Customer",   step: "Inspect customer intel optim — owner-coverage heatmap, at-risk renewals" },
  { id: 3,  actor: "Partner",    step: "Review partner intel optim — co-owned playbooks, dual sign-off pending" },
  { id: 4,  actor: "Board",      step: "Board assurance — quarterly packet auto-built from live evidence" },
  { id: 5,  actor: "Revenue",    step: "Revenue optim — anomaly flagged, HITL queue routes to rev.lead" },
  { id: 6,  actor: "MP",         step: "Marketplace scale — listing guardrail trips on category policy" },
  { id: 7,  actor: "Evidence",   step: "Evidence maturity — append-only write, hash chain verifies" },
  { id: 8,  actor: "Cust bound.",step: "Customer boundary — canary detects no cross-tenant leak" },
  { id: 9,  actor: "Part bound.",step: "Partner boundary — scope token rejected for out-of-scope write" },
  { id: 10, actor: "Approval",   step: "HITL queue — approver_id ≠ recommender_id enforced" },
  { id: 11, actor: "Rec",        step: "Recommendation maturity — explanation + counterfactual attached" },
  { id: 12, actor: "Outcome",    step: "Outcome optim — rec_id linked to measured outcome, feeds tuning" },
  { id: 13, actor: "Audit",      step: "Audit maturity — auditor-ready export, control testing trail" },
  { id: 14, actor: "Risk",       step: "Risk maturity — top-10 register, mitigations + owners linked" },
  { id: 15, actor: "Capital",    step: "Capital > $25k — two distinct approvers gate enforced" },
  { id: 16, actor: "Product",    step: "Product maturity — trust readiness gate on next launch" },
  { id: 17, actor: "Category",   step: "Category maturity — guardrail policy with HITL fallback" },
  { id: 18, actor: "Exception",  step: "Exception optim — SLA breach auto-escalates to backup approver" },
  { id: 19, actor: "Board rep.", step: "Board reporting — quarterly packet exported from live chain" },
  { id: 20, actor: "Roadmap",    step: "Long-term maturity roadmap — 7 lanes × 4 quarters" },
];
