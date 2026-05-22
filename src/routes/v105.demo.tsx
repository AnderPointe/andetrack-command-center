import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import * as H from "@/v105/hooks";

function Page() {
  const d = H.useV105DemoFlow();
  const closeout = H.useV105DemoCloseout();
  return (
    <V105Page icon={<ListChecks className="size-6 text-fuchsia-300" />} title="V10.5 Demo Flow" blurb="CRO → Security → Sales → RevOps → CFO → CS → Partner → MP → Board → CEO walkthrough of V10.5 commercialization scale.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Demo steps</h3>
        <ol className="mt-2 space-y-1.5 text-sm">
          {d.map((s, i) => (
            <li key={i} className="grid grid-cols-[2rem_5rem_1fr] items-start gap-2 rounded border border-white/5 bg-black/20 px-3 py-1.5">
              <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-fuchsia-200">{s.role}</span>
              <span>{s.step}</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Demo close-out — signed commitments</h3>
        <p className="mt-1 text-xs text-muted-foreground">Commitments captured at the end of the V10.5 walkthrough. Mock-only.</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {closeout.map((c, i) => (
            <li key={i} className="grid grid-cols-[5rem_1fr_6rem] items-start gap-2 rounded border border-white/5 bg-black/20 px-3 py-1.5">
              <span className="text-fuchsia-200">{c.role}</span>
              <span>{c.commitment}</span>
              <span className="text-right text-xs text-muted-foreground">{c.due}</span>
            </li>
          ))}
        </ul>
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/demo")({
  head: () => ({ meta: [{ title: "V10.5 Demo Flow · Phase 34" }] }),
  component: Page,
});
