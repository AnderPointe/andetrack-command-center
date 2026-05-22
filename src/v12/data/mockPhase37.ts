// Phase 37 — V12 enterprise commercial command. Mock-only.
// No autonomous dispatch. No certification/IPO/M&A/audit-completeness claims.

export const V12_FEATURE_MATRIX = [
  { area: "Enterprise Commercial Command",   ga: "ready", notes: "Cross-org commercial OS" },
  { area: "Revenue Quality Governance",      ga: "ready", notes: "Quality + concentration" },
  { area: "Global Account Expansion",        ga: "ready", notes: "Multi-region account map" },
  { area: "Strategic Account Governance",    ga: "ready", notes: "Sponsor + cadence matrix" },
  { area: "Enterprise Growth Discipline",    ga: "ready", notes: "10 growth motions tracked" },
  { area: "Deal Execution Control Tower",    ga: "ready", notes: "Stage + close plan gating" },
  { area: "Commercial Risk Control",         ga: "ready", notes: "16 risk categories" },
  { area: "Expansion & Retention Command",   ga: "ready", notes: "Renewal + expansion plays" },
  { area: "Trust-Led Procurement Mgmt.",     ga: "ready", notes: "Trust packet velocity" },
  { area: "Marketplace Revenue Governance",  ga: "beta",  notes: "Fees, liquidity, dispute" },
  { area: "API/EDI Revenue Governance",      ga: "beta",  notes: "Metered + EDI placeholders" },
  { area: "Partner Channel Maturity",        ga: "ready", notes: "Sourced/influenced + enablement" },
  { area: "Partner Revenue Governance",      ga: "beta",  notes: "Events + payout placeholders" },
  { area: "Commercial Forecast Governance",  ga: "placeholder", notes: "Cadence + variance only" },
  { area: "Capital-Grade Commercial Report", ga: "beta",  notes: "Diligence packet builder" },
  { area: "Board-Ready Revenue Reporting",   ga: "ready", notes: "Quarterly board pack" },
  { area: "Commercial Data Room Readiness",  ga: "beta",  notes: "Checklist + evidence gap" },
  { area: "Commercial Proof Governance",     ga: "ready", notes: "Approval + freshness" },
  { area: "Global Commercial Cadence",       ga: "ready", notes: "10 recurring cadences" },
  { area: "Long-Term Commercial Operating",  ga: "ready", notes: "12 functional ownership map" },
];

export const V12_DEFERRED = [
  "Fully autonomous deal closure or dispatch",
  "Final certification / audit-completeness claims",
  "Final IPO / acquisition readiness claims",
  "Insurance underwriting automation",
  "Full customs production workflows",
  "Final Android Auto / CarPlay approval claims",
  "Autonomous discounting without human approval",
];

// 2. Commercial command
export const V12_COMMAND_SCORE = {
  score: 89, trend_qoq: +4,
  enterprise_pipeline_usd: 64_200_000,
  strategic_pipeline_usd: 23_900_000,
  expansion_pipeline_usd: 18_400_000,
  renewal_pipeline_usd: 12_700_000,
  partner_sourced_usd: 9_300_000,
  marketplace_influenced_usd: 5_100_000,
  trust_influenced_usd: 14_800_000,
  blocked_procurement: 3, blocked_security: 1, blocked_technical: 2,
  velocity_days: 64, slippage_pct: 9, revenue_quality: 82,
};
export const V12_NEXT_BEST_ACTIONS = [
  { action: "Close AI disclosure gap on Atlas Logistics procurement packet", owner: "Security",   impact: "$1.8M ARR", due: "3d" },
  { action: "Expand CoPilot on NorthLine multi-region account",              owner: "CSM",        impact: "$420k ARR", due: "this Q" },
  { action: "Trigger save play on Pinnacle renewal (low CoPilot adoption)",  owner: "CSM Lead",   impact: "$640k ARR", due: "7d" },
  { action: "Resolve marketplace dispute backlog in EU-W",                   owner: "MP Ops",     impact: "fees uplift", due: "2w" },
  { action: "Approve partner-sourced uplift for Verda telematics",           owner: "Partner Lead", impact: "$900k", due: "this Q" },
];
export const V12_COMMAND_BLOCKERS = [
  { deal: "Atlas Logistics",   stage: "Procurement", blocker: "AI disclosure missing", owner: "Security",  age_days: 6 },
  { deal: "Pinewood Transit",  stage: "Procurement", blocker: "DPA redline",            owner: "Legal",     age_days: 11 },
  { deal: "Helios Freight",    stage: "Security",    blocker: "Pen-test summary",       owner: "Security",  age_days: 4 },
  { deal: "Cascade Logistics", stage: "Technical",   blocker: "EDI 214 mapping",        owner: "SE",        age_days: 9 },
  { deal: "Mistral Lines",     stage: "Technical",   blocker: "SSO scoping",            owner: "SE",        age_days: 3 },
];

