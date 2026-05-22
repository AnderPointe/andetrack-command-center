// Phase 34 — V10.5 mock data. Mock-only. No autonomous dispatch, no certification claims.
import type { ExecHeadline, OverlayItem } from "@/components/v8/ui-bits";

export const V105_COMMERCIAL_SCALE = { score: 84, trend_pts: 7, label: "Scaling" };

export const V105_FEATURE_MATRIX = [
  { area: "Enterprise commercialization", state: "v10.5", owner: "CRO" },
  { area: "Trust monetization",           state: "v10.5", owner: "Security" },
  { area: "Category leadership exec",     state: "v10.5", owner: "CMO" },
  { area: "Enterprise sales OS",          state: "v10.5", owner: "Sales Ops" },
  { area: "Enterprise deal desk",         state: "v10.5", owner: "Rev Ops" },
  { area: "Pricing & packaging",          state: "v10.5", owner: "Rev Ops" },
  { area: "Revenue expansion maturity",   state: "v10.5", owner: "CS" },
  { area: "Procurement acceleration",     state: "v10.5", owner: "Security" },
  { area: "Customer proof commercial",    state: "v10.5", owner: "PMM" },
  { area: "Marketplace proof commercial", state: "v10.5", owner: "MP Lead" },
  { area: "Partner channel scale",        state: "v10.5", owner: "Partner" },
  { area: "Product-line commercial",      state: "v10.5", owner: "PM" },
  { area: "Sales engineering readiness",  state: "v10.5", owner: "SE Lead" },
  { area: "Strategic capital readiness",  state: "v10.5", owner: "CFO" },
  { area: "Capital narrative / data room",state: "v10.5", owner: "CFO" },
  { area: "Board growth governance",      state: "v10.5", owner: "CEO" },
  { area: "Expansion discipline",         state: "v10.5", owner: "COO" },
  { area: "Executive revenue cadence",    state: "v10.5", owner: "CRO" },
  { area: "Strategic growth portfolio",   state: "v10.5", owner: "CEO" },
  { area: "Commercial risk mgmt",         state: "v10.5", owner: "Risk" },
];

export const V105_DEFERRED = [
  "Fully autonomous dispatch", "Final certification claims without evidence",
  "Final IPO/acquisition claims", "Final audited financial claims",
  "Customs production workflows", "International tax automation",
  "Insurance underwriting automation", "Autonomous vehicle workflows",
  "Final Android Auto / CarPlay claims",
];

// Enterprise commercialization
export const V105_PIPELINE = [
  { id: "OPP-501", account: "Northwind Logistics",  stage: "Security Review", arr_band: "$250-500k", win_prob: 55, trust: "ready",         mp_proof: "ready",         sponsor: "CIO",        next: "API security walk-through",     blocker: "API rate limits" },
  { id: "OPP-502", account: "Atlas Freight Co.",    stage: "Procurement",     arr_band: "$500k-1M",  win_prob: 60, trust: "ready",         mp_proof: "needs_refresh", sponsor: "VP Ops",     next: "DPA redline",                   blocker: "DPA terms" },
  { id: "OPP-503", account: "Heartland Carriers",   stage: "Pilot",           arr_band: "$100-250k", win_prob: 70, trust: "ready",         mp_proof: "ready",         sponsor: "COO",        next: "Pilot scorecard review",        blocker: null },
  { id: "OPP-504", account: "PacificMove",          stage: "Demo",            arr_band: "$250-500k", win_prob: 35, trust: "needs_refresh", mp_proof: "ready",         sponsor: "Dir Logistics",next: "Executive demo",             blocker: null },
  { id: "OPP-505", account: "Sunbelt Express",      stage: "Expansion",       arr_band: "+$300k",    win_prob: 75, trust: "ready",         mp_proof: "ready",         sponsor: "COO",        next: "Expansion proposal",            blocker: null },
  { id: "OPP-506", account: "GreatPlains Freight",  stage: "Discovery",       arr_band: "$100-250k", win_prob: 25, trust: "needs_refresh", mp_proof: "needs_refresh", sponsor: "VP Sales",   next: "Discovery call #2",             blocker: null },
];
export const V105_DEAL_STAGES = [
  { stage: "Target Account", count: 18 }, { stage: "Discovery", count: 11 },
  { stage: "Demo", count: 7 }, { stage: "Technical Validation", count: 5 },
  { stage: "Security Review", count: 4 }, { stage: "Procurement", count: 3 },
  { stage: "Pilot", count: 2 }, { stage: "Proposal", count: 2 },
  { stage: "Negotiation", count: 1 }, { stage: "Closed Won", count: 6 },
  { stage: "Expansion", count: 4 }, { stage: "Renewal", count: 3 },
];
export const V105_DEAL_BLOCKERS = [
  { deal: "Atlas Freight Co.",    blocker: "DPA terms",         owner: "Legal",    age_days: 12, severity: "high" },
  { deal: "Northwind Logistics",  blocker: "API rate limits",   owner: "SE Lead",  age_days: 6,  severity: "med" },
  { deal: "MidStates Hauling",    blocker: "SAML config",       owner: "Security", age_days: 3,  severity: "med" },
];

