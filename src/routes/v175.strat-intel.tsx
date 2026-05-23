import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const s = H.useStrategicIntelligenceOperatingExcellence();
  return (
    <V175Page icon={<Sparkles className="size-6 text-emerald-300" />} title="Strategic Intelligence Operating Excellence Center"
      blurb="Signal quality, coverage, recommendation/explainability quality, approval/risk/outcome workflow maturity, and audit completeness.">
      <ScoreCard label="Strategic intelligence operating" value={s.score} tone="emerald" />
      <KpiGrid cols={4} items={s.kpis} />
      <Section title="Intelligence workflow health map">
        <SimpleTable rows={s.health_map as any} columns={[{ key: "workflow", label: "Workflow" }, { key: "health", label: "Health" }]} />
      </Section>
      <Section title="Strategic intelligence gaps">
        <SimpleTable rows={s.gaps as any} columns={[{ key: "area", label: "Area" }, { key: "gap", label: "Gap" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Strategic intelligence action plan">
        <SimpleTable rows={s.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/strat-intel")({ component: Page });
