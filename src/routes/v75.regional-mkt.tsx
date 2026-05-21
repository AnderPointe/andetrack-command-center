import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegionalMarketplaceActivation } from "@/v75/hooks";

export const Route = createFileRoute("/v75/regional-mkt")({
  head: () => ({ meta: [{ title: "Regional Marketplace Activation · V7.5 · Anderoute" }] }),
  component: () => {
    const { regions } = useRegionalMarketplaceActivation();
    return (
      <V75Page icon={<MapPin className="size-6 text-indigo-300" />} title="Regional Marketplace Activation"
        blurb="12-step regional activation: demand, supply, equipment, partner, support, compliance, fee controls, quality controls, dispute workflow, go-live.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={regions as any} columns={[
            { key: "region",     label: "Region" },
            { key: "readiness",  label: "Readiness", render: (r: any) => `${r.readiness}%` },
            { key: "demand",     label: "Demand", render: (r: any) => <StatusPill status={r.demand} /> },
            { key: "supply",     label: "Supply", render: (r: any) => <StatusPill status={r.supply} /> },
            { key: "equipment",  label: "Equipment", render: (r: any) => <StatusPill status={r.equipment} /> },
            { key: "partner",    label: "Partner", render: (r: any) => <StatusPill status={r.partner} /> },
            { key: "support",    label: "Support", render: (r: any) => <StatusPill status={r.support} /> },
            { key: "compliance", label: "Compliance", render: (r: any) => <StatusPill status={r.compliance} /> },
            { key: "status",     label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
