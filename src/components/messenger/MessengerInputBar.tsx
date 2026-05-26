import { useRef } from "react";
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
import type { Attachment, Priority } from "./types";
import { cn } from "@/lib/utils";

const PRIORITIES: { id: Priority; label: string; color: string }[] = [
  { id: "normal", label: "Normal", color: "text-[#8B90A7]" },
  { id: "important", label: "Important", color: "text-sky-300" },
  { id: "urgent", label: "Urgent", color: "text-orange-300" },
  { id: "emergency", label: "Emergency", color: "text-red-300" },
];

export function MessengerInputBar({
  draft,
  onDraftChange,
  attachment,
  onAttachmentChange,
  priority,
  onPriorityChange,
  onSend,
}: {
  draft: string;
  onDraftChange: (v: string) => void;
  attachment: Attachment | null;
  onAttachmentChange: (a: Attachment | null) => void;
  priority: Priority;
  onPriorityChange: (p: Priority) => void;
  onSend: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-[#8B90A7]">Priority</span>
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
        <button
          onClick={() => toast.info("AI suggested reply drafted")}
          className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[#B79CFF] hover:text-white"
        >
          <Sparkles className="size-3" /> AI suggest
        </button>
        <button
          onClick={() => toast.info("Inserted template: Delivery update")}
          className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[#8B90A7] hover:text-white"
        >
          <FileText className="size-3" /> Template
        </button>
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
          title="Attach"
          className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
        >
          <Paperclip className="size-4" />
        </button>
        <button
          onClick={() => toast.info("Mention…")}
          title="Mention"
          className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
        >
          <AtSign className="size-4" />
        </button>
        <button
          onClick={() => toast.success("Live location shared")}
          title="Share location"
          className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
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
          className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-[#8B90A7]"
        />
        <button
          onClick={() => toast.info("Emoji picker coming soon")}
          title="Emoji"
          className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
        >
          <Smile className="size-4" />
        </button>
        <button
          onClick={() => toast.info("Recording voice note…")}
          title="Voice note"
          className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
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
