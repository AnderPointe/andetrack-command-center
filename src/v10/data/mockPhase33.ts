// Phase 33 — V10 global category leadership. Mock-only.
// No real audit / valuation / certification / Android Auto / CarPlay claims.

export const V10_FEATURE_MATRIX = [
  { area: "Global category leadership",        status: "in_progress", note: "Command center + score" },
  { area: "Enterprise trust commercialization",status: "in_progress", note: "Packets + sales readiness" },
  { area: "Enterprise proof point library",    status: "in_progress", note: "Categorized + approval flow" },
  { area: "Platform economics maturity",       status: "in_progress", note: "Revenue quality + mix" },
  { area: "Marketplace value proof",           status: "in_progress", note: "Coverage / bids / award" },
  { area: "Ecosystem defensibility",           status: "in_progress", note: "Moat matrix + risks" },
  { area: "Trust-led sales enablement",        status: "in_progress", note: "Decks + battlecards" },
  { area: "Procurement / security sales",      status: "in_progress", note: "Request board + queue" },
  { area: "Customer retention + expansion",    status: "in_progress", note: "Renewal + expansion" },
  { area: "Customer outcomes",                 status: "in_progress", note: "Outcome score + stories" },
  { area: "Strategic enterprise expansion",    status: "in_progress", note: "Pipeline + decisions" },
  { area: "Partner ecosystem value",           status: "in_progress", note: "Sourced + adoption" },
  { area: "Product-line durability",           status: "in_progress", note: "12 product lines" },
  { area: "Board / investor narrative",        status: "in_progress", note: "Narrative readiness" },
  { area: "Strategic growth execution",        status: "in_progress", note: "Initiative board" },
  { area: "Competitive category positioning",  status: "in_progress", note: "Battlecards + win/loss" },
  { area: "Executive operating model",         status: "in_progress", note: "Cadence + decision velocity" },
  { area: "Platform value realization",        status: "in_progress", note: "Value realized by axis" },
  { area: "Enterprise reference readiness",    status: "in_progress", note: "Reference board" },
  { area: "Long-term category roadmap",        status: "planned",     note: "6 horizons × 11 tracks" },
] as const;

export const V10_DEFERRED = [
  "Fully autonomous dispatch",
  "Final certification / SOC 2 / ISO claims (no real audits)",
  "Final IPO / acquisition readiness claims",
  "Full customs production workflows",
  "Full international tax automation",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "Final Android Auto / CarPlay claims",
] as const;

// ---------------- Category Leadership ----------------
export const V10_CATEGORY_LEADERSHIP = { score: 92, trend_pts: 6, label: "Leader" };
export const V10_CATEGORY_PILLARS = [
  { pillar: "Market narrative maturity",    score: 90, owner: "CMO" },
  { pillar: "Product differentiation",      score: 91, owner: "CPO" },
  { pillar: "Enterprise trust maturity",    score: 88, owner: "CSO" },
  { pillar: "Marketplace proof maturity",   score: 84, owner: "MP lead" },
  { pillar: "AI operations proof",          score: 82, owner: "AI lead" },
  { pillar: "Customer proof maturity",      score: 86, owner: "CCO" },
  { pillar: "Partner proof maturity",       score: 78, owner: "Partner" },
  { pillar: "Security / compliance proof",  score: 87, owner: "CSO" },
  { pillar: "Competitive position",         score: 89, owner: "PMM" },
  { pillar: "Sales enablement maturity",    score: 85, owner: "Sales" },
  { pillar: "Analyst / influencer (placeholder)", score: 62, owner: "PMM" },
  { pillar: "Executive narrative readiness", score: 88, owner: "CEO" },
  { pillar: "Board narrative readiness",     score: 90, owner: "Board chair" },
] as const;
export const V10_CATEGORY_GAPS = [
  { area: "Analyst briefing program", gap: "Pilot only — no scheduled briefings" },
  { area: "Partner proof",            gap: "2 partners need approved joint case studies" },
  { area: "AI ops proof",             gap: "Quantified time-saved data not yet packaged" },
] as const;
export const V10_CATEGORY_ACTIONS = [
  { id: "cl1", owner: "CMO", action: "Publish enterprise trust narrative v10" },
  { id: "cl2", owner: "PMM", action: "Run 2 analyst briefings" },
  { id: "cl3", owner: "Partner", action: "Approve 2 joint case studies" },
  { id: "cl4", owner: "AI",  action: "Package quantified CoPilot outcomes" },
  { id: "cl5", owner: "MP",  action: "Refresh MP proof points pack" },
] as const;

