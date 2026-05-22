import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useCommercialOperatingModel();
  return (
    <V12Page icon={<Map className="size-6 text-cyan-300" />} title="Long-Term Commercial Operating Model" blurb="12 commercial functions with owner, maturity, and core KPI. Anchors the durable operating model across V12 and forward.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "fn", label: "Function" }, { key: "owner", label: "Owner" },
          { key: "maturity", label: "Maturity", render: (r: any) => `${r.maturity}%` },
          { key: "kpi", label: "KPI" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/operating-model")({
  head: () => ({ meta: [{ title: "Operating Model · V12" }] }),
  component: Page,
});
