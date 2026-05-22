import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const b = H.useBoardInvestorDiscipline();
  return (
    <V95Page icon={<FileCheck2 className="size-6 text-cyan-300" />} title="Board and Investor Operating Discipline" blurb="Board packet readiness, decisions, action items, investor update readiness, executive action item tracker.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Packet readiness"   value={b.discipline.packet_readiness} tone="emerald" />
        <ScoreCard label="Decisions pending"  value={b.decisions.length} tone="amber" />
        <ScoreCard label="Investor readiness" value={b.investor.readiness} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Board packet — next meeting {b.discipline.next_meeting}</h3>
        <div className="mt-2">
          <SimpleTable rows={b.packet as any} columns={[
            { key: "section", label: "Section" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </div>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Strategic decisions</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {b.decisions.map((d) => (
              <li key={d.id} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-2">
                <span>{d.decision}</span><StatusPill status={d.status} />
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Executive action tracker</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {b.actions.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-2">
                <span><span className="text-cyan-200">{a.owner}</span> · {a.action}</span><StatusPill status={a.status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/board")({
  head: () => ({ meta: [{ title: "Board & Investor · Anderoute V9.5" }] }),
  component: Page,
});
