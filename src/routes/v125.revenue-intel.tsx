import { createFileRoute } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const r = H.useGlobalRevenueIntelligence();
  return (
    <V125Page icon={<Globe2 className="size-6 text-teal-300" />} title="Global Revenue Intelligence Dashboard" blurb="Revenue mix, concentration, regional opportunity and risk.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Intel score"        value={r.score}                tone="emerald" />
        <ScoreCard label="Renewal risk"       value={`${r.renewal_risk_pct}%`} tone="amber" />
        <ScoreCard label="Churn exposure"     value={`$${(r.churn_exposure_usd / 1e6).toFixed(1)}M`} tone="rose" />
        <ScoreCard label="Mix levers"         value={r.mix.length}            tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue mix intelligence</h3>
        <SimpleTable rows={r.mix as any} columns={[
          { key: "lever", label: "Lever" }, { key: "share_pct", label: "Share %" }, { key: "quality", label: "Quality" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Concentration intelligence</h3>
        <SimpleTable rows={r.concentration as any} columns={[
          { key: "axis", label: "Axis" }, { key: "value_pct", label: "Value %" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Regional opportunity &amp; risk</h3>
        <SimpleTable rows={r.regions as any} columns={[
          { key: "region", label: "Region" }, { key: "opportunity_usd", label: "Opp ($)", render: (r: any) => `$${(r.opportunity_usd / 1e6).toFixed(1)}M` }, { key: "risk", label: "Risk" }, { key: "notes", label: "Notes" },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/revenue-intel")({
  head: () => ({ meta: [{ title: "Revenue Intelligence · V12.5" }] }),
  component: Page,
});
