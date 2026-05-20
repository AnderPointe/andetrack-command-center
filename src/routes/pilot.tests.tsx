import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { useMemo, useState } from "react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEST_CASES, type TestStatus } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/tests")({
  head: () => ({ meta: [{ title: "MVP Test Execution · Anderoute" }] }),
  component: Page,
});

const TONE: Record<TestStatus, string> = {
  passed: "border-emerald-500/30 text-emerald-300",
  failed: "border-rose-500/30 text-rose-300",
  needs_retest: "border-amber-500/30 text-amber-300",
  blocked: "border-rose-500/30 text-rose-300",
  not_run: "border-white/15 text-muted-foreground",
  deferred: "border-white/15 text-muted-foreground",
};

type Filter = "all" | "gate" | "failing" | "not_run";

function Page() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    switch (filter) {
      case "gate":    return TEST_CASES.filter((t) => t.gate);
      case "failing": return TEST_CASES.filter((t) => t.status === "failed" || t.status === "needs_retest" || t.status === "blocked");
      case "not_run": return TEST_CASES.filter((t) => t.status === "not_run");
      default:        return TEST_CASES;
    }
  }, [filter]);

  const totals = TEST_CASES.reduce((acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }), {} as Record<string, number>);
  const gateTotal = TEST_CASES.filter((t) => t.gate).length;
  const gatePassing = TEST_CASES.filter((t) => t.gate && t.status === "passed").length;
  const categories = Array.from(new Set(visible.map((t) => t.category)));

  return (
    <PilotPage
      icon={<FlaskConical className="size-6 text-teal-300" />}
      title="MVP Test Execution"
      blurb="Critical-path test cases across auth, RLS, load, driver, GPS, customer portal, audit, and alerts. Gate tests must all pass before launch."
    >
      <div className="grid gap-3 md:grid-cols-6">
        {(["passed", "failed", "needs_retest", "blocked", "not_run", "deferred"] as const).map((s) => (
          <Card key={s} className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.replace("_", " ")}</div>
            <div className="mt-1 text-2xl font-semibold">{totals[s] ?? 0}</div>
          </Card>
        ))}
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Gate tests</span>
            <span className="font-mono text-muted-foreground">{gatePassing} / {gateTotal} passing</span>
            <Badge variant="outline" className={gatePassing === gateTotal ? "border-emerald-500/30 text-emerald-300" : "border-rose-500/30 text-rose-300"}>
              {gatePassing === gateTotal ? "GO" : "NO-GO"}
            </Badge>
          </div>
          <div className="flex gap-1.5">
            {(["all", "gate", "failing", "not_run"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-2 py-0.5 text-[11px] capitalize ${filter === f ? "border-teal-500/40 bg-teal-500/10 text-teal-200" : "border-white/15 text-muted-foreground hover:border-white/30"}`}
              >{f.replace("_", " ")}</button>
            ))}
          </div>
        </div>
      </Card>

      {categories.map((cat) => (
        <Card key={cat} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold text-foreground">{cat}</h2>
          <div className="mt-3 space-y-2">
            {visible.filter((t) => t.category === cat).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <span>{t.title}</span>
                  {t.gate && <Badge variant="outline" className="border-rose-500/30 text-[10px] text-rose-300">gate</Badge>}
                  {t.related_bug && (
                    <Badge variant="outline" className="border-rose-500/30 text-rose-300">{t.related_bug}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.priority}</Badge>
                  <Badge variant="outline" className={TONE[t.status]}>{t.status.replace("_", " ")}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </PilotPage>
  );
}
