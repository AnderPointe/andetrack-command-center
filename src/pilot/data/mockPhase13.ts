/**
 * Phase 13 — Pilot Readiness tracker.
 *
 * Drives the Pilot Readiness Dashboard. Tracks test execution, bug triage,
 * RLS validation, training, support, go-live phases, and acceptance criteria
 * for the first live pilot rollout.
 */
export type ReadinessStatus =
  | "not_started"
  | "in_progress"
  | "blocked"
  | "needs_review"
  | "ready"
  | "passed";

export type TestStatus = "not_run" | "passed" | "failed" | "blocked" | "needs_retest" | "deferred";
export type BugStatus =
  | "new" | "confirmed" | "in_progress" | "ready_retest" | "fixed" | "verified" | "released" | "wont_fix" | "duplicate";
export type BugSeverity = "critical" | "high" | "medium" | "low";
export type BugPriority = "P0" | "P1" | "P2" | "P3";

export const READINESS_LABEL: Record<ReadinessStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  blocked: "Blocked",
  needs_review: "Needs review",
  ready: "Ready",
  passed: "Passed",
};

export const READINESS_TONE: Record<ReadinessStatus, string> = {
  not_started: "border-white/15 text-muted-foreground bg-white/[0.02]",
  in_progress: "border-sky-500/30 text-sky-300 bg-sky-500/5",
  blocked: "border-rose-500/30 text-rose-300 bg-rose-500/5",
  needs_review: "border-amber-500/30 text-amber-300 bg-amber-500/5",
  ready: "border-teal-500/30 text-teal-300 bg-teal-500/5",
  passed: "border-emerald-500/30 text-emerald-300 bg-emerald-500/5",
};

export interface ReadinessSection {
  id: string;
  title: string;
  blurb: string;
  status: ReadinessStatus;
  score: number; // 0..100
  blockers?: string[];
  notes?: string;
}

export const READINESS_SECTIONS: ReadinessSection[] = [
  { id: "build",     title: "MVP build status",        blurb: "Phase 12 cutline complete",                       status: "ready",        score: 88 },
  { id: "tests",     title: "Test status",             blurb: "Critical MVP workflows green",                    status: "in_progress",  score: 72 },
  { id: "bugs",      title: "Bug status",              blurb: "P0 blockers must be zero",                        status: "needs_review", score: 65, blockers: ["BUG-014 GPS stale warning", "BUG-019 offer notification"] },
  { id: "rls",       title: "RLS/security tests",      blurb: "Tenant isolation + role scoping",                 status: "needs_review", score: 80, blockers: ["BUG-021 customer portal RLS"] },
  { id: "driver",    title: "Driver app readiness",    blurb: "Login, offers, status, POD",                      status: "in_progress",  score: 70 },
  { id: "dispatch",  title: "Dispatcher readiness",    blurb: "Load board, map, alerts",                         status: "in_progress",  score: 75 },
  { id: "portal",    title: "Customer portal",         blurb: "Shipment tracking + POD",                         status: "in_progress",  score: 68 },
  { id: "supabase",  title: "Supabase readiness",      blurb: "Schema, RLS, seeded data",                        status: "ready",        score: 92 },
  { id: "realtime",  title: "Realtime / GPS",          blurb: "Driver live state stream + map sync",             status: "in_progress",  score: 70 },
  { id: "notify",    title: "Notifications",           blurb: "In-app + email placeholders",                     status: "in_progress",  score: 55 },
  { id: "demo",      title: "Demo mode",               blurb: "Reset + seed working",                            status: "ready",        score: 90 },
  { id: "training",  title: "Training readiness",      blurb: "Dispatcher + driver + customer paths",            status: "in_progress",  score: 60 },
  { id: "support",   title: "Support readiness",       blurb: "Tickets, escalation, FAQ",                        status: "in_progress",  score: 58 },
  { id: "golive",    title: "Go-live readiness",       blurb: "Composite go/no-go score",                        status: "needs_review", score: 74 },
];

export interface TestCase {
  id: string;
  title: string;
  category: string;
  priority: BugPriority;
  status: TestStatus;
  steps?: string[];
  expected?: string;
  related_bug?: string;
}

