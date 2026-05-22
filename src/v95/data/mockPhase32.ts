// Phase 32 — V9.5 global enterprise stewardship. Mock-only, no real audit/cert claims.

export const V95_FEATURE_MATRIX = [
  { area: "Global enterprise stewardship", status: "in_progress", note: "Dashboard + scores" },
  { area: "Enterprise trust command",      status: "in_progress", note: "15 trust domains" },
  { area: "Certification evidence",        status: "in_progress", note: "Maturity tracker (no claims)" },
  { area: "Financial governance",          status: "in_progress", note: "Maturity center" },
  { area: "Marketplace intelligence",      status: "in_progress", note: "Optimization center" },
  { area: "Marketplace quality gov",       status: "in_progress", note: "Mature governance" },
  { area: "Customer trust",                status: "in_progress", note: "Global dashboard" },
  { area: "Category leadership",           status: "planned",     note: "Execution tracker" },
  { area: "Board & investor discipline",   status: "in_progress", note: "Packet readiness" },
  { area: "Platform value creation",       status: "in_progress", note: "Value driver dashboard" },
  { area: "Enterprise control maturity",   status: "in_progress", note: "Global matrix" },
  { area: "Strategic risk execution",      status: "in_progress", note: "Long-term register" },
  { area: "AI governance maturity",        status: "in_progress", note: "Trust + explainability" },
  { area: "Support & reliability trust",   status: "in_progress", note: "Trust scoring" },
  { area: "Data governance maturity",      status: "in_progress", note: "Ownership + retention" },
  { area: "Product durability",            status: "in_progress", note: "Per product-line" },
  { area: "Strategic partner value",       status: "in_progress", note: "Value scorecard" },
  { area: "Retention & expansion gov",     status: "in_progress", note: "Renewal + expansion" },
  { area: "Procurement trust",             status: "in_progress", note: "Packet command center" },
  { area: "Platform legacy & continuity",  status: "planned",     note: "Continuity readiness" },
] as const;

export const V95_DEFERRED = [
  "Fully autonomous dispatch",
  "Final SOC 2 / ISO certification claims",
  "Final financial audit claims",
  "Final IPO / acquisition readiness claims",
  "Full customs production workflows",
  "Full international tax automation",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "Final Android Auto / CarPlay claims",
] as const;

// ---------------- Stewardship ----------------
export const V95_ENTERPRISE_TRUST = { score: 88, label: "Mature", trend_pts: 3 };
export const V95_STEWARDSHIP_DOMAINS = [
  { domain: "Enterprise trust",         score: 88, owner: "CEO" },
  { domain: "Platform stewardship",     score: 84, owner: "COO" },
  { domain: "Financial governance",     score: 81, owner: "CFO" },
  { domain: "Certification evidence",   score: 79, owner: "CSO" },
  { domain: "Marketplace quality",      score: 84, owner: "MP lead" },
  { domain: "AI governance",            score: 83, owner: "AI lead" },
  { domain: "Security governance",      score: 86, owner: "CSO" },
  { domain: "Customer trust",           score: 86, owner: "CCO" },
  { domain: "Partner trust",            score: 78, owner: "Partner lead" },
  { domain: "Revenue quality",          score: 82, owner: "CFO" },
  { domain: "Reliability trust",        score: 87, owner: "SRE" },
  { domain: "Support maturity",         score: 81, owner: "Support" },
  { domain: "Product durability",       score: 80, owner: "CPO" },
  { domain: "Board governance",         score: 85, owner: "Board chair" },
  { domain: "Long-term value creation", score: 82, owner: "CEO" },
] as const;
export const V95_STEWARDSHIP_GAPS = [
  { domain: "Certification evidence", gap: "3 controls need refreshed evidence" },
  { domain: "Partner trust",          gap: "Partner SOC packet missing for 2 partners" },
  { domain: "Product durability",     gap: "EDI tech-debt placeholder unscored" },
] as const;
export const V95_STEWARDSHIP_ACTIONS = [
  { id: "sa1", owner: "CSO", area: "Evidence", action: "Refresh access review evidence" },
  { id: "sa2", owner: "CFO", area: "Financial", action: "Close MP fee control exception" },
  { id: "sa3", owner: "CCO", area: "Customer trust", action: "Generate 2 procurement packets" },
  { id: "sa4", owner: "MP",  area: "MP quality", action: "Expand preferred carrier program in SE" },
  { id: "sa5", owner: "AI",  area: "AI gov", action: "Increase explainability coverage to 90%" },
] as const;

