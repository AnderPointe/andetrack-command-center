import { createFileRoute } from "@tanstack/react-router";
import { Layers, Check, X } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/v45/ui-bits";
import { V45_SCOPE, V45_FEATURE_MATRIX, V45_MATURITY } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/scope")({
  head: () => ({ meta: [{ title: "V4.5 Scope · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Layers className="size-6 text-violet-300" />} title="V4.5 Scope Board"
      blurb="What ships in V4.5 vs what stays deferred. Maturity score is mock; certification claims require auditor evidence.">
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold text-emerald-300">In scope</h3>
          <ul className="mt-2 space-y-1 text-xs">
            {V45_SCOPE.included.map(s => <li key={s} className="flex items-center gap-2"><Check className="size-3 text-emerald-400" />{s}</li>)}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold text-rose-300">Deferred</h3>
          <ul className="mt-2 space-y-1 text-xs">
            {V45_SCOPE.deferred.map(s => <li key={s} className="flex items-center gap-2"><X className="size-3 text-rose-400" />{s}</li>)}
          </ul>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-end justify-between">
          <h3 className="text-sm font-semibold">Feature matrix</h3>
          <div className="text-3xl font-semibold">{V45_MATURITY.overall}%</div>
        </div>
        <div className="mt-3 grid gap-2">
          {V45_FEATURE_MATRIX.map(f => (
            <div key={f.area} className="flex items-center justify-between rounded border border-white/5 px-3 py-2 text-xs">
              <span className="font-medium">{f.area}</span>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{f.notes}</span>
                <StatusPill status={f.ga} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V45Page>
  ),
});
