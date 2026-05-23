import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V22Page } from "@/components/v22/V22Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v22/ui-bits";
import * as H from "@/v22/hooks";
function Page() {
  const b = H.useBoardTrustLifecycleReporting();
  return (
    <V22Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Board Trust Lifecycle Reporting Center" blurb="Operating · customer/partner automation · board exec · revenue · MP · evidence · boundaries · audit · risk · exceptions · decisions · next-Q priorities.">
      <ScoreCard label="Board report readiness" value={b.score} tone="emerald" />
      <KpiGrid cols={4} items={b.kpis} />
      <Section title="Report sections">
        <SimpleTable rows={b.matrix as any} columns={[
          { key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V22Page>
  );
}
export const Route = createFileRoute("/v22/board-report")({ component: Page });
