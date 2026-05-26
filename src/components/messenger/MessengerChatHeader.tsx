import { MoreHorizontal, Phone, Video } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MessengerAvatar, MessengerIconChip } from "./primitives";
import { roleStyles, type Contact } from "./types";

export function MessengerChatHeader({ active }: { active: Contact }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
      <div className="flex items-center gap-3">
        <MessengerAvatar src={active.avatar} name={active.name} />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold">{active.name}</h3>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                roleStyles[active.role],
              )}
            >
              {active.role}
            </span>
          </div>
          <p className="text-xs text-[#8B90A7]">{active.company ?? "—"}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MessengerIconChip onClick={() => toast.success(`Calling ${active.name}…`)}>
          <Phone className="size-4" />
        </MessengerIconChip>
        <MessengerIconChip
          onClick={() => toast.success(`Starting video with ${active.name}…`)}
        >
          <Video className="size-4" />
        </MessengerIconChip>
        <MessengerIconChip>
          <MoreHorizontal className="size-4" />
        </MessengerIconChip>
      </div>
    </div>
  );
}
