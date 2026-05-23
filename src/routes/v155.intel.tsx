import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, ExecHeadline } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function makePage(title: string, blurb: string, filter: (a: { area: string }) => boolean) {
  return function Page() {
    const areas = H.useV155IntelAreas().filter(filter);
    return (
      <V155Page icon={<Brain className="size-6 text-fuchsia-300" />} title={title} blurb={blurb}>
        <Section title="Intelligence headlines">
          <div className="grid gap-2 md:grid-cols-2">
            {areas.map(a => <ExecHeadline key={a.area} tag={a.area} headline={a.headline} bullets={a.bullets} />)}
          </div>
        </Section>
      </V155Page>
    );
  };
}

export const Route = createFileRoute("/v155/intel")({
  component: makePage("Strategic Operating Intelligence", "All intelligence areas at a glance.", () => true),
});
