/**
 * Phase 3 — EliteNav demo panel.
 *
 * Drop-in component that exercises the entire Phase 3 stack against the mock
 * provider so the elite UI can be QA'd without any vendor SDK key:
 *
 *   request route → truck validation → start → progress → off-route → reroute
 *
 * Real SDK adapters slot in via DEFAULT_NAV_SETTINGS.navigation_provider.
 */
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Compass, Navigation2, Shield, ShieldAlert, Truck, Volume2 } from "lucide-react";
import {
  createNavigationSession,
  formatDistance,
  formatEta,
  getNavigationProvider,
  isTruckValidationRequired,
  ManeuverIcon,
  requestNavigationRoute,
  severityColorClass,
  startNavigationSession,
  stopNavigationSession,
  useNavigationETA,
  useNavigationEvents,
  useTurnByTurnInstruction,
  useTruckRouteValidation,
  useVoiceInstructionEvents,
  CoPilotBrain,
  type NavigationProviderId,
  type RouteRequest,
  type TruckRouteProfile,
  MockNavigationProvider,
} from "@/navigation";

interface Props {
  companyId: string;
  driverId: string;
  loadId?: string;
  providerId?: NavigationProviderId;
  validatorId?: NavigationProviderId;
}

const DEMO_PROFILE: TruckRouteProfile = {
  vehicle_type: "cdl_freight",
  requires_cdl: true,
  height_inches: 162,
  width_inches: 102,
  length_inches: 636,
  gross_weight_lbs: 78_000,
  axle_count: 5,
  trailer_count: 1,
  hazmat_enabled: false,
  hazmat_class: "none",
  tunnel_restriction_code: "none",
  kingpin_to_rear_axle_inches: 480,
  trailer_type: "dry_van",
  preferred_truck_routes: true,
  avoid_low_clearance: true,
  avoid_weight_restricted_roads: true,
  avoid_hazmat_restricted_roads: true,
  avoid_tight_turns: true,
  avoid_residential_roads: false,
  allow_toll_roads: true,
};

