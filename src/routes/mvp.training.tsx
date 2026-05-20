import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/mvp/training")({
  head: () => ({ meta: [{ title: "Pilot Training — Anderoute" }] }),
  component: Training,
});

const SESSIONS = [
  { audience: "Company admin",     length: "60 min", focus: "Setup, users, drivers, vehicles, customers" },
  { audience: "Dispatcher",         length: "90 min", focus: "Command Center, load creation, live map, alerts" },
  { audience: "Driver (mobile)",    length: "30 min", focus: "Login, permissions, offer flow, status updates, POD" },
  { audience: "Customer portal",    length: "20 min", focus: "Tracking, POD, support" },
  { audience: "Support / escalation",length:"45 min", focus: "Issue triage, escalation path, weekly check-ins" },
];

const MATERIALS = [
  "Quick start guides (per role)",
  "Driver one-page guide",
  "Dispatcher one-page guide",
  "Customer portal guide",
  "Video script placeholders",
  "FAQ",
  "Troubleshooting guide",
];

function Training() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Training</Badge>
          <div className="flex items-center gap-3">
            <GraduationCap className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Pilot Training Plan</h1>
          </div>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Sessions</h3>
          <div className="mt-3 divide-y divide-white/5 text-sm">
            {SESSIONS.map((s) => (
              <div key={s.audience} className="grid grid-cols-12 items-center gap-2 py-2">
                <div className="col-span-3 text-cyan-200">{s.audience}</div>
                <div className="col-span-2 text-xs text-muted-foreground">{s.length}</div>
                <div className="col-span-7">{s.focus}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Materials</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {MATERIALS.map((m) => <Badge key={m} variant="outline" className="border-white/15">{m}</Badge>)}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
