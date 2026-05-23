import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const b = H.useAIBoardOperatingSystem();
  return (
    <V165Page icon={<Brain className="size-6 text-emerald-300" />} title="AI-Assisted Board Operating System"
      blurb="Assist-only. CoPilot prepares agenda, packet, decision queue, evidence gaps, and follow-ups. No board actions are taken automatically.">
      <ScoreCard label="Board OS score" value={b.score} tone="sky" />
      <Section title="Board agenda (assist)">
        <SimpleTable rows={b.agenda as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Board decision queue">
        <SimpleTable rows={b.decision_queue as any} columns={[
          { key: "id", label: "ID" }, { key: "topic", label: "Topic" }, { key: "owner", label: "Owner" }, { key: "risk", label: "Risk" },
        ]} />
      </Section>
      <Section title="Board evidence gaps">
        <SimpleTable rows={b.evidence_gaps as any} columns={[
          { key: "area", label: "Area" }, { key: "item", label: "Item" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Action follow-ups">
        <SimpleTable rows={b.follow_ups as any} columns={[
          { key: "id", label: "ID" }, { key: "topic", label: "Topic" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/board-os")({ component: Page });
