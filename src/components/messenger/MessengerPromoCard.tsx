import { Sparkles } from "lucide-react";

export function MessengerPromoCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#6D35E8]/30 bg-gradient-to-br from-[#6D35E8]/25 via-[#101326] to-[#0D1020] p-4">
      <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-[#6D35E8]/40 blur-2xl" />
      <div className="relative flex items-start gap-3">
        <div className="grid size-9 place-items-center rounded-xl bg-[#6D35E8]/30 text-primary">
          <Sparkles className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">
            AI Dispatch Assist
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Summarize a thread, draft an ETA update, or send a rate confirmation
            in one click.
          </p>
        </div>
      </div>
    </div>
  );
}
