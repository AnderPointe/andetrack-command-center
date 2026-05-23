import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const a = H.useEnterpriseAssuranceOperatingSystem();
  const nb = H.useV19NextBestHitl();
  const heat = H.useV19OwnerHeatmap();
  const polish = H.useV19PolishHeadlines();
  return (
    <V19Page icon={<Gauge className="size-6 text-violet-300" />}
      title="Enterprise Assurance Operating System"
      blurb="One pane for enterprise assurance: scores, KPIs, health map, gaps, remediation, executive summary. Polished with next-best HITL queue + owner heatmap.">
      <ScoreCard label="Enterprise assurance" value={a.score} tone="violet" />
      <Section title="V19 polish headline">
        <ul className="text-sm text-muted-foreground">{polish.highlights.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Next-best HITL actions (queue)">
        <SimpleTable rows={nb as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" },
          { key: "owner", label: "Owner" }, { key: "impact", label: "Impact" },
        ]} />
      </Section>
      <Section title="Owner heatmap">
        <SimpleTable rows={heat as any} columns={[
          { key: "owner", label: "Owner" }, { key: "load", label: "Load" },
          { key: "open", label: "Open" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <KpiGrid cols={4} items={a.kpis} />
      <Section title="Assurance health map">
        <SimpleTable rows={a.health_map as any} columns={[{ key: "domain", label: "Domain" }, { key: "health", label: "Health" }]} />
      </Section>
      <Section title="Assurance gaps · exceptions">
        <SimpleTable rows={a.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Remediation command">
        <SimpleTable rows={a.remediation as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={a.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
      <Section title="Executive assurance summary">
        <ul className="text-sm text-muted-foreground">{a.exec_summary.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/os")({ component: Page });
