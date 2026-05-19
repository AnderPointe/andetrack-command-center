import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BellRing } from "lucide-react";
import { usePrioritizedAlerts } from "@/intelligence/hooks/useIntelligence";

export const Route = createFileRoute("/intelligence/alerts")({
  head: () => ({ meta: [{ title: "Smart Alerts — Anderoute Intelligence" }] }),
  component: SmartAlerts,
});

const SEV: Record<string, string> = {
  info: "border-blue-500/30 text-blue-300",
  warning: "border-amber-500/30 text-amber-300",
  critical: "border-rose-500/40 text-rose-300",
};

function SmartAlerts() {
  const { alerts } = usePrioritizedAlerts();
  const sorted = [...alerts].sort((a, b) => b.impact_score - a.impact_score);
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <BellRing className="size-5 text-orange-300" />
            <h1 className="text-xl font-semibold">AI-Prioritized Alert Queue</h1>
          </div>
          <p className="text-xs text-muted-foreground">Ranked by impact score: severity, time sensitivity, customer priority, safety, compliance.</p>
          <IntelligenceNav />
        </header>

        <div className="space-y-2">
          {sorted.map((a) => (
            <Card key={a.id} className="border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={SEV[a.severity]}>{a.severity}</Badge>
                  <span className="text-sm font-medium">{a.title}</span>
                </div>
                <div className="text-xs text-muted-foreground">Impact <span className="text-foreground">{a.impact_score}</span></div>
              </div>
              <div className="mt-2 grid gap-2 md:grid-cols-2 text-xs text-muted-foreground">
                <div>
                  <div className="text-[10px] uppercase">Reasons</div>
                  <ul className="mt-1 space-y-0.5">{a.reasons.map((r) => <li key={r}>• {r}</li>)}</ul>
                </div>
                <div>
                  <div className="text-[10px] uppercase">Suggested resolutions</div>
                  <ul className="mt-1 space-y-0.5">{a.suggested_resolutions.map((r) => <li key={r}>• {r}</li>)}</ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
