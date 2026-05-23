import { ReactNode } from "react";
import { V19Page } from "./V19Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "./ui-bits";

export function ControlPage({ icon, title, blurb, data, scoreLabel = "Assurance score" }: {
  icon: ReactNode; title: string; blurb: string; data: any; scoreLabel?: string;
}) {
  return (
    <V19Page icon={icon} title={title} blurb={blurb}>
      <ScoreCard label={scoreLabel} value={data.score} tone="violet" />
      {data.kpis && <KpiGrid cols={4} items={data.kpis} />}
      {data.matrix && (
        <Section title="Control matrix">
          <SimpleTable rows={data.matrix as any} columns={[
            { key: "control", label: "Control" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
          ]} />
        </Section>
      )}
      {data.exceptions?.length ? (
        <Section title="Exceptions">
          <SimpleTable rows={data.exceptions as any} columns={[
            { key: "id", label: "ID" }, { key: "control", label: "Control" },
            { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
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
    </V19Page>
  );
}
