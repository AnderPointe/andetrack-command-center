import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalRiskControlCommand } from "@/v8/hooks";

export const Route = createFileRoute("/v8/risk-control")({
  head: () => ({ meta: [{ title: "Global Risk & Control · Anderoute" }] }),
  component: () => {
    const { matrix } = useGlobalRiskControlCommand();
    return (
      <V8Page icon={<AlertTriangle className="size-6 text-violet-300" />} title="Global Risk & Control Command Center"
        blurb="14 risk/control areas — country launch, compliance, financial, billing, marketplace, carrier, customer, support, partner, API/EDI, mobile, AI governance, and strategic governance.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={matrix as any} columns={[
            { key: "area",       label: "Area" },
            { key: "likelihood", label: "Likelihood" },
            { key: "impact",     label: "Impact" },
            { key: "owner",      label: "Owner" },
            { key: "mitigation", label: "Mitigation" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
