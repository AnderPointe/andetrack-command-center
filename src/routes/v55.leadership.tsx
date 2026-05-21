import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useMarketLeadership, useLeadershipAlerts } from "@/v55/hooks";

export const Route = createFileRoute("/v55/leadership")({
  head: () => ({ meta: [{ title: "Market Leadership · Anderoute V5.5" }] }),
  component: () => {
    const { leadership, trend, gaps } = useMarketLeadership();
    const { alerts } = useLeadershipAlerts();
    const pillars = Object.entries(leadership).filter(([k]) => k !== "overall");
    const sorted = [...pillars].sort((a, b) => (b[1] as number) - (a[1] as number));
    const top = sorted.slice(0, 3);
    const bottom = sorted.slice(-3).reverse();
    return (
      <V55Page icon={<Crown className="size-6 text-amber-300" />} title="Market Leadership Dashboard"
        blurb="Composite leadership readiness across category, product, customer proof, marketplace, partner ecosystem, enterprise, revenue, retention and investor readiness.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Overall" value={leadership.overall} tone="amber" />
          {pillars.slice(0, 7).map(([k, v]) => <ScoreCard key={k} label={k.replace(/_/g, " ")} value={v as number} tone="sky" />)}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Leadership trend</h3>
            <div className="mt-3 flex items-end gap-2 h-32">
              {trend.map(p => (
                <div key={p.q} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-amber-400/60" style={{ height: `${p.score}%` }} />
                  <div className="text-[10px] text-muted-foreground">{p.q}</div>
                  <div className="text-[10px] text-amber-200">{p.score}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold text-emerald-300">Top pillars</h3>
            <ul className="mt-2 space-y-1 text-xs">
              {top.map(([k, v]) => (
                <li key={k} className="flex justify-between"><span className="capitalize text-muted-foreground">{k.replace(/_/g, " ")}</span><span className="text-emerald-300">{v as number}</span></li>
              ))}
            </ul>
            <h3 className="mt-4 text-sm font-semibold text-rose-300">Bottom pillars</h3>
            <ul className="mt-2 space-y-1 text-xs">
              {bottom.map(([k, v]) => (
                <li key={k} className="flex justify-between"><span className="capitalize text-muted-foreground">{k.replace(/_/g, " ")}</span><span className="text-rose-300">{v as number}</span></li>
              ))}
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Leadership alerts</h3>
            <ul className="mt-2 space-y-2 text-xs">
              {alerts.map(a => (
                <li key={a.id} className="flex items-start gap-2">
                  <StatusPill status={a.severity} />
                  <div>
                    <div className="text-foreground">{a.area}</div>
                    <div className="text-muted-foreground">{a.msg}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Gap analysis · action plan</h3>
          <div className="mt-2">
            <SimpleTable rows={gaps} columns={[
              { key: "area",   label: "Area" },
              { key: "score",  label: "Score" },
              { key: "action", label: "Action" },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
