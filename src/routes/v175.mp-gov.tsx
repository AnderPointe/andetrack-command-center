import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const m = H.useMarketplaceAutomationGovernance();
  return (
    <V175Page icon={<Megaphone className="size-6 text-emerald-300" />} title="Marketplace Automation Governance Center"
      blurb="Marketplace automation across density, equipment, coverage, bid density, lane liquidity, carrier quality/compliance — all HITL-gated.">
      <ScoreCard label="MP automation governance" value={m.score} tone="emerald" />
      <KpiGrid cols={4} items={m.kpis} />
      <Section title="MP automation signal matrix">
        <SimpleTable rows={m.signals as any} columns={[
          { key: "area", label: "Area" }, { key: "score", label: "Score" }, { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="Regional liquidity automation">
        <SimpleTable rows={m.regional as any} columns={[
          { key: "region", label: "Region" }, { key: "health", label: "Health" }, { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="Lane liquidity automation">
        <SimpleTable rows={m.lane_liquidity as any} columns={[
          { key: "lane", label: "Lane" }, { key: "liquidity", label: "Liquidity" }, { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="MP automation exceptions">
        <SimpleTable rows={m.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="MP automation governance plan">
        <SimpleTable rows={m.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/mp-gov")({ component: Page });
