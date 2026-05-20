import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RELEASE_GATES } from "@/mvp/data/mockMvp";
import { ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/mvp/release")({
  head: () => ({ meta: [{ title: "Release Plan — Anderoute" }] }),
  component: Release,
});

const ENVS = [
  { name: "Local",          purpose: "Dev loop, mock providers" },
  { name: "Preview",         purpose: "Per-branch demo for PRs" },
  { name: "Staging",         purpose: "Pre-pilot integration testing" },
  { name: "Pilot Production",purpose: "First customer pilot environment" },
];

function Release() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Release</Badge>
          <div className="flex items-center gap-3">
            <ClipboardCheck className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">MVP Release Plan</h1>
          </div>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Environments</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {ENVS.map((e) => (
              <div key={e.name} className="rounded border border-white/10 bg-white/[0.01] p-3 text-sm">
                <div className="text-cyan-200">{e.name}</div>
                <div className="text-xs text-muted-foreground">{e.purpose}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Release gates</h3>
          <div className="mt-3 divide-y divide-white/5 text-sm">
            {RELEASE_GATES.map((g) => (
              <div key={g.gate} className="grid grid-cols-12 items-center gap-2 py-2">
                <div className="col-span-7">{g.gate}</div>
                <div className="col-span-3 text-xs text-muted-foreground">{g.owner}</div>
                <div className="col-span-2 text-right">
                  <Badge variant="outline" className="border-amber-500/30 text-amber-200">{g.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
