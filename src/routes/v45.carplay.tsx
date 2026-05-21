import { createFileRoute } from "@tanstack/react-router";
import { Apple } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { CARPLAY_EXEC } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/carplay")({
  head: () => ({ meta: [{ title: "CarPlay · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Apple className="size-6 text-violet-300" />} title="CarPlay Execution Maturity"
      blurb="Entitlement, navigation templates, driver-safe controls, Siri placeholder, safety review, and submission. Entitlement is pending Apple — no approval claimed.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Readiness" value={CARPLAY_EXEC.readiness} tone="rose" />
        <ScoreCard label="Entitlement" value={10} tone="rose" />
        <ScoreCard label="Safety gates" value={30} tone="amber" />
      </div>
      <SimpleTable rows={CARPLAY_EXEC.items} columns={[
        { key: "item", label: "Item" },
        { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
      ]} />
    </V45Page>
  ),
});
