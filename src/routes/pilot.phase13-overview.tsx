import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PilotNav } from "@/components/pilot/PilotNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket, CheckCircle2, XCircle, AlertTriangle, Bug as BugIcon, ShieldCheck,
  Users, Map as MapIcon, Stethoscope, Gauge, Ban,
} from "lucide-react";
import {
  READINESS_SECTIONS, READINESS_LABEL, READINESS_TONE,
  TEST_CASES, BUGS, PILOT_BLOCKERS, GO_LIVE_PHASES,
  PILOT_METRICS_DEFS, ACCEPTANCE_CRITERIA, FIRST_LIVE_LOAD_STEPS,
  computeWeightedReadiness, computeGoNoGo, computePilotGate, isBugOpen,
} from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/phase13-overview")({
  head: () => ({
    meta: [
      { title: "Phase 13 — Pilot Readiness · Anderoute" },
      { name: "description", content: "Anderoute Phase 13 — MVP testing, bug triage, pilot onboarding, training, support, and first live rollout for the first pilot customer." },
    ],
  }),
  component: Phase13Overview,
});

function Phase13Overview() {
  const score = useMemo(() => computeWeightedReadiness(READINESS_SECTIONS), []);
  const gng = useMemo(() => computeGoNoGo(ACCEPTANCE_CRITERIA), []);
  const gate = useMemo(() => computePilotGate({}), []);

  const testTotals = useMemo(() => {
    const t = { passed: 0, failed: 0, needs_retest: 0, blocked: 0, not_run: 0, deferred: 0 };
    for (const tc of TEST_CASES) t[tc.status]++;
    return t;
  }, []);
  const gateTestsFailing = TEST_CASES.filter((t) => t.gate && t.status !== "passed").length;
  const openP0Bugs = BUGS.filter((b) => b.priority === "P0" && isBugOpen(b)).length;
  const stopBlockers = PILOT_BLOCKERS.filter((b) => b.severity === "stop" && b.triggered);

  return (
    <AppShell>
      <div className="space-y-6">
        <PilotNav />
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 13</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Pilot Readiness · First Live Rollout</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Pilot scope only · no enterprise</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Rocket className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Phase 13 — Pilot Readiness Dashboard</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Take the Phase 12 MVP and launch the first controlled live pilot. Testing,
            bug triage, RLS validation, pilot company onboarding, training, support,
            go-live workflow, metrics, feedback, and rollback — all fused into one
            explicit launch gate.
          </p>

          <div className="grid gap-3 pt-2 md:grid-cols-4">
            <ScoreTile icon={<Gauge className="size-4" />} label="Weighted readiness" value={`${score}%`} tone={score >= 85 ? "teal" : score >= 70 ? "amber" : "rose"} />
            <ScoreTile icon={<CheckCircle2 className="size-4" />} label="Launch gate" value={gate.ready ? "GO" : "NO-GO"} tone={gate.ready ? "teal" : "rose"} />
            <ScoreTile icon={<BugIcon className="size-4" />} label="Open P0 bugs" value={String(openP0Bugs)} tone={openP0Bugs === 0 ? "teal" : "rose"} />
            <ScoreTile icon={<Stethoscope className="size-4" />} label="Gate tests" value={`${TEST_CASES.filter(t => t.gate && t.status === "passed").length} / ${TEST_CASES.filter(t => t.gate).length}`} tone={gateTestsFailing === 0 ? "teal" : "amber"} />
          </div>
        </header>

        {/* Combined launch-gate panel */}
        <Card className={`border p-4 ${gate.ready ? "border-teal-500/40 bg-teal-500/5" : "border-rose-500/40 bg-rose-500/5"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              {gate.ready ? <CheckCircle2 className="size-4 text-teal-300" /> : <Ban className="size-4 text-rose-300" />}
              <span>{gate.ready ? "All hard gates clear — pilot launch approved" : "Launch held — fix the items below"}</span>
            </div>
            <Badge variant="outline" className={gate.ready ? "border-teal-500/40 text-teal-200" : "border-rose-500/40 text-rose-200"}>
              {gate.ready ? "GO" : "NO-GO"}
            </Badge>
          </div>
          {!gate.ready && (
            <ul className="mt-2 grid gap-1 text-[11px] text-rose-200/90 md:grid-cols-2">
              {gate.reasons.map((r) => (
                <li key={r} className="flex items-center gap-1.5">
                  <span className="text-rose-400">■</span>{r}
                </li>
              ))}
            </ul>
          )}
          {stopBlockers.length > 0 && (
            <div className="mt-3 border-t border-white/5 pt-2 text-[11px] text-rose-200/80">
              <span className="font-medium text-rose-200">Triggered STOP rules:</span>{" "}
              {stopBlockers.map((b) => b.id).join(", ")}
              <span className="ml-2">
                — see <Link to="/pilot/blockers" className="underline underline-offset-2">blockers</Link>.
              </span>
            </div>
          )}
        </Card>

        {/* Readiness sections */}
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Readiness sections</h2>
            <span className="text-[10px] text-muted-foreground">weighted · gate sections marked</span>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {READINESS_SECTIONS.map((s) => (
              <div key={s.id} className="rounded-lg border border-white/5 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    {s.gate && <span title="Launch gate" className="text-rose-300">●</span>}
                    {s.title}
                    <span className="text-[10px] text-muted-foreground">×{s.weight}</span>
                  </div>
                  <span className={`rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${READINESS_TONE[s.status]}`}>
                    {READINESS_LABEL[s.status]}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.blurb}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div className={`h-full rounded-full ${s.score >= 85 ? "bg-teal-400/80" : s.score >= 70 ? "bg-amber-400/70" : "bg-rose-400/70"}`} style={{ width: `${s.score}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{s.score}%</span>
                </div>
                {s.blockers && s.blockers.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5 text-[10px] text-rose-300/80">
                    {s.blockers.map((b) => <li key={b}>· {b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Tests + Bugs */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Critical MVP test cases</h2>
              <Badge variant="outline" className="border-white/15 text-[10px] text-muted-foreground">{TEST_CASES.length} cases</Badge>
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5 text-[10px]">
              <Pill tone="emerald">passed · {testTotals.passed}</Pill>
              <Pill tone="rose">failed · {testTotals.failed}</Pill>
              <Pill tone="amber">retest · {testTotals.needs_retest}</Pill>
              <Pill tone="sky">not run · {testTotals.not_run}</Pill>
              <Pill tone={gateTestsFailing === 0 ? "emerald" : "rose"}>gate failing · {gateTestsFailing}</Pill>
            </div>
            <div className="max-h-80 space-y-1 overflow-auto pr-1">
              {[...TEST_CASES]
                .sort((a, b) => Number(b.gate ?? false) - Number(a.gate ?? false) || (a.status === "passed" ? 1 : -1))
                .map((t) => (
                  <div key={t.id} className="flex items-start gap-2 rounded border border-white/5 bg-black/20 p-2 text-[11px]">
                    {t.status === "passed" ? <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-400" /> :
                     t.status === "failed" ? <XCircle className="mt-0.5 size-3.5 shrink-0 text-rose-400" /> :
                     <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-400" />}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[9px] text-muted-foreground">{t.id}</span>
                        <span className="text-[10px] text-muted-foreground">{t.category} · {t.priority}</span>
                        {t.gate && <span className="text-[9px] text-rose-300">GATE</span>}
                      </div>
                      <div className="truncate">{t.title}</div>
                      {t.related_bug && <div className="text-[10px] text-rose-300/80">→ {t.related_bug}</div>}
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-2 text-right text-[10px]">
              <Link to="/pilot/tests" className="text-teal-300 underline-offset-2 hover:underline">Open full test board →</Link>
            </div>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Bug triage</h2>
              <Badge variant="outline" className="border-rose-500/30 text-[10px] text-rose-300">{openP0Bugs} P0 open</Badge>
            </div>
            <div className="space-y-1.5">
              {[...BUGS].sort((a, b) => (a.priority < b.priority ? -1 : 1)).map((b) => (
                <div key={b.id} className="rounded border border-white/5 bg-black/20 p-2 text-[11px]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[9px] text-muted-foreground">{b.id}</span>
                    <Pill tone={b.severity === "critical" ? "rose" : b.severity === "high" ? "amber" : "muted"}>{b.severity}</Pill>
                    <Pill tone={b.priority === "P0" ? "rose" : b.priority === "P1" ? "amber" : "muted"}>{b.priority}</Pill>
                    <Pill tone="sky">{b.status}</Pill>
                    {b.gate && <Pill tone="rose">gate</Pill>}
                    <span className="ml-auto text-[10px] text-muted-foreground">{b.daysOpen}d open</span>
                  </div>
                  <div className="mt-0.5">{b.title}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {b.workflow} · {b.role}{b.assignee ? ` · @${b.assignee}` : ""}
                    {b.related_test && <> · ↳ {b.related_test}</>}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-4 mb-1.5 text-xs font-semibold text-rose-200">Pilot launch blocker rules</h3>
            <ul className="space-y-0.5 text-[10px] text-muted-foreground">
              {PILOT_BLOCKERS.map((b) => (
                <li key={b.id} className="flex gap-1.5">
                  <span className={b.severity === "stop" ? "text-rose-400" : "text-amber-400"}>{b.severity === "stop" ? "■" : "▲"}</span>
                  <span className={b.triggered ? "text-rose-200" : ""}>{b.rule}{b.triggered ? " — TRIGGERED" : ""}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* RLS + Setup + Training/Support */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="size-4 text-teal-300" /> RLS validation</h2>
            <ul className="space-y-1 text-[11px] text-muted-foreground">
              <li>· Cross-company data isolation</li>
              <li>· Driver-only data access</li>
              <li>· Customer-only shipment access</li>
              <li>· Dispatcher company access</li>
              <li>· Storage bucket policies (proof-of-delivery)</li>
              <li>· Service role never client-side</li>
              <li>· Audit logs on sensitive actions</li>
            </ul>
            <p className="mt-2 text-[10px] text-rose-300/80">BUG-021: customer portal RLS — must pass before go-live.</p>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold"><Users className="size-4 text-teal-300" /> Pilot company setup</h2>
            <ol className="space-y-0.5 text-[11px] text-muted-foreground">
              <li>1. Create company + admin</li>
              <li>2. Add 2 dispatchers</li>
              <li>3. Add 5–15 drivers</li>
              <li>4. Add 5–20 vehicles</li>
              <li>5. Add 1–3 customers</li>
              <li>6. Assign drivers ↔ vehicles</li>
              <li>7. Seed 5 test loads</li>
              <li>8. Configure notifications</li>
              <li>9. Enable customer portal</li>
              <li>10. Confirm go-live date</li>
            </ol>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold"><Stethoscope className="size-4 text-teal-300" /> Training + Support</h2>
            <div className="text-[11px] text-muted-foreground">
              <div className="font-medium text-foreground/80">Training paths</div>
              <ul className="mt-0.5 space-y-0.5">
                <li>· Company admin · 6 modules</li>
                <li>· Dispatcher · 8 modules</li>
                <li>· Driver · 9 modules</li>
                <li>· Customer · 5 modules</li>
              </ul>
              <div className="mt-2 font-medium text-foreground/80">Support</div>
              <ul className="mt-0.5 space-y-0.5">
                <li>· In-app ticket queue</li>
                <li>· Email + phone escalation placeholders</li>
                <li>· Known issues board + FAQ</li>
                <li>· Escalation L1 → L5 (pilot stop)</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Go-live phases */}
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold"><MapIcon className="size-4 text-teal-300" /> Go-live plan</h2>
          <div className="grid gap-2 md:grid-cols-2">
            {GO_LIVE_PHASES.map((p) => (
              <div key={p.id} className="rounded border border-white/5 bg-black/20 p-2.5 text-[11px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{p.phase}</span>
                  <span className={`rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${READINESS_TONE[p.status]}`}>
                    {READINESS_LABEL[p.status]}
                  </span>
                </div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">owner: {p.owner}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">✓ {p.success}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* First live load wizard */}
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">First live load — 12-step wizard</h2>
            <Badge variant="outline" className="border-white/15 text-[10px] text-muted-foreground">
              {FIRST_LIVE_LOAD_STEPS.filter(s => s.status === "done").length} / {FIRST_LIVE_LOAD_STEPS.length} done
            </Badge>
          </div>
          <ol className="grid gap-1 text-[11px] text-muted-foreground md:grid-cols-2">
            {FIRST_LIVE_LOAD_STEPS.map((s, i) => (
              <li key={s.id} className={`rounded border p-2 ${s.status === "done" ? "border-emerald-500/20 bg-emerald-500/5" : s.status === "in_progress" ? "border-sky-500/20 bg-sky-500/5" : s.status === "blocked" ? "border-rose-500/30 bg-rose-500/5" : "border-white/5 bg-black/20"}`}>
                <span className="font-mono text-[9px] text-teal-300">{String(i + 1).padStart(2, "0")}</span>{" "}
                {s.step} <span className="text-[10px] text-muted-foreground">— {s.owner}</span>
                {s.note && <div className="text-[10px] text-rose-300/80">↳ {s.note}</div>}
              </li>
            ))}
          </ol>
        </Card>

        {/* Metrics + Acceptance */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="mb-2 text-sm font-semibold">Pilot success metrics</h2>
            <div className="space-y-1">
              {PILOT_METRICS_DEFS.map((m) => (
                <div key={m.id} className="flex items-center justify-between gap-2 rounded border border-white/5 bg-black/20 p-2 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${m.onTrack ? "bg-emerald-400" : "bg-rose-400"}`} />
                    {m.name}
                  </span>
                  <span className="text-muted-foreground">target {m.target} · now {m.current}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="mb-2 text-sm font-semibold">Pilot acceptance checklist</h2>
            <ul className="space-y-1 text-[11px]">
              {ACCEPTANCE_CRITERIA.map((c) => (
                <li key={c.id} className="flex items-center gap-2 rounded border border-white/5 bg-black/20 p-2">
                  {c.met
                    ? <CheckCircle2 className="size-3.5 text-emerald-400" />
                    : <XCircle className="size-3.5 text-rose-400" />}
                  <span className="font-mono text-[9px] text-muted-foreground">{c.id}</span>
                  <span className={c.met ? "" : "text-muted-foreground"}>{c.criterion}</span>
                  {c.gate && <Badge variant="outline" className="ml-auto border-rose-500/30 text-[9px] text-rose-300">gate</Badge>}
                </li>
              ))}
            </ul>
            <div className={`mt-3 rounded-lg border p-3 text-[11px] ${gng.gateReady ? "border-teal-500/30 bg-teal-500/5 text-teal-100" : "border-rose-500/30 bg-rose-500/5 text-rose-100"}`}>
              Hard gates: <strong>{gng.gateMet} / {gng.gateTotal}</strong> ·
              All criteria: <strong>{gng.met} / {gng.total}</strong> · Decision: <strong>{gate.ready ? "GO" : "NO-GO"}</strong>
            </div>
          </Card>
        </div>

        {/* Docs map */}
        <Card className="border-teal-500/30 bg-teal-500/5 p-4 text-xs text-muted-foreground">
          <div className="mb-2 font-medium text-teal-200">Phase 13 reference docs</div>
          <ul className="space-y-0.5">
            <li>· <code className="rounded bg-black/30 px-1 py-0.5 text-[10px] text-teal-200/80">docs/phase13-plan.md</code> — overall plan</li>
            <li>· <code className="rounded bg-black/30 px-1 py-0.5 text-[10px] text-teal-200/80">docs/phase13-schema.sql</code> — pilot tables</li>
            <li>· <code className="rounded bg-black/30 px-1 py-0.5 text-[10px] text-teal-200/80">docs/phase13-rls.sql</code> — RLS examples</li>
            <li>· <code className="rounded bg-black/30 px-1 py-0.5 text-[10px] text-teal-200/80">docs/phase13-edge-function-plan.md</code> — pilot Edge Functions</li>
            <li>· <code className="rounded bg-black/30 px-1 py-0.5 text-[10px] text-teal-200/80">docs/phase14-plan.md</code> — post-pilot V1 handoff</li>
            <li>· <code className="rounded bg-black/30 px-1 py-0.5 text-[10px] text-teal-200/80">docs/qa/pilot-smoke-test.md</code> — smoke test runbook</li>
          </ul>
          <div className="mt-2">
            See also <Link to="/build/phase12-overview" className="text-teal-300 underline-offset-2 hover:underline">/build/phase12-overview</Link>{" "}
            and <Link to="/mvp/pilot" className="text-teal-300 underline-offset-2 hover:underline">/mvp/pilot</Link>.
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function ScoreTile({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "teal" | "amber" | "rose" }) {
  const tones = {
    teal: "border-teal-500/30 bg-teal-500/5 text-teal-200",
    amber: "border-amber-500/30 bg-amber-500/5 text-amber-200",
    rose: "border-rose-500/30 bg-rose-500/5 text-rose-200",
  };
  return (
    <div className={`rounded-lg border p-3 ${tones[tone]}`}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider opacity-80">{icon}{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function Pill({ tone, children }: { tone: "emerald" | "rose" | "amber" | "sky" | "muted"; children: React.ReactNode }) {
  const tones = {
    emerald: "border-emerald-500/30 text-emerald-300 bg-emerald-500/5",
    rose: "border-rose-500/30 text-rose-300 bg-rose-500/5",
    amber: "border-amber-500/30 text-amber-300 bg-amber-500/5",
    sky: "border-sky-500/30 text-sky-300 bg-sky-500/5",
    muted: "border-white/15 text-muted-foreground bg-white/[0.02]",
  };
  return <span className={`rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${tones[tone]}`}>{children}</span>;
}
