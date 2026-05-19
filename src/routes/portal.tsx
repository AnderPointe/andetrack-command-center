import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Package, Plus, Truck, FileText } from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({ meta: [
    { title: "Customer Portal — Anderoute" },
    { name: "description", content: "Track your shipments, submit new requests, and view delivery history." },
  ]}),
  component: PortalHome,
});

function PortalHome() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Customer Portal</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Your shipments, tracking, and delivery history.</p>
          </div>
          <Link to="/portal/new-request" className="inline-flex items-center gap-1.5 rounded-md bg-teal-500 px-3 py-1.5 text-sm font-medium text-slate-950 hover:bg-teal-400">
            <Plus className="size-4" /> New shipment
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Active shipments", value: "3", icon: Truck },
            { label: "Pending requests", value: "1", icon: Package },
            { label: "Completed (30d)", value: "12", icon: FileText },
          ].map((k) => (
            <Card key={k.label} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</span>
                <k.icon className="size-4 text-teal-300" />
              </div>
              <div className="mt-2 text-2xl font-semibold tabular-nums">{k.value}</div>
            </Card>
          ))}
        </div>

        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Active shipments</h2>
            <Link to="/portal/shipments" className="text-xs text-teal-300 hover:underline">View all</Link>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { id: "SH-1042", from: "Dallas, TX", to: "Houston, TX", eta: "Today 4:20 PM", status: "In transit" },
              { id: "SH-1041", from: "Austin, TX", to: "San Antonio, TX", eta: "Tomorrow 10:00 AM", status: "Loaded" },
              { id: "SH-1039", from: "Fort Worth, TX", to: "El Paso, TX", eta: "Wed 2:00 PM", status: "Accepted" },
            ].map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.02] px-3 py-2">
                <div>
                  <div className="font-medium">{s.id} · {s.from} → {s.to}</div>
                  <div className="text-xs text-muted-foreground">ETA {s.eta}</div>
                </div>
                <span className="rounded-full border border-teal-400/30 bg-teal-500/10 px-2 py-0.5 text-[11px] text-teal-200">{s.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
