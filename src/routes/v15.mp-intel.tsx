import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const m = H.useMarketplaceScaleIntelligence();
  return (
    <V15Page icon={<Radar className="size-6 text-cyan-300" />} title="Marketplace Scale Intelligence" blurb="Regional opportunities, density gaps, equipment gaps, trends, recommendations (human approval required).">
      <ScoreCard label="MP scale intelligence" value={m.score} tone="rose" />
      <Section title="Regional opportunities">
        <SimpleTable rows={m.regions as any} columns={[
          { key: "region", label: "Region" }, { key: "opportunity", label: "Opportunity" },
          { key: "confidence", label: "Confidence", render: (r: any) => <StatusPill status={r.confidence} /> },
          { key: "action", label: "Action" },
        ]} />
      </Section>
      <Section title="Carrier density gaps">
        <SimpleTable rows={m.density_gaps as any} columns={[
          { key: "region", label: "Region" }, { key: "equipment", label: "Equipment" },
          { key: "gap", label: "Gap", render: (r: any) => <StatusPill status={r.gap} /> },
          { key: "action", label: "Action" },
        ]} />
      </Section>
      <Section title="Equipment coverage gaps">
        <SimpleTable rows={m.equipment_gaps as any} columns={[
          { key: "equipment", label: "Equipment" }, { key: "regions", label: "Regions" }, { key: "action", label: "Action" },
        ]} />
      </Section>
      <Section title="Marketplace trends">
        <SimpleTable rows={m.trends as any} columns={[{ key: "metric", label: "Metric" }, { key: "trend", label: "Trend" }]} />
      </Section>
      <Section title="Recommendations (human approval required)">
        <SimpleTable rows={m.recommendations as any} columns={[
          { key: "rec", label: "Recommendation" },
          { key: "confidence", label: "Confidence", render: (r: any) => <StatusPill status={r.confidence} /> },
          { key: "approver", label: "Approver" },
          { key: "approval", label: "Approval", render: (r: any) => <StatusPill status={r.approval} /> },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/mp-intel")({
  head: () => ({ meta: [{ title: "MP Scale Intel · V15" }] }),
  component: Page,
});
