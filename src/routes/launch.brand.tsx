import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND_TOKENS } from "@/launch/data/mockLaunch";
import { Palette } from "lucide-react";

export const Route = createFileRoute("/launch/brand")({
  head: () => ({ meta: [{ title: "Brand System — Anderoute" }] }),
  component: Brand,
});

const SWATCHES = [
  { name: "Teal (primary)",  className: "bg-teal-500" },
  { name: "Orange (accent)", className: "bg-orange-500" },
  { name: "Violet (AI)",     className: "bg-violet-500" },
  { name: "Rose (risk)",     className: "bg-rose-500" },
  { name: "Emerald (good)",  className: "bg-emerald-500" },
  { name: "Amber (watch)",   className: "bg-amber-500" },
  { name: "Slate (chrome)",  className: "bg-slate-700" },
  { name: "Background",      className: "bg-background border border-white/10" },
];

function Brand() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Brand</Badge>
          <div className="flex items-center gap-3">
            <Palette className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Brand System</h1>
          </div>
          <LaunchNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Color tokens</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            {SWATCHES.map((s) => (
              <div key={s.name} className="rounded border border-white/10 bg-white/[0.01] p-3">
                <div className={`h-12 rounded ${s.className}`} />
                <div className="mt-2 text-xs">{s.name}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Design tokens</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {BRAND_TOKENS.map((t) => (
              <div key={t.token} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/[0.01] p-3 text-sm">
                <div>
                  <code className="text-teal-200">{t.token}</code>
                  <div className="text-xs text-muted-foreground">{t.note}</div>
                </div>
                <span className="text-xs text-muted-foreground">{t.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Component showcase</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="outline">Outline</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
            <Button size="sm" variant="destructive">Destructive</Button>
            <Badge>Default</Badge>
            <Badge variant="outline" className="border-teal-500/30 text-teal-200">Teal</Badge>
            <Badge variant="outline" className="border-violet-500/30 text-violet-200">AI</Badge>
            <Badge variant="outline" className="border-rose-500/30 text-rose-200">Risk</Badge>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          White-label: customers can override primary, accent, and logo. AI (violet) and risk (rose) accents stay
          consistent across tenants for safety + recognition.
        </Card>
      </div>
    </AppShell>
  );
}
