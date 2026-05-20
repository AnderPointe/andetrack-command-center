/**
 * Phase 15 — V1.1 mock data.
 *
 * Drives every /v11/* route. Keep purely client-side; no Supabase access.
 */

export type Tone = "good" | "warn" | "bad" | "info" | "default";

// ---------------- 1. V1.1 Scope ----------------
export interface ScopeItem {
  id: string;
  area: string;
  title: string;
  status: "in_v11" | "deferred";
  value: number; // 1-5
  effort: number; // 1-5
  note?: string;
}

export const V11_SCOPE: ScopeItem[] = [
  { id: "eta",      area: "ETA",          title: "Improved ETA engine",          status: "in_v11", value: 5, effort: 3 },
  { id: "offline",  area: "Driver",       title: "Driver offline + sync",        status: "in_v11", value: 5, effort: 3 },
  { id: "imp-drv",  area: "Imports",      title: "Driver CSV import",            status: "in_v11", value: 4, effort: 2 },
  { id: "imp-veh",  area: "Imports",      title: "Vehicle CSV import",           status: "in_v11", value: 4, effort: 2 },
  { id: "imp-cus",  area: "Imports",      title: "Customer CSV import",          status: "in_v11", value: 4, effort: 2 },
  { id: "notif",    area: "Notifications",title: "Notification reliability",     status: "in_v11", value: 5, effort: 2 },
  { id: "lb-filt",  area: "Dispatcher",   title: "Load board filters",           status: "in_v11", value: 4, effort: 2 },
  { id: "map-filt", area: "Dispatcher",   title: "Dispatch map filters",         status: "in_v11", value: 3, effort: 2 },
  { id: "portal",   area: "Portal",       title: "Customer tracking + POD",      status: "in_v11", value: 5, effort: 3 },
  { id: "billing",  area: "Billing",      title: "Basic billing activation",     status: "in_v11", value: 5, effort: 4 },
  { id: "subs",     area: "Billing",      title: "Subscription status",          status: "in_v11", value: 4, effort: 2 },
  { id: "roles",    area: "Roles",        title: "Permission matrix UI",         status: "in_v11", value: 3, effort: 2 },
  { id: "reports",  area: "Reports",      title: "10 practical reports",         status: "in_v11", value: 4, effort: 3 },
  { id: "copilot",  area: "CoPilot",      title: "Rules-based assistant v2",     status: "in_v11", value: 4, effort: 2 },
  { id: "nav-prep", area: "Navigation",   title: "Nav SDK preparation",          status: "in_v11", value: 5, effort: 3 },
  { id: "mobile",   area: "Mobile",       title: "Mobile polish pass",           status: "in_v11", value: 3, effort: 2 },
  { id: "onb",      area: "Onboarding",   title: "Production onboarding",        status: "in_v11", value: 4, effort: 3 },

  { id: "edi",      area: "Deferred",     title: "Full EDI production",          status: "deferred", value: 5, effort: 5, note: "V2" },
  { id: "marketp",  area: "Deferred",     title: "API marketplace",              status: "deferred", value: 4, effort: 5, note: "V2" },
  { id: "ai-pred",  area: "Deferred",     title: "Full predictive AI",           status: "deferred", value: 5, effort: 5, note: "V2" },
  { id: "android",  area: "Deferred",     title: "Android Auto",                 status: "deferred", value: 3, effort: 4, note: "V1.5+" },
  { id: "carplay",  area: "Deferred",     title: "CarPlay",                      status: "deferred", value: 3, effort: 4, note: "V1.5+" },
  { id: "wl",       area: "Deferred",     title: "White-label custom domains",   status: "deferred", value: 3, effort: 4, note: "V2" },
  { id: "soc2",     area: "Deferred",     title: "SOC 2 automation",             status: "deferred", value: 4, effort: 5, note: "V2" },
];

// ---------------- 2. ETA Engine ----------------
export type ETAConfidence = "high" | "medium" | "low" | "stale";
export type WindowStatus = "on_track" | "watch" | "at_risk" | "late";

export interface ETAShipment {
  id: string;
  customer: string;
  driver: string;
  remainingMi: number;
  avgSpeedMph: number;
  gpsAgeSec: number;
  windowStartIso: string;
  windowEndIso: string;
  manualBufferMin: number;
  status: WindowStatus;
  confidence: ETAConfidence;
  etaMin: number;
  delayRiskPct: number;
}

