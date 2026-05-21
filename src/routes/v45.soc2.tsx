import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { SOC2_CONTROLS, SOC2_READINESS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/soc2")({
  head: () => ({ meta: [{ title: "SOC 2 Tracker · Anderoute" }] }),
  component: () => {
    const remediation = SOC2_CONTROLS.filter(c => c.status === "Needs Remediation");
    return (
      <V45Page icon={<FileCheck2 className="size-6 text-violet-300" />} title="SOC 2 Execution Tracker"
        blurb="Control matrix across Security, Availability, Processing Integrity, Confidentiality, and Privacy. Evidence vault + remediation board. Readiness is mock — auditor approval not claimed.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Audit readiness" value={SOC2_READINESS} tone="amber" />
          <ScoreCard label="Evidence collected" value={Math.round(SOC2_CONTROLS.reduce((a, c) => a + c.evidence, 0) / SOC2_CONTROLS.length * 10)} tone="sky" />
          <ScoreCard label="Open exceptions" value={SOC2_CONTROLS.reduce((a, c) => a + c.exceptions, 0) * 10} tone="rose" />
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
