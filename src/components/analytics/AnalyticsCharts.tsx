import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid,
} from "recharts";

const utilization = [
  { day: "Mon", active: 8, idle: 4 },
  { day: "Tue", active: 10, idle: 2 },
  { day: "Wed", active: 9, idle: 3 },
  { day: "Thu", active: 11, idle: 1 },
  { day: "Fri", active: 12, idle: 0 },
  { day: "Sat", active: 7, idle: 5 },
  { day: "Sun", active: 5, idle: 7 },
];

const delivered = [
  { day: "Mon", count: 14 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 16 },
  { day: "Thu", count: 22 },
  { day: "Fri", count: 27 },
  { day: "Sat", count: 12 },
  { day: "Sun", count: 9 },
];

const mpgByType = [
  { type: "CDL Freight", mpg: 6.8 },
  { type: "Reefer", mpg: 7.1 },
  { type: "Flatbed", mpg: 6.9 },
  { type: "Box Truck", mpg: 9.6 },
  { type: "Hotshot", mpg: 12.4 },
  { type: "Cargo Van", mpg: 18.5 },
  { type: "Personal", mpg: 31.5 },
];

const statusDist = [
  { name: "Transit", value: 4, color: "var(--status-transit)" },
  { name: "Loaded", value: 2, color: "var(--status-loaded)" },
  { name: "Pickup", value: 2, color: "var(--status-pickup)" },
  { name: "Waiting", value: 1, color: "var(--status-waiting)" },
  { name: "Break", value: 1, color: "var(--status-break)" },
  { name: "Delayed", value: 1, color: "var(--status-delayed)" },
  { name: "Off Duty", value: 1, color: "var(--status-offduty)" },
];

const cardClass =
  "rounded-xl border border-border bg-card p-4";

const tooltipStyle: React.CSSProperties = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
};

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Fleet Utilization</h3>
          <span className="text-xs text-muted-foreground">Last 7 days</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={utilization}>
            <defs>
              <linearGradient id="actGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="idleGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--orange)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--orange)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="active" stroke="var(--teal)" fill="url(#actGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="idle" stroke="var(--orange)" fill="url(#idleGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Loads Completed</h3>
          <span className="text-xs text-muted-foreground">Last 7 days</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={delivered}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--secondary)" }} />
            <Bar dataKey="count" fill="var(--teal)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Avg MPG by Vehicle Type</h3>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={mpgByType} layout="vertical">
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis dataKey="type" type="category" width={88} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--secondary)" }} />
            <Bar dataKey="mpg" fill="var(--orange)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Driver Status Distribution</h3>
        </div>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="55%" height={220}>
            <PieChart>
              <Pie data={statusDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} stroke="none">
                {statusDist.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <ul className="space-y-1.5 text-xs flex-1">
            {statusDist.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </span>
                <span className="text-muted-foreground">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
