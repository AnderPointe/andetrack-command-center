import { createFileRoute } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useCountryOperatingCommand } from "@/v8/hooks";

export const Route = createFileRoute("/v8/country-command")({
  head: () => ({ meta: [{ title: "Country Operating Command · Anderoute" }] }),
  component: () => {
    const { countries } = useCountryOperatingCommand();
    return (
      <V8Page icon={<Flag className="size-6 text-violet-300" />} title="Country Operating Command Centers"
        blurb="Per-country health, marketplace, compliance, financial controls, partner & customer success, plus executive decisions needed.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={countries as any} columns={[
            { key: "country", label: "Country" },
            { key: "phase",   label: "Phase" },
            { key: "health",  label: "Health" },
            { key: "marketplace", label: "MP" },
            { key: "compliance",  label: "Comp" },
            { key: "financial",   label: "Fin" },
            { key: "residency_risk", label: "Residency" },
            { key: "partner",  label: "Partner" },
            { key: "billing",  label: "Billing" },
            { key: "success",  label: "CS" },
            { key: "blockers", label: "Blockers" },
            { key: "decisions", label: "Decisions" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
