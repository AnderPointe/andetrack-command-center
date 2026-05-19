import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { MockBadge } from "@/components/intelligence/MockBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Clock, User, AlertOctagon, AlertTriangle, Activity } from "lucide-react";
import { useMemo, useState } from "react";
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

const LEVELS: (RiskLevel | "all")[] = ["all", "critical", "high", "moderate", "low"];

function RiskPage() {
  const { risks } = usePredictiveRisks();
  const [filter, setFilter] = useState<RiskLevel | "all">("all");

  const counts = useMemo(() => ({
    critical: risks.filter((r) => r.risk_level === "critical").length,
    high:     risks.filter((r) => r.risk_level === "high").length,
    moderate: risks.filter((r) => r.risk_level === "moderate").length,
    low:      risks.filter((r) => r.risk_level === "low").length,
  }), [risks]);

  const visible = useMemo(
    () => risks.filter((r) => filter === "all" || r.risk_level === filter).sort((a, b) => b.risk_score - a.risk_score),
    [risks, filter],
  );

  const exposure = risks.reduce((a, r) => a + (r.estimated_cost_impact ?? 0), 0);
  const minutesAtRisk = risks.reduce((a, r) => a + (r.estimated_impact_minutes ?? 0), 0);

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <ShieldAlert className="size-5 text-rose-300" />
            <h1 className="text-xl font-semibold">Predictive Risk Dashboard</h1>
            <MockBadge />
          </div>
          <p className="max-w-2xl text-xs text-muted-foreground">
            Loads, drivers, vehicles, and customers scored against signals from GPS,
            compliance, route corridors, and delivery windows. Scores are explainable,
            confidence-labeled, and never auto-act without human approval.
          </p>
          <IntelligenceNav />
        </header>

        <div className="grid gap-3 md:grid-cols-4">
          <Summary icon={AlertOctagon} tone="text-rose-300"   label="Critical"        value={counts.critical} sub="needs action now" />
          <Summary icon={AlertTriangle} tone="text-orange-300" label="High + moderate" value={counts.high + counts.moderate} sub={`${counts.high} high · ${counts.moderate} moderate`} />
          <Summary icon={Clock}        tone="text-amber-300"  label="Minutes at risk" value={`${minutesAtRisk}m`} sub="across active risks" />
          <Summary icon={Activity}     tone="text-violet-300" label="Cost exposure"   value={`$${exposure.toLocaleString()}`} sub="placeholder" />
        </div>

        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
                filter === l ? "border-white/30 bg-white/10 text-foreground" : "border-white/10 text-muted-foreground hover:bg-white/5"
              }`}
            >
              {l}{l !== "all" && ` (${counts[l as RiskLevel]})`}
            </button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((r) => (
            <Card key={r.id} className={`border bg-white/[0.02] p-4 ${LEVEL_TONE[r.risk_level]}`}>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={LEVEL_TONE[r.risk_level]}>{r.risk_level}</Badge>
                <span className="text-xs text-muted-foreground">score {r.risk_score} · {r.confidence}</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded bg-white/5 overflow-hidden">
                <div
                  className={`h-full ${r.risk_level === "critical" ? "bg-rose-400" : r.risk_level === "high" ? "bg-orange-400" : r.risk_level === "moderate" ? "bg-amber-400" : "bg-emerald-400"}`}
                  style={{ width: `${r.risk_score}%` }}
                />
              </div>
              <h3 className="mt-3 text-sm font-medium text-foreground">{r.title}</h3>
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
          {visible.length === 0 && (
            <Card className="md:col-span-2 lg:col-span-3 border-white/10 bg-white/[0.02] p-6 text-center text-sm text-muted-foreground">
              No risks at this level.
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Summary({ icon: Icon, tone, label, value, sub }: { icon: any; tone: string; label: string; value: string | number; sub: string }) {
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
        <Icon className={`size-3.5 ${tone}`} /> {label}
      </div>
      <div className={`mt-1 text-2xl font-semibold ${tone}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </Card>
  );
}
