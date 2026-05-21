import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { V5_FEATURE_MATRIX, V5_DEFERRED } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/scope")({
  head: () => ({ meta: [{ title: "V5 Scope · Anderoute" }] }),
  component: () => (
    <V5Page icon={<Layers className="size-6 text-fuchsia-300" />} title="V5 Scope Board"
      blurb="V5 focuses on national-scale operational maturity. Autonomous dispatch, insurance underwriting, and international customs remain deferred.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Feature matrix</h3>
        <div className="mt-2">
          <SimpleTable rows={V5_FEATURE_MATRIX} columns={[
            { key: "area",  label: "Area" },
            { key: "ga",    label: "Status", render: r => <StatusPill status={r.ga} /> },
            { key: "notes", label: "Notes" },
          ]} />
        </div>
      </Card>
      <Card className="border-rose-400/30 bg-rose-500/[0.04] p-4">
        <h3 className="text-sm font-semibold text-rose-200">Deferred — not in V5</h3>
        <ul className="mt-2 grid gap-1 text-xs text-muted-foreground md:grid-cols-2">
          {V5_DEFERRED.map(d => <li key={d}>· {d}</li>)}
        </ul>
      </Card>
    </V5Page>
  ),
});