// ---------------- Enterprise Trust Command ----------------
export const V95_TRUST_DOMAINS = [
  { domain: "Security",                score: 88, owner: "CSO",  evidence: "fresh" },
  { domain: "Compliance",              score: 80, owner: "CSO",  evidence: "stale" },
  { domain: "Privacy",                 score: 84, owner: "DPO",  evidence: "fresh" },
  { domain: "Financial controls",      score: 81, owner: "CFO",  evidence: "fresh" },
  { domain: "Marketplace quality",     score: 84, owner: "MP",   evidence: "fresh" },
  { domain: "Carrier governance",      score: 78, owner: "MP",   evidence: "needs_test" },
  { domain: "Customer data protection",score: 87, owner: "DPO",  evidence: "fresh" },
  { domain: "Driver privacy",          score: 86, owner: "Mobile",evidence: "fresh" },
  { domain: "AI governance",           score: 83, owner: "AI",   evidence: "fresh" },
  { domain: "API/EDI security",        score: 82, owner: "Eng",  evidence: "fresh" },
  { domain: "Mobile security",         score: 85, owner: "Mobile",evidence: "fresh" },
  { domain: "Support access",          score: 79, owner: "Support",evidence: "needs_test" },
  { domain: "Incident response",       score: 84, owner: "SRE",  evidence: "fresh" },
  { domain: "Data retention",          score: 80, owner: "DPO",  evidence: "fresh" },
  { domain: "Audit evidence",          score: 79, owner: "CSO",  evidence: "needs_refresh" },
] as const;
export const V95_TRUST_RISKS = [
  { id: "tr1", risk: "Stale compliance evidence in 2 controls", owner: "CSO", level: "medium" },
  { id: "tr2", risk: "Carrier governance test overdue",         owner: "MP",  level: "medium" },
  { id: "tr3", risk: "Support access review > 30d",             owner: "Support", level: "high" },
] as const;
export const V95_TRUST_REMEDIATION = [
  { id: "rm1", item: "Refresh access review", owner: "CSO", status: "in_progress", eta: "14d" },
  { id: "rm2", item: "Schedule carrier control test", owner: "MP", status: "planned", eta: "21d" },
  { id: "rm3", item: "Run support access review", owner: "Support", status: "in_progress", eta: "7d" },
] as const;

// ---------------- Certification Evidence Maturity ----------------
export const V95_CERT_EVIDENCE_SCORE = { score: 79, freshness: 90, owners_assigned: 14, exceptions: 3 };
export const V95_CERT_EVIDENCE = [
  { control: "SOC 2 placeholder",        owner: "CSO",  status: "in_progress", freshness: 92 },
  { control: "ISO readiness placeholder",owner: "CSO",  status: "planned",     freshness: 0  },
  { control: "Pen test placeholder",     owner: "CSO",  status: "in_progress", freshness: 70 },
  { control: "Access review",            owner: "CSO",  status: "needs_refresh",freshness: 60 },
  { control: "Incident response",        owner: "SRE",  status: "fresh",       freshness: 95 },
  { control: "Backup / DR",              owner: "SRE",  status: "fresh",       freshness: 88 },
  { control: "Change management",        owner: "Eng",  status: "fresh",       freshness: 91 },
  { control: "Vulnerability mgmt",       owner: "CSO",  status: "fresh",       freshness: 86 },
  { control: "API security",             owner: "Eng",  status: "fresh",       freshness: 84 },
  { control: "EDI security",             owner: "Eng",  status: "fresh",       freshness: 82 },
  { control: "Mobile security",          owner: "Mobile",status:"fresh",       freshness: 89 },
  { control: "AI governance",            owner: "AI",   status: "fresh",       freshness: 84 },
  { control: "Financial controls",       owner: "CFO",  status: "fresh",       freshness: 82 },
] as const;
export const V95_CERT_EXCEPTIONS = [
  { id: "ce1", control: "Access review", reason: "Last review > 90d", owner: "CSO" },
  { id: "ce2", control: "Pen test placeholder", reason: "Scope outdated", owner: "CSO" },
  { id: "ce3", control: "ISO readiness", reason: "Not started", owner: "CSO" },
] as const;
export const V95_AUDIT_PACKAGE_READINESS = { score: 76, sections_ready: 9, sections_total: 12 };

// ---------------- Financial Governance Maturity ----------------
export const V95_FIN_GOV_SCORE = { score: 81, exceptions: 1, evidence_completeness: 82 };
export const V95_FIN_GOV_DOMAINS = [
  { area: "Billing control",            maturity: 86, exceptions: 0 },
  { area: "Usage billing",              maturity: 82, exceptions: 0 },
  { area: "Marketplace fee",            maturity: 74, exceptions: 1 },
  { area: "API overage",                maturity: 80, exceptions: 0 },
  { area: "Partner revenue share",      maturity: 78, exceptions: 0 },
  { area: "Manual adjustment approval", maturity: 85, exceptions: 0 },
  { area: "Invoice audit trail",        maturity: 84, exceptions: 0 },
  { area: "Revenue reconciliation",     maturity: 73, exceptions: 0 },
  { area: "Failed payment handling",    maturity: 81, exceptions: 0 },
  { area: "Billing dispute control",    maturity: 79, exceptions: 0 },
  { area: "Financial evidence",         maturity: 82, exceptions: 0 },
  { area: "Revenue quality",            maturity: 83, exceptions: 0 },
  { area: "Country billing readiness",  maturity: 70, exceptions: 0 },
] as const;
export const V95_FIN_EXCEPTIONS = [
  { id: "fe1", area: "Marketplace fee", finding: "Tier mismatch on 3 settlements", owner: "CFO", status: "in_review" },
] as const;
export const V95_FIN_GOV_TREND = [
  { period: "2026-Q1", score: 74 },
  { period: "2026-Q2", score: 78 },
  { period: "2026-Q3", score: 81 },
] as const;

