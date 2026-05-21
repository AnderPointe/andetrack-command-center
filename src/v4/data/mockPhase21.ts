// Phase 21 V4 full enterprise launch readiness — mock data layer.
export const V4_READINESS = {
  product: 88, security: 82, compliance: 78, mobile: 71,
  marketplace: 84, integrations: 80, support: 86, success: 83,
  revenue: 79, scaling: 81, partners: 75, overall: 84,
};

export const V4_SCOPE_IN = [
  "Full enterprise launch dashboard", "Strategic integration program",
  "Carrier marketplace scale", "National carrier network readiness",
  "Multi-region dispatch operations", "Large-fleet performance",
  "Enterprise onboarding factory", "Enterprise support operations",
  "Compliance operations center", "Mobile certification execution",
  "Android Auto execution tracker", "CarPlay execution tracker",
  "Strategic partner launch tracker", "Advanced customer success",
  "Enterprise revenue operations", "Partner revenue operations",
  "National operations intelligence", "Advanced governance controls",
  "Enterprise launch scorecard",
];
export const V4_SCOPE_OUT = [
  "Fully autonomous dispatch", "Guaranteed regulatory compliance automation",
  "Autonomous vehicle workflows", "Full insurance underwriting automation",
  "Final platform certification claims without audit evidence",
  "Global logistics localization", "International customs workflows",
];

export const V4_FEATURE_MATRIX = [
  { area: "Launch", feature: "Launch Command Center",       v: "v4", status: "in_progress" },
  { area: "Launch", feature: "Launch readiness scorecard",  v: "v4", status: "in_progress" },
  { area: "Integrations", feature: "Strategic integrations", v: "v4", status: "in_progress" },
  { area: "Marketplace", feature: "Carrier marketplace scale", v: "v4", status: "in_progress" },
  { area: "Network", feature: "National carrier coverage",   v: "v4", status: "in_progress" },
  { area: "Dispatch", feature: "Multi-region dispatch",      v: "v4", status: "in_progress" },
  { area: "Fleet", feature: "Large-fleet performance",       v: "v4", status: "in_progress" },
  { area: "Onboarding", feature: "Enterprise onboarding factory", v: "v4", status: "in_progress" },
  { area: "Lifecycle", feature: "Enterprise customer lifecycle", v: "v4", status: "in_progress" },
  { area: "Compliance", feature: "Compliance operations center", v: "v4", status: "in_progress" },
  { area: "Mobile", feature: "Mobile certification execution", v: "v4", status: "in_progress" },
  { area: "Mobile", feature: "Android Auto execution",       v: "v4", status: "planned" },
  { area: "Mobile", feature: "CarPlay execution",            v: "v4", status: "planned" },
  { area: "Support", feature: "Enterprise support ops",      v: "v4", status: "in_progress" },
  { area: "Governance", feature: "Advanced governance",      v: "v4", status: "in_progress" },
  { area: "Ops", feature: "National operations intelligence", v: "v4", status: "in_progress" },
  { area: "Revenue", feature: "Enterprise revenue ops",      v: "v4", status: "in_progress" },
  { area: "Revenue", feature: "Partner revenue ops",         v: "v4", status: "in_progress" },
  { area: "AI", feature: "AI Governance V4",                 v: "v4", status: "in_progress" },
];

export const LAUNCH_MILESTONES = [
  { id: "m1", title: "Security review sign-off",          due: "2026-06-01", status: "in_progress", owner: "Security" },
  { id: "m2", title: "Strategic telematics integration",  due: "2026-06-10", status: "in_progress", owner: "Integrations" },
  { id: "m3", title: "Android Auto testing complete",     due: "2026-06-15", status: "blocked",     owner: "Mobile" },
  { id: "m4", title: "Carrier coverage Southeast",        due: "2026-06-20", status: "in_progress", owner: "Network" },
  { id: "m5", title: "Enterprise pilot go-live",          due: "2026-06-25", status: "planned",     owner: "CS" },
  { id: "m6", title: "Compliance access review campaign", due: "2026-06-05", status: "done",        owner: "Compliance" },
  { id: "m7", title: "Revenue ops dashboards live",       due: "2026-06-08", status: "in_progress", owner: "RevOps" },
];

