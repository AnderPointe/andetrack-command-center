// Phase 11 — MVP cutline, sprints, backlog, pilot, risks. Mock/demo data.
// Polished: richer fields, sharper cutline, realistic sprint weeks, owners,
// acceptance criteria, dependencies, RLS tests, demo scenes, cost totals.

export type Status = "build" | "mock" | "defer";
export type Priority = "P0" | "P1" | "P2" | "P3";

// ───────────────────────── MVP CUTLINE ─────────────────────────

export const CUTLINE: { area: string; build: string[]; mock: string[]; defer: string[] }[] = [
  {
    area: "Dispatch & loads",
    build: ["Login & company scoping", "Load create / board / detail", "Offer → accept/deny", "Dispatch assignments", "Audit log"],
    mock: ["Basic alerts panel", "Reports v0", "ETA placeholder"],
    defer: ["Optimization engine", "Rate engine", "Advanced analytics"],
  },
  {
    area: "Driver mobile",
    build: ["Login + permissions", "Load offer screen", "Active load + status", "Live GPS upload", "POD placeholder"],
    mock: ["CoPilot mock assistant", "Issue report form"],
    defer: ["Real turn-by-turn SDK", "Android Auto", "CarPlay"],
  },
  {
    area: "Customer portal",
    build: ["Shipment list", "Tracking page", "POD view"],
    mock: ["Magic-link login placeholder", "Support contact form"],
    defer: ["Custom domain white-label", "Customer billing UI"],
  },
  {
    area: "Platform",
    build: ["RLS tenant isolation", "Roles (owner/admin/dispatcher/driver/customer)", "Audit log writer", "Driver GPS consent"],
    mock: ["Notification preferences UI", "Feature-flag stub"],
    defer: ["SSO/SAML", "SCIM", "SOC 2 automation", "EDI/API marketplace", "Stripe billing automation"],
  },
];

export const CUTLINE_PRINCIPLES = [
  "If it isn't required to run a real pilot, it is not P0.",
  "Mock anything that demos value but doesn't change pilot outcomes.",
  "Defer everything that needs enterprise sales, legal, or vendor contracts.",
  "Every Build item must have a user story, an owner, and acceptance criteria.",
  "Every Mock item must be visually labelled as mock in the UI.",
];

export const CUTLINE_SUMMARY = (() => {
  const total = CUTLINE.reduce(
    (acc, row) => {
      acc.build += row.build.length;
      acc.mock += row.mock.length;
      acc.defer += row.defer.length;
      return acc;
    },
    { build: 0, mock: 0, defer: 0 },
  );
  return total;
})();

// ───────────────────────── FEATURE MATRIX ─────────────────────────

