import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const p = H.useBoardPacketIntelligence();
  return (
    <V165Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Board Packet Intelligence Center"
      blurb="Per-section completeness, missing items, owners, and Chair approval workflow. Packet cannot be finalized until gaps are closed.">
      <ScoreCard label="Packet readiness" value={p.readiness} tone="emerald" />
      <Section title="Section completeness">
        <SimpleTable rows={p.sections as any} columns={[
          { key: "section", label: "Section" }, { key: "completeness", label: "%" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Missing data">
        <SimpleTable rows={p.missing as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "required_by", label: "Required by" },
        ]} />
      </Section>
      <Section title="Approval workflow">
        <p className="text-sm text-muted-foreground">Stage: {p.approval.stage} · Approver: {p.approval.approver} · Evidence locked: {String(p.approval.evidence_locked)}</p>
        <p className="text-xs text-muted-foreground mt-1">Export placeholder — actual PDF/PPTX export deferred.</p>
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/board-packet")({ component: Page });
