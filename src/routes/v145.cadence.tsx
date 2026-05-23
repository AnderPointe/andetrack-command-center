import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const c = H.useEnterpriseOperatingCadence();
  const avg = Math.round(c.reduce((s,x)=>s+x.health,0)/c.length);
  return (
    <V145Page icon={<CalendarClock className="size-6 text-fuchsia-300" />} title="Enterprise Operating Review Cadence" blurb="Weekly, monthly and quarterly operating reviews with owners and cadence health.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Cadences" value={c.length} tone="violet" />
        <ScoreCard label="Avg health" value={`${avg}%`} tone="emerald" />
        <ScoreCard label="Owners" value={new Set(c.map(x => x.owner)).size} tone="amber" />
      </div>
      <Section title="OperatingReviewCalendar">
        <SimpleTable rows={c as any} columns={[
          { key: "cadence", label: "Cadence" }, { key: "owner", label: "Owner" },
          { key: "last", label: "Last" }, { key: "next", label: "Next" }, { key: "health", label: "Health %" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/cadence")({ head: () => ({ meta: [{ title: "Operating Cadence · V14.5" }] }), component: Page });
