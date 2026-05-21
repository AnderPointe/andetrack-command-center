/** Phase 20 — V3.5 commercial ecosystem mock data. All numbers are
 *  illustrative placeholders for the demo flow. */

export const V35_SCOPE = [
  { area: "Carrier marketplace monetization", status: "in_scope", note: "Plans, fees, premium visibility" },
  { area: "Carrier network growth",           status: "in_scope", note: "Funnel + region map" },
  { area: "Carrier verification workflow",    status: "in_scope", note: "Draft → approved" },
  { area: "Carrier compliance automation",    status: "placeholder", note: "Insurance / authority / W-9 placeholders" },
  { area: "Carrier performance score",        status: "in_scope" },
  { area: "Carrier settlement",               status: "placeholder", note: "No real payouts" },
  { area: "Partner portal foundation",        status: "in_scope" },
  { area: "Strategic partnership management", status: "in_scope" },
  { area: "Advanced telematics",              status: "in_scope" },
  { area: "Vehicle health placeholder",       status: "placeholder" },
  { area: "Driver behavior placeholder",      status: "placeholder" },
  { area: "Compliance automation",            status: "placeholder", note: "Task queue + calendar" },
  { area: "Certification execution",          status: "in_scope", note: "SOC 2 prep — not certified" },
  { area: "Security questionnaire automation",status: "in_scope" },
  { area: "Vendor review packet builder",     status: "in_scope" },
  { area: "Enterprise procurement readiness", status: "in_scope" },
  { area: "API partner monetization",         status: "in_scope" },
  { area: "Enterprise customer success",      status: "in_scope" },
  { area: "Commercial operations dashboard",  status: "in_scope" },
  { area: "Multi-region operations",          status: "in_scope" },
  { area: "Platform revenue operations",      status: "in_scope" },
] as const;

export const V35_DEFERRED = [
  "Fully autonomous dispatch (requires human approval)",
  "Final SOC 2 certification claim",
  "Final DOT/FMCSA compliance automation claim",
  "Final Android Auto / CarPlay certification",
  "Insurance underwriting automation",
  "Full carrier factoring / settlement production",
  "Marketplace liquidity guarantees",
  "Autonomous vehicle integrations",
];

export const V35_READINESS = { release: 78, monetization: 65, compliance: 54, partner: 70 };

export const V35_FEATURE_MATRIX = [
  { feature: "Carrier subscription plans", trial: false, growth: true,  scale: true,  enterprise: true },
  { feature: "Premium carrier visibility", trial: false, growth: false, scale: true,  enterprise: true },
  { feature: "Marketplace transaction fee",trial: false, growth: true,  scale: true,  enterprise: true },
  { feature: "Carrier settlement (placeholder)", trial: false, growth: false, scale: true, enterprise: true },
  { feature: "Partner API plans",          trial: false, growth: false, scale: true,  enterprise: true },
  { feature: "Security questionnaire automation", trial: false, growth: false, scale: false, enterprise: true },
  { feature: "Vendor review packet builder", trial: false, growth: false, scale: false, enterprise: true },
  { feature: "Multi-region operations",    trial: false, growth: false, scale: true,  enterprise: true },
];

export const CARRIER_PLANS = [
  { id: "p_basic",   name: "Carrier Basic",   price: 0,    fee_bps: 200, premium: false, api: false },
  { id: "p_pro",     name: "Carrier Pro",     price: 4900, fee_bps: 150, premium: true,  api: false },
  { id: "p_premium", name: "Carrier Premium", price: 9900, fee_bps: 100, premium: true,  api: true  },
];

export const CARRIER_SUBSCRIPTIONS = [
  { id: "cs_1", carrier: "Coastal Freight Co.", plan: "Carrier Pro",     status: "active", renewed: "2026-04-12" },
  { id: "cs_2", carrier: "Lonestar Hotshot",    plan: "Carrier Basic",   status: "active", renewed: "2026-05-01" },
  { id: "cs_3", carrier: "Northbound Logistics",plan: "Carrier Premium", status: "active", renewed: "2026-03-22" },
  { id: "cs_4", carrier: "Pioneer Refrigerated",plan: "Carrier Pro",     status: "trial",  renewed: "—" },
];

