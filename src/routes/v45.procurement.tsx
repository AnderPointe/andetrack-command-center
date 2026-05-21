import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { PROCUREMENT_PACKET } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/procurement")({
  head: () => ({ meta: [{ title: "Procurement Packet · Anderoute" }] }),
  component: () => {
    const done = PROCUREMENT_PACKET.filter(p => p.status === "complete").length;
    return (
      <V45Page icon={<FileText className="size-6 text-violet-300" />} title="Enterprise Procurement Packet Maturity"
        blurb={`Mature procurement packet builder — ${done}/${PROCUREMENT_PACKET.length} sections complete. Used to respond to enterprise security questionnaires + procurement requests.`}>
        <SimpleTable rows={PROCUREMENT_PACKET} columns={[
          { key: "section", label: "Section" },
          { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
        ]} />
      </V45Page>
    );
  },
});
