// Phase 35 — V11 mock data. Mock-only. No autonomous dispatch. No certification, audit,
// IPO/M&A, Android Auto/CarPlay or financial-accuracy claims.
import type { ExecHeadline, OverlayItem } from "@/components/v8/ui-bits";

export const V11_REVENUE_ENGINE = { score: 86, trend_pts: 6, label: "Maturing" };

export const V11_FEATURE_MATRIX = [
  { area: "Enterprise revenue engine",           state: "v11", owner: "CRO" },
  { area: "Strategic account expansion",         state: "v11", owner: "CS" },
  { area: "Enterprise account planning",         state: "v11", owner: "CS" },
  { area: "Expansion playbooks",                 state: "v11", owner: "CS Ops" },
  { area: "Platform monetization maturity",      state: "v11", owner: "CFO" },
  { area: "Pricing & packaging maturity",        state: "v11", owner: "Rev Ops" },
  { area: "Deal desk maturity",                  state: "v11", owner: "Rev Ops" },
  { area: "Trust-led enterprise sales",          state: "v11", owner: "Security" },
  { area: "Procurement acceleration maturity",   state: "v11", owner: "Security" },
  { area: "Customer proof-led selling",          state: "v11", owner: "PMM" },
  { area: "Marketplace monetization execution",  state: "v11", owner: "MP Lead" },
  { area: "API/EDI monetization execution",      state: "v11", owner: "Platform" },
  { area: "Global partner commercialization",    state: "v11", owner: "Partner" },
  { area: "Partner revenue execution",           state: "v11", owner: "Partner Ops" },
  { area: "Sales engineering OS",                state: "v11", owner: "SE Lead" },
  { area: "Revenue operations governance",       state: "v11", owner: "Rev Ops" },
  { area: "Renewal & expansion governance",      state: "v11", owner: "CS" },
  { area: "Revenue risk governance",             state: "v11", owner: "Risk" },
  { area: "Board-level revenue reporting",       state: "v11", owner: "CEO" },
  { area: "Long-term monetization roadmap",      state: "v11", owner: "CFO" },
];

export const V11_DEFERRED = [
  "Fully autonomous dispatch",
  "Final certification claims without evidence",
  "Final IPO/M&A claims",
  "Final audited financial claims",
  "Customs production workflows",
  "International tax automation",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "Final Android Auto / CarPlay claims",
];

// ---- Enterprise Revenue Engine Command Center ----
export const V11_PIPELINE_HEALTH = {
  pipeline_value_band: "$8M-$12M",
  qualified_band: "$5.5M-$7.5M",
  enterprise_opps: 14, strategic_accounts: 9, expansion_opps: 6, renewal_opps: 5,
  procurement_stage: 3, security_stage: 4, pilot_stage: 2, blocked: 3,
  deal_velocity_days: 58, win_prob_avg: 38,
  partner_sourced: 4, marketplace_sourced: 2, trust_accelerated_30d: 5,
};

export const V11_ENTERPRISE_OPPS = [
  { id: "OPP-601", account: "Northwind Logistics", stage: "Security Review",  arr_band: "$250-500k", win_prob: 55, sponsor: "CIO",      next: "API security walk-through",  blocker: "API rate limits" },
  { id: "OPP-602", account: "Atlas Freight",       stage: "Procurement",      arr_band: "$500k-1M",  win_prob: 60, sponsor: "VP Ops",   next: "DPA redline",                blocker: "DPA terms" },
  { id: "OPP-603", account: "Heartland Carriers",  stage: "Pilot",            arr_band: "$100-250k", win_prob: 70, sponsor: "COO",      next: "Scorecard review",           blocker: null },
  { id: "OPP-604", account: "PacificMove",         stage: "Tech Validation",  arr_band: "$250-500k", win_prob: 35, sponsor: "Dir Log",  next: "POC plan",                   blocker: "Buying committee gap" },
  { id: "OPP-605", account: "Sunbelt Express",     stage: "Expansion",        arr_band: "+$300k",    win_prob: 75, sponsor: "COO",      next: "Expansion proposal",         blocker: null },
  { id: "OPP-606", account: "GreatPlains Freight", stage: "Discovery",        arr_band: "$100-250k", win_prob: 25, sponsor: "VP Sales", next: "Discovery #2",               blocker: null },
];

export const V11_BLOCKED_DEALS = [
  { deal: "Atlas Freight",       blocker: "DPA terms",        owner: "Legal",   age_days: 12, severity: "high" },
  { deal: "Northwind Logistics", blocker: "API rate limits",  owner: "SE Lead", age_days: 6,  severity: "med" },
  { deal: "PacificMove",         blocker: "Buying committee", owner: "AE",      age_days: 8,  severity: "med" },
];

export const V11_NEXT_BEST_ACTIONS = [
  { role: "CRO",     action: "Escalate Atlas DPA with Legal sponsor",          impact: "$500k-1M ARR" },
  { role: "SE Lead", action: "Run API rate-limit workshop with Northwind",     impact: "Unblock OPP-601" },
  { role: "CS",      action: "Convert Heartland pilot → expansion proposal",   impact: "+$120k ARR" },
  { role: "AE",      action: "Identify Finance sponsor at PacificMove",        impact: "Reopen OPP-604" },
];

