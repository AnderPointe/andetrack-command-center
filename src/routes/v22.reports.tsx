import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V22Page } from "@/components/v22/V22Page";
import { Section, SimpleTable } from "@/components/v22/ui-bits";
import * as H from "@/v22/hooks";
function Page() {
  const r = H.useReportsV22();
  return (
    <V22Page icon={<FileText className="size-6 text-emerald-300" />} title="V22 Reports Dashboard" blurb="21 reports across the V22 lifecycle operating system.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[
          { key: "name", label: "Report" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V22Page>
  );
}
export const Route = createFileRoute("/v22/reports")({ component: Page });