// Trust monetization
export const V105_TRUST_MONETIZATION = { score: 78, deals_unblocked: 5, packet_uses_30d: 42 };
export const V105_TRUST_ASSET_USAGE = [
  { asset: "Security packet",      uses_30d: 14, freshness: "fresh"   },
  { asset: "Procurement packet",   uses_30d: 11, freshness: "stale"   },
  { asset: "Compliance evidence",  uses_30d: 8,  freshness: "fresh"   },
  { asset: "AI governance",        uses_30d: 5,  freshness: "stale"   },
  { asset: "Financial controls",   uses_30d: 2,  freshness: "fresh"   },
  { asset: "Data governance",      uses_30d: 2,  freshness: "fresh"   },
];
export const V105_TRUST_ACCEL = [
  { deal: "Northwind",   asset: "Security packet",    impact: "unblocked SOC review" },
  { deal: "Atlas",       asset: "Procurement packet", impact: "cut review by 2 weeks" },
  { deal: "PacificMove", asset: "AI governance",      impact: "reopened evaluation" },
];
export const V105_SECURITY_RESP = { median_hours: 18, target_hours: 24, on_time_pct: 88 };

// Category leadership execution
export const V105_CATEGORY_EXEC = { score: 81, items_published_30d: 14 };
export const V105_CATEGORY_ITEMS = [
  { item: "Category narrative v3",     channel: "Website",   owner: "CMO",   status: "ready" },
  { item: "Differentiator one-pager",  channel: "Sales",     owner: "PMM",   status: "ready" },
  { item: "Customer story — Heartland",channel: "Public",    owner: "PMM",   status: "in_review" },
  { item: "Partner story — TMS-X",     channel: "Partner",   owner: "Partner",status: "in_review" },
  { item: "Marketplace proof brief",   channel: "Sales",     owner: "MP Lead",status: "ready" },
  { item: "Analyst briefing deck",     channel: "Analyst",   owner: "CMO",   status: "needs_refresh" },
  { item: "Demo narrative v2",         channel: "Sales",     owner: "SE",    status: "ready" },
];

// Enterprise sales OS
export const V105_ACCOUNTS = [
  { account: "Northwind Logistics", segment: "Enterprise", region: "Midwest",  sponsor: "CIO",     stage: "Security Review" },
  { account: "Atlas Freight Co.",   segment: "Enterprise", region: "Northeast",sponsor: "VP Ops",  stage: "Procurement" },
  { account: "Heartland Carriers",  segment: "Mid-market", region: "South",    sponsor: "COO",     stage: "Pilot" },
  { account: "PacificMove",         segment: "Enterprise", region: "West",     sponsor: "Dir Log", stage: "Demo" },
];
export const V105_BUYING_COMMITTEE = [
  { account: "Northwind", role: "Operations", contact: "S. Patel",  status: "engaged" },
  { account: "Northwind", role: "IT",         contact: "J. Romero", status: "engaged" },
  { account: "Northwind", role: "Security",   contact: "K. Liu",    status: "in_review" },
  { account: "Northwind", role: "Finance",    contact: "M. Greene", status: "pending"  },
  { account: "Northwind", role: "Procurement",contact: "A. Diaz",   status: "pending"  },
];
export const V105_CLOSE_PLAN = [
  { step: "Procurement packet refresh", owner: "Security", due: "2026-06-02" },
  { step: "API security walk-through",  owner: "SE Lead",  due: "2026-06-04" },
  { step: "DPA redline",                owner: "Legal",    due: "2026-06-09" },
  { step: "Pilot SOW",                  owner: "CS",       due: "2026-06-12" },
  { step: "Executive close call",       owner: "CRO",      due: "2026-06-18" },
];

