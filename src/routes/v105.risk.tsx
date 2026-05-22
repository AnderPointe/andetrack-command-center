import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const r = H.useCommercialRiskManagement();
  return (
    <V105Page icon={<AlertTriangle className="size-6 text-fuchsia-300" />} title="Platform Commercial Risk Management" blurb="Pipeline, procurement, concentration, churn, MP proof, partner, pricing, category narrative risks.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Commercial risk register</h3>
        <SimpleTable rows={r.risks as any} columns={[
          { key: "risk", label: "Risk" },
          { key: "severity", label: "Severity", render: (x: any) => <StatusPill status={x.severity} /> },
          { key: "owner", label: "Owner" }, { key: "mitigation", label: "Mitigation" },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/risk")({
  head: () => ({ meta: [{ title: "Commercial Risk · V10.5" }] }),
  component: Page,
});