// 3. Revenue quality
export const V12_REVENUE_QUALITY = {
  score: 82,
  rows: [
    { lever: "Recurring",   quality: 88, weight_pct: 62 },
    { lever: "Usage",       quality: 74, weight_pct: 11 },
    { lever: "Marketplace", quality: 71, weight_pct: 8 },
    { lever: "API",         quality: 69, weight_pct: 5 },
    { lever: "EDI (plchldr)", quality: 64, weight_pct: 3 },
    { lever: "Partner",     quality: 77, weight_pct: 7 },
    { lever: "Expansion",   quality: 84, weight_pct: 4 },
  ],
  concentration: [
    { axis: "Top-10 customer ARR share", value_pct: 38, status: "at_risk" },
    { axis: "Top product-line share",    value_pct: 54, status: "at_risk" },
    { axis: "Top region share",          value_pct: 47, status: "ready" },
  ],
  exceptions: [
    { item: "Billing dispute > 30d", count: 4, owner: "Billing" },
    { item: "Payment health (NA-E)", count: 2, owner: "Collections" },
    { item: "Implementation cost over budget", count: 3, owner: "PS" },
  ],
};

// 4. Global account expansion
export const V12_GLOBAL_EXPANSION = {
  total_global: 28, multi_region: 14, expansion_ready: 11, at_risk: 5, regulated: 9,
  rows: [
    { account: "NorthLine Freight",  regions: "NA-W,NA-E,EU-W", driver_adopt_pct: 88, portal_pct: 76, copilot_pct: 22, play: "CoPilot + MP" },
    { account: "Pinewood Transit",   regions: "NA-E,EU-W",      driver_adopt_pct: 71, portal_pct: 64, copilot_pct: 41, play: "API/EDI tier" },
    { account: "Atlas Logistics",    regions: "NA-W,LATAM",     driver_adopt_pct: 64, portal_pct: 58, copilot_pct: 18, play: "CoPilot pilot" },
    { account: "Cascade Logistics",  regions: "NA-W",           driver_adopt_pct: 82, portal_pct: 81, copilot_pct: 55, play: "Marketplace" },
    { account: "Helios Freight",     regions: "EU-W,EU-C",      driver_adopt_pct: 69, portal_pct: 62, copilot_pct: 28, play: "Premium SKU" },
  ],
};

// 5. Strategic account governance
export const V12_STRATEGIC_ACCOUNTS = [
  { account: "NorthLine Freight",  ae: "AE-12", csm: "CSM-04", sponsor: "VP-Ops",  health: 84, adopt: 81, support: "low",  blockers: 1, next: "QBR + CoPilot pilot", cadence: "Monthly" },
  { account: "Pinewood Transit",   ae: "AE-07", csm: "CSM-02", sponsor: "CIO",     health: 76, adopt: 72, support: "med",  blockers: 2, next: "EDI mapping review",   cadence: "Bi-weekly" },
  { account: "Atlas Logistics",    ae: "AE-09", csm: "CSM-01", sponsor: "COO",     health: 71, adopt: 64, support: "med",  blockers: 1, next: "Procurement unblock", cadence: "Weekly" },
  { account: "Cascade Logistics",  ae: "AE-04", csm: "CSM-03", sponsor: "VP-Tech", health: 88, adopt: 85, support: "low",  blockers: 0, next: "MP take-rate uplift",  cadence: "Monthly" },
];

