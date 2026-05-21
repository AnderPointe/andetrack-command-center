// Mock data for Phase 22 (V4.5 operational maturity). Demo-only, no PII.

export const V45_SCOPE = {
  included: [
    "Automation maturity dashboard",
    "Human-approved automation center",
    "National marketplace operations",
    "Marketplace playbooks & disputes",
    "Carrier quality operations",
    "Enterprise certification execution",
    "SOC 2 execution tracker",
    "ISO 27001 readiness placeholder",
    "Mobile launch execution center",
    "Android Auto / CarPlay execution",
    "Strategic partnership readiness",
    "Acquisition readiness dashboard",
    "Procurement packet maturity",
    "Enterprise customer maturity",
    "Customer success / Support maturity",
    "AI governance maturity",
    "Revenue operations maturity",
    "Partner ecosystem management",
    "Operational playbook library",
    "National operating model",
    "Platform operating metrics",
  ],
  deferred: [
    "Fully autonomous dispatch",
    "Final certification claims without audit evidence",
    "Autonomous vehicle workflows",
    "Global customs workflows",
    "Full insurance underwriting",
    "Full factoring / settlement production",
    "International localization",
  ],
};

export const V45_MATURITY = {
  overall: 71,
  automation: 72,
  marketplace_ops: 81,
  mobile_launch: 76,
  soc2_execution: 68,
  acquisition: 61,
  customer_success: 74,
  support: 79,
  ai_governance: 70,
  revenue_ops: 77,
  partner_ecosystem: 66,
};

export const V45_FEATURE_MATRIX = [
  { area: "Automation",        ga: "partial",   notes: "Approval flows live; auto-execution gated" },
  { area: "Marketplace ops",   ga: "ga",        notes: "Playbooks + disputes operational" },
  { area: "SOC 2",             ga: "in_prog",   notes: "3 controls in remediation" },
  { area: "ISO 27001",         ga: "planned",   notes: "Placeholder, no auditor engaged" },
  { area: "Mobile launch",     ga: "in_prog",   notes: "iOS 85%, Android 80%" },
  { area: "Android Auto",      ga: "in_prog",   notes: "Safety review pending" },
  { area: "CarPlay",           ga: "blocked",   notes: "Entitlement pending Apple" },
  { area: "Acquisition pack",  ga: "in_prog",   notes: "Data room 62%" },
  { area: "Partner ecosystem", ga: "partial",   notes: "Telematics partner GA" },
];

export const AUTOMATION_WORKFLOWS = [
  { id: "auto-1",  category: "Dispatch",            level: "assisted",  risk: "high",   success: 92, manual_override: 8,  approvals_required: true,  audit: "full" },
  { id: "auto-2",  category: "Load offers",         level: "assisted",  risk: "high",   success: 88, manual_override: 12, approvals_required: true,  audit: "full" },
  { id: "auto-3",  category: "Customer updates",    level: "approved",  risk: "medium", success: 96, manual_override: 4,  approvals_required: true,  audit: "full" },
  { id: "auto-4",  category: "Notifications",       level: "automated", risk: "low",    success: 99, manual_override: 1,  approvals_required: false, audit: "sampled" },
  { id: "auto-5",  category: "Webhooks",            level: "automated", risk: "low",    success: 98, manual_override: 2,  approvals_required: false, audit: "sampled" },
  { id: "auto-6",  category: "Billing usage",       level: "approved",  risk: "high",   success: 94, manual_override: 6,  approvals_required: true,  audit: "full" },
  { id: "auto-7",  category: "EDI ACKs",            level: "automated", risk: "medium", success: 97, manual_override: 3,  approvals_required: false, audit: "full" },
  { id: "auto-8",  category: "Support triage",      level: "assisted",  risk: "medium", success: 86, manual_override: 14, approvals_required: false, audit: "sampled" },
  { id: "auto-9",  category: "Compliance reminders",level: "automated", risk: "low",    success: 99, manual_override: 1,  approvals_required: false, audit: "sampled" },
  { id: "auto-10", category: "Data cleanup",        level: "approved",  risk: "medium", success: 95, manual_override: 5,  approvals_required: true,  audit: "full" },
  { id: "auto-11", category: "Reporting",           level: "automated", risk: "low",    success: 99, manual_override: 1,  approvals_required: false, audit: "sampled" },
  { id: "auto-12", category: "Driver alerts",       level: "assisted",  risk: "high",   success: 90, manual_override: 10, approvals_required: true,  audit: "full" },
];

