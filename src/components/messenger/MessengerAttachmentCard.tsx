import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function MessengerAttachmentCard({
  filename,
  filetype,
  variant = "bubble",
  onRemove,
  size,
}: {
  filename: string;
  filetype: string;
  variant?: "bubble" | "composer";
  onRemove?: () => void;
  size?: number;
}) {
  if (variant === "composer") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2">
        <div className="grid size-9 place-items-center rounded-lg bg-primary/25 text-primary">
          <FileText className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm text-foreground">{filename}</div>
          <div className="text-[11px] text-muted-foreground">
            {filetype}
            {size ? ` · ${Math.round(size / 1024)} KB` : ""}
          </div>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Remove
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-3 py-2.5")}>
      <div className="grid size-10 place-items-center rounded-xl bg-primary/20 text-primary">
        <FileText className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{filename}</div>
        <div className="text-[11px] text-muted-foreground">{filetype}</div>
      </div>
      <button
        onClick={() => toast.success("Downloading…")}
        className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary hover:bg-primary/25"
      >
        <Download className="size-4" />
      </button>
    </div>
  );
}