// ---- Strategic Account Expansion ----
export const V11_STRATEGIC_ACCOUNTS = [
  { account: "Sunbelt Express",    tier: "Platinum", products: "Core+Portal+CoPilot", driver_adopt: 92, dispatcher_adopt: 88, portal_adopt: 91, mp_adopt: 24, api_adopt: 67, copilot_adopt: 71, renewal: "2026-Q4", churn_risk: "low",  expansion: "Marketplace, EDI" },
  { account: "Northwind Logistics",tier: "Gold",     products: "Core+API",            driver_adopt: 78, dispatcher_adopt: 82, portal_adopt: 0,  mp_adopt: 0,  api_adopt: 88, copilot_adopt: 0,  renewal: "2026-Q3", churn_risk: "med",  expansion: "Portal, CoPilot" },
  { account: "Atlas Freight",      tier: "Gold",     products: "Core+Portal",         driver_adopt: 84, dispatcher_adopt: 80, portal_adopt: 72, mp_adopt: 12, api_adopt: 0,  copilot_adopt: 0,  renewal: "2026-Q4", churn_risk: "low",  expansion: "CoPilot, API" },
  { account: "Heartland Carriers", tier: "Silver",   products: "Core",                driver_adopt: 65, dispatcher_adopt: 70, portal_adopt: 0,  mp_adopt: 0,  api_adopt: 0,  copilot_adopt: 0,  renewal: "2027-Q1", churn_risk: "med",  expansion: "Portal, premium support" },
  { account: "PacificMove",        tier: "Gold",     products: "Core+Portal+API",     driver_adopt: 71, dispatcher_adopt: 76, portal_adopt: 58, mp_adopt: 0,  api_adopt: 62, copilot_adopt: 0,  renewal: "2026-Q4", churn_risk: "high", expansion: "Premium support, CoPilot" },
];

// ---- Enterprise account planning ----
export const V11_ACCOUNT_PLAN_SAMPLE = {
  account: "Sunbelt Express",
  overview: "Regional LTL carrier, 1,200 drivers, expanding SE corridor.",
  goals: ["Reduce dwell 12%", "Cut driver paperwork 50%", "Open SE marketplace lane"],
  pain_points: ["Manual POD reconciliation", "Limited carrier liquidity in SE"],
  current_products: ["Core", "Customer Portal", "CoPilot"],
  buying_committee: [
    { role: "Operations",    contact: "S. Patel",  status: "engaged" },
    { role: "IT",            contact: "J. Romero", status: "engaged" },
    { role: "Security",      contact: "K. Liu",    status: "engaged" },
    { role: "Finance",       contact: "M. Greene", status: "pending"  },
    { role: "Procurement",   contact: "T. Bell",   status: "engaged" },
  ],
  exec_sponsor: "COO — D. Morgan",
  tech_sponsor: "Director Eng — R. Yu",
  success_metrics: ["Dwell -12%", "Driver SAT +10pts", "MP lane volume +25%"],
  open_risks: ["MP liquidity SE", "Premium support tier capacity"],
  expansion_opportunities: ["Marketplace", "EDI", "Telematics add-on"],
  renewal_plan: "Renewal 2026-Q4; pre-RFP cycle in Q2",
  next_steps: [
    { step: "Marketplace executive briefing",    owner: "CS Lead",  due: "2026-Q2 wk 4" },
    { step: "EDI scoping with IT",               owner: "SE",       due: "2026-Q2 wk 6" },
    { step: "Renewal pre-read",                  owner: "AE",       due: "2026-Q3 wk 2" },
  ],
};

