import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const e = H.useCertificationEvidenceMaturity();
  return (
    <V95Page icon={<Award className="size-6 text-cyan-300" />} title="Certification Evidence Maturity Center" blurb="SOC 2 / ISO / pen test placeholders, evidence freshness, owners, exceptions, audit package readiness (placeholder).">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Evidence maturity" value={e.summary.score} tone="emerald" />
        <ScoreCard label="Freshness"         value={e.summary.freshness} tone="sky" />
        <ScoreCard label="Audit package"     value={e.auditPackage.score} tone="amber" />
        <ScoreCard label="Exceptions"        value={e.summary.exceptions} tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Control evidence</h3>
        <div className="mt-2">
          <SimpleTable rows={e.controls as any} columns={[
            { key: "control", label: "Control" }, { key: "owner", label: "Owner" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "freshness", label: "Freshness", render: (r: any) => `${r.freshness}%` },
          ]} />
        </div>
      </Card>
      <Card className="border-rose-400/30 bg-rose-500/5 p-4">
        <h3 className="text-sm font-semibold text-rose-200">Evidence exceptions</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {e.exceptions.map((x) => (
            <li key={x.id}>· <span className="text-rose-200">{x.control}</span> — {x.reason} (owner: {x.owner})</li>
          ))}
        </ul>
      </Card>
      <Card className="border-cyan-400/30 bg-cyan-500/5 p-4 text-sm">
        <div className="font-semibold text-cyan-200">Audit package readiness (placeholder)</div>
        <div className="mt-1 text-xs text-muted-foreground">{e.auditPackage.sections_ready} of {e.auditPackage.sections_total} sections ready. Mock-only — no formal audit claim is made.</div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/evidence")({
  head: () => ({ meta: [{ title: "Cert Evidence · Anderoute V9.5" }] }),
  component: Page,
});