export const FEATURE_MATRIX: {
  category: string;
  feature: string;
  status: Status;
  priority: Priority;
  owner: string;
  complexity: "S" | "M" | "L" | "XL";
  pilot: boolean;
  notes: string;
}[] = [
  { category: "Auth",            feature: "Email/password login",            status: "build", priority: "P0", owner: "Platform", complexity: "S",  pilot: true,  notes: "Supabase Auth" },
  { category: "Auth",            feature: "Password reset",                   status: "build", priority: "P0", owner: "Platform", complexity: "S",  pilot: true,  notes: "" },
  { category: "Company setup",   feature: "Company profile + branding",       status: "build", priority: "P0", owner: "Admin",    complexity: "M",  pilot: true,  notes: "logo, timezone" },
  { category: "Company setup",   feature: "User invites + roles",             status: "build", priority: "P0", owner: "Admin",    complexity: "M",  pilot: true,  notes: "" },
  { category: "Dispatcher",      feature: "Command Center dashboard",         status: "build", priority: "P0", owner: "Dispatch", complexity: "L",  pilot: true,  notes: "" },
  { category: "Dispatcher",      feature: "Live map",                         status: "build", priority: "P0", owner: "Dispatch", complexity: "L",  pilot: true,  notes: "Mapbox/MapLibre" },
  { category: "Dispatcher",      feature: "Load board",                       status: "build", priority: "P0", owner: "Dispatch", complexity: "M",  pilot: true,  notes: "" },
  { category: "Driver app",      feature: "Login + permission flow",          status: "build", priority: "P0", owner: "Mobile",   complexity: "M",  pilot: true,  notes: "consent screen" },
  { category: "Driver app",      feature: "Load offer + accept/deny",         status: "build", priority: "P0", owner: "Mobile",   complexity: "M",  pilot: true,  notes: "" },
  { category: "Driver app",      feature: "Status updates",                   status: "build", priority: "P0", owner: "Mobile",   complexity: "S",  pilot: true,  notes: "" },
  { category: "GPS",             feature: "Live location upload",             status: "build", priority: "P0", owner: "Mobile",   complexity: "L",  pilot: true,  notes: "background loc" },
  { category: "GPS",             feature: "Stale GPS alert",                  status: "build", priority: "P1", owner: "Dispatch", complexity: "S",  pilot: true,  notes: "" },
  { category: "Loads",           feature: "Create / edit / cancel load",      status: "build", priority: "P0", owner: "Dispatch", complexity: "M",  pilot: true,  notes: "" },
  { category: "Shipments",       feature: "Shipment detail + history",        status: "build", priority: "P0", owner: "Dispatch", complexity: "M",  pilot: true,  notes: "" },
  { category: "Customer portal", feature: "Tracking page",                    status: "build", priority: "P0", owner: "Portal",   complexity: "M",  pilot: true,  notes: "" },
  { category: "Customer portal", feature: "POD view",                         status: "build", priority: "P1", owner: "Portal",   complexity: "S",  pilot: true,  notes: "" },
  { category: "Notifications",   feature: "Push (Expo)",                      status: "build", priority: "P0", owner: "Mobile",   complexity: "M",  pilot: true,  notes: "" },
  { category: "Notifications",   feature: "Email digests",                    status: "mock",  priority: "P2", owner: "Platform", complexity: "M",  pilot: false, notes: "" },
  { category: "CoPilot",         feature: "Rules-based assistant",            status: "mock",  priority: "P1", owner: "AI",       complexity: "M",  pilot: true,  notes: "real model post-pilot" },
  { category: "CoPilot",         feature: "Realtime voice",                   status: "defer", priority: "P3", owner: "AI",       complexity: "XL", pilot: false, notes: "" },
  { category: "Maps/nav",        feature: "Dispatcher live map",              status: "build", priority: "P0", owner: "Dispatch", complexity: "L",  pilot: true,  notes: "" },
  { category: "Maps/nav",        feature: "Native turn-by-turn SDK",          status: "defer", priority: "P2", owner: "Mobile",   complexity: "XL", pilot: false, notes: "post-MVP" },
  { category: "Admin",           feature: "Drivers / vehicles / customers",   status: "build", priority: "P0", owner: "Admin",    complexity: "M",  pilot: true,  notes: "" },
  { category: "Admin",           feature: "Audit log viewer",                 status: "build", priority: "P1", owner: "Admin",    complexity: "S",  pilot: true,  notes: "" },
  { category: "Reports",         feature: "Basic operational report",         status: "build", priority: "P1", owner: "Dispatch", complexity: "M",  pilot: true,  notes: "" },
  { category: "Reports",         feature: "Advanced analytics",               status: "defer", priority: "P3", owner: "Data",     complexity: "L",  pilot: false, notes: "" },
  { category: "Security",        feature: "RLS company scoping",              status: "build", priority: "P0", owner: "Platform", complexity: "L",  pilot: true,  notes: "non-negotiable" },
  { category: "Security",        feature: "SSO/SAML",                         status: "defer", priority: "P3", owner: "Platform", complexity: "L",  pilot: false, notes: "" },
  { category: "Billing",         feature: "Stripe automation",                status: "defer", priority: "P2", owner: "Platform", complexity: "L",  pilot: false, notes: "manual invoice in pilot" },
  { category: "Integrations",    feature: "EDI",                              status: "defer", priority: "P3", owner: "Integ",    complexity: "XL", pilot: false, notes: "" },
  { category: "Integrations",    feature: "API marketplace",                  status: "defer", priority: "P3", owner: "Integ",    complexity: "XL", pilot: false, notes: "" },
  { category: "Docs",            feature: "Admin / dispatch / driver guide",  status: "build", priority: "P1", owner: "Docs",     complexity: "M",  pilot: true,  notes: "" },
  { category: "Support",         feature: "Ticketing placeholder",            status: "mock",  priority: "P1", owner: "CS",       complexity: "S",  pilot: true,  notes: "email-first" },
];

// ───────────────────────── SPRINTS ─────────────────────────