// ---- Expansion playbooks ----
export const V11_EXPANSION_PLAYBOOKS = [
  { name: "Add more drivers",       trigger: "Seat utilization >85%",       value: "Operational scaling without new TMS",  proof: "Driver SAT, dwell ↓", stakeholders: "Ops, IT",          risk: "low",  steps: "Qualify → seat plan → expansion order" },
  { name: "Add more vehicles",      trigger: "Fleet additions",             value: "Per-vehicle scaling, no rip-replace",  proof: "Telematics reliability", stakeholders: "Ops, Maint",      risk: "low",  steps: "Qualify → vehicle map → expansion order" },
  { name: "Add customer portal",    trigger: "Customer ETA complaints",     value: "Self-serve visibility, fewer tickets", proof: "Ticket ↓, NPS ↑",        stakeholders: "Ops, IT",          risk: "low",  steps: "Discovery → branded portal → enable" },
  { name: "Add CoPilot",            trigger: "Manual workflow burden",      value: "Driver/dispatcher productivity",       proof: "Time saved per shift",   stakeholders: "Ops, IT, Sec",     risk: "med",  steps: "AI gov review → pilot → rollout" },
  { name: "Add marketplace",        trigger: "Lane-fill shortfall",         value: "Carrier liquidity in target lanes",    proof: "TTA, lane fill",         stakeholders: "Ops, Finance",     risk: "med",  steps: "Lane analysis → carrier seeding → go-live" },
  { name: "Add API access",         trigger: "Custom integration ask",      value: "Integrate with WMS/ERP/OMS",           proof: "Integration uptime",     stakeholders: "IT, Sec",          risk: "med",  steps: "API security review → keys → integration" },
  { name: "Add EDI workflows",      trigger: "Customer EDI mandate",        value: "Enterprise customer onboarding",       proof: "EDI 990/214 reliability",stakeholders: "Ops, IT, Customer",risk: "med",  steps: "EDI scoping → mapping → go-live" },
  { name: "Add telematics",         trigger: "Insurance/fleet KPI need",    value: "Driver scorecards, idle ↓",            proof: "Telematics adoption",    stakeholders: "Ops, Safety",      risk: "low",  steps: "Hardware/SaaS → driver enrollment" },
  { name: "Add advanced reports",   trigger: "Exec review burden",          value: "KPI clarity for execs/board",          proof: "Adoption, time-to-insight",stakeholders: "Ops, Finance",   risk: "low",  steps: "KPI list → dashboards → adoption" },
  { name: "Add premium support",    trigger: "P1 response SLA need",        value: "Faster restoration, fewer regressions",proof: "P1 MTTR",                stakeholders: "Ops, IT",          risk: "low",  steps: "Tier mapping → contract → onboarding" },
  { name: "Add white-label portal", trigger: "Brand-led customer launch",   value: "Branded customer experience",          proof: "Branded launches",       stakeholders: "Marketing, IT",    risk: "med",  steps: "Brand kit → portal config → launch" },
  { name: "Add new regions",        trigger: "Customer regional rollout",   value: "Multi-region operations",              proof: "Region-by-region adoption",stakeholders: "Ops, Compliance",risk: "med",  steps: "Region readiness → pilot → expansion" },
  { name: "Add regulated controls", trigger: "Regulated customer onboarding", value: "Trust, audit, data residency",       proof: "Trust packet completeness",stakeholders: "Sec, Legal",     risk: "high", steps: "Trust packet → controls map → rollout" },
];

export const V11_PLAYBOOK_RUNS = [
  { account: "Sunbelt Express",   playbook: "Add marketplace",     stage: "Lane analysis",  owner: "CS Lead", next_check: "2026-Q2 wk 4" },
  { account: "Northwind",         playbook: "Add customer portal", stage: "Discovery",      owner: "AE",      next_check: "2026-Q2 wk 3" },
  { account: "Atlas Freight",     playbook: "Add CoPilot",         stage: "AI gov review",  owner: "SE",      next_check: "2026-Q2 wk 5" },
  { account: "PacificMove",       playbook: "Add premium support", stage: "Tier mapping",   owner: "AE",      next_check: "2026-Q2 wk 2" },
];

// ---- Monetization maturity ----
export const V11_MONETIZATION_MATURITY = { score: 79, attach_avg: 38, expansion_avg: 18 };
export const V11_REVENUE_LINES = [
  { line: "SaaS subscription",       maturity: 92, adopt: 100, attach: "n/a", expansion: 12, support: "low",  pricing: "high" },
  { line: "Driver/vehicle seats",    maturity: 88, adopt: 100, attach: "n/a", expansion: 15, support: "low",  pricing: "high" },
  { line: "Customer portal add-on",  maturity: 78, adopt: 62,  attach: "62%", expansion: 18, support: "med",  pricing: "med"  },
  { line: "CoPilot add-on",          maturity: 64, adopt: 38,  attach: "38%", expansion: 22, support: "med",  pricing: "med"  },
  { line: "Marketplace fees",        maturity: 70, adopt: 28,  attach: "28%", expansion: 30, support: "med",  pricing: "med"  },
  { line: "Carrier subscriptions",   maturity: 58, adopt: 21,  attach: "21%", expansion: 25, support: "med",  pricing: "low"  },
  { line: "API usage",               maturity: 72, adopt: 44,  attach: "44%", expansion: 20, support: "med",  pricing: "med"  },
  { line: "EDI transactions",        maturity: 55, adopt: 18,  attach: "18%", expansion: 15, support: "high", pricing: "low"  },
  { line: "Telematics add-on",       maturity: 48, adopt: 12,  attach: "12%", expansion: 10, support: "med",  pricing: "low"  },
  { line: "Premium support",         maturity: 74, adopt: 32,  attach: "32%", expansion: 14, support: "low",  pricing: "high" },
  { line: "Implementation services", maturity: 80, adopt: 100, attach: "n/a", expansion: 5,  support: "med",  pricing: "high" },
  { line: "White-label portal",      maturity: 60, adopt: 14,  attach: "14%", expansion: 9,  support: "med",  pricing: "med"  },
  { line: "Partner marketplace",     maturity: 52, adopt: 10,  attach: "10%", expansion: 12, support: "med",  pricing: "low"  },
  { line: "Partner revenue share",   maturity: 45, adopt: 8,   attach: "8%",  expansion: 8,  support: "low",  pricing: "low"  },
];

