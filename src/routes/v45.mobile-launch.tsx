import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, Check, Circle } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, KpiGrid } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { MOBILE_LAUNCH } from "@/v45/data/mockPhase22";

function Checklist({ title, items, score }: { title: string; items: { item: string; done: boolean }[]; score: number }) {
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="text-2xl font-semibold">{score}%</div>
      </div>
      <ul className="mt-3 space-y-1 text-xs">
        {items.map(i => (
          <li key={i.item} className="flex items-center gap-2">
            {i.done ? <Check className="size-3 text-emerald-400" /> : <Circle className="size-3 text-amber-400" />}
            <span className={i.done ? "" : "text-muted-foreground"}>{i.item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export const Route = createFileRoute("/v45/mobile-launch")({
  head: () => ({ meta: [{ title: "Mobile Launch · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Smartphone className="size-6 text-violet-300" />} title="Mobile Launch Execution Center"
      blurb="iOS + Android launch readiness, store listings, privacy disclosures, rollout, and forced-update policy. Approval claims not made until store decisions land.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="iOS readiness" value={MOBILE_LAUNCH.ios} tone="sky" />
        <ScoreCard label="Android readiness" value={MOBILE_LAUNCH.android} tone="emerald" />
        <ScoreCard label="Rollout" value={MOBILE_LAUNCH.rollout_pct} tone="violet" />
        <ScoreCard label="Crash-free (placeholder)" value={Math.round(MOBILE_LAUNCH.crash_free_sessions)} tone="emerald" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Forced update policy", value: "Defined" },
        { label: "TestFlight", value: "Live" },
        { label: "Internal testing", value: "Live" },
        { label: "Production rollout", value: `${MOBILE_LAUNCH.rollout_pct}%` },
      ]} />
      <div className="grid gap-3 md:grid-cols-2">
        <Checklist title="iOS checklist" items={MOBILE_LAUNCH.ios_checklist} score={MOBILE_LAUNCH.ios} />
        <Checklist title="Android checklist" items={MOBILE_LAUNCH.android_checklist} score={MOBILE_LAUNCH.android} />
      </div>
    </V45Page>
  ),
});
