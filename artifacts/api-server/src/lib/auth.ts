import crypto from "node:crypto";
import type { Request, Response, NextFunction } from "express";

const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-in-production";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const COOKIE_NAME = "ax_admin";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function checkPassword(input: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  const a = Buffer.from(
    crypto.createHash("sha256").update(input).digest("hex"),
  );
  const b = Buffer.from(
    crypto.createHash("sha256").update(ADMIN_PASSWORD).digest("hex"),
  );
  if (a.length !== b.length) return false;
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
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
  const cookies = (req as Request & { cookies?: Record<string, string> })
    .cookies;
  if (!verifyToken(cookies?.[COOKIE_NAME])) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
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
