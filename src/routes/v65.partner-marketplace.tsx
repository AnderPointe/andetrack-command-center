import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdvancedPartnerMarketplace } from "@/v65/hooks";

export const Route = createFileRoute("/v65/partner-marketplace")({
  head: () => ({ meta: [{ title: "Partner Marketplace · V6.5 · Anderoute" }] }),
  component: () => {
    const { categories, listings } = useAdvancedPartnerMarketplace();
    return (
      <V65Page icon={<Boxes className="size-6 text-cyan-300" />} title="Advanced Partner Marketplace"
        blurb="Telematics, EDI, API, TMS, accounting, fuel cards, maintenance, insurance (placeholder), carrier networks, hardware, document storage, notification, AI, maps, portal add-ons.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Categories</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {categories.map(c => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Partner listings</h3>
          <div className="mt-2">
            <SimpleTable rows={listings} columns={[
              { key: "id",            label: "ID" },
              { key: "name",          label: "Partner" },
              { key: "category",      label: "Category" },
              { key: "status",        label: "Status",       render: (r) => <StatusPill status={r.status} /> },
              { key: "rating_pl",     label: "Rating (pl)" },
              { key: "certified_pl",  label: "Certification" },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
