import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V205Page } from "@/components/v205/V205Page";
import { Section, SimpleTable } from "@/components/v205/ui-bits";
import * as H from "@/v205/hooks";

function Page() {
  const r = H.useTrustScaleRoadmap();
  return (
    <V205Page icon={<Map className="size-6 text-teal-300" />} title="Long-Term Trust Scale Roadmap"
      blurb="Horizons Q → Q+5 (36mo) across 17 trust scale tracks; decisions and dependencies logged.">
      <Section title="Horizons">
        <SimpleTable rows={r.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "theme", label: "Theme" }, { key: "target", label: "Target" },
        ]} />
      </Section>
      <Section title="Tracks">
        <SimpleTable rows={r.tracks as any} columns={[{ key: "track", label: "Track" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Decisions log">
        <SimpleTable rows={r.decisions as any} columns={[
          { key: "id", label: "ID" }, { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "horizon", label: "Horizon" },
        ]} />
      </Section>
    </V205Page>
  );
}
export const Route = createFileRoute("/v205/roadmap")({ component: Page });
