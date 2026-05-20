import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_STEPS } from "@/mvp/data/mockMvp";
import { PlayCircle } from "lucide-react";

export const Route = createFileRoute("/mvp/demo-script")({
  head: () => ({ meta: [{ title: "MVP Demo Script — Anderoute" }] }),
  component: Demo,
});

const DO_NOT_SHOW = [
  "Full AI automation",
  "Full EDI",
  "Full billing automation",
  "Android Auto",
  "CarPlay",
  "SOC 2 automation",
];

function Demo() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Demo</Badge>
          <div className="flex items-center gap-3">
            <PlayCircle className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">MVP Demo Script</h1>
          </div>
          <p className="text-xs text-muted-foreground">Pilot-only. Do not demo deferred features as production-ready.</p>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Demo flow</h3>
          <ol className="mt-3 space-y-2 text-sm">
            {DEMO_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3 rounded border border-white/10 bg-white/[0.01] p-2.5">
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-200">{i + 1}</Badge>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="border-rose-500/20 bg-rose-500/[0.03] p-4">
          <h3 className="text-sm font-medium text-rose-200">Do not show as production-ready</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {DO_NOT_SHOW.map((d) => <Badge key={d} variant="outline" className="border-rose-500/30 text-rose-200">{d}</Badge>)}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
