/**
 * Phase 14 — Post-Pilot V1 Production Rollout
 *
 * Mock data backing the Anderoute V1 dashboards. Numbers reflect the pilot
 * outcome scenario from the Phase 14 brief and are intentionally static so
 * the UI can be reviewed without a backend.
 */

export type Trend = "up" | "down" | "flat";

export interface Metric {
  id: string;
  label: string;
  value: string;
  delta?: string;
  trend?: Trend;
  hint?: string;
}

export interface MetricGroup {
  id: string;
  title: string;
  blurb: string;
  metrics: Metric[];
}

export type FeedbackStatus =
  | "new"
  | "reviewed"
  | "accepted"
  | "planned"
  | "in_progress"
  | "released"
  | "declined";

export interface FeedbackItem {
  id: string;
  source: "dispatcher" | "driver" | "customer" | "admin" | "support" | "sales" | "qa";
  category: string;
  title: string;
  severity: "low" | "medium" | "high";
  frequency: "rare" | "sometimes" | "often";
  impact: "low" | "medium" | "high";
  status: FeedbackStatus;
  quote?: string;
}

export type BugStatus =
  | "new"
  | "confirmed"
  | "in_progress"
  | "ready_qa"
  | "fixed"
  | "released"
  | "wont_fix"
  | "duplicate";

export interface BugItem {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  priority: "P0" | "P1" | "P2" | "P3";
  affectedRole: "driver" | "dispatcher" | "customer" | "admin";
  workflow: string;
  status: BugStatus;
  releaseTarget: string;
}

export type V1Priority = "must" | "should" | "nice" | "post_v1" | "enterprise_later";

export interface V1Feature {
  id: string;
  name: string;
  area: string;
  priority: V1Priority;
  value: 1 | 2 | 3 | 4 | 5;
  effort: 1 | 2 | 3 | 4 | 5;
  status: "planned" | "in_progress" | "ready" | "shipped";
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  note?: string;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  role: "driver" | "dispatcher" | "customer" | "admin";
  priority: "P0" | "P1" | "P2" | "P3";
  status: "open" | "in_progress" | "waiting_user" | "resolved";
  slaHours: number;
  openHours: number;
}

export interface RoadmapItem {
  id: string;
  release: "V1" | "V1.1" | "V1.5" | "V2" | "Enterprise";
  title: string;
  status: "shipped" | "in_progress" | "planned" | "deferred";
}

/* ---------------------------------------------------------------- */
/*  Post-Pilot Review                                                */
/* ---------------------------------------------------------------- */

export const PILOT_SUMMARY = {
  pilotCompany: "Northbound Freight",
  pilotWindow: "Apr 28 — May 18, 2026",
  activeDrivers: 12,
  activeDispatchers: 3,
  loadsCompleted: 86,
  loadsCreated: 94,
  podCompletion: 0.93,
  gpsReliability: 0.91,
  driverAdoption: 0.78,
  dispatcherAdoption: 0.92,
  customerPortalViews: 64,
  supportTickets: 23,
  bugsFixed: 8,
  featureRequests: 14,
  successScore: 82, // 0-100
  goNoGo: "GO" as "GO" | "NO_GO" | "CONDITIONAL",
};

export const PILOT_QUOTES = [
  { author: "Maya — Dispatcher", text: "Assigning a load now takes under a minute. The map view actually saves me phone calls." },
  { author: "Driver T.", text: "Accept / deny on the load screen is clear. I just wish the stale GPS warning was louder." },
  { author: "Customer ops lead", text: "Our customers stopped calling for status updates within the first week." },
];

/* ---------------------------------------------------------------- */
/*  Metrics                                                          */
/* ---------------------------------------------------------------- */

