import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POSITIONING, TAGLINES, VALUE_PILLARS, PROOF_POINTS } from "@/launch/data/mockLaunch";
import { Megaphone } from "lucide-react";

export const Route = createFileRoute("/launch/marketing")({
  head: () => ({ meta: [{ title: "Marketing Site — Anderoute" }] }),
  component: Marketing,
});

const PAGES = [
  "Home", "Platform", "Anderoute EliteNav", "Anderoute CoPilot",
  "Dispatch Command Center", "Live GPS Tracking", "Customer Portal",
  "AI Operations Intelligence", "Integrations", "Security",
  "Pricing", "Demo", "Resources", "Contact",
];

const HOME_SECTIONS: { title: string; copy: string }[] = [
  { title: "Hero",            copy: `${POSITIONING.tagline} — ${POSITIONING.oneLiner}` },
  { title: "Problem",         copy: "Dispatch teams juggle 5+ tools. Drivers use consumer GPS. Customers call all day. There’s no single source of truth — until now." },
  { title: "Platform overview", copy: "One command layer for dispatch, drivers, customers, and AI. Built realtime-first, with truck-aware routing and explainable AI." },
  { title: "Live dispatch",   copy: "Run every load from one realtime board. See every driver, every shipment, every exception — instantly." },
  { title: "Driver navigation", copy: "Anderoute EliteNav is truck-aware turn-by-turn navigation drivers actually want to use." },
  { title: "Customer visibility", copy: "Self-serve tracking, branded portal, POD on tap. Stop the status-call avalanche." },
  { title: "AI intelligence", copy: "CoPilot predicts delays, drafts customer updates, and recommends the next best action — with full audit trail." },
  { title: "Integrations",    copy: "EDI 204/214, REST API, webhooks, broker + TMS connectors. Connect the systems you already run." },
  { title: "Security",        copy: "SOC 2-ready. RLS-enforced. Tenant-isolated. Every AI action audited." },
  { title: "Pricing preview", copy: "Starter, Professional, Fleet Command, Enterprise. Start with a structured 30/60/90-day pilot." },
  { title: "Demo CTA",        copy: "See the full flow in 15 minutes — customer request → dispatch → driver → POD → executive summary." },
  { title: "Footer",          copy: "Anderoute · EliteNav · CoPilot · Legal · Security · Status · Docs · Contact" },
];

function Marketing() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Marketing</Badge>
          <div className="flex items-center gap-3">
            <Megaphone className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Marketing Website Structure</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Site map, homepage copy, positioning, and 25 tagline options. Tone: professional, premium, logistics-specific.
          </p>
          <LaunchNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Positioning</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Tagline</div>
              <p className="mt-1 text-lg font-semibold text-teal-200">{POSITIONING.tagline}</p>
              <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">One-liner</div>
              <p className="mt-1 text-sm">{POSITIONING.oneLiner}</p>
              <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">Elevator pitch</div>
              <p className="mt-1 text-sm text-muted-foreground">{POSITIONING.elevator}</p>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="uppercase tracking-wider text-muted-foreground">Pains</div>
                <ul className="mt-1 list-disc pl-4 text-muted-foreground">{POSITIONING.pains.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
              <div>
                <div className="uppercase tracking-wider text-muted-foreground">Solutions</div>
                <ul className="mt-1 list-disc pl-4 text-muted-foreground">{POSITIONING.solutions.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div>
                <div className="uppercase tracking-wider text-muted-foreground">Advantages</div>
                <ul className="mt-1 list-disc pl-4 text-muted-foreground">{POSITIONING.advantages.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Value pillars</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {VALUE_PILLARS.map((p) => (
              <div key={p.title} className="rounded border border-white/10 bg-white/[0.01] p-3">
                <div className="text-sm font-medium text-teal-200">{p.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{p.copy}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-transparent p-5">
          <h2 className="text-sm font-medium">Proof points <span className="text-xs text-amber-300">(illustrative targets)</span></h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF_POINTS.map((p) => (
              <div key={p.label} className="rounded border border-white/10 bg-white/[0.02] p-3">
                <div className="text-2xl font-semibold text-teal-200">{p.stat}</div>
                <div className="text-sm font-medium">{p.label}</div>
                <div className="text-xs text-muted-foreground">{p.note}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Site map</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {PAGES.map((p) => <Badge key={p} variant="outline" className="border-white/15">{p}</Badge>)}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Homepage sections + draft copy</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {HOME_SECTIONS.map((s) => (
              <div key={s.title} className="rounded border border-white/10 bg-white/[0.01] p-3">
                <div className="text-xs uppercase tracking-wider text-teal-300">{s.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{s.copy}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">25 tagline options</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {TAGLINES.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/[0.01] p-3 text-sm">
                <span>{t.text}</span>
                <Badge variant="outline" className="border-white/15 text-xs">{t.style}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
