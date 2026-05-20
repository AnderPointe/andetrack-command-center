import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ROI_PRESETS } from "@/launch/data/mockLaunch";
import { Calculator } from "lucide-react";

export const Route = createFileRoute("/launch/roi")({
  head: () => ({ meta: [{ title: "ROI Calculator — Anderoute" }] }),
  component: ROI,
});

function ROI() {
  const [drivers, setDrivers]               = useState(25);
  const [loadsPerDay, setLoadsPerDay]       = useState(120);
  const [dispatcherHourly, setDispatcherHourly] = useState(35);
  const [delayCost, setDelayCost]           = useState(85);
  const [statusCallMinutes, setStatusCallMinutes] = useState(180);
  const [softwareCost, setSoftwareCost]     = useState(2400);
  const [timeSavedPerLoad, setTimeSavedPerLoad] = useState(3);     // minutes
  const [delayReductionPct, setDelayReductionPct] = useState(15);   // %

  const calc = useMemo(() => {
    const monthDays = 22;
    const monthlyLoads = loadsPerDay * monthDays;
    const dispatcherMinutesSaved = monthlyLoads * timeSavedPerLoad;
    const dispatcherSavings = (dispatcherMinutesSaved / 60) * dispatcherHourly;
    const delaySavings = monthlyLoads * 0.12 * (delayReductionPct / 100) * delayCost;
    const csSavings = (statusCallMinutes * 22 / 60) * 0.5 * dispatcherHourly;
    const total = dispatcherSavings + delaySavings + csSavings;
    const payback = softwareCost > 0 ? softwareCost / Math.max(total, 1) : 0;
    return {
      dispatcherSavings, delaySavings, csSavings, total,
      paybackMonths: payback,
    };
  }, [loadsPerDay, dispatcherHourly, timeSavedPerLoad, delayReductionPct, delayCost, statusCallMinutes, softwareCost]);

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · ROI</Badge>
          <div className="flex items-center gap-3">
            <Calculator className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">ROI Calculator</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-amber-300">Estimate only.</span> Inputs are illustrative — validate with your own data before sharing externally.
          </p>
          <LaunchNav />
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-5">
            <h2 className="text-sm font-medium">Inputs</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Drivers" value={drivers} onChange={setDrivers} />
              <Field label="Loads per day" value={loadsPerDay} onChange={setLoadsPerDay} />
              <Field label="Dispatcher $/hr" value={dispatcherHourly} onChange={setDispatcherHourly} />
              <Field label="Avg delay cost ($)" value={delayCost} onChange={setDelayCost} />
              <Field label="Status-call minutes/day" value={statusCallMinutes} onChange={setStatusCallMinutes} />
              <Field label="Current software $/mo" value={softwareCost} onChange={setSoftwareCost} />
              <Field label="Time saved per load (min)" value={timeSavedPerLoad} onChange={setTimeSavedPerLoad} />
              <Field label="Delay reduction (%)" value={delayReductionPct} onChange={setDelayReductionPct} />
            </div>
          </Card>

          <Card className="border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-transparent p-5">
            <h2 className="text-sm font-medium">Estimated monthly savings</h2>
            <Row label="Dispatcher efficiency" value={fmt(calc.dispatcherSavings)} />
            <Row label="Delay cost reduction"  value={fmt(calc.delaySavings)} />
            <Row label="Customer-service time" value={fmt(calc.csSavings)} />
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Total monthly</div>
              <div className="text-3xl font-semibold text-teal-200">{fmt(calc.total)}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Payback period: ~{calc.paybackMonths.toFixed(1)} months (vs. current software)
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} className="mt-1" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3 flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
