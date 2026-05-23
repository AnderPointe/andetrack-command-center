import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, ScoreCard, KpiGrid, TrendBars } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const m = H.useV155Maturity();
  return (
    <V155Page icon={<Gauge className="size-6 text-fuchsia-300" />}
      title="Enterprise Intelligence Maturity Center"
      blurb="Six-dimension maturity model with quarterly trend. Targets set by Head of Intelligence + Chief of Staff.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Maturity score" value={m.score} tone="violet" />
        <ScoreCard label="QoQ delta" value={`+${m.qoq}`} tone="emerald" />
        <ScoreCard label="Dimensions" value={m.dimensions.length} tone="sky" />
      </div>
      <KpiGrid cols={3} items={m.dimensions.slice(0,3).map(d => ({ label: d.dim, value: d.score, sub: `Target ${d.target}` }))} />
      <TrendBars title="Maturity QoQ" points={m.trends.map(t => ({ label: t.q, value: t.score }))} />
      <Section title="All dimensions">
        <SimpleTable rows={m.dimensions as any} columns={[
          { key: "dim", label: "Dimension" }, { key: "score", label: "Score" },
          { key: "target", label: "Target" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/command")({ component: Page });
