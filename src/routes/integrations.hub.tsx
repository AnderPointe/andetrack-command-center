import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCompanyIntegrations, useConnectorCatalog } from "@/enterprise/hooks/useEnterpriseData";
import {
  Plug, Search, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Power,
  ArrowRight, Activity, Zap, Database, Cloud, Truck, FileText, Mail, Map as MapIcon,
} from "lucide-react";
import type { IntegrationCategory } from "@/enterprise/types";

export const Route = createFileRoute("/integrations/hub")({
  head: () => ({ meta: [{ title: "Integration Hub — Anderoute" }] }),
  component: IntegrationHub,
});

const CATEGORY_META: Record<IntegrationCategory | "all", { label: string; icon: any }> = {
  all: { label: "All", icon: Plug },
  edi: { label: "EDI", icon: Database },
  rest_api: { label: "REST API", icon: Zap },
  webhooks: { label: "Webhooks", icon: Activity },
  accounting: { label: "Accounting", icon: FileText },
  tms: { label: "TMS", icon: Truck },
  broker: { label: "Broker", icon: Truck },
  shipper_portal: { label: "Shippers", icon: Truck },
  customer_system: { label: "Customer", icon: Truck },
  fuel: { label: "Fuel", icon: Zap },
  maintenance: { label: "Maintenance", icon: Activity },
  telematics: { label: "Telematics", icon: Activity },
  maps: { label: "Maps", icon: MapIcon },
  ai_provider: { label: "AI", icon: Zap },
  notifications: { label: "Notifications", icon: Mail },
  document_storage: { label: "Storage", icon: Cloud },
  data_io: { label: "Data I/O", icon: Database },
  crm: { label: "CRM", icon: FileText },
  erp: { label: "ERP", icon: Database },
};

function healthBadge(h: string) {
  if (h === "healthy") return <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30"><CheckCircle2 className="size-3 mr-1" />Healthy</Badge>;
  if (h === "warning") return <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30"><AlertTriangle className="size-3 mr-1" />Warning</Badge>;
  if (h === "failed") return <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/30"><XCircle className="size-3 mr-1" />Failed</Badge>;
  return <Badge variant="outline">Unknown</Badge>;
}

function IntegrationHub() {
  const { catalog } = useConnectorCatalog();
  const { items, toggle, sync } = useCompanyIntegrations();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<IntegrationCategory | "all">("all");

  const filtered = catalog.filter(
    (c) => (cat === "all" || c.category === cat) && (q === "" || c.name.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Integration Hub</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Connect Anderoute to EDI, accounting, telematics, maps, brokers, and customer systems.</p>
          </div>
          <div className="flex gap-2 text-xs">
            <Link to="/integrations/edi" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 hover:border-teal-400/40">EDI</Link>
            <Link to="/integrations/api" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 hover:border-teal-400/40">API Marketplace</Link>
            <Link to="/integrations/webhooks" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 hover:border-teal-400/40">Webhooks</Link>
            <Link to="/integrations/health" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 hover:border-teal-400/40">Health</Link>
          </div>
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Connected ({items.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((i) => (
              <div key={i.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-sm">{i.display_name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{i.connector_key}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {healthBadge(i.health)}
                    <Switch checked={i.enabled} onCheckedChange={() => toggle(i.id)} />
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Last sync: {i.last_sync_at ? new Date(i.last_sync_at).toLocaleString() : "never"}
                </div>
                {i.last_error && <div className="mt-1 text-xs text-rose-300">{i.last_error}</div>}
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => sync(i.id)}><RefreshCw className="size-3 mr-1" />Sync now</Button>
                  <Button size="sm" variant="outline"><Power className="size-3 mr-1" />Test</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Marketplace</h2>
            <div className="relative">
              <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="h-8 pl-8 w-64" placeholder="Search connectors…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(Object.keys(CATEGORY_META) as (IntegrationCategory | "all")[]).map((k) => {
              const M = CATEGORY_META[k];
              return (
                <button
                  key={k}
                  onClick={() => setCat(k)}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] ${
                    cat === k ? "border-teal-400/50 bg-teal-500/10 text-teal-200" : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20"
                  }`}
                >
                  <M.icon className="size-3" />
                  {M.label}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((c) => (
              <div key={c.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 hover:border-teal-400/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">{c.vendor} · {CATEGORY_META[c.category]?.label}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Available</Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  {c.capabilities.slice(0, 3).map((cap) => (
                    <span key={cap} className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-muted-foreground">{cap}</span>
                  ))}
                </div>
                <Button size="sm" className="mt-3 w-full" variant="outline">Connect <ArrowRight className="size-3 ml-1" /></Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
