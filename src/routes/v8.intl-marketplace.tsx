import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useInternationalMarketplaceExpansion } from "@/v8/hooks";

export const Route = createFileRoute("/v8/intl-marketplace")({
  head: () => ({ meta: [{ title: "International Marketplace Expansion · Anderoute" }] }),
  component: () => {
    const { countries, recs } = useInternationalMarketplaceExpansion();
    return (
      <V8Page icon={<MapPin className="size-6 text-violet-300" />} title="International Marketplace Expansion"
        blurb="Carrier supply, load demand, equipment coverage, bid activity, awards, gaps, quality, compliance, and disputes by country.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={countries as any} columns={[
            { key: "country", label: "Country" },
            { key: "state",   label: "State" },
            { key: "carriers", label: "Carriers" },
            { key: "demand",   label: "Demand" },
            { key: "equipment_cov", label: "Equip %" },
            { key: "ttfb_min", label: "TTFB" },
            { key: "ttaward_min", label: "TTAward" },
            { key: "gaps",   label: "Gaps" },
            { key: "quality", label: "Quality" },
            { key: "compliance", label: "Comp" },
            { key: "disputes", label: "Disputes" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Recommendations</h3>
          <SimpleTable rows={recs as any} columns={[
            { key: "country", label: "Country" },
            { key: "recommendation", label: "Action" },
            { key: "owner", label: "Owner" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
