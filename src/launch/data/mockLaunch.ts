/** Phase 10 — Product Launch Center mock data. Replace with Supabase reads later. */

export type ReadinessLevel = "ready" | "in_progress" | "blocked" | "not_started";

export interface ReadinessItem {
  id: string;
  area: string;
  status: ReadinessLevel;
  score: number; // 0-100
  notes: string;
}

export const READINESS: ReadinessItem[] = [
  { id: "demo",          area: "Demo readiness",           status: "ready",       score: 92, notes: "Guided demo + persona switcher live." },
  { id: "docs",          area: "Documentation",            status: "in_progress", score: 68, notes: "Driver + dispatch guides drafted; API reference TBD." },
  { id: "pricing",       area: "Pricing strategy",         status: "in_progress", score: 70, notes: "Tiers defined; final prices pending interviews." },
  { id: "sales",         area: "Sales kit",                status: "ready",       score: 88, notes: "One-pagers + decks scaffolded." },
  { id: "onboarding",    area: "Customer onboarding",      status: "in_progress", score: 60, notes: "Wizards scaffolded; data import flow pending." },
  { id: "security",      area: "Security & compliance",    status: "ready",       score: 90, notes: "Phase 8 hardening complete." },
  { id: "support",       area: "Support system",           status: "in_progress", score: 55, notes: "In-app ticketing scaffolded." },
  { id: "marketing",     area: "Marketing site",           status: "in_progress", score: 65, notes: "Structure + copy drafted." },
  { id: "billing",       area: "Billing readiness",        status: "in_progress", score: 72, notes: "Stripe integration scaffolded in Phase 6." },
  { id: "pilot",         area: "Pilot program",            status: "ready",       score: 85, notes: "30/60/90-day playbook ready." },
  { id: "legal",         area: "Legal / privacy",          status: "in_progress", score: 60, notes: "DPA + ToS templates pending review." },
  { id: "analytics",     area: "Product analytics",        status: "not_started", score: 25, notes: "Event taxonomy to be defined Phase 11." },
];

export interface TaglineOption {
  style: "Executive" | "Operational" | "AI-powered" | "Driver-focused" | "Customer visibility" | "Enterprise logistics";
  text: string;
}

export const TAGLINES: TaglineOption[] = [
  { style: "Executive", text: "Command Every Mile." },
  { style: "Executive", text: "The Operating System for Modern Logistics." },
  { style: "Executive", text: "Run Your Fleet Like a Command Center." },
  { style: "Executive", text: "From Dispatch to Delivery, in One Pane." },
  { style: "Operational", text: "Smarter Dispatch. Safer Routes. Stronger Deliveries." },
  { style: "Operational", text: "Real-Time Logistics Control from Load to Delivery." },
  { style: "Operational", text: "Less Chaos. More Loads. Happier Customers." },
  { style: "Operational", text: "Move Every Load With Confidence." },
  { style: "Operational", text: "Dispatch, Navigate, Track, Optimize — One Platform." },
  { style: "AI-powered", text: "The AI-Powered Command Center for Logistics." },
  { style: "AI-powered", text: "Predict Delays Before They Happen." },
  { style: "AI-powered", text: "AI That Helps Dispatchers Win the Day." },
  { style: "AI-powered", text: "Intelligence at Every Mile." },
  { style: "Driver-focused", text: "Built for Drivers. Trusted by Dispatch." },
  { style: "Driver-focused", text: "Navigation Drivers Actually Want to Use." },
  { style: "Driver-focused", text: "Elite Navigation. Every Trip." },
  { style: "Driver-focused", text: "Safer Roads. Smoother Routes." },
  { style: "Customer visibility", text: "Where Your Customers Always Know Where Their Freight Is." },
  { style: "Customer visibility", text: "Visibility From First Mile to Final Mile." },
  { style: "Customer visibility", text: "Every Shipment, Tracked in Real Time." },
  { style: "Customer visibility", text: "Stop Status Calls. Start Sharing Live Tracking." },
  { style: "Enterprise logistics", text: "Enterprise Logistics, Without the Enterprise Overhead." },
  { style: "Enterprise logistics", text: "Where Drivers, Dispatch, Customers, and AI Move as One." },
  { style: "Enterprise logistics", text: "One Platform. Every Stakeholder. Every Mile." },
  { style: "Enterprise logistics", text: "The Logistics Command Layer for Growing Carriers." },
];

