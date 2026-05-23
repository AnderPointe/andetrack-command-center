import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135Roadmap();
  const lt = H.useV135LongTermRoadmap();
  return (
    <V135Page icon={<Map className="size-6 text-fuchsia-300" />} title="Long-Term Enterprise Value Roadmap" blurb="8-horizon enterprise value roadmap (themed) + durability roadmap.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Enterprise value horizons</h3>
        <SimpleTable rows={lt as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "theme", label: "Theme" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Durability roadmap</h3>
        <SimpleTable rows={rows as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "theme", label: "Theme" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/roadmap")({
  head: () => ({ meta: [{ title: "Durability Roadmap · V13.5" }] }),
  component: Page,
});
