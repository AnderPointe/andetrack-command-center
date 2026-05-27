import {
  AlertTriangle,
  Bell,
  MapPin,
  Phone,
  Send,
  Shield,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MessengerAvatar } from "./primitives";
import { roleStyles, type Contact } from "./types";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}

function KV({ k, v, tone }: { k: string; v: React.ReactNode; tone?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1 text-[12px]">
      <span className="text-muted-foreground">{k}</span>
      <span className={cn("text-right font-medium text-foreground", tone)}>{v}</span>
    </div>
  );
}

function CtaButton({
  children,
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "danger" | "teal";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border px-3 py-2 text-[12px] font-semibold transition-all",
        variant === "primary" &&
          "border-[#6D35E8]/50 bg-[#6D35E8]/20 text-foreground hover:bg-[#6D35E8]/30 shadow-[0_8px_28px_-12px_rgba(109,53,232,0.6)]",
        variant === "danger" &&
          "border-[#EF4444]/40 bg-[#EF4444]/15 text-red-200 hover:bg-[#EF4444]/25",
        variant === "teal" &&
          "border-teal-400/40 bg-teal-500/15 text-teal-200 hover:bg-teal-500/25",
        variant === "default" &&
          "border-white/[0.08] bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
      )}
    >
      {children}
    </button>
  );
}

export function MessengerContextPanel({ active }: { active: Contact }) {
  const isChannel = active.kind === "channel";
  const isLoad = active.kind === "load";
  const isDriver = active.kind === "dm" && active.role === "Driver";
  const isCustomer = active.kind === "dm" && active.role === "Customer";

  return (
    <aside className="hidden w-[320px] shrink-0 flex-col rounded-3xl border border-white/[0.08] bg-[#101326]/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)] xl:flex">
      <div className="border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-center gap-3">
          <MessengerAvatar
            src={active.avatar}
            name={active.name}
            kind={active.kind}
            online={active.kind === "dm" ? active.online : undefined}
            size={44}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-[14px] font-semibold">{active.name}</h4>
              {!isChannel && !isLoad && (
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                    roleStyles[active.role],
                  )}
                >
                  {active.role}
                </span>
              )}
            </div>
            <p className="truncate text-[11px] text-muted-foreground">
              {active.company ?? active.channelTopic ?? "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {isDriver && (
          <>
            <Section title="Driver">
              <KV k="Vehicle" v="Freightliner Cascadia · TX-48291" />
              <KV k="Current load" v={active.linkedLoad?.id ?? "—"} />
              <KV
                k="GPS"
                v={
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3 text-teal" />
                    Round Rock, TX
                  </span>
                }
              />
              <KV k="ETA" v={active.linkedLoad?.eta ?? "—"} tone="text-success" />
              <KV k="Last seen" v="2 min ago" />
              <KV
                k="Safety"
                v={
                  <span className="inline-flex items-center gap-1 text-success">
                    <Shield className="size-3" /> Clear
                  </span>
                }
              />
            </Section>
            <Section title="Route progress">
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Austin → Dallas</span>
                <span className="font-semibold text-foreground">78%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#6D35E8] to-[#14B8A6]"
                  style={{ width: "78%" }}
                />
              </div>
            </Section>
            <div className="space-y-2">
              <CtaButton variant="primary" onClick={() => toast.info("Opening live map…")}>
                <span className="inline-flex items-center justify-center gap-2">
                  <MapPin className="size-3.5" /> View on Map
                </span>
              </CtaButton>
              <CtaButton onClick={() => toast.success("Load assignment opened")}>
                Assign Load
              </CtaButton>
              <CtaButton onClick={() => toast.success("Reassign flow started")}>
                Reassign Load
              </CtaButton>
              <CtaButton
                variant="teal"
                onClick={() => toast.success(`Calling ${active.name}…`)}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Phone className="size-3.5" /> Call Driver
                </span>
              </CtaButton>
            </div>
          </>
        )}

        {(isLoad || (active.linkedLoad && !isDriver && !isCustomer && !isChannel)) && (
          <>
            <Section title="Load">
              <KV k="Load ID" v={active.linkedLoad?.id ?? active.name} />
              <KV k="Pickup" v={active.linkedLoad?.origin ?? "—"} />
              <KV k="Dropoff" v={active.linkedLoad?.destination ?? "—"} />
              <KV k="Cargo" v="Dry van · 12 pallets" />
              <KV k="Weight" v="18,400 lb" />
              <KV k="Driver" v="Marcus Reed" />
              <KV
                k="Status"
                v={
                  <span className="text-success">{active.linkedLoad?.status ?? "—"}</span>
                }
              />
              <KV k="ETA" v={active.linkedLoad?.eta ?? "—"} />
              <KV
                k="Route risk"
                v={
                  <span className="inline-flex items-center gap-1 text-orange">
                    <AlertTriangle className="size-3" /> Weather
                  </span>
                }
              />
            </Section>
            <div className="space-y-2">
              <CtaButton variant="primary" onClick={() => toast.info("Opening route…")}>
                <span className="inline-flex items-center justify-center gap-2">
                  <Truck className="size-3.5" /> View Route
                </span>
              </CtaButton>
              <CtaButton onClick={() => toast.success("Customer notified")}>
                <span className="inline-flex items-center justify-center gap-2">
                  <Send className="size-3.5" /> Notify Customer
                </span>
              </CtaButton>
              <CtaButton
                variant="danger"
                onClick={() => toast.success("Dispatch alert created")}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Bell className="size-3.5" /> Create Alert
                </span>
              </CtaButton>
            </div>
          </>
        )}

        {isCustomer && (
          <>
            <Section title="Customer">
              <KV k="Account" v={active.company ?? "—"} />
              <KV k="Active order" v="ORD-9821" />
              <KV k="Phone" v="+1 (512) 555-0140" />
              <KV k="Email" v="sarah@miltonretail.com" />
              <KV
                k="SLA"
                v={<span className="text-success">On track · 98%</span>}
              />
            </Section>
            <Section title="Recent activity">
              <KV k="Last update" v="Delivery window question" />
              <KV k="Open tickets" v="1" />
            </Section>
            <div className="space-y-2">
              <CtaButton variant="primary" onClick={() => toast.success("Update sent")}>
                Send Update
              </CtaButton>
              <CtaButton onClick={() => toast.success("Ticket created")}>
                Create Ticket
              </CtaButton>
              <CtaButton
                variant="danger"
                onClick={() => toast.success("Escalated to manager")}
              >
                Escalate
              </CtaButton>
            </div>
          </>
        )}

        {isChannel && (
          <>
            <Section title="Channel">
              <KV k="Topic" v={active.channelTopic ?? "—"} />
              <KV k="Members" v="12" />
              <KV k="Priority" v={active.priority ?? "normal"} />
            </Section>
            <Section title="AI summary">
              <p className="text-[12px] leading-relaxed text-foreground/80">
                Active weather advisory on I-35; 2 loads re-routed via US-77.
                Average ETA delta +18 min. No safety incidents in the last hour.
              </p>
            </Section>
            <div className="space-y-2">
              <CtaButton variant="primary" onClick={() => toast.success("Pinned message")}>
                Pin a message
              </CtaButton>
              <CtaButton onClick={() => toast.success("Internal note saved")}>
                Add internal note
              </CtaButton>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
