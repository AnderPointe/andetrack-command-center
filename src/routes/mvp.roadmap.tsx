import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROADMAP } from "@/mvp/data/mockMvp";
import { Map } from "lucide-react";

export const Route = createFileRoute("/mvp/roadmap")({
  head: () => ({ meta: [{ title: "Implementation Roadmap — Anderoute" }] }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Roadmap</Badge>
          <div className="flex items-center gap-3">
            <Map className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Implementation Roadmap</h1>
          </div>
          <MvpNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {ROADMAP.map((r) => (
            <Card key={r.phase} className="border-white/10 bg-white/[0.02] p-4">
              <h3 className="text-sm font-medium text-cyan-200">{r.phase}</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {r.items.map((i) => <li key={i}>· {i}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
