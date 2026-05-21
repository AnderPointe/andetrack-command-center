import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { OPT_SCENARIOS, SCENARIO_FACTORS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/scenarios")({
  head: () => ({ meta: [{ title: "Optimization Scenarios · Anderoute" }] }),
  component: () => (
    <V25Page icon={<GitBranch className="size-6 text-emerald-300" />} title="Optimization Scenario Planning" blurb="Simulate reassignments, delays, swaps, and prioritization. Compare ETA, risk, customer, miles, and workload impact before approving — every scenario shows the contributing factors.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Scenarios</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Scenario</th><th className="p-2">ETA Δ</th><th className="p-2">Risk Δ</th><th className="p-2">Customer</th><th className="p-2">Miles Δ</th><th className="p-2">Workload</th><th className="p-2"></th></tr></thead>
          <tbody>
            {OPT_SCENARIOS.map((s) => (
              <tr key={s.id} className="border-t border-white/10">
                <td className="p-2">{s.name}</td>
                <td className="p-2 font-mono text-xs">{s.etaImpactMin > 0 ? "+" : ""}{s.etaImpactMin}m</td>
                <td className="p-2 font-mono text-xs">{s.riskDelta > 0 ? "+" : ""}{s.riskDelta}</td>
                <td className="p-2 text-xs">{s.customerImpact}</td>
                <td className="p-2 font-mono text-xs">{s.milesDelta > 0 ? "+" : ""}{s.milesDelta}</td>
                <td className="p-2 text-xs">{s.workloadDelta}</td>
                <td className="p-2">{s.recommended ? <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">recommended</Badge> : <Badge variant="outline" className="border-white/15 text-muted-foreground">not advised</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-xs text-muted-foreground">All scenarios require dispatcher approval before execution.</div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Why these scenarios — contributing factors</h2>
        <div className="mt-3 space-y-3">
          {["sc_001","sc_003"].map((id) => (
            <div key={id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{id}</div>
              {SCENARIO_FACTORS.filter((f) => f.scenario === id).map((f, i) => (
                <div key={i} className="mt-2 flex items-center gap-3">
                  <div className="w-40">{f.factor}</div>
                  <Progress value={f.weight} className="h-1 flex-1" />
                  <div className="w-10 text-right font-mono text-xs">{f.weight}%</div>
                  <div className="w-72 text-xs text-muted-foreground">{f.signal}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </V25Page>
  ),
});
