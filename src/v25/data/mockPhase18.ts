/** Phase 18 — V2.5 enterprise readiness mock data.
 * Mock-only. Production wiring goes through createServerFn + supabase. */

export const V25_SCOPE = [
  { id: "edi-prod",     area: "Production EDI",              status: "in_scope",  note: "204/990/214/210/997 production-ready foundation + 211/212/856 placeholders" },
  { id: "edi-partners", area: "Trading partner management",  status: "in_scope",  note: "SFTP/AS2/API bridge transport, test → production activation checklist" },
  { id: "edi-mapping",  area: "EDI mapping manager",         status: "in_scope",  note: "Versioned field mappings + sample test runner" },
  { id: "api-money",    area: "API monetization",            status: "in_scope",  note: "Tiers, included requests, overage events, billing events" },
  { id: "api-gateway",  area: "API gateway readiness",       status: "in_scope",  note: "Key validation, scope check, rate limit, usage billing" },
  { id: "opt-advanced", area: "Advanced optimization",       status: "in_scope",  note: "Multi-load, deadhead, workload balance, vehicle/driver util" },
  { id: "opt-scenarios",area: "Scenario planning",           status: "in_scope",  note: "What-if scenarios with ETA / risk / customer impact" },
  { id: "copilot-25",   area: "CoPilot V2.5",                status: "in_scope",  note: "Enterprise summaries, EDI/API/optimization explainers" },
  { id: "comm-auto",    area: "Customer communication auto", status: "in_scope",  note: "Draft + dispatcher approval before send" },
  { id: "whitelabel",   area: "White-label customer portal", status: "in_scope",  note: "Logo, palette, support contacts, branded emails" },
  { id: "domains",      area: "Custom domain readiness",     status: "in_scope",  note: "DNS verification + SSL status placeholder" },
  { id: "scaling",      area: "Larger fleet scaling",        status: "in_scope",  note: "25 → 1k+ driver scale tiers, realtime / GPS / map monitors" },
  { id: "clustering",   area: "Advanced map clustering",     status: "in_scope",  note: "Status / vehicle / delay / GPS-stale clusters" },
  { id: "locations",    area: "Multi-location operations",   status: "in_scope",  note: "Yards, terminals, service regions, scoped dispatch" },
  { id: "sec-25",       area: "Enterprise security V2.5",    status: "in_scope",  note: "API + EDI + integration credential reviews, audit export" },
  { id: "retention",    area: "Advanced data retention",     status: "in_scope",  note: "Per-data-type policies, cleanup jobs, legal-hold placeholder" },
  { id: "reliability",  area: "Integration reliability",     status: "in_scope",  note: "Retry backlog, credential expiration, integration SLA" },
  { id: "audit-exp",    area: "Advanced audit + export",     status: "in_scope",  note: "Filtered audit log, CSV/JSON exports" },
  { id: "portal-25",    area: "Customer portal insights",    status: "in_scope",  note: "Analytics, message center, delivery performance" },
  { id: "onboarding",   area: "Enterprise onboarding",       status: "in_scope",  note: "Setup wizard from company → go-live checklist" },
  { id: "reports-25",   area: "Enterprise reporting",        status: "in_scope",  note: "EDI / API / integration / optimization / multi-location" },
  // Deferred
  { id: "android-auto", area: "Android Auto",                status: "deferred",  note: "Re-evaluate in V3" },
  { id: "carplay",      area: "CarPlay",                     status: "deferred",  note: "Re-evaluate in V3" },
  { id: "autonomous",   area: "Fully autonomous dispatch",   status: "deferred",  note: "Human approval still required" },
  { id: "soc2-auto",    area: "Full SOC 2 automation",       status: "deferred",  note: "Evidence collection only" },
  { id: "marketplace",  area: "Carrier marketplace",         status: "deferred",  note: "V3" },
  { id: "telematics",   area: "Advanced telematics ML",      status: "deferred",  note: "Needs real vehicle diagnostics" },
] as const;

export const V25_FEATURE_MATRIX = [
  { feature: "Production EDI 204→990→214→210→997", v15: false, v2: "beta", v25: "production" },
  { feature: "EDI 211/212/856",                    v15: false, v2: false,  v25: "placeholder" },
  { feature: "API monetization tiers",             v15: false, v2: false,  v25: "production" },
  { feature: "API overage billing events",         v15: false, v2: false,  v25: "production" },
  { feature: "Multi-load optimization",            v15: false, v2: "beta", v25: "production" },
  { feature: "Optimization scenarios",             v15: false, v2: false,  v25: "production" },
  { feature: "Customer comm auto (approval)",      v15: false, v2: false,  v25: "production" },
  { feature: "White-label portal",                 v15: false, v2: false,  v25: "production" },
  { feature: "Custom domain",                      v15: false, v2: false,  v25: "placeholder" },
  { feature: "Multi-location ops",                 v15: false, v2: false,  v25: "production" },
  { feature: "Fleet scaling 250→1k+",              v15: "25",  v2: "100",  v25: "250+" },
  { feature: "Data retention policies",            v15: false, v2: false,  v25: "production" },
  { feature: "Advanced audit exports",             v15: false, v2: "beta", v25: "production" },
  { feature: "Android Auto / CarPlay",             v15: false, v2: false,  v25: false },
  { feature: "Fully autonomous dispatch",          v15: false, v2: false,  v25: false },
] as const;

export const V25_READINESS = {
  score: 78,
  byArea: [
    { area: "EDI",                 score: 82, status: "on_track" },
    { area: "API monetization",    score: 71, status: "needs_work" },
    { area: "Optimization",        score: 80, status: "on_track" },
    { area: "CoPilot V2.5",        score: 74, status: "on_track" },
    { area: "White-label",         score: 68, status: "needs_work" },
    { area: "Scaling",             score: 79, status: "on_track" },
    { area: "Security",            score: 84, status: "on_track" },
    { area: "Reliability",         score: 76, status: "on_track" },
    { area: "Onboarding",          score: 72, status: "needs_work" },
  ],
};

// ---------- EDI ----------
export const EDI_PARTNERS = [
  { id: "tp_001", name: "AcmeCorp Logistics",    partnerId: "ACME001", qualifier: "ZZ", standard: "X12-4010", transport: "SFTP", status: "Active",  testMode: false, productionEnabled: true,  contact: "edi@acme.example",   tx30d: 1247, errors30d: 3 },
  { id: "tp_002", name: "Globex Freight",        partnerId: "GLBX002", qualifier: "ZZ", standard: "X12-4010", transport: "AS2",  status: "Active",  testMode: false, productionEnabled: true,  contact: "ops@globex.example", tx30d: 893,  errors30d: 1 },
  { id: "tp_003", name: "Initech Distribution",  partnerId: "INTC003", qualifier: "01", standard: "X12-5010", transport: "SFTP", status: "Testing", testMode: true,  productionEnabled: false, contact: "edi@initech.example", tx30d: 47,   errors30d: 12 },
  { id: "tp_004", name: "Hooli Supply Chain",    partnerId: "HOOL004", qualifier: "ZZ", standard: "X12-4010", transport: "API",  status: "Draft",   testMode: true,  productionEnabled: false, contact: "edi@hooli.example",   tx30d: 0,    errors30d: 0 },
  { id: "tp_005", name: "Pied Piper Carriers",   partnerId: "PIED005", qualifier: "ZZ", standard: "X12-4010", transport: "AS2",  status: "Error",   testMode: false, productionEnabled: true,  contact: "edi@piedpiper.example", tx30d: 312, errors30d: 47 },
] as const;