export const AUTOMATION_KPIS = {
  success_rate: 94.2,
  failure_rate: 5.8,
  manual_override_rate: 6.1,
  audit_coverage: 88,
  governance_score: 72,
  time_saved_hrs_week: 142, // placeholder
};

export const APPROVAL_QUEUE = [
  { id: "ap-101", type: "Driver reassignment", load: "L-22841", confidence: 0.91, requested_by: "CoPilot", explanation: "Closer driver, ETA -38m", status: "pending" },
  { id: "ap-102", type: "Customer update",      load: "L-22863", confidence: 0.97, requested_by: "CoPilot", explanation: "Delay 22m due to traffic on I-95", status: "pending" },
  { id: "ap-103", type: "Carrier award",        load: "L-22877", confidence: 0.84, requested_by: "Marketplace", explanation: "Lowest qualified bid, preferred carrier", status: "pending" },
  { id: "ap-104", type: "EDI 990 response",     load: "L-22802", confidence: 0.99, requested_by: "EDI engine", explanation: "Standard acceptance", status: "approved" },
  { id: "ap-105", type: "Carrier suspension",   load: "—",       confidence: 1.00, requested_by: "Quality ops", explanation: "3 disputes in 30d", status: "escalated" },
];

export const MARKETPLACE_OPS = {
  total_loads: 12840,
  posted: 1820,
  awarded: 1612,
  open_bids: 208,
  accept_rate: 78.4,
  reject_rate: 21.6,
  avg_time_to_award_min: 42,
  marketplace_revenue_mtd: 184_500,
  disputes_open: 7,
  compliance_issues: 3,
};

export const MARKETPLACE_REGIONAL = [
  { region: "West",      coverage: 88, gap: "Box trucks · Pacific NW" },
  { region: "Midwest",   coverage: 92, gap: "—" },
  { region: "South",     coverage: 84, gap: "Reefer · TX/LA corridor" },
  { region: "Southeast", coverage: 71, gap: "Flatbed · FL/GA" },
  { region: "Northeast", coverage: 86, gap: "Drayage · NJ ports" },
];

export const MARKETPLACE_PLAYBOOKS = [
  { id: "pb-1",  title: "Onboard a carrier",                steps: 9,  owner: "Ops",      assigned: 3, completed: 1 },
  { id: "pb-2",  title: "Verify carrier documents",         steps: 7,  owner: "Compliance", assigned: 2, completed: 2 },
  { id: "pb-3",  title: "Post a load",                      steps: 5,  owner: "Dispatch", assigned: 4, completed: 4 },
  { id: "pb-4",  title: "Award a load",                     steps: 6,  owner: "Dispatch", assigned: 4, completed: 3 },
  { id: "pb-5",  title: "Handle a carrier dispute",         steps: 8,  owner: "Ops",      assigned: 2, completed: 0 },
  { id: "pb-6",  title: "Suspend a carrier",                steps: 6,  owner: "Quality",  assigned: 1, completed: 0 },
  { id: "pb-7",  title: "Resolve missing POD",              steps: 5,  owner: "Support",  assigned: 5, completed: 4 },
  { id: "pb-8",  title: "Handle customer complaint",        steps: 6,  owner: "CS",       assigned: 3, completed: 2 },
  { id: "pb-9",  title: "Failed marketplace payment (PLACEHOLDER)", steps: 4, owner: "Billing", assigned: 0, completed: 0 },
  { id: "pb-10", title: "Compliance exception",             steps: 7,  owner: "Compliance", assigned: 1, completed: 0 },
];

