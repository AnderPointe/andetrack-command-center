import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const e = H.useEvidenceAutomationScale();
  return (
    <V175Page icon={<FileSearch className="size-6 text-emerald-300" />} title="Evidence Automation Scale Center"
      blurb="Coverage and freshness by domain, owner coverage, approval coverage, missing-evidence queue, exceptions, and remediation.">
      <ScoreCard label="Evidence automation scale" value={e.score} tone="emerald" />
      <Section title="Domain coverage">
        <SimpleTable rows={e.domain_coverage as any} columns={[
          { key: "domain", label: "Domain" }, { key: "coverage", label: "Coverage" }, { key: "fresh", label: "Freshness" },
          { key: "owner", label: "Owner" }, { key: "missing", label: "Missing" },
        ]} />
      </Section>
      <Section title="Owner coverage">
        <SimpleTable rows={e.owner_coverage as any} columns={[
          { key: "owner", label: "Owner" }, { key: "assigned", label: "Assigned" }, { key: "attested", label: "Attested" }, { key: "gap", label: "Gap" },
        ]} />
      </Section>
      <Section title="Approval coverage">
        <SimpleTable rows={e.approval_coverage as any} columns={[{ key: "stage", label: "Stage" }, { key: "coverage", label: "Coverage" }]} />
      </Section>
      <Section title="Missing evidence queue">
        <SimpleTable rows={e.missing_queue as any} columns={[
          { key: "id", label: "ID" }, { key: "domain", label: "Domain" }, { key: "category", label: "Category" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Section>
      <Section title="Evidence automation exceptions">
        <SimpleTable rows={e.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "domain", label: "Domain" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Evidence automation scale action plan">
        <SimpleTable rows={e.plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/evidence-scale")({ component: Page });
