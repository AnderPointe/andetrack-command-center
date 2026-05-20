/**
 * Phase 13 — Pilot Readiness tracker (polished).
 *
 * Drives the Pilot Readiness Dashboard. Tracks test execution, bug triage,
 * RLS validation, training, support, go-live phases, and acceptance criteria
 * for the first live pilot rollout.
 *
 * Polish pass adds:
 *  - section `weight` so the readiness % reflects what actually matters
 *  - acceptance `gate` flag to separate hard go/no-go gates from soft criteria
 *  - bug `daysOpen` for triage age and `gate` for explicit launch blockers
 *  - first-live-load step `status` so the wizard reflects real progress
 *  - test `gate` flag (P0 + gate = absolute launch blocker)
 *  - combined `computePilotGate` that fuses all hard gates into one signal
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
  score: number;   // 0..100
  weight: number;  // relative importance in the composite readiness %
  gate?: boolean;  // if true, section must reach `ready`/`passed` to launch
  blockers?: string[];
  notes?: string;
}

export const READINESS_SECTIONS: ReadinessSection[] = [
  { id: "build",     title: "MVP build status",        blurb: "Phase 12 cutline complete",            status: "ready",        score: 88, weight: 3, gate: true },
  { id: "tests",     title: "Test status",             blurb: "Critical MVP workflows green",         status: "in_progress",  score: 72, weight: 3, gate: true },
  { id: "bugs",      title: "Bug status",              blurb: "P0 blockers must be zero",             status: "needs_review", score: 65, weight: 3, gate: true, blockers: ["BUG-014 GPS stale warning", "BUG-019 offer notification"] },
  { id: "rls",       title: "RLS/security tests",      blurb: "Tenant isolation + role scoping",      status: "needs_review", score: 80, weight: 3, gate: true, blockers: ["BUG-021 customer portal RLS"] },
  { id: "driver",    title: "Driver app readiness",    blurb: "Login, offers, status, POD",           status: "in_progress",  score: 70, weight: 2, gate: true },
  { id: "dispatch",  title: "Dispatcher readiness",    blurb: "Load board, map, alerts",              status: "in_progress",  score: 75, weight: 2, gate: true },
  { id: "portal",    title: "Customer portal",         blurb: "Shipment tracking + POD",              status: "in_progress",  score: 68, weight: 2, gate: true },
  { id: "supabase",  title: "Supabase readiness",      blurb: "Schema, RLS, seeded data",             status: "ready",        score: 92, weight: 2, gate: true },
  { id: "realtime",  title: "Realtime / GPS",          blurb: "Driver live state + map sync",         status: "in_progress",  score: 70, weight: 2, gate: true },
  { id: "notify",    title: "Notifications",           blurb: "In-app + email placeholders",          status: "in_progress",  score: 55, weight: 1 },
  { id: "demo",      title: "Demo mode",               blurb: "Reset + seed working",                 status: "ready",        score: 90, weight: 1 },
  { id: "training",  title: "Training readiness",      blurb: "Dispatcher + driver + customer paths", status: "in_progress",  score: 60, weight: 2, gate: true },
  { id: "support",   title: "Support readiness",       blurb: "Tickets, escalation, FAQ",             status: "in_progress",  score: 58, weight: 2, gate: true },
  { id: "golive",    title: "Go-live readiness",       blurb: "Composite go/no-go score",             status: "needs_review", score: 74, weight: 3, gate: true },
];

export interface TestCase {
  id: string;
  title: string;
  category: string;
  priority: BugPriority;
  status: TestStatus;
  gate?: boolean; // if true: P0 + must-pass for launch
  steps?: string[];
  expected?: string;
  related_bug?: string;
}

export const TEST_CASES: TestCase[] = [
  // Auth
  { id: "T-AUTH-01", title: "User can log in",                       category: "Auth",   priority: "P0", status: "passed",       gate: true },
  { id: "T-AUTH-02", title: "User can log out",                       category: "Auth",   priority: "P0", status: "passed",       gate: true },
  { id: "T-AUTH-03", title: "Session restores correctly",             category: "Auth",   priority: "P0", status: "passed",       gate: true },
  { id: "T-AUTH-04", title: "Unauthorized user redirected",           category: "Auth",   priority: "P0", status: "passed",       gate: true },
  { id: "T-AUTH-05", title: "Role detected correctly",                category: "Auth",   priority: "P0", status: "needs_retest", gate: true },
  // RLS / tenant
  { id: "T-RLS-01",  title: "Company admin scoped to company",        category: "RLS",    priority: "P0", status: "passed",       gate: true },
  { id: "T-RLS-02",  title: "Dispatcher scoped to company data",      category: "RLS",    priority: "P0", status: "passed",       gate: true },
  { id: "T-RLS-03",  title: "Driver sees only assigned loads",        category: "RLS",    priority: "P0", status: "passed",       gate: true },
  { id: "T-RLS-04",  title: "Customer sees only own shipments",       category: "RLS",    priority: "P0", status: "failed",       gate: true, related_bug: "BUG-021" },
  { id: "T-RLS-05",  title: "Cross-company access blocked",           category: "RLS",    priority: "P0", status: "passed",       gate: true },
  // Load workflow
  { id: "T-LOAD-01", title: "Dispatcher creates load",                category: "Load",   priority: "P0", status: "passed",       gate: true },
  { id: "T-LOAD-02", title: "Dispatcher offers load",                 category: "Load",   priority: "P0", status: "passed",       gate: true },
  { id: "T-LOAD-03", title: "Driver receives offer",                  category: "Load",   priority: "P0", status: "failed",       gate: true, related_bug: "BUG-019" },
  { id: "T-LOAD-04", title: "Driver accepts load",                    category: "Load",   priority: "P0", status: "passed",       gate: true },
  { id: "T-LOAD-05", title: "Driver denies load with reason",         category: "Load",   priority: "P0", status: "passed",       gate: true },
  { id: "T-LOAD-06", title: "Assignment created",                     category: "Load",   priority: "P0", status: "passed",       gate: true },
  // Driver
  { id: "T-DRV-01",  title: "Driver sees active load",                category: "Driver", priority: "P0", status: "passed",       gate: true },
  { id: "T-DRV-02",  title: "Driver updates status",                  category: "Driver", priority: "P0", status: "passed",       gate: true },
  { id: "T-DRV-03",  title: "Driver marks arrived at pickup",         category: "Driver", priority: "P0", status: "passed",       gate: true },
  { id: "T-DRV-04",  title: "Driver marks delivered + POD",           category: "Driver", priority: "P0", status: "needs_retest", gate: true },
  // GPS / realtime
  { id: "T-GPS-01",  title: "Driver live state updates",              category: "GPS",    priority: "P0", status: "passed",       gate: true },
  { id: "T-GPS-02",  title: "Dispatcher map updates",                 category: "GPS",    priority: "P0", status: "passed",       gate: true },
  { id: "T-GPS-03",  title: "GPS stale warning appears",              category: "GPS",    priority: "P0", status: "failed",       gate: true, related_bug: "BUG-014" },
  // Customer portal
  { id: "T-CP-01",   title: "Customer sees shipment list",            category: "Portal", priority: "P0", status: "passed",       gate: true },
  { id: "T-CP-02",   title: "Customer opens shipment detail",         category: "Portal", priority: "P0", status: "passed",       gate: true },
  { id: "T-CP-03",   title: "Customer sees POD after delivery",       category: "Portal", priority: "P0", status: "not_run",      gate: true },
  // Audit + alerts
  { id: "T-AUD-01",  title: "Load lifecycle audit log",               category: "Audit",  priority: "P0", status: "passed",       gate: true },
  { id: "T-ALT-01",  title: "Denied load alert appears",              category: "Alerts", priority: "P1", status: "passed" },
  { id: "T-ALT-02",  title: "GPS stale alert appears",                category: "Alerts", priority: "P1", status: "needs_retest" },
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
  daysOpen: number;
  gate?: boolean; // explicit launch blocker
  related_test?: string;
}

export const BUGS: Bug[] = [
  { id: "BUG-014", title: "GPS stale warning never clears after driver resumes ping", severity: "high",     priority: "P0", status: "in_progress",  workflow: "GPS",   role: "dispatcher", assignee: "platform", daysOpen: 3, gate: true, related_test: "T-GPS-03" },
  { id: "BUG-019", title: "Offer notification not delivered to driver app",            severity: "critical", priority: "P0", status: "confirmed",    workflow: "Load",  role: "driver",     assignee: "platform", daysOpen: 2, gate: true, related_test: "T-LOAD-03" },
  { id: "BUG-021", title: "Customer portal returns sibling customer shipments",        severity: "critical", priority: "P0", status: "in_progress",  workflow: "RLS",   role: "customer",   assignee: "security", daysOpen: 4, gate: true, related_test: "T-RLS-04" },
  { id: "BUG-023", title: "POD upload spinner stuck after success",                    severity: "medium",   priority: "P1", status: "ready_retest", workflow: "POD",   role: "driver",                           daysOpen: 5 },
  { id: "BUG-025", title: "Map driver pin tooltip overflows on mobile",                severity: "low",      priority: "P2", status: "new",          workflow: "Map",   role: "dispatcher",                       daysOpen: 1 },
];

export const PILOT_BLOCKERS: { id: string; rule: string; severity: "stop" | "warn"; triggered?: boolean }[] = [
  { id: "BL-1",  rule: "Login broken or session not restored",                          severity: "stop", triggered: false },
  { id: "BL-2",  rule: "RLS / company isolation failure",                                severity: "stop", triggered: true  },
  { id: "BL-3",  rule: "Driver cannot accept load",                                      severity: "stop", triggered: false },
  { id: "BL-4",  rule: "Dispatcher cannot create or offer load",                         severity: "stop", triggered: false },
  { id: "BL-5",  rule: "Driver status updates fail to persist",                          severity: "stop", triggered: false },
  { id: "BL-6",  rule: "GPS live state stops streaming",                                 severity: "stop", triggered: false },
  { id: "BL-7",  rule: "Customer portal shows wrong company / customer data",            severity: "stop", triggered: true  },
  { id: "BL-8",  rule: "POD submission fails",                                           severity: "stop", triggered: false },
  { id: "BL-9",  rule: "Audit logs missing for critical actions",                        severity: "warn", triggered: false },
  { id: "BL-10", rule: "TypeScript / build errors at HEAD",                              severity: "stop", triggered: false },
  { id: "BL-11", rule: "Driver mobile screen unusable below 360px width",                severity: "warn", triggered: false },
  { id: "BL-12", rule: "No support escalation process defined",                          severity: "warn", triggered: false },
  { id: "BL-13", rule: "No rollback plan approved",                                      severity: "stop", triggered: false },
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

export const PILOT_METRICS_DEFS: { id: string; name: string; group: "Adoption" | "Workflow" | "Reliability" | "Support" | "Satisfaction"; target: string; current: string; onTrack?: boolean }[] = [
  { id: "M-1",  group: "Adoption",     name: "Driver adoption rate",         target: "≥ 80%",       current: "68%", onTrack: false },
  { id: "M-2",  group: "Adoption",     name: "Dispatcher adoption rate",     target: "100%",        current: "100%", onTrack: true  },
  { id: "M-3",  group: "Workflow",     name: "Loads completed E2E",          target: "≥ 50 / 30d",  current: "19",  onTrack: true  },
  { id: "M-4",  group: "Workflow",     name: "Load offer response time",     target: "< 2 min med", current: "1m48s", onTrack: true },
  { id: "M-5",  group: "Workflow",     name: "Load denial rate",             target: "< 15%",       current: "11%", onTrack: true  },
  { id: "M-6",  group: "Reliability",  name: "GPS sync reliability",         target: "≥ 95%",       current: "92%", onTrack: false },
  { id: "M-7",  group: "Workflow",     name: "POD completion rate",          target: "≥ 95%",       current: "78%", onTrack: false },
  { id: "M-8",  group: "Reliability",  name: "Alert resolution time",        target: "< 30 min",    current: "22m", onTrack: true  },
  { id: "M-9",  group: "Reliability",  name: "Critical bug count",           target: "0 open P0",   current: "3",   onTrack: false },
  { id: "M-10", group: "Satisfaction", name: "Dispatcher satisfaction",      target: "≥ 7 / 10",    current: "8.1", onTrack: true  },
  { id: "M-11", group: "Satisfaction", name: "Driver satisfaction",          target: "≥ 7 / 10",    current: "6.9", onTrack: false },
  { id: "M-12", group: "Satisfaction", name: "Customer satisfaction",        target: "≥ 7 / 10",    current: "—",   onTrack: true  },
];

export interface AcceptanceCriterion {
  id: string;
  criterion: string;
  met: boolean;
  gate: boolean; // hard gate — must be true to launch
}

export const ACCEPTANCE_CRITERIA: AcceptanceCriterion[] = [
  { id: "AC-1",  criterion: "P0 bugs = 0",                                  met: false, gate: true  },
  { id: "AC-2",  criterion: "Critical security issues = 0",                 met: false, gate: true  },
  { id: "AC-3",  criterion: "RLS tests passed",                             met: false, gate: true  },
  { id: "AC-4",  criterion: "Load workflow passed end-to-end",              met: true,  gate: true  },
  { id: "AC-5",  criterion: "Driver accept/deny passed",                    met: true,  gate: true  },
  { id: "AC-6",  criterion: "Driver status update passed",                  met: true,  gate: true  },
  { id: "AC-7",  criterion: "GPS live state passed",                        met: true,  gate: true  },
  { id: "AC-8",  criterion: "Customer portal passed",                       met: false, gate: true  },
  { id: "AC-9",  criterion: "POD placeholder passed",                       met: false, gate: true  },
  { id: "AC-10", criterion: "Audit logs verified",                          met: true,  gate: true  },
  { id: "AC-11", criterion: "Support process ready",                        met: false, gate: false },
  { id: "AC-12", criterion: "Training completed",                           met: false, gate: false },
  { id: "AC-13", criterion: "Go-live checklist approved",                   met: false, gate: true  },
  { id: "AC-14", criterion: "Rollback plan approved",                       met: true,  gate: true  },
];

export type WizardStepStatus = "done" | "in_progress" | "todo" | "blocked";

export const FIRST_LIVE_LOAD_STEPS: { id: string; step: string; owner: string; status: WizardStepStatus; note?: string }[] = [
  { id: "FL-1",  step: "Dispatcher creates live load",            owner: "Dispatcher", status: "done" },
  { id: "FL-2",  step: "Verify customer + pickup + drop-off",     owner: "Dispatcher", status: "done" },
  { id: "FL-3",  step: "Offer load to driver",                    owner: "Dispatcher", status: "in_progress", note: "Held by BUG-019 (offer notification)" },
  { id: "FL-4",  step: "Driver accepts load",                     owner: "Driver",     status: "blocked",     note: "Driver app didn't surface offer" },
  { id: "FL-5",  step: "Driver confirms GPS active",              owner: "Driver",     status: "todo" },
  { id: "FL-6",  step: "Dispatcher confirms driver on map",       owner: "Dispatcher", status: "todo" },
  { id: "FL-7",  step: "Driver marks en route to pickup",         owner: "Driver",     status: "todo" },
  { id: "FL-8",  step: "Driver marks arrived + loaded",           owner: "Driver",     status: "todo" },
  { id: "FL-9",  step: "Driver marks en route to drop-off",       owner: "Driver",     status: "todo" },
  { id: "FL-10", step: "Customer checks portal",                  owner: "Customer",   status: "todo" },
  { id: "FL-11", step: "Driver marks delivered + submits POD",    owner: "Driver",     status: "todo" },
  { id: "FL-12", step: "Dispatcher + customer verify completion", owner: "All",        status: "todo" },
];

/* ---------------- helpers ---------------- */

