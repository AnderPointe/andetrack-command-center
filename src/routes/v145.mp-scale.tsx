import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable, KpiGrid } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const m = H.useMarketplaceEconomicsScale();
  return (
    <V145Page icon={<Megaphone className="size-6 text-fuchsia-300" />} title="Marketplace Economics Scale Center" blurb="Regional scale readiness, unit economics confidence, scale risks and action plan.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="MP scale" value={m.score} tone="rose" />
        <ScoreCard label="Regions tracked" value={m.regions.length} tone="violet" />
        <ScoreCard label="Action items" value={m.action_plan.length} tone="amber" />
      </div>
      <Section title="RegionalMarketplaceScaleMap">
        <SimpleTable rows={m.regions as any} columns={[
          { key: "region", label: "Region" }, { key: "ready", label: "Ready %" },
          { key: "density", label: "Density" }, { key: "risk", label: "Risk" },
        ]} />
      </Section>
      <Section title="MarketplaceScaleReadinessPanel">
        <KpiGrid cols={3} items={m.metrics.map(x => ({ label: x.metric, value: `${x.pct}` }))} />
      </Section>
      <Section title="MarketplaceScaleActionPlan">
        <ul className="list-disc pl-5 text-sm">{m.action_plan.map(a => <li key={a}>{a}</li>)}</ul>
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/mp-scale")({ head: () => ({ meta: [{ title: "MP Scale · V14.5" }] }), component: Page });
