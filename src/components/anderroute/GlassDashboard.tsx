import {
  LayoutDashboard, Package, ClipboardList, History, Inbox, FileBarChart,
  CreditCard, ChevronDown, Settings, LifeBuoy, LogOut, Plus, Search,
  Bell, Calendar, Filter, ArrowUpDown, MoreHorizontal, RefreshCw,
  Pencil, Download, MapPin, ZoomIn, ZoomOut, Trash2, ArrowDownToLine,
  TrendingDown, ChevronsUpDown,
} from "lucide-react";
import cargoBg from "@/assets/cargo-bg.webp";

export default function GlassDashboard() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${cargoBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-orange-900/30" />

      <div className="relative mx-auto max-w-[1500px] p-6">
        <div className={`relative grid grid-cols-[260px_1fr_320px] gap-5 overflow-hidden p-5 ${glass}`}>
          <Sidebar />
          <MainColumn />
          <RightColumn />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */
function Sidebar() {
  const nav = [
    { icon: LayoutDashboard, label: "Dashboard", chevron: true },
    { icon: Package, label: "Product", active: true, chevron: true, children: [
      { label: "Order" },
      { label: "Tracking", badge: "40", current: true },
      { label: "History" },
    ]},
    { icon: Inbox, label: "Inbox", chevron: true },
    { icon: FileBarChart, label: "Report", chevron: true },
    { icon: CreditCard, label: "Payments", badge: "80", chevron: true },
  ];
  return (
    <aside className={`relative flex flex-col gap-5 p-4 ${glass}`}>
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
          <div className="h-4 w-4 rotate-45 border-2 border-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">CargoTrax</span>
      </div>

      <button className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(249,115,22,0.7)] hover:brightness-110">
        <Plus className="h-4 w-4" /> New Logistics Task
      </button>

      <div>
        <p className="px-2 pb-2 text-[11px] uppercase tracking-widest text-white/50">Overview</p>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <div key={item.label}>
              <button
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  item.active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">{item.badge}</span>
                )}
                {item.chevron && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </button>
              {item.children && (
                <div className="ml-6 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                  {item.children.map((c) => (
                    <button
                      key={c.label}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs ${
                        c.current ? "text-orange-300" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {c.current && <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />}
                        {c.label}
                      </span>
                      {c.badge && (
                        <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] text-orange-300">
                          {c.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="flex items-center gap-2 px-3 py-2 text-xs text-white/50 hover:text-white/80">
            <ChevronDown className="h-3 w-3" /> Show more
          </button>
        </nav>
      </div>

      <div className="mt-auto">
        <p className="px-2 pb-2 text-[11px] uppercase tracking-widest text-white/50">Settings & Help</p>
        <div className="flex flex-col gap-1 text-sm text-white/70">
          <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5 hover:text-white"><Settings className="h-4 w-4" /> Settings</button>
          <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5 hover:text-white"><LifeBuoy className="h-4 w-4" /> Support</button>
          <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5 hover:text-white"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold">AD</div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Abram Dokidis</div>
            <div className="text-[11px] text-white/60">Admin1 Logistics</div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-white/50" />
        </div>
      </div>
    </aside>
  );
}

/* ---------------- Main column ---------------- */
function MainColumn() {
  return (
    <div className="flex flex-col gap-5">
      <TopBar />
      <FilterRow />
      <div className="grid grid-cols-2 gap-4">
        <RevenueCard />
        <IncomeCard />
      </div>
      <MapCard />
      <ChartCard />
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Control Logistics</h1>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
          <span>🏠</span> <span>›</span> <span>Product</span> <span>›</span>
          <span className="text-orange-300">Tracking</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">
          <Search className="h-4 w-4 text-white/60" />
          <input
            placeholder="Search Tracking"
            className="w-56 bg-transparent text-sm placeholder:text-white/50 focus:outline-none"
          />
        </div>
        <button className={pill}><Calendar className="h-3.5 w-3.5" /> 27 July 2025</button>
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1.5">
          <span className="rounded-full bg-orange-500 px-2 text-[10px] font-bold">IN</span>
          <span className="rounded-full bg-blue-500 px-2 text-[10px] font-bold">NL</span>
        </div>
        <button className="relative grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-orange-500 text-[9px] font-bold">5</span>
        </button>
      </div>
    </div>
  );
}

function FilterRow() {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold">All</button>
        <FilterChip label="Delivery Status:" value="In Transit" />
        <FilterChip label="Location:" value="Delivery region" icon={MapPin} />
        <FilterChip label="Order ID:" value="#23409NDR45" />
        <button className={pill}><Plus className="h-3 w-3" /></button>
      </div>
      <div className="flex items-center gap-2">
        <button className={pill}><Filter className="h-3.5 w-3.5" /> Filters</button>
        <button className={pill}><ArrowUpDown className="h-3.5 w-3.5" /> Sorts</button>
      </div>
    </div>
  );
}
function FilterChip({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) {
  return (
    <div className={pill}>
      {Icon && <Icon className="h-3 w-3" />}
      <span className="text-white/60">{label}</span>
      <span className="rounded-full bg-orange-500/30 px-2 py-0.5 text-[10px] text-orange-200">{value}</span>
      <button className="text-white/50 hover:text-white">×</button>
    </div>
  );
}

function RevenueCard() {
  return (
    <div className={`relative p-5 ${glass}`}>
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-white/80">Total Revenue</h3>
        <MoreHorizontal className="h-4 w-4 text-white/50" />
      </div>
      <div className="mt-4 flex flex-col items-center">
        <svg viewBox="0 0 200 110" className="w-48">
          <defs>
            <linearGradient id="rev" x1="0" x2="1">
              <stop offset="0" stopColor="#fb923c" />
              <stop offset="1" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path d="M20 100 A 80 80 0 0 1 180 100" stroke="rgba(255,255,255,0.1)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M20 100 A 80 80 0 0 1 160 50" stroke="url(#rev)" strokeWidth="14" fill="none" strokeLinecap="round" />
        </svg>
        <div className="-mt-6 text-center">
          <div className="text-3xl font-bold">344.560</div>
          <div className="text-xs text-white/60">Total Orders</div>
        </div>
        <p className="mt-3 text-center text-xs text-white/60">
          A platform linking shippers and carriers for efficient transport.
        </p>
      </div>
    </div>
  );
}

function IncomeCard() {
  return (
    <div className={`relative p-5 ${glass}`}>
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-white/80">Income Cargo</h3>
        <MoreHorizontal className="h-4 w-4 text-white/50" />
      </div>
      <div className="mt-4 text-5xl font-bold">50<span className="text-orange-400">%</span></div>
      <div className="mt-2 flex items-center gap-1 text-xs text-white/70">
        <TrendingDown className="h-3 w-3 text-red-400" />
        <span className="text-red-400">12%</span> down per month
      </div>
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-[11px] text-white/60">
          <span>$ 0</span><span>$ 9.930</span><span>$ 45.930</span>
        </div>
        <div className="relative h-2 rounded-full bg-white/10">
          <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-500 bg-white shadow-md" />
        </div>
      </div>
    </div>
  );
}

function MapCard() {
  return (
    <div className={`relative overflow-hidden p-4 ${glass}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-2">
          <button className="rounded-full bg-white/15 px-3 py-1 text-xs">Map Delivery</button>
          <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
            Tracking <span className="ml-1 rounded-full bg-orange-500 px-1.5 text-[10px]">2</span>
          </button>
        </div>
        <div className="flex gap-1">
          <button className="grid h-7 w-7 place-items-center rounded-full bg-white/10"><Search className="h-3 w-3" /></button>
          <button className="grid h-7 w-7 place-items-center rounded-full bg-white/10"><RefreshCw className="h-3 w-3" /></button>
        </div>
      </div>

      <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60">
        <svg viewBox="0 0 600 260" className="absolute inset-0 h-full w-full">
          {/* land grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" />
            </pattern>
            <linearGradient id="route" x1="0" x2="1">
              <stop offset="0" stopColor="#fbbf24" />
              <stop offset="1" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <rect width="600" height="260" fill="url(#grid)" />
          {/* coast */}
          <path d="M0 80 Q 150 60 300 90 T 600 100 L 600 0 L 0 0 Z" fill="rgba(59,130,246,0.15)" />
          {/* route */}
          <path d="M80 170 Q 200 120 320 160 T 540 130" stroke="url(#route)" strokeWidth="3" fill="none" strokeDasharray="6 3" />
          {/* pins */}
          {[[80,170],[220,140],[320,160],[440,150],[540,130]].map(([x,y],i)=>(
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="rgba(249,115,22,0.2)" />
              <circle cx={x} cy={y} r="6" fill="#fb923c" />
            </g>
          ))}
          {/* labels */}
          {[["Tangerang",180,100],["Jakarta",290,80],["Bogor",310,200],["Bandung",460,200],["Subang",420,120]].map(([t,x,y],i)=>(
            <text key={i} x={x as number} y={y as number} fill="rgba(255,255,255,0.7)" fontSize="10">○ {t}</text>
          ))}
        </svg>

        {/* PT.COA card */}
        <div className="absolute left-3 top-12 w-32 rounded-xl border border-white/20 bg-black/40 p-2 backdrop-blur-xl">
          <div className="h-12 rounded-lg bg-gradient-to-br from-amber-700 to-amber-900" />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] font-semibold">PT. COA</span>
            <span className="rounded-full bg-orange-500 px-1.5 text-[9px]">In Transit</span>
          </div>
        </div>

        {/* Branch popup */}
        <div className="absolute left-1/2 top-24 -translate-x-1/2 rounded-xl border border-white/20 bg-black/60 px-3 py-2 backdrop-blur-xl">
          <div className="text-[11px] font-semibold">Branch Office CargoTrax</div>
          <div className="text-[10px] text-white/60">Al Mamourah street 9</div>
        </div>

        {/* zoom */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1">
          <button className="grid h-7 w-7 place-items-center rounded-full bg-white/15 backdrop-blur"><ZoomIn className="h-3.5 w-3.5" /></button>
          <button className="grid h-7 w-7 place-items-center rounded-full bg-white/15 backdrop-blur"><ZoomOut className="h-3.5 w-3.5" /></button>
        </div>

        {/* status details */}
        <div className="absolute bottom-3 left-3 w-64 rounded-xl border border-white/15 bg-black/50 p-3 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="font-semibold">Status Cargo Details</span>
            <span className="text-white/50">27 Completed Orders ×</span>
          </div>
          <div className="flex justify-between text-[10px] text-white/70">
            <span>Processing</span><span>In Transit</span><span>Delivered</span>
          </div>
          <div className="relative mt-1 h-1.5 rounded-full bg-white/10">
            <div className="h-1.5 w-2/3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard() {
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return (
    <div className={`relative p-5 ${glass}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold">Recent Transactions Graphs</h3>
          <p className="text-xs text-white/60">More than 67.999 new delivery</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold">$10,890</span>
            <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">↑ 4.0%</span>
          </div>
        </div>
        <div className="flex rounded-full border border-white/15 bg-white/5 p-1 text-xs">
          <button className="rounded-full bg-orange-500 px-3 py-1 font-semibold">Year</button>
          <button className="px-3 py-1 text-white/70">Month</button>
          <button className="px-3 py-1 text-white/70">Week</button>
        </div>
      </div>

      <div className="mt-4">
        <svg viewBox="0 0 600 180" className="w-full">
          <defs>
            <linearGradient id="g2025" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fb923c" stopOpacity="0.4" />
              <stop offset="1" stopColor="#fb923c" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="g2024" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ec4899" stopOpacity="0.3" />
              <stop offset="1" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40,70,100,130,160].map(y=>(
            <line key={y} x1="40" x2="580" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
          ))}
          {/* 2024 */}
          <path d="M40 130 C 100 120, 160 130, 220 125 S 340 135, 400 120 S 520 130, 580 125 L 580 180 L 40 180 Z" fill="url(#g2024)" />
          <path d="M40 130 C 100 120, 160 130, 220 125 S 340 135, 400 120 S 520 130, 580 125" stroke="#ec4899" fill="none" strokeWidth="2" />
          {/* 2025 */}
          <path d="M40 100 C 100 80, 160 110, 220 70 S 340 90, 400 50 S 520 80, 580 60 L 580 180 L 40 180 Z" fill="url(#g2025)" />
          <path d="M40 100 C 100 80, 160 110, 220 70 S 340 90, 400 50 S 520 80, 580 60" stroke="#fb923c" fill="none" strokeWidth="2.5" />
          {/* tooltip dot at Jul */}
          <line x1="320" y1="40" x2="320" y2="170" stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
          <circle cx="320" cy="78" r="6" fill="white" stroke="#fb923c" strokeWidth="2" />
          <g transform="translate(290,30)">
            <rect width="60" height="20" rx="6" fill="rgba(0,0,0,0.6)" />
            <text x="30" y="14" textAnchor="middle" fill="white" fontSize="10">$ 9.930</text>
          </g>
          {months.map((m,i)=>(
            <text key={m} x={40 + i*49} y="178" fill="rgba(255,255,255,0.6)" fontSize="9">{m}</text>
          ))}
          {["9.930","8.000","7.600","6.800","5.500","4.500"].map((v,i)=>(
            <text key={v} x="32" y={40+i*22} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="9">{v}</text>
          ))}
        </svg>
        <div className="mt-2 flex items-center justify-end gap-4 text-[11px] text-white/70">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-orange-400" /> Profit 2025</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-pink-500" /> Profit 2024</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Right column ---------------- */
function RightColumn() {
  return (
    <div className="flex flex-col gap-5">
      <LastDeliveryCard />
      <ListReportCard />
    </div>
  );
}

function LastDeliveryCard() {
  const items = [
    { name: "Fresh Fruits", id: "#23409NDR45", status: "Processing", tone: "bg-orange-500/30 text-orange-200", tag: "New" },
    { name: "Frozen Meat", id: "#8949HMN10", status: "In Transit", tone: "bg-blue-500/30 text-blue-200" },
    { name: "Dairy Product", id: "#8999OPG67", status: "Cancel", tone: "bg-red-500/30 text-red-200" },
    { name: "Coffee Beans", id: "#11119LLD88", status: "Delivery", tone: "bg-emerald-500/30 text-emerald-200" },
    { name: "Vegetable Oil", id: "#00078HHU11", status: "Processing", tone: "bg-orange-500/30 text-orange-200", tag: "New" },
  ];
  return (
    <div className={`relative p-4 ${glass}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Last Delivery Status</h3>
        <MoreHorizontal className="h-4 w-4 text-white/50" />
      </div>
      <div className="mt-3 flex gap-2 text-[11px]">
        <button className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1"><RefreshCw className="h-3 w-3" /> Refresh</button>
        <button className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1"><Pencil className="h-3 w-3" /> Edit</button>
        <button className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1"><Download className="h-3 w-3" /> Export</button>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-amber-600 to-orange-700">
              {it.tag && <span className="absolute left-0 top-0 rounded-br bg-orange-500 px-1 text-[8px] font-bold">{it.tag}</span>}
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold">{it.name}</div>
              <div className="text-[10px] text-white/50">{it.id}</div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] ${it.tone}`}>{it.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListReportCard() {
  const rows = [
    { id: "#23409R45", co: "PT. COA", date: "07 July 2025" },
    { id: "#48509895", co: "PT. DOM", date: "06 July 2025" },
    { id: "#18509O47", co: "PT. BOX", date: "10 July 2025" },
    { id: "#88509O00", co: "PT. LGX", date: "12 July 2025", active: true },
    { id: "#22509O99", co: "PT. ZEX", date: "17 July 2025" },
    { id: "#55509O65", co: "PT. DRV", date: "27 July 2025" },
  ];
  return (
    <div className={`relative flex flex-1 flex-col p-4 ${glass}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">List Report Tracking</h3>
        <MoreHorizontal className="h-4 w-4 text-white/50" />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-xs text-white/60">789.00K tracking</span>
        <button className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px]">
          <Plus className="h-3 w-3" /> Add New
        </button>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_1fr_auto] gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] uppercase text-white/50">
        <span>☐ ID Company</span><span>📅 Date</span><span> </span>
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        {rows.map((r) => (
          <div key={r.id} className={`grid grid-cols-[1fr_1fr_auto] items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${r.active ? "bg-white/10" : ""}`}>
            <div>
              <div className="font-semibold">{r.id}</div>
              <div className="text-[10px] text-white/50">{r.co}</div>
            </div>
            <div>
              <div>{r.date}</div>
              <div className="text-[10px] text-white/50">10:00 AM</div>
            </div>
            <div className="flex gap-1 text-white/50">
              <Trash2 className="h-3.5 w-3.5" />
              <ArrowDownToLine className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px]">
        <button className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Previous</button>
        <span className="text-white/60">Page 1 of 5</span>
        <button className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Next</button>
      </div>
      <button className="mt-2 flex items-center justify-center gap-1 text-[11px] text-white/60">
        <ChevronDown className="h-3 w-3" /> Show more
      </button>
    </div>
  );
}