export function computeWeightedReadiness(sections: ReadinessSection[]): number {
  const totalWeight = sections.reduce((a, s) => a + s.weight, 0);
  if (totalWeight === 0) return 0;
  const weighted = sections.reduce((a, s) => a + s.score * s.weight, 0);
  return Math.round(weighted / totalWeight);
}

/** Legacy unweighted score (kept for back-compat with smaller surfaces). */
export function computeReadinessScore(sections: ReadinessSection[]): number {
  if (sections.length === 0) return 0;
  return Math.round(sections.reduce((a, s) => a + s.score, 0) / sections.length);
}

export function computeGoNoGo(criteria: AcceptanceCriterion[]): {
  met: number; total: number; ready: boolean;
  gateMet: number; gateTotal: number; gateReady: boolean;
} {
  const met = criteria.filter((c) => c.met).length;
  const gates = criteria.filter((c) => c.gate);
  const gateMet = gates.filter((c) => c.met).length;
  return {
    met, total: criteria.length, ready: met === criteria.length,
    gateMet, gateTotal: gates.length, gateReady: gateMet === gates.length,
  };
}

const OPEN_BUG_STATUSES: BugStatus[] = ["new", "confirmed", "in_progress", "ready_retest", "fixed"];

export function isBugOpen(b: Bug): boolean {
  return OPEN_BUG_STATUSES.includes(b.status);
}

