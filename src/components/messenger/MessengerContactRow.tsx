import { Pin, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessengerAvatar } from "./primitives";
import { etaRiskStyles, priorityStyles, roleStyles, type Contact } from "./types";

export function MessengerContactRow({
  c,
  active,
  onClick,
}: {
  c: Contact;
  active: boolean;
  onClick: () => void;
}) {
  const isChannel = c.kind === "channel";
  const isLoad = c.kind === "load";
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all",
        active
          ? "border border-primary/40 bg-primary/15 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_25%,transparent),0_8px_28px_-12px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
          : "border border-transparent hover:bg-foreground/[0.04]",
      )}
    >
      <MessengerAvatar
        src={c.avatar}
        name={c.name}
        kind={c.kind}
        online={c.kind === "dm" ? c.online ?? false : undefined}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {isChannel && <span className="text-muted-foreground">#</span>}
          <span className="truncate text-[13px] font-semibold text-foreground">
            {isChannel ? c.name : c.name}
          </span>
          {c.pinned && <Pin className="size-3 text-primary" />}
          {!isChannel && !isLoad && (
            <span
              className={cn(
                "shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                roleStyles[c.role],
              )}
            >
              {c.role}
            </span>
          )}
          {c.priority && c.priority !== "normal" && (
            <span
              className={cn(
                "shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                priorityStyles[c.priority],
              )}
            >
              {c.priority}
            </span>
          )}
        </div>
        <p
          className={cn(
            "mt-0.5 truncate text-[11.5px]",
            c.typing ? "text-primary" : "text-muted-foreground",
          )}
        >
          {c.typing ? "typing…" : c.preview}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {c.linkedLoad && (
            <span className="inline-flex items-center gap-1 rounded-md border border-orange/30 bg-orange/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-orange">
              <Truck className="size-2.5" />
              {c.linkedLoad.id}
            </span>
          )}
          {c.etaRisk && (
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                etaRiskStyles[c.etaRisk].cls,
              )}
            >
              {etaRiskStyles[c.etaRisk].label}
            </span>
          )}
          {c.kind === "dm" && (
            <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
              · {c.online ? "Online" : "Offline"}
            </span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-[10px] text-muted-foreground">{c.time}</span>
        {c.unread > 0 && (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1.5 text-[10px] font-semibold text-destructive-foreground shadow-[0_0_10px_-2px_color-mix(in_oklab,var(--destructive)_70%,transparent)]">
            {c.unread}
          </span>
        )}
      </div>
    </button>
  );
}
