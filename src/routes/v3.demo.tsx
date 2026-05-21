import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V3_DEMO_STEPS } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/demo")({
  head: () => ({ meta: [{ title: "V3 Demo Flow · Anderoute" }] }),
  component: () => (
    <V3Page icon={<ListChecks className="size-6 text-sky-300" />} title="V3 Demo Flow"
      blurb="End-to-end V3 walkthrough — mobile health → telematics → carrier marketplace → push-to-talk → Android Auto / CarPlay readiness → certification.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-1.5 text-sm">{V3_DEMO_STEPS.map((s) => (
          <li key={s.step} className="flex items-start gap-3 rounded border border-white/10 bg-black/20 p-2">
            <Badge variant="outline" className="border-sky-500/40 text-sky-300">#{s.step}</Badge>
            <div><span className="font-medium">{s.actor}:</span> <span className="text-muted-foreground">{s.action}</span></div>
          </li>
        ))}</ol>
      </Card>
    </V3Page>
  ),
});