export const SPRINTS: {
  id: number;
  name: string;
  weeks: string;
  goal: string;
  stories: number;
  exitCriteria: string[];
  risks: string[];
}[] = [
  {
    id: 0, name: "Foundation", weeks: "W1–W2",
    goal: "Repo, design system, Supabase, auth, RLS baseline.", stories: 6,
    exitCriteria: ["Two envs deployable", "Login works end-to-end", "RLS scaffolding in place"],
    risks: ["RLS gaps", "Auth flow re-work"],
  },
  {
    id: 1, name: "Core data & admin", weeks: "W3–W4",
    goal: "Companies, users, drivers, vehicles, customers, admin UI.", stories: 9,
    exitCriteria: ["Admin can fully seed a company", "Roles enforce in UI + DB"],
    risks: ["Importer scope creep"],
  },
  {
    id: 2, name: "Load management", weeks: "W5–W6",
    goal: "Create load, load board, detail, assignment, status state machine.", stories: 8,
    exitCriteria: ["Dispatcher runs load offered → delivered", "Status transitions audited"],
    risks: ["Status enum drift", "Edge transitions"],
  },
  {
    id: 3, name: "Driver app MVP", weeks: "W7–W8",
    goal: "Login, permissions, offer, accept/deny, active load, status.", stories: 9,
    exitCriteria: ["Driver runs first 3 statuses on a real device", "Permission flow ≤ 3 taps"],
    risks: ["iOS/Android permission divergence"],
  },
  {
    id: 4, name: "Live GPS & map", weeks: "W9–W10",
    goal: "Location upload, live state, dispatcher map, stale alert.", stories: 7,
    exitCriteria: ["Map updates ≤ 5s P95", "Battery hit ≤ 4%/hr at default cadence"],
    risks: ["Battery drain", "Background kill on Android"],
  },
  {
    id: 5, name: "Customer portal & POD", weeks: "W11–W12",
    goal: "Tracking, POD capture + view, customer notifications.", stories: 6,
    exitCriteria: ["Customer sees status without dispatch call", "POD bound to load"],
    risks: ["Public RLS for tokenized share links"],
  },
  {
    id: 6, name: "Notify, alerts, audit", weeks: "W13–W14",
    goal: "Push service, alert rules, audit logs, basic reports.", stories: 7,
    exitCriteria: ["Push delivered on offer", "Audit log readable per entity"],
    risks: ["Push reliability across OS versions"],
  },
  {
    id: 7, name: "Pilot hardening", weeks: "W15–W16",
    goal: "QA, RLS tests, perf, demo mode, docs, onboarding.", stories: 8,
    exitCriteria: ["All P0 QA scenarios green", "Release gates checked"],
    risks: ["Scope creep into Sprint 7"],
  },
];

// ───────────────────────── USER STORIES ─────────────────────────

export const USER_STORIES: {
  id: string;
  role: string;
  story: string;
  priority: Priority;
  sprint: number;
  acceptance: string[];
}[] = [
  {
    id: "US-001", role: "Dispatcher", priority: "P0", sprint: 2,
    story: "Create a load and assign it to a driver",
    acceptance: [
      "Required fields validated (origin, destination, pickup window)",
      "Assignment generates a load offer to the driver",
      "Action recorded in audit log with actor + entity",
    ],
  },
  {
    id: "US-002", role: "Driver", priority: "P0", sprint: 3,
    story: "Accept or deny a load offer",
    acceptance: [
      "Offer screen shows pickup, dropoff, distance, pay placeholder",
      "Accept → load transitions to Assigned; deny → returns to board",
      "Decision pushed to dispatcher in ≤ 3 seconds",
    ],
  },
  {
    id: "US-003", role: "Driver", priority: "P0", sprint: 3,
    story: "Update my status on an active load",
    acceptance: [
      "Allowed transitions only (no skipping required statuses)",
      "Status change writes audit log entry",
      "Customer portal reflects status within 5 seconds",
    ],
  },
  {
    id: "US-004", role: "Dispatcher", priority: "P0", sprint: 4,
    story: "See live driver locations on a map",
    acceptance: [
      "Markers show driver, load, last-ping age",
      "Stale (>5 min) markers visually distinct",
      "Click marker opens shipment detail",
    ],
  },
  {
    id: "US-005", role: "Customer", priority: "P0", sprint: 5,
    story: "Track my shipment without calling dispatch",
    acceptance: [
      "Public tracking via tokenized link",
      "Only fields scoped to that shipment are visible",
      "Updates auto-refresh without manual reload",
    ],
  },
  {
    id: "US-006", role: "Driver", priority: "P1", sprint: 5,
    story: "Submit proof of delivery",
    acceptance: [
      "Capture photo + signature placeholder",
      "POD stored against shipment, visible to customer",
      "Failures retry with clear error state",
    ],
  },
  {
    id: "US-007", role: "Admin", priority: "P0", sprint: 1,
    story: "Add drivers and vehicles to my company",
    acceptance: [
      "Bulk add via CSV (basic)",
      "New users receive invite email",
      "Driver app login works for invited driver",
    ],
  },
  {
    id: "US-008", role: "Platform owner", priority: "P0", sprint: 0,
    story: "Be certain tenant data is isolated",
    acceptance: [
      "Automated RLS test asserts cross-company read = 0 rows",
      "Cross-company write rejected at DB",
      "Audit log captures denied access attempts",
    ],
  },
  {
    id: "US-009", role: "Dispatcher", priority: "P1", sprint: 6,
    story: "Receive alerts for stale GPS or late ETA",
    acceptance: [
      "Alert fires once per threshold breach (no spam)",
      "Snooze + acknowledge actions tracked",
      "Mock label clearly shows when rules are non-AI",
    ],
  },
  {
    id: "US-010", role: "Admin", priority: "P1", sprint: 6,
    story: "View audit log for key actions",
    acceptance: [
      "Filter by user, entity, time range",
      "Entries immutable from UI",
      "CSV export for the current filter",
    ],
  },
  {
    id: "US-011", role: "Driver", priority: "P0", sprint: 3,
    story: "Grant location permission with informed consent",
    acceptance: [
      "Plain-language consent screen before any background tracking",
      "Refusal allows app use in foreground-only mode",
      "Consent decision recorded with timestamp",
    ],
  },
  {
    id: "US-012", role: "Dispatcher", priority: "P0", sprint: 2,
    story: "Cancel a load and notify the driver",
    acceptance: [
      "Cancel reason required",
      "Driver receives push + in-app banner",
      "Load state machine prevents post-cancel updates",
    ],
  },
];

