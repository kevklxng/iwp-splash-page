import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { hasSanity } from "../../../sanity/env";
import { sanityClient } from "../../../sanity/client";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function postToGoogleSheets(row: Record<string, string | undefined>) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url) {
    return;
  }
  if (!secret) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_SECRET is required when GOOGLE_SHEETS_WEBHOOK_URL is set.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, row }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Google Sheets webhook failed: ${response.status} ${text}`.slice(0, 500));
  }
}

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form fields." }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
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

  const emailBody = [
    `Source page: ${sourcePage}`,
    `Submitted at: ${submittedAt}`,
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

  const tasks: Promise<unknown>[] = [];

  if (resend && process.env.CONTACT_TO_EMAIL) {
    tasks.push(
      resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "TCH Website <no-reply@templetoncustomhomes.com>",
        to: process.env.CONTACT_TO_EMAIL,
        subject: `New project inquiry: ${data.name}`,
        text: emailBody,
      }),
    );
  }

  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    tasks.push(postToGoogleSheets(row));
  }

  try {
    await Promise.all(tasks);
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json({ error: "Failed to deliver inquiry." }, { status: 500 });
  }

  if (hasSanity && process.env.SANITY_API_WRITE_TOKEN) {
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
  }

  return NextResponse.json({ ok: true });
}
