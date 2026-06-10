import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import rateLimit from "express-rate-limit";
import { db, visitorSessions, pageViews, analyticsEvents } from "@workspace/db";
import { eq } from "drizzle-orm";
import { getIp, hashIp } from "../lib/auth";
import { geolocate } from "../lib/geo";

const router: IRouter = Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests" },
});

// ── Start session ─────────────────────────────────────────────────────────────
const SessionBody = z.object({
  sessionId: z.string().min(1).max(36),
  visitorHash: z.string().min(1).max(64),
  device: z.enum(["mobile", "tablet", "desktop"]),
  browser: z.string().max(50),
  os: z.string().max(50),
  referrer: z.string().max(500),
  referrerSource: z.string().max(50),
  landingPage: z.string().max(500),
  consentGiven: z.boolean(),
});

router.post("/analytics/session", limiter, async (req, res) => {
  const parsed = SessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const d = parsed.data;
  const ip = getIp(req);
  const ipHash = hashIp(ip);

  let isReturning = false;
  try {
    const existing = await db.query.visitorSessions.findFirst({
      columns: { id: true },
      where: (t, { eq: eqOp }) => eqOp(t.visitorHash, d.visitorHash),
    });
    isReturning = !!existing && existing.id !== d.sessionId;
  } catch {
    /* non-critical */
  }

  const { country, city } = await geolocate(ip);

  try {
    await db
      .insert(visitorSessions)
      .values({
        id: d.sessionId,
        visitorHash: d.visitorHash,
        isReturning,
        device: d.device,
        browser: d.browser,
        os: d.os,
        referrer: d.referrer,
        referrerSource: d.referrerSource,
        landingPage: d.landingPage,
        ipHash,
        country,
        city,
        consentGiven: d.consentGiven,
      })
      .onConflictDoNothing();
  } catch (err) {
    req.log.error({ err }, "analytics: failed to insert session");
  }

  res.json({ ok: true });
});

// ── Track page view ───────────────────────────────────────────────────────────
const PageViewBody = z.object({
  sessionId: z.string().min(1).max(36),
  page: z.string().min(1).max(500),
});

router.post("/analytics/pageview", limiter, async (req, res) => {
  const parsed = PageViewBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  try {
    await db.insert(pageViews).values(parsed.data);
  } catch (err) {
    req.log.error({ err }, "analytics: failed to insert pageview");
  }
  res.json({ ok: true });
});

// ── Track event ───────────────────────────────────────────────────────────────
const EventBody = z.object({
  sessionId: z.string().min(1).max(36),
  eventType: z.string().min(1).max(50),
  eventLabel: z.string().max(200).optional(),
  page: z.string().min(1).max(500),
  xPercent: z.number().min(0).max(100).nullable().optional(),
  yPercent: z.number().min(0).max(100).nullable().optional(),
  scrollDepth: z.number().min(0).max(100).nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
});

router.post("/analytics/event", limiter, async (req, res) => {
  const parsed = EventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const d = parsed.data;
  try {
    await db.insert(analyticsEvents).values({
      sessionId: d.sessionId,
      eventType: d.eventType,
      eventLabel: d.eventLabel ?? null,
      page: d.page,
      xPercent: d.xPercent ?? null,
      yPercent: d.yPercent ?? null,
      scrollDepth: d.scrollDepth ?? null,
      metadata: d.metadata ?? null,
    });
  } catch (err) {
    req.log.error({ err }, "analytics: failed to insert event");
  }
  res.json({ ok: true });
});

// ── End session ───────────────────────────────────────────────────────────────
const SessionEndBody = z.object({
  sessionId: z.string().min(1).max(36),
  exitPage: z.string().max(500).optional(),
  durationSeconds: z.number().int().min(0).max(86400).optional(),
});

router.post("/analytics/session/end", limiter, async (req, res) => {
  const parsed = SessionEndBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const d = parsed.data;
  try {
    await db
      .update(visitorSessions)
      .set({
        endedAt: new Date(),
        exitPage: d.exitPage ?? null,
        durationSeconds: d.durationSeconds ?? null,
      })
      .where(eq(visitorSessions.id, d.sessionId));
  } catch (err) {
    req.log.error({ err }, "analytics: failed to end session");
  }
  res.json({ ok: true });
});

export default router;
