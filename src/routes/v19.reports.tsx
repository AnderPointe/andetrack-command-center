import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const r = H.useReportsV19();
  return (
    <V19Page icon={<FileText className="size-6 text-violet-300" />}
      title="V19 Reports Dashboard"
      blurb="20 reports across enterprise assurance, resilience, board, revenue, MP, exec, evidence, audit, approval, rec, outcome, risk, capital, account, partner, product, category, exception, board, roadmap.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[{ key: "name", label: "Report" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/reports")({ component: Page });
