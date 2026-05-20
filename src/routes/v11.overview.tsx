import { createFileRoute, Link } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  v11ReadinessScore, v11ReadinessBreakdown, v11Stats,
  BILLING_OVERVIEW, GROWTH_METRICS, NOTIF_METRICS, ETA_SHIPMENTS,
} from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/overview")({
  head: () => ({ meta: [{ title: "V1.1 Overview · Anderoute" }] }),
  component: Page,
});

function Page() {
  const score = v11ReadinessScore();
  const bd = v11ReadinessBreakdown();
  const s = v11Stats();
  const atRisk = ETA_SHIPMENTS.filter((x) => x.status === "at_risk" || x.status === "late").length;
  return (
    <V11Page
      icon={<Rocket className="size-6 text-fuchsia-300" />}
      title="Anderoute V1.1 Review Center"
      blurb="Post-pilot V1.1 expansion: improved ETA, billing activation, CSV imports, navigation SDK prep, and stronger customer portal. Tracks readiness toward the first paid customer."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="V1.1 readiness" value={`${score}%`} hint="weighted across 5 gates" tone={score >= 80 ? "good" : score >= 65 ? "warn" : "bad"} />
        <StatTile label="In-scope features" value={s.inScope} hint={`${s.deferred} deferred to V1.5/V2`} tone="info" />
        <StatTile label="Trial customer" value={BILLING_OVERVIEW.status.toUpperCase()} hint={`Plan: ${BILLING_OVERVIEW.plan}`} tone={BILLING_OVERVIEW.status === "active" ? "good" : "warn"} />
        <StatTile label="ETA risk" value={`${atRisk} / ${ETA_SHIPMENTS.length}`} hint="at-risk or late shipments" tone={atRisk ? "warn" : "good"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">V1.1 readiness composition</h2>
        <div className="mt-3 space-y-3">
          {bd.map((b) => (
            <div key={b.id}>
              <div className="flex items-center justify-between text-xs">
                <span>{b.label} <span className="text-muted-foreground">· weight {b.weight}</span></span>
                <span className={b.pct >= 85 ? "text-emerald-300" : b.pct >= 65 ? "text-sky-300" : "text-amber-300"}>{b.pct}%</span>
              </div>
              <Progress value={b.pct} className="mt-1 h-1.5" />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Active companies" value={GROWTH_METRICS.activeCompanies} tone="info" />
        <StatTile label="Active drivers" value={GROWTH_METRICS.activeDrivers} tone="info" />
        <StatTile label="Notif delivery" value={`${Math.round(NOTIF_METRICS.deliveryRate * 100)}%`} tone={NOTIF_METRICS.deliveryRate >= 0.97 ? "good" : "warn"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Where to go next</h2>
        <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-2">
          <li>· <Link to="/v11/scope" className="text-fuchsia-300 hover:underline">Scope board</Link> — what is in V1.1</li>
          <li>· <Link to="/v11/eta" className="text-fuchsia-300 hover:underline">ETA engine</Link> — confidence + windows</li>
          <li>· <Link to="/v11/billing" className="text-fuchsia-300 hover:underline">Billing</Link> — trial → paid</li>
          <li>· <Link to="/v11/imports" className="text-fuchsia-300 hover:underline">CSV imports</Link> — drivers / vehicles / customers</li>
          <li>· <Link to="/v11/navigation" className="text-fuchsia-300 hover:underline">Navigation SDK</Link> — provider readiness</li>
          <li>· <Link to="/v11/demo" className="text-fuchsia-300 hover:underline">Demo flow</Link> — V1.1 end-to-end</li>
        </ul>
      </Card>
    </V11Page>
  );
}