export const LAUNCH_BLOCKERS = [
  { id: "b1", area: "Mobile", title: "Android Auto safety testing incomplete", severity: "high", owner: "Mobile" },
  { id: "b2", area: "Integrations", title: "Telematics partner in security review", severity: "med", owner: "Security" },
  { id: "b3", area: "Network", title: "Southeast region carrier coverage gap",  severity: "med",  owner: "Network" },
];

export const LAUNCH_RISKS = [
  { id: "r1", title: "Large-fleet realtime GPS scaling", likelihood: "med", impact: "high", mitigation: "Channel sharding pilot" },
  { id: "r2", title: "Strategic partner SLA gaps",       likelihood: "med", impact: "med",  mitigation: "Partner readiness scorecard" },
  { id: "r3", title: "Carrier marketplace dispute load", likelihood: "low", impact: "high", mitigation: "Dispute SLA + escalation" },
  { id: "r4", title: "Mobile store rejection",           likelihood: "low", impact: "high", mitigation: "Pre-review with privacy team" },
];

export const STRATEGIC_INTEGRATIONS = [
  { id: "i1", name: "Samsara Telematics",   type: "Telematics",  status: "security_review", value: "high", complexity: "med",  owner: "Integrations" },
  { id: "i2", name: "Motive Telematics",    type: "Telematics",  status: "discovery",       value: "high", complexity: "med",  owner: "Integrations" },
  { id: "i3", name: "QuickBooks Online",    type: "Accounting",  status: "live",            value: "med",  complexity: "low",  owner: "Finance" },
  { id: "i4", name: "Mapbox",               type: "Map/Routing", status: "live",            value: "high", complexity: "low",  owner: "Platform" },
  { id: "i5", name: "Stripe Billing",       type: "Billing",     status: "live",            value: "high", complexity: "med",  owner: "RevOps" },
  { id: "i6", name: "WEX Fuel",             type: "Fuel",        status: "test",            value: "med",  complexity: "med",  owner: "Ops" },
  { id: "i7", name: "Fleetio Maintenance",  type: "Maintenance", status: "discovery",       value: "med",  complexity: "med",  owner: "Ops" },
  { id: "i8", name: "Twilio Notifications", type: "Notify",      status: "live",            value: "high", complexity: "low",  owner: "Platform" },
  { id: "i9", name: "DAT Load Board",       type: "Broker",      status: "test",            value: "high", complexity: "high", owner: "Marketplace" },
  { id: "i10", name: "EDI 204/214/990",     type: "EDI",         status: "launch_review",   value: "high", complexity: "high", owner: "EDI" },
];

export const PARTNER_LAUNCHES = [
  { id: "p1", name: "RegionFleet Carriers", type: "Carrier",   stage: "Pilot",         owner: "BD" },
  { id: "p2", name: "Samsara",              type: "Telematics", stage: "Security Review", owner: "Security" },
  { id: "p3", name: "Atlas Brokerage",      type: "Broker",    stage: "Commercial Review", owner: "BD" },
  { id: "p4", name: "Garmin Hardware",      type: "Hardware",  stage: "Technical Review", owner: "Platform" },
  { id: "p5", name: "PayCargo",             type: "Billing",   stage: "Live",          owner: "RevOps" },
  { id: "p6", name: "Acme 3PL",             type: "Shipper",   stage: "Expansion",     owner: "CS" },
];

export const CARRIER_MARKETPLACE = {
  active_carriers: 412, lanes_covered: 1840, avg_perf: 87,
  avg_compliance: 91, open_bids: 23, awards_today: 7,
  disputes_open: 3, suspended: 4,
};
export const MARKETPLACE_BIDS = [
  { id: "bid1", load: "LD-9821", carrier: "RegionFleet", rate: 1840, perf: 92, compliance: 95, eta: "2h" },
  { id: "bid2", load: "LD-9821", carrier: "Tex Express",  rate: 1795, perf: 88, compliance: 90, eta: "3h" },
  { id: "bid3", load: "LD-9821", carrier: "South Haul",   rate: 1880, perf: 84, compliance: 88, eta: "5h" },
];
export const CARRIER_DISPUTES = [
  { id: "d1", carrier: "South Haul",  load: "LD-9710", reason: "Detention dispute", status: "open" },
  { id: "d2", carrier: "Tex Express", load: "LD-9684", reason: "Damage claim",      status: "review" },
  { id: "d3", carrier: "Plains Run",  load: "LD-9650", reason: "Late delivery",     status: "resolving" },
];

