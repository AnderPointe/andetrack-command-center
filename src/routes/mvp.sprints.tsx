import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SPRINTS } from "@/mvp/data/mockMvp";
import { CalendarRange, CheckCircle2, AlertTriangle } from "lucide-react";

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
            <h1 className="text-2xl font-semibold">16-Week Implementation Plan</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Eight 2-week sprints · small team · pilot-ready MVP at end of Sprint 7.
          </p>
          <MvpNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {SPRINTS.map((s) => (
            <Card key={s.id} className="border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-cyan-200">Sprint {s.id} · {s.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{s.weeks}</Badge>
                  <Badge variant="outline" className="border-white/15">{s.stories} stories</Badge>
                </div>
              </div>
              <p className="mt-2 text-sm">{s.goal}</p>

              <div className="mt-3">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-emerald-300">
                  <CheckCircle2 className="size-3.5" /> Definition of done
                </div>
                <ul className="mt-1 space-y-1 text-xs">
                  {s.exitCriteria.map((c) => (
                    <li key={c}>· {c}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 flex items-start gap-1.5 text-xs">
                <AlertTriangle className="mt-0.5 size-3.5 text-amber-300" />
                <span className="text-muted-foreground">
                  <span className="text-amber-300">Risks:</span> {s.risks.join(", ")}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
