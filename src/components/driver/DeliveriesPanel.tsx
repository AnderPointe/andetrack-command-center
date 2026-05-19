import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { api, type ProofOfDeliveryRow, type LoadRow, type DriverRow } from "@/api/anderoute";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  Image as ImageIcon,
  PenLine,
  RefreshCw,
  Inbox,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { PODDetailDrawer } from "./PODDetailDrawer";

/**
 * Driver-facing Deliveries panel.
 *
 * Shows every Proof of Delivery the signed-in driver has submitted, with a
 * clear "Awaiting dispatch" vs "Confirmed by dispatch" state. Subscribes to
 * realtime updates so confirmation toggles appear without a refresh.
 */
export function DeliveriesPanel() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Resolve the driver record for the signed-in user (drivers.user_id).
  const driverQ = useQuery({
    queryKey: ["my-driver", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<DriverRow | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("drivers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const driverId = driverQ.data?.id ?? null;

  const podsQ = useQuery({
    queryKey: ["pods", driverId ?? "demo"],
    queryFn: async () => {
      // If the signed-in user is a dispatcher (no driver row), show the
      // company's most recent PODs as a fallback so the screen still feels
      // populated for demo accounts.
      if (!driverId) return api.listPODs();
      return api.listPODsForDriver(driverId);
    },
  });

  // Load lookups so we can show route/customer next to each POD
  const loadsQ = useQuery({ queryKey: ["loads"], queryFn: api.listLoads });
  const loadById = useMemo(() => {
    const m = new Map<string, LoadRow>();
    (loadsQ.data ?? []).forEach((l) => m.set(l.id, l));
    return m;
  }, [loadsQ.data]);

  // Realtime: refresh when dispatch confirms a POD
  useEffect(() => {
    const channel = supabase
      .channel("pod-confirmations")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "proof_of_delivery" },
        () => qc.invalidateQueries({ queryKey: ["pods"] }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  const confirmMut = useMutation({
    mutationFn: (id: string) => api.confirmPOD(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pods"] }),
  });

  const pods = podsQ.data ?? [];
  const pending = pods.filter((p) => !p.dispatch_confirmed).length;
  const confirmed = pods.length - pending;

  const loading = driverQ.isLoading || podsQ.isLoading;

  return (
    <div className="flex h-full flex-col gap-4 p-4 md:p-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Deliveries</h1>
          <p className="text-sm text-muted-foreground">
            Proof of delivery submissions and dispatch confirmation status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatPill icon={Clock3} label="Awaiting" value={pending} tone="warn" />
          <StatPill icon={CheckCircle2} label="Confirmed" value={confirmed} tone="ok" />
          <Button
            size="sm"
            variant="outline"
            onClick={() => podsQ.refetch()}
            disabled={podsQ.isFetching}
            className="gap-1.5"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", podsQ.isFetching && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </header>

      {loading ? (
        <SkeletonList />
      ) : pods.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollArea className="-mx-2 flex-1 px-2">
          <ul className="space-y-3 pb-6">
            {pods.map((pod) => (
              <PODCard
                key={pod.id}
                pod={pod}
                load={pod.load_id ? loadById.get(pod.load_id) ?? null : null}
                showConfirmButton={!driverId} // dispatcher-style helper
                onConfirm={() => confirmMut.mutate(pod.id)}
                confirming={confirmMut.isPending && confirmMut.variables === pod.id}
              />
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}

function PODCard({
  pod,
  load,
  showConfirmButton,
  onConfirm,
  confirming,
}: {
  pod: ProofOfDeliveryRow;
  load: LoadRow | null;
  showConfirmButton: boolean;
  onConfirm: () => void;
  confirming: boolean;
}) {
  const confirmed = pod.dispatch_confirmed;
  return (
    <li>
      <Card
        className={cn(
          "overflow-hidden border bg-card/60 p-4 backdrop-blur transition-colors",
          confirmed
            ? "border-emerald-500/30"
            : "border-amber-500/30",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <PackageCheck className="h-3.5 w-3.5" />
              <span className="truncate font-mono">
                Load {load?.id?.slice(0, 8) ?? pod.load_id?.slice(0, 8) ?? "—"}
              </span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(pod.captured_at), { addSuffix: true })}</span>
            </div>
            <h3 className="mt-1 truncate text-sm font-semibold">
              {load?.customer ?? "Customer"} — {load?.dropoff_location ?? "Drop-off"}
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              Received by{" "}
              <span className="text-foreground">{pod.signature_name || "—"}</span>
            </p>
          </div>

          {confirmed ? (
            <Badge
              variant="outline"
              className="shrink-0 gap-1 border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="h-3 w-3" />
              Dispatch confirmed
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="shrink-0 gap-1 border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
              <Clock3 className="h-3 w-3" />
              Awaiting dispatch
            </Badge>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          {pod.signature_name && (
            <Chip icon={PenLine} label="Signature captured" />
          )}
          {pod.photo_url && (
            <a
              href={pod.photo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-muted-foreground hover:text-foreground"
            >
              <ImageIcon className="h-3 w-3" /> View photo
            </a>
          )}
          {pod.notes && (
            <span className="line-clamp-1 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-muted-foreground">
              “{pod.notes}”
            </span>
          )}
        </div>

        {confirmed ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Confirmed{" "}
            {pod.dispatch_confirmed_at
              ? formatDistanceToNow(new Date(pod.dispatch_confirmed_at), { addSuffix: true })
              : ""}
            . Cleared from your queue.
          </p>
        ) : (
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              Dispatch hasn’t marked this delivery as received yet.
            </p>
            {showConfirmButton && (
              <Button size="sm" onClick={onConfirm} disabled={confirming}>
                {confirming ? "Confirming…" : "Mark received"}
              </Button>
            )}
          </div>
        )}
      </Card>
    </li>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Clock3;
  label: string;
  value: number;
  tone: "ok" | "warn";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
        tone === "ok"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="font-medium">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function Chip({ icon: Icon, label }: { icon: typeof PenLine; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-muted-foreground">
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-lg border border-border/40 bg-muted/30"
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-center">
      <div className="rounded-full bg-muted p-3 text-muted-foreground">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="mt-3 text-base font-semibold">No deliveries yet</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Once you complete a drop-off and submit a Proof of Delivery, it will
        appear here with live dispatch confirmation status.
      </p>
      <p className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
        <AlertCircle className="h-3 w-3" />
        Confirmations from dispatch arrive in real time.
      </p>
    </div>
  );
}
