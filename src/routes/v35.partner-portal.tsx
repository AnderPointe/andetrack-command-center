import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTNER_TYPES, PARTNERS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/partner-portal")({
  head: () => ({ meta: [{ title: "Partner Portal · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Building2 className="size-6 text-amber-300" />} title="Partner Portal Foundation"
      blurb="Multi-type partner workspace: dashboard, opportunities, integration status, support, billing placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner types</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">{PARTNER_TYPES.map((t) => (
          <Badge key={t} variant="outline" className="border-white/15 text-xs text-muted-foreground">{t}</Badge>
        ))}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Active partners</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Partner</th><th className="p-1">Type</th><th className="p-1">Status</th><th className="p-1">Revenue</th><th className="p-1">Launch</th></tr></thead>
          <tbody>{PARTNERS.map((p) => (
            <tr key={p.id} className="border-t border-white/10"><td className="p-1">{p.name}</td><td className="p-1 text-xs text-muted-foreground">{p.type}</td><td className="p-1"><Badge variant="outline" className="border-sky-500/40 text-sky-300">{p.status}</Badge></td><td className="p-1 font-mono">${p.revenue}</td><td className="p-1 text-xs">{p.launch}</td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