export const METRIC_GROUPS: MetricGroup[] = [
  {
    id: "adoption",
    title: "Adoption",
    blurb: "Who is logging in and using the workflows daily.",
    metrics: [
      { id: "drv",  label: "Active drivers",            value: "12 / 15", delta: "+3",  trend: "up" },
      { id: "dsp",  label: "Active dispatchers",        value: "3 / 3",   trend: "flat" },
      { id: "cust", label: "Customer portal users",     value: "9",       delta: "+4",  trend: "up" },
      { id: "log",  label: "Driver login rate (7d)",    value: "88%",     delta: "+6",  trend: "up" },
      { id: "off",  label: "Driver accept/deny usage",  value: "94%",     trend: "up" },
      { id: "crt",  label: "Dispatcher load creation",  value: "94 / wk", trend: "up" },
    ],
  },
  {
    id: "ops",
    title: "Operations",
    blurb: "Load lifecycle and proof-of-delivery throughput.",
    metrics: [
      { id: "lc",  label: "Loads completed",   value: "86" },
      { id: "lo",  label: "Loads offered",     value: "91" },
      { id: "la",  label: "Loads accepted",    value: "84" },
      { id: "ld",  label: "Loads denied",      value: "7" },
      { id: "pod", label: "POD completion",    value: "93%", trend: "up" },
      { id: "alt", label: "Alerts resolved",   value: "41 / 47" },
    ],
  },
  {
    id: "reliability",
    title: "Reliability",
    blurb: "Signal quality and platform stability — gates V1 GA.",
    metrics: [
      { id: "gps",  label: "GPS update success",    value: "91%", trend: "up",   hint: "target 95%" },
      { id: "stl",  label: "GPS stale rate",        value: "6%",  trend: "down", hint: "target <5%" },
      { id: "rt",   label: "Realtime sync delay",   value: "1.4s", trend: "down" },
      { id: "ndl",  label: "Notification delivery", value: "94%", trend: "up" },
      { id: "err",  label: "API error rate",        value: "0.8%", trend: "down" },
      { id: "ofq",  label: "Offline queue usage",   value: "3%" },
    ],
  },
  {
    id: "value",
    title: "Customer value",
    blurb: "Proxy signals for the outcomes the pilot promised.",
    metrics: [
      { id: "calls", label: "Status calls reduced",       value: "~70%", hint: "self-reported" },
      { id: "assn",  label: "Faster dispatch assignment", value: "-42%", hint: "vs pre-pilot baseline" },
      { id: "vis",   label: "Customer visibility score",  value: "4.4 / 5" },
      { id: "drvs",  label: "Driver satisfaction",        value: "4.1 / 5" },
      { id: "dsps",  label: "Dispatcher satisfaction",    value: "4.5 / 5" },
      { id: "csts",  label: "Customer satisfaction",      value: "4.3 / 5" },
    ],
  },
];

/* ---------------------------------------------------------------- */
/*  Feedback + bugs                                                  */
/* ---------------------------------------------------------------- */

export const FEEDBACK: FeedbackItem[] = [
  { id: "fb-001", source: "driver",     category: "GPS tracking",        title: "Stale GPS banner is too subtle",         severity: "high",   frequency: "often",     impact: "high",   status: "accepted",   quote: "I didn't notice GPS dropped until dispatch called." },
  { id: "fb-002", source: "dispatcher", category: "Load workflow",       title: "Bulk re-offer to backup driver",          severity: "medium", frequency: "sometimes", impact: "medium", status: "planned" },
  { id: "fb-003", source: "customer",   category: "Customer portal",     title: "Show ETA in customer timezone",           severity: "medium", frequency: "often",     impact: "high",   status: "planned" },
  { id: "fb-004", source: "driver",     category: "Driver app",          title: "Confirm dialog after deny to prevent taps", severity: "low",  frequency: "rare",      impact: "low",    status: "reviewed" },
  { id: "fb-005", source: "dispatcher", category: "Notifications",       title: "Audible alert when driver denies",        severity: "medium", frequency: "sometimes", impact: "medium", status: "in_progress" },
  { id: "fb-006", source: "admin",      category: "Reports",             title: "Weekly POD completion CSV",               severity: "low",    frequency: "rare",      impact: "medium", status: "new" },
  { id: "fb-007", source: "customer",   category: "POD",                 title: "Download POD PDF from portal",             severity: "medium", frequency: "often",     impact: "high",   status: "planned" },
  { id: "fb-008", source: "driver",     category: "Mobile usability",    title: "Bigger status buttons in winter gloves",  severity: "low",    frequency: "sometimes", impact: "medium", status: "accepted" },
  { id: "fb-009", source: "support",    category: "Permissions",         title: "New dispatcher can't see audit timeline", severity: "high",   frequency: "rare",      impact: "high",   status: "in_progress" },
  { id: "fb-010", source: "qa",         category: "Performance",         title: "Load board slow at >200 rows",            severity: "medium", frequency: "sometimes", impact: "medium", status: "accepted" },
];

export const BUGS: BugItem[] = [
  { id: "BUG-101", title: "GPS stops updating when app backgrounded >5m", severity: "high",     priority: "P1", affectedRole: "driver",     workflow: "GPS tracking",  status: "fixed",       releaseTarget: "V1.0.0" },
  { id: "BUG-102", title: "Customer portal ETA flashes 'unknown' on load", severity: "medium",  priority: "P2", affectedRole: "customer",   workflow: "Tracking",      status: "ready_qa",    releaseTarget: "V1.0.0" },
  { id: "BUG-103", title: "Dispatcher cannot reassign after driver denial", severity: "critical", priority: "P0", affectedRole: "dispatcher", workflow: "Reassignment",  status: "in_progress", releaseTarget: "V1.0.0" },
  { id: "BUG-104", title: "POD photo upload retries forever on poor signal", severity: "high",   priority: "P1", affectedRole: "driver",     workflow: "POD",           status: "confirmed",   releaseTarget: "V1.0.0" },
  { id: "BUG-105", title: "Audit timeline missing reassignment events",     severity: "medium",  priority: "P2", affectedRole: "admin",      workflow: "Audit",         status: "fixed",       releaseTarget: "V1.0.0" },
  { id: "BUG-106", title: "Duplicate notification on accept",               severity: "low",     priority: "P3", affectedRole: "driver",     workflow: "Notifications", status: "released",    releaseTarget: "V0.9.4" },
];

