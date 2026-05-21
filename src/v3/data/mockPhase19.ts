/**
 * Phase 19 — V3 mock data.
 * Mobile-native expansion, Android Auto / CarPlay planning, advanced CoPilot
 * voice, telematics integration foundation, carrier marketplace foundation,
 * enterprise certification readiness, mobile observability.
 *
 * Nothing here calls real provider APIs. Treat all *_PLACEHOLDER fields as
 * future native / platform integrations that require additional work and
 * (for Android Auto / CarPlay) platform approval before production launch.
 */

// ---------- 1. Scope ----------
export const V3_SCOPE = [
  { id: "v3.native_driver",        area: "Native driver app expansion", status: "in_scope" as const, note: "Architecture + screens scaffold" },
  { id: "v3.driver_ux",            area: "Advanced driver UX",          status: "in_scope" as const, note: "Voice-first, low distraction" },
  { id: "v3.android_auto",         area: "Android Auto planning",       status: "in_scope" as const, note: "Planning + safety review only" },
  { id: "v3.carplay",              area: "CarPlay planning",            status: "in_scope" as const, note: "Entitlement required, planning only" },
  { id: "v3.voice",                area: "Advanced CoPilot voice",      status: "in_scope" as const, note: "Push-to-talk + intent expansion" },
  { id: "v3.telematics",           area: "Telematics foundation",       status: "in_scope" as const, note: "Samsara / Motive / Geotab placeholders" },
  { id: "v3.marketplace",          area: "Carrier marketplace",         status: "in_scope" as const, note: "Foundation + workflow placeholders" },
  { id: "v3.cert_readiness",       area: "Certification readiness",     status: "in_scope" as const, note: "SOC 2 prep, no claim" },
  { id: "v3.offline_hardening",    area: "Mobile offline hardening",    status: "in_scope" as const, note: "Queue + conflict resolution" },
  { id: "v3.observability",        area: "Mobile observability",        status: "in_scope" as const, note: "App health + permissions" },
  { id: "v3.engagement",           area: "Driver engagement",           status: "in_scope" as const, note: "Performance + announcements" },
  { id: "v3.fleet_hardware",       area: "Fleet hardware readiness",    status: "in_scope" as const, note: "Inventory + assignment" },
  { id: "v3.autonomous_dispatch",  area: "Autonomous dispatch",         status: "deferred" as const, note: "Always requires human approval" },
  { id: "v3.aa_final_cert",        area: "Android Auto certification",  status: "deferred" as const, note: "Native + Google review required" },
  { id: "v3.cp_final_entitlement", area: "CarPlay entitlement",         status: "deferred" as const, note: "Apple approval required" },
  { id: "v3.full_marketplace",     area: "Marketplace production",      status: "deferred" as const, note: "Liquidity + settlement at scale" },
  { id: "v3.full_compliance",      area: "DOT/FMCSA automation",        status: "deferred" as const, note: "Phase 20+" },
  { id: "v3.soc2",                 area: "SOC 2 certification",         status: "deferred" as const, note: "Readiness only — not certified" },
];

export const V3_FEATURE_MATRIX = [
  { feature: "Driver app",         v25: "web",        v3: "native_scaffold" },
  { feature: "CoPilot voice",      v25: "basic",      v3: "push_to_talk" },
  { feature: "Android Auto",       v25: false,        v3: "planning" },
  { feature: "CarPlay",            v25: false,        v3: "planning" },
  { feature: "Telematics",         v25: false,        v3: "foundation" },
  { feature: "Carrier marketplace",v25: false,        v3: "foundation" },
  { feature: "Mobile offline",     v25: "basic",      v3: "hardened" },
  { feature: "SOC 2",              v25: "review",     v3: "readiness" },
] as const;

export const V3_READINESS = {
  byArea: [
    { area: "Native driver app",      score: 58, status: "in_progress" },
    { area: "Advanced voice",         score: 62, status: "in_progress" },
    { area: "Android Auto planning",  score: 62, status: "planning" },
    { area: "CarPlay planning",       score: 48, status: "planning" },
    { area: "Telematics foundation",  score: 55, status: "in_progress" },
    { area: "Carrier marketplace",    score: 42, status: "in_progress" },
    { area: "Mobile offline",         score: 70, status: "in_progress" },
    { area: "Observability",          score: 65, status: "in_progress" },
    { area: "Certification readiness",score: 60, status: "in_progress" },
  ],
};
export function v3ReadinessScore() {
  const a = V3_READINESS.byArea;
  return Math.round(a.reduce((s, x) => s + x.score, 0) / a.length);
}

