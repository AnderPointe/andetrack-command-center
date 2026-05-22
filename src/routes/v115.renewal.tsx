import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const r = H.useRenewalExpansionDiscipline();
  return (
    <V115Page icon={<CalendarClock className="size-6 text-emerald-300" />} title="Renewal & Expansion Discipline" blurb="Quarterly renewal funnel with GRR / NRR. Mock-only.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.rows as any} columns={[
          { key: "quarter",      label: "Quarter" },
          { key: "renewals_due", label: "Due" },
          { key: "on_track",     label: "On track" },
          { key: "at_risk",      label: "At risk" },
          { key: "churned",      label: "Churned" },
          { key: "grr_pct",      label: "GRR", render: (r: any) => `${r.grr_pct}%` },
          { key: "nrr_pct",      label: "NRR", render: (r: any) => `${r.nrr_pct}%` },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/renewal")({
  head: () => ({ meta: [{ title: "Renewal Discipline · V11.5" }] }),
  component: Page,
});