export const ETA_SHIPMENTS: ETAShipment[] = [
  { id: "SHP-1041", customer: "Northwind",   driver: "M. Alvarez", remainingMi: 84,  avgSpeedMph: 56, gpsAgeSec: 12,  windowStartIso: "2026-05-20T14:00:00Z", windowEndIso: "2026-05-20T16:00:00Z", manualBufferMin: 0,  status: "on_track", confidence: "high",   etaMin: 95,  delayRiskPct: 8 },
  { id: "SHP-1042", customer: "Stark Foods", driver: "J. Park",    remainingMi: 132, avgSpeedMph: 48, gpsAgeSec: 34,  windowStartIso: "2026-05-20T15:00:00Z", windowEndIso: "2026-05-20T17:00:00Z", manualBufferMin: 10, status: "watch",    confidence: "medium", etaMin: 175, delayRiskPct: 32 },
  { id: "SHP-1043", customer: "Beacon Co.",  driver: "T. Nguyen",  remainingMi: 220, avgSpeedMph: 52, gpsAgeSec: 220, windowStartIso: "2026-05-20T16:00:00Z", windowEndIso: "2026-05-20T18:00:00Z", manualBufferMin: 15, status: "at_risk",  confidence: "low",    etaMin: 260, delayRiskPct: 58 },
  { id: "SHP-1044", customer: "Acme",        driver: "R. Patel",   remainingMi: 41,  avgSpeedMph: 44, gpsAgeSec: 720, windowStartIso: "2026-05-20T12:00:00Z", windowEndIso: "2026-05-20T14:00:00Z", manualBufferMin: 0,  status: "late",     confidence: "stale",  etaMin: 60,  delayRiskPct: 92 },
];

export function explainETAChange(s: ETAShipment): string[] {
  const out: string[] = [];
  out.push(`Distance remaining: ${s.remainingMi} mi`);
  out.push(`Avg speed: ${s.avgSpeedMph} mph`);
  if (s.gpsAgeSec > 120) out.push(`GPS stale: ${Math.round(s.gpsAgeSec / 60)} min — confidence reduced`);
  if (s.manualBufferMin) out.push(`Dispatcher buffer: +${s.manualBufferMin} min`);
  out.push(`Delay risk: ${s.delayRiskPct}%`);
  return out;
}

export const ETA_UPDATE_TIMELINE = [
  { at: "08:01", text: "Initial ETA set on dispatch", delta: 0 },
  { at: "09:14", text: "Traffic slowdown on I-90 — +8 min",  delta: 8 },
  { at: "10:02", text: "Driver back on pace — -5 min",       delta: -5 },
  { at: "10:48", text: "Stop 1 dwell exceeded — +12 min",    delta: 12 },
  { at: "11:30", text: "Dispatcher buffer applied — +10 min", delta: 10 },
];

// ---------------- 3. Navigation SDK Readiness ----------------
export interface NavProvider {
  id: "mapbox" | "google" | "here" | "trimble" | "mock";
  label: string;
  tokenConfigured: boolean;
  mobileSdkReady: boolean;
  webMapReady: boolean;
  routeTest: boolean;
  turnByTurnTest: boolean;
  rerouteTest: boolean;
  etaSyncTest: boolean;
  truckRouting: boolean;
  costNote: string;
}

export const NAV_PROVIDERS: NavProvider[] = [
  { id: "mapbox",  label: "Mapbox Navigation SDK", tokenConfigured: true,  mobileSdkReady: true,  webMapReady: true,  routeTest: true,  turnByTurnTest: true,  rerouteTest: true,  etaSyncTest: true,  truckRouting: false, costNote: "$0.50 / 1k req · usage cap recommended" },
  { id: "google",  label: "Google Navigation SDK", tokenConfigured: false, mobileSdkReady: true,  webMapReady: true,  routeTest: true,  turnByTurnTest: false, rerouteTest: false, etaSyncTest: false, truckRouting: false, costNote: "Mobile SDK contract required" },
  { id: "here",    label: "HERE truck routing",    tokenConfigured: false, mobileSdkReady: false, webMapReady: true,  routeTest: true,  turnByTurnTest: false, rerouteTest: false, etaSyncTest: false, truckRouting: true,  costNote: "Truck profile gated by tier" },
  { id: "trimble", label: "Trimble truck routing", tokenConfigured: false, mobileSdkReady: false, webMapReady: false, routeTest: false, turnByTurnTest: false, rerouteTest: false, etaSyncTest: false, truckRouting: true,  costNote: "Enterprise quote required" },
  { id: "mock",    label: "Mock fallback",         tokenConfigured: true,  mobileSdkReady: true,  webMapReady: true,  routeTest: true,  turnByTurnTest: true,  rerouteTest: true,  etaSyncTest: true,  truckRouting: false, costNote: "Free — no live routing" },
];