export const NATIONAL_COVERAGE = [
  { region: "Texas",     hotshot: 78, box: 65, van: 60, freight: 80, flatbed: 70, reefer: 55, gap: 0 },
  { region: "Midwest",   hotshot: 70, box: 60, van: 55, freight: 78, flatbed: 65, reefer: 60, gap: 0 },
  { region: "Southeast", hotshot: 35, box: 28, van: 40, freight: 50, flatbed: 30, reefer: 25, gap: 1 },
  { region: "West",      hotshot: 55, box: 50, van: 45, freight: 60, flatbed: 50, reefer: 45, gap: 0 },
  { region: "Northeast", hotshot: 45, box: 50, van: 48, freight: 55, flatbed: 38, reefer: 40, gap: 0 },
];
export const COVERAGE_GAPS = [
  { region: "Southeast", recommendation: "Recruit 12 hotshot + 8 box truck carriers", priority: "high" },
  { region: "Northeast", recommendation: "Add 5 flatbed carriers in PA/NJ corridor",  priority: "med"  },
];

export const REGIONS = [
  { id: "r-tx",  name: "West Texas",   tz: "America/Chicago", loads: 142, drivers: 38, util: 72 },
  { id: "r-mw",  name: "Midwest",      tz: "America/Chicago", loads: 98,  drivers: 45, util: 64 },
  { id: "r-se",  name: "Southeast",    tz: "America/New_York", loads: 64,  drivers: 22, util: 58 },
  { id: "r-w",   name: "West Coast",   tz: "America/Los_Angeles", loads: 86, drivers: 31, util: 67 },
  { id: "r-ne",  name: "Northeast",    tz: "America/New_York", loads: 55,  drivers: 24, util: 60 },
];

export const FLEET_PERF = {
  drivers_total: 1840, drivers_active: 1422, drivers_offline: 312, drivers_stale_gps: 22,
  vehicles_total: 1980, active_loads: 612, realtime_health: 99.4,
  gps_events_per_min: 14200, map_render_p95_ms: 320, api_p95_ms: 184,
  db_p95_ms: 52, webhooks_per_min: 880, notifications_per_min: 410,
};

export const ENTERPRISE_ONBOARDING_TEMPLATE = [
  "Sales handoff", "Procurement review", "Security review", "Technical discovery",
  "Data migration planning", "User setup", "Driver setup", "Vehicle setup",
  "Customer setup", "Integration setup", "Pilot planning", "Training",
  "Go-live", "Post-launch review",
];
export const ENTERPRISE_PIPELINE = [
  { id: "ep1", name: "MegaShip Logistics", stage: "Implementation", health: 82, owner: "Ali",  renewal: "2026-12-01" },
  { id: "ep2", name: "Atlas Freight",       stage: "Pilot",          health: 70, owner: "Sam", renewal: "—" },
  { id: "ep3", name: "Continental Carriers", stage: "Live",          health: 88, owner: "Joy", renewal: "2026-09-15" },
  { id: "ep4", name: "PortSide Movers",     stage: "At Risk",        health: 54, owner: "Ali",  renewal: "2026-07-30", risk: "Adoption below threshold" },
  { id: "ep5", name: "RedHorizon 3PL",      stage: "Expansion",      health: 91, owner: "Sam", renewal: "2027-01-10" },
];

export const COMPLIANCE_TASKS = [
  { id: "c1", area: "Access review",     due: "2026-06-10", status: "done",        owner: "Security" },
  { id: "c2", area: "API access review", due: "2026-06-15", status: "in_progress", owner: "Security" },
  { id: "c3", area: "Driver consent",    due: "2026-06-20", status: "in_progress", owner: "Legal" },
  { id: "c4", area: "Data retention",    due: "2026-06-22", status: "planned",     owner: "Platform" },
  { id: "c5", area: "Vendor review",     due: "2026-06-30", status: "planned",     owner: "Security" },
  { id: "c6", area: "BCP/DR test",       due: "2026-07-05", status: "planned",     owner: "Platform" },
];
export const COMPLIANCE_EXCEPTIONS = [
  { id: "e1", area: "Support access", desc: "Tier 2 read-only role exception for incident IR-4421", expires: "2026-06-30", status: "review" },
];

