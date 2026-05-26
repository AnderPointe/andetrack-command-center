import { Map as MapIcon, MoreHorizontal, Phone, Truck, Video } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MessengerAvatar, MessengerIconChip } from "./primitives";
import { roleStyles, type Contact } from "./types";

export function MessengerChatHeader({ active }: { active: Contact }) {
  const isChannel = active.kind === "channel";
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
            {isChannel && <span className="text-[#8B90A7]">#</span>}
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
              <span className="inline-flex items-center gap-1 rounded-md border border-[#F97316]/35 bg-[#F97316]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-300">
                <Truck className="size-3" />
                {active.linkedLoad.id}
              </span>
            )}
          </div>
          <p className="text-xs text-[#8B90A7]">
            {isChannel
              ? active.channelTopic ?? "Channel"
              : (
                <>
                  {active.online ? (
                    <span className="text-[#5EE6A0]">● Online</span>
                  ) : (
                    <span>Offline</span>
                  )}
                  {active.company ? ` · ${active.company}` : ""}
                </>
              )}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MessengerIconChip
          title="Call"
          onClick={() => toast.success(`Calling ${active.name}…`)}
        >
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
        <MessengerIconChip title="More">
          <MoreHorizontal className="size-4" />
        </MessengerIconChip>
      </div>
    </div>
  );
}
