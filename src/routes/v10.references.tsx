import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Enterprise Reference Readiness";
const BLURB = "Reference customers, case-study status, security/MP/driver/portal/integration/support references, sponsor/legal approval, public/private status.";

function Page() {
  const r = H.useEnterpriseReferenceReadiness();
  return (
    <V10Page icon={<BookOpen className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Reference customer board</h3>
        <SimpleTable rows={r.references as any} columns={[
          { key: "customer", label: "Customer" },
          { key: "case_study", label: "Case study", render: (x: any) => <StatusPill status={x.case_study} /> },
          { key: "security_ref", label: "Security" },
          { key: "mp_ref", label: "MP" },
          { key: "driver_ref", label: "Driver" },
          { key: "portal_ref", label: "Portal" },
          { key: "integration_ref", label: "Integration" },
          { key: "support_ref", label: "Support" },
          { key: "sponsor_approval", label: "Sponsor", render: (x: any) => <StatusPill status={x.sponsor_approval} /> },
          { key: "legal_approval", label: "Legal" },
          { key: "visibility", label: "Visibility" },
        ]} />
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/references")({
  head: () => ({ meta: [{ title: "Enterprise Reference Readiness · Anderoute V10" }] }),
  component: Page,
});
