import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useInternationalCustomerSuccess } from "@/v75/hooks";

export const Route = createFileRoute("/v75/intl-customers")({
  head: () => ({ meta: [{ title: "International Customer Success · V7.5 · Anderoute" }] }),
  component: () => {
    const { customers, summary } = useInternationalCustomerSuccess();
    return (
      <V75Page icon={<Users className="size-6 text-indigo-300" />} title="International Customer Success"
        blurb="Per-customer country, localization/support/billing/compliance/integration needs, adoption, health, expansion, renewal risk.">
        <KpiGrid cols={4} items={[
          { label: "Customers",    value: summary.total },
          { label: "Avg health",   value: `${summary.avg_health}%` },
          { label: "Avg adoption", value: `${summary.avg_adoption}%` },
          { label: "At risk",      value: summary.at_risk },
        ]} />

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={customers as any} columns={[
            { key: "customer",     label: "Customer" },
            { key: "country",      label: "Country" },
            { key: "health",       label: "Health", render: (r: any) => `${r.health}%` },
            { key: "adoption",     label: "Adoption", render: (r: any) => `${r.adoption}%` },
            { key: "expansion",    label: "Expansion", render: (r: any) => <StatusPill status={r.expansion} /> },
            { key: "renewal_risk", label: "Renewal risk", render: (r: any) => <StatusPill status={r.renewal_risk} /> },
            { key: "owner",        label: "Owner" },
            { key: "needs",        label: "Needs" },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
