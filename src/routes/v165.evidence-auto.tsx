import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const e = H.useGovernanceEvidenceAutomation();
  return (
    <V165Page icon={<Lock className="size-6 text-emerald-300" />} title="Governance Evidence Automation Center"
      blurb="Evidence sources, owners, freshness, collection status, missing items, and outcome tracking.">
      <ScoreCard label="Evidence automation score" value={e.score} tone="amber" />
      <Section title="Evidence queue">
        <SimpleTable rows={e.queue as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "freshness", label: "Freshness" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Owner accountability">
        <SimpleTable rows={e.owner_accountability as any} columns={[
          { key: "owner", label: "Owner" }, { key: "open", label: "Open" }, { key: "completed_7d", label: "Completed 7d" },
        ]} />
      </Section>
      <Section title="Missing evidence">
        <SimpleTable rows={e.missing as any} columns={[
          { key: "area", label: "Area" }, { key: "item", label: "Item" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={e.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "item", label: "Item" }, { key: "action", label: "Action" }, { key: "actor", label: "Actor" },
        ]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={e.outcomes as any} columns={[
          { key: "item", label: "Item" }, { key: "improved", label: "Improvement" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/evidence-auto")({ component: Page });
