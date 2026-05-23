import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const e = H.useCapitalEvidenceDiscipline();
  const gaps = e.filter(x => x.gap).length;
  const stale = e.filter(x => x.fresh_days > 30).length;
  return (
    <V145Page icon={<Lock className="size-6 text-fuchsia-300" />} title="Capital Evidence Discipline Center" blurb="Evidence freshness, approval status, board/data-room use across all capital evidence categories.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Evidence items" value={e.length} tone="violet" />
        <ScoreCard label="Gaps" value={gaps} tone="rose" />
        <ScoreCard label="Stale (>30d)" value={stale} tone="amber" />
      </div>
      <Section title="CapitalEvidenceOwnerMatrix">
        <SimpleTable rows={e.map(x => ({ ...x, approved: x.approved ? "yes" : "no", external: x.external ? "yes" : "no", board: x.board ? "yes" : "no", data_room: x.data_room ? "yes" : "no", gap: x.gap ? "yes" : "no" })) as any} columns={[
          { key: "category", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "fresh_days", label: "Age" }, { key: "approved", label: "Approved" },
          { key: "external", label: "Ext-use" }, { key: "board", label: "Board" },
          { key: "data_room", label: "Data room" }, { key: "gap", label: "Gap" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/cap-evidence")({ head: () => ({ meta: [{ title: "Capital Evidence · V14.5" }] }), component: Page });
