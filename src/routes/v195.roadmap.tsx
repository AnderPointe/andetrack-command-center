import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const r = H.useAssuranceMaturityRoadmap();
  const teaser = H.useV195Phase53Teaser();
  return (
    <V195Page icon={<Map className="size-6 text-violet-300" />}
      title="Long-Term Assurance Maturity Roadmap"
      blurb="6 horizons · 18 tracks · initiatives · dependencies · decision log. Phase 53 teased only.">
      <Section title="Horizons">
        <SimpleTable rows={r.horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <Section title="Initiatives">
        <SimpleTable rows={r.initiatives as any} columns={[
          { key: "initiative", label: "Initiative" }, { key: "owner", label: "Owner" }, { key: "horizon", label: "Horizon" },
        ]} />
      </Section>
      <Section title="Dependency map">
        <SimpleTable rows={r.dependencies as any} columns={[{ key: "from", label: "From" }, { key: "to", label: "To" }]} />
      </Section>
      <Section title="Decision log">
        <SimpleTable rows={r.decision_log as any} columns={[
          { key: "id", label: "ID" }, { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/roadmap")({ component: Page });
