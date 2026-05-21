import { createFileRoute } from "@tanstack/react-router";
import { Webhook } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { WEBHOOK_ENDPOINTS, WEBHOOK_DELIVERIES, WEBHOOK_EVENT_TYPES } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/webhooks")({
  head: () => ({ meta: [{ title: "V1.5 Webhooks · Anderoute" }] }),
  component: Page,
});

const tone: Record<string, string> = {
  delivered: "border-emerald-500/30 text-emerald-300",
  failed:    "border-rose-500/30 text-rose-300",
  retrying:  "border-amber-500/30 text-amber-300",
};

function Page() {
  const enabled = WEBHOOK_ENDPOINTS.filter((e) => e.enabled).length;
  const delivered = WEBHOOK_DELIVERIES.filter((d) => d.status === "delivered").length;
  const failed = WEBHOOK_DELIVERIES.filter((d) => d.status === "failed").length;
  return (
    <V15Page
      icon={<Webhook className="size-6 text-cyan-300" />}
      title="Webhook Starter System"
      blurb="HMAC-signed outbound webhooks with retry policy and delivery logs. Sign secret per endpoint, never log full payloads, and disable endpoints after sustained failures."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Endpoints enabled" value={`${enabled}/${WEBHOOK_ENDPOINTS.length}`} tone={enabled ? "good" : "warn"} />
        <StatTile label="Delivered (recent)" value={delivered} tone="good" />
        <StatTile label="Failed" value={failed} tone={failed ? "bad" : "good"} />
        <StatTile label="Event types" value={WEBHOOK_EVENT_TYPES.length} tone="info" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Endpoints</h2>
        <div className="mt-3 space-y-2 text-sm">
          {WEBHOOK_ENDPOINTS.map((e) => (
            <div key={e.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{e.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{e.url}</div>
                </div>
                <Badge variant="outline" className={e.enabled ? "border-emerald-500/30 text-emerald-300" : "border-white/15 text-muted-foreground"}>
                  {e.enabled ? "enabled" : "disabled"}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {e.events.map((ev) => (
                  <Badge key={ev} variant="outline" className="border-white/15 text-xs text-muted-foreground">{ev}</Badge>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                last delivery {e.lastDeliveryAt} · success rate {Math.round(e.successRate * 100)}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Delivery log</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-2">ID</th><th className="p-2">Endpoint</th><th className="p-2">Event</th><th className="p-2">Status</th><th className="p-2">Code</th><th className="p-2">Attempts</th><th className="p-2">When</th></tr>
          </thead>
          <tbody>
            {WEBHOOK_DELIVERIES.map((d) => (
              <tr key={d.id} className="border-t border-white/10">
                <td className="p-2 font-mono text-xs">{d.id}</td>
                <td className="p-2">{d.endpoint}</td>
                <td className="p-2 font-mono text-xs">{d.event}</td>
                <td className="p-2"><Badge variant="outline" className={tone[d.status]}>{d.status}</Badge></td>
                <td className="p-2">{d.responseCode}</td>
                <td className="p-2">{d.attempts}</td>
                <td className="p-2 text-xs text-muted-foreground">{d.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V15Page>
  );
}
