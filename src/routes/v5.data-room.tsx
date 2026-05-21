import { createFileRoute } from "@tanstack/react-router";
import { FolderArchive } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { DATA_ROOM, DD_REQUESTS, DATA_ROOM_PROGRESS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/data-room")({
  head: () => ({ meta: [{ title: "Data Room · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<FolderArchive className="size-6 text-fuchsia-300" />} title="Data Room Maturity"
      blurb="Investor / acquisition readiness checklist, document vault placeholders, and due-diligence request tracking.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Checklist</h3>
        <div className="mt-2">
          <SimpleTable rows={DATA_ROOM} columns={[
            { key: "section", label: "Section" },
            { key: "status",  label: "Status", render: r => <StatusPill status={r.status} /> },
            { key: "owner",   label: "Owner" },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Due diligence requests</h3>
        <div className="mt-2">
          <SimpleTable rows={DD_REQUESTS} columns={[
            { key: "id",        label: "ID" },
            { key: "topic",     label: "Topic" },
            { key: "requestor", label: "Requestor" },
            { key: "status",    label: "Status", render: r => <StatusPill status={r.status} /> },
            { key: "due",       label: "Due" },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
