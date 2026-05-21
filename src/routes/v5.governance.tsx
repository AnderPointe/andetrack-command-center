import { createFileRoute } from "@tanstack/react-router";
import { BookCheck } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { GOVERNANCE_REVIEWS, GOVERNANCE_EXCEPTIONS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/governance")({
  head: () => ({ meta: [{ title: "Governance · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<BookCheck className="size-6 text-fuchsia-300" />} title="Enterprise Governance Maturity"
      blurb="Periodic access, integration, EDI, carrier, AI-action, billing and retention reviews — plus exceptions and policy acknowledgments.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Review calendar</h3>
        <div className="mt-2">
          <SimpleTable rows={GOVERNANCE_REVIEWS} columns={[
            { key: "type",       label: "Review" },
            { key: "status",     label: "Status", render: r => <StatusPill status={r.status} /> },
            { key: "completion", label: "%" },
            { key: "next",       label: "Next due" },
          ]} />
        </div>
      </Card>
      <Card className="border-amber-400/30 bg-amber-500/[0.04] p-4">
        <h3 className="text-sm font-semibold text-amber-200">Exceptions</h3>
        <div className="mt-2">
          <SimpleTable rows={GOVERNANCE_EXCEPTIONS} columns={[
            { key: "area",        label: "Area" },
            { key: "description", label: "Issue" },
            { key: "owner",       label: "Owner" },
            { key: "severity",    label: "Severity", render: r => <StatusPill status={r.severity} /> },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
