import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePlatformOperatingSystem } from "@/v65/hooks";

export const Route = createFileRoute("/v65/platform-os")({
  head: () => ({ meta: [{ title: "Platform Operating System · V6.5 · Anderoute" }] }),
  component: () => {
    const { score, actions } = usePlatformOperatingSystem();
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
