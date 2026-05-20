import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CUTLINE, CUTLINE_PRINCIPLES, CUTLINE_SUMMARY } from "@/mvp/data/mockMvp";
import { Scissors } from "lucide-react";

export const Route = createFileRoute("/mvp/cutline")({
  head: () => ({ meta: [{ title: "MVP Cutline — Anderoute" }] }),
  component: Cutline,
});

const COLS = [
  { key: "build" as const, label: "Build now",     tone: "border-emerald-500/30 text-emerald-200", count: CUTLINE_SUMMARY.build },
  { key: "mock"  as const, label: "Mock for demo", tone: "border-amber-500/30 text-amber-200",     count: CUTLINE_SUMMARY.mock  },
  { key: "defer" as const, label: "Defer",         tone: "border-rose-500/30 text-rose-200",       count: CUTLINE_SUMMARY.defer },
];

function Cutline() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Cutline</Badge>
          <div className="flex items-center gap-3">
            <Scissors className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">MVP Cutline Board</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            The line between what ships, what gets mocked, and what waits. Re-locked every sprint.
          </p>
          <MvpNav />
        </header>

        <div className="grid gap-3 md:grid-cols-3">
          {COLS.map((c) => (
            <Card key={c.key} className={`border bg-white/[0.02] p-4 ${c.tone}`}>
              <div className="text-xs uppercase tracking-wider">{c.label}</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">{c.count}</div>
              <div className="text-[11px] text-muted-foreground">items across all areas</div>
            </Card>
          ))}
        </div>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium text-cyan-200">Cutline principles</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {CUTLINE_PRINCIPLES.map((p) => <li key={p}>· {p}</li>)}
          </ul>
        </Card>

        <div className="space-y-3">
          {CUTLINE.map((row) => (
            <Card key={row.area} className="border-white/10 bg-white/[0.02] p-4">
              <h3 className="text-sm font-medium text-cyan-200">{row.area}</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {COLS.map((c) => (
                  <div key={c.key} className={`rounded border bg-white/[0.01] p-3 ${c.tone}`}>
                    <div className="text-xs uppercase tracking-wider">{c.label}</div>
                    <ul className="mt-2 space-y-1 text-sm text-foreground">
                      {row[c.key].map((item) => <li key={item}>· {item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