// 6. Growth discipline
export const V12_GROWTH_MOTIONS = [
  { motion: "New enterprise acquisition", owner: "AE leadership", targets: 18, blockers: 3, risk: "med",  status: "on track" },
  { motion: "Strategic account expansion",owner: "CSM leadership",targets: 22, blockers: 4, risk: "med",  status: "on track" },
  { motion: "Product expansion",          owner: "RevOps",        targets: 14, blockers: 2, risk: "low",  status: "on track" },
  { motion: "Region expansion",           owner: "RegOps",        targets: 8,  blockers: 5, risk: "high", status: "at risk"  },
  { motion: "Marketplace expansion",      owner: "MP Ops",        targets: 12, blockers: 3, risk: "med",  status: "on track" },
  { motion: "API/EDI expansion",          owner: "Product",       targets: 9,  blockers: 4, risk: "med",  status: "at risk"  },
  { motion: "Partner channel expansion",  owner: "Partner Lead",  targets: 11, blockers: 2, risk: "low",  status: "on track" },
  { motion: "Trust-led procurement",      owner: "Security",      targets: 16, blockers: 5, risk: "med",  status: "on track" },
  { motion: "Renewal protection",         owner: "CSM Lead",      targets: 19, blockers: 2, risk: "low",  status: "on track" },
  { motion: "Churn prevention",           owner: "CSM Lead",      targets: 7,  blockers: 3, risk: "high", status: "at risk"  },
];

// 7. Deal execution
export const V12_DEAL_EXECUTION = {
  score: 81,
  rows: [
    { deal: "Atlas Logistics",   stage: "Procurement", days: 14, committee: "complete",     tech: "ok",  sec: "ok",  proc: "blocked", price: "approved", close_plan: 86 },
    { deal: "Helios Freight",    stage: "Security",    days: 9,  committee: "complete",     tech: "ok",  sec: "pending", proc: "n/a", price: "approved", close_plan: 74 },
    { deal: "Mistral Lines",     stage: "Technical",   days: 6,  committee: "in progress",  tech: "pending", sec: "n/a", proc: "n/a", price: "draft",    close_plan: 52 },
    { deal: "Pinewood Transit",  stage: "Procurement", days: 18, committee: "complete",     tech: "ok",  sec: "ok",  proc: "blocked", price: "approved", close_plan: 91 },
    { deal: "Cascade Logistics", stage: "Negotiation", days: 11, committee: "complete",     tech: "ok",  sec: "ok",  proc: "ok",      price: "approved", close_plan: 88 },
  ],
};

// 8. Commercial risk
export const V12_COMMERCIAL_RISK = [
  { risk: "Pipeline coverage",      likelihood: "med", impact: "high", owner: "RevOps",    mitigation: "Top-account plan" },
  { risk: "Deal slippage",          likelihood: "med", impact: "med",  owner: "AE Lead",   mitigation: "Close-plan gates" },
  { risk: "Procurement bottleneck", likelihood: "high",impact: "high", owner: "Security",  mitigation: "Trust packet refresh" },
  { risk: "Pricing leakage",        likelihood: "low", impact: "med",  owner: "Deal Desk", mitigation: "Discount caps" },
  { risk: "Customer concentration", likelihood: "med", impact: "high", owner: "CFO",       mitigation: "Diversification plan" },
  { risk: "Churn (low CoPilot)",    likelihood: "med", impact: "high", owner: "CSM",       mitigation: "Adoption plays" },
  { risk: "MP revenue volatility",  likelihood: "med", impact: "med",  owner: "MP Ops",    mitigation: "Take-rate floors" },
  { risk: "API/EDI billing exc.",   likelihood: "low", impact: "med",  owner: "Billing",   mitigation: "Exception SLA" },
  { risk: "Partner channel risk",   likelihood: "low", impact: "med",  owner: "Partner",   mitigation: "Enablement audits" },
  { risk: "Product readiness",      likelihood: "low", impact: "high", owner: "Product",   mitigation: "Roadmap alignment" },
  { risk: "Competitive risk",       likelihood: "med", impact: "high", owner: "PMM",       mitigation: "Win/loss insights" },
];

// 9. Expansion & retention
export const V12_RETENTION = {
  upcoming_renewals: 19, at_risk: 4, expansion_ready: 11, churn_risk: 3,
  rows: [
    { account: "Pinnacle Freight",  renewal_in_days: 42, risk: "high", reason: "Low CoPilot adoption", play: "Exec sponsor + adoption sprint" },
    { account: "NorthLine Freight", renewal_in_days: 84, risk: "low",  reason: "Strong adoption",      play: "Expand CoPilot + MP" },
    { account: "Atlas Logistics",   renewal_in_days: 61, risk: "med",  reason: "Procurement friction", play: "Trust packet refresh" },
    { account: "Helios Freight",    renewal_in_days: 98, risk: "low",  reason: "Stable usage",         play: "Premium SKU pitch" },
  ],
};

