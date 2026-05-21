import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useNetworkOperatingIntelligence } from "@/v6/hooks";

export const Route = createFileRoute("/v6/network-ops")({
  head: () => ({ meta: [{ title: "Network Ops Intelligence · V6" }] }),
  component: () => {
    const { regions, recs } = useNetworkOperatingIntelligence();
    return (
      <V6Page icon={<Map className="size-6 text-emerald-300" />} title="National Network Operating Intelligence"
        blurb="Regional health, carrier coverage, demand, driver density, equipment availability, lane reliability, support burden, revenue index (placeholder) and expansion recommendations.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={regions} columns={[
            { key: "region",         label: "Region" },
            { key: "health",         label: "Health" },
            { key: "carrier_cov",    label: "Carrier cov" },
            { key: "demand",         label: "Demand" },
            { key: "driver_density", label: "Driver density" },
            { key: "equip",          label: "Equip avail" },
            { key: "liquidity",      label: "Liquidity" },
            { key: "lane_rel",       label: "Lane rel" },
            { key: "support",        label: "Support", render: (r) => <StatusPill status={r.support} /> },
            { key: "revenue_idx",    label: "Rev idx (pl)" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Expansion recommendations</h3>
          <ul className="mt-2 space-y-1 text-xs">
            {recs.map(r => (
              <li key={r.id} className="flex justify-between"><span className="text-muted-foreground">{r.region}</span><span className="text-foreground">{r.action}</span><span className="text-emerald-300">{r.impact}</span></li>
            ))}
          </ul>
        </Card>
      </V6Page>
    );
  },
});