// ---- Pricing & packaging ----
export const V11_PACKAGES_V11 = [
  { name: "Starter",     features: "Core dispatch, basic reports",                        seats: "1-25",   support: "Std",     mp: "no",  api: "no",   copilot: "no",  whitelabel: "no",  approval: "AE" },
  { name: "Growth",      features: "+Portal, advanced reports",                           seats: "26-100", support: "Std+",    mp: "opt", api: "opt",  copilot: "opt", whitelabel: "no",  approval: "Manager" },
  { name: "Enterprise",  features: "+CoPilot, EDI, SAML, premium support",                seats: "100+",   support: "Premium", mp: "yes", api: "yes",  copilot: "yes", whitelabel: "opt", approval: "RevOps + CRO" },
  { name: "Strategic",   features: "+White-label, regulated controls, named SE",          seats: "500+",   support: "Concierge",mp: "yes", api: "yes", copilot: "yes", whitelabel: "yes", approval: "CRO + CFO" },
];

export const V11_PRICING_GOVERNANCE = [
  { rule: "Standard list price",        gate: "AE",                  exception: "n/a" },
  { rule: "Discount 0-10%",             gate: "Manager",             exception: "Logged" },
  { rule: "Discount 10-20%",            gate: "RevOps",              exception: "Justification required" },
  { rule: "Discount >20%",              gate: "CRO + CFO",           exception: "Board-visible if recurring" },
  { rule: "Multi-year discount",        gate: "RevOps + CFO",        exception: "Term gate" },
  { rule: "Support tier downgrade",     gate: "RevOps",              exception: "Logged" },
  { rule: "MSA redline (data residency)",gate: "Legal + Security",   exception: "Trust packet required" },
];

// ---- Deal desk ----
export const V11_DEAL_DESK_REQUESTS = [
  { id: "DD-211", deal: "Atlas Freight",       type: "Pricing exception",    requested: "12% multi-year discount",     approver: "RevOps + CRO", status: "in_review", sla_h: 48 },
  { id: "DD-212", deal: "Sunbelt Express",     type: "Support tier exception",requested: "Concierge for $300k tier",   approver: "RevOps",       status: "in_review", sla_h: 24 },
  { id: "DD-213", deal: "Northwind Logistics", type: "API package exception", requested: "Higher rate limits",          approver: "Platform Lead",status: "approved",  sla_h: 24 },
  { id: "DD-214", deal: "Heartland Carriers",  type: "Implementation scope",  requested: "Reduced SE hours",            approver: "RevOps",       status: "pending",   sla_h: 24 },
  { id: "DD-215", deal: "PacificMove",         type: "Data residency",        requested: "EU region pin",               approver: "Security",     status: "blocked",   sla_h: 72 },
];
export const V11_DEAL_DESK_PERF = { median_response_h: 19, target_h: 24, on_time_pct: 89, exceptions_30d: 14 };

// ---- Trust-led sales ----
export const V11_TRUST_SALES = { score: 82, deals_supported: 11, accelerated_30d: 5 };
export const V11_TRUST_QUEUE = [
  { deal: "Northwind",   asset: "Security packet",    status: "ready",         owner: "Sec" },
  { deal: "Atlas",       asset: "Procurement packet", status: "stale",         owner: "Sec" },
  { deal: "PacificMove", asset: "AI governance",      status: "needs_refresh", owner: "Sec+Legal" },
  { deal: "Sunbelt",     asset: "Data retention",     status: "ready",         owner: "Legal" },
  { deal: "Heartland",   asset: "Mobile security",    status: "ready",         owner: "Sec" },
  { deal: "GreatPlains", asset: "Cert evidence",      status: "needs_refresh", owner: "Sec" },
];
export const V11_TRUST_BLOCKERS = [
  { deal: "Atlas",       blocker: "Procurement packet stale", owner: "Sec",   age_days: 9 },
  { deal: "PacificMove", blocker: "AI gov disclosure",        owner: "Legal", age_days: 5 },
];

// ---- Procurement acceleration ----
export const V11_PROCUREMENT = { score: 76, active: 7, median_days: 22, target_days: 18, completion_pct: 84 };
export const V11_PROCUREMENT_QUEUE = [
  { deal: "Atlas Freight",       step: "DPA",                 owner: "Legal",    due: "2026-06-09", status: "in_review" },
  { deal: "Northwind",           step: "Security questionnaire",owner: "Sec",    due: "2026-06-12", status: "in_review" },
  { deal: "PacificMove",         step: "Insurance evidence",  owner: "Finance",  due: "2026-06-15", status: "pending" },
  { deal: "GreatPlains",         step: "AI disclosure",       owner: "Legal",    due: "2026-06-18", status: "pending" },
  { deal: "Heartland",           step: "Support SLA review",  owner: "CS",       due: "2026-06-10", status: "ready" },
];

