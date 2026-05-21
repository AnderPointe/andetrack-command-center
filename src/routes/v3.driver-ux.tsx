import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";

const PRINCIPLES = [
  "Large readable text", "Low distraction", "One-tap actions", "Voice-first actions",
  "Clear next step", "Minimal dashboard clutter", "Strong offline visibility",
  "Privacy always visible", "Dispatch contact always available", "Emergency / report issue always available",
];

const FLOWS = [
  { id: "shift",   name: "Start of shift",  steps: ["Open app","Confirm vehicle","Review next 3 stops","Tap 'Start route'"] },
  { id: "arrive",  name: "Arrive at pickup",steps: ["Geofence trigger","Tap 'Arrived'","Confirm BOL","Mark loaded"] },
  { id: "deliver", name: "Deliver",         steps: ["Geofence trigger","Tap 'Arrived'","Capture POD photo","Mark delivered"] },
  { id: "issue",   name: "Report issue",    steps: ["Hold push-to-talk","Describe issue","Confirm + send","Dispatcher acks"] },
  { id: "eod",     name: "End of day",      steps: ["Review shift summary","Confirm hours","Tap 'Off duty'","Sync queue"] },
];

export const Route = createFileRoute("/v3/driver-ux")({
  head: () => ({ meta: [{ title: "Driver UX · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Sparkles className="size-6 text-sky-300" />} title="Advanced Driver UX"
      blurb="Driver-first design principles, workflow timelines, and end-of-day checklist patterns for the native shell.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Principles</h2>
        <ul className="mt-2 grid grid-cols-2 gap-1.5 text-sm md:grid-cols-3">
          {PRINCIPLES.map((p) => (<li key={p} className="rounded border border-white/10 bg-black/20 px-2 py-1">{p}</li>))}
        </ul>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {FLOWS.map((f) => (
          <Card key={f.id} className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">{f.name}</h3>
            <ol className="mt-2 space-y-1 text-sm text-muted-foreground">
              {f.steps.map((s, i) => (<li key={i}><span className="mr-2 font-mono text-xs text-sky-300">{i + 1}.</span>{s}</li>))}
            </ol>
          </Card>
        ))}
      </div>
    </V3Page>
  ),
});
