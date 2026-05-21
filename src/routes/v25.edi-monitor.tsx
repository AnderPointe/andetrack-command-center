import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EDI_TRANSACTIONS_V25 } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = {
  received: "border-sky-500/30 text-sky-300", parsed: "border-sky-500/30 text-sky-300",
  accepted: "border-emerald-500/30 text-emerald-300", sent: "border-emerald-500/30 text-emerald-300",
  rejected: "border-rose-500/30 text-rose-300", error: "border-rose-500/30 text-rose-300",
};

export const Route = createFileRoute("/v25/edi-monitor")({
  head: () => ({ meta: [{ title: "EDI Monitor · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Activity className="size-6 text-emerald-300" />} title="EDI Transaction Monitor" blurb="Live transaction stream with control numbers, partner, direction, status, and resolution notes. Errors surface to the resolution queue.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
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
    </V25Page>
  ),
});