export const POSITIONING = {
  tagline: "Command Every Mile.",
  oneLiner:
    "Anderoute is a real-time logistics command platform that unifies dispatch, driver navigation, customer visibility, AI operations intelligence, and enterprise integrations in one system.",
  elevator:
    "Anderoute helps logistics companies, courier fleets, and freight carriers run their entire operation from one screen — live dispatch, EliteNav driver navigation, CoPilot AI assistance, customer shipment tracking, predictive risk, and enterprise integrations. Replace 5 disconnected tools with one command center your dispatchers, drivers, and customers actually love.",
  audiences: [
    "Logistics companies", "Courier companies", "Hotshot operators",
    "Box truck fleets", "Cargo van fleets", "Freight carriers",
    "Final-mile delivery companies", "Dispatch teams", "Fleet managers",
    "Shippers needing shipment visibility",
  ],
  pains: [
    "Dispatchers juggling 5+ tools and spreadsheets",
    "Drivers using consumer GPS that ignores truck restrictions",
    "Customers calling for status updates all day",
    "No early warning when a load is going to be late",
    "No single view of fleet, loads, customers, and integrations",
    "Manual POD chasing and billing reconciliation",
    "AI features that nobody trusts or can audit",
  ],
  solutions: [
    "Live dispatch command center with realtime GPS",
    "Anderoute EliteNav — truck-aware turn-by-turn navigation",
    "Anderoute CoPilot — explainable AI voice + recommendations",
    "Customer portal with self-serve tracking and POD",
    "AI risk prediction with human-in-the-loop approval",
    "EDI / API marketplace for shippers, brokers, and TMS",
    "SOC 2-ready security with full audit trail",
  ],
  advantages: [
    "Real-time first — not a retrofitted TMS report",
    "Drivers, dispatch, customers, and execs in one product",
    "Explainable AI with cost controls and audit logs",
    "Truck-aware routing built in, not bolted on",
    "Multi-tenant SaaS with white-label customer portal",
  ],
};

export interface PricingTier {
  id: string;
  name: string;
  audience: string;
  priceRange: string;
  perSeat?: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter", name: "Starter", audience: "Small operators (1–5 drivers)",
    priceRange: "$ — TBD with pilot pricing",
    perSeat: "per driver / month",
    features: [
      "Basic dispatch board", "Live GPS tracking (up to 5 drivers)",
      "Basic customer tracking link", "Up to 2 dispatcher seats",
      "Email support",
    ],
    cta: "Start pilot",
  },
  {
    id: "professional", name: "Professional", audience: "Growing fleets (6–25 drivers)",
    priceRange: "$$ — TBD",
    perSeat: "per driver / month",
    popular: true,
    features: [
      "Live dispatch map", "Driver app + push notifications",
      "Customer portal", "Anderoute CoPilot — Basic",
      "Standard reports", "Up to 5 dispatcher seats",
    ],
    cta: "Talk to sales",
  },
  {
    id: "fleet-command", name: "Fleet Command", audience: "Larger fleets (25–150 drivers)",
    priceRange: "$$$ — TBD",
    perSeat: "per driver / month",
    features: [
      "Advanced dispatch", "AI Operations Intelligence",
      "Smart alerts + risk prediction", "CDL / truck routing",
      "Integrations Hub", "Advanced reporting", "Unlimited dispatcher seats",
    ],
    cta: "Talk to sales",
  },
  {
    id: "enterprise", name: "Enterprise", audience: "Custom operations (150+ drivers)",
    priceRange: "Custom",
    features: [
      "White-label customer portal", "API / EDI integrations",
      "Advanced security + SSO/SAML", "Custom data retention",
      "Dedicated success manager", "Custom SLA",
    ],
    cta: "Contact us",
  },
];

export const ADDONS = [
  { name: "AI usage pack",        price: "Usage-based — TBD", note: "Predictive risk + CoPilot inference" },
  { name: "GPS event storage",    price: "Usage-based — TBD", note: "Beyond 90-day retention" },
  { name: "Customer portal seats",price: "Per portal user — TBD" },
  { name: "Integrations pack",    price: "Per connector — TBD", note: "EDI, TMS, broker connectors" },
  { name: "Premium support",      price: "Add-on — TBD" },
];

