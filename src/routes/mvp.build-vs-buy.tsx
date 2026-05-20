import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BUILD_VS_BUY } from "@/mvp/data/mockMvp";
import { Scale } from "lucide-react";

export const Route = createFileRoute("/mvp/build-vs-buy")({
  head: () => ({ meta: [{ title: "Build vs Buy — Anderoute" }] }),
  component: BvB,
});

const TONE: Record<string, string> = {
  Build: "border-violet-500/30 text-violet-200",
  Buy:   "border-emerald-500/30 text-emerald-200",
  Defer: "border-rose-500/30 text-rose-200",
};

function BvB() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · BvB</Badge>
          <div className="flex items-center gap-3">
            <Scale className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Build vs Buy Matrix</h1>
          </div>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="divide-y divide-white/5 text-sm">
            {BUILD_VS_BUY.map((b) => (
              <div key={b.capability} className="grid grid-cols-12 items-center gap-2 py-2">
                <div className="col-span-3 text-cyan-200">{b.capability}</div>
                <div className="col-span-1"><Badge variant="outline" className={TONE[b.recommend]}>{b.recommend}</Badge></div>
                <div className="col-span-3 text-xs text-muted-foreground">{b.provider}</div>
                <div className="col-span-5 text-xs text-muted-foreground">{b.reason}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
