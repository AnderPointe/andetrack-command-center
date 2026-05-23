import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const r = H.useV135Retention();
  return (
    <V135Page icon={<Activity className="size-6 text-fuchsia-300" />} title="Retention & Expansion Durability" blurb="NRR and GRR trajectory across the last 4 quarters.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="NRR" value={`${r.nrr_pct}%`} tone="emerald" />
        <ScoreCard label="GRR" value={`${r.grr_pct}%`} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.trend as any} columns={[
          { key: "q", label: "Q" }, { key: "nrr", label: "NRR" }, { key: "grr", label: "GRR" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/retention")({
  head: () => ({ meta: [{ title: "Retention Durability · V13.5" }] }),
  component: Page,
});