// ---------------- Trust commercialization ----------------
export const V10_TRUST_COMMERCIAL_SCORE = { sales_readiness: 86, packets_ready: 11, packets_total: 13 };
export const V10_TRUST_PACKETS = [
  { packet: "Trust packet",                 status: "ready",        owner: "CSO" },
  { packet: "Security packet",              status: "ready",        owner: "CSO" },
  { packet: "Procurement packet",           status: "needs_refresh",owner: "CCO" },
  { packet: "Control pack",                 status: "ready",        owner: "CSO" },
  { packet: "Certification evidence",       status: "ready",        owner: "CSO" },
  { packet: "Financial controls summary",   status: "ready",        owner: "CFO" },
  { packet: "AI governance disclosure",     status: "needs_refresh",owner: "AI" },
  { packet: "Data governance disclosure",   status: "ready",        owner: "DPO" },
  { packet: "Mobile security disclosure",   status: "ready",        owner: "Mobile" },
  { packet: "API / EDI security disclosure",status: "ready",        owner: "Eng" },
  { packet: "Customer security questionnaire", status: "ready",     owner: "CSO" },
  { packet: "Sales trust collateral",       status: "ready",        owner: "Sales" },
  { packet: "Deal support readiness",       status: "ready",        owner: "Sales" },
] as const;
export const V10_DEAL_TRUST_QUEUE = [
  { id: "dt1", deal: "AcmeCo — renewal+expansion", blocker: "Updated AI disclosure", owner: "AI", eta: "7d" },
  { id: "dt2", deal: "Northwind Foods — EDI add-on", blocker: "—", owner: "—", eta: "—" },
  { id: "dt3", deal: "GlobalParts EU — new", blocker: "EU DPA addendum", owner: "Legal", eta: "14d" },
  { id: "dt4", deal: "Cascade Mfg — expansion", blocker: "Pen test summary", owner: "CSO", eta: "10d" },
] as const;
export const V10_TRUST_COLLATERAL = [
  { asset: "Executive trust one-pager",     status: "ready",   updated: "2026-09-01" },
  { asset: "Security overview deck",        status: "ready",   updated: "2026-08-20" },
  { asset: "AI governance one-pager",       status: "in_progress", updated: "2026-09-05" },
  { asset: "Financial controls one-pager",  status: "ready",   updated: "2026-08-12" },
  { asset: "Marketplace trust brief",       status: "ready",   updated: "2026-08-22" },
  { asset: "Customer portal trust brief",   status: "ready",   updated: "2026-08-15" },
  { asset: "Driver privacy one-pager",      status: "ready",   updated: "2026-07-30" },
] as const;

// ---------------- Proof point library ----------------
export const V10_PROOF_POINTS = [
  { id: "p1",  category: "Customer success",       title: "AcmeCo — 22% dispatch productivity", status: "approved" },
  { id: "p2",  category: "Marketplace liquidity",  title: "Texas region — 92% load coverage",     status: "approved" },
  { id: "p3",  category: "Driver adoption",        title: "EliteNav — 76% DAU on enterprise tier", status: "approved" },
  { id: "p4",  category: "Dispatcher productivity",title: "Northwind — 3x loads / dispatcher",    status: "approved" },
  { id: "p5",  category: "Customer portal",        title: "MediCare — 88% portal MAU",            status: "in_review" },
  { id: "p6",  category: "AI operations",          title: "CoPilot — 14m saved / dispatcher / day", status: "in_review" },
  { id: "p7",  category: "Support reliability",    title: "SLA compliance 96% across 12mo",       status: "approved" },
  { id: "p8",  category: "Security evidence",      title: "0 critical incidents in 90d",          status: "approved" },
  { id: "p9",  category: "Financial control",      title: "Marketplace fee exception cleared",     status: "approved" },
  { id: "p10", category: "Integration reliability",title: "EDI 99.4% inbound parse success",      status: "approved" },
  { id: "p11", category: "Partner ecosystem",      title: "EDI Hub Co — 22 joint customers",      status: "approved" },
  { id: "p12", category: "Mobile reliability",     title: "Driver app crash-free 99.7%",           status: "approved" },
] as const;
export const V10_PROOF_APPROVAL = { approved: 10, in_review: 2, draft: 0, owner: "PMM" };

// ---------------- Platform economics ----------------
export const V10_ECON = { revenue_quality: 86, predictability: 84, concentration_risk: 22 };
export const V10_REVENUE_MIX = [
  { line: "SaaS dispatch",     mix_pct: 38, quality: 88 },
  { line: "EliteNav",          mix_pct: 14, quality: 82 },
  { line: "CoPilot",           mix_pct: 9,  quality: 78 },
  { line: "Marketplace",       mix_pct: 24, quality: 84 },
  { line: "API platform",      mix_pct: 6,  quality: 72 },
  { line: "EDI platform",      mix_pct: 5,  quality: 70 },
  { line: "Customer portal",   mix_pct: 4,  quality: 80 },
] as const;
export const V10_UNIT_ECON = [
  { axis: "Marketplace take rate",  value: "9.4%" },
  { axis: "MP gross margin (placeholder)", value: "~62%" },
  { axis: "API gross margin (placeholder)", value: "~74%" },
  { axis: "Support cost / customer (placeholder)", value: "moderate" },
  { axis: "Implementation cost (placeholder)",     value: "moderate" },
  { axis: "Gross retention",        value: "96.8%" },
  { axis: "Net retention",          value: "112%" },
  { axis: "Expansion mix",          value: "+12.4%" },
] as const;
export const V10_ECON_RISKS = [
  { id: "e1", risk: "Customer concentration",     level: "medium", owner: "CCO" },
  { id: "e2", risk: "API monetization slow ramp", level: "low",    owner: "PM" },
  { id: "e3", risk: "EDI tech debt impacts margin", level: "medium", owner: "CPO" },
] as const;

// ---------------- Marketplace value proof ----------------
export const V10_MP_PROOF = { score: 84, trend_pts: 5 };
export const V10_MP_PROOF_METRICS = [
  { metric: "Loads posted",         value: "12,840 / mo" },
  { metric: "Loads awarded",        value: "11,830 / mo" },
  { metric: "Load coverage rate",   value: "92%" },
  { metric: "Avg bids per load",    value: "3.4" },
  { metric: "Time to first bid",    value: "12 min" },
  { metric: "Time to award",        value: "48 min → target 35" },
  { metric: "Uncovered load rate",  value: "1.6%" },
  { metric: "Preferred carrier usage", value: "56%" },
  { metric: "Dispute rate",         value: "1.8%" },
  { metric: "MP revenue (mock)",    value: "$ growing" },
] as const;
export const V10_MP_PROOF_REGIONAL = [
  { region: "Texas",     liquidity: 92, status: "strong" },
  { region: "Midwest",   liquidity: 88, status: "strong" },
  { region: "West",      liquidity: 80, status: "ok" },
  { region: "Northeast", liquidity: 79, status: "ok" },
  { region: "Southeast", liquidity: 68, status: "needs_density" },
] as const;

