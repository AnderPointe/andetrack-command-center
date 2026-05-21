import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REVENUE_BY_LINE, RENEWALS, EXPANSIONS, REVENUE_TRENDS, LIFECYCLE_KPIS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/enterprise-revenue")({
  head: () => ({ meta: [{ title: "Enterprise Revenue · Anderoute" }] }),
  component: () => {
    const totalMrr = REVENUE_BY_LINE.reduce((s,r) => s + r.mrr, 0);
    const maxLine = Math.max(...REVENUE_BY_LINE.map(r => r.mrr));
    return (
      <V4Page icon={<DollarSign className="size-6 text-sky-300" />} title="Enterprise Revenue Operations"
        blurb="MRR by product line, renewals, expansion pipeline, churn risk and net revenue retention.">
        <div className="grid gap-3 md:grid-cols-4">
          <Card className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">MRR</div><div className="mt-1 text-2xl font-semibold font-mono">${totalMrr.toLocaleString()}</div></Card>
          <Card className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">NRR</div><div className="mt-1 text-2xl font-semibold">{LIFECYCLE_KPIS.nrr_pct}%</div></Card>
          <Card className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">Gross churn</div><div className="mt-1 text-2xl font-semibold">{LIFECYCLE_KPIS.gross_churn_pct}%</div></Card>
          <Card className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">At-risk ARR</div><div className="mt-1 text-2xl font-semibold font-mono text-amber-300">${LIFECYCLE_KPIS.at_risk_arr.toLocaleString()}</div></Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">MRR trend</h3>
          <div className="mt-3 flex items-end gap-3 h-20">
            {REVENUE_TRENDS.map(t => (
              <div key={t.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[10px] text-muted-foreground">${(t.mrr/1000).toFixed(0)}k</div>
                <div className="w-full rounded-t bg-emerald-400/40" style={{ height: `${(t.mrr - 250000) / 1000}px` }} />
                <div className="text-[10px] text-muted-foreground">{t.month}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Revenue by line</h3>
          <ul className="mt-2 space-y-2 text-sm">{REVENUE_BY_LINE.map(r => (
            <li key={r.line}>
              <div className="flex justify-between"><span>{r.line}</span><span className="font-mono">${r.mrr.toLocaleString()}</span></div>
              <div className="h-1.5 mt-1 rounded bg-black/30 overflow-hidden"><div className="h-full bg-sky-400/50" style={{ width: `${(r.mrr/maxLine)*100}%` }} /></div>
            </li>))}
          </ul>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Renewals</h3>
            <ul className="mt-2 space-y-1 text-sm">{RENEWALS.map(r => (
              <li key={r.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
                <div><div>{r.customer}</div><div className="text-xs text-muted-foreground">${r.arr.toLocaleString()} · {r.renewal}</div></div>
                <Badge variant="outline" className={r.status === "at_risk" ? "border-amber-400/40 text-amber-300" : "border-emerald-400/40 text-emerald-300"}>{r.status}</Badge>
              </li>))}
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Expansion</h3>
            <ul className="mt-2 space-y-1 text-sm">{EXPANSIONS.map(x => (
              <li key={x.id} className="flex justify-between rounded border border-white/10 bg-black/20 p-2">
                <span>{x.customer} · {x.opp}</span><span className="font-mono">${x.amount.toLocaleString()}</span>
              </li>))}
            </ul>
          </Card>
        </div>
      </V4Page>
    );
  },
});