/* ---------------------------------------------------------------- */
/*  V1 cutline + prioritization                                      */
/* ---------------------------------------------------------------- */

export const V1_FEATURES: V1Feature[] = [
  { id: "v1-disp",   name: "Stable dispatcher dashboard",  area: "Dispatch",     priority: "must",   value: 5, effort: 3, status: "in_progress" },
  { id: "v1-load",   name: "Reliable load workflow",       area: "Loads",        priority: "must",   value: 5, effort: 3, status: "in_progress" },
  { id: "v1-drv",    name: "Driver mobile stabilization",  area: "Driver app",   priority: "must",   value: 5, effort: 4, status: "in_progress" },
  { id: "v1-gps",    name: "GPS / realtime hardening",     area: "Reliability",  priority: "must",   value: 5, effort: 4, status: "in_progress" },
  { id: "v1-port",   name: "Customer portal tracking",     area: "Customer",     priority: "must",   value: 4, effort: 2, status: "ready" },
  { id: "v1-pod",    name: "POD workflow",                 area: "POD",          priority: "must",   value: 4, effort: 2, status: "ready" },
  { id: "v1-rep",    name: "Basic V1 reports",             area: "Reporting",    priority: "must",   value: 4, effort: 3, status: "planned" },
  { id: "v1-notif",  name: "Notification reliability",     area: "Notifications", priority: "must",  value: 4, effort: 3, status: "in_progress" },
  { id: "v1-onb",    name: "Cleaner onboarding",           area: "Onboarding",   priority: "should", value: 4, effort: 3, status: "planned" },
  { id: "v1-sup",    name: "Support operations",           area: "Support",      priority: "should", value: 4, effort: 2, status: "planned" },
  { id: "v1-audit",  name: "Better audit logs",            area: "Security",     priority: "should", value: 3, effort: 2, status: "planned" },
  { id: "v1-bill",   name: "Billing / pricing readiness",  area: "Commercial",   priority: "should", value: 3, effort: 3, status: "planned" },
  { id: "v1-set",    name: "Basic company settings",       area: "Admin",        priority: "should", value: 3, effort: 2, status: "ready" },
  { id: "v1-demo",   name: "Improved demo mode",           area: "Sales",        priority: "nice",   value: 2, effort: 1, status: "ready" },
  { id: "v2-edi",    name: "EDI production",               area: "Integrations", priority: "post_v1",         value: 4, effort: 5, status: "planned" },
  { id: "v2-api",    name: "Full API marketplace",         area: "Integrations", priority: "post_v1",         value: 4, effort: 5, status: "planned" },
  { id: "v2-ai",     name: "Full predictive AI",           area: "Intelligence", priority: "post_v1",         value: 4, effort: 5, status: "planned" },
  { id: "ent-aa",    name: "Android Auto",                 area: "Driver app",   priority: "enterprise_later", value: 3, effort: 4, status: "planned" },
  { id: "ent-cp",    name: "CarPlay",                      area: "Driver app",   priority: "enterprise_later", value: 3, effort: 4, status: "planned" },
  { id: "ent-wl",    name: "White-label custom domains",   area: "Branding",     priority: "enterprise_later", value: 3, effort: 3, status: "planned" },
];

export const PRIORITY_LABEL: Record<V1Priority, string> = {
  must: "V1 Must Have",
  should: "V1 Should Have",
  nice: "V1 Nice to Have",
  post_v1: "Post-V1",
  enterprise_later: "Enterprise Later",
};

export const PRIORITY_TONE: Record<V1Priority, string> = {
  must: "border-emerald-500/30 text-emerald-300",
  should: "border-sky-500/30 text-sky-300",
  nice: "border-violet-500/30 text-violet-300",
  post_v1: "border-amber-500/30 text-amber-300",
  enterprise_later: "border-white/15 text-muted-foreground",
};

/* ---------------------------------------------------------------- */
/*  Stabilization checklists                                         */
/* ---------------------------------------------------------------- */

export const DRIVER_STABILIZATION: ChecklistGroup = {
  id: "driver",
  title: "Driver app stabilization",
  items: [
    { id: "d1",  label: "Faster login (< 2s)",                    done: true },
    { id: "d2",  label: "Clearer load offer screen",              done: true },
    { id: "d3",  label: "Accept/deny confirmation step",          done: true },
    { id: "d4",  label: "Denial reason flow",                     done: true },
    { id: "d5",  label: "Active load screen polish",              done: true },
    { id: "d6",  label: "Larger status update buttons",           done: false, note: "ship in V1.0.1" },
    { id: "d7",  label: "GPS active indicator",                   done: true },
    { id: "d8",  label: "Stale GPS warning surfaced",             done: false, note: "linked to fb-001" },
    { id: "d9",  label: "Privacy notice copy reviewed",           done: true },
    { id: "d10", label: "POD form streamlined",                   done: true },
    { id: "d11", label: "Offline / sync status visible",          done: true },
    { id: "d12", label: "Battery warning placeholder",            done: false },
    { id: "d13", label: "Driver support button",                  done: true },
  ],
};

