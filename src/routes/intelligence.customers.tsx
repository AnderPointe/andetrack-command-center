import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useCustomerImpact } from "@/intelligence/hooks/useIntelligence";

export const Route = createFileRoute("/intelligence/customers")({
  head: () => ({ meta: [{ title: "Customer Impact — Anderoute Intelligence" }] }),
  component: CustomersPage,
});

const PRIO_TONE: Record<string, string> = {
  vip: "border-violet-500/40 text-violet-200",
  high: "border-amber-500/40 text-amber-200",
  standard: "border-white/15 text-muted-foreground",
};

function CustomersPage() {
  const { customers } = useCustomerImpact();
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-amber-300" />
            <h1 className="text-xl font-semibold">Customer Impact Intelligence</h1>
          </div>
          <IntelligenceNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((c) => (
            <Card key={c.customer_id} className="border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{c.customer_name}</h3>
                <Badge variant="outline" className={PRIO_TONE[c.priority]}>{c.priority}</Badge>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>Delayed: <span className="text-foreground">{c.delayed_shipments}</span></div>
                <div>At risk: <span className="text-foreground">{c.at_risk_deliveries}</span></div>
                <div>Messages: <span className="text-foreground">{c.recent_messages}</span></div>
                <div>Satisfaction*: <span className="text-foreground">{c.satisfaction_placeholder}</span></div>
              </div>
              <div className="mt-3 text-xs">
                Revenue impact*: <span className="text-foreground">${c.revenue_impact_placeholder.toLocaleString()}</span>
              </div>
              <div className="mt-3 rounded border border-white/10 bg-black/20 p-2 text-xs">
                <div className="text-[10px] uppercase text-muted-foreground">Recommended message (draft)</div>
                <div className="mt-1">{c.recommended_message}</div>
              </div>
              {c.needs_proactive_update && (
                <Badge variant="outline" className="mt-3 border-amber-500/40 text-amber-200">Proactive update suggested</Badge>
              )}
            </Card>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">* satisfaction & revenue impact are placeholder metrics; require real data to compute.</p>
      </div>
    </AppShell>
  );
}
