import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { drivers as allDrivers } from "@/data/mock";
import type { Driver } from "@/types";
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Search,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CallDriverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDriverId?: string | null;
}

type CallState = "idle" | "ringing" | "active" | "ended";

export function CallDriverDialog({
  open,
  onOpenChange,
  initialDriverId = null,
}: CallDriverDialogProps) {
  const [driverId, setDriverId] = useState<string | null>(initialDriverId);
  const [query, setQuery] = useState("");
  const [callState, setCallState] = useState<CallState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const timerRef = useRef<number | null>(null);

  // reset on open
  useEffect(() => {
    if (open) {
      setDriverId(initialDriverId);
      setQuery("");
      setCallState("idle");
      setSeconds(0);
      setMuted(false);
      setSpeaker(false);
    }
  }, [open, initialDriverId]);

  // call state machine
  useEffect(() => {
    if (callState === "ringing") {
      const t = window.setTimeout(() => setCallState("active"), 1800);
      return () => window.clearTimeout(t);
    }
    if (callState === "active") {
      timerRef.current = window.setInterval(
        () => setSeconds((s) => s + 1),
        1000,
      );
      return () => {
        if (timerRef.current) window.clearInterval(timerRef.current);
      };
    }
  }, [callState]);

  const driver = useMemo(
    () => allDrivers.find((d) => d.id === driverId) ?? null,
    [driverId],
  );

  const filtered = useMemo(
    () =>
      allDrivers.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.id.toLowerCase().includes(query.toLowerCase()) ||
          d.phone.includes(query),
      ),
    [query],
  );

  const startCall = () => {
    if (!driver) return;
    setSeconds(0);
    setCallState("ringing");
  };

  const endCall = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setCallState("ended");
    if (driver) {
      toast.success(`Call with ${driver.name} ended`, {
        description:
          seconds > 0
            ? `Duration ${formatTime(seconds)}`
            : "Call was not connected",
      });
    }
    setTimeout(() => onOpenChange(false), 250);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-3 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <PhoneCall className="size-5 text-teal" />
            {driver && callState !== "idle" ? "Calling driver" : "Call a driver"}
          </DialogTitle>
          <DialogDescription>
            {driver && callState !== "idle"
              ? "Voice call through Anderoute dispatch."
              : "Select a driver to start a voice call."}
          </DialogDescription>
        </DialogHeader>

        {!driver || callState === "idle" ? (
          <DriverPicker
            query={query}
            onQuery={setQuery}
            drivers={filtered}
            driverId={driverId}
            onPick={setDriverId}
            onStart={startCall}
            onClose={() => onOpenChange(false)}
          />
        ) : (
          <ActiveCallView
            driver={driver}
            callState={callState}
            seconds={seconds}
            muted={muted}
            speaker={speaker}
            onMute={() => setMuted((m) => !m)}
            onSpeaker={() => setSpeaker((s) => !s)}
            onEnd={endCall}
            onBack={() => {
              if (timerRef.current) window.clearInterval(timerRef.current);
              setCallState("idle");
              setSeconds(0);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function DriverPicker({
  query,
  onQuery,
  drivers,
  driverId,
  onPick,
  onStart,
  onClose,
}: {
  query: string;
  onQuery: (v: string) => void;
  drivers: Driver[];
  driverId: string | null;
  onPick: (id: string) => void;
  onStart: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="px-4 pt-3 pb-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search driver, ID, phone…"
            className="h-9 pl-9 text-sm"
            autoFocus
          />
        </div>
      </div>
      <div className="max-h-[50vh] overflow-y-auto p-2 space-y-1">
        {drivers.length === 0 ? (
          <div className="text-center text-xs text-muted-foreground py-10">
            No drivers match
          </div>
        ) : (
          drivers.map((d) => {
            const initials = d.name.split(" ").map((n) => n[0]).join("");
            const selected = d.id === driverId;
            return (
              <button
                key={d.id}
                onClick={() => onPick(d.id)}
                className={cn(
                  "w-full text-left rounded-lg border px-3 py-2.5 transition flex items-center gap-3 hover:bg-secondary/40",
                  selected
                    ? "border-teal bg-teal/5"
                    : "border-transparent",
                )}
              >
                <div className="size-9 rounded-full bg-gradient-to-br from-teal/40 to-orange/40 grid place-items-center text-xs font-semibold shrink-0">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{d.name}</div>
                  <div className="text-[11px] text-muted-foreground tabular-nums">
                    {d.phone}
                  </div>
                </div>
                {selected && <Phone className="size-4 text-teal" />}
              </button>
            );
          })
        )}
      </div>
      <div className="px-6 py-4 border-t border-border flex justify-between gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onStart} disabled={!driverId}>
          <PhoneCall className="size-4" /> Start Call
        </Button>
      </div>
    </>
  );
}

function ActiveCallView({
  driver,
  callState,
  seconds,
  muted,
  speaker,
  onMute,
  onSpeaker,
  onEnd,
  onBack,
}: {
  driver: Driver;
  callState: CallState;
  seconds: number;
  muted: boolean;
  speaker: boolean;
  onMute: () => void;
  onSpeaker: () => void;
  onEnd: () => void;
  onBack: () => void;
}) {
  const initials = driver.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="bg-gradient-to-b from-teal/5 to-transparent">
      <div className="px-4 pt-2">
        <button
          onClick={onBack}
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <ChevronLeft className="size-3.5" /> Pick different driver
        </button>
      </div>
      <div className="flex flex-col items-center text-center px-6 py-6">
        <div className="relative">
          <div className="size-24 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-white text-2xl font-semibold ring-4 ring-white/60 dark:ring-white/10">
            {initials}
          </div>
          {callState === "ringing" && (
            <>
              <span className="absolute inset-0 rounded-full animate-ping bg-teal/20" />
              <span
                className="absolute inset-0 rounded-full animate-ping bg-teal/10"
                style={{ animationDelay: "300ms" }}
              />
            </>
          )}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{driver.name}</h3>
        <div className="text-xs text-muted-foreground tabular-nums">
          {driver.phone}
        </div>
        <div className="mt-3 text-sm tabular-nums text-teal font-medium">
          {callState === "ringing" && (
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-teal animate-pulse" />
              Ringing…
            </span>
          )}
          {callState === "active" && <span>{formatTime(seconds)}</span>}
          {callState === "ended" && (
            <span className="text-muted-foreground">Call ended</span>
          )}
        </div>

        {/* Controls */}
        <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-[280px]">
          <CallControl
            label={muted ? "Unmute" : "Mute"}
            active={muted}
            icon={muted ? MicOff : Mic}
            onClick={onMute}
            disabled={callState !== "active"}
          />
          <CallControl
            label={speaker ? "Speaker" : "Earpiece"}
            active={speaker}
            icon={speaker ? Volume2 : VolumeX}
            onClick={onSpeaker}
            disabled={callState !== "active"}
          />
          <CallControl
            label="Message"
            icon={MessageSquare}
            onClick={() =>
              toast.info("Open messages", {
                description: `Conversation with ${driver.name}`,
              })
            }
          />
        </div>

        <button
          onClick={onEnd}
          className="mt-6 size-16 rounded-full bg-destructive text-white grid place-items-center hover:bg-destructive/90 transition shadow-lg shadow-destructive/30"
          aria-label="End call"
        >
          <PhoneOff className="size-6" />
        </button>
        <div className="mt-2 text-[11px] text-muted-foreground">End call</div>
      </div>
    </div>
  );
}

function CallControl({
  label,
  icon: Icon,
  active,
  disabled,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center gap-1.5 py-3 rounded-xl border transition text-[10px] font-medium uppercase tracking-wider",
        active
          ? "border-teal bg-teal/10 text-teal"
          : "border-border hover:bg-secondary/40 text-muted-foreground",
        disabled && "opacity-40 cursor-not-allowed",
      )}
    >
      <Icon className="size-5" />
      {label}
    </button>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}
