// Phase 53 Polish — V20 Enterprise Trust Operating System polish data.
// Strictly HITL-gated. No autonomous dispatch. Capital >$25k requires 2-person sign-off.

export const V20_POLISH_HEADLINES = {
  trust_os_score: 98.4,
  assist_assurance_scale: 96.7,
  board_governance_intel: 95.9,
  revenue_assurance_systems: 97.1,
  marketplace_assurance_scale: 96.2,
  executive_trust_command: 95.4,
  customer_trust_intel: 96.0,
  partner_trust_intel: 94.8,
  evidence_governance: 97.6,
  risk_governance: 95.1,
  audit_readiness: 98.2,
  approval_trust: 99.1,
  recommendation_trust: 96.5,
  outcome_trust: 95.7,
  predictive_trust: 94.3,
  capital_trust: 97.4,
  product_trust: 95.8,
  category_trust: 94.6,
  exception_burndown_h: 8.2,
  evidence_freshness_min: 14,
};

export const V20_POLISH_DOMAINS = [
  { domain: "Trust OS",            score: 98.4, owner: "CTO",   exceptions: 1, hitl_open: 2 },
  { domain: "Assist Scale",        score: 96.7, owner: "VP Ops",exceptions: 2, hitl_open: 4 },
  { domain: "Board Intel",         score: 95.9, owner: "Chair", exceptions: 1, hitl_open: 1 },
  { domain: "Revenue Assurance",   score: 97.1, owner: "CRO",   exceptions: 3, hitl_open: 5 },
  { domain: "Marketplace Scale",   score: 96.2, owner: "GM MP", exceptions: 2, hitl_open: 3 },
  { domain: "Executive Command",   score: 95.4, owner: "CEO",   exceptions: 1, hitl_open: 2 },
  { domain: "Customer Trust",      score: 96.0, owner: "CCO",   exceptions: 2, hitl_open: 3 },
  { domain: "Partner Trust",       score: 94.8, owner: "VP Partners", exceptions: 3, hitl_open: 4 },
  { domain: "Evidence Governance", score: 97.6, owner: "Head Audit", exceptions: 1, hitl_open: 2 },
  { domain: "Risk Governance",     score: 95.1, owner: "CRO",   exceptions: 2, hitl_open: 3 },
  { domain: "Audit Readiness",     score: 98.2, owner: "Auditor",exceptions: 0, hitl_open: 1 },
  { domain: "Approval Trust",      score: 99.1, owner: "GRC",   exceptions: 0, hitl_open: 1 },
  { domain: "Recommendation Trust",score: 96.5, owner: "Head ML",exceptions: 2, hitl_open: 3 },
  { domain: "Outcome Trust",       score: 95.7, owner: "VP Ops",exceptions: 2, hitl_open: 2 },
  { domain: "Predictive Trust",    score: 94.3, owner: "Head ML",exceptions: 3, hitl_open: 4 },
  { domain: "Capital Trust",       score: 97.4, owner: "CFO",   exceptions: 1, hitl_open: 2 },
  { domain: "Product Trust",       score: 95.8, owner: "CPO",   exceptions: 2, hitl_open: 3 },
  { domain: "Category Trust",      score: 94.6, owner: "Cat Lead",exceptions: 3, hitl_open: 4 },
];

export const V20_POLISH_HITL_QUEUE = [
  { id: "HITL-2001", title: "Approve marketplace promo lift (EU)",   impact: "$48k GMV", risk: "med", sla_h: 6, owner: "GM MP",   two_person: true },
  { id: "HITL-2002", title: "Approve capital reallocation across 3 SKUs", impact: "$31k", risk: "high",sla_h: 4, owner: "CFO",     two_person: true },
  { id: "HITL-2003", title: "Approve partner SLA waiver (LatAm)",    impact: "trust",   risk: "med", sla_h: 8, owner: "VP Partners", two_person: false },
  { id: "HITL-2004", title: "Approve revenue recovery playbook v3",  impact: "$22k",    risk: "low", sla_h: 12,owner: "CRO",     two_person: false },
  { id: "HITL-2005", title: "Approve evidence retention extension",  impact: "audit",   risk: "low", sla_h: 24,owner: "Head Audit", two_person: false },
  { id: "HITL-2006", title: "Approve category leadership posture",   impact: "brand",   risk: "med", sla_h: 8, owner: "Cat Lead", two_person: false },
];

