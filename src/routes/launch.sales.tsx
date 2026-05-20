import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COLLATERAL, ICP, DISCOVERY_QUESTIONS } from "@/launch/data/mockLaunch";
import { Sparkles, FileText, Target, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/launch/sales")({
  head: () => ({ meta: [{ title: "Sales Kit — Anderoute" }] }),
  component: Sales,
});

const DEMOS = [
  { length: "5 min",  hook: "Show one realtime load go from request → POD." },
  { length: "15 min", hook: "Full dispatch → driver → customer → AI risk → POD flow." },
  { length: "30 min", hook: "Add integrations, security, executive intelligence." },
  { length: "60 min", hook: "Deep-dive with role-based persona walkthroughs + Q&A." },
];

const OBJECTIONS = [
  ["We already use a TMS.",            "Anderoute sits next to your TMS or replaces it. Most customers run us alongside for realtime + driver + customer; we sync via API/EDI."],
  ["Our drivers use Google Maps.",     "Google Maps doesn't know truck restrictions, doesn't talk to dispatch, and doesn't capture POD. EliteNav does all three."],
  ["We don't want driver tracking issues.","Drivers opt in. Location captured only on duty. Privacy Center gives drivers full visibility + retention controls."],
  ["AI sounds risky.",                  "Every AI suggestion is explainable, audited, and requires human approval before any customer-facing action."],
  ["How secure is this?",               "SOC 2-ready, RLS-enforced multi-tenant isolation, full audit trail, tenant data retention controls."],
  ["Can it support CDL and Non-CDL?",   "Yes — vehicle types, equipment, and routing rules cover everything from cargo vans to Class 8."],
  ["Can customers track shipments?",    "Yes — branded customer portal with self-serve tracking links, POD, and notifications."],
  ["Can it integrate with our systems?","Yes — REST API, webhooks, EDI 204/214, broker + TMS connectors via the Integration Hub."],
  ["What does implementation look like?","2–6 weeks. Wizards for data import. Weekly check-ins. Defined go-live checklist."],
  ["How much does it cost?",            "Per-driver pricing across four tiers. Pilot pricing available. ROI calculator runs the numbers with your inputs."],
];

function Sales() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Sales</Badge>
          <div className="flex items-center gap-3">
            <Sparkles className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Sales Kit</h1>
          </div>
          <LaunchNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="flex items-center gap-2 text-sm font-medium"><Target className="size-4 text-teal-300" /> Ideal customer profile</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3 text-xs">
            <Block title="Best fit" tone="emerald" items={ICP.bestFit} />
            <Block title="Not a fit" tone="rose"    items={ICP.notFit} />
            <Block title="Buying triggers" tone="teal" items={ICP.triggers} />
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="flex items-center gap-2 text-sm font-medium"><HelpCircle className="size-4 text-teal-300" /> Discovery questions</h2>
          <ol className="mt-3 list-decimal pl-5 text-xs text-muted-foreground space-y-1">
            {DISCOVERY_QUESTIONS.map((q) => <li key={q}>{q}</li>)}
          </ol>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Demo lengths</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            {DEMOS.map((d) => (
              <div key={d.length} className="rounded border border-white/10 bg-white/[0.01] p-3">
                <div className="text-sm font-medium text-teal-200">{d.length}</div>
                <p className="mt-1 text-xs text-muted-foreground">{d.hook}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Collateral library</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {COLLATERAL.map((c) => (
              <div key={c.title} className="rounded border border-white/10 bg-white/[0.01] p-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 size-4 text-teal-300" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.audience}</div>
                    <p className="mt-1 text-xs">{c.value}</p>
                    <Button size="sm" variant="outline" className="mt-3">{c.cta}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Objection handling</h2>
          <div className="mt-3 space-y-2">
            {OBJECTIONS.map(([q, a]) => (
              <details key={q} className="rounded border border-white/10 bg-white/[0.01] p-3 text-sm">
                <summary className="cursor-pointer font-medium">{q}</summary>
                <p className="mt-2 text-xs text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

const TONES: Record<string, string> = {
  emerald: "border-emerald-500/30 text-emerald-200",
  rose:    "border-rose-500/30 text-rose-200",
  teal:    "border-teal-500/30 text-teal-200",
};

function Block({ title, tone, items }: { title: string; tone: string; items: string[] }) {
  return (
    <div className={`rounded border bg-white/[0.01] p-3 ${TONES[tone]}`}>
      <div className="text-xs font-medium uppercase tracking-wider">{title}</div>
      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
        {items.map((i) => <li key={i}>· {i}</li>)}
      </ul>
    </div>
  );
}
