import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const diligence = H.useV135DiligenceContinuity();
  const evidence = H.useV135EvidenceVault();
  return (
    <V135Page icon={<Wallet className="size-6 text-fuchsia-300" />} title="Capital Watch" blurb="Combined capital readiness watch — always-on diligence + evidence freshness side by side.">
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Diligence continuity</h3>
          <SimpleTable rows={diligence as any} columns={[
            { key: "area", label: "Area" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Evidence freshness</h3>
          <SimpleTable rows={evidence as any} columns={[
            { key: "evidence", label: "Evidence" }, { key: "freshness_d", label: "Fresh (d)" }, { key: "owner", label: "Owner" },
          ]} />
        </Card>
      </div>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/capital-watch")({
  head: () => ({ meta: [{ title: "Capital Watch · V13.5" }] }),
  component: Page,
});