// ---------- 2. Native driver app ----------
export const DRIVER_SCREENS = [
  { id: "home",       label: "DriverHome",          status: "scaffold" },
  { id: "offer",      label: "DriverLoadOffer",     status: "scaffold" },
  { id: "active",     label: "DriverActiveLoad",    status: "scaffold" },
  { id: "elitenav",   label: "DriverEliteNav",      status: "scaffold" },
  { id: "copilot",    label: "DriverCoPilot",       status: "scaffold" },
  { id: "status",     label: "DriverStatusUpdate",  status: "scaffold" },
  { id: "pod",        label: "DriverPOD",           status: "scaffold" },
  { id: "documents",  label: "DriverDocuments",     status: "placeholder" },
  { id: "support",    label: "DriverSupport",       status: "scaffold" },
  { id: "settings",   label: "DriverSettings",      status: "scaffold" },
  { id: "privacy",    label: "DriverPrivacyCenter", status: "scaffold" },
  { id: "diagnostics",label: "DriverAppDiagnostics",status: "scaffold" },
];

export const DRIVER_PERMISSIONS = [
  { id: "location",     label: "Foreground location", required: true,  status: "granted" },
  { id: "bg_location",  label: "Background location", required: true,  status: "limited" },
  { id: "notifications",label: "Push notifications",  required: true,  status: "granted" },
  { id: "microphone",   label: "Microphone (CoPilot)",required: false, status: "granted" },
  { id: "camera",       label: "Camera (POD)",        required: true,  status: "granted" },
];

export const DRIVER_NEXT_ACTIONS = [
  { id: "na_1", priority: 1, action: "Mark arrived at pickup", reason: "Within 0.4 mi of pickup geofence" },
  { id: "na_2", priority: 2, action: "Confirm BOL count",      reason: "Customer requires verified count" },
  { id: "na_3", priority: 3, action: "Take POD photo",         reason: "Required at delivery" },
];

// ---------- 3. Android Auto / CarPlay ----------
export const ANDROID_AUTO_CHECKLIST = [
  { id: "aa_1", item: "Native Android module (CarAppService)",      status: "todo" },
  { id: "aa_2", item: "AndroidManifest navigation category",        status: "todo" },
  { id: "aa_3", item: "NavigationTemplate + maneuver bar",          status: "in_progress" },
  { id: "aa_4", item: "Voice-first controls (no free-form lists)",  status: "in_progress" },
  { id: "aa_5", item: "Driver-safe alert templates",                status: "todo" },
  { id: "aa_6", item: "Desktop Head Unit (DHU) test pass",          status: "todo" },
  { id: "aa_7", item: "Release approval checklist",                 status: "todo" },
];
export const ANDROID_AUTO_SAFETY = [
  { id: "aas_1", rule: "No scrolling lists in motion",              status: "enforced" },
  { id: "aas_2", rule: "Max 6 items per pane (HIG)",                status: "enforced" },
  { id: "aas_3", rule: "Voice-first reply for dispatch messages",   status: "planned" },
  { id: "aas_4", rule: "Emergency action on every template",        status: "planned" },
];
export const CARPLAY_CHECKLIST = [
  { id: "cp_1", item: "Apple CarPlay entitlement request",          status: "todo" },
  { id: "cp_2", item: "CPTemplateApplicationScene + Info.plist",    status: "todo" },
  { id: "cp_3", item: "CPMapTemplate with route overlay",           status: "in_progress" },
  { id: "cp_4", item: "CPNavigationSession turn-by-turn",           status: "in_progress" },
  { id: "cp_5", item: "Siri intents for ETA / dispatch / POD",      status: "todo" },
  { id: "cp_6", item: "App Review demo video",                      status: "todo" },
];
export const CARPLAY_ENTITLEMENT = {
  status: "future_approval_required" as const,
  reviewed_at: "2026-05-12",
  notes: "Requires Apple CarPlay framework request before production build.",
};

