import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COPILOT_INSIGHTS, COPILOT_ACTIONS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/copilot")({
  head: () => ({ meta: [{ title: "V1.5 CoPilot · Anderoute" }] }),
  component: Page,
});

const toneClass: Record<string, string> = {
  good: "border-emerald-500/30 text-emerald-300",
  warn: "border-amber-500/30 text-amber-300",
  bad:  "border-rose-500/30 text-rose-300",
  info: "border-sky-500/30 text-sky-300",
};

const sevTone: Record<string, string> = {
  high: "border-rose-500/30 text-rose-300",
  med:  "border-amber-500/30 text-amber-300",
  low:  "border-sky-500/30 text-sky-300",
};

function Page() {
  return (
    <V15Page
      icon={<Sparkles className="size-6 text-cyan-300" />}
      title="CoPilot V1.5 — Smarter Operational Rules"
      blurb="Still rules-based, but now context-aware: combines loads, drivers, GPS, notifications, providers, and billing state into one operational summary plus a prioritized action queue."
    >
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Rules-based</Badge>{" "}
        Operational rules + live state only. Real LLM lands in V2 (see <span className="font-mono">docs/phase17-plan.md</span>).
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Operational insights</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {COPILOT_INSIGHTS.map((i) => (
            <div key={i.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium">{i.question}</div>
                <Badge variant="outline" className={toneClass[i.tone]}>{i.tone}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{i.answer}</div>
              <div className="mt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">{i.category}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Action queue</h2>
        <div className="mt-3 space-y-2 text-sm">
          {COPILOT_ACTIONS.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div>{a.label}</div>
                <div className="text-xs text-muted-foreground">{a.why}</div>
              </div>
              <Badge variant="outline" className={sevTone[a.severity]}>{a.severity}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
