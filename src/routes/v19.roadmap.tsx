import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const r = H.useEnterpriseAssuranceRoadmap();
  return (
    <V19Page icon={<Map className="size-6 text-violet-300" />}
      title="Long-Term Enterprise Assurance Roadmap"
      blurb="6 horizons across 17 tracks. Initiatives, dependencies, decision log, summary.">
      <Section title="Horizons">
        <SimpleTable rows={r.horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <Section title="Tracks">
        <ul className="text-sm text-muted-foreground">{r.tracks.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Initiative board">
        <SimpleTable rows={r.initiatives as any} columns={[
          { key: "id", label: "ID" }, { key: "track", label: "Track" }, { key: "name", label: "Initiative" },
          { key: "owner", label: "Owner" }, { key: "horizon", label: "Horizon" },
        ]} />
      </Section>
      <Section title="Dependency map">
        <SimpleTable rows={r.dependencies as any} columns={[
          { key: "from", label: "From" }, { key: "to", label: "To" }, { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="Decision log">
        <SimpleTable rows={r.decisions_log as any} columns={[
          { key: "id", label: "ID" }, { key: "date", label: "Date" }, { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{r.summary}</p>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/roadmap")({ component: Page });