export const V20_POLISH_EVIDENCE_FRESHNESS = [
  { surface: "Board pack",        max_age_min: 30, current_min: 12, status: "fresh" },
  { surface: "Exec command",      max_age_min: 15, current_min: 9,  status: "fresh" },
  { surface: "Revenue assurance", max_age_min: 20, current_min: 17, status: "fresh" },
  { surface: "Marketplace",       max_age_min: 20, current_min: 22, status: "stale" },
  { surface: "Audit log",         max_age_min: 5,  current_min: 2,  status: "fresh" },
  { surface: "Customer trust",    max_age_min: 30, current_min: 14, status: "fresh" },
];

export const V20_POLISH_PERSONA_SLAS = [
  { persona: "Board chair",  surface: "Board intelligence", sla_h: 2,  met_pct: 99.1 },
  { persona: "CEO",          surface: "Executive command",  sla_h: 1,  met_pct: 98.6 },
  { persona: "CFO",          surface: "Capital trust",      sla_h: 1,  met_pct: 99.4 },
  { persona: "CRO",          surface: "Revenue assurance",  sla_h: 2,  met_pct: 97.8 },
  { persona: "GM Marketplace", surface: "Marketplace scale",sla_h: 4,  met_pct: 96.5 },
  { persona: "Head Audit",   surface: "Evidence governance",sla_h: 24, met_pct: 100.0 },
];

export const V20_POLISH_RLS_EXAMPLES = [
  { policy: "v20_trust_audit_append_only", table: "trust_audit_log", rule: "no update/delete; insert via service role only" },
  { policy: "v20_hitl_enforced",           table: "trust_actions",    rule: "approver_id <> recommender_id required" },
  { policy: "v20_two_person_capital",      table: "capital_actions",  rule: "amount > 25000 requires 2 distinct approvers" },
  { policy: "v20_evidence_governance",     table: "trust_evidence",   rule: "select restricted to has_role('auditor') or has_role('exec')" },
  { policy: "v20_partner_trust_scoped",    table: "partner_trust",    rule: "row scoped to partner_id IN user_partner_ids()" },
  { policy: "v20_customer_trust_scoped",   table: "customer_trust",   rule: "row scoped to account_id IN user_account_ids()" },
  { policy: "v20_no_autonomous_dispatch",  table: "dispatch_intents", rule: "insert blocked unless approved_at IS NOT NULL" },
  { policy: "v20_board_pack_readonly",     table: "board_packs",      rule: "select only; mutations via service role + approval" },
];

export const V20_POLISH_EDGE_BOUNDARY = [
  { surface: "Internal trust scoring",     impl: "createServerFn",     reason: "auth + RLS, called by app loaders" },
  { surface: "Board pack rendering",       impl: "createServerFn",     reason: "auth + queryClient prefetch" },
  { surface: "Webhook: partner sync",      impl: "server route /api/public/partner-sync", reason: "external caller, HMAC verified" },
  { surface: "Webhook: marketplace events",impl: "server route /api/public/mp-events",    reason: "external caller, signature verified" },
  { surface: "Cron: evidence freshness",   impl: "server route /api/public/cron/evidence",reason: "scheduler caller, token-gated" },
  { surface: "Capital approval mutation",  impl: "createServerFn",     reason: "two-person sign-off enforced server-side" },
];

export const V20_POLISH_INVARIANTS = [
  "approver_id <> recommender_id on every HITL action",
  "capital actions > $25k require 2 distinct approvers",
  "trust_audit_log is append-only",
  "no autonomous dispatch — approved_at required before execution",
  "evidence freshness SLA enforced per surface",
  "board pack is read-only outside the GRC service role",
];

