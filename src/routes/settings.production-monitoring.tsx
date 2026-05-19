import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { AppShell } from "@/components/layout/AppShell";
import {
  fetchAppErrorEvents,
  fetchAICostEvents,
  fetchMobileDeviceSessions,
} from "@/monitoring/monitoring.functions";

export const Route = createFileRoute("/settings/production-monitoring")({
  head: () => ({
    meta: [
      { title: "Production Monitoring — Anderoute" },
      {
        name: "description",
        content:
          "Visualize app errors, AI cost & latency, and mobile device session health with filters and CSV export.",
      },
    ],
  }),
  component: ProductionMonitoring,
});

type RangeKey = "24h" | "7d" | "30d";
const RANGE_HOURS: Record<RangeKey, number> = { "24h": 24, "7d": 168, "30d": 720 };

function rangeBounds(range: RangeKey) {
  const end = new Date();
  const start = new Date(end.getTime() - RANGE_HOURS[range] * 3600_000);
  return { startDate: start.toISOString(), endDate: end.toISOString() };
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Array.from(
    rows.reduce((acc, r) => {
      Object.keys(r).forEach((k) => acc.add(k));
      return acc;
    }, new Set<string>())
  );
  const esc = (v: unknown) => {
    if (v == null) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
  ].join("\n");
}