// ---------- 4. Voice ----------
export const VOICE_PROVIDERS = [
  { id: "mock",                label: "MockVoiceProvider",            status: "ready" },
  { id: "mobile_speech",       label: "MobileSpeechProvider",         status: "placeholder" },
  { id: "realtime_ai",         label: "RealtimeAIProvider",           status: "placeholder" },
  { id: "local_parser",        label: "LocalCommandParser",           status: "ready" },
  { id: "tts",                 label: "TextToSpeechProvider",         status: "placeholder" },
];
export const VOICE_INTENTS_V3 = [
  { category: "Navigation", intents: ["Ask ETA","Ask remaining miles","Ask next turn","Repeat instruction","Request reroute","Report off route","Contact dispatch"] },
  { category: "Load",       intents: ["Accept load","Deny load","Ask load details","Mark arrived pickup","Mark loaded","Mark arrived drop-off","Mark delivered","Start POD"] },
  { category: "Status",     intents: ["Set available","Set break","Set delayed","Set off duty","Report issue","Report emergency"] },
  { category: "Shipment",   intents: ["Ask commodity","Ask weight","Ask customer","Ask delivery window","Ask special instructions"] },
  { category: "System",     intents: ["What needs my attention?","What is my next step?","Sync pending actions","Is GPS active?","Is location shared?"] },
];
export const VOICE_TRANSCRIPTS = [
  { ts: "08:14:02", driver: "D-118", utterance: "What is my next step?",       response: "Mark arrived at pickup when you reach the gate.", confirmed: true },
  { ts: "09:22:41", driver: "D-118", utterance: "Mark loaded",                  response: "Marked loaded for SHP-9821.", confirmed: true },
  { ts: "10:48:17", driver: "D-204", utterance: "Tell dispatch I'm delayed",    response: "Drafted: running 25 min late to Acme. Send?", confirmed: false },
];
export const VOICE_SAFETY_POLICY = [
  { mode: "driving", maxWords: 18, allowed: "navigation/status/dispatch", blocked: "free-form Q&A" },
  { mode: "parked",  maxWords: 90, allowed: "all intents",                blocked: "none" },
];

// ---------- 5. Telematics ----------
export const TELEMATICS_PROVIDERS = [
  { id: "samsara",   label: "Samsara",          status: "placeholder", capabilities: ["location","speed","odometer","DTC"] },
  { id: "motive",    label: "Motive (KeepTruckin)", status: "placeholder", capabilities: ["location","speed","HOS","DTC"] },
  { id: "geotab",    label: "Geotab",           status: "placeholder", capabilities: ["location","speed","engine","DTC"] },
  { id: "verizon",   label: "Verizon Connect",  status: "placeholder", capabilities: ["location","speed"] },
  { id: "fleet_complete", label: "Fleet Complete", status: "placeholder", capabilities: ["location","speed"] },
  { id: "custom",    label: "Custom API",       status: "placeholder", capabilities: ["location"] },
];
export const TELEMATICS_VEHICLE_MAP = [
  { telematics_id: "SAM-9831", anderoute_unit: "U-112", driver: "D-118", health: "ok" },
  { telematics_id: "SAM-9832", anderoute_unit: "U-115", driver: "D-204", health: "stale" },
  { telematics_id: "MOT-2210", anderoute_unit: "U-119", driver: null,    health: "unmapped" },
];
export const TELEMATICS_HEALTH = {
  sync_success_pct: 97.4,
  last_sync_age_sec: 42,
  errors_24h: 6,
  vehicles_total: 85,
  vehicles_healthy: 80,
};
export const TELEMATICS_SYNC_LOG = [
  { ts: "11:02:31", provider: "samsara", event: "location_sync", result: "ok", count: 38 },
  { ts: "11:01:55", provider: "motive",  event: "dtc_sync",      result: "ok", count: 3 },
  { ts: "10:58:10", provider: "samsara", event: "location_sync", result: "partial", count: 35 },
];

// ---------- 6. Fleet hardware ----------
export const FLEET_HARDWARE = [
  { id: "hw_1", kind: "Driver tablet", model: "Samsung Tab A8", assigned_to: "D-118", health: "ok" },
  { id: "hw_2", kind: "GPS tracker",   model: "Geotab GO9",     assigned_to: "U-112", health: "ok" },
  { id: "hw_3", kind: "Dashcam",       model: "Samsara CM32",   assigned_to: "U-115", health: "placeholder" },
  { id: "hw_4", kind: "ELD",           model: "Motive E-Log",   assigned_to: "D-204", health: "placeholder" },
  { id: "hw_5", kind: "Temp sensor",   model: "BlueBox T2",     assigned_to: "U-119", health: "placeholder" },
];

