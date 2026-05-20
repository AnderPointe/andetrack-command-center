import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_SCENES, DEMO_DO_NOT_SHOW } from "@/mvp/data/mockMvp";
import { PlayCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/mvp/demo-script")({
  head: () => ({ meta: [{ title: "MVP Demo Script — Anderoute" }] }),
  component: Demo,
});

function Demo() {
  const total = DEMO_SCENES.reduce((sum, s) => sum + s.minutes, 0);
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Demo</Badge>
          <div className="flex items-center gap-3">
            <PlayCircle className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">MVP Demo Script</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Pilot-only flow. Each scene has a talk-track anchor. Total runtime ≈ {total} minutes.
          </p>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Scene-by-scene</h3>
          <ol className="mt-3 space-y-2 text-sm">
            {DEMO_SCENES.map((s) => (
              <li key={s.scene} className="rounded border border-white/10 bg-white/[0.01] p-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-200">{s.scene}</Badge>
                  <span className="flex-1 font-medium">{s.title}</span>
                  <Badge variant="outline" className="border-white/15 text-xs text-muted-foreground">
                    <Clock className="mr-1 size-3" />
                    {s.minutes} min
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.talkTrack}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="border-rose-500/20 bg-rose-500/[0.03] p-4">
          <h3 className="text-sm font-medium text-rose-200">Do not show as production-ready</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {DEMO_DO_NOT_SHOW.map((d) => (
              <Badge key={d} variant="outline" className="border-rose-500/30 text-rose-200">{d}</Badge>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