function downloadCSV(filename: string, rows: Record<string, unknown>[]) {
  const csv = toCSV(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function bucketByHour<T extends { created_at?: string; last_seen_at?: string }>(
  rows: T[],
  field: "created_at" | "last_seen_at",
  bucketHours: number
) {
  const buckets = new Map<number, T[]>();
  for (const r of rows) {
    const ts = r[field];
    if (!ts) continue;
    const t = new Date(ts).getTime();
    const bucket = Math.floor(t / (bucketHours * 3600_000)) * bucketHours * 3600_000;
    if (!buckets.has(bucket)) buckets.set(bucket, []);
    buckets.get(bucket)!.push(r);
  }
  return Array.from(buckets.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([ts, items]) => ({ ts, items }));
}

function ProductionMonitoring() {
  const [range, setRange] = useState<RangeKey>("24h");
  const [severity, setSeverity] = useState("");
  const [platform, setPlatform] = useState("");
  const [provider, setProvider] = useState("");

  const bounds = useMemo(() => rangeBounds(range), [range]);
  const bucketHours = range === "24h" ? 1 : range === "7d" ? 6 : 24;

  const errFn = useServerFn(fetchAppErrorEvents);
  const aiFn = useServerFn(fetchAICostEvents);
  const sesFn = useServerFn(fetchMobileDeviceSessions);

  const errors = useQuery({
    queryKey: ["mon", "errors", range, severity, platform],
    queryFn: () =>
      errFn({
        data: {
          ...bounds,
          limit: 1000,
          severity: severity || undefined,
          platform: platform || undefined,
        },
      }),
  });

  const ai = useQuery({
    queryKey: ["mon", "ai", range, provider],
    queryFn: () =>
      aiFn({
        data: { ...bounds, limit: 1000, provider: provider || undefined },
      }),
  });

  const sessions = useQuery({
    queryKey: ["mon", "sessions", range, platform],
    queryFn: () =>
      sesFn({
        data: { ...bounds, limit: 1000, platform: platform || undefined },
      }),
  });

  // Derived metrics
  const errorRows = errors.data?.rows ?? [];
  const errorBuckets = bucketByHour(errorRows, "created_at", bucketHours);
  const errorSeries = errorBuckets.map((b) => ({
    t: new Date(b.ts).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit" }),
    errors: b.items.filter((i) => i.severity === "error").length,
    warnings: b.items.filter((i) => i.severity === "warning").length,
    critical: b.items.filter((i) => i.severity === "critical").length,
  }));

  const aiRows = ai.data?.rows ?? [];
  const aiTotalCost = aiRows.reduce((s, r) => s + (Number(r.cost_usd) || 0), 0);
  const aiTotalTokens = aiRows.reduce((s, r) => s + (r.total_tokens || 0), 0);
  const aiAvgLatency =
    aiRows.length > 0
      ? Math.round(
          aiRows.reduce((s, r) => s + (r.latency_ms || 0), 0) / aiRows.length
        )
      : 0;
  const aiByProvider = Object.entries(
    aiRows.reduce<Record<string, { cost: number; calls: number }>>((acc, r) => {
      acc[r.provider] ||= { cost: 0, calls: 0 };
      acc[r.provider].cost += Number(r.cost_usd) || 0;
      acc[r.provider].calls += 1;
      return acc;
    }, {})
  ).map(([provider, v]) => ({ provider, cost: Number(v.cost.toFixed(4)), calls: v.calls }));

  const sessionRows = sessions.data?.rows ?? [];
  const activeNow = sessionRows.filter(
    (s) => !s.ended_at && new Date(s.last_seen_at).getTime() > Date.now() - 5 * 60_000
  ).length;
  const lowBattery = sessionRows.filter(
    (s) => s.battery_level != null && Number(s.battery_level) < 0.2 && !s.is_charging
  ).length;
  const platformBreakdown = Object.entries(
    sessionRows.reduce<Record<string, number>>((acc, s) => {
      acc[s.platform || "unknown"] = (acc[s.platform || "unknown"] || 0) + 1;
      return acc;
    }, {})
  ).map(([platform, count]) => ({ platform, count }));

  return (
    <AppShell>
      <div className="mx-auto grid max-w-7xl gap-4 py-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">Production Monitoring</h1>
            <p className="text-[12px] text-zinc-400">
              App errors, AI cost & latency, and mobile device session health. Scoped to
              your company by RLS.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <Filter label="Range">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value as RangeKey)}
                className="rounded border border-white/10 bg-zinc-900 px-2 py-1 text-[12px] text-zinc-200"
              >
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </Filter>
            <Filter label="Severity">
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="rounded border border-white/10 bg-zinc-900 px-2 py-1 text-[12px] text-zinc-200"
              >
                <option value="">All</option>
                <option value="warning">warning</option>
                <option value="error">error</option>
                <option value="critical">critical</option>
              </select>
            </Filter>
            <Filter label="Platform">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="rounded border border-white/10 bg-zinc-900 px-2 py-1 text-[12px] text-zinc-200"
              >
                <option value="">All</option>
                <option value="ios">iOS</option>
                <option value="android">Android</option>
                <option value="web">Web</option>
              </select>
            </Filter>
            <Filter label="AI provider">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="rounded border border-white/10 bg-zinc-900 px-2 py-1 text-[12px] text-zinc-200"
              >
                <option value="">All</option>
                <option value="openai_responses">openai_responses</option>
                <option value="openai_realtime">openai_realtime</option>
                <option value="local_rules">local_rules</option>
                <option value="mock">mock</option>
                <option value="fallback">fallback</option>
              </select>
            </Filter>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi
            label="Errors"
            value={errorRows.length.toString()}
            sub={`${errorRows.filter((e) => e.severity === "critical").length} critical`}
            tone={errorRows.some((e) => e.severity === "critical") ? "danger" : "ok"}
          />
          <Kpi
            label="AI cost"
            value={`$${aiTotalCost.toFixed(4)}`}
            sub={`${aiTotalTokens.toLocaleString()} tokens · ${aiRows.length} calls`}
          />
          <Kpi
            label="Avg AI latency"
            value={`${aiAvgLatency} ms`}
            sub={`${aiRows.filter((r) => r.status !== "ok").length} failed`}
            tone={aiAvgLatency > 2000 ? "warn" : "ok"}
          />
          <Kpi
            label="Active devices"
            value={activeNow.toString()}
            sub={`${sessionRows.length} sessions · ${lowBattery} low battery`}
            tone={lowBattery > 0 ? "warn" : "ok"}
          />
        </div>

        {/* Errors trend */}
        <Section
          title="App errors by severity"
          right={
            <ExportButton
              disabled={!errorRows.length}
              onClick={() => downloadCSV(`app-errors-${range}.csv`, errorRows)}
            />
          }
        >
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <AreaChart data={errorSeries}>
                <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                <XAxis dataKey="t" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                <YAxis tick={{ fill: "#a1a1aa", fontSize: 10 }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="critical" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.5} />
                <Area type="monotone" dataKey="errors" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
                <Area type="monotone" dataKey="warnings" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <RecentTable
            rows={errorRows.slice(0, 8)}
            columns={[
              { key: "created_at", label: "When", fmt: (v) => new Date(String(v)).toLocaleString() },
              { key: "severity", label: "Severity" },
              { key: "source", label: "Source" },
              { key: "platform", label: "Platform" },
              { key: "message", label: "Message", className: "truncate max-w-md" },
            ]}
            empty={errors.isLoading ? "Loading…" : "No errors in range."}
          />
        </Section>

        {/* AI cost */}
        <Section
          title="AI cost & calls by provider"
          right={
            <ExportButton
              disabled={!aiRows.length}
              onClick={() => downloadCSV(`ai-cost-${range}.csv`, aiRows)}
            />
          }
        >
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <BarChart data={aiByProvider}>
                <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                <XAxis dataKey="provider" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                <YAxis yAxisId="left" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="cost" name="USD" fill="#10b981" />
                <Bar yAxisId="right" dataKey="calls" name="Calls" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <RecentTable
            rows={aiRows.slice(0, 8)}
            columns={[
              { key: "created_at", label: "When", fmt: (v) => new Date(String(v)).toLocaleString() },
              { key: "provider", label: "Provider" },
              { key: "model", label: "Model" },
              { key: "operation", label: "Op" },
              { key: "total_tokens", label: "Tokens" },
              { key: "latency_ms", label: "Latency (ms)" },
              { key: "cost_usd", label: "Cost", fmt: (v) => (v == null ? "—" : `$${Number(v).toFixed(5)}`) },
              { key: "status", label: "Status" },
            ]}
            empty={ai.isLoading ? "Loading…" : "No AI calls in range."}
          />
        </Section>

        {/* Device sessions */}
        <Section
          title="Mobile device sessions"
          right={
            <ExportButton
              disabled={!sessionRows.length}
              onClick={() => downloadCSV(`device-sessions-${range}.csv`, sessionRows)}
            />
          }
        >
          <div className="h-48 w-full">
            <ResponsiveContainer>
              <BarChart data={platformBreakdown}>
                <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                <XAxis dataKey="platform" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                <YAxis tick={{ fill: "#a1a1aa", fontSize: 10 }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", fontSize: 12 }} />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <RecentTable
            rows={sessionRows.slice(0, 8)}
            columns={[
              { key: "last_seen_at", label: "Last seen", fmt: (v) => new Date(String(v)).toLocaleString() },
              { key: "platform", label: "Platform" },
              { key: "os_version", label: "OS" },
              { key: "app_version", label: "App" },
              { key: "device_model", label: "Device" },
              { key: "network_type", label: "Net" },
              {
                key: "battery_level",
                label: "Battery",
                fmt: (v) => (v == null ? "—" : `${Math.round(Number(v) * 100)}%`),
              },
              { key: "ended_at", label: "Status", fmt: (v) => (v ? "ended" : "active") },
            ]}
            empty={sessions.isLoading ? "Loading…" : "No device sessions in range."}
          />
        </Section>

        <div className="text-[11px] text-zinc-500">
          Companion to{" "}
          <Link to="/settings/production" className="text-emerald-300 underline">
            /settings/production
          </Link>
          . Data is read-only and scoped by RLS to your company.
        </div>
      </div>
    </AppShell>
  );
}

/* ---------- small presentational pieces ---------- */

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</span>
      {children}
    </label>
  );
}