export const CARRIER_REVENUE_EVENTS = [
  { id: "re_1", type: "subscription_renewed",  carrier: "Coastal Freight Co.",  amount: 4900, at: "2026-05-01 09:12" },
  { id: "re_2", type: "transaction_fee",       carrier: "Northbound Logistics", amount: 142,  at: "2026-05-12 14:33" },
  { id: "re_3", type: "premium_listing",       carrier: "Coastal Freight Co.",  amount: 1900, at: "2026-05-14 10:01" },
  { id: "re_4", type: "subscription_started",  carrier: "Pioneer Refrigerated", amount: 0,    at: "2026-05-18 16:44" },
  { id: "re_5", type: "transaction_fee",       carrier: "Lonestar Hotshot",     amount: 86,   at: "2026-05-19 08:20" },
];

export const MARKETPLACE_FEE_SETTINGS = [
  { type: "Transaction fee",     value: "1.5% of awarded rate" },
  { type: "Premium listing",     value: "$19 / week" },
  { type: "Marketplace service", value: "$0.75 per posted load" },
  { type: "Settlement processing (placeholder)", value: "$2.50 per settlement" },
];

export const CARRIER_NETWORK_METRICS = {
  total: 184, active: 142, verified: 121, pending: 17, rejected: 8, response_rate: 0.71,
  award_rate: 0.34, completion_rate: 0.96, compliance_complete: 0.82,
};

export const CARRIER_REGION_COVERAGE = [
  { region: "Gulf Coast",   carriers: 38, gap: false },
  { region: "South TX",     carriers: 22, gap: false },
  { region: "West TX",      carriers: 6,  gap: true  },
  { region: "Southeast",    carriers: 34, gap: false },
  { region: "Midwest",      carriers: 27, gap: false },
  { region: "Mountain",     carriers: 12, gap: true  },
  { region: "Pacific NW",   carriers: 18, gap: false },
];

export const CARRIER_EQUIPMENT_COVERAGE = [
  { equipment: "Cargo Van",    carriers: 41 }, { equipment: "Sprinter", carriers: 33 },
  { equipment: "Hotshot",      carriers: 18 }, { equipment: "Box Truck",carriers: 27 },
  { equipment: "Reefer",       carriers: 14 }, { equipment: "Flatbed",  carriers: 11 },
];

export const VERIFICATION_STEPS = [
  "Company profile","Contact verification","Authority placeholder","Insurance placeholder",
  "W-9 placeholder","Equipment profile","Service region","Safety rating placeholder",
  "Document upload","Internal review","Approved / rejected",
];

export const VERIFICATION_QUEUE = [
  { id: "v_1", carrier: "Pioneer Refrigerated", status: "in_review",      submitted: "2026-05-18" },
  { id: "v_2", carrier: "Apex Hotshot LLC",     status: "needs_more_info",submitted: "2026-05-15" },
  { id: "v_3", carrier: "Bayou Trans",          status: "submitted",      submitted: "2026-05-19" },
  { id: "v_4", carrier: "Skyline Cartage",      status: "approved",       submitted: "2026-05-10" },
];

export const COMPLIANCE_ALERTS = [
  { id: "ca_1", carrier: "Coastal Freight Co.", type: "insurance_expiring", days: 12, severity: "warn" },
  { id: "ca_2", carrier: "Lonestar Hotshot",    type: "w9_missing",         days: null, severity: "high" },
  { id: "ca_3", carrier: "Apex Hotshot LLC",    type: "authority_unverified", days: null, severity: "high" },
  { id: "ca_4", carrier: "Bayou Trans",         type: "safety_rating_pending", days: null, severity: "info" },
];