export const DISPATCHER_STABILIZATION: ChecklistGroup = {
  id: "dispatcher",
  title: "Dispatcher workflow stabilization",
  items: [
    { id: "x1", label: "Faster load creation",                  done: true },
    { id: "x2", label: "Load board filters",                    done: true },
    { id: "x3", label: "Status visibility upgrades",            done: true },
    { id: "x4", label: "Driver availability view",              done: true },
    { id: "x5", label: "Map marker clarity",                    done: false },
    { id: "x6", label: "Alert prioritization",                  done: true },
    { id: "x7", label: "Offer / assign workflow",               done: true },
    { id: "x8", label: "Audit timeline rendering",              done: false, note: "linked to BUG-105" },
    { id: "x9", label: "Customer shipment visibility",          done: true },
    { id: "x10", label: "Exception handling flow",              done: false },
  ],
};

export const PORTAL_STABILIZATION: ChecklistGroup = {
  id: "portal",
  title: "Customer portal stabilization",
  items: [
    { id: "c1", label: "Clear shipment status",                 done: true },
    { id: "c2", label: "ETA display polished",                  done: false, note: "needs timezone fix" },
    { id: "c3", label: "Tracking timeline",                     done: true },
    { id: "c4", label: "POD visibility",                        done: true },
    { id: "c5", label: "Support / contact option",              done: true },
    { id: "c6", label: "Mobile view polish",                    done: false },
    { id: "c7", label: "Status language reviewed",              done: true },
    { id: "c8", label: "Notification preferences placeholder",  done: false },
  ],
};

/* ---------------------------------------------------------------- */
/*  GPS + notification reliability                                   */
/* ---------------------------------------------------------------- */

export const GPS_RELIABILITY: Metric[] = [
  { id: "gpsf", label: "GPS update frequency",       value: "every 12s" },
  { id: "stl",  label: "Stale rate (>60s)",          value: "6%", trend: "down" },
  { id: "fg",   label: "App in foreground",          value: "71%" },
  { id: "acc",  label: "Avg accuracy",               value: "8m" },
  { id: "rd",   label: "Realtime disconnects / day", value: "1.2" },
  { id: "rc",   label: "Reconnect success",          value: "99%" },
  { id: "ofq",  label: "Offline queue events",       value: "184" },
  { id: "dup",  label: "Duplicate events",           value: "0.3%" },
  { id: "wer",  label: "GPS write errors",           value: "0.1%" },
  { id: "lat",  label: "Map update latency",         value: "1.1s" },
];

export const NOTIFICATION_RELIABILITY: Metric[] = [
  { id: "off",  label: "Load offer notifications",   value: "91" },
  { id: "snt",  label: "Notifications sent",         value: "327" },
  { id: "opn",  label: "Notifications opened",       value: "78%" },
  { id: "fld",  label: "Notifications failed",       value: "6%" },
  { id: "dt",   label: "Avg delivery time",          value: "3.8s" },
  { id: "rsp",  label: "Driver response after push", value: "42s" },
  { id: "dsp",  label: "Dispatcher push events",     value: "112" },
  { id: "cst",  label: "Customer push events",       value: "placeholder", hint: "V1.1" },
];

/* ---------------------------------------------------------------- */
/*  V1 reports                                                       */
/* ---------------------------------------------------------------- */

export const V1_REPORTS = [
  { id: "r1", name: "Loads completed",         description: "Daily and weekly completion totals per company." },
  { id: "r2", name: "Loads by status",         description: "Snapshot of in-flight load lifecycle states." },
  { id: "r3", name: "Driver status report",    description: "Current status, last known location, on-duty time." },
  { id: "r4", name: "Driver completed loads",  description: "Per-driver completion + on-time rate." },
  { id: "r5", name: "Customer shipment report", description: "Shipments grouped by customer with ETA accuracy." },
  { id: "r6", name: "POD completion report",   description: "POD attach rate, missing PODs, time-to-submit." },
  { id: "r7", name: "GPS reliability report",  description: "Update success, stale rate, accuracy per driver." },
  { id: "r8", name: "Alert resolution report", description: "Alerts created vs resolved, average resolution time." },
  { id: "r9", name: "Load denial reasons",     description: "Aggregated denial reasons for capacity planning." },
  { id: "r10", name: "Dispatcher activity",    description: "Loads created, assigned, reassigned per dispatcher." },
];

/* ---------------------------------------------------------------- */
/*  Support + customer success                                       */
/* ---------------------------------------------------------------- */

