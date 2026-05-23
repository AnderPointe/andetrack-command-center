import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V215Page } from "@/components/v215/V215Page";
import { Section, SimpleTable } from "@/components/v215/ui-bits";
import * as H from "@/v215/hooks";

function Page() {
  const r = H.useReportsV215();
  return (
    <V215Page icon={<FileText className="size-6 text-emerald-300" />} title="V21.5 Reports Dashboard"
      blurb="21 reports across enterprise trust network scale, customer/partner lifecycle, board maturity, revenue, MP, evidence, boundary, risk, audit, approval/rec/outcome, capital, product, category, exception, board reporting, and roadmap.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[
          { key: "name", label: "Report" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V215Page>
  );
}
export const Route = createFileRoute("/v215/reports")({ component: Page });
