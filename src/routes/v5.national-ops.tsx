import { createFileRoute } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { REGIONAL_REVIEW } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/national-ops")({
  head: () => ({ meta: [{ title: "National Ops Review · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Globe2 className="size-6 text-fuchsia-300" />} title="National Operations Review"
      blurb="Per-region rollup of coverage, demand, delays, support burden, and expansion recommendations.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Regions</h3>
        <div className="mt-2">
          <SimpleTable rows={REGIONAL_REVIEW} columns={[
            { key: "region",    label: "Region" },
            { key: "coverage",  label: "Cov %" },
            { key: "demand",    label: "Demand",   render: r => <StatusPill status={r.demand} /> },
            { key: "delays",    label: "Delays",   render: r => <StatusPill status={r.delays} /> },
            { key: "support",   label: "Support",  render: r => <StatusPill status={r.support} /> },
            { key: "expansion", label: "Expansion" },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
