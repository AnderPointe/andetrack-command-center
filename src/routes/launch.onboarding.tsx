import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ONBOARDING_STAGES, ONBOARDING_PHASES } from "@/launch/data/mockLaunch";
import { ClipboardCheck, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/launch/onboarding")({
  head: () => ({ meta: [{ title: "Customer Onboarding — Anderoute" }] }),
  component: Onboarding,
});

const WIZARDS = [
  "Company setup wizard", "User invite wizard", "Driver import wizard",
  "Vehicle import wizard", "Customer import wizard", "Load setup wizard",
  "Driver app setup guide", "Customer portal setup guide",
  "Integration setup checklist", "Go-live checklist",
];

function Onboarding() {
  const done = ONBOARDING_STAGES.filter((s) => s.done).length;
  const pct = Math.round((done / ONBOARDING_STAGES.length) * 100);
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Onboarding</Badge>
          <div className="flex items-center gap-3">
            <ClipboardCheck className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Customer Onboarding</h1>
          </div>
          <LaunchNav />
        </header>

        <Card className="border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-transparent p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Onboarding progress</div>
              <div className="mt-1 text-3xl font-semibold text-teal-200">{done} / {ONBOARDING_STAGES.length}</div>
            </div>
            <span className="text-sm text-muted-foreground">{pct}%</span>
          </div>
          <Progress value={pct} className="mt-4" />
        </Card>

        <div className="space-y-3">
          {ONBOARDING_PHASES.map((phase) => {
            const stages = ONBOARDING_STAGES.filter((s) => phase.stages.includes(s.id));
            const phaseDone = stages.filter((s) => s.done).length;
            return (
              <Card key={phase.phase} className="border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-teal-200">{phase.phase}</h3>
                  <span className="text-xs text-muted-foreground">{phaseDone} / {stages.length}</span>
                </div>
                <ol className="mt-3 grid gap-2 md:grid-cols-2">
                  {stages.map((s) => (
                    <li key={s.id} className="flex items-center gap-2 rounded border border-white/10 bg-white/[0.01] p-2.5 text-sm">
                      {s.done ? <CheckCircle2 className="size-4 text-emerald-300" /> : <Circle className="size-4 text-muted-foreground" />}
                      <span className={s.done ? "" : "text-muted-foreground"}>{s.label}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            );
          })}
        </div>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Wizards & checklists (scaffolded)</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {WIZARDS.map((w) => <Badge key={w} variant="outline" className="border-white/15">{w}</Badge>)}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Each wizard is a stub here; Phase 11 wires the import flows to Supabase tables and the integration hub.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