export const EDI_PRODUCTION_CHECKLIST = [
  { id: "c1", label: "Transport credentials verified",      done: true },
  { id: "c2", label: "Trading partner ID validated",        done: true },
  { id: "c3", label: "Mapping tested with 5+ samples",      done: true },
  { id: "c4", label: "997 acknowledgment round-trip ok",    done: true },
  { id: "c5", label: "990 accept/reject flow tested",       done: true },
  { id: "c6", label: "214 status update flow tested",       done: false },
  { id: "c7", label: "Error resolution runbook documented", done: false },
  { id: "c8", label: "Partner contact on file",             done: true },
];

export const EDI_TRANSACTIONS_V25 = [
  { id: "edi_2401", doc: "204", partner: "AcmeCorp Logistics", direction: "inbound",  status: "accepted", control: "0000123451", at: "2026-05-21 09:14", note: "Converted to load L-9012" },
  { id: "edi_2402", doc: "990", partner: "AcmeCorp Logistics", direction: "outbound", status: "sent",     control: "0000123452", at: "2026-05-21 09:17", note: "Accept response" },
  { id: "edi_2403", doc: "214", partner: "AcmeCorp Logistics", direction: "outbound", status: "sent",     control: "0000123453", at: "2026-05-21 11:02", note: "Status: in_transit" },
  { id: "edi_2404", doc: "997", partner: "AcmeCorp Logistics", direction: "inbound",  status: "received", control: "0000123454", at: "2026-05-21 11:04", note: "ACK for 214" },
  { id: "edi_2405", doc: "204", partner: "Pied Piper Carriers",direction: "inbound",  status: "error",    control: "0000098711", at: "2026-05-21 12:33", note: "Missing pickup window" },
  { id: "edi_2406", doc: "210", partner: "Globex Freight",     direction: "outbound", status: "sent",     control: "0000456712", at: "2026-05-21 14:10", note: "Invoice $1,847.50" },
  { id: "edi_2407", doc: "204", partner: "Initech Distribution",direction: "inbound", status: "rejected", control: "0000111202", at: "2026-05-21 15:22", note: "Test mode — 990 reject sent" },
];

export const EDI_DOCS = ["204","990","214","210","997","211","212","856"] as const;
export const EDI_TRANSPORTS = ["SFTP","AS2","API bridge","Manual upload"] as const;

export const EDI_MAPPINGS = [
  { id: "map_001", partner: "AcmeCorp Logistics", doc: "204", version: "v3", lastEdited: "2026-05-18", testsPass: 12, testsFail: 0, fields: 47 },
  { id: "map_002", partner: "Globex Freight",     doc: "204", version: "v2", lastEdited: "2026-04-30", testsPass: 9,  testsFail: 1, fields: 42 },
  { id: "map_003", partner: "Pied Piper Carriers",doc: "204", version: "v1", lastEdited: "2026-03-12", testsPass: 5,  testsFail: 4, fields: 38 },
];

export const EDI_MAPPING_FIELDS = [
  { ediField: "B2*04*ACME",       target: "shipment.partner_ref",   required: true,  transform: "extract literal", defaultValue: null },
  { ediField: "B2A*00",           target: "shipment.tender_type",   required: true,  transform: "code lookup",      defaultValue: "original" },
  { ediField: "G62*70*20260521",  target: "shipment.pickup_date",   required: true,  transform: "yyyymmdd → ISO",   defaultValue: null },
  { ediField: "N1*SH*Shipper Co", target: "shipment.shipper.name",  required: true,  transform: "string trim",      defaultValue: null },
  { ediField: "N1*CN*Consignee",  target: "shipment.consignee.name",required: true,  transform: "string trim",      defaultValue: null },
  { ediField: "L5*1*GENERAL",     target: "shipment.commodity",     required: false, transform: "string",           defaultValue: "general freight" },
  { ediField: "L0*1*28500*G",     target: "shipment.weight_lb",     required: false, transform: "parse number",     defaultValue: 0 },
];

export const EDI_CONTROL_NUMBERS = {
  inbound: { last: 12345, gap: 0, dupes: 0 },
  outbound: { last: 45670, gap: 0, dupes: 0 },
};

// ---------- API monetization ----------
export const API_PRODUCTS = [
  { id: "api_internal",  name: "Internal Only", price: 0,    included: 0,      overage: 0,    description: "First-party app traffic — not billed.",   scopes: ["loads.read","tracking.read","drivers.read"] },
  { id: "api_partner",   name: "Partner API",   price: 299,  included: 250000, overage: 0.001,description: "Integration partners — predictable usage.", scopes: ["loads.read","tracking.read","webhooks.manage"] },
  { id: "api_customer",  name: "Customer API",  price: 99,   included: 50000,  overage: 0.002,description: "End-customer integrations.",               scopes: ["tracking.read","pod.read"] },
  { id: "api_enterprise",name: "Enterprise API",price: 1499, included: 2500000,overage: 0.0005,description: "High-volume enterprise.",                  scopes: ["*"] },
] as const;

export const API_USAGE = [
  { customer: "AcmeCorp",     plan: "Enterprise API", included: 2500000, used: 1842000, overage: 0,      rateLimit: "1000/min", health: "good" },
  { customer: "Globex",       plan: "Partner API",    included: 250000,  used: 247800,  overage: 0,      rateLimit: "500/min",  health: "warn" },
  { customer: "Initech",      plan: "Partner API",    included: 250000,  used: 312000,  overage: 62000,  rateLimit: "500/min",  health: "warn" },
  { customer: "Hooli",        plan: "Customer API",   included: 50000,   used: 18400,   overage: 0,      rateLimit: "100/min",  health: "good" },
  { customer: "Pied Piper",   plan: "Customer API",   included: 50000,   used: 71200,   overage: 21200,  rateLimit: "100/min",  health: "bad"  },
];