// Deal desk
export const V105_DEAL_DESK = [
  { id: "DD-201", deal: "Atlas Freight",     request: "Pricing exception (-12%)", risk: "med", approvals: "Rev Ops, CFO", status: "in_review" },
  { id: "DD-202", deal: "Heartland Pilot",   request: "Implementation package",   risk: "low", approvals: "Rev Ops",      status: "approved" },
  { id: "DD-203", deal: "Northwind",         request: "Security review package",  risk: "med", approvals: "Security, CRO",status: "in_review" },
  { id: "DD-204", deal: "Sunbelt Expansion", request: "Marketplace package",      risk: "low", approvals: "Rev Ops",      status: "approved" },
];

// Pricing & packaging
export const V105_PACKAGES = [
  { pkg: "Core Dispatch",          adoption: 92, rev_pct: 28, attach: 100, support: "med",  margin: "good" },
  { pkg: "Driver Mobile / EliteNav",adoption: 84, rev_pct: 14, attach: 88,  support: "med",  margin: "good" },
  { pkg: "Customer Portal",        adoption: 71, rev_pct: 9,  attach: 64,  support: "low",  margin: "good" },
  { pkg: "CoPilot AI",             adoption: 46, rev_pct: 11, attach: 38,  support: "high", margin: "warn" },
  { pkg: "Carrier Marketplace",    adoption: 58, rev_pct: 13, attach: 49,  support: "med",  margin: "good" },
  { pkg: "API Platform",           adoption: 41, rev_pct: 8,  attach: 36,  support: "med",  margin: "good" },
  { pkg: "EDI Platform",           adoption: 33, rev_pct: 6,  attach: 28,  support: "high", margin: "warn" },
  { pkg: "Telematics Add-on",      adoption: 22, rev_pct: 3,  attach: 19,  support: "med",  margin: "warn" },
  { pkg: "Enterprise Governance",  adoption: 27, rev_pct: 5,  attach: 24,  support: "low",  margin: "good" },
  { pkg: "White-Label Portal",     adoption: 12, rev_pct: 1,  attach: 10,  support: "med",  margin: "warn" },
  { pkg: "Premium Support",        adoption: 36, rev_pct: 2,  attach: 34,  support: "n/a",  margin: "good" },
  { pkg: "Implementation Services",adoption: 48, rev_pct: 0,  attach: 48,  support: "n/a",  margin: "n/a"  },
];

// Revenue expansion
export const V105_EXPANSION = { score: 76, pipeline_count: 14, at_risk: 3 };
export const V105_EXPANSION_PIPE = [
  { account: "Sunbelt Express",   motion: "Product expansion", arr_band: "+$300k", stage: "Proposal",   risk: "low" },
  { account: "Heartland",         motion: "Seat expansion",    arr_band: "+$80k",  stage: "Discovery",  risk: "low" },
  { account: "MidStates",         motion: "Marketplace",       arr_band: "+$120k", stage: "Validation", risk: "med" },
  { account: "Atlas Freight",     motion: "API expansion",     arr_band: "+$150k", stage: "Discovery",  risk: "med" },
  { account: "Coastal Transport", motion: "Renewal+",          arr_band: "+$60k",  stage: "Renewal",    risk: "high" },
];

