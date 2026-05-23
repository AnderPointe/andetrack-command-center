import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const c = H.useEnterpriseOperatingControls();
  const watch = c.filter(x => x.status === "watch").length;
  return (
    <V145Page icon={<Compass className="size-6 text-fuchsia-300" />} title="Enterprise Operating Controls Matrix" blurb="Control domains spanning capital, revenue, marketplace, category, board, accounts, partners, products, evidence, diligence, risk and cadence.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Domains" value={c.length} tone="violet" />
        <ScoreCard label="Watch" value={watch} tone="amber" />
        <ScoreCard label="Owners" value={new Set(c.map(x => x.owner)).size} tone="emerald" />
      </div>
      <Section title="OperatingControlMatrix">
        <SimpleTable rows={c as any} columns={[
          { key: "domain", label: "Domain" }, { key: "owner", label: "Owner" },
          { key: "tested", label: "Tested" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/op-controls")({ head: () => ({ meta: [{ title: "Operating Controls · V14.5" }] }), component: Page });