// ---------------- Ecosystem defensibility ----------------
export const V10_DEFENSIBILITY = { score: 86, label: "Strong" };
export const V10_MOAT_MATRIX = [
  { factor: "Workflow depth",            strength: 90 },
  { factor: "Data network effects",      strength: 74 },
  { factor: "Marketplace liquidity",     strength: 86 },
  { factor: "Carrier network depth",     strength: 84 },
  { factor: "Customer switching costs",  strength: 88 },
  { factor: "Integration ecosystem",     strength: 82 },
  { factor: "Partner ecosystem",         strength: 78 },
  { factor: "API / EDI connectivity",    strength: 84 },
  { factor: "Enterprise governance",     strength: 88 },
  { factor: "Trust / compliance evidence", strength: 85 },
  { factor: "Driver mobile experience",  strength: 86 },
  { factor: "Customer portal adoption",  strength: 82 },
  { factor: "AI operations intelligence",strength: 80 },
  { factor: "Product-line breadth",      strength: 84 },
  { factor: "Operational maturity",      strength: 87 },
] as const;
export const V10_DEFENSIBILITY_RISKS = [
  { id: "d1", risk: "Data network effects under-leveraged", owner: "Data" },
  { id: "d2", risk: "Partner ecosystem concentrated (Telematics-X)", owner: "Partner" },
] as const;
export const V10_MOAT_ROADMAP = [
  { id: "mr1", quarter: "Q4 2026", invest: "Data network effects — shared lane intelligence" },
  { id: "mr2", quarter: "Q1 2027", invest: "Second telematics partner to reduce concentration" },
  { id: "mr3", quarter: "Q2 2027", invest: "Expand customer switching-cost workflows (EDI + portal)" },
] as const;

// ---------------- Sales enablement ----------------
export const V10_SALES_ENABLEMENT = { readiness: 85 };
export const V10_SALES_ASSETS = [
  { asset: "Executive one-pager",        status: "ready" },
  { asset: "Security overview",          status: "ready" },
  { asset: "Compliance overview",        status: "ready" },
  { asset: "AI governance overview",     status: "in_progress" },
  { asset: "Financial controls overview",status: "ready" },
  { asset: "Marketplace proof overview", status: "ready" },
  { asset: "Customer portal proof",      status: "ready" },
  { asset: "Driver app proof",           status: "ready" },
  { asset: "Integration overview",       status: "ready" },
  { asset: "Procurement packet",         status: "ready" },
  { asset: "Vendor review packet",       status: "ready" },
  { asset: "Customer story",             status: "ready" },
  { asset: "Competitive battlecard",     status: "ready" },
  { asset: "ROI placeholder",            status: "in_progress" },
] as const;

// ---------------- Procurement / security sales ----------------
export const V10_PROC_SALES = { open: 6, blocked: 2 };
export const V10_PROC_REQUESTS = [
  { id: "pq1", customer: "AcmeCo",        item: "Security questionnaire", status: "in_progress", owner: "CSO",   due: "7d" },
  { id: "pq2", customer: "GlobalParts EU",item: "EU DPA addendum",        status: "in_progress", owner: "Legal", due: "14d" },
  { id: "pq3", customer: "Cascade Mfg",   item: "Pen test summary",       status: "planned",     owner: "CSO",   due: "10d" },
  { id: "pq4", customer: "MediCare CA",   item: "AI disclosure",          status: "in_review",   owner: "AI",    due: "5d" },
  { id: "pq5", customer: "Northwind",     item: "Mobile permission packet", status: "ready",     owner: "Mobile",due: "—" },
  { id: "pq6", customer: "AcmeCo",        item: "Updated SOC packet",     status: "in_progress", owner: "CSO",   due: "21d" },
] as const;
export const V10_PROC_BLOCKERS = [
  { id: "pb1", deal: "GlobalParts EU", reason: "Legal review on EU DPA addendum" },
  { id: "pb2", deal: "Cascade Mfg",    reason: "Awaiting pen test scope sign-off" },
] as const;

// ---------------- Retention & expansion ----------------
export const V10_RETENTION = { renewal: 96.8, expansion: 12.4, churn_risk: 1, expansion_ready: 3 };
export const V10_RETENTION_ACCOUNTS = [
  { customer: "AcmeCo Logistics", health: 92, renewal: "low_risk", expansion: "CoPilot + EDI",       sponsor: "engaged", outcome: "+22% dispatcher productivity" },
  { customer: "Northwind Foods",  health: 88, renewal: "low_risk", expansion: "EDI tier upgrade",     sponsor: "engaged", outcome: "Coverage +6 pts" },
  { customer: "GlobalParts EU",   health: 70, renewal: "medium",   expansion: "—",                    sponsor: "needs_qbr", outcome: "EU rollout in progress" },
  { customer: "Cascade Mfg",      health: 74, renewal: "medium",   expansion: "API monetization tier",sponsor: "needs_qbr", outcome: "Portal adoption climbing" },
  { customer: "MediCare CA",      health: 84, renewal: "low_risk", expansion: "CoPilot expansion",    sponsor: "engaged", outcome: "AI ops adoption +12%" },
  { customer: "BlueRidge Carriers", health: 58, renewal: "high",   expansion: "—",                    sponsor: "stalled",   outcome: "Low driver adoption — risk" },
] as const;
export const V10_RETENTION_PLAYBOOK = [
  { id: "rp1", play: "Driver adoption recovery for BlueRidge", owner: "CS",  eta: "30d" },
  { id: "rp2", play: "Run 2 expansion QBRs (AcmeCo, MediCare)", owner: "CCO", eta: "14d" },
  { id: "rp3", play: "EU rollout milestone review (GlobalParts)", owner: "CS", eta: "21d" },
] as const;

