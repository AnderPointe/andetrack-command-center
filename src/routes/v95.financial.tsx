import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const f = H.useFinancialGovernanceMaturity();
  return (
    <V95Page icon={<Wallet className="size-6 text-cyan-300" />} title="Financial Governance Maturity Center" blurb="Billing / usage / MP fee / API overage / revenue recon (placeholder) maturity, evidence completeness, exception queue, trend.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Financial governance" value={f.summary.score} tone="emerald" />
        <ScoreCard label="Evidence completeness" value={f.summary.evidence_completeness} tone="sky" />
        <ScoreCard label="Open exceptions"       value={f.summary.exceptions} tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Governance domains</h3>
        <div className="mt-2">
          <SimpleTable rows={f.domains as any} columns={[
            { key: "area", label: "Area" },
            { key: "maturity", label: "Maturity", render: (r: any) => `${r.maturity}%` },
            { key: "exceptions", label: "Exceptions" },
          ]} />
        </div>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-rose-400/30 bg-rose-500/5 p-4">
          <h3 className="text-sm font-semibold text-rose-200">Exception queue</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {f.exceptions.map((x) => (
              <li key={x.id} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-2">
                <div><div>{x.area} — {x.finding}</div><div className="text-xs text-muted-foreground">owner: {x.owner}</div></div>
                <StatusPill status={x.status} />
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Governance trend</h3>
          <div className="mt-2 space-y-1.5 text-sm">
            {f.trend.map((t) => (
              <div key={t.period} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-1.5">
                <span className="text-muted-foreground">{t.period}</span>
                <span className="font-mono text-cyan-200">{t.score}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/financial")({
  head: () => ({ meta: [{ title: "Financial Governance · Anderoute V9.5" }] }),
  component: Page,
});
