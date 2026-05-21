import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EDI_TRANSACTIONS_V25, EDI_ERROR_QUEUE, EDI_ERROR_CODES } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = {
  received: "border-sky-500/30 text-sky-300", parsed: "border-sky-500/30 text-sky-300",
  accepted: "border-emerald-500/30 text-emerald-300", sent: "border-emerald-500/30 text-emerald-300",
  rejected: "border-rose-500/30 text-rose-300", error: "border-rose-500/30 text-rose-300",
};
const sev: Record<string, string> = { high: "border-rose-500/30 text-rose-300", medium: "border-amber-500/30 text-amber-300", info: "border-sky-500/30 text-sky-300" };

export const Route = createFileRoute("/v25/edi-monitor")({
  head: () => ({ meta: [{ title: "EDI Monitor · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Activity className="size-6 text-emerald-300" />} title="EDI Transaction Monitor" blurb="Live transaction stream with control numbers, partner, direction, status, and resolution notes. Errors surface to the resolution queue with suggested actions.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Recent transactions</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Doc</th><th className="p-2">Partner</th><th className="p-2">Dir</th><th className="p-2">Status</th><th className="p-2">Control</th><th className="p-2">At</th><th className="p-2">Note</th></tr></thead>
          <tbody>
            {EDI_TRANSACTIONS_V25.map((t) => (
              <tr key={t.id} className="border-t border-white/10">
                <td className="p-2 font-mono">{t.doc}</td><td className="p-2">{t.partner}</td>
                <td className="p-2 text-xs uppercase text-muted-foreground">{t.direction}</td>
                <td className="p-2"><Badge variant="outline" className={tone[t.status]}>{t.status}</Badge></td>
                <td className="p-2 font-mono text-xs">{t.control}</td>
                <td className="p-2 text-xs text-muted-foreground">{t.at}</td>
                <td className="p-2 text-xs text-muted-foreground">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2"><AlertTriangle className="size-4 text-amber-300" /><h2 className="text-sm font-semibold">Error resolution queue</h2></div>
        <div className="mt-3 space-y-2">
          {EDI_ERROR_QUEUE.map((e) => (
            <div key={e.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><span className="font-medium">{e.partner}</span> <span className="text-xs text-muted-foreground">· EDI {e.doc} · {e.tx} · field {e.field}</span></div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/15 text-muted-foreground font-mono text-[10px]">{e.code}</Badge>
                  <Badge variant="outline" className={sev[e.severity]}>{e.severity}</Badge>
                </div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{e.detail}</div>
              <div className="mt-1 text-xs"><span className="text-emerald-300">Suggested:</span> {e.suggestion} <span className="ml-2 text-[10px] uppercase tracking-wide text-muted-foreground">owner: {e.owner}</span></div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Error code playbook</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Code</th><th className="p-2">Action</th></tr></thead>
          <tbody>{EDI_ERROR_CODES.map((c) => (<tr key={c.code} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{c.code}</td><td className="p-2 text-xs text-muted-foreground">{c.action}</td></tr>))}</tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