// Procurement acceleration
export const V105_PROC = { score: 73, open: 6, median_close_days: 11 };
export const V105_PROC_QUEUE = [
  { id: "PR-301", customer: "Northwind", type: "Security questionnaire", owner: "Security", due: "2026-06-01", status: "in_review" },
  { id: "PR-302", customer: "Atlas",     type: "DPA review",             owner: "Legal",    due: "2026-06-04", status: "in_review" },
  { id: "PR-303", customer: "PacificMove",type:"Vendor review",          owner: "Security", due: "2026-06-08", status: "pending"   },
  { id: "PR-304", customer: "Heartland", type: "AI usage review",        owner: "AI Gov",   due: "2026-06-10", status: "pending"   },
];

// Customer proof commercialization
export const V105_CUSTOMER_PROOF = [
  { id: "CP-401", title: "Heartland — 23% dispatch lift",    type: "case_study",  status: "approved" },
  { id: "CP-402", title: "Sunbelt — 4.2x marketplace uplift",type: "case_study",  status: "in_review"},
  { id: "CP-403", title: "Atlas — quote: \"trusted backbone\"",type: "quote",     status: "approved" },
  { id: "CP-404", title: "MidStates — POD reliability proof",type: "outcome",    status: "approved" },
  { id: "CP-405", title: "Coastal — driver adoption 91%",    type: "outcome",    status: "in_review"},
];

// Marketplace proof commercialization
export const V105_MP_PROOF = [
  { id: "MP-501", proof: "Time-to-award median 38m",   region: "Global",     status: "approved" },
  { id: "MP-502", proof: "Carrier quality score 94",   region: "Global",     status: "approved" },
  { id: "MP-503", proof: "Southeast liquidity 71%",    region: "Southeast",  status: "not_ready" },
  { id: "MP-504", proof: "Lane coverage Top-200 lanes",region: "US",         status: "approved" },
  { id: "MP-505", proof: "Dispute rate 0.8%",          region: "Global",     status: "approved" },
];

// Partner channel scale
export const V105_PARTNER_SCALE = { sourced_pipeline_pct: 22, active_partners: 14, joint_customers: 9 };
export const V105_PARTNER_ROWS = [
  { partner: "TMS-X",         motion: "Resell",  pipeline: 6, status: "active",       risk: "low" },
  { partner: "FreightOS Hub", motion: "Refer",   pipeline: 4, status: "active",       risk: "low" },
  { partner: "EDI Bridge",    motion: "Tech",    pipeline: 2, status: "enablement",   risk: "med" },
  { partner: "TelematicsCo",  motion: "Tech",    pipeline: 3, status: "active",       risk: "low" },
];

// Product line commercialization
export const V105_PRODUCT_LINES = [
  { line: "Dispatch Command Center", commercial: 92, demo: 95, proof: 90, pricing: 90, risk: "low"  },
  { line: "EliteNav",                commercial: 88, demo: 90, proof: 84, pricing: 88, risk: "low"  },
  { line: "Driver Mobile",           commercial: 86, demo: 88, proof: 82, pricing: 88, risk: "low"  },
  { line: "Customer Portal",         commercial: 84, demo: 86, proof: 78, pricing: 86, risk: "low"  },
  { line: "CoPilot AI",              commercial: 72, demo: 80, proof: 64, pricing: 70, risk: "med"  },
  { line: "Carrier Marketplace",     commercial: 82, demo: 86, proof: 74, pricing: 82, risk: "med"  },
  { line: "API Platform",            commercial: 78, demo: 80, proof: 74, pricing: 78, risk: "low"  },
  { line: "EDI Platform",            commercial: 70, demo: 74, proof: 68, pricing: 72, risk: "med"  },
  { line: "Telematics",              commercial: 64, demo: 70, proof: 60, pricing: 66, risk: "med"  },
  { line: "Partner Marketplace",     commercial: 60, demo: 66, proof: 56, pricing: 60, risk: "med"  },
  { line: "Reports / Analytics",     commercial: 80, demo: 84, proof: 76, pricing: 80, risk: "low"  },
  { line: "Enterprise Governance",   commercial: 78, demo: 80, proof: 76, pricing: 78, risk: "low"  },
];

