import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const r = H.useDurableRevenueIntelligenceAutomation();
  return (
    <V18Page icon={<TrendingUp className="size-6 text-violet-300" />} title="Durable Revenue Intelligence Automation Center"
      blurb="Renewal/expansion/churn/concentration/payment/billing/marketplace/API-EDI/partner revenue signal automation with evidence + approval routing.">
      <ScoreCard label="Revenue intelligence automation" value={r.score} tone="violet" />
      <KpiGrid cols={4} items={r.kpis} />
      <Section title="Signal matrix">
        <SimpleTable rows={r.matrix as any} columns={[{ key: "signal", label: "Signal" }, { key: "status", label: "Status" }, { key: "exception", label: "Exc." }]} />
      </Section>
      <Section title="Approval routing">
        <SimpleTable rows={r.routing as any} columns={[{ key: "rec", label: "Recommendation" }, { key: "approver", label: "Approver" }, { key: "status", label: "Status" }]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={r.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/revenue-auto")({ component: Page });
