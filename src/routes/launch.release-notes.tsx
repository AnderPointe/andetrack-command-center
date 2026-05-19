import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RELEASES } from "@/launch/data/mockLaunch";
import { Presentation } from "lucide-react";

export const Route = createFileRoute("/launch/release-notes")({
  head: () => ({ meta: [{ title: "Release Notes — Anderoute" }] }),
  component: ReleaseNotes,
});

function ReleaseNotes() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Releases</Badge>
          <div className="flex items-center gap-3">
            <Presentation className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Release Notes</h1>
          </div>
          <LaunchNav />
        </header>

        <div className="space-y-4">
          {RELEASES.map((r) => (
            <Card key={r.version} className="border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-teal-500/30 text-teal-200">v{r.version}</Badge>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <h3 className="mt-2 text-sm font-medium">Highlights</h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground">
                {r.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              <div className="mt-3 grid gap-3 md:grid-cols-3 text-xs">
                <Section title="New features"  items={r.features} />
                <Section title="Improvements"  items={r.improvements} />
                <Section title="Security"      items={r.security} />
              </div>
              {r.known.length > 0 && (
                <div className="mt-3 text-xs">
                  <span className="text-amber-300">Known: </span>
                  <span className="text-muted-foreground">{r.known.join(", ")}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.01] p-3">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="mt-1 space-y-0.5">
        {items.length ? items.map((i) => <li key={i}>· {i}</li>) : <li className="text-muted-foreground">—</li>}
      </ul>
    </div>
  );
}
