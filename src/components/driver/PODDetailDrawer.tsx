import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Clock3,
  PenLine,
  Image as ImageIcon,
  MapPin,
  Truck,
  User as UserIcon,
  FileText,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import type { ProofOfDeliveryRow, LoadRow } from "@/api/anderoute";

interface Props {
  pod: ProofOfDeliveryRow | null;
  load: LoadRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  showConfirmAction?: boolean;
  confirming?: boolean;
}

export function PODDetailDrawer({
  pod,
  load,
  open,
  onOpenChange,
  onConfirm,
  showConfirmAction,
  confirming,
}: Props) {
  if (!pod) return null;
  const confirmed = pod.dispatch_confirmed;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-md"
      >
        {/* Status banner */}
        <div
          className={cn(
            "px-6 pt-6 pb-4 border-b",
            confirmed
              ? "bg-emerald-500/5 border-emerald-500/20"
              : "bg-amber-500/5 border-amber-500/20",
          )}
        >
          <SheetHeader className="space-y-2 text-left">
            <div className="flex items-center justify-between gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "gap-1",
                  confirmed
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
                )}
              >
                {confirmed ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" /> Dispatch confirmed
                  </>
                ) : (
                  <>
                    <Clock3 className="h-3 w-3" /> Awaiting dispatch
                  </>
                )}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                POD #{pod.id.slice(0, 8)}
              </span>
            </div>
            <SheetTitle className="text-lg">
              {load?.customer ?? "Customer"}
            </SheetTitle>
            <SheetDescription className="flex items-center gap-1.5 text-xs">
              <MapPin className="h-3 w-3" />
              {load?.dropoff_location ?? "Drop-off location"}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="space-y-6 px-6 py-5">
          {/* Photo */}
          {pod.photo_url ? (
            <Section icon={ImageIcon} label="Delivery photo">
              <a
                href={pod.photo_url}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-lg border border-border bg-muted"
              >
                <img
                  src={pod.photo_url}
                  alt="Proof of delivery"
                  className="h-56 w-full object-cover"
                />
              </a>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                Tap to open full-size in a new tab.
              </p>
            </Section>
          ) : (
            <Section icon={ImageIcon} label="Delivery photo">
              <EmptyTile>No photo captured</EmptyTile>
            </Section>
          )}

          {/* Signature */}
          <Section icon={PenLine} label="Signature">
            {pod.signature_name ? (
              <div className="rounded-lg border bg-background px-3 py-3">
                <div className="font-serif text-2xl italic text-foreground/90">
                  {pod.signature_name}
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  Signed by receiver
                </p>
              </div>
            ) : (
              <EmptyTile>No signature on file</EmptyTile>
            )}
          </Section>

          {/* Notes */}
          {pod.notes && (
            <Section icon={FileText} label="Driver notes">
              <p className="rounded-lg border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground/90">
                {pod.notes}
              </p>
            </Section>
          )}

          <Separator />

          {/* Capture metadata */}
          <Section icon={Calendar} label="Capture details">
            <div className="grid grid-cols-1 gap-2 text-sm">
              <MetaRow
                icon={Clock3}
                label="Captured"
                value={format(new Date(pod.captured_at), "PPp")}
                hint={formatDistanceToNow(new Date(pod.captured_at), { addSuffix: true })}
              />
              {load && (
                <>
                  <MetaRow
                    icon={Truck}
                    label="Load"
                    value={`#${load.id.slice(0, 8)}`}
                    hint={load.commodity ?? undefined}
                  />
                  <MetaRow
                    icon={MapPin}
                    label="Route"
                    value={`${load.pickup_location} → ${load.dropoff_location}`}
                  />
                </>
              )}
              {pod.driver_id && (
                <MetaRow
                  icon={UserIcon}
                  label="Driver ID"
                  value={pod.driver_id.slice(0, 8)}
                  mono
                />
              )}
            </div>
          </Section>

          {/* Confirmation metadata */}
          <Section icon={ShieldCheck} label="Dispatch confirmation">
            {confirmed ? (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Received by dispatch
                </div>
                <dl className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {pod.dispatch_confirmed_at && (
                    <div className="flex justify-between gap-3">
                      <dt>Confirmed at</dt>
                      <dd className="text-right text-foreground">
                        {format(new Date(pod.dispatch_confirmed_at), "PPp")}
                      </dd>
                    </div>
                  )}
                  {pod.dispatch_confirmed_at && (
                    <div className="flex justify-between gap-3">
                      <dt>Turnaround</dt>
                      <dd className="text-right text-foreground">
                        {formatDistanceToNow(new Date(pod.dispatch_confirmed_at), {
                          addSuffix: false,
                        })}{" "}
                        after capture
                      </dd>
                    </div>
                  )}
                  {pod.dispatch_confirmed_by && (
                    <div className="flex justify-between gap-3">
                      <dt>Confirmed by</dt>
                      <dd className="text-right font-mono text-foreground">
                        {pod.dispatch_confirmed_by.slice(0, 8)}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            ) : (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-amber-700 dark:text-amber-400">
                  <Clock3 className="h-4 w-4" /> Pending review
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Submitted{" "}
                  {formatDistanceToNow(new Date(pod.captured_at), { addSuffix: true })}.
                  You’ll see a confirmation here the moment dispatch marks it received.
                </p>
              </div>
            )}

            {showConfirmAction && !confirmed && onConfirm && (
              <Button
                className="mt-3 w-full"
                onClick={onConfirm}
                disabled={confirming}
              >
                {confirming ? "Confirming…" : "Mark received"}
              </Button>
            )}
          </Section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock3;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </h4>
      {children}
    </section>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
  hint,
  mono,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border bg-background px-3 py-2">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </span>
      <span className="text-right">
        <span className={cn("text-sm text-foreground", mono && "font-mono")}>{value}</span>
        {hint && <span className="block text-[11px] text-muted-foreground">{hint}</span>}
      </span>
    </div>
  );
}

function EmptyTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed bg-muted/30 px-3 py-4 text-center text-xs text-muted-foreground">
      {children}
    </div>
  );
}