export const API_BILLING_EVENTS = [
  { id: "evt_1", customer: "Initech",   type: "overage",   units: 62000,  amount: 124.00, at: "2026-05-20" },
  { id: "evt_2", customer: "Pied Piper",type: "overage",   units: 21200,  amount: 42.40,  at: "2026-05-20" },
  { id: "evt_3", customer: "AcmeCorp",  type: "monthly",   units: 1,      amount: 1499.00,at: "2026-05-01" },
  { id: "evt_4", customer: "Globex",    type: "monthly",   units: 1,      amount: 299.00, at: "2026-05-01" },
];

export const API_RATE_LIMITS_V25 = [
  { scope: "loads.read",      tier: "Enterprise", limit: "1000/min",  burst: 2000,  enforced: true },
  { scope: "loads.read",      tier: "Partner",    limit: "500/min",   burst: 1000,  enforced: true },
  { scope: "tracking.read",   tier: "Enterprise", limit: "5000/min",  burst: 10000, enforced: true },
  { scope: "tracking.read",   tier: "Customer",   limit: "100/min",   burst: 200,   enforced: true },
  { scope: "webhooks.manage", tier: "Partner",    limit: "60/min",    burst: 120,   enforced: true },
  { scope: "pod.read",        tier: "Customer",   limit: "60/min",    burst: 120,   enforced: true },
];

export const API_GATEWAY_RESPONSIBILITIES = [
  { id: "g1", responsibility: "Validate API key",         layer: "gateway",   sla: "<5ms" },
  { id: "g2", responsibility: "Validate scope",           layer: "gateway",   sla: "<5ms" },
  { id: "g3", responsibility: "Enforce rate limit",       layer: "gateway",   sla: "<10ms" },
  { id: "g4", responsibility: "Enforce company isolation",layer: "gateway",   sla: "<5ms" },
  { id: "g5", responsibility: "Log request",              layer: "gateway",   sla: "async" },
  { id: "g6", responsibility: "Mask sensitive fields",    layer: "gateway",   sla: "<2ms" },
  { id: "g7", responsibility: "Consistent error envelope",layer: "gateway",   sla: "<2ms" },
  { id: "g8", responsibility: "Track usage event",        layer: "gateway",   sla: "async" },
  { id: "g9", responsibility: "Create billing event",     layer: "billing",   sla: "async" },
  { id: "g10",responsibility: "Idempotency for writes",   layer: "gateway",   sla: "<5ms" },
];

// ---------- Advanced Optimization ----------
export const OPT_GOALS = [
  { id: "best_driver",       label: "Best driver assignment",   weight: 25 },
  { id: "deadhead_reduce",   label: "Reduce deadhead miles",    weight: 15 },
  { id: "late_reduce",       label: "Reduce late deliveries",   weight: 20 },
  { id: "vehicle_util",      label: "Improve vehicle util",     weight: 10 },
  { id: "driver_util",       label: "Improve driver util",      weight: 10 },
  { id: "customer_priority", label: "Customer priority",        weight: 10 },
  { id: "compliance",        label: "CDL / hazmat compliance",  weight: 10 },
];

export const MULTI_LOAD_ASSIGNMENTS = [
  { id: "mla_001", driver: "M. Alvarez",  loads: ["L-9012","L-9015"], deadhead: 24, miles: 412, etaConfidence: 86, savings: "$184", explanation: "Same lane, sequential pickup windows; reduces 38 deadhead mi vs separate assignments." },
  { id: "mla_002", driver: "J. Chen",     loads: ["L-9018","L-9021"], deadhead: 12, miles: 367, etaConfidence: 91, savings: "$212", explanation: "Adjacent customers; both delivery windows fit current HOS." },
  { id: "mla_003", driver: "R. Patel",    loads: ["L-9024","L-9027","L-9029"], deadhead: 41, miles: 587, etaConfidence: 74, savings: "$298", explanation: "3-stop chain; tight but feasible. Confirms vehicle capacity." },
];

export const OPT_SCENARIOS = [
  { id: "sc_001", name: "Reassign L-9015 to M. Alvarez",     etaImpactMin: -22, riskDelta: -14, customerImpact: "improved", milesDelta: -38, workloadDelta: "+1 load", recommended: true,  approval: "required" },
  { id: "sc_002", name: "Delay L-9018 pickup by 30 min",     etaImpactMin: +30, riskDelta: +8,  customerImpact: "minor",    milesDelta: 0,   workloadDelta: "neutral", recommended: false, approval: "required" },
  { id: "sc_003", name: "Swap drivers on L-9012 and L-9024", etaImpactMin: -8,  riskDelta: -3,  customerImpact: "neutral",  milesDelta: -12, workloadDelta: "balanced",recommended: true,  approval: "required" },
  { id: "sc_004", name: "Prioritize Acme over Hooli pickups",etaImpactMin: -5,  riskDelta: -10, customerImpact: "trade-off",milesDelta: +6,  workloadDelta: "neutral", recommended: false, approval: "required" },
];

// ---------- CoPilot V2.5 ----------
export const COPILOT_V25_INSIGHTS = [
  { id: "ci1", category: "EDI",          question: "Why is Pied Piper EDI failing?",            answer: "47 errors in 30d, all on 204 inbound. Mapping v1 is outdated; v2 fixes 38 of them. Recommend mapping upgrade after dispatcher review.", tone: "warn",   confidence: 0.82 },
  { id: "ci2", category: "API",          question: "Which customers are approaching overage?", answer: "Globex at 99.1% of plan; Initech and Pied Piper already in overage. No action needed — billing events recorded for next cycle.",       tone: "info",   confidence: 0.95 },
  { id: "ci3", category: "Optimization", question: "Best multi-load assignment today?",        answer: "J. Chen for L-9018+L-9021 — 91% ETA confidence, $212 savings, no compliance flags. Approval required.",                                tone: "good",   confidence: 0.91 },
  { id: "ci4", category: "Customer",     question: "Pending customer notifications?",          answer: "3 drafts waiting: delay on L-9012, ETA update on L-9015, POD ready on L-9007. Awaiting dispatcher approval.",                          tone: "warn",   confidence: 1.0  },
  { id: "ci5", category: "Reliability",  question: "Integration health summary?",              answer: "Webhook delivery 99.4%, EDI 96.2% (Pied Piper drags), API 99.8%. Two credentials expire in 30 days.",                                 tone: "info",   confidence: 0.93 },
  { id: "ci6", category: "Executive",    question: "Today vs. last week?",                     answer: "On-time +2.1pp, utilization +1.8pp, 14 at-risk loads (-3). Revenue per load steady at $1,420.",                                       tone: "good",   confidence: 0.88 },
];

export const COPILOT_V25_GUARDRAILS = [
  "Respects RBAC and company boundaries",
  "Always shows confidence and data sources",
  "Requires human approval for high-impact actions",
  "Never claims certainty on predictions",
  "Flags stale data (>10 min) explicitly",
  "Drafts customer messages — never sends without approval",
];

