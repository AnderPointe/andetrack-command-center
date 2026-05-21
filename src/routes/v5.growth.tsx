import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { GROWTH_INITIATIVES } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/growth")({
  head: () => ({ meta: [{ title: "Strategic Growth · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Rocket className="size-6 text-fuchsia-300" />} title="Strategic Growth Planning"
      blurb="Initiative scorecards across new regions, verticals, carrier network, partner ecosystem, and monetization.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Initiatives</h3>
        <div className="mt-2">
          <SimpleTable rows={GROWTH_INITIATIVES} columns={[
            { key: "area",        label: "Area" },
            { key: "opportunity", label: "Opportunity" },
            { key: "score",       label: "Score (1-10)" },
            { key: "owner",       label: "Owner" },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
