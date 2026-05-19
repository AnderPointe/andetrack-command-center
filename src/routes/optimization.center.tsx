import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EnterpriseNav } from "@/components/enterprise/EnterpriseNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { rankSuggestedDrivers, detectAtRiskDeliveries, MOCK_DRIVERS, MOCK_LOADS } from "@/enterprise/services/optimizationEngine";
import type { SuggestedAssignment } from "@/enterprise/types";
import { Sparkles, Truck, AlertTriangle, RefreshCw, Info } from "lucide-react";

export const Route = createFileRoute("/optimization/center")({
  head: () => ({ meta: [{ title: "Optimization Center — Anderoute" }] }),
  component: OptimizationCenter,
});

/** Per-factor 0-100 contributions for the explanation panel. */
function breakdown(s: SuggestedAssignment) {
  return [
    { label: "Vehicle match",  value: s.vehicleMatch ? 100 : 20, tone: s.vehicleMatch ? "bg-emerald-500" : "bg-rose-500" },
    { label: "CDL match",      value: s.cdlMatch ? 100 : 0,      tone: s.cdlMatch ? "bg-emerald-500" : "bg-rose-500" },
    { label: "Deadhead",       value: Math.max(0, 100 - s.deadheadMiles / 2),     tone: "bg-teal-500" },
    { label: "On-time prob",   value: Math.round(s.onTimeProbability * 100),       tone: "bg-teal-400" },
    { label: "Risk (inverse)", value: 100 - s.riskScore, tone: s.riskScore > 50 ? "bg-amber-500" : "bg-emerald-500" },
  ];
}

function OptimizationCenter() {
  const [loadId, setLoadId] = useState(MOCK_LOADS[0].id);
  const [expanded, setExpanded] = useState<string | null>(null);
  const load = MOCK_LOADS.find((l) => l.id === loadId)!;
  const ranked = rankSuggestedDrivers(MOCK_DRIVERS, load);
  const atRisk = detectAtRiskDeliveries(ranked);
  const top = ranked[0];

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <EnterpriseNav />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Optimization Center</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Best-driver scoring, deadhead, ETA confidence, route risk, and at-risk deliveries.</p>
          </div>
          <Button size="sm" variant="outline"><RefreshCw className="size-3.5 mr-1.5" />Re-run engine</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Unassigned loads</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-teal-300">{MOCK_LOADS.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Drivers available</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-emerald-300">{MOCK_DRIVERS.filter((d) => d.available).length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">At-risk matches</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-amber-300">{atRisk.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Top match score</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-teal-300">{top?.matchScore ?? "—"}</div>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Select unassigned load</h2>
          <div className="flex flex-wrap gap-2">
            {MOCK_LOADS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLoadId(l.id)}
                className={`rounded-md border px-3 py-2 text-xs text-left ${loadId === l.id ? "border-teal-400/50 bg-teal-500/10 text-teal-100" : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Suggested assignments</h2>
            <Badge variant="outline" className="text-[10px]"><Sparkles className="size-3 mr-1" />CoPilot ranked</Badge>
          </div>
          <div className="space-y-3">
            {ranked.map((s, idx) => {
              const isOpen = expanded === s.driverId;
              return (
                <div key={s.driverId} className={`rounded-lg border p-4 ${idx === 0 ? "border-teal-400/40 bg-teal-500/[0.04]" : "border-white/5 bg-white/[0.02]"}`}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full size-10 bg-white/5 flex items-center justify-center"><Truck className="size-5 text-teal-300" /></div>
                      <div>
                        <div className="font-medium">{s.driverName} {idx === 0 && <span className="ml-2 text-[10px] uppercase tracking-wider text-teal-300">Top pick</span>}</div>
                        <div className="text-xs text-muted-foreground">{s.explanation}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold tabular-nums text-teal-300">{s.matchScore}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">match score</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
                    <div><div className="text-muted-foreground">Deadhead</div><div className="font-semibold tabular-nums">{s.deadheadMiles} mi</div></div>
                    <div><div className="text-muted-foreground">ETA pickup</div><div className="font-semibold tabular-nums">{s.etaToPickupMin} min</div></div>
                    <div><div className="text-muted-foreground">On-time prob</div><div className="font-semibold tabular-nums">{Math.round(s.onTimeProbability * 100)}%</div></div>
                    <div><div className="text-muted-foreground">Risk</div><div className={`font-semibold tabular-nums ${s.riskScore > 50 ? "text-amber-300" : "text-emerald-300"}`}>{s.riskScore}</div></div>
                    <div><div className="text-muted-foreground">Fuel est.</div><div className="font-semibold tabular-nums">${s.estimatedFuelCost}</div></div>
                    <div><div className="text-muted-foreground">CDL/Vehicle</div><div className="font-semibold">{s.cdlMatch ? "✓" : "✗"} / {s.vehicleMatch ? "✓" : "✗"}</div></div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 rounded-md border border-white/5 bg-slate-950/40 p-3">
                      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                        <Info className="size-3" /> Score breakdown
                      </div>
                      <div className="space-y-2">
                        {breakdown(s).map((b) => (
                          <div key={b.label}>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-muted-foreground">{b.label}</span>
                              <span className="tabular-nums">{Math.round(b.value)}</span>
                            </div>
                            <div className="mt-0.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <div className={`h-full ${b.tone}`} style={{ width: `${Math.max(0, Math.min(100, b.value))}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Assign</Button>
                    <Button size="sm" variant="outline">Offer</Button>
                    <Button size="sm" variant="ghost" onClick={() => setExpanded(isOpen ? null : s.driverId)}>
                      {isOpen ? "Hide breakdown" : "Why this score?"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {atRisk.length > 0 && (
          <Card className="p-5 border-amber-500/30">
            <div className="flex items-center gap-2 mb-2"><AlertTriangle className="size-4 text-amber-300" /><h2 className="text-sm font-semibold uppercase tracking-wider text-amber-200">At-risk matches</h2></div>
            <ul className="space-y-1 text-sm">
              {atRisk.map((s) => (
                <li key={s.driverId} className="text-muted-foreground">
                  <span className="text-foreground">{s.driverName}</span> — risk {s.riskScore}, on-time {Math.round(s.onTimeProbability * 100)}%
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