// ---------- Customer Communication ----------
export const CUSTOMER_COMM_DRAFTS = [
  { id: "msg_001", customer: "AcmeCorp",    type: "Shipment delayed",   load: "L-9012", channel: "email", status: "pending_approval", draft: "Hi Acme team — load L-9012 is running ~25 min behind due to traffic on I-45. New ETA: 4:15 PM. We'll keep you posted.", at: "2026-05-21 13:42" },
  { id: "msg_002", customer: "Globex",      type: "ETA updated",        load: "L-9015", channel: "sms",   status: "pending_approval", draft: "Globex: L-9015 ETA moved to 5:30 PM (was 5:00). Driver on schedule.",                                                  at: "2026-05-21 13:50" },
  { id: "msg_003", customer: "Initech",     type: "POD available",      load: "L-9007", channel: "email", status: "pending_approval", draft: "Hi Initech — POD for load L-9007 is ready. View it in the portal.",                                                  at: "2026-05-21 14:01" },
  { id: "msg_004", customer: "AcmeCorp",    type: "Delivery completed", load: "L-8998", channel: "email", status: "sent",             draft: "Acme — L-8998 delivered at 11:42 AM, signed by R. Lee.",                                                            at: "2026-05-21 11:50" },
  { id: "msg_005", customer: "Pied Piper",  type: "Pickup delayed",     load: "L-9024", channel: "email", status: "rejected",         draft: "Pied Piper: pickup delay…",                                                                                       at: "2026-05-21 12:20" },
];

export const CUSTOMER_COMM_TYPES = [
  "Shipment delayed","ETA updated","Delivery completed","POD available",
  "Pickup delayed","Driver en route","Weather/traffic","Exception reported","Customer action required",
];

// ---------- White-label / Domains ----------
export const WHITELABEL_SETTINGS = {
  logoUrl: "/branding/acme-logo.png",
  primary: "#1e3a8a",
  secondary: "#0f172a",
  accent: "#f59e0b",
  portalTitle: "AcmeCorp Shipment Tracking",
  supportEmail: "support@acme.example",
  supportPhone: "+1 (800) 555-0100",
  footerText: "© AcmeCorp Logistics. Powered by your trusted logistics partner.",
  hideAnderoute: true,
  termsUrl: "https://acme.example/terms",
  privacyUrl: "https://acme.example/privacy",
};

export const WHITELABEL_VALIDATION = [
  { id: "v1", label: "Logo uploaded (min 256px)",         ok: true },
  { id: "v2", label: "Primary color contrast WCAG AA",    ok: true },
  { id: "v3", label: "Support email verified",            ok: true },
  { id: "v4", label: "Terms + privacy URLs reachable",    ok: true },
  { id: "v5", label: "Email template preview reviewed",   ok: false },
  { id: "v6", label: "Branding sign-off from customer",   ok: false },
];

export const CUSTOM_DOMAINS = [
  { id: "dom_001", company: "AcmeCorp",  domain: "tracking.acme.example",     status: "Active",       dnsVerified: true,  ssl: "Active",  verifiedAt: "2026-05-14" },
  { id: "dom_002", company: "Globex",    domain: "track.globex.example",      status: "DNS verified", dnsVerified: true,  ssl: "Pending", verifiedAt: "2026-05-20" },
  { id: "dom_003", company: "Initech",   domain: "shipments.initech.example", status: "Pending DNS",  dnsVerified: false, ssl: "—",       verifiedAt: null },
  { id: "dom_004", company: "Hooli",     domain: "track.hooli.example",       status: "Failed",       dnsVerified: false, ssl: "—",       verifiedAt: null },
];

export const DNS_RECORD_EXAMPLE = [
  { type: "CNAME", name: "tracking",    value: "portal.anderoute.app",         ttl: 3600 },
  { type: "TXT",   name: "_anderoute",  value: "anderoute-verify=ABC123XYZ",   ttl: 3600 },
];

// ---------- Fleet scaling ----------
export const SCALE_TIERS = [
  { tier: "25 drivers",     score: 100, status: "ready",      notes: "Baseline V1 scale." },
  { tier: "100 drivers",    score: 96,  status: "ready",      notes: "V1.5 verified." },
  { tier: "250 drivers",    score: 88,  status: "ready",      notes: "V2.5 target. Realtime channels sharded." },
  { tier: "500 drivers",    score: 74,  status: "needs_work", notes: "Map clustering required; webhook delivery batching." },
  { tier: "1,000+ drivers", score: 58,  status: "placeholder",notes: "Future work — requires GPS stream sharding + read replicas." },
];

export const SCALING_AREAS = [
  { area: "Realtime subscriptions",  status: "good", load: "1,847/sec",   note: "Within Supabase channel limits" },
  { area: "Driver live state",       status: "good", load: "247/250",     note: "Cached aggregations" },
  { area: "GPS event volume",        status: "warn", load: "12,400/min",  note: "Approaching write throughput target" },
  { area: "Map marker clustering",   status: "good", load: "247 markers", note: "Auto-clusters above 100 markers" },
  { area: "Load board pagination",   status: "good", load: "47 pages",    note: "Cursor pagination" },
  { area: "Audit log pagination",    status: "good", load: "1,200 pages", note: "Indexed by company_id+at" },
  { area: "Reports query perf",      status: "warn", load: "p95 2.8s",    note: "Materialized views recommended for V3" },
  { area: "Customer portal load",    status: "good", load: "p95 1.2s",    note: "Cached per shipment" },
  { area: "Webhook delivery volume", status: "good", load: "4,200/hr",    note: "Retry queue healthy" },
  { area: "EDI transaction volume",  status: "good", load: "847/day",     note: "Below partner SLA" },
  { area: "Notification volume",     status: "good", load: "12,000/day",  note: "Multi-channel" },
];

export const MAP_CLUSTER_CONFIG = [
  { id: "c1", type: "Status-based",      enabled: true,  threshold: 100, note: "Cluster by driver status" },
  { id: "c2", type: "Vehicle-type",      enabled: true,  threshold: 50,  note: "Cluster by vehicle class" },
  { id: "c3", type: "Delayed driver",    enabled: true,  threshold: 25,  note: "Highlight at-risk clusters" },
  { id: "c4", type: "Stale GPS",         enabled: true,  threshold: 25,  note: "Stale > 10min" },
  { id: "c5", type: "Customer location", enabled: false, threshold: 50,  note: "Pickup/delivery clusters" },
  { id: "c6", type: "Route density",     enabled: false, threshold: 200, note: "Placeholder — V3" },
];

