import { createFileRoute } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const g = H.useGlobalAccountExpansion();
  return (
    <V12Page icon={<Globe2 className="size-6 text-cyan-300" />} title="Global Account Expansion Dashboard" blurb="Multi-region accounts, adoption signals across driver / portal / CoPilot, and recommended expansion plays.">
      <div className="grid gap-3 md:grid-cols-5">
        <ScoreCard label="Global"          value={String(g.total_global)}     tone="emerald" />
        <ScoreCard label="Multi-region"    value={String(g.multi_region)}     tone="sky" />
        <ScoreCard label="Expansion-ready" value={String(g.expansion_ready)}  tone="violet" />
        <ScoreCard label="At-risk"         value={String(g.at_risk)}          tone="rose" />
        <ScoreCard label="Regulated"       value={String(g.regulated)}        tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={g.rows as any} columns={[
          { key: "account", label: "Account" }, { key: "regions", label: "Regions" },
          { key: "driver_adopt_pct", label: "Driver", render: (r: any) => `${r.driver_adopt_pct}%` },
          { key: "portal_pct",       label: "Portal", render: (r: any) => `${r.portal_pct}%` },
          { key: "copilot_pct",      label: "CoPilot", render: (r: any) => `${r.copilot_pct}%` },
          { key: "play", label: "Expansion play" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/global-expansion")({
  head: () => ({ meta: [{ title: "Global Account Expansion · V12" }] }),
  component: Page,
});
