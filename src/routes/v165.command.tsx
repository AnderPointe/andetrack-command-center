import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const pg = H.usePredictiveGovernance();
  return (
    <V165Page icon={<Gauge className="size-6 text-emerald-300" />} title="Enterprise Predictive Governance Command Center"
      blurb="Predictive governance score, signal quality, risk coverage, approval orchestration, evidence automation, board packet, and per-domain health.">
      <ScoreCard label="Predictive governance score" value={pg.score} tone="emerald" />
      <KpiGrid cols={4} items={pg.kpis} />
      <Section title="Health map (per domain)">
        <SimpleTable rows={pg.health_map as any} columns={[
          { key: "domain", label: "Domain" }, { key: "health", label: "Health %" },
        ]} />
      </Section>
      <Section title="Governance exceptions">
        <SimpleTable rows={pg.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Action plan (executive summary)">
        <SimpleTable rows={pg.action_plan as any} columns={[
          { key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/command")({ component: Page });
