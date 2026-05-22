import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { ScoreCard } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const p = H.useTrustProcurementAccel().summary;
  return (
    <V115Page icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Trust-Led Procurement Acceleration" blurb="Compressing procurement cycles with refreshed trust packets. Mock-only.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Baseline cycle"     value={`${p.avg_cycle_days_baseline}d`} tone="amber" />
        <ScoreCard label="Now cycle"          value={`${p.avg_cycle_days_now}d`} tone="emerald" />
        <ScoreCard label="Packets refreshed"  value={p.packets_refreshed_30d} tone="sky" />
        <ScoreCard label="Open"               value={p.open} tone="violet" />
      </div>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/procurement")({
  head: () => ({ meta: [{ title: "Procurement Acceleration · V11.5" }] }),
  component: Page,
});
