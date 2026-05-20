import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { HELP_TOPICS } from "@/launch/data/mockLaunch";
import { BookOpen, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/launch/documentation")({
  head: () => ({ meta: [{ title: "Documentation — Anderoute" }] }),
  component: Documentation,
});

const SECTIONS = [
  { name: "Getting Started",      pages: ["Quickstart for dispatchers", "Quickstart for drivers", "Quickstart for customers"] },
  { name: "Dispatcher Guide",     pages: ["Create a load", "Assign a driver", "Send a load offer", "Manage exceptions"] },
  { name: "Driver App Guide",     pages: ["Install the driver app", "Accept a load", "Use EliteNav", "Capture POD"] },
  { name: "Customer Portal Guide",pages: ["Submit a request", "Track a shipment", "Download POD"] },
  { name: "Admin Guide",          pages: ["Invite users", "Configure roles", "Set up notifications", "Branding & white-label"] },
  { name: "Billing Guide",        pages: ["Plans & usage", "Invoices", "Update payment method"] },
  { name: "Integrations Guide",   pages: ["EDI 204/214", "Webhooks", "REST API", "Broker connectors"] },
  { name: "API Guide",            pages: ["Auth", "Loads", "Drivers", "Tracking events"] },
  { name: "Security Guide",       pages: ["Tenant isolation", "RLS model", "Audit logs", "Data retention"] },
  { name: "Compliance Guide",     pages: ["SOC 2 readiness", "Privacy controls", "Driver consent"] },
  { name: "CoPilot AI Guide",     pages: ["How CoPilot works", "Approval workflow", "Cost controls"] },
  { name: "Troubleshooting",      pages: ["GPS issues", "Push notifications", "Login problems"] },
  { name: "Release Notes",        pages: ["Latest releases", "Version history"] },
];

function Documentation() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Docs</Badge>
          <div className="flex items-center gap-3">
            <BookOpen className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Product Documentation Hub</h1>
          </div>
          <LaunchNav />
        </header>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <Card key={s.name} className="border-white/10 bg-white/[0.02] p-4">
              <h3 className="text-sm font-medium text-teal-200">{s.name}</h3>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {s.pages.map((p) => <li key={p}>· {p}</li>)}
              </ul>
            </Card>
          ))}
        </section>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          In-app help: Help Center drawer, contextual help cards, product tour, tooltips, feedback widget,
          bug report, feature request, release notes drawer. Scaffolded — wired to mock data.
        </Card>
      </div>
    </AppShell>
  );
}
