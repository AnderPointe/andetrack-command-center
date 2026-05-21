import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CUSTOMER_IMPACT, CUSTOMER_ACTION_QUEUE } from "@/v2/data/mockPhase17";

const uTone: Record<string, string> = {
  good: "border-emerald-500/30 text-emerald-300",
  info: "border-sky-500/30 text-sky-300",
  warn: "border-amber-500/30 text-amber-300",
  bad:  "border-rose-500/30 text-rose-300",
};

export const Route = createFileRoute("/v2/customer-impact")({
  head: () => ({ meta: [{ title: "Customer Impact · Anderoute" }] }),
  component: Page,
});

const pTone: Record<string, string> = {
  A: "border-rose-500/30 text-rose-300",
  B: "border-amber-500/30 text-amber-300",
  C: "border-white/15 text-muted-foreground",
};

function Page() {
  return (
    <V2Page
      icon={<HeartPulse className="size-6 text-violet-300" />}
      title="Customer Impact Intelligence"
      blurb="Which customers are seeing delays, which need a proactive update, and how much revenue is at risk. Account managers act here first."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Customers</h2>
        <div className="mt-3 space-y-2 text-sm">
          {CUSTOMER_IMPACT.slice().sort((a, b) => b.atRisk - a.atRisk || b.revenueAtRisk - a.revenueAtRisk).map((c) => (
            <div key={c.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">Last touch: {c.lastTouch}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={pTone[c.priority]}>priority {c.priority}</Badge>
                  {c.needsUpdate && <Badge variant="outline" className="border-amber-500/30 text-amber-300">needs update</Badge>}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs md:grid-cols-4">
                <div><span className="text-muted-foreground">Active:</span> {c.activeShipments}</div>
                <div><span className="text-muted-foreground">At risk:</span> {c.atRisk}</div>
                <div><span className="text-muted-foreground">Revenue at risk:</span> ${c.revenueAtRisk.toLocaleString()}</div>
                <div className="text-right">
                  {c.needsUpdate && (
                    <Button size="sm" variant="outline" className="h-7 text-xs">Draft update</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V2Page>
  );
}
