import { createFileRoute } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SMOKE_TESTS } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/smoke-test")({
  head: () => ({ meta: [{ title: "Production Smoke Test · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  pass: "border-emerald-500/30 text-emerald-300",
  fail: "border-rose-500/30 text-rose-300",
  pending: "border-white/15 text-muted-foreground",
};

function Page() {
  const pass = SMOKE_TESTS.filter((s) => s.status === "pass").length;
  const fail = SMOKE_TESTS.filter((s) => s.status === "fail").length;
  const pending = SMOKE_TESTS.filter((s) => s.status === "pending").length;
  const ready = fail === 0 && pending === 0;
  const failures = SMOKE_TESTS.filter((s) => s.status === "fail");

  return (
    <PilotPage
      icon={<Stethoscope className="size-6 text-teal-300" />}
      title="Production Smoke Test"
      blurb="Pre-flight checklist run against the pilot environment before each go-live decision. Any failure or pending check holds launch."
    >
      <Card className={`border p-4 text-sm ${ready ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-200" : "border-rose-500/30 bg-rose-500/5 text-rose-200"}`}>
        <div className="flex items-center justify-between">
          <span>{ready ? "Smoke test green — clear to launch" : `${fail} failure(s) / ${pending} pending — launch held`}</span>
          <Badge variant="outline" className={ready ? "border-emerald-500/40 text-emerald-200" : "border-rose-500/40 text-rose-200"}>
            {ready ? "GO" : "NO-GO"}
          </Badge>
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Pass</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-300">{pass}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Fail</div>
          <div className="mt-1 text-2xl font-semibold text-rose-300">{fail}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Pending</div>
          <div className="mt-1 text-2xl font-semibold text-muted-foreground">{pending}</div>
        </Card>
      </div>

      {failures.length > 0 && (
        <Card className="border-rose-500/30 bg-rose-500/5 p-4">
          <h2 className="text-sm font-semibold text-rose-200">Blocking failures</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {failures.map((s) => (
              <li key={s.id} className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{s.id}</span>
                <span>{s.test}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {SMOKE_TESTS.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{s.id}</span>
                <span>{s.test}</span>
              </div>
              <Badge variant="outline" className={TONE[s.status]}>{s.status.toUpperCase()}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
