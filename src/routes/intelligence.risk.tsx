import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Clock, User } from "lucide-react";
import { usePredictiveRisks } from "@/intelligence/hooks/useIntelligence";
import type { RiskLevel } from "@/intelligence/types";

export const Route = createFileRoute("/intelligence/risk")({
  head: () => ({ meta: [{ title: "Predictive Risk — Anderoute Intelligence" }] }),
  component: RiskPage,
});

const LEVEL_TONE: Record<RiskLevel, string> = {
  low:      "border-emerald-500/30 text-emerald-300",
  moderate: "border-amber-500/30 text-amber-300",
  high:     "border-orange-500/30 text-orange-300",
  critical: "border-rose-500/40 text-rose-300",
};

function RiskPage() {
  const { risks } = usePredictiveRisks();
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <ShieldAlert className="size-5 text-rose-300" />
            <h1 className="text-xl font-semibold">Predictive Risk Dashboard</h1>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Mock model</Badge>
          </div>
          <IntelligenceNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {risks.map((r) => (
            <Card key={r.id} className={`border bg-white/[0.02] p-4 ${LEVEL_TONE[r.risk_level]}`}>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={LEVEL_TONE[r.risk_level]}>{r.risk_level}</Badge>
                <span className="text-xs text-muted-foreground">score {r.risk_score} · {r.confidence}</span>
              </div>
              <h3 className="mt-2 text-sm font-medium text-foreground">{r.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1 text-[10px]">
                {r.reason_codes.map((c) => (
                  <span key={c} className="rounded border border-white/10 px-2 py-0.5 text-muted-foreground">{c.replace(/_/g, " ")}</span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1"><User className="size-3" /> {r.impacted_driver_name ?? "—"}</div>
                <div className="flex items-center gap-1"><Clock className="size-3" /> {r.time_sensitivity}</div>
              </div>
              <div className="mt-3 rounded border border-white/10 bg-black/20 p-2 text-xs">
                <span className="font-medium text-foreground">Recommended:</span>{" "}
                <span className="text-muted-foreground">{r.recommended_action}</span>
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground">
                Approval: <span className="text-foreground">{r.requires_approval}</span> · Est. impact:{" "}
                <span className="text-foreground">{r.estimated_impact_minutes ?? 0}m</span> · Cost (mock):{" "}
                <span className="text-foreground">${r.estimated_cost_impact ?? 0}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
