import { useState } from "react";
import {
  BellOff,
  Clock,
  Map as MapIcon,
  MoreHorizontal,
  Phone,
  Truck,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MessengerAvatar, MessengerIconChip } from "./primitives";
import { roleStyles, type Contact } from "./types";
import {
  NOTIFICATION_LEVELS,
  SNOOZE_OPTIONS,
  type NotificationLevel,
} from "./messenger-constants";

export function MessengerChatHeader({
  active,
  onOpenCallLog,
}: {
  active: Contact;
  onOpenCallLog: () => void;
}) {
  const isChannel = active.kind === "channel";
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifLevel, setNotifLevel] = useState<NotificationLevel>("All Messages");

  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
      <div className="flex items-center gap-3">
        <MessengerAvatar
          src={active.avatar}
          name={active.name}
          kind={active.kind}
          online={active.kind === "dm" ? active.online : undefined}
        />
        <div>
          <div className="flex items-center gap-2">
            {isChannel && <span className="text-muted-foreground">#</span>}
            <h3 className="text-[15px] font-semibold">{active.name}</h3>
            {!isChannel && active.kind === "dm" && (
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  roleStyles[active.role],
                )}
              >
                {active.role}
              </span>
            )}
            {active.linkedLoad && (
              <span className="inline-flex items-center gap-1 rounded-md border border-orange/35 bg-orange/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange">
                <Truck className="size-3" />
                {active.linkedLoad.id}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {isChannel ? (
              active.channelTopic ?? "Channel"
            ) : (
              <>
                {active.online ? (
                  <span className="text-success">● Online</span>
                ) : (
                  <span>Offline</span>
                )}
                {active.company ? ` · ${active.company}` : ""}
                <span className="ml-2 text-muted-foreground">· {notifLevel}</span>
              </>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MessengerIconChip title="Call" onClick={onOpenCallLog}>
          <Phone className="size-4" />
        </MessengerIconChip>
        <MessengerIconChip
          title="Video"
          onClick={() => toast.success(`Starting video with ${active.name}…`)}
        >
          <Video className="size-4" />
        </MessengerIconChip>
        <MessengerIconChip
          title="View on map"
          tone="teal"
          onClick={() => toast.info("Opening live map…")}
        >
          <MapIcon className="size-4" />
        </MessengerIconChip>

        <div className="relative">
          <MessengerIconChip title="More" onClick={() => setMenuOpen((v) => !v)}>
            <MoreHorizontal className="size-4" />
          </MessengerIconChip>
          {menuOpen && (
            <div
              className="absolute right-0 top-11 z-30 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#101326]/95 shadow-2xl"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <div className="border-b border-white/[0.06] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Clock className="mr-1 inline size-3" /> Snooze
              </div>
              {SNOOZE_OPTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    setMenuOpen(false);
                    toast.success(`Snoozed for ${s.label}`);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-[12px] text-foreground hover:bg-white/5"
                >
                  {s.label}
                </button>
              ))}
              <div className="border-b border-t border-white/[0.06] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <BellOff className="mr-1 inline size-3" /> Notifications
              </div>
              {NOTIFICATION_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setNotifLevel(lvl);
                    setMenuOpen(false);
                    toast.success(`Notifications: ${lvl}`);
                  }}
                  className={cn(
                    "block w-full px-3 py-1.5 text-left text-[12px] hover:bg-white/5",
                    notifLevel === lvl ? "text-primary" : "text-foreground",
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
