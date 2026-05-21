import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V3_SCOPE, V3_FEATURE_MATRIX } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/scope")({
  head: () => ({ meta: [{ title: "V3 Scope · Anderoute" }] }),
  component: () => {
    const inScope = V3_SCOPE.filter((s) => s.status === "in_scope");
    const deferred = V3_SCOPE.filter((s) => s.status === "deferred");
    return (
      <V3Page icon={<Layers className="size-6 text-sky-300" />} title="V3 Scope" blurb="What ships in V3 mobile-native expansion and what stays deferred to V3.5 / V4.">
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-sky-500/30 bg-sky-500/[0.04] p-4">
            <h2 className="text-sm font-semibold text-sky-200">In scope ({inScope.length})</h2>
            <ul className="mt-2 space-y-1.5 text-sm">{inScope.map((s) => (<li key={s.id}><span className="font-medium">{s.area}</span> <span className="text-xs text-muted-foreground">— {s.note}</span></li>))}</ul>
          </Card>
          <Card className="border-amber-500/30 bg-amber-500/[0.04] p-4">
            <h2 className="text-sm font-semibold text-amber-200">Deferred ({deferred.length})</h2>
            <ul className="mt-2 space-y-1.5 text-sm">{deferred.map((s) => (<li key={s.id}><span className="font-medium">{s.area}</span> <span className="text-xs text-muted-foreground">— {s.note}</span></li>))}</ul>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Feature matrix</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="p-2">Feature</th><th className="p-2">V2.5</th><th className="p-2">V3</th></tr>
              </thead>
              <tbody>
                {V3_FEATURE_MATRIX.map((f) => (
                  <tr key={f.feature} className="border-t border-white/10">
                    <td className="p-2">{f.feature}</td>
                    {[f.v25, f.v3].map((v, i) => (
                      <td key={i} className="p-2">
                        <Badge variant="outline" className={v === false ? "border-white/10 text-muted-foreground" : "border-sky-500/30 text-sky-300"}>
                          {v === false ? "—" : String(v)}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </V3Page>
    );
  },
});
