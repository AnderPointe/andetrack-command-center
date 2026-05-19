import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EnterpriseNav } from "@/components/enterprise/EnterpriseNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { calculateRateQuote } from "@/enterprise/services/rateEngine";
import type { RateQuoteInput } from "@/enterprise/types";
import { DollarSign, Save, FileText } from "lucide-react";

export const Route = createFileRoute("/rating/quote")({
  head: () => ({ meta: [{ title: "Rate Quote Builder — Anderoute" }] }),
  component: RateQuoteBuilder,
});

function RateQuoteBuilder() {
  const [input, setInput] = useState<RateQuoteInput>({
    miles: 240, vehicleType: "dry_van", weight: 28000, urgency: "standard", commodity: "General", hazmat: false, afterHours: false,
  });
  const quote = useMemo(() => calculateRateQuote(input), [input]);

  const set = <K extends keyof RateQuoteInput>(k: K, v: RateQuoteInput[K]) => setInput((p) => ({ ...p, [k]: v }));

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <EnterpriseNav />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Rate Quote Builder</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Mileage · vehicle · fuel surcharge · accessorials · margin · driver pay.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Quote inputs</h2>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Miles</Label><Input type="number" value={input.miles} onChange={(e) => set("miles", Number(e.target.value))} /></div>
              <div><Label className="text-xs">Weight (lbs)</Label><Input type="number" value={input.weight ?? 0} onChange={(e) => set("weight", Number(e.target.value))} /></div>
              <div>
                <Label className="text-xs">Vehicle</Label>
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={input.vehicleType} onChange={(e) => set("vehicleType", e.target.value)}>
                  <option value="dry_van">Dry van</option><option value="reefer">Reefer</option><option value="flatbed">Flatbed</option>
                  <option value="sprinter_van">Sprinter van</option><option value="box_truck">Box truck</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Urgency</Label>
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={input.urgency} onChange={(e) => set("urgency", e.target.value as RateQuoteInput["urgency"])}>
                  <option value="standard">Standard</option><option value="expedited">Expedited</option><option value="team">Team</option>
                </select>
              </div>
              <div><Label className="text-xs">Commodity</Label><Input value={input.commodity ?? ""} onChange={(e) => set("commodity", e.target.value)} /></div>
              <div className="flex items-end gap-3">
                <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={!!input.hazmat} onChange={(e) => set("hazmat", e.target.checked)} />Hazmat</label>
                <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={!!input.afterHours} onChange={(e) => set("afterHours", e.target.checked)} />After-hours</label>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Rate breakdown</h2>
              <DollarSign className="size-4 text-teal-300" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Base rate</span><span className="font-medium tabular-nums">${quote.baseRate.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Fuel surcharge</span><span className="font-medium tabular-nums">${quote.fuelSurcharge.toFixed(2)}</span></div>
              {quote.accessorials.map((a) => (
                <div key={a.label} className="flex justify-between text-xs"><span className="text-muted-foreground">+ {a.label}</span><span className="tabular-nums">${a.amount.toFixed(2)}</span></div>
              ))}
              <div className="border-t border-white/10 pt-2 flex justify-between text-base"><span className="font-semibold">Total</span><span className="font-semibold tabular-nums text-teal-300">${quote.total.toFixed(2)}</span></div>
              <div className="text-xs text-muted-foreground flex justify-between"><span>Driver pay est.</span><span className="tabular-nums">${quote.driverPayEstimate.toFixed(2)}</span></div>
              <div className="text-xs text-muted-foreground flex justify-between"><span>Estimated margin</span><span className="tabular-nums">{quote.marginPct}%</span></div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm"><Save className="size-3.5 mr-1.5" />Save quote</Button>
              <Button size="sm" variant="outline"><FileText className="size-3.5 mr-1.5" />Convert to load</Button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
