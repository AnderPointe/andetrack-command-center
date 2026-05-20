import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SCALING_CHECKS } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/scaling")({
  head: () => ({ meta: [{ title: "Scaling Prep · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  ok:   "border-emerald-500/30 text-emerald-300",
  warn: "border-amber-500/30 text-amber-300",
  fail: "border-rose-500/30 text-rose-300",
};

function Page() {
  return (
    <V1Page
      icon={<Activity className="size-6 text-indigo-300" />}
      title="Performance & Scaling Prep"
      blurb="Indexes, realtime efficiency, query budgets, and storage budgets ahead of paid-customer growth."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {SCALING_CHECKS.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div>
                <div>{s.label}</div>
                {s.note && <div className="text-xs text-muted-foreground">{s.note}</div>}
              </div>
              <Badge variant="outline" className={TONE[s.status]}>{s.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V1Page>
  );
}