// ───────────────────────── ENGINEERING BACKLOG ─────────────────────────

export const BACKLOG: {
  id: string;
  area: string;
  title: string;
  priority: Priority;
  estimate: "S" | "M" | "L";
  sprint: number;
  depends: string[];
}[] = [
  { id: "AR-001", area: "Foundation",     title: "Repo + CI/CD baseline",            priority: "P0", estimate: "S", sprint: 0, depends: [] },
  { id: "AR-002", area: "Auth",           title: "Email/password + reset flows",     priority: "P0", estimate: "M", sprint: 0, depends: ["AR-001"] },
  { id: "AR-003", area: "RBAC",           title: "user_roles + has_role helper",     priority: "P0", estimate: "M", sprint: 0, depends: ["AR-002"] },
  { id: "AR-004", area: "Database",       title: "MVP schema migration",             priority: "P0", estimate: "L", sprint: 0, depends: ["AR-001"] },
  { id: "AR-005", area: "RLS",            title: "Tenant-scoped policies",           priority: "P0", estimate: "L", sprint: 0, depends: ["AR-003", "AR-004"] },
  { id: "AR-006", area: "Realtime",       title: "Subscriptions for live state",     priority: "P0", estimate: "M", sprint: 4, depends: ["AR-005"] },
  { id: "AR-007", area: "Dispatcher web", title: "Command Center shell",             priority: "P0", estimate: "L", sprint: 1, depends: ["AR-002"] },
  { id: "AR-008", area: "Dispatcher web", title: "Load board + create-load form",    priority: "P0", estimate: "L", sprint: 2, depends: ["AR-007", "AR-013"] },
  { id: "AR-009", area: "Driver mobile",  title: "Permission setup screen",          priority: "P0", estimate: "M", sprint: 3, depends: ["AR-002"] },
  { id: "AR-010", area: "Driver mobile",  title: "Load offer + accept/deny",         priority: "P0", estimate: "M", sprint: 3, depends: ["AR-008"] },
  { id: "AR-011", area: "GPS",            title: "Background location uploader",     priority: "P0", estimate: "L", sprint: 4, depends: ["AR-009"] },
  { id: "AR-012", area: "Maps",           title: "Dispatcher live map",              priority: "P0", estimate: "L", sprint: 4, depends: ["AR-006", "AR-011"] },
  { id: "AR-013", area: "Loads",          title: "Load status state machine",        priority: "P0", estimate: "M", sprint: 2, depends: ["AR-004"] },
  { id: "AR-014", area: "POD",            title: "Photo + signature capture",        priority: "P1", estimate: "M", sprint: 5, depends: ["AR-010"] },
  { id: "AR-015", area: "Notifications",  title: "Expo push registration",           priority: "P0", estimate: "M", sprint: 3, depends: ["AR-009"] },
  { id: "AR-016", area: "Alerts",         title: "Stale GPS + late ETA rules",       priority: "P1", estimate: "M", sprint: 6, depends: ["AR-012"] },
  { id: "AR-017", area: "Audit",          title: "Audit log writer + viewer",        priority: "P1", estimate: "M", sprint: 6, depends: ["AR-005"] },
  { id: "AR-018", area: "Reports",        title: "Operational summary report",       priority: "P1", estimate: "M", sprint: 6, depends: ["AR-013"] },
  { id: "AR-019", area: "Customer portal",title: "Tracking page + POD view",         priority: "P0", estimate: "M", sprint: 5, depends: ["AR-013", "AR-014"] },
  { id: "AR-020", area: "Demo mode",      title: "Seeded pilot company + reset",     priority: "P1", estimate: "M", sprint: 7, depends: ["AR-008", "AR-010"] },
  { id: "AR-021", area: "Docs",           title: "Admin/dispatch/driver guides",     priority: "P1", estimate: "M", sprint: 7, depends: [] },
  { id: "AR-022", area: "QA",             title: "RLS + workflow test plan",         priority: "P0", estimate: "L", sprint: 7, depends: ["AR-005", "AR-013"] },
  { id: "AR-023", area: "Deployment",     title: "Staging + pilot prod envs",        priority: "P0", estimate: "M", sprint: 0, depends: ["AR-001"] },
  { id: "AR-024", area: "Observability",  title: "Sentry + log shipping",            priority: "P0", estimate: "S", sprint: 0, depends: ["AR-023"] },
  { id: "AR-025", area: "Demo data",      title: "Reset-on-demand pilot fixtures",   priority: "P1", estimate: "S", sprint: 7, depends: ["AR-020"] },
];

// ───────────────────────── TECH DEBT ─────────────────────────

