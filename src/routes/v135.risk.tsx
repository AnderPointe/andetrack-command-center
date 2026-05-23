import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135RiskRegister();
  return (
    <V135Page icon={<AlertTriangle className="size-6 text-fuchsia-300" />} title="Strategic Risk Durability Register" blurb="16 risk categories across revenue, MP, API/EDI, partner, evidence, board, and capital.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
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
