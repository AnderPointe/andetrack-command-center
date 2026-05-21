import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePlatformOperatingSystem, useStrategicOperatingTrend } from "@/v65/hooks";

export const Route = createFileRoute("/v65/platform-os")({
  head: () => ({ meta: [{ title: "Platform Operating System · V6.5 · Anderoute" }] }),
  component: () => {
    const { score, actions } = usePlatformOperatingSystem();
    const { trend, alerts } = useStrategicOperatingTrend();
    const maxOverall = Math.max(...trend.map(t => t.overall));
    return (
      <V65Page icon={<Briefcase className="size-6 text-cyan-300" />} title="Platform Operating System"
        blurb="Executive command center for Anderoute — product, marketplace, revenue, customer success, security, partners, reliability, automation, AI, financial, global, risk, board, and investment health.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Strategic operating" value={score.overall} tone="emerald" />
          <ScoreCard label="Areas healthy"
            value={Math.round(score.byArea.filter(a => a.status === "healthy").length / score.byArea.length * 100)} tone="sky" />
          <ScoreCard label="Areas at risk"
            value={Math.round(score.byArea.filter(a => a.status === "at_risk" || a.status === "planned").length / score.byArea.length * 100)} tone="rose" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Operating health by function</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {score.byArea.map(a => (
              <div key={a.area} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>{a.area}</span>
                  <span className="font-mono text-xs">{a.score}</span>
                </div>
                <Progress value={a.score} className="mt-2 h-1" />
                <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{a.status.replace("_"," ")}</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">6-week operating trend</h3>
            <div className="mt-3 flex items-end gap-2 h-28">
              {trend.map(t => (
                <div key={t.week} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-cyan-400/60" style={{ height: `${(t.overall / maxOverall) * 100}%` }} />
                  <div className="text-[10px] text-muted-foreground">{t.week}</div>
                  <div className="font-mono text-[10px] text-cyan-300">{t.overall}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground">Overall · financial · global · partner all trending +1–2 pts / wk.</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Operating alerts</h3>
            <ul className="mt-2 space-y-1.5 text-xs">
              {alerts.map((a, i) => (
                <li key={i} className="flex items-start gap-2 rounded-md border border-white/10 bg-black/20 p-2">
                  <StatusPill status={a.sev} />
                  <div className="flex-1">
                    <div className="font-medium">{a.area}</div>
                    <div className="text-muted-foreground">{a.msg}</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{a.owner}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Strategic operating action plan</h3>
          <div className="mt-2">
            <SimpleTable rows={actions} columns={[
              { key: "owner",    label: "Owner" },
              { key: "action",   label: "Action" },
              { key: "due",      label: "Due" },
              { key: "priority", label: "Priority", render: (r) => <StatusPill status={r.priority} /> },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
