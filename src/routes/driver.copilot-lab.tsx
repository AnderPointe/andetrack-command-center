import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { VoiceCoPilotConsole } from "@/navigation/components/VoiceCoPilotConsole";
import { RouteIntelligencePanel } from "@/navigation/components/RouteIntelligencePanel";
import { DispatchVoicePushPanel } from "@/navigation/components/DispatchVoicePushPanel";
import { DispatchVoiceInbox } from "@/navigation/components/DispatchVoiceInbox";
import { OfflineQueueBadge } from "@/navigation/components/OfflineQueueBadge";
import { PrivacyVoiceNotice } from "@/navigation/components/PrivacyVoiceNotice";
import { useVoiceCoPilot } from "@/navigation/hooks/useVoiceCoPilot";
import { useRouteIntelligence } from "@/navigation/hooks/useRouteIntelligence";
import { useDispatchVoiceMessages } from "@/navigation/hooks/useDispatchVoiceMessages";
import { getVoiceProvider } from "@/navigation/voice/registry";

export const Route = createFileRoute("/driver/copilot-lab")({
  head: () => ({
    meta: [
      { title: "CoPilot Voice Lab — Anderoute" },
      { name: "description", content: "Phase 4 lab: AI CoPilot voice commands, route intelligence, and dispatcher voice push for CDL drivers." },
    ],
  }),
  component: CoPilotLab,
});

const SUGGESTIONS = [
  "Reroute",
  "What's next?",
  "I'm on break",
  "Arrived at pickup",
  "Delayed twenty minutes",
  "Send to dispatch we need a wash",
  "Mark delivered",
  "Take POD photo",
  "Mute",
];

function CoPilotLab() {
  const companyId = "demo-company";
  const driverId = "demo-driver";
  const dispatcherId = "demo-dispatcher";
  const navigationProviderId = "mock" as const;
  const voiceProviderId = "webspeech" as const;

  const co = useVoiceCoPilot({
    providerId: voiceProviderId,
    navigationProviderId,
    companyId,
    driverId,
  });

  const snapshot = useMemo(
    () => ({
      destination: "Phoenix, AZ",
      remaining_minutes: 184,
      remaining_miles: 162,
      vehicle_profile: { is_cdl: true, height_ft: 13.5, weight_lbs: 78000, hazmat: false },
      conditions: { weather: "clear", traffic: "moderate" as const, hours_until_break_required: 1.5, fuel_level_pct: 28 },
    }),
    [],
  );
  const intel = useRouteIntelligence(snapshot);

  const inbox = useDispatchVoiceMessages(driverId, voiceProviderId, { autoplay: true });

  const [tab, setTab] = useState<"driver" | "dispatcher">("driver");

  return (
    <AppShell>
      <div className="mx-auto grid max-w-6xl gap-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">CoPilot Voice + Intelligence Lab</h1>
            <p className="text-[12px] text-zinc-400">Phase 4 — AI voice commands, route intelligence, dispatch-to-driver voice push.</p>
          </div>
          <OfflineQueueBadge />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab("driver")}
            className={`rounded-md px-3 py-1.5 text-[12px] ${tab === "driver" ? "bg-emerald-500 text-emerald-950" : "bg-white/5 text-zinc-300"}`}
          >
            Driver view
          </button>
          <button
            onClick={() => setTab("dispatcher")}
            className={`rounded-md px-3 py-1.5 text-[12px] ${tab === "dispatcher" ? "bg-emerald-500 text-emerald-950" : "bg-white/5 text-zinc-300"}`}
          >
            Dispatcher view
          </button>
        </div>

        {tab === "driver" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <VoiceCoPilotConsole
              status={co.status}
              transcript={co.transcript}
              muted={co.muted}
              error={co.error}
              log={co.log}
              onStart={co.start}
              onStop={co.stop}
              onMutedChange={co.setMuted}
              onSimulate={co.simulate}
              suggestions={SUGGESTIONS}
            />
            <div className="space-y-4">
              <PrivacyVoiceNotice />
              <RouteIntelligencePanel
                insights={intel.insights}
                summary={intel.summary}
                loading={intel.loading}
                error={intel.error}
                onRefresh={intel.refresh}
                lastFetchedAt={intel.lastFetchedAt}
              />
              <DispatchVoiceInbox
                messages={inbox.messages}
                onAcknowledge={inbox.acknowledge}
                onReplay={(t) => getVoiceProvider(voiceProviderId).speak(t, { interrupt: true })}
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            <DispatchVoicePushPanel
              companyId={companyId}
              driverId={driverId}
              dispatcherId={dispatcherId}
            />
            <RouteIntelligencePanel
              insights={intel.insights}
              summary={intel.summary}
              loading={intel.loading}
              error={intel.error}
              onRefresh={intel.refresh}
              lastFetchedAt={intel.lastFetchedAt}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
}
