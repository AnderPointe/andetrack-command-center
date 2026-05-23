import { ReactNode } from "react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, ExecHeadline } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

export function IntelAreaPage({ title, blurb, icon, match }: { title: string; blurb: string; icon: ReactNode; match: string }) {
  const areas = H.useV155IntelAreas().filter(a => a.area === match);
  return (
    <V155Page icon={icon} title={title} blurb={blurb}>
      <Section title="Headline">
        {areas.length === 0
          ? <p className="text-sm text-muted-foreground">No headline for this area.</p>
          : areas.map(a => <ExecHeadline key={a.area} tag={a.area} headline={a.headline} bullets={a.bullets} />)}
      </Section>
    </V155Page>
  );
}
