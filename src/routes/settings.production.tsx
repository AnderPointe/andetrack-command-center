import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  usePushRegistration,
  useNotificationPreferences,
} from "@/notifications";
import { NotificationPreferencesPanel } from "@/notifications/components/NotificationPreferencesPanel";
import { PushTokenStatusBadge } from "@/notifications/components/PushTokenStatusBadge";
import { PrivacyControlsPanel } from "@/runtime/PrivacyControlsPanel";
import { useDriverConsent } from "@/runtime/useDriverConsent";
import {
  getAIProvider,
  DEFAULT_AI_PROVIDER,
  allowedTools,
  buildSystemPrompt,
  type AIProviderId,
  type CopilotMode,
  type CopilotRole,
} from "@/ai";
import {
  getQueueSize,
  getQueueSnapshot,
  subscribeQueue,
  clearNonCritical,
  flushQueue,
} from "@/navigation/voice/offlineQueue";

export const Route = createFileRoute("/settings/production")({
  head: () => ({
    meta: [
      { title: "Production Readiness — Anderoute" },
      { name: "description", content: "Phase 5 polished: notification prefs, privacy, AI provider, offline queue, release readiness." },
    ],
  }),
  component: ProductionSettings,
});

const COMPANY_ID = "demo-company";
const DRIVER_ID = "demo-driver";

