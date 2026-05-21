import { createFileRoute } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_PRODUCTS, API_RATE_LIMITS_V25 } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/api-products")({
  head: () => ({ meta: [{ title: "API Products · Anderoute" }] }),
  component: () => (
    <V25Page icon={<KeyRound className="size-6 text-emerald-300" />} title="API Product Catalog" blurb="Four tiers from Internal to Enterprise, each with included requests, overage pricing, and scoped access.">
      <div className="grid gap-3 md:grid-cols-2">
        {API_PRODUCTS.map((p) => (
          <Card key={p.id} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between"><h3 className="font-semibold">{p.name}</h3><Badge variant="outline" className="border-emerald-500/30 text-emerald-300">${p.price}/mo</Badge></div>
            <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-muted-foreground">Included:</span> {p.included.toLocaleString()} req</div>
              <div><span className="text-muted-foreground">Overage:</span> ${p.overage}/req</div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">{p.scopes.map((s) => <Badge key={s} variant="outline" className="border-white/15 text-muted-foreground text-[10px]">{s}</Badge>)}</div>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Rate limits</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Scope</th><th className="p-2">Tier</th><th className="p-2">Limit</th><th className="p-2">Burst</th><th className="p-2">Enforced</th></tr></thead>
          <tbody>
            {API_RATE_LIMITS_V25.map((r, i) => (
              <tr key={i} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{r.scope}</td><td className="p-2 text-xs">{r.tier}</td><td className="p-2 font-mono text-xs">{r.limit}</td><td className="p-2 font-mono text-xs">{r.burst}</td><td className="p-2">{r.enforced ? "✓" : "—"}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
