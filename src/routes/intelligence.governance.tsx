import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { MockBadge } from "@/components/intelligence/MockBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollText, ShieldCheck, DollarSign, Wrench, AlertTriangle } from "lucide-react";
import {
  useAISafetyPolicy, useAIActionAudit, useAICostControls, useAIUsage,
  useMaintenanceRisk, usePredictiveModelRuns,
} from "@/intelligence/hooks/useIntelligence";

export const Route = createFileRoute("/intelligence/governance")({
  head: () => ({ meta: [{ title: "AI Governance — Anderoute Intelligence" }] }),
  component: GovernancePage,
});

function GovernancePage() {
  const { rules } = useAISafetyPolicy();
  const { events } = useAIActionAudit();
  const { total_cost_placeholder, budget_placeholder } = useAICostControls();
  const { usage } = useAIUsage();
  const { vehicles } = useMaintenanceRisk();
  const { runs } = usePredictiveModelRuns();

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <ScrollText className="size-5 text-slate-300" />
            <h1 className="text-xl font-semibold">AI Governance</h1>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Safety · Cost · Audit · Models</Badge>
            <MockBadge />
          </div>
          <p className="max-w-2xl text-xs text-muted-foreground">
            Safety policy is enforced platform-side and cannot be disabled by tenants.
            Every AI action is audited and budget-bounded.
          </p>
          <IntelligenceNav />
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="size-4 text-emerald-300" /> AI safety policy</div>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
              {rules.map((r) => <li key={r}>• {r}</li>)}
            </ul>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium"><DollarSign className="size-4 text-amber-300" /> AI cost & usage (placeholder)</div>
              <div className="text-xs text-muted-foreground">${total_cost_placeholder.toFixed(2)} of ${budget_placeholder}</div>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {usage.map((u) => (
                <div key={u.feature} className="flex items-center gap-2">
                  <div className="w-36 text-muted-foreground">{u.feature}</div>
                  <div className="flex-1 h-1.5 rounded bg-white/5 overflow-hidden">
                    <div className="h-full bg-violet-400/70" style={{ width: `${u.budget_pct}%` }} />
                  </div>
                  <div className="w-24 text-right text-muted-foreground">${u.cost_placeholder.toFixed(1)} · {u.calls_24h} calls</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4 lg:col-span-2">
            <div className="text-sm font-medium">AI action audit trail</div>
            <table className="mt-3 w-full text-xs">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-1 pr-3">When</th><th className="py-1 pr-3">Actor</th><th className="py-1 pr-3">Action</th><th className="py-1 pr-3">Approval</th><th className="py-1 pr-3">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-t border-white/5">
                    <td className="py-1.5 pr-3 text-muted-foreground">{new Date(e.at).toLocaleTimeString()}</td>
                    <td className="py-1.5 pr-3">{e.actor}</td>
                    <td className="py-1.5 pr-3">{e.action}</td>
                    <td className="py-1.5 pr-3 text-muted-foreground">{e.approval_level}</td>
                    <td className="py-1.5 pr-3">{e.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-sm font-medium"><Wrench className="size-4 text-orange-300" /> Predictive maintenance (placeholder)</div>
            <div className="mt-3 space-y-2 text-xs">
              {vehicles.map((v) => (
                <div key={v.vehicle_id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
                  <div><span className="font-medium">{v.unit}</span> · {v.mileage.toLocaleString()} mi · fuel {v.fuel_efficiency_trend}</div>
                  <div className="text-muted-foreground">risk {v.risk_score} · <span className="text-foreground">{v.level}</span></div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">Not real telematics. Requires connector data.</p>
          </Card>

          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-medium">Predictive model runs</div>
            <table className="mt-3 w-full text-xs">
              <thead className="text-left text-muted-foreground">
                <tr><th className="py-1 pr-3">Provider</th><th className="py-1 pr-3">Inputs</th><th className="py-1 pr-3">Outputs</th><th className="py-1 pr-3">Latency</th><th className="py-1 pr-3">Status</th></tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr key={r.id} className="border-t border-white/5">
                    <td className="py-1.5 pr-3">{r.model_provider}</td>
                    <td className="py-1.5 pr-3">{r.inputs_count}</td>
                    <td className="py-1.5 pr-3">{r.outputs_count}</td>
                    <td className="py-1.5 pr-3 text-muted-foreground">{r.duration_ms}ms</td>
                    <td className="py-1.5 pr-3">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