// ---- Customer proof-led selling ----
export const V11_PROOF_ASSETS = [
  { type: "Public reference",   asset: "Sunbelt Express case study",         status: "approved",  uses_30d: 8 },
  { type: "Customer quote",     asset: "Heartland COO quote",                status: "approved",  uses_30d: 6 },
  { type: "Driver adoption",    asset: "Sunbelt driver adoption proof",      status: "approved",  uses_30d: 4 },
  { type: "Portal adoption",    asset: "Atlas portal adoption proof",        status: "approved",  uses_30d: 5 },
  { type: "MP proof",           asset: "Heartland MP lane fill",             status: "in_review", uses_30d: 0 },
  { type: "API/EDI proof",      asset: "Northwind API uptime brief",         status: "approved",  uses_30d: 3 },
  { type: "CoPilot proof",      asset: "Sunbelt CoPilot time saved",         status: "approved",  uses_30d: 4 },
  { type: "Procurement trust",  asset: "Atlas procurement case",             status: "in_review", uses_30d: 0 },
];
export const V11_PROOF_GAPS = [
  { gap: "Public reference in regulated vertical",  owner: "PMM", target: "2026-Q3" },
  { gap: "MP proof in SE region",                   owner: "MP",  target: "2026-Q2" },
  { gap: "EDI proof at enterprise scale",           owner: "PM",  target: "2026-Q3" },
];

// ---- Marketplace monetization ----
export const V11_MP_MONETIZATION = { revenue_band: "$120-180k/mo", take_rate_band: "4.5-5.0%", carriers_active: 412 };
export const V11_MP_LINES = [
  { line: "Marketplace fees",        revenue_band: "$80-120k/mo", risk: "med" },
  { line: "Carrier subscriptions",   revenue_band: "$25-35k/mo",  risk: "low" },
  { line: "Preferred carrier",       revenue_band: "$10-15k/mo",  risk: "low" },
  { line: "Premium visibility",      revenue_band: "$5-10k/mo",   risk: "low" },
];
export const V11_MP_ADOPTION = [
  { customer: "Sunbelt Express", adopt_pct: 24, region: "SE", trend: "+4 pts" },
  { customer: "Heartland",       adopt_pct: 11, region: "S",  trend: "+2 pts" },
  { customer: "Atlas",           adopt_pct: 12, region: "NE", trend: "+1 pt"  },
  { customer: "PacificMove",     adopt_pct: 5,  region: "W",  trend: "flat"   },
];

// ---- API/EDI monetization ----
export const V11_API_EDI = { api_revenue_band: "$30-45k/mo", edi_revenue_band: "$15-25k/mo", api_overages_30d: 6, rate_limit_events_30d: 24 };
export const V11_API_PLANS = [
  { plan: "Developer",  rpm: "60",    accounts: 38, overage_policy: "Block" },
  { plan: "Growth",     rpm: "600",   accounts: 14, overage_policy: "Soft" },
  { plan: "Enterprise", rpm: "6,000", accounts: 6,  overage_policy: "Metered" },
];
export const V11_EDI_USAGE = [
  { transaction: "204 Load Tender",  vol_30d: 1840, exceptions: 7 },
  { transaction: "210 Invoice",      vol_30d: 1612, exceptions: 4 },
  { transaction: "214 Status",       vol_30d: 5230, exceptions: 11 },
  { transaction: "990 Response",     vol_30d: 1801, exceptions: 2 },
  { transaction: "997 Functional ACK", vol_30d: 6440, exceptions: 0 },
];

// ---- Global partner commercialization ----
export const V11_PARTNER_COMMERCIAL = { score: 74, partners_active: 12, sourced_pipeline_band: "$1.2-1.6M", joint_customers: 17 };
export const V11_PARTNERS_V11 = [
  { partner: "TMS-X",            tier: "Strategic", sourced_pipe: "$420k",  enable: "ready",       certified: "in_review", health: "good" },
  { partner: "FleetCloud",       tier: "Strategic", sourced_pipe: "$310k",  enable: "in_progress", certified: "in_review", health: "good" },
  { partner: "TelematicsCo",     tier: "Preferred", sourced_pipe: "$180k",  enable: "ready",       certified: "ready",     health: "good" },
  { partner: "EDIWorks",         tier: "Preferred", sourced_pipe: "$110k",  enable: "needs_refresh",certified: "in_review",health: "watch" },
  { partner: "DevAPI Hub",       tier: "Developer", sourced_pipe: "$80k",   enable: "needs_refresh",certified: "pending",  health: "watch" },
  { partner: "RegioMaps",        tier: "Preferred", sourced_pipe: "$60k",   enable: "ready",       certified: "ready",     health: "good" },
];
export const V11_PARTNER_CAMPAIGNS = [
  { campaign: "TMS-X co-sell",       partner: "TMS-X",        status: "active",  pipeline_band: "$180k" },
  { campaign: "FleetCloud webinar",  partner: "FleetCloud",   status: "active",  pipeline_band: "$95k"  },
  { campaign: "TelematicsCo bundle", partner: "TelematicsCo", status: "planned", pipeline_band: "$60k"  },
];

