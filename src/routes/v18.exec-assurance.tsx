import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const e = H.useExecutiveControlAssurance();
  return (
    <V18Page icon={<Briefcase className="size-6 text-violet-300" />} title="Executive Control Assurance Center"
      blurb="Per-exec control queues, high-risk requests, escalations, and outcome quality across the executive bench.">
      <ScoreCard label="Executive control assurance" value={e.score} tone="violet" />
      <Section title="Executive control queues">
        <SimpleTable rows={e.queues as any} columns={[
          { key: "exec", label: "Exec" }, { key: "pending", label: "Pending" },
          { key: "high_risk", label: "High-risk" }, { key: "overdue", label: "Overdue" },
          { key: "escalated", label: "Escalated" },
        ]} />
      </Section>
      <Section title="High-risk requests">
        <SimpleTable rows={e.high_risk as any} columns={[{ key: "id", label: "ID" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Escalations">
        <SimpleTable rows={e.escalations as any} columns={[
          { key: "id", label: "ID" }, { key: "from", label: "From" }, { key: "to", label: "To" }, { key: "reason", label: "Reason" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Outcome quality (weekly)">
        <SimpleTable rows={e.outcomes as any} columns={[
          { key: "week", label: "Week" }, { key: "approved", label: "Approved" }, { key: "rejected", label: "Rejected" }, { key: "quality", label: "Quality" },
        ]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/exec-assurance")({ component: Page });