// ---------- 7. Carrier marketplace ----------
export const CARRIER_PROFILES = [
  { id: "car_1", name: "Northstar Freight",  equipment: ["Reefer","Dry van"], regions: ["MW","NE"], score: 92, compliance: "ok" },
  { id: "car_2", name: "Halcyon Logistics",  equipment: ["Dry van"],          regions: ["NE"],      score: 88, compliance: "review" },
  { id: "car_3", name: "Atlas Truckline",    equipment: ["Flatbed","Dry"],    regions: ["SE","MW"], score: 81, compliance: "ok" },
];
export const MARKETPLACE_LOADS = [
  { id: "mkt_1", origin: "Columbus, OH", dest: "Newark, NJ", equipment: "Dry van", rate: 1875, status: "posted",  bids: 3 },
  { id: "mkt_2", origin: "Dallas, TX",   dest: "Atlanta, GA", equipment: "Reefer", rate: 2240, status: "awarded", bids: 5 },
];
export const CARRIER_BIDS = [
  { id: "bid_1", load: "mkt_1", carrier: "car_1", amount: 1825, eta: "2026-05-23", status: "open" },
  { id: "bid_2", load: "mkt_1", carrier: "car_3", amount: 1860, eta: "2026-05-23", status: "open" },
  { id: "bid_3", load: "mkt_2", carrier: "car_2", amount: 2210, eta: "2026-05-22", status: "won" },
];
export const CARRIER_COMPLIANCE = [
  { id: "cc_1", carrier: "car_1", item: "MC authority",     status: "ok",       expires: "2027-03-01" },
  { id: "cc_2", carrier: "car_1", item: "Insurance COI",    status: "ok",       expires: "2026-09-12" },
  { id: "cc_3", carrier: "car_2", item: "W-9",              status: "missing",  expires: null },
  { id: "cc_4", carrier: "car_2", item: "Safety rating",    status: "review",   expires: null },
];

// ---------- 8. Mobile offline + observability ----------
export const OFFLINE_QUEUE = [
  { id: "oq_1", driver: "D-118", kind: "status_update",   created: "11:01:02", retries: 0, priority: "high",   conflict: false },
  { id: "oq_2", driver: "D-118", kind: "pod_draft",       created: "10:55:18", retries: 1, priority: "high",   conflict: false },
  { id: "oq_3", driver: "D-204", kind: "voice_command",   created: "10:48:17", retries: 2, priority: "normal", conflict: true  },
  { id: "oq_4", driver: "D-204", kind: "location_batch",  created: "10:40:00", retries: 0, priority: "low",    conflict: false },
];
export const MOBILE_OBSERVABILITY = [
  { driver: "D-118", app: "1.4.2", os: "Android 14", health: 98, last_sync_sec: 12, perms: "ok",      offline_queue: 2 },
  { driver: "D-204", app: "1.3.7", os: "iOS 17.4",   health: 71, last_sync_sec: 412, perms: "limited",offline_queue: 4 },
  { driver: "D-311", app: "1.4.2", os: "Android 13", health: 95, last_sync_sec: 22, perms: "ok",      offline_queue: 0 },
  { driver: "D-402", app: "1.2.0", os: "Android 12", health: 60, last_sync_sec: 880, perms: "ok",      offline_queue: 1 },
];
export const MOBILE_VERSION_POLICY = { min_version: "1.3.0", recommended: "1.4.2", enforce_block_below: "1.2.0" };

// ---------- 9. Driver engagement ----------
export const DRIVER_PERFORMANCE = [
  { driver: "D-118", loads_30d: 42, on_time_pct: 96, status_accuracy: 98, pod_completion: 100, sync_reliability: 99 },
  { driver: "D-204", loads_30d: 38, on_time_pct: 89, status_accuracy: 92, pod_completion: 95,  sync_reliability: 88 },
  { driver: "D-311", loads_30d: 40, on_time_pct: 93, status_accuracy: 95, pod_completion: 98,  sync_reliability: 96 },
];
export const DRIVER_ANNOUNCEMENTS = [
  { id: "a1", ts: "2026-05-19", title: "Mobile app 1.4.2 available", body: "Improved offline POD capture." },
  { id: "a2", ts: "2026-05-17", title: "Holiday schedule", body: "Memorial Day dispatch coverage hours posted." },
];
export const DRIVER_FEEDBACK = [
  { id: "f1", driver: "D-204", ts: "2026-05-18", topic: "Voice", text: "Push-to-talk button should be larger." },
  { id: "f2", driver: "D-311", ts: "2026-05-17", topic: "POD",   text: "Auto-flash in low light would help." },
];

