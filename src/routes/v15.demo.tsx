import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_STEPS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/demo")({
  head: () => ({ meta: [{ title: "V1.5 Demo Flow · Anderoute" }] }),
  component: Page,
});

const actorTone: Record<string, string> = {
  Admin:      "border-fuchsia-500/30 text-fuchsia-300",
  Dispatcher: "border-cyan-500/30 text-cyan-300",
  Driver:     "border-sky-500/30 text-sky-300",
  Customer:   "border-emerald-500/30 text-emerald-300",
  System:     "border-white/15 text-muted-foreground",
  CoPilot:    "border-amber-500/30 text-amber-300",
};

function Page() {
  return (
    <V15Page
      icon={<ListChecks className="size-6 text-cyan-300" />}
      title="V1.5 Demo Flow"
      blurb="End-to-end mock flow: real Mapbox route → driver navigation → ETA sync → off-route → reroute → billing usage → webhook delivery → CoPilot summary."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2 text-sm">
          {DEMO_STEPS.map((s) => (
            <li key={s.step} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Step {s.step}</span>
                  <Badge variant="outline" className={actorTone[s.actor]}>{s.actor}</Badge>
                </div>
              </div>
              <div className="mt-1 text-sm">{s.action}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">→ {s.result}</div>
            </li>
          ))}
        </ol>
      </Card>
    </V15Page>
  );
}
