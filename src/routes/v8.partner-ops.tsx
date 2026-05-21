import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalPartnerOperations } from "@/v8/hooks";

export const Route = createFileRoute("/v8/partner-ops")({
  head: () => ({ meta: [{ title: "Global Partner Operations · Anderoute" }] }),
  component: () => {
    const { partners, roadmap } = useGlobalPartnerOperations();
    return (
      <V8Page icon={<Plug className="size-6 text-violet-300" />} title="Global Partner Operations"
        blurb="Partners by country, launch status, security/compliance status, integration health, joint customers, risk, opportunity, and roadmap.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={partners as any} columns={[
            { key: "partner", label: "Partner" },
            { key: "country", label: "Country" },
            { key: "category", label: "Category" },
            { key: "launch", label: "Launch" },
            { key: "security", label: "Security" },
            { key: "compliance", label: "Compliance" },
            { key: "integration", label: "Integration" },
            { key: "support", label: "Support" },
            { key: "joint_customers", label: "Customers" },
            { key: "revenue_placeholder", label: "Revenue" },
            { key: "risk", label: "Risk" },
            { key: "opportunity", label: "Opp" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Roadmap</h3>
          <SimpleTable rows={roadmap as any} columns={[
            { key: "quarter", label: "Quarter" },
            { key: "item",    label: "Item" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
