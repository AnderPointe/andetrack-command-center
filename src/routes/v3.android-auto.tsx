import { createFileRoute } from "@tanstack/react-router";
import { Car } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ANDROID_AUTO_CHECKLIST, ANDROID_AUTO_SAFETY, ANDROID_AUTO_TEMPLATES } from "@/v3/data/mockPhase19";

function score(items: { status: string }[]) {
  const done = items.filter((i) => i.status === "in_progress" || i.status === "done" || i.status === "enforced").length;
  return Math.round((done / items.length) * 100);
}

export const Route = createFileRoute("/v3/android-auto")({
  head: () => ({ meta: [{ title: "Android Auto Planning · Anderoute V3" }] }),
  component: () => {
    const readiness = score(ANDROID_AUTO_CHECKLIST);
    return (
      <V3Page icon={<Car className="size-6 text-sky-300" />} title="Android Auto Planning"
        blurb="Native Android module planning. No certification claim — final approval requires Google Android for Cars review.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Readiness</h2>
            <Badge variant="outline" className="border-sky-500/40 text-sky-300">{readiness}%</Badge>
          </div>
          <Progress value={readiness} className="mt-3 h-1.5" />
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Feature checklist</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {ANDROID_AUTO_CHECKLIST.map((c) => (
                <li key={c.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
                  <span>{c.item}</span>
                  <Badge variant="outline" className={c.status === "in_progress" ? "border-sky-500/40 text-sky-300" : "border-amber-500/40 text-amber-300"}>{c.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Driver safety review</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {ANDROID_AUTO_SAFETY.map((c) => (
                <li key={c.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
                  <span>{c.rule}</span>
                  <Badge variant="outline" className={c.status === "enforced" ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>{c.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Car App Library template mapping</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Template</th><th className="p-1">Anderoute use</th><th className="p-1">Status</th></tr></thead>
            <tbody>{ANDROID_AUTO_TEMPLATES.map((t) => (
              <tr key={t.template} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{t.template}</td><td className="p-1 text-muted-foreground">{t.anderoute_use}</td><td className="p-1"><Badge variant="outline" className={t.status === "in_progress" ? "border-sky-500/40 text-sky-300" : "border-amber-500/40 text-amber-300"}>{t.status}</Badge></td></tr>
            ))}</tbody>
          </table>
        </Card>
        <Card className="border-amber-500/30 bg-amber-500/[0.04] p-4 text-sm">
          <strong className="text-amber-200">Template preview placeholder.</strong>
          <p className="mt-1 text-muted-foreground">NavigationTemplate + MapWithContentTemplate render in the native Android module only. The web app cannot render Car App Library templates. See <code>docs/mobile/android-auto-plan.md</code>.</p>
        </Card>
      </V3Page>
    );
  },
});
