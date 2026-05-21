import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { PROVIDER_HEALTH, ROUTE_REQUEST_LOG } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/provider-health")({
  head: () => ({ meta: [{ title: "V1.5 Provider Health · Anderoute" }] }),
  component: Page,
});

const statusTone: Record<string, string> = {
  success:  "border-emerald-500/30 text-emerald-300",
  failed:   "border-rose-500/30 text-rose-300",
  fallback: "border-amber-500/30 text-amber-300",
};

function Page() {
  return (
    <V15Page
      icon={<Gauge className="size-6 text-cyan-300" />}
      title="Navigation Provider Health"
      blurb="Per-provider success rate, response time, fallback usage, rate-limit hits, and cost estimate. Track which provider is actually carrying production traffic."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {PROVIDER_HEALTH.map((h) => (
          <Card key={h.id} className="border-white/10 bg-white/[0.02] p-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium capitalize">{h.id}</div>
              <Badge variant="outline" className={h.configured ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {h.configured ? "configured" : "not configured"}
              </Badge>
            </div>
            <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
              <div>Success rate: <span className="text-foreground">{Math.round(h.successRate * 100)}%</span></div>
              <div>Avg response: <span className="text-foreground">{h.avgResponseMs} ms</span></div>
              <div>Failures 24h: <span className="text-foreground">{h.failures24h}</span></div>
              <div>Rate-limit hits: <span className="text-foreground">{h.rateLimitHits24h}</span></div>
              <div>Fallback uses: <span className="text-foreground">{h.fallbackUses24h}</span></div>
              <div>Cost: <span className="text-foreground">{h.costEstimate}</span></div>
              <div>Last success: <span className="text-foreground">{h.lastSuccessAt}</span></div>
            </div>
            {h.errors.length > 0 && (
              <div className="mt-2 space-y-1 text-xs text-rose-200/90">
                {h.errors.map((e) => <div key={e}>· {e}</div>)}
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Route request log</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-2">ID</th><th className="p-2">Provider</th><th className="p-2">Load</th><th className="p-2">Status</th><th className="p-2">Response</th><th className="p-2">When</th><th className="p-2">Error</th></tr>
          </thead>
          <tbody>
            {ROUTE_REQUEST_LOG.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-2 font-mono text-xs">{r.id}</td>
                <td className="p-2">{r.provider}</td>
                <td className="p-2 font-mono text-xs">{r.load}</td>
                <td className="p-2"><Badge variant="outline" className={statusTone[r.status]}>{r.status}</Badge></td>
                <td className="p-2">{r.responseMs} ms</td>
                <td className="p-2 text-xs text-muted-foreground">{r.at}</td>
                <td className="p-2 text-xs text-rose-200/90">{r.error ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <StatTile label="Total requests (24h)" value={ROUTE_REQUEST_LOG.length} tone="info" />
    </V15Page>
  );
}
