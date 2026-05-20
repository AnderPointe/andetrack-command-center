import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hammer, CheckCircle2, Circle, AlertTriangle, Sparkles, MinusCircle, Filter } from "lucide-react";
import {
  PHASE12_GROUPS,
  PHASE12_STATUS_LABEL,
  PHASE12_STATUS_TONE,
  PHASE12_PRIORITY_TONE,
  type BuildStatus,
  type BuildPriority,
} from "@/build/data/mockPhase12";

export const Route = createFileRoute("/build/phase12-overview")({
  head: () => ({
    meta: [
      { title: "Phase 12 — MVP Build Execution · Anderoute" },
      { name: "description", content: "Phase 12 turns the Anderoute plan into a working pilot MVP: repo cleanup, Supabase migration, workflow wiring, demo mode, QA, deployment." },
    ],
  }),
  component: Phase12Overview,
});

const STATUS_ICON: Record<BuildStatus, typeof Circle> = {
  built: CheckCircle2,
  partial: AlertTriangle,
  planned: Circle,
  mocked: Sparkles,
  deferred: MinusCircle,
};

const STATUS_KEYS: BuildStatus[] = ["built", "partial", "planned", "mocked", "deferred"];
const PRIORITY_KEYS: BuildPriority[] = ["P0", "P1", "P2"];

function Phase12Overview() {
  const [statusFilter, setStatusFilter] = useState<Set<BuildStatus>>(new Set(STATUS_KEYS));
  const [priorityFilter, setPriorityFilter] = useState<Set<BuildPriority | "none">>(
    new Set([...PRIORITY_KEYS, "none"]),
  );

  const allItems = useMemo(() => PHASE12_GROUPS.flatMap((g) => g.items), []);
  const totals = useMemo(
    () =>
      allItems.reduce<Record<BuildStatus, number>>(
        (acc, it) => ({ ...acc, [it.status]: (acc[it.status] ?? 0) + 1 }),
        { built: 0, partial: 0, planned: 0, mocked: 0, deferred: 0 },
      ),
    [allItems],
  );
  const priorityTotals = useMemo(
    () =>
      allItems.reduce<Record<BuildPriority | "none", number>>(
        (acc, it) => {
          const k = (it.priority ?? "none") as BuildPriority | "none";
          return { ...acc, [k]: (acc[k] ?? 0) + 1 };
        },
        { P0: 0, P1: 0, P2: 0, none: 0 },
      ),
    [allItems],
  );

  const p0Done = allItems.filter((it) => it.priority === "P0" && it.status === "built").length;
  const p0Total = priorityTotals.P0;
  const readiness = p0Total === 0 ? 0 : Math.round((p0Done / p0Total) * 100);

  const toggle = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 12</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Implementation · Pilot MVP</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">No new enterprise features</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Hammer className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Phase 12 — MVP Build Execution</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Stop adding features. Build the actual pilot. Login → drivers → vehicles → customers →
            load → offer → accept → status → live GPS → shipment → POD → audit. Repo cleanup,
            Supabase migration, RLS, seed data, demo mode, QA, deployment.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="rounded-lg border border-teal-500/30 bg-teal-500/5 px-3 py-2 text-xs">
              <div className="text-[10px] uppercase tracking-wider text-teal-300/80">Pilot readiness (P0 built)</div>
              <div className="mt-0.5 text-base font-semibold text-teal-200">{p0Done} / {p0Total} <span className="text-xs text-muted-foreground">· {readiness}%</span></div>
            </div>
            <div className="h-1.5 flex-1 min-w-[120px] max-w-xs overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-teal-400/70 transition-all" style={{ width: `${readiness}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Filter className="size-3.5 text-muted-foreground" />
            <span className="mr-1 text-[10px] uppercase tracking-wider text-muted-foreground">Status</span>
            {STATUS_KEYS.map((k) => {
              const active = statusFilter.has(k);
              return (
                <button
                  key={k}
                  onClick={() => toggle(statusFilter, k, setStatusFilter)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition ${PHASE12_STATUS_TONE[k]} ${active ? "" : "opacity-40"}`}
                >
                  {PHASE12_STATUS_LABEL[k]} · {totals[k]}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="ml-5 mr-1 text-[10px] uppercase tracking-wider text-muted-foreground">Priority</span>
            {PRIORITY_KEYS.map((p) => {
              const active = priorityFilter.has(p);
              return (
                <button
                  key={p}
                  onClick={() => toggle(priorityFilter, p, setPriorityFilter)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition ${PHASE12_PRIORITY_TONE[p]} ${active ? "" : "opacity-40"}`}
                >
                  {p} · {priorityTotals[p]}
                </button>
              );
            })}
            <button
              onClick={() => toggle(priorityFilter, "none", setPriorityFilter)}
              className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground transition ${priorityFilter.has("none") ? "" : "opacity-40"}`}
            >
              unscoped · {priorityTotals.none}
            </button>
          </div>
        </header>

        <section className="space-y-4">
          {PHASE12_GROUPS.map((group) => {
            const visible = group.items.filter(
              (it) =>
                statusFilter.has(it.status) &&
                priorityFilter.has((it.priority ?? "none") as BuildPriority | "none"),
            );
            if (visible.length === 0) return null;

            return (
              <Card key={group.key} className="border-white/10 bg-white/[0.02] p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
                    <p className="text-xs text-muted-foreground">{group.blurb}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 border-white/15 text-[10px] text-muted-foreground">
                    {visible.length} / {group.items.length}
                  </Badge>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  {visible.map((item) => {
                    const Icon = STATUS_ICON[item.status];
                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-black/20 p-3"
                      >
                        <Icon className={`mt-0.5 size-4 shrink-0 ${PHASE12_STATUS_TONE[item.status].split(" ")[1] ?? ""}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono text-muted-foreground">{item.id}</span>
                            <span className="text-xs font-medium text-foreground">{item.area}</span>
                            <span className={`rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${PHASE12_STATUS_TONE[item.status]}`}>
                              {PHASE12_STATUS_LABEL[item.status]}
                            </span>
                            {item.priority && (
                              <span className={`rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${PHASE12_PRIORITY_TONE[item.priority]}`}>
                                {item.priority}
                              </span>
                            )}
                            {item.owner && (
                              <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                                {item.owner}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-[11px] text-muted-foreground">{item.result}</p>
                          {item.acceptance && item.acceptance.length > 0 && (
                            <ul className="mt-1.5 space-y-0.5 text-[10px] text-muted-foreground/80">
                              {item.acceptance.map((a) => (
                                <li key={a} className="flex gap-1.5">
                                  <span className="text-teal-400/70">✓</span>
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {item.notes && (
                            <p className="mt-1 text-[10px] text-muted-foreground/70">{item.notes}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </section>

        <Card className="border-teal-500/30 bg-teal-500/5 p-4 text-xs text-muted-foreground">
          <div className="mb-2 font-medium text-teal-200">Phase 13 preview</div>
          MVP testing, bug fixing, pilot onboarding, first live pilot rollout. See{" "}
          <Link to="/mvp/overview" className="text-teal-300 underline-offset-2 hover:underline">
            /mvp/overview
          </Link>{" "}
          for the Phase 11 plan that Phase 12 is executing against. Polish notes:{" "}
          <code className="rounded bg-black/30 px-1 py-0.5 text-[10px] text-teal-200/80">docs/phase12-polish.md</code>.
        </Card>
      </div>
    </AppShell>
  );
}
