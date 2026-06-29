import { NextResponse } from "next/server";
import { after } from "next/server";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { isSheetsConfigured, postRowToSheet } from "@/lib/google-sheets";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

function formatIndustry(industry: string[] | undefined): string | undefined {
  if (!industry?.length) return undefined;
  return industry.join(", ");
}

const FIELD_LABELS: Record<string, string> = {
  describesYou: "Which best describes you",
  email: "Email",
  fullName: "Full name",
  linkedIn: "LinkedIn URL",
  phone: "Phone",
  referredBy: "Who referred you",
  investmentRange: "Investment range",
  industry: "Industry",
  service: "Service",
  financingParticipation: "Financing participation",
  lendingAffiliation: "Lending affiliation",
};

function describeValidationError(parsed: z.SafeParseError<unknown>): string {
  const issues = parsed.error.issues;
  const fieldNames = Array.from(
    new Set(
      issues
        .map((issue) => issue.path[0])
        .filter((p): p is string => typeof p === "string")
        .map((p) => FIELD_LABELS[p] ?? p),
    ),
  );

  if (fieldNames.length === 0) {
    return "Some of the information you entered isn't valid. Please review the form and try again.";
  }

  const list =
    fieldNames.length === 1
      ? fieldNames[0]
      : `${fieldNames.slice(0, -1).join(", ")} and ${fieldNames[fieldNames.length - 1]}`;

  return `Please check the following ${
    fieldNames.length === 1 ? "field" : "fields"
  } and try again: ${list}.`;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We couldn't read your submission. Please refresh the page and try again." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: describeValidationError(parsed) },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.company && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        error:
          "You've reached the limit of 5 submissions per hour. Please wait a little while before trying again, or email us directly.",
      },
      { status: 429 },
    );
  }

  if (!process.env.POSTGRES_URL) {
    console.error("[api/contact] POSTGRES_URL is not set.");
    return NextResponse.json(
      {
        error:
          "Our server isn't configured to receive submissions right now. Please email us directly so we don't miss you.",
      },
      { status: 500 },
    );
  }

  const sourcePage = data.sourcePage?.trim() || "/";
  const submittedAt = new Date().toISOString();
  const industry = formatIndustry(data.industry);

  const row: Record<string, string | undefined> = {
    submittedAt,
    sourcePage,
    describesYou: data.describesYou,
    email: data.email,
    fullName: data.fullName,
    linkedIn: data.linkedIn,
    phone: data.phone,
    referredBy: data.referredBy,
    investmentRange: data.investmentRange,
    industry,
    service: data.service,
    financingParticipation: data.financingParticipation,
    lendingAffiliation: data.lendingAffiliation,
  };

  let newId: number;
  try {
    const insertResult = await sql<{ id: number }>`
      INSERT INTO contact_submissions (
        submitted_at,
        source_page,
        describes_you,
        email,
        full_name,
        linkedin,
        phone,
        referred_by,
        investment_range,
        industry,
        service,
        financing_participation,
        lending_affiliation
      )
      VALUES (
        ${submittedAt},
        ${sourcePage},
        ${data.describesYou},
        ${data.email},
        ${data.fullName},
        ${data.linkedIn},
        ${data.phone},
        ${data.referredBy},
        ${data.investmentRange},
        ${industry},
        ${data.service},
        ${data.financingParticipation},
        ${data.lendingAffiliation}
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
    return NextResponse.json(
      {
        error:
          "We couldn't save your inquiry due to a problem on our end. Please try again in a moment, or email us directly if it keeps happening.",
      },
      { status: 500 },
    );
  }

  const emailBody = [
    `Source page: ${sourcePage}`,
    `Submitted at: ${submittedAt}`,
    `Submission id: ${newId}`,
    `Describes you: ${data.describesYou}`,
    `Full name: ${data.fullName}`,
    `Email: ${data.email}`,
    `LinkedIn: ${data.linkedIn}`,
    `Phone: ${data.phone}`,
    `Referred by: ${data.referredBy}`,
    `Investment range: ${data.investmentRange}`,
    `Industry: ${industry ?? ""}`,
    `Service: ${data.service}`,
    `Financing participation: ${data.financingParticipation}`,
    `Lending affiliation: ${data.lendingAffiliation}`,
  ].join("\n");

  const emailAttempted = Boolean(resend && process.env.CONTACT_TO_EMAIL);

  let emailOk = !emailAttempted;
  if (emailAttempted && resend && process.env.CONTACT_TO_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "IWP Website <no-reply@iwp.fund>",
        to: process.env.CONTACT_TO_EMAIL,
        subject: `New inquiry: ${data.fullName}`,
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

  const base = { ok: true as const, id: newId };
  return warnings.length > 0 ? NextResponse.json({ ...base, warnings }) : NextResponse.json(base);
}
