import {
  AlertTriangle,
  Bell,
  CheckCheck,
  CheckCircle2,
  Copy,
  Info,
  Link2,
  MapPin,
  MessageSquare,
  Mic,
  Pin,
  Play,
  Reply,
  Smile,
  Truck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MessengerAttachmentCard } from "./MessengerAttachmentCard";
import { priorityStyles, type Message, type Reaction } from "./types";

function ReactionsRow({ reactions }: { reactions: Reaction[] }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {reactions.map((r, i) => (
        <button
          key={i}
          onClick={() => toast.success(`Reacted ${r.emoji}`)}
          className={cn(
            "flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] transition-colors",
            r.mine
              ? "border-[#6D35E8]/50 bg-[#6D35E8]/20 text-[#D4C4FF]"
              : "border-white/10 bg-white/[0.04] text-[#8B90A7] hover:text-white",
          )}
        >
          <span>{r.emoji}</span>
          <span className="tabular-nums">{r.count}</span>
        </button>
      ))}
      <button
        onClick={() => toast.info("Add reaction")}
        className="grid size-6 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#8B90A7] hover:text-white"
      >
        <Smile className="size-3" />
      </button>
    </div>
  );
}

function SystemBubble({ m }: { m: Extract<Message, { kind: "system" }> }) {
  const Icon =
    m.icon === "alert" ? AlertTriangle : m.icon === "check" ? CheckCircle2 : Info;
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-[#8B90A7]">
        <Icon className="size-3 text-[#B79CFF]" />
        {m.text}
      </div>
    </div>
  );
}

function VoiceBubble({
  m,
  mine,
}: {
  m: Extract<Message, { kind: "voice" }>;
  mine: boolean;
}) {
  const mins = Math.floor(m.durationSec / 60);
  const secs = m.durationSec % 60;
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl px-3.5 py-2.5",
        mine
          ? "bg-[#6D35E8] text-white shadow-[0_10px_30px_-12px_rgba(109,53,232,0.7)]"
          : "border border-white/[0.08] bg-[#1A1E33]",
      )}
    >
      <button
        onClick={() => toast.info("Playing voice note…")}
        className={cn(
          "grid size-9 place-items-center rounded-full",
          mine ? "bg-white/15" : "bg-[#6D35E8]/25 text-[#B79CFF]",
        )}
      >
        <Play className="size-4" />
      </button>
      <div className="flex h-6 items-end gap-[2px]">
        {(m.waveform ?? Array.from({ length: 18 }, () => 8)).map((h, i) => (
          <span
            key={i}
            className={cn(
              "w-[2px] rounded-full",
              mine ? "bg-white/80" : "bg-[#B79CFF]",
            )}
            style={{ height: `${h * 1.4}px` }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 text-[11px] opacity-90">
        <Mic className="size-3" />
        {mins}:{secs.toString().padStart(2, "0")}
      </div>
    </div>
  );
}

function LocationBubble({
  m,
  mine,
}: {
  m: Extract<Message, { kind: "location" }>;
  mine: boolean;
}) {
  return (
    <div
      className={cn(
        "w-[260px] overflow-hidden rounded-2xl border",
        mine ? "border-[#6D35E8]/30" : "border-white/[0.08]",
      )}
    >
      <div className="relative h-24 bg-gradient-to-br from-[#0D1020] via-[#101326] to-[#1A1E33]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute -inset-3 animate-ping rounded-full bg-[#14B8A6]/30" />
          <MapPin className="relative size-5 text-[#14B8A6] drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
        </div>
      </div>
      <div className="bg-[#1A1E33] px-3 py-2">
        <div className="text-[12px] font-semibold text-white">{m.label}</div>
        <div className="text-[11px] text-[#8B90A7]">
          {m.city} · {m.coords}
        </div>
      </div>
    </div>
  );
}

function LoadStatusBubble({
  m,
}: {
  m: Extract<Message, { kind: "load_status" }>;
}) {
  return (
    <div className="w-[260px] rounded-2xl border border-[#F97316]/30 bg-[#F97316]/10 p-3">
      <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-orange-300">
        <Truck className="size-3.5" />
        {m.loadId} · {m.status}
      </div>
      {m.eta && (
        <div className="text-[13px] font-semibold text-white">ETA {m.eta}</div>
      )}
      {m.note && <div className="text-[11px] text-[#8B90A7]">{m.note}</div>}
    </div>
  );
}

export function MessengerBubble({ m }: { m: Message }) {
  if (m.kind === "system") return <SystemBubble m={m} />;
  const mine = m.from === "me";

  return (
    <div className={cn("group flex w-full", mine ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[78%] flex-col", mine ? "items-end" : "items-start")}>
        <div
          className={cn(
            "mb-1 flex items-center gap-1.5 text-[10px] text-[#8B90A7]",
            mine ? "flex-row-reverse" : "",
          )}
        >
          {!mine && m.authorName && (
            <span className="font-semibold text-white/80">{m.authorName}</span>
          )}
          <span>{m.time}</span>
          {m.pinned && <Pin className="size-3 text-[#B79CFF]" />}
          {m.edited && <span className="italic">edited</span>}
          {m.priority && m.priority !== "normal" && (
            <span
              className={cn(
                "rounded px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide",
                priorityStyles[m.priority],
              )}
            >
              {m.priority}
            </span>
          )}
          {mine && <CheckCheck className="size-3 text-[#B79CFF]" />}
        </div>

        {m.kind === "text" && (
          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-lg",
              mine
                ? "bg-[#6D35E8] text-white shadow-[0_10px_30px_-12px_rgba(109,53,232,0.7)]"
                : "border border-white/[0.08] bg-[#1A1E33] text-[#E6E8F2]",
            )}
          >
            {m.quote && (
              <div className="mb-2 border-l-2 border-white/40 pl-2 text-[12px] opacity-90">
                <div className="font-semibold">{m.quote.name}</div>
                <div className="opacity-90">{m.quote.text}</div>
              </div>
            )}
            {m.text}
          </div>
        )}

        {m.kind === "file" && (
          <MessengerAttachmentCard filename={m.filename} filetype={m.filetype} />
        )}

        {m.kind === "voice" && <VoiceBubble m={m} mine={mine} />}
        {m.kind === "location" && <LocationBubble m={m} mine={mine} />}
        {m.kind === "load_status" && <LoadStatusBubble m={m} />}

        {m.kind !== "file" && m.reactions && m.reactions.length > 0 && (
          <ReactionsRow reactions={m.reactions} />
        )}

        {m.threadCount && m.threadCount > 0 ? (
          <button
            onClick={() => toast.info("Open thread")}
            className="mt-1 inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] text-[#B79CFF] hover:text-white"
          >
            <MessageSquare className="size-3" />
            {m.threadCount} replies
          </button>
        ) : null}
      </div>
    </div>
  );
}
