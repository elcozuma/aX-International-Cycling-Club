import crypto from "node:crypto";
import type { Request, Response, NextFunction } from "express";

const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-in-production";
const COOKIE_NAME = "ax_admin";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function checkPassword(input: string): boolean {
  // Read dynamically so the value is always current at call time
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !input) return false;
  // Pad both to identical length so timingSafeEqual never throws
  const len = Math.max(input.length, expected.length, 1);
  const a = Buffer.alloc(len);
  const b = Buffer.alloc(len);
  Buffer.from(input, "utf8").copy(a);
  Buffer.from(expected, "utf8").copy(b);
  return crypto.timingSafeEqual(a, b);
}

export function createToken(): string {
  const payload = String(Date.now());
  const sig = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const colonIdx = decoded.indexOf(":");
    if (colonIdx === -1) return false;
    const payload = decoded.slice(0, colonIdx);
    const sig = decoded.slice(colonIdx + 1);
    const expectedSig = crypto
      .createHmac("sha256", SECRET)
      .update(payload)
      .digest("hex");
    const sigBuf = Buffer.from(sig, "hex");
    const expectedBuf = Buffer.from(expectedSig, "hex");
    if (sigBuf.length !== expectedBuf.length) return false;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;
    const ts = parseInt(payload, 10);
    return Number.isFinite(ts) && Date.now() - ts < MAX_AGE_MS;
  } catch {
    return false;
  }
}

export function setAdminCookie(res: Response, token: string): void {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: false, // Replit's reverse proxy handles TLS; never require secure flag
    sameSite: "lax",  // lax works across the Replit proxy; strict can break it
    maxAge: MAX_AGE_MS,
    path: "/",
  });
}

export function clearAdminCookie(res: Response): void {
  res.clearCookie(COOKIE_NAME, { path: "/" });
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // 1. Authorization: Bearer <token> header (primary — works in all iframe/proxy contexts)
  const auth = req.headers["authorization"];
  if (auth?.startsWith("Bearer ") && verifyToken(auth.slice(7))) {
    next();
    return;
  }
  // 2. ?_t=<token> query param (for window.open downloads that can't set headers)
  const qt = req.query["_t"];
  if (typeof qt === "string" && verifyToken(qt)) {
    next();
    return;
  }
  // 3. httpOnly cookie fallback
  const cookies = (req as Request & { cookies?: Record<string, string> }).cookies;
  if (verifyToken(cookies?.[COOKIE_NAME])) {
    next();
    return;
  }
  res.status(401).json({ error: "Unauthorized" });
}

export function getIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string")
    return forwarded.split(",")[0]?.trim() ?? "";
  return req.socket?.remoteAddress ?? "";
}

export function anonymizeIp(ip: string): string {
  if (ip.includes(".")) return ip.replace(/\.\d+$/, ".0");
  if (ip.includes(":")) return ip.split(":").slice(0, 3).join(":") + "::";
  return "0.0.0.0";
}

export function hashIp(ip: string): string {
  return crypto
    .createHash("sha256")
    .update(anonymizeIp(ip))
    .digest("hex")
    .slice(0, 16);
}