// ---------- 10. Certification readiness ----------
export const CERT_READINESS = [
  { id: "cr_1",  area: "SOC 2 — Security",           score: 72, status: "in_progress" },
  { id: "cr_2",  area: "SOC 2 — Availability",       score: 65, status: "in_progress" },
  { id: "cr_3",  area: "SOC 2 — Confidentiality",    score: 70, status: "in_progress" },
  { id: "cr_4",  area: "Pen test",                   score: 40, status: "planned" },
  { id: "cr_5",  area: "Mobile security review",     score: 58, status: "in_progress" },
  { id: "cr_6",  area: "Data retention review",      score: 80, status: "in_progress" },
  { id: "cr_7",  area: "Access control review",      score: 75, status: "in_progress" },
  { id: "cr_8",  area: "Incident response review",   score: 60, status: "in_progress" },
  { id: "cr_9",  area: "Business continuity review", score: 55, status: "planned" },
];
export const VENDOR_QUESTIONNAIRE_CATEGORIES = [
  "Company overview","Data security","Access control","Encryption","Logging & monitoring",
  "Incident response","Backup & recovery","Privacy","AI usage","Mobile security",
  "Third-party vendors","Business continuity",
];
export const VENDOR_QUESTIONS_SAMPLE = [
  { id: "q1",  category: "Data security",  question: "Is data encrypted at rest?", answer: "Yes — AES-256 (Supabase + storage).", evidence: "policy://encryption" },
  { id: "q2",  category: "Access control", question: "Do you enforce RBAC?",       answer: "Yes — role + company-scoped RLS.",   evidence: "policy://rls" },
  { id: "q3",  category: "AI usage",       question: "Is AI used on customer data?",answer: "Only with explicit consent; no training on tenant data.", evidence: "policy://ai" },
  { id: "q4",  category: "Mobile security",question: "App version enforcement?",   answer: "Yes — min/recommended/block policy.", evidence: "policy://mobile" },
];

// ---------- 11. Enterprise admin ----------
export const MOBILE_POLICY_SETTINGS = [
  { id: "mp_1", policy: "Force biometric unlock for driver app",  value: "on" },
  { id: "mp_2", policy: "Block jailbroken / rooted devices",      value: "on" },
  { id: "mp_3", policy: "Background location required",           value: "on" },
  { id: "mp_4", policy: "Allow voice transcripts to leave device",value: "consent_required" },
  { id: "mp_5", policy: "Auto-upgrade below min version",         value: "enforce" },
];
export const FEATURE_FLAG_GROUPS = [
  { id: "ff_pilot",      label: "Pilot drivers",  flags: ["copilot_v3","push_to_talk","marketplace"] },
  { id: "ff_carrier",    label: "Carrier partners", flags: ["marketplace","carrier_portal"] },
  { id: "ff_enterprise", label: "Enterprise tier", flags: ["white_label","sso","audit_export"] },
];

// ---------- 12. RLS examples ----------
export const V3_RLS_EXAMPLES = [
  { id: "rls_1", table: "driver_app_health_events",  policy: "Driver reads own events; admins read company scope" },
  { id: "rls_2", table: "offline_action_queue",      policy: "Driver manages own queue rows only" },
  { id: "rls_3", table: "voice_transcript_events",   policy: "Driver reads own transcripts; security role exports" },
  { id: "rls_4", table: "telematics_location_events",policy: "Company-scoped read; admin write only" },
  { id: "rls_5", table: "marketplace_load_posts",    policy: "Posting company reads all; carriers read offered rows only" },
  { id: "rls_6", table: "carrier_bids",              policy: "Carrier reads own bids; posting company reads bids on its load" },
  { id: "rls_7", table: "certification_readiness_items", policy: "Admin/security role only" },
  { id: "rls_8", table: "mobile_policy_settings",    policy: "Company admin only" },
];

// ---------- 13. Edge function plan ----------
export const V3_EDGE_FUNCTIONS = [
  { group: "Mobile",        fns: ["record-driver-app-health","sync-offline-action-queue","resolve-offline-conflict","enforce-mobile-version","record-mobile-permission-event"] },
  { group: "Voice",         fns: ["process-voice-command","queue-offline-voice-command","create-voice-transcript-event","generate-driver-safe-response"] },
  { group: "Telematics",    fns: ["sync-telematics-provider","map-telematics-vehicle","process-telematics-location-event","process-telematics-diagnostic-event","calculate-telematics-health"] },
  { group: "Marketplace",   fns: ["create-carrier-profile","post-marketplace-load","submit-carrier-bid","award-carrier-load","calculate-carrier-performance"] },
  { group: "Certification", fns: ["generate-security-questionnaire","build-vendor-review-packet","calculate-certification-readiness-score"] },
];

