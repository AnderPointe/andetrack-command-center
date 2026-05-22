import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const { matrix, deferred } = H.useV125Scope();
  return (
    <V125Page icon={<Layers className="size-6 text-teal-300" />} title="V12.5 Scope" blurb="Feature matrix and explicitly deferred items.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">V12.5 feature matrix</h3>
        <SimpleTable rows={matrix as any} columns={[
          { key: "area", label: "Area" },
          { key: "ga", label: "GA", render: (r: any) => <StatusPill status={r.ga === "ready" ? "ready" : r.ga === "beta" ? "review" : "placeholder"} /> },
          { key: "notes", label: "Notes" },
        ]} />
      </Card>
      <Card className="border-amber-400/20 bg-amber-400/5 p-4">
        <h3 className="text-sm font-semibold text-amber-100">Explicitly deferred</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {deferred.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/scope")({
  head: () => ({ meta: [{ title: "V12.5 Scope · Phase 38" }] }),
  component: Page,
});
