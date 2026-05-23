import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135PartnerDurability();
  return (
    <V135Page icon={<Network className="size-6 text-fuchsia-300" />} title="Partner Channel Durability" blurb="Per-partner attribution strength, sourced share, and risk.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "partner", label: "Partner" }, { key: "sourced_pct", label: "Sourced %" },
          { key: "attribution", label: "Attribution" }, { key: "risk", label: "Risk" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/partner")({
  head: () => ({ meta: [{ title: "Partner Durability · V13.5" }] }),
  component: Page,
});