export const CARRIER_QUALITY = [
  { id: "c-001", name: "Atlas Freight",    perf: 94, compliance: 97, on_time: 96, comm: 91, pod: 98, issues: 1, disputes: 0, status: "preferred" },
  { id: "c-002", name: "Bridger Transport",perf: 88, compliance: 92, on_time: 89, comm: 84, pod: 90, issues: 2, disputes: 1, status: "active" },
  { id: "c-003", name: "Cascade Lines",    perf: 72, compliance: 80, on_time: 71, comm: 70, pod: 77, issues: 5, disputes: 3, status: "watchlist" },
  { id: "c-004", name: "Delta Cargo",      perf: 67, compliance: 74, on_time: 65, comm: 60, pod: 70, issues: 7, disputes: 4, status: "watchlist" },
  { id: "c-005", name: "Evergreen Haul",   perf: 91, compliance: 95, on_time: 93, comm: 88, pod: 94, issues: 1, disputes: 0, status: "preferred" },
];

export const MARKETPLACE_DISPUTES = [
  { id: "d-501", type: "POD dispute",          carrier: "Cascade Lines",   load: "L-22701", status: "Under Review",       opened: "2d", amount: 1280 },
  { id: "d-502", type: "Accessorial dispute",  carrier: "Delta Cargo",     load: "L-22745", status: "Waiting on Carrier", opened: "1d", amount: 240 },
  { id: "d-503", type: "Carrier no-show",      carrier: "Delta Cargo",     load: "L-22812", status: "Escalated",          opened: "4h", amount: 0 },
  { id: "d-504", type: "Rate dispute",         carrier: "Bridger Transport", load: "L-22689", status: "Waiting on Customer", opened: "3d", amount: 410 },
  { id: "d-505", type: "Incorrect status",     carrier: "Cascade Lines",   load: "L-22755", status: "Resolved",           opened: "5d", amount: 0 },
];

export const CERTIFICATION_PROJECTS = [
  { id: "cert-soc2", name: "SOC 2 Type II",         progress: 68, owner: "Security", due: "2026-09-30", status: "in_progress" },
  { id: "cert-iso",  name: "ISO 27001 (PLACEHOLDER)", progress: 12, owner: "Security", due: "TBD",        status: "planned" },
  { id: "cert-pen",  name: "Pen test (PLACEHOLDER)", progress: 40, owner: "Security", due: "2026-07-15", status: "in_progress" },
  { id: "cert-priv", name: "Privacy review",        progress: 82, owner: "Legal",    due: "2026-06-30", status: "in_progress" },
  { id: "cert-mob",  name: "Mobile security review",progress: 74, owner: "Mobile",   due: "2026-07-30", status: "in_progress" },
  { id: "cert-api",  name: "API security review",   progress: 80, owner: "Platform", due: "2026-07-10", status: "in_progress" },
  { id: "cert-edi",  name: "EDI process review",    progress: 65, owner: "Integrations", due: "2026-08-15", status: "in_progress" },
  { id: "cert-ir",   name: "IR tabletop",           progress: 55, owner: "Security", due: "2026-07-01", status: "in_progress" },
  { id: "cert-br",   name: "Backup restore test",   progress: 90, owner: "Platform", due: "2026-06-15", status: "in_progress" },
  { id: "cert-acc",  name: "Access review campaign",progress: 78, owner: "Security", due: "2026-06-30", status: "in_progress" },
];

export const SOC2_CONTROLS = [
  { id: "CC1.1", area: "Security",       title: "Code of conduct", owner: "People",   status: "Ready for Auditor",   evidence: 4, exceptions: 0 },
  { id: "CC2.1", area: "Security",       title: "Risk assessment", owner: "Security", status: "Tested",              evidence: 6, exceptions: 1 },
  { id: "CC6.1", area: "Security",       title: "Logical access",  owner: "Platform", status: "Needs Remediation",   evidence: 3, exceptions: 2 },
  { id: "CC6.7", area: "Security",       title: "Encryption",      owner: "Platform", status: "Evidence Collected",  evidence: 5, exceptions: 0 },
  { id: "CC7.2", area: "Security",       title: "Monitoring",      owner: "Platform", status: "Implemented",         evidence: 2, exceptions: 0 },
  { id: "A1.1",  area: "Availability",   title: "Capacity planning", owner: "Platform", status: "Needs Remediation", evidence: 1, exceptions: 1 },
  { id: "A1.2",  area: "Availability",   title: "Backup",          owner: "Platform", status: "Ready for Auditor",   evidence: 6, exceptions: 0 },
  { id: "PI1.1", area: "Processing Integrity", title: "Input validation", owner: "Platform", status: "Tested",       evidence: 4, exceptions: 0 },
  { id: "C1.1",  area: "Confidentiality",title: "Data classification", owner: "Security", status: "Designed",        evidence: 1, exceptions: 0 },
  { id: "P1.1",  area: "Privacy",        title: "Notice",          owner: "Legal",    status: "Needs Remediation",   evidence: 2, exceptions: 1 },
];

