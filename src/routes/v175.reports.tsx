import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const r = H.useReportsV175();
  const ef = H.useV175EdgeFunctions();
  return (
    <V175Page icon={<FileText className="size-6 text-emerald-300" />} title="V17.5 Reports Dashboard"
      blurb="20 V17.5 reports covering governed automation scale, board execution, revenue/MP/strategic/exec automation, audit and roadmap.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[
          { key: "id", label: "ID" }, { key: "name", label: "Report" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Planned Edge Functions (cron + on-demand)">
        <SimpleTable rows={ef as any} columns={[{ key: "fn", label: "Function" }, { key: "trigger", label: "Trigger" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/reports")({ component: Page });