export const MOBILE_CERT = [
  { area: "App Store readiness",       progress: 78 },
  { area: "Google Play readiness",     progress: 72 },
  { area: "Background location review", progress: 80 },
  { area: "Mic permission review",      progress: 65 },
  { area: "Push notification review",   progress: 90 },
  { area: "Privacy labels",             progress: 70 },
  { area: "Data safety form",           progress: 60 },
  { area: "Crash monitoring",           progress: 85 },
  { area: "Version rollout plan",       progress: 55 },
];

export const ANDROID_AUTO = [
  { item: "Native Android module",          status: "in_progress" },
  { item: "Android for Cars App Library",   status: "in_progress" },
  { item: "Navigation template review",     status: "in_progress" },
  { item: "Safety review",                  status: "70%" },
  { item: "Turn-by-turn metadata",          status: "in_progress" },
  { item: "Voice interaction rules",        status: "planned" },
  { item: "Desktop Head Unit testing",      status: "planned" },
  { item: "App review submission",          status: "blocked" },
];
export const CARPLAY = [
  { item: "Apple entitlement request",      status: "pending" },
  { item: "Native iOS module",              status: "in_progress" },
  { item: "CarPlay navigation template",    status: "in_progress" },
  { item: "Turn-by-turn metadata",          status: "planned" },
  { item: "Siri/voice integration",         status: "planned" },
  { item: "Safety review",                  status: "planned" },
  { item: "Testing status",                 status: "planned" },
];

export const SUPPORT_TIERS = [
  { tier: "Standard",     sla_first: "8h",  sla_resolve: "5d", coverage: "business" },
  { tier: "Professional", sla_first: "4h",  sla_resolve: "3d", coverage: "extended" },
  { tier: "Priority",     sla_first: "1h",  sla_resolve: "1d", coverage: "24x5" },
  { tier: "Enterprise",   sla_first: "15m", sla_resolve: "8h", coverage: "24x7" },
];
export const SUPPORT_QUEUE = {
  open: 142, breaching: 4, p1: 2, p2: 7, p3: 41, p4: 92,
  avg_first_response_h: 1.8, sla_attainment: 96,
};
export const ESCALATIONS = [
  { id: "esc1", tier: "Enterprise", customer: "MegaShip", reason: "GPS lag west region", routed: "Eng on-call" },
  { id: "esc2", tier: "Priority",   customer: "Atlas",    reason: "EDI 990 rejects",     routed: "EDI team" },
];

export const GOVERNANCE_CAMPAIGNS = [
  { id: "g1", title: "Quarterly role review",   scope: "All roles",         due: "2026-06-30", status: "in_progress" },
  { id: "g2", title: "API key rotation",        scope: "Partner API keys",  due: "2026-06-20", status: "in_progress" },
  { id: "g3", title: "EDI partner review",      scope: "Active EDI orgs",   due: "2026-06-25", status: "planned" },
  { id: "g4", title: "Support access review",   scope: "Tier 1/2 agents",   due: "2026-06-15", status: "in_progress" },
  { id: "g5", title: "AI action audit review",  scope: "CoPilot actions",   due: "2026-06-18", status: "in_progress" },
];

export const NATIONAL_OPS = [
  { region: "West Texas", loads: 142, util_drv: 72, util_veh: 68, carrier_cov: 84, support_load: 12, revenue: 184000 },
  { region: "Midwest",    loads: 98,  util_drv: 64, util_veh: 60, carrier_cov: 80, support_load: 9,  revenue: 138000 },
  { region: "Southeast",  loads: 64,  util_drv: 58, util_veh: 55, carrier_cov: 41, support_load: 14, revenue: 92000  },
  { region: "West Coast", loads: 86,  util_drv: 67, util_veh: 62, carrier_cov: 70, support_load: 10, revenue: 122000 },
  { region: "Northeast",  loads: 55,  util_drv: 60, util_veh: 58, carrier_cov: 60, support_load: 8,  revenue: 84000  },
];

