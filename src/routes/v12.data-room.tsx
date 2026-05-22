import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useCommercialDataRoomReadiness();
  return (
    <V12Page icon={<BookOpen className="size-6 text-cyan-300" />} title="Commercial Data Room Readiness" blurb="Checklist of commercial diligence sections with status and evidence linkage. Export remains a placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "item", label: "Item" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "evidence", label: "Evidence" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/data-room")({
  head: () => ({ meta: [{ title: "Commercial Data Room · V12" }] }),
  component: Page,
});
