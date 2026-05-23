import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const gs = H.useGovernedAutomationScale();
  return (
    <V175Page icon={<Gauge className="size-6 text-emerald-300" />} title="Governed Enterprise Automation Scale Center"
      blurb="Governed automation scale score, policy compliance, approval health, evidence coverage, and per-domain coverage matrix. Audit completeness tracked across all surfaces.">
      <ScoreCard label="Governed automation scale" value={gs.score} tone="emerald" />
      <KpiGrid cols={4} items={gs.kpis} />
      <Section title="Health map (per domain)">
        <SimpleTable rows={gs.health_map as any} columns={[{ key: "domain", label: "Domain" }, { key: "health", label: "Health" }]} />
      </Section>
      <Section title="Automation coverage matrix">
        <SimpleTable rows={gs.coverage_matrix as any} columns={[
          { key: "area", label: "Area" }, { key: "coverage", label: "Coverage" },
          { key: "owner", label: "Owner" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Automation scale gaps">
        <SimpleTable rows={gs.gaps as any} columns={[
          { key: "area", label: "Area" }, { key: "gap", label: "Gap" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Executive automation scale action plan">
        <SimpleTable rows={gs.action_plan as any} columns={[
          { key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/command")({ component: Page });
