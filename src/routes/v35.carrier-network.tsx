import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CARRIER_NETWORK_METRICS, CARRIER_REGION_COVERAGE, CARRIER_EQUIPMENT_COVERAGE } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/carrier-network")({
  head: () => ({ meta: [{ title: "Carrier Network · Anderoute V3.5" }] }),
  component: () => {
    const m = CARRIER_NETWORK_METRICS;
    return (
      <V35Page icon={<Network className="size-6 text-amber-300" />} title="Carrier Network Growth"
        blurb="Network funnel, regional coverage, equipment mix, and operational responsiveness.">
        <div className="grid gap-3 md:grid-cols-4">
          {[["Total", m.total], ["Active", m.active], ["Verified", m.verified], ["Pending", m.pending]].map(([l, v]) => (
            <Card key={String(l)} className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">{l}</div><div className="text-xl font-semibold">{v as number}</div></Card>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Funnel</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Response rate <span className="font-mono">{(m.response_rate * 100).toFixed(0)}%</span></li>
              <li>Award rate <span className="font-mono">{(m.award_rate * 100).toFixed(0)}%</span></li>
              <li>Completion rate <span className="font-mono">{(m.completion_rate * 100).toFixed(0)}%</span></li>
              <li>Compliance completion <span className="font-mono">{(m.compliance_complete * 100).toFixed(0)}%</span></li>
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Equipment coverage</h3>
            <div className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">
              {CARRIER_EQUIPMENT_COVERAGE.map((e) => (
                <div key={e.equipment} className="flex justify-between rounded border border-white/10 bg-black/20 px-2 py-1"><span>{e.equipment}</span><span className="font-mono text-xs">{e.carriers}</span></div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Regional coverage</h3>
          <table className="mt-2 w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Region</th><th className="p-1">Carriers</th><th className="p-1">Coverage</th></tr></thead>
            <tbody>{CARRIER_REGION_COVERAGE.map((r) => (
              <tr key={r.region} className="border-t border-white/10"><td className="p-1">{r.region}</td><td className="p-1 font-mono">{r.carriers}</td><td className="p-1"><Badge variant="outline" className={r.gap ? "border-amber-500/40 text-amber-300" : "border-emerald-500/40 text-emerald-300"}>{r.gap ? "gap" : "ok"}</Badge></td></tr>
            ))}</tbody>
          </table>
        </Card>
      </V35Page>
    );
  },
});
