import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { V35_READINESS, COMMERCIAL_OPS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/overview")({
  head: () => ({ meta: [{ title: "V3.5 Overview · Anderoute" }] }),
  component: () => (
    <V35Page icon={<Rocket className="size-6 text-amber-300" />} title="V3.5 Commercial Ecosystem Readiness"
      blurb="Monetizable carrier marketplace, advanced telematics, compliance + certification execution, partner ecosystem, and commercial revenue operations.">
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(V35_READINESS).map(([k, v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{k}</div>
            <div className="mt-1 text-2xl font-semibold">{v}%</div>
            <Progress value={v} className="mt-2 h-1.5" />
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Commercial snapshot</h2>
        <div className="mt-3 grid gap-3 text-sm md:grid-cols-4">
          <Stat label="Active subscriptions" value={COMMERCIAL_OPS.active_subscriptions} />
          <Stat label="Carrier subscriptions" value={COMMERCIAL_OPS.carrier_subscriptions} />
          <Stat label="Marketplace revenue" value={`$${COMMERCIAL_OPS.marketplace_rev}`} />
          <Stat label="API revenue" value={`$${COMMERCIAL_OPS.api_rev}`} />
          <Stat label="Enterprise pipeline" value={COMMERCIAL_OPS.enterprise_pipeline} />
          <Stat label="Trial conversion" value={`${Math.round(COMMERCIAL_OPS.trial_conversions * 100)}%`} />
          <Stat label="Churn risk accts" value={COMMERCIAL_OPS.churn_risk} />
          <Stat label="Expansion rev" value={`$${COMMERCIAL_OPS.expansion_rev}`} />
        </div>
      </Card>
    </V35Page>
  ),
});

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded border border-white/10 bg-black/20 p-3">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