export function computePilotGate(input: {
  sections?: ReadinessSection[];
  tests?: TestCase[];
  bugs?: Bug[];
  blockers?: typeof PILOT_BLOCKERS;
  criteria?: AcceptanceCriterion[];
}): { ready: boolean; reasons: string[] } {
  const sections = input.sections ?? READINESS_SECTIONS;
  const tests = input.tests ?? TEST_CASES;
  const bugs = input.bugs ?? BUGS;
  const blockers = input.blockers ?? PILOT_BLOCKERS;
  const criteria = input.criteria ?? ACCEPTANCE_CRITERIA;

  const reasons: string[] = [];

  const openP0 = bugs.filter((b) => isBugOpen(b) && (b.priority === "P0" || b.gate)).length;
  if (openP0 > 0) reasons.push(`${openP0} open P0/gate bug${openP0 > 1 ? "s" : ""}`);

  const gateTests = tests.filter((t) => t.gate);
  const failingGateTests = gateTests.filter((t) => t.status !== "passed").length;
  if (failingGateTests > 0) reasons.push(`${failingGateTests} gate test${failingGateTests > 1 ? "s" : ""} not passing`);

  const stopTriggered = blockers.filter((b) => b.severity === "stop" && b.triggered).length;
  if (stopTriggered > 0) reasons.push(`${stopTriggered} STOP blocker${stopTriggered > 1 ? "s" : ""} triggered`);

  const gateSections = sections.filter((s) => s.gate);
  const gateSectionsNotReady = gateSections.filter((s) => s.status !== "ready" && s.status !== "passed").length;
  if (gateSectionsNotReady > 0) reasons.push(`${gateSectionsNotReady} gate section${gateSectionsNotReady > 1 ? "s" : ""} not ready`);

  const gng = computeGoNoGo(criteria);
  if (!gng.gateReady) reasons.push(`${gng.gateTotal - gng.gateMet} acceptance gate${gng.gateTotal - gng.gateMet > 1 ? "s" : ""} unmet`);

  return { ready: reasons.length === 0, reasons };
}
