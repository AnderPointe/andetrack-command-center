import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const s = H.useV12Scope();
  const teaser = H.useV12Phase38Teaser();
  return (
    <V12Page icon={<Layers className="size-6 text-cyan-300" />} title="V12 Scope" blurb="20 V12 surfaces. Deferred items remain explicit. Phase 38 teaser is forward-looking only.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area", label: "Area" },
          { key: "ga",   label: "Status", render: (r: any) => <StatusPill status={r.ga} /> },
          { key: "notes",label: "Notes" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Deferred</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">{s.deferred.map((d) => <li key={d}>{d}</li>)}</ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Phase 38 teaser (V12.5)</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">{teaser.map((t) => <li key={t}>{t}</li>)}</ul>
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/scope")({
  head: () => ({ meta: [{ title: "V12 Scope · Phase 37" }] }),
  component: Page,
});
