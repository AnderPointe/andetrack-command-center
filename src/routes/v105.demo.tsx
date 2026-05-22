import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import * as H from "@/v105/hooks";

function Page() {
  const d = H.useV105DemoFlow();
  return (
    <V105Page icon={<ListChecks className="size-6 text-fuchsia-300" />} title="V10.5 Demo Flow" blurb="CRO → Security → Sales → CFO → MP → Board walkthrough of V10.5 commercialization scale.">
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
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/demo")({
  head: () => ({ meta: [{ title: "V10.5 Demo Flow · Phase 34" }] }),
  component: Page,
});
