import { createFileRoute, Link } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EDI_PARTNERS, EDI_DOC_FLOW, EDI_PARTNER_HEALTH, EDI_ERROR_GUIDE } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/edi")({
  head: () => ({ meta: [{ title: "EDI Beta · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V2Page
      icon={<Network className="size-6 text-violet-300" />}
      title="EDI Beta"
      blurb="Beta support for 204 / 990 / 214 / 210 / 997 with trading-partner scoping. Production certification lands in V2.5 (see Phase 18 plan)."
    >
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Beta</Badge>{" "}
        Placeholder mapping. Not yet certified for production EDI with carriers.
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Trading partners</h2>
        <div className="mt-3 space-y-1.5 text-sm">
          {EDI_PARTNERS.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground font-mono">ISA {p.isaQualifier} · {p.isaId}</div>
              </div>
              <Badge variant="outline" className={p.enabled ? "border-emerald-500/30 text-emerald-300" : "border-white/15 text-muted-foreground"}>
                {p.enabled ? "enabled" : "disabled"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Document flow</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="p-2">Doc</th><th className="p-2">Name</th><th className="p-2">From</th><th className="p-2">To</th><th className="p-2">Action</th></tr>
            </thead>
            <tbody>
              {EDI_DOC_FLOW.map((d) => (
                <tr key={d.doc} className="border-t border-white/10">
                  <td className="p-2 font-mono">{d.doc}</td>
                  <td className="p-2">{d.label}</td>
                  <td className="p-2 text-muted-foreground">{d.from}</td>
                  <td className="p-2 text-muted-foreground">{d.to}</td>
                  <td className="p-2 text-xs text-muted-foreground">{d.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          See <Link to="/v2/edi-transactions" className="text-violet-300 hover:underline">live transactions</Link>.
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Partner health (24h)</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="p-2">Partner</th><th className="p-2">In 24h</th><th className="p-2">Errors</th><th className="p-2">Ack %</th><th className="p-2">Last error</th></tr>
            </thead>
            <tbody>
              {EDI_PARTNER_HEALTH.map((p) => (
                <tr key={p.partner} className="border-t border-white/10">
                  <td className="p-2 font-medium">{p.partner}</td>
                  <td className="p-2">{p.in24h}</td>
                  <td className="p-2"><Badge variant="outline" className={p.errors24h ? "border-amber-500/30 text-amber-300" : "border-emerald-500/30 text-emerald-300"}>{p.errors24h}</Badge></td>
                  <td className="p-2 font-mono">{p.ackPct.toFixed(1)}%</td>
                  <td className="p-2 text-xs text-muted-foreground">{p.lastError ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Error guide</h2>
        <div className="mt-3 space-y-1.5 text-sm">
          {EDI_ERROR_GUIDE.map((e) => (
            <div key={e.code} className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
              <div className="flex items-center gap-2 text-xs"><span className="font-mono text-violet-300">{e.code}</span> <span className="font-medium">{e.title}</span></div>
              <div className="mt-1 text-xs text-muted-foreground">{e.fix}</div>
            </div>
          ))}
        </div>
      </Card>
    </V2Page>
  );
}
