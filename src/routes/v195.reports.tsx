import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const r = H.useReportsV195();
  const fns = H.useV195EdgeFunctions();
  return (
    <V195Page icon={<FileText className="size-6 text-violet-300" />}
      title="V19.5 Advanced Reporting"
      blurb="21 reports across maturity, optimization, intelligence, governance, audit, exceptions, board, and roadmap.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[
          { key: "report", label: "Report" }, { key: "owner", label: "Owner" }, { key: "cadence", label: "Cadence" },
        ]} />
      </Section>
      <Section title="Edge Function plan">
        <SimpleTable rows={fns as any} columns={[{ key: "fn", label: "Function" }]} />
      </Section>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/reports")({ component: Page });
