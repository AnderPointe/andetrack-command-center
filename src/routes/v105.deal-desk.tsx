import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const d = H.useEnterpriseDealDesk();
  return (
    <V105Page icon={<ClipboardList className="size-6 text-fuchsia-300" />} title="Enterprise Deal Desk" blurb="Pricing exceptions, packaging requests, approval routing, executive approvals.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Deal desk queue</h3>
        <SimpleTable rows={d.desk as any} columns={[
          { key: "id", label: "ID" }, { key: "deal", label: "Deal" }, { key: "request", label: "Request" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "approvals", label: "Approvals" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/deal-desk")({
  head: () => ({ meta: [{ title: "Deal Desk · V10.5" }] }),
  component: Page,
});
