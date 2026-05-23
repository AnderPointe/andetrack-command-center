import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const r = H.useAutomationScaleRoadmap();
  return (
    <V175Page icon={<Map className="size-6 text-emerald-300" />} title="Long-Term Automation Scale Roadmap"
      blurb="Six horizons spanning V17.5 stabilization through V18 enterprise predictive operating system.">
      <Section title="Horizons">
        <SimpleTable rows={r.horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Initiatives">
        <SimpleTable rows={r.initiatives as any} columns={[
          { key: "initiative", label: "Initiative" }, { key: "track", label: "Track" }, { key: "horizon", label: "Horizon" },
        ]} />
      </Section>
      <Section title="Dependency map">
        <SimpleTable rows={r.dependencies as any} columns={[{ key: "from", label: "From" }, { key: "to", label: "To" }, { key: "type", label: "Type" }]} />
      </Section>
      <Section title="Decision log">
        <SimpleTable rows={r.decision_log as any} columns={[{ key: "id", label: "ID" }, { key: "decision", label: "Decision" }, { key: "approver", label: "Approver" }, { key: "ts", label: "When" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/roadmap")({ component: Page });
