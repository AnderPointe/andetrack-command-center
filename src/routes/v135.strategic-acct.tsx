import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135StrategicAccts();
  return (
    <V135Page icon={<Users className="size-6 text-fuchsia-300" />} title="Strategic Account Durability" blurb="Per-account durability score with value plan posture.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "account", label: "Account" }, { key: "value_plan", label: "Value plan" }, { key: "durability", label: "Durability" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/strategic-acct")({
  head: () => ({ meta: [{ title: "Strategic Acct Durability · V13.5" }] }),
  component: Page,
});