// ---------- Multi-location ----------
export const COMPANY_LOCATIONS = [
  { id: "loc_001", name: "Dallas HQ",        type: "Headquarters", city: "Dallas, TX",     timezone: "America/Chicago", contact: "Ops Mgr",  active: true,  drivers: 84 },
  { id: "loc_002", name: "Houston Yard",     type: "Yard",         city: "Houston, TX",    timezone: "America/Chicago", contact: "Yard Sup", active: true,  drivers: 47 },
  { id: "loc_003", name: "Atlanta Terminal", type: "Terminal",     city: "Atlanta, GA",    timezone: "America/New_York",contact: "Term Mgr", active: true,  drivers: 62 },
  { id: "loc_004", name: "Phoenix Warehouse",type: "Warehouse",    city: "Phoenix, AZ",    timezone: "America/Phoenix", contact: "Whse Mgr", active: true,  drivers: 31 },
  { id: "loc_005", name: "SoCal Region",     type: "Service region",city: "Los Angeles, CA",timezone: "America/Los_Angeles",contact: "Reg Mgr",active: true, drivers: 23 },
];

export const REGION_PERFORMANCE = [
  { region: "Texas",      onTime: 96.2, util: 87, atRisk: 4 },
  { region: "Southeast",  onTime: 94.8, util: 82, atRisk: 6 },
  { region: "Southwest",  onTime: 95.4, util: 79, atRisk: 3 },
  { region: "West Coast", onTime: 93.1, util: 84, atRisk: 5 },
];

// ---------- Security / retention / reliability ----------
export const ENTERPRISE_SEC_CONTROLS = [
  { id: "s1",  control: "Advanced permission matrix",    status: "configured" },
  { id: "s2",  control: "API key 90-day review",         status: "configured" },
  { id: "s3",  control: "EDI partner access review",     status: "configured" },
  { id: "s4",  control: "Integration credential review", status: "configured" },
  { id: "s5",  control: "Support access expiration",     status: "configured" },
  { id: "s6",  control: "Data retention settings",       status: "configured" },
  { id: "s7",  control: "Audit export controls",         status: "configured" },
  { id: "s8",  control: "Customer portal access review", status: "scheduled"  },
  { id: "s9",  control: "Driver privacy review",         status: "configured" },
  { id: "s10", control: "Billing access review",         status: "scheduled"  },
];

export const RETENTION_POLICIES = [
  { id: "r1",  dataType: "GPS events",          retentionDays: 90,   legalHold: false, lastCleanup: "2026-05-20", nextRun: "2026-05-22" },
  { id: "r2",  dataType: "Navigation events",   retentionDays: 90,   legalHold: false, lastCleanup: "2026-05-20", nextRun: "2026-05-22" },
  { id: "r3",  dataType: "Driver status events",retentionDays: 180,  legalHold: false, lastCleanup: "2026-05-18", nextRun: "2026-05-25" },
  { id: "r4",  dataType: "Audit logs",          retentionDays: 2555, legalHold: true,  lastCleanup: null,         nextRun: null },
  { id: "r5",  dataType: "API request logs",    retentionDays: 365,  legalHold: false, lastCleanup: "2026-04-30", nextRun: "2026-05-30" },
  { id: "r6",  dataType: "Webhook deliveries",  retentionDays: 30,   legalHold: false, lastCleanup: "2026-05-20", nextRun: "2026-05-22" },
  { id: "r7",  dataType: "EDI transactions",    retentionDays: 2555, legalHold: true,  lastCleanup: null,         nextRun: null },
  { id: "r8",  dataType: "Notification events", retentionDays: 90,   legalHold: false, lastCleanup: "2026-05-20", nextRun: "2026-05-22" },
  { id: "r9",  dataType: "CoPilot messages",    retentionDays: 365,  legalHold: false, lastCleanup: "2026-04-30", nextRun: "2026-05-30" },
  { id: "r10", dataType: "Customer messages",   retentionDays: 2555, legalHold: false, lastCleanup: null,         nextRun: null },
  { id: "r11", dataType: "Documents/PODs",      retentionDays: 2555, legalHold: true,  lastCleanup: null,         nextRun: null },
  { id: "r12", dataType: "Billing records",     retentionDays: 2555, legalHold: true,  lastCleanup: null,         nextRun: null },
];

export const RELIABILITY_TRACKERS = [
  { id: "t1", area: "EDI",                    sla: "99.0%", current: 96.2, status: "warn", incidents30d: 2 },
  { id: "t2", area: "Webhooks",               sla: "99.5%", current: 99.4, status: "warn", incidents30d: 1 },
  { id: "t3", area: "API errors",             sla: "99.9%", current: 99.8, status: "good", incidents30d: 0 },
  { id: "t4", area: "Billing provider",       sla: "99.9%", current: 99.99,status: "good", incidents30d: 0 },
  { id: "t5", area: "Map provider",           sla: "99.9%", current: 99.95,status: "good", incidents30d: 0 },
  { id: "t6", area: "Notification provider",  sla: "99.5%", current: 99.7, status: "good", incidents30d: 0 },
  { id: "t7", area: "Customer comm",          sla: "99.0%", current: 99.2, status: "good", incidents30d: 0 },
];

export const RETRY_BACKLOG = [
  { id: "b1", system: "EDI 214 to Pied Piper", attempts: 4, nextRetry: "in 8 min",  reason: "Partner SFTP timeout" },
  { id: "b2", system: "Webhook to AcmeCorp",   attempts: 2, nextRetry: "in 2 min",  reason: "503 from endpoint" },
  { id: "b3", system: "Notification SMS",      attempts: 1, nextRetry: "in 30 sec", reason: "Carrier rate limit" },
];

export const CREDENTIAL_EXPIRATION = [
  { id: "ce1", credential: "AcmeCorp EDI SFTP key",    expiresIn: "12 days", severity: "warn" },
  { id: "ce2", credential: "Globex AS2 cert",          expiresIn: "28 days", severity: "info" },
  { id: "ce3", credential: "Mapbox token (prod)",      expiresIn: "62 days", severity: "info" },
  { id: "ce4", credential: "Pied Piper API key",       expiresIn: "expired", severity: "bad"  },
];

// ---------- Audit ----------
export const AUDIT_FILTERS = ["User","Role","Company","Customer","Driver","Load","Shipment","API key","EDI partner","Integration","Billing event","Date range","Event type"];
export const AUDIT_EXPORT_FORMATS = ["CSV","JSON","PDF (placeholder)"] as const;

export const AUDIT_SAMPLE = [
  { id: "a1", at: "2026-05-21 14:22", actor: "dispatcher_42", action: "approve.optimization_scenario", target: "sc_001", company: "AcmeCorp" },
  { id: "a2", at: "2026-05-21 14:20", actor: "admin_7",       action: "create.edi_trading_partner",    target: "tp_005", company: "AcmeCorp" },
  { id: "a3", at: "2026-05-21 14:18", actor: "system",        action: "send.edi_990",                  target: "edi_2402",company: "AcmeCorp" },
  { id: "a4", at: "2026-05-21 14:10", actor: "dispatcher_42", action: "approve.customer_message",      target: "msg_001",company: "AcmeCorp" },
  { id: "a5", at: "2026-05-21 13:58", actor: "system",        action: "record.api_overage",            target: "evt_1",  company: "Initech" },
];

