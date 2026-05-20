import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BACKLOG } from "@/mvp/data/mockMvp";
import { ListChecks } from "lucide-react";

export const Route = createFileRoute("/mvp/backlog")({
  head: () => ({ meta: [{ title: "Engineering Backlog — Anderoute" }] }),
  component: Backlog,
});

const TONE: Record<string, string> = {
  P0: "border-rose-500/30 text-rose-200",
  P1: "border-amber-500/30 text-amber-200",
  P2: "border-blue-500/30 text-blue-200",
  P3: "border-white/15 text-muted-foreground",
};

function Backlog() {
  const areas = Array.from(new Set(BACKLOG.map((b) => b.area)));
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Backlog</Badge>
          <div className="flex items-center gap-3">
            <ListChecks className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Engineering Backlog</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Sequenced by sprint with explicit dependencies. P0 work is non-negotiable for pilot.
          </p>
          <MvpNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {areas.map((a) => (
            <Card key={a} className="border-white/10 bg-white/[0.02] p-4">
              <h3 className="text-sm font-medium text-cyan-200">{a}</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {BACKLOG.filter((b) => b.area === a).map((b) => (
                  <li key={b.id} className="rounded border border-white/5 bg-white/[0.01] p-2">
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-muted-foreground">{b.id}</code>
                      <span className="flex-1">{b.title}</span>
                      <Badge variant="outline" className={TONE[b.priority]}>{b.priority}</Badge>
                      <Badge variant="outline" className="border-white/15">{b.estimate}</Badge>
                      <Badge variant="outline" className="border-white/15 text-muted-foreground">S{b.sprint}</Badge>
                    </div>
                    {b.depends.length > 0 && (
                      <div className="mt-1 text-[11px] text-muted-foreground">
                        depends on: {b.depends.join(", ")}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