function ProductionSettings() {
  const reg = usePushRegistration({ driverId: DRIVER_ID, companyId: COMPANY_ID, providerId: "mock" });
  const { prefs, update: updatePrefs } = useNotificationPreferences();
  const { consent, update: updateConsent } = useDriverConsent();

  const [providerId, setProviderId] = useState<AIProviderId>(DEFAULT_AI_PROVIDER);
  const [role, setRole] = useState<CopilotRole>("driver");
  const [mode, setMode] = useState<CopilotMode>("driver_moving");
  const provider = getAIProvider(providerId);

  const [queueSize, setQueueSize] = useState<number>(0);
  const [queuePeek, setQueuePeek] = useState(getQueueSnapshot().slice(-5));
  useEffect(() => {
    setQueueSize(getQueueSize());
    return subscribeQueue((n) => {
      setQueueSize(n);
      setQueuePeek(getQueueSnapshot().slice(-5));
    });
  }, []);

  const tools = allowedTools(role, mode);
  const systemPrompt = buildSystemPrompt(role, mode);

  return (
    <AppShell>
      <div className="mx-auto grid max-w-6xl gap-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">Production Readiness</h1>
            <p className="text-[12px] text-zinc-400">
              Phase 5 polish — notification prefs, privacy, AI provider, offline queue, release docs.
            </p>
          </div>
          <PushTokenStatusBadge
            permission={reg.permission}
            providerId={reg.providerId}
            hasToken={Boolean(reg.registration)}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <NotificationPreferencesPanel prefs={prefs} onChange={updatePrefs} />
          <PrivacyControlsPanel consent={consent} onChange={updateConsent} />

          {/* AI provider + CoPilot mode preview */}
          <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[12px] font-semibold text-zinc-100">CoPilot AI provider</div>
              <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                {provider.id} {provider.supportsRealtime ? "· realtime" : ""}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px] text-zinc-300">
              <label className="space-y-0.5">
                <span className="block text-[10px] uppercase text-zinc-500">Provider</span>
                <select value={providerId} onChange={(e) => setProviderId(e.target.value as AIProviderId)}
                  className="w-full rounded border border-white/10 bg-zinc-900 px-1.5 py-1">
                  <option value="mock">mock</option>
                  <option value="local_rules">local_rules</option>
                  <option value="openai_responses">openai_responses (stub)</option>
                  <option value="openai_realtime">openai_realtime (stub)</option>
                  <option value="fallback">fallback chain</option>
                </select>
              </label>
              <label className="space-y-0.5">
                <span className="block text-[10px] uppercase text-zinc-500">Role</span>
                <select value={role} onChange={(e) => setRole(e.target.value as CopilotRole)}
                  className="w-full rounded border border-white/10 bg-zinc-900 px-1.5 py-1">
                  <option value="driver">driver</option>
                  <option value="dispatcher">dispatcher</option>
                  <option value="admin">admin</option>
                </select>
              </label>
              <label className="space-y-0.5">
                <span className="block text-[10px] uppercase text-zinc-500">Mode</span>
                <select value={mode} onChange={(e) => setMode(e.target.value as CopilotMode)}
                  className="w-full rounded border border-white/10 bg-zinc-900 px-1.5 py-1">
                  <option value="driver_moving">driver_moving</option>
                  <option value="driver_parked">driver_parked</option>
                  <option value="dispatcher">dispatcher</option>
                  <option value="admin">admin</option>
                  <option value="offline">offline</option>
                  <option value="emergency">emergency</option>
                </select>
              </label>
            </div>
            <div className="mt-2 text-[10px] uppercase text-zinc-500">Allowed tools ({tools.length})</div>
            <div className="mt-1 flex flex-wrap gap-1">
              {tools.map((t) => (
                <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">{t}</span>
              ))}
            </div>
            <details className="mt-2 text-[11px] text-zinc-400">
              <summary className="cursor-pointer text-zinc-300">System prompt preview</summary>
              <pre className="mt-1 whitespace-pre-wrap rounded bg-black/40 p-2 text-[10px] leading-snug text-zinc-300">{systemPrompt}</pre>
            </details>
          </div>

          {/* Offline queue panel */}
          <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[12px] font-semibold text-zinc-100">Offline queue</div>
              <span className="text-[11px] text-zinc-400">{queueSize} pending</span>
            </div>
            <div className="space-y-1">
              {queuePeek.length === 0 ? (
                <div className="text-[11px] text-zinc-500">Queue is empty.</div>
              ) : queuePeek.map((q) => (
                <div key={q.id} className="flex items-center justify-between gap-2 rounded bg-white/5 px-2 py-1 text-[10px] text-zinc-300">
                  <span className="font-mono">{q.table}</span>
                  <span>attempts {q.attempts}</span>
                  {q.critical ? <span className="rounded bg-rose-500/20 px-1.5 text-rose-300">critical</span> : <span className="text-zinc-500">best-effort</span>}
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => void flushQueue().then(() => { setQueueSize(getQueueSize()); setQueuePeek(getQueueSnapshot().slice(-5)); })}
                className="rounded-md bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-emerald-950">
                Flush now
              </button>
              <button
                onClick={() => { const dropped = clearNonCritical(); console.info(`dropped ${dropped} best-effort items`); }}
                className="rounded-md bg-white/5 px-3 py-1 text-[11px] text-zinc-300 hover:bg-white/10">
                Clear best-effort
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
          <div className="mb-2 text-[12px] font-semibold text-zinc-100">Planning docs</div>
          <ul className="grid grid-cols-2 gap-1 text-[11px] text-zinc-300 md:grid-cols-3">
            {[
              ["production-readiness", "Production readiness"],
              ["mobile-release-checklist", "Mobile release checklist"],
              ["notification-flow", "Notification flow"],
              ["android-auto-plan", "Android Auto plan"],
              ["carplay-plan", "CarPlay plan"],
              ["ai-api-plan", "AI API plan"],
              ["security-model", "Security & privacy"],
            ].map(([slug, label]) => (
              <li key={slug} className="rounded bg-white/5 px-2 py-1 font-mono">docs/{slug}.md — {label}</li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-x-3 text-[11px] text-zinc-400">
            <span>
              Lab:{" "}
              <Link to="/driver/notifications-lab" className="text-emerald-300 underline">/driver/notifications-lab</Link>
            </span>
            <span>
              Monitoring:{" "}
              <Link to="/settings/production-monitoring" className="text-emerald-300 underline">/settings/production-monitoring</Link>
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