export interface DemoStep {
  id: number; persona: string; title: string; narration: string;
}
export const DEMO_STEPS: DemoStep[] = [
  { id: 1,  persona: "Customer",   title: "Customer submits a shipment", narration: "A shipper opens the customer portal and submits a request for a same-day delivery." },
  { id: 2,  persona: "Dispatcher", title: "Dispatcher converts to a load", narration: "The request lands in the inbox. Dispatcher converts it into a routable load." },
  { id: 3,  persona: "Dispatcher", title: "AI recommends the best driver", narration: "CoPilot scores nearby drivers by ETA, HOS, equipment, and history — with explanation." },
  { id: 4,  persona: "Dispatcher", title: "Dispatcher offers the load",    narration: "Approved with one click. The offer is sent with full audit trail." },
  { id: 5,  persona: "Driver",     title: "Driver receives push + accepts",narration: "Driver gets a push notification, sees load details, and accepts." },
  { id: 6,  persona: "Driver",     title: "EliteNav opens turn-by-turn",   narration: "Truck-aware route loads with restrictions, fuel stops, and CoPilot voice." },
  { id: 7,  persona: "Dispatcher", title: "GPS streams to dispatch",       narration: "Live position updates flow into the command center map." },
  { id: 8,  persona: "Customer",   title: "Customer sees live tracking",   narration: "The shipper opens the tracking link — no login needed." },
  { id: 9,  persona: "Dispatcher", title: "AI detects delivery window risk", narration: "CoPilot flags a 14-minute risk and drafts a customer update." },
  { id: 10, persona: "Dispatcher", title: "Dispatcher approves update",    narration: "One click sends a proactive update to the customer." },
  { id: 11, persona: "Driver",     title: "Driver completes delivery",     narration: "Driver captures POD photo + signature in EliteNav." },
  { id: 12, persona: "Customer",   title: "POD appears in portal",         narration: "POD is instantly available to the shipper." },
  { id: 13, persona: "Admin",      title: "Billing usage recorded",        narration: "Usage meters update for invoice generation." },
  { id: 14, persona: "Executive",  title: "Ops health score updates",      narration: "Executive dashboard reflects OTP, utilization, and AI savings." },
  { id: 15, persona: "Admin",      title: "Security Center shows audit",   narration: "Every AI action, login, and data change appears in the audit trail." },
];

export const DEMO_PERSONAS = [
  { id: "owner",      label: "Platform Owner",  desc: "All companies + platform metrics" },
  { id: "admin",      label: "Company Admin",   desc: "Single-company configuration" },
  { id: "dispatcher", label: "Dispatcher",      desc: "Live operations seat" },
  { id: "driver",     label: "Driver",          desc: "Mobile + EliteNav view" },
  { id: "customer",   label: "Customer",        desc: "Portal-only experience" },
  { id: "executive",  label: "Executive",       desc: "KPI + AI summary view" },
] as const;

export const ONBOARDING_STAGES = [
  { id: "sales",        label: "Sales qualified",       done: true },
  { id: "demo",         label: "Demo completed",        done: true },
  { id: "pilot",        label: "Pilot approved",        done: true },
  { id: "account",      label: "Account created",       done: true },
  { id: "company",      label: "Company configured",    done: true },
  { id: "users",        label: "Users invited",         done: true },
  { id: "drivers",      label: "Drivers imported",      done: false },
  { id: "vehicles",     label: "Vehicles imported",     done: false },
  { id: "customers",    label: "Customers imported",    done: false },
  { id: "loads",        label: "First loads created",   done: false },
  { id: "driver-app",   label: "Driver app installed",  done: false },
  { id: "gps",          label: "GPS permissions",       done: false },
  { id: "training",     label: "Dispatch trained",      done: false },
  { id: "portal",       label: "Customer portal live",  done: false },
  { id: "integrations", label: "Integrations configured", done: false },
  { id: "go-live",      label: "Go-live",               done: false },
  { id: "review",       label: "Post-launch review",    done: false },
];