export const REVENUE_BY_LINE = [
  { line: "Enterprise SaaS",          mrr: 184000 },
  { line: "Carrier marketplace fees",  mrr: 62000  },
  { line: "API usage",                 mrr: 28000  },
  { line: "Support tiers",             mrr: 18000  },
  { line: "Implementation (one-time)", mrr: 14000  },
];
export const RENEWALS = [
  { id: "rn1", customer: "Continental Carriers", arr: 240000, renewal: "2026-09-15", health: 88, status: "on_track" },
  { id: "rn2", customer: "MegaShip Logistics",   arr: 480000, renewal: "2026-12-01", health: 82, status: "on_track" },
  { id: "rn3", customer: "PortSide Movers",      arr: 96000,  renewal: "2026-07-30", health: 54, status: "at_risk" },
];
export const EXPANSIONS = [
  { id: "ex1", customer: "RedHorizon 3PL", opp: "Add API tier",        amount: 36000 },
  { id: "ex2", customer: "Atlas Freight",  opp: "Add carrier portal",  amount: 24000 },
];

export const PARTNER_REVENUE = [
  { partner: "Samsara",       type: "Telematics", share: 0.15, last_period: 14200 },
  { partner: "DAT",           type: "Broker",     share: 0.10, last_period: 9800  },
  { partner: "Stripe Billing", type: "Billing",   share: 0.029, last_period: 6400 },
  { partner: "PayCargo",      type: "Billing",    share: 0.025, last_period: 3100 },
];

export const AI_GOVERNANCE = {
  approval_rules: [
    { action: "Customer ETA notification", threshold: 0.85, requires_approval: false },
    { action: "Driver reassignment",       threshold: 0.90, requires_approval: true  },
    { action: "Billing dispute response",  threshold: 0.95, requires_approval: true  },
    { action: "Carrier suspension",        threshold: 1.0,  requires_approval: true  },
  ],
  confidence_floor: 0.7,
  data_sources: ["loads", "drivers", "telematics", "weather", "support_tickets"],
  usage_cost_mtd: 4280,
  cost_cap_monthly: 8000,
};

export const AI_ACTION_AUDIT = [
  { id: "a1", action: "Notify customer of delay", confidence: 0.92, approved_by: "auto", at: "10:42" },
  { id: "a2", action: "Reassign LD-9821 driver",  confidence: 0.88, approved_by: "dispatcher", at: "10:51" },
  { id: "a3", action: "Draft dispute response",   confidence: 0.81, approved_by: "billing-admin", at: "11:04" },
];

export const RLS_POLICY_EXAMPLES_V4 = [
  { table: "v4_launch_milestones",        policy: "company_id = current_company() OR is_platform_owner(auth.uid())" },
  { table: "strategic_integrations",      policy: "company_id = current_company() AND has_role(auth.uid(), company_id, 'admin')" },
  { table: "carrier_disputes",            policy: "company_id = current_company()" },
  { table: "enterprise_revenue_events",   policy: "has_role(auth.uid(), company_id, 'billing_admin')" },
  { table: "ai_governance_rules",         policy: "has_role(auth.uid(), company_id, 'admin')" },
  { table: "compliance_operations_tasks", policy: "has_role(auth.uid(), company_id, 'security_admin') OR has_role(auth.uid(), company_id, 'admin')" },
  { table: "regional_operations_metrics", policy: "company_id = current_company() AND (region_id = ANY(current_user_regions()) OR has_role(auth.uid(), company_id, 'admin'))" },
];