// ---------- Customer portal V2.5 ----------
export const PORTAL_INSIGHTS = {
  shipmentsActive: 14,
  shipmentsCompleted30d: 247,
  onTime: 96.4,
  avgDeliveryWindow: "22 min",
  messages30d: 47,
  podAvailable: 12,
  supportTickets: 2,
};

// ---------- Enterprise onboarding ----------
export const ONBOARDING_STEPS = [
  { id: "o1",  label: "Company setup",            done: true,  owner: "admin" },
  { id: "o2",  label: "Multi-location setup",     done: true,  owner: "admin" },
  { id: "o3",  label: "User & role setup",        done: true,  owner: "admin" },
  { id: "o4",  label: "Driver & vehicle import",  done: true,  owner: "ops" },
  { id: "o5",  label: "Customer import",          done: true,  owner: "ops" },
  { id: "o6",  label: "EDI partner setup",        done: false, owner: "integrations" },
  { id: "o7",  label: "API key setup",            done: false, owner: "integrations" },
  { id: "o8",  label: "Webhook setup",            done: false, owner: "integrations" },
  { id: "o9",  label: "Billing setup",            done: true,  owner: "billing" },
  { id: "o10", label: "Customer portal branding", done: false, owner: "admin" },
  { id: "o11", label: "Custom domain",            done: false, owner: "admin" },
  { id: "o12", label: "Training completion",      done: false, owner: "team" },
  { id: "o13", label: "Go-live readiness review", done: false, owner: "csm" },
];

// ---------- Reports ----------
export const ENTERPRISE_REPORTS = [
  { id: "rep_edi",   name: "EDI transaction performance",     category: "EDI",          owner: "ops" },
  { id: "rep_api",   name: "API usage and billing",            category: "API",          owner: "billing" },
  { id: "rep_rel",   name: "Integration reliability",          category: "Reliability", owner: "ops" },
  { id: "rep_opt",   name: "Optimization impact",              category: "Ops",          owner: "ops" },
  { id: "rep_drv",   name: "Driver utilization",               category: "Fleet",        owner: "ops" },
  { id: "rep_veh",   name: "Vehicle utilization",              category: "Fleet",        owner: "ops" },
  { id: "rep_cust",  name: "Customer delivery performance",    category: "Customer",     owner: "csm" },
  { id: "rep_comm",  name: "Customer communication perf",      category: "Customer",     owner: "csm" },
  { id: "rep_prof",  name: "Load profitability (placeholder)", category: "Finance",      owner: "finance" },
  { id: "rep_eff",   name: "Route efficiency",                 category: "Ops",          owner: "ops" },
  { id: "rep_gps",   name: "GPS data quality",                 category: "Fleet",        owner: "ops" },
  { id: "rep_loc",   name: "Multi-location performance",       category: "Ops",          owner: "ops" },
  { id: "rep_sup",   name: "Support burden by customer",       category: "Support",      owner: "support" },
  { id: "rep_bill",  name: "Billing usage by company",         category: "Finance",      owner: "finance" },
];

// ---------- Demo ----------
export const V25_DEMO_STEPS = [
  { id: 1,  actor: "Enterprise admin", action: "Opens V2.5 dashboard",                    result: "Reads readiness score 78/100." },
  { id: 2,  actor: "Admin",            action: "Creates EDI trading partner",             result: "AcmeCorp tp_001 moves Draft → Testing." },
  { id: 3,  actor: "System",           action: "Receives EDI 204",                        result: "Inbound control 0000123451 logged." },
  { id: 4,  actor: "Mapping engine",   action: "Maps 204 → shipment request",             result: "47 fields, 0 errors." },
  { id: 5,  actor: "Dispatcher",       action: "Converts shipment request to load",       result: "Load L-9012 created." },
  { id: 6,  actor: "Optimization",     action: "Recommends driver + scenario",            result: "M. Alvarez, scenario sc_001, ETA -22 min." },
  { id: 7,  actor: "Dispatcher",       action: "Approves assignment",                     result: "Approval logged; assignment dispatched." },
  { id: 8,  actor: "System",           action: "Sends EDI 990 acceptance",                result: "Outbound control 0000123452." },
  { id: 9,  actor: "Driver",           action: "Accepts load in EliteNav",                result: "Status: assigned → in_transit." },
  { id: 10, actor: "System",           action: "Generates EDI 214 status updates",        result: "Outbound control 0000123453." },
  { id: 11, actor: "Customer",         action: "Visits branded portal",                   result: "tracking.acme.example serves white-labeled UI." },
  { id: 12, actor: "Customer",         action: "Receives approved delay update",          result: "msg_001 sent after dispatcher approval." },
  { id: 13, actor: "API gateway",      action: "Records tracking API calls",              result: "1,247 events; usage updated." },
  { id: 14, actor: "Webhook system",   action: "Delivers shipment.updated webhook",       result: "AcmeCorp 200 OK." },
  { id: 15, actor: "Billing",          action: "Records API usage billing event",         result: "$1,499 enterprise + $0 overage." },
  { id: 16, actor: "Fleet scaling",    action: "Shows 250-driver readiness",              result: "Score 88/100 — Ready." },
  { id: 17, actor: "Audit export",     action: "Generates CSV export",                    result: "147 events, signed download URL." },
  { id: 18, actor: "Enterprise report",action: "Shows optimization + reliability impact", result: "Optimization saved 412 mi this week; reliability 99.4%." },
];

// ---------- RLS examples ----------
export const V25_RLS_EXAMPLES = [
  { table: "edi_trading_partners", policy: "Company admins can manage own partners",
    sql: "create policy \"edi_partners_admin\" on edi_trading_partners for all to authenticated using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));" },
  { table: "edi_transmissions",    policy: "Dispatchers with edi.view permission read transactions",
    sql: "create policy \"edi_tx_read\" on edi_transmissions for select to authenticated using (company_id = current_company() and has_role(auth.uid(), company_id, 'dispatcher'));" },
  { table: "api_products",         policy: "API products are platform-managed (read-only to tenants)",
    sql: "create policy \"api_products_read\" on api_products for select to authenticated using (true);" },
  { table: "api_usage_events",     policy: "Company-scoped usage events",
    sql: "create policy \"api_usage_company\" on api_usage_events for select to authenticated using (company_id = current_company());" },
  { table: "api_billing_events",   policy: "Billing admins only",
    sql: "create policy \"api_billing_admin\" on api_billing_events for select to authenticated using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));" },
  { table: "customer_messages",    policy: "Customer users see only their customer-facing messages",
    sql: "create policy \"cust_msgs_portal\" on customer_messages for select to authenticated using (customer_id in (select customer_ids_for_user(auth.uid())));" },
  { table: "company_branding",     policy: "Company admins manage branding",
    sql: "create policy \"branding_admin\" on company_branding for all to authenticated using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));" },
  { table: "custom_domains",       policy: "Company admins only",
    sql: "create policy \"domains_admin\" on custom_domains for all to authenticated using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));" },
  { table: "audit_exports",        policy: "Admin / security only",
    sql: "create policy \"audit_export_admin\" on audit_exports for all to authenticated using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));" },
  { table: "data_retention_policies", policy: "Admin only",
    sql: "create policy \"retention_admin\" on data_retention_policies for all to authenticated using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));" },
  { table: "company_locations",    policy: "Company-scoped",
    sql: "create policy \"locations_member\" on company_locations for select to authenticated using (company_id = current_company());" },
  { table: "fleet_scaling_metrics",policy: "Platform owners only",
    sql: "create policy \"scaling_platform\" on fleet_scaling_metrics for select to authenticated using (is_platform_owner(auth.uid()));" },
];

