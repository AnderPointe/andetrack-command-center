import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const f = H.useCommercialForecastGovernance();
  return (
    <V12Page icon={<Activity className="size-6 text-cyan-300" />} title="Commercial Forecast Governance — Placeholder" blurb="Forecast cadence, owner, and confidence only. No accuracy or variance claims.">
      <ScoreCard label="Overall confidence" value={`${f.confidence_pct}%`} tone="amber" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={f.rows as any} columns={[
          { key: "stream", label: "Stream" }, { key: "owner", label: "Owner" },
          { key: "confidence", label: "Confidence", render: (r: any) => `${r.confidence}%` },
          { key: "cadence", label: "Cadence" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/forecast")({
  head: () => ({ meta: [{ title: "Forecast Governance · V12" }] }),
  component: Page,
});
