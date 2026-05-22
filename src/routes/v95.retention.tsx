import { createFileRoute } from "@tanstack/react-router";
import { Repeat } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const r = H.useRetentionExpansionGovernance();
  return (
    <V95Page icon={<Repeat className="size-6 text-cyan-300" />} title="Customer Retention and Expansion Governance" blurb="Renewal/expansion readiness, churn risk, sponsor engagement, adoption, health, QBR placeholder, customer success plan governance.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Retention score" value={r.summary.score} tone="emerald" />
        <ScoreCard label="Churn %"         value={r.summary.churn_pct} tone="rose" />
        <ScoreCard label="Expansion %"     value={r.summary.expansion_pct} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Account governance</h3>
        <div className="mt-2">
          <SimpleTable rows={r.accounts as any} columns={[
            { key: "customer", label: "Customer" },
            { key: "health", label: "Health", render: (x: any) => `${x.health}%` },
            { key: "renewal", label: "Renewal", render: (x: any) => <StatusPill status={x.renewal} /> },
            { key: "expansion", label: "Expansion" },
            { key: "sponsor", label: "Sponsor", render: (x: any) => <StatusPill status={x.sponsor} /> },
          ]} />
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/retention")({
  head: () => ({ meta: [{ title: "Retention & Expansion · Anderoute V9.5" }] }),
  component: Page,
});
