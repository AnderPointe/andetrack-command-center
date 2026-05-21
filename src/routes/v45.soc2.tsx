import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { SOC2_CONTROLS, SOC2_READINESS, SOC2_TREND } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/soc2")({
  head: () => ({ meta: [{ title: "SOC 2 Tracker · Anderoute" }] }),
  component: () => {
    const remediation = SOC2_CONTROLS.filter(c => c.status === "Needs Remediation");
    const evidenceTotal = SOC2_CONTROLS.reduce((a, c) => a + c.evidence, 0);
    const exceptionsTotal = SOC2_CONTROLS.reduce((a, c) => a + c.exceptions, 0);
    const byArea = SOC2_CONTROLS.reduce<Record<string, number>>((acc, c) => {
      acc[c.area] = (acc[c.area] ?? 0) + 1; return acc;
    }, {});
    return (
      <V45Page icon={<FileCheck2 className="size-6 text-violet-300" />} title="SOC 2 Execution Tracker"
        blurb="Control matrix across Security, Availability, Processing Integrity, Confidentiality, and Privacy. Evidence vault + remediation board. Readiness is mock — auditor approval not claimed.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Audit readiness" value={SOC2_READINESS} tone="amber" />
          <ScoreCard label="Evidence artifacts" value={Math.min(100, evidenceTotal * 3)} tone="sky" />
          <ScoreCard label="Open exceptions" value={Math.min(100, exceptionsTotal * 15)} tone="rose" />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Readiness trend (6w)</h3>
            <div className="mt-3 grid grid-cols-6 items-end gap-2 h-32">
              {SOC2_TREND.map(t => (
                <div key={t.week} className="flex flex-col items-center gap-1">
                  <div className="w-6 rounded-t bg-amber-400/70" style={{ height: `${t.readiness}%` }} title={`${t.readiness}%`} />
                  <div className="text-[10px] text-muted-foreground">{t.week}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Controls by trust services criteria</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {Object.entries(byArea).map(([area, count]) => (
                <div key={area} className="flex justify-between rounded border border-white/10 px-2 py-1.5">
                  <span>{area}</span>
                  <span className="text-violet-300 font-medium">{count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <SimpleTable rows={SOC2_CONTROLS} columns={[
          { key: "id", label: "ID" },
          { key: "area", label: "Area" },
          { key: "title", label: "Control" },
          { key: "owner", label: "Owner" },
          { key: "evidence", label: "Evidence" },
          { key: "exceptions", label: "Exceptions" },
          { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
        ]} />
        {remediation.length > 0 && (
          <div className="rounded-lg border border-rose-400/30 bg-rose-500/5 p-3 text-xs">
            <div className="font-semibold text-rose-200">Remediation board ({remediation.length})</div>
            <ul className="mt-1 list-disc pl-4 text-muted-foreground">
              {remediation.map(r => <li key={r.id}>{r.id} · {r.title} (owner: {r.owner})</li>)}
            </ul>
          </div>
        )}
      </V45Page>
    );
  },
});