export const SOC2_READINESS = 68;

export const MOBILE_LAUNCH = {
  ios: 85,
  android: 80,
  ios_checklist: [
    { item: "App icons",            done: true },
    { item: "Splash screens",       done: true },
    { item: "Store screenshots",    done: true },
    { item: "Privacy labels",       done: true },
    { item: "Background location disclosure", done: true },
    { item: "Microphone disclosure",done: false },
    { item: "Push notification disclosure", done: true },
    { item: "Release notes",        done: true },
    { item: "TestFlight live",      done: true },
    { item: "Forced update policy", done: false },
  ],
  android_checklist: [
    { item: "App icons",            done: true },
    { item: "Splash screens",       done: true },
    { item: "Store screenshots",    done: true },
    { item: "Data Safety form",     done: true },
    { item: "Background location disclosure", done: true },
    { item: "Microphone disclosure",done: false },
    { item: "Push notification disclosure", done: true },
    { item: "Release notes",        done: true },
    { item: "Internal testing live",done: true },
    { item: "Forced update policy", done: false },
  ],
  rollout_pct: 25,
  crash_free_sessions: 99.4, // placeholder
};

export const ANDROID_AUTO_EXEC = {
  readiness: 58,
  items: [
    { item: "Native module design",     status: "in_progress" },
    { item: "Android for Cars templates", status: "in_progress" },
    { item: "Navigation templates",     status: "in_progress" },
    { item: "Driver-safe actions",      status: "pass" },
    { item: "Voice-first commands",     status: "in_progress" },
    { item: "Safety review",            status: "pending" },
    { item: "Test coverage",            status: "in_progress" },
    { item: "Emulator testing",         status: "pass" },
    { item: "Device testing (PLACEHOLDER)", status: "pending" },
    { item: "Review submission (PLACEHOLDER)", status: "pending" },
  ],
};

export const CARPLAY_EXEC = {
  readiness: 41,
  items: [
    { item: "Entitlement request",      status: "pending" },
    { item: "Native module design",     status: "in_progress" },
    { item: "CarPlay nav templates",    status: "in_progress" },
    { item: "Driver-safe controls",     status: "in_progress" },
    { item: "Siri/voice (PLACEHOLDER)", status: "pending" },
    { item: "Safety review",            status: "pending" },
    { item: "Test coverage",            status: "in_progress" },
    { item: "Review submission (PLACEHOLDER)", status: "pending" },
  ],
};

export const PARTNERSHIPS = [
  { id: "p-001", name: "Samsara",    category: "Telematics",       fit: 92, security: "approved",   legal: "signed",   stage: "launch_ready" },
  { id: "p-002", name: "Convoy Network", category: "Carrier networks", fit: 81, security: "in_review", legal: "drafting", stage: "diligence" },
  { id: "p-003", name: "WEX",        category: "Fuel cards",       fit: 86, security: "approved",   legal: "signed",   stage: "integrating" },
  { id: "p-004", name: "Project44",  category: "Visibility/EDI",   fit: 88, security: "approved",   legal: "signed",   stage: "launch_ready" },
  { id: "p-005", name: "Geotab",     category: "Telematics",       fit: 79, security: "in_review", legal: "drafting", stage: "diligence" },
  { id: "p-006", name: "Insurify (PLACEHOLDER)", category: "Insurance", fit: 60, security: "pending", legal: "pending", stage: "exploration" },
];

