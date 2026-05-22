import { createFileRoute } from "@tanstack/react-router";
import { Repeat } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Customer Retention Expansion Command Center";
const BLURB = "Renewal/expansion readiness, churn risk, health and adoption signals, executive sponsor engagement, growth playbook.";

function Page() {
  const r = H.useCustomerRetentionExpansion();
  return (
    <V10Page icon={<Repeat className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Gross retention" value={`${r.summary.renewal}%`} tone="emerald" />
        <ScoreCard label="Expansion"       value={`+${r.summary.expansion}%`} tone="sky" />
        <ScoreCard label="Churn risk"      value={r.summary.churn_risk} tone="amber" />
        <ScoreCard label="Expansion ready" value={r.summary.expansion_ready} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Account health</h3>
        <SimpleTable rows={r.accounts as any} columns={[
          { key: "customer", label: "Customer" },
          { key: "health", label: "Health", render: (x: any) => `${x.health}%` },
          { key: "renewal", label: "Renewal", render: (x: any) => <StatusPill status={x.renewal} /> },
          { key: "expansion", label: "Expansion" },
          { key: "sponsor", label: "Sponsor", render: (x: any) => <StatusPill status={x.sponsor} /> },
          { key: "outcome", label: "Outcome" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Customer growth playbook</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {r.playbook.map(p => <li key={p.id} className="rounded border border-white/10 bg-black/20 px-3 py-1.5"><span className="text-amber-200">{p.owner}</span> · {p.play} · ETA {p.eta}</li>)}
        </ul>
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/retention")({
  head: () => ({ meta: [{ title: "Customer Retention Expansion Command Center · Anderoute V10" }] }),
  component: Page,
});
