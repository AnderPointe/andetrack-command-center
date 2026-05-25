import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { GeofenceInput, GeofenceType, MapGeofence } from "@/hooks/useMapGeofences";

const TYPES: GeofenceType[] = [
  "delivery",
  "customer",
  "yard",
  "restricted",
  "airport",
  "port",
  "warehouse",
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  type: z.enum(["delivery", "customer", "yard", "restricted", "airport", "port", "warehouse"]),
  status: z.enum(["active", "inactive"]),
  latitude: z.number().gte(-90).lte(90),
  longitude: z.number().gte(-180).lte(180),
  radius_m: z.number().positive().max(500_000),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

interface Props {
  open: boolean;
  mode: "create" | "edit";
  initial?: MapGeofence | null;
  defaultCenter?: [number, number]; // [lng, lat]
  onClose: () => void;
  onSubmit: (input: GeofenceInput) => Promise<void>;
  onDelete?: () => Promise<void>;
  canEdit?: boolean;
}

export function MapGeofenceFormDialog({
  open,
  mode,
  initial,
  defaultCenter,
  onClose,
  onSubmit,
  onDelete,
  canEdit = true,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<GeofenceType>("delivery");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [radius, setRadius] = useState("500");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErr(null);
    setBusy(false);
    if (initial) {
      setName(initial.name);
      setType(initial.type);
      setStatus(initial.status);
      setLat(String(initial.center[1]));
      setLng(String(initial.center[0]));
      setRadius(String(initial.radius_m));
      setNotes(initial.notes ?? "");
    } else {
      setName("");
      setType("delivery");
      setStatus("active");
      setLat(defaultCenter ? String(defaultCenter[1]) : "");
      setLng(defaultCenter ? String(defaultCenter[0]) : "");
      setRadius("500");
      setNotes("");
    }
  }, [open, initial, defaultCenter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const parsed = schema.safeParse({
      name,
      type,
      status,
      latitude: Number(lat),
      longitude: Number(lng),
      radius_m: Number(radius),
      notes: notes.trim() || undefined,
    });
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setBusy(true);
    try {
      await onSubmit(parsed.data as GeofenceInput);
      onClose();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to save");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm("Delete this geofence? This cannot be undone.")) return;
    setBusy(true);
    setErr(null);
    try {
      await onDelete();
      onClose();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to delete");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-slate-700/60 bg-slate-900 text-slate-100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-100">
            {mode === "create" ? "New Geofence" : "Edit Geofence"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {canEdit
              ? "Define a circular zone with a center coordinate and radius (meters)."
              : "You don't have permission to manage geofences for this company."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <Field label="Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={120}
              disabled={!canEdit || busy}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-teal-500"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Type">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as GeofenceType)}
                disabled={!canEdit || busy}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-teal-500"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                disabled={!canEdit || busy}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-teal-500"
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Latitude">
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                disabled={!canEdit || busy}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-teal-500"
              />
            </Field>
            <Field label="Longitude">
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                disabled={!canEdit || busy}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-teal-500"
              />
            </Field>
          </div>

          <Field label="Radius (m)">
            <input
              type="number"
              min={1}
              step="any"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              required
              disabled={!canEdit || busy}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-teal-500"
            />
          </Field>

          <Field label="Notes (optional)">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={1000}
              rows={2}
              disabled={!canEdit || busy}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-teal-500"
            />
          </Field>

          {err && (
            <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-2.5 py-2 text-xs text-rose-200">
              {err}
            </div>
          )}

          <DialogFooter className="gap-2 sm:justify-between">
            {mode === "edit" && onDelete && canEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={busy}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 text-xs font-medium text-rose-200 hover:bg-rose-500/20 disabled:opacity-50"
              >
                <Trash2 className="size-3.5" /> Delete
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="h-9 rounded-lg border border-slate-700 bg-slate-800 px-3 text-xs font-medium text-slate-100 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy || !canEdit}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-teal-500 px-3 text-xs font-semibold text-white hover:bg-teal-400 disabled:opacity-50"
              >
                {busy && <Loader2 className="size-3.5 animate-spin" />}
                {mode === "create" ? "Create" : "Save"}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}
