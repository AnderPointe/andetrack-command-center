import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const p = H.useTrustProcurementAccel().summary;
  return (
    <V115Page icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Trust-Led Procurement Acceleration" blurb="Compressing procurement cycles with refreshed trust packets. Mock-only.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Baseline cycle"     value={`${p.avg_cycle_days_baseline}d`} tone="amber" />
        <ScoreCard label="Now cycle"          value={`${p.avg_cycle_days_now}d`} tone="emerald" />
        <ScoreCard label="Packets refreshed"  value={String(p.packets_refreshed_30d)} tone="sky" />
        <ScoreCard label="Open"               value={String(p.open)} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Procurement acceleration outcome</h3>
        <p className="mt-2 text-sm text-muted-foreground">Cycle time is down from {p.avg_cycle_days_baseline} to {p.avg_cycle_days_now} days, with trust packet acceptance at {p.trust_acceptance_pct}%. The center is positioned as a sales-enablement engine rather than a passive security artifact repository.</p>
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/procurement")({
  head: () => ({ meta: [{ title: "Procurement Acceleration · V11.5" }] }),
  component: Page,
});
