import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, SimpleTable } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCategoryDefiningPlatform } from "@/v6/hooks";

export const Route = createFileRoute("/v6/category")({
  head: () => ({ meta: [{ title: "Category Platform · V6" }] }),
  component: () => {
    const { scores, trend, gaps } = useCategoryDefiningPlatform();
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
      </V6Page>
    );
  },
});
