import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useCountryRegionReadiness } from "@/v7/hooks";

export const Route = createFileRoute("/v7/country-matrix")({
  head: () => ({ meta: [{ title: "Country/Region Matrix · V7 · Anderoute" }] }),
  component: () => {
    const { countries } = useCountryRegionReadiness();
    return (
      <V7Page icon={<Map className="size-6 text-indigo-300" />} title="Country + Region Readiness Matrix"
        blurb="Per-country priority, demand, network, localization, billing, residency, privacy, compliance, support, legal review, risk, and launch recommendation.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={countries as any} columns={[
            { key: "country",      label: "Country" },
            { key: "priority",     label: "Tier" },
            { key: "demand",       label: "Demand" },
            { key: "carriers",     label: "Carriers" },
            { key: "partners",     label: "Partners" },
            { key: "localization", label: "Loc." },
            { key: "billing",      label: "Billing" },
            { key: "residency",    label: "Resid." },
            { key: "privacy",      label: "Priv." },
            { key: "compliance",   label: "Comp." },
            { key: "support",      label: "Sup." },
            { key: "legal",        label: "Legal",  render: (r: any) => <StatusPill status={r.legal} /> },
            { key: "risk",         label: "Risk",   render: (r: any) => <StatusPill status={r.risk} /> },
            { key: "recommendation", label: "Rec." },
          ]} />
        </Card>
      </V7Page>
    );
  },
});