// Sales engineering
export const V105_SE_READY = [
  { item: "Demo environment",          status: "ready" },
  { item: "Technical validation kit",  status: "ready" },
  { item: "Integration demo",          status: "ready" },
  { item: "API demo",                  status: "ready" },
  { item: "EDI demo",                  status: "needs_refresh" },
  { item: "Marketplace demo",          status: "ready" },
  { item: "Mobile demo",               status: "ready" },
  { item: "Security architecture deck",status: "ready" },
  { item: "Data flow diagrams",        status: "needs_refresh" },
  { item: "Technical FAQ",             status: "ready" },
  { item: "Solution architecture tpl", status: "ready" },
  { item: "POC plan template",         status: "ready" },
];

// Strategic capital readiness
export const V105_CAPITAL = { readiness: 68, data_room: 74, narrative: 72 };
export const V105_CAPITAL_AXES = [
  { axis: "Investor narrative",       score: 72, status: "in_progress" },
  { axis: "Acquirer narrative",       score: 64, status: "in_progress" },
  { axis: "Data room",                score: 74, status: "in_progress" },
  { axis: "Board reporting",          score: 80, status: "ready" },
  { axis: "Revenue quality",          score: 76, status: "ready" },
  { axis: "Customer concentration",   score: 62, status: "needs_attention" },
  { axis: "Marketplace proof",        score: 78, status: "ready" },
  { axis: "Trust evidence",           score: 82, status: "ready" },
  { axis: "Product maturity",         score: 80, status: "ready" },
  { axis: "Partner ecosystem",        score: 68, status: "in_progress" },
  { axis: "Strategic risk",           score: 70, status: "in_progress" },
  { axis: "Customer references",      score: 66, status: "in_progress" },
];

// Capital data room
export const V105_DATA_ROOM = [
  { section: "Company overview",       status: "ready" },
  { section: "Product overview",       status: "ready" },
  { section: "Market / category",      status: "ready" },
  { section: "Customer metrics",       status: "in_review" },
  { section: "Revenue metrics",        status: "in_review" },
  { section: "Marketplace metrics",    status: "ready" },
  { section: "Partner ecosystem",      status: "in_review" },
  { section: "Security / compliance",  status: "ready" },
  { section: "Financial controls",     status: "in_review" },
  { section: "Product roadmap",        status: "ready" },
  { section: "Board reports",          status: "ready" },
  { section: "Strategic risks",        status: "in_review" },
  { section: "Customer references",    status: "in_review" },
  { section: "Legal",                  status: "pending"   },
  { section: "Technical architecture", status: "ready" },
  { section: "Operating model",        status: "ready" },
];

// Board growth governance
export const V105_BOARD_GROWTH = [
  { initiative: "Enterprise pipeline scale",    owner: "CRO", risk: "med", milestone: "Q2 close",   status: "on_track" },
  { initiative: "Trust monetization rollout",   owner: "Sec", risk: "low", milestone: "Packet v3",  status: "on_track" },
  { initiative: "Marketplace proof publishing", owner: "MP",  risk: "med", milestone: "SE liquidity",status: "at_risk" },
  { initiative: "Capital readiness",            owner: "CFO", risk: "med", milestone: "Data room 90",status: "on_track" },
  { initiative: "Partner channel scale",        owner: "Ptr", risk: "low", milestone: "+5 partners", status: "on_track" },
  { initiative: "Category execution",           owner: "CMO", risk: "low", milestone: "Narrative v3",status: "on_track" },
];

// Expansion discipline (national/global)
export const V105_EXPANSION_DISCIPLINE = { score: 71 };
export const V105_COUNTRIES = [
  { country: "USA",     market: 95, partner: 90, mp: 88, billing: 92, support: 90, compliance: 88, score: 90, status: "live" },
  { country: "Canada",  market: 78, partner: 70, mp: 64, billing: 80, support: 76, compliance: 78, score: 74, status: "rollout" },
  { country: "Mexico",  market: 62, partner: 50, mp: 46, billing: 60, support: 56, compliance: 58, score: 55, status: "evaluation" },
  { country: "UK",      market: 58, partner: 44, mp: 38, billing: 60, support: 54, compliance: 60, score: 52, status: "evaluation" },
];

