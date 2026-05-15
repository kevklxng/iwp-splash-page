import { NextResponse } from "next/server";
import { after } from "next/server";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { isSheetsConfigured, postRowToSheet } from "@/lib/google-sheets";
import { hasSanity } from "../../../sanity/env";
import { sanityClient } from "../../../sanity/client";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/** In-memory rate limit (resets on cold start). */
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX_PER_WINDOW = 5;
const submissionTimestampsByIp = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = submissionTimestampsByIp.get(ip) ?? [];
  const recent = prev.filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_PER_WINDOW) {
    submissionTimestampsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionTimestampsByIp.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form fields." }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  if (!process.env.POSTGRES_URL) {
    console.error("[api/contact] POSTGRES_URL is not set.");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const sourcePage = data.sourcePage?.trim() || "/";
  const submittedAt = new Date().toISOString();

  const row: Record<string, string | undefined> = {
    submittedAt,
    sourcePage,
    name: data.name,
    email: data.email,
    phone: data.phone,
    projectType: data.projectType,
    budgetRange: data.budgetRange,
    timeline: data.timeline,
    drawingsStatus: data.drawingsStatus,
    projectLocation: data.projectLocation,
    message: data.message,
  };

  let newId: number;
  try {
    const insertResult = await sql<{ id: number }>`
      INSERT INTO contact_submissions (
        submitted_at,
        source_page,
        name,
        email,
        phone,
        project_type,
        budget_range,
        timeline,
        drawings_status,
        project_location,
        message
      )
      VALUES (
        ${submittedAt},
        ${sourcePage},
        ${data.name},
        ${data.email},
        ${data.phone},
        ${data.projectType},
        ${data.budgetRange},
        ${data.timeline},
        ${data.drawingsStatus},
        ${data.projectLocation},
        ${data.message ?? null}
      )
      RETURNING id
    `;
    const id = insertResult.rows[0]?.id;
    if (typeof id !== "number") {
      throw new Error("Insert did not return an id.");
    }
    newId = id;
  } catch (error) {
    console.error("[api/contact] Postgres insert failed:", error);
    return NextResponse.json({ error: "Failed to save inquiry." }, { status: 500 });
  }

  const emailBody = [
    `Source page: ${sourcePage}`,
    `Submitted at: ${submittedAt}`,
    `Submission id: ${newId}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Project type: ${data.projectType}`,
    `Budget range: ${data.budgetRange}`,
    `Timeline: ${data.timeline}`,
    `Drawings status: ${data.drawingsStatus}`,
    `Project location: ${data.projectLocation}`,
    `Message: ${data.message || "(none)"}`,
  ].join("\n");

  const emailAttempted = Boolean(resend && process.env.CONTACT_TO_EMAIL);

  let emailOk = !emailAttempted;
  if (emailAttempted && resend && process.env.CONTACT_TO_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "TCH Website <no-reply@templetoncustomhomes.com>",
        to: process.env.CONTACT_TO_EMAIL,
        subject: `New project inquiry: ${data.name}`,
        text: emailBody,
      });
      emailOk = true;
    } catch (error) {
      console.error("[api/contact] Resend failed:", error);
    }
  }

  if (isSheetsConfigured()) {
    after(async () => {
      try {
        await postRowToSheet({ ...row, submissionId: String(newId) });
        await sql`UPDATE contact_submissions SET synced_to_sheet = TRUE WHERE id = ${newId}`;
      } catch (error) {
        console.error("[api/contact] Google Sheets sync failed (will retry via cron):", error);
      }
    });
  }

  const warnings: string[] = [];
  if (emailAttempted && !emailOk) warnings.push("email_failed");

  if (hasSanity && process.env.SANITY_API_WRITE_TOKEN) {
    try {
      await sanityClient.withConfig({ token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false }).create({
        _type: "formSubmission",
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        drawingsStatus: data.drawingsStatus,
        projectLocation: data.projectLocation,
        message: data.message,
        sourcePage,
        submittedAt,
      });
    } catch (error) {
      console.error("[api/contact] Sanity create failed:", error);
      warnings.push("sanity_write_failed");
    }
  }

  const base = { ok: true as const, id: newId };
  return warnings.length > 0 ? NextResponse.json({ ...base, warnings }) : NextResponse.json(base);
}