// ---------------- Customer outcomes ----------------
export const V10_OUTCOMES = { score: 87 };
export const V10_OUTCOME_AREAS = [
  { area: "Dispatch visibility",        score: 92, evidence: "AcmeCo, Northwind" },
  { area: "Driver tracking",            score: 90, evidence: "Across all enterprise" },
  { area: "Load completion",            score: 88, evidence: "On-time +6 pts" },
  { area: "Customer portal adoption",   score: 84, evidence: "MAU 78%" },
  { area: "POD completion",             score: 91, evidence: "94% photo POD" },
  { area: "ETA visibility",             score: 88, evidence: "Customer survey 4.5/5" },
  { area: "Marketplace coverage",       score: 86, evidence: "92% load coverage" },
  { area: "Support response",           score: 84, evidence: "22 min median first response" },
  { area: "Integration reliability",    score: 87, evidence: "EDI parse 99.4%" },
  { area: "Report usage",               score: 80, evidence: "Weekly enterprise exports" },
  { area: "CoPilot usage",              score: 78, evidence: "Pilot in 3 accounts" },
  { area: "Operational improvement (placeholder)", score: 76, evidence: "Pending case studies" },
] as const;
export const V10_OUTCOME_TIMELINE = [
  { quarter: "2026-Q2", milestone: "Enterprise portal MAU > 75%" },
  { quarter: "2026-Q3", milestone: "EliteNav DAU > 75% on enterprise" },
  { quarter: "2026-Q4", milestone: "CoPilot quantified outcomes (in flight)" },
] as const;

// ---------------- Strategic expansion ----------------
export const V10_EXPANSION_SCORE = { pipeline_count: 14, decisions_pending: 3 };
export const V10_EXPANSION = [
  { id: "x1",  account: "AcmeCo Logistics", type: "Product expansion",      status: "in_negotiation", sponsor: "engaged" },
  { id: "x2",  account: "MediCare CA",      type: "CoPilot expansion",      status: "in_negotiation", sponsor: "engaged" },
  { id: "x3",  account: "Cascade Mfg",      type: "API tier",               status: "discovery",      sponsor: "needs_qbr" },
  { id: "x4",  account: "Northwind Foods",  type: "EDI tier",               status: "in_negotiation", sponsor: "engaged" },
  { id: "x5",  account: "GlobalParts EU",   type: "Region rollout",         status: "blocked_legal",  sponsor: "engaged" },
  { id: "x6",  account: "Atlas Freight",    type: "New enterprise",         status: "discovery",      sponsor: "early" },
  { id: "x7",  account: "Cardinal Hauling", type: "Marketplace expansion",  status: "discovery",      sponsor: "early" },
  { id: "x8",  account: "Pioneer Express",  type: "Telematics tier",        status: "discovery",      sponsor: "early" },
] as const;
export const V10_EXPANSION_DECISIONS = [
  { id: "xd1", decision: "Approve SE preferred-carrier expansion",     owner: "Board" },
  { id: "xd2", decision: "Approve EU DPA addendum template",           owner: "Legal" },
  { id: "xd3", decision: "Approve API monetization tier (Cascade)",    owner: "CFO" },
] as const;

// ---------------- Partner ecosystem ----------------
export const V10_PARTNER_VALUE = { score: 82, sourced_pipeline: 9 };
export const V10_PARTNERS = [
  { partner: "Telematics-X", revenue: 12, joint_customers: 18, health: 84, risk: "medium" },
  { partner: "EDI Hub Co",   revenue: 6,  joint_customers: 22, health: 86, risk: "low" },
  { partner: "FuelCard Pro", revenue: 4,  joint_customers: 14, health: 80, risk: "low" },
  { partner: "InsureLogix",  revenue: 3,  joint_customers: 9,  health: 72, risk: "medium" },
  { partner: "MapTruck",     revenue: 2,  joint_customers: 12, health: 78, risk: "low" },
] as const;
export const V10_PARTNER_ACTIONS = [
  { id: "pa1", owner: "Partner", action: "Add second telematics partner to reduce concentration" },
  { id: "pa2", owner: "Partner", action: "Approve 2 joint case studies (EDI Hub Co, FuelCard Pro)" },
  { id: "pa3", owner: "Partner", action: "Run partner QBR for Telematics-X" },
] as const;

