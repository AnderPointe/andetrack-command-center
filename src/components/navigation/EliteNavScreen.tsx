import { useEffect, useMemo, useState } from "react";
import { MockMap } from "@/components/map/MockMap";
import { MapVehicleMarker } from "@/components/map/MapVehicleMarker";
import { NavigationHeader } from "./NavigationHeader";
import { NavigationBottomTray } from "./NavigationBottomTray";
import { ETACard } from "./ETACard";
import { RouteProgressBar } from "./RouteProgressBar";
import { TurnByTurnPanel } from "./TurnByTurnPanel";
import { CoPilotAssistant } from "@/components/copilot/CoPilotAssistant";
import { SafetyModeOverlay } from "@/components/safety/SafetyModeOverlay";
import { DriverStatusControl } from "@/components/driver/DriverStatusControl";
import { ShipmentSummaryCard } from "@/components/shipment/ShipmentSummaryCard";
import { RouteIntelligenceCard } from "@/components/intelligence/RouteIntelligenceCard";
import { CDLRestrictionCard } from "@/components/intelligence/CDLRestrictionCard";
import { IssueReportModal } from "@/components/alerts/IssueReportModal";
import { DispatchSyncIndicator } from "@/components/sync/DispatchSyncIndicator";
import { ProofOfDeliveryPlaceholder } from "@/components/shipment/ProofOfDeliveryPlaceholder";
import { DriverSyncIndicator } from "@/components/realtime/DriverSyncIndicator";
import { GPSStatusBadge } from "@/components/realtime/GPSStatusBadge";
import { TrackingModeBadge } from "@/components/realtime/TrackingModeBadge";
import { BatteryStatusBadge } from "@/components/realtime/BatteryStatusBadge";
import { LiveETAUpdater } from "@/components/realtime/LiveETAUpdater";
import { RouteProgressLiveBar } from "@/components/realtime/RouteProgressLiveBar";
import { DriverPrivacyNotice } from "@/components/realtime/DriverPrivacyNotice";
import { LocationPermissionModal } from "@/components/realtime/LocationPermissionModal";
import { useDriverLocationStream } from "@/hooks/useDriverLocationStream";
import { DEMO_ROUTE_DALLAS_HOUSTON, type MockStreamConfig } from "@/data/mockGpsStream";
import { mockDriver, mockVehicle } from "@/data/elitenav/mockDriver";
import { mockShipment } from "@/data/elitenav/mockLoad";
import { mockRoute } from "@/data/elitenav/mockRoute";
import {
  mockCoPilotFeed,
  mockDispatchSync,
  mockRouteRisks,
  mockVoiceCommands,
} from "@/data/elitenav/mockNavigationEvents";
import { STATUS_META, progressPct } from "@/utils/elitenav";
import type { CoPilotMessage, CoPilotTranscriptEntry, DispatchSyncEvent, DriverStatusKey, VoiceCommand } from "@/types/elitenav";
import { Play, Square } from "lucide-react";

interface Props {
  onExit?: () => void;
}

