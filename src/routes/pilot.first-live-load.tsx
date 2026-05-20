import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIRST_LIVE_LOAD_STEPS, type WizardStepStatus } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/first-live-load")({
  head: () => ({ meta: [{ title: "First Live Load · Anderoute" }] }),
  component: Page,
});

const TONE: Record<WizardStepStatus, string> = {
  done: "border-emerald-500/30 text-emerald-300 bg-emerald-500/5",
  in_progress: "border-sky-500/30 text-sky-300 bg-sky-500/5",
  blocked: "border-rose-500/30 text-rose-300 bg-rose-500/5",
  todo: "border-white/15 text-muted-foreground",
};

function Page() {
  const done = FIRST_LIVE_LOAD_STEPS.filter((s) => s.status === "done").length;
  const total = FIRST_LIVE_LOAD_STEPS.length;
  const pct = Math.round((done / total) * 100);
  const blocked = FIRST_LIVE_LOAD_STEPS.find((s) => s.status === "blocked");

  return (
    <PilotPage
      icon={<Truck className="size-6 text-teal-300" />}
      title="First Live Load Wizard"
      blurb="Guided dispatcher + driver + customer flow for the very first live load through Anderoute."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span className="font-mono">{done} / {total} · {pct}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div className={`h-full rounded-full ${blocked ? "bg-rose-400/70" : "bg-teal-400/70"}`} style={{ width: `${pct}%` }} />
        </div>
        {blocked && (
          <div className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-xs text-rose-200">
            Blocked at <span className="font-mono">{blocked.id}</span> — {blocked.step}. {blocked.note}
          </div>
        )}
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2">
          {FIRST_LIVE_LOAD_STEPS.map((s, i) => (
            <li key={s.id} className={`rounded-lg border px-3 py-2 text-sm ${TONE[s.status]}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full border border-white/10 text-xs">{i + 1}</span>
                  <span>{s.step}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{s.owner}</Badge>
                  <Badge variant="outline" className={TONE[s.status]}>{s.status.replace("_", " ")}</Badge>
                </div>
              </div>
              {s.note && <p className="mt-1 pl-9 text-xs text-muted-foreground">↳ {s.note}</p>}
            </li>
          ))}
        </ol>
      </Card>
    </PilotPage>
  );
}
