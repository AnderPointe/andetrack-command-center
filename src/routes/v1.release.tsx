import { createFileRoute } from "@tanstack/react-router";
import { PackageCheck } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { V1_RELEASE_CHECKLIST, v1ReadinessScore } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/release")({
  head: () => ({ meta: [{ title: "V1 Release · Anderoute" }] }),
  component: Page,
});

function Page() {
  const items = V1_RELEASE_CHECKLIST.items;
  const done = items.filter((i) => i.done).length;
  const blockers = items.filter((i) => !i.done).length;
  const pct = Math.round((done / items.length) * 100);
  const readiness = v1ReadinessScore();
  return (
    <V1Page
      icon={<PackageCheck className="size-6 text-indigo-300" />}
      title="V1 Release Checklist"
      blurb="Branch cut, QA, security, migration, release notes, training, support, and customer approval gates."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Checklist complete" value={`${pct}%`} hint={`${done}/${items.length}`} tone={pct >= 90 ? "good" : pct >= 70 ? "warn" : "bad"} />
        <StatTile label="Open items" value={blockers} tone={blockers ? "warn" : "good"} />
        <StatTile label="Composite readiness" value={`${readiness}%`} tone={readiness >= 85 ? "good" : "warn"} />
        <StatTile label="Decision" value={blockers === 0 && readiness >= 85 ? "GO" : "HOLD"} tone={blockers === 0 && readiness >= 85 ? "good" : "warn"} />
      </div>
      <ChecklistCard group={V1_RELEASE_CHECKLIST} hint="All items must be done for V1 GA." />
    </V1Page>
  );
}
