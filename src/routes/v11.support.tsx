import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_TICKETS, KNOWN_ISSUES } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/support")({
  head: () => ({ meta: [{ title: "V1.1 Support · Anderoute" }] }),
  component: Page,
});

const pTone: Record<string, string> = {
  P1: "border-rose-500/30 text-rose-300",
  P2: "border-amber-500/30 text-amber-300",
  P3: "border-sky-500/30 text-sky-300",
};

function Page() {
  const open = SUPPORT_TICKETS.filter((t) => t.status === "open").length;
  const p1 = SUPPORT_TICKETS.filter((t) => t.priority === "P1" && t.status === "open").length;
  return (
    <V11Page
      icon={<LifeBuoy className="size-6 text-fuchsia-300" />}
      title="Support V1.1"
      blurb="Ticket categories, priority SLAs, known issues, internal notes, resolution notes. One place for support to triage."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Open tickets" value={open} tone={open > 5 ? "warn" : "good"} />
        <StatTile label="P1 open" value={p1} tone={p1 ? "bad" : "good"} />
        <StatTile label="Known issues" value={KNOWN_ISSUES.length} tone="info" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Tickets</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-2">ID</th><th className="p-2">Category</th><th className="p-2">Priority</th><th className="p-2">SLA</th><th className="p-2">Status</th><th className="p-2">Note</th></tr>
          </thead>
          <tbody>
            {SUPPORT_TICKETS.map((t) => (
              <tr key={t.id} className="border-t border-white/10">
                <td className="p-2 font-mono text-xs">{t.id}</td>
                <td className="p-2">{t.category}</td>
                <td className="p-2"><Badge variant="outline" className={pTone[t.priority]}>{t.priority}</Badge></td>
                <td className="p-2 text-xs text-muted-foreground">{t.sla}</td>
                <td className="p-2"><Badge variant="outline" className={t.status === "open" ? "border-amber-500/30 text-amber-300" : "border-emerald-500/30 text-emerald-300"}>{t.status}</Badge></td>
                <td className="p-2 text-xs text-muted-foreground">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Known issues</h2>
        <div className="mt-3 space-y-2 text-sm">
          {KNOWN_ISSUES.map((k) => (
            <div key={k.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div>{k.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">Workaround: {k.workaround}</div>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