export const COLLATERAL = [
  { title: "Anderoute Platform Overview",   audience: "All buyers",      cta: "Download PDF",   value: "One platform for dispatch, drivers, customers, and AI." },
  { title: "Dispatch Command Center",       audience: "Operations leads",cta: "Book a demo",    value: "Run every load from one realtime board." },
  { title: "Anderoute EliteNav Brief",      audience: "Fleet managers",  cta: "Watch driver demo", value: "Truck-aware navigation drivers actually use." },
  { title: "Customer Portal Brief",         audience: "Sales / CX leads",cta: "See portal demo",value: "Stop the status-call avalanche with self-serve tracking." },
  { title: "AI Operations Intelligence",    audience: "Executives",      cta: "Read AI brief",  value: "Predict delays. Explain risk. Approve with one click." },
  { title: "Security Overview",             audience: "IT / Security",   cta: "Request security pack", value: "SOC 2-ready, RLS-enforced, full audit trail." },
  { title: "Integration Overview",          audience: "IT / Integration leads", cta: "See connectors", value: "EDI 204/214, REST API, webhooks, broker connectors." },
  { title: "Implementation Overview",       audience: "Buyers",          cta: "See timeline",   value: "From kickoff to go-live in 2–6 weeks." },
  { title: "Pilot Program",                 audience: "Decision makers", cta: "Start a pilot",  value: "30 / 60 / 90-day structured pilots." },
  { title: "ROI Calculator",                audience: "CFOs / Owners",   cta: "Run the numbers",value: "Estimate dispatcher time, fuel, and delay savings." },
  { title: "Competitive Comparison",        audience: "Buyers in eval",  cta: "Get matrix",     value: "Anderoute vs. legacy TMS + GPS combos." },
  { title: "Discovery Questionnaire",       audience: "Sales reps",      cta: "Download",       value: "Qualification questions for great first calls." },
];

export const PILOT_METRICS = [
  { name: "Driver adoption",           target: "≥ 80%" },
  { name: "Dispatch adoption",         target: "≥ 90%" },
  { name: "Loads managed in platform", target: "≥ 95%" },
  { name: "GPS sync quality",          target: "≥ 98%" },
  { name: "ETA accuracy",              target: "+15% vs baseline" },
  { name: "On-time delivery",          target: "+5–10%" },
  { name: "Customer tracking usage",   target: "≥ 60% of loads" },
  { name: "Status call reduction",     target: "-30%" },
  { name: "Alert resolution time",     target: "-25%" },
  { name: "User satisfaction (CSAT)",  target: "≥ 4.5 / 5" },
];

export const SUCCESS_ACCOUNTS = [
  { name: "Westline Cargo",   health: 88, stage: "Live",       drivers: 42, risk: "low",      expansion: "EDI add-on" },
  { name: "Apex Hotshot",     health: 72, stage: "Live",       drivers: 14, risk: "moderate", expansion: "Customer portal" },
  { name: "MetroVan Delivery",health: 64, stage: "Onboarding", drivers: 28, risk: "moderate", expansion: "—" },
  { name: "PortPrime Freight",health: 41, stage: "At risk",    drivers: 65, risk: "high",     expansion: "—" },
];

export const SUPPORT_TICKETS = [
  { id: "T-1042", subject: "Driver app GPS not updating", priority: "high",   category: "Driver app",   status: "open" },
  { id: "T-1041", subject: "EDI 214 mapping question",    priority: "medium", category: "Integration",  status: "in_progress" },
  { id: "T-1040", subject: "How do I export billing CSV?",priority: "low",    category: "Billing",      status: "resolved" },
  { id: "T-1039", subject: "Customer portal branding",    priority: "medium", category: "Customer portal", status: "open" },
  { id: "T-1038", subject: "CoPilot voice not responding",priority: "high",   category: "CoPilot AI",   status: "in_progress" },
];

export const ROADMAP = [
  { area: "Driver app",       title: "Offline-first load queue",      status: "In Development" },
  { area: "Dispatch",         title: "Bulk load offer",               status: "Beta" },
  { area: "Customer portal",  title: "White-label custom domain",     status: "Released" },
  { area: "AI CoPilot",       title: "Multi-stop ETA explanation",    status: "In Development" },
  { area: "Integrations",     title: "Project44 connector",           status: "Planned" },
  { area: "Billing",          title: "Auto-invoice from POD",         status: "In Design" },
  { area: "Security",         title: "Self-serve SSO config",         status: "In Design" },
  { area: "Mobile",           title: "Android Auto release",          status: "Beta" },
  { area: "Enterprise",       title: "Per-business-unit RBAC",        status: "Planned" },
  { area: "Reporting",        title: "Scheduled report exports",      status: "Released" },
  { area: "Automation",       title: "Rule-based load auto-assign",   status: "Planned" },
];

