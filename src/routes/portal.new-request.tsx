import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/portal/new-request")({
  head: () => ({ meta: [{ title: "New Shipment Request — Anderoute" }] }),
  component: NewRequest,
});

function NewRequest() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Shipment request submitted. Dispatch will review shortly.");
    setSubmitting(false);
  };
  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
        <div>
          <Link to="/portal" className="text-xs text-teal-300 hover:underline">← Back to portal</Link>
          <h1 className="mt-1 text-2xl font-semibold">New shipment request</h1>
        </div>
        <Card className="p-5">
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <Field label="Pickup location"><Input required placeholder="Address or city" /></Field>
              <Field label="Drop-off location"><Input required placeholder="Address or city" /></Field>
            </div>
            <Field label="Commodity"><Input placeholder="e.g. Pallets / Electronics" /></Field>
            <Field label="Package type"><Input placeholder="Pallet, crate, bulk…" /></Field>
            <Field label="Weight (lbs)"><Input type="number" min="0" /></Field>
            <Field label="Quantity"><Input type="number" min="1" /></Field>
            <Field label="Required vehicle"><Input placeholder="Box truck, dry van…" /></Field>
            <Field label="Pickup date/time"><Input type="datetime-local" /></Field>
            <Field label="Delivery window"><Input placeholder="e.g. Wed 8-12" /></Field>
            <Field label="Contact"><Input placeholder="Name / phone" /></Field>
            <div className="md:col-span-2">
              <Field label="Special instructions"><Textarea rows={3} /></Field>
            </div>
            <div className="md:col-span-2 flex items-center gap-3 text-xs text-muted-foreground">
              <input type="checkbox" id="cdl" /><label htmlFor="cdl">Requires CDL</label>
              <input type="checkbox" id="haz" /><label htmlFor="haz">Hazmat</label>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button disabled={submitting} type="submit">{submitting ? "Submitting…" : "Submit request"}</Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
