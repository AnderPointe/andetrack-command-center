import { createFileRoute } from "@tanstack/react-router";
import { Bug as BugIcon } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BUGS, isBugOpen } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/bugs")({
  head: () => ({ meta: [{ title: "Bug Triage · Anderoute" }] }),
  component: Page,
});

const SEV: Record<string, string> = {
  critical: "border-rose-500/40 text-rose-300",
  high: "border-orange-500/40 text-orange-300",
  medium: "border-amber-500/40 text-amber-300",
  low: "border-white/15 text-muted-foreground",
};
const STATUS: Record<string, string> = {
  new: "border-sky-500/30 text-sky-300",
  confirmed: "border-amber-500/30 text-amber-300",
  in_progress: "border-sky-500/30 text-sky-300",
  ready_retest: "border-violet-500/30 text-violet-300",
  fixed: "border-teal-500/30 text-teal-300",
  verified: "border-emerald-500/30 text-emerald-300",
  released: "border-emerald-500/30 text-emerald-300",
  wont_fix: "border-white/15 text-muted-foreground",
  duplicate: "border-white/15 text-muted-foreground",
};

const COLUMNS: { id: string; label: string; match: (s: string) => boolean }[] = [
  { id: "new",     label: "New",          match: (s) => s === "new" },
  { id: "active",  label: "In progress",  match: (s) => s === "confirmed" || s === "in_progress" },
  { id: "retest",  label: "Ready retest", match: (s) => s === "ready_retest" || s === "fixed" },
  { id: "done",    label: "Done",         match: (s) => s === "verified" || s === "released" || s === "wont_fix" || s === "duplicate" },
];

function Page() {
  const openP0 = BUGS.filter((b) => b.priority === "P0" && isBugOpen(b)).length;
  const oldest = Math.max(...BUGS.filter(isBugOpen).map((b) => b.daysOpen), 0);

  return (
    <PilotPage
      icon={<BugIcon className="size-6 text-teal-300" />}
      title="Bug Triage Board"
      blurb="Bugs are tracked with severity, priority, age, and an explicit launch-gate flag. Any open P0 or gate bug holds pilot launch."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Open P0</div>
          <div className={`mt-1 text-2xl font-semibold ${openP0 === 0 ? "text-emerald-300" : "text-rose-300"}`}>{openP0}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Open total</div>
          <div className="mt-1 text-2xl font-semibold">{BUGS.filter(isBugOpen).length}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Gate bugs</div>
          <div className="mt-1 text-2xl font-semibold">{BUGS.filter((b) => b.gate && isBugOpen(b)).length}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Oldest open</div>
          <div className="mt-1 text-2xl font-semibold">{oldest}d</div>
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        {COLUMNS.map((col) => {
          const items = BUGS.filter((b) => col.match(b.status));
          return (
            <Card key={col.id} className="border-white/10 bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold">{col.label}</span>
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{items.length}</Badge>
              </div>
              <div className="space-y-2">
                {items.length === 0 && <div className="rounded border border-dashed border-white/10 p-3 text-center text-[11px] text-muted-foreground">none</div>}
                {items.map((b) => (
                  <div key={b.id} className="rounded-lg border border-white/10 bg-black/20 p-2 text-[11px]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px] text-muted-foreground">{b.id}</span>
                      <Badge variant="outline" className={SEV[b.severity]}>{b.severity}</Badge>
                      <Badge variant="outline" className={b.priority === "P0" ? "border-rose-500/30 text-rose-300" : "border-white/15 text-muted-foreground"}>{b.priority}</Badge>
                      {b.gate && <Badge variant="outline" className="border-rose-500/30 text-rose-300">gate</Badge>}
                      <span className="ml-auto text-[10px] text-muted-foreground">{b.daysOpen}d</span>
                    </div>
                    <div className="mt-1 text-[11px]">{b.title}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">
                      {b.workflow} · {b.role}{b.assignee ? ` · @${b.assignee}` : ""}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <Badge variant="outline" className={STATUS[b.status]}>{b.status.replace("_", " ")}</Badge>
                      {b.related_test && <span>↳ {b.related_test}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </PilotPage>
  );
}