export const SUPPORT_TICKETS: SupportTicket[] = [
  { id: "T-201", subject: "Driver can't log in after password reset", category: "Login",       role: "driver",     priority: "P1", status: "in_progress",  slaHours: 4,  openHours: 2 },
  { id: "T-202", subject: "Customer portal stuck on loading",          category: "Customer portal", role: "customer", priority: "P1", status: "open",        slaHours: 4,  openHours: 5 },
  { id: "T-203", subject: "GPS missing on driver T.",                  category: "GPS",         role: "dispatcher", priority: "P1", status: "waiting_user", slaHours: 4,  openHours: 1 },
  { id: "T-204", subject: "POD photo failed to upload",                category: "POD",         role: "driver",     priority: "P2", status: "resolved",     slaHours: 24, openHours: 6 },
  { id: "T-205", subject: "Add new dispatcher to company",             category: "Permission issue", role: "admin", priority: "P2", status: "resolved",     slaHours: 24, openHours: 3 },
];

export const SUPPORT_CATEGORIES = [
  "Login", "Driver app", "Dispatch", "GPS", "Notifications",
  "Customer portal", "POD", "Data issue", "Permission issue",
  "Billing question", "Other",
] as const;

export const CUSTOMER_SUCCESS_ACCOUNTS = [
  {
    id: "acc-1",
    name: "Northbound Freight (pilot)",
    health: 86,
    drivers: 12,
    dispatchers: 3,
    portalUsers: 9,
    openTickets: 2,
    featureRequests: 14,
    trainingComplete: 0.91,
    renewalRisk: "low",
    expansion: "Add 8 drivers in Q3",
  },
  {
    id: "acc-2",
    name: "Harbor Logistics (pre-sales)",
    health: 64,
    drivers: 0,
    dispatchers: 0,
    portalUsers: 0,
    openTickets: 0,
    featureRequests: 0,
    trainingComplete: 0.0,
    renewalRisk: "n/a",
    expansion: "Trial start Jun 3",
  },
];

/* ---------------------------------------------------------------- */
/*  Release + regression + scaling + data quality + security         */
/* ---------------------------------------------------------------- */

export const V1_RELEASE_CHECKLIST: ChecklistGroup = {
  id: "release",
  title: "V1 release checklist",
  items: [
    { id: "r-1", label: "V1 stabilization branch cut",         done: true },
    { id: "r-2", label: "QA regression complete",              done: false, note: "84% — see Regression" },
    { id: "r-3", label: "Pilot bug fixes complete",            done: false, note: "1 P0 open" },
    { id: "r-4", label: "Security review passed",              done: true },
    { id: "r-5", label: "Data migration verified",             done: true },
    { id: "r-6", label: "Release notes prepared",              done: true },
    { id: "r-7", label: "Training docs updated",               done: true },
    { id: "r-8", label: "Support team ready",                  done: true },
    { id: "r-9", label: "Customer go-live approved",           done: false },
    { id: "r-10", label: "V1 release deployed",                done: false },
  ],
};

export const REGRESSION_TESTS = [
  { id: "rt-1",  workflow: "Login",                  status: "pass" },
  { id: "rt-2",  workflow: "Company scoping",        status: "pass" },
  { id: "rt-3",  workflow: "Role permissions",       status: "pass" },
  { id: "rt-4",  workflow: "Create load",            status: "pass" },
  { id: "rt-5",  workflow: "Offer load",             status: "pass" },
  { id: "rt-6",  workflow: "Accept load",            status: "pass" },
  { id: "rt-7",  workflow: "Deny load",              status: "fail" },
  { id: "rt-8",  workflow: "Assign driver",          status: "pass" },
  { id: "rt-9",  workflow: "GPS update",             status: "pass" },
  { id: "rt-10", workflow: "Status update",          status: "pass" },
  { id: "rt-11", workflow: "Dispatcher map",         status: "pass" },
  { id: "rt-12", workflow: "Customer portal track",  status: "pass" },
  { id: "rt-13", workflow: "POD submit",             status: "pending" },
  { id: "rt-14", workflow: "Alerts",                 status: "pass" },
  { id: "rt-15", workflow: "Notifications",          status: "pass" },
  { id: "rt-16", workflow: "Audit logs",             status: "pass" },
  { id: "rt-17", workflow: "Support ticket",         status: "pass" },
  { id: "rt-18", workflow: "Reports",                status: "pending" },
  { id: "rt-19", workflow: "Onboarding",             status: "pass" },
] as const;

export const SCALING_CHECKS = [
  { id: "s1",  label: "Supabase query indexes covered",      status: "ok"     as const },
  { id: "s2",  label: "Realtime subscriptions efficient",     status: "ok"     as const },
  { id: "s3",  label: "GPS event write volume tested",        status: "ok"     as const },
  { id: "s4",  label: "Location retention policy applied",    status: "warn"   as const, note: "180d default" },
  { id: "s5",  label: "Map marker rendering at 500 markers",  status: "ok"     as const },
  { id: "s6",  label: "Customer portal load time < 2s",       status: "ok"     as const },
  { id: "s7",  label: "Driver app cold start < 3s",           status: "warn"   as const },
  { id: "s8",  label: "Load board query < 500ms at 1k rows",  status: "fail"   as const, note: "fb-010" },
  { id: "s9",  label: "Audit log query < 1s",                 status: "ok"     as const },
  { id: "s10", label: "Storage usage within budget",          status: "ok"     as const },
  { id: "s11", label: "Notification volume within budget",    status: "ok"     as const },
  { id: "s12", label: "Error rate < 1%",                      status: "ok"     as const },
];

