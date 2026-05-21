import { createFileRoute } from "@tanstack/react-router";
import { Apple } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CARPLAY_CHECKLIST, CARPLAY_ENTITLEMENT, CARPLAY_TEMPLATES } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/carplay")({
  head: () => ({ meta: [{ title: "CarPlay Planning · Anderoute V3" }] }),
  component: () => {
    const done = CARPLAY_CHECKLIST.filter((c) => c.status === "in_progress").length;
    const readiness = Math.round((done / CARPLAY_CHECKLIST.length) * 100);
    return (
      <V3Page icon={<Apple className="size-6 text-sky-300" />} title="CarPlay Planning"
        blurb="Native iOS module planning. Requires Apple CarPlay entitlement — no production claim until Apple approves.">
        <Card className="border-amber-500/30 bg-amber-500/[0.04] p-4 text-sm">
          <div className="flex items-center justify-between">
            <strong className="text-amber-200">Entitlement status</strong>
            <Badge variant="outline" className="border-amber-500/40 text-amber-300">{CARPLAY_ENTITLEMENT.status.replaceAll("_", " ")}</Badge>
          </div>
          <p className="mt-1 text-muted-foreground">Reviewed {CARPLAY_ENTITLEMENT.reviewed_at}. {CARPLAY_ENTITLEMENT.notes}</p>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Readiness</h2><Badge variant="outline" className="border-sky-500/40 text-sky-300">{readiness}%</Badge></div>
          <Progress value={readiness} className="mt-3 h-1.5" />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Feature checklist</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {CARPLAY_CHECKLIST.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
                <span>{c.item}</span>
                <Badge variant="outline" className={c.status === "in_progress" ? "border-sky-500/40 text-sky-300" : "border-amber-500/40 text-amber-300"}>{c.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">CarPlay template mapping</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Template</th><th className="p-1">Anderoute use</th><th className="p-1">Status</th></tr></thead>
            <tbody>{CARPLAY_TEMPLATES.map((t) => (
              <tr key={t.template} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{t.template}</td><td className="p-1 text-muted-foreground">{t.anderoute_use}</td><td className="p-1"><Badge variant="outline" className={t.status === "in_progress" ? "border-sky-500/40 text-sky-300" : "border-amber-500/40 text-amber-300"}>{t.status}</Badge></td></tr>
            ))}</tbody>
          </table>
        </Card>
      </V3Page>
    );
  },
});
