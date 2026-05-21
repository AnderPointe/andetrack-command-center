import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V35_SCOPE, V35_DEFERRED, V35_FEATURE_MATRIX } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/scope")({
  head: () => ({ meta: [{ title: "V3.5 Scope · Anderoute" }] }),
  component: () => (
    <V35Page icon={<Layers className="size-6 text-amber-300" />} title="V3.5 Scope Board"
      blurb="What V3.5 covers, what stays placeholder, and what is explicitly deferred to V4+.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">In scope</h2>
        <div className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">
          {V35_SCOPE.map((s) => (
            <div key={s.area} className="rounded border border-white/10 bg-black/20 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span>{s.area}</span>
                <Badge variant="outline" className={s.status === "placeholder" ? "border-amber-500/40 text-amber-300" : "border-emerald-500/40 text-emerald-300"}>
                  {s.status}
                </Badge>
              </div>
              {"note" in s && s.note && <div className="text-xs text-muted-foreground">{s.note}</div>}
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Feature matrix</h2>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-1">Feature</th><th className="p-1">Trial</th><th className="p-1">Growth</th><th className="p-1">Scale</th><th className="p-1">Enterprise</th></tr>
          </thead>
          <tbody>
            {V35_FEATURE_MATRIX.map((f) => (
              <tr key={f.feature} className="border-t border-white/10">
                <td className="p-1">{f.feature}</td>
                {[f.trial, f.growth, f.scale, f.enterprise].map((v, i) => (
                  <td key={i} className="p-1">{v ? "✓" : "—"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-4">
        <h2 className="text-sm font-semibold text-amber-200">Deferred (V4+)</h2>
        <ul className="mt-2 grid gap-1 text-sm text-amber-100/90 md:grid-cols-2">
          {V35_DEFERRED.map((d) => <li key={d}>• {d}</li>)}
        </ul>
      </Card>
    </V35Page>
  ),
});
