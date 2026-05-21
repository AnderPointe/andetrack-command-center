import { createFileRoute } from "@tanstack/react-router";
import { Car } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ANDROID_AUTO, ANDROID_AUTO_SAFETY } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/android-auto")({
  head: () => ({ meta: [{ title: "Android Auto Execution · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Car className="size-6 text-sky-300" />} title="Android Auto Execution Tracker"
      blurb="Native Android module, Android for Cars App Library, navigation template, safety review, voice rules, Desktop Head Unit testing and app review. Approval is pending.">
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Execution checklist</h3>
          <ul className="mt-2 space-y-1 text-sm">{ANDROID_AUTO.map((a,i) => (
            <li key={i} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
              <span>{a.item}</span>
              <Badge variant="outline" className={a.status === "blocked" ? "border-amber-400/40 text-amber-300" : "border-white/15"}>{a.status}</Badge>
            </li>))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Driver safety checks</h3>
          <ul className="mt-2 space-y-1 text-sm">{ANDROID_AUTO_SAFETY.map((s,i) => (
            <li key={i} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
              <span>{s.check}</span>
              <Badge variant="outline" className={s.status === "pass" ? "border-emerald-400/40 text-emerald-300" : "border-sky-400/40 text-sky-300"}>{s.status}</Badge>
            </li>))}
          </ul>
        </Card>
      </div>
    </V4Page>
  ),
});
