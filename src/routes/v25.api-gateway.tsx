import { createFileRoute } from "@tanstack/react-router";
import { ServerCog, ShieldCheck } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_GATEWAY_RESPONSIBILITIES, API_GATEWAY_SECURITY, API_RATE_LIMITS_V25 } from "@/v25/data/mockPhase18";

const sTone: Record<string, string> = { enforced: "border-emerald-500/30 text-emerald-300", scheduled: "border-amber-500/30 text-amber-300" };

export const Route = createFileRoute("/v25/api-gateway")({
  head: () => ({ meta: [{ title: "API Gateway · Anderoute" }] }),
  component: () => (
    <V25Page icon={<ServerCog className="size-6 text-emerald-300" />} title="API Gateway Readiness" blurb="The gateway validates keys + scopes, enforces rate limits and tenant isolation, logs requests, masks PII, and records billing events. Security posture and per-scope rate limits below.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Gateway responsibilities</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Responsibility</th><th className="p-2">Layer</th><th className="p-2">SLA</th></tr></thead>
          <tbody>
            {API_GATEWAY_RESPONSIBILITIES.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-2">{r.responsibility}</td>
                <td className="p-2"><Badge variant="outline" className="border-sky-500/30 text-sky-300">{r.layer}</Badge></td>
                <td className="p-2 font-mono text-xs">{r.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-300" /><h2 className="text-sm font-semibold">Security posture</h2></div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {API_GATEWAY_SECURITY.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-2 text-sm">
              <span>{s.control}</span>
              <Badge variant="outline" className={sTone[s.status]}>{s.status}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Per-scope rate limits</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Scope</th><th className="p-2">Tier</th><th className="p-2">Limit</th><th className="p-2">Burst</th><th className="p-2">Enforced</th></tr></thead>
          <tbody>{API_RATE_LIMITS_V25.map((r, i) => (
            <tr key={i} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{r.scope}</td><td className="p-2 text-xs">{r.tier}</td><td className="p-2 font-mono text-xs">{r.limit}</td><td className="p-2 font-mono text-xs">{r.burst}</td><td className="p-2">{r.enforced ? "✓" : "—"}</td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
