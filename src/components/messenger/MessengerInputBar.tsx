import { useRef, useState } from "react";
import {
  AtSign,
  FileText,
  MapPin,
  Mic,
  Paperclip,
  Send,
  Smile,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { MessengerAttachmentCard } from "./MessengerAttachmentCard";
import type { Attachment, Contact, Priority } from "./types";
import { cn } from "@/lib/utils";
import {
  DRIVER_QUICK_REPLIES,
  MESSAGE_TEMPLATES,
  SUGGESTED_REPLIES,
} from "./messenger-constants";

const PRIORITIES: { id: Priority; label: string; color: string }[] = [
  { id: "normal", label: "Normal", color: "text-muted-foreground" },
  { id: "important", label: "Important", color: "text-sky-300" },
  { id: "urgent", label: "Urgent", color: "text-orange-300" },
  { id: "emergency", label: "Emergency", color: "text-red-300" },
];

// Naive client-side priority hint
function detectPriority(text: string): Priority {
  const t = text.toLowerCase();
  if (/emergency|broke down|accident|crash|injured|911/.test(t))
    return "emergency";
  if (/urgent|asap|right now|stuck|stranded|delay/.test(t)) return "urgent";
  if (/important|please confirm|need eta/.test(t)) return "important";
  return "normal";
}

export function MessengerInputBar({
  active,
  draft,
  onDraftChange,
  attachment,
  onAttachmentChange,
  priority,
  onPriorityChange,
  onSend,
}: {
  active: Contact;
  draft: string;
  onDraftChange: (v: string) => void;
  attachment: Attachment | null;
  onAttachmentChange: (a: Attachment | null) => void;
  priority: Priority;
  onPriorityChange: (p: Priority) => void;
  onSend: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const showDriverReplies = active.role === "Driver" || active.role === "Courier";
  const detected = draft ? detectPriority(draft) : "normal";

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onAttachmentChange({
      name: file.name,
      type: file.type || "FILE",
      size: file.size,
    });
    toast.success(`Attached ${file.name}`);
    e.target.value = "";
  }

  function applySuggestion(s: string) {
    onDraftChange(draft ? `${draft} ${s}` : s);
  }

  return (
    <div className="border-t border-white/[0.06] p-3 space-y-2">
      {attachment && (
        <MessengerAttachmentCard
          variant="composer"
          filename={attachment.name}
          filetype={attachment.type}
          size={attachment.size}
          onRemove={() => onAttachmentChange(null)}
        />
      )}

      {/* AI suggested replies */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Sparkles className="size-3 text-primary" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          AI suggestions
        </span>
        {SUGGESTED_REPLIES.map((s) => (
          <button
            key={s}
            onClick={() => applySuggestion(s)}
            className="rounded-full border border-[#6D35E8]/30 bg-[#6D35E8]/10 px-2.5 py-0.5 text-[11px] text-primary hover:bg-[#6D35E8]/25"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Driver-friendly quick replies */}
      {showDriverReplies && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Quick reply
          </span>
          {DRIVER_QUICK_REPLIES.map((s) => (
            <button
              key={s}
              onClick={() => {
                onDraftChange(s);
                setTimeout(onSend, 0);
              }}
              className="rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-0.5 text-[11px] text-success hover:bg-[#22C55E]/20"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-muted-foreground">Priority</span>
        <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-0.5">
          {PRIORITIES.map((p) => (
            <button
              key={p.id}
              onClick={() => onPriorityChange(p.id)}
              className={cn(
                "rounded-full px-2 py-0.5 transition-colors",
                priority === p.id
                  ? "bg-[#6D35E8]/25 text-white"
                  : `${p.color} hover:text-white`,
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        {detected !== "normal" && detected !== priority && (
          <button
            onClick={() => onPriorityChange(detected)}
            className="inline-flex items-center gap-1 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 px-2 py-0.5 text-orange-300"
          >
            <Sparkles className="size-3" /> AI: mark as {detected}
          </button>
        )}

        <div className="relative ml-auto">
          <button
            onClick={() => setTemplatesOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-muted-foreground hover:text-white"
          >
            <FileText className="size-3" /> Templates
          </button>
          {templatesOpen && (
            <div className="absolute bottom-full right-0 z-20 mb-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#101326]/95 shadow-2xl">
              {MESSAGE_TEMPLATES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => {
                    onDraftChange(t.body);
                    setTemplatesOpen(false);
                    toast.success(`Inserted: ${t.label}`);
                  }}
                  className="block w-full px-3 py-2 text-left text-[12px] hover:bg-white/5"
                >
                  <div className="font-semibold text-white">{t.label}</div>
                  <div className="truncate text-muted-foreground">{t.body}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 backdrop-blur-md">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={onPickFile}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Attach POD or file"
          className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white"
        >
          <Paperclip className="size-4" />
        </button>
        <button
          onClick={() => toast.info("Mention…")}
          title="Mention"
          className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white"
        >
          <AtSign className="size-4" />
        </button>
        <button
          onClick={() => toast.success("Live location shared")}
          title="Share location"
          className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white"
        >
          <MapPin className="size-4" />
        </button>
        <input
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Write a message…"
          className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={() => toast.info("Emoji picker coming soon")}
          title="Emoji"
          className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white"
        >
          <Smile className="size-4" />
        </button>
        <button
          onClick={() => toast.info("Recording voice note…")}
          title="Voice note"
          className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white"
        >
          <Mic className="size-4" />
        </button>
        <button
          onClick={onSend}
          title="Send"
          className="grid size-9 place-items-center rounded-xl bg-[#6D35E8] text-white shadow-[0_8px_30px_-8px_rgba(109,53,232,0.7)] hover:bg-[#7c47ee]"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}
