import { createFileRoute } from "@tanstack/react-router";
import { ServerCog } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_GATEWAY_RESPONSIBILITIES } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/api-gateway")({
  head: () => ({ meta: [{ title: "API Gateway · Anderoute" }] }),
  component: () => (
    <V25Page icon={<ServerCog className="size-6 text-emerald-300" />} title="API Gateway Readiness" blurb="The gateway validates keys + scopes, enforces rate limits and tenant isolation, logs requests, masks PII, and records billing events.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
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
    </V25Page>
  ),
});
