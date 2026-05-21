import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalEnterpriseCustomerReadiness } from "@/v7/hooks";

export const Route = createFileRoute("/v7/enterprise-customers")({
  head: () => ({ meta: [{ title: "Enterprise Customers · V7 · Anderoute" }] }),
  component: () => {
    const { accounts } = useGlobalEnterpriseCustomerReadiness();
    return (
      <V7Page icon={<Users className="size-6 text-indigo-300" />} title="Global Enterprise Customer Readiness"
        blurb="Per-account products, localization, billing, residency, security review, expansion opportunity, renewal risk.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={accounts as any} columns={[
            { key: "account",         label: "Account" },
            { key: "region",          label: "Region" },
            { key: "products",        label: "Products" },
            { key: "localization",    label: "Localization" },
            { key: "billing",         label: "Billing" },
            { key: "residency",       label: "Residency",      render: (r: any) => <StatusPill status={r.residency} /> },
            { key: "security_review", label: "Security",       render: (r: any) => <StatusPill status={r.security_review} /> },
            { key: "expansion",       label: "Expansion" },
            { key: "risk",            label: "Risk",           render: (r: any) => <StatusPill status={r.risk} /> },
          ]} />
        </Card>
      </V7Page>
    );
  },
});