export const NAV_V11_CUTLINE = {
  inV11: [
    "Provider abstraction layer",
    "Preferred provider selection",
    "API token placeholder validation",
    "Route request test harness",
    "Render route geometry",
    "Persist route session",
    "Sync ETA to shipment",
    "Show provider warnings",
    "Mock fallback retained",
  ],
  deferred: [
    "Native voice turn-by-turn",
    "Background navigation",
    "Automatic rerouting",
    "Android Auto",
    "CarPlay",
    "Lane guidance",
    "Truck restriction production validation",
  ],
};

export const NAV_RISKS = [
  { id: "cost",   label: "Per-request cost overruns",        severity: "high",   mitigation: "Hard cap + usage alerts" },
  { id: "truck",  label: "Truck restrictions inaccurate",    severity: "high",   mitigation: "Defer truck validation to V1.5" },
  { id: "bg",     label: "Background nav battery drain",     severity: "medium", mitigation: "Foreground only in V1.1" },
  { id: "vend",   label: "Vendor lock-in",                   severity: "medium", mitigation: "Provider abstraction layer" },
];

// ---------------- 4. Billing ----------------
export interface PlanRow {
  id: string;
  name: string;
  monthlyUsd: number;
  drivers: number;
  loadsPerMo: number;
  copilot: boolean;
  recommended?: boolean;
}

export const PLANS: PlanRow[] = [
  { id: "starter",  name: "Starter",  monthlyUsd: 149, drivers: 5,  loadsPerMo: 100,  copilot: false },
  { id: "growth",   name: "Growth",   monthlyUsd: 399, drivers: 20, loadsPerMo: 500,  copilot: true, recommended: true },
  { id: "scale",    name: "Scale",    monthlyUsd: 899, drivers: 60, loadsPerMo: 2000, copilot: true },
];

export const BILLING_OVERVIEW = {
  companyName: "Anderoute Pilot 1 (Northwind Logistics)",
  status: "trial" as "trial" | "active" | "past_due" | "canceled",
  plan: "growth",
  trialEndsIso: "2026-06-03",
  billingContact: { name: "Marsha Lee", email: "billing@northwind.example" },
  usage: {
    drivers: { used: 14, limit: 20 },
    vehicles: { used: 11, limit: 25 },
    loadsThisMo: { used: 312, limit: 500 },
    copilotQueries: { used: 187, limit: 1000 },
  },
};

export const BILLING_INVOICES = [
  { id: "INV-0001", periodIso: "2026-04", amountUsd: 0,   status: "trial",  hostedUrl: "#" },
  { id: "INV-0002", periodIso: "2026-05", amountUsd: 399, status: "open",   hostedUrl: "#" },
];

export const BILLING_SECURITY_CHECKLIST = [
  { id: "secret",  label: "Stripe secret key in Edge Function env only", done: true },
  { id: "wh-sig",  label: "Webhook signature verified before insert",    done: true },
  { id: "rls",     label: "billing_* tables RLS company-scoped",         done: true },
  { id: "audit",   label: "Audit log on plan change and webhook",        done: false },
  { id: "portal",  label: "Customer portal session scoped to company",   done: true },
];

// ---------------- 5. CSV Import ----------------
export type ImportKind = "driver" | "vehicle" | "customer";
export interface ImportFieldSpec { kind: ImportKind; field: string; required: boolean; note?: string; }

