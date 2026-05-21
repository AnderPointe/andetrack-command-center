import { createFileRoute } from "@tanstack/react-router";
import { Users2 } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EDI_PARTNERS, EDI_TRANSPORTS } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = {
  Active: "border-emerald-500/30 text-emerald-300",
  Testing: "border-sky-500/30 text-sky-300",
  Draft: "border-white/15 text-muted-foreground",
  Error: "border-rose-500/30 text-rose-300",
  Suspended: "border-amber-500/30 text-amber-300",
  Disabled: "border-white/15 text-muted-foreground",
};

export const Route = createFileRoute("/v25/edi-partners")({
  head: () => ({ meta: [{ title: "EDI Trading Partners · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Users2 className="size-6 text-emerald-300" />} title="EDI Trading Partner Manager" blurb="Manage trading partners across SFTP, AS2, API bridge, and manual upload. Test mode → production activation gated by checklist.">
      <Card className="border-white/10 bg-white/[0.02] p-3 text-sm">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Supported transports</div>
        <div className="mt-1 flex flex-wrap gap-2">{EDI_TRANSPORTS.map((t) => <Badge key={t} variant="outline" className="border-white/15 text-muted-foreground">{t}</Badge>)}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="p-2">Partner</th><th className="p-2">ID</th><th className="p-2">Standard</th><th className="p-2">Transport</th><th className="p-2">Status</th><th className="p-2">Test/Prod</th><th className="p-2">Tx 30d</th><th className="p-2">Errors</th></tr>
            </thead>
            <tbody>
              {EDI_PARTNERS.map((p) => (
                <tr key={p.id} className="border-t border-white/10">
                  <td className="p-2 font-medium">{p.name}</td>
                  <td className="p-2 font-mono text-xs">{p.qualifier}/{p.partnerId}</td>
                  <td className="p-2 text-xs">{p.standard}</td>
                  <td className="p-2 text-xs">{p.transport}</td>
                  <td className="p-2"><Badge variant="outline" className={tone[p.status]}>{p.status}</Badge></td>
                  <td className="p-2 text-xs text-muted-foreground">{p.testMode ? "test" : "—"} {p.productionEnabled ? "/ prod" : ""}</td>
                  <td className="p-2 font-mono text-xs">{p.tx30d}</td>
                  <td className="p-2 font-mono text-xs">{p.errors30d > 0 ? <span className="text-rose-300">{p.errors30d}</span> : p.errors30d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </V25Page>
  ),
});
