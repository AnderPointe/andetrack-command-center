import { createFileRoute } from "@tanstack/react-router";
import { Radio } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TELEMATICS_FLEET, TELEMATICS_VEHICLES, TELEMATICS_EVENTS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/telematics")({
  head: () => ({ meta: [{ title: "Advanced Telematics · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Radio className="size-6 text-amber-300" />} title="Advanced Telematics Dashboard"
      blurb="Connected vehicles, device sync health, DTCs, idle, and harsh-event streams. Provider integrations remain Samsara / Motive / Geotab placeholders.">
      <div className="grid gap-3 md:grid-cols-4">
        {[["Connected", TELEMATICS_FLEET.connected], ["Mapped", TELEMATICS_FLEET.mapped], ["Sync health", `${(TELEMATICS_FLEET.sync_health * 100).toFixed(0)}%`], ["Device errors", TELEMATICS_FLEET.devices_with_errors]].map(([l, v]) => (
          <Card key={String(l)} className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">{l}</div><div className="text-xl font-semibold">{v as any}</div></Card>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Vehicle status</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Vehicle</th><th className="p-1">Provider</th><th className="p-1">Health</th><th className="p-1">DTC</th><th className="p-1">Last sync</th></tr></thead>
            <tbody>{TELEMATICS_VEHICLES.map((v) => (
              <tr key={v.vehicle} className="border-t border-white/10"><td className="p-1 font-mono">{v.vehicle}</td><td className="p-1 text-xs">{v.provider}</td><td className="p-1 font-mono">{v.health}</td><td className="p-1 font-mono">{v.dtcs}</td><td className="p-1 text-xs text-muted-foreground">{v.last_sync}</td></tr>
            ))}</tbody>
          </table>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Event timeline</h3>
          <ul className="mt-2 space-y-1 text-sm">{TELEMATICS_EVENTS.map((e, i) => (
            <li key={i} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
              <span><span className="mr-2 font-mono text-xs text-muted-foreground">{e.at}</span>{e.vehicle} — <span className="text-xs">{e.type}</span></span>
              <Badge variant="outline" className={e.severity === "high" ? "border-rose-500/40 text-rose-300" : e.severity === "warn" ? "border-amber-500/40 text-amber-300" : "border-sky-500/40 text-sky-300"}>{e.severity}</Badge>
            </li>
          ))}</ul>
        </Card>
      </div>
    </V35Page>
  ),
});
