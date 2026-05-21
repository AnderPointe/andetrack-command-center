import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/overview")({
  head: () => ({ meta: [{ title: "V8.5 Overview · Anderoute" }] }),
  component: () => {
    const d = H.useGlobalOperatingDiscipline();
    const c = H.useInternationalControlMaturity();
    const headline = H.useV85ExecHeadline();
    const overlays = H.useV85ExecutionOverlays().slice(0, 6);
    return (
      <V85Page icon={<Gauge className="size-6 text-fuchsia-300" />} title="Anderoute V8.5 — Global Enterprise Operating Discipline" blurb="Mature international controls, marketplace financial optimization, board governance, country accountability, and long-term platform stewardship. No final audit / SOC 2 / autonomous claims.">
        <ExecBanner h={headline} />
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Operating discipline" value={d.score.score} tone="emerald" />
          <ScoreCard label="Control maturity"     value={c.summary.score} tone="amber" />
          <ScoreCard label="Exceptions open"      value={c.summary.exceptions_open} tone="rose" />
          <ScoreCard label="Domains tracked"      value={d.domains.length} tone="sky" />
        </div>
        <KpiGrid cols={4} items={d.domains.slice(0,8).map(x=>({label:x.domain,value:x.score,sub:`owner: ${x.owner}`}))} />
        <OverlayStrip items={overlays as any} title="Executive overlays — top 6" />
      </V85Page>);
  },
});
