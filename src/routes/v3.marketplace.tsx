import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MARKETPLACE_LOADS, CARRIER_BIDS } from "@/v3/data/mockPhase19";

const WORKFLOW = [
  "Company posts load","Eligible carriers shown","Carrier views load","Carrier submits bid or accepts",
  "Dispatcher reviews carriers","Dispatcher awards load","Carrier receives details","Tracking begins",
  "Customer sees status","Settlement placeholder",
];

export const Route = createFileRoute("/v3/marketplace")({
  head: () => ({ meta: [{ title: "Carrier Marketplace · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Truck className="size-6 text-sky-300" />} title="Carrier Marketplace Foundation"
      blurb="Foundation for posting loads, gathering carrier bids, and awarding shipments. Production liquidity + settlement remain deferred.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Workflow</h2>
        <ol className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">{WORKFLOW.map((s, i) => (
          <li key={i} className="rounded border border-white/10 bg-black/20 px-2 py-1"><span className="mr-2 font-mono text-xs text-sky-300">{i + 1}.</span>{s}</li>
        ))}</ol>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Posted loads</h3>
          <table className="mt-2 w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Lane</th><th className="p-1">Eq</th><th className="p-1">Rate</th><th className="p-1">Bids</th><th className="p-1">Status</th></tr></thead>
            <tbody>{MARKETPLACE_LOADS.map((l) => (
              <tr key={l.id} className="border-t border-white/10"><td className="p-1">{l.origin} → {l.dest}</td><td className="p-1 text-xs text-muted-foreground">{l.equipment}</td><td className="p-1 font-mono">${l.rate}</td><td className="p-1 font-mono">{l.bids}</td><td className="p-1"><Badge variant="outline" className={l.status === "awarded" ? "border-emerald-500/40 text-emerald-300" : "border-sky-500/40 text-sky-300"}>{l.status}</Badge></td></tr>
            ))}</tbody></table>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Bids</h3>
          <table className="mt-2 w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Load</th><th className="p-1">Carrier</th><th className="p-1">Amount</th><th className="p-1">ETA</th><th className="p-1">Status</th></tr></thead>
            <tbody>{CARRIER_BIDS.map((b) => (
              <tr key={b.id} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{b.load}</td><td className="p-1 font-mono text-xs">{b.carrier}</td><td className="p-1 font-mono">${b.amount}</td><td className="p-1">{b.eta}</td><td className="p-1"><Badge variant="outline" className={b.status === "won" ? "border-emerald-500/40 text-emerald-300" : "border-sky-500/40 text-sky-300"}>{b.status}</Badge></td></tr>
            ))}</tbody></table>
        </Card>
      </div>
    </V3Page>
  ),
});
