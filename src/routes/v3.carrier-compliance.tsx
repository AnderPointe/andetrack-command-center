import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CARRIER_COMPLIANCE } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/carrier-compliance")({
  head: () => ({ meta: [{ title: "Carrier Compliance · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<ClipboardCheck className="size-6 text-sky-300" />} title="Carrier Compliance"
      blurb="Placeholder tracking for authority, insurance, equipment, safety rating, W-9, and contract documents. No DOT / FMCSA automation yet.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Carrier</th><th className="p-2">Item</th><th className="p-2">Status</th><th className="p-2">Expires</th></tr></thead>
          <tbody>{CARRIER_COMPLIANCE.map((c) => (
            <tr key={c.id} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{c.carrier}</td><td className="p-2">{c.item}</td><td className="p-2"><Badge variant="outline" className={c.status === "ok" ? "border-emerald-500/40 text-emerald-300" : c.status === "missing" ? "border-rose-500/40 text-rose-300" : "border-amber-500/40 text-amber-300"}>{c.status}</Badge></td><td className="p-2 text-xs text-muted-foreground">{c.expires ?? "—"}</td></tr>
          ))}</tbody></table>
      </Card>
    </V3Page>
  ),
});