export const DATA_QUALITY_ISSUES = [
  { id: "dq1",  issue: "Loads without shipments",                  count: 3 },
  { id: "dq2",  issue: "Shipments without loads",                  count: 1 },
  { id: "dq3",  issue: "Drivers without vehicles",                 count: 2 },
  { id: "dq4",  issue: "Vehicles on multiple active drivers",      count: 0 },
  { id: "dq5",  issue: "Duplicate customers",                      count: 4 },
  { id: "dq6",  issue: "Missing coordinates",                      count: 6 },
  { id: "dq7",  issue: "Missing POD after delivered",              count: 5 },
  { id: "dq8",  issue: "Stale driver live state (>24h)",           count: 1 },
  { id: "dq9",  issue: "Unresolved alerts (>14d)",                 count: 2 },
  { id: "dq10", issue: "Orphan notification events",               count: 7 },
];

export const SECURITY_REVIEW = [
  { id: "sec1",  label: "RLS enabled on tenant tables",       ok: true },
  { id: "sec2",  label: "Company scoping enforced",            ok: true },
  { id: "sec3",  label: "Role permission gates audited",       ok: true },
  { id: "sec4",  label: "Driver GPS consent captured",         ok: true },
  { id: "sec5",  label: "Customer portal access scoped",       ok: true },
  { id: "sec6",  label: "Storage bucket policies",             ok: true },
  { id: "sec7",  label: "No service keys in frontend bundles", ok: true },
  { id: "sec8",  label: "API route protections",               ok: true },
  { id: "sec9",  label: "Audit logging on write paths",        ok: false, note: "missing on reassignment" },
  { id: "sec10", label: "Basic input validation (zod)",        ok: true },
  { id: "sec11", label: "Environment variables documented",    ok: true },
  { id: "sec12", label: "Production secrets rotated",          ok: true },
  { id: "sec13", label: "Error handling sanitized",            ok: true },
];

/* ---------------------------------------------------------------- */
/*  Commercial + conversion                                          */
/* ---------------------------------------------------------------- */

export const COMMERCIAL_CHECKS: ChecklistItem[] = [
  { id: "cm1", label: "Pricing approved",            done: true },
  { id: "cm2", label: "Trial / pilot terms approved", done: true },
  { id: "cm3", label: "Support model approved",       done: true },
  { id: "cm4", label: "Onboarding process approved",  done: true },
  { id: "cm5", label: "Demo environment stable",      done: true },
  { id: "cm6", label: "Customer references collected", done: false, note: "1 of 3" },
  { id: "cm7", label: "ROI story documented",         done: true },
  { id: "cm8", label: "Security overview ready",      done: true },
  { id: "cm9", label: "Privacy language ready",       done: true },
];

export const CONVERSION_STEPS: ChecklistItem[] = [
  { id: "cv1", label: "Review pilot success metrics",     done: true },
  { id: "cv2", label: "Review customer feedback",         done: true },
  { id: "cv3", label: "Review unresolved blockers",       done: false, note: "1 P0 open" },
  { id: "cv4", label: "Present ROI summary",              done: true },
  { id: "cv5", label: "Present V1 roadmap",               done: true },
  { id: "cv6", label: "Confirm pricing",                  done: true },
  { id: "cv7", label: "Confirm support plan",             done: true },
  { id: "cv8", label: "Confirm onboarding expansion",     done: false },
  { id: "cv9", label: "Convert pilot to paid (placeholder)", done: false },
  { id: "cv10", label: "Schedule V1 rollout",             done: false },
];

/* ---------------------------------------------------------------- */
/*  Onboarding + training                                            */
/* ---------------------------------------------------------------- */

export const ONBOARDING_TASKS: ChecklistItem[] = [
  { id: "ob-1",  label: "Company setup",              done: true },
  { id: "ob-2",  label: "Admin user setup",           done: true },
  { id: "ob-3",  label: "Dispatcher setup",           done: true },
  { id: "ob-4",  label: "Driver import",              done: true },
  { id: "ob-5",  label: "Vehicle import",             done: true },
  { id: "ob-6",  label: "Customer import",            done: true },
  { id: "ob-7",  label: "First load creation",        done: true },
  { id: "ob-8",  label: "Driver app install",         done: true },
  { id: "ob-9",  label: "GPS permission walkthrough", done: true },
  { id: "ob-10", label: "Customer portal invite",     done: false },
  { id: "ob-11", label: "Notification setup",         done: true },
  { id: "ob-12", label: "Go-live checklist",          done: false },
  { id: "ob-13", label: "Training completed",         done: false },
];

