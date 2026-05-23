import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const r = H.useReportsV18();
  return (
    <V18Page icon={<FileText className="size-6 text-violet-300" />} title="V18 Reports Dashboard"
      blurb="20 report surfaces covering scale governance, predictive ops, board maturity, revenue/MP/capital/account/partner/product/category controls, audit, and board scale.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[{ key: "name", label: "Report" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/reports")({ component: Page });
