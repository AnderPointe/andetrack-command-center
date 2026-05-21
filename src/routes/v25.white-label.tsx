import { createFileRoute } from "@tanstack/react-router";
import { Palette } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHITELABEL_SETTINGS, WHITELABEL_VALIDATION, WHITELABEL_PORTAL_SECTIONS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/white-label")({
  head: () => ({ meta: [{ title: "White-label Portal · Anderoute" }] }),
  component: () => {
    const s = WHITELABEL_SETTINGS;
    return (
      <V25Page icon={<Palette className="size-6 text-emerald-300" />} title="White-label Customer Portal" blurb="Per-company portal branding: logo, palette, support contacts, footer, terms/privacy, optional hiding of Anderoute branding.">
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="text-sm font-semibold">Settings (AcmeCorp)</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div><span className="text-muted-foreground text-xs">Portal title:</span> {s.portalTitle}</div>
              <div><span className="text-muted-foreground text-xs">Support:</span> {s.supportEmail} · {s.supportPhone}</div>
              <div className="flex items-center gap-2"><span className="text-muted-foreground text-xs">Palette:</span>
                <span className="size-5 rounded border border-white/20" style={{ background: s.primary }} />
                <span className="size-5 rounded border border-white/20" style={{ background: s.secondary }} />
                <span className="size-5 rounded border border-white/20" style={{ background: s.accent }} />
              </div>
              <div className="text-xs text-muted-foreground">{s.footerText}</div>
              <div className="text-xs">Hide Anderoute branding: {s.hideAnderoute ? <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">yes</Badge> : "no"}</div>
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="text-sm font-semibold">Brand validation</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {WHITELABEL_VALIDATION.map((v) => (
                <li key={v.id} className="flex items-center gap-2"><span className={v.ok ? "text-emerald-400" : "text-amber-400"}>{v.ok ? "✓" : "○"}</span><span className={v.ok ? "" : "text-muted-foreground"}>{v.label}</span></li>
              ))}
            </ul>
          </Card>
        </div>
        <Card className="border-white/10 p-4" style={{ background: s.secondary, color: "white" }}>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold" style={{ color: s.accent }}>{s.portalTitle}</div>
            <Badge variant="outline" className="border-white/30 text-white">brand preview</Badge>
          </div>
          <div className="mt-3 rounded p-3" style={{ background: s.primary }}><div className="text-sm">Your shipment is on the way. Track in real time.</div></div>
          <div className="mt-3 text-xs opacity-70">{s.footerText}</div>
        </Card>
      </V25Page>
    );
  },
});
