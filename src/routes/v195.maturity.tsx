import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const a = H.useEnterpriseAssuranceMaturity();
  const nbh = H.useV195NextBestHitl();
  const heat = H.useV195OwnerHeatmap();
  return (
    <V195Page icon={<Gauge className="size-6 text-violet-300" />}
      title="Enterprise Assurance Maturity Command Center"
      blurb="One pane for maturity: scores, KPIs, health map, gaps, next-best HITL queue, owner heatmap, optimization command, executive summary.">
      <ScoreCard label="Enterprise assurance maturity" value={a.score} tone="violet" />
      <KpiGrid cols={4} items={a.kpis} />
      <Section title="Assurance maturity health map">
        <SimpleTable rows={a.health_map as any} columns={[{ key: "domain", label: "Domain" }, { key: "health", label: "Health" }]} />
      </Section>
      <Section title="Next-best HITL queue (polish)">
        <SimpleTable rows={nbh as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "action", label: "Action" },
          { key: "risk", label: "Risk" }, { key: "due", label: "Due" }, { key: "owners", label: "Owners" },
        ]} />
      </Section>
      <Section title="Owner heatmap (polish)">
        <SimpleTable rows={heat as any} columns={[
          { key: "owner", label: "Owner" }, { key: "load", label: "Load" },
          { key: "open", label: "Open" }, { key: "due7d", label: "Due ≤7d" }, { key: "breached", label: "Breached" },
        ]} />
      </Section>
      <Section title="Maturity gaps · exceptions">
        <SimpleTable rows={a.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Assurance optimization command">
        <SimpleTable rows={a.remediation as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={a.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
      <Section title="Executive assurance maturity summary">
        <ul className="text-sm text-muted-foreground">{a.exec_summary.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/maturity")({ component: Page });
