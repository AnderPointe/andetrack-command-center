import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Camera, X, Eraser, Check, Upload, Loader2, PenLine, ImagePlus, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { api } from "@/api/anderoute";

export interface PODSubmission {
  signatureName: string;
  signatureDataUrl: string;
  photoDataUrls: string[];
  notes: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided, the dialog will persist the POD to Supabase. */
  persist?: { companyId: string; loadId: string; shipmentId: string; driverId?: string | null };
  onSubmit?: (pod: PODSubmission) => void;
}

export function ProofOfDeliveryDialog({ open, onOpenChange, persist, onSubmit }: Props) {
  const [signatureName, setSignatureName] = useState("");
  const [photos, setPhotos] = useState<{ blob: Blob; url: string }[]>([]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const sigRef = useRef<SignaturePadHandle>(null);

  useEffect(() => {
    if (!open) {
      // reset on close
      setSignatureName(""); setPhotos([]); setNotes(""); setSubmitting(false); setDone(false);
    }
  }, [open]);

  function addPhoto(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image must be under 8 MB");
      return;
    }
    if (photos.length >= 6) {
      toast.error("Up to 6 photos");
      return;
    }
    setPhotos((p) => [...p, { blob: file, url: URL.createObjectURL(file) }]);
  }

  async function handleSubmit() {
    const name = signatureName.trim();
    if (!name) { toast.error("Receiver name is required"); return; }
    if (name.length > 80) { toast.error("Name too long"); return; }
    if (sigRef.current?.isEmpty()) { toast.error("Signature is required"); return; }
    if (notes.length > 500) { toast.error("Notes must be under 500 characters"); return; }

    const sigBlob = await sigRef.current!.toBlob();
    const sigDataUrl = await sigRef.current!.toDataURL();

    setSubmitting(true);
    try {
      if (persist) {
        const { data: { user } } = await supabase.auth.getUser();
        const { signedUrl: sigUrl } = await api.uploadPODFile(
          persist.companyId, persist.loadId, sigBlob, "signature",
        );
        const photoUrls: string[] = [];
        for (const p of photos) {
          const ext = (p.blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
          const { signedUrl } = await api.uploadPODFile(
            persist.companyId, persist.loadId, p.blob, "photo", ext,
          );
          if (signedUrl) photoUrls.push(signedUrl);
        }
        await api.uploadPOD({
          company_id: persist.companyId,
          load_id: persist.loadId,
          shipment_id: persist.shipmentId,
          driver_id: persist.driverId ?? user?.id ?? null,
          signature_name: name,
          photo_url: photoUrls[0] ?? sigUrl ?? null,
          notes: notes.trim() || null,
        });
      }

      onSubmit?.({
        signatureName: name,
        signatureDataUrl: sigDataUrl,
        photoDataUrls: photos.map((p) => p.url),
        notes: notes.trim(),
      });
      setDone(true);
      toast.success("Proof of delivery captured");
      setTimeout(() => onOpenChange(false), 1100);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save POD");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-teal" /> Proof of Delivery
          </DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="py-10 grid place-items-center text-center">
            <div className="size-14 rounded-full bg-success/15 text-success grid place-items-center mb-3">
              <Check className="size-7" />
            </div>
            <div className="font-semibold">Delivery confirmed</div>
            <div className="text-xs text-muted-foreground mt-1">Dispatch has been notified.</div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Receiver name */}
            <div className="space-y-1.5">
              <Label htmlFor="pod-name" className="text-xs">Receiver name</Label>
              <Input
                id="pod-name"
                placeholder="e.g. Marcus Reed"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                maxLength={80}
                autoComplete="off"
              />
            </div>

            {/* Signature */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs flex items-center gap-1.5"><PenLine className="size-3.5" /> Signature</Label>
                <button
                  type="button"
                  onClick={() => sigRef.current?.clear()}
                  className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <Eraser className="size-3" /> Clear
                </button>
              </div>
              <SignaturePad ref={sigRef} />
              <p className="text-[10px] text-muted-foreground">Sign with finger or mouse inside the box.</p>
            </div>

            {/* Photos */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs flex items-center gap-1.5"><Camera className="size-3.5" /> Photos <span className="text-muted-foreground">(optional)</span></Label>
                <span className="text-[10px] text-muted-foreground tabular-nums">{photos.length}/6</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {photos.map((p, i) => (
                  <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-border group">
                    <img src={p.url} alt={`POD photo ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos((arr) => arr.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 size-5 rounded-full bg-background/85 border border-border grid place-items-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
                {photos.length < 6 && (
                  <label className="aspect-square rounded-md border-2 border-dashed border-border hover:border-teal hover:bg-teal/5 grid place-items-center cursor-pointer transition">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) addPhoto(f);
                        e.target.value = "";
                      }}
                    />
                    <ImagePlus className="size-5 text-muted-foreground" />
                  </label>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="pod-notes" className="text-xs">Notes <span className="text-muted-foreground">(optional)</span></Label>
              <Textarea
                id="pod-notes"
                placeholder="Damage, exceptions, gate notes…"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={500}
                className="resize-none"
              />
              <div className="text-[10px] text-muted-foreground text-right tabular-nums">{notes.length}/500</div>
            </div>
          </div>
        )}

        {!done && (
          <DialogFooter>
            <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting}>Cancel</Button>
            <Button
              className="bg-teal text-teal-foreground hover:bg-teal/90"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? <Loader2 className="size-4 animate-spin mr-1" /> : <Upload className="size-4 mr-1" />}
              {submitting ? "Saving…" : "Confirm Delivery"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ===================== Signature pad =====================

interface SignaturePadHandle {
  clear: () => void;
  isEmpty: () => boolean;
  toDataURL: () => Promise<string>;
  toBlob: () => Promise<Blob>;
}

const SignaturePad = forwardRef<SignaturePadHandle>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const dirty = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim();
      ctx.strokeStyle = fg || "#0f172a";
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const p = pos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(last.current!.x, last.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    dirty.current = true;
  };
  const onUp = () => { drawing.current = false; last.current = null; };

  useImperativeHandle(ref, () => ({
    clear: () => {
      const c = canvasRef.current!;
      const ctx = c.getContext("2d")!;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.restore();
      dirty.current = false;
    },
    isEmpty: () => !dirty.current,
    toDataURL: async () => canvasRef.current!.toDataURL("image/png"),
    toBlob: () =>
      new Promise<Blob>((resolve, reject) => {
        canvasRef.current!.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to capture signature"))),
          "image/png",
        );
      }),
  }));

  return (
    <div className={cn("rounded-md border border-border bg-surface-2 relative h-36 overflow-hidden")}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      />
      <div className="absolute left-3 right-3 bottom-2 border-t border-dashed border-muted-foreground/30 pointer-events-none" />
      <div className="absolute left-3 bottom-3 text-[10px] uppercase tracking-widest text-muted-foreground pointer-events-none">×</div>
    </div>
  );
});
SignaturePad.displayName = "SignaturePad";