export const COMPLIANCE_SCORE_CARDS = [
  { carrier: "Coastal Freight Co.", score: 88, expiring: 1, missing: 0 },
  { carrier: "Northbound Logistics", score: 94, expiring: 0, missing: 0 },
  { carrier: "Lonestar Hotshot",    score: 62, expiring: 0, missing: 2 },
  { carrier: "Apex Hotshot LLC",    score: 41, expiring: 0, missing: 3 },
];

export const CARRIER_PERFORMANCE = [
  { carrier: "Coastal Freight Co.",  on_time_pu: 96, on_time_del: 94, acceptance: 71, cancel: 3, pod: 97, score: 92 },
  { carrier: "Northbound Logistics", on_time_pu: 98, on_time_del: 97, acceptance: 64, cancel: 1, pod: 99, score: 95 },
  { carrier: "Lonestar Hotshot",    on_time_pu: 86, on_time_del: 81, acceptance: 52, cancel: 8, pod: 88, score: 74 },
  { carrier: "Pioneer Refrigerated", on_time_pu: 91, on_time_del: 89, acceptance: 47, cancel: 4, pod: 92, score: 83 },
];

export const SETTLEMENTS = [
  { id: "st_1", load: "L-10422", carrier: "Coastal Freight Co.",  rate: 1840, status: "ready_for_payment", approved_by: "M. Hill",  approved_at: "2026-05-18" },
  { id: "st_2", load: "L-10431", carrier: "Northbound Logistics", rate: 2210, status: "approved",          approved_by: "L. Brooks", approved_at: "2026-05-19" },
  { id: "st_3", load: "L-10438", carrier: "Lonestar Hotshot",    rate: 820,  status: "pending_pod",        approved_by: "—",         approved_at: "—" },
  { id: "st_4", load: "L-10440", carrier: "Pioneer Refrigerated", rate: 1995, status: "disputed",           approved_by: "—",         approved_at: "—" },
];

export const PARTNER_TYPES = [
  "carrier","shipper","broker","api","telematics","integration","strategic",
];

export const PARTNERS = [
  { id: "pa_1", name: "Samsara",     type: "telematics",  status: "integrated", revenue: 0,    launch: "live" },
  { id: "pa_2", name: "Motive",      type: "telematics",  status: "integrating", revenue: 0,   launch: "beta" },
  { id: "pa_3", name: "Apex Supply", type: "shipper",     status: "active",     revenue: 18200, launch: "live" },
  { id: "pa_4", name: "Highway Brokers", type: "broker",  status: "evaluating", revenue: 0,    launch: "discovery" },
  { id: "pa_5", name: "RouteData.io",type: "api",         status: "active",     revenue: 2400, launch: "live" },
];

export const STRATEGIC_PARTNERSHIPS = [
  { name: "Samsara",  integration: "live",      commercial: "co-sell",   revenue_opportunity: 250000, security: "approved",  launch: "live" },
  { name: "Motive",   integration: "beta",      commercial: "evaluating",revenue_opportunity: 180000, security: "in_review", launch: "beta" },
  { name: "McLeod",   integration: "discovery", commercial: "evaluating",revenue_opportunity: 320000, security: "pending",   launch: "planning" },
  { name: "Highway",  integration: "discovery", commercial: "evaluating",revenue_opportunity: 90000,  security: "pending",   launch: "planning" },
];

export const TELEMATICS_FLEET = {
  connected: 142, mapped: 138, sync_health: 0.96, providers_active: 3, devices_with_errors: 4,
};

export const TELEMATICS_VEHICLES = [
  { vehicle: "FT-104", provider: "Samsara", health: 91, dtcs: 0, idle_min: 42,  last_sync: "2m ago" },
  { vehicle: "CV-221", provider: "Motive",  health: 84, dtcs: 1, idle_min: 88,  last_sync: "4m ago" },
  { vehicle: "BT-310", provider: "Samsara", health: 68, dtcs: 3, idle_min: 121, last_sync: "1m ago" },
  { vehicle: "HS-118", provider: "Geotab",  health: 78, dtcs: 0, idle_min: 67,  last_sync: "12m ago" },
];