// ---- Partner revenue execution ----
export const V11_PARTNER_REVENUE_EVENTS = [
  { id: "PRE-101", partner: "TMS-X",        type: "Co-sell win",     amount_band: "$45-60k",  status: "approved",  payout_status: "queued" },
  { id: "PRE-102", partner: "FleetCloud",   type: "Referral",        amount_band: "$10-15k",  status: "approved",  payout_status: "queued" },
  { id: "PRE-103", partner: "EDIWorks",     type: "Impl referral",   amount_band: "$5-10k",   status: "in_review", payout_status: "pending" },
  { id: "PRE-104", partner: "DevAPI Hub",   type: "API uplift",      amount_band: "$3-5k",    status: "pending",   payout_status: "pending" },
];

// ---- Sales engineering OS ----
export const V11_SE_READINESS = [
  { area: "Demo readiness",            score: 92, owner: "SE Lead" },
  { area: "Solution architecture",     score: 84, owner: "SE Lead" },
  { area: "API demo",                  score: 88, owner: "SE" },
  { area: "EDI demo",                  score: 72, owner: "SE" },
  { area: "Marketplace demo",          score: 78, owner: "MP" },
  { area: "Security architecture",     score: 80, owner: "Sec" },
  { area: "Data flow walkthrough",     score: 76, owner: "SE" },
  { area: "Technical FAQ",             score: 82, owner: "SE" },
  { area: "POC playbook",              score: 70, owner: "SE Lead" },
  { area: "Technical validation",      score: 74, owner: "SE Lead" },
];
export const V11_SE_ASSIGNMENTS = [
  { deal: "Northwind",   se: "R. Yu",      stage: "API workshop",        status: "in_progress" },
  { deal: "PacificMove", se: "L. Andersson",stage: "POC plan",           status: "designed" },
  { deal: "Atlas",       se: "M. Brooks",  stage: "Solution architecture",status: "in_review" },
  { deal: "Sunbelt",     se: "R. Yu",      stage: "MP demo",             status: "ready" },
];

// ---- Revenue operations governance ----
export const V11_REVOPS_GOVERNANCE = [
  { area: "Pipeline governance",        status: "ready",         cadence: "Weekly",   owner: "RevOps" },
  { area: "Forecast governance",        status: "in_progress",   cadence: "Weekly",   owner: "RevOps" },
  { area: "Pricing governance",         status: "ready",         cadence: "Monthly",  owner: "RevOps + CRO" },
  { area: "Discount governance",        status: "in_progress",   cadence: "Weekly",   owner: "RevOps" },
  { area: "Deal desk governance",       status: "ready",         cadence: "Daily",    owner: "RevOps" },
  { area: "Procurement governance",     status: "in_progress",   cadence: "Weekly",   owner: "Sec + RevOps" },
  { area: "Expansion governance",       status: "in_progress",   cadence: "Weekly",   owner: "CS" },
  { area: "Renewal governance",         status: "ready",         cadence: "Monthly",  owner: "CS" },
  { area: "Partner revenue governance", status: "in_progress",   cadence: "Monthly",  owner: "Partner" },
  { area: "Marketplace revenue gov",    status: "ready",         cadence: "Monthly",  owner: "MP Lead" },
  { area: "API/EDI revenue governance", status: "in_progress",   cadence: "Monthly",  owner: "Platform" },
  { area: "Commercial risk governance", status: "ready",         cadence: "Quarterly",owner: "Risk" },
];

// ---- Renewal & expansion governance ----
export const V11_RENEWAL_PIPELINE = [
  { account: "Northwind Logistics", renewal_q: "2026-Q3", readiness: 72, risk: "med",  expansion: "Portal, CoPilot",   owner: "AE" },
  { account: "Atlas Freight",       renewal_q: "2026-Q4", readiness: 84, risk: "low",  expansion: "CoPilot, API",      owner: "AE" },
  { account: "PacificMove",         renewal_q: "2026-Q4", readiness: 58, risk: "high", expansion: "Premium support",   owner: "CS" },
  { account: "Sunbelt Express",     renewal_q: "2026-Q4", readiness: 90, risk: "low",  expansion: "Marketplace, EDI",  owner: "CS Lead" },
  { account: "Heartland Carriers",  renewal_q: "2027-Q1", readiness: 76, risk: "med",  expansion: "Portal",            owner: "AE" },
];

// ---- Revenue risk ----
export const V11_REVENUE_RISKS = [
  { risk: "Pipeline concentration",       likelihood: "med",  impact: "high", owner: "CRO",    mitigation: "Diversify segments" },
  { risk: "Deal slippage (Atlas DPA)",    likelihood: "med",  impact: "high", owner: "Legal",  mitigation: "Escalation + redline target" },
  { risk: "Procurement bottleneck",       likelihood: "med",  impact: "med",  owner: "Sec",    mitigation: "Packet refresh + DPA template" },
  { risk: "Security review delay",        likelihood: "med",  impact: "med",  owner: "Sec",    mitigation: "Pre-cleared questionnaire bank" },
  { risk: "Customer concentration",       likelihood: "high", impact: "high", owner: "CFO",    mitigation: "Expansion + new logo mix" },
  { risk: "Churn risk (PacificMove)",     likelihood: "med",  impact: "high", owner: "CS",     mitigation: "Exec sponsor + premium support" },
  { risk: "Expansion risk (MP SE)",       likelihood: "med",  impact: "med",  owner: "MP",     mitigation: "Carrier recruiting sprint" },
  { risk: "Pricing/discount drift",       likelihood: "med",  impact: "med",  owner: "RevOps", mitigation: "Deal desk gates" },
  { risk: "MP revenue risk (concentration)",likelihood: "low",impact: "med",  owner: "MP",     mitigation: "Carrier diversification" },
  { risk: "API/EDI revenue risk",         likelihood: "low",  impact: "low",  owner: "Platform", mitigation: "Plan repackaging" },
  { risk: "Partner revenue dispute",      likelihood: "low",  impact: "med",  owner: "Partner",mitigation: "Dispute placeholder workflow" },
  { risk: "Support burden risk",          likelihood: "med",  impact: "med",  owner: "CS",     mitigation: "Tier rebalancing" },
  { risk: "Product readiness risk (EDI)", likelihood: "med",  impact: "med",  owner: "PM",     mitigation: "EDI hardening sprint" },
];

