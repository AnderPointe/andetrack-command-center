import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EnterpriseNav } from "@/components/enterprise/EnterpriseNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ALL_API_SCOPES, type ApiScope } from "@/enterprise/types";
import { Key, Plus, Eye, EyeOff, Trash2, RotateCw, Copy, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/integrations/api")({
  head: () => ({ meta: [{ title: "API Marketplace — Anderoute" }] }),
  component: ApiMarketplace,
});

interface MockKey {
  id: string; name: string; prefix: string; secret: string; scopes: ApiScope[];
  status: "active" | "revoked"; created_at: string; last_used_at?: string;
}

const SEED: MockKey[] = [
  { id: "k1", name: "Production server", prefix: "ak_live_8af2", secret: "ak_live_8af2c1cd9b4e6a8f1234567890abcdef", scopes: ["loads.read","shipments.read","tracking.read"], status: "active", created_at: new Date(Date.now() - 1000*60*60*24*45).toISOString(), last_used_at: new Date(Date.now()-1000*60*5).toISOString() },
  { id: "k2", name: "Webhook receiver", prefix: "ak_live_72f1", secret: "ak_live_72f192c7314e8b6c9876543210fedcba", scopes: ["webhooks.manage","shipments.write"], status: "active", created_at: new Date(Date.now() - 1000*60*60*24*12).toISOString(), last_used_at: new Date(Date.now()-1000*60*60).toISOString() },
];

const ENDPOINTS = [
  { m: "GET", p: "/v1/loads", d: "List loads" },
  { m: "POST", p: "/v1/loads", d: "Create load" },
  { m: "GET", p: "/v1/loads/:id", d: "Get load" },
  { m: "PATCH", p: "/v1/loads/:id", d: "Update load" },
  { m: "POST", p: "/v1/loads/:id/offer", d: "Offer load to driver" },
  { m: "POST", p: "/v1/loads/:id/assign", d: "Assign driver" },
  { m: "GET", p: "/v1/shipments", d: "List shipments" },
  { m: "POST", p: "/v1/shipments", d: "Create shipment" },
  { m: "GET", p: "/v1/shipments/:id/tracking", d: "Live tracking" },
  { m: "GET", p: "/v1/drivers/:id/live-state", d: "Driver live state" },
  { m: "GET", p: "/v1/vehicles", d: "List vehicles" },
  { m: "GET", p: "/v1/proof-of-delivery/:id", d: "Fetch POD" },
  { m: "POST", p: "/v1/shipment-requests", d: "Submit shipment request" },
  { m: "POST", p: "/v1/webhooks/test", d: "Send test webhook" },
  { m: "GET", p: "/v1/invoices", d: "List invoices" },
];

function ApiMarketplace() {
  const [keys, setKeys] = useState<MockKey[]>(SEED);
  const [shown, setShown] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setShown((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">API Marketplace</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Keys, scopes, rate limits, request logs, and developer documentation.</p>
          </div>
          <Button size="sm"><Plus className="size-3.5 mr-1.5" />Create API key</Button>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-4">
          <Card className="p-5">
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">API keys</h2>
            <div className="space-y-2">
              {keys.map((k) => (
                <div key={k.id} className="rounded-md border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Key className="size-3.5 text-teal-300" />
                        <span className="font-medium text-sm truncate">{k.name}</span>
                        <Badge variant={k.status === "active" ? "default" : "outline"} className="text-[10px]">{k.status}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Input readOnly value={shown.has(k.id) ? k.secret : `${k.prefix}••••••••••••••••••••••••`} className="h-8 font-mono text-xs" />
                        <Button size="sm" variant="outline" onClick={() => toggle(k.id)}>{shown.has(k.id) ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}</Button>
                        <Button size="sm" variant="outline"><Copy className="size-3.5" /></Button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {k.scopes.map((s) => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                      </div>
                      <div className="mt-1.5 text-[11px] text-muted-foreground">
                        Created {new Date(k.created_at).toLocaleDateString()} · Last used {k.last_used_at ? new Date(k.last_used_at).toLocaleString() : "never"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button size="sm" variant="outline"><RotateCw className="size-3.5" /></Button>
                      <Button size="sm" variant="outline" onClick={() => setKeys((p) => p.filter((x) => x.id !== k.id))}><Trash2 className="size-3.5" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-xs font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Available scopes</h3>
              <div className="flex flex-wrap gap-1.5">
                {ALL_API_SCOPES.map((s) => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Rate limit usage</h2>
            <div className="space-y-3">
              {[
                { label: "Requests / min", used: 142, max: 300 },
                { label: "Requests / day", used: 18420, max: 50000 },
                { label: "Webhook deliveries / hr", used: 87, max: 500 },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-xs"><span>{r.label}</span><span className="tabular-nums text-muted-foreground">{r.used}/{r.max}</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-teal-500" style={{ width: `${(r.used / r.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Public API · v1</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {ENDPOINTS.map((e) => (
              <div key={e.p + e.m} className="flex items-center gap-3 rounded-md border border-white/5 bg-white/[0.02] px-3 py-2">
                <Badge variant="outline" className={`text-[10px] font-mono ${e.m === "GET" ? "text-emerald-300" : e.m === "POST" ? "text-teal-300" : "text-amber-300"}`}>{e.m}</Badge>
                <span className="font-mono text-xs">{e.p}</span>
                <span className="ml-auto text-xs text-muted-foreground">{e.d}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-white/5 bg-slate-950/60 p-3 font-mono text-[11px] text-slate-300 overflow-x-auto">
{`curl https://api.anderoute.com/v1/loads \\
  -H "Authorization: Bearer ak_live_..." \\
  -H "X-Anderoute-Version: 2026-05-01"`}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
