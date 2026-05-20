import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_METRICS, PILOT_TRACKS } from "@/launch/data/mockLaunch";
import { Users } from "lucide-react";

export const Route = createFileRoute("/launch/pilot")({
  head: () => ({ meta: [{ title: "Pilot Program — Anderoute" }] }),
  component: Pilot,
});

const PHASES = [
  { name: "Internal alpha",        goal: "Validate core flows with internal team",   exit: "All P0 bugs resolved" },
  { name: "Closed pilot",          goal: "2–3 friendly customers, hands-on support", exit: "Weekly NPS ≥ 4" },
  { name: "Design partner program",goal: "5–10 design partners shape roadmap",       exit: "3 published case studies" },
  { name: "Paid pilot",            goal: "Convert pilots to paid contracts",         exit: "≥ 60% paid conversion" },
  { name: "Public beta",           goal: "Self-serve sign-up with onboarding",       exit: "Stable for 30 days" },
  { name: "General availability",  goal: "Full launch, marketing, sales motion",     exit: "GA SLA met" },
];

const PILOT_PACKAGE = [
  "30 / 60 / 90-day pilot options",
  "Up to 25 drivers and 5 dispatcher seats (default)",
  "Customer portal access included",
  "Weekly success check-ins",
  "Mid-pilot and final review",
  "Pilot pricing — TBD",
  "Clear conversion plan to paid tier",
];

function Pilot() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Pilot</Badge>
          <div className="flex items-center gap-3">
            <Users className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Pilot Program</h1>
          </div>
          <LaunchNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Launch phases</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {PHASES.map((p) => (
              <div key={p.name} className="rounded border border-white/10 bg-white/[0.01] p-3">
                <div className="text-sm font-medium text-teal-200">{p.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">Goal: {p.goal}</div>
                <div className="text-xs text-muted-foreground">Exit: {p.exit}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Pilot tracks</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {PILOT_TRACKS.map((t) => (
              <div key={t.name} className="rounded border border-teal-500/20 bg-teal-500/[0.03] p-3">
                <div className="text-sm font-semibold text-teal-200">{t.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t.audience}</div>
                <div className="mt-2 text-xs"><span className="text-muted-foreground">Focus:</span> {t.focus}</div>
                <div className="text-xs"><span className="text-muted-foreground">Outcome:</span> {t.outcome}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Pilot package</h2>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {PILOT_PACKAGE.map((p) => <li key={p}>· {p}</li>)}
          </ul>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Success metrics</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {PILOT_METRICS.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.01] p-3 text-sm">
                <span>{m.name}</span>
                <Badge variant="outline" className="border-teal-500/30 text-teal-200">{m.target}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
