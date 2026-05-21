import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalSupportOperatingModel } from "@/v7/hooks";

export const Route = createFileRoute("/v7/support-model")({
  head: () => ({ meta: [{ title: "Global Support · V7 · Anderoute" }] }),
  component: () => {
    const { regions } = useGlobalSupportOperatingModel();
    return (
      <V7Page icon={<LifeBuoy className="size-6 text-indigo-300" />} title="Global Support Operating Model"
        blurb="Region coverage, timezone, languages, support tiers, escalation routing, regional burden. EU and Mexico coverage are gap areas.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={regions as any} columns={[
            { key: "region",     label: "Region" },
            { key: "coverage",   label: "Coverage" },
            { key: "languages",  label: "Languages" },
            { key: "tiers",      label: "Tiers" },
            { key: "escalation", label: "Escalation" },
            { key: "burden",     label: "Burden" },
          ]} />
        </Card>
      </V7Page>
    );
  },
});
