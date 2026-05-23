import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const r = H.useRecommendationEvidenceAutomation();
  return (
    <V165Page icon={<FileSearch className="size-6 text-emerald-300" />} title="Recommendation Evidence Automation"
      blurb="Every recommendation collects 11 evidence categories: source signal, account, marketplace, revenue, partner, product, capital, board, risk, approval, and outcome.">
      <ScoreCard label="Evidence completeness" value={r.completeness} tone="emerald" />
      <Section title="Collector completeness">
        <SimpleTable rows={r.collectors as any} columns={[
          { key: "type", label: "Type" }, { key: "completeness", label: "%" },
        ]} />
      </Section>
      <Section title="Gaps">
        <SimpleTable rows={r.gaps as any} columns={[
          { key: "rec", label: "Rec" }, { key: "missing", label: "Missing" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Owner accountability">
        <SimpleTable rows={r.owners as any} columns={[
          { key: "owner", label: "Owner" }, { key: "open_gaps", label: "Open gaps" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/rec-evidence")({ component: Page });
