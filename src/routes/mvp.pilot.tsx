import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_CHECKLIST, PILOT_METRICS, PILOT_RISKS } from "@/mvp/data/mockMvp";
import { Users, Circle } from "lucide-react";

export const Route = createFileRoute("/mvp/pilot")({
  head: () => ({ meta: [{ title: "Pilot Launch — Anderoute" }] }),
  component: Pilot,
});

const PROFILE = [
  "1 logistics company",
  "1–3 dispatchers",
  "5–15 drivers",
  "5–20 vehicles",
  "1–3 customer portal users",
  "25–100 loads during pilot",
  "Duration: 30 days (extendable to 60/90)",
];

function Pilot() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Pilot</Badge>
          <div className="flex items-center gap-3">
            <Users className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">First Pilot Launch Plan</h1>
          </div>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Pilot profile</h3>
          <ul className="mt-2 grid gap-1 text-sm md:grid-cols-2">
            {PROFILE.map((p) => <li key={p}>· {p}</li>)}
          </ul>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Launch checklist</h3>
          <ul className="mt-3 grid gap-2 md:grid-cols-2 text-sm">
            {PILOT_CHECKLIST.map((c) => (
              <li key={c.id} className="flex items-center gap-2 rounded border border-white/10 bg-white/[0.01] p-2.5">
                <Circle className="size-4 text-muted-foreground" />
                <code className="text-xs text-muted-foreground">{c.id}</code>
                <span className="flex-1">{c.item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Success metrics</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {PILOT_METRICS.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.01] p-3 text-sm">
                <span>{m.name}</span>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-200">{m.target}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Risk register</h3>
          <div className="mt-3 divide-y divide-white/5 text-sm">
            {PILOT_RISKS.map((r) => (
              <div key={r.risk} className="grid grid-cols-12 items-center gap-2 py-2">
                <div className="col-span-4">{r.risk}</div>
                <div className="col-span-1 text-xs text-muted-foreground">L:{r.likelihood}</div>
                <div className="col-span-1 text-xs text-muted-foreground">I:{r.impact}</div>
                <div className="col-span-6 text-xs text-muted-foreground">→ {r.mitigation}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
