import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V215Page } from "@/components/v215/V215Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v215/ui-bits";
import * as H from "@/v215/hooks";

function Page() {
  const b = H.useBoardTrustNetworkReporting();
  return (
    <V215Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Board Trust Network Reporting Center"
      blurb="Network scale · customer/partner lifecycle · board maturity · revenue optimization · MP governance · evidence lifecycle · boundary governance · audit · exceptions · decisions · next-Q priorities.">
      <ScoreCard label="Board report readiness" value={b.score} tone="emerald" />
      <KpiGrid cols={4} items={b.kpis} />
      <Section title="Report sections">
        <SimpleTable rows={b.matrix as any} columns={[
          { key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V215Page>
  );
}
export const Route = createFileRoute("/v215/board-report")({ component: Page });
