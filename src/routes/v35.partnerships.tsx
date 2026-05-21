import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STRATEGIC_PARTNERSHIPS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/partnerships")({
  head: () => ({ meta: [{ title: "Strategic Partnerships · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Handshake className="size-6 text-amber-300" />} title="Strategic Partnership Management"
      blurb="Integration, commercial, security, and launch readiness across the strategic partner pipeline.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Partner</th><th className="p-1">Integration</th><th className="p-1">Commercial</th><th className="p-1">Security</th><th className="p-1">Launch</th><th className="p-1">Revenue opp.</th></tr></thead>
          <tbody>{STRATEGIC_PARTNERSHIPS.map((p) => (
            <tr key={p.name} className="border-t border-white/10">
              <td className="p-1">{p.name}</td>
              <td className="p-1"><Badge variant="outline" className="border-sky-500/40 text-sky-300">{p.integration}</Badge></td>
              <td className="p-1 text-xs">{p.commercial}</td>
              <td className="p-1"><Badge variant="outline" className={p.security === "approved" ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>{p.security}</Badge></td>
              <td className="p-1 text-xs">{p.launch}</td>
              <td className="p-1 font-mono">${p.revenue_opportunity.toLocaleString()}</td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