export const TECH_DEBT: { id: string; area: string; item: string; priority: Priority; effort: "S" | "M" | "L"; impact: string }[] = [
  { id: "TD-01", area: "Components",  item: "Split overly large dashboard files",                priority: "P1", effort: "M", impact: "Maintainability" },
  { id: "TD-02", area: "Types",       item: "Unify status enums (load / driver / shipment)",     priority: "P0", effort: "M", impact: "Correctness" },
  { id: "TD-03", area: "Data",        item: "Separate mock services from production services",   priority: "P0", effort: "L", impact: "Pilot integrity" },
  { id: "TD-04", area: "Design",      item: "Replace hardcoded colors with semantic tokens",     priority: "P1", effort: "M", impact: "Consistency" },
  { id: "TD-05", area: "Providers",   item: "Lock map/nav provider abstraction boundary",        priority: "P1", effort: "M", impact: "Vendor risk" },
  { id: "TD-06", area: "UX",          item: "Add loading + empty + error states everywhere",     priority: "P1", effort: "L", impact: "Perceived quality" },
  { id: "TD-07", area: "Security",    item: "Add permission gates on every screen",              priority: "P0", effort: "M", impact: "Security" },
  { id: "TD-08", area: "Tests",       item: "Add RLS + workflow tests",                          priority: "P0", effort: "L", impact: "Pilot safety" },
  { id: "TD-09", area: "Structure",   item: "Clarify folder boundaries by domain",               priority: "P2", effort: "M", impact: "Onboarding" },
  { id: "TD-10", area: "UI",          item: "Remove deferred-feature placeholders from MVP UI",  priority: "P1", effort: "S", impact: "Demo clarity" },
  { id: "TD-11", area: "Mobile",      item: "Centralize permission + consent flow",              priority: "P0", effort: "M", impact: "Store approval" },
  { id: "TD-12", area: "Errors",      item: "Standardize error boundaries + toast pattern",      priority: "P1", effort: "S", impact: "Reliability" },
];

// ───────────────────────── ADRs ─────────────────────────

export const ADRS: {
  id: string;
  title: string;
  decision: "Adopt" | "Defer";
  context: string;
  alternatives: string[];
  consequences: string;
}[] = [
  {
    id: "ADR-001", title: "Use Supabase as backend platform", decision: "Adopt",
    context: "Need auth, DB, RLS, storage, realtime fast for a small team.",
    alternatives: ["Custom Postgres + own auth", "Firebase", "AWS Amplify"],
    consequences: "Faster build; vendor coupling acceptable for MVP.",
  },
  {
    id: "ADR-002", title: "React Native (Expo) for driver app", decision: "Adopt",
    context: "Single mobile codebase, OTA updates, fast iteration with small team.",
    alternatives: ["Native iOS + Android", "Flutter", "PWA only"],
    consequences: "Single mobile codebase; some native modules limited.",
  },
  {
    id: "ADR-003", title: "React web for dispatcher dashboard", decision: "Adopt",
    context: "Reuse design system, existing auth, fast iteration.",
    alternatives: ["Next.js", "Remix", "Vue"],
    consequences: "Reuses design system + auth.",
  },
  {
    id: "ADR-004", title: "Provider abstraction for maps/navigation", decision: "Adopt",
    context: "Map vendor costs and SDK constraints are still uncertain.",
    alternatives: ["Hard-pick Mapbox now", "Hard-pick Google Maps now"],
    consequences: "Defer SDK choice; easier swap later.",
  },
  {
    id: "ADR-005", title: "Mock CoPilot before real AI", decision: "Adopt",
    context: "AI infra cost + safety review not justifiable pre-pilot.",
    alternatives: ["Ship real LLM-backed assistant in MVP"],
    consequences: "Demo-able now; real model post-pilot.",
  },
  {
    id: "ADR-006", title: "RLS for tenant isolation", decision: "Adopt",
    context: "Multi-tenant from day one, single shared DB.",
    alternatives: ["Schema-per-tenant", "DB-per-tenant"],
    consequences: "Strong default; every table needs policy review.",
  },
  {
    id: "ADR-007", title: "Server functions for trusted logic", decision: "Adopt",
    context: "Never expose service-role key in client bundles.",
    alternatives: ["Direct client → DB with broader policies"],
    consequences: "No service-role key in clients.",
  },
  {
    id: "ADR-008", title: "Defer EDI / API marketplace from MVP", decision: "Defer",
    context: "Each integration is weeks of work; pilot doesn't need it.",
    alternatives: ["Build EDI now"],
    consequences: "Manual integrations during pilot.",
  },
  {
    id: "ADR-009", title: "Defer native turn-by-turn from MVP", decision: "Defer",
    context: "CDL-aware routing is a separate product surface and liability concern.",
    alternatives: ["Bundle a TBT SDK in v1"],
    consequences: "Use map + route placeholder.",
  },
  {
    id: "ADR-010", title: "Defer billing automation from MVP", decision: "Defer",
    context: "Pilot is invoice-based; Stripe automation requires entitlements + pricing engine.",
    alternatives: ["Wire Stripe billing in MVP"],
    consequences: "Manual invoicing during pilot.",
  },
];

