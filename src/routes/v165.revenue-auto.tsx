import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const r = H.useDurableRevenueControlAutomation();
  return (
    <V165Page icon={<TrendingUp className="size-6 text-emerald-300" />} title="Durable Revenue Control Automation Center"
      blurb="Automated detection, evidence gathering, reminders, and approval routing. Never executes pricing, billing, renewal, or expansion changes automatically.">
      <ScoreCard label="Revenue automation score" value={r.score} tone="sky" />
      <Section title="Signals (require approval)">
        <SimpleTable rows={r.signals as any} columns={[
          { key: "signal", label: "Signal" }, { key: "value", label: "Value" }, { key: "action", label: "Required action" },
        ]} />
      </Section>
      <Section title="Evidence refresh queue">
        <SimpleTable rows={r.evidence_queue as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "freshness", label: "Freshness" },
        ]} />
      </Section>
      <Section title="Control exceptions">
        <SimpleTable rows={r.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <p className="text-sm text-muted-foreground">Approvals pending: {r.approvals_pending}</p>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/revenue-auto")({ component: Page });
