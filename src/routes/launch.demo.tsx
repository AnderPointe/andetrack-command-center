import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DEMO_STEPS, DEMO_PERSONAS, DEMO_KEY_MOMENTS } from "@/launch/data/mockLaunch";
import { PlayCircle, RotateCcw, ChevronLeft, ChevronRight, Star } from "lucide-react";

export const Route = createFileRoute("/launch/demo")({
  head: () => ({ meta: [{ title: "Demo Mode — Anderoute" }] }),
  component: DemoMode,
});

function DemoMode() {
  const [persona, setPersona] = useState<string>("dispatcher");
  const [step, setStep] = useState(0);
  const current = DEMO_STEPS[step];
  const pct = Math.round(((step + 1) / DEMO_STEPS.length) * 100);

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Demo Mode</Badge>
          <div className="flex items-center gap-3">
            <PlayCircle className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Guided Anderoute Demo</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            End-to-end logistics flow — customer request → dispatch → driver → CoPilot → POD → exec summary.
            All data is mock and safe to reset.
          </p>
          <LaunchNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Persona</div>
          <div className="flex flex-wrap gap-2">
            {DEMO_PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  persona === p.id
                    ? "border-teal-400/50 bg-teal-500/10 text-teal-200"
                    : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="font-medium">{p.label}</div>
                <div className="text-[10px] opacity-70">{p.desc}</div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-white/15 text-muted-foreground">
              Step {step + 1} of {DEMO_STEPS.length}
            </Badge>
            <span className="text-xs text-muted-foreground">{pct}%</span>
          </div>
          <Progress value={pct} className="mt-3 h-1.5" />

          <div className="mt-5">
            <div className="text-xs uppercase tracking-wider text-teal-300">{current.persona}</div>
            <h2 className="mt-1 text-xl font-semibold">{current.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{current.narration}</p>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
              <ChevronLeft className="size-4" /> Back
            </Button>
            <Button size="sm" disabled={step === DEMO_STEPS.length - 1} onClick={() => setStep((s) => Math.min(DEMO_STEPS.length - 1, s + 1))}>
              Next <ChevronRight className="size-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setStep(0)}>
              <RotateCcw className="size-4" /> Reset
            </Button>
          </div>
        </Card>

        <Card className="border-violet-500/20 bg-violet-500/[0.03] p-4">
          <h3 className="flex items-center gap-2 text-sm font-medium text-violet-200">
            <Star className="size-4" /> Key "wow" moments
          </h3>
          <ul className="mt-2 space-y-1 text-xs">
            {DEMO_KEY_MOMENTS.map((m) => {
              const s = DEMO_STEPS[m.step - 1];
              return (
                <li key={m.step}
                  onClick={() => setStep(m.step - 1)}
                  className="cursor-pointer rounded border border-white/10 bg-white/[0.01] p-2 hover:bg-white/[0.03]">
                  <span className="text-violet-300">Step {m.step}:</span>{" "}
                  <span className="font-medium">{s.title}</span>{" "}
                  <span className="text-muted-foreground">— {m.why}</span>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="mb-2 text-sm font-medium">All steps {persona !== "owner" ? `(filtered: ${persona})` : ""}</h3>
          <ol className="space-y-1.5 text-xs">
            {DEMO_STEPS.map((s, i) => {
              const dim = persona !== "owner" && s.persona.toLowerCase() !== persona;
              return (
                <li
                  key={s.id}
                  onClick={() => setStep(i)}
                  className={`cursor-pointer rounded border px-3 py-2 transition-colors ${
                    i === step
                      ? "border-teal-400/40 bg-teal-500/10"
                      : "border-white/10 bg-white/[0.01] hover:bg-white/[0.03]"
                  } ${dim ? "opacity-40" : ""}`}
                >
                  <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}.</span>{" "}
                  <span className="font-medium">{s.title}</span>{" "}
                  <span className="text-muted-foreground">— {s.persona}</span>
                </li>
              );
            })}
          </ol>
        </Card>
      </div>
    </AppShell>
  );
}
