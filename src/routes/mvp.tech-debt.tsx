import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TECH_DEBT } from "@/mvp/data/mockMvp";
import { Wrench } from "lucide-react";

export const Route = createFileRoute("/mvp/tech-debt")({
  head: () => ({ meta: [{ title: "Technical Debt — Anderoute" }] }),
  component: Debt,
});

const TONE: Record<string, string> = {
  P0: "border-rose-500/30 text-rose-200",
  P1: "border-amber-500/30 text-amber-200",
  P2: "border-blue-500/30 text-blue-200",
};

function Debt() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Cleanup</Badge>
          <div className="flex items-center gap-3">
            <Wrench className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Technical Debt Register</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            P0 items must close before pilot prod. P1 closes during Sprint 7 hardening.
          </p>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="divide-y divide-white/5 text-sm">
            {TECH_DEBT.map((d) => (
              <div key={d.id} className="grid grid-cols-12 items-center gap-2 py-2">
                <code className="col-span-1 text-xs text-muted-foreground">{d.id}</code>
                <div className="col-span-2 text-xs text-cyan-200">{d.area}</div>
                <div className="col-span-5">{d.item}</div>
                <div className="col-span-2 text-xs text-muted-foreground">{d.impact}</div>
                <div className="col-span-1"><Badge variant="outline" className={TONE[d.priority]}>{d.priority}</Badge></div>
                <div className="col-span-1 text-right text-xs text-muted-foreground">{d.effort}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