// ---------------- Marketplace Intelligence Optimization ----------------
export const V95_MP_OPT_SCORE = { score: 84, trend_pts: 4 };
export const V95_MP_OPT_METRICS = [
  { metric: "Liquidity",                value: 86 },
  { metric: "Load coverage rate",       value: 92 },
  { metric: "Avg bids per load",        value: 3.4 },
  { metric: "Time to first bid (min)",  value: 12 },
  { metric: "Time to award (min)",      value: 48 },
  { metric: "Carrier acceptance %",     value: 81 },
  { metric: "Carrier quality score",    value: 84 },
  { metric: "Carrier compliance score", value: 88 },
  { metric: "Carrier concentration risk", value: 22 },
  { metric: "Customer concentration risk", value: 28 },
  { metric: "Equipment coverage %",     value: 87 },
  { metric: "Lane coverage %",          value: 79 },
  { metric: "Dispute rate %",           value: 1.8 },
  { metric: "MP revenue quality",       value: 83 },
  { metric: "MP trust score",           value: 85 },
] as const;
export const V95_MP_REGIONAL = [
  { region: "Texas",     liquidity: 92, risk: "low" },
  { region: "Midwest",   liquidity: 88, risk: "low" },
  { region: "Southeast", liquidity: 68, risk: "carrier_concentration" },
  { region: "West",      liquidity: 80, risk: "lane_gap" },
  { region: "Northeast", liquidity: 79, risk: "low" },
] as const;
export const V95_MP_OPT_PLAN = [
  { id: "mp1", action: "Preferred carrier recruitment in SE", owner: "MP", eta: "30d" },
  { id: "mp2", action: "Improve lane coverage in West (I-5)", owner: "MP", eta: "45d" },
  { id: "mp3", action: "Reduce avg time to award to 35 min",  owner: "MP", eta: "60d" },
] as const;

// ---------------- Marketplace Quality Governance ----------------
export const V95_MP_QUALITY = [
  { area: "Carrier verification",     status: "fresh",   owner: "MP" },
  { area: "Carrier compliance",       status: "fresh",   owner: "MP" },
  { area: "Preferred carrier program",status: "in_progress", owner: "MP" },
  { area: "Watchlist management",     status: "fresh",   owner: "MP" },
  { area: "Suspension/reinstatement", status: "fresh",   owner: "MP" },
  { area: "Carrier dispute review",   status: "fresh",   owner: "MP" },
  { area: "Marketplace fee review",   status: "in_review", owner: "CFO" },
  { area: "Settlement placeholder",   status: "in_progress", owner: "CFO" },
  { area: "Load award controls",      status: "fresh",   owner: "MP" },
  { area: "Customer complaint tracking", status: "fresh", owner: "Support" },
  { area: "Trust & safety policies",  status: "fresh",   owner: "MP" },
  { area: "Marketplace incident review", status: "in_progress", owner: "MP" },
] as const;
export const V95_MP_CARRIER_TIERS = [
  { tier: "Preferred", carriers: 142, share: 56 },
  { tier: "Standard",  carriers: 318, share: 38 },
  { tier: "Watchlist", carriers: 12,  share: 4 },
  { tier: "Suspended", carriers: 3,   share: 2 },
] as const;

// ---------------- Customer Trust ----------------
export const V95_CUST_TRUST_SCORE = { score: 86, trend_pts: 2 };
export const V95_CUST_TRUST = [
  { customer: "AcmeCo Logistics", trust: 92, packet: "fresh",   sla: "healthy", renewal: "low_risk",  reference: "ready" },
  { customer: "Northwind Foods",  trust: 88, packet: "fresh",   sla: "healthy", renewal: "low_risk",  reference: "ready" },
  { customer: "GlobalParts EU",   trust: 76, packet: "stale",   sla: "healthy", renewal: "medium",    reference: "not_ready" },
  { customer: "Cascade Mfg",      trust: 81, packet: "stale",   sla: "watch",   renewal: "medium",    reference: "ready" },
  { customer: "MediCare CA",      trust: 84, packet: "fresh",   sla: "healthy", renewal: "low_risk",  reference: "ready", ai_disclosure: "pending" },
] as const;
export const V95_CUST_TRUST_REQUESTS = [
  { id: "cr1", customer: "GlobalParts EU", item: "Updated procurement packet", owner: "CCO", status: "in_progress" },
  { id: "cr2", customer: "Cascade Mfg",    item: "Refresh SOC packet",         owner: "CCO", status: "planned" },
  { id: "cr3", customer: "MediCare CA",    item: "AI usage disclosure",         owner: "AI",  status: "in_review" },
] as const;