// ---------------- Product-line durability ----------------
export const V10_PRODUCT_LINES = [
  { line: "Dispatch Command Center", adoption: 92, revenue_pct: 38, debt: "low",    competitive: "strong",  monetization: "mature",     invest: "maintain" },
  { line: "EliteNav",                adoption: 76, revenue_pct: 14, debt: "medium", competitive: "strong",  monetization: "scaling",    invest: "grow" },
  { line: "Driver Mobile",           adoption: 78, revenue_pct: 0,  debt: "low",    competitive: "strong",  monetization: "indirect",   invest: "grow" },
  { line: "Customer Portal",         adoption: 78, revenue_pct: 4,  debt: "low",    competitive: "strong",  monetization: "scaling",    invest: "grow" },
  { line: "CoPilot AI",              adoption: 64, revenue_pct: 9,  debt: "low",    competitive: "ahead",   monetization: "early",      invest: "grow" },
  { line: "Carrier Marketplace",     adoption: 70, revenue_pct: 24, debt: "medium", competitive: "strong",  monetization: "scaling",    invest: "grow" },
  { line: "API Platform",            adoption: 60, revenue_pct: 6,  debt: "low",    competitive: "ok",      monetization: "emerging",   invest: "monetize" },
  { line: "EDI Platform",            adoption: 68, revenue_pct: 5,  debt: "high",   competitive: "ok",      monetization: "scaling",    invest: "pay-down-debt" },
  { line: "Telematics",              adoption: 58, revenue_pct: 2,  debt: "low",    competitive: "ok",      monetization: "emerging",   invest: "grow" },
  { line: "Partner Marketplace",     adoption: 48, revenue_pct: 1,  debt: "low",    competitive: "ok",      monetization: "early",      invest: "grow" },
  { line: "Reports / Analytics",     adoption: 72, revenue_pct: 0,  debt: "low",    competitive: "strong",  monetization: "indirect",   invest: "grow" },
  { line: "Enterprise Governance",   adoption: 66, revenue_pct: 1,  debt: "low",    competitive: "strong",  monetization: "indirect",   invest: "maintain" },
] as const;
export const V10_PRODUCT_SCORE = { monetization: 81, durability: 84 };

// ---------------- Board / investor narrative ----------------
export const V10_NARRATIVE = { readiness: 90 };
export const V10_NARRATIVE_SECTIONS = [
  { section: "Market opportunity",      status: "ready" },
  { section: "Category leadership",     status: "ready" },
  { section: "Product maturity",        status: "ready" },
  { section: "Marketplace proof",       status: "ready" },
  { section: "Revenue quality",         status: "ready" },
  { section: "Customer retention",      status: "ready" },
  { section: "Expansion opportunities", status: "ready" },
  { section: "Enterprise trust",        status: "ready" },
  { section: "Certification evidence",  status: "in_progress" },
  { section: "Platform defensibility",  status: "ready" },
  { section: "Partner ecosystem",       status: "ready" },
  { section: "Strategic risks",         status: "ready" },
  { section: "Roadmap",                 status: "ready" },
  { section: "Decisions needed",        status: "drafting" },
  { section: "Next quarter priorities", status: "ready" },
] as const;
export const V10_NARRATIVE_PROOF = [
  "Coverage 92% · MP take rate 9.4%",
  "Net retention 112% · Gross retention 96.8%",
  "0 critical incidents in 90d · SLA 96%",
  "CoPilot pilot in 3 enterprise accounts",
  "Partner sourced pipeline 9 deals",
];

// ---------------- Growth execution ----------------
export const V10_GROWTH_INITIATIVES = [
  { id: "g1",  initiative: "Enterprise account expansion",   owner: "CCO",   milestone: "+3 expansion deals", risk: "low",   eta: "Q4" },
  { id: "g2",  initiative: "New region launch (EU pilot)",   owner: "COO",   milestone: "GlobalParts go-live", risk: "medium", eta: "Q1 2027" },
  { id: "g3",  initiative: "Marketplace liquidity growth",   owner: "MP",    milestone: "SE coverage +12 pts", risk: "medium", eta: "Q4" },
  { id: "g4",  initiative: "Carrier network growth",         owner: "MP",    milestone: "+150 preferred",      risk: "low",   eta: "Q4" },
  { id: "g5",  initiative: "Partner channel growth",         owner: "Partner", milestone: "+2 partners",       risk: "low",   eta: "Q4" },
  { id: "g6",  initiative: "API monetization growth",        owner: "PM",    milestone: "Tier pricing live",  risk: "medium", eta: "Q4" },
  { id: "g7",  initiative: "EDI adoption growth",            owner: "Eng",   milestone: "5 new EDI tenants",   risk: "medium", eta: "Q4" },
  { id: "g8",  initiative: "Customer portal expansion",      owner: "PM",    milestone: "Portal MAU 85%",      risk: "low",   eta: "Q4" },
  { id: "g9",  initiative: "CoPilot adoption growth",        owner: "AI",    milestone: "Pilot → 5 accounts",  risk: "medium", eta: "Q4" },
  { id: "g10", initiative: "Mobile adoption growth",         owner: "Mobile", milestone: "DAU 80%",            risk: "low",   eta: "Q4" },
  { id: "g11", initiative: "Trust-led sales acceleration",   owner: "Sales", milestone: "Win-rate +6 pts",     risk: "low",   eta: "Q4" },
] as const;

// ---------------- Competitive ----------------
export const V10_COMPETITORS = [
  { competitor: "Incumbent TMS A",  position: "legacy", feature: 70, mp: 60, ai: 55, driver: 65, portal: 60, integration: 75, gov: 78, security: 80 },
  { competitor: "Incumbent TMS B",  position: "legacy", feature: 72, mp: 64, ai: 58, driver: 66, portal: 62, integration: 76, gov: 80, security: 82 },
  { competitor: "Mid-market SaaS",  position: "growth", feature: 78, mp: 70, ai: 64, driver: 74, portal: 72, integration: 72, gov: 70, security: 74 },
  { competitor: "Marketplace pure-play", position: "narrow", feature: 60, mp: 88, ai: 60, driver: 50, portal: 55, integration: 65, gov: 60, security: 68 },
  { competitor: "Driver-app pure-play", position: "narrow", feature: 55, mp: 40, ai: 50, driver: 88, portal: 50, integration: 60, gov: 55, security: 70 },
  { competitor: "Anderoute",        position: "leader", feature: 90, mp: 86, ai: 80, driver: 86, portal: 84, integration: 84, gov: 88, security: 88 },
] as const;
export const V10_BATTLECARDS = [
  { vs: "Incumbent TMS A/B", win: "Trust controls + driver app + MP coverage", risk: "Long-tenured customer relationships" },
  { vs: "Marketplace pure-play", win: "Workflow depth + trust + governance", risk: "Niche MP brand awareness" },
  { vs: "Driver-app pure-play", win: "End-to-end (dispatch + portal + MP)", risk: "Brand inertia in pure mobile" },
] as const;
export const V10_WIN_LOSS = [
  { outcome: "win",  notes: "Trust + portal + MP coverage swung MediCare CA" },
  { outcome: "win",  notes: "EDI maturity won Northwind expansion" },
  { outcome: "loss", notes: "Lost SmallCo to incumbent A on price" },
] as const;

