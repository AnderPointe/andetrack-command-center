import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const e = H.useExecutiveAutomationOversight();
  return (
    <V175Page icon={<Briefcase className="size-6 text-emerald-300" />} title="Executive Automation Oversight Center"
      blurb="Per-executive automation queues, high-risk + escalated requests, outcome quality, and executive action completion.">
      <ScoreCard label="Executive oversight score" value={e.score} tone="emerald" />
      <Section title="Executive automation queues">
        <SimpleTable rows={e.queues as any} columns={[
          { key: "exec", label: "Exec" }, { key: "pending", label: "Pending" },
          { key: "overdue", label: "Overdue" }, { key: "high_risk", label: "High-risk" },
          { key: "escalated", label: "Escalated" }, { key: "completion", label: "Completion" },
        ]} />
      </Section>
      <Section title="High-risk automation requests">
        <SimpleTable rows={e.high_risk as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Escalated automation requests">
        <SimpleTable rows={e.escalations as any} columns={[
          { key: "id", label: "ID" }, { key: "from", label: "From" }, { key: "to", label: "To" }, { key: "reason", label: "Reason" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Outcome quality (last 4 weeks)">
        <SimpleTable rows={e.outcomes as any} columns={[
          { key: "week", label: "Week" }, { key: "approved", label: "Approved" }, { key: "rejected", label: "Rejected" }, { key: "outcome_quality", label: "Quality" },
        ]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/exec-oversight")({ component: Page });