// ---------- 14. Reports ----------
export const V3_REPORTS = [
  { id: "r_mobile_health",  label: "Mobile app health" },
  { id: "r_driver_adoption",label: "Driver app adoption" },
  { id: "r_voice_usage",    label: "Voice command usage" },
  { id: "r_telematics_sync",label: "Telematics sync" },
  { id: "r_marketplace",    label: "Carrier marketplace activity" },
  { id: "r_carrier_perf",   label: "Carrier performance" },
  { id: "r_offline_sync",   label: "Mobile offline sync" },
  { id: "r_aa_readiness",   label: "Android Auto readiness" },
  { id: "r_cp_readiness",   label: "CarPlay readiness" },
  { id: "r_cert",           label: "Certification readiness" },
  { id: "r_enterprise_onb", label: "Enterprise onboarding" },
];

// ---------- 15. Demo flow ----------
export const V3_DEMO_STEPS = [
  { step: 1,  actor: "Company admin", action: "Opens V3 dashboard" },
  { step: 2,  actor: "Company admin", action: "Reviews mobile app health for 85 drivers" },
  { step: 3,  actor: "System",        action: "Flags 5 drivers on stale app versions" },
  { step: 4,  actor: "Company admin", action: "Enforces mobile update policy" },
  { step: 5,  actor: "Dispatcher",    action: "Opens driver app health panel" },
  { step: 6,  actor: "System",        action: "Highlights D-204 sync failures" },
  { step: 7,  actor: "Support",       action: "Opens offline queue, resolves conflict" },
  { step: 8,  actor: "Admin",         action: "Connects mock Samsara telematics provider" },
  { step: 9,  actor: "Admin",         action: "Maps telematics vehicles to Anderoute units" },
  { step: 10, actor: "System",        action: "Telematics health shows 97% sync success" },
  { step: 11, actor: "Dispatcher",    action: "Posts load mkt_1 to carrier marketplace" },
  { step: 12, actor: "System",        action: "Recommends 3 carriers" },
  { step: 13, actor: "Carrier",       action: "Submits bid $1,825" },
  { step: 14, actor: "Dispatcher",    action: "Awards load" },
  { step: 15, actor: "System",        action: "Carrier compliance placeholder passes" },
  { step: 16, actor: "Driver",        action: "Opens native mobile app" },
  { step: 17, actor: "Driver",        action: "Push-to-talk: 'What is my next step?'" },
  { step: 18, actor: "CoPilot",       action: "'Mark arrived at pickup when you reach the gate.'" },
  { step: 19, actor: "Admin",         action: "Opens Android Auto readiness (62%)" },
  { step: 20, actor: "Admin",         action: "Opens CarPlay readiness (entitlement pending)" },
  { step: 21, actor: "Executive",     action: "Opens certification readiness dashboard" },
  { step: 22, actor: "Security",      action: "Generates vendor questionnaire + review packet" },
];

// ---------- 16. Polish — Native architecture ----------
export const NATIVE_APP_ARCHITECTURE = [
  { layer: "UI",            tech: "React Native + Expo Router",   note: "Shared design tokens with web V2.5" },
  { layer: "State",         tech: "TanStack Query + Zustand",     note: "Cache hydration from offline queue" },
  { layer: "Sync",          tech: "Supabase + offline_action_queue", note: "Priority + retry + conflict resolver" },
  { layer: "Voice",         tech: "VoiceProvider registry",       note: "Mock / mobile speech / realtime AI" },
  { layer: "Navigation",    tech: "EliteNav adapter",             note: "Mapbox + truck routing (HERE/Trimble)" },
  { layer: "Native modules",tech: "Android CarAppService / iOS CPTemplate", note: "Planning only — no certification claim" },
  { layer: "Telematics",    tech: "Provider adapters",            note: "Placeholder for Samsara / Motive / Geotab" },
  { layer: "Observability", tech: "App health beacons",           note: "Posted to record-driver-app-health" },
];

export const DRIVER_UX_DISTRACTION = [
  { screen: "DriverHome",       distraction: "low",      rule: "Max 3 cards, voice-first secondary actions" },
  { screen: "DriverLoadOffer",  distraction: "low",      rule: "Accept / Deny only while driving; details parked-only" },
  { screen: "DriverEliteNav",   distraction: "minimal",  rule: "Driving-safety mode hides all chrome below 5 mph idle" },
  { screen: "DriverCoPilot",    distraction: "low",      rule: "Push-to-talk + read-back; never auto-execute irreversible" },
  { screen: "DriverPOD",        distraction: "parked",   rule: "Capture only when speed = 0 for 5s" },
  { screen: "DriverDocuments",  distraction: "parked",   rule: "Hidden in driving mode" },
];