export const TEST_CASES: TestCase[] = [
  // Auth
  { id: "T-AUTH-01", title: "User can log in",                       category: "Auth",       priority: "P0", status: "passed" },
  { id: "T-AUTH-02", title: "User can log out",                       category: "Auth",       priority: "P0", status: "passed" },
  { id: "T-AUTH-03", title: "Session restores correctly",             category: "Auth",       priority: "P0", status: "passed" },
  { id: "T-AUTH-04", title: "Unauthorized user redirected",           category: "Auth",       priority: "P0", status: "passed" },
  { id: "T-AUTH-05", title: "Role detected correctly",                category: "Auth",       priority: "P0", status: "needs_retest" },
  // RLS / tenant
  { id: "T-RLS-01",  title: "Company admin scoped to company",        category: "RLS",        priority: "P0", status: "passed" },
  { id: "T-RLS-02",  title: "Dispatcher scoped to company data",      category: "RLS",        priority: "P0", status: "passed" },
  { id: "T-RLS-03",  title: "Driver sees only assigned loads",        category: "RLS",        priority: "P0", status: "passed" },
  { id: "T-RLS-04",  title: "Customer sees only own shipments",       category: "RLS",        priority: "P0", status: "failed", related_bug: "BUG-021" },
  { id: "T-RLS-05",  title: "Cross-company access blocked",           category: "RLS",        priority: "P0", status: "passed" },
  // Load workflow
  { id: "T-LOAD-01", title: "Dispatcher creates load",                category: "Load",       priority: "P0", status: "passed" },
  { id: "T-LOAD-02", title: "Dispatcher offers load",                 category: "Load",       priority: "P0", status: "passed" },
  { id: "T-LOAD-03", title: "Driver receives offer",                  category: "Load",       priority: "P0", status: "failed", related_bug: "BUG-019" },
  { id: "T-LOAD-04", title: "Driver accepts load",                    category: "Load",       priority: "P0", status: "passed" },
  { id: "T-LOAD-05", title: "Driver denies load with reason",         category: "Load",       priority: "P0", status: "passed" },
  { id: "T-LOAD-06", title: "Assignment created",                     category: "Load",       priority: "P0", status: "passed" },
  // Driver
  { id: "T-DRV-01",  title: "Driver sees active load",                category: "Driver",     priority: "P0", status: "passed" },
  { id: "T-DRV-02",  title: "Driver updates status",                  category: "Driver",     priority: "P0", status: "passed" },
  { id: "T-DRV-03",  title: "Driver marks arrived at pickup",         category: "Driver",     priority: "P0", status: "passed" },
  { id: "T-DRV-04",  title: "Driver marks delivered + POD",           category: "Driver",     priority: "P0", status: "needs_retest" },
  // GPS / realtime
  { id: "T-GPS-01",  title: "Driver live state updates",              category: "GPS",        priority: "P0", status: "passed" },
  { id: "T-GPS-02",  title: "Dispatcher map updates",                 category: "GPS",        priority: "P0", status: "passed" },
  { id: "T-GPS-03",  title: "GPS stale warning appears",              category: "GPS",        priority: "P0", status: "failed", related_bug: "BUG-014" },
  // Customer portal
  { id: "T-CP-01",   title: "Customer sees shipment list",            category: "Portal",     priority: "P0", status: "passed" },
  { id: "T-CP-02",   title: "Customer opens shipment detail",         category: "Portal",     priority: "P0", status: "passed" },
  { id: "T-CP-03",   title: "Customer sees POD after delivery",       category: "Portal",     priority: "P0", status: "not_run" },
  // Audit + alerts
  { id: "T-AUD-01",  title: "Load lifecycle audit log",               category: "Audit",      priority: "P0", status: "passed" },
  { id: "T-ALT-01",  title: "Denied load alert appears",              category: "Alerts",     priority: "P1", status: "passed" },
  { id: "T-ALT-02",  title: "GPS stale alert appears",                category: "Alerts",     priority: "P1", status: "needs_retest" },
];

export interface Bug {
  id: string;
  title: string;
  severity: BugSeverity;
  priority: BugPriority;
  status: BugStatus;
  workflow: string;
  role: string;
  assignee?: string;
}

