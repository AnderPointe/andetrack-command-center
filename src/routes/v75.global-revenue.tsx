import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalRevenueControls } from "@/v75/hooks";

export const Route = createFileRoute("/v75/global-revenue")({
  head: () => ({ meta: [{ title: "Global Revenue Controls · V7.5 · Anderoute" }] }),
  component: () => {
    const { countries } = useGlobalRevenueControls();
    return (
      <V75Page icon={<DollarSign className="size-6 text-indigo-300" />} title="Global Revenue Control Execution"
        blurb="Country-by-country billing readiness: currency, tax, processor, invoice localization, subscription/usage/marketplace/API controls.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={countries as any} columns={[
            { key: "country", label: "Country" },
            { key: "billing", label: "Billing", render: (r: any) => <StatusPill status={r.billing} /> },
            { key: "currency", label: "Currency" },
            { key: "tax",     label: "Tax", render: (r: any) => <StatusPill status={r.tax} /> },
            { key: "processor", label: "Processor", render: (r: any) => <StatusPill status={r.processor} /> },
            { key: "invoice_l10n", label: "Invoice L10n", render: (r: any) => <StatusPill status={r.invoice_l10n} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
