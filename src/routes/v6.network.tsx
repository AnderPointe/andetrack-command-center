import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIntelligentLogisticsNetwork, useNetworkFlow } from "@/v6/hooks";

export const Route = createFileRoute("/v6/network")({
  head: () => ({ meta: [{ title: "Logistics Network · V6" }] }),
  component: () => {
    const { volume: v, health, alerts } = useIntelligentLogisticsNetwork();
    const { flow, subsystems } = useNetworkFlow();
    return (
      <V6Page icon={<Network className="size-6 text-emerald-300" />} title="Intelligent Logistics Network Command Center"
        blurb="Anderoute as a connected logistics operating network: companies, drivers, carriers, customers, loads, GPS, navigation, marketplace, API, EDI, webhooks, portal, CoPilot, automation, support, revenue.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Network health" value={health} tone="emerald" />
          <ScoreCard label="API uptime (proxy)" value={97} tone="sky" />
          <ScoreCard label="Realtime fan-out" value={94} tone="violet" />
          <ScoreCard label="Webhook delivery" value={98} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Companies",  value: v.companies },
          { label: "Drivers",    value: v.drivers.toLocaleString() },
          { label: "Carriers",   value: v.carriers.toLocaleString() },
          { label: "Customers",  value: v.customers.toLocaleString() },
          { label: "Active loads", value: v.loads_active.toLocaleString() },
          { label: "Shipments 30d", value: v.shipments_30d.toLocaleString() },
          { label: "Regions", value: v.regions },
          { label: "Integrations", value: v.integrations },
          { label: "GPS events 24h", value: (v.gps_events_24h/1000).toFixed(0) + "k" },
          { label: "Nav sessions 24h", value: v.nav_sessions_24h.toLocaleString() },
          { label: "Marketplace loads 7d", value: v.marketplace_loads_7d.toLocaleString() },
          { label: "API req 24h", value: (v.api_requests_24h/1_000_000).toFixed(1) + "M" },
          { label: "EDI tx 24h", value: (v.edi_tx_24h/1000).toFixed(0) + "k" },
          { label: "Webhooks 24h", value: (v.webhook_deliveries_24h/1000).toFixed(0) + "k" },
          { label: "CoPilot recs 24h", value: v.copilot_recs_24h.toLocaleString() },
          { label: "Automation approvals 24h", value: v.automation_approvals_24h },
        ]} />
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Subsystem health</h3>
            <div className="mt-2 grid gap-2">
              {subsystems.map(s => (
                <div key={s.sys}>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">{s.sys}</span><span className={s.score >= 90 ? "text-emerald-300" : s.score >= 85 ? "text-sky-300" : "text-amber-300"}>{s.score}</span></div>
                  <Progress value={s.score} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Load lifecycle flow (last 24h)</h3>
            <div className="mt-2 space-y-1.5 text-xs">
              {flow.map(f => {
                const pct = Math.round((f.ok / flow[0].count) * 100);
                return (
                  <div key={f.stage} className="grid grid-cols-[140px_1fr_70px] items-center gap-2">
                    <span className="text-muted-foreground">{f.stage}</span>
                    <div className="h-2 rounded bg-white/5"><div className="h-full rounded bg-emerald-400/70" style={{ width: `${pct}%` }} /></div>
                    <span className="text-right tabular-nums">{f.ok.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Network alerts</h3>
          <ul className="mt-2 space-y-2 text-xs">
            {alerts.map(a => (
              <li key={a.id} className="flex items-start gap-2">
                <StatusPill status={a.severity} />
                <div>
                  <div className="text-foreground">{a.region}</div>
                  <div className="text-muted-foreground">{a.msg}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </V6Page>
    );
  },
});
