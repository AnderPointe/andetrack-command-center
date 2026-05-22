import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { KpiGrid, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const a = H.useAPIEDIRevenueGovernance();
  return (
    <V12Page icon={<Briefcase className="size-6 text-cyan-300" />} title="API / EDI Revenue Governance" blurb="API plans, usage, overages, EDI transaction volume, and billing exceptions. EDI revenue values remain placeholders.">
      <KpiGrid cols={4} items={[
        { label: "API plans",        value: String(a.api.plans) },
        { label: "API MAU",          value: String(a.api.mau) },
        { label: "API overage (Q)",  value: `$${(a.api.overage_usd_q/1000).toFixed(0)}k` },
        { label: "API tickets",      value: String(a.api.support_tickets) },
        { label: "EDI txns (Q)",     value: a.edi.txns_q.toLocaleString() },
        { label: "EDI tickets",      value: String(a.edi.support_tickets) },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Billing exceptions</h3>
        <SimpleTable rows={a.exceptions as any} columns={[
          { key: "item", label: "Item" }, { key: "count", label: "Count" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/api-edi")({
  head: () => ({ meta: [{ title: "API/EDI Revenue Governance · V12" }] }),
  component: Page,
});
