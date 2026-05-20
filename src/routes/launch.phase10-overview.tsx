import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket, Megaphone, Presentation, FileText, Tag, ClipboardCheck,
  BookOpen, Users, HeartPulse, LifeBuoy, Map,
} from "lucide-react";

export const Route = createFileRoute("/launch/phase10-overview")({
  head: () => ({ meta: [{ title: "Phase 10 Overview — Anderoute Launch" }] }),
  component: Phase10Overview,
});

const AREAS = [
  { to: "/launch/marketing",     icon: Megaphone,     area: "Product Positioning", result: "Clear Anderoute story and market message",       tone: "teal"    },
  { to: "/launch/marketing",     icon: Megaphone,     area: "Marketing Site",      result: "Homepage and platform page structure",            tone: "blue"    },
  { to: "/launch/demo",          icon: Presentation,  area: "Demo Mode",           result: "Guided customer/investor demo flow",              tone: "violet"  },
  { to: "/launch/sales",         icon: FileText,      area: "Sales Materials",     result: "One-pagers, demo scripts, collateral",            tone: "indigo"  },
  { to: "/launch/pricing",       icon: Tag,           area: "Pricing",             result: "Tiered SaaS pricing strategy",                    tone: "emerald" },
  { to: "/launch/onboarding",    icon: ClipboardCheck,area: "Onboarding",          result: "Company, driver, vehicle, and customer setup",    tone: "teal"    },
  { to: "/launch/documentation", icon: BookOpen,      area: "Documentation",       result: "Help center and product docs",                    tone: "slate"   },
  { to: "/launch/pilot",         icon: Users,         area: "Pilot Program",       result: "30/60/90-day pilot structure",                    tone: "amber"   },
  { to: "/launch/success",       icon: HeartPulse,    area: "Customer Success",    result: "Health scores, adoption, training",               tone: "rose"    },
  { to: "/launch/support",       icon: LifeBuoy,      area: "Support",             result: "Ticketing and knowledge base placeholders",       tone: "orange"  },
  { to: "/launch/roadmap",       icon: Map,           area: "Roadmap",             result: "Feature planning and release notes",              tone: "indigo"  },
  { to: "/launch/overview",      icon: Rocket,        area: "Launch Center",       result: "Readiness score and checklist",                   tone: "teal"    },
] as const;

const TONE: Record<string, string> = {
  rose: "border-rose-500/30 text-rose-300",
  violet: "border-violet-500/30 text-violet-300",
  indigo: "border-indigo-500/30 text-indigo-300",
  blue: "border-blue-500/30 text-blue-300",
  teal: "border-teal-500/30 text-teal-300",
  emerald: "border-emerald-500/30 text-emerald-300",
  amber: "border-amber-500/30 text-amber-300",
  orange: "border-orange-500/30 text-orange-300",
  slate: "border-slate-500/30 text-slate-300",
};

function Phase10Overview() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Mock / demo</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Rocket className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Phase 10 — Final Product Packaging & Launch</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Package Anderoute for customers, owners, and investors: positioning, marketing,
            guided demo, pricing, onboarding, pilot program, success, support, roadmap,
            and a single launch readiness command center.
          </p>
          <LaunchNav />
        </header>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(({ to, icon: Icon, area, result, tone }) => (
            <Link key={area} to={to}>
              <Card className={`h-full border bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] ${TONE[tone]}`}>
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <h3 className="text-sm font-medium text-foreground">{area}</h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{result}</p>
              </Card>
            </Link>
          ))}
        </section>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Builds on Phases 1–9. Phase 11 will turn this packaging into a real implementation
          sprint: MVP cutline, backlog, technical debt cleanup, and the first pilot launch.
        </Card>
      </div>
    </AppShell>
  );
}