// ---------- Edge function plan ----------
export const V25_EDGE_FUNCTIONS = [
  { fn: "receive-edi-transaction",     area: "EDI",           callers: "Partner SFTP/AS2 webhook" },
  { fn: "process-edi-204",             area: "EDI",           callers: "receive-edi-transaction" },
  { fn: "send-edi-990",                area: "EDI",           callers: "Dispatcher action" },
  { fn: "send-edi-214",                area: "EDI",           callers: "Shipment status change" },
  { fn: "send-edi-210",                area: "EDI",           callers: "Invoice generated" },
  { fn: "send-edi-997",                area: "EDI",           callers: "receive-edi-transaction" },
  { fn: "retry-edi-transmission",      area: "EDI",           callers: "Retry queue cron" },
  { fn: "resolve-edi-error",           area: "EDI",           callers: "Dispatcher action" },
  { fn: "api-gateway-handler",         area: "API",           callers: "External callers" },
  { fn: "validate-api-key",            area: "API",           callers: "api-gateway-handler" },
  { fn: "enforce-api-rate-limit",      area: "API",           callers: "api-gateway-handler" },
  { fn: "record-api-usage-event",      area: "API",           callers: "api-gateway-handler" },
  { fn: "calculate-api-overage",       area: "API",           callers: "Daily cron" },
  { fn: "bill-api-usage",              area: "API",           callers: "Monthly billing cron" },
  { fn: "run-advanced-optimization",   area: "Optimization",  callers: "Dispatcher action / cron" },
  { fn: "compare-optimization-scenarios",area: "Optimization",callers: "Dispatcher action" },
  { fn: "create-multi-load-assignment",area: "Optimization",  callers: "Dispatcher action" },
  { fn: "validate-custom-domain",      area: "White-label",   callers: "Admin action" },
  { fn: "verify-dns-record",           area: "White-label",   callers: "Domain verification cron" },
  { fn: "update-branding-settings",    area: "White-label",   callers: "Admin action" },
  { fn: "draft-customer-message",      area: "Communication", callers: "CoPilot / trigger" },
  { fn: "approve-customer-message",    area: "Communication", callers: "Dispatcher action" },
  { fn: "send-customer-message",       area: "Communication", callers: "approve-customer-message" },
  { fn: "calculate-fleet-scaling-score",area:"Scaling",       callers: "Daily cron" },
  { fn: "aggregate-gps-events",        area: "Scaling",       callers: "Hourly cron" },
  { fn: "cleanup-retained-data",       area: "Retention",     callers: "Daily cron per data type" },
  { fn: "export-audit-logs",           area: "Audit",         callers: "Admin action" },
];

export function v25ReadinessScore() {
  const sum = V25_READINESS.byArea.reduce((a, x) => a + x.score, 0);
  return Math.round(sum / V25_READINESS.byArea.length);
}

// ---------- Phase 18 polish — additive enterprise context ----------

/** EDI error resolution queue surfaced from failed transmissions. */
export const EDI_ERROR_QUEUE = [
  { id: "err_001", tx: "edi_2405", partner: "Pied Piper Carriers", doc: "204", code: "MAP_MISSING_FIELD", field: "G62*70", severity: "high",   detail: "Missing pickup window — mapping v1 has no default.", suggestion: "Upgrade to mapping v2 (defaults pickup window from delivery − 6h).", owner: "integrations" },
  { id: "err_002", tx: "edi_2407", partner: "Initech Distribution", doc: "204", code: "PARTNER_TEST_MODE", field: "ISA*15",  severity: "info",   detail: "Partner is in test mode — auto-rejected with 990.",   suggestion: "Move partner to production after 5 clean samples.",            owner: "integrations" },
  { id: "err_003", tx: "edi_2411", partner: "Pied Piper Carriers", doc: "997", code: "ACK_TIMEOUT",       field: "—",       severity: "medium", detail: "997 ACK not received within 30 min SLA.",             suggestion: "Retry queued; escalate if 3rd attempt fails.",                  owner: "ops" },
  { id: "err_004", tx: "edi_2412", partner: "Globex Freight",      doc: "214", code: "TRANSPORT_5XX",     field: "AS2",     severity: "medium", detail: "Partner AS2 endpoint returned 503.",                  suggestion: "Auto-retry with backoff; partner notified at attempt 4.",       owner: "ops" },
];

export const EDI_ERROR_CODES = [
  { code: "MAP_MISSING_FIELD", action: "Update mapping or supply default; reprocess." },
  { code: "MAP_BAD_FORMAT",    action: "Fix transform rule; reprocess." },
  { code: "PARTNER_TEST_MODE", action: "Promote partner to production." },
  { code: "ACK_TIMEOUT",       action: "Retry; if persistent, contact partner." },
  { code: "TRANSPORT_5XX",     action: "Backoff retry; surface to reliability dashboard." },
  { code: "CONTROL_DUPLICATE", action: "Reject; investigate sequence reset." },
  { code: "AUTH_FAIL",         action: "Rotate credential; alert admin." },
];

/** Per-scenario contributing factors so the dispatcher sees the math. */
export const SCENARIO_FACTORS = [
  { scenario: "sc_001", factor: "Driver match", weight: 35, signal: "Vehicle + CDL + HOS available" },
  { scenario: "sc_001", factor: "Deadhead",     weight: 25, signal: "−38 mi vs alternative" },
  { scenario: "sc_001", factor: "Customer SLA", weight: 20, signal: "Acme tier-1; protects window" },
  { scenario: "sc_001", factor: "ETA confidence", weight: 20, signal: "86% historical on-route" },
  { scenario: "sc_003", factor: "Workload balance", weight: 40, signal: "Evens M.Alvarez vs R.Patel" },
  { scenario: "sc_003", factor: "Compliance",   weight: 30, signal: "Both drivers cleared for lane" },
  { scenario: "sc_003", factor: "Miles delta",  weight: 30, signal: "−12 mi net" },
];