// 10. Trust-led procurement
export const V12_PROCUREMENT_MGMT = {
  in_stage: 14, trust_packets_fresh: 11, response_sla_pct: 92, accel_days_median: 11,
  rows: [
    { deal: "Atlas Logistics",   doc: "AI disclosure",  status: "missing", owner: "Security", age_days: 6 },
    { deal: "Pinewood Transit",  doc: "DPA",            status: "redline", owner: "Legal",    age_days: 11 },
    { deal: "Helios Freight",    doc: "Pen-test summary", status: "in-review", owner: "Security", age_days: 4 },
    { deal: "Mistral Lines",     doc: "SOC2 letter",    status: "approved", owner: "Security", age_days: 1 },
  ],
};

// 11. Marketplace revenue governance
export const V12_MP_REVENUE = {
  score: 76,
  metrics: { fees_usd_q: 1_240_000, carrier_subs_usd_q: 480_000, txn_fees_usd_q: 760_000, adoption_pct: 38, disputes_open: 6 },
  risks: [
    { risk: "EU-W liquidity",    severity: "med",  owner: "MP Ops" },
    { risk: "Dispute backlog",   severity: "med",  owner: "MP Ops" },
    { risk: "Carrier compliance",severity: "low",  owner: "Trust" },
  ],
};

// 12. API/EDI revenue governance
export const V12_API_EDI = {
  api: { plans: 4, mau: 312, overage_usd_q: 84_000, support_tickets: 41 },
  edi: { txns_q: 218_400, support_tickets: 22 },
  exceptions: [
    { item: "Rate-limit breach > 5/day", count: 3, owner: "Product" },
    { item: "Metered overage dispute",   count: 2, owner: "Billing" },
  ],
};

// 13. Partner channel maturity
export const V12_PARTNER_CHANNEL = {
  score: 78,
  sourced_pipeline_usd: 9_300_000, influenced_pipeline_usd: 14_200_000,
  joint_customers: 22, partners_active: 14, enablement_gaps: 3,
  partners: [
    { partner: "Verda Telematics", role: "Sourced",    pipeline_usd: 2_400_000, enablement: 92, risk: "low" },
    { partner: "Routelogic API",   role: "Influenced", pipeline_usd: 1_800_000, enablement: 71, risk: "med" },
    { partner: "EDI Bridge Co",    role: "Sourced",    pipeline_usd: 1_100_000, enablement: 84, risk: "low" },
  ],
};

// 14. Partner revenue governance
export const V12_PARTNER_REVENUE = {
  events_q: 86, share_usd_q: 320_000, approvals_pending: 4, evidence_attached_pct: 91,
  rows: [
    { partner: "Verda Telematics", event: "Sourced ARR",    amount_usd: 180_000, status: "approved" },
    { partner: "Routelogic API",   event: "Referral ARR",   amount_usd: 64_000,  status: "review"   },
    { partner: "EDI Bridge Co",    event: "Implementation", amount_usd: 22_000,  status: "approved" },
  ],
};

// 15. Forecast governance (placeholder — no accuracy claim)
export const V12_FORECAST = {
  confidence_pct: 71,
  rows: [
    { stream: "Pipeline forecast",   owner: "RevOps",   confidence: 74, cadence: "Weekly"   },
    { stream: "Expansion forecast",  owner: "CSM Lead", confidence: 68, cadence: "Bi-weekly"},
    { stream: "Renewal forecast",    owner: "CSM Lead", confidence: 78, cadence: "Monthly"  },
    { stream: "Marketplace revenue", owner: "MP Ops",   confidence: 62, cadence: "Monthly"  },
    { stream: "API/EDI revenue",     owner: "Product",  confidence: 59, cadence: "Monthly"  },
    { stream: "Partner revenue",     owner: "Partner",  confidence: 64, cadence: "Monthly"  },
  ],
};

