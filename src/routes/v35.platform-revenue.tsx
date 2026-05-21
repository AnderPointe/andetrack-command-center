import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { PLATFORM_REVENUE_EVENTS, PLATFORM_REVENUE_BY_LINE } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/platform-revenue")({
  head: () => ({ meta: [{ title: "Platform Revenue · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<DollarSign className="size-6 text-amber-300" />} title="Platform Revenue Operations"
      blurb="Revenue events by product line. Forecast + reconciliation remain placeholder until finance integration.">
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Revenue by product line</h3>
          <ul className="mt-2 space-y-1 text-sm">{PLATFORM_REVENUE_BY_LINE.map((l) => (
            <li key={l.line} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5"><span>{l.line}</span><span className="font-mono text-amber-300">${l.amount.toLocaleString()}</span></li>
          ))}</ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Event log</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Product</th><th className="p-1">Event</th><th className="p-1">Amount</th><th className="p-1">At</th></tr></thead>
            <tbody>{PLATFORM_REVENUE_EVENTS.map((e, i) => (
              <tr key={i} className="border-t border-white/10"><td className="p-1">{e.product}</td><td className="p-1 font-mono text-xs">{e.event}</td><td className="p-1 font-mono">${e.amount}</td><td className="p-1 text-xs text-muted-foreground">{e.at}</td></tr>
            ))}</tbody>
          </table>
        </Card>
      </div>
    </V35Page>
  ),
});
