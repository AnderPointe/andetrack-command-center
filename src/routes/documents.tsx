import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FileText, Upload, Download, Search, Tag } from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — Anderoute" }] }),
  component: DocumentsPage,
});

const DOCS = [
  { id: "d1", title: "POD-L2041-signed.pdf", type: "proof_of_delivery", entity: "Load L-2041", tags: ["pod","signed"], size: "412 KB", uploaded: "2h ago" },
  { id: "d2", title: "BOL-L2041.pdf", type: "bill_of_lading", entity: "Load L-2041", tags: ["bol"], size: "188 KB", uploaded: "1d ago" },
  { id: "d3", title: "Rate-Confirmation-ACME-CN48211.pdf", type: "rate_confirmation", entity: "ACME Brokerage", tags: ["rate","edi"], size: "76 KB", uploaded: "3h ago" },
  { id: "d4", title: "Invoice-1042.pdf", type: "invoice", entity: "Customer · Acme Corp", tags: ["invoice"], size: "98 KB", uploaded: "4d ago" },
  { id: "d5", title: "Insurance-COI-2026.pdf", type: "insurance", entity: "Company", tags: ["coi","insurance"], size: "210 KB", uploaded: "32d ago", expiresIn: "11 mo" },
  { id: "d6", title: "VehicleReg-TRK-018.pdf", type: "vehicle_registration", entity: "Vehicle TRK-018", tags: ["registration"], size: "44 KB", uploaded: "12d ago", expiresIn: "8 mo" },
  { id: "d7", title: "Delivery-photo-L2038.jpg", type: "delivery_photo", entity: "Load L-2038", tags: ["photo","pod"], size: "1.2 MB", uploaded: "5h ago" },
];

function DocumentsPage() {
  const [q, setQ] = useState("");
  const filtered = DOCS.filter((d) => q === "" || d.title.toLowerCase().includes(q.toLowerCase()) || d.entity.toLowerCase().includes(q.toLowerCase()));
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
            <p className="text-sm text-muted-foreground mt-0.5">POD, BOL, rate confirmations, invoices, insurance, registrations, photos.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-9 pl-8 w-64" />
            </div>
            <Button size="sm"><Upload className="size-3.5 mr-1.5" />Upload</Button>
          </div>
        </div>

        <Card className="p-5">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-white/5">
                <th className="text-left py-2 pr-3">Document</th>
                <th className="text-left py-2 pr-3">Type</th>
                <th className="text-left py-2 pr-3">Linked to</th>
                <th className="text-left py-2 pr-3">Tags</th>
                <th className="text-left py-2 pr-3">Size</th>
                <th className="text-left py-2 pr-3">Uploaded</th>
                <th className="text-left py-2 pr-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="py-2 pr-3 flex items-center gap-2"><FileText className="size-4 text-teal-300" />{d.title}</td>
                  <td className="py-2 pr-3 text-xs text-muted-foreground">{d.type.replace(/_/g, " ")}</td>
                  <td className="py-2 pr-3 text-xs">{d.entity}</td>
                  <td className="py-2 pr-3"><div className="flex gap-1">{d.tags.map((t) => <Badge key={t} variant="outline" className="text-[10px]"><Tag className="size-2.5 mr-0.5" />{t}</Badge>)}</div></td>
                  <td className="py-2 pr-3 text-xs tabular-nums">{d.size}</td>
                  <td className="py-2 pr-3 text-xs text-muted-foreground">{d.uploaded}{d.expiresIn && <span className="ml-1 text-amber-300">· exp {d.expiresIn}</span>}</td>
                  <td className="py-2 pr-3"><Button variant="ghost" size="sm"><Download className="size-3.5" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppShell>
  );
}
