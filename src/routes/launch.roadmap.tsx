import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROADMAP } from "@/launch/data/mockLaunch";
import { Map } from "lucide-react";

export const Route = createFileRoute("/launch/roadmap")({
  head: () => ({ meta: [{ title: "Product Roadmap — Anderoute" }] }),
  component: Roadmap,
});

const STATUSES = ["Planned", "In Design", "In Development", "Beta", "Released", "Deferred"] as const;

const STATUS_TONE: Record<string, string> = {
  "Planned": "border-white/15 text-muted-foreground",
  "In Design": "border-blue-500/30 text-blue-300",
  "In Development": "border-violet-500/30 text-violet-300",
  "Beta": "border-amber-500/30 text-amber-300",
  "Released": "border-emerald-500/30 text-emerald-300",
  "Deferred": "border-rose-500/30 text-rose-300",
};

function Roadmap() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Roadmap</Badge>
          <div className="flex items-center gap-3">
            <Map className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Product Roadmap</h1>
          </div>
          <LaunchNav />
        </header>

        <section className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
          {STATUSES.map((s) => {
            const items = ROADMAP.filter((r) => r.status === s);
            return (
              <Card key={s} className="border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{s}</h3>
                  <Badge variant="outline" className={STATUS_TONE[s]}>{items.length}</Badge>
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  {items.map((r) => (
                    <li key={r.title} className="rounded border border-white/10 bg-white/[0.01] p-2">
                      <div>{r.title}</div>
                      <div className="text-xs text-muted-foreground">{r.area}</div>
                    </li>
                  ))}
                  {items.length === 0 && <li className="text-xs text-muted-foreground">—</li>}
                </ul>
              </Card>
            );
          })}
        </section>
      </div>
    </AppShell>
  );
}
