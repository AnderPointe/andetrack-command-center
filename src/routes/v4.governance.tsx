import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GOVERNANCE_CAMPAIGNS, GOVERNANCE_KPIS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/governance")({
  head: () => ({ meta: [{ title: "Governance · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Scale className="size-6 text-sky-300" />} title="Advanced Governance Controls"
      blurb="Role, permission, API key, EDI partner, integration, support access, retention, customer portal and AI action review campaigns.">
      <div className="grid gap-3 md:grid-cols-6">
        {Object.entries(GOVERNANCE_KPIS).map(([k,v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
            <div className="mt-1 text-lg font-semibold">{typeof v === "number" ? v.toLocaleString() : v}</div>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Active campaigns</h3>
        <ul className="mt-2 space-y-1 text-sm">{GOVERNANCE_CAMPAIGNS.map(c => (
          <li key={c.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <div><div className="font-medium">{c.title}</div><div className="text-xs text-muted-foreground">{c.scope} · due {c.due}</div></div>
            <Badge variant="outline" className={c.status === "in_progress" ? "border-sky-400/40 text-sky-300" : "border-white/15"}>{c.status}</Badge>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
