import { createFileRoute } from "@tanstack/react-router";
import { RefreshCcw } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { ETA_SYNC_ROWS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/eta-sync")({
  head: () => ({ meta: [{ title: "V1.5 ETA Sync · Anderoute" }] }),
  component: Page,
});

function Page() {
  const notified = ETA_SYNC_ROWS.filter((r) => r.notified).length;
  const overThreshold = ETA_SYNC_ROWS.filter((r) => r.driftMin > r.thresholdMin).length;
  return (
    <V15Page
      icon={<RefreshCcw className="size-6 text-cyan-300" />}
      title="ETA Sync from Navigation Provider"
      blurb="navigationETAService keeps shipment.eta_at, driver_live_state, and customer portal in lockstep with the provider. Significant drift creates an event, an audit log, and a dispatcher notification."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Tracked shipments" value={ETA_SYNC_ROWS.length} tone="info" />
        <StatTile label="Over threshold" value={overThreshold} tone={overThreshold ? "warn" : "good"} />
        <StatTile label="Customer notified" value={notified} tone="info" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Drift table</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-2">Load</th><th className="p-2">Shipment ETA</th><th className="p-2">Provider ETA</th><th className="p-2">Drift</th><th className="p-2">Threshold</th><th className="p-2">Notified</th><th className="p-2">Reason</th></tr>
          </thead>
          <tbody>
            {ETA_SYNC_ROWS.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-2 font-mono text-xs">{r.load}</td>
                <td className="p-2">{r.shipmentEta}</td>
                <td className="p-2">{r.providerEta}</td>
                <td className="p-2"><Badge variant="outline" className={r.driftMin > r.thresholdMin ? "border-amber-500/30 text-amber-300" : "border-emerald-500/30 text-emerald-300"}>{r.driftMin}m</Badge></td>
                <td className="p-2 text-xs text-muted-foreground">{r.thresholdMin}m</td>
                <td className="p-2"><Badge variant="outline" className={r.notified ? "border-sky-500/30 text-sky-300" : "border-white/15 text-muted-foreground"}>{r.notified ? "yes" : "no"}</Badge></td>
                <td className="p-2 text-xs text-muted-foreground">{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">navigationETAService.ts</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>syncRouteETAToShipment()</li>
          <li>calculateETAChange()</li>
          <li>createETAUpdateEvent()</li>
          <li>notifySignificantETAChange()</li>
          <li>updateCustomerPortalETA()</li>
          <li>createETAChangeAuditLog()</li>
        </ul>
      </Card>
    </V15Page>
  );
}
