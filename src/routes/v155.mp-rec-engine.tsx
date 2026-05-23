import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, StatusPill } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const recs = H.useV155MpRecs();
  return (
    <V155Page icon={<Megaphone className="size-6 text-fuchsia-300" />}
      title="Marketplace Optimization Recommendation Engine"
      blurb="Lane-level recs with predicted lift, confidence, and MP GM / Ops approval.">
      <Section title="Marketplace recommendations">
        <SimpleTable rows={recs as any} columns={[
          { key: "id", label: "ID" }, { key: "title", label: "Recommendation" },
          { key: "predicted_lift", label: "Predicted lift" }, { key: "confidence", label: "Conf." },
          { key: "approver", label: "Approver" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "approved" ? "healthy" : "in_progress"} /> },
          { key: "explainability", label: "Why" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/mp-rec-engine")({ component: Page });
