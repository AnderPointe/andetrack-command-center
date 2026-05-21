import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCategoryDefiningPlatform, useCategoryAlerts } from "@/v6/hooks";

export const Route = createFileRoute("/v6/category")({
  head: () => ({ meta: [{ title: "Category Platform · V6" }] }),
  component: () => {
    const { scores, trend, gaps } = useCategoryDefiningPlatform();
    const { alerts, pillarTrend } = useCategoryAlerts();
    const pillars = Object.entries(scores).filter(([k]) => k !== "overall") as [string, number][];
    return (
      <V6Page icon={<Crown className="size-6 text-emerald-300" />} title="Category-Defining Platform Dashboard"
        blurb="Composite maturity across product, marketplace, AI ops, customer + partner ecosystem, revenue, security/compliance, data, reliability, defensibility, board, investor and operating model.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Category leadership" value={scores.overall} tone="emerald" />
          <ScoreCard label="Defensibility" value={scores.defensibility} tone="violet" />
          <ScoreCard label="Reliability" value={scores.reliability} tone="sky" />
          <ScoreCard label="Investor ready" value={scores.investor_ready} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Platform maturity radar</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {pillars.map(([k, v]) => (
              <div key={k}>
                <div className="flex items-center justify-between text-xs">
                  <span className="capitalize text-muted-foreground">{k.replace(/_/g, " ")}</span>
                  <span className={v >= 85 ? "text-emerald-300" : v >= 75 ? "text-sky-300" : "text-amber-300"}>{v}</span>
                </div>
                <Progress value={v} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Trend</h3>
            <div className="mt-3 flex items-end gap-2 h-32">
              {trend.map(p => (
                <div key={p.q} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-emerald-400/60" style={{ height: `${p.score}%` }} />
                  <div className="text-[10px] text-muted-foreground">{p.q}</div>
                  <div className="text-[10px] text-emerald-200">{p.score}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Pillar movement vs Q-3</h3>
            <div className="mt-2 space-y-2 text-xs">
              {pillarTrend.map(p => {
                const delta = p.q0 - p.qm3;
                return (
                  <div key={p.pillar} className="grid grid-cols-[120px_1fr_50px] items-center gap-2">
                    <span className="text-muted-foreground">{p.pillar}</span>
                    <div className="relative h-2 rounded bg-white/5">
                      <div className="absolute inset-y-0 left-0 rounded bg-white/15" style={{ width: `${p.qm3}%` }} />
                      <div className="absolute inset-y-0 left-0 rounded bg-emerald-400/70" style={{ width: `${p.q0}%` }} />
                    </div>
                    <span className={delta >= 8 ? "text-emerald-300" : delta >= 4 ? "text-sky-300" : "text-amber-300"}>+{delta}</span>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Gap analysis</h3>
            <div className="mt-2">
              <SimpleTable rows={gaps} columns={[
                { key: "area",   label: "Area" },
                { key: "score",  label: "Score" },
                { key: "action", label: "Action" },
              ]} />
            </div>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Leadership alerts</h3>
          <ul className="mt-2 space-y-1.5 text-xs">
            {alerts.map(a => (
              <li key={a.id} className="flex items-center gap-2">
                <StatusPill status={a.sev} />
                <span className="text-foreground">{a.area}</span>
                <span className="text-muted-foreground">— {a.note}</span>
              </li>
            ))}
          </ul>
        </Card>
      </V6Page>
    );
  },
});
