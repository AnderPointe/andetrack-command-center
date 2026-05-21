import { createFileRoute } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_TIERS, SUPPORT_QUEUE, ESCALATIONS, SUPPORT_TRENDS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/support")({
  head: () => ({ meta: [{ title: "Enterprise Support · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Headphones className="size-6 text-sky-300" />} title="Enterprise Support Operations"
      blurb="Standard, Professional, Priority, Enterprise tiers with SLA tracking, escalation routing, critical incident queue and support analytics.">
      <div className="grid gap-3 md:grid-cols-4">{SUPPORT_TIERS.map(t => (
        <Card key={t.tier} className="border-white/10 bg-white/[0.02] p-3">
          <div className="text-sm font-semibold">{t.tier}</div>
          <div className="mt-1 text-xs text-muted-foreground">First {t.sla_first} · Resolve {t.sla_resolve}</div>
          <div className="mt-1 text-xs text-muted-foreground">{t.coverage}</div>
        </Card>))}
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(SUPPORT_QUEUE).map(([k,v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-3">
            <div className="text-xs uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
            <div className="mt-1 text-xl font-semibold">{v}</div>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Support trends</h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground"><tr>
              {["Week","CSAT","SLA %","Escalations"].map(h => <th key={h} className="px-2 py-1 text-left">{h}</th>)}
            </tr></thead>
            <tbody>{SUPPORT_TRENDS.map(t => (
              <tr key={t.week} className="border-t border-white/10">
                <td className="px-2 py-1 font-medium">{t.week}</td>
                <td className="px-2 py-1">{t.csat}</td>
                <td className="px-2 py-1">{t.sla}%</td>
                <td className="px-2 py-1">{t.escalations}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Escalations</h3>
        <ul className="mt-2 space-y-1 text-sm">{ESCALATIONS.map(e => (
          <li key={e.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{e.customer} · {e.reason}</span>
            <Badge variant="outline" className="border-white/15">{e.tier} → {e.routed}</Badge>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
