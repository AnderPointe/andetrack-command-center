import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { KpiGrid, ScoreCard } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const s = H.useGlobalEnterpriseStewardship();
  return (
    <V95Page icon={<Crown className="size-6 text-cyan-300" />} title="Global Enterprise Stewardship Dashboard" blurb="Enterprise trust, stewardship maturity radar, gap panel, and executive stewardship action plan.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Enterprise trust" value={s.trust.score} tone="emerald" />
        <ScoreCard label="Domains tracked"  value={s.domains.length} tone="sky" />
        <ScoreCard label="Open gaps"        value={s.gaps.length} tone="rose" />
      </div>
      <KpiGrid cols={5} items={s.domains.map(d => ({ label: d.domain, value: `${d.score}%`, sub: `owner: ${d.owner}` }))} />
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Stewardship gaps</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {s.gaps.map((g) => (
              <li key={g.domain} className="rounded border border-rose-400/20 bg-rose-500/5 px-3 py-1.5">
                <span className="text-rose-200">{g.domain}</span> · {g.gap}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action plan</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {s.actions.map((a) => (
              <li key={a.id} className="rounded border border-white/10 bg-black/20 px-3 py-1.5">
                <span className="text-cyan-200">{a.owner}</span> · {a.area} — {a.action}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/stewardship")({
  head: () => ({ meta: [{ title: "Stewardship · Anderoute V9.5" }] }),
  component: Page,
});
