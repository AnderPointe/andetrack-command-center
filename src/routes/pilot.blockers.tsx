import { createFileRoute } from "@tanstack/react-router";
import { Ban } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_BLOCKERS } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/blockers")({
  head: () => ({ meta: [{ title: "Pilot Blockers · Anderoute" }] }),
  component: Page,
});

function Page() {
  const triggered = PILOT_BLOCKERS.filter((b) => b.triggered);
  const clear = PILOT_BLOCKERS.filter((b) => !b.triggered);
  const triggeredStop = triggered.filter((b) => b.severity === "stop").length;

  return (
    <PilotPage
      icon={<Ban className="size-6 text-teal-300" />}
      title="Pilot Launch Blocker Rules"
      blurb="STOP rules automatically hold launch. WARN rules require explicit sign-off. The board below shows which rules are currently triggered."
    >
      <Card className={`border p-4 text-sm ${triggeredStop > 0 ? "border-rose-500/40 bg-rose-500/5 text-rose-200" : "border-emerald-500/30 bg-emerald-500/5 text-emerald-200"}`}>
        <div className="flex items-center justify-between">
          <span>{triggeredStop > 0 ? `${triggeredStop} STOP rule(s) triggered — launch held` : "No STOP rules triggered"}</span>
          <Badge variant="outline" className={triggeredStop > 0 ? "border-rose-500/40 text-rose-200" : "border-emerald-500/40 text-emerald-200"}>
            {triggeredStop > 0 ? "NO-GO" : "GO"}
          </Badge>
        </div>
      </Card>

      {triggered.length > 0 && (
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold text-rose-200">Triggered now ({triggered.length})</h2>
          <div className="mt-2 space-y-2">
            {triggered.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                  <span>{b.rule}</span>
                </div>
                <Badge variant="outline" className={b.severity === "stop" ? "border-rose-500/40 text-rose-300" : "border-amber-500/40 text-amber-300"}>
                  {b.severity.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Clear ({clear.length})</h2>
        <div className="mt-2 space-y-2">
          {clear.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                <span>{b.rule}</span>
              </div>
              <Badge variant="outline" className={b.severity === "stop" ? "border-rose-500/40 text-rose-300" : "border-amber-500/40 text-amber-300"}>
                {b.severity.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
