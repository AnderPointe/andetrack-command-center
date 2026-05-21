import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { PORTAL_INSIGHTS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/portal-insights")({
  head: () => ({ meta: [{ title: "Portal Insights · Anderoute" }] }),
  component: () => {
    const p = PORTAL_INSIGHTS;
    const stats: [string, string | number][] = [
      ["Active shipments", p.shipmentsActive], ["Completed (30d)", p.shipmentsCompleted30d],
      ["On-time %", `${p.onTime}%`], ["Avg delivery window", p.avgDeliveryWindow],
      ["Messages (30d)", p.messages30d], ["PODs available", p.podAvailable], ["Support tickets", p.supportTickets],
    ];
    return (
      <V25Page icon={<Eye className="size-6 text-emerald-300" />} title="Customer Portal Insights V2.5" blurb="Shipment timeline, ETA confidence, delivery window status, POD history, message center, and support history — branded per customer.">
        <div className="grid gap-3 md:grid-cols-4">
          {stats.map(([label, v]) => (
            <Card key={label} className="border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
              <div className="mt-1 text-2xl font-semibold">{v}</div>
            </Card>
          ))}
        </div>
      </V25Page>
    );
  },
});