export const IMPORT_FIELDS: ImportFieldSpec[] = [
  { kind: "driver",  field: "driver_number", required: true },
  { kind: "driver",  field: "full_name",     required: true },
  { kind: "driver",  field: "phone",         required: true },
  { kind: "driver",  field: "email",         required: false },
  { kind: "driver",  field: "license_type",  required: true },
  { kind: "driver",  field: "cdl_status",    required: false },
  { kind: "driver",  field: "status",        required: true },

  { kind: "vehicle", field: "unit_number",   required: true },
  { kind: "vehicle", field: "vehicle_type",  required: true },
  { kind: "vehicle", field: "make",          required: false },
  { kind: "vehicle", field: "model",         required: false },
  { kind: "vehicle", field: "year",          required: false },
  { kind: "vehicle", field: "plate_number",  required: true },
  { kind: "vehicle", field: "vin",           required: false },
  { kind: "vehicle", field: "average_mpg",   required: false },
  { kind: "vehicle", field: "status",        required: true },

  { kind: "customer", field: "name",            required: true },
  { kind: "customer", field: "contact_name",    required: false },
  { kind: "customer", field: "email",           required: true },
  { kind: "customer", field: "phone",           required: false },
  { kind: "customer", field: "billing_address", required: false },
  { kind: "customer", field: "status",          required: true },
];

export interface ImportSamplePreview {
  kind: ImportKind;
  total: number;
  valid: number;
  invalid: number;
  warnings: number;
  errors: { row: number; field: string; message: string }[];
}

export const IMPORT_PREVIEWS: ImportSamplePreview[] = [
  { kind: "driver",   total: 24, valid: 22, invalid: 2, warnings: 1, errors: [
    { row: 7,  field: "phone",       message: "Invalid format" },
    { row: 19, field: "license_type", message: "Unknown value 'CDL-X'" },
  ]},
  { kind: "vehicle",  total: 18, valid: 18, invalid: 0, warnings: 2, errors: [] },
  { kind: "customer", total: 12, valid: 11, invalid: 1, warnings: 0, errors: [
    { row: 4, field: "email", message: "Missing" },
  ]},
];

// ---------------- 6. Offline + Sync ----------------
export interface OfflineEvent {
  id: string;
  kind: "status" | "location" | "load_accept" | "load_deny" | "pod" | "delay" | "issue";
  driver: string;
  capturedAt: string;
  state: "queued" | "syncing" | "synced" | "failed";
  retryCount: number;
  idempotencyKey: string;
  note?: string;
}

export const OFFLINE_QUEUE: OfflineEvent[] = [
  { id: "evt-001", kind: "status",      driver: "M. Alvarez", capturedAt: "11:02", state: "synced",  retryCount: 0, idempotencyKey: "k-001" },
  { id: "evt-002", kind: "pod",         driver: "M. Alvarez", capturedAt: "11:18", state: "syncing", retryCount: 1, idempotencyKey: "k-002" },
  { id: "evt-003", kind: "load_accept", driver: "J. Park",    capturedAt: "11:20", state: "queued",  retryCount: 0, idempotencyKey: "k-003" },
  { id: "evt-004", kind: "delay",       driver: "T. Nguyen",  capturedAt: "10:55", state: "failed",  retryCount: 3, idempotencyKey: "k-004", note: "409 conflict — server already received delivered status" },
];

// ---------------- 7. Notification Reliability ----------------
export interface NotifTemplate {
  id: string;
  trigger: string;
  channel: "push" | "sms" | "email";
  audience: "driver" | "dispatcher" | "customer";
}

export const NOTIF_TEMPLATES: NotifTemplate[] = [
  { id: "load_new",       trigger: "New load offer",        channel: "push",  audience: "driver"    },
  { id: "load_expiring",  trigger: "Load offer expiring",   channel: "push",  audience: "driver"    },
  { id: "load_accepted",  trigger: "Driver accepted load",  channel: "push",  audience: "dispatcher"},
  { id: "load_denied",    trigger: "Driver denied load",    channel: "push",  audience: "dispatcher"},
  { id: "driver_delayed", trigger: "Driver delayed",        channel: "email", audience: "dispatcher"},
  { id: "driver_delivered", trigger: "Driver delivered",    channel: "push",  audience: "dispatcher"},
  { id: "pod_submitted",  trigger: "POD submitted",         channel: "email", audience: "dispatcher"},
  { id: "customer_update",trigger: "Customer shipment update", channel: "email", audience: "customer" },
];