// ---------- 17. Android Auto / CarPlay templates ----------
export const ANDROID_AUTO_TEMPLATES = [
  { template: "NavigationTemplate",     anderoute_use: "Turn-by-turn + maneuver bar", status: "in_progress" },
  { template: "MapWithContentTemplate", anderoute_use: "Active load card overlay",    status: "in_progress" },
  { template: "MessageTemplate",        anderoute_use: "Dispatch quick replies",      status: "todo" },
  { template: "LongMessageTemplate",    anderoute_use: "Special instructions (parked)", status: "todo" },
  { template: "GridTemplate",           anderoute_use: "Status quick-picks",          status: "todo" },
  { template: "PaneTemplate",           anderoute_use: "Next stop summary",           status: "todo" },
];
export const CARPLAY_TEMPLATES = [
  { template: "CPMapTemplate",        anderoute_use: "Route + alerts overlay",       status: "in_progress" },
  { template: "CPNavigationSession",  anderoute_use: "Turn-by-turn maneuvers",       status: "in_progress" },
  { template: "CPListTemplate",       anderoute_use: "Stops list (parked-only)",     status: "todo" },
  { template: "CPAlertTemplate",      anderoute_use: "Driver-safe alerts",           status: "todo" },
  { template: "CPVoiceControlTemplate", anderoute_use: "Push-to-talk CoPilot",       status: "todo" },
];

// ---------- 18. Voice confirmation + architecture ----------
export const VOICE_CONFIRMATION_FLOW = [
  { intent: "load.mark_delivered",  irreversible: true,  confirm: "read_back_yes_no", spoken: "Mark SHP-{id} delivered. Say 'yes' to confirm." },
  { intent: "status.delayed",       irreversible: false, confirm: "read_back_yes_no", spoken: "Tell dispatch you'll be 25 minutes late. Send?" },
  { intent: "dispatch.report_issue",irreversible: false, confirm: "read_back_yes_no", spoken: "Report issue: '{text}'. Send to dispatch?" },
  { intent: "nav.reroute",          irreversible: false, confirm: "tap_or_voice",     spoken: "Rerouting around closure. Confirm." },
  { intent: "nav.repeat",           irreversible: false, confirm: "none",             spoken: "Repeating last instruction." },
  { intent: "status.arrived_pickup",irreversible: false, confirm: "geofence_assist",  spoken: "Mark arrived at Acme pickup?" },
];
export const VOICE_ARCHITECTURE = [
  { stage: "Wake / PTT",        responsibility: "Mobile UI",        impl: "Hold-to-talk button + hardware media key" },
  { stage: "STT",               responsibility: "VoiceProvider",    impl: "Mobile speech | Realtime AI | Mock" },
  { stage: "Intent detection",  responsibility: "LocalCommandParser + CoPilot", impl: "Local first, AI fallback for ambiguity" },
  { stage: "Safety policy",     responsibility: "DrivingSafetyMode",impl: "Word cap by mode + irreversible gate" },
  { stage: "Confirmation",      responsibility: "CoPilot",          impl: "Read-back yes/no for irreversible intents" },
  { stage: "Execution",         responsibility: "Server fn",        impl: "process-voice-command (queued offline)" },
  { stage: "TTS",               responsibility: "VoiceProvider",    impl: "Driver-safe phrasing ≤ 18 words while driving" },
  { stage: "Audit",             responsibility: "voice_transcript_events", impl: "Retention + export per security role" },
];

// ---------- 19. Telematics connect workflow ----------
export const TELEMATICS_CONNECT_STEPS = [
  { id: "tc1", step: "Admin selects provider",         status: "ready" },
  { id: "tc2", step: "Provide API credentials (vault)",status: "placeholder" },
  { id: "tc3", step: "Discover vehicles + drivers",    status: "placeholder" },
  { id: "tc4", step: "Map telematics ↔ Anderoute units", status: "ready" },
  { id: "tc5", step: "Backfill 24h location batch",    status: "placeholder" },
  { id: "tc6", step: "Subscribe to live updates",      status: "placeholder" },
  { id: "tc7", step: "Health monitor active",          status: "ready" },
];

// ---------- 20. Fleet hardware stats ----------
export const FLEET_HARDWARE_STATS = [
  { kind: "Driver tablets",  total: 85, healthy: 80, placeholder: 0 },
  { kind: "GPS trackers",    total: 92, healthy: 88, placeholder: 4 },
  { kind: "Dashcams",        total: 60, healthy: 0,  placeholder: 60 },
  { kind: "ELDs",            total: 85, healthy: 0,  placeholder: 85 },
  { kind: "Temp sensors",    total: 22, healthy: 0,  placeholder: 22 },
];