export const RELEASES = [
  {
    version: "10.0.0", date: "2026-05-19",
    highlights: ["Product Launch Center", "Guided demo mode", "Pricing strategy"],
    features: ["Demo persona switcher", "Onboarding wizard scaffolds", "ROI calculator"],
    improvements: ["Marketing site copy", "Sales kit library"],
    fixes: [], security: [], known: ["Final pricing pending interviews"],
  },
  {
    version: "9.0.0", date: "2026-05-12",
    highlights: ["AI Operations Intelligence", "Predictive risk", "AI governance"],
    features: ["ETA confidence engine", "Capacity forecasting", "Shift handoff"],
    improvements: ["Recommendation explainability"],
    fixes: [], security: ["AI audit log enforced server-side"], known: [],
  },
  {
    version: "8.0.0", date: "2026-05-05",
    highlights: ["SOC 2 readiness", "Security Center", "Incident response"],
    features: ["Evidence vault", "RLS coverage dashboard", "Vendor risk module"],
    improvements: ["Stronger Edge Function boundaries"],
    fixes: [], security: ["Tenant isolation tests", "Privacy controls"],
    known: [],
  },
];

export const BRAND_TOKENS = [
  { token: "--primary",       value: "teal", note: "Action + nav" },
  { token: "--accent",        value: "orange", note: "Driver-centric accents" },
  { token: "--violet (AI)",   value: "violet 400/500", note: "All AI surfaces" },
  { token: "--rose (risk)",   value: "rose 400/500", note: "Critical risk" },
  { token: "--emerald",       value: "emerald 400/500", note: "Healthy / on-time" },
  { token: "Typography",      value: "Geist / system stack", note: "Headings: tight tracking" },
  { token: "Radius",          value: "0.75rem default", note: "Cards 1rem" },
];

/* ---------------- Phase 10 polish: stronger packaging primitives ---------------- */

export const VALUE_PILLARS = [
  { icon: "Radio",    title: "Realtime-first",      copy: "Live GPS, dispatch, and customer tracking on the same stream — not nightly report exports." },
  { icon: "Truck",    title: "Truck-aware routing", copy: "EliteNav respects height, weight, HazMat and HOS — built in, not bolted on." },
  { icon: "Sparkles", title: "Explainable AI",      copy: "Every CoPilot recommendation shows reasoning, confidence, and audit trail before a human approves." },
  { icon: "Users",    title: "Multi-stakeholder",   copy: "Dispatchers, drivers, customers, and executives each get a purpose-built surface." },
  { icon: "Shield",   title: "Enterprise-grade",    copy: "SOC 2-ready, RLS-enforced tenant isolation, SSO/SAML, full audit." },
  { icon: "Plug",     title: "Open integrations",   copy: "EDI 204/214, REST API, webhooks, broker + TMS connectors via the Integration Hub." },
] as const;

export const PROOF_POINTS = [
  { stat: "−30%",  label: "Status calls", note: "Customer portal + proactive AI updates (illustrative target)" },
  { stat: "+15%",  label: "ETA accuracy", note: "ETA confidence engine + live GPS" },
  { stat: "+5–10%",label: "On-time delivery", note: "Predictive risk + dispatcher approval workflow" },
  { stat: "2–6 wk",label: "Time to go-live", note: "Wizards + structured onboarding" },
  { stat: "100%",  label: "AI actions audited", note: "Every recommendation and approval logged" },
  { stat: "1 pane",label: "Replaces 5+ tools", note: "Dispatch · GPS · portal · alerts · reporting" },
];

export interface MatrixRow { feature: string; starter: string | boolean; professional: string | boolean; fleet: string | boolean; enterprise: string | boolean; }
export const COMPARISON_MATRIX: MatrixRow[] = [
  { feature: "Live dispatch map",         starter: "Basic",   professional: true, fleet: true, enterprise: true },
  { feature: "Driver app + EliteNav",     starter: true,      professional: true, fleet: true, enterprise: true },
  { feature: "Customer portal",           starter: "Link",    professional: true, fleet: true, enterprise: "White-label" },
  { feature: "CoPilot AI",                starter: false,     professional: "Basic", fleet: "Advanced", enterprise: "Advanced + custom" },
  { feature: "Predictive risk",           starter: false,     professional: false, fleet: true, enterprise: true },
  { feature: "Integrations Hub",          starter: false,     professional: "Webhooks", fleet: "EDI + API", enterprise: "Custom + SLA" },
  { feature: "RBAC + SSO/SAML",           starter: false,     professional: "RBAC", fleet: "RBAC", enterprise: "SSO/SAML" },
  { feature: "Audit log retention",       starter: "30 days", professional: "90 days", fleet: "1 year", enterprise: "Custom" },
  { feature: "Dispatcher seats",          starter: "2",       professional: "5", fleet: "Unlimited", enterprise: "Unlimited" },
  { feature: "Support SLA",               starter: "Email",   professional: "Email + chat", fleet: "Priority", enterprise: "Dedicated CSM" },
];

