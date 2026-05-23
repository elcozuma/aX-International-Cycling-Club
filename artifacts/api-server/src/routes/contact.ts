import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import nodemailer from "nodemailer";
import { db, contactSubmissions } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const ContactBody = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  reason: z.string().min(1),
  message: z.string().optional(),
});

function createTransport() {
  return nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env["SMTP_USER"],
      pass: process.env["SMTP_APP_PASSWORD"],
    },
    tls: { ciphers: "SSLv3" },
  });
}

router.post("/contact", async (req, res) => {
  const parsed = ContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, reason, message } = parsed.data;

  // ── 1. Save to database (always) ────────────────────────────────────────────
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

  // ── 2. Send email (best-effort, does not block success response) ─────────────
  const toEmail = process.env["CONTACT_EMAIL_TO"];
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_APP_PASSWORD"];

  if (!toEmail || !smtpUser || !smtpPass) {
    req.log.warn(
      { toEmail: !!toEmail, smtpUser: !!smtpUser, smtpPass: !!smtpPass },
      "email env vars not configured — skipping email send"
    );
  } else {
    try {
      const transporter = createTransport();
      await transporter.sendMail({
        from: `"a-X Contact Form" <${smtpUser}>`,
        to: toEmail,
        replyTo: email,
        subject: `a-X Contact: ${reason}`,
        text: [
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Subject: ${reason}`,
          ``,
          message ?? "(no message)",
        ].join("\n"),
      });
      req.log.info({ savedId, to: toEmail }, "contact email sent successfully");
    } catch (err) {
      req.log.error({ err, savedId }, "failed to send contact email");
    }
  }

  res.status(200).json({ ok: true, id: savedId });
});

export default router;
