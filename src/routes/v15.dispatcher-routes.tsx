import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DISPATCHER_ROUTES } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/dispatcher-routes")({
  head: () => ({ meta: [{ title: "V1.5 Dispatcher Routes · Anderoute" }] }),
  component: Page,
});

const statusTone: Record<string, string> = {
  active:    "border-emerald-500/30 text-emerald-300",
  off_route: "border-amber-500/30 text-amber-300",
  rerouting: "border-amber-500/30 text-amber-300",
  route_ready: "border-sky-500/30 text-sky-300",
  completed: "border-emerald-500/30 text-emerald-300",
};

function Page() {
  return (
    <V15Page
      icon={<ClipboardList className="size-6 text-cyan-300" />}
      title="Dispatcher Route Visibility V1.5"
      blurb="One card per active load — route progress, ETA, drift, provider, warnings. Drill into the route event drawer for the full timeline."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {DISPATCHER_ROUTES.map((r) => (
          <Card key={r.load} className="border-white/10 bg-white/[0.02] p-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{r.load} · {r.driver}</div>
                <div className="text-xs text-muted-foreground">Provider: {r.provider}</div>
              </div>
              <Badge variant="outline" className={statusTone[r.status] ?? "border-white/15 text-muted-foreground"}>{r.status}</Badge>
            </div>
            <Progress value={r.progressPct} className="mt-3 h-1.5" />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>ETA {r.etaAt}</span>
              <span className={r.driftMin > 15 ? "text-rose-300" : r.driftMin > 5 ? "text-amber-300" : "text-emerald-300"}>
                {r.driftMin > 0 ? `+${r.driftMin}m drift` : "on plan"}
              </span>
            </div>
            {r.warnings.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {r.warnings.map((w) => (
                  <Badge key={w} variant="outline" className="border-amber-500/30 text-xs text-amber-300">{w}</Badge>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </V15Page>
  );
}