export const ROI_PRESETS = [
  { id: "small",   label: "Small (5 drivers)",   drivers: 5,   loadsPerDay: 25,  softwareCost: 600 },
  { id: "growing", label: "Growing (25 drivers)",drivers: 25,  loadsPerDay: 120, softwareCost: 2400 },
  { id: "fleet",   label: "Fleet (75 drivers)",  drivers: 75,  loadsPerDay: 350, softwareCost: 7500 },
  { id: "ent",     label: "Enterprise (200)",    drivers: 200, loadsPerDay: 900, softwareCost: 18000 },
];

export const ONBOARDING_PHASES = [
  { phase: "Sales → kickoff",   stages: ["sales", "demo", "pilot"] },
  { phase: "Account setup",     stages: ["account", "company", "users"] },
  { phase: "Data import",       stages: ["drivers", "vehicles", "customers", "loads"] },
  { phase: "Rollout",           stages: ["driver-app", "gps", "training", "portal", "integrations"] },
  { phase: "Go-live + review",  stages: ["go-live", "review"] },
];

export const HEALTH_DIMENSIONS = [
  { key: "adoption",  label: "Driver + dispatch adoption", weight: 30 },
  { key: "usage",     label: "Product usage (loads in app)",weight: 25 },
  { key: "outcomes",  label: "Outcomes (OTP, ETA accuracy)",weight: 20 },
  { key: "support",   label: "Support load (inverse)",     weight: 10 },
  { key: "advocacy",  label: "CSAT / NPS / references",    weight: 10 },
  { key: "expansion", label: "Expansion signals",          weight: 5  },
];

export const ICP = {
  bestFit: [
    "Couriers + final-mile fleets (10–200 drivers)",
    "Hotshot + box-truck operators",
    "Regional freight carriers needing visibility",
    "3PLs running multiple driver pools",
  ],
  notFit: [
    "Single-driver owner-operators (use a TMS)",
    "Pure freight brokerages without driver ops",
    "Enterprises requiring full WMS replacement",
  ],
  triggers: [
    "Status-call overload from customers",
    "Adding a new shipper requiring tracking",
    "Outgrown spreadsheets + consumer GPS",
    "New compliance / SOC 2 requirement",
  ],
};

export const DISCOVERY_QUESTIONS = [
  "How many loads do you move per day, and by what equipment mix?",
  "How many dispatchers + drivers today, and what's the growth plan?",
  "What's the cost of one late delivery (penalty + relationship)?",
  "How much time do dispatchers spend on status calls each day?",
  "Which TMS / GPS / EDI / broker systems must we integrate with?",
  "Who approves customer-facing updates today — and how fast?",
  "What's your current customer visibility experience like?",
  "Do you have SOC 2, SSO, or data-residency requirements?",
];

export const DEMO_KEY_MOMENTS = [
  { step: 3,  why: "AI recommendation with explanation — proves explainable AI." },
  { step: 6,  why: "EliteNav truck-aware route — proves driver-grade navigation." },
  { step: 9,  why: "Predictive delay flag — proves proactive operations." },
  { step: 12, why: "POD lands in portal — proves end-to-end visibility." },
  { step: 14, why: "Exec ops health update — proves executive intelligence loop." },
];

export const PILOT_TRACKS = [
  { name: "30-day Sprint",       audience: "Small operators",   focus: "Core dispatch + driver + portal", outcome: "Go/no-go on Starter or Professional" },
  { name: "60-day Standard",     audience: "Growing fleets",    focus: "+ CoPilot + first integration",  outcome: "Conversion to Professional / Fleet Command" },
  { name: "90-day Enterprise",   audience: "Larger fleets",     focus: "+ EDI + SSO + custom workflows", outcome: "Annual Enterprise contract" },
];

export const HELP_TOPICS = [
  { topic: "How do I create a load?",            category: "Dispatcher" },
  { topic: "How do I assign a driver?",          category: "Dispatcher" },
  { topic: "Why is my GPS not updating?",        category: "Driver" },
  { topic: "How do I capture POD?",              category: "Driver" },
  { topic: "How does my customer track a load?", category: "Customer" },
  { topic: "How do I invite a new user?",        category: "Admin" },
  { topic: "How does CoPilot approval work?",    category: "AI" },
  { topic: "How do I export billing data?",      category: "Billing" },
];
