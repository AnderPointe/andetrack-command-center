import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, StatusPill } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const a = H.useV155Approvals();
  return (
    <V155Page icon={<CheckCircle2 className="size-6 text-fuchsia-300" />}
      title="Human Approval Workflow Center"
      blurb="Every recommendation routes to a named approver. SLA: <5 business days for pending; escalate to Chief of Staff after.">
      <Section title="Approval queue">
        <SimpleTable rows={a as any} columns={[
          { key: "id", label: "Approval" }, { key: "rec_id", label: "Rec" },
          { key: "approver", label: "Approver" }, { key: "impact", label: "Impact" },
          { key: "waiting_days", label: "Waiting (d)" },
          { key: "state", label: "State", render: (r: any) => <StatusPill status={r.state === "approved" ? "healthy" : r.state === "pending" && r.waiting_days > 3 ? "watchlist" : "in_progress"} /> },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/approvals")({ component: Page });
