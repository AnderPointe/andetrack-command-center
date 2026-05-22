import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Enterprise Trust Commercialization Center";
const BLURB = "Turn trust, controls, evidence, security, compliance, and governance into sales and procurement advantage.";

function Page() {
  const t = H.useEnterpriseTrustCommercialization();
  return (
    <V10Page icon={<ShieldCheck className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Sales readiness" value={t.summary.sales_readiness} tone="emerald" />
        <ScoreCard label="Packets ready"   value={`${t.summary.packets_ready} / ${t.summary.packets_total}`} tone="sky" />
        <ScoreCard label="Deal blockers"   value={t.queue.filter(q => q.blocker !== "—").length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Trust packet library</h3>
        <SimpleTable rows={t.packets as any} columns={[
          { key: "packet", label: "Packet" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Deal trust support queue</h3>
        <SimpleTable rows={t.queue as any} columns={[
          { key: "deal", label: "Deal" }, { key: "blocker", label: "Blocker" },
          { key: "owner", label: "Owner" }, { key: "eta", label: "ETA" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Trust collateral library</h3>
        <SimpleTable rows={t.collateral as any} columns={[
          { key: "asset", label: "Asset" }, { key: "updated", label: "Updated" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/trust-commerce")({
  head: () => ({ meta: [{ title: "Enterprise Trust Commercialization Center · Anderoute V10" }] }),
  component: Page,
});
