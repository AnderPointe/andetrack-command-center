import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";

const issues = [
  "Mechanical issue",
  "Traffic / accident",
  "Weather hazard",
  "Loading delay",
  "Receiver delay",
  "Detour required",
  "Other",
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (issue: string, note: string) => void;
}

export function IssueReportModal({ open, onClose, onSubmit }: Props) {
  const [issue, setIssue] = useState(issues[0]);
  const [note, setNote] = useState("");
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-orange-400/20 bg-[#0d141a] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-300" />
                <div className="text-base font-semibold text-white">Report Issue</div>
              </div>
              <button onClick={onClose} className="rounded-full border border-white/10 p-1.5 text-slate-300 hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 p-5">
              <div className="grid grid-cols-2 gap-1.5">
                {issues.map((i) => (
                  <button
                    key={i}
                    onClick={() => setIssue(i)}
                    className={`rounded-xl border px-3 py-2 text-xs ${
                      issue === i
                        ? "border-orange-400/40 bg-orange-500/10 text-orange-100"
                        : "border-white/10 bg-white/[0.02] text-slate-200 hover:bg-white/[0.05]"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Add details (optional)…"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-orange-400/40 focus:outline-none"
              />
            </div>
            <div className="flex gap-2 border-t border-white/5 bg-black/30 p-4">
              <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5">
                Cancel
              </button>
              <button
                onClick={() => { onSubmit(issue, note); onClose(); }}
                className="flex-1 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-orange-400"
              >
                Send to Dispatch
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
