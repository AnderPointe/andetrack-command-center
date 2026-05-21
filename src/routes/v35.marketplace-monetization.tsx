import { createFileRoute } from "@tanstack/react-router";
import { Coins } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CARRIER_PLANS, CARRIER_SUBSCRIPTIONS, CARRIER_REVENUE_EVENTS, MARKETPLACE_FEE_SETTINGS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/marketplace-monetization")({
  head: () => ({ meta: [{ title: "Marketplace Monetization · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Coins className="size-6 text-amber-300" />} title="Carrier Marketplace Monetization"
      blurb="Subscription plans, transaction fees, premium visibility, and marketplace revenue events. Settlement processing is placeholder.">
      <div className="grid gap-3 md:grid-cols-3">
        {CARRIER_PLANS.map((p) => (
          <Card key={p.id} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.name}</h3>
              {p.premium && <Badge variant="outline" className="border-amber-500/40 text-amber-300">Premium</Badge>}
            </div>
            <div className="mt-1 text-2xl font-semibold">${(p.price / 100).toFixed(0)}<span className="text-xs text-muted-foreground">/mo</span></div>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>• Per-load fee {(p.fee_bps / 100).toFixed(2)}%</li>
              <li>• Premium visibility {p.premium ? "✓" : "—"}</li>
              <li>• API access {p.api ? "✓" : "—"}</li>
            </ul>
          </Card>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Active subscriptions</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Carrier</th><th className="p-1">Plan</th><th className="p-1">Status</th><th className="p-1">Renewed</th></tr></thead>
            <tbody>
              {CARRIER_SUBSCRIPTIONS.map((s) => (
                <tr key={s.id} className="border-t border-white/10"><td className="p-1">{s.carrier}</td><td className="p-1">{s.plan}</td><td className="p-1"><Badge variant="outline" className="border-emerald-500/40 text-emerald-300">{s.status}</Badge></td><td className="p-1">{s.renewed}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Fee settings</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {MARKETPLACE_FEE_SETTINGS.map((f) => (
              <li key={f.type} className="flex justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
                <span>{f.type}</span><span className="font-mono text-xs text-amber-300">{f.value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue events</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Type</th><th className="p-1">Carrier</th><th className="p-1">Amount</th><th className="p-1">At</th></tr></thead>
          <tbody>
            {CARRIER_REVENUE_EVENTS.map((e) => (
              <tr key={e.id} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{e.type}</td><td className="p-1">{e.carrier}</td><td className="p-1 font-mono">${(e.amount / 100).toFixed(2)}</td><td className="p-1 text-xs text-muted-foreground">{e.at}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