export const TELEMATICS_EVENTS = [
  { at: "10:02", vehicle: "BT-310", type: "harsh_brake", severity: "warn" },
  { at: "10:14", vehicle: "CV-221", type: "idle_long",   severity: "info" },
  { at: "10:23", vehicle: "BT-310", type: "dtc_p0420",   severity: "high" },
  { at: "10:41", vehicle: "FT-104", type: "geofence_exit", severity: "info" },
];

export const VEHICLE_HEALTH = [
  { vehicle: "BT-310", score: 68, risk: "medium", service_due_days: 7,  note: "DTC P0420 placeholder + idle trend" },
  { vehicle: "CV-221", score: 84, risk: "low",    service_due_days: 32, note: "Idle minutes above fleet median" },
  { vehicle: "FT-104", score: 91, risk: "low",    service_due_days: 54, note: "Healthy" },
  { vehicle: "HS-118", score: 78, risk: "low",    service_due_days: 18, note: "Sync gap > 10m" },
];

export const DRIVER_BEHAVIOR = [
  { driver: "Marcus Hill", speeding: 1, harsh_brake: 0, harsh_accel: 0, idle: 38,  score: 92, coaching: false },
  { driver: "Lena Brooks", speeding: 0, harsh_brake: 1, harsh_accel: 0, idle: 42,  score: 90, coaching: false },
  { driver: "Anthony Reed",speeding: 3, harsh_brake: 4, harsh_accel: 2, idle: 121, score: 64, coaching: true  },
  { driver: "Sara Quinn",  speeding: 0, harsh_brake: 0, harsh_accel: 0, idle: 29,  score: 96, coaching: false },
];

export const COMPLIANCE_TASKS = [
  { id: "ct_1", category: "Driver documents",  title: "Renew CDL — A. Reed",         due: "2026-06-04", status: "open" },
  { id: "ct_2", category: "Vehicle documents", title: "FT-104 registration renewal", due: "2026-07-12", status: "open" },
  { id: "ct_3", category: "Insurance",         title: "Carrier insurance — Coastal", due: "2026-06-01", status: "open" },
  { id: "ct_4", category: "Audit logs",        title: "Quarterly access review",     due: "2026-06-30", status: "in_progress" },
  { id: "ct_5", category: "Retention",         title: "GPS retention review",        due: "2026-07-01", status: "open" },
];

export const COMPLIANCE_CATEGORIES = [
  "Driver documents","Vehicle documents","Carrier documents","Insurance documents",
  "Safety policies","Location tracking consent","Data retention policy",
  "Customer privacy requirements","Billing records","Audit logs","EDI acknowledgments","API access review",
];

export const CERT_PROJECTS = [
  { framework: "SOC 2 Type I",    status: "in_execution", target: "2026-08-15", readiness: 72 },
  { framework: "Pen test",        status: "scheduled",    target: "2026-07-01", readiness: 60 },
  { framework: "Vendor sec rev.", status: "ongoing",      target: "rolling",    readiness: 80 },
  { framework: "Privacy review",  status: "in_execution", target: "2026-07-15", readiness: 66 },
];

export const CERT_TASKS = [
  { ctrl: "CC6.1", title: "Access review evidence", owner: "Security",  status: "in_progress" },
  { ctrl: "CC7.2", title: "Incident response test", owner: "Eng",       status: "todo" },
  { ctrl: "CC8.1", title: "Change mgmt workflow",   owner: "Eng",       status: "in_progress" },
  { ctrl: "A.1.1", title: "Backup restore test",    owner: "Platform",  status: "done" },
  { ctrl: "P.2.1", title: "DSAR runbook",           owner: "Privacy",   status: "in_progress" },
];

export const CERT_GAPS = [
  { gap: "Formal vendor risk review cadence", severity: "medium" },
  { gap: "Quarterly disaster recovery drill",  severity: "medium" },
  { gap: "Documented secrets rotation policy", severity: "low" },
];

