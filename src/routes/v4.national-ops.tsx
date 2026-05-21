import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { NATIONAL_OPS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/national-ops")({
  head: () => ({ meta: [{ title: "National Ops Intel · Anderoute" }] }),
  component: () => {
    const totals = NATIONAL_OPS.reduce((acc, r) => ({
      loads: acc.loads + r.loads, revenue: acc.revenue + r.revenue, support: acc.support + r.support_load,
    }), { loads: 0, revenue: 0, support: 0 });
    return (
      <V4Page icon={<Activity className="size-6 text-sky-300" />} title="National Operations Intelligence"
        blurb="Operations health, load volume, driver/vehicle utilization, carrier coverage, support burden and revenue by region.">
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">Total loads</div><div className="mt-1 text-2xl font-semibold">{totals.loads}</div></Card>
          <Card className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">Total revenue</div><div className="mt-1 text-2xl font-semibold font-mono">${totals.revenue.toLocaleString()}</div></Card>
          <Card className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">Open support</div><div className="mt-1 text-2xl font-semibold">{totals.support}</div></Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr>
                {["Region","Loads","Drv util","Veh util","Carrier cov","Support","Revenue"].map(h => <th key={h} className="px-2 py-1 text-left">{h}</th>)}
              </tr></thead>
              <tbody>{NATIONAL_OPS.map(r => (
                <tr key={r.region} className="border-t border-white/10">
                  <td className="px-2 py-1 font-medium">{r.region}</td>
                  <td className="px-2 py-1">{r.loads}</td>
                  <td className="px-2 py-1">{r.util_drv}%</td>
                  <td className="px-2 py-1">{r.util_veh}%</td>
                  <td className={`px-2 py-1 ${r.carrier_cov < 50 ? "text-amber-300" : ""}`}>{r.carrier_cov}%</td>
                  <td className="px-2 py-1">{r.support_load}</td>
                  <td className="px-2 py-1 font-mono">${r.revenue.toLocaleString()}</td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </Card>
      </V4Page>
    );
  },
});
