import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { pool } from "@workspace/db";
import {
  checkPassword,
  createToken,
  setAdminCookie,
  clearAdminCookie,
  requireAdmin,
} from "../lib/auth";

const router: IRouter = Router();

// ── Auth ──────────────────────────────────────────────────────────────────────

router.post("/admin/login", async (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password || !checkPassword(password)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const token = createToken();
  setAdminCookie(res, token);          // cookie (best-effort)
  res.json({ ok: true, token });       // token in body (always works)
});

router.post("/admin/logout", (_req, res) => {
  clearAdminCookie(res);
  res.json({ ok: true });
});

router.get("/admin/me", requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

// ── Stats ─────────────────────────────────────────────────────────────────────

router.get("/admin/stats", requireAdmin, async (req, res) => {
  const daysRaw = req.query["days"];
  const days =
    daysRaw && daysRaw !== "all" ? parseInt(daysRaw as string, 10) : 0;
  const fromDate =
    days > 0
      ? new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      : new Date("2000-01-01");
  const toDate = new Date();

  try {
    const [
      pvSummary,
      sessionSummary,
      trend,
      topPages,
      topReferrers,
      topCountries,
      topCities,
      deviceBreakdown,
      browserBreakdown,
      topEvents,
      recentSessions,
      pages,
    ] = await Promise.all([
      // Page view summary (today / 7d / 30d / all)
      pool.query(`
        SELECT
          count(*) FILTER (WHERE viewed_at >= NOW() - INTERVAL '1 day')::int AS pv_today,
          count(*) FILTER (WHERE viewed_at >= NOW() - INTERVAL '7 days')::int  AS pv_week,
          count(*) FILTER (WHERE viewed_at >= NOW() - INTERVAL '30 days')::int AS pv_month,
          count(*)::int AS pv_all
        FROM page_views
      `),
      // Session summary + avg duration + returning
      pool.query(`
        SELECT
          count(*) FILTER (WHERE started_at >= NOW() - INTERVAL '1 day')::int  AS uv_today,
          count(*) FILTER (WHERE started_at >= NOW() - INTERVAL '7 days')::int  AS uv_week,
          count(*) FILTER (WHERE started_at >= NOW() - INTERVAL '30 days')::int AS uv_month,
          count(*)::int                                                          AS uv_all,
          count(*) FILTER (WHERE is_returning AND started_at >= NOW() - INTERVAL '1 day')::int  AS rv_today,
          count(*) FILTER (WHERE is_returning AND started_at >= NOW() - INTERVAL '7 days')::int  AS rv_week,
          count(*) FILTER (WHERE is_returning AND started_at >= NOW() - INTERVAL '30 days')::int AS rv_month,
          count(*) FILTER (WHERE is_returning)::int                             AS rv_all,
          COALESCE(round(avg(duration_seconds) FILTER (WHERE duration_seconds > 0))::int, 0) AS avg_duration
        FROM visitor_sessions
      `),
      // Traffic trend by day
      pool.query(
        `
        SELECT
          date_trunc('day', viewed_at)::date AS day,
          count(*)::int AS page_views,
          count(DISTINCT session_id)::int AS visitors
        FROM page_views
        WHERE viewed_at >= $1 AND viewed_at <= $2
        GROUP BY day
        ORDER BY day
      `,
        [fromDate, toDate],
      ),
      // Top pages
      pool.query(
        `
        SELECT page, count(*)::int AS views
        FROM page_views
        WHERE viewed_at >= $1 AND viewed_at <= $2
        GROUP BY page
        ORDER BY views DESC
        LIMIT 10
      `,
        [fromDate, toDate],
      ),
      // Top referrers
      pool.query(
        `
        SELECT referrer_source AS source, count(*)::int AS count
        FROM visitor_sessions
        WHERE started_at >= $1 AND started_at <= $2
          AND referrer_source IS NOT NULL
        GROUP BY referrer_source
        ORDER BY count DESC
        LIMIT 10
      `,
        [fromDate, toDate],
      ),
      // Top countries
      pool.query(`
        SELECT country, count(*)::int AS count
        FROM visitor_sessions
        WHERE country IS NOT NULL AND country != '' AND country != 'Local'
        GROUP BY country
        ORDER BY count DESC
        LIMIT 15
      `),
      // Top cities
      pool.query(`
        SELECT city, country, count(*)::int AS count
        FROM visitor_sessions
        WHERE city IS NOT NULL AND city != '' AND city != 'Local'
        GROUP BY city, country
        ORDER BY count DESC
        LIMIT 10
      `),
      // Device breakdown
      pool.query(`
        SELECT device, count(*)::int AS count
        FROM visitor_sessions
        WHERE device IS NOT NULL
        GROUP BY device
        ORDER BY count DESC
      `),
      // Browser breakdown
      pool.query(`
        SELECT browser, count(*)::int AS count
        FROM visitor_sessions
        WHERE browser IS NOT NULL
        GROUP BY browser
        ORDER BY count DESC
        LIMIT 8
      `),
      // Top click events (excluding scroll)
      pool.query(
        `
        SELECT event_label AS label, event_type AS type, count(*)::int AS count
        FROM analytics_events
        WHERE event_type NOT IN ('scroll')
          AND occurred_at >= $1 AND occurred_at <= $2
          AND event_label IS NOT NULL
        GROUP BY event_label, event_type
        ORDER BY count DESC
        LIMIT 15
      `,
        [fromDate, toDate],
      ),
      // Recent sessions
      pool.query(`
        SELECT id, started_at, landing_page, exit_page, device, country,
               referrer_source, duration_seconds, is_returning
        FROM visitor_sessions
        ORDER BY started_at DESC
        LIMIT 20
      `),
      // Distinct pages (for heatmap selector)
      pool.query(`
        SELECT DISTINCT page FROM page_views ORDER BY page LIMIT 50
      `),
    ]);

    const pv = pvSummary.rows[0] ?? {};
    const sv = sessionSummary.rows[0] ?? {};

    const totalViews = topPages.rows.reduce(
      (s: number, r: { views: number }) => s + (r.views ?? 0),
      0,
    );
    const totalSessions = topReferrers.rows.reduce(
      (s: number, r: { count: number }) => s + (r.count ?? 0),
      0,
    );

    res.json({
      summary: {
        pageViews: {
          today: pv.pv_today ?? 0,
          week: pv.pv_week ?? 0,
          month: pv.pv_month ?? 0,
          allTime: pv.pv_all ?? 0,
        },
        uniqueVisitors: {
          today: sv.uv_today ?? 0,
          week: sv.uv_week ?? 0,
          month: sv.uv_month ?? 0,
          allTime: sv.uv_all ?? 0,
        },
        returningVisitors: {
          today: sv.rv_today ?? 0,
          week: sv.rv_week ?? 0,
          month: sv.rv_month ?? 0,
          allTime: sv.rv_all ?? 0,
        },
        avgDurationSeconds: sv.avg_duration ?? 0,
      },
      trafficTrend: trend.rows.map((r: Record<string, unknown>) => ({
        date: String(r["day"]).slice(0, 10),
        pageViews: r["page_views"],
        visitors: r["visitors"],
      })),
      topPages: topPages.rows.map((r: Record<string, unknown>) => ({
        page: r["page"],
        views: r["views"],
        pct: totalViews > 0 ? Math.round(((r["views"] as number) / totalViews) * 100) : 0,
      })),
      topReferrers: topReferrers.rows.map((r: Record<string, unknown>) => ({
        source: r["source"],
        count: r["count"],
        pct: totalSessions > 0 ? Math.round(((r["count"] as number) / totalSessions) * 100) : 0,
      })),
      topCountries: topCountries.rows,
      topCities: topCities.rows,
      deviceBreakdown: deviceBreakdown.rows,
      browserBreakdown: browserBreakdown.rows,
      topEvents: topEvents.rows,
      recentSessions: recentSessions.rows.map((r: Record<string, unknown>) => ({
        id: r["id"],
        startedAt: r["started_at"],
        landingPage: r["landing_page"],
        exitPage: r["exit_page"],
        device: r["device"],
        country: r["country"],
        referrerSource: r["referrer_source"],
        durationSeconds: r["duration_seconds"],
        isReturning: r["is_returning"],
      })),
      pages: (pages.rows as Array<{ page: string }>).map((r) => r.page),
    });
  } catch (err) {
    req.log.error({ err }, "admin: stats query failed");
    res.status(500).json({ error: "Failed to load stats" });
  }
});

// ── Heatmap ───────────────────────────────────────────────────────────────────

router.get("/admin/heatmap", requireAdmin, async (req, res) => {
  const page = (req.query["page"] as string) || "/";
  try {
    const result = await pool.query(
      `
      SELECT x_percent AS x, y_percent AS y
      FROM analytics_events
      WHERE event_type NOT IN ('scroll')
        AND page = $1
        AND x_percent IS NOT NULL
        AND y_percent IS NOT NULL
      LIMIT 5000
    `,
      [page],
    );
    res.json({ clicks: result.rows });
  } catch (err) {
    req.log.error({ err }, "admin: heatmap query failed");
    res.status(500).json({ error: "Failed to load heatmap" });
  }
});

// ── CSV Export ────────────────────────────────────────────────────────────────

const ExportQuery = z.object({
  type: z.enum(["pageviews", "events", "sessions"]),
  days: z.string().optional(),
});

router.get("/admin/export", requireAdmin, async (req, res) => {
  const parsed = ExportQuery.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }
  const { type, days } = parsed.data;
  const daysN = days && days !== "all" ? parseInt(days, 10) : 0;
  const fromDate =
    daysN > 0
      ? new Date(Date.now() - daysN * 24 * 60 * 60 * 1000)
      : new Date("2000-01-01");

  try {
    let csvRows: string[] = [];

    if (type === "pageviews") {
      const r = await pool.query(
        `SELECT session_id, page, viewed_at FROM page_views
         WHERE viewed_at >= $1 ORDER BY viewed_at DESC LIMIT 100000`,
        [fromDate],
      );
      csvRows = ["session_id,page,viewed_at"];
      for (const row of r.rows as Array<Record<string, unknown>>) {
        csvRows.push(
          [row["session_id"], csvEsc(String(row["page"])), row["viewed_at"]].join(","),
        );
      }
    } else if (type === "events") {
      const r = await pool.query(
        `SELECT session_id, event_type, event_label, page, occurred_at
         FROM analytics_events WHERE occurred_at >= $1 ORDER BY occurred_at DESC LIMIT 100000`,
        [fromDate],
      );
      csvRows = ["session_id,event_type,event_label,page,occurred_at"];
      for (const row of r.rows as Array<Record<string, unknown>>) {
        csvRows.push(
          [
            row["session_id"],
            csvEsc(String(row["event_type"])),
            csvEsc(String(row["event_label"] ?? "")),
            csvEsc(String(row["page"])),
            row["occurred_at"],
          ].join(","),
        );
      }
    } else {
      const r = await pool.query(
        `SELECT id, started_at, device, browser, os, country, city,
                referrer_source, duration_seconds, is_returning, landing_page
         FROM visitor_sessions WHERE started_at >= $1 ORDER BY started_at DESC LIMIT 100000`,
        [fromDate],
      );
      csvRows = [
        "id,started_at,device,browser,os,country,city,referrer_source,duration_seconds,is_returning,landing_page",
      ];
      for (const row of r.rows as Array<Record<string, unknown>>) {
        csvRows.push(
          [
            row["id"],
            row["started_at"],
            row["device"] ?? "",
            row["browser"] ?? "",
            row["os"] ?? "",
            csvEsc(String(row["country"] ?? "")),
            csvEsc(String(row["city"] ?? "")),
            row["referrer_source"] ?? "",
            row["duration_seconds"] ?? "",
            row["is_returning"] ?? false,
            csvEsc(String(row["landing_page"] ?? "")),
          ].join(","),
        );
      }
    }

    const filename = `${type}-${new Date().toISOString().slice(0, 10)}.csv`;
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csvRows.join("\n"));
  } catch (err) {
    req.log.error({ err }, "admin: export failed");
    res.status(500).json({ error: "Export failed" });
  }
});

function csvEsc(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export default router;
