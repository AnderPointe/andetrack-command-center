import { createFileRoute } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DRIVER_SCREENS, DRIVER_PERMISSIONS, DRIVER_NEXT_ACTIONS } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/driver-app")({
  head: () => ({ meta: [{ title: "Native Driver App · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Smartphone className="size-6 text-sky-300" />} title="Native Driver App Expansion"
      blurb="React Native shell scaffolding for the V3 driver app — screens, permissions, next-best action engine, and app health.">
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Screens</h2>
          <ul className="mt-2 grid grid-cols-2 gap-1.5 text-sm">
            {DRIVER_SCREENS.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1">
                <span>{s.label}</span>
                <Badge variant="outline" className="border-white/15 text-[10px]">{s.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Device permissions</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {DRIVER_PERMISSIONS.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
                <span>{p.label}{p.required && <span className="ml-1 text-xs text-amber-300">required</span>}</span>
                <Badge variant="outline" className={p.status === "granted" ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>{p.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Driver next-best action engine</h2>
        <ul className="mt-2 space-y-1.5 text-sm">
          {DRIVER_NEXT_ACTIONS.map((a) => (
            <li key={a.id} className="rounded border border-white/10 bg-black/20 p-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">#{a.priority} — {a.action}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{a.reason}</p>
            </li>
          ))}
        </ul>
      </Card>
    </V3Page>
  ),
});
