import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalBillingUsageControls } from "@/v8/hooks";

export const Route = createFileRoute("/v8/billing-controls")({
  head: () => ({ meta: [{ title: "Global Billing & Usage Controls · Anderoute" }] }),
  component: () => {
    const { countries } = useGlobalBillingUsageControls();
    return (
      <V8Page icon={<DollarSign className="size-6 text-violet-300" />} title="Global Billing & Usage Control Center"
        blurb="Country readiness for subscriptions, usage, marketplace fees, API, partner billing, plus webhook & payment health.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={countries as any} columns={[
            { key: "country", label: "Country" },
            { key: "subscriptions", label: "Subs" },
            { key: "usage", label: "Usage" },
            { key: "marketplace_fees", label: "MP fees" },
            { key: "api", label: "API" },
            { key: "partner", label: "Partner" },
            { key: "webhook_failures", label: "Webhook fail" },
            { key: "failed_payments", label: "Failed pay" },
            { key: "disputes", label: "Disputes" },
            { key: "adjustments", label: "Adj" },
            { key: "currency", label: "Currency" },
            { key: "tax", label: "Tax" },
            { key: "localization", label: "Localization" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
