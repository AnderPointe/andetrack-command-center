import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { PARTNER_HEALTH } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/partner-ecosystem")({
  head: () => ({ meta: [{ title: "Partner Ecosystem · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Network className="size-6 text-fuchsia-300" />} title="Partner Ecosystem Execution"
      blurb="Partner health, revenue contribution, joint customers, and partner risks.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner health command center</h3>
        <div className="mt-2">
          <SimpleTable rows={PARTNER_HEALTH} columns={[
            { key: "partner",         label: "Partner" },
            { key: "health",          label: "Health" },
            { key: "revenue",         label: "Revenue" },
            { key: "joint_customers", label: "Joint customers" },
            { key: "risks",           label: "Risks" },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
