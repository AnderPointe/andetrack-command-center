import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const s = H.useExecutiveGrowthStewardship();
  const onTrack = s.priorities.filter((p) => p.status === "on_track").length;
  return (
    <V125Page icon={<Wallet className="size-6 text-teal-300" />} title="Executive Growth Stewardship Dashboard" blurb="Per-executive growth priorities, blockers, decisions, cadence.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Priorities" value={s.priorities.length}     tone="sky" />
        <ScoreCard label="On track"   value={onTrack}                  tone="emerald" />
        <ScoreCard label="Blockers"   value={s.blockers.length}        tone="amber" />
        <ScoreCard label="Decisions"  value={s.decisions.length}       tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Priority board</h3>
        <SimpleTable rows={s.priorities as any} columns={[
          { key: "role", label: "Role" }, { key: "priority", label: "Priority" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "on_track" ? "ready" : "review"} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Cross-functional blockers</h3>
        <SimpleTable rows={s.blockers as any} columns={[{ key: "blocker", label: "Blocker" }, { key: "owner", label: "Owner" }, { key: "impact", label: "Impact" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Decision queue</h3>
        <SimpleTable rows={s.decisions as any} columns={[{ key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Stewardship cadence</h3>
        <SimpleTable rows={s.cadence as any} columns={[{ key: "cadence", label: "Cadence" }, { key: "freq", label: "Frequency" }, { key: "owner", label: "Owner" }]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/steward")({
  head: () => ({ meta: [{ title: "Exec Stewardship · V12.5" }] }),
  component: Page,
});
