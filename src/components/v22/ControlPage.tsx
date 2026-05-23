import { ReactNode } from "react";
import { V22Page } from "./V22Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "./ui-bits";

export function ControlPage({ icon, title, blurb, data, scoreLabel = "Trust lifecycle score" }: {
  icon: ReactNode; title: string; blurb: string; data: any; scoreLabel?: string;
}) {
  return (
    <V22Page icon={icon} title={title} blurb={blurb}>
      <ScoreCard label={scoreLabel} value={data.score} tone="emerald" />
      {data.kpis && <KpiGrid cols={4} items={data.kpis} />}
      {data.matrix && (
        <Section title="Lifecycle matrix">
          <SimpleTable rows={data.matrix as any} columns={[
            { key: "control", label: "Surface" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
          ]} />
        </Section>
      )}
      {data.exceptions?.length ? (
        <Section title="Lifecycle exceptions">
          <SimpleTable rows={data.exceptions as any} columns={[
            { key: "id", label: "ID" }, { key: "control", label: "Area" }, { key: "desc", label: "Description" },
            { key: "owner", label: "Owner" }, { key: "risk", label: "Risk" }, { key: "sla", label: "SLA" },
          ]} />
        </Section>
      ) : null}
      {data.remediation?.length ? (
        <Section title="Remediation">
          <SimpleTable rows={data.remediation as any} columns={[
            { key: "id", label: "ID" }, { key: "action", label: "Action" },
            { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
          ]} />
        </Section>
      ) : null}
    </V22Page>
  );
}
