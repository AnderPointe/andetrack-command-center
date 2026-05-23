import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const a = H.useV135ApiEdi();
  return (
    <V135Page icon={<Briefcase className="size-6 text-fuchsia-300" />} title="API/EDI Revenue Durability" blurb="Signal health for metered consumption, EDI acceptance, key churn, and webhook replay.">
      <ScoreCard label="API/EDI durability" value={a.score} tone="amber" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={a.signals as any} columns={[
          { key: "signal", label: "Signal" }, { key: "value", label: "Value" }, { key: "health", label: "Health" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/api-edi")({
  head: () => ({ meta: [{ title: "API/EDI Durability · V13.5" }] }),
  component: Page,
});
