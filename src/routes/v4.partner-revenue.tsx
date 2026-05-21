import { createFileRoute } from "@tanstack/react-router";
import { Coins } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTNER_REVENUE, PARTNER_PAYOUTS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/partner-revenue")({
  head: () => ({ meta: [{ title: "Partner Revenue · Anderoute" }] }),
  component: () => {
    const total = PARTNER_PAYOUTS.reduce((s, p) => s + p.amount, 0);
    return (
      <V4Page icon={<Coins className="size-6 text-sky-300" />} title="Partner Revenue Operations"
        blurb="Partner revenue share, API/carrier/integration partner revenue, billing events and partner payout pipeline.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Revenue share</h3>
            <div className="text-xs text-muted-foreground">last period total <span className="font-mono">${total.toLocaleString()}</span></div>
          </div>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr>
                {["Partner","Type","Share","Last period"].map(h => <th key={h} className="px-2 py-1 text-left">{h}</th>)}
              </tr></thead>
              <tbody>{PARTNER_REVENUE.map(p => (
                <tr key={p.partner} className="border-t border-white/10">
                  <td className="px-2 py-1 font-medium">{p.partner}</td>
                  <td className="px-2 py-1">{p.type}</td>
                  <td className="px-2 py-1">{(p.share*100).toFixed(2)}%</td>
                  <td className="px-2 py-1 font-mono">${p.last_period.toLocaleString()}</td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Scheduled payouts</h3>
          <ul className="mt-2 space-y-1 text-sm">{PARTNER_PAYOUTS.map(p => (
            <li key={p.partner+p.period} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
              <div><div className="font-medium">{p.partner}</div><div className="text-xs text-muted-foreground">{p.period} · due {p.due}</div></div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">${p.amount.toLocaleString()}</span>
                <Badge variant="outline" className={p.status === "paid" ? "border-emerald-400/40 text-emerald-300" : "border-white/15"}>{p.status}</Badge>
              </div>
            </li>))}
          </ul>
        </Card>
      </V4Page>
    );
  },
});
