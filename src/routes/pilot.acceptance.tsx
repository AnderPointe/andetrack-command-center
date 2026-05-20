import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ACCEPTANCE_CRITERIA, computeGoNoGo, computePilotGate } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/acceptance")({
  head: () => ({ meta: [{ title: "Pilot Acceptance · Anderoute" }] }),
  component: Page,
});

function Page() {
  const gng = computeGoNoGo(ACCEPTANCE_CRITERIA);
  const gate = computePilotGate({});
  const hard = ACCEPTANCE_CRITERIA.filter((c) => c.gate);
  const soft = ACCEPTANCE_CRITERIA.filter((c) => !c.gate);

  return (
    <PilotPage
      icon={<CheckCircle2 className="size-6 text-teal-300" />}
      title="Pilot Acceptance Checklist"
      blurb="Hard gates (must be met) drive the launch decision; soft criteria are tracked for completeness."
    >
      <Card className={`border p-4 text-sm ${gate.ready ? "border-emerald-500/30 bg-emerald-500/5" : "border-rose-500/30 bg-rose-500/5"}`}>
        <div className="flex items-center justify-between">
          <span>Composite launch gate</span>
          <Badge variant="outline" className={gate.ready ? "border-emerald-500/40 text-emerald-200" : "border-rose-500/40 text-rose-200"}>
            {gate.ready ? "GO" : "NO-GO"}
          </Badge>
        </div>
        {!gate.ready && (
          <ul className="mt-2 text-[12px] text-rose-200/90">
            {gate.reasons.map((r) => (<li key={r}>· {r}</li>))}
          </ul>
        )}
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Hard gates</span>
          <span className="font-mono">{gng.gateMet} / {gng.gateTotal} met</span>
        </div>
        <div className="mt-3 space-y-2">
          {hard.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                <span>{c.criterion}</span>
                <Badge variant="outline" className="border-rose-500/30 text-[10px] text-rose-300">gate</Badge>
              </div>
              <Badge variant="outline" className={c.met ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {c.met ? "Met" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Soft criteria</span>
          <span className="font-mono">{soft.filter((c) => c.met).length} / {soft.length} met</span>
        </div>
        <div className="mt-3 space-y-2">
          {soft.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                <span>{c.criterion}</span>
              </div>
              <Badge variant="outline" className={c.met ? "border-emerald-500/30 text-emerald-300" : "border-white/15 text-muted-foreground"}>
                {c.met ? "Met" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
