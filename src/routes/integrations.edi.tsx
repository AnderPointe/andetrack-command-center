import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EnterpriseNav } from "@/components/enterprise/EnterpriseNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEdiTransactions } from "@/enterprise/hooks/useEnterpriseData";
import { ArrowDownToLine, ArrowUpFromLine, FileWarning, FileCheck2, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/integrations/edi")({
  head: () => ({ meta: [{ title: "EDI Dashboard — Anderoute" }] }),
  component: EdiDashboard,
});

const TX_LABEL: Record<string, string> = {
  "204": "204 Load Tender", "990": "990 Tender Response", "214": "214 Shipment Status",
  "210": "210 Freight Invoice", "211": "211 Bill of Lading", "212": "212 Delivery Manifest",
  "997": "997 Functional Ack", "856": "856 Advance Ship Notice",
};

function statusBadge(s: string) {
  const map: Record<string, string> = {
    processed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    acknowledged: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    received: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    parsed: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    error: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    rejected: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  };
  return <Badge className={map[s] ?? ""}>{s}</Badge>;
}

function EdiDashboard() {
  const { transactions } = useEdiTransactions();
  const kpis = [
    { label: "Inbound today", value: transactions.filter((t) => t.direction === "inbound").length, icon: ArrowDownToLine },
    { label: "Outbound today", value: transactions.filter((t) => t.direction === "outbound").length, icon: ArrowUpFromLine },
    { label: "Acknowledged", value: transactions.filter((t) => t.status === "acknowledged").length, icon: FileCheck2 },
    { label: "Errors", value: transactions.filter((t) => t.status === "error").length, icon: FileWarning },
  ];
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <EnterpriseNav />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">EDI Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">204 / 990 / 214 / 210 / 997 transactions with trading partners.</p>
          </div>
          <Button variant="outline" size="sm"><RefreshCw className="size-3.5 mr-1.5" />Poll partners</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {kpis.map((k) => (
            <Card key={k.label} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</span>
                <k.icon className="size-4 text-teal-300" />
              </div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{k.value}</div>
            </Card>
          ))}
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Recent transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Type</th>
                  <th className="text-left py-2 pr-3">Partner</th>
                  <th className="text-left py-2 pr-3">Dir</th>
                  <th className="text-left py-2 pr-3">Control #</th>
                  <th className="text-left py-2 pr-3">Load</th>
                  <th className="text-left py-2 pr-3">Status</th>
                  <th className="text-left py-2 pr-3">Received</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 font-medium">{TX_LABEL[t.transaction_type] ?? t.transaction_type}</td>
                    <td className="py-2 pr-3">{t.partner_name}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{t.direction}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{t.control_number}</td>
                    <td className="py-2 pr-3 text-xs">{t.related_load_id ?? "—"}</td>
                    <td className="py-2 pr-3">{statusBadge(t.status)}{t.error_message && <div className="text-[11px] text-rose-300 mt-0.5">{t.error_message}</div>}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{t.received_at ? new Date(t.received_at).toLocaleString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-2 uppercase tracking-wider text-muted-foreground">EDI workflow</h2>
          <ol className="text-sm space-y-1 text-muted-foreground list-decimal list-inside">
            <li>Receive 204 load tender → parse → create shipment_request</li>
            <li>Send 997 functional acknowledgment</li>
            <li>Convert to load → reply with 990 (accept/decline)</li>
            <li>Stream 214 shipment status messages (pickup, in-transit, delivered)</li>
            <li>Send 210 invoice on POD completion</li>
            <li>Retry on transmission errors with exponential backoff</li>
          </ol>
        </Card>
      </div>
    </AppShell>
  );
}
