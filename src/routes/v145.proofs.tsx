import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { Section, SimpleTable, ScoreCard } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const p = H.useCategoryProofExecution();
  const drafts = p.filter(x => x.status !== "approved").length;
  const stale = p.filter(x => x.fresh_days > 30).length;
  return (
    <V145Page icon={<BookOpen className="size-6 text-fuchsia-300" />} title="Category Proof Execution Center" blurb="Proof library across customer, marketplace, driver, portal, CoPilot, support, trust, partner, product and competitive.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Proofs tracked" value={p.length} tone="violet" />
        <ScoreCard label="Pending approval" value={drafts} tone="amber" />
        <ScoreCard label="Stale (>30d)" value={stale} tone="rose" />
      </div>
      <Section title="CategoryProofLibraryV145">
        <SimpleTable rows={p as any} columns={[
          { key: "type", label: "Proof type" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status" }, { key: "fresh_days", label: "Age (days)" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/proofs")({ head: () => ({ meta: [{ title: "Category Proofs · V14.5" }] }), component: Page });
