import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COST_ITEMS } from "@/mvp/data/mockMvp";
import { DollarSign } from "lucide-react";

export const Route = createFileRoute("/mvp/costs")({
  head: () => ({ meta: [{ title: "Cost Awareness — Anderoute" }] }),
  component: Costs,
});

function Costs() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Costs</Badge>
          <div className="flex items-center gap-3">
            <DollarSign className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Cost Model Worksheet</h1>
          </div>
          <p className="text-xs text-muted-foreground">Rough pilot-stage estimates. Refine per provider before GA.</p>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="divide-y divide-white/5 text-sm">
            {COST_ITEMS.map((c) => (
              <div key={c.item} className="grid grid-cols-12 items-center gap-2 py-2">
                <div className="col-span-4 text-cyan-200">{c.item}</div>
                <div className="col-span-2"><Badge variant="outline" className="border-emerald-500/30 text-emerald-200">{c.monthly}</Badge></div>
                <div className="col-span-6 text-xs text-muted-foreground">{c.notes}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
