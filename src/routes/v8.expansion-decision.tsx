import { createFileRoute } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegionalExpansionDecision } from "@/v8/hooks";

export const Route = createFileRoute("/v8/expansion-decision")({
  head: () => ({ meta: [{ title: "Regional Expansion Decision Engine · Anderoute" }] }),
  component: () => {
    const { rows } = useRegionalExpansionDecision();
    return (
      <V8Page icon={<Target className="size-6 text-violet-300" />} title="Regional Expansion Decision Engine"
        blurb="Demand, supply, partner, compliance, billing, support, financial, liquidity, residency, strategic value, revenue, and complexity → recommendation + action plan + executive approval.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={rows as any} columns={[
            { key: "country", label: "Country" },
            { key: "demand", label: "Demand" },
            { key: "supply", label: "Supply" },
            { key: "partner", label: "Partner" },
            { key: "compliance", label: "Comp" },
            { key: "billing", label: "Bill" },
            { key: "support", label: "Sup" },
            { key: "financial", label: "Fin" },
            { key: "liquidity", label: "Liq" },
            { key: "residency", label: "Residency" },
            { key: "value", label: "Value" },
            { key: "revenue", label: "Rev" },
            { key: "complexity", label: "Cplx" },
            { key: "risk", label: "Risk" },
            { key: "recommendation", label: "Recommendation" },
            { key: "action", label: "Action" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
