import { createFileRoute } from "@tanstack/react-router";
import { Bug } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BUGS } from "@/v1/data/mockPhase14";

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

function Page() {
  return (
    <V1Page
      icon={<Bug className="size-6 text-indigo-300" />}
      title="Bug Triage & Stabilization"
      blurb="Kanban triage for P0–P3 bugs surfaced in the pilot. A single open P0 holds V1 GA."
    >
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
                      <Badge variant="outline" className={SEV_TONE[b.severity]}>{b.priority}</Badge>
                    </div>
                    <div className="mt-1 text-sm">{b.title}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{b.affectedRole} · {b.workflow} · {b.releaseTarget}</div>
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
