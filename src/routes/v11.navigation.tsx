import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { NAV_PROVIDERS, navProviderScore, navPreferredProvider, NAV_RISKS } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/navigation")({
  head: () => ({ meta: [{ title: "V1.1 Navigation SDK Readiness · Anderoute" }] }),
  component: Page,
});

function check(v: boolean) {
  return v ? <span className="text-emerald-300">✓</span> : <span className="text-rose-300">✕</span>;
}

const sevTone: Record<string, string> = {
  high:   "border-rose-500/30 text-rose-300",
  medium: "border-amber-500/30 text-amber-300",
  low:    "border-sky-500/30 text-sky-300",
};

function Page() {
  const decision = navPreferredProvider();
  return (
    <V11Page
      icon={<Map className="size-6 text-fuchsia-300" />}
      title="Navigation SDK Readiness"
      blurb="Per-provider readiness scoring across token, mobile SDK, web map, route test, turn-by-turn, reroute, and ETA sync. Mock fallback always retained for V1.1."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Preferred provider" value={decision.preferred?.label ?? "—"} hint={`Readiness ${decision.preferred?.score ?? 0}%`} tone={(decision.preferred?.score ?? 0) >= 80 ? "good" : "warn"} />
        <StatTile label="Providers evaluated" value={NAV_PROVIDERS.length} hint="incl. mock fallback" tone="info" />
        <StatTile label="Top risks" value={NAV_RISKS.filter((r) => r.severity === "high").length} hint="high severity" tone="warn" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Per-provider readiness</h2>
        <div className="mt-3 space-y-2">
          {decision.all.map((p) => (
            <div key={p.id}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{p.label}</span>
                <span className={p.score >= 80 ? "text-emerald-300" : p.score >= 50 ? "text-sky-300" : "text-amber-300"}>{p.score}%</span>
              </div>
              <Progress value={p.score} className="mt-1 h-1.5" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-2">Provider</th>
              <th className="p-2">Score</th>
              <th className="p-2">Token</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Web</th>
              <th className="p-2">Route</th>
              <th className="p-2">TBT</th>
              <th className="p-2">Reroute</th>
              <th className="p-2">ETA</th>
              <th className="p-2">Truck</th>
              <th className="p-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            {NAV_PROVIDERS.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-2 font-medium">{p.label}</td>
                <td className="p-2 text-xs text-muted-foreground">{navProviderScore(p)}%</td>
                <td className="p-2">{check(p.tokenConfigured)}</td>
                <td className="p-2">{check(p.mobileSdkReady)}</td>
                <td className="p-2">{check(p.webMapReady)}</td>
                <td className="p-2">{check(p.routeTest)}</td>
                <td className="p-2">{check(p.turnByTurnTest)}</td>
                <td className="p-2">{check(p.rerouteTest)}</td>
                <td className="p-2">{check(p.etaSyncTest)}</td>
                <td className="p-2">{check(p.truckRouting)}</td>
                <td className="p-2 text-xs text-muted-foreground">{p.costNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Risk register</h2>
        <div className="mt-3 space-y-2 text-sm">
          {NAV_RISKS.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div>{r.label}</div>
                <div className="text-xs text-muted-foreground">Mitigation: {r.mitigation}</div>
              </div>
              <Badge variant="outline" className={sevTone[r.severity]}>{r.severity}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-4 text-sm">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Cost guardrail</Badge>
        <p className="mt-2 text-amber-100/90">
          Real navigation providers bill per request. V1.1 enforces a monthly cap per company with usage alerts at 60/80/100%, falling back to mock when exceeded.
        </p>
      </Card>
    </V11Page>
  );
}
