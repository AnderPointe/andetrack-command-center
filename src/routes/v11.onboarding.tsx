import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ONBOARDING_TASKS } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/onboarding")({
  head: () => ({ meta: [{ title: "V1.1 Production Onboarding · Anderoute" }] }),
  component: Page,
});

function Page() {
  const done = ONBOARDING_TASKS.filter((t) => t.done).length;
  const pct = Math.round((done / ONBOARDING_TASKS.length) * 100);
  return (
    <V11Page
      icon={<UserPlus className="size-6 text-fuchsia-300" />}
      title="Production Onboarding"
      blurb="Repeatable workflow for adding the next paid customer. Includes imports, billing activation, training, and go-live signoff."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Tasks complete" value={`${done}/${ONBOARDING_TASKS.length}`} tone={pct >= 80 ? "good" : "warn"} />
        <StatTile label="Progress" value={`${pct}%`} tone={pct >= 80 ? "good" : "warn"} />
        <StatTile label="Remaining" value={ONBOARDING_TASKS.length - done} tone="info" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <Progress value={pct} className="h-1.5" />
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
