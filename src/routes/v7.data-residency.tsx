import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useDataResidencyPlanning } from "@/v7/hooks";

export const Route = createFileRoute("/v7/data-residency")({
  head: () => ({ meta: [{ title: "Data Residency Planning · V7 · Anderoute" }] }),
  component: () => {
    const { rows } = useDataResidencyPlanning();
    return (
      <V7Page icon={<Database className="size-6 text-indigo-300" />} title="Data Residency Planning (Placeholder)"
        blurb="Planning only. Production residency pinning is NOT implemented. Tracks data types, required regions, current storage, risk, and legal review status.">
        <Card className="border-amber-400/30 bg-amber-500/[0.04] p-4 text-xs text-amber-100/90">
          Placeholder: do not represent these mappings as production residency controls.
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={rows as any} columns={[
            { key: "region",    label: "Region" },
            { key: "data_type", label: "Data type" },
            { key: "required",  label: "Required" },
            { key: "current",   label: "Current" },
            { key: "risk",      label: "Risk",  render: (r: any) => <StatusPill status={r.risk} /> },
            { key: "legal",     label: "Legal", render: (r: any) => <StatusPill status={r.legal} /> },
          ]} />
        </Card>
      </V7Page>
    );
  },
});
