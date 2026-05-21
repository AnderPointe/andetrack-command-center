import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VEHICLE_HEALTH } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/vehicle-health")({
  head: () => ({ meta: [{ title: "Vehicle Health · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<HeartPulse className="size-6 text-amber-300" />} title="Vehicle Health (placeholder)"
      blurb="Composite health score from odometer, DTCs, idle trend, and maintenance/inspection dates. Diagnostic ML stays deferred.">
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Placeholder</Badge>{" "}
        Health scoring is illustrative and does not replace certified inspection.
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {VEHICLE_HEALTH.map((v) => (
          <Card key={v.vehicle} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between"><h3 className="font-semibold">{v.vehicle}</h3>
              <Badge variant="outline" className={v.risk === "medium" ? "border-amber-500/40 text-amber-300" : "border-emerald-500/40 text-emerald-300"}>{v.risk} risk</Badge>
            </div>
            <Progress value={v.score} className="mt-2 h-1.5" />
            <div className="mt-2 text-xs text-muted-foreground">Service due in {v.service_due_days} days · {v.note}</div>
          </Card>
        ))}
      </div>
    </V35Page>
  ),
});