export const ACQUISITION_READINESS = {
  overall: 61,
  product: 76,
  revenue: 64,
  customer: 70,
  marketplace: 72,
  security: 65,
  compliance: 60,
  technical: 78,
  documentation: 55,
  support: 71,
  team: 58, // placeholder
  data_room: 62, // placeholder
  ip: 50, // placeholder
};

export const DATA_ROOM_CHECKLIST = [
  { section: "Corporate", items: 12, done: 9 },
  { section: "Financials", items: 18, done: 11 },
  { section: "Customers / contracts", items: 22, done: 14 },
  { section: "Product / IP", items: 16, done: 8 },
  { section: "Security / compliance", items: 20, done: 13 },
  { section: "HR (PLACEHOLDER)", items: 10, done: 4 },
  { section: "Legal / litigation", items: 8, done: 6 },
];

export const PROCUREMENT_PACKET = [
  { section: "Company overview",        status: "complete" },
  { section: "Product overview",        status: "complete" },
  { section: "Security overview",       status: "complete" },
  { section: "Privacy overview",        status: "complete" },
  { section: "Architecture overview",   status: "complete" },
  { section: "Data flow overview",      status: "in_progress" },
  { section: "Subprocessor list (PLACEHOLDER)", status: "in_progress" },
  { section: "Compliance roadmap",      status: "complete" },
  { section: "Support model",           status: "complete" },
  { section: "Incident response",       status: "complete" },
  { section: "Backup/DR overview",      status: "in_progress" },
  { section: "AI usage overview",       status: "complete" },
  { section: "Mobile app permissions",  status: "complete" },
  { section: "API security",            status: "complete" },
  { section: "EDI security",            status: "in_progress" },
  { section: "Customer references (PLACEHOLDER)", status: "pending" },
];

export const ENTERPRISE_CUSTOMERS = [
  { id: "ent-1", name: "Northwind Logistics", onboarding: 95, adoption: 82, support: 88, integration: 90, reporting: 76, sponsor: "VP Ops", risk: "low",    renewal: "ready",     expansion: "high" },
  { id: "ent-2", name: "Globex Freight",      onboarding: 88, adoption: 71, support: 80, integration: 78, reporting: 65, sponsor: "Dir Logistics", risk: "medium", renewal: "at_risk", expansion: "medium" },
  { id: "ent-3", name: "Initech Distribution",onboarding: 92, adoption: 88, support: 91, integration: 85, reporting: 81, sponsor: "COO",   risk: "low",    renewal: "ready",     expansion: "high" },
  { id: "ent-4", name: "Acme Transport",      onboarding: 70, adoption: 55, support: 68, integration: 60, reporting: 50, sponsor: "—",     risk: "high",   renewal: "at_risk",   expansion: "low" },
];

export const CS_MATURITY = {
  onboarding: 86, training: 72, adoption: 78, health: 81, qbr: 60, renewal: 79, expansion: 71, handoff: 84, escalation: 76, feedback: 68,
};

export const SUPPORT_MATURITY = {
  score: 79,
  tickets_week: 1240,
  sla_compliance: 94,
  escalation_rate: 6.8,
  critical_incidents: 1,
  ttfr_min: 12,
  ttr_hrs: 6.4,
  backlog: 84,
  kb_coverage: 71,
  driver_issues: 312,
  customer_issues: 488,
  integration_issues: 220,
  marketplace_issues: 220,
};

export const AI_GOVERNANCE_MATURITY = {
  approval_rate: 0.92,
  acceptance: 0.86,
  rejected: 0.14,
  threshold_violations: 4,
  customer_drafts: 218,
  dispatch_recs: 174,
  audit_coverage: 95,
  data_source_transparency: 88,
  monthly_cost_usd: 4_820,
  safety_incidents: 0, // placeholder
};

export const REVENUE_OPS_MATURITY = {
  saas_mrr: 286_400,
  marketplace_mrr: 184_500,
  api_mrr: 38_900,
  enterprise_support_mrr: 42_000,
  implementation_fees: 78_000, // placeholder
  expansion_pipeline: 920_000,
  renewal_pipeline: 1_240_000,
  churn_risk_accounts: 3,
  trial_conversion: 0.31,
  carrier_monetization: 64_200,
  partner_monetization: 28_400,
  concentration_top3_pct: 38, // moderate
};