export const TRAINING_GUIDES = [
  { id: "tg-1", title: "Dispatcher quick start",      role: "dispatcher", minutes: 12 },
  { id: "tg-2", title: "Driver quick start",          role: "driver",     minutes: 8 },
  { id: "tg-3", title: "Customer portal quick start", role: "customer",   minutes: 6 },
  { id: "tg-4", title: "Company admin setup",         role: "admin",      minutes: 15 },
  { id: "tg-5", title: "Load workflow guide",         role: "dispatcher", minutes: 10 },
  { id: "tg-6", title: "GPS & privacy guide",         role: "driver",     minutes: 5 },
  { id: "tg-7", title: "POD guide",                   role: "driver",     minutes: 4 },
  { id: "tg-8", title: "Support guide",               role: "admin",      minutes: 6 },
];

/* ---------------------------------------------------------------- */
/*  Roadmap                                                          */
/* ---------------------------------------------------------------- */

export const ROADMAP: RoadmapItem[] = [
  { id: "rm-v1-1",  release: "V1",   title: "Stable dispatch",              status: "in_progress" },
  { id: "rm-v1-2",  release: "V1",   title: "Driver mobile",                status: "in_progress" },
  { id: "rm-v1-3",  release: "V1",   title: "Live GPS",                     status: "in_progress" },
  { id: "rm-v1-4",  release: "V1",   title: "Customer portal",              status: "in_progress" },
  { id: "rm-v1-5",  release: "V1",   title: "POD",                          status: "shipped" },
  { id: "rm-v1-6",  release: "V1",   title: "Notifications",                status: "in_progress" },
  { id: "rm-v1-7",  release: "V1",   title: "Basic reports",                status: "planned" },
  { id: "rm-v1-8",  release: "V1",   title: "Support operations",           status: "planned" },

  { id: "rm-v11-1", release: "V1.1", title: "Better ETA",                   status: "planned" },
  { id: "rm-v11-2", release: "V1.1", title: "Better offline mode",          status: "planned" },
  { id: "rm-v11-3", release: "V1.1", title: "Better notifications",         status: "planned" },
  { id: "rm-v11-4", release: "V1.1", title: "Driver / vehicle / customer import", status: "planned" },
  { id: "rm-v11-5", release: "V1.1", title: "More reports",                 status: "planned" },

  { id: "rm-v15-1", release: "V1.5", title: "Real navigation SDK",          status: "planned" },
  { id: "rm-v15-2", release: "V1.5", title: "Billing subscription active",  status: "planned" },
  { id: "rm-v15-3", release: "V1.5", title: "Basic integrations",           status: "planned" },
  { id: "rm-v15-4", release: "V1.5", title: "Improved customer portal",     status: "planned" },
  { id: "rm-v15-5", release: "V1.5", title: "Improved CoPilot mock/rules",  status: "planned" },

  { id: "rm-v2-1",  release: "V2",   title: "AI Operations Intelligence",   status: "planned" },
  { id: "rm-v2-2",  release: "V2",   title: "Optimization engine",          status: "planned" },
  { id: "rm-v2-3",  release: "V2",   title: "API marketplace",              status: "planned" },
  { id: "rm-v2-4",  release: "V2",   title: "EDI beta",                     status: "planned" },
  { id: "rm-v2-5",  release: "V2",   title: "White-label branding",         status: "planned" },
  { id: "rm-v2-6",  release: "V2",   title: "Advanced security center",     status: "planned" },

  { id: "rm-ent-1", release: "Enterprise", title: "SSO / SAML",             status: "deferred" },
  { id: "rm-ent-2", release: "Enterprise", title: "SOC 2 automation",       status: "deferred" },
  { id: "rm-ent-3", release: "Enterprise", title: "EDI production",         status: "deferred" },
  { id: "rm-ent-4", release: "Enterprise", title: "Android Auto",           status: "deferred" },
  { id: "rm-ent-5", release: "Enterprise", title: "CarPlay",                status: "deferred" },
  { id: "rm-ent-6", release: "Enterprise", title: "Advanced predictive AI", status: "deferred" },
];

/* ---------------------------------------------------------------- */
/*  Helpers                                                          */
/* ---------------------------------------------------------------- */

export function v1ReadinessScore(): number {
  // weighted: regression 30, release 30, security 20, scaling 10, data 10
  const regPct = REGRESSION_TESTS.filter((t) => t.status === "pass").length / REGRESSION_TESTS.length;
  const rel = V1_RELEASE_CHECKLIST.items;
  const relPct = rel.filter((i) => i.done).length / rel.length;
  const secPct = SECURITY_REVIEW.filter((s) => s.ok).length / SECURITY_REVIEW.length;
  const scPct  = SCALING_CHECKS.filter((s) => s.status === "ok").length / SCALING_CHECKS.length;
  const dqOk   = DATA_QUALITY_ISSUES.reduce((a, d) => a + d.count, 0) === 0 ? 1 : 0.7;
  return Math.round((regPct * 0.3 + relPct * 0.3 + secPct * 0.2 + scPct * 0.1 + dqOk * 0.1) * 100);
}

