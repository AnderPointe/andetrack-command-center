import { createFileRoute } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_PLANS, API_PARTNERS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/partner-api")({
  head: () => ({ meta: [{ title: "Partner API · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<KeyRound className="size-6 text-amber-300" />} title="Partner API Monetization"
      blurb="Partner API plans, usage, overage billing, and SLA tier. Developer key management is admin-gated.">
      <div className="grid gap-3 md:grid-cols-3">{API_PLANS.map((p) => (
        <Card key={p.name} className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="font-semibold">{p.name}</h3>
          <div className="mt-1 text-xs text-muted-foreground">SLA: {p.sla}</div>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>• Quota {p.quota.toLocaleString()} req/mo</li>
            <li>• Overage ${(p.overage / 100).toFixed(2)} per 1K</li>
          </ul>
        </Card>
      ))}</div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner usage</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Partner</th><th className="p-1">Plan</th><th className="p-1">Used</th><th className="p-1">Overage</th><th className="p-1">Revenue</th></tr></thead>
          <tbody>{API_PARTNERS.map((p) => (
            <tr key={p.id} className="border-t border-white/10"><td className="p-1">{p.partner}</td><td className="p-1">{p.plan}</td><td className="p-1 font-mono">{p.used.toLocaleString()}</td><td className="p-1 font-mono">{p.overage > 0 ? <Badge variant="outline" className="border-amber-500/40 text-amber-300">+{p.overage.toLocaleString()}</Badge> : "—"}</td><td className="p-1 font-mono">${p.revenue}</td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
