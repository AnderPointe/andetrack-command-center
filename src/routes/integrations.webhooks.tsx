import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EnterpriseNav } from "@/components/enterprise/EnterpriseNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useMemo, useState } from "react";
import { ALL_WEBHOOK_EVENTS, type WebhookEvent } from "@/enterprise/types";
import { buildPayload, buildWebhookSignature } from "@/enterprise/services/webhookService";
import { Webhook, Plus, Send, RotateCw, Pause, CheckCircle2, XCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/integrations/webhooks")({
  head: () => ({ meta: [{ title: "Webhooks — Anderoute" }] }),
  component: WebhooksPage,
});

interface MockEp { id: string; name: string; url: string; enabled: boolean; events: WebhookEvent[]; }
interface MockDel { id: string; event: WebhookEvent; status: "delivered" | "failed" | "pending"; code?: number; attempt: number; ts: string; }

const EPS: MockEp[] = [
  { id: "e1", name: "Customer ops worker", url: "https://hooks.acme.com/anderoute", enabled: true, events: ["shipment.delivered","proof_of_delivery.submitted","invoice.created"] },
  { id: "e2", name: "Slack alerts",         url: "https://hooks.slack.com/services/T0/B0/XXX", enabled: true, events: ["alert.created","shipment.delayed"] },
  { id: "e3", name: "Internal data lake",   url: "https://etl.anderoute.com/ingest",  enabled: false, events: ["load.created","load.assigned","shipment.in_transit"] },
];

const DELS: MockDel[] = [
  { id: "d1", event: "shipment.delivered", status: "delivered", code: 200, attempt: 1, ts: new Date(Date.now()-1000*60*3).toISOString() },
  { id: "d2", event: "alert.created",      status: "delivered", code: 200, attempt: 1, ts: new Date(Date.now()-1000*60*8).toISOString() },
  { id: "d3", event: "invoice.created",    status: "failed",    code: 502, attempt: 3, ts: new Date(Date.now()-1000*60*12).toISOString() },
  { id: "d4", event: "shipment.in_transit",status: "pending",   attempt: 0, ts: new Date().toISOString() },
  { id: "d5", event: "proof_of_delivery.submitted", status: "delivered", code: 201, attempt: 1, ts: new Date(Date.now()-1000*60*22).toISOString() },
];

function delIcon(s: string) {
  if (s === "delivered") return <CheckCircle2 className="size-3.5 text-emerald-300" />;
  if (s === "failed") return <XCircle className="size-3.5 text-rose-300" />;
  return <Clock className="size-3.5 text-amber-300" />;
}

type Filter = "all" | "delivered" | "failed" | "pending";

function WebhooksPage() {
  const [eps, setEps] = useState(EPS);
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<string>(DELS[0].id);

  const filtered = DELS.filter((d) => filter === "all" || d.status === filter);
  const current = DELS.find((d) => d.id === selected) ?? DELS[0];
  const sample = useMemo(() => {
    const payload = buildPayload(current.event, { load_id: "L-2041", shipment_id: "SH-1042" });
    const body = JSON.stringify(payload, null, 2);
    const ts = Math.floor(Date.now() / 1000);
    const sig = buildWebhookSignature("whsec_sample_secret", body, ts);
    return { body, sig };
  }, [current]);

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <EnterpriseNav />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Webhooks</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Subscribe to shipment, driver, and billing events. Signed with HMAC-SHA256, retried with exponential backoff.</p>
          </div>
          <Button size="sm"><Plus className="size-3.5 mr-1.5" />New endpoint</Button>
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Endpoints</h2>
          <div className="space-y-2">
            {eps.map((e) => (
              <div key={e.id} className="rounded-md border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2"><Webhook className="size-3.5 text-teal-300" /><span className="font-medium text-sm">{e.name}</span></div>
                    <div className="mt-1 font-mono text-xs text-muted-foreground truncate">{e.url}</div>
                    <div className="mt-2 flex flex-wrap gap-1">{e.events.map((ev) => <Badge key={ev} variant="outline" className="text-[10px]">{ev}</Badge>)}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Switch checked={e.enabled} onCheckedChange={() => setEps((p) => p.map((x) => x.id === e.id ? { ...x, enabled: !x.enabled } : x))} />
                    <Button size="sm" variant="outline"><Send className="size-3.5" /></Button>
                    <Button size="sm" variant="outline"><RotateCw className="size-3.5" /></Button>
                    <Button size="sm" variant="outline"><Pause className="size-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-[1fr_420px] gap-4">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Delivery log</h2>
              <div className="flex gap-1">
                {(["all","delivered","pending","failed"] as Filter[]).map((f) => {
                  const count = f === "all" ? DELS.length : DELS.filter((d) => d.status === f).length;
                  return (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] capitalize ${
                        filter === f ? "border-teal-400/50 bg-teal-500/10 text-teal-200" : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20"
                      }`}
                    >
                      {f} <span className="tabular-nums opacity-70">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Status</th>
                  <th className="text-left py-2 pr-3">Event</th>
                  <th className="text-left py-2 pr-3">Code</th>
                  <th className="text-left py-2 pr-3">Attempts</th>
                  <th className="text-left py-2 pr-3">When</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelected(d.id)}
                    className={`border-b border-white/[0.04] cursor-pointer ${selected === d.id ? "bg-teal-500/[0.06]" : "hover:bg-white/[0.02]"}`}
                  >
                    <td className="py-2 pr-3 flex items-center gap-1.5">{delIcon(d.status)}<span className="capitalize text-xs">{d.status}</span></td>
                    <td className="py-2 pr-3 font-mono text-xs">{d.event}</td>
                    <td className="py-2 pr-3 tabular-nums">{d.code ?? "—"}</td>
                    <td className="py-2 pr-3 tabular-nums">{d.attempt}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{new Date(d.ts).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Signed payload</h2>
              <Badge variant="outline" className="text-[10px] font-mono">{current.event}</Badge>
            </div>
            <div className="text-[11px] text-muted-foreground mb-1">Anderoute-Signature</div>
            <div className="rounded-md border border-white/5 bg-slate-950/60 p-2 font-mono text-[11px] text-teal-200 break-all">{sample.sig}</div>
            <div className="mt-3 text-[11px] text-muted-foreground mb-1">Body</div>
            <pre className="rounded-md border border-white/5 bg-slate-950/60 p-2 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-64">{sample.body}</pre>
            <div className="mt-3 text-[11px] text-muted-foreground">Retry backoff: <span className="font-mono text-foreground">0s, 30s, 2m, 10m, 1h</span></div>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Subscribable events ({ALL_WEBHOOK_EVENTS.length})</h2>
          <div className="flex flex-wrap gap-1.5">
            {ALL_WEBHOOK_EVENTS.map((e) => <Badge key={e} variant="outline" className="text-[10px] font-mono">{e}</Badge>)}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
