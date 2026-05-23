import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const dur = H.useV135Durability();
  const headline = H.useV135ExecHeadline();
  const exec = H.useV135ExecStewardship();
  const board = H.useV135BoardStewardship();
  const ret = H.useV135Retention();
  const teaser = H.useV135Phase41Teaser();
  const boundary = H.useV135BackendBoundary();
  const edge = H.useV135EdgeVsServerFn();
  return (
    <V135Page icon={<Gauge className="size-6 text-fuchsia-300" />} title="Anderoute V13.5 — Revenue Durability & Board Strategic OS" blurb="Mock-only. Long-horizon revenue durability, always-on diligence, board strategic operating system, exec/board stewardship logs. No autonomous dispatch, no IPO/audit certifications.">
      <Card className="border-fuchsia-400/20 bg-fuchsia-400/5 p-4">
        <div className="text-xs uppercase tracking-wide text-fuchsia-200/80">V13.5 exec headline</div>
        <p className="mt-1 text-sm">{headline.headline}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-foreground/80">
          {headline.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </Card>
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Durability"          value={dur.score}   tone="emerald" />
        <ScoreCard label="Exec stewardship"    value={exec.score}  tone="amber" />
        <ScoreCard label="Board stewardship"   value={board.score} tone="violet" />
        <ScoreCard label="NRR"                 value={`${ret.nrr_pct}%`} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Durability KPIs</h3>
        <SimpleTable rows={dur.kpis as any} columns={[
          { key: "kpi", label: "KPI" }, { key: "pct", label: "%" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Edge Function vs ServerFn separation</h3>
        <SimpleTable rows={edge as any} columns={[
          { key: "kind", label: "Kind" }, { key: "surface", label: "Surface" },
          { key: "example", label: "Example" }, { key: "why", label: "Why" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Backend boundary</h3>
        <SimpleTable rows={boundary as any} columns={[
          { key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "auth", label: "Auth" },
        ]} />
      </Card>
      <Card className="border-fuchsia-400/20 bg-fuchsia-400/5 p-4">
        <h3 className="text-sm font-semibold text-fuchsia-100">Phase 41 (V14) teaser — not started</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
          {teaser.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/overview")({
  head: () => ({ meta: [{ title: "V13.5 Overview · Phase 40" }] }),
  component: Page,
});
