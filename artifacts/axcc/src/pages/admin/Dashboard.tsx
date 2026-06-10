import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Summary {
  today: number; week: number; month: number; allTime: number;
}
interface Stats {
  summary: {
    pageViews: Summary;
    uniqueVisitors: Summary;
    returningVisitors: Summary;
    avgDurationSeconds: number;
  };
  trafficTrend: Array<{ date: string; pageViews: number; visitors: number }>;
  topPages: Array<{ page: string; views: number; pct: number }>;
  topReferrers: Array<{ source: string; count: number; pct: number }>;
  topCountries: Array<{ country: string; count: number }>;
  topCities: Array<{ city: string; country: string; count: number }>;
  deviceBreakdown: Array<{ device: string; count: number }>;
  browserBreakdown: Array<{ browser: string; count: number }>;
  topEvents: Array<{ label: string; type: string; count: number }>;
  recentSessions: Array<{
    id: string; startedAt: string; landingPage: string | null;
    exitPage: string | null; device: string | null; country: string | null;
    referrerSource: string | null; durationSeconds: number | null;
    isReturning: boolean | null;
  }>;
  pages: string[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

const ACCENT = "hsl(68 57% 38%)";
const ACCENT2 = "hsl(68 57% 60%)";
const DEVICE_COLORS: Record<string, string> = {
  desktop: "#8a9a1f",
  mobile: "#b8cc2e",
  tablet: "#5a6e14",
};
const PIE_COLORS = ["#8a9a1f", "#b8cc2e", "#d4e052", "#4a5e10", "#6a801a"];
type RangeKey = "7" | "30" | "90" | "all";
const RANGES: { key: RangeKey; label: string }[] = [
  { key: "7", label: "7 days" },
  { key: "30", label: "30 days" },
  { key: "90", label: "90 days" },
  { key: "all", label: "All time" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDuration(s: number): string {
  if (!s) return "—";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}
function fmtN(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  title, data, suffix = "",
}: {
  title: string; data: Summary; suffix?: string;
}) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5">
      <p className="text-white/40 text-xs uppercase tracking-widest mb-4">{title}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {(["Today", "7 days", "30 days", "All time"] as const).map((label, i) => {
          const val = i === 0 ? data.today : i === 1 ? data.week : i === 2 ? data.month : data.allTime;
          return (
            <div key={label}>
              <p className="text-white/30 text-[10px]">{label}</p>
              <p className="text-white text-lg font-semibold leading-tight">
                {fmtN(val)}{suffix}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Section({ title, children, action }: {
  title: string; children: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-white/60 text-xs uppercase tracking-widest">{title}</p>
        {action}
      </div>
      {children}
    </div>
  );
}

const TT = ({ active, payload, label }: {
  active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs">
      <p className="text-white/40 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {fmtN(p.value)}
        </p>
      ))}
    </div>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [range, setRange] = useState<RangeKey>("30");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [heatmapPage, setHeatmapPage] = useState("/");
  const [heatClicks, setHeatClicks] = useState<Array<{ x: number; y: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Auth check — render nothing until resolved ──────────────────────────────
  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) navigate("/admin/login");
        else setAuthChecked(true);
      })
      .catch(() => navigate("/admin/login"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Fetch stats ─────────────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const qs = range === "all" ? "" : `?days=${range}`;
      const r = await fetch(`/api/admin/stats${qs}`, { credentials: "include" });
      if (r.status === 401) { navigate("/admin/login"); return; }
      const data: Stats = await r.json();
      setStats(data);
      if (data.pages.length > 0 && !data.pages.includes(heatmapPage)) {
        setHeatmapPage(data.pages[0] ?? "/");
      }
    } finally {
      setLoading(false);
    }
  }, [range, navigate]); // eslint-disable-line

  useEffect(() => { fetchStats(); }, [fetchStats]);

  // ── Fetch heatmap ───────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`/api/admin/heatmap?page=${encodeURIComponent(heatmapPage)}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((d: { clicks?: Array<{ x: number; y: number }> }) =>
        setHeatClicks(d.clicks ?? []),
      )
      .catch(() => {});
  }, [heatmapPage]);

  // ── Draw heatmap canvas ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const { x, y } of heatClicks) {
      const cx = (x / 100) * canvas.width;
      const cy = (y / 100) * canvas.height;
      const r = 24;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, "rgba(255, 80, 0, 0.18)");
      g.addColorStop(1, "rgba(255, 80, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [heatClicks]);

  // ── Logout ──────────────────────────────────────────────────────────────────
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    navigate("/admin/login");
  }

  // ── Export ──────────────────────────────────────────────────────────────────
  function exportCSV(type: "pageviews" | "events" | "sessions") {
    const qs = range === "all" ? `type=${type}` : `type=${type}&days=${range}`;
    window.open(`/api/admin/export?${qs}`, "_blank");
  }

  const s = stats?.summary;

  // Block render until auth resolves (prevents flash of dashboard to unauth users)
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/10 border-t-white/30 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/[0.06] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}ax-logo.png`}
            alt="a-X"
            className="h-8 w-auto"
          />
          <span className="text-white/30 text-sm">Analytics</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={logout}
            className="text-xs text-white/40 hover:text-white/70 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Range tabs */}
        <div className="flex items-center gap-2">
          {RANGES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className="text-xs px-3 py-1.5 rounded-lg transition-colors"
              style={
                range === key
                  ? { background: ACCENT, color: "#fff" }
                  : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }
              }
            >
              {label}
            </button>
          ))}
          <span className="ml-auto text-white/20 text-xs">
            {loading ? "Loading…" : ""}
          </span>
        </div>

        {/* Summary cards */}
        {s && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Page Views" data={s.pageViews} />
            <StatCard title="Unique Visitors" data={s.uniqueVisitors} />
            <StatCard title="Returning Visitors" data={s.returningVisitors} />
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 flex flex-col justify-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Avg. Session</p>
              <p className="text-white text-4xl font-semibold">
                {fmtDuration(s.avgDurationSeconds)}
              </p>
            </div>
          </div>
        )}

        {/* Traffic Trend */}
        {stats && (
          <Section title={`Traffic trend — last ${range === "all" ? "all time" : range + " days"}`}>
            {stats.trafficTrend.length === 0 ? (
              <p className="text-white/20 text-sm text-center py-12">No data for this period.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={stats.trafficTrend} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(d) => fmtDate(d)}
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={fmtN}
                  />
                  <Tooltip content={<TT />} />
                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pageViews"
                    name="Page views"
                    stroke={ACCENT}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    name="Visitors"
                    stroke={ACCENT2}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    strokeDasharray="4 2"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Section>
        )}

        {/* Top pages + devices + referrers */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top pages */}
            <Section title="Top pages" action={
              <button onClick={() => exportCSV("pageviews")} className="text-[10px] text-white/30 hover:text-white/60 transition-colors">
                Export CSV
              </button>
            }>
              <div className="space-y-2">
                {stats.topPages.length === 0 && <p className="text-white/20 text-xs">No data.</p>}
                {stats.topPages.map((p) => (
                  <div key={p.page}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70 truncate max-w-[70%]">{p.page || "/"}</span>
                      <span className="text-white/40">{fmtN(p.views)}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${p.pct}%`, background: ACCENT }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Device breakdown */}
            <Section title="Devices">
              {stats.deviceBreakdown.length === 0 ? (
                <p className="text-white/20 text-xs">No data.</p>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={stats.deviceBreakdown}
                        dataKey="count"
                        nameKey="device"
                        cx="50%"
                        cy="50%"
                        outerRadius={55}
                        innerRadius={30}
                      >
                        {stats.deviceBreakdown.map((d, i) => (
                          <Cell
                            key={d.device}
                            fill={DEVICE_COLORS[d.device] ?? PIE_COLORS[i % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                        labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                        itemStyle={{ color: "#fff" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-full space-y-1.5">
                    {stats.deviceBreakdown.map((d, i) => (
                      <div key={d.device} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: DEVICE_COLORS[d.device] ?? PIE_COLORS[i % PIE_COLORS.length] }}
                          />
                          <span className="text-white/60 capitalize">{d.device}</span>
                        </div>
                        <span className="text-white/40">{fmtN(d.count)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Section>

            {/* Top referrers */}
            <Section title="Referrers" action={
              <button onClick={() => exportCSV("sessions")} className="text-[10px] text-white/30 hover:text-white/60 transition-colors">
                Export CSV
              </button>
            }>
              <div className="space-y-2">
                {stats.topReferrers.length === 0 && <p className="text-white/20 text-xs">No data.</p>}
                {stats.topReferrers.map((r) => (
                  <div key={r.source}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70 capitalize">{r.source}</span>
                      <span className="text-white/40">{fmtN(r.count)}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${r.pct}%`, background: ACCENT2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Countries + Browsers + Events */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top countries */}
            <Section title="Countries">
              <div className="space-y-1.5">
                {stats.topCountries.length === 0 && <p className="text-white/20 text-xs">No data.</p>}
                {stats.topCountries.slice(0, 10).map((c) => (
                  <div key={c.country} className="flex justify-between text-xs">
                    <span className="text-white/60">{c.country}</span>
                    <span className="text-white/40">{fmtN(c.count)}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Browser breakdown */}
            <Section title="Browsers">
              {stats.browserBreakdown.length === 0 ? (
                <p className="text-white/20 text-xs">No data.</p>
              ) : (
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart
                    data={stats.browserBreakdown}
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="browser"
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      width={55}
                    />
                    <Tooltip
                      contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    />
                    <Bar dataKey="count" fill={ACCENT} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Section>

            {/* Top events */}
            <Section title="Top interactions" action={
              <button onClick={() => exportCSV("events")} className="text-[10px] text-white/30 hover:text-white/60 transition-colors">
                Export CSV
              </button>
            }>
              <div className="space-y-1.5">
                {stats.topEvents.length === 0 && <p className="text-white/20 text-xs">No interaction data.</p>}
                {stats.topEvents.map((e, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 text-xs">
                    <div className="min-w-0">
                      <span className="text-white/60 truncate block">{e.label}</span>
                      <span className="text-white/25 text-[10px]">{e.type}</span>
                    </div>
                    <span className="text-white/40 flex-shrink-0">{fmtN(e.count)}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Recent sessions */}
        {stats && (
          <Section title="Recent sessions">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white/25 border-b border-white/[0.06]">
                    <th className="text-left py-2 pr-4 font-normal">Time</th>
                    <th className="text-left py-2 pr-4 font-normal">Landing</th>
                    <th className="text-left py-2 pr-4 font-normal">Device</th>
                    <th className="text-left py-2 pr-4 font-normal">Country</th>
                    <th className="text-left py-2 pr-4 font-normal">Source</th>
                    <th className="text-left py-2 pr-4 font-normal">Duration</th>
                    <th className="text-left py-2 font-normal">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentSessions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-white/20 py-8 text-center">
                        No sessions recorded yet.
                      </td>
                    </tr>
                  )}
                  {stats.recentSessions.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-2 pr-4 text-white/40">{fmtDateTime(s.startedAt)}</td>
                      <td className="py-2 pr-4 text-white/60 max-w-[120px] truncate">{s.landingPage || "/"}</td>
                      <td className="py-2 pr-4 text-white/40 capitalize">{s.device || "—"}</td>
                      <td className="py-2 pr-4 text-white/40">{s.country || "—"}</td>
                      <td className="py-2 pr-4 text-white/40 capitalize">{s.referrerSource || "direct"}</td>
                      <td className="py-2 pr-4 text-white/40">
                        {s.durationSeconds ? fmtDuration(s.durationSeconds) : "—"}
                      </td>
                      <td className="py-2 text-white/30 text-[10px]">
                        {s.isReturning ? "returning" : "new"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Heatmap */}
        {stats && (
          <Section title="Click heatmap">
            <div className="flex items-center gap-3 mb-4">
              <label className="text-white/30 text-xs">Page</label>
              <select
                value={heatmapPage}
                onChange={(e) => setHeatmapPage(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-xs outline-none"
              >
                {stats.pages.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <span className="text-white/20 text-xs">{heatClicks.length} clicks</span>
            </div>
            <div className="relative rounded-lg overflow-hidden bg-white/[0.02] border border-white/[0.05]"
              style={{ aspectRatio: "9/16", maxWidth: 320, margin: "0 auto" }}>
              {/* Background grid */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 border-r border-white/20"
                    style={{ left: `${(i + 1) * 10}%` }}
                  />
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-white/20"
                    style={{ top: `${(i + 1) * 5}%` }}
                  />
                ))}
              </div>
              {/* Canvas */}
              <canvas
                ref={canvasRef}
                width={320}
                height={568}
                className="absolute inset-0 w-full h-full"
              />
              {heatClicks.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/20 text-xs">No click data for this page.</p>
                </div>
              )}
            </div>
            <p className="text-white/20 text-[10px] text-center mt-2">
              Each point represents a click — brighter = more clicks
            </p>
          </Section>
        )}
      </div>
    </div>
  );
}
