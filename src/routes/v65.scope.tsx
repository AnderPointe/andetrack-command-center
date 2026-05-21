import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useV65Scope } from "@/v65/hooks";

export const Route = createFileRoute("/v65/scope")({
  head: () => ({ meta: [{ title: "V6.5 Scope · Anderoute" }] }),
  component: () => {
    const { matrix, deferred } = useV65Scope();
    return (
      <V65Page icon={<Layers className="size-6 text-cyan-300" />} title="V6.5 Scope Board"
        blurb="In-scope vs out-of-scope for V6.5. Certifications, IPO posture, and global compliance are tracked as evidence, not asserted complete.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Feature matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={matrix} columns={[
              { key: "area",   label: "Area" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-rose-400/30 bg-rose-500/[0.04] p-4">
          <h3 className="text-sm font-semibold text-rose-200">Deferred (not in V6.5)</h3>
          <ul className="mt-2 grid gap-1 text-xs text-muted-foreground md:grid-cols-2">
            {deferred.map(d => <li key={d}>· {d}</li>)}
          </ul>
        </Card>
      </V65Page>
    );
  },
});