export const NOTIF_METRICS = {
  sent: 1842,
  opened: 1314,
  failed: 41,
  retrying: 7,
  deliveryRate: 0.978,
  openRate: 0.713,
};

export const NOTIF_FAILURES = [
  { id: "f1", template: "customer_update", reason: "SMTP timeout",         count: 22 },
  { id: "f2", template: "load_new",        reason: "FCM token expired",    count: 11 },
  { id: "f3", template: "driver_delivered",reason: "Rate limited",         count: 5  },
  { id: "f4", template: "pod_submitted",   reason: "Recipient unsubscribed",count: 3  },
];

// ---------------- 8. Customer Portal V1.1 ----------------
export const PORTAL_FEATURES = [
  { id: "timeline",  label: "Improved shipment timeline",      done: true },
  { id: "eta",       label: "Live ETA with confidence",        done: true },
  { id: "track",     label: "Tracking map with breadcrumbs",   done: true },
  { id: "pod",       label: "POD viewer with signature image", done: true },
  { id: "notif",     label: "Notification preferences",        done: false },
  { id: "search",    label: "Shipment search",                 done: true },
  { id: "filter",    label: "Shipment filters",                done: true },
  { id: "history",   label: "Completed history",               done: true },
  { id: "contact",   label: "Contact dispatch button",         done: true },
  { id: "explain",   label: "Status explanation cards",        done: false },
];

// ---------------- 9. Dispatcher V1.1 ----------------
export const DISPATCH_FEATURES = [
  { id: "filt",       label: "Advanced load filters",        done: true },
  { id: "saved",      label: "Saved views",                  done: false },
  { id: "avail",      label: "Driver availability filter",   done: true },
  { id: "vtype",      label: "Vehicle type filter",          done: true },
  { id: "cust",       label: "Customer filter",              done: true },
  { id: "delayed",    label: "Delayed load filter",          done: true },
  { id: "risk",       label: "Delivery window risk filter",  done: true },
  { id: "bulk",       label: "Bulk status view",             done: false },
  { id: "timeline",   label: "Activity timeline",            done: true },
  { id: "assign",     label: "Assignment quick-panel",       done: true },
];

// ---------------- 10. Reports V1.1 ----------------
export interface ReportSpec { id: string; name: string; category: string; sample: string; }

export const REPORTS_V11: ReportSpec[] = [
  { id: "r1",  name: "Loads completed by date",   category: "Operations", sample: "312 loads · last 30 days" },
  { id: "r2",  name: "Loads by customer",         category: "Operations", sample: "Northwind: 142 · Stark: 88" },
  { id: "r3",  name: "Loads by driver",           category: "Operations", sample: "M. Alvarez: 41 · J. Park: 36" },
  { id: "r4",  name: "Load denial reasons",       category: "Operations", sample: "HOS: 12 · Equipment: 7" },
  { id: "r5",  name: "Driver status history",     category: "Drivers",    sample: "Avg on-duty: 7.8 hr/day" },
  { id: "r6",  name: "GPS reliability",           category: "Telemetry",  sample: "Update success 96.2%" },
  { id: "r7",  name: "Notification delivery",     category: "Telemetry",  sample: "Delivery 97.8% · open 71%" },
  { id: "r8",  name: "POD completion",            category: "Telemetry",  sample: "POD on file 98%" },
  { id: "r9",  name: "Customer shipment activity",category: "Customer",   sample: "Northwind: 412 views" },
  { id: "r10", name: "Dispatcher activity",       category: "Internal",   sample: "Assignments / hr: 12" },
];

// ---------------- 11. CoPilot Rules ----------------
export interface CoPilotRule { id: string; question: string; answer: string; tags: string[]; }

