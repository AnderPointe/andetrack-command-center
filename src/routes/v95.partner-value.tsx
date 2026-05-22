import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const p = H.useStrategicPartnerValue();
  return (
    <V95Page icon={<Plug className="size-6 text-cyan-300" />} title="Strategic Partner Value Dashboard" blurb="Partner revenue, joint customers, integration health, security/compliance, joint GTM, risk, expansion opportunity, partner value scorecard.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Partner value" value={p.summary.score} tone="emerald" />
        <ScoreCard label="Partners"      value={p.partners.length} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partners</h3>
        <div className="mt-2">
          <SimpleTable rows={p.partners as any} columns={[
            { key: "partner", label: "Partner" },
            { key: "revenue", label: "Revenue $M" },
            { key: "customers", label: "Joint customers" },
            { key: "health", label: "Health", render: (r: any) => `${r.health}%` },
            { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          ]} />
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/partner-value")({
  head: () => ({ meta: [{ title: "Partner Value · Anderoute V9.5" }] }),
  component: Page,
});
