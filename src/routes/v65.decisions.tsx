import { createFileRoute } from "@tanstack/react-router";
import { Vote } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useExecutiveDecisionSystem } from "@/v65/hooks";

export const Route = createFileRoute("/v65/decisions")({
  head: () => ({ meta: [{ title: "Executive Decisions · V6.5 · Anderoute" }] }),
  component: () => {
    const { requests } = useExecutiveDecisionSystem();
    return (
      <V65Page icon={<Vote className="size-6 text-cyan-300" />} title="Executive Decision System"
        blurb="Decision requests with options, risks, financial impact placeholder, customer / operational impact, approval, decision record, follow-up actions.">
        <div className="grid gap-3 md:grid-cols-2">
          {requests.map(r => (
            <Card key={r.id} className="border-white/10 bg-white/[0.02] p-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{r.id}</div>
                  <h3 className="text-base font-semibold">{r.title}</h3>
                </div>
                <StatusPill status={r.status} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Owner: <span className="text-foreground">{r.owner}</span></div>
              <div className="mt-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Options</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {r.options.map(o => <Badge key={o} variant="outline">{o}</Badge>)}
                </div>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-3 text-xs">
                <div><div className="text-muted-foreground">Risks</div>{r.risks.map(x => <div key={x}>· {x}</div>)}</div>
                <div><div className="text-muted-foreground">Financial (pl)</div><div>{r.financial_impact_pl}</div></div>
                <div><div className="text-muted-foreground">Operational</div><div>{r.operational_impact}</div></div>
              </div>
              <div className="mt-2 text-xs"><span className="text-muted-foreground">Customer:</span> {r.customer_impact}</div>
            </Card>
          ))}
        </div>
      </V65Page>
    );
  },
});
