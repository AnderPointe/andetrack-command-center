import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEATURE_MATRIX } from "@/mvp/data/mockMvp";
import { Table2 } from "lucide-react";

export const Route = createFileRoute("/mvp/feature-matrix")({
  head: () => ({ meta: [{ title: "MVP Feature Matrix — Anderoute" }] }),
  component: FeatureMatrix,
});

const STATUS_TONE = {
  build: "border-emerald-500/30 text-emerald-200",
  mock:  "border-amber-500/30 text-amber-200",
  defer: "border-rose-500/30 text-rose-200",
} as const;
const PRIORITY_TONE = {
  P0: "border-rose-500/30 text-rose-200",
  P1: "border-amber-500/30 text-amber-200",
  P2: "border-blue-500/30 text-blue-200",
  P3: "border-white/15 text-muted-foreground",
} as const;

function FeatureMatrix() {
  const cats = Array.from(new Set(FEATURE_MATRIX.map((f) => f.category)));
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Matrix</Badge>
          <div className="flex items-center gap-3">
            <Table2 className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">MVP Feature Matrix</h1>
          </div>
          <MvpNav />
        </header>

        {cats.map((cat) => (
          <Card key={cat} className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-medium text-cyan-200">{cat}</h3>
            <div className="mt-3 divide-y divide-white/5 text-sm">
              {FEATURE_MATRIX.filter((f) => f.category === cat).map((f) => (
                <div key={f.feature} className="grid grid-cols-12 items-center gap-2 py-2">
                  <div className="col-span-5">{f.feature}</div>
                  <div className="col-span-2"><Badge variant="outline" className={STATUS_TONE[f.status]}>{f.status}</Badge></div>
                  <div className="col-span-1"><Badge variant="outline" className={PRIORITY_TONE[f.priority]}>{f.priority}</Badge></div>
                  <div className="col-span-2 text-xs text-muted-foreground">{f.owner} · {f.complexity}</div>
                  <div className="col-span-2 text-right text-xs text-muted-foreground">{f.pilot ? "Pilot ✓" : "—"}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
