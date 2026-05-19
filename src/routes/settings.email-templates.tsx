import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mail, Edit3 } from "lucide-react";

export const Route = createFileRoute("/settings/email-templates")({
  head: () => ({ meta: [{ title: "Email Templates — Anderoute" }] }),
  component: EmailTemplatesPage,
});

const TEMPLATES = [
  { key: "customer_portal_invite", label: "Customer portal invite", subject: "You're invited to track your shipments" },
  { key: "shipment_request_received", label: "Shipment request received", subject: "We received your request" },
  { key: "shipment_scheduled", label: "Shipment scheduled", subject: "Your shipment is scheduled" },
  { key: "shipment_in_transit", label: "Shipment in transit", subject: "Your shipment is on the way" },
  { key: "delivery_completed", label: "Delivery completed", subject: "Delivered ✓" },
  { key: "pod_available", label: "POD available", subject: "Proof of delivery is ready" },
  { key: "invoice_available", label: "Invoice available", subject: "Your invoice is ready" },
  { key: "load_offer_to_driver", label: "Load offer to driver", subject: "New load available" },
  { key: "driver_delay_notification", label: "Driver delay notification", subject: "Delivery delay update" },
  { key: "company_invite", label: "Company invite", subject: "Join your team on Anderoute" },
  { key: "billing_notice", label: "Billing notice", subject: "Billing update" },
];

function EmailTemplatesPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Email Templates</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Branded transactional email — uses your white-label colors automatically.</p>
        </div>
        <Card className="p-5">
          <div className="space-y-2">
            {TEMPLATES.map((t) => (
              <div key={t.key} className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="size-4 text-teal-300 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{t.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.subject}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch defaultChecked />
                  <Button variant="outline" size="sm"><Edit3 className="size-3.5 mr-1.5" />Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
