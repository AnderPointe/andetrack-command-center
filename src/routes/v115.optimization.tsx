import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const o = H.useRevenueOptimization();
  return (
    <V115Page icon={<TrendingUp className="size-6 text-emerald-300" />} title="Revenue Optimization Command Center" blurb="Cross-lever optimization: discount, packaging, take-rate, renewal uplift, partner mix.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Optimization score" value={o.summary.score} tone="emerald" />
        <ScoreCard label="QoQ trend"          value={`+${o.summary.trend_qoq}`} tone="sky" />
        <ScoreCard label="Net uplift"         value={`${o.summary.net_revenue_uplift_pct}%`} tone="violet" />
        <ScoreCard label="Revenue quality"    value={o.summary.revenue_quality_score} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Active optimization levers</h3>
        <SimpleTable rows={o.levers as any} columns={[
          { key: "lever",      label: "Lever" },
          { key: "uplift_pct", label: "Uplift %", render: (r: any) => `${r.uplift_pct}%` },
          { key: "status",     label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "owner",      label: "Owner" },
        ]} />
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Optimization focus</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <ScoreCard label="Levers active" value={`${o.summary.levers_optimized}/${o.summary.levers_total}`} tone="emerald" />
            <ScoreCard label="Expansion readiness" value={o.summary.expansion_readiness_pct} tone="sky" />
            <ScoreCard label="Partner monetization" value={o.summary.partner_monetization_index} tone="violet" />
            <ScoreCard label="Revenue quality" value={o.summary.revenue_quality_score} tone="amber" />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Optimization stance</h3>
          <p className="mt-2 text-sm text-muted-foreground">V11.5 prioritizes monetization quality over raw discount-led volume. Every lever maps to governed uplift, partner mix discipline, and human-approved execution.</p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/90">
            <li>• Push premium packaging only where adoption and trust signals support expansion.</li>
            <li>• Treat partner monetization as a governed growth input, not unmanaged channel volume.</li>
            <li>• Keep revenue-quality improvement visible alongside uplift in every operating review.</li>
          </ul>
        </Card>
      </div>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/optimization")({
  head: () => ({ meta: [{ title: "Revenue Optimization · V11.5" }] }),
  component: Page,
});