// ---------------- Category Leadership ----------------
export const V95_CATEGORY_SCORE = { score: 76, narrative: 82, proof: 74, competitive: 78 };
export const V95_CATEGORY_ITEMS = [
  { area: "Category narrative",           maturity: 82, owner: "CMO" },
  { area: "Competitive positioning",      maturity: 78, owner: "PMM" },
  { area: "Customer proof",               maturity: 80, owner: "CS" },
  { area: "Partner proof",                maturity: 68, owner: "Partner" },
  { area: "Marketplace proof",            maturity: 84, owner: "MP" },
  { area: "AI operations proof",          maturity: 72, owner: "AI" },
  { area: "Enterprise governance proof",  maturity: 79, owner: "CSO" },
  { area: "Analyst briefing placeholder", maturity: 60, owner: "PMM" },
  { area: "Sales enablement readiness",   maturity: 75, owner: "Sales" },
  { area: "Market education readiness",   maturity: 70, owner: "CMO" },
  { area: "Thought leadership pipeline",  maturity: 73, owner: "CMO" },
] as const;
export const V95_CATEGORY_RECOMMENDATIONS = [
  { id: "cl1", action: "Publish updated enterprise trust narrative", owner: "CMO" },
  { id: "cl2", action: "Publish marketplace proof points refresh",   owner: "MP" },
  { id: "cl3", action: "Run analyst briefing pilot",                 owner: "PMM" },
] as const;

// ---------------- Board & Investor Discipline ----------------
export const V95_BOARD_DISCIPLINE = { cadence: "quarterly", next_meeting: "2026-09-15", packet_readiness: 88 };
export const V95_BOARD_PACKET = [
  { section: "Enterprise trust",         status: "ready" },
  { section: "Financial governance",     status: "ready" },
  { section: "Marketplace quality",      status: "ready" },
  { section: "Certification evidence",   status: "in_progress" },
  { section: "Strategic risks",          status: "ready" },
  { section: "Product durability",       status: "ready" },
  { section: "Platform value creation",  status: "ready" },
  { section: "Customer success summary", status: "ready" },
  { section: "Partner ecosystem",        status: "in_progress" },
  { section: "KPI appendix",             status: "ready" },
  { section: "Risk register",            status: "ready" },
  { section: "Strategic decisions",      status: "drafting" },
] as const;
export const V95_BOARD_DECISIONS = [
  { id: "bd1", decision: "Approve SE preferred-carrier expansion", status: "pending" },
  { id: "bd2", decision: "Sign off ISO readiness scope",           status: "pending" },
  { id: "bd3", decision: "Confirm 2027 financial governance plan", status: "pending" },
] as const;
export const V95_BOARD_ACTIONS = [
  { id: "ba1", owner: "CFO", action: "Close MP fee exception", status: "in_progress" },
  { id: "ba2", owner: "CSO", action: "Refresh access review",  status: "in_progress" },
  { id: "ba3", owner: "AI",  action: "Lift explainability to 90%", status: "planned" },
] as const;
export const V95_INVESTOR_UPDATE = { readiness: 82, last_sent: "2026-08-10", next_due: "2026-09-30" };

// ---------------- Platform Value Creation ----------------
export const V95_VALUE_SCORE = { score: 82, trend_pts: 5 };
export const V95_VALUE_DRIVERS = [
  { driver: "Revenue quality",       score: 83 },
  { driver: "Customer retention",    score: 88 },
  { driver: "Expansion pipeline",    score: 76 },
  { driver: "Marketplace liquidity", score: 86 },
  { driver: "API monetization",      score: 72 },
  { driver: "Partner ecosystem",     score: 74 },
  { driver: "Product defensibility", score: 80 },
  { driver: "Certification evidence",score: 79 },
  { driver: "Financial governance",  score: 81 },
  { driver: "Customer trust",        score: 86 },
  { driver: "Category leadership",   score: 76 },
  { driver: "Platform reliability",  score: 87 },
  { driver: "Data network effects",  score: 70 },
  { driver: "Switching costs",       score: 78 },
] as const;
export const V95_VALUE_ACTIONS = [
  { id: "v1", area: "Expansion", action: "Drive expansion pipeline + 20%", owner: "CCO" },
  { id: "v2", area: "API",       action: "Increase API monetization w/ tiering", owner: "PM" },
  { id: "v3", area: "Data",      action: "Strengthen data network effects via partner data", owner: "Data" },
] as const;

