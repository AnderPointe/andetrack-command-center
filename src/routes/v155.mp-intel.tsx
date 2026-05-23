import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, ScoreCard, KpiGrid } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const m = H.useV155MpIntel();
  return (
    <V155Page icon={<Radar className="size-6 text-fuchsia-300" />}
      title="Marketplace Scale Intelligence"
      blurb="Lane-level signals + confidence. Recommendations route to MP GM for approval.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="MP intel" value={m.score} tone="rose" />
        <ScoreCard label="Liquidity index" value={m.liquidity_index} tone="violet" />
        <ScoreCard label="Open recs" value={m.open_recs} tone="emerald" />
      </div>
      <KpiGrid cols={1} items={[{ label: "Fill rate", value: `${(m.fill_rate*100).toFixed(1)}%`, sub: "Trailing 30d" }]} />
      <Section title="Lane hotspots">
        <SimpleTable rows={m.hotspots as any} columns={[
          { key: "lane", label: "Lane" }, { key: "signal", label: "Signal" },
          { key: "confidence", label: "Confidence" }, { key: "action", label: "Suggested action" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/mp-intel")({ component: Page });
