import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const b = H.useBoardCommercialReport();
  return (
    <V115Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Board-Level Commercial Performance" blurb="Quarterly board pack sections with owners and status. Mock-only.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={b.sections as any} columns={[
          { key: "section", label: "Section" },
          { key: "owner",   label: "Owner" },
          { key: "status",  label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/board")({
  head: () => ({ meta: [{ title: "Board Commercial · V11.5" }] }),
  component: Page,
});