export const BUGS: Bug[] = [
  { id: "BUG-014", title: "GPS stale warning never clears after driver resumes ping", severity: "high",     priority: "P0", status: "in_progress",  workflow: "GPS",   role: "dispatcher", assignee: "platform" },
  { id: "BUG-019", title: "Offer notification not delivered to driver app",            severity: "critical", priority: "P0", status: "confirmed",    workflow: "Load",  role: "driver",     assignee: "platform" },
  { id: "BUG-021", title: "Customer portal returns sibling customer shipments",        severity: "critical", priority: "P0", status: "in_progress",  workflow: "RLS",   role: "customer",   assignee: "security" },
  { id: "BUG-023", title: "POD upload spinner stuck after success",                    severity: "medium",   priority: "P1", status: "ready_retest", workflow: "POD",   role: "driver" },
  { id: "BUG-025", title: "Map driver pin tooltip overflows on mobile",                severity: "low",      priority: "P2", status: "new",          workflow: "Map",   role: "dispatcher" },
];

export const PILOT_BLOCKERS: { id: string; rule: string; severity: "stop" | "warn" }[] = [
  { id: "BL-1",  rule: "Login broken or session not restored",                          severity: "stop" },
  { id: "BL-2",  rule: "RLS / company isolation failure",                                severity: "stop" },
  { id: "BL-3",  rule: "Driver cannot accept load",                                      severity: "stop" },
  { id: "BL-4",  rule: "Dispatcher cannot create or offer load",                         severity: "stop" },
  { id: "BL-5",  rule: "Driver status updates fail to persist",                          severity: "stop" },
  { id: "BL-6",  rule: "GPS live state stops streaming",                                 severity: "stop" },
  { id: "BL-7",  rule: "Customer portal shows wrong company / customer data",            severity: "stop" },
  { id: "BL-8",  rule: "POD submission fails",                                           severity: "stop" },
  { id: "BL-9",  rule: "Audit logs missing for critical actions",                        severity: "warn" },
  { id: "BL-10", rule: "TypeScript / build errors at HEAD",                              severity: "stop" },
  { id: "BL-11", rule: "Driver mobile screen unusable below 360px width",                severity: "warn" },
  { id: "BL-12", rule: "No support escalation process defined",                          severity: "warn" },
  { id: "BL-13", rule: "No rollback plan approved",                                      severity: "stop" },
];

export const GO_LIVE_PHASES: { id: string; phase: string; owner: string; status: ReadinessStatus; success: string }[] = [
  { id: "GL-1", phase: "Internal smoke test",        owner: "QA",         status: "ready",        success: "All P0 smoke tests pass" },
  { id: "GL-2", phase: "Pilot company setup",        owner: "CS",         status: "in_progress",  success: "Admin, dispatchers, drivers, vehicles, customers seeded" },
  { id: "GL-3", phase: "Dispatcher training",        owner: "CS",         status: "in_progress",  success: "Both dispatchers complete quick-start" },
  { id: "GL-4", phase: "Driver training",            owner: "CS",         status: "in_progress",  success: "≥80% drivers complete quick-start" },
  { id: "GL-5", phase: "Customer portal training",   owner: "CS",         status: "not_started",  success: "Pilot customer signs in and reviews demo shipment" },
  { id: "GL-6", phase: "First test load",            owner: "CS+QA",      status: "not_started",  success: "End-to-end test load completes without manual override" },
  { id: "GL-7", phase: "First live load",            owner: "Dispatch",   status: "not_started",  success: "Live load offered, accepted, tracked, delivered" },
  { id: "GL-8", phase: "First delivery + POD",       owner: "Driver",     status: "not_started",  success: "POD submitted and visible to customer" },
  { id: "GL-9", phase: "First customer tracking",    owner: "Customer",   status: "not_started",  success: "Customer follows shipment in portal end-to-end" },
  { id: "GL-10",phase: "Pilot review",               owner: "Product",    status: "not_started",  success: "Daily + weekly review cadence running" },
];

