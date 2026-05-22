import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const d = H.useCapitalNarrativeDataRoom();
  return (
    <V105Page icon={<FileBarChart className="size-6 text-fuchsia-300" />} title="Capital Narrative + Data Room" blurb="Data room sections and readiness status — investor and acquirer packets are mock-only.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Data room sections</h3>
        <SimpleTable rows={d.sections as any} columns={[
          { key: "section", label: "Section" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/data-room")({
  head: () => ({ meta: [{ title: "Data Room · V10.5" }] }),
  component: Page,
});