// ───────────────────────── QA + RLS ─────────────────────────

export const QA_TESTS = [
  { id: "QA-01", scenario: "Tenant isolation: dispatcher A cannot read company B loads", priority: "P0", type: "automated" },
  { id: "QA-02", scenario: "Driver accept moves load to In Transit",                     priority: "P0", type: "automated" },
  { id: "QA-03", scenario: "GPS upload appears on dispatcher map within 5s",              priority: "P0", type: "manual"    },
  { id: "QA-04", scenario: "Customer portal shows only their shipments",                 priority: "P0", type: "automated" },
  { id: "QA-05", scenario: "POD upload + view on customer portal",                       priority: "P1", type: "manual"    },
  { id: "QA-06", scenario: "Stale GPS alert fires after threshold",                       priority: "P1", type: "automated" },
  { id: "QA-07", scenario: "Audit log records role + entity for key actions",            priority: "P1", type: "automated" },
  { id: "QA-08", scenario: "Push notification delivered on load offer",                  priority: "P0", type: "manual"    },
  { id: "QA-09", scenario: "Role gate blocks non-admin from user management",            priority: "P0", type: "automated" },
  { id: "QA-10", scenario: "Driver consent required before background location",         priority: "P0", type: "manual"    },
  { id: "QA-11", scenario: "Cancelled load blocks further driver status writes",         priority: "P0", type: "automated" },
  { id: "QA-12", scenario: "Tokenized public tracking link expires + scopes one shipment", priority: "P0", type: "automated" },
];

export const RLS_TESTS = [
  { id: "RLS-01", table: "loads",        rule: "company_id = auth_company_id()",       coverage: "SELECT/INSERT/UPDATE/DELETE" },
  { id: "RLS-02", table: "shipments",    rule: "company_id = auth_company_id()",       coverage: "SELECT/UPDATE" },
  { id: "RLS-03", table: "driver_pings", rule: "driver belongs to caller company",     coverage: "INSERT (driver), SELECT (dispatch)" },
  { id: "RLS-04", table: "pods",         rule: "shipment company matches caller",      coverage: "INSERT/SELECT" },
  { id: "RLS-05", table: "audit_logs",   rule: "service-only insert, scoped read",     coverage: "INSERT (server), SELECT (admin)" },
  { id: "RLS-06", table: "user_roles",   rule: "admin-only writes, self-read",         coverage: "SELECT/INSERT/UPDATE/DELETE" },
  { id: "RLS-07", table: "tracking_tokens", rule: "public read by token, no list",     coverage: "SELECT by token only" },
];

// ───────────────────────── RELEASE GATES ─────────────────────────

export const RELEASE_GATES = [
  { gate: "RLS tests pass",              owner: "Platform", status: "pending" },
  { gate: "Load workflow E2E",            owner: "QA",       status: "pending" },
  { gate: "GPS workflow E2E",             owner: "QA",       status: "pending" },
  { gate: "Driver app smoke test",        owner: "Mobile",   status: "pending" },
  { gate: "Customer portal smoke test",   owner: "Portal",   status: "pending" },
  { gate: "Audit logs verified",          owner: "Platform", status: "pending" },
  { gate: "No critical bugs",             owner: "QA",       status: "pending" },
  { gate: "Pilot company seeded",         owner: "CS",       status: "pending" },
  { gate: "Backup plan confirmed",        owner: "Platform", status: "pending" },
  { gate: "Support process ready",        owner: "CS",       status: "pending" },
  { gate: "Rollback procedure rehearsed", owner: "Platform", status: "pending" },
  { gate: "Pilot agreement signed",       owner: "Sales",    status: "pending" },
];

// ───────────────────────── PILOT ─────────────────────────

export const PILOT_CHECKLIST: { id: string; item: string; category: string; owner: string; done: boolean }[] = [
  { id: "PL-01", category: "Legal",   owner: "Sales",     item: "Pilot customer signed pilot agreement",        done: false },
  { id: "PL-02", category: "Setup",   owner: "CS",        item: "Company + dispatchers + drivers provisioned",  done: false },
  { id: "PL-03", category: "Setup",   owner: "CS",        item: "Vehicles + customers imported",                done: false },
  { id: "PL-04", category: "People",  owner: "CS",        item: "Driver consent + training complete",           done: false },
  { id: "PL-05", category: "People",  owner: "CS",        item: "Dispatcher training complete",                 done: false },
  { id: "PL-06", category: "Access",  owner: "CS",        item: "Customer portal access shared",                done: false },
  { id: "PL-07", category: "Support", owner: "CS",        item: "Support escalation path agreed",               done: false },
  { id: "PL-08", category: "Metrics", owner: "PM",        item: "Success metrics baseline captured",            done: false },
  { id: "PL-09", category: "Cadence", owner: "PM",        item: "Weekly check-in scheduled",                    done: false },
  { id: "PL-10", category: "Exit",    owner: "PM",        item: "Exit / conversion criteria documented",        done: false },
  { id: "PL-11", category: "Tech",    owner: "Platform",  item: "Backup + restore tested on pilot prod",        done: false },
  { id: "PL-12", category: "Tech",    owner: "Platform",  item: "Sentry alerts wired to on-call",               done: false },
];

