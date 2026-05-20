import { createFileRoute } from "@tanstack/react-router";
import { BellRing } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NOTIF_METRICS, NOTIF_TEMPLATES, NOTIF_FAILURES } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/notifications")({
  head: () => ({ meta: [{ title: "V1.1 Notification Reliability · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V11Page
      icon={<BellRing className="size-6 text-fuchsia-300" />}
      title="Notification Reliability"
      blurb="Delivery, opens, failures, retries — tracked per template and audience. Production targets: delivery ≥97%, open ≥65%."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Sent (30d)" value={NOTIF_METRICS.sent.toLocaleString()} tone="info" />
        <StatTile label="Delivery rate" value={`${Math.round(NOTIF_METRICS.deliveryRate * 100)}%`} tone={NOTIF_METRICS.deliveryRate >= 0.97 ? "good" : "warn"} />
        <StatTile label="Open rate" value={`${Math.round(NOTIF_METRICS.openRate * 100)}%`} tone={NOTIF_METRICS.openRate >= 0.65 ? "good" : "warn"} />
        <StatTile label="Failed / Retrying" value={`${NOTIF_METRICS.failed} / ${NOTIF_METRICS.retrying}`} tone={NOTIF_METRICS.failed > 50 ? "bad" : "warn"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Templates</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {NOTIF_TEMPLATES.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div>
                <div>{t.trigger}</div>
                <div className="text-xs text-muted-foreground">id: <span className="font-mono">{t.id}</span></div>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.channel}</Badge>
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.audience}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Top failure reasons</h2>
        <div className="mt-3 space-y-2 text-sm">
          {NOTIF_FAILURES.map((f) => (
            <div key={f.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div>{f.reason}</div>
                <div className="text-xs text-muted-foreground">template: <span className="font-mono">{f.template}</span></div>
              </div>
              <Badge variant="outline" className="border-rose-500/30 text-rose-300">{f.count}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
