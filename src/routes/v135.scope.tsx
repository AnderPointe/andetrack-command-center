import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const { matrix, deferred } = H.useV135Scope();
  return (
    <V135Page icon={<Layers className="size-6 text-fuchsia-300" />} title="V13.5 Scope" blurb="Feature matrix and explicit deferrals for V13.5.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Feature matrix</h3>
        <SimpleTable rows={matrix as any} columns={[
          { key: "area", label: "Area" }, { key: "ga", label: "Stage" }, { key: "notes", label: "Notes" },
        ]} />
      </Card>
      <Card className="border-amber-400/20 bg-amber-400/5 p-4">
        <h3 className="text-sm font-semibold text-amber-100">Deferred</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{deferred.map((d) => <li key={d}>{d}</li>)}</ul>
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/scope")({
  head: () => ({ meta: [{ title: "V13.5 Scope · Phase 40" }] }),
  component: Page,
});
