import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V22Page } from "@/components/v22/V22Page";
import { Section, SimpleTable } from "@/components/v22/ui-bits";
import * as H from "@/v22/hooks";
function Page() {
  const r = H.useTrustLifecycleRoadmap();
  const teaser = H.useV22Phase58Teaser();
  return (
    <V22Page icon={<Map className="size-6 text-emerald-300" />} title="Long-Term Trust Lifecycle Operating Roadmap" blurb="Six horizons across all lifecycle tracks. High-impact remains HITL.">
      <Section title="Horizons">
        <SimpleTable rows={r.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">Phase 58 teaser — <b>{teaser.version}</b>: {teaser.themes.join(" · ")}</p>
    </V22Page>
  );
}
export const Route = createFileRoute("/v22/roadmap")({ component: Page });
