import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const s = H.useEnterpriseSalesOperatingSystem();
  return (
    <V105Page icon={<Briefcase className="size-6 text-fuchsia-300" />} title="Enterprise Sales Operating System" blurb="Accounts, opportunities, buying committee, close plan.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Account / opportunity board</h3>
        <SimpleTable rows={s.accounts as any} columns={[
          { key: "account", label: "Account" }, { key: "segment", label: "Segment" }, { key: "region", label: "Region" },
          { key: "sponsor", label: "Sponsor" }, { key: "stage", label: "Stage" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Buying committee — Northwind</h3>
        <SimpleTable rows={s.committee as any} columns={[
          { key: "role", label: "Role" }, { key: "contact", label: "Contact" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Close plan</h3>
        <SimpleTable rows={s.closePlan as any} columns={[
          { key: "step", label: "Step" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/sales-os")({
  head: () => ({ meta: [{ title: "Enterprise Sales OS · V10.5" }] }),
  component: Page,
});