// ---- Board-level revenue reporting ----
export const V11_BOARD_REPORT_SECTIONS = [
  { section: "Enterprise pipeline",        owner: "CRO",  status: "ready" },
  { section: "Revenue expansion",          owner: "CS",   status: "ready" },
  { section: "Renewal risk",               owner: "CS",   status: "in_review" },
  { section: "Churn risk",                 owner: "CS",   status: "in_review" },
  { section: "Marketplace monetization",   owner: "MP",   status: "ready" },
  { section: "API/EDI monetization",       owner: "Plat", status: "in_review" },
  { section: "Partner commercialization",  owner: "Partn",status: "ready" },
  { section: "Trust-led sales impact",     owner: "Sec",  status: "ready" },
  { section: "Procurement blockers",       owner: "Sec",  status: "ready" },
  { section: "Pricing exceptions",         owner: "RevOps",status: "ready" },
  { section: "Commercial risks",           owner: "Risk", status: "ready" },
  { section: "Next-quarter revenue priorities", owner: "CRO + CEO", status: "in_review" },
];

// ---- Long-term monetization roadmap ----
export const V11_ROADMAP = [
  { horizon: "Current Q",  track: "SaaS",              initiative: "Tier rationalization v1", owner: "RevOps" },
  { horizon: "Current Q",  track: "Trust-led sales",   initiative: "AI gov packet v2",        owner: "Sec" },
  { horizon: "Next Q",     track: "Marketplace",       initiative: "Preferred carrier v2",    owner: "MP" },
  { horizon: "Next Q",     track: "API",               initiative: "Metered overage GA",      owner: "Platform" },
  { horizon: "6 months",   track: "Partner",           initiative: "Co-sell motion v2",       owner: "Partner" },
  { horizon: "6 months",   track: "Premium support",   initiative: "Concierge expansion",     owner: "CS" },
  { horizon: "12 months",  track: "EDI",               initiative: "Enterprise EDI hardening",owner: "PM" },
  { horizon: "12 months",  track: "White-label",       initiative: "Brand-led launches v2",   owner: "Marketing" },
  { horizon: "24 months",  track: "Carrier monetization",initiative: "Carrier financial tools placeholder", owner: "MP" },
  { horizon: "24 months",  track: "Partner marketplace",initiative: "Marketplace listings v2",owner: "Partner" },
  { horizon: "36 months",  track: "Telematics",         initiative: "Telematics add-on bundles",owner: "Product" },
  { horizon: "36 months",  track: "CoPilot",            initiative: "CoPilot enterprise tiering",owner: "PM" },
];

// ---- Reports ----
export const V11_REPORTS = [
  "Enterprise revenue engine", "Strategic account expansion", "Platform monetization maturity",
  "Pricing & packaging maturity", "Deal desk maturity", "Trust-led enterprise sales",
  "Procurement acceleration", "Customer proof-led selling", "Marketplace monetization",
  "API/EDI monetization", "Partner commercialization", "Partner revenue execution",
  "Sales engineering readiness", "Revenue operations governance", "Renewal & expansion governance",
  "Revenue risk governance", "Board-level revenue reporting", "Long-term monetization roadmap",
];

// ---- Exec headline + overlays ----
export const V11_EXEC_HEADLINE: ExecHeadline = {
  status: "amber",
  headline: "V11 revenue engine at 86 with 5 trust-accelerated deals",
  detail: "Atlas DPA and PacificMove buying-committee gap are the two highest-impact blockers this quarter.",
  signals: [
    { label: "Trust accelerated (30d)",  value: 5,   tone: "good" },
    { label: "Blocked deals",            value: 3,   tone: "warn" },
    { label: "Procurement median (days)",value: 22,  tone: "warn" },
    { label: "Renewal risk (PacificMove)",value: "high", tone: "bad" },
  ],
  next_decision: { who: "CRO + CFO", what: "Approve Q2 enterprise close + renewal recovery plan", due: "Q2 close" },
};

