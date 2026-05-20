import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_COMPANY_SETUP } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/company-setup")({
  head: () => ({ meta: [{ title: "Pilot Company Setup · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  done: "border-emerald-500/30 text-emerald-300",
  in_progress: "border-sky-500/30 text-sky-300",
  todo: "border-white/15 text-muted-foreground",
};

function Page() {
  const total = PILOT_COMPANY_SETUP.length;
  const done = PILOT_COMPANY_SETUP.filter((s) => s.status === "done").length;
  const inProgress = PILOT_COMPANY_SETUP.filter((s) => s.status === "in_progress").length;
  const pct = Math.round((done / total) * 100);
  const next = PILOT_COMPANY_SETUP.find((s) => s.status !== "done");

  return (
    <PilotPage
      icon={<Users className="size-6 text-teal-300" />}
      title="Pilot Company Setup Wizard"
      blurb="Guided onboarding for the first pilot company: profile, admin, dispatchers, drivers, vehicles, customers, and first loads."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Setup progress</span>
          <span className="font-mono">{done} / {total} · {pct}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-teal-400/70" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">done {done}</Badge>
          <Badge variant="outline" className="border-sky-500/30 text-sky-300">in progress {inProgress}</Badge>
          <Badge variant="outline" className="border-white/15">todo {total - done - inProgress}</Badge>
        </div>
        {next && (
          <div className="mt-3 rounded-lg border border-sky-500/30 bg-sky-500/5 p-3 text-xs text-sky-100">
            Next step: <strong>{next.step}</strong>{next.detail ? ` — ${next.detail}` : ""}
          </div>
        )}
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2">
          {PILOT_COMPANY_SETUP.map((s, i) => (
            <li key={s.id} className={`flex items-center justify-between rounded-lg border bg-black/20 px-3 py-2 text-sm ${s.id === next?.id ? "border-sky-500/30" : "border-white/10"}`}>
              <div className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full border border-white/10 text-xs text-muted-foreground">{i + 1}</span>
                <div>
                  <div>{s.step}</div>
                  {s.detail && <div className="text-xs text-muted-foreground">{s.detail}</div>}
                </div>
              </div>
              <Badge variant="outline" className={TONE[s.status]}>{s.status.replace("_", " ")}</Badge>
            </li>
          ))}
        </ol>
      </Card>
    </PilotPage>
  );
}