export const COPILOT_RULES: CoPilotRule[] = [
  { id: "c1", question: "What loads are delayed?",                answer: "2 loads delayed: SHP-1043 (At Risk · 58%), SHP-1044 (Late · stale GPS).", tags: ["delay"] },
  { id: "c2", question: "Which drivers are available?",           answer: "4 drivers on-duty available: M. Alvarez, J. Park, T. Nguyen, R. Patel.",   tags: ["driver"] },
  { id: "c3", question: "Which loads need attention?",            answer: "SHP-1044 (POD overdue, GPS stale), SHP-1042 (window watch).",              tags: ["attention"] },
  { id: "c4", question: "Why did ETA change?",                    answer: "Stop 1 dwell exceeded +12 min and dispatcher buffer +10 min.",             tags: ["eta"] },
  { id: "c5", question: "Which notifications failed?",            answer: "41 failed (mostly SMTP timeout on customer_update). 7 retrying.",          tags: ["notif"] },
  { id: "c6", question: "Which drivers have stale GPS?",          answer: "R. Patel (12 min). All others <60s.",                                       tags: ["gps"] },
  { id: "c7", question: "What should dispatch check next?",       answer: "1) SHP-1044 POD 2) R. Patel GPS 3) Retry 7 stuck notifications.",          tags: ["next"] },
  { id: "c8", question: "What is the next action for this load?", answer: "Acknowledge POD for SHP-1043 and notify customer.",                         tags: ["next"] },
];

// ---------------- 12. Permissions ----------------
export const PERMISSION_MATRIX = [
  { perm: "Manage company billing",          admin: true,  dispatcher: false, driver: false, customer: false, owner: true },
  { perm: "Manage drivers / vehicles",       admin: true,  dispatcher: true,  driver: false, customer: false, owner: true },
  { perm: "Create / assign loads",           admin: true,  dispatcher: true,  driver: false, customer: false, owner: true },
  { perm: "Accept / deny loads",             admin: false, dispatcher: false, driver: true,  customer: false, owner: false },
  { perm: "Submit POD",                      admin: false, dispatcher: false, driver: true,  customer: false, owner: false },
  { perm: "View own shipments + POD",        admin: false, dispatcher: false, driver: false, customer: true,  owner: false },
  { perm: "CSV import (drivers/vehicles)",   admin: true,  dispatcher: true,  driver: false, customer: false, owner: true },
  { perm: "Run reports",                     admin: true,  dispatcher: true,  driver: false, customer: false, owner: true },
  { perm: "View audit logs",                 admin: true,  dispatcher: false, driver: false, customer: false, owner: true },
  { perm: "Cross-company platform access",   admin: false, dispatcher: false, driver: false, customer: false, owner: true },
];

// ---------------- 13. Production Onboarding ----------------
export const ONBOARDING_TASKS = [
  { id: "co",     label: "Create company workspace",      done: true },
  { id: "admin",  label: "Invite company admin",          done: true },
  { id: "disp",   label: "Set up dispatcher accounts",    done: true },
  { id: "drv",    label: "Import drivers (CSV)",          done: false },
  { id: "veh",    label: "Import vehicles (CSV)",         done: false },
  { id: "cust",   label: "Import customers (CSV)",        done: false },
  { id: "portal", label: "Activate customer portal",      done: false },
  { id: "first",  label: "First live load created",       done: false },
  { id: "bill",   label: "Billing plan assigned",         done: false },
  { id: "train",  label: "Training completed",            done: false },
  { id: "live",   label: "Go-live checklist signed",      done: false },
];

// ---------------- 14. Production Growth ----------------
export const GROWTH_METRICS = {
  activeCompanies: 3,
  activeDrivers: 38,
  activeDispatchers: 6,
  activeCustomerUsers: 14,
  loadsCreated30d: 612,
  loadsCompleted30d: 588,
  portalSessions30d: 421,
  trialActive: 2,
  trialsConverted: 1,
  supportTickets30d: 28,
  churnRiskAccounts: 0,
  expansionOpportunities: 2,
};

// ---------------- 15. Support V1.1 ----------------
export const SUPPORT_TICKETS = [
  { id: "T-241", category: "Billing",       priority: "P2", sla: "4h",  status: "open",    note: "Invoice question"            },
  { id: "T-242", category: "Driver app",    priority: "P1", sla: "1h",  status: "open",    note: "Offline sync stuck"          },
  { id: "T-243", category: "Notifications", priority: "P3", sla: "24h", status: "open",    note: "Customer wants SMS"          },
  { id: "T-244", category: "Portal",        priority: "P2", sla: "4h",  status: "resolved",note: "POD download failure"        },
  { id: "T-245", category: "Onboarding",    priority: "P2", sla: "4h",  status: "open",    note: "CSV mapping confusion"       },
];

