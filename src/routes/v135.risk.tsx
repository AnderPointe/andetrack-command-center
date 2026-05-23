import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135RiskRegister();
  const exec = H.useV135StrategicRiskExecution();
  return (
    <V135Page icon={<AlertTriangle className="size-6 text-fuchsia-300" />} title="Strategic Risk Register & Execution" blurb="16-category risk register plus active mitigation execution with owners and status.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Risk execution</h3>
        <SimpleTable rows={exec as any} columns={[
          { key: "risk", label: "Risk" }, { key: "mitigation", label: "Mitigation" },
          { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Full risk register</h3>
        <SimpleTable rows={rows as any} columns={[
          { key: "risk", label: "Risk" }, { key: "owner", label: "Owner" }, { key: "severity", label: "Severity" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/risk")({
  head: () => ({ meta: [{ title: "Risk Durability · V13.5" }] }),
  component: Page,
});