// 16. Capital-grade reporting (diligence packet placeholder)
export const V12_CAPITAL_REPORT = {
  sections: [
    { section: "Revenue quality review",    readiness: 84, owner: "RevOps" },
    { section: "Customer concentration",    readiness: 79, owner: "CFO" },
    { section: "Expansion pipeline",        readiness: 86, owner: "CSM Lead" },
    { section: "Marketplace metrics",       readiness: 71, owner: "MP Ops" },
    { section: "Partner channel metrics",   readiness: 74, owner: "Partner" },
    { section: "Deal velocity",             readiness: 88, owner: "AE Lead" },
    { section: "Commercial risk register",  readiness: 82, owner: "RevOps" },
    { section: "Procurement blocker review",readiness: 76, owner: "Security" },
  ],
};

// 17. Board-ready revenue report
export const V12_BOARD_REPORT = [
  { section: "Enterprise pipeline",           status: "ready",   note: "$64.2M, +9% QoQ" },
  { section: "Revenue quality",               status: "ready",   note: "82% — concentration watch" },
  { section: "Strategic account expansion",   status: "ready",   note: "11 ready, 5 at risk" },
  { section: "Renewal & churn risk",          status: "at_risk", note: "1 high-risk renewal" },
  { section: "Marketplace revenue gov.",      status: "ready",   note: "Take-rate stable" },
  { section: "API/EDI revenue gov.",          status: "ready",   note: "Early but growing" },
  { section: "Partner revenue gov.",          status: "ready",   note: "Sourced ARR +18%" },
  { section: "Trust-led procurement",         status: "at_risk", note: "3 deals blocked" },
  { section: "Deal execution",                status: "ready",   note: "Velocity 64d" },
  { section: "Pricing / deal desk exceptions",status: "ready",   note: "Discount discipline 91%" },
  { section: "Commercial risks",              status: "ready",   note: "16 tracked" },
  { section: "Decisions needed",              status: "ready",   note: "3 escalations" },
];
export const V12_BOARD_DECISIONS = [
  { decision: "Approve EU-W expansion plan",        owner: "Board", due: "this Q" },
  { decision: "Approve partner-sourced uplift",     owner: "CRO",   due: "this Q" },
  { decision: "Approve concentration mitigation",   owner: "CFO",   due: "next Q" },
];

// 18. Data room readiness
export const V12_DATA_ROOM = [
  { item: "Pipeline summary placeholder",      status: "ready",        evidence: "linked" },
  { item: "Customer metrics",                  status: "ready",        evidence: "linked" },
  { item: "Revenue quality metrics",           status: "ready",        evidence: "linked" },
  { item: "Expansion metrics",                 status: "ready",        evidence: "linked" },
  { item: "Renewal/churn risk",                status: "ready",        evidence: "linked" },
  { item: "Marketplace metrics",               status: "ready",        evidence: "linked" },
  { item: "API/EDI metrics",                   status: "in_progress",  evidence: "partial" },
  { item: "Partner channel metrics",           status: "ready",        evidence: "linked" },
  { item: "Proof assets",                      status: "ready",        evidence: "linked" },
  { item: "Pricing/package overview",          status: "ready",        evidence: "linked" },
  { item: "Procurement/trust assets",          status: "ready",        evidence: "linked" },
  { item: "Board revenue reports",             status: "ready",        evidence: "linked" },
  { item: "Commercial risk register",          status: "ready",        evidence: "linked" },
  { item: "Sales process documentation",       status: "in_progress",  evidence: "partial" },
  { item: "Customer references (placeholder)", status: "placeholder",  evidence: "pending" },
];

// 19. Proof governance
export const V12_PROOF_GOVERNANCE = [
  { proof: "NorthLine driver adoption",  type: "Driver",     status: "approved", freshness_d: 22, deal_uses: 7 },
  { proof: "Cascade marketplace ROI",    type: "Marketplace",status: "approved", freshness_d: 41, deal_uses: 5 },
  { proof: "Atlas CoPilot pilot",        type: "CoPilot",    status: "review",   freshness_d: 8,  deal_uses: 2 },
  { proof: "Helios support reliability", type: "Support",    status: "approved", freshness_d: 64, deal_uses: 3 },
  { proof: "Pinewood EDI integration",   type: "Integration",status: "approved", freshness_d: 51, deal_uses: 4 },
];