export const PARTNER_ECOSYSTEM = {
  total_partners: 24,
  active: 19,
  integration: 12,
  revenue: 7,
  strategic: 5,
  open_issues: 6,
  partners: [
    { name: "Samsara",   type: "Telematics",     health: 96, revenue_share: 18_200, status: "healthy" },
    { name: "Project44", type: "Visibility",     health: 92, revenue_share: 14_400, status: "healthy" },
    { name: "WEX",       type: "Fuel",           health: 88, revenue_share: 9_600,  status: "healthy" },
    { name: "Convoy Net",type: "Carrier network",health: 74, revenue_share: 0,      status: "diligence" },
    { name: "Geotab",    type: "Telematics",     health: 81, revenue_share: 0,      status: "diligence" },
  ],
};

export const PLAYBOOK_LIBRARY = [
  { category: "Dispatch operations",    count: 8 },
  { category: "Driver operations",      count: 6 },
  { category: "Customer support",       count: 9 },
  { category: "Marketplace operations", count: 10 },
  { category: "Carrier operations",     count: 7 },
  { category: "Integration operations", count: 5 },
  { category: "Billing operations",     count: 4 },
  { category: "Compliance operations",  count: 6 },
  { category: "Incident response",      count: 5 },
  { category: "Mobile app support",     count: 4 },
  { category: "EDI operations",         count: 5 },
  { category: "API operations",         count: 4 },
  { category: "Partner operations",     count: 3 },
];

export const NATIONAL_REGIONS = [
  { region: "West",      owner: "R. Patel",  dispatch_cap: 88, carrier_cap: 84, customers: 142, load_vol: 4120, drivers: 412, vehicles: 388, support: 91, marketplace: 86, perf: 89 },
  { region: "Midwest",   owner: "K. Nguyen", dispatch_cap: 92, carrier_cap: 91, customers: 168, load_vol: 5240, drivers: 510, vehicles: 488, support: 88, marketplace: 90, perf: 91 },
  { region: "South",     owner: "M. Garcia", dispatch_cap: 81, carrier_cap: 83, customers: 124, load_vol: 3680, drivers: 372, vehicles: 360, support: 85, marketplace: 82, perf: 84 },
  { region: "Southeast", owner: "—",         dispatch_cap: 64, carrier_cap: 71, customers:  88, load_vol: 2410, drivers: 240, vehicles: 226, support: 70, marketplace: 71, perf: 70 },
  { region: "Northeast", owner: "S. Cohen",  dispatch_cap: 86, carrier_cap: 84, customers: 138, load_vol: 4010, drivers: 388, vehicles: 372, support: 88, marketplace: 86, perf: 87 },
];

export const PLATFORM_METRICS = [
  { label: "Active companies",   value: 312,    trend: +6 },
  { label: "Active dispatchers", value: 2_184,  trend: +42 },
  { label: "Active drivers",     value: 18_420, trend: +310 },
  { label: "Active carriers",    value: 4_870,  trend: +88 },
  { label: "Customer users",     value: 9_240,  trend: +120 },
  { label: "Daily loads",        value: 14_800, trend: +220 },
  { label: "Monthly loads",      value: 422_000,trend: +6_400 },
  { label: "Marketplace awards", value: 38_400, trend: +810 },
  { label: "API calls / day",    value: "8.4M", trend: +0.2 },
  { label: "EDI transactions",   value: 162_400,trend: +3_100 },
  { label: "GPS events / day",   value: "24M",  trend: +0.5 },
  { label: "Webhook deliveries", value: 1_840_000, trend: +24_000 },
  { label: "Support tickets",    value: 1_240,  trend: -38 },
  { label: "Mobile app sessions",value: 86_200, trend: +1_400 },
  { label: "CoPilot actions",    value: 12_840, trend: +320 },
];

