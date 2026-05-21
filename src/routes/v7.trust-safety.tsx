import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill, ScoreCard, KpiGrid } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useMarketplaceTrustSafetyMaturity } from "@/v7/hooks";

export const Route = createFileRoute("/v7/trust-safety")({
  head: () => ({ meta: [{ title: "Trust + Safety · V7 · Anderoute" }] }),
  component: () => {
    const { summary, queue } = useMarketplaceTrustSafetyMaturity();
    return (
      <V7Page icon={<ShieldAlert className="size-6 text-indigo-300" />} title="Marketplace Trust + Safety Maturity"
        blurb="Carrier verification, performance, disputes, fraud signals, watchlist, suspension/reinstatement workflows. Fraud detection is placeholder-only.">
        <div className="grid gap-3 md:grid-cols-2">
          <ScoreCard label="Trust + safety score" value={summary.score} tone="emerald" />
          <ScoreCard label="Watchlist coverage"   value={94}            tone="sky" />
        </div>
        <KpiGrid cols={5} items={[
          { label: "Watchlist",      value: summary.watchlist },
          { label: "Suspensions",    value: summary.suspensions },
          { label: "Reinstatements", value: summary.reinstatements },
          { label: "Fraud flags",    value: summary.fraud_flags },
          { label: "Complaints",     value: summary.complaints },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Carrier risk review queue</h3>
          <div className="mt-2">
            <SimpleTable rows={queue as any} columns={[
              { key: "carrier", label: "Carrier" },
              { key: "reason",  label: "Reason" },
              { key: "risk",    label: "Risk",   render: (r: any) => <StatusPill status={r.risk} /> },
              { key: "action",  label: "Action" },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