// ---------------- Executive operating model ----------------
export const V10_EXEC_MODEL = { maturity: 88 };
export const V10_EXEC_CADENCE = [
  { meeting: "Weekly executive",     cadence: "weekly",  completion: 96 },
  { meeting: "Monthly business review", cadence: "monthly", completion: 92 },
  { meeting: "Quarterly board",      cadence: "quarterly", completion: 100 },
  { meeting: "Strategy review",      cadence: "quarterly", completion: 100 },
  { meeting: "Risk review",          cadence: "monthly", completion: 90 },
  { meeting: "Financial control review", cadence: "monthly", completion: 88 },
  { meeting: "Marketplace review",   cadence: "monthly", completion: 92 },
  { meeting: "Customer success review", cadence: "monthly", completion: 90 },
  { meeting: "Product review",       cadence: "weekly",  completion: 94 },
  { meeting: "Partner review",       cadence: "monthly", completion: 86 },
  { meeting: "Compliance review",    cadence: "quarterly", completion: 100 },
] as const;
export const V10_DECISION_VELOCITY = { median_days: 4.2, action_completion_pct: 86 };

// ---------------- Platform value realization ----------------
export const V10_VALUE_REALIZED = { score: 84 };
export const V10_VALUE_AXES = [
  { axis: "Customer value realized",    score: 88 },
  { axis: "Revenue value realized",     score: 84 },
  { axis: "Marketplace value realized", score: 86 },
  { axis: "Partner value realized",     score: 78 },
  { axis: "Product value realized",     score: 84 },
  { axis: "Trust value realized",       score: 88 },
  { axis: "Support value realized",     score: 82 },
  { axis: "Integration value realized", score: 84 },
  { axis: "AI operations value realized", score: 78 },
  { axis: "Data value realized",        score: 74 },
  { axis: "Expansion value realized",   score: 80 },
] as const;

// ---------------- Reference readiness ----------------
export const V10_REFERENCES = [
  { customer: "AcmeCo Logistics", case_study: "ready", security_ref: "ready", mp_ref: "ready", driver_ref: "ready", portal_ref: "ready", integration_ref: "ready", support_ref: "ready", sponsor_approval: "approved", legal_approval: "placeholder", visibility: "public" },
  { customer: "Northwind Foods",  case_study: "ready", security_ref: "ready", mp_ref: "ready", driver_ref: "ok",    portal_ref: "ready", integration_ref: "ready", support_ref: "ready", sponsor_approval: "approved", legal_approval: "placeholder", visibility: "public" },
  { customer: "MediCare CA",      case_study: "in_progress", security_ref: "ready", mp_ref: "ok", driver_ref: "ok", portal_ref: "ready", integration_ref: "ready", support_ref: "ready", sponsor_approval: "approved", legal_approval: "placeholder", visibility: "private" },
  { customer: "Cascade Mfg",      case_study: "drafting", security_ref: "ready", mp_ref: "ok",   driver_ref: "ok",  portal_ref: "ready", integration_ref: "ready", support_ref: "ok",    sponsor_approval: "pending",  legal_approval: "placeholder", visibility: "private" },
] as const;

// ---------------- Long-term roadmap ----------------
export const V10_ROADMAP_HORIZONS = ["Current quarter", "Next quarter", "6 months", "12 months", "24 months", "36 months"] as const;
export const V10_ROADMAP_TRACKS = [
  { track: "Product leadership",         items: ["Refactor EDI debt", "CoPilot Phase B", "Portal v3 polish", "Telematics tier-up", "Open APIs", "AI ops platform"] },
  { track: "Marketplace leadership",     items: ["SE preferred", "Lane intelligence", "Carrier tiers v2", "International MP", "Spot pricing", "Risk pricing"] },
  { track: "AI operations leadership",   items: ["Explainability 90%", "Dispatch CoPilot", "Driver CoPilot", "Customer CoPilot", "Carrier CoPilot", "AI ops platform"] },
  { track: "Enterprise trust leadership",items: ["Trust packets v2", "SOC readiness", "ISO scope", "FedRAMP placeholder", "EU residency", "Customer-managed keys"] },
  { track: "Customer experience",        items: ["Portal v3", "Portal mobile", "Self-serve onboarding", "Outcome dashboards", "Reference program", "Customer university"] },
  { track: "Driver experience",          items: ["EliteNav offline", "Voice CoPilot+", "Privacy controls v2", "Android Auto plan", "CarPlay plan", "Driver community"] },
  { track: "Partner ecosystem",          items: ["+ telematics partner", "+ EDI partner", "Partner portal v2", "Partner marketplace v2", "ISV program", "Channel program"] },
  { track: "Financial governance",       items: ["Fin gov 85", "Audit package 90", "Revenue rec automation", "MP fee close", "Country billing", "Plan controls"] },
  { track: "Certification maturity",     items: ["SOC 2 evidence", "ISO scope", "Pen test refresh", "DPA library", "Sub-processor list", "Customer-facing audit"] },
  { track: "Global expansion",           items: ["EU pilot", "EU GA", "CA pilot", "MX pilot", "UK pilot", "APAC pilot"] },
  { track: "Category narrative",         items: ["Trust narrative v10", "Analyst pilots", "Influencer program", "Customer summit", "Industry awards", "Category report"] },
] as const;

