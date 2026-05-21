import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PACKET_SECTIONS, VENDOR_PACKETS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/vendor-packet")({
  head: () => ({ meta: [{ title: "Vendor Review Packet · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<FileText className="size-6 text-amber-300" />} title="Vendor Review Packet Builder"
      blurb="Assemble customer-ready vendor review packets. Publishing requires explicit human approval.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Packet sections</h3>
        <ol className="mt-2 grid gap-1 text-sm md:grid-cols-2">{PACKET_SECTIONS.map((s, i) => (
          <li key={s} className="rounded border border-white/10 bg-black/20 px-2 py-1"><span className="mr-2 font-mono text-xs text-amber-300">{i + 1}.</span>{s}</li>
        ))}</ol>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Customer packets</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Customer</th><th className="p-1">Sections</th><th className="p-1">Status</th></tr></thead>
          <tbody>{VENDOR_PACKETS.map((p) => (
            <tr key={p.id} className="border-t border-white/10"><td className="p-1">{p.customer}</td><td className="p-1 font-mono">{p.sections_complete}/12</td><td className="p-1"><Badge variant="outline" className={p.status === "ready" ? "border-emerald-500/40 text-emerald-300" : "border-sky-500/40 text-sky-300"}>{p.status}</Badge></td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
