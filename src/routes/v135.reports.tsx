import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135Reports();
  return (
    <V135Page icon={<ShieldCheck className="size-6 text-fuchsia-300" />} title="V13.5 Reports" blurb="Board-grade durability and capital reports with owner and cadence.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "report", label: "Report" }, { key: "owner", label: "Owner" }, { key: "cadence", label: "Cadence" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/reports")({
  head: () => ({ meta: [{ title: "Reports · V13.5" }] }),
  component: Page,
});
