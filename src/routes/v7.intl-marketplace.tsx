import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useInternationalPartnerMarketplace } from "@/v7/hooks";

export const Route = createFileRoute("/v7/intl-marketplace")({
  head: () => ({ meta: [{ title: "International Partner Marketplace · V7 · Anderoute" }] }),
  component: () => {
    const { listings } = useInternationalPartnerMarketplace();
    return (
      <V7Page icon={<Boxes className="size-6 text-indigo-300" />} title="International Partner Marketplace"
        blurb="Regional partner catalog with availability, revshare, and approval status. Legal/compliance review remains a placeholder per region.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={listings as any} columns={[
            { key: "listing",      label: "Listing" },
            { key: "region",       label: "Region" },
            { key: "availability", label: "Availability", render: (r: any) => <StatusPill status={r.availability} /> },
            { key: "revshare",     label: "Revshare" },
            { key: "status",       label: "Status",       render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V7Page>
    );
  },
});