export const QUESTIONNAIRE_LIBRARY = [
  { key: "encryption_at_rest", answer: "AES-256 via managed Postgres; storage objects encrypted.", control: "CC6.7", evidence: "evidence/encryption.pdf" },
  { key: "encryption_in_transit", answer: "TLS 1.2+ enforced; HSTS on web surfaces.", control: "CC6.7", evidence: "evidence/tls.pdf" },
  { key: "rls_model", answer: "Per-tenant RLS scoped by company_id with security definer helpers.", control: "CC6.1", evidence: "evidence/rls-policies.pdf" },
  { key: "incident_response", answer: "On-call rotation + 24h customer notification SLA.", control: "CC7.2", evidence: "evidence/ir-runbook.pdf" },
  { key: "data_retention", answer: "Tenant-configurable 90/365/2555 day buckets.", control: "P.4.2", evidence: "evidence/retention-policy.pdf" },
  { key: "subprocessors",   answer: "Listed on /trust/subprocessors with 30-day change notice.", control: "P.6.1", evidence: "evidence/subprocessors.pdf" },
];

export const QUESTIONNAIRE_QUEUE = [
  { id: "qq_1", customer: "Westbrook Manufacturing", questions: 142, answered: 118, status: "in_review" },
  { id: "qq_2", customer: "Northstar Foods",         questions: 86,  answered: 86,  status: "ready_for_export" },
  { id: "qq_3", customer: "Apex Supply Co.",          questions: 112, answered: 64,  status: "drafting" },
];

export const PACKET_SECTIONS = [
  "Company overview","Security overview","Privacy overview","Data retention",
  "Access control","Incident response","Business continuity","Subprocessors (placeholder)",
  "Compliance roadmap","Insurance (placeholder)","Support process","Contact info",
];

export const VENDOR_PACKETS = [
  { id: "vp_1", customer: "Westbrook Manufacturing", status: "ready",   sections_complete: 12 },
  { id: "vp_2", customer: "Northstar Foods",         status: "ready",   sections_complete: 12 },
  { id: "vp_3", customer: "Apex Supply Co.",         status: "drafting",sections_complete: 8  },
];

export const PROCUREMENT_PROJECTS = [
  { customer: "Westbrook Manufacturing", owner: "Commercial", readiness: 92, status: "in_progress" },
  { customer: "Northstar Foods",         owner: "Commercial", readiness: 80, status: "in_progress" },
  { customer: "Apex Supply Co.",          owner: "Commercial", readiness: 58, status: "in_progress" },
];

export const PROCUREMENT_CHECKLIST = [
  "Security packet ready","Privacy policy ready","Terms ready","Insurance (placeholder)",
  "W-9 (placeholder)","Vendor form","DPA (placeholder)","Support SLA (placeholder)",
  "Pricing approval","Legal review (placeholder)","Implementation plan","Procurement owner",
];

export const API_PLANS = [
  { name: "Developer", quota: 10000,  overage: 50,  sla: "best_effort" },
  { name: "Growth",    quota: 100000, overage: 35,  sla: "standard"    },
  { name: "Scale",     quota: 1000000,overage: 20,  sla: "premium"     },
];

export const API_PARTNERS = [
  { id: "ap_1", partner: "RouteData.io",   plan: "Growth",   used: 87420,   overage: 0,    revenue: 2400 },
  { id: "ap_2", partner: "DispatchSyncX",  plan: "Scale",    used: 1240500, overage: 240500, revenue: 9200 },
  { id: "ap_3", partner: "BrokerBridge",   plan: "Developer",used: 11200,   overage: 1200, revenue: 110 },
];

export const ENTERPRISE_ACCOUNTS = [
  { customer: "Westbrook Manufacturing", tier: "Enterprise", health: 88, adoption: 91, exec: "S. Greer",  go_live: "live",    renewal: "2026-11-01", risk: "low",    expansion: "EDI module" },
  { customer: "Northstar Foods",         tier: "Enterprise", health: 76, adoption: 74, exec: "J. Patel",  go_live: "live",    renewal: "2026-09-15", risk: "medium", expansion: "API partner add-on" },
  { customer: "Apex Supply Co.",          tier: "Growth+",    health: 64, adoption: 58, exec: "R. Mendoza",go_live: "planning",renewal: "2026-12-10", risk: "medium", expansion: "—" },
];

