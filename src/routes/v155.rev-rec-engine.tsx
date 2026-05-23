import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, StatusPill } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const recs = H.useV155RevRecs();
  return (
    <V155Page icon={<Lightbulb className="size-6 text-fuchsia-300" />}
      title="Revenue Optimization Recommendation Engine"
      blurb="Every recommendation ships with explainability, confidence, and named approver. No autonomous write actions.">
      <Section title="Active recommendations">
        <SimpleTable rows={recs as any} columns={[
          { key: "id", label: "ID" },
          { key: "title", label: "Recommendation" },
          { key: "segment", label: "Segment" },
          { key: "predicted_arr", label: "Predicted ARR" },
          { key: "confidence", label: "Conf." },
          { key: "approver", label: "Approver" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "approved" ? "healthy" : r.status === "deferred" ? "watchlist" : "in_progress"} /> },
          { key: "explainability", label: "Why" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/rev-rec-engine")({ component: Page });
