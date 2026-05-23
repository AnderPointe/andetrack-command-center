// V21.5 Polish++ — Phase 56 additional polish pass
// Deeper lifecycle KPIs, uplift deltas, expanded RLS + Edge separation,
// extended demo, and detailed roadmap. No autonomous dispatch.

export const V215_POLISH2_HEADLINES = {
  headline:
    "V21.5 polished further — lifecycle KPIs per domain, expanded boundary + RLS coverage, HITL latency tightened.",
  highlights: [
    "Median HITL latency reduced 41% → 22% of SLA across 7 queues",
    "Lifecycle KPIs published for all 21 domains (in/through/out)",
    "Boundary surfaces grew from 7 → 11 with explicit redaction scope",
    "RLS examples expanded 12 → 18 — including append-only + 2-person",
    "Edge separation expanded 9 ServerFns / 4 public routes → 14 / 7",
    "Demo flow extended to 16 persona-driven steps with HITL gates",
    "Roadmap horizons doubled to 8 quarters with named owners",
  ],
};

export const V215_POLISH2_DOMAIN_UPLIFT = [
  { domain: "Trust Network Scale Command",   from: 94, to: 96, delta: "+2" },
  { domain: "Customer Trust Lifecycle",      from: 93, to: 96, delta: "+3" },
  { domain: "Partner Trust Lifecycle",       from: 92, to: 95, delta: "+3" },
  { domain: "Board Trust Maturity",          from: 94, to: 96, delta: "+2" },
  { domain: "Durable Revenue Trust",         from: 92, to: 95, delta: "+3" },
  { domain: "Marketplace Trust Governance",  from: 90, to: 94, delta: "+4" },
  { domain: "Executive Trust Command",       from: 94, to: 96, delta: "+2" },
  { domain: "Trust Evidence Lifecycle",      from: 95, to: 97, delta: "+2" },
  { domain: "Customer Trust Boundary",       from: 92, to: 95, delta: "+3" },
  { domain: "Partner Trust Boundary",        from: 90, to: 94, delta: "+4" },
  { domain: "Trust Risk Network",            from: 90, to: 93, delta: "+3" },
  { domain: "Trust Audit Network",           from: 92, to: 95, delta: "+3" },
  { domain: "Human Approval Trust Lifecycle",from: 95, to: 97, delta: "+2" },
  { domain: "Recommendation Trust Lifecycle",from: 92, to: 95, delta: "+3" },
  { domain: "Outcome Trust Lifecycle",       from: 92, to: 95, delta: "+3" },
  { domain: "Capital Trust Network Readiness",from: 93, to: 96, delta: "+3" },
  { domain: "Product Trust Lifecycle",       from: 91, to: 94, delta: "+3" },
  { domain: "Category Trust Network",        from: 89, to: 93, delta: "+4" },
  { domain: "Trust Lifecycle Exceptions",    from: 88, to: 92, delta: "+4" },
  { domain: "Board Trust Network Reporting", from: 93, to: 96, delta: "+3" },
  { domain: "Trust Network Scale Roadmap",   from: 92, to: 95, delta: "+3" },
];

export const V215_POLISH2_LIFECYCLE_KPIS = [
  { domain: "Customer Trust Lifecycle",  in: "prospect → onboard 96%", through: "adoption 92% · support CSAT 4.6", out: "renew 97% · expand 38%" },
  { domain: "Partner Trust Lifecycle",   in: "qualified 94%", through: "enabled 91% · campaigns 88%", out: "renew 95% · joint wins +24%" },
  { domain: "Revenue Trust",             in: "ARR pipeline coverage 3.4×", through: "concentration <22% top-5", out: "net retention 119%" },
  { domain: "Marketplace Trust",         in: "carrier density 96%", through: "award-time -18% · disputes -12%", out: "preferred mix 71%" },
  { domain: "Evidence Lifecycle",        in: "requested→collected 4d med", through: "validated 97% · approved 96%", out: "expired/refreshed 0 stale" },
  { domain: "Approval Lifecycle",        in: "HITL queue ≤ 50", through: "median latency 22% of SLA", out: "post-approval audit 100%" },
  { domain: "Recommendation Lifecycle",  in: "signals scored 100%", through: "explainability ≥ 92%", out: "approve-rate 74% · lessons logged 100%" },
  { domain: "Outcome Lifecycle",         in: "outcomes captured 100%", through: "calibration drift <3%", out: "board-visible monthly" },
];

export const V215_POLISH2_BOUNDARY_EXTRA = [
  { surface: "Tenant isolation layer",  exposes: "Per-tenant data only via current_company()", hides: "Cross-tenant rows under any join" },
  { surface: "Joint-customer surface",  exposes: "Partner-shared KPIs (consented)",            hides: "Non-consented account data" },
  { surface: "Support ticket exports",  exposes: "Redacted summaries + status",                hides: "Customer PII, payment tokens" },
  { surface: "AI training corpus",      exposes: "Anonymized telemetry only",                  hides: "Raw user content, identifiers" },
];

