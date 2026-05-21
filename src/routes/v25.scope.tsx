import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V25_SCOPE, V25_FEATURE_MATRIX } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/scope")({
  head: () => ({ meta: [{ title: "V2.5 Scope · Anderoute" }] }),
  component: () => {
    const inScope = V25_SCOPE.filter((s) => s.status === "in_scope");
    const deferred = V25_SCOPE.filter((s) => s.status === "deferred");
    return (
      <V25Page icon={<Layers className="size-6 text-emerald-300" />} title="V2.5 Scope" blurb="What ships in V2.5, what stays deferred, and how V2.5 compares to V1.5 and V2.">
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-emerald-500/30 bg-emerald-500/[0.04] p-4">
            <h2 className="text-sm font-semibold text-emerald-200">In scope ({inScope.length})</h2>
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
                <tr><th className="p-2">Feature</th><th className="p-2">V1.5</th><th className="p-2">V2</th><th className="p-2">V2.5</th></tr>
              </thead>
              <tbody>
                {V25_FEATURE_MATRIX.map((f) => (
                  <tr key={f.feature} className="border-t border-white/10">
                    <td className="p-2">{f.feature}</td>
                    {[f.v15, f.v2, f.v25].map((v, i) => (
                      <td key={i} className="p-2">
                        <Badge variant="outline" className={v === false ? "border-white/10 text-muted-foreground" : v === "production" ? "border-emerald-500/30 text-emerald-300" : v === "beta" ? "border-sky-500/30 text-sky-300" : "border-amber-500/30 text-amber-300"}>
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
      </V25Page>
    );
  },
});
