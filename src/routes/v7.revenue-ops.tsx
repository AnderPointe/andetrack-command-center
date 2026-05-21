import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalRevenueOperations } from "@/v7/hooks";

export const Route = createFileRoute("/v7/revenue-ops")({
  head: () => ({ meta: [{ title: "Global Revenue Ops · V7 · Anderoute" }] }),
  component: () => {
    const { revenue, currency, tax } = useGlobalRevenueOperations();
    return (
      <V7Page icon={<DollarSign className="size-6 text-indigo-300" />} title="Global Revenue Operations"
        blurb="Revenue by region and product line, currency readiness, tax readiness. Region/country splits are placeholders until live billing supports multi-region.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Revenue by region × product (placeholder, $k)</h3>
          <div className="mt-2">
            <SimpleTable rows={revenue as any} columns={[
              { key: "region",      label: "Region" },
              { key: "saas",        label: "SaaS" },
              { key: "marketplace", label: "Mkt" },
              { key: "api",         label: "API" },
              { key: "edi",         label: "EDI" },
              { key: "partner",     label: "Partner" },
              { key: "support",     label: "Support" },
            ]} />
          </div>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Currency readiness</h3>
            <div className="mt-2">
              <SimpleTable rows={currency as any} columns={[
                { key: "currency", label: "Currency" },
                { key: "status",   label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
              ]} />
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Tax readiness</h3>
            <div className="mt-2">
              <SimpleTable rows={tax as any} columns={[
                { key: "region", label: "Region" },
                { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
              ]} />
            </div>
          </Card>
        </div>
      </V7Page>
    );
  },
});