// Executive revenue cadence
export const V105_REV_CADENCE = [
  { meeting: "Weekly pipeline review",         cadence: "Weekly",    completion: 96 },
  { meeting: "Weekly expansion review",        cadence: "Weekly",    completion: 92 },
  { meeting: "Weekly procurement blockers",    cadence: "Weekly",    completion: 90 },
  { meeting: "Weekly trust asset review",      cadence: "Weekly",    completion: 88 },
  { meeting: "Monthly revenue review",         cadence: "Monthly",   completion: 100 },
  { meeting: "Monthly MP revenue review",      cadence: "Monthly",   completion: 92 },
  { meeting: "Monthly partner revenue review", cadence: "Monthly",   completion: 88 },
  { meeting: "Quarterly board revenue review", cadence: "Quarterly", completion: 100 },
  { meeting: "Quarterly capital readiness",    cadence: "Quarterly", completion: 100 },
];

// Strategic growth portfolio
export const V105_GROWTH_PORTFOLIO = [
  { category: "Enterprise sales growth",    invest: "High",   risk: "med", outcome_band: "+ARR" },
  { category: "Customer expansion",         invest: "High",   risk: "low", outcome_band: "+NRR" },
  { category: "Marketplace growth",         invest: "Med",    risk: "med", outcome_band: "+GMV" },
  { category: "Carrier network growth",     invest: "Med",    risk: "med", outcome_band: "+supply" },
  { category: "Partner channel growth",     invest: "Med",    risk: "low", outcome_band: "+sourced pipe" },
  { category: "API / EDI growth",           invest: "Med",    risk: "low", outcome_band: "+attach" },
  { category: "Trust-led sales growth",     invest: "High",   risk: "low", outcome_band: "+win rate" },
  { category: "Product-led expansion",      invest: "Low",    risk: "med", outcome_band: "+seats" },
  { category: "National expansion",         invest: "Med",    risk: "med", outcome_band: "+regions" },
  { category: "International expansion",    invest: "Low",    risk: "high",outcome_band: "+countries" },
  { category: "Category leadership growth", invest: "High",   risk: "low", outcome_band: "+share of voice" },
];

// Commercial risk
export const V105_COMM_RISK = [
  { risk: "Pipeline concentration",    severity: "med",  owner: "CRO", mitigation: "Diversify segments" },
  { risk: "Procurement bottlenecks",   severity: "med",  owner: "Sec", mitigation: "Packet refresh" },
  { risk: "Customer concentration",    severity: "high", owner: "CFO", mitigation: "Expansion + new logo mix" },
  { risk: "Expansion churn risk",      severity: "med",  owner: "CS",  mitigation: "Renewal+ plays" },
  { risk: "MP proof in SE",            severity: "med",  owner: "MP",  mitigation: "Carrier recruiting" },
  { risk: "Partner channel risk",      severity: "low",  owner: "Ptr", mitigation: "Enablement v2" },
  { risk: "Pricing discount drift",    severity: "med",  owner: "RevOps", mitigation: "Deal desk gates" },
  { risk: "Category narrative drift",  severity: "low",  owner: "CMO", mitigation: "Quarterly refresh" },
];

// Reports
export const V105_REPORTS = [
  "Enterprise commercialization scale", "Trust monetization", "Category leadership execution",
  "Enterprise sales OS", "Enterprise deal desk", "Pricing & packaging governance",
  "Revenue expansion maturity", "Procurement acceleration", "Customer proof commercialization",
  "Marketplace proof commercialization", "Partner channel scale", "Product-line commercialization",
  "Sales engineering readiness", "Strategic capital readiness", "Board growth governance",
  "National/global expansion discipline", "Executive revenue cadence", "Strategic growth portfolio",
  "Commercial risk management",
];

