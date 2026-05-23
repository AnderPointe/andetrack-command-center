import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const m = H.useMarketplaceIntelligenceMaturity();
  return (
    <V165Page icon={<Radar className="size-6 text-emerald-300" />} title="Marketplace Intelligence Maturity Center"
      blurb="Regional + lane liquidity, carrier density/quality/compliance, equipment + load coverage, bid density, time-to-award, dispute and revenue intelligence.">
      <ScoreCard label="MP intel maturity" value={m.score} tone="amber" />
      <Section title="Maturity radar (per dimension)">
        <SimpleTable rows={m.radar as any} columns={[
          { key: "dim", label: "Dimension" }, { key: "value", label: "Value" },
        ]} />
      </Section>
      <Section title="Regional maturity">
        <SimpleTable rows={m.regional as any} columns={[
          { key: "region", label: "Region" }, { key: "maturity", label: "Maturity" }, { key: "gap", label: "Gap" },
        ]} />
      </Section>
      <Section title="Recommendations (require approval)">
        <SimpleTable rows={m.recommendations as any} columns={[
          { key: "rec", label: "Rec" }, { key: "approver", label: "Approver" }, { key: "confidence", label: "Confidence" },
        ]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={m.action_plan as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/mp-maturity")({ component: Page });
