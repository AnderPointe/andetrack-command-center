import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Platform Economics Maturity Center";
const BLURB = "Revenue quality, product-line mix, unit economics placeholders, predictability, concentration risk.";

function Page() {
  const e = H.usePlatformEconomicsMaturity();
  return (
    <V10Page icon={<Wallet className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Revenue quality"    value={e.summary.revenue_quality} tone="emerald" />
        <ScoreCard label="Predictability"     value={e.summary.predictability} tone="sky" />
        <ScoreCard label="Concentration risk" value={`${e.summary.concentration_risk}%`} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue mix</h3>
        <SimpleTable rows={e.mix as any} columns={[
          { key: "line", label: "Product line" },
          { key: "mix_pct", label: "Mix %", render: (r: any) => `${r.mix_pct}%` },
          { key: "quality", label: "Quality", render: (r: any) => `${r.quality}%` },
        ]} />
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Unit economics (placeholders)</h3>
          <SimpleTable rows={e.unit as any} columns={[{ key: "axis", label: "Axis" }, { key: "value", label: "Value" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Economics risk panel</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {e.risks.map(r => (
              <li key={r.id} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-1.5">
                <div><div>{r.risk}</div><div className="text-xs text-muted-foreground">owner: {r.owner}</div></div>
                <StatusPill status={r.level} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/economics")({
  head: () => ({ meta: [{ title: "Platform Economics Maturity Center · Anderoute V10" }] }),
  component: Page,
});
