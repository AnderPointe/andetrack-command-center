import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const m = H.useMarketplaceOptimizationScaleControls();
  return (
    <V18Page icon={<Megaphone className="size-6 text-violet-300" />} title="Marketplace Optimization Scale Controls Center"
      blurb="Carrier density, equipment, coverage, bid density, time-to-award, regional + lane liquidity, quality, compliance — all HITL-gated.">
      <ScoreCard label="MP scale control" value={m.score} tone="violet" />
      <KpiGrid cols={4} items={m.kpis} />
      <Section title="Control matrix">
        <SimpleTable rows={m.matrix as any} columns={[{ key: "area", label: "Area" }, { key: "status", label: "Status" }, { key: "note", label: "Note" }]} />
      </Section>
      <Section title="Regional health">
        <SimpleTable rows={m.regional as any} columns={[{ key: "region", label: "Region" }, { key: "health", label: "Health" }, { key: "note", label: "Note" }]} />
      </Section>
      <Section title="Approvals">
        <SimpleTable rows={m.approvals as any} columns={[{ key: "rec", label: "Recommendation" }, { key: "approver", label: "Approver" }, { key: "status", label: "Status" }, { key: "risk", label: "Risk" }]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={m.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/mp-scale")({ component: Page });
