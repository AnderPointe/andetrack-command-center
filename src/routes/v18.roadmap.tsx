import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const r = H.useAssistOperatingRoadmap();
  const teaser = H.useV18Phase50Teaser();
  return (
    <V18Page icon={<Map className="size-6 text-violet-300" />} title="Long-Term Autonomous-Assist Operating Roadmap"
      blurb="Six horizons (now → 36 months) across 18 tracks. All high-impact remains HITL.">
      <Section title="Horizons">
        <SimpleTable rows={r as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/roadmap")({ component: Page });
