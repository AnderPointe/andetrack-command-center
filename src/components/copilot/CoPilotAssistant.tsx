import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, MessageSquare, History, Check, AlertTriangle, Sparkles } from "lucide-react";
import { useState } from "react";
import type { CoPilotMessage, CoPilotTranscriptEntry, VoiceCommand } from "@/types/elitenav";
import { VoiceCommandPanel } from "./VoiceCommandPanel";

interface Props {
  open: boolean;
  listening: boolean;
  onToggleListen: () => void;
  onClose: () => void;
  feed: CoPilotMessage[];
  commands: VoiceCommand[];
  onCommand: (c: VoiceCommand) => void;
  transcript: CoPilotTranscriptEntry[];
  onReplayCommand?: (entry: CoPilotTranscriptEntry) => void;
  onClearTranscript?: () => void;
}

type Tab = "feed" | "transcript";

export function CoPilotAssistant({
  open,
  listening,
  onToggleListen,
  onClose,
  feed,
  commands,
  onCommand,
  transcript,
  onReplayCommand,
  onClearTranscript,
}: Props) {
  const [tab, setTab] = useState<Tab>("feed");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-3 bottom-3 z-50 overflow-hidden rounded-3xl border border-teal-400/25 bg-gradient-to-br from-[#0b1620]/95 via-[#0a1218]/96 to-[#0a151c]/95 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(45,212,191,0.35),0_0_0_1px_rgba(45,212,191,0.08)] sm:inset-x-auto sm:right-4 sm:w-[460px]"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-teal-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-orange-400/15 blur-3xl" />

            {/* Header */}
            <div className="relative border-b border-white/5 px-5 py-4">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onToggleListen}
                    aria-label={listening ? "Stop listening" : "Start listening"}
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition ${
                      listening
                        ? "border-teal-400/70 bg-gradient-to-br from-teal-400/25 to-teal-600/10 text-teal-200 shadow-[0_0_24px_-2px_rgba(45,212,191,0.6)]"
                        : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                    }`}
                  >
                    {listening && (
                      <>
                        <motion.span
                          className="absolute inset-0 rounded-full border border-teal-400/50"
                          animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        />
                        <motion.span
                          className="absolute inset-0 rounded-full border border-teal-400/40"
                          animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: 0.9 }}
                        />
                      </>
                    )}
                    <Mic className="h-4 w-4" />
                  </button>
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-teal-300/80">
                      Anderoute
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/15 px-1.5 py-0.5 text-[8px] font-semibold tracking-widest text-teal-200">
                        <span className="h-1 w-1 rounded-full bg-teal-300" /> AI
                      </span>
                    </div>
                    <div className="text-base font-semibold tracking-tight text-white">CoPilot Assistant</div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close CoPilot"
                  className="rounded-full border border-white/10 p-1.5 text-slate-300 hover:bg-white/5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* Waveform */}
              <div className="relative mt-4 flex h-10 items-center gap-[3px]">
                {Array.from({ length: 36 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-teal-500/40 to-teal-300"
                    style={{ originY: 0.5 }}
                    animate={
                      listening
                        ? {
                            height: [
                              `${18 + Math.random() * 60}%`,
                              `${40 + Math.random() * 60}%`,
                              `${18 + Math.random() * 60}%`,
                            ],
                          }
                        : { height: ["14%", "22%", "14%"] }
                    }
                    transition={{ duration: 0.7 + (i % 6) * 0.12, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                <span className={`h-1.5 w-1.5 rounded-full ${listening ? "bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.7)]" : "bg-slate-600"}`} />
                {listening ? "Listening — say a command…" : "Hands-free ready · tap mic or pick a quick action"}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between gap-2 border-b border-white/5 px-3 pt-2">
              <div className="flex items-center gap-1">
                <TabButton active={tab === "feed"} onClick={() => setTab("feed")} icon={<MessageSquare className="h-3 w-3" />} label="Feed" count={feed.length} />
                <TabButton active={tab === "transcript"} onClick={() => setTab("transcript")} icon={<History className="h-3 w-3" />} label="Transcript" count={transcript.length} />
              </div>
              {tab === "transcript" && transcript.length > 0 && onClearTranscript && (
                <button
                  onClick={onClearTranscript}
                  className="mb-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Content */}
            {tab === "feed" ? (
              <div className="max-h-[280px] space-y-2 overflow-y-auto px-4 py-3">
                {feed.slice().reverse().map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-2xl border px-3 py-2 text-[12.5px] leading-relaxed ${
                      m.role === "dispatch"
                        ? "border-orange-400/20 bg-orange-500/[0.05] text-orange-100"
                        : m.tone === "warning"
                        ? "border-orange-400/20 bg-white/[0.02] text-slate-100"
                        : m.tone === "success"
                        ? "border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-100"
                        : "border-white/10 bg-white/[0.025] text-slate-100"
                    }`}
                  >
                    <div className="mb-0.5 text-[9px] uppercase tracking-widest text-slate-500">
                      {m.role === "dispatch" ? "Dispatch" : "CoPilot"} · {m.at}
                    </div>
                    {m.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-[280px] space-y-2 overflow-y-auto px-4 py-3">
                {transcript.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                    <div className="rounded-full border border-white/10 bg-white/[0.03] p-2">
                      <History className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="text-[12px] text-slate-400">No commands yet</div>
                    <div className="max-w-[240px] text-[10.5px] text-slate-500">
                      Recognized phrases and quick actions will appear here for review.
                    </div>
                  </div>
                ) : (
                  transcript
                    .slice()
                    .reverse()
                    .map((t) => (
                      <button
                        key={t.id}
                        onClick={() =>
                          onReplayCommand?.(t)
                        }
                        className="group block w-full rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2 text-left transition hover:border-teal-400/40 hover:bg-teal-500/[0.05]"
                      >
                        <div className="mb-1 flex items-center justify-between gap-2 text-[9px] uppercase tracking-widest text-slate-500">
                          <span className="flex items-center gap-1.5">
                            {t.source === "voice" ? (
                              <Mic className="h-2.5 w-2.5 text-teal-300" />
                            ) : (
                              <Sparkles className="h-2.5 w-2.5 text-teal-300" />
                            )}
                            {t.source === "voice" ? "Voice" : "Quick action"} · {t.at}
                          </span>
                          <StatusPill status={t.status} />
                        </div>
                        <div className="text-[12.5px] font-medium text-slate-100">
                          “{t.utterance}”
                        </div>
                        <div className="mt-0.5 flex items-center justify-between gap-2">
                          <div className="text-[11px] text-slate-400">{t.action}</div>
                          <span className="text-[10px] text-slate-600 transition group-hover:text-teal-300">
                            Replay →
                          </span>
                        </div>
                      </button>
                    ))
                )}
              </div>
            )}

            <VoiceCommandPanel commands={commands} onCommand={onCommand} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 rounded-t-lg px-3 py-2 text-[11px] font-medium tracking-wide transition ${
        active ? "text-teal-200" : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {icon}
      {label}
      <span
        className={`rounded-full px-1.5 py-px text-[9px] tabular-nums ${
          active ? "bg-teal-500/20 text-teal-200" : "bg-white/[0.04] text-slate-500"
        }`}
      >
        {count}
      </span>
      {active && (
        <motion.span
          layoutId="copilot-tab"
          className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-teal-400 to-teal-300"
        />
      )}
    </button>
  );
}

function StatusPill({ status }: { status: "recognized" | "executed" | "ignored" }) {
  if (status === "executed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-0.5 text-[8.5px] font-semibold tracking-widest text-emerald-200">
        <Check className="h-2 w-2" /> Executed
      </span>
    );
  }
  if (status === "ignored") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-orange-400/30 bg-orange-500/10 px-1.5 py-0.5 text-[8.5px] font-semibold tracking-widest text-orange-200">
        <AlertTriangle className="h-2 w-2" /> Ignored
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-teal-400/30 bg-teal-500/10 px-1.5 py-0.5 text-[8.5px] font-semibold tracking-widest text-teal-200">
      Recognized
    </span>
  );
}