export const V20_POLISH_GUARDRAILS = [
  { guardrail: "No autonomous dispatch",          status: "enforced" },
  { guardrail: "No autonomous pricing changes",   status: "enforced" },
  { guardrail: "No autonomous billing actions",   status: "enforced" },
  { guardrail: "Two-person capital > $25k",       status: "enforced" },
  { guardrail: "Append-only audit log",           status: "enforced" },
  { guardrail: "Evidence retention ≥ 7y",         status: "enforced" },
];

export const V20_POLISH_OWNER_HEATMAP = [
  { owner: "CEO",          score: 95.4, open_hitl: 2, overdue: 0 },
  { owner: "CFO",          score: 97.4, open_hitl: 2, overdue: 0 },
  { owner: "CRO",          score: 96.1, open_hitl: 5, overdue: 1 },
  { owner: "CPO",          score: 95.8, open_hitl: 3, overdue: 0 },
  { owner: "CTO",          score: 98.4, open_hitl: 2, overdue: 0 },
  { owner: "CCO",          score: 96.0, open_hitl: 3, overdue: 0 },
  { owner: "GM Marketplace", score: 96.2, open_hitl: 3, overdue: 0 },
  { owner: "VP Partners",  score: 94.8, open_hitl: 4, overdue: 1 },
  { owner: "Head Audit",   score: 97.9, open_hitl: 2, overdue: 0 },
  { owner: "Head ML",      score: 95.4, open_hitl: 4, overdue: 0 },
];

export const V20_POLISH_DEMO = [
  { step: 1,  persona: "Board chair", surface: "Board intelligence",   action: "Review trust OS scorecard",       gate: "read-only" },
  { step: 2,  persona: "CEO",         surface: "Executive command",    action: "Triage top 5 exceptions",         gate: "HITL approve" },
  { step: 3,  persona: "CFO",         surface: "Capital trust",        action: "Approve $31k reallocation",       gate: "2-person sign-off" },
  { step: 4,  persona: "CRO",         surface: "Revenue assurance",    action: "Approve recovery playbook v3",    gate: "HITL approve" },
  { step: 5,  persona: "GM MP",       surface: "Marketplace scale",    action: "Approve EU promo lift",           gate: "HITL approve" },
  { step: 6,  persona: "CCO",         surface: "Customer trust",       action: "Escalate trust dip on top-10 acct", gate: "HITL approve" },
  { step: 7,  persona: "VP Partners", surface: "Partner trust",        action: "Approve LatAm SLA waiver",        gate: "HITL approve" },
  { step: 8,  persona: "Head ML",     surface: "Recommendation trust", action: "Quarantine drifting recommender", gate: "HITL approve" },
  { step: 9,  persona: "Head Audit",  surface: "Evidence governance",  action: "Verify append-only audit chain",  gate: "read-only" },
  { step: 10, persona: "GRC",         surface: "Approval trust",       action: "Confirm approver ≠ recommender",  gate: "invariant check" },
  { step: 11, persona: "Cat Lead",    surface: "Category trust",       action: "Approve leadership posture",      gate: "HITL approve" },
  { step: 12, persona: "Board chair", surface: "Board reporting",      action: "Sign trust report for the period", gate: "read-only" },
];

export const V20_POLISH_HORIZONS = [
  { horizon: "Q+1", theme: "Trust OS stabilization",      target: "≥ 98.5 trust score" },
  { horizon: "Q+2", theme: "Assist scale optimization",   target: "≥ 97 assist scale" },
  { horizon: "Q+3", theme: "Partner trust scale",         target: "≥ 96 partner trust" },
  { horizon: "Q+4", theme: "Predictive trust intel",      target: "≥ 95 predictive trust" },
  { horizon: "Y+2", theme: "Enterprise trust OS maturity",target: "phase-54 readiness gate" },
];
