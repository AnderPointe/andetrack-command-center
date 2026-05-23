import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable, KpiGrid } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const e = H.useExecutiveDecisionRouting();
  return (
    <V165Page icon={<Briefcase className="size-6 text-emerald-300" />} title="Executive Decision Routing System"
      blurb="Per-executive decision queue with risk, confidence, evidence, escalation, and outcome tracking.">
      <Section title="Decision queue">
        <SimpleTable rows={e.queue as any} columns={[
          { key: "id", label: "ID" }, { key: "category", label: "Owner role" }, { key: "topic", label: "Topic" },
          { key: "risk", label: "Risk" }, { key: "conf", label: "Confidence" }, { key: "due", label: "Due" },
        ]} />
      </Section>
      <Section title="Owner matrix">
        <SimpleTable rows={e.owner_matrix as any} columns={[
          { key: "role", label: "Role" }, { key: "pending", label: "Pending" }, { key: "decided_7d", label: "Decided 7d" },
        ]} />
      </Section>
      <KpiGrid cols={3} items={[
        { label: "Approved (30d)", value: e.outcome.approved_30d },
        { label: "Rejected (30d)", value: e.outcome.rejected_30d },
        { label: "Escalated (30d)", value: e.outcome.escalated_30d },
      ]} />
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/exec-routing")({ component: Page });