/** API gateway security posture review. */
export const API_GATEWAY_SECURITY = [
  { id: "sec_g1",  control: "Keys stored hashed (sha-256)",          status: "enforced" },
  { id: "sec_g2",  control: "Per-key scopes least-privilege",        status: "enforced" },
  { id: "sec_g3",  control: "Per-tenant rate-limit isolation",       status: "enforced" },
  { id: "sec_g4",  control: "Idempotency keys required for writes",  status: "enforced" },
  { id: "sec_g5",  control: "PII masking in logs",                   status: "enforced" },
  { id: "sec_g6",  control: "Webhook signature verification (HMAC)", status: "enforced" },
  { id: "sec_g7",  control: "Cross-tenant data leak tests",          status: "scheduled" },
  { id: "sec_g8",  control: "Key rotation reminder (90 days)",       status: "enforced" },
];

/** Customer communication approval policy + recent action log. */
export const COMM_APPROVAL_POLICY = [
  { type: "Shipment delayed",    autoDraft: true,  requiresApproval: true,  channelDefault: "email" },
  { type: "ETA updated",         autoDraft: true,  requiresApproval: true,  channelDefault: "sms" },
  { type: "POD available",       autoDraft: true,  requiresApproval: false, channelDefault: "email" },
  { type: "Delivery completed",  autoDraft: true,  requiresApproval: false, channelDefault: "email" },
  { type: "Exception reported",  autoDraft: true,  requiresApproval: true,  channelDefault: "email" },
  { type: "Customer action req", autoDraft: false, requiresApproval: true,  channelDefault: "email" },
];

/** White-label preview metadata. */
export const WHITELABEL_PORTAL_SECTIONS = [
  { id: "ps1", section: "Header (logo + title)",     covered: true },
  { id: "ps2", section: "Shipment list",             covered: true },
  { id: "ps3", section: "Tracking timeline",         covered: true },
  { id: "ps4", section: "POD viewer",                covered: true },
  { id: "ps5", section: "Branded transactional email", covered: true },
  { id: "ps6", section: "Auth screen (login)",       covered: true },
  { id: "ps7", section: "Anderoute footer hidden",   covered: true },
];

/** Custom-domain setup walkthrough. */
export const DOMAIN_SETUP_STEPS = [
  { id: "d1", step: "Admin enters customer domain in portal settings" },
  { id: "d2", step: "Anderoute issues TXT verify token + CNAME target" },
  { id: "d3", step: "Customer DNS team adds records at their registrar" },
  { id: "d4", step: "verify-dns-record cron polls every 5 min for 60 min" },
  { id: "d5", step: "Once verified, SSL certificate issued (Let's Encrypt placeholder)" },
  { id: "d6", step: "Domain marked Active; portal serves on custom URL" },
  { id: "d7", step: "Cert auto-renews 30 days before expiry" },
];

/** Scaling watch alerts triggered by thresholds. */
export const SCALING_ALERTS = [
  { id: "sa1", area: "GPS event volume",        threshold: "12k/min", at: "11,400/min", level: "warn", action: "Pre-flight sharding plan; verify write target." },
  { id: "sa2", area: "Reports query perf",      threshold: "p95 3s",  at: "p95 2.8s",   level: "warn", action: "Plan materialized views for monthly reports." },
  { id: "sa3", area: "Webhook delivery volume", threshold: "5k/hr",   at: "4,200/hr",   level: "info", action: "Within capacity; no action." },
];

/** Location → driver / load distribution matrix. */
export const LOCATION_OPS_MATRIX = [
  { location: "Dallas HQ",         drivers: 84, activeLoads: 41, idle: 7,  onTime: 96.8 },
  { location: "Houston Yard",      drivers: 47, activeLoads: 22, idle: 4,  onTime: 95.4 },
  { location: "Atlanta Terminal",  drivers: 62, activeLoads: 28, idle: 6,  onTime: 94.1 },
  { location: "Phoenix Warehouse", drivers: 31, activeLoads: 14, idle: 3,  onTime: 95.9 },
  { location: "SoCal Region",      drivers: 23, activeLoads: 11, idle: 2,  onTime: 93.2 },
];

/** Retention summary for the V2.5 retention dashboard. */
export const RETENTION_SUMMARY = {
  policies: 12,
  underLegalHold: 4,
  pendingCleanup: 2,
  bytesReclaimed30d: "428 GB",
  nextCleanupAt: "2026-05-22 02:00",
};

/** Recent audit export runs. */
export const AUDIT_EXPORT_RUNS = [
  { id: "ax1", at: "2026-05-21 14:22", actor: "admin_7",     filter: "company=Acme, range=24h",       format: "CSV",  rows: 1247, status: "done"    },
  { id: "ax2", at: "2026-05-20 09:10", actor: "security_2",  filter: "event=EDI*, range=7d",          format: "JSON", rows: 412,  status: "done"    },
  { id: "ax3", at: "2026-05-18 16:01", actor: "admin_7",     filter: "actor=dispatcher_42, range=30d",format: "CSV",  rows: 2841, status: "done"    },
  { id: "ax4", at: "2026-05-21 14:55", actor: "admin_7",     filter: "company=Acme, range=90d",       format: "PDF",  rows: 0,    status: "queued"  },
];

/** Enterprise onboarding owner activity for go-live tracking. */
export const ONBOARDING_OWNER_LOAD = [
  { owner: "admin",        open: 1, done: 3, blocked: 0 },
  { owner: "ops",          open: 0, done: 2, blocked: 0 },
  { owner: "integrations", open: 3, done: 0, blocked: 1 },
  { owner: "billing",      open: 0, done: 1, blocked: 0 },
  { owner: "team",         open: 1, done: 0, blocked: 0 },
  { owner: "csm",          open: 1, done: 0, blocked: 0 },
];

/** KPI tiles for the enterprise reports dashboard. */
export const ENTERPRISE_REPORT_KPIS = [
  { id: "kpi1", label: "EDI success rate",       value: "96.2%",  delta: "-0.3pp", tone: "warn" },
  { id: "kpi2", label: "API monthly recurring",  value: "$24.7k", delta: "+8.4%",  tone: "good" },
  { id: "kpi3", label: "Optimization $ saved",   value: "$8.2k",  delta: "+12%",   tone: "good" },
  { id: "kpi4", label: "On-time delivery",       value: "95.4%",  delta: "+0.7pp", tone: "good" },
  { id: "kpi5", label: "Driver utilization",     value: "83%",    delta: "+1.5pp", tone: "good" },
  { id: "kpi6", label: "Customer comm approvals",value: "147",    delta: "+22",    tone: "info" },
];
