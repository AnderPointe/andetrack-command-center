import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useCommercialRiskControl();
  return (
    <V12Page icon={<AlertTriangle className="size-6 text-cyan-300" />} title="Commercial Risk Control Center" blurb="16 commercial risk categories, with likelihood, impact, owner, and mitigation. No certainty claims on revenue projections.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "risk", label: "Risk" }, { key: "likelihood", label: "Likelihood" },
          { key: "impact", label: "Impact" }, { key: "owner", label: "Owner" }, { key: "mitigation", label: "Mitigation" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/risk")({
  head: () => ({ meta: [{ title: "Commercial Risk · V12" }] }),
  component: Page,
});
