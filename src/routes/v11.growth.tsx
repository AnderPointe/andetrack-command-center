import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { GROWTH_METRICS } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/growth")({
  head: () => ({ meta: [{ title: "V1.1 Production Growth · Anderoute" }] }),
  component: Page,
});

function Page() {
  const g = GROWTH_METRICS;
  return (
    <V11Page
      icon={<LineChart className="size-6 text-fuchsia-300" />}
      title="Production Growth Dashboard"
      blurb="Track real adoption: companies, drivers, dispatchers, customer users, loads, portal usage, trial conversions, and churn risk."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Active companies" value={g.activeCompanies} tone="info" />
        <StatTile label="Active drivers" value={g.activeDrivers} tone="info" />
        <StatTile label="Active dispatchers" value={g.activeDispatchers} tone="info" />
        <StatTile label="Customer users" value={g.activeCustomerUsers} tone="info" />
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Loads created (30d)" value={g.loadsCreated30d} tone="good" />
        <StatTile label="Loads completed (30d)" value={g.loadsCompleted30d} tone="good" hint={`${Math.round(g.loadsCompleted30d / g.loadsCreated30d * 100)}% completion`} />
        <StatTile label="Portal sessions (30d)" value={g.portalSessions30d} tone="info" />
        <StatTile label="Support tickets (30d)" value={g.supportTickets30d} tone={g.supportTickets30d > 40 ? "warn" : "good"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Commercial signals</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <StatTile label="Trials active" value={g.trialActive} tone="info" />
          <StatTile label="Trials converted" value={g.trialsConverted} tone="good" />
          <StatTile label="Expansion opportunities" value={g.expansionOpportunities} tone="good" hint={`${g.churnRiskAccounts} at churn risk`} />
        </div>
      </Card>
    </V11Page>
  );
}
