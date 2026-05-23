import { createFileRoute } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const ri = H.useRevenueIntelligenceMaturity();
  const trends = H.useV13RevIntelTrends();
  return (
    <V13Page icon={<Globe2 className="size-6 text-indigo-300" />} title="Revenue Intelligence Maturity Center" blurb="Mix maturity, regional maturity, and revenue risk. Predictability is placeholder-only.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Revenue intel" value={ri.score} tone="emerald" />
        <ScoreCard label="Lines tracked" value={ri.mix.length} tone="sky" />
        <ScoreCard label="Regions" value={ri.regions.length} tone="violet" />
        <ScoreCard label="Risks" value={ri.risks.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue mix maturity</h3>
        <SimpleTable rows={ri.mix as any} columns={[
          { key: "line", label: "Line" }, { key: "quality", label: "Quality" }, { key: "share_pct", label: "Share %" },
        ]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Regional maturity</h3>
          <SimpleTable rows={ri.regions as any} columns={[{ key: "region", label: "Region" }, { key: "maturity", label: "Maturity" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Revenue risks</h3>
          <SimpleTable rows={ri.risks as any} columns={[{ key: "risk", label: "Risk" }, { key: "severity", label: "Sev." }, { key: "owner", label: "Owner" }]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue intel trend (last 4Q)</h3>
        <SimpleTable rows={trends as any} columns={[
          { key: "quarter", label: "Quarter" }, { key: "score", label: "Score" },
          { key: "sub_quality", label: "Sub" }, { key: "mp_quality", label: "MP" }, { key: "api_quality", label: "API" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/revenue-intel")({
  head: () => ({ meta: [{ title: "Revenue Intelligence · Phase 39" }] }),
  component: Page,
});
