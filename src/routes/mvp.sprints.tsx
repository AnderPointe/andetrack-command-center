import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SPRINTS } from "@/mvp/data/mockMvp";
import { CalendarRange } from "lucide-react";

export const Route = createFileRoute("/mvp/sprints")({
  head: () => ({ meta: [{ title: "MVP Sprints — Anderoute" }] }),
  component: Sprints,
});

function Sprints() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Sprints</Badge>
          <div className="flex items-center gap-3">
            <CalendarRange className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">8-Sprint Implementation Plan</h1>
          </div>
          <p className="text-xs text-muted-foreground">2-week sprints · small team · pilot-ready MVP.</p>
          <MvpNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {SPRINTS.map((s) => (
            <Card key={s.id} className="border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-cyan-200">Sprint {s.id} · {s.name}</h3>
                <Badge variant="outline" className="border-white/15">{s.stories} stories</Badge>
              </div>
              <p className="mt-2 text-sm">{s.goal}</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-amber-300">Risks:</span> {s.risks.join(", ")}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
