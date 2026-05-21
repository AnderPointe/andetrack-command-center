import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLongTermStrategicOperatingModel } from "@/v65/hooks";

export const Route = createFileRoute("/v65/operating-model")({
  head: () => ({ meta: [{ title: "Operating Model · V6.5 · Anderoute" }] }),
  component: () => {
    const { horizons, pillars } = useLongTermStrategicOperatingModel();
    return (
      <V65Page icon={<Map className="size-6 text-cyan-300" />} title="Long-Term Strategic Operating Model"
        blurb="Current quarter → 36 months. Operating pillars across product, marketplace, revenue, customer success, support, security, partnerships, reliability, mobile, AI, global, financial.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Operating horizons</h3>
          <ol className="mt-2 space-y-2 text-sm">
            {horizons.map(h => (
              <li key={h.horizon} className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="text-xs uppercase tracking-wide text-cyan-300">{h.horizon}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{h.focus}</div>
              </li>
            ))}
          </ol>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Operating pillars</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {pillars.map(p => (
              <div key={p.pillar} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>{p.pillar}</span>
                  <span className="font-mono text-xs">{p.score}</span>
                </div>
                <Progress value={p.score} className="mt-2 h-1" />
                <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Owner: {p.owner}</div>
              </div>
            ))}
          </div>
        </Card>
      </V65Page>
    );
  },
});