// Exec headline + overlays
export const V105_EXEC_HEADLINE: ExecHeadline = {
  status: "amber",
  headline: "V10.5 commercial scale at 84 with 5 trust-unblocked deals",
  detail: "Procurement and SE liquidity proof are the two remaining drags on Q2 close. Capital readiness at 68.",
  signals: [
    { label: "Trust packets unblocked (30d)", value: 5, tone: "good" },
    { label: "Atlas DPA age (days)",          value: 12, tone: "warn" },
    { label: "Southeast MP liquidity proof",  value: "not ready", tone: "bad" },
    { label: "Capital data room",             value: "74%", tone: "warn" },
  ],
  next_decision: { who: "CRO + CFO", what: "Approve Q2 enterprise close plan and data room 90% target", due: "Q2 close" },
};

export const V105_EXECUTION_OVERLAYS: OverlayItem[] = [
  { area: "Trust monetization", role: "Security", focus: "5 deals unblocked, packet uses 42 / 30d",   decision: "Refresh AI gov packet" },
  { area: "Commercial scale",   role: "CRO",      focus: "Score 84, +7 pts vs last quarter",          decision: "Approve Q2 close plan" },
  { area: "Atlas DPA",          role: "Legal",    focus: "Aging 12 days in Legal — escalate",         decision: "Redline by 06-09" },
  { area: "SE MP proof",        role: "MP Lead",  focus: "Southeast liquidity not ready",             decision: "Carrier recruiting sprint" },
  { area: "Pilot — Heartland",  role: "CS",       focus: "Scorecard review on track",                 decision: "Convert to expansion" },
  { area: "Capital readiness",  role: "CFO",      focus: "Data room 74%, narrative 72%",              decision: "Target 90% by Q2 end" },
];

export const V105_BACKEND_BOUNDARY = [
  { kind: "server fn", name: "calculate-v105-commercial-scale-score", caller: "Dashboards",      auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "calculate-enterprise-opportunity-score",caller: "Sales OS",        auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "calculate-trust-monetization-score",    caller: "Trust center",    auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "calculate-deal-risk-score",             caller: "Deal desk",       auth: "requireSupabaseAuth" },
  { kind: "server fn", name: "approve-customer-proof-asset",          caller: "Proof commerc.",  auth: "requireSupabaseAuth + role" },
  { kind: "server fn", name: "calculate-strategic-capital-readiness", caller: "CFO console",     auth: "requireSupabaseAuth + role" },
  { kind: "route",     name: "/api/public/webhooks/proof-approved",   caller: "External",        auth: "HMAC signature" },
];

export const V105_RLS_EXAMPLES = [
  "Company admins can view their company-level commercialization records",
  "Sales users can view assigned enterprise opportunities only",
  "Security users can view procurement/security review requests",
  "Customer success users can view customer proof + retention records",
  "Board/capital readiness records are restricted to executive/admin roles",
  "Pricing/package governance restricted to revenue-ops + executives",
  "Deal desk restricted to sales + revenue-ops + executive approvers",
  "Customer/carrier/partner users cannot read internal commercial data",
  "Proof points require approved status before external use",
];

export const V105_DEMO_FLOW = [
  { role: "CRO",      step: "Open Commercialization Command Center; review scale 84 + 5 active opps" },
  { role: "CRO",      step: "Inspect 2 procurement blockers + 1 pilot + 1 expansion proposal-ready" },
  { role: "Security", step: "Open Trust Monetization Center; 2 deals unblocked, AI gov packet needs refresh" },
  { role: "Sales",    step: "Open Enterprise Sales OS for Northwind in Security Review" },
  { role: "Sales",    step: "Review buying committee + close plan blockers (procurement + API security)" },
  { role: "CFO",      step: "Open Capital Readiness — 68 score, data room 74, concentration moderate" },
  { role: "MP",       step: "Open MP Proof Commercialization — time-to-award + quality approved; SE liquidity not ready" },
  { role: "Board",    step: "Open Board Growth Governance — pipeline, trust, MP proof, expansion, capital, risk" },
];
