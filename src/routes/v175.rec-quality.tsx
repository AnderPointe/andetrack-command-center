import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const r = H.useRecommendationQualityImprovement();
  return (
    <V175Page icon={<CheckCircle2 className="size-6 text-emerald-300" />} title="Recommendation Quality Improvement Center"
      blurb="Signal quality, evidence completeness, explainability, calibration, approval/rejection, outcome quality, repeat/duplicate rate, and alternative-option quality.">
      <ScoreCard label="Recommendation quality" value={r.score} tone="emerald" />
      <KpiGrid cols={4} items={r.kpis} />
      <Section title="Quality dashboard by domain">
        <SimpleTable rows={r.dashboard as any} columns={[
          { key: "domain", label: "Domain" }, { key: "quality", label: "Quality" },
          { key: "evidence", label: "Evidence" }, { key: "explainability", label: "Explainability" },
        ]} />
      </Section>
      <Section title="Source signal quality">
        <SimpleTable rows={r.signals as any} columns={[
          { key: "signal", label: "Signal" }, { key: "quality", label: "Quality" }, { key: "source", label: "Source" },
        ]} />
      </Section>
      <Section title="Explainability completeness">
        <SimpleTable rows={r.explainability as any} columns={[
          { key: "domain", label: "Domain" }, { key: "evidence_links", label: "Evidence links" },
          { key: "reason_strings", label: "Reason strings" }, { key: "alt_options", label: "Alt options" },
        ]} />
      </Section>
      <Section title="Duplicate recommendations">
        <SimpleTable rows={r.duplicates as any} columns={[
          { key: "rec_id", label: "Rec ID" }, { key: "domain", label: "Domain" },
          { key: "duplicate_of", label: "Duplicate of" }, { key: "reason", label: "Reason" },
        ]} />
      </Section>
      <Section title="Recommendation quality action plan">
        <SimpleTable rows={r.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/rec-quality")({ component: Page });