export const EDGE_FN_PLAN_V4 = [
  { fn: "calculate-v4-launch-readiness",   runtime: "TanStack server fn", reason: "Internal aggregation" },
  { fn: "create-launch-blocker",           runtime: "TanStack server fn", reason: "Auth-bound write" },
  { fn: "resolve-launch-blocker",          runtime: "TanStack server fn", reason: "Auth-bound write" },
  { fn: "generate-enterprise-launch-report", runtime: "TanStack server fn", reason: "Auth-bound report" },
  { fn: "calculate-integration-readiness",  runtime: "TanStack server fn", reason: "Internal calc" },
  { fn: "process-carrier-award",           runtime: "TanStack server fn", reason: "Transactional write" },
  { fn: "create-carrier-dispute",          runtime: "TanStack server fn", reason: "Auth-bound write" },
  { fn: "route-support-escalation",        runtime: "TanStack server fn", reason: "Internal routing" },
  { fn: "stripe-webhook",                  runtime: "Supabase Edge Function", reason: "External signed webhook" },
  { fn: "samsara-webhook",                 runtime: "Supabase Edge Function", reason: "External telematics webhook" },
  { fn: "edi-inbound",                     runtime: "Supabase Edge Function", reason: "External EDI VAN POST" },
  { fn: "cron-nightly-readiness",          runtime: "Supabase Edge Function", reason: "pg_cron-triggered batch" },
];

export const DEMO_STEPS_V4 = [
  "Platform owner opens Enterprise Launch Command Center → V4 readiness 84% with 3 blockers and a live executive summary.",
  "Strategic Integration Dashboard → Mapbox, Stripe, Twilio live; Samsara in security review; readiness rollup by category.",
  "Partner Launch Tracker → 6 partners across pipeline stages with owner + next-step indicators.",
  "Carrier Marketplace Scale → 412 active carriers, 23 open bids, bid comparison, disputes board, suspension queue.",
  "National Carrier Network Dashboard → strong Texas/Midwest, Southeast gap with prioritized recruitment recommendation.",
  "Multi-Region Dispatch → West Texas high load + low driver availability surfaced with regional alerts.",
  "Large-Fleet Performance → 1,840 drivers, 14.2k GPS events/min, API p95 184ms, GPS staleness 1.5%.",
  "Enterprise Onboarding Factory → 14-stage repeatable template with owners and SLA per stage.",
  "Customer Lifecycle → at-risk PortSide Movers flagged (health 54) with renewal in 60 days.",
  "Compliance Operations Center → access review done; 1 support-access exception in review; vendor + DR upcoming.",
  "Mobile Certification → App Store 78%, Google Play 72%; Android Auto safety 70%; CarPlay entitlement pending.",
  "Enterprise Support → SLA attainment 96%, 2 P1 active, escalation routing to Eng on-call.",
  "Governance → quarterly role review + API key rotation + AI action audit in flight.",
  "National Operations Intelligence → regional health, marketplace coverage, expansion recommendations.",
  "Enterprise Revenue Ops → MRR by line, renewals, expansions, NRR placeholder; PortSide flagged.",
  "Partner Revenue Ops → revenue share table and scheduled partner payout pipeline.",
  "AI Governance V4 → approval thresholds enforced, action audit, monthly cost cap 53% consumed.",
];

// ───────────────── Polish: KPIs, trends, ownership ─────────────────
export const LAUNCH_KPIS = [
  { label: "Days to GA",          value: "38",   trend: -4 },
  { label: "Open blockers",       value: "3",    trend: -1 },
  { label: "Critical incidents",  value: "0",    trend:  0 },
  { label: "Pipeline",            value: "$4.2M",trend: +0.4 },
  { label: "Launch confidence",   value: "84%",  trend: +2 },
  { label: "Exec sign-offs",      value: "6/8",  trend: +1 },
];

export const READINESS_TREND = [
  { week: "W-6", overall: 71 }, { week: "W-5", overall: 74 },
  { week: "W-4", overall: 76 }, { week: "W-3", overall: 79 },
  { week: "W-2", overall: 81 }, { week: "W-1", overall: 83 }, { week: "Now", overall: 84 },
];

