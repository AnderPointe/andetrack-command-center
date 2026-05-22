import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const g = H.useStrategicGrowthPortfolio();
  return (
    <V105Page icon={<Rocket className="size-6 text-fuchsia-300" />} title="Strategic Growth Portfolio" blurb="Investment, risk, and outcome band across enterprise, expansion, marketplace, partner, trust, product-led, expansion categories.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Growth portfolio</h3>
        <SimpleTable rows={g.items as any} columns={[
          { key: "category", label: "Category" }, { key: "invest", label: "Invest" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "outcome_band", label: "Outcome band" },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/portfolio")({
  head: () => ({ meta: [{ title: "Growth Portfolio · V10.5" }] }),
  component: Page,
});
