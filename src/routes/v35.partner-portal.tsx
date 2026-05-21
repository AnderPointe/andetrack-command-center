import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTNER_TYPES, PARTNERS, PARTNER_PORTAL_MODULES } from "@/v35/data/mockPhase20";

const STATUS_COLOR: Record<string, string> = {
  live: "border-emerald-500/40 text-emerald-300",
  beta: "border-sky-500/40 text-sky-300",
  placeholder: "border-amber-500/40 text-amber-300",
};

export const Route = createFileRoute("/v35/partner-portal")({
  head: () => ({ meta: [{ title: "Partner Portal · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Building2 className="size-6 text-amber-300" />} title="Partner Portal Foundation"
      blurb="Multi-type partner workspace: overview, opportunities, integration, co-marketing, support, billing placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Portal modules</h3>
        <div className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">{PARTNER_PORTAL_MODULES.map((m) => (
          <div key={m.module} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
            <span>{m.module}</span>
            <Badge variant="outline" className={STATUS_COLOR[m.status]}>{m.status}</Badge>
          </div>
        ))}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner types</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">{PARTNER_TYPES.map((t) => (
          <Badge key={t} variant="outline" className="border-white/15 text-xs text-muted-foreground">{t}</Badge>
        ))}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Active partners</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Partner</th><th className="p-1">Type</th><th className="p-1">Status</th><th className="p-1">Revenue</th><th className="p-1">Launch</th></tr></thead>
          <tbody>{PARTNERS.map((p) => (
            <tr key={p.id} className="border-t border-white/10"><td className="p-1">{p.name}</td><td className="p-1 text-xs text-muted-foreground">{p.type}</td><td className="p-1"><Badge variant="outline" className="border-sky-500/40 text-sky-300">{p.status}</Badge></td><td className="p-1 font-mono">${p.revenue}</td><td className="p-1 text-xs">{p.launch}</td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