// ---------------- Enterprise Control Maturity ----------------
export const V95_CONTROL_MATURITY = { score: 83, exceptions: 4, owners_assigned: 12 };
export const V95_CONTROL_DOMAINS = [
  { domain: "Access controls",         score: 88 },
  { domain: "Financial controls",      score: 81 },
  { domain: "Marketplace controls",    score: 82 },
  { domain: "Compliance controls",     score: 80 },
  { domain: "Data controls",           score: 84 },
  { domain: "AI governance controls",  score: 83 },
  { domain: "API/EDI controls",        score: 82 },
  { domain: "Mobile controls",         score: 85 },
  { domain: "Support access controls", score: 79 },
  { domain: "Partner controls",        score: 76 },
  { domain: "Country launch controls", score: 70 },
  { domain: "Customer portal controls",score: 84 },
] as const;
export const V95_CONTROL_TESTING_CAL = [
  { id: "ct1", domain: "Access controls",   next_test: "2026-09-30", owner: "CSO" },
  { id: "ct2", domain: "Financial controls",next_test: "2026-10-10", owner: "CFO" },
  { id: "ct3", domain: "MP controls",       next_test: "2026-10-20", owner: "MP"  },
  { id: "ct4", domain: "Country launch",    next_test: "2026-11-05", owner: "COO" },
] as const;

// ---------------- Strategic Risk Execution ----------------
export const V95_STRATEGIC_RISKS = [
  { id: "r1", risk: "Customer concentration",     owner: "CCO", level: "medium", residual: 42, board_visible: true },
  { id: "r2", risk: "Carrier concentration in SE", owner: "MP", level: "medium", residual: 38, board_visible: true },
  { id: "r3", risk: "Certification evidence stale", owner: "CSO", level: "high",   residual: 55, board_visible: true },
  { id: "r4", risk: "AI explainability gap",       owner: "AI",  level: "medium", residual: 35, board_visible: false },
  { id: "r5", risk: "Partner dependency (Telematics-X)", owner: "Partner", level: "medium", residual: 40, board_visible: true },
  { id: "r6", risk: "Product technical debt EDI",  owner: "CPO", level: "medium", residual: 36, board_visible: false },
  { id: "r7", risk: "Global expansion (EU data residency)", owner: "Legal", level: "high", residual: 48, board_visible: true },
  { id: "r8", risk: "Support scalability beyond 3 regions", owner: "Support", level: "medium", residual: 34, board_visible: false },
  { id: "r9", risk: "Marketplace liquidity volatility", owner: "MP", level: "medium", residual: 30, board_visible: false },
  { id: "r10", risk: "Competitive pressure (mid-market entrants)", owner: "CEO", level: "medium", residual: 32, board_visible: true },
] as const;
export const V95_RISK_TREND = [
  { period: "2026-Q1", residual: 50 },
  { period: "2026-Q2", residual: 45 },
  { period: "2026-Q3", residual: 39 },
] as const;

// ---------------- AI Governance Maturity ----------------
export const V95_AI_GOV = { score: 83, explainability: 86, freshness: 88, approval_rules: 17 };
export const V95_AI_GOV_POLICIES = [
  { area: "Recommendation acceptance",   value: "78%" },
  { area: "Recommendation rejection",    value: "9%" },
  { area: "Approval rules",              value: "17 active" },
  { area: "Confidence threshold",        value: "0.78" },
  { area: "Explainability coverage",     value: "86%" },
  { area: "Data freshness",              value: "88%" },
  { area: "Audit evidence",              value: "fresh" },
  { area: "AI cost governance",          value: "within budget" },
  { area: "Customer comm review",        value: "human approval required" },
  { area: "Dispatch recommendation",     value: "human approval required" },
  { area: "Financial action restriction",value: "no autonomous writes" },
  { area: "Safety incidents (placeholder)", value: "0 logged" },
  { area: "Provider governance",         value: "Lovable AI + fallbacks" },
] as const;

// ---------------- Support & Reliability Trust ----------------
export const V95_RELIABILITY = { score: 87, critical_30d: 1, sla_compliance: 96 };
export const V95_SUPPORT_TRUST = { score: 81, response_min: 22, resolution_hr: 5.4 };
export const V95_RELIABILITY_INCIDENTS = [
  { id: "i1", at: "2026-07-12", severity: "critical", area: "API gateway",  status: "resolved" },
  { id: "i2", at: "2026-08-02", severity: "major",    area: "Realtime",     status: "resolved" },
  { id: "i3", at: "2026-08-22", severity: "minor",    area: "Driver app",   status: "resolved" },
] as const;
export const V95_SUPPORT_BURDEN = [
  { segment: "Enterprise customers", tickets: 84,  trend: "down" },
  { segment: "Drivers",              tickets: 122, trend: "flat" },
  { segment: "Carriers",             tickets: 96,  trend: "up" },
  { segment: "API/EDI",              tickets: 41,  trend: "down" },
  { segment: "Partners",             tickets: 18,  trend: "flat" },
] as const;

