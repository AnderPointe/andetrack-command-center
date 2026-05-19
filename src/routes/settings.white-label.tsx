import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Upload, Palette, Globe } from "lucide-react";

export const Route = createFileRoute("/settings/white-label")({
  head: () => ({ meta: [{ title: "White-Label Branding — Anderoute" }] }),
  component: WhiteLabelSettings,
});

function WhiteLabelSettings() {
  const [b, setB] = useState({
    portal_title: "Acme Logistics Portal",
    primary_color: "#14b8a6",
    accent_color: "#f97316",
    custom_domain: "portal.acmelogistics.com",
    domain_verified: false,
    ssl_status: "pending" as "pending" | "active",
    support_email: "support@acmelogistics.com",
    hide_anderoute_branding: false,
    driver_app_brand_name: "Acme Driver",
    customer_portal_brand_name: "Acme Tracking",
  });

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">White-Label Branding</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Customize logo, colors, custom domain, and email branding for your enterprise deployment.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Brand</h2>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Portal title</Label><Input value={b.portal_title} onChange={(e) => setB({...b, portal_title: e.target.value})} /></div>
              <div><Label className="text-xs">Support email</Label><Input value={b.support_email} onChange={(e) => setB({...b, support_email: e.target.value})} /></div>
              <div><Label className="text-xs">Driver app name</Label><Input value={b.driver_app_brand_name} onChange={(e) => setB({...b, driver_app_brand_name: e.target.value})} /></div>
              <div><Label className="text-xs">Customer portal name</Label><Input value={b.customer_portal_brand_name} onChange={(e) => setB({...b, customer_portal_brand_name: e.target.value})} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Primary color</Label><div className="flex gap-2"><Input type="color" value={b.primary_color} onChange={(e) => setB({...b, primary_color: e.target.value})} className="h-10 w-14 p-1" /><Input value={b.primary_color} onChange={(e) => setB({...b, primary_color: e.target.value})} /></div></div>
              <div><Label className="text-xs">Accent color</Label><div className="flex gap-2"><Input type="color" value={b.accent_color} onChange={(e) => setB({...b, accent_color: e.target.value})} className="h-10 w-14 p-1" /><Input value={b.accent_color} onChange={(e) => setB({...b, accent_color: e.target.value})} /></div></div>
            </div>
            <Button variant="outline" size="sm"><Upload className="size-3.5 mr-1.5" />Upload logo</Button>
            <label className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.02] px-3 py-2">
              <span className="text-sm">Hide Anderoute branding</span>
              <Switch checked={b.hide_anderoute_branding} onCheckedChange={(v) => setB({...b, hide_anderoute_branding: v})} />
            </label>
          </Card>

          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Preview</h2>
              <Palette className="size-4 text-teal-300" />
            </div>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between" style={{ background: b.primary_color }}>
                <div className="font-semibold text-white">{b.portal_title}</div>
                <div className="text-xs text-white/80">{b.customer_portal_brand_name}</div>
              </div>
              <div className="p-4 space-y-3 bg-slate-950">
                <div className="text-sm font-medium">Welcome back</div>
                <div className="rounded-md border border-white/10 bg-white/[0.02] p-3 text-xs text-muted-foreground">Shipment SH-1042 · In transit · ETA today 4:20 PM</div>
                <button className="w-full rounded-md py-2 text-sm font-medium text-white" style={{ background: b.accent_color }}>Track shipment</button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2"><Globe className="size-4 text-teal-300" /><h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Custom domain</h2></div>
          <div className="grid md:grid-cols-2 gap-3">
            <div><Label className="text-xs">Custom domain</Label><Input value={b.custom_domain} onChange={(e) => setB({...b, custom_domain: e.target.value})} /></div>
            <div className="flex items-end gap-2"><Button size="sm">Verify DNS</Button><Button size="sm" variant="outline">Re-check SSL</Button></div>
          </div>
          <div className="rounded-md border border-white/5 bg-white/[0.02] p-3 font-mono text-xs">
            <div className="text-muted-foreground mb-1">Add this CNAME at your DNS provider:</div>
            <div>portal.acmelogistics.com → cname.anderoute-portal.com</div>
            <div className="mt-2 text-muted-foreground">TXT verification:</div>
            <div>_anderoute-verify.{b.custom_domain} → anderoute-verify=ABC123XYZ</div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>DNS: <span className={b.domain_verified ? "text-emerald-300" : "text-amber-300"}>{b.domain_verified ? "Verified" : "Pending"}</span></span>
            <span>SSL: <span className={b.ssl_status === "active" ? "text-emerald-300" : "text-amber-300"}>{b.ssl_status}</span></span>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
