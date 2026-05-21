import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useProductLineInvestmentGovernance } from "@/v65/hooks";

export const Route = createFileRoute("/v65/product-lines")({
  head: () => ({ meta: [{ title: "Product-Line Investment · V6.5 · Anderoute" }] }),
  component: () => {
    const { lines } = useProductLineInvestmentGovernance();
    return (
      <V65Page icon={<TrendingUp className="size-6 text-cyan-300" />} title="Product-Line Investment Governance"
        blurb="Dispatch CC, EliteNav, Driver Mobile, Customer Portal, CoPilot AI, Marketplace, API, EDI, Telematics, Partner Marketplace, Enterprise Gov, Reporting — scored for revenue, adoption, retention, expansion, strategic value.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={lines} columns={[
            { key: "line",       label: "Product line" },
            { key: "rev",        label: "Revenue" },
            { key: "adopt",      label: "Adoption" },
            { key: "support",    label: "Support load" },
            { key: "eff",        label: "Effort (pl)" },
            { key: "strat",      label: "Strategic" },
            { key: "retention",  label: "Retention" },
            { key: "rec",        label: "Recommendation", render: (r) => <StatusPill status={r.rec} /> },
          ]} />
        </Card>
      </V65Page>
    );
  },
});