// ---------- 21. Carrier onboarding ----------
export const CARRIER_ONBOARDING_STEPS = [
  { id: "co1", phase: "Invite",      step: "Send carrier invite",          status: "ready" },
  { id: "co2", phase: "Profile",     step: "Equipment + regions captured", status: "ready" },
  { id: "co3", phase: "Compliance",  step: "Upload MC authority + COI",    status: "ready" },
  { id: "co4", phase: "Compliance",  step: "Safety rating placeholder",    status: "placeholder" },
  { id: "co5", phase: "Banking",     step: "W-9 + remit details",          status: "placeholder" },
  { id: "co6", phase: "Activation",  step: "Admin approves carrier",       status: "ready" },
  { id: "co7", phase: "Activation",  step: "Carrier sees first eligible loads", status: "ready" },
];

// ---------- 22. Offline conflict playbook ----------
export const OFFLINE_CONFLICT_PLAYBOOK = [
  { conflict: "Status updated server-side after offline change", resolution: "Prefer most-recent driver action; show diff" },
  { conflict: "POD photo uploaded twice",                        resolution: "Hash dedupe — keep first, mark second as duplicate" },
  { conflict: "Voice command conflicts with manual action",      resolution: "Ask driver to reconfirm voice intent" },
  { conflict: "Load reassigned during offline window",           resolution: "Reject offline queue items; notify driver" },
];

// ---------- 23. Observability alerts ----------
export const OBSERVABILITY_ALERTS = [
  { id: "ob1", severity: "warn",  driver: "D-204", issue: "App below recommended version (1.3.7 < 1.4.2)", action: "Push update reminder" },
  { id: "ob2", severity: "warn",  driver: "D-204", issue: "Background location limited",                   action: "Re-request consent" },
  { id: "ob3", severity: "high",  driver: "D-402", issue: "App below min version (1.2.0)",                 action: "Block until upgrade" },
  { id: "ob4", severity: "info",  driver: "D-118", issue: "Sync gap > 5 min observed at 09:14",            action: "Auto-resolved" },
];

// ---------- 24. Enterprise admin audit ----------
export const ENTERPRISE_ADMIN_AUDIT = [
  { ts: "2026-05-19 11:02", actor: "admin@acme",  change: "mobile_policy_settings.mp_1", from: "off", to: "on" },
  { ts: "2026-05-19 10:48", actor: "admin@acme",  change: "feature_flag_groups.ff_pilot", from: "[copilot_v3]", to: "[copilot_v3, push_to_talk]" },
  { ts: "2026-05-18 16:21", actor: "security@acme", change: "voice_transcript_retention", from: "30d", to: "90d" },
];

// ---------- 25. Edge function vs server fn separation ----------
export const EDGE_FUNCTION_SEPARATION = [
  { fn: "record-driver-app-health",       runtime: "TanStack server fn", reason: "App-internal write, RLS-scoped" },
  { fn: "sync-offline-action-queue",      runtime: "TanStack server fn", reason: "Auth-bound batch, retries idempotent" },
  { fn: "process-voice-command",          runtime: "TanStack server fn", reason: "Auth-bound; Lovable AI gateway" },
  { fn: "sync-telematics-provider",       runtime: "Supabase Edge Function", reason: "External webhooks land in Postgres directly" },
  { fn: "post-marketplace-load",          runtime: "TanStack server fn", reason: "Internal CRUD with RLS" },
  { fn: "carrier-bid-webhook",            runtime: "Supabase Edge Function", reason: "External carrier system callback" },
  { fn: "generate-security-questionnaire",runtime: "TanStack server fn", reason: "Internal export, signed URL response" },
  { fn: "calculate-certification-readiness-score", runtime: "Scheduled job", reason: "Nightly cron + materialized view refresh" },
];

// ---------- 26. RLS templates ----------
export const RLS_TEMPLATES = [
  { table: "offline_action_queue",     sql: "create policy offline_queue_self on public.offline_action_queue for all to authenticated using (driver_id = auth.uid()) with check (driver_id = auth.uid());" },
  { table: "voice_transcript_events",  sql: "create policy voice_self_read on public.voice_transcript_events for select to authenticated using (driver_id = auth.uid() or public.has_role(auth.uid(), current_company(), 'security'));" },
  { table: "telematics_location_events", sql: "create policy telematics_company on public.telematics_location_events for select to authenticated using (company_id = current_company());" },
  { table: "carrier_bids",             sql: "create policy bids_two_sided on public.carrier_bids for select to authenticated using (carrier_id = current_carrier() or load_company_id = current_company());" },
];

