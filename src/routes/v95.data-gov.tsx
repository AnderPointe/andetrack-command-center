import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const d = H.useDataGovernanceMaturity();
  return (
    <V95Page icon={<Database className="size-6 text-cyan-300" />} title="Data Governance Maturity" blurb="Ownership matrix, classification, retention, access reviews, API/EDI exposure, AI usage, customer/driver data boundaries, audit logging, deletion/legal hold placeholders.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Data governance" value={d.summary.score} tone="emerald" />
        <ScoreCard label="Owners assigned" value={d.summary.owners_assigned} tone="sky" />
        <ScoreCard label="Open exceptions" value={d.summary.exceptions} tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Data ownership matrix</h3>
        <div className="mt-2">
          <SimpleTable rows={d.datasets as any} columns={[
            { key: "dataset", label: "Dataset" }, { key: "owner", label: "Owner" },
            { key: "classification", label: "Classification" }, { key: "retention", label: "Retention" },
          ]} />
        </div>
      </Card>
      <Card className="border-rose-400/30 bg-rose-500/5 p-4">
        <h3 className="text-sm font-semibold text-rose-200">Exception queue</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {d.exceptions.map((x) => <li key={x.id}>· {x.item} (owner: {x.owner})</li>)}
        </ul>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/data-gov")({
  head: () => ({ meta: [{ title: "Data Governance · Anderoute V9.5" }] }),
  component: Page,
});
