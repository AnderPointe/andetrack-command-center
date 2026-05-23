import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, ScoreCard, KpiGrid } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const c = H.useV155CapitalIntel();
  return (
    <V155Page icon={<Wallet className="size-6 text-fuchsia-300" />}
      title="Capital Execution Intelligence"
      blurb="Treasury / AR-AP / capex / refi signals with confidence. Recommendations route to CFO for approval.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Capital intel" value={c.score} tone="amber" />
        <ScoreCard label="Open recs" value={c.open_recs} tone="violet" />
        <ScoreCard label="Approved recs" value={c.approved_recs} tone="emerald" />
      </div>
      <KpiGrid cols={2} items={[
        { label: "Approval gate", value: "CFO", sub: ">$250k impact" },
        { label: "Escalation", value: "CEO + Board chair", sub: ">$1M impact" },
      ]} />
      <Section title="Capital signals">
        <SimpleTable rows={c.signals as any} columns={[
          { key: "signal", label: "Signal" }, { key: "value", label: "Value" },
          { key: "source", label: "Source" }, { key: "confidence", label: "Confidence" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/capital-intel")({ component: Page });
