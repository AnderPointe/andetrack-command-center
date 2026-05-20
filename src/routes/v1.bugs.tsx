import { createFileRoute } from "@tanstack/react-router";
import { Bug } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BUGS, bugStats } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/bugs")({
  head: () => ({ meta: [{ title: "Bug Triage · Anderoute" }] }),
  component: Page,
});

const COLUMNS = ["new", "confirmed", "in_progress", "ready_qa", "fixed", "released"] as const;

const SEV_TONE: Record<string, string> = {
  critical: "border-rose-500/40 text-rose-300",
  high:     "border-amber-500/40 text-amber-300",
  medium:   "border-sky-500/30 text-sky-300",
  low:      "border-white/15 text-muted-foreground",
};

const PRI_TONE: Record<string, string> = {
  P0: "border-rose-500/40 text-rose-300",
  P1: "border-amber-500/40 text-amber-300",
  P2: "border-sky-500/30 text-sky-300",
  P3: "border-white/15 text-muted-foreground",
};

function Page() {
  const s = bugStats();
  return (
    <V1Page
      icon={<Bug className="size-6 text-indigo-300" />}
      title="Bug Stabilization Board"
      blurb="P0–P3 triage for bugs surfaced in the pilot. A single open P0 holds V1 GA; P1s should land before customer cutover."
    >
      <div className="grid gap-3 md:grid-cols-5">
        <StatTile label="P0 open" value={s.p0} tone={s.p0 ? "bad" : "good"} hint={s.p0 ? "blocks GA" : "GA clear"} />
        <StatTile label="P1 open" value={s.p1} tone={s.p1 ? "warn" : "good"} />
        <StatTile label="P2 open" value={s.p2} tone="info" />
        <StatTile label="Fixed" value={s.fixed} tone="info" />
        <StatTile label="Released" value={s.released} tone="good" />
      </div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {COLUMNS.map((col) => {
          const items = BUGS.filter((b) => b.status === col);
          return (
            <Card key={col} className="border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                <span>{col.replace("_", " ")}</span>
                <span>{items.length}</span>
              </div>
              <div className="mt-2 space-y-2">
                {items.map((b) => (
                  <div key={b.id} className="rounded-lg border border-white/10 bg-black/20 p-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono">{b.id}</span>
                      <Badge variant="outline" className={PRI_TONE[b.priority]}>{b.priority}</Badge>
                    </div>
                    <div className="mt-1 text-sm">{b.title}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
                      <Badge variant="outline" className={SEV_TONE[b.severity]}>{b.severity}</Badge>
                      <span>· {b.affectedRole}</span>
                      <span>· {b.workflow}</span>
                      <span>· {b.releaseTarget}</span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && <div className="text-xs text-muted-foreground/70">—</div>}
              </div>
            </Card>
          );
        })}
      </div>
    </V1Page>
  );
}