export const INTEGRATION_ROLLUP = [
  { category: "Telematics",  live: 0, in_flight: 2, planned: 0, readiness: 55 },
  { category: "Accounting",  live: 1, in_flight: 0, planned: 0, readiness: 100 },
  { category: "Map/Routing", live: 1, in_flight: 0, planned: 0, readiness: 100 },
  { category: "Billing",     live: 1, in_flight: 0, planned: 0, readiness: 100 },
  { category: "Fuel",        live: 0, in_flight: 1, planned: 0, readiness: 60 },
  { category: "Maintenance", live: 0, in_flight: 1, planned: 0, readiness: 35 },
  { category: "Notify",      live: 1, in_flight: 0, planned: 0, readiness: 100 },
  { category: "Broker",      live: 0, in_flight: 1, planned: 0, readiness: 65 },
  { category: "EDI",         live: 0, in_flight: 1, planned: 0, readiness: 80 },
];

export const MARKETPLACE_FUNNEL = [
  { stage: "Invited",    count: 1240 },
  { stage: "Onboarded",  count: 612  },
  { stage: "Verified",   count: 487  },
  { stage: "Active",     count: 412  },
  { stage: "Top tier",   count: 96   },
];
export const MARKETPLACE_TRENDS = {
  award_rate_pct: 71, avg_award_time_min: 18, on_time_pct: 93,
  dispute_rate_pct: 0.7, suspension_rate_pct: 1.0,
};
export const SUSPENSIONS = [
  { id: "s1", carrier: "BlueRoad LLC", reason: "Insurance lapsed",         since: "2026-05-19", review: "2026-06-01" },
  { id: "s2", carrier: "Quick Haul Co", reason: "3 late deliveries / 30d", since: "2026-05-21", review: "2026-06-04" },
];

export const ONBOARDING_STAGES_DETAIL = [
  { stage: "Sales handoff",          owner: "AE → IM",      sla_days: 1,  status: "automated" },
  { stage: "Procurement review",     owner: "Procurement",  sla_days: 5,  status: "checklist" },
  { stage: "Security review",        owner: "Security",     sla_days: 7,  status: "checklist" },
  { stage: "Technical discovery",    owner: "Solutions",    sla_days: 5,  status: "template" },
  { stage: "Data migration planning",owner: "Solutions",    sla_days: 7,  status: "template" },
  { stage: "User setup",             owner: "Onboarding",   sla_days: 2,  status: "automated" },
  { stage: "Driver setup",           owner: "Onboarding",   sla_days: 3,  status: "automated" },
  { stage: "Vehicle setup",          owner: "Onboarding",   sla_days: 2,  status: "automated" },
  { stage: "Customer setup",         owner: "Onboarding",   sla_days: 2,  status: "automated" },
  { stage: "Integration setup",      owner: "Integrations", sla_days: 7,  status: "template" },
  { stage: "Pilot planning",         owner: "CS",           sla_days: 5,  status: "template" },
  { stage: "Training",               owner: "CS",           sla_days: 5,  status: "curriculum" },
  { stage: "Go-live",                owner: "CS + Eng",     sla_days: 1,  status: "runbook" },
  { stage: "Post-launch review",     owner: "CS",           sla_days: 14, status: "template" },
];
export const ONBOARDING_KPIS = {
  active_implementations: 4, avg_time_to_go_live_days: 38,
  on_track_pct: 75, blocked: 1, last_quarter_go_lives: 6,
};

export const LIFECYCLE_KPIS = {
  arr_total: 1188000, nrr_pct: 112, gross_churn_pct: 4.1,
  expansion_arr: 96000, renewals_next_90d: 3, at_risk_arr: 96000,
};

export const COMPLIANCE_KPIS = {
  open_tasks: 4, overdue: 0, exceptions: 1,
  evidence_coverage_pct: 78, last_audit_test: "2026-05-12",
};

export const MOBILE_RELEASE_GATES = [
  { gate: "Privacy labels complete",        status: "in_progress" },
  { gate: "Data safety form complete",      status: "in_progress" },
  { gate: "Background location justified",  status: "done" },
  { gate: "Mic permission justified",       status: "in_progress" },
  { gate: "Crash-free sessions > 99.5%",    status: "done" },
  { gate: "Rollout plan signed off",        status: "planned" },
];

export const ANDROID_AUTO_SAFETY = [
  { check: "Driver distraction policy", status: "pass" },
  { check: "Glance time < 2s",          status: "pass" },
  { check: "Voice-first interaction",   status: "in_progress" },
  { check: "No video / no scrolling",   status: "pass" },
  { check: "Touch target compliance",   status: "in_progress" },
];
export const CARPLAY_SAFETY = [
  { check: "Apple driver distraction guidelines", status: "in_progress" },
  { check: "Siri integration scope",              status: "planned" },
  { check: "Background audio handling",           status: "planned" },
  { check: "Template-only UI",                    status: "pass" },
];

