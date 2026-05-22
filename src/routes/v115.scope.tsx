import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const s = H.useV115Scope();
  return (
    <V115Page icon={<Layers className="size-6 text-emerald-300" />} title="V11.5 Scope" blurb="What V11.5 ships and what stays deferred. Mock-only.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Feature matrix</h3>
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area", label: "Area" },
          { key: "ga",   label: "Status", render: (r: any) => <StatusPill status={r.ga} /> },
          { key: "notes",label: "Notes" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Explicitly deferred</h3>
        <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
          {s.deferred.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/scope")({
  head: () => ({ meta: [{ title: "V11.5 Scope · Phase 36" }] }),
  component: Page,
});