export const PILOT_METRICS: { name: string; target: string; how: string }[] = [
  { name: "Driver app adoption",          target: "≥ 80%", how: "Active drivers / invited drivers in week 4"   },
  { name: "Load status accuracy",         target: "≥ 90%", how: "Statuses progressed without dispatcher override" },
  { name: "GPS sync reliability",         target: "≥ 90%", how: "Pings/expected in active driving windows"     },
  { name: "Reduced customer status calls",target: "≥ 50%", how: "Vs. pre-pilot baseline reported by customer"   },
  { name: "POD captured per delivery",    target: "≥ 85%", how: "PODs / completed loads"                        },
  { name: "Cross-company data leaks",     target: "0",     how: "RLS + manual audits, weekly"                  },
  { name: "Critical security incidents",  target: "0",     how: "Sev-1/2 incidents tracked in postmortems"      },
  { name: "Pilot NPS",                    target: "≥ 30",  how: "Surveyed at day 14 and day 30"                 },
];

export const PILOT_RISKS = [
  { risk: "Driver app non-adoption",       likelihood: "M", impact: "H", mitigation: "On-site training + driver champion" },
  { risk: "Battery drain from GPS",         likelihood: "M", impact: "M", mitigation: "Tune interval + foreground service" },
  { risk: "Map provider cost spike",        likelihood: "L", impact: "M", mitigation: "Provider abstraction + quota alerts" },
  { risk: "RLS misconfiguration",           likelihood: "L", impact: "H", mitigation: "Automated RLS test suite" },
  { risk: "Scope creep mid-pilot",          likelihood: "H", impact: "M", mitigation: "Lock backlog, change-control" },
  { risk: "Customer expects deferred feature", likelihood: "M", impact: "M", mitigation: "Clear MVP scope in pilot doc + demo labels" },
];

export const PRODUCT_RISKS = [
  { risk: "Driver adoption",                like: "M", imp: "H", mit: "Champion + 1-page guide" },
  { risk: "GPS reliability",                 like: "M", imp: "H", mit: "Provider abstraction + retry queue" },
  { risk: "Mobile battery",                  like: "M", imp: "M", mit: "Adaptive cadence" },
  { risk: "Push reliability",                like: "M", imp: "M", mit: "Fallback SMS/email" },
  { risk: "Map cost",                        like: "L", imp: "M", mit: "Quota + MapLibre fallback" },
  { risk: "Realtime scaling",                like: "L", imp: "M", mit: "Channel sharding plan" },
  { risk: "RLS mistakes",                    like: "L", imp: "H", mit: "Test suite + reviews" },
  { risk: "Scope creep",                     like: "H", imp: "H", mit: "MVP cutline lock" },
  { risk: "AI overbuild",                    like: "M", imp: "M", mit: "Rules-based first" },
  { risk: "App store background location",   like: "M", imp: "H", mit: "Consent + clear copy" },
  { risk: "CDL nav liability",               like: "L", imp: "H", mit: "Defer turn-by-turn" },
  { risk: "Data retention concerns",         like: "L", imp: "M", mit: "Retention policy doc" },
];

// ───────────────────────── ROADMAP ─────────────────────────

export const ROADMAP = [
  { phase: "MVP Pilot",      items: ["Core dispatch", "Driver app", "Live GPS", "Customer portal", "POD", "Notifications"] },
  { phase: "Post-Pilot V1",  items: ["Better ETA", "Mobile offline", "Basic CoPilot", "Better alerts", "Driver import", "Reports", "Billing placeholder"] },
  { phase: "V1.5",           items: ["Real nav SDK", "Advanced portal", "Basic integrations", "Stripe billing", "Optimization v0"] },
  { phase: "V2",             items: ["AI Ops Intelligence", "EDI / API marketplace", "White-label", "Advanced reports", "Compliance center"] },
  { phase: "Enterprise",     items: ["SSO/SAML", "SOC 2 automation", "EDI prod", "Optimization+", "Android Auto / CarPlay"] },
];

// ───────────────────────── BUILD vs BUY ─────────────────────────

