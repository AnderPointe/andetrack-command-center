import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, FileSignature, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { signature: string; notes: string; photoCount: number }) => void;
}

export function ProofOfDeliveryPlaceholder({ open, onClose, onSubmit }: Props) {
  const [signature, setSignature] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-[#0d141a] sm:rounded-3xl"
          >
            <div className="relative border-b border-white/5 px-5 py-4">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/5" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">Delivery Completed</div>
                    <div className="text-base font-semibold text-white">Proof of Delivery</div>
                  </div>
                </div>
                <button onClick={onClose} className="rounded-full border border-white/10 p-1.5 text-slate-300 hover:bg-white/5">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5">
              {/* Signature */}
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500">
                  <FileSignature className="h-3 w-3" /> Receiver signature
                </label>
                <input
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type receiver's full name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-400/40 focus:outline-none"
                />
              </div>

              {/* Photos */}
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500">
                  <Camera className="h-3 w-3" /> Photos (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {photos.map((p, i) => (
                    <div key={i} className="h-16 w-16 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                      <img src={p} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-white/15 text-slate-400 hover:border-teal-400/40 hover:text-teal-300"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []);
                      const urls = files.map((f) => URL.createObjectURL(f));
                      setPhotos((p) => [...p, ...urls]);
                    }}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1 text-[10px] uppercase tracking-widest text-slate-500">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any details for dispatch (seal #, dock, exceptions)…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-400/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 border-t border-white/5 bg-black/30 p-4">
              <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5">
                Cancel
              </button>
              <button
                disabled={!signature.trim()}
                onClick={() => onSubmit({ signature, notes, photoCount: photos.length })}
                className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:from-emerald-400 hover:to-teal-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit POD
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