// ---------------- Data Governance Maturity ----------------
export const V95_DATA_GOV = { score: 80, owners_assigned: 11, exceptions: 2 };
export const V95_DATA_OWNERSHIP = [
  { dataset: "Loads",         owner: "Eng",     classification: "internal", retention: "7y" },
  { dataset: "Driver GPS",    owner: "Mobile",  classification: "restricted",retention: "90d on-track / 18mo aggregate" },
  { dataset: "Customer PII",  owner: "DPO",     classification: "restricted",retention: "per contract" },
  { dataset: "Carrier docs",  owner: "MP",      classification: "confidential", retention: "5y" },
  { dataset: "API logs",      owner: "Eng",     classification: "internal", retention: "90d" },
  { dataset: "EDI envelopes", owner: "Eng",     classification: "confidential", retention: "7y" },
  { dataset: "AI prompts/responses", owner: "AI", classification: "restricted", retention: "30d" },
  { dataset: "Support transcripts",  owner: "Support", classification: "restricted", retention: "13mo" },
  { dataset: "Billing records",      owner: "CFO",     classification: "confidential", retention: "7y" },
  { dataset: "Audit logs",           owner: "CSO",     classification: "restricted", retention: "7y" },
  { dataset: "Webhook events",       owner: "Eng",     classification: "internal", retention: "30d" },
] as const;
export const V95_DATA_EXCEPTIONS = [
  { id: "de1", item: "Driver GPS aggregate retention test pending", owner: "Mobile" },
  { id: "de2", item: "EDI envelope retention proof outdated",       owner: "Eng" },
] as const;

// ---------------- Product Durability ----------------
export const V95_PRODUCT_DURABILITY = { score: 80 };
export const V95_PRODUCT_LINES = [
  { line: "Dispatch",     maturity: 88, adoption: 92, revenue: 38, debt: "low" },
  { line: "EliteNav",     maturity: 82, adoption: 76, revenue: 14, debt: "medium" },
  { line: "CoPilot",      maturity: 78, adoption: 64, revenue: 9,  debt: "low" },
  { line: "Marketplace",  maturity: 84, adoption: 70, revenue: 24, debt: "medium" },
  { line: "EDI",          maturity: 80, adoption: 68, revenue: 8,  debt: "high" },
  { line: "Customer Portal", maturity: 81, adoption: 72, revenue: 4, debt: "low" },
  { line: "API",          maturity: 76, adoption: 60, revenue: 3,  debt: "low" },
] as const;

// ---------------- Strategic Partner Value ----------------
export const V95_PARTNER_VALUE = { score: 78 };
export const V95_PARTNERS = [
  { partner: "Telematics-X",    revenue: 12, customers: 18, health: 84, risk: "medium" },
  { partner: "EDI Hub Co",      revenue: 6,  customers: 22, health: 86, risk: "low" },
  { partner: "FuelCard Pro",    revenue: 4,  customers: 14, health: 80, risk: "low" },
  { partner: "InsureLogix",     revenue: 3,  customers: 9,  health: 72, risk: "medium" },
  { partner: "MapTruck",        revenue: 2,  customers: 12, health: 78, risk: "low" },
] as const;

// ---------------- Retention & Expansion ----------------
export const V95_RETENTION = { score: 84, churn_pct: 3.2, expansion_pct: 12.4 };
export const V95_RETENTION_ACCOUNTS = [
  { customer: "AcmeCo Logistics", health: 92, renewal: "low_risk", expansion: "pilot_v95_intel", sponsor: "engaged" },
  { customer: "Northwind Foods",  health: 88, renewal: "low_risk", expansion: "EDI add-on",       sponsor: "engaged" },
  { customer: "GlobalParts EU",   health: 70, renewal: "medium",   expansion: "—",                sponsor: "needs_qbr" },
  { customer: "Cascade Mfg",      health: 74, renewal: "medium",   expansion: "API monetization", sponsor: "needs_qbr" },
  { customer: "MediCare CA",      health: 84, renewal: "low_risk", expansion: "CoPilot expansion",sponsor: "engaged" },
] as const;

