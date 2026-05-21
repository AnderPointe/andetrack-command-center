import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EDI_DOCS, EDI_PRODUCTION_CHECKLIST, EDI_CONTROL_NUMBERS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/edi")({
  head: () => ({ meta: [{ title: "Production EDI · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Network className="size-6 text-emerald-300" />} title="Production EDI Dashboard" blurb="Production-ready EDI foundation: 204/990/214/210/997 supported, with 211/212/856 placeholders. Trading partners, mappings, control numbers, retries, and full audit trail.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Supported documents</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {EDI_DOCS.map((d) => (
            <Badge key={d} variant="outline" className={["211","212","856"].includes(d) ? "border-amber-500/30 text-amber-300" : "border-emerald-500/30 text-emerald-300"}>
              EDI {d}{["211","212","856"].includes(d) ? " · placeholder" : ""}
            </Badge>
          ))}
        </div>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Production activation checklist</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {EDI_PRODUCTION_CHECKLIST.map((c) => (
              <li key={c.id} className="flex items-center gap-2">
                <span className={c.done ? "text-emerald-400" : "text-amber-400"}>{c.done ? "✓" : "○"}</span>
                <span className={c.done ? "" : "text-muted-foreground"}>{c.label}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Control numbers</h2>
          <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-muted-foreground">Inbound</div>
              <div className="font-mono text-lg">{EDI_CONTROL_NUMBERS.inbound.last}</div>
              <div className="text-xs text-muted-foreground">gap {EDI_CONTROL_NUMBERS.inbound.gap} · dupes {EDI_CONTROL_NUMBERS.inbound.dupes}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-muted-foreground">Outbound</div>
              <div className="font-mono text-lg">{EDI_CONTROL_NUMBERS.outbound.last}</div>
              <div className="text-xs text-muted-foreground">gap {EDI_CONTROL_NUMBERS.outbound.gap} · dupes {EDI_CONTROL_NUMBERS.outbound.dupes}</div>
            </div>
          </div>
        </Card>
      </div>
    </V25Page>
  ),
});
