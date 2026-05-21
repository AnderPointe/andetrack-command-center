import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { COMMERCIAL_OPS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/commercial-ops")({
  head: () => ({ meta: [{ title: "Commercial Operations · Anderoute V3.5" }] }),
  component: () => {
    const o = COMMERCIAL_OPS;
    const cards = [
      ["Active subscriptions", o.active_subscriptions], ["Carrier subscriptions", o.carrier_subscriptions],
      ["Marketplace revenue", `$${o.marketplace_rev}`], ["API revenue", `$${o.api_rev}`],
      ["Implementation fees", `$${o.implementation_fees}`], ["Trial conversions", `${Math.round(o.trial_conversions * 100)}%`],
      ["Paid customers", o.paid_customers], ["Enterprise pipeline", o.enterprise_pipeline],
      ["Expansion revenue", `$${o.expansion_rev}`], ["Churn risk accts", o.churn_risk],
      ["Support cost (mo)", `$${o.support_cost}`],
    ] as const;
    return (
      <V35Page icon={<Activity className="size-6 text-amber-300" />} title="Commercial Operations Dashboard"
        blurb="Aggregate SaaS, marketplace, API, implementation, and customer health into one operating view.">
        <div className="grid gap-3 md:grid-cols-4">
          {cards.map(([l, v]) => (
            <Card key={l} className="border-white/10 bg-white/[0.02] p-3">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{l}</div>
              <div className="mt-1 text-xl font-semibold">{v as any}</div>
            </Card>
          ))}
        </div>
      </V35Page>
    );
  },
});
