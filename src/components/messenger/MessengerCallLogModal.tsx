import { useState } from "react";
import { Phone, Video, X } from "lucide-react";
import { toast } from "sonner";
import type { Contact } from "./types";

export function MessengerCallLogModal({
  open,
  onClose,
  contact,
}: {
  open: boolean;
  onClose: () => void;
  contact: Contact;
}) {
  const [type, setType] = useState<"voice" | "video">("voice");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [linkLoad, setLinkLoad] = useState(contact.linkedLoad?.id ?? "");

  if (!open) return null;

  function save() {
    toast.success(`Call log saved for ${contact.name}`);
    setNotes("");
    setDuration("");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[min(520px,92vw)] overflow-hidden rounded-2xl border border-white/10 bg-[#101326]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
          <div>
            <h3 className="text-sm font-semibold">Log call</h3>
            <p className="text-[11px] text-muted-foreground">{contact.name}</p>
          </div>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex gap-2">
            <button
              onClick={() => setType("voice")}
              className={`flex-1 rounded-xl border px-3 py-2 text-xs font-semibold ${
                type === "voice"
                  ? "border-[#6D35E8]/50 bg-[#6D35E8]/20 text-white"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground"
              }`}
            >
              <Phone className="mr-1 inline size-3.5" /> Voice
            </button>
            <button
              onClick={() => setType("video")}
              className={`flex-1 rounded-xl border px-3 py-2 text-xs font-semibold ${
                type === "video"
                  ? "border-[#6D35E8]/50 bg-[#6D35E8]/20 text-white"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground"
              }`}
            >
              <Video className="mr-1 inline size-3.5" /> Video
            </button>
          </div>

          <label className="block text-[11px] text-muted-foreground">
            Duration (mm:ss)
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="3:42"
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none"
            />
          </label>

          <label className="block text-[11px] text-muted-foreground">
            Linked load
            <input
              value={linkLoad}
              onChange={(e) => setLinkLoad(e.target.value)}
              placeholder="LD-1048"
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none"
            />
          </label>

          <label className="block text-[11px] text-muted-foreground">
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Driver confirmed arrival at Dallas DC."
              className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/[0.06] px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="rounded-xl border border-[#6D35E8]/50 bg-[#6D35E8]/25 px-3 py-2 text-xs font-semibold text-white"
          >
            Save call log
          </button>
        </div>
      </div>
    </div>
  );
}