function Kpi({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "ok" | "warn" | "danger" | "neutral";
}) {
  const ring =
    tone === "danger"
      ? "border-rose-500/40"
      : tone === "warn"
      ? "border-amber-500/40"
      : tone === "ok"
      ? "border-emerald-500/30"
      : "border-white/10";
  return (
    <div className={`rounded-lg border ${ring} bg-zinc-950/60 p-3`}>
      <div className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</div>
      <div className="mt-1 text-xl font-semibold text-zinc-100 tabular-nums">{value}</div>
      {sub && <div className="text-[11px] text-zinc-400">{sub}</div>}
    </div>
  );
}

function Section({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[12px] font-semibold text-zinc-100">{title}</div>
        {right}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ExportButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Export CSV
    </button>
  );
}

interface Column {
  key: string;
  label: string;
  className?: string;
  fmt?: (v: unknown) => string;
}

function RecentTable({
  rows,
  columns,
  empty,
}: {
  rows: Record<string, unknown>[];
  columns: Column[];
  empty: string;
}) {
  if (!rows.length) {
    return <div className="rounded bg-white/5 px-3 py-4 text-center text-[11px] text-zinc-500">{empty}</div>;
  }
  return (
    <div className="overflow-x-auto rounded border border-white/5">
      <table className="w-full text-left text-[11px] text-zinc-300">
        <thead className="bg-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-2 py-1.5 font-medium">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/5">
              {columns.map((c) => (
                <td key={c.key} className={`px-2 py-1.5 align-top ${c.className ?? ""}`}>
                  {c.fmt ? c.fmt(r[c.key]) : (r[c.key] as React.ReactNode) ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