// 20. Commercial cadences
export const V12_CADENCES = [
  { cadence: "Daily commercial blocker review", owner: "RevOps",      attendees: "AE Lead, Deal Desk, Security" },
  { cadence: "Weekly pipeline review",          owner: "CRO",         attendees: "AE Leads, RevOps" },
  { cadence: "Weekly expansion review",         owner: "CSM Lead",    attendees: "CSMs, RevOps" },
  { cadence: "Weekly renewal risk review",      owner: "CSM Lead",    attendees: "CSMs, CSM Ops" },
  { cadence: "Weekly procurement review",       owner: "Security",    attendees: "Security, Legal, AE" },
  { cadence: "Weekly partner channel review",   owner: "Partner Lead",attendees: "Partner Ops, AE" },
  { cadence: "Weekly marketplace revenue rev.", owner: "MP Ops",      attendees: "MP Ops, Finance" },
  { cadence: "Monthly pricing review",          owner: "Deal Desk",   attendees: "CRO, CFO, RevOps" },
  { cadence: "Monthly board revenue prep",      owner: "RevOps",      attendees: "CRO, CFO, CEO" },
  { cadence: "Quarterly commercial strategy",   owner: "CRO",         attendees: "Exec, Board" },
];

// 21. Operating model
export const V12_OPERATING_MODEL = [
  { fn: "Enterprise sales",         owner: "VP Sales",  maturity: 82, kpi: "ARR booked" },
  { fn: "Customer success",         owner: "VP CS",     maturity: 79, kpi: "NRR" },
  { fn: "Revenue operations",       owner: "Head RevOps", maturity: 84, kpi: "Forecast confidence" },
  { fn: "Sales engineering",        owner: "Head SE",   maturity: 74, kpi: "SE cycle time" },
  { fn: "Deal desk",                owner: "Deal Desk Lead", maturity: 86, kpi: "SLA hit" },
  { fn: "Procurement/security spt.",owner: "CISO",      maturity: 81, kpi: "Trust packet cycle" },
  { fn: "Partner channel",          owner: "Partner Lead",maturity: 72, kpi: "Sourced ARR" },
  { fn: "Marketplace rev ops",      owner: "MP Ops Lead", maturity: 71, kpi: "Take rate" },
  { fn: "API/EDI rev ops",          owner: "Product",   maturity: 64, kpi: "Metered ARR" },
  { fn: "Pricing governance",       owner: "CRO",       maturity: 83, kpi: "Discount discipline" },
  { fn: "Commercial analytics",     owner: "RevOps",    maturity: 78, kpi: "Insight cycle" },
  { fn: "Board reporting",          owner: "CFO",       maturity: 88, kpi: "Pack quality" },
];

// 22. Reports
export const V12_REPORTS = [
  "Enterprise Commercial Command","Revenue Quality Governance","Global Account Expansion",
  "Strategic Account Governance","Enterprise Growth Discipline","Deal Execution Control",
  "Commercial Risk Control","Expansion & Retention","Trust-Led Procurement",
  "Marketplace Revenue Governance","API/EDI Revenue Governance","Partner Channel Maturity",
  "Partner Revenue Governance","Commercial Forecast (placeholder)","Capital-Grade Commercial",
  "Board-Ready Revenue","Commercial Data Room","Commercial Proof Governance",
  "Global Commercial Cadence","Long-Term Commercial Operating Model",
];

// Backend boundary + RLS examples (V12)
export const V12_BACKEND_BOUNDARY = [
  { kind: "createServerFn", name: "calculate-v12-commercial-command-score", caller: "RevOps UI",      auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "generate-board-ready-revenue-report",    caller: "Board admin UI", auth: "requireSupabaseAuth + board role" },
  { kind: "createServerFn", name: "calculate-revenue-quality-governance",   caller: "RevOps UI",      auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "calculate-deal-execution-score",         caller: "AE Lead UI",     auth: "requireSupabaseAuth" },
  { kind: "createServerFn", name: "generate-commercial-proof-governance",   caller: "PMM UI",         auth: "requireSupabaseAuth" },
  { kind: "/api/public/*",  name: "/api/public/partner-revenue-webhook",    caller: "Partner system", auth: "HMAC signature" },
  { kind: "/api/public/*",  name: "/api/public/marketplace-settlement-hook",caller: "MP processor",   auth: "HMAC signature" },
];