export const RLS_EXAMPLES = [
  { rule: "Company admins view their company maturity dashboards",          predicate: "company_id = current_company() AND has_role(uid, company_id, 'admin')" },
  { rule: "Platform owners view platform-wide maturity",                    predicate: "is_platform_owner(uid)" },
  { rule: "Support leaders view support maturity (no revenue)",             predicate: "has_role(uid, company_id, 'support_lead')" },
  { rule: "Billing leaders view revenue ops (no driver private data)",      predicate: "has_role(uid, company_id, 'billing_lead')" },
  { rule: "Customer users blocked from internal maturity",                  predicate: "NOT is_customer_user(uid, customer_id)" },
  { rule: "Carrier users blocked from marketplace internals",               predicate: "carrier_user_id IS NULL OR partner_scope = 'carrier_self'" },
  { rule: "Partner users see only their partner-specific records",          predicate: "partner_id IN (select id from partners where contact_user = uid)" },
  { rule: "SOC 2 evidence restricted to security/admin",                    predicate: "has_role(uid, company_id, 'security') OR has_role(uid, company_id, 'admin')" },
  { rule: "Acquisition readiness platform-owner only",                      predicate: "is_platform_owner(uid)" },
  { rule: "Mobile launch tasks platform/admin only",                        predicate: "is_platform_owner(uid) OR has_role(uid, company_id, 'admin')" },
  { rule: "AI governance settings admin-only",                              predicate: "has_role(uid, company_id, 'admin')" },
  { rule: "Marketplace dispute records limited to ops users",               predicate: "has_role(uid, company_id, 'ops') OR is_platform_owner(uid)" },
];

export const EDGE_FN_PLAN = [
  { group: "Automation",    fn: "calculate-automation-maturity",       runtime: "TanStack server fn",  reason: "Internal computation" },
  { group: "Automation",    fn: "approve-automation-action",           runtime: "TanStack server fn",  reason: "Auth + audit log" },
  { group: "Automation",    fn: "record-automation-outcome",           runtime: "TanStack server fn",  reason: "Internal write" },
  { group: "Marketplace",   fn: "calculate-marketplace-operations-score", runtime: "TanStack server fn", reason: "Internal" },
  { group: "Marketplace",   fn: "calculate-carrier-quality-score",     runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Marketplace",   fn: "create-marketplace-dispute",          runtime: "TanStack server fn",  reason: "Auth-bound write" },
  { group: "Marketplace",   fn: "resolve-marketplace-dispute",         runtime: "TanStack server fn",  reason: "Auth + audit" },
  { group: "Certification", fn: "calculate-certification-execution-score", runtime: "TanStack server fn", reason: "Internal" },
  { group: "Certification", fn: "calculate-soc2-readiness-score",      runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Certification", fn: "create-soc2-evidence-request",        runtime: "TanStack server fn",  reason: "Auth + audit" },
  { group: "Certification", fn: "generate-certification-gap-report",   runtime: "TanStack server fn",  reason: "Heavy compute" },
  { group: "Mobile",        fn: "calculate-mobile-launch-readiness",   runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Mobile",        fn: "calculate-android-auto-readiness",    runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Mobile",        fn: "calculate-carplay-readiness",         runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Partner/M&A",   fn: "calculate-partnership-readiness",     runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Partner/M&A",   fn: "calculate-acquisition-readiness",     runtime: "TanStack server fn",  reason: "Platform-owner only" },
  { group: "Partner/M&A",   fn: "generate-due-diligence-packet",       runtime: "TanStack server fn",  reason: "Heavy export" },
  { group: "Partner/M&A",   fn: "generate-procurement-packet",         runtime: "TanStack server fn",  reason: "Heavy export" },
  { group: "Maturity",      fn: "calculate-customer-success-maturity", runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Maturity",      fn: "calculate-support-maturity",          runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Maturity",      fn: "calculate-ai-governance-maturity",    runtime: "TanStack server fn",  reason: "Internal" },
  { group: "Maturity",      fn: "calculate-revenue-operations-maturity", runtime: "TanStack server fn", reason: "Internal" },
  { group: "Maturity",      fn: "calculate-platform-operating-metrics", runtime: "TanStack server fn", reason: "Aggregations" },
  { group: "External",      fn: "stripe-webhook",                      runtime: "Supabase Edge Function", reason: "Signed external webhook" },
  { group: "External",      fn: "samsara-webhook",                     runtime: "Supabase Edge Function", reason: "Signed external webhook" },
];
