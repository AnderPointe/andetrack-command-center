import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalExpansionReadiness, useGlobalReadinessChecklist } from "@/v65/hooks";

export const Route = createFileRoute("/v65/global")({
  head: () => ({ meta: [{ title: "Global Expansion Readiness · V6.5 · Anderoute" }] }),
  component: () => {
    const { countries } = useGlobalExpansionReadiness();
    const { items } = useGlobalReadinessChecklist();
    const avg = Math.round(countries.reduce((s, c) => s + c.score, 0) / countries.length);
    return (
      <V65Page icon={<Globe className="size-6 text-cyan-300" />} title="Global Expansion Readiness"
        blurb="US-first. Canada / Mexico evaluation. UK / EU / Australia research. International compliance is NOT asserted complete.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Global readiness avg" value={avg} tone="sky" />
          <ScoreCard label="Primary market"       value={96} tone="emerald" />
          <ScoreCard label="High-risk regions"
            value={Math.round(countries.filter(c => c.risk === "high").length / countries.length * 100)} tone="rose" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Country readiness matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={countries} columns={[
              { key: "country", label: "Country" },
              { key: "score",   label: "Score" },
              { key: "status",  label: "Status", render: (r) => <StatusPill status={r.status} /> },
              { key: "risk",    label: "Risk",   render: (r) => <StatusPill status={r.risk} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Country expansion checklist</h3>
          <div className="mt-2">
            <SimpleTable rows={items} columns={[
              { key: "country", label: "Country" },
              { key: "item",    label: "Item" },
              { key: "owner",   label: "Owner" },
              { key: "status",  label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