export const KNOWN_ISSUES = [
  { id: "K-01", label: "Notification SMTP timeout (intermittent)", workaround: "Retry queue handles within 5 min" },
  { id: "K-02", label: "POD viewer slow on iOS 16",                workaround: "Use Chrome / iOS 17+" },
];

// ---------------- 16. Data Quality ----------------
export const DATA_QUALITY_ISSUES = [
  { id: "d1", kind: "load_missing_customer",   count: 4,  severity: "high"   },
  { id: "d2", kind: "shipment_missing_eta",    count: 2,  severity: "medium" },
  { id: "d3", kind: "driver_no_vehicle",       count: 3,  severity: "medium" },
  { id: "d4", kind: "vehicle_bad_type",        count: 1,  severity: "low"    },
  { id: "d5", kind: "customer_missing_contact",count: 2,  severity: "medium" },
  { id: "d6", kind: "load_missing_coords",     count: 5,  severity: "high"   },
  { id: "d7", kind: "completed_no_pod",        count: 1,  severity: "high"   },
  { id: "d8", kind: "driver_state_stale",      count: 2,  severity: "medium" },
  { id: "d9", kind: "csv_duplicate",           count: 6,  severity: "low"    },
];

// ---------------- 17. Security Review ----------------
export const V11_SECURITY_REVIEW = [
  { id: "rls",       label: "RLS still passing on all V1 tables",        ok: true },
  { id: "bill-rls",  label: "billing_* tables scoped to company_id",     ok: true },
  { id: "import",    label: "CSV import gated by company admin role",    ok: true },
  { id: "portal",    label: "Customer portal isolated by customer_id",   ok: true },
  { id: "offline",   label: "Offline queue does not leak cross-company", ok: true },
  { id: "pref",      label: "Notification prefs scoped to user",         ok: true },
  { id: "secret",    label: "Stripe secret never reaches frontend",      ok: true },
  { id: "audit",     label: "Audit logs on billing + import actions",    ok: false },
  { id: "csv-val",   label: "CSV input validated server-side",           ok: true },
  { id: "file-up",   label: "Upload restricted to text/csv + 5MB cap",   ok: true },
];

// ---------------- 18. Aggregate readiness ----------------
export function v11ReadinessScore(): number {
  const scope = V11_SCOPE.filter((s) => s.status === "in_v11").length;
  const onboarding = ONBOARDING_TASKS.filter((t) => t.done).length / ONBOARDING_TASKS.length;
  const security = V11_SECURITY_REVIEW.filter((s) => s.ok).length / V11_SECURITY_REVIEW.length;
  const billing = BILLING_SECURITY_CHECKLIST.filter((c) => c.done).length / BILLING_SECURITY_CHECKLIST.length;
  const portal = PORTAL_FEATURES.filter((p) => p.done).length / PORTAL_FEATURES.length;
  const dispatch = DISPATCH_FEATURES.filter((d) => d.done).length / DISPATCH_FEATURES.length;
  const composite = (onboarding * 0.2 + security * 0.25 + billing * 0.15 + portal * 0.2 + dispatch * 0.2) * 100;
  return Math.round(composite);
}

export function v11ReadinessBreakdown() {
  return [
    { id: "onb",  label: "Onboarding",          pct: Math.round(ONBOARDING_TASKS.filter((t) => t.done).length / ONBOARDING_TASKS.length * 100), weight: 20 },
    { id: "sec",  label: "Security",            pct: Math.round(V11_SECURITY_REVIEW.filter((s) => s.ok).length / V11_SECURITY_REVIEW.length * 100), weight: 25 },
    { id: "bill", label: "Billing readiness",   pct: Math.round(BILLING_SECURITY_CHECKLIST.filter((c) => c.done).length / BILLING_SECURITY_CHECKLIST.length * 100), weight: 15 },
    { id: "port", label: "Customer portal",     pct: Math.round(PORTAL_FEATURES.filter((p) => p.done).length / PORTAL_FEATURES.length * 100), weight: 20 },
    { id: "disp", label: "Dispatcher",          pct: Math.round(DISPATCH_FEATURES.filter((d) => d.done).length / DISPATCH_FEATURES.length * 100), weight: 20 },
  ];
}

export function v11Stats() {
  return {
    inScope: V11_SCOPE.filter((s) => s.status === "in_v11").length,
    deferred: V11_SCOPE.filter((s) => s.status === "deferred").length,
  };
}
