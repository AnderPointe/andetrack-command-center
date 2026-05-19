import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EnterpriseNav } from "@/components/enterprise/EnterpriseNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/integrations/health")({
  head: () => ({ meta: [{ title: "Integration Health — Anderoute" }] }),
  component: IntegrationHealth,
});

const EVENTS = [
  { integration: "Samsara", severity: "info",    msg: "GPS sync completed (4,210 events)", at: "2m ago" },
  { integration: "WEX Fuel Card", severity: "error", msg: "Auth token expired — reconnect required", at: "6h ago" },
  { integration: "Twilio", severity: "warning",  msg: "SMS quota at 78% for this billing period", at: "1h ago" },
  { integration: "QuickBooks", severity: "info", msg: "Invoice batch posted (12 records)", at: "22m ago" },
  { integration: "EDI · ACME Brokerage", severity: "error", msg: "Unmapped field SHIP_TO_QUALIFIER in 204", at: "45m ago" },
  { integration: "Webhook · Customer ops", severity: "warning", msg: "Endpoint returned 502 — retrying", at: "12m ago" },
];

const STATUS = [
  { name: "Telematics (Samsara)", status: "healthy",  uptime: "99.98%" },
  { name: "Accounting (QuickBooks)", status: "healthy", uptime: "99.91%" },
  { name: "Notifications (Twilio)", status: "warning", uptime: "99.40%" },
  { name: "Fuel Card (WEX)", status: "failed",  uptime: "62.10%" },
  { name: "EDI (3 partners)", status: "degraded", uptime: "97.20%" },
  { name: "Public API", status: "healthy", uptime: "99.99%" },
  { name: "Webhooks", status: "warning", uptime: "98.84%" },
];

const STATUS_STYLE: Record<string, string> = {
  healthy:  "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  warning:  "bg-amber-500/15 text-amber-300 border-amber-500/30",
  degraded: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  failed:   "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

function IntegrationHealth() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Integration Health</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Live status of every external connection — API, EDI, webhooks, providers.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Healthy", value: STATUS.filter((s) => s.status === "healthy").length, icon: CheckCircle2, tone: "text-emerald-300" },
            { label: "Warnings", value: STATUS.filter((s) => s.status === "warning").length, icon: AlertTriangle, tone: "text-amber-300" },
            { label: "Degraded", value: STATUS.filter((s) => s.status === "degraded").length, icon: Activity, tone: "text-orange-300" },
            { label: "Failed",  value: STATUS.filter((s) => s.status === "failed").length, icon: XCircle, tone: "text-rose-300" },
          ].map((k) => (
            <Card key={k.label} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</span>
                <k.icon className={`size-4 ${k.tone}`} />
              </div>
              <div className={`mt-1 text-2xl font-semibold tabular-nums ${k.tone}`}>{k.value}</div>
            </Card>
          ))}
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Status by integration</h2>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-white/5">
                <th className="text-left py-2 pr-3">Integration</th>
                <th className="text-left py-2 pr-3">Status</th>
                <th className="text-left py-2 pr-3">30-day uptime</th>
              </tr>
            </thead>
            <tbody>
              {STATUS.map((s) => (
                <tr key={s.name} className="border-b border-white/[0.04]">
                  <td className="py-2 pr-3">{s.name}</td>
                  <td className="py-2 pr-3"><Badge className={STATUS_STYLE[s.status] ?? ""}>{s.status}</Badge></td>
                  <td className="py-2 pr-3 tabular-nums">{s.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Recent events</h2>
          <ul className="space-y-2">
            {EVENTS.map((e, i) => (
              <li key={i} className="flex items-start gap-3 rounded-md border border-white/5 bg-white/[0.02] px-3 py-2 text-sm">
                <Badge variant="outline" className={`text-[10px] uppercase ${e.severity === "error" ? "text-rose-300 border-rose-500/30" : e.severity === "warning" ? "text-amber-300 border-amber-500/30" : "text-slate-300"}`}>{e.severity}</Badge>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{e.integration}</div>
                  <div className="text-xs text-muted-foreground">{e.msg}</div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{e.at}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
