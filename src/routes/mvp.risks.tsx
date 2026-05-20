import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_RISKS } from "@/mvp/data/mockMvp";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/mvp/risks")({
  head: () => ({ meta: [{ title: "Product Risks — Anderoute" }] }),
  component: Risks,
});

const SEV: Record<string, string> = {
  H: "border-rose-500/30 text-rose-200",
  M: "border-amber-500/30 text-amber-200",
  L: "border-white/15 text-muted-foreground",
};

function Risks() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Risks</Badge>
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Product Risk Register</h1>
          </div>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="divide-y divide-white/5 text-sm">
            {PRODUCT_RISKS.map((r) => (
              <div key={r.risk} className="grid grid-cols-12 items-center gap-2 py-2">
                <div className="col-span-4">{r.risk}</div>
                <div className="col-span-1"><Badge variant="outline" className={SEV[r.like]}>L:{r.like}</Badge></div>
                <div className="col-span-1"><Badge variant="outline" className={SEV[r.imp]}>I:{r.imp}</Badge></div>
                <div className="col-span-6 text-xs text-muted-foreground">→ {r.mit}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
