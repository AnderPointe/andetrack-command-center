import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { PARTNERSHIPS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/partnerships")({
  head: () => ({ meta: [{ title: "Partnerships · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Handshake className="size-6 text-violet-300" />} title="Strategic Partnership Readiness"
      blurb="Pipeline across telematics, carrier networks, brokers, shippers, fuel, EDI, ERP, insurance placeholder, hardware and mobile ecosystem partners.">
      <SimpleTable rows={PARTNERSHIPS} columns={[
        { key: "name", label: "Partner" },
        { key: "category", label: "Category" },
        { key: "fit", label: "Fit", render: r => `${r.fit}` },
        { key: "security", label: "Security", render: r => <StatusPill status={r.security} /> },
        { key: "legal", label: "Legal", render: r => <StatusPill status={r.legal} /> },
        { key: "stage", label: "Stage", render: r => <StatusPill status={r.stage} /> },
      ]} />
    </V45Page>
  ),
});