export function v1ReadinessBreakdown() {
  const regPct = Math.round(
    (REGRESSION_TESTS.filter((t) => t.status === "pass").length / REGRESSION_TESTS.length) * 100,
  );
  const relPct = Math.round(
    (V1_RELEASE_CHECKLIST.items.filter((i) => i.done).length / V1_RELEASE_CHECKLIST.items.length) * 100,
  );
  const secPct = Math.round(
    (SECURITY_REVIEW.filter((s) => s.ok).length / SECURITY_REVIEW.length) * 100,
  );
  const scPct = Math.round(
    (SCALING_CHECKS.filter((s) => s.status === "ok").length / SCALING_CHECKS.length) * 100,
  );
  const dqIssues = DATA_QUALITY_ISSUES.reduce((a, d) => a + d.count, 0);
  return [
    { id: "reg",  label: "Regression",   pct: regPct, weight: 30 },
    { id: "rel",  label: "Release ready", pct: relPct, weight: 30 },
    { id: "sec",  label: "Security",     pct: secPct, weight: 20 },
    { id: "scal", label: "Scaling",      pct: scPct,  weight: 10 },
    { id: "dq",   label: "Data quality", pct: dqIssues === 0 ? 100 : 70, weight: 10, note: `${dqIssues} flagged records` },
  ];
}

export function v1Blockers() {
  const out: { id: string; label: string; source: string; severity: "critical" | "high" | "medium" }[] = [];
  for (const b of BUGS) {
    if ((b.priority === "P0" || b.priority === "P1") && b.status !== "released" && b.status !== "fixed") {
      out.push({ id: b.id, label: b.title, source: `Bug · ${b.priority}`, severity: b.severity === "critical" ? "critical" : "high" });
    }
  }
  for (const t of REGRESSION_TESTS) {
    if (t.status === "fail") out.push({ id: t.id, label: `Regression: ${t.workflow}`, source: "Regression", severity: "high" });
  }
  for (const s of SCALING_CHECKS) {
    if (s.status === "fail") out.push({ id: s.id, label: s.label, source: "Scaling", severity: "high" });
  }
  for (const s of SECURITY_REVIEW) {
    if (!s.ok) out.push({ id: s.id, label: s.label, source: "Security", severity: "medium" });
  }
  return out;
}

export function feedbackStats() {
  const by = (k: FeedbackStatus) => FEEDBACK.filter((f) => f.status === k).length;
  return {
    total: FEEDBACK.length,
    new: by("new"),
    accepted: by("accepted") + by("planned") + by("in_progress"),
    released: by("released"),
    declined: by("declined"),
    highImpact: FEEDBACK.filter((f) => f.impact === "high").length,
  };
}

export function bugStats() {
  const open = (p: BugItem["priority"]) =>
    BUGS.filter((b) => b.priority === p && b.status !== "released" && b.status !== "fixed").length;
  return {
    p0: open("P0"),
    p1: open("P1"),
    p2: open("P2"),
    fixed: BUGS.filter((b) => b.status === "fixed").length,
    released: BUGS.filter((b) => b.status === "released").length,
    total: BUGS.length,
  };
}

export function supportStats() {
  return {
    open: SUPPORT_TICKETS.filter((t) => t.status !== "resolved").length,
    breached: SUPPORT_TICKETS.filter((t) => t.status !== "resolved" && t.openHours > t.slaHours).length,
    p1Open: SUPPORT_TICKETS.filter((t) => t.priority === "P1" && t.status !== "resolved").length,
    resolved: SUPPORT_TICKETS.filter((t) => t.status === "resolved").length,
  };
}

export function cutlineStats() {
  return (["must", "should", "nice", "post_v1", "enterprise_later"] as V1Priority[]).map((p) => ({
    priority: p,
    count: V1_FEATURES.filter((f) => f.priority === p).length,
    ready: V1_FEATURES.filter((f) => f.priority === p && (f.status === "ready" || f.status === "shipped")).length,
  }));
}

// thresholds shared by GPS + notification reliability tiles
export function reliabilityTone(id: string, value: string): "good" | "warn" | "bad" | "default" {
  const num = parseFloat(value);
  if (Number.isNaN(num)) return "default";
  const goodAbove: Record<string, number> = { rc: 98, opn: 70 };
  const goodBelow: Record<string, number> = { stl: 5, rd: 2, dup: 1, wer: 1, fld: 3, lat: 2, dt: 5 };
  if (id in goodAbove) {
    if (num >= goodAbove[id]) return "good";
    if (num >= goodAbove[id] - 5) return "warn";
    return "bad";
  }
  if (id in goodBelow) {
    if (num <= goodBelow[id]) return "good";
    if (num <= goodBelow[id] * 2) return "warn";
    return "bad";
  }
  return "default";
}
