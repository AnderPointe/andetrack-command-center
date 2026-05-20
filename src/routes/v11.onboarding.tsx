import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ONBOARDING_TASKS, onboardingProgress } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/onboarding")({
  head: () => ({ meta: [{ title: "V1.1 Production Onboarding · Anderoute" }] }),
  component: Page,
});

function Page() {
  const p = onboardingProgress();
  return (
    <V11Page
      icon={<UserPlus className="size-6 text-fuchsia-300" />}
      title="Production Onboarding"
      blurb="Repeatable workflow for adding the next paid customer. Imports, billing activation, training, go-live signoff — with the next blocker always visible."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Tasks complete" value={`${p.done}/${p.total}`} tone={p.pct >= 80 ? "good" : "warn"} />
        <StatTile label="Progress" value={`${p.pct}%`} tone={p.pct >= 80 ? "good" : "warn"} />
        <StatTile label="Days to go-live" value={`${p.daysToGoLive}d`} tone={p.daysToGoLive > 7 ? "info" : "warn"} />
        <StatTile label="Next blocker" value={p.nextBlocker} tone={p.done === p.total ? "good" : "warn"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <Progress value={p.pct} className="h-1.5" />
        <div className="mt-4 space-y-2 text-sm">
          {ONBOARDING_TASKS.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span>{t.label}</span>
              <Badge variant="outline" className={t.done ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {t.done ? "Done" : "Pending"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