export const V12_RLS_EXAMPLES = [
  { table: "v12_commercial_command_scores",        policy: "platform read",  expression: "is_platform_owner(auth.uid())" },
  { table: "strategic_account_governance_records", policy: "assigned only",  expression: "company_id = current_company() AND (ae_id = auth.uid() OR csm_id = auth.uid() OR has_role(auth.uid(), current_company(), 'admin'))" },
  { table: "board_revenue_reports_v12",            policy: "board/exec read",expression: "company_id = current_company() AND has_role(auth.uid(), current_company(), 'owner')" },
  { table: "commercial_data_room_items",           policy: "exec/admin",     expression: "company_id = current_company() AND has_role(auth.uid(), current_company(), 'admin')" },
  { table: "commercial_proof_governance_records",  policy: "approved public",expression: "status = 'approved' OR has_role(auth.uid(), current_company(), 'admin')" },
  { table: "partner_revenue_governance_records",   policy: "billing read",   expression: "company_id = current_company() AND has_role(auth.uid(), current_company(), 'dispatcher')" },
  { table: "marketplace_revenue_governance_records", policy: "MP ops only",  expression: "company_id = current_company() AND has_role(auth.uid(), current_company(), 'dispatcher')" },
];

// Demo flow
export const V12_DEMO = [
  { role: "CRO",       step: "Open Enterprise Commercial Command — score 89%, 3 procurement-blocked deals, 2 expansion-ready accounts, 1 at-risk renewal." },
  { role: "RevOps",    step: "Open Revenue Quality Governance — quality 82%, concentration moderate, MP improving, API early but growing." },
  { role: "CCO",       step: "Open Global Account Expansion — NorthLine multi-region, high driver+portal adoption, low CoPilot → recommend CoPilot + MP." },
  { role: "AE Lead",   step: "Open Deal Execution Control Tower — Atlas in Procurement, buying committee complete, AI disclosure missing." },
  { role: "Partner",   step: "Open Partner Channel Maturity — sourced pipeline up, Verda high value, Routelogic has enablement gap." },
  { role: "CSM Lead",  step: "Open Expansion & Retention — Pinnacle renewal at risk (low CoPilot), trigger save play with exec sponsor." },
  { role: "Security",  step: "Open Trust-Led Procurement — AI disclosure missing on Atlas, refresh trust packet within 3 days." },
  { role: "MP Ops",    step: "Open Marketplace Revenue Governance — EU-W liquidity moderate, dispute backlog open." },
  { role: "Product",   step: "Open API/EDI Revenue Governance — metered tier tuning, 3 rate-limit breaches, 2 overage disputes." },
  { role: "CFO",       step: "Open Capital-Grade Commercial Reporting — diligence packet drafted, evidence linked, concentration tagged." },
  { role: "Board",     step: "Open Board-Ready Revenue Reporting — 12 sections, 3 decisions queued, action tracker live." },
  { role: "CEO",       step: "Confirm long-term operating model coverage across 12 functions." },
];
export const V12_DEMO_CLOSEOUT = [
  { role: "Security", commitment: "Refresh AI disclosure on Atlas trust packet", due: "3d" },
  { role: "CSM Lead", commitment: "Launch save play on Pinnacle renewal",         due: "7d" },
  { role: "MP Ops",   commitment: "Close EU-W dispute backlog",                   due: "2w" },
  { role: "Partner",  commitment: "Approve Verda partner-sourced uplift",         due: "this Q" },
  { role: "CFO",      commitment: "Sign-off diligence packet draft",              due: "next Q" },
];
export const V12_ROLE_GUIDANCE = [
  { role: "CRO",      focus: "Pipeline, blockers, board narrative",              tone: "violet" },
  { role: "RevOps",   focus: "Revenue quality, governance, forecast cadence",    tone: "sky" },
  { role: "CCO",      focus: "Global account expansion, multi-region readiness", tone: "emerald" },
  { role: "AE Lead",  focus: "Deal execution gates, close plan completeness",    tone: "amber" },
  { role: "CSM Lead", focus: "Renewal risk + expansion plays",                   tone: "rose" },
  { role: "Partner",  focus: "Channel maturity + revenue governance",            tone: "violet" },
];

// Phase 38 plan teaser
export const V12_PHASE38_TEASER = [
  "V12.5 capital-grade enterprise growth operations",
  "Commercial auditability evidence chains",
  "Global revenue intelligence (placeholder, no accuracy claim)",
  "Partner channel optimization with payout governance",
  "Executive growth stewardship cadence",
];
