import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { READINESS, POSITIONING } from "@/launch/data/mockLaunch";
import { Rocket, CheckCircle2, Clock, AlertTriangle, Circle } from "lucide-react";

export const Route = createFileRoute("/launch/overview")({
  head: () => ({ meta: [{ title: "Product Launch Center — Anderoute" }] }),
  component: LaunchOverview,
});

const ICONS = {
  ready: CheckCircle2, in_progress: Clock, blocked: AlertTriangle, not_started: Circle,
} as const;
const COLORS = {
  ready: "text-emerald-300", in_progress: "text-amber-300",
  blocked: "text-rose-300", not_started: "text-muted-foreground",
} as const;

function LaunchOverview() {
  const overall = Math.round(READINESS.reduce((s, r) => s + r.score, 0) / READINESS.length);
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Mock / demo</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Rocket className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Product Launch Center</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">{POSITIONING.oneLiner}</p>
          <LaunchNav />
        </header>

        <Card className="border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-transparent p-5">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Overall launch readiness</div>
              <div className="mt-1 text-4xl font-semibold text-teal-200">{overall}<span className="text-base text-muted-foreground"> / 100</span></div>
            </div>
            <Badge variant="outline" className="border-teal-500/30 text-teal-200">Pilot-ready</Badge>
          </div>
          <Progress value={overall} className="mt-4" />
          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
            {(["ready","in_progress","blocked","not_started"] as const).map((s) => {
              const n = READINESS.filter((r) => r.status === s).length;
              return (
                <div key={s} className="rounded border border-white/10 bg-white/[0.02] p-2">
                  <div className={`text-lg font-semibold ${COLORS[s]}`}>{n}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.replace("_"," ")}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {READINESS.map((r) => {
            const Icon = ICONS[r.status];
            return (
              <Card key={r.id} className="border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`size-4 ${COLORS[r.status]}`} />
                    <h3 className="text-sm font-medium">{r.area}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.score}%</span>
                </div>
                <Progress value={r.score} className="mt-3 h-1.5" />
                <p className="mt-2 text-xs text-muted-foreground">{r.notes}</p>
              </Card>
            );
          })}
        </section>

        <Card className="border-amber-500/20 bg-amber-500/[0.03] p-4">
          <h3 className="text-sm font-medium text-amber-200">Top blockers to GA</h3>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {[...READINESS].sort((a,b) => a.score - b.score).slice(0, 4).map((r) => (
              <li key={r.id}>· <span className="text-foreground">{r.area}</span> ({r.score}%) — {r.notes}</li>
            ))}
          </ul>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Phase 10 packages Anderoute for customers, owners, and investors.
          Next: <Link to="/launch/demo" className="text-teal-300 underline-offset-4 hover:underline">guided demo mode →</Link>
        </Card>
      </div>
    </AppShell>
  );
}