export const V11_EXECUTION_OVERLAYS: OverlayItem[] = [
  { area: "Revenue engine",        role: "CRO",     focus: "Score 86, +6 pts vs last quarter",     decision: "Approve Q2 close plan" },
  { area: "Atlas DPA",             role: "Legal",   focus: "Aging 12 days — escalate now",         decision: "Redline by 06-09" },
  { area: "Trust monetization",    role: "Security",focus: "AI gov packet stale",                  decision: "Refresh packet" },
  { area: "Renewal risk",          role: "CS",      focus: "PacificMove readiness 58",             decision: "Exec sponsor engaged" },
  { area: "MP monetization",       role: "MP Lead", focus: "SE adoption rising; lane fill +4 pts", decision: "Carrier recruiting sprint" },
  { area: "Partner co-sell",       role: "Partner", focus: "TMS-X co-sell active",                 decision: "Expand to FleetCloud" },
];

// ---- Backend boundary ----
export const V11_BACKEND_BOUNDARY = [
  { kind: "server fn", name: "calculate-v11-revenue-engine-score",     caller: "Revenue dashboards", auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "calculate-enterprise-opportunity-score", caller: "Sales OS",           auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "calculate-account-expansion-score",      caller: "CS console",         auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "calculate-churn-risk-score",             caller: "Renewal center",     auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "calculate-platform-monetization-maturity",caller: "CFO console",       auth: "requireSupabaseAuth + role" },
  { kind: "server fn", name: "create-deal-desk-request",               caller: "Deal desk",          auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "approve-deal-desk-request",              caller: "RevOps approver",    auth: "requireSupabaseAuth + role" },
  { kind: "server fn", name: "calculate-trust-led-sales-score",        caller: "Trust sales center", auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "generate-trust-sales-packet",            caller: "Sales/Security",     auth: "requireSupabaseAuth + role" },
  { kind: "server fn", name: "calculate-partner-commercialization-score",caller: "Partner console",  auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "calculate-partner-revenue-execution",    caller: "Partner Ops",        auth: "requireSupabaseAuth + role" },
  { kind: "server fn", name: "generate-board-revenue-report",          caller: "CEO/Board admin",    auth: "requireSupabaseAuth + role" },
  { kind: "route",     name: "/api/public/webhooks/partner-revenue",   caller: "Partner systems",    auth: "HMAC signature" },
  { kind: "route",     name: "/api/public/webhooks/procurement-status",caller: "Procurement systems",auth: "HMAC signature" },
];

export const V11_RLS_EXAMPLES = [
  "Company admins can view their company-level account expansion and renewal records",
  "Platform owners can view platform-wide revenue engine records",
  "Sales users can view assigned enterprise opportunities and account plans",
  "Customer success users can view assigned renewal, expansion, and proof records",
  "Revenue operations users can manage pipeline governance and deal desk workflows",
  "Billing users can view monetization and billing-related records",
  "Security users can view trust-led sales and procurement security records",
  "Board revenue reports restricted to executive/board roles",
  "Pricing & packaging governance restricted to executive/revenue-ops roles",
  "Customer users cannot access internal revenue, pricing, deal, or risk records",
  "Carrier users cannot access marketplace monetization internals unless explicitly exposed",
  "Partner users can only view approved partner-facing commercialization records",
  "Customer proof assets require approved status before external use",
];

export const V11_DEMO_FLOW = [
  { role: "CRO",      step: "Open Enterprise Revenue Engine Command Center — score 86, pipeline strong" },
  { role: "CRO",      step: "Review 2 procurement-blocked deals + 3 active expansion opps + next-best actions" },
  { role: "CS Lead",  step: "Open Strategic Account Expansion — Sunbelt portal high, MP low; recommend MP + CoPilot" },
  { role: "CS",       step: "Open Enterprise Account Planning — Sunbelt plan with buying committee + success metrics" },
  { role: "Sales",    step: "Open Sales OS — regulated prospect in Technical Validation; committee includes Sec + Proc" },
  { role: "Sales",    step: "Review deal risk — security questionnaire + API review are blockers" },
  { role: "RevOps",   step: "Open Deal Desk — 1 pricing exception + 1 support tier exception pending" },
  { role: "RevOps",   step: "Open Pricing & Packaging Maturity — 4 packages, discount gates by tier" },
  { role: "Security", step: "Open Trust-Led Enterprise Sales — packet current; AI gov needs refresh; 2 deals accelerated" },
  { role: "Security", step: "Open Procurement Acceleration — median 22d vs 18d target; DPA + insurance pending" },
  { role: "Partner",  step: "Open Global Partner Commercialization — TMS-X sourcing pipeline; DevAPI needs enablement" },
  { role: "Partner",  step: "Open Partner Revenue Execution — 1 share placeholder pending approval" },
  { role: "MP",       step: "Open Marketplace Monetization Execution — SE adoption rising; concentration risk low" },
  { role: "Platform", step: "Open API/EDI Monetization Execution — 6 overages, 24 rate-limit events" },
  { role: "Risk",     step: "Open Revenue Risk Governance — heatmap with mitigation owners" },
  { role: "Board",    step: "Open Board-Level Revenue Reporting — pipeline, expansion, renewal risk, MP, API/EDI, trust, risk, next-Q" },
  { role: "CEO",      step: "Open Long-Term Monetization Roadmap — current Q through 36 months by track" },
];