export const COMMERCIAL_OPS = {
  active_subscriptions: 142, carrier_subscriptions: 38, marketplace_rev: 18420, api_rev: 11710,
  implementation_fees: 24000, trial_conversions: 0.34, paid_customers: 142, enterprise_pipeline: 6,
  expansion_rev: 8400, churn_risk: 4, support_cost: 5200,
};

export const REGIONAL_METRICS = [
  { region: "Gulf Coast", drivers: 48, loads: 312, carriers: 38, on_time: 95.2, gap: false },
  { region: "South TX",   drivers: 22, loads: 184, carriers: 22, on_time: 94.1, gap: false },
  { region: "West TX",    drivers: 6,  loads: 41,  carriers: 6,  on_time: 87.4, gap: true  },
  { region: "Southeast",  drivers: 34, loads: 221, carriers: 34, on_time: 93.8, gap: false },
  { region: "Midwest",    drivers: 27, loads: 168, carriers: 27, on_time: 92.6, gap: false },
  { region: "Mountain",   drivers: 12, loads: 58,  carriers: 12, on_time: 88.9, gap: true  },
];

export const PLATFORM_REVENUE_EVENTS = [
  { product: "Company subscription", event: "saas_renewed", amount: 14900, at: "2026-05-01" },
  { product: "Carrier subscription", event: "carrier_renewed", amount: 4900, at: "2026-05-01" },
  { product: "API overage",         event: "overage_billed", amount: 8400, at: "2026-05-04" },
  { product: "Marketplace fee",     event: "transaction_fee",amount: 142,  at: "2026-05-12" },
  { product: "Implementation",      event: "impl_fee",       amount: 12000,at: "2026-05-14" },
];

export const PLATFORM_REVENUE_BY_LINE = [
  { line: "SaaS subscriptions",  amount: 184200 },
  { line: "Carrier marketplace", amount: 18420 },
  { line: "API",                 amount: 11710 },
  { line: "Implementation",      amount: 24000 },
  { line: "Premium support",     amount: 6400 },
];

export const V35_REPORTS = [
  "Carrier marketplace revenue","Carrier performance","Carrier compliance",
  "API usage revenue","API rate limits","EDI transaction success","Telematics health",
  "Vehicle health (placeholder)","Driver behavior (placeholder)","Enterprise procurement",
  "Certification progress","Customer success health","Commercial revenue operations","Multi-region performance",
];

export const DEMO_FLOW = [
  "Platform owner opens Commercial Operations Dashboard.",
  "Revenue dashboard shows SaaS, carrier marketplace, API, and enterprise pipeline.",
  "Company admin opens Carrier Marketplace Monetization.",
  "Admin activates Carrier Pro subscription plan.",
  "Carrier submits verification documents.",
  "Carrier compliance automation flags expiring insurance (placeholder).",
  "Admin reviews and approves the carrier.",
  "Dispatcher posts a load to the marketplace.",
  "Carrier submits a bid.",
  "Dispatcher awards the load.",
  "Carrier settlement placeholder is created.",
  "Marketplace fee is recorded as a revenue event.",
  "Admin opens Advanced Telematics Dashboard.",
  "Vehicle health placeholder flags BT-310 for inspection.",
  "Driver behavior placeholder shows coaching opportunity for A. Reed.",
  "Enterprise admin opens Certification Execution Dashboard.",
  "Security questionnaire automation fills answers from the library.",
  "Vendor review packet is generated and queued for approval.",
  "Procurement checklist reaches 80% for Northstar Foods.",
  "Partner opens Partner API dashboard.",
  "API usage is tracked; overage warning appears for DispatchSyncX.",
  "API revenue event is created.",
  "Executive opens Multi-Region Operations Dashboard.",
  "Regional coverage gap appears in West Texas.",
  "Carrier network recommendation suggests adding hotshot carriers in West TX.",
];
