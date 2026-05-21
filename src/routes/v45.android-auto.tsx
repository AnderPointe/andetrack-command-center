import { createFileRoute } from "@tanstack/react-router";
import { Car } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { ANDROID_AUTO_EXEC } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/android-auto")({
  head: () => ({ meta: [{ title: "Android Auto · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Car className="size-6 text-violet-300" />} title="Android Auto Execution Maturity"
      blurb="Templates, driver-safe actions, voice-first commands, safety review, and submission tracking. Submission status is placeholder — no review approval claimed.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Readiness" value={ANDROID_AUTO_EXEC.readiness} tone="amber" />
        <ScoreCard label="Safety gates" value={50} tone="amber" />
        <ScoreCard label="Submission" value={20} tone="rose" />
      </div>
      <SimpleTable rows={ANDROID_AUTO_EXEC.items} columns={[
        { key: "item", label: "Item" },
        { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
      ]} />
    </V45Page>
  ),
});
