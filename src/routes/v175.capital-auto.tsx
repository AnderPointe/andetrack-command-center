import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const c = H.useCapitalIntelligenceAutomation();
  return (
    <V175Page icon={<Wallet className="size-6 text-emerald-300" />} title="Capital Intelligence Automation Center"
      blurb="Capital evidence automation matrix, data-room automation, approval queue, exceptions, and outcomes — all HITL-gated.">
      <ScoreCard label="Capital automation" value={c.score} tone="emerald" />
      <Section title="Capital evidence automation matrix">
        <SimpleTable rows={c.evidence_matrix as any} columns={[
          { key: "category", label: "Category" }, { key: "coverage", label: "Coverage" },
          { key: "freshness", label: "Freshness" }, { key: "approval", label: "Approval" },
        ]} />
      </Section>
      <Section title="Data room automation">
        <SimpleTable rows={c.data_room as any} columns={[
          { key: "section", label: "Section" }, { key: "auto", label: "Auto" }, { key: "manual", label: "Manual" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Capital approval queue">
        <SimpleTable rows={c.approval_queue as any} columns={[
          { key: "id", label: "ID" }, { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Capital automation exceptions">
        <SimpleTable rows={c.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Capital outcomes">
        <SimpleTable rows={c.outcomes as any} columns={[
          { key: "week", label: "Week" }, { key: "approved", label: "Approved" }, { key: "rejected", label: "Rejected" }, { key: "board_use", label: "Board-use" },
        ]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/capital-auto")({ component: Page });
