import { createFileRoute } from "@tanstack/react-router";
import { Stamp } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const d = H.useCommercialDiligenceDiscipline();
  const stale = d.filter(x => x.status === "stale").length;
  const watch = d.filter(x => x.status === "watch").length;
  return (
    <V145Page icon={<Stamp className="size-6 text-fuchsia-300" />} title="Commercial Diligence Discipline Center" blurb="Pipeline, deal exec, revenue, concentration, marketplace, API/EDI, partner, pricing, procurement, trust-led sales, risk, board, category proof.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Diligence domains" value={d.length} tone="violet" />
        <ScoreCard label="Stale" value={stale} tone="rose" />
        <ScoreCard label="Watch" value={watch} tone="amber" />
      </div>
      <Section title="DiligenceDisciplineMatrix">
        <SimpleTable rows={d as any} columns={[
          { key: "domain", label: "Domain" }, { key: "owner", label: "Owner" },
          { key: "fresh_days", label: "Age (days)" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/diligence")({ head: () => ({ meta: [{ title: "Commercial Diligence · V14.5" }] }), component: Page });
