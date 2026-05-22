import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const r = H.useGrowthRiskControls();
  const high = r.filter((x) => x.risk === "high").length;
  const med = r.filter((x) => x.risk === "med").length;
  return (
    <V125Page icon={<AlertTriangle className="size-6 text-teal-300" />} title="Growth Risk &amp; Control Matrix" blurb="15 growth risk areas mapped to controls and owners.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Risks"  value={r.length} tone="sky" />
        <ScoreCard label="High"   value={high}     tone="rose" />
        <ScoreCard label="Med"    value={med}      tone="amber" />
        <ScoreCard label="Low"    value={r.length - high - med} tone="emerald" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r as any} columns={[
          { key: "area", label: "Area" }, { key: "risk", label: "Risk" }, { key: "control", label: "Control" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/risk")({
  head: () => ({ meta: [{ title: "Growth Risk · V12.5" }] }),
  component: Page,
});