export const PILOT_METRICS_DEFS: { id: string; name: string; target: string; current?: string }[] = [
  { id: "M-1",  name: "Driver adoption rate",         target: "≥ 80%",       current: "—" },
  { id: "M-2",  name: "Dispatcher adoption rate",     target: "100%",        current: "—" },
  { id: "M-3",  name: "Loads completed E2E",          target: "≥ 50 / 30d",  current: "—" },
  { id: "M-4",  name: "Load offer response time",     target: "< 2 min med", current: "—" },
  { id: "M-5",  name: "Load denial rate",             target: "< 15%",       current: "—" },
  { id: "M-6",  name: "GPS sync reliability",         target: "≥ 95%",       current: "—" },
  { id: "M-7",  name: "POD completion rate",          target: "≥ 95%",       current: "—" },
  { id: "M-8",  name: "Alert resolution time",        target: "< 30 min",    current: "—" },
  { id: "M-9",  name: "Critical bug count",           target: "0 open P0",   current: "2" },
  { id: "M-10", name: "Dispatcher satisfaction",      target: "≥ 7 / 10",    current: "—" },
  { id: "M-11", name: "Driver satisfaction",          target: "≥ 7 / 10",    current: "—" },
  { id: "M-12", name: "Customer satisfaction",        target: "≥ 7 / 10",    current: "—" },
];

export const ACCEPTANCE_CRITERIA: { id: string; criterion: string; met: boolean }[] = [
  { id: "AC-1",  criterion: "P0 bugs = 0",                                  met: false },
  { id: "AC-2",  criterion: "Critical security issues = 0",                 met: false },
  { id: "AC-3",  criterion: "RLS tests passed",                             met: false },
  { id: "AC-4",  criterion: "Load workflow passed end-to-end",              met: true  },
  { id: "AC-5",  criterion: "Driver accept/deny passed",                    met: true  },
  { id: "AC-6",  criterion: "Driver status update passed",                  met: true  },
  { id: "AC-7",  criterion: "GPS live state passed",                        met: true  },
  { id: "AC-8",  criterion: "Customer portal passed",                       met: false },
  { id: "AC-9",  criterion: "POD placeholder passed",                       met: false },
  { id: "AC-10", criterion: "Audit logs verified",                          met: true  },
  { id: "AC-11", criterion: "Support process ready",                        met: false },
  { id: "AC-12", criterion: "Training completed",                           met: false },
  { id: "AC-13", criterion: "Go-live checklist approved",                   met: false },
  { id: "AC-14", criterion: "Rollback plan approved",                       met: true  },
];

export const FIRST_LIVE_LOAD_STEPS: { id: string; step: string; owner: string }[] = [
  { id: "FL-1",  step: "Dispatcher creates live load",            owner: "Dispatcher" },
  { id: "FL-2",  step: "Verify customer + pickup + drop-off",     owner: "Dispatcher" },
  { id: "FL-3",  step: "Offer load to driver",                    owner: "Dispatcher" },
  { id: "FL-4",  step: "Driver accepts load",                     owner: "Driver" },
  { id: "FL-5",  step: "Driver confirms GPS active",              owner: "Driver" },
  { id: "FL-6",  step: "Dispatcher confirms driver on map",       owner: "Dispatcher" },
  { id: "FL-7",  step: "Driver marks en route to pickup",         owner: "Driver" },
  { id: "FL-8",  step: "Driver marks arrived + loaded",           owner: "Driver" },
  { id: "FL-9",  step: "Driver marks en route to drop-off",       owner: "Driver" },
  { id: "FL-10", step: "Customer checks portal",                  owner: "Customer" },
  { id: "FL-11", step: "Driver marks delivered + submits POD",    owner: "Driver" },
  { id: "FL-12", step: "Dispatcher + customer verify completion", owner: "All" },
];

export function computeReadinessScore(sections: ReadinessSection[]): number {
  if (sections.length === 0) return 0;
  return Math.round(sections.reduce((a, s) => a + s.score, 0) / sections.length);
}

export function computeGoNoGo(criteria: typeof ACCEPTANCE_CRITERIA): { met: number; total: number; ready: boolean } {
  const met = criteria.filter((c) => c.met).length;
  return { met, total: criteria.length, ready: met === criteria.length };
}
