import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Building2, Users, Flag, Activity } from "lucide-react";

export const Route = createFileRoute("/admin/platform")({
  head: () => ({ meta: [{ title: "Platform Admin — Anderoute" }] }),
  component: PlatformAdmin,
});

const FLAGS = [
  { key: "copilot", label: "CoPilot AI", on: true },
  { key: "customer_portal", label: "Customer Portal", on: true },
  { key: "billing", label: "Billing UI", on: true },
  { key: "advanced_reports", label: "Advanced reports", on: false },
  { key: "cdl_validation", label: "CDL validation", on: true },
  { key: "push_notifications", label: "Push notifications", on: true },
  { key: "android_auto", label: "Android Auto (future)", on: false },
  { key: "carplay", label: "CarPlay (future)", on: false },
  { key: "usage_billing", label: "Usage-based billing", on: false },
  { key: "white_label_portal", label: "White-label portal", on: false },
];

function PlatformAdmin() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Platform Admin</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Companies, feature flags, support sessions, audit logs.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Companies", value: "1", icon: Building2 },
            { label: "Platform users", value: "3", icon: Users },
            { label: "Active flags", value: "6", icon: Flag },
            { label: "Open support sessions", value: "0", icon: Activity },
          ].map((k) => (
            <Card key={k.label} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</span>
                <k.icon className="size-4 text-teal-300" />
              </div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{k.value}</div>
            </Card>
          ))}
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Feature flags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {FLAGS.map((f) => (
              <label key={f.key} className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.02] px-3 py-2">
                <span className="text-sm">{f.label}</span>
                <Switch defaultChecked={f.on} />
              </label>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Audit log</h2>
          <div className="text-xs text-muted-foreground">Recent platform-wide actions appear here. Backed by audit_log_events.</div>
        </Card>
      </div>
    </AppShell>
  );
}
