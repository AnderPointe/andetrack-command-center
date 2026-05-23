import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const diligence = H.useV135DiligenceContinuity();
  const evidence = H.useV135EvidenceVault();
  const capEvidence = H.useV135CapitalEvidence();
  const cap = H.useV135CapitalStrategy();
  const invest = H.useV135StrategicInvestments();
  return (
    <V135Page icon={<Wallet className="size-6 text-fuchsia-300" />} title="Capital Watch & Strategy Execution" blurb="Capital strategy execution, always-on diligence, capital evidence freshness, and strategic investment governance.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Capital strategy milestones</h3>
        <SimpleTable rows={cap.milestones as any} columns={[
          { key: "milestone", label: "Milestone" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Strategic investment governance</h3>
        <SimpleTable rows={invest as any} columns={[
          { key: "investment", label: "Investment" }, { key: "thesis", label: "Thesis" },
          { key: "stage", label: "Stage" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Diligence continuity</h3>
          <SimpleTable rows={diligence as any} columns={[
            { key: "area", label: "Area" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Capital evidence freshness</h3>
          <SimpleTable rows={capEvidence as any} columns={[
            { key: "evidence", label: "Evidence" }, { key: "freshness_d", label: "Fresh (d)" }, { key: "owner", label: "Owner" },
          ]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Operating evidence freshness</h3>
        <SimpleTable rows={evidence as any} columns={[
          { key: "evidence", label: "Evidence" }, { key: "freshness_d", label: "Fresh (d)" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/capital-watch")({
  head: () => ({ meta: [{ title: "Capital Watch · V13.5" }] }),
  component: Page,
});
