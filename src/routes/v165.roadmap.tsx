import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable, StatusPill } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const r = H.usePredictiveGovernanceRoadmap();
  return (
    <V165Page icon={<Map className="size-6 text-emerald-300" />} title="Long-Term Predictive Governance Roadmap"
      blurb="Horizons from current quarter to 36 months. Autonomous dispatch remains explicitly held.">
      <Section title="Roadmap horizons">
        <SimpleTable rows={r as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "theme", label: "Theme" },
          { key: "status", label: "Status", render: (x: any) => <StatusPill status={x.status === "live" ? "healthy" : x.status === "blocked" ? "blocked" : "watchlist"} /> },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/roadmap")({ component: Page });
