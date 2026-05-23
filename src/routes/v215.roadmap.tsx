import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V215Page } from "@/components/v215/V215Page";
import { Section, SimpleTable } from "@/components/v215/ui-bits";
import * as H from "@/v215/hooks";

function Page() {
  const r = H.useTrustNetworkScaleRoadmap();
  const teaser = H.useV215Phase57Teaser();
  return (
    <V215Page icon={<Map className="size-6 text-emerald-300" />} title="Long-Term Trust Network Scale Roadmap"
      blurb="Six horizons (current Q → 36 months) across 17 trust network scale tracks. All high-impact remains HITL.">
      <Section title="Horizons">
        <SimpleTable rows={r.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">Phase 57 teaser — <b>{teaser.version}</b>: {teaser.themes.join(" · ")}</p>
    </V215Page>
  );
}
export const Route = createFileRoute("/v215/roadmap")({ component: Page });