export function EliteNavPhase3Panel({
  companyId,
  driverId,
  loadId,
  providerId = "mock",
  validatorId = "mock",
}: Props) {
  const [stage, setStage] = useState<"idle" | "routed" | "validating" | "ready" | "active" | "complete">("idle");
  const [routeMiles, setRouteMiles] = useState(0);
  const [originalEta, setOriginalEta] = useState(0);
  const validation = useTruckRouteValidation(validatorId);
  const tbt = useTurnByTurnInstruction(providerId);
  const etaState = useNavigationETA(providerId);
  const events = useNavigationEvents(providerId);
  const voice = useVoiceInstructionEvents(providerId, 6);

  const req: RouteRequest = useMemo(
    () => ({
      company_id: companyId,
      driver_id: driverId,
      load_id: loadId ?? null,
      origin: { latitude: 32.776, longitude: -96.797, label: "Dallas, TX" },
      destination: { latitude: 29.76, longitude: -95.37, label: "Houston, TX" },
      route_profile: DEMO_PROFILE.vehicle_type,
      vehicle_profile: DEMO_PROFILE,
      truck_routing_enabled: true,
      traffic_enabled: true,
      alternatives_enabled: true,
      requested_provider: providerId,
    }),
    [companyId, driverId, loadId, providerId],
  );

  const cdlRequired = isTruckValidationRequired(DEMO_PROFILE);

  async function handleRequestRoute() {
    setStage("idle");
    let session = createNavigationSession(req, providerId);
    const { session: updated, route } = await requestNavigationRoute(session, req);
    session = updated;
    setRouteMiles(session.remaining_miles);
    setOriginalEta(session.original_eta_minutes);
    setStage("routed");

    if (cdlRequired) {
      setStage("validating");
      const v = await validation.validate(route, DEMO_PROFILE, {
        company_id: companyId,
        driver_id: driverId,
        load_id: loadId ?? null,
      });
      setStage(v.is_valid ? "ready" : "routed");
    } else {
      setStage("ready");
    }

    // Bind session into provider state so start() has full context.
    (getNavigationProvider(providerId) as any).session = session;
  }

  async function handleStart() {
    const session = createNavigationSession(req, providerId);
    session.truck_route_validated = validation.result?.is_valid ?? !cdlRequired;
    await startNavigationSession(session);
    setStage("active");
  }

  async function handleStop() {
    const session = createNavigationSession(req, providerId);
    await stopNavigationSession(session);
    setStage("complete");
  }

  function handleSimulateOffRoute() {
    const p = getNavigationProvider(providerId);
    if (p instanceof MockNavigationProvider) p.simulateOffRoute();
  }

  const canStart =
    stage === "ready" && (!cdlRequired || (validation.result?.is_valid ?? false));

  const safetyScore = validation.result?.route_safety_score;
  const lastCoPilot = events
    .map(CoPilotBrain.generateDriverSafeMessage)
    .find(Boolean);

  return (
    <Card className="border-white/10 bg-zinc-950/80 p-4 text-zinc-100 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2">
        <Navigation2 className="h-4 w-4 text-emerald-300" />
        <span className="text-sm font-semibold tracking-wide">Anderoute EliteNav — Phase 3</span>
        <Badge variant="outline" className="ml-auto border-white/15 text-[10px] uppercase tracking-wider">
          Provider · {providerId}
        </Badge>
        <Badge variant="outline" className="border-white/15 text-[10px] uppercase tracking-wider">
          Validator · {validatorId}
        </Badge>
      </div>

      {/* Status row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Distance" value={routeMiles ? `${routeMiles.toFixed(1)} mi` : "—"} />
        <Stat
          label="ETA"
          value={formatEta(etaState.eta_minutes ?? (originalEta || null))}
        />
        <Stat
          label="Progress"
          value={`${Math.round(etaState.progress_pct ?? 0)}%`}
        />
        <Stat
          label="Safety"
          value={safetyScore != null ? `${safetyScore}/100` : "—"}
          tone={
            safetyScore == null ? "default" : safetyScore >= 85 ? "good" : safetyScore >= 60 ? "warn" : "bad"
          }
        />
      </div>

      {/* Validation banner */}
      {cdlRequired && (
        <div
          className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-xs ${
            validation.result?.is_valid
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
              : validation.result
                ? "border-red-400/50 bg-red-500/10 text-red-100"
                : "border-amber-400/40 bg-amber-500/10 text-amber-100"
          }`}
        >
          {validation.result?.is_valid ? (
            <Shield className="mt-0.5 h-4 w-4" />
          ) : (
            <ShieldAlert className="mt-0.5 h-4 w-4" />
          )}
          <div className="leading-tight">
            <div className="text-[12px] font-semibold flex items-center gap-2">
              <Truck className="h-3.5 w-3.5" />
              {validation.result
                ? validation.result.is_valid
                  ? "Truck route validated"
                  : "CDL route validation failed"
                : stage === "validating"
                  ? "Validating CDL truck route…"
                  : "CDL validation required before start"}
            </div>
            {validation.result?.warnings.length ? (
              <ul className="mt-1 list-disc pl-4 text-[11px] opacity-90">
                {validation.result.warnings.map((w, i) => (
                  <li key={i}>{w.message}{w.recommended_action ? ` — ${w.recommended_action}` : ""}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      )}

      {/* Turn-by-turn */}
      {stage === "active" && tbt.next && (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{ManeuverIcon[
              ((tbt.next ?? "").toLowerCase().includes("left") ? "turn-left"
              : (tbt.next ?? "").toLowerCase().includes("right") ? "turn-right"
              : "straight")
            ]}</div>
            <div className="flex-1">
              <div className="text-sm font-semibold leading-tight">{tbt.next}</div>
              <div className="text-[11px] text-zinc-400">
                in {formatDistance(tbt.distance_to_next_m)} · current: {tbt.current ?? "—"}
              </div>
            </div>
            <Compass className="h-4 w-4 text-emerald-300" />
          </div>
        </div>
      )}

      {/* CoPilot banner */}
      {lastCoPilot && (
        <div className={`rounded-xl border px-3 py-2 text-xs ${severityColorClass(lastCoPilot.severity)}`}>
          <div className="flex items-center gap-2">
            {lastCoPilot.severity === "info" ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <AlertTriangle className="h-3.5 w-3.5" />
            )}
            <span className="font-medium">CoPilot</span>
            <span className="opacity-90">{lastCoPilot.text}</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={handleRequestRoute}>
          Request route
        </Button>
        <Button
          size="sm"
          disabled={!canStart}
          onClick={handleStart}
          className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          Start navigation
        </Button>
        <Button size="sm" variant="outline" onClick={handleSimulateOffRoute} disabled={stage !== "active"}>
          Simulate off-route
        </Button>
        <Button size="sm" variant="ghost" onClick={handleStop} disabled={stage !== "active"}>
          Stop
        </Button>
      </div>

      {/* Voice instructions log (dev/mock visible) */}
      {voice.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
          <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-wider text-zinc-400">
            <Volume2 className="h-3 w-3" /> Voice instruction log
          </div>
          <ul className="space-y-1 text-[11px] text-zinc-300">
            {voice.map((v) => (
              <li key={v.id} className="truncate">
                <span className="text-zinc-500">{new Date(v.spoken_at).toLocaleTimeString()}</span> · {v.instruction_text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "good" | "warn" | "bad";
}) {
  const t =
    tone === "good" ? "text-emerald-300"
    : tone === "warn" ? "text-amber-300"
    : tone === "bad" ? "text-red-300"
    : "text-zinc-100";
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2">
      <div className="text-[10px] uppercase tracking-wider text-zinc-400">{label}</div>
      <div className={`text-sm font-semibold ${t}`}>{value}</div>
    </div>
  );
}