export const BUILD_VS_BUY = [
  { capability: "Maps",                  recommend: "Buy",   provider: "Mapbox or MapLibre",   reason: "Avoid map rendering investment" },
  { capability: "Turn-by-turn nav",      recommend: "Defer", provider: "—",                     reason: "Out of MVP scope" },
  { capability: "Push notifications",    recommend: "Buy",   provider: "Expo Push",            reason: "Fast cross-platform" },
  { capability: "Billing",               recommend: "Defer", provider: "Stripe later",          reason: "Manual invoice in pilot" },
  { capability: "Authentication",        recommend: "Buy",   provider: "Supabase Auth",         reason: "Bundled" },
  { capability: "File storage",          recommend: "Buy",   provider: "Supabase Storage",      reason: "Bundled" },
  { capability: "Email",                 recommend: "Buy",   provider: "Resend / Postmark",     reason: "Transactional" },
  { capability: "SMS",                   recommend: "Defer", provider: "Twilio later",          reason: "Push covers MVP" },
  { capability: "AI voice",              recommend: "Defer", provider: "OpenAI later",          reason: "Mock CoPilot first" },
  { capability: "EDI",                   recommend: "Defer", provider: "Cleo / SPS",            reason: "Enterprise phase" },
  { capability: "Customer support",      recommend: "Buy",   provider: "Email + simple inbox",  reason: "Lightweight in pilot" },
  { capability: "Analytics",             recommend: "Buy",   provider: "PostHog",               reason: "Product analytics" },
  { capability: "Crash reporting",       recommend: "Buy",   provider: "Sentry",                reason: "Mobile + web" },
  { capability: "Dispatch UI",           recommend: "Build", provider: "—",                     reason: "Core differentiator" },
  { capability: "Driver app UX",         recommend: "Build", provider: "—",                     reason: "Core differentiator" },
];

// ───────────────────────── COSTS ─────────────────────────

export const COST_ITEMS = [
  { item: "Supabase database",     monthly: "$25–$150",  notes: "Scales with rows + connections" },
  { item: "Supabase realtime",     monthly: "Included",  notes: "Watch concurrent channels" },
  { item: "Supabase storage",      monthly: "$5–$50",    notes: "POD photos" },
  { item: "Map API",               monthly: "$50–$500",  notes: "Per dispatcher session" },
  { item: "Push notifications",    monthly: "Free",      notes: "Expo Push free tier" },
  { item: "AI gateway (mock)",     monthly: "$0",        notes: "Rules-only in MVP" },
  { item: "Email (Resend)",        monthly: "$20–$50",   notes: "Transactional" },
  { item: "Sentry",                monthly: "$26+",      notes: "Errors + perf" },
  { item: "Mobile build (EAS)",    monthly: "$0–$99",    notes: "Expo EAS" },
  { item: "Apple + Google fees",   monthly: "Annual",    notes: "$99 + $25 one-time" },
];

export const COST_TOTALS = {
  monthlyLow: "≈ $150 / mo",
  monthlyHigh: "≈ $1,000 / mo",
  oneTime: "$124 (Apple + Google)",
  notes: "Pilot-stage envelope for one company with ≤ 15 drivers and 1–3 dispatchers.",
};

// ───────────────────────── DEMO SCRIPT ─────────────────────────

export const DEMO_STEPS = [
  "Dispatcher logs in to Command Center",
  "Creates a new load (origin → destination)",
  "Offers load to driver Maria",
  "Driver Maria accepts on mobile",
  "Live GPS appears on dispatcher map",
  "Driver updates status: En route → Arrived → Delivered",
  "Driver captures POD (placeholder)",
  "Customer opens tracking page and sees status",
  "Stale-GPS alert demo on a second driver",
  "Admin reviews audit log of the workflow",
];

export const DEMO_SCENES: { scene: number; title: string; minutes: number; talkTrack: string }[] = [
  { scene: 1,  title: "Dispatcher logs in to Command Center",          minutes: 1, talkTrack: "Highlight role-based dashboard, real data, no setup theater." },
  { scene: 2,  title: "Create a new load",                              minutes: 1, talkTrack: "Show required fields only; mention validation + audit." },
  { scene: 3,  title: "Offer load to driver Maria",                     minutes: 1, talkTrack: "Real-time push to the device; no email back-and-forth." },
  { scene: 4,  title: "Driver Maria accepts on mobile",                 minutes: 1, talkTrack: "Two-tap accept, status moves on dispatch board instantly." },
  { scene: 5,  title: "Live GPS appears on dispatcher map",             minutes: 2, talkTrack: "Note last-ping age + stale indicator — built-in trust." },
  { scene: 6,  title: "Driver progresses statuses through delivered",   minutes: 2, talkTrack: "Anchor on customer call deflection." },
  { scene: 7,  title: "Driver captures POD (placeholder)",              minutes: 1, talkTrack: "Mock label visible; explain real photo + signature in V1." },
  { scene: 8,  title: "Customer tracking page",                         minutes: 1, talkTrack: "Tokenized link; only this shipment is visible." },
  { scene: 9,  title: "Stale-GPS alert on second driver",               minutes: 1, talkTrack: "Rules-based alert today; AI scoring planned post-pilot." },
  { scene: 10, title: "Admin audit log review",                         minutes: 1, talkTrack: "Same workflow, now provable. Close on trust + speed." },
];

export const DEMO_DO_NOT_SHOW = [
  "Full AI automation",
  "Full EDI",
  "Full billing automation",
  "Android Auto",
  "CarPlay",
  "SOC 2 automation",
];
