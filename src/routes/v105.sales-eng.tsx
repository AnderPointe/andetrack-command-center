import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const s = H.useSalesEngineeringReadiness();
  return (
    <V105Page icon={<Wrench className="size-6 text-fuchsia-300" />} title="Sales Engineering Readiness" blurb="Demos, validation, integration, security architecture, FAQ, POC plan templates.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">SE readiness checklist</h3>
        <SimpleTable rows={s.items as any} columns={[
          { key: "item", label: "Item" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/sales-eng")({
  head: () => ({ meta: [{ title: "Sales Engineering · V10.5" }] }),
  component: Page,
});
