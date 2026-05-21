import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useCertificationEvidenceCompletion } from "@/v6/hooks";

export const Route = createFileRoute("/v6/evidence")({
  head: () => ({ meta: [{ title: "Certification Evidence · V6" }] }),
  component: () => {
    const { evidence: e } = useCertificationEvidenceCompletion();
    return (
      <V6Page icon={<FileCheck2 className="size-6 text-emerald-300" />} title="Enterprise Certification Evidence Completion"
        blurb="SOC 2 / ISO evidence completion, pen test, vulnerability remediation, mobile/API/EDI security reviews, AI governance review, access reviews, IR + backup tests, policies, audit package readiness. We do NOT claim certification complete without audit evidence.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="SOC 2 evidence" value={e.soc2_completion} tone="emerald" />
          <ScoreCard label="ISO readiness (pl)" value={e.iso_readiness_pl} tone="amber" />
          <ScoreCard label="Evidence freshness" value={e.evidence_freshness} tone="sky" />
          <ScoreCard label="Audit package ready" value={e.audit_pkg_ready} tone="violet" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Vuln remediated", value: `${e.vuln_remediated}%` },
          { label: "Access review", value: `${e.access_review}%` },
          { label: "Policy completion", value: `${e.policy_completion}%` },
          { label: "Controls to remediate", value: e.controls_needing_remediation },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Reviews</h3>
          <div className="mt-2 grid gap-2 text-xs md:grid-cols-3">
            <div className="flex justify-between"><span>Pen test</span><StatusPill status={e.pentest} /></div>
            <div className="flex justify-between"><span>Mobile sec</span><StatusPill status={e.mobile_sec} /></div>
            <div className="flex justify-between"><span>API sec</span><StatusPill status={e.api_sec} /></div>
            <div className="flex justify-between"><span>EDI sec</span><StatusPill status={e.edi_sec} /></div>
            <div className="flex justify-between"><span>AI governance review</span><StatusPill status={e.ai_gov_review} /></div>
            <div className="flex justify-between"><span>IR test</span><StatusPill status={e.ir_test} /></div>
            <div className="flex justify-between"><span>Backup restore test</span><StatusPill status={e.backup_restore_test} /></div>
          </div>
        </Card>
      </V6Page>
    );
  },
});
