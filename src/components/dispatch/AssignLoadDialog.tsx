import { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { drivers as allDrivers, loads as allLoads } from "@/data/mock";
import type { Driver, Load } from "@/types";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import {
  Search,
  Truck,
  Package,
  MapPin,
  ArrowRight,
  ShieldAlert,
  Check,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AssignLoadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDriverId?: string | null;
  initialLoadId?: string | null;
}

const isAvailable = (d: Driver) =>
  ["waiting", "accepted", "offered"].includes(d.status);

export function AssignLoadDialog({
  open,
  onOpenChange,
  initialDriverId = null,
  initialLoadId = null,
}: AssignLoadDialogProps) {
  const [driverId, setDriverId] = useState<string | null>(initialDriverId);
  const [loadId, setLoadId] = useState<string | null>(initialLoadId);
  const [driverQuery, setDriverQuery] = useState("");
  const [loadQuery, setLoadQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setDriverId(initialDriverId);
      setLoadId(initialLoadId);
      setDriverQuery("");
      setLoadQuery("");
    }
  }, [open, initialDriverId, initialLoadId]);

  const availableDrivers = useMemo(
    () =>
      allDrivers
        .filter(isAvailable)
        .filter((d) =>
          d.name.toLowerCase().includes(driverQuery.toLowerCase()) ||
          d.id.toLowerCase().includes(driverQuery.toLowerCase()),
        ),
    [driverQuery],
  );

  const openLoads = useMemo(
    () =>
      allLoads
        .filter((l) => !l.assignedDriverId || l.id === initialLoadId)
        .filter((l) =>
          l.id.toLowerCase().includes(loadQuery.toLowerCase()) ||
          l.customer.toLowerCase().includes(loadQuery.toLowerCase()) ||
          l.pickupLocation.toLowerCase().includes(loadQuery.toLowerCase()) ||
          l.dropoffLocation.toLowerCase().includes(loadQuery.toLowerCase()),
        ),
    [loadQuery, initialLoadId],
  );

  const driver = allDrivers.find((d) => d.id === driverId) ?? null;
  const load = allLoads.find((l) => l.id === loadId) ?? null;

  const vehicleMatches =
    driver && load ? driver.vehicleType === load.requiredVehicleType : true;
  const cdlOk = driver && load ? !load.requiresCDL || driver.cdlStatus : true;

  const canSubmit = !!driver && !!load && !submitting;

  const handleSubmit = async () => {
    if (!driver || !load) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success(`Load ${load.id} assigned to ${driver.name}`, {
      description: `${load.pickupLocation} → ${load.dropoffLocation}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-3 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="size-5 text-teal" /> Assign Load to Driver
          </DialogTitle>
          <DialogDescription>
            Pick an available driver and an open load. We'll verify vehicle
            type and CDL requirements before dispatching.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[60vh]">
          {/* Drivers */}
          <ColumnPanel
            title="Available Drivers"
            count={availableDrivers.length}
            search={driverQuery}
            onSearch={setDriverQuery}
            placeholder="Search drivers…"
          >
            {availableDrivers.length === 0 ? (
              <EmptyState text="No available drivers match" />
            ) : (
              availableDrivers.map((d) => (
                <DriverRow
                  key={d.id}
                  driver={d}
                  selected={d.id === driverId}
                  onSelect={() => setDriverId(d.id)}
                />
              ))
            )}
          </ColumnPanel>

          {/* Loads */}
          <ColumnPanel
            title="Open Loads"
            count={openLoads.length}
            search={loadQuery}
            onSearch={setLoadQuery}
            placeholder="Search loads, customer, lane…"
            bordered
          >
            {openLoads.length === 0 ? (
              <EmptyState text="No open loads match" />
            ) : (
              openLoads.map((l) => (
                <LoadRow
                  key={l.id}
                  load={l}
                  selected={l.id === loadId}
                  onSelect={() => setLoadId(l.id)}
                />
              ))
            )}
          </ColumnPanel>
        </div>

        {/* Summary */}
        <div className="px-6 py-3 border-t border-border bg-secondary/30">
          {driver && load ? (
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="text-sm">
                <div className="font-semibold flex items-center gap-2">
                  {driver.name}
                  <ArrowRight className="size-3.5 text-muted-foreground" />
                  <span className="tabular-nums">{load.id}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {load.pickupLocation} → {load.dropoffLocation} ·{" "}
                  <span className="tabular-nums">${load.rate.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {!vehicleMatches && (
                  <Badge variant="outline" className="border-orange/40 text-orange text-[10px]">
                    <ShieldAlert className="size-3 mr-1" />
                    Vehicle: {driver.vehicleType} ≠ {load.requiredVehicleType}
                  </Badge>
                )}
                {!cdlOk && (
                  <Badge variant="outline" className="border-destructive/40 text-destructive text-[10px]">
                    <ShieldAlert className="size-3 mr-1" /> CDL required
                  </Badge>
                )}
                {vehicleMatches && cdlOk && (
                  <Badge variant="outline" className="border-teal/40 text-teal text-[10px]">
                    <Check className="size-3 mr-1" /> Compatible
                  </Badge>
                )}
              </div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">
              Select a driver and a load to continue.
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {submitting ? "Assigning…" : "Confirm Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ColumnPanel({
  title,
  count,
  search,
  onSearch,
  placeholder,
  bordered,
  children,
}: {
  title: string;
  count: number;
  search: string;
  onSearch: (v: string) => void;
  placeholder: string;
  bordered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col min-h-0",
        bordered && "md:border-l border-border",
      )}
    >
      <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title} <span className="tabular-nums text-foreground">({count})</span>
        </h3>
      </div>
      <div className="px-3 py-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={placeholder}
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">{children}</div>
    </div>
  );
}

function DriverRow({
  driver,
  selected,
  onSelect,
}: {
  driver: Driver;
  selected: boolean;
  onSelect: () => void;
}) {
  const initials = driver.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-lg border px-3 py-2.5 transition flex items-center gap-3 hover:bg-secondary/40",
        selected
          ? "border-teal bg-teal/5 ring-2 ring-teal/20"
          : "border-border",
      )}
    >
      <div className="size-9 rounded-full bg-gradient-to-br from-teal/40 to-orange/40 grid place-items-center text-xs font-semibold shrink-0">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium truncate">{driver.name}</span>
          <DriverStatusBadge status={driver.status} size="xs" />
        </div>
        <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
          <Truck className="size-3" /> {driver.vehicleType}
          {driver.cdlStatus && <span>· {driver.licenseType}</span>}
        </div>
      </div>
      {selected && <Check className="size-4 text-teal shrink-0" />}
    </button>
  );
}

function LoadRow({
  load,
  selected,
  onSelect,
}: {
  load: Load;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-lg border px-3 py-2.5 transition hover:bg-secondary/40",
        selected
          ? "border-teal bg-teal/5 ring-2 ring-teal/20"
          : "border-border",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Package className="size-3.5 text-teal shrink-0" />
          <span className="text-sm font-semibold tabular-nums">{load.id}</span>
          {load.requiresCDL && (
            <Badge variant="outline" className="text-[9px] border-orange/40 text-orange">
              CDL
            </Badge>
          )}
        </div>
        <span className="text-xs font-semibold tabular-nums">
          ${load.rate.toLocaleString()}
        </span>
      </div>
      <div className="text-[11px] text-muted-foreground mt-1 truncate">
        {load.customer} · {load.commodity}
      </div>
      <div className="text-[11px] mt-1 flex items-center gap-1.5">
        <MapPin className="size-3 text-muted-foreground shrink-0" />
        <span className="truncate">
          {load.pickupLocation} <span className="text-muted-foreground">→</span>{" "}
          {load.dropoffLocation}
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground tabular-nums">
        <span>{load.estimatedMiles} mi</span>
        <span>{load.requiredVehicleType}</span>
      </div>
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center text-xs text-muted-foreground py-8 border border-dashed border-border rounded-lg">
      {text}
    </div>
  );
}