export const SUPPORT_TRENDS = [
  { week: "W-4", csat: 4.5, sla: 94, escalations: 3 },
  { week: "W-3", csat: 4.6, sla: 95, escalations: 2 },
  { week: "W-2", csat: 4.6, sla: 96, escalations: 4 },
  { week: "W-1", csat: 4.7, sla: 96, escalations: 2 },
  { week: "Now", csat: 4.7, sla: 96, escalations: 2 },
];

export const GOVERNANCE_KPIS = {
  api_keys_total: 412, api_keys_overdue_rotation: 7,
  privileged_users: 38, dormant_accounts: 4,
  ai_actions_30d: 11820, ai_actions_human_approved_30d: 1184,
};

export const REGION_ALERTS = [
  { region: "Southeast",  level: "warn", msg: "Carrier coverage below 50% on freight" },
  { region: "West Texas", level: "warn", msg: "Driver utilization > 70% — risk of overrun" },
  { region: "Northeast",  level: "info", msg: "Flatbed demand rising 12% WoW" },
];

export const REVENUE_TRENDS = [
  { month: "Feb", mrr: 268000 }, { month: "Mar", mrr: 281000 },
  { month: "Apr", mrr: 294000 }, { month: "May", mrr: 306000 },
];

export const PARTNER_PAYOUTS = [
  { partner: "Samsara",       period: "May 2026", due: "2026-06-05", amount: 14200, status: "scheduled" },
  { partner: "DAT",           period: "May 2026", due: "2026-06-05", amount:  9800, status: "scheduled" },
  { partner: "Stripe Billing",period: "May 2026", due: "2026-06-03", amount:  6400, status: "paid" },
  { partner: "PayCargo",      period: "May 2026", due: "2026-06-05", amount:  3100, status: "scheduled" },
];

export const REPORTS_V4 = [
  { name: "Enterprise launch readiness",   cat: "Launch",       formats: ["CSV","PDF"], schedule: "weekly" },
  { name: "Strategic integration status",  cat: "Integrations", formats: ["CSV","PDF"], schedule: "weekly" },
  { name: "Partner launch pipeline",       cat: "Partners",     formats: ["CSV"],       schedule: "weekly" },
  { name: "Carrier marketplace scale",     cat: "Marketplace",  formats: ["CSV","PDF"], schedule: "daily"  },
  { name: "National carrier coverage",     cat: "Network",      formats: ["CSV","PDF"], schedule: "weekly" },
  { name: "Multi-region operations",       cat: "Dispatch",     formats: ["CSV"],       schedule: "daily"  },
  { name: "Large fleet performance",       cat: "Fleet",        formats: ["CSV","PDF"], schedule: "hourly" },
  { name: "Compliance operations",         cat: "Compliance",   formats: ["PDF"],       schedule: "monthly"},
  { name: "Mobile certification readiness",cat: "Mobile",       formats: ["PDF"],       schedule: "weekly" },
  { name: "Android Auto readiness",        cat: "Mobile",       formats: ["PDF"],       schedule: "weekly" },
  { name: "CarPlay readiness",             cat: "Mobile",       formats: ["PDF"],       schedule: "weekly" },
  { name: "Enterprise support performance",cat: "Support",      formats: ["CSV","PDF"], schedule: "weekly" },
  { name: "Governance review status",      cat: "Governance",   formats: ["PDF"],       schedule: "monthly"},
  { name: "National operations intelligence",cat: "Ops",        formats: ["CSV","PDF"], schedule: "weekly" },
  { name: "Enterprise revenue operations", cat: "Revenue",      formats: ["CSV","PDF"], schedule: "monthly"},
  { name: "Partner revenue & payouts",     cat: "Revenue",      formats: ["CSV"],       schedule: "monthly"},
  { name: "AI governance report",          cat: "AI",           formats: ["PDF"],       schedule: "monthly"},
];

