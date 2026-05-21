import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CARRIER_MARKETPLACE, MARKETPLACE_BIDS, CARRIER_DISPUTES, MARKETPLACE_FUNNEL, MARKETPLACE_TRENDS, SUSPENSIONS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace Scale · Anderoute" }] }),
  component: () => {
    const maxFunnel = Math.max(...MARKETPLACE_FUNNEL.map(f => f.count));
    return (
      <V4Page icon={<Store className="size-6 text-sky-300" />} title="Carrier Marketplace Scale"
        blurb="Search, filter, bid, award, communicate, settle, dispute and suspend across the carrier marketplace.">
        <div className="grid gap-3 md:grid-cols-4">
          {Object.entries(CARRIER_MARKETPLACE).map(([k,v]) => (
            <Card key={k} className="border-white/10 bg-white/[0.02] p-3">
              <div className="text-xs uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
              <div className="mt-1 text-xl font-semibold">{v}</div>
            </Card>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Carrier acquisition funnel</h3>
            <div className="mt-3 space-y-2 text-sm">
              {MARKETPLACE_FUNNEL.map(f => (
                <div key={f.stage}>
                  <div className="flex justify-between text-xs"><span>{f.stage}</span><span className="font-mono">{f.count}</span></div>
                  <div className="h-2 rounded bg-black/30 overflow-hidden">
                    <div className="h-full bg-sky-400/50" style={{ width: `${(f.count/maxFunnel)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Marketplace trends</h3>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {Object.entries(MARKETPLACE_TRENDS).map(([k,v]) => (
                <div key={k} className="rounded border border-white/10 bg-black/20 p-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
                  <div className="font-mono">{typeof v === "number" ? v : v}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Bid comparison · LD-9821</h3>
          <div className="mt-2 space-y-1 text-sm">
            {MARKETPLACE_BIDS.map((b,i) => (
              <div key={b.id} className={`flex items-center justify-between rounded border p-2 ${i===0 ? "border-emerald-400/30 bg-emerald-500/5" : "border-white/10 bg-black/20"}`}>
                <div>{b.carrier} <span className="text-xs text-muted-foreground">ETA {b.eta} · perf {b.perf} · comp {b.compliance}</span></div>
                <div className="flex items-center gap-2">
                  {i===0 && <Badge variant="outline" className="border-emerald-400/40 text-emerald-300 text-[10px]">recommended</Badge>}
                  <div className="font-mono">${b.rate}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Open disputes</h3>
            <ul className="mt-2 space-y-1 text-sm">{CARRIER_DISPUTES.map(d => (
              <li key={d.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
                <span>{d.carrier} · {d.load} — {d.reason}</span>
                <Badge variant="outline" className="border-white/15">{d.status}</Badge>
              </li>))}
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold text-amber-300">Suspensions</h3>
            <ul className="mt-2 space-y-1 text-sm">{SUSPENSIONS.map(s => (
              <li key={s.id} className="rounded border border-amber-500/20 bg-amber-500/5 p-2">
                <div className="flex justify-between"><span className="font-medium">{s.carrier}</span><span className="text-xs">review {s.review}</span></div>
                <div className="text-xs text-muted-foreground">{s.reason} · since {s.since}</div>
              </li>))}
            </ul>
          </Card>
        </div>
      </V4Page>
    );
  },
});