// ---------------- Reports ----------------
export const V10_REPORTS = [
  "Category leadership",
  "Enterprise trust commercialization",
  "Platform economics maturity",
  "Marketplace value proof",
  "Ecosystem defensibility",
  "Trust-led sales enablement",
  "Procurement / security sales",
  "Customer retention and expansion",
  "Customer outcomes",
  "Strategic enterprise expansion",
  "Partner ecosystem value",
  "Product-line durability",
  "Board / investor narrative",
  "Strategic growth execution",
  "Competitive category positioning",
  "Executive operating model maturity",
  "Platform value realization",
  "Enterprise reference readiness",
  "Category leadership roadmap",
] as const;

// ---------------- Exec headline + overlays ----------------
export const V10_EXEC_HEADLINE = {
  status: "green" as const,
  headline: "Phase 33 · V10 — Global category leadership + trust commercialization",
  detail: "Category leadership 92 · Enterprise trust 88 · MP proof 84 · Platform economics 81 · Defensibility 86.",
  signals: [
    { label: "Category leadership", value: 92, tone: "good" as const },
    { label: "Trust commercial",    value: 86, tone: "good" as const },
    { label: "MP proof",            value: 84, tone: "good" as const },
    { label: "Platform economics",  value: 81, tone: "good" as const },
    { label: "Defensibility",       value: 86, tone: "good" as const },
    { label: "Retention",           value: 88, tone: "good" as const },
  ],
  next_decision: { who: "CEO", what: "Sign V10 category leadership action plan", due: "this week" },
};

export const V10_EXECUTION_OVERLAYS = [
  { area: "Category leadership", role: "CEO",   focus: "Score 92 · narrative + product + trust",            decision: "Sign V10 action plan" },
  { area: "Trust commercial",    role: "CRO",   focus: "Readiness 86 · 1 deal blocked on AI disclosure",    decision: "Close AI disclosure refresh in 7d" },
  { area: "Proof points",        role: "PMM",   focus: "12 proof points · 2 in review",                     decision: "Approve 2 CoPilot proof points" },
  { area: "Platform economics",  role: "CFO",   focus: "Revenue quality 86 · concentration 22",             decision: "Reduce top-account concentration plan" },
  { area: "MP value proof",      role: "MP",    focus: "Coverage 92% · bids 3.4 · award 48m",               decision: "Drive SE density to lift coverage" },
  { area: "Defensibility",       role: "CSO/CPO", focus: "Moat 86 · data network underleveraged",           decision: "Approve lane intelligence investment" },
  { area: "Sales enablement",    role: "Sales", focus: "Readiness 85 · AI overview in progress",            decision: "Ship AI overview deck" },
  { area: "Procurement",         role: "CCO",   focus: "6 open · 2 blocked (legal, pen test)",              decision: "Unblock GlobalParts EU DPA" },
  { area: "Retention",           role: "CS",    focus: "Renewal 96.8% · 1 churn risk (BlueRidge)",          decision: "Launch driver adoption recovery" },
  { area: "Outcomes",            role: "CS",    focus: "Score 87 · CoPilot outcomes pending",               decision: "Publish 2 customer outcome stories" },
  { area: "Expansion",           role: "CCO",   focus: "14 in pipeline · 3 decisions pending",              decision: "Approve API tier for Cascade" },
  { area: "Partner value",       role: "Partner", focus: "Score 82 · Telematics-X concentration",           decision: "Sign second telematics partner LOI" },
  { area: "Product durability",  role: "CPO",   focus: "EDI debt high · CoPilot ahead",                     decision: "Plan EDI tech-debt sprint" },
  { area: "Narrative",           role: "Board", focus: "Readiness 90 · decisions section drafting",         decision: "Finalize decision asks" },
  { area: "Growth execution",    role: "COO",   focus: "11 initiatives · 3 medium risk",                    decision: "Lock Q4 milestones for g3/g6/g9" },
  { area: "Competitive",         role: "PMM",   focus: "Leader vs legacy + pure-play",                      decision: "Publish refreshed battlecards" },
  { area: "Exec model",          role: "CEO",   focus: "Maturity 88 · decisions 4.2d median",               decision: "Maintain weekly cadence + RACI" },
  { area: "Value realization",   role: "CEO",   focus: "Score 84 · data 74 lagging",                        decision: "Approve data value investment" },
  { area: "Reference readiness", role: "CCO",   focus: "4 references · 2 public · 2 private",               decision: "Approve 2 private → public flips" },
  { area: "Roadmap",             role: "CEO",   focus: "6 horizons × 11 tracks",                            decision: "Sign 12mo roadmap commits" },
] as const;

export const V10_ROLE_GUIDANCE = [
  { role: "CEO",   tone: "violet",  focus: "Lock V10 category leadership plan + roadmap" },
  { role: "CRO",   tone: "emerald", focus: "Convert trust + proof into sales velocity" },
  { role: "CFO",   tone: "amber",   focus: "Raise platform economics maturity + reduce concentration" },
  { role: "CSO",   tone: "sky",     focus: "Refresh trust packets; unblock procurement" },
  { role: "Board", tone: "rose",    focus: "Approve roadmap, expansion, partner LOI" },
] as const;

