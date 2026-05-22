import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const t = H.useTrustMonetization();
  return (
    <V105Page icon={<ShieldCheck className="size-6 text-fuchsia-300" />} title="Trust Monetization Center" blurb="Turn security, compliance, governance, and audit evidence into commercial advantage.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Trust monetization" value={t.summary.score} tone="emerald" />
        <ScoreCard label="Deals unblocked"    value={t.summary.deals_unblocked} tone="sky" />
        <ScoreCard label="Packet uses 30d"    value={t.summary.packet_uses_30d} tone="violet" />
        <ScoreCard label="Sec response (h)"   value={`${t.response.median_hours}h`} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Trust asset usage</h3>
        <SimpleTable rows={t.usage as any} columns={[
          { key: "asset", label: "Asset" }, { key: "uses_30d", label: "Uses (30d)" },
          { key: "freshness", label: "Freshness", render: (r: any) => <StatusPill status={r.freshness} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Deal trust acceleration</h3>
        <SimpleTable rows={t.accel as any} columns={[
          { key: "deal", label: "Deal" }, { key: "asset", label: "Asset" }, { key: "impact", label: "Impact" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Trust monetization — lever breakdown</h3>
        <p className="mt-1 text-xs text-muted-foreground">Which trust assets unblocked deals and shaved cycle time in the last 30 days.</p>
        <SimpleTable rows={H.useV105TrustMonetizationBreakdown() as any} columns={[
          { key: "lever", label: "Lever" },
          { key: "deals_unblocked", label: "Deals unblocked" },
          { key: "cycle_days_saved", label: "Cycle days saved" },
          { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/trust")({
  head: () => ({ meta: [{ title: "Trust Monetization · V10.5" }] }),
  component: Page,
});
