import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useRetentionExpansion, useRetentionTrend } from "@/v55/hooks";

export const Route = createFileRoute("/v55/retention")({
  head: () => ({ meta: [{ title: "Retention & Expansion · Anderoute V5.5" }] }),
  component: () => {
    const { accounts, opps } = useRetentionExpansion();
    const { trend } = useRetentionTrend();
    const expArr = opps.reduce((s, o) => s + o.arr_m, 0);
    const atRisk = accounts.filter(a => a.risk === "high").length;
    const latest = trend[trend.length - 1];
    return (
      <V55Page icon={<Users className="size-6 text-amber-300" />} title="Retention & Expansion Engine"
        blurb="Renewal date, health, adoption, executive sponsor engagement, expansion opportunities and churn risk per enterprise account.">
        <KpiGrid cols={4} items={[
          { label: "GRR", value: `${latest.grr}%`, sub: "latest Q" },
          { label: "NRR", value: `${latest.nrr}%`, sub: "latest Q" },
          { label: "Expansion pipeline", value: `$${expArr.toFixed(2)}M`, sub: `${opps.length} opps` },
          { label: "At-risk accounts", value: atRisk, sub: `${accounts.length} tracked` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">GRR · NRR trend (QoQ)</h3>
          <div className="mt-3 space-y-2 text-xs">
            {trend.map(t => (
              <div key={t.q} className="grid grid-cols-[40px_1fr_1fr] items-center gap-2">
                <span className="text-muted-foreground">{t.q}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded bg-white/5"><div className="h-full rounded bg-sky-400/60" style={{ width: `${t.grr}%` }} /></div>
                  <span className="w-12 text-right text-sky-300">GRR {t.grr}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded bg-white/5"><div className="h-full rounded bg-emerald-400/70" style={{ width: `${Math.min(t.nrr, 130) / 130 * 100}%` }} /></div>
                  <span className="w-14 text-right text-emerald-300">NRR {t.nrr}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Renewal command center</h3>
          <div className="mt-2">
            <SimpleTable rows={accounts} columns={[
              { key: "acct",      label: "Account" },
              { key: "renewal",   label: "Renewal" },
              { key: "health",    label: "Health" },
              { key: "adoption",  label: "Adoption" },
              { key: "expansion", label: "Expansion" },
              { key: "risk",      label: "Risk", render: (r) => <StatusPill status={r.risk} /> },
              { key: "sponsor",   label: "Sponsor" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Expansion opportunities</h3>
          <div className="mt-2">
            <SimpleTable rows={opps} columns={[
              { key: "acct",  label: "Account" },
              { key: "opp",   label: "Opportunity" },
              { key: "arr_m", label: "ARR uplift ($M)" },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
