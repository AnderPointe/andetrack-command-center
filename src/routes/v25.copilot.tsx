import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COPILOT_V25_INSIGHTS, COPILOT_V25_GUARDRAILS } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = { good: "border-emerald-500/30 text-emerald-300", warn: "border-amber-500/30 text-amber-300", bad: "border-rose-500/30 text-rose-300", info: "border-sky-500/30 text-sky-300" };

export const Route = createFileRoute("/v25/copilot")({
  head: () => ({ meta: [{ title: "CoPilot V2.5 · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Sparkles className="size-6 text-emerald-300" />} title="Anderoute CoPilot V2.5" blurb="Enterprise operational intelligence — EDI, API, optimization, customer comms, integrations, and executive summaries. All high-impact actions still require human approval.">
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Guardrails</Badge>
        <ul className="mt-2 grid gap-1 text-xs text-amber-100/90 md:grid-cols-2">{COPILOT_V25_GUARDRAILS.map((g) => <li key={g}>• {g}</li>)}</ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">CoPilot insights</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {COPILOT_V25_INSIGHTS.map((i) => (
            <div key={i.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium">{i.question}</div>
                <Badge variant="outline" className={tone[i.tone]}>{i.tone}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{i.answer}</div>
              <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wide text-muted-foreground"><span>{i.category}</span><span>confidence {Math.round(i.confidence * 100)}%</span></div>
            </div>
          ))}
        </div>
      </Card>
    </V25Page>
  ),
});