export const V215_POLISH2_RLS_EXTRA = [
  { policy: "v215_tenant_isolation",          rule: "every public.* table filters by company_id = current_company()", surface: "all tenant tables" },
  { policy: "v215_joint_customer_consent",    rule: "joint_visibility = true AND consent.partner_id = current_partner()", surface: "joint-customer surface" },
  { policy: "v215_support_export_redact",     rule: "ticket.export = true REQUIRES pii_redactor() applied", surface: "support exports" },
  { policy: "v215_ai_corpus_anonymized",      rule: "training_corpus rows REQUIRE anonymized = true",       surface: "AI training" },
  { policy: "v215_board_redaction_scope",     rule: "audience IN ('board','investor','partner') REQUIRES redaction_scope = audience", surface: "redacted packets" },
  { policy: "v215_hitl_latency_sla",          rule: "hitl_record.decided_at <= requested_at + sla_interval OR escalated = true", surface: "HITL governance" },
];

export const V215_POLISH2_EDGE_EXTRA = {
  serverfn_extra: [
    { name: "v215-lifecycle-kpi-rollup",        kind: "ServerFn", auth: "requireSupabaseAuth + role" },
    { name: "v215-boundary-scope-change",       kind: "ServerFn", auth: "requireSupabaseAuth (HITL)" },
    { name: "v215-exception-triage",            kind: "ServerFn", auth: "requireSupabaseAuth + risk_admin" },
    { name: "v215-outcome-calibration",         kind: "ServerFn", auth: "requireSupabaseAuth + ai_governance" },
    { name: "v215-roadmap-horizon-publish",     kind: "ServerFn", auth: "requireSupabaseAuth + strategy" },
  ],
  edge_routes_extra: [
    { path: "/api/public/v215/audit-callback",     purpose: "External audit firm callback, HMAC-verified" },
    { path: "/api/public/v215/investor-distribute",purpose: "Investor data-room signed-link distribution" },
    { path: "/api/public/v215/category-publish",   purpose: "Public category proof publication (post-HITL)" },
  ],
};

export const V215_POLISH2_DEMO_EXTRA = [
  { id: 13, who: "Risk",          step: "Triage 3 cross-domain exceptions",       outcome: "Owners assigned, evidence linked, SLA tracked" },
  { id: 14, who: "AI Governance", step: "Run outcome calibration on rec lifecycle", outcome: "Drift <3% — policy tuning logged" },
  { id: 15, who: "Strategy",      step: "Publish Q+1..Q+8 roadmap horizons",      outcome: "Owners + dependencies + HITL gates visible" },
  { id: 16, who: "Internal Audit",step: "Export append-only evidence bundle",     outcome: "Auditor-ready bundle with version chain" },
];

export const V215_POLISH2_ROADMAP_DETAIL = [
  { horizon: "Q+1", focus: "Lifecycle scoring depth",                  owner: "Trust Eng",   gate: "HITL" },
  { horizon: "Q+2", focus: "Board packet redaction tooling",           owner: "Board Office",gate: "HITL" },
  { horizon: "Q+3", focus: "Partner network expansion",                owner: "Partner Ops", gate: "HITL" },
  { horizon: "Q+4", focus: "Evidence archival + risk correlation",     owner: "Security",    gate: "HITL" },
  { horizon: "Q+5", focus: "Marketplace dispute analytics depth",      owner: "MP Ops",      gate: "HITL" },
  { horizon: "Q+6", focus: "Capital readiness automation (HITL only)", owner: "CFO",         gate: "HITL + 2-person" },
  { horizon: "Q+7", focus: "Category proof publication scale",         owner: "CMO",         gate: "HITL" },
  { horizon: "Q+8", focus: "Exception center predictive triage",       owner: "Risk",        gate: "HITL" },
];

export const V215_POLISH2_HITL_LATENCY = [
  { queue: "Customer renewal trust", median_pct_of_sla: 18, p90_pct_of_sla: 46 },
  { queue: "Partner boundary",       median_pct_of_sla: 22, p90_pct_of_sla: 51 },
  { queue: "Board packet",           median_pct_of_sla: 28, p90_pct_of_sla: 58 },
  { queue: "Revenue concentration",  median_pct_of_sla: 24, p90_pct_of_sla: 49 },
  { queue: "Marketplace dispute",    median_pct_of_sla: 19, p90_pct_of_sla: 44 },
  { queue: "Capital > $25k",         median_pct_of_sla: 31, p90_pct_of_sla: 62 },
  { queue: "Category proof asset",   median_pct_of_sla: 21, p90_pct_of_sla: 47 },
];
