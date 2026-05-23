import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v15/hooks";

function Page() {
  const r = H.useStrategicPerformanceRoadmap();
  return (
    <V15Page icon={<Map className="size-6 text-cyan-300" />} title="Long-Term Strategic Performance Roadmap" blurb="Horizons, tracks, initiative board, dependencies, decision log, summary.">
      <Section title="Horizons">
        <SimpleTable rows={r.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }, { key: "outcomes", label: "Outcomes" },
        ]} />
      </Section>
      <Section title="Tracks">
        <div className="grid gap-2 md:grid-cols-3">
          {r.tracks.map((t) => <Card key={t} className="border-white/10 bg-white/[0.02] p-2 text-xs">{t}</Card>)}
        </div>
      </Section>
      <Section title="Initiative board">
        <SimpleTable rows={r.initiatives as any} columns={[
          { key: "init", label: "Initiative" }, { key: "track", label: "Track" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (x: any) => <StatusPill status={x.status} /> },
        ]} />
      </Section>
      <Section title="Dependencies">
        <SimpleTable rows={r.dependencies as any} columns={[{ key: "from", label: "From" }, { key: "to", label: "To" }]} />
      </Section>
      <Section title="Decision log">
        <SimpleTable rows={r.decisions as any} columns={[
          { key: "decision", label: "Decision" },
          { key: "status", label: "Status", render: (x: any) => <StatusPill status={x.status} /> },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/roadmap")({
  head: () => ({ meta: [{ title: "LT Roadmap · V15" }] }),
  component: Page,
});
