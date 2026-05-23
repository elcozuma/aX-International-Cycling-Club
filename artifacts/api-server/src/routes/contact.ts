import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { db, contactSubmissions } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// ── Rate limiting: max 5 submissions per IP per 15 minutes ──────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many submissions — please wait a few minutes and try again." },
});

// ── Input validation ─────────────────────────────────────────────────────────
const ContactBody = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  reason: z.string().min(1).max(200),
  message: z.string().max(5000).optional(),
});

// ── SMTP transport (Outlook/Hotmail via STARTTLS on port 587) ────────────────
function createTransport() {
  return nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,         // false = STARTTLS upgrade on connect
    requireTLS: true,      // refuse to send if TLS upgrade fails
    auth: {
      user: process.env["SMTP_USER"],
      pass: process.env["SMTP_APP_PASSWORD"],
    },
  });
}

router.post("/contact", contactLimiter, async (req, res) => {
  const parsed = ContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, reason, message } = parsed.data;

  // ── 1. Save to database (always — email failure never blocks this) ──────────
  let savedId: number | undefined;
  try {
    const [row] = await db
      .insert(contactSubmissions)
      .values({ name, email, reason, message: message ?? null })
      .returning({ id: contactSubmissions.id });
    savedId = row?.id;
    req.log.info({ savedId }, "contact submission saved to database");
  } catch (err) {
    req.log.error({ err }, "failed to save contact submission to database");
    res.status(500).json({ error: "Failed to save submission" });
    return;
  }

  // ── 2. Send email (best-effort — logged, never blocks the 200 response) ─────
  const toEmail = process.env["CONTACT_EMAIL_TO"];
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_APP_PASSWORD"];

  if (!toEmail || !smtpUser || !smtpPass) {
    req.log.warn(
      { hasTo: !!toEmail, hasUser: !!smtpUser, hasPass: !!smtpPass },
      "SMTP env vars not fully configured — skipping email send"
    );
  } else {
    try {
      const transporter = createTransport();
      await transporter.sendMail({
        from: `"a-X Contact Form" <${smtpUser}>`,
        to: toEmail,
        replyTo: `"${name}" <${email}>`,
        subject: `${name} — a-X Contact Form`,
        text: [
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Subject: ${reason}`,
          ``,
          message ?? "(no message)",
          ``,
          `─────────────────────────`,
          `Submission ID: ${savedId}`,
        ].join("\n"),
      });
      req.log.info({ savedId, to: toEmail }, "contact email sent successfully");
    } catch (err) {
      req.log.error({ err, savedId }, "contact email send failed — submission still saved");
    }
  }

  res.status(200).json({ ok: true, id: savedId });
});

export default router;