export function EliteNavScreen({ onExit }: Props) {
  const [routeStarted, setRouteStarted] = useState(false);
  const [safety, setSafety] = useState(false);
  const [status, setStatus] = useState<DriverStatusKey>("en_route_pickup");
  const [progress, setProgress] = useState(0.22); // 0..1 hero polyline
  const [remainingMiles, setRemainingMiles] = useState(mockRoute.remainingMiles);
  const [etaMin, setEtaMin] = useState(mockRoute.etaMinutes);
  const [speed, setSpeed] = useState(58);
  const [stepIdx, setStepIdx] = useState(1);

  const [showCoPilot, setShowCoPilot] = useState(false);
  const [coPilotListening, setCoPilotListening] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [showPOD, setShowPOD] = useState(false);

  const [coPilotFeed, setCoPilotFeed] = useState<CoPilotMessage[]>(mockCoPilotFeed);
  const [syncEvents, setSyncEvents] = useState<DispatchSyncEvent[]>(mockDispatchSync);
  const [transcript, setTranscript] = useState<CoPilotTranscriptEntry[]>([]);

  // Mock GPS / ETA tick
  useEffect(() => {
    if (!routeStarted) return;
    const id = window.setInterval(() => {
      setProgress((p) => Math.min(1, p + 0.006));
      setRemainingMiles((r) => Math.max(0, +(r - 0.4).toFixed(1)));
      setEtaMin((e) => Math.max(0, e + (Math.random() > 0.65 ? -1 : Math.random() > 0.7 ? 1 : 0)));
      setSpeed(() => 52 + Math.floor(Math.random() * 14));
    }, 2200);
    return () => window.clearInterval(id);
  }, [routeStarted]);

  // Mock dispatch sync stream
  useEffect(() => {
    if (!routeStarted) return;
    const id = window.setInterval(() => {
      setSyncEvents((prev) => [
        {
          id: `d_${Date.now()}`,
          type: "gps" as const,
          message: `GPS ping · ${(32.78 + Math.random() * 0.05).toFixed(3)}, ${(-96.8 + Math.random() * 0.05).toFixed(3)}`,
          at: "now",
        },
        ...prev,
      ].slice(0, 12));
    }, 3800);
    return () => window.clearInterval(id);
  }, [routeStarted]);

  const route = useMemo(() => ({ ...mockRoute, remainingMiles, currentStep: stepIdx }), [remainingMiles, stepIdx]);
  const pct = progressPct(route);
  const currentStep = mockRoute.steps[stepIdx] ?? mockRoute.steps[mockRoute.steps.length - 1];
  const upcoming = mockRoute.steps[stepIdx + 1];

  const handleStart = () => {
    setRouteStarted(true);
    setSafety(true);
    setStatus("en_route_pickup");
  };

  const handleStop = () => {
    setRouteStarted(false);
    setSafety(false);
  };

  const handleVoice = (cmd: VoiceCommand, source: "voice" | "quick" = "quick") => {
    const utter = cmd.utterance.toLowerCase();
    let action = `Acknowledged: ${cmd.label}`;
    let replyText = `Acknowledged: ${cmd.label}.`;
    let tone: CoPilotMessage["tone"] = "info";
    let status: CoPilotTranscriptEntry["status"] = "executed";

    if (utter.includes("eta")) {
      replyText = `Your ETA is ${etaMin} minutes.`;
      action = `Reported ETA · ${etaMin} min`;
    } else if (utter.includes("repeat")) {
      replyText = `Next: ${currentStep.instruction} on ${currentStep.street}.`;
      action = "Repeated next maneuver";
    } else if (utter.includes("arrived")) {
      replyText = "Marked arrived at pickup. Dispatch notified.";
      action = "Status → Arrived at pickup";
      tone = "success";
    } else if (utter.includes("loaded")) {
      replyText = "Marked loaded. Switching status to En Route to Drop-off.";
      action = "Status → Loaded";
      tone = "success";
    } else if (utter.includes("delivered")) {
      replyText = "Opening Proof of Delivery.";
      action = "Opened Proof of Delivery";
      tone = "success";
    } else if (utter.includes("dispatch")) {
      replyText = "Calling dispatch now.";
      action = "Dialing dispatch";
    } else if (utter.includes("delay")) {
      replyText = "Delay reported. Dispatch has been notified.";
      action = "Delay reported to dispatch";
      tone = "warning";
    } else {
      status = "recognized";
    }

    setCoPilotFeed((f) => [...f, { id: `c_${Date.now()}`, role: "copilot", tone, text: replyText, at: "now" }]);
    setTranscript((t) =>
      [
        ...t,
        {
          id: `t_${Date.now()}`,
          utterance: cmd.utterance,
          label: cmd.label,
          action,
          source,
          status,
          at: "now",
        },
      ].slice(-50),
    );

    if (utter.includes("arrived")) setStatus("arrived_pickup");
    if (utter.includes("loaded")) setStatus("loaded");
    if (utter.includes("delivered")) {
      setStatus("delivered");
      setShowPOD(true);
    }
  };

  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-[#070b10]">
      {/* Map */}
      <div className="absolute inset-0">
        <MockMap progress={progress} />
        <svg viewBox="0 0 1200 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <MapVehicleMarker progress={progress} />
        </svg>
      </div>

      <SafetyModeOverlay active={safety} />

      {/* Top stack */}
      <div className="absolute inset-x-0 top-0 z-20 p-2 pt-12 sm:p-4 sm:pt-14">
        <div className="mx-auto grid max-w-6xl gap-2 sm:gap-3 lg:grid-cols-[1fr_auto]">
          <NavigationHeader
            step={currentStep}
            upcoming={upcoming}
            distanceToTurn={currentStep.distance}
            big={safety}
            onClick={() => setShowSteps(true)}
          />
          <div className="flex items-center justify-end gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
              STATUS_META[status].tone === "alert"
                ? "border-red-400/40 bg-red-500/10 text-red-200"
                : STATUS_META[status].tone === "success"
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                : "border-teal-400/30 bg-teal-500/10 text-teal-200"
            }`}>
              {STATUS_META[status].label}
            </span>
            {!routeStarted ? (
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-[0_10px_30px_-10px_rgba(45,212,191,0.7)] hover:from-teal-400"
              >
                <Play className="h-3.5 w-3.5" /> Begin Dispatch
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
              >
                <Square className="h-3.5 w-3.5" /> End Trip
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Side panel — hidden in safety mode */}
      {!safety && (
        <div className="absolute right-3 top-32 z-20 hidden w-[340px] space-y-3 lg:block">
          <ETACard
            etaMinutes={etaMin}
            remainingMiles={remainingMiles}
            currentSpeed={speed}
            speedLimit={65}
            delayMin={etaMin - mockRoute.etaMinutes}
            deliveryWindow="Today · 18:00 – 19:30 CT"
            trafficLabel="Moderate"
          />
          <CDLRestrictionCard vehicle={mockVehicle} />
          <RouteIntelligenceCard
            risks={mockRouteRisks}
            etaConfidence={92}
            averageMpg={mockVehicle.averageMpg}
            fuelEstimateGal={mockRoute.totalMiles / mockVehicle.averageMpg}
            fuelCostEstimate={(mockRoute.totalMiles / mockVehicle.averageMpg) * 3.85}
            breakInMin={102}
          />
          <ShipmentSummaryCard shipment={{ ...mockShipment, status }} />
        </div>
      )}

      {/* Bottom stack */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-2 sm:p-4">
        <div className="mx-auto grid max-w-6xl gap-2 sm:gap-3 lg:grid-cols-[1fr_360px]">
          <div className="space-y-2 sm:space-y-3">
            {safety && (
              <ETACard
                etaMinutes={etaMin}
                remainingMiles={remainingMiles}
                currentSpeed={speed}
                speedLimit={65}
                delayMin={etaMin - mockRoute.etaMinutes}
                deliveryWindow="Today · 18:00 – 19:30 CT"
                trafficLabel="Moderate"
                big
              />
            )}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e1820]/90 to-[#0a1218]/95 p-3 backdrop-blur-xl">
              <RouteProgressBar progress={pct} totalMiles={mockRoute.totalMiles} remainingMiles={remainingMiles} />
            </div>
            <NavigationBottomTray
              onCoPilot={() => setShowCoPilot(true)}
              onDispatch={() => alert("Calling dispatch (mock)")}
              onIssue={() => setShowIssue(true)}
              onSteps={() => setShowSteps(true)}
              onStatus={() => setShowStatus(true)}
              reducedActions={safety}
            />
          </div>
          <div className="hidden lg:block">
            <DispatchSyncIndicator events={syncEvents} />
          </div>
        </div>
      </div>

      {/* Tablet sync indicator */}
      <div className="absolute right-3 top-3 z-20 hidden w-[260px] md:block lg:hidden">
        <DispatchSyncIndicator events={syncEvents} />
      </div>

      {/* Overlays */}
      <TurnByTurnPanel
        open={showSteps}
        onClose={() => setShowSteps(false)}
        steps={mockRoute.steps}
        currentIndex={stepIdx}
      />
      <CoPilotAssistant
        open={showCoPilot}
        listening={coPilotListening}
        onToggleListen={() => setCoPilotListening((x) => !x)}
        onClose={() => { setShowCoPilot(false); setCoPilotListening(false); }}
        feed={coPilotFeed}
        commands={mockVoiceCommands}
        onCommand={(c) => handleVoice(c, "quick")}
        transcript={transcript}
        onReplayCommand={(t) => handleVoice({ id: t.id, label: t.label, utterance: t.utterance }, t.source)}
        onClearTranscript={() => setTranscript([])}
      />
      <DriverStatusControl
        open={showStatus}
        current={status}
        onClose={() => setShowStatus(false)}
        onChange={(s) => {
          setStatus(s);
          if (s === "delivered") setShowPOD(true);
          if (s === "loaded") setStepIdx((i) => Math.min(mockRoute.steps.length - 1, i + 1));
        }}
      />
      <IssueReportModal
        open={showIssue}
        onClose={() => setShowIssue(false)}
        onSubmit={(i, n) => {
          setStatus("issue_reported");
          setCoPilotFeed((f) => [...f, { id: `c_${Date.now()}`, role: "copilot", tone: "warning", text: `Issue reported: ${i}. Dispatch notified.`, at: "now" }]);
        }}
      />
      <ProofOfDeliveryPlaceholder
        open={showPOD}
        onClose={() => setShowPOD(false)}
        onSubmit={() => {
          setShowPOD(false);
          setStatus("delivered");
          onExit?.();
        }}
      />
    </div>
  );
}
