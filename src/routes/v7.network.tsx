import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { KpiGrid, SimpleTable, StatusPill, ScoreCard } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalLogisticsNetwork } from "@/v7/hooks";

export const Route = createFileRoute("/v7/network")({
  head: () => ({ meta: [{ title: "Global Network · V7 · Anderoute" }] }),
  component: () => {
    const { metrics, regional, hotspots, feed } = useGlobalLogisticsNetwork();
    return (
      <V7Page icon={<Globe className="size-6 text-indigo-300" />} title="Global Logistics Operating Network"
        blurb="Network-wide operating activity across active countries, regions, partners, and the marketplace. Numbers are illustrative.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Liquidity"        value={metrics.marketplace_liquidity} tone="violet" />
          <ScoreCard label="Support burden"   value={metrics.support_burden}        tone="amber" />
          <ScoreCard label="Network health"   value={82}                            tone="emerald" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Countries",        value: metrics.countries },
          { label: "Regions",          value: metrics.regions },
          { label: "Companies",        value: metrics.companies },
          { label: "Drivers",          value: metrics.drivers.toLocaleString() },
          { label: "Carriers",         value: metrics.carriers.toLocaleString() },
          { label: "Customers",        value: metrics.customers.toLocaleString() },
          { label: "Shipments",        value: metrics.shipments.toLocaleString() },
          { label: "Marketplace loads",value: metrics.marketplace_loads.toLocaleString() },
          { label: "API req/min",      value: metrics.api_rpm.toLocaleString() },
          { label: "EDI txns",         value: metrics.edi_txn.toLocaleString() },
          { label: "Webhook txns",     value: metrics.webhook_txn.toLocaleString() },
          { label: "Mobile DAU",       value: metrics.mobile_dau.toLocaleString() },
          { label: "Portal DAU",       value: metrics.portal_dau.toLocaleString() },
          { label: "CoPilot events",   value: metrics.copilot_events.toLocaleString() },
          { label: "Partners",         value: metrics.partners },
          { label: "Hotspots",         value: hotspots.length },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Regional activity</h3>
          <div className="mt-2">
            <SimpleTable rows={regional as any} columns={[
              { key: "region",    label: "Region" },
              { key: "shipments", label: "Shipments" },
              { key: "loads",     label: "Loads" },
              { key: "revenue",   label: "Revenue" },
              { key: "risk",      label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
            ]} />
          </div>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Risk hotspots</h3>
            <div className="mt-2">
              <SimpleTable rows={hotspots as any} columns={[
                { key: "region",   label: "Region" },
                { key: "risk",     label: "Risk" },
                { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
              ]} />
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Network activity feed</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              {feed.map((f, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono text-indigo-300">{f.ts}</span>
                  <span className="w-32 shrink-0">{f.region}</span>
                  <span>{f.event}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </V7Page>
    );
  },
});
