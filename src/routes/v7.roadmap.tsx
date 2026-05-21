import { createFileRoute } from "@tanstack/react-router";
import { Route as RouteIcon } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalExpansionRoadmap } from "@/v7/hooks";

export const Route = createFileRoute("/v7/roadmap")({
  head: () => ({ meta: [{ title: "Expansion Roadmap · V7 · Anderoute" }] }),
  component: () => {
    const { horizons, plans } = useGlobalExpansionRoadmap();
    return (
      <V7Page icon={<RouteIcon className="size-6 text-indigo-300" />} title="Long-Term Global Expansion Roadmap"
        blurb="6 horizons (current quarter → 36 months). Tracks country readiness, regional partner/carrier networks, localization, compliance, billing, residency, support, marketplace activation, enterprise rollout.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Horizon plan</h3>
          <div className="mt-2">
            <SimpleTable rows={horizons as any} columns={[
              { key: "horizon", label: "Horizon" },
              { key: "focus",   label: "Focus" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Country launch plans</h3>
          <div className="mt-2">
            <SimpleTable rows={plans as any} columns={[
              { key: "country",        label: "Country" },
              { key: "phase",          label: "Phase" },
              { key: "next_milestone", label: "Next milestone" },
              { key: "owner",          label: "Owner" },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
