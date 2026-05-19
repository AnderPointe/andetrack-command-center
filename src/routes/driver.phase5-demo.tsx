import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  Bell,
  WifiOff,
  Car,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/driver/phase5-demo")({
  component: Phase5DemoFlow,
  head: () => ({
    meta: [
      { title: "Phase 5 Demo Flow — Anderoute EliteNav" },
      {
        name: "description",
        content:
          "Guided walkthrough of Anderoute Phase 5: CoPilot, notifications, offline queue, in-vehicle surfaces, and production settings.",
      },
    ],
  }),
});

type Step = {
  id: string;
  title: string;
  description: string;
  icon: typeof Mic;
  href: string;
  cta: string;
};

const STEPS: Step[] = [
  {
    id: "copilot",
    title: "1 — CoPilot voice assistant",
    description:
      "Push-to-talk, mode-aware system prompts (moving / parked / emergency), and tool registry for ETA, status, and dispatch.",
    icon: Mic,
    href: "/driver/copilot-lab",
    cta: "Open CoPilot Lab",
  },
  {
    id: "notifications",
    title: "2 — Notifications + in-vehicle",
    description:
      "Load offers, dispatch voice, route hazards, and ETA reminders. Simulate CarPlay / Android Auto templates.",
    icon: Bell,
    href: "/driver/notifications-lab",
    cta: "Open Notifications Lab",
  },
  {
    id: "offline",
    title: "3 — Offline resilience",
    description:
      "Queue commands and POD captures while offline; sync replays on reconnect with idempotency keys and exponential backoff.",
    icon: WifiOff,
    href: "/driver/copilot-lab",
    cta: "Trigger Offline Mode",
  },
  {
    id: "invehicle",
    title: "4 — In-vehicle surfaces",
    description:
      "CarPlay + Android Auto adapter registry with web simulator. Native bridges documented in /docs.",
    icon: Car,
    href: "/driver/notifications-lab",
    cta: "Simulate In-Vehicle",
  },
  {
    id: "production",
    title: "5 — Production settings",
    description:
      "System health, AI provider failover, queue depth, privacy controls, and notification preferences in one dashboard.",
    icon: ShieldCheck,
    href: "/settings/production",
    cta: "Open Production Dashboard",
  },
];

function Phase5DemoFlow() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = Math.round((completed.size / STEPS.length) * 100);

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-10">
      <header className="space-y-3">
        <Badge variant="outline" className="uppercase tracking-wider">
          Phase 5 · Production Hardening
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Anderoute EliteNav — Guided Demo
        </h1>
        <p className="text-muted-foreground text-lg">
          A 5-step walkthrough of every Phase 5 surface. Mark steps as you
          review them — your progress is local-only.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
            <div
              className="bg-primary h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-muted-foreground text-sm tabular-nums">
            {completed.size}/{STEPS.length}
          </span>
        </div>
      </header>

      <ol className="space-y-4">
        {STEPS.map((step) => {
          const done = completed.has(step.id);
          const Icon = step.icon;
          return (
            <li key={step.id}>
              <Card
                className={`p-5 transition-colors ${
                  done ? "border-primary/50 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                      done
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <h2 className="text-lg font-semibold leading-tight">
                      {step.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <Button asChild size="sm">
                        <Link to={step.href}>
                          {step.cta}
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggle(step.id)}
                      >
                        {done ? "Mark incomplete" : "Mark complete"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>

      <Card className="bg-muted/30 p-5">
        <h3 className="mb-2 font-semibold">Reference docs</h3>
        <ul className="text-muted-foreground space-y-1 text-sm">
          <li>• /docs/expo-app-structure.md — Mobile porting plan</li>
          <li>• /docs/mobile-release-checklist.md — App Store + Play Store</li>
          <li>• /docs/carplay-plan.md & /docs/android-auto-plan.md</li>
          <li>• /docs/security-model.md & /docs/ai-api-plan.md</li>
          <li>• /docs/production-readiness.md</li>
        </ul>
      </Card>
    </div>
  );
}
