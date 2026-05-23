import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V205Page } from "@/components/v205/V205Page";
import { Section, SimpleTable } from "@/components/v205/ui-bits";
import * as H from "@/v205/hooks";

function Page() {
  const r = H.useReportsV205();
  return (
    <V205Page icon={<FileText className="size-6 text-teal-300" />} title="V20.5 Advanced Reporting"
      blurb="20 trust scale reports — owners, freshness, board/external readiness — mock only.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[
          { key: "report", label: "Report" }, { key: "freshness", label: "Freshness" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V205Page>
  );
}
export const Route = createFileRoute("/v205/reports")({ component: Page });
