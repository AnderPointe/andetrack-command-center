import { createFileRoute } from "@tanstack/react-router";
import { Radio } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TELEMATICS_PROVIDERS, TELEMATICS_VEHICLE_MAP, TELEMATICS_HEALTH, TELEMATICS_SYNC_LOG, TELEMATICS_CONNECT_STEPS } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/telematics")({
  head: () => ({ meta: [{ title: "Telematics · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Radio className="size-6 text-sky-300" />} title="Telematics Integration Foundation"
      blurb="Placeholder connectors for Samsara, Motive, Geotab, Verizon Connect, and Fleet Complete. No real provider calls yet.">
      <div className="grid gap-3 md:grid-cols-4">
        <Card className="border-white/10 bg-white/[0.02] p-3 text-sm"><div className="text-xs text-muted-foreground">Sync success</div><div className="text-xl font-semibold">{TELEMATICS_HEALTH.sync_success_pct}%</div><Progress value={TELEMATICS_HEALTH.sync_success_pct} className="mt-2 h-1" /></Card>
        <Card className="border-white/10 bg-white/[0.02] p-3 text-sm"><div className="text-xs text-muted-foreground">Last sync</div><div className="text-xl font-semibold">{TELEMATICS_HEALTH.last_sync_age_sec}s ago</div></Card>
        <Card className="border-white/10 bg-white/[0.02] p-3 text-sm"><div className="text-xs text-muted-foreground">Errors 24h</div><div className="text-xl font-semibold">{TELEMATICS_HEALTH.errors_24h}</div></Card>
        <Card className="border-white/10 bg-white/[0.02] p-3 text-sm"><div className="text-xs text-muted-foreground">Healthy vehicles</div><div className="text-xl font-semibold">{TELEMATICS_HEALTH.vehicles_healthy}/{TELEMATICS_HEALTH.vehicles_total}</div></Card>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Providers</h3>
          <ul className="mt-2 space-y-1.5 text-sm">{TELEMATICS_PROVIDERS.map((p) => (
            <li key={p.id} className="rounded border border-white/10 bg-black/20 p-2">
              <div className="flex items-center justify-between"><span className="font-medium">{p.label}</span><Badge variant="outline" className="border-amber-500/40 text-amber-300">{p.status}</Badge></div>
              <p className="mt-1 text-xs text-muted-foreground">Capabilities: {p.capabilities.join(", ")}</p>
            </li>
          ))}</ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Vehicle mapping</h3>
          <table className="mt-2 w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Telematics ID</th><th className="p-1">Unit</th><th className="p-1">Driver</th><th className="p-1">Health</th></tr></thead>
            <tbody>{TELEMATICS_VEHICLE_MAP.map((m) => (
              <tr key={m.telematics_id} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{m.telematics_id}</td><td className="p-1">{m.anderoute_unit}</td><td className="p-1">{m.driver ?? "—"}</td><td className="p-1"><Badge variant="outline" className={m.health === "ok" ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>{m.health}</Badge></td></tr>
            ))}</tbody></table>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Connect workflow</h3>
        <ol className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">{TELEMATICS_CONNECT_STEPS.map((s, i) => (
          <li key={s.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5"><span><span className="mr-2 font-mono text-xs text-sky-300">{i + 1}.</span>{s.step}</span><Badge variant="outline" className={s.status === "ready" ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>{s.status}</Badge></li>
        ))}</ol>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Recent sync log</h3>
        <table className="mt-2 w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Time</th><th className="p-1">Provider</th><th className="p-1">Event</th><th className="p-1">Result</th><th className="p-1">Count</th></tr></thead>
          <tbody>{TELEMATICS_SYNC_LOG.map((l, i) => (
            <tr key={i} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{l.ts}</td><td className="p-1">{l.provider}</td><td className="p-1">{l.event}</td><td className="p-1">{l.result}</td><td className="p-1 font-mono">{l.count}</td></tr>
          ))}</tbody></table>
      </Card>
    </V3Page>
  ),
});