export const V10_RLS_EXAMPLES = [
  {
    table: "v10_category_leadership_scores",
    policy: "Platform owner read",
    sql: "create policy v10_cat_read on public.v10_category_leadership_scores for select using (public.is_platform_owner(auth.uid()));",
  },
  {
    table: "customer_outcome_records",
    policy: "Tenant read · company admin",
    sql: "create policy v10_outcome_read on public.customer_outcome_records for select using (company_id = public.current_company() and (public.has_role(auth.uid(), company_id, 'admin') or public.has_role(auth.uid(), company_id, 'customer_success')));",
  },
  {
    table: "board_investor_narratives",
    policy: "Executive / board only",
    sql: "create policy v10_narrative_read on public.board_investor_narratives for select using (public.has_role(auth.uid(), company_id, 'executive') or public.has_role(auth.uid(), company_id, 'board'));",
  },
  {
    table: "competitive_category_positioning",
    policy: "Internal only (no customer / carrier / partner read)",
    sql: "create policy v10_compete_read on public.competitive_category_positioning for select using (public.has_role(auth.uid(), company_id, 'admin') or public.has_role(auth.uid(), company_id, 'pmm') or public.has_role(auth.uid(), company_id, 'sales'));",
  },
  {
    table: "procurement_security_sales_requests",
    policy: "Sales / security / CS only",
    sql: "create policy v10_proc_read on public.procurement_security_sales_requests for select using (public.has_role(auth.uid(), company_id, 'sales') or public.has_role(auth.uid(), company_id, 'security') or public.has_role(auth.uid(), company_id, 'customer_success'));",
  },
  {
    table: "enterprise_proof_points",
    policy: "Approved-only for sales role",
    sql: "create policy v10_proof_sales_read on public.enterprise_proof_points for select using (status = 'approved' and public.has_role(auth.uid(), company_id, 'sales'));",
  },
  {
    table: "partner_ecosystem_value_records",
    policy: "Partner role sees approved partner-facing only",
    sql: "create policy v10_partner_read on public.partner_ecosystem_value_records for select using (public.has_role(auth.uid(), company_id, 'partner') and partner_facing = true);",
  },
  {
    table: "product_line_durability_monetization",
    policy: "Product / executive only",
    sql: "create policy v10_product_read on public.product_line_durability_monetization for select using (public.has_role(auth.uid(), company_id, 'product') or public.has_role(auth.uid(), company_id, 'executive'));",
  },
] as const;

export const V10_BACKEND_BOUNDARY = [
  { kind: "createServerFn", name: "calculateV10CategoryLeadershipScore", caller: "Category center",       auth: "executive role" },
  { kind: "createServerFn", name: "generateCategoryLeadershipActionPlan", caller: "Category center",     auth: "executive role" },
  { kind: "createServerFn", name: "generateCategoryNarrativeSummary",    caller: "Narrative center",     auth: "executive / board" },
  { kind: "createServerFn", name: "calculateTrustSalesReadiness",        caller: "Trust commercial",     auth: "sales / security" },
  { kind: "createServerFn", name: "generateEnterpriseTrustPacket",       caller: "Trust commercial",     auth: "customer success" },
  { kind: "createServerFn", name: "approveProofPointForSales",           caller: "Proof library",        auth: "pmm / admin" },
  { kind: "createServerFn", name: "generateProcurementResponsePack",     caller: "Procurement center",   auth: "sales / security" },
  { kind: "createServerFn", name: "calculatePlatformEconomicsMaturity",  caller: "Economics center",     auth: "finance / executive" },
  { kind: "createServerFn", name: "calculateMarketplaceValueProof",      caller: "MP proof center",      auth: "marketplace role" },
  { kind: "createServerFn", name: "calculateEcosystemDefensibility",     caller: "Defensibility",        auth: "executive / cpo" },
  { kind: "createServerFn", name: "generateMarketplaceProofReport",      caller: "MP proof center",      auth: "marketplace role" },
  { kind: "createServerFn", name: "calculateRetentionExpansionScore",    caller: "Retention center",     auth: "customer success" },
  { kind: "createServerFn", name: "calculateCustomerOutcomeScore",       caller: "Outcomes dashboard",   auth: "customer success" },
  { kind: "createServerFn", name: "calculatePartnerEcosystemValue",      caller: "Partner center",       auth: "partner role" },
  { kind: "createServerFn", name: "generateCustomerSuccessStory",        caller: "Outcomes dashboard",   auth: "customer success" },
  { kind: "createServerFn", name: "generateBoardInvestorNarrative",      caller: "Narrative center",     auth: "executive / board" },
  { kind: "createServerFn", name: "calculateGrowthInitiativeImpact",     caller: "Growth system",        auth: "executive role" },
  { kind: "createServerFn", name: "calculateExecutiveOperatingMaturity", caller: "Exec model center",    auth: "executive role" },
  { kind: "createServerFn", name: "generatePlatformValueRealizationReport", caller: "Value realization", auth: "executive role" },
  { kind: "createServerFn", name: "generateCompetitiveBattlecard",       caller: "Competitive center",   auth: "pmm / sales" },
  { kind: "createServerFn", name: "calculateCategoryPositioningScore",   caller: "Competitive center",   auth: "pmm role" },
  { kind: "createServerFn", name: "generateWinLossSummary",              caller: "Competitive center",   auth: "sales / pmm" },
  { kind: "server route",   name: "/api/public/webhooks/proof-point-evidence", caller: "External evidence", auth: "HMAC signature" },
  { kind: "server route",   name: "/api/public/webhooks/reference-approval",   caller: "Customer legal",  auth: "HMAC signature" },
  { kind: "edge function",  name: "(none new in V10)",                   caller: "—",                    auth: "—" },
] as const;
