import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hammer, CheckCircle2, Circle, AlertTriangle, Sparkles, MinusCircle } from "lucide-react";
import {
  PHASE12_GROUPS,
  PHASE12_STATUS_LABEL,
  PHASE12_STATUS_TONE,
  type BuildStatus,
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

function Phase12Overview() {
  const totals = PHASE12_GROUPS.flatMap((g) => g.items).reduce<Record<BuildStatus, number>>(
    (acc, it) => ({ ...acc, [it.status]: (acc[it.status] ?? 0) + 1 }),
    { built: 0, partial: 0, planned: 0, mocked: 0, deferred: 0 },
  );

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

          <div className="flex flex-wrap gap-2 pt-1">
            {(Object.keys(totals) as BuildStatus[]).map((k) => (
              <span
                key={k}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] ${PHASE12_STATUS_TONE[k]}`}
              >
                {PHASE12_STATUS_LABEL[k]} · {totals[k]}
              </span>
            ))}
          </div>
        </header>

        <section className="space-y-4">
          {PHASE12_GROUPS.map((group) => (
            <Card key={group.key} className="border-white/10 bg-white/[0.02] p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
                  <p className="text-xs text-muted-foreground">{group.blurb}</p>
                </div>
                <Badge variant="outline" className="shrink-0 border-white/15 text-[10px] text-muted-foreground">
                  {group.items.length} item{group.items.length === 1 ? "" : "s"}
                </Badge>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                {group.items.map((item) => {
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
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">{item.result}</p>
                        {item.notes && (
                          <p className="mt-1 text-[10px] text-muted-foreground/70">{item.notes}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </section>

        <Card className="border-teal-500/30 bg-teal-500/5 p-4 text-xs text-muted-foreground">
          <div className="mb-2 font-medium text-teal-200">Phase 13 preview</div>
          MVP testing, bug fixing, pilot onboarding, first live pilot rollout. See{" "}
          <Link to="/mvp/overview" className="text-teal-300 underline-offset-2 hover:underline">
            /mvp/overview
          </Link>{" "}
          for the Phase 11 plan that Phase 12 is executing against.
        </Card>
      </div>
    </AppShell>
  );
}