// ---------------- Procurement Trust ----------------
export const V95_PROCUREMENT = { readiness: 82, open_requests: 4 };
export const V95_PROCUREMENT_PACKETS = [
  { item: "Security questionnaire",   status: "fresh" },
  { item: "Procurement packet",       status: "fresh" },
  { item: "Vendor packet",            status: "fresh" },
  { item: "Legal docs placeholder",   status: "in_progress" },
  { item: "Insurance placeholder",    status: "in_progress" },
  { item: "DPA placeholder",          status: "fresh" },
  { item: "Support SLA",              status: "fresh" },
  { item: "Incident response packet", status: "fresh" },
  { item: "Compliance evidence",      status: "in_progress" },
  { item: "AI usage disclosure",      status: "fresh" },
  { item: "API/EDI security packet",  status: "fresh" },
  { item: "Mobile permission packet", status: "fresh" },
] as const;
export const V95_PROCUREMENT_REQUESTS = [
  { id: "pr1", customer: "GlobalParts EU", item: "EU DPA", owner: "Legal", status: "in_progress" },
  { id: "pr2", customer: "Cascade Mfg",    item: "Pen test summary", owner: "CSO", status: "planned" },
  { id: "pr3", customer: "MediCare CA",    item: "AI disclosure",    owner: "AI",  status: "in_review" },
  { id: "pr4", customer: "AcmeCo Logistics", item: "Updated SOC packet", owner: "CSO", status: "in_progress" },
] as const;

// ---------------- Platform Legacy & Continuity ----------------
export const V95_CONTINUITY = { score: 77 };
export const V95_CONTINUITY_ITEMS = [
  { area: "Business continuity placeholder", maturity: 72, owner: "COO" },
  { area: "Disaster recovery readiness",     maturity: 84, owner: "SRE" },
  { area: "Backup/restore evidence",         maturity: 86, owner: "SRE" },
  { area: "Incident response maturity",      maturity: 84, owner: "SRE" },
  { area: "Key vendor dependency risk",      maturity: 70, owner: "COO" },
  { area: "Partner dependency risk",         maturity: 74, owner: "Partner" },
  { area: "Key customer dependency risk",    maturity: 72, owner: "CCO" },
  { area: "Platform documentation",          maturity: 78, owner: "Eng" },
  { area: "Architecture documentation",      maturity: 76, owner: "Eng" },
  { area: "Operational playbooks",           maturity: 80, owner: "Ops" },
  { area: "Succession/ownership placeholder",maturity: 60, owner: "CEO" },
  { area: "Data export readiness placeholder", maturity: 70, owner: "Eng" },
] as const;

// ---------------- Reports ----------------
export const V95_REPORTS = [
  "Global enterprise stewardship",
  "Enterprise trust",
  "Certification evidence maturity",
  "Financial governance maturity",
  "Marketplace intelligence optimization",
  "Marketplace quality governance",
  "Customer trust",
  "Category leadership execution",
  "Board and investor discipline",
  "Platform value creation",
  "Enterprise control maturity",
  "Strategic risk execution",
  "AI governance maturity",
  "Support and reliability trust",
  "Data governance maturity",
  "Product durability",
  "Partner value",
  "Retention and expansion governance",
  "Procurement trust",
  "Continuity planning",
] as const;

// ---------------- Exec headline + overlays ----------------
export const V95_EXEC_HEADLINE = {
  phase: "Phase 32 · V9.5",
  title: "Global enterprise stewardship + category leadership execution",
  subtitle: "Trust 88 · Financial gov 81 · Cert evidence 79 · MP quality 84 · Customer trust 86 · Value 82",
};

export const V95_EXECUTION_OVERLAYS = [
  { area: "Stewardship",       role: "CEO",   focus: "Enterprise trust 88, value 82 trending up",          decision: "Sign stewardship action plan" },
  { area: "Trust command",     role: "CSO",   focus: "15 trust domains, 2 needs_test",                     decision: "Close 2 evidence gaps in 14d" },
  { area: "Certification",     role: "CSO",   focus: "Freshness 90 · audit package 76",                    decision: "Refresh access review evidence" },
  { area: "Financial gov",     role: "CFO",   focus: "Maturity 81 · 1 MP fee exception",                   decision: "Close MP fee exception this week" },
  { area: "MP intelligence",   role: "MP",    focus: "Liquidity strong TX/MW · SE concentration",          decision: "Launch preferred-carrier in SE" },
  { area: "MP quality",        role: "MP",    focus: "Preferred program in_progress · 1 fee in_review",    decision: "Publish refreshed T&S policy" },
  { area: "Customer trust",    role: "CCO",   focus: "2 packets stale · 1 AI disclosure pending",          decision: "Generate trust packets this week" },
  { area: "Category leadership", role: "CMO", focus: "Narrative 82 · proof points 74",                     decision: "Publish enterprise trust narrative" },
  { area: "Board discipline",  role: "Board", focus: "Packet 88 ready · 3 decisions pending",              decision: "Approve SE expansion + ISO scope" },
  { area: "Value creation",    role: "CEO",   focus: "Value 82 · expansion 76 · API monetization 72",      decision: "Set 2027 expansion + API plan" },
  { area: "Control maturity",  role: "COO",   focus: "Score 83 · 4 exceptions · country launch 70",        decision: "Test country launch controls in Q4" },
  { area: "Strategic risk",    role: "Risk",  focus: "10 risks · 5 board-visible · residual down",         decision: "Lock mitigation plan for r3/r7" },
  { area: "AI governance",     role: "AI",    focus: "Score 83 · explainability 86 · 0 incidents",         decision: "Lift explainability to 90%" },
  { area: "Reliability",       role: "SRE",   focus: "Score 87 · 1 critical 30d · SLA 96",                 decision: "Publish postmortem digest" },
  { area: "Data governance",   role: "DPO",   focus: "Score 80 · 2 exceptions · 11 owners",                decision: "Close GPS + EDI retention exceptions" },
  { area: "Product durability",role: "CPO",   focus: "Score 80 · EDI tech-debt high",                      decision: "Plan EDI tech-debt sprint" },
  { area: "Partner value",     role: "Partner", focus: "Score 78 · Telematics-X medium risk",              decision: "Run partner QBR + risk plan" },
  { area: "Retention",         role: "CCO",   focus: "Churn 3.2 · expansion 12.4",                         decision: "Run 2 QBRs for medium-risk accts" },
  { area: "Procurement",       role: "CCO",   focus: "Readiness 82 · 4 open requests",                     decision: "Close legal/insurance placeholders" },
  { area: "Continuity",        role: "COO",   focus: "Score 77 · vendor dep risk · succession 60",         decision: "Draft continuity action plan" },
] as const;

export const V95_ROLE_GUIDANCE = [
  { role: "CEO",   tone: "violet",  focus: "Lead enterprise trust, value creation, and category leadership" },
  { role: "CFO",   tone: "emerald", focus: "Close MP fee exception; raise financial governance to 85" },
  { role: "CSO",   tone: "amber",   focus: "Refresh certification evidence and trust packets" },
  { role: "CCO",   tone: "sky",     focus: "Drive customer trust packets, renewals, expansion" },
  { role: "Board", tone: "rose",    focus: "Approve SE expansion, ISO scope, 2027 financial plan" },
] as const;

export const V95_RLS_EXAMPLES = [
  {
    table: "v95_enterprise_trust_scores",
    policy: "Tenant read",
    sql: "create policy v95_trust_read on public.v95_enterprise_trust_scores for select using (company_id = public.current_company());",
  },
  {
    table: "board_investor_discipline_records",
    policy: "Board / executive only",
    sql: "create policy v95_board_read on public.board_investor_discipline_records for select using (public.has_role(auth.uid(), company_id, 'board') or public.has_role(auth.uid(), company_id, 'executive'));",
  },
  {
    table: "certification_evidence_maturity_records",
    policy: "Security / compliance / admin only",
    sql: "create policy v95_cert_evidence_read on public.certification_evidence_maturity_records for select using (public.has_role(auth.uid(), company_id, 'security') or public.has_role(auth.uid(), company_id, 'compliance') or public.has_role(auth.uid(), company_id, 'admin'));",
  },
  {
    table: "procurement_trust_records",
    policy: "Customer success / security / admin",
    sql: "create policy v95_procurement_read on public.procurement_trust_records for select using (public.has_role(auth.uid(), company_id, 'customer_success') or public.has_role(auth.uid(), company_id, 'security') or public.has_role(auth.uid(), company_id, 'admin'));",
  },
  {
    table: "ai_governance_maturity_records_v95",
    policy: "Admin / security only",
    sql: "create policy v95_ai_gov_read on public.ai_governance_maturity_records_v95 for select using (public.has_role(auth.uid(), company_id, 'admin') or public.has_role(auth.uid(), company_id, 'security'));",
  },
] as const;

export const V95_BACKEND_BOUNDARY = [
  { kind: "createServerFn", name: "calculateV95EnterpriseTrust",       caller: "Stewardship dashboard",     auth: "executive role" },
  { kind: "createServerFn", name: "calculateCertificationEvidence",    caller: "Evidence center",           auth: "security role" },
  { kind: "createServerFn", name: "calculateFinancialGovernance",      caller: "Financial gov center",      auth: "billing role" },
  { kind: "createServerFn", name: "calculateMarketplaceOptimization",  caller: "MP intelligence center",    auth: "marketplace role" },
  { kind: "createServerFn", name: "generateCustomerTrustPacket",       caller: "Customer trust",            auth: "customer success" },
  { kind: "createServerFn", name: "generateBoardInvestorSummary",      caller: "Board discipline",          auth: "board / exec" },
  { kind: "createServerFn", name: "calculatePlatformValueCreation",    caller: "Value dashboard",           auth: "executive role" },
  { kind: "createServerFn", name: "calculateAIGovernanceMaturityV95",  caller: "AI gov center",             auth: "admin / security" },
  { kind: "server route",   name: "/api/public/webhooks/cert-evidence", caller: "External evidence provider", auth: "HMAC signature" },
  { kind: "server route",   name: "/api/public/webhooks/procurement",  caller: "Customer procurement",       auth: "HMAC signature" },
  { kind: "edge function",  name: "(none new in V9.5)",                caller: "—",                          auth: "—" },
] as const;
